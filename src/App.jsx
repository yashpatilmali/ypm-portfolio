import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import GameHUD from './components/GameHUD';
import PlayableStage from './components/PlayableStage';
import AmbientCanvas from './components/AmbientCanvas';
import MobileRestrictedScreen from './components/MobileRestrictedScreen';
import { sound } from './audio/soundEngine';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [coins, setCoins] = useState(3);
  const [score, setScore] = useState(1200);
  const [isAudioMuted, setIsAudioMuted] = useState(sound.isMuted);
  const [isMusicMuted, setIsMusicMuted] = useState(sound.isMusicMuted);

  const checkIsMobile = () => {
    if (typeof window === 'undefined') return false;
    const ua = navigator.userAgent || '';
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const isTouchDevice = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
    const isSmallTouch = isTouchDevice && (window.innerWidth < 1024 || window.innerHeight < 600);
    const isPhoneScreen = window.innerWidth < 900 || window.innerHeight < 500;
    return Boolean(isMobileUA || isSmallTouch || isPhoneScreen);
  };

  const [isMobile, setIsMobile] = useState(checkIsMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  if (isMobile) {
    return <MobileRestrictedScreen />;
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-white select-none selection:bg-[#E52521] selection:text-white relative flex flex-col font-pixel">
      {/* Background Living Ambient Starfield & Particles */}
      <AmbientCanvas />

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
