import React, { useState, useEffect } from 'react';
import MarioCharacter from './MarioCharacter';
import { sound } from '../audio/soundEngine';
import { WORLD_BEST_QUOTES } from '../data/quotes';

export default function StartScreen({ onStartGame }) {
  const [loadingStage, setLoadingStage] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * WORLD_BEST_QUOTES.length));

  const currentQuote = WORLD_BEST_QUOTES[quoteIndex] || WORLD_BEST_QUOTES[0];

  const handleNextQuote = (e) => {
    if (e) e.stopPropagation();
    sound.playCoin();
    setQuoteIndex((prev) => {
      let next;
      do {
        next = Math.floor(Math.random() * WORLD_BEST_QUOTES.length);
      } while (next === prev && WORLD_BEST_QUOTES.length > 1);
      return next;
    });
  };

  const handleStart = () => {
    sound.init();
    sound.playGameStart();
    sound.startMusic();
    setLoadingStage(true);

    setTimeout(() => {
      onStartGame();
    }, 1500);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        if (!loadingStage) {
          e.preventDefault();
          handleStart();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [loadingStage]);

  if (loadingStage) {
    return (
      <div className="fixed inset-0 z-50 bg-[#000000] flex flex-col items-center justify-center font-pixel text-white px-4">
        <div className="text-center space-y-4 sm:space-y-6 max-w-md animate-pulse">
          <div className="text-2xl sm:text-4xl text-[#5C94FC] tracking-widest">
            WORLD 1-1
          </div>
          <div className="text-lg sm:text-2xl text-[#FCD116]">
            YASH MALI
          </div>
          <div className="flex items-center justify-center gap-6 py-4">
            <MarioCharacter state="running" size={84} />
            <div className="text-2xl sm:text-4xl">
              x <span className="text-[#00A800]">03</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 font-pixel tracking-widest pt-2">
            LOADING GAME WORLD...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen landscape:min-h-0 landscape:h-screen bg-[#5C94FC] flex flex-col items-center justify-between select-none px-3 sm:px-6 py-2 sm:py-4 landscape:py-1 overflow-x-hidden overflow-y-auto">
      
      {/* Top Arcade Scoreboard (Original NES Layout) */}
      <header className="w-full max-w-4xl flex justify-between items-center z-20 pt-1 pb-1 sm:pb-2 landscape:py-0 font-pixel text-xs sm:text-sm landscape:text-[10px] text-white drop-shadow-[2px_2px_0_#000000]">
        <div>
          <div className="text-[#FCD116]">MARIO</div>
          <div className="text-white mt-0.5">025600</div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#FCD116] border border-[#FF9900] rounded-full animate-spin inline-block" />
          <span>x03</span>
        </div>
        <div>
          <div className="text-[#00A800]">WORLD</div>
          <div className="text-white mt-0.5">1 - 1</div>
        </div>
        <div>
          <div className="text-[#E52521]">TIME</div>
          <div className="text-white mt-0.5">365</div>
        </div>
      </header>

      {/* Floating Pixel Clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 landscape:top-6 left-8 animate-drift-slow opacity-85">
          <svg width="120" height="48" viewBox="0 0 40 16" fill="white" className="[image-rendering:pixelated] landscape:w-20 landscape:h-8">
            <rect x="10" y="2" width="20" height="12" />
            <rect x="6" y="6" width="28" height="8" />
            <rect x="2" y="10" width="36" height="4" />
          </svg>
        </div>
        <div className="absolute top-16 landscape:top-10 right-10 animate-drift-medium opacity-85" style={{ animationDelay: '-12s' }}>
          <svg width="150" height="56" viewBox="0 0 40 16" fill="white" className="[image-rendering:pixelated] landscape:w-24 landscape:h-9">
            <rect x="10" y="2" width="20" height="12" />
            <rect x="6" y="6" width="28" height="8" />
            <rect x="2" y="10" width="36" height="4" />
          </svg>
        </div>
      </div>

      {/* Main Unified Centerpiece - Centered Horizontally & Vertically */}
      <main className="z-20 w-full max-w-xl my-auto py-1 sm:py-2 landscape:py-0.5 flex flex-col items-center justify-center text-center space-y-2 sm:space-y-3 landscape:space-y-1.5 px-2">
        
        {/* Retro Nintendo Title Banner */}
        <div className="w-full bg-[#000000] border-3 sm:border-4 border-[#FCD116] p-3 sm:p-5 landscape:p-2 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.6)]">
          <h1 className="text-3xl sm:text-5xl md:text-6xl landscape:text-2xl font-pixel text-[#E52521] tracking-tight drop-shadow-[3px_3px_0_#FFFFFF] landscape:drop-shadow-[2px_2px_0_#FFFFFF]">
            YASH MALI
          </h1>

          <div className="mt-1 sm:mt-2 landscape:mt-0.5 text-[10px] sm:text-xs md:text-sm landscape:text-[9px] font-pixel text-[#FCD116] tracking-wide">
            COMPUTER SCIENCE ENGINEER • FULL STACK DEVELOPER
          </div>
        </div>

        {/* World-Best Quotes Box in Authentic Mario Font */}
        <div
          onClick={handleNextQuote}
          onMouseEnter={() => sound.playHover()}
          className="w-full bg-[#000000]/95 border-3 sm:border-4 border-[#FCD116] rounded-xl sm:rounded-2xl p-2.5 sm:p-4 landscape:p-2 shadow-[0_8px_25px_rgba(0,0,0,0.6)] cursor-pointer hover:border-white transition-all group"
          title="Click to shuffle quote!"
        >
          <p className="text-white font-pixel text-xs sm:text-sm md:text-base landscape:text-[10px] leading-relaxed sm:leading-loose landscape:leading-snug drop-shadow-[2px_2px_0_#000000] tracking-wide select-none">
            "{currentQuote.text}"
          </p>
          <div className="mt-1.5 sm:mt-2 landscape:mt-0.5 text-[#00E676] font-pixel text-[10px] sm:text-xs landscape:text-[8px] tracking-wider drop-shadow-[1px_1px_0_#000000] select-none">
            — {currentQuote.author}
          </div>
        </div>

        {/* Authentic Mario Standing in Center Between Question Blocks */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 landscape:gap-3 py-0.5">
          {/* Left Question Block */}
          <button
            onClick={handleNextQuote}
            className="w-9 h-9 sm:w-11 sm:h-11 landscape:w-8 landscape:h-8 bg-[#FF9900] hover:bg-[#ffb033] border-2 border-[#943200] rounded-sm flex items-center justify-center font-pixel text-[#4A1500] text-sm sm:text-base landscape:text-xs shadow-md animate-bounce cursor-pointer active:scale-95 shrink-0"
            title="Hit block for a new quote!"
          >
            ?
          </button>

          {/* Official 3D Mario Character in Center */}
          <div
            className="relative cursor-pointer transition-transform hover:scale-105 active:scale-95"
            onClick={handleNextQuote}
            title="Tap Mario to shuffle quote!"
          >
            <MarioCharacter
              state="idle"
              size={86}
              className="landscape:!w-16 landscape:!h-18"
            />
          </div>

          {/* Right Question Block */}
          <button
            onClick={handleNextQuote}
            className="w-9 h-9 sm:w-11 sm:h-11 landscape:w-8 landscape:h-8 bg-[#FF9900] hover:bg-[#ffb033] border-2 border-[#943200] rounded-sm flex items-center justify-center font-pixel text-[#4A1500] text-sm sm:text-base landscape:text-xs shadow-md animate-bounce cursor-pointer active:scale-95 shrink-0"
            style={{ animationDelay: '0.3s' }}
            title="Hit block for a new quote!"
          >
            ?
          </button>
        </div>

        {/* Centered Single 1 Player Game Start Button */}
        <div className="w-full max-w-sm">
          <button
            onClick={handleStart}
            onMouseEnter={() => sound.playHover()}
            className="w-full py-2.5 sm:py-3.5 landscape:py-1.5 px-5 sm:px-6 landscape:px-3 bg-[#E52521] hover:bg-[#ff3b37] active:bg-[#a61512] text-white font-pixel text-xs sm:text-sm md:text-base landscape:text-[11px] rounded-xl border-3 sm:border-4 border-white shadow-[0_4px_0_#9B0000] active:translate-y-1 transition-all cursor-pointer flex items-center justify-between"
          >
            <span className="flex items-center gap-2.5 sm:gap-3">
              <span className="text-[#FCD116] text-sm sm:text-base">▶</span>
              <span>1 PLAYER GAME</span>
            </span>
            <span className="text-[10px] sm:text-xs text-yellow-300 font-bold tracking-wider">START</span>
          </button>
        </div>

        <div className="font-pixel text-[10px] sm:text-xs landscape:text-[8px] text-[#000000] animate-blink font-bold drop-shadow-[1px_1px_0_#FFF]">
          ★ PRESS START OR SPACEBAR TO PLAY ★
        </div>
      </main>

      {/* Ground & Landscape Footer */}
      <footer className="w-full relative z-10 pt-1">
        <div className="w-full h-8 sm:h-12 landscape:h-5 relative flex items-end justify-between px-4 sm:px-8 pointer-events-none">
          {/* Green Hill */}
          <div className="w-24 h-10 sm:w-32 sm:h-16 landscape:w-16 landscape:h-7 bg-[#00A800] border-t-3 sm:border-t-4 border-l-3 sm:border-l-4 border-r-3 sm:border-r-4 border-[#006800] rounded-t-full relative">
            <div className="w-12 h-5 sm:w-16 sm:h-8 bg-[#008800] rounded-t-full absolute bottom-0 left-2" />
          </div>
          {/* Warp Pipe */}
          <div className="w-12 h-10 sm:w-16 sm:h-16 landscape:w-10 landscape:h-8 bg-[#00A800] border-3 sm:border-4 border-[#004D00] rounded-t-sm relative shadow-md">
            <div className="w-16 sm:w-20 -left-2 h-4 sm:h-5 bg-[#00A800] border-3 sm:border-4 border-[#004D00] absolute -top-3.5 sm:-top-4 rounded-xs" />
            <div className="w-2 sm:w-2.5 h-full bg-[#70D000] absolute left-1.5 sm:left-2 opacity-85" />
          </div>
        </div>

        {/* Classic Mario Brick Ground */}
        <div className="w-full h-6 sm:h-10 landscape:h-4 bg-[#E45C10] border-t-3 sm:border-t-4 border-[#943200] relative [background-image:linear-gradient(90deg,#943200_2px,transparent_2px),linear-gradient(0deg,#943200_2px,transparent_2px)] [background-size:24px_16px]">
          <div className="w-full h-1 sm:h-1.5 bg-[#70D000]" />
        </div>
      </footer>
    </div>
  );
}
