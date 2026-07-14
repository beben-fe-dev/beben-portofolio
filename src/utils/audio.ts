// Web Audio API Retro Sound Effects Synthesizer
let audioCtx: AudioContext | null = null;
let isMuted = false;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const toggleMute = () => {
  isMuted = !isMuted;
  return isMuted;
};

export const getMuteStatus = () => {
  return isMuted;
};

export const playCoinSound = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Coin sound: Two quick square wave notes (B5 then E6)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'square';
    
    // Note 1 (B5, 988 Hz)
    osc.frequency.setValueAtTime(987.77, now);
    // Note 2 (E6, 1318 Hz)
    osc.frequency.setValueAtTime(1318.51, now + 0.08);
    
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.35);
  } catch (e) {
    console.warn('Audio play failed', e);
  }
};

export const playJumpSound = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Jump sound: Pitch sweep upwards
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.18);
    
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.18);
  } catch (e) {
    console.warn('Audio play failed', e);
  }
};

export const playPowerupSound = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Power-up sound: Rapid arpeggio (G4 -> C5 -> E5 -> G5 -> C6 -> E6)
    const notes = [330, 392, 659, 523, 659, 784, 1047, 1318];
    const duration = 0.07;
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * duration);
      
      gain.gain.setValueAtTime(0.08, now + idx * duration);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (idx + 1) * duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + idx * duration);
      osc.stop(now + (idx + 1) * duration);
    });
  } catch (e) {
    console.warn('Audio play failed', e);
  }
};

export const playStompSound = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);
    
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.12);
  } catch (e) {
    console.warn('Audio play failed', e);
  }
};

export const playWinSound = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Victory fanfare (simplified)
    const notes = [
      { f: 523, d: 0.1 }, // C5
      { f: 659, d: 0.1 }, // E5
      { f: 784, d: 0.1 }, // G5
      { f: 1047, d: 0.15 }, // C6
      { f: 1318, d: 0.15 }, // E6
      { f: 1568, d: 0.3 }  // G6
    ];
    
    let timeAcc = 0;
    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(note.f, now + timeAcc);
      
      gain.gain.setValueAtTime(0.08, now + timeAcc);
      gain.gain.exponentialRampToValueAtTime(0.001, now + timeAcc + note.d);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + timeAcc);
      osc.stop(now + timeAcc + note.d);
      
      timeAcc += note.d + 0.02;
    });
  } catch (e) {
    console.warn('Audio play failed', e);
  }
};
