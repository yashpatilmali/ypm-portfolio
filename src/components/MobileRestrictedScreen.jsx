import React from 'react';
import MarioCharacter from './MarioCharacter';
import { portfolioData } from '../data/portfolioData';
import { Mail, Laptop } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';

export default function MobileRestrictedScreen() {
  return (
    <div className="min-h-screen w-full bg-[#5C94FC] text-white font-pixel flex flex-col items-center justify-between p-4 relative select-none overflow-x-hidden">
      
      {/* Floating Retro Clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-8 left-6 animate-drift-slow opacity-80">
          <svg width="100" height="40" viewBox="0 0 40 16" fill="white" className="[image-rendering:pixelated]">
            <rect x="10" y="2" width="20" height="12" />
            <rect x="6" y="6" width="28" height="8" />
            <rect x="2" y="10" width="36" height="4" />
          </svg>
        </div>
        <div className="absolute top-16 right-8 animate-drift-medium opacity-80" style={{ animationDelay: '-8s' }}>
          <svg width="120" height="48" viewBox="0 0 40 16" fill="white" className="[image-rendering:pixelated]">
            <rect x="10" y="2" width="20" height="12" />
            <rect x="6" y="6" width="28" height="8" />
            <rect x="2" y="10" width="36" height="4" />
          </svg>
        </div>
      </div>

      {/* Top Arcade Header */}
      <header className="z-10 w-full max-w-md pt-2 flex items-center justify-between text-[11px] drop-shadow-[2px_2px_0_#000]">
        <div className="text-[#FCD116]">MARIO</div>
        <div className="text-white">WORLD 1-1</div>
        <div className="text-[#E52521]">TIME 365</div>
      </header>

      {/* Main Center Box */}
      <main className="z-10 w-full max-w-md my-auto flex flex-col items-center text-center space-y-4 py-4">
        
        {/* Title Banner */}
        <div className="w-full bg-[#000000] border-4 border-[#FCD116] p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          <h1 className="text-2xl sm:text-3xl font-pixel text-[#E52521] tracking-tight drop-shadow-[2px_2px_0_#FFFFFF]">
            YASH MALI
          </h1>
          <div className="mt-1 text-[9px] sm:text-[10px] text-[#FCD116] tracking-wider">
            COMPUTER SCIENCE ENGINEER • FULL STACK DEV
          </div>
        </div>

        {/* 3D Mario in Center */}
        <div className="relative py-2 flex items-center justify-center">
          <MarioCharacter state="idle" size={96} />
        </div>

        {/* The Exact Line Requested by User */}
        <div className="w-full bg-[#000000]/95 border-4 border-[#E52521] p-4 rounded-2xl shadow-[0_8px_30px_rgba(229,37,33,0.5)] animate-pulse">
          <div className="flex items-center justify-center gap-2 text-[#FCD116] mb-1.5">
            <Laptop size={20} className="text-[#FCD116]" />
            <span className="text-xs sm:text-sm font-bold tracking-wider">NOTICE</span>
          </div>
          
          <h2 className="text-xs sm:text-sm md:text-base text-yellow-300 font-bold leading-relaxed tracking-wide drop-shadow-[1px_1px_0_#000]">
            ★ OPEN IN LAPTOP FOR BETTER EXPERIENCE ★
          </h2>

          <p className="mt-2 text-[9px] sm:text-[10px] text-slate-300 font-pixel leading-normal">
            This interactive Super Mario portfolio requires a keyboard and large display for the authentic retro arcade gameplay.
          </p>
        </div>

        {/* Quick Contact Dossier for Mobile Recruiters & Visitors */}
        <div className="w-full bg-[#000000]/90 border-2 border-slate-700 rounded-xl p-3 shadow-lg">
          <div className="text-[10px] text-[#00E676] mb-2 font-bold">
            CONNECT WITH YASH:
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px]">
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 p-2 bg-blue-900/60 hover:bg-blue-800 border border-blue-500 rounded-lg text-white"
            >
              <Linkedin size={14} />
              <span>LINKEDIN</span>
            </a>
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 p-2 bg-slate-800 hover:bg-slate-700 border border-slate-500 rounded-lg text-white"
            >
              <Github size={14} />
              <span>GITHUB</span>
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="flex items-center justify-center gap-1.5 p-2 bg-red-900/60 hover:bg-red-800 border border-red-500 rounded-lg text-white"
            >
              <Mail size={14} />
              <span>EMAIL</span>
            </a>
          </div>
        </div>

      </main>

      {/* Ground & Brick Footer */}
      <footer className="w-full relative z-10 pt-2">
        <div className="w-full h-8 relative flex items-end justify-between px-6 pointer-events-none">
          <div className="w-20 h-10 bg-[#00A800] border-t-4 border-l-4 border-r-4 border-[#006800] rounded-t-full" />
          <div className="w-12 h-10 bg-[#00A800] border-4 border-[#004D00] rounded-t-sm" />
        </div>
        <div className="w-full h-8 bg-[#E45C10] border-t-4 border-[#943200] relative [background-image:linear-gradient(90deg,#943200_2px,transparent_2px),linear-gradient(0deg,#943200_2px,transparent_2px)] [background-size:24px_16px]">
          <div className="w-full h-1 bg-[#70D000]" />
        </div>
      </footer>

    </div>
  );
}
