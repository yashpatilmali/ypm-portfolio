// Web Audio API Retro 8-bit Sound Engine & Chiptune Music Synthesizer
// Completely original, royalty-free, client-side synthesized audio

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isMusicMuted = false;
    this.musicPlaying = false;
    this.musicTimer = null;
    this.currentNoteIndex = 0;
    this.tempo = 140; // BPM
    
    // Load persisted preferences
    if (typeof window !== 'undefined') {
      const savedSfx = localStorage.getItem('mario_sfx_muted');
      const savedMusic = localStorage.getItem('mario_music_muted');
      if (savedSfx !== null) this.isMuted = savedSfx === 'true';
      if (savedMusic !== null) this.isMusicMuted = savedMusic === 'true';
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Toggle Sound Effects
  toggleSfx() {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('mario_sfx_muted', this.isMuted);
    }
    return !this.isMuted;
  }

  // Toggle Background Music
  toggleMusic() {
    this.isMusicMuted = !this.isMusicMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('mario_music_muted', this.isMusicMuted);
    }
    if (this.isMusicMuted) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
    return !this.isMusicMuted;
  }

  // Helper: Play custom tone
  tone(freq, type = 'square', duration = 0.1, gainVal = 0.15, pitchEnd = null) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      if (pitchEnd !== null) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(10, pitchEnd), this.ctx.currentTime + duration);
      }

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio error", e);
    }
  }

  // 1. Classic Coin Sound: B5 (987.77Hz) -> E6 (1318.51Hz)
  playCoin() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(987.77, t);
    osc.frequency.setValueAtTime(1318.51, t + 0.08);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.setValueAtTime(0.18, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.35);
  }

  // 2. Mario Jump Sound: Sweeping square wave
  playJump() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(580, t + 0.16);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.linearRampToValueAtTime(0.01, t + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.18);
  }

  // 3. Power-Up Ascending Jingle
  playPowerUp() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [330, 392, 659, 523, 587, 784];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.tone(freq, 'triangle', 0.1, 0.2);
      }, i * 60);
    });
  }

  // 4. Pipe Transition Sound (Resonant descending glide)
  playPipe() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.25);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.linearRampToValueAtTime(0.01, t + 0.26);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.26);
  }

  // 5. Game Start Fanfare
  playGameStart() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    // Upbeat original retro fanfare
    const jingle = [
      { f: 523.25, d: 0.12 }, // C5
      { f: 523.25, d: 0.12 }, // C5
      { f: 523.25, d: 0.12 }, // C5
      { f: 659.25, d: 0.16 }, // E5
      { f: 783.99, d: 0.35 }, // G5
    ];

    let delay = 0;
    jingle.forEach((note) => {
      setTimeout(() => {
        this.tone(note.f, 'square', note.d, 0.25);
      }, delay);
      delay += note.d * 1000 + 30;
    });
  }

  // 6. UI Button Click / Menu Select
  playClick() {
    this.tone(700, 'square', 0.04, 0.1, 950);
  }

  // 7. Subtle Hover Blip
  playHover() {
    this.tone(880, 'triangle', 0.03, 0.05);
  }

  // 8. Trophy / Achievement Sparkle
  playTrophy() {
    if (this.isMuted) return;
    const arpeggio = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    arpeggio.forEach((freq, idx) => {
      setTimeout(() => {
        this.tone(freq, 'sine', 0.18, 0.15);
      }, idx * 70);
    });
  }

  // 9. Block Hit Bump
  playBump() {
    this.tone(120, 'square', 0.08, 0.25, 60);
  }

  // 10. Victory Fanfare (Level Clear)
  playVictory() {
    if (this.isMuted) return;
    this.init();
    const victoryNotes = [
      { f: 392.00, d: 0.12 }, // G4
      { f: 523.25, d: 0.12 }, // C5
      { f: 659.25, d: 0.12 }, // E5
      { f: 783.99, d: 0.15 }, // G5
      { f: 659.25, d: 0.12 }, // E5
      { f: 783.99, d: 0.45 }, // G5 hold
    ];
    let offset = 0;
    victoryNotes.forEach((item) => {
      setTimeout(() => {
        this.tone(item.f, 'square', item.d, 0.22);
      }, offset);
      offset += item.d * 1000 + 40;
    });
  }

  // Background Chiptune Generator: Original 8-bit "Developer Adventure" Melody
  startMusic() {
    if (this.isMusicMuted || this.musicPlaying) return;
    this.init();
    if (!this.ctx) return;

    this.musicPlaying = true;
    this.currentNoteIndex = 0;

    // Original, catchy 8-bit adventure progression (C major - A minor - F major - G major)
    const melody = [
      // Measure 1: C Major
      { lead: 523.25, bass: 130.81, dur: 0.2 },
      { lead: 659.25, bass: 130.81, dur: 0.2 },
      { lead: 783.99, bass: 196.00, dur: 0.2 },
      { lead: 659.25, bass: 130.81, dur: 0.2 },
      // Measure 2: A Minor
      { lead: 440.00, bass: 110.00, dur: 0.2 },
      { lead: 523.25, bass: 110.00, dur: 0.2 },
      { lead: 659.25, bass: 164.81, dur: 0.2 },
      { lead: 587.33, bass: 110.00, dur: 0.2 },
      // Measure 3: F Major
      { lead: 349.23, bass: 87.31,  dur: 0.2 },
      { lead: 440.00, bass: 87.31,  dur: 0.2 },
      { lead: 523.25, bass: 130.81, dur: 0.2 },
      { lead: 659.25, bass: 87.31,  dur: 0.2 },
      // Measure 4: G Major
      { lead: 392.00, bass: 98.00,  dur: 0.2 },
      { lead: 493.88, bass: 98.00,  dur: 0.2 },
      { lead: 587.33, bass: 146.83, dur: 0.2 },
      { lead: 783.99, bass: 98.00,  dur: 0.2 },
    ];

    const step = () => {
      if (!this.musicPlaying || this.isMusicMuted) return;

      const item = melody[this.currentNoteIndex];
      // Lead melodic voice (gentle pulse/square)
      this.tone(item.lead, 'square', 0.12, 0.06);
      // Bass voice (soft triangle wave)
      this.tone(item.bass, 'triangle', 0.16, 0.08);

      this.currentNoteIndex = (this.currentNoteIndex + 1) % melody.length;
      this.musicTimer = setTimeout(step, 240);
    };

    step();
  }

  stopMusic() {
    this.musicPlaying = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }
}

export const sound = new SoundEngine();
