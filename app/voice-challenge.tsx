'use client';
import {useEffect, useRef, useState} from 'react';
import {CheckCircle2, Mic, Square, Upload, Volume2, RotateCcw} from 'lucide-react';
import {tongueTwisters} from '@/lib/speaking';

export default function VoiceChallenge({unit, runId, demo, onSaved}: {unit: number; runId: string; demo: boolean; onSaved: () => Promise<void>}) {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [recording, setRecording] = useState(false), [starting, setStarting] = useState(false), [finishing, setFinishing] = useState(false);
  const [seconds, setSeconds] = useState(0), [clip, setClip] = useState<Blob | null>(null), [url, setUrl] = useState('');
  const [error, setError] = useState(''), [busy, setBusy] = useState(false), [saved, setSaved] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null), stream = useRef<MediaStream | null>(null);
  const active = useRef(false), mounted = useRef(true), begun = useRef(0), playback = useRef<HTMLAudioElement | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const phrase = tongueTwisters[unit - 1];

  function stop() {
    if (!active.current) return;
    active.current = false;
    if (timer.current) clearInterval(timer.current);
    setRecording(false); setFinishing(true);
    setSeconds(Math.min(60, Math.max(1, Math.round((Date.now() - begun.current) / 1000))));
    if (recorder.current?.state === 'recording') recorder.current.stop();
    else setFinishing(false);
    stream.current?.getTracks().forEach(track => track.stop());
  }

  useEffect(() => {
    mounted.current = true;
    setSupported(!!(window.MediaRecorder && navigator.mediaDevices?.getUserMedia));
    const hide = () => {if (document.hidden && active.current) stop();};
    const pause = () => {if(active.current) stop(); playback.current?.pause();};
    window.addEventListener('vq-open-gift', pause);
    document.addEventListener('visibilitychange', hide);
    return () => {
      mounted.current = false; active.current = false;
      if (timer.current) clearInterval(timer.current);
      if (recorder.current?.state === 'recording') recorder.current.stop();
      stream.current?.getTracks().forEach(track => track.stop());
      if ('speechSynthesis' in window) speechSynthesis.cancel();
      document.removeEventListener('visibilitychange', hide);
      window.removeEventListener('vq-open-gift', pause);
    };
  }, []);

  useEffect(() => {
    if (!clip) {setUrl(''); return;}
    const next = URL.createObjectURL(clip); setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [clip]);

  async function start() {
    if (!supported || starting || active.current || finishing) return;
    setStarting(true); setError(''); playback.current?.pause();
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    try {
      const input = await navigator.mediaDevices.getUserMedia({audio: {echoCancellation: true, noiseSuppression: true}});
      if (!mounted.current || document.hidden) {input.getTracks().forEach(track => track.stop()); if (mounted.current) setStarting(false); return;}
      stream.current = input;
      const mime = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/ogg;codecs=opus'].find(type => MediaRecorder.isTypeSupported(type));
      const media = new MediaRecorder(input, mime ? {mimeType: mime} : undefined); recorder.current = media;
      const chunks: BlobPart[] = [];
      media.ondataavailable = event => {if (event.data.size) chunks.push(event.data);};
      media.onstop = () => {
        if (!mounted.current) return;
        setFinishing(false);
        const recording = new Blob(chunks, {type: media.mimeType || mime || 'audio/webm'});
        if (recording.size) setClip(recording);
        else setError('No audio was recorded. Please record again.');
      };
      media.onerror = () => {if (mounted.current) {setError('Recording stopped unexpectedly. Please record again.'); stop();}};
      media.start(500); begun.current = Date.now(); active.current = true;
      setClip(null); setSaved(false); setSeconds(0); setStarting(false); setRecording(true);
      timer.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - begun.current) / 1000); setSeconds(Math.min(60, elapsed));
        if (elapsed >= 60) stop();
      }, 250);
    } catch {
      active.current = false; stream.current?.getTracks().forEach(track => track.stop());
      if (mounted.current) {setStarting(false); setError('We could not start the microphone. Allow access in browser settings and try again.');}
    }
  }

  async function upload() {
    if (!clip || demo || saved) return;
    setBusy(true); setError('');
    try {
      const form = new FormData(); form.set('id', runId); form.set('duration', String(seconds)); form.set('audio', clip, 'tongue-twister');
      const response = await fetch('/api/voice', {method: 'POST', body: form});
      const data = await response.json() as {saved?: boolean; error?: string};
      if (!response.ok) throw new Error(data.error || 'Upload failed. Please retry.');
      setSaved(true); await onSaved();
    } catch (failure) {setError((failure as Error).message || 'Your recording is still here. Please retry uploading.');}
    finally {setBusy(false);}
  }

  return <section className="voice-card"><div className="eyebrow">SPEAKING PRACTICE · REPEAT THREE TIMES</div><h2>Ready, steady, say it!</h2><p>Say this unit’s tongue twister three times in one recording. Keep a steady pace.</p><blockquote className="tongue-twister">{phrase}</blockquote><div className="repeat-pills" aria-label="Repeat the sentence three times"><span>1 · Say it</span><span>2 · Repeat</span><span>3 · Repeat</span></div><button className="text-button" disabled={recording || starting} onClick={() => {
    if (!('speechSynthesis' in window)) {setError('Read-aloud is unavailable. Use the sentence above.'); return;}
    speechSynthesis.cancel(); const example = new SpeechSynthesisUtterance(phrase); example.lang = 'en-GB'; example.rate = .7;
    example.onerror = () => setError('Read-aloud is unavailable. Use the sentence above.'); speechSynthesis.speak(example);
  }}><Volume2 size={18}/>Listen to an example</button>
  {supported === false && <p className="info-box">Recording is unavailable in this browser. You can practise aloud, or open the game in your phone’s browser to record.</p>}
  <div className="voice-controls">{recording ? <button className="danger-button" onClick={stop}><Square size={17} fill="currentColor"/>Stop recording · {seconds}s</button> : <button className="primary-button" disabled={!supported || starting || finishing || busy} onClick={start}>{clip ? <RotateCcw size={18}/> : <Mic size={18}/>} {starting ? 'Opening microphone…' : finishing ? 'Preparing recording…' : clip ? 'Record again' : 'Start recording'}</button>}<span className="small-note">60 seconds maximum</span></div>
  {url && <div className="recording-preview"><label>Listen to your recording</label><audio ref={playback} controls preload="metadata" src={url}/>{!demo && <button className="primary-button" onClick={upload} disabled={busy || finishing || recording || saved}><Upload size={17}/>{busy ? 'Uploading…' : saved ? 'Recording saved' : 'Upload my recording'}</button>}</div>}
  {error && <p className="error-banner" role="alert">{error}</p>}
  {saved && <div className="voice-result" role="status"><CheckCircle2 size={24}/><div><b>Recording saved</b><p>Your teacher can listen to your practice.</p></div></div>}
  <p className="small-note">Unmarked practice. This activity does not earn coins or affect your final mark.</p><p className="small-note">{demo ? 'Practice recordings stay on this page and are not uploaded or saved.' : 'Upload saves the recording for you and your teacher.'}</p>
  </section>;
}
