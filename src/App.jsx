import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameHUD from './components/GameHUD';
import PlayableStage from './components/PlayableStage';
import AmbientCanvas from './components/AmbientCanvas';
import { sound } from './audio/soundEngine';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [coins, setCoins] = useState(3);
  const [score, setScore] = useState(1200);
  const [isAudioMuted, setIsAudioMuted] = useState(sound.isMuted);
  const [isMusicMuted, setIsMusicMuted] = useState(sound.isMusicMuted);
  const [showRotateTip, setShowRotateTip] = useState(true);

  // Handle Coin Collection
  const handleCoinCollect = () => {
    setCoins((prev) => prev + 1);
    setScore((prev) => prev + 100);
  };

  // Audio Toggles
  const handleToggleSfx = () => {
    const unmuted = sound.toggleSfx();
    setIsAudioMuted(!unmuted);
    if (unmuted) sound.playClick();
  };

  const handleToggleMusic = () => {
    const musicOn = sound.toggleMusic();
    setIsMusicMuted(!musicOn);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white select-none selection:bg-[#E52521] selection:text-white relative flex flex-col font-pixel">
      {/* Background Living Ambient Starfield & Particles */}
      <AmbientCanvas />

      {/* Mobile Portrait Orientation Tip (Automatic for phones held vertically) */}
      {showRotateTip && (
        <aside
          aria-label="Orientation suggestion"
          className="portrait:flex landscape:hidden md:hidden fixed bottom-3 left-3 right-3 z-50 bg-[#000000]/95 border-2 border-[#FCD116] text-[#FCD116] p-2.5 rounded-xl shadow-2xl items-center justify-between text-[10px] animate-pulse"
        >
          <div className="flex items-center gap-2">
            <span className="text-base">🔄</span>
            <span>Tip: Rotate horizontally (landscape) for arcade mode!</span>
          </div>
          <button
            onClick={() => setShowRotateTip(false)}
            className="w-5 h-5 bg-red-600 hover:bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold ml-2 cursor-pointer shrink-0"
            aria-label="Dismiss rotation tip"
          >
            ✕
          </button>
        </aside>
      )}

      {!gameStarted ? (
        <StartScreen onStartGame={() => setGameStarted(true)} />
      ) : (
        <div className="relative z-10 flex-1 flex flex-col pt-16 pb-4 landscape:pt-11 landscape:pb-1">
          {/* Authentic NES HUD Bar */}
          <GameHUD
            coins={coins}
            score={score}
            isAudioMuted={isAudioMuted}
            isMusicMuted={isMusicMuted}
            onToggleSfx={handleToggleSfx}
            onToggleMusic={handleToggleMusic}
          />

          {/* Full Interactive Super Mario Game World With Pipes & Castle */}
          <main className="flex-1 flex flex-col items-center justify-center w-full px-2">
            <PlayableStage
              onCoinCollect={handleCoinCollect}
            />
          </main>
        </div>
      )}
    </div>
  );
}
