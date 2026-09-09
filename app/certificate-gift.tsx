'use client';
import {useEffect, useRef, useState} from 'react';
import {Gift, Sparkles, Star, RefreshCw, CheckCircle2} from 'lucide-react';
import {Dialog, DialogContent, DialogTitle, DialogDescription} from '@/components/ui/dialog';
import {giftUnlocked} from '@/lib/rewards';

const giftArt = '/art/certificate-gift.png';
const certificateArt = '/art/bonus-certificate.png';

export default function CertificateGift({total, studentName, motion, sound}: {total: number; studentName: string; motion: boolean; sound: boolean}) {
  const [open, setOpen] = useState(false), [revealed, setRevealed] = useState(false), [lidOpen, setLidOpen] = useState(false);
  const [certificateLoaded, setCertificateLoaded] = useState(false), [certificateError, setCertificateError] = useState(false), [retry, setRetry] = useState(0);
  const [giftError, setGiftError] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]), audio = useRef<AudioContext | null>(null), button = useRef<HTMLButtonElement | null>(null);
  const eligible = giftUnlocked(total);
  const clearTimers = () => {timers.current.forEach(clearTimeout); timers.current = [];};
  const closeAudio = () => {void audio.current?.close().catch(() => {}); audio.current = null;};

  useEffect(() => () => {clearTimers(); closeAudio();}, []);
  useEffect(() => {
    if (eligible) return;
    clearTimers(); closeAudio(); setOpen(false); setRevealed(false); setLidOpen(false);
  }, [eligible]);

  function changeOpen(value: boolean) {
    setOpen(value);
    if (!value) {clearTimers(); closeAudio(); setRevealed(false); setLidOpen(false);}
  }

  function openGift() {
    if (!eligible || open) return;
    window.dispatchEvent(new Event('vq-open-gift'));
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    clearTimers(); setRevealed(false); setLidOpen(false); setOpen(true);
    const animate = motion && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealDelay = animate ? 1250 : 0;
    if (sound) {
      try {
        const context = new AudioContext(); audio.current = context; void context.resume().catch(() => {});
        const notes = [659.25, 783.99, 1046.5];
        notes.forEach((frequency, index) => {
          const oscillator = context.createOscillator(), envelope = context.createGain();
          const start = context.currentTime + revealDelay / 1000 + index * .12;
          oscillator.type = 'sine'; oscillator.frequency.value = frequency;
          envelope.gain.setValueAtTime(0, start); envelope.gain.linearRampToValueAtTime(.055, start + .02);
          envelope.gain.exponentialRampToValueAtTime(.0001, start + .5);
          oscillator.connect(envelope); envelope.connect(context.destination); oscillator.start(start); oscillator.stop(start + .55);
        });
        timers.current.push(setTimeout(closeAudio, revealDelay + 1100));
      } catch { /* The gift still opens when audio is unavailable. */ }
    }
    if (!animate) {setLidOpen(true); setRevealed(true); return;}
    timers.current.push(setTimeout(() => setLidOpen(true), 600));
    timers.current.push(setTimeout(() => setRevealed(true), revealDelay));
  }

  function GiftPicture({opened = false}: {opened?: boolean}) {
    return giftError ? <Gift className="gift-fallback" aria-hidden="true"/> : <span className="gift-picture" aria-hidden="true"><img src={giftArt} alt="" style={{transform: `translateX(${opened ? '-50%' : '0'})`}} onError={() => setGiftError(true)}/></span>;
  }

  if (!eligible) return null;
  return <>
    <section className={'certificate-gift-card' + (motion ? '' : ' gift-static')}>
      <div className="gift-intro"><span className="eyebrow"><Sparkles size={15}/> A REWARD FROM MS. AMINA</span><h2>You’ve got a gift!</h2><p>You collected {total} of 600 learning coins. Your final mark is <b>10/10</b>.</p><p>Tap the gift box to open your surprise.</p></div>
      <button ref={button} className="gift-open-button" onClick={openGift} aria-label="Open your gift and reveal your certificate"><GiftPicture/><span>Open my gift <Sparkles size={17}/></span></button>
    </section>
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogContent className={'gift-dialog ' + (revealed ? 'gift-revealed' : 'gift-opening') + (motion ? '' : ' gift-static')} onCloseAutoFocus={event => {event.preventDefault(); button.current?.focus();}}>
        <DialogTitle>{revealed ? 'Congratulations, ' + studentName.split(' ')[0] + '!' : 'Opening your gift…'}</DialogTitle>
        <DialogDescription>{revealed ? 'Thank you for your dedication and hard work. Enjoy learning!' : 'A little surprise to celebrate your achievement.'}</DialogDescription>
        {!revealed && <div className={'gift-unwrapping ' + (lidOpen ? 'gift-lid-open' : '')}><GiftPicture opened={lidOpen}/><span className="gift-opening-caption" role="status">{lidOpen ? 'Your surprise is ready…' : 'Unwrapping your gift…'}</span></div>}
        <div className={'certificate-reveal ' + (revealed ? 'is-visible' : '')} aria-hidden={!revealed}>
          {revealed && motion && <div className="certificate-stars" aria-hidden="true">{Array.from({length: 16}, (_, index) => <Star key={index} fill="currentColor" size={12 + index % 3 * 5} style={{left: `${index * 43 % 100}%`, animationDelay: `${index % 5 * .12}s`, color: index % 2 ? '#eab943' : '#50b6da'}}/>)}</div>}
          <p className="certificate-recipient">Presented to <b>{studentName}</b></p>
          <div className="certificate-image-wrap">
            {!certificateLoaded && !certificateError && <p className="certificate-loading" role="status">Loading your certificate…</p>}
            <img key={retry} src={certificateArt + (retry ? '?retry=' + retry : '')} alt="Certificate of appreciation: Best Class Attendant Award. Bonus: 10 Marks. Presented by Ms. Amina Qatan, English Lecturer." onLoad={() => {setCertificateLoaded(true); setCertificateError(false);}} onError={() => setCertificateError(true)} style={{visibility: certificateLoaded && !certificateError ? 'visible' : 'hidden'}}/>
            {certificateError && <div className="certificate-load-error" role="alert"><p>Your certificate could not load. Your reward is still available.</p><button className="secondary-button" onClick={() => {setCertificateLoaded(false); setCertificateError(false); setRetry(n => n + 1);}}><RefreshCw size={17}/>Reload certificate</button></div>}
          </div>
          <p className="certificate-mark"><CheckCircle2 size={18}/>Your final Learning Skills mark: <b>10 / 10</b></p>
          <button className="primary-button" onClick={() => changeOpen(false)}>Keep learning</button>
        </div>
      </DialogContent>
    </Dialog>
  </>;
}
