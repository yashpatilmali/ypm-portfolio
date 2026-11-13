import React, { useState } from 'react';
import MarioCharacter from './MarioCharacter';
import InteractiveCoinBlock from './InteractiveCoinBlock';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../audio/soundEngine';
import { Play, Download, MapPin, GraduationCap, Code2, Sparkles, ChevronDown } from 'lucide-react';

export default function HeroSection({ onStartJourney, onOpenResume, onCoinCollect }) {
  const [marioState, setMarioState] = useState('standing');
  const [marioQuote, setMarioQuote] = useState("Let's-a Go! Explore my tech realm!");

  const handleMarioClick = () => {
    sound.playJump();
    setMarioState('jumping');
    setMarioQuote("Super Jump! Full stack power activated!");
    setTimeout(() => {
      setMarioState('celebrating');
      setTimeout(() => setMarioState('standing'), 900);
    }, 450);
  };

  const handleStartJourneyClick = () => {
    sound.playJump();
    setMarioState('jumping');
    setTimeout(() => {
      sound.playPipe();
      setMarioState('running');
      setTimeout(() => {
        onStartJourney();
        setMarioState('standing');
      }, 400);
    }, 350);
  };

  return (
    <section id="hero" className="relative min-h-[96vh] pt-28 pb-20 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#0b1b3d] via-[#0d2757] to-[#070b14]">
      
      {/* Dynamic Animated Ambient Lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-[#E52521]/20 rounded-full blur-[160px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-[550px] h-[550px] bg-[#38BDF8]/20 rounded-full blur-[160px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#FCD116]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Parallax Moving Clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-16 left-0 animate-drift-slow">
          <svg width="180" height="60" viewBox="0 0 40 16" fill="white" className="drop-shadow-lg">
            <rect x="10" y="2" width="20" height="12" rx="4" />
            <rect x="4" y="6" width="32" height="8" rx="3" />
          </svg>
        </div>
        <div className="absolute top-36 left-0 animate-drift-medium" style={{ animationDelay: '-15s' }}>
          <svg width="220" height="70" viewBox="0 0 40 16" fill="white" className="drop-shadow-lg">
            <rect x="10" y="2" width="20" height="12" rx="4" />
            <rect x="4" y="6" width="32" height="8" rx="3" />
          </svg>
        </div>
      </div>

      {/* Floating Clickable Golden Coins in Sky */}
      <div className="absolute top-28 right-1/3 hidden lg:flex items-center gap-6 z-10">
        {[1, 2, 3].map((coinIndex) => (
          <div
            key={coinIndex}
            onClick={() => {
              sound.playCoin();
              onCoinCollect();
            }}
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#EAB308] via-[#FDE047] to-[#CA8A04] border-2 border-white shadow-[0_0_15px_rgba(253,224,71,0.8)] flex items-center justify-center cursor-pointer hover:scale-125 transition-transform animate-bounce-gentle select-none"
            style={{ animationDelay: `${coinIndex * 0.4}s` }}
            title="Collect sky coin!"
          >
            <span className="text-xs font-black text-[#713F12]">$</span>
          </div>
        ))}
      </div>

      {/* Main Content Hero Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full z-10 my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Mission Briefing Card */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Player Greeting Badge */}
            <div className="inline-flex items-center gap-2.5 bg-slate-900/90 border border-[#FCD116]/60 px-4 py-2 rounded-full shadow-[0_0_20px_rgba(252,209,22,0.3)] backdrop-blur-xl">
              <span className="w-2.5 h-2.5 bg-[#10B981] rounded-full animate-ping" />
              <span className="font-pixel text-xs text-[#FCD116] tracking-wider uppercase">
                HELLO, PLAYER 01!
              </span>
            </div>

            {/* Main Name Header */}
            <div>
              <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight leading-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                I'M <span className="text-[#FCD116] drop-shadow-[0_0_35px_rgba(252,209,22,0.5)]">YASH MALI</span>
              </h1>
              
              <div className="mt-3 inline-block bg-gradient-to-r from-[#E52521] to-[#DC2626] text-white px-4 py-1.5 rounded-xl font-bold text-sm sm:text-base tracking-wide shadow-lg border border-white/20">
                Computer Science Engineering Student
              </div>
            </div>

            {/* Subtitle & Role */}
            <p className="text-xl sm:text-2xl font-extrabold text-slate-100">
              Full Stack Developer <span className="text-[#E52521]">•</span> Creative Problem Solver
            </p>

            {/* Shimmering Quote Card */}
            <div className="shimmer-card bg-slate-900/80 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 max-w-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-pixel text-[#38BDF8] uppercase tracking-wider">
                  MISSION STATEMENT
                </span>
                <Sparkles size={16} className="text-[#FCD116] animate-pulse" />
              </div>
              <p className="text-slate-200 text-lg sm:text-xl font-medium italic leading-relaxed">
                "{portfolioData.personal.subtitle}"
              </p>

              {/* Quick Resume Highlights */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-3 text-xs sm:text-sm font-semibold text-slate-300">
                <span className="flex items-center gap-1.5 bg-slate-800/90 px-3.5 py-1.5 rounded-xl border border-white/10 shadow-sm">
                  <GraduationCap size={16} className="text-[#38BDF8]" /> SSGMCE (CGPA: 7.73)
                </span>
                <span className="flex items-center gap-1.5 bg-slate-800/90 px-3.5 py-1.5 rounded-xl border border-white/10 shadow-sm">
                  <MapPin size={16} className="text-[#E52521]" /> Shegaon, MH
                </span>
                <span className="flex items-center gap-1.5 bg-slate-800/90 px-3.5 py-1.5 rounded-xl border border-white/10 shadow-sm">
                  <Code2 size={16} className="text-[#FCD116]" /> 2 Full Stack Internships
                </span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={handleStartJourneyClick}
                onMouseEnter={() => sound.playHover()}
                className="group relative px-8 py-4 bg-gradient-to-r from-[#E52521] via-[#EF4444] to-[#DC2626] hover:from-[#EF4444] hover:to-[#B91C1C] text-white font-extrabold text-base tracking-wider uppercase rounded-2xl border-2 border-white/40 shadow-[0_0_30px_rgba(229,37,33,0.6)] hover:shadow-[0_0_45px_rgba(229,37,33,0.9)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-3"
              >
                <Play size={18} className="fill-white" />
                <span>START MY JOURNEY</span>
                <ChevronDown size={18} className="animate-bounce" />
              </button>

              <button
                onClick={onOpenResume}
                onMouseEnter={() => sound.playHover()}
                className="group px-8 py-4 bg-gradient-to-r from-[#FCD116] to-[#F59E0B] hover:from-[#FDE047] hover:to-[#D97706] text-[#451A03] font-extrabold text-base tracking-wider uppercase rounded-2xl shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:shadow-[0_0_35px_rgba(245,158,11,0.8)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-3"
              >
                <Download size={18} />
                <span>DOWNLOAD RESUME</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Mario Avatar Stage */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Overhead Interactive Question Mystery Blocks */}
            <div className="flex items-center gap-6 mb-8">
              <InteractiveCoinBlock onCoinCollect={onCoinCollect} label="?" size={56} />
              <div className="w-14 h-14 bg-[#B84418] border-2 border-[#7C2D12] rounded-xl shadow-xl flex items-center justify-center font-black text-white/50 text-base">
                #
              </div>
              <InteractiveCoinBlock onCoinCollect={onCoinCollect} label="★" size={56} />
            </div>

            {/* Mario Platform Stage with Glowing Pedestal */}
            <div className="relative flex flex-col items-center">
              
              {/* Animated Speech Bubble */}
              <div className="mb-4 bg-white text-slate-900 px-4 py-2.5 rounded-2xl border-2 border-black font-extrabold text-xs shadow-2xl animate-bounce-gentle relative">
                {marioQuote}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-white" />
              </div>

              {/* Glowing Aura Behind Mario */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#FCD116]/25 rounded-full blur-2xl pointer-events-none animate-pulse" />

              {/* Mario Avatar */}
              <div 
                onClick={handleMarioClick}
                className="transform transition-transform hover:scale-110 active:scale-95 cursor-pointer filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] relative z-10"
                title="Click Mario to make him jump!"
              >
                <MarioCharacter state={marioState} size={160} />
              </div>

              {/* High-Tech Glowing Pedestal */}
              <div className="w-56 h-10 bg-gradient-to-r from-[#C2410C] via-[#EA580C] to-[#C2410C] border-2 border-[#7C2D12] rounded-xl shadow-[0_10px_30px_rgba(234,88,12,0.4)] mt-2 flex items-center justify-around px-4">
                <span className="w-2.5 h-2.5 bg-[#10B981] rounded-full animate-ping" />
                <span className="font-pixel text-[11px] text-white font-black tracking-widest">WORLD 1-0</span>
                <span className="w-2.5 h-2.5 bg-[#10B981] rounded-full animate-ping" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Ground & Warp Pipe Layer */}
      <div className="w-full relative z-10">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-end pointer-events-none">
          {/* Green Hills */}
          <div className="w-44 h-24 bg-gradient-to-t from-[#047857] to-[#059669] rounded-t-full relative hidden sm:block shadow-xl">
            <div className="w-24 h-12 bg-[#047857] rounded-t-full absolute bottom-0 left-2" />
          </div>

          {/* Interactive Warp Pipe with Pulsing Entry Glow */}
          <div 
            onClick={handleStartJourneyClick}
            className="w-32 h-24 bg-gradient-to-r from-[#065F46] via-[#059669] to-[#047857] border-4 border-[#064E3B] rounded-t-lg relative shadow-[0_0_30px_rgba(5,150,105,0.5)] pointer-events-auto cursor-pointer group transition-transform hover:-translate-y-2"
            title="Warp down to Level 1: About Me"
          >
            <div className="w-36 -left-2 h-9 bg-gradient-to-r from-[#065F46] via-[#059669] to-[#047857] border-4 border-[#064E3B] absolute -top-6 rounded-md flex items-center justify-center shadow-lg">
              <span className="font-bold text-xs text-white group-hover:text-[#FCD116] tracking-widest flex items-center gap-1.5">
                WARP ↓
              </span>
            </div>
            <div className="w-3 h-full bg-[#34D399] absolute left-3 opacity-80" />
            <div className="w-3 h-full bg-[#064E3B] absolute right-3 opacity-80" />
          </div>
        </div>

        {/* Mario Ground Strip */}
        <div className="w-full h-12 bg-[#C2410C] border-t-4 border-[#7C2D12] relative shadow-2xl">
          <div className="w-full h-2.5 bg-[#10B981] shadow-inner" />
        </div>
      </div>
    </section>
  );
}
