import React from 'react';
import { Volume2, VolumeX, Music, Music2 } from 'lucide-react';
import { sound } from '../audio/soundEngine';

export default function GameHUD({
  coins,
  score,
  isAudioMuted,
  isMusicMuted,
  onToggleSfx,
  onToggleMusic
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#000000] border-b-4 border-[#E52521] shadow-2xl px-4 sm:px-8 py-3 landscape:py-1 select-none font-pixel">
      <div className="max-w-6xl mx-auto flex items-center justify-between text-white text-sm sm:text-base drop-shadow-[2px_2px_0_#000000]">
        
        {/* Left: Player & Score */}
        <div className="flex items-center gap-6 sm:gap-10">
          <div>
            <div className="text-[#FCD116] text-xs sm:text-sm">MARIO</div>
            <div className="text-white mt-1 text-sm sm:text-base tracking-widest font-bold">{String(score).padStart(6, '0')}</div>
          </div>

          {/* Coin Counter */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#FCD116] border border-[#FF9900] rounded-full animate-spin flex items-center justify-center">
              <span className="text-[8px] text-[#4A1500] font-black">$</span>
            </div>
            <span className="text-[#FCD116] text-sm sm:text-base font-bold">x{String(coins).padStart(2, '0')}</span>
          </div>

          {/* World */}
          <div className="hidden sm:block">
            <div className="text-[#00A800] text-xs sm:text-sm">WORLD</div>
            <div className="text-white mt-1 text-sm sm:text-base font-bold">1 - 1</div>
          </div>
        </div>

        {/* Right: Sound Controls */}
        <div className="flex items-center gap-3">
          {/* SFX Toggle */}
          <button
            onClick={onToggleSfx}
            title={isAudioMuted ? "Unmute SFX" : "Mute SFX"}
            className={`p-2.5 landscape:p-1.5 rounded-lg border-2 transition-all cursor-pointer ${
              isAudioMuted
                ? 'bg-red-950 border-red-700 text-red-400'
                : 'bg-emerald-950 border-emerald-600 text-emerald-300'
            }`}
          >
            {isAudioMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Music Toggle */}
          <button
            onClick={onToggleMusic}
            title={isMusicMuted ? "Play Music" : "Mute Music"}
            className={`p-2.5 landscape:p-1.5 rounded-lg border-2 transition-all cursor-pointer ${
              isMusicMuted
                ? 'bg-slate-900 border-slate-700 text-slate-400'
                : 'bg-amber-950 border-amber-600 text-[#FCD116] animate-pulse'
            }`}
          >
            {isMusicMuted ? <Music2 size={16} /> : <Music size={16} />}
          </button>
        </div>

      </div>
    </nav>
  );
}
