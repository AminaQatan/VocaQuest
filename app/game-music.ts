'use client';
import {useEffect, useRef} from 'react';

// Original, light marimba-style melody. No external song or audio download.
const melody = [72, 76, 79, 76, 74, 77, 81, 77, 76, 79, 84, 79, 74, 77, 79, 0,
  72, 76, 79, 84, 81, 77, 74, 77, 79, 76, 74, 71, 72, 0, 72, 0];
const bass = [48, 53, 48, 55, 48, 53, 55, 48];
export function useGameMusic(playing: boolean, enabled: boolean) {
  const audio = useRef<AudioContext | null>(null), output = useRef<GainNode | null>(null);
  const state = useRef({playing, enabled}); state.current = {playing, enabled};
  const clock = useRef<ReturnType<typeof setInterval> | null>(null);
  const step = useRef(0), next = useRef(0);
  function note(midi: number, at: number, duration: number, level: number, type: OscillatorType) {
    if (!audio.current || !output.current || !midi) return;
    const context = audio.current, oscillator = context.createOscillator(), envelope = context.createGain();
    oscillator.type = type; oscillator.frequency.value = 440 * 2 ** ((midi - 69) / 12);
    envelope.gain.setValueAtTime(0, at); envelope.gain.linearRampToValueAtTime(level, at + .012);
    envelope.gain.exponentialRampToValueAtTime(.0001, at + duration);
    oscillator.connect(envelope); envelope.connect(output.current); oscillator.start(at); oscillator.stop(at + duration + .03);
    oscillator.onended = () => {oscillator.disconnect(); envelope.disconnect();};
  }
  function sync() {
    const context = audio.current, gain = output.current;
    if (!context || !gain) return;
    const shouldPlay = state.current.playing && state.current.enabled && !document.hidden;
    gain.gain.cancelScheduledValues(context.currentTime);
    gain.gain.setTargetAtTime(shouldPlay ? .085 : 0, context.currentTime, .06);
    if (clock.current) {clearInterval(clock.current); clock.current = null;}
    if (!shouldPlay) return;
    next.current = context.currentTime + .09;
    clock.current = setInterval(() => {
      if (context.state !== 'running') return;
      if (next.current < context.currentTime) next.current = context.currentTime + .04;
      while (next.current < context.currentTime + .18) {
        const position = step.current % melody.length;
        note(melody[position], next.current, .42, .45, 'sine');
        note(melody[position] ? melody[position] + 12 : 0, next.current, .12, .035, 'sine');
        if (position % 4 === 0) note(bass[position / 4], next.current, .8, .24, 'triangle');
        step.current++; next.current += 60 / 108 / 2;
      }
    }, 80);
  }
  function unlock() {
    try {
      if (!audio.current) {
        audio.current = new AudioContext(); output.current = audio.current.createGain();
        output.current.gain.value = 0; output.current.connect(audio.current.destination);
      }
      void audio.current.resume().then(sync).catch(() => {});
    } catch { /* Music is optional; gameplay and learning remain available. */ }
  }
  useEffect(sync, [playing, enabled]);
  useEffect(() => {
    document.addEventListener('visibilitychange', sync);
    return () => {
      document.removeEventListener('visibilitychange', sync);
      if (clock.current) clearInterval(clock.current);
      void audio.current?.close().catch(() => {}); audio.current = null; output.current = null;
    };
  }, []);
  return unlock;
}
