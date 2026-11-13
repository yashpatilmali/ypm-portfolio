import React, { useState } from 'react';
import MarioCharacter from './MarioCharacter';
import InteractiveCoinBlock from './InteractiveCoinBlock';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../audio/soundEngine';
import { BookOpen, Users, Terminal, CheckCircle2, Heart, Zap, Sparkles } from 'lucide-react';

export default function AboutLevel({ onCoinCollect }) {
  const [marioState, setMarioState] = useState('idle');
  const [speechIndex, setSpeechIndex] = useState(0);
  const [xp, setXp] = useState(2450);

  const speeches = [
    "It's-a me, Yash! Welcome to World 1-1!",
    "Two full-stack internships completed with excellence!",
    "Built SSGMCE's official alumni portal and exam portal!",
    "Ready to build high-performance scalable systems!"
  ];

  const handleMarioClick = () => {
    sound.playJump();
    setMarioState('celebrating');
    setSpeechIndex((prev) => (prev + 1) % speeches.length);
    setXp((prev) => prev + 50);
    setTimeout(() => setMarioState('idle'), 1000);
  };

  return (
    <section id="about" className="relative py-28 bg-[#070b14] text-white overflow-hidden border-t border-white/10">
      
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#E52521]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#38BDF8]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* World Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-[#E52521] px-5 py-2 rounded-full shadow-[0_0_20px_rgba(229,37,33,0.5)]">
            <Sparkles size={14} className="text-[#FCD116] animate-pulse" />
            <span className="font-pixel text-xs text-white uppercase tracking-widest">
              WORLD 1-1
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-[#FCD116] tracking-tight drop-shadow-[0_4px_25px_rgba(252,209,22,0.3)]">
            LEVEL 1: THE DEVELOPER
          </h2>
          <p className="text-lg sm:text-2xl text-slate-300 max-w-2xl mx-auto font-medium">
            Engineering Origin & Character Status Sheet
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Mario Interactive Companion Profile */}
          <div className="lg:col-span-4 bg-slate-900/90 border-2 border-[#38BDF8]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative backdrop-blur-2xl">
            
            {/* Top Status Bar with Heart Containers */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((heart) => (
                  <Heart
                    key={heart}
                    size={20}
                    className="fill-[#E52521] text-[#E52521] animate-pulse"
                    style={{ animationDelay: `${heart * 0.2}s` }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#FCD116]">
                <Zap size={14} />
                <span>{xp} XP</span>
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              
              {/* Dynamic Speech Bubble */}
              <div className="w-full bg-white text-slate-900 p-4 rounded-2xl border-2 border-black font-extrabold text-sm leading-snug shadow-xl mb-6 relative">
                "{speeches[speechIndex]}"
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-white" />
              </div>

              {/* Mario Avatar */}
              <div 
                onClick={handleMarioClick} 
                className="cursor-pointer my-2 transform hover:scale-110 active:scale-95 transition-transform"
                title="Click Mario to hear more and gain XP!"
              >
                <MarioCharacter state={marioState} size={120} />
              </div>

              <div className="text-xs font-mono text-slate-400 mt-2">
                ★ Click Mario to talk & gain XP (+50)
              </div>

              {/* Character Stats Sheet */}
              <div className="w-full mt-6 space-y-3.5 text-left border-t border-white/10 pt-5 text-sm sm:text-base">
                <div className="flex justify-between items-center">
                  <span className="text-[#FCD116] font-bold">CLASS:</span>
                  <span className="text-white font-semibold">Full Stack Engineer</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#38BDF8] font-bold">ENERGY / HP:</span>
                  <span className="text-emerald-400 font-bold">100% READY</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#E52521] font-bold">SPECIALTY:</span>
                  <span className="text-white">React.js & Node.js</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#FCD116] font-bold">LEADERSHIP:</span>
                  <span className="text-white font-semibold">CSESA President</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High Readability Executive & Academic Dossier */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Executive Summary Card with Shimmer */}
            <div className="shimmer-card bg-slate-900/90 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
                <Terminal className="text-[#FCD116]" size={26} />
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                  EXECUTIVE SUMMARY
                </h3>
              </div>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                {portfolioData.personal.summary}
              </p>
            </div>

            {/* Academic Checkpoint Card */}
            <div className="shimmer-card bg-slate-900/90 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="text-emerald-400" size={26} />
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                    ACADEMIC CHECKPOINT
                  </h3>
                </div>
                <span className="text-xs sm:text-sm font-extrabold bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 px-4 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  CGPA: {portfolioData.education.cgpa}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl font-bold text-white">
                  {portfolioData.education.degree}
                </h4>
                <p className="text-base sm:text-lg font-semibold text-[#38BDF8]">
                  {portfolioData.education.college}
                </p>
                <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-slate-400 pt-1">
                  <span>📍 {portfolioData.education.location}</span>
                  <span>📅 {portfolioData.education.duration}</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {portfolioData.education.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-slate-950/70 p-3.5 rounded-2xl border border-white/5">
                    <CheckCircle2 size={20} className="text-[#FCD116] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-200 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Leadership & Activities */}
            <div className="shimmer-card bg-slate-900/90 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-5">
                <Users className="text-[#E52521]" size={26} />
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                  LEADERSHIP MISSIONS & SERVICE
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {portfolioData.leadership.map((item, idx) => (
                  <div key={idx} className="bg-slate-950/80 hover:bg-slate-800 border border-white/10 rounded-2xl p-4 transition-colors">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-[#FCD116] font-bold">{item.role}</span>
                      <span className="text-slate-400 text-xs">{item.duration}</span>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white mt-1">
                      {item.organization}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
