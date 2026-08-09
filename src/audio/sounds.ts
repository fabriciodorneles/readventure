/**
 * Efeitos sonoros pequenos gerados com WebAudio (sem arquivos externos).
 * Som é reforço, nunca requisito: falhas são silenciosamente ignoradas.
 */

type SoundName =
  | 'mic-on'
  | 'mic-off'
  | 'wood'
  | 'success'
  | 'retry'
  | 'build'
  | 'chest'
  | 'equip'
  | 'tap';

let ctx: AudioContext | null = null;

function audioContext(): AudioContext | null {
  try {
    if (!ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(
  ac: AudioContext,
  freq: number,
  startOffset: number,
  duration: number,
  opts: { type?: OscillatorType; gain?: number; sweepTo?: number } = {},
): void {
  const { type = 'sine', gain = 0.12, sweepTo } = opts;
  const t0 = ac.currentTime + startOffset;
  const osc = ac.createOscillator();
  const amp = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (sweepTo) osc.frequency.exponentialRampToValueAtTime(sweepTo, t0 + duration);
  amp.gain.setValueAtTime(0.0001, t0);
  amp.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
  amp.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(amp).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

export function playSound(name: SoundName): void {
  const ac = audioContext();
  if (!ac) return;
  try {
    switch (name) {
      case 'tap':
        tone(ac, 520, 0, 0.08, { type: 'triangle', gain: 0.08 });
        break;
      case 'mic-on':
        tone(ac, 440, 0, 0.1, { type: 'sine' });
        tone(ac, 660, 0.1, 0.14, { type: 'sine' });
        break;
      case 'mic-off':
        tone(ac, 660, 0, 0.1, { type: 'sine' });
        tone(ac, 440, 0.1, 0.14, { type: 'sine' });
        break;
      case 'wood':
        tone(ac, 220, 0, 0.09, { type: 'square', gain: 0.06 });
        tone(ac, 330, 0.07, 0.12, { type: 'square', gain: 0.06 });
        break;
      case 'success':
        tone(ac, 523, 0, 0.12, { type: 'triangle' });
        tone(ac, 659, 0.11, 0.12, { type: 'triangle' });
        tone(ac, 784, 0.22, 0.24, { type: 'triangle' });
        break;
      case 'retry':
        tone(ac, 392, 0, 0.16, { type: 'sine', gain: 0.08 });
        tone(ac, 440, 0.15, 0.2, { type: 'sine', gain: 0.08 });
        break;
      case 'build':
        tone(ac, 196, 0, 0.1, { type: 'square', gain: 0.07 });
        tone(ac, 262, 0.12, 0.1, { type: 'square', gain: 0.07 });
        tone(ac, 330, 0.24, 0.1, { type: 'square', gain: 0.07 });
        tone(ac, 392, 0.36, 0.3, { type: 'triangle' });
        break;
      case 'chest':
        tone(ac, 330, 0, 0.1, { type: 'triangle' });
        tone(ac, 415, 0.1, 0.1, { type: 'triangle' });
        tone(ac, 523, 0.2, 0.1, { type: 'triangle' });
        tone(ac, 659, 0.3, 0.35, { type: 'triangle' });
        break;
      case 'equip':
        tone(ac, 523, 0, 0.1, { type: 'sine' });
        tone(ac, 784, 0.09, 0.28, { type: 'sine', sweepTo: 1046 });
        break;
    }
  } catch {
    // sem som, sem problema
  }
}
