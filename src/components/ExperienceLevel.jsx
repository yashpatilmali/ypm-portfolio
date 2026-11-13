import React, { useState } from 'react';
import MarioCharacter from './MarioCharacter';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../audio/soundEngine';
import { Castle, Calendar, MapPin, CheckCircle2, Shield, Flame, Sparkles } from 'lucide-react';

export default function ExperienceLevel() {
  const [activeExpIndex, setActiveExpIndex] = useState(0);
  const activeExp = portfolioData.experience[activeExpIndex];

  return (
    <section id="experience" className="relative py-28 bg-[#090b14] text-white overflow-hidden border-t border-white/10">
      
      {/* Background Lava / Torch Ambient Glows */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#E52521]/15 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-[#F59E0B]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* World Header with Animated Torches */}
        <div className="text-center space-y-4 mb-16">
          <div className="flex items-center justify-center gap-4">
            {/* Left Animated Torch */}
            <div className="animate-torch text-amber-500 hidden sm:block">
              <Flame size={32} className="fill-amber-500" />
            </div>

            <div className="inline-flex items-center gap-2 bg-[#E52521] px-5 py-2 rounded-full shadow-[0_0_20px_rgba(229,37,33,0.5)]">
              <Sparkles size={14} className="text-[#FCD116]" />
              <span className="font-pixel text-xs text-white uppercase tracking-widest">
                WORLD 4-0
              </span>
            </div>

            {/* Right Animated Torch */}
            <div className="animate-torch text-amber-500 hidden sm:block">
              <Flame size={32} className="fill-amber-500" />
            </div>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight drop-shadow-[0_4px_25px_rgba(255,255,255,0.2)]">
            LEVEL 4: THE EXPERIENCE CASTLE
          </h2>
          <p className="text-lg sm:text-2xl text-slate-300 max-w-2xl mx-auto font-medium">
            Professional fortress checkpoints & industry engineering internships
          </p>
        </div>

        {/* Checkpoint Cards Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Mission Selectors (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs sm:text-sm font-extrabold text-[#FCD116] uppercase tracking-wider mb-2 flex items-center gap-2">
              <Castle size={20} />
              SELECT INTERNSHIP FORTRESS
            </div>

            {portfolioData.experience.map((exp, idx) => {
              const isActive = activeExpIndex === idx;

              return (
                <div
                  key={exp.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveExpIndex(idx);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`p-6 sm:p-7 rounded-3xl border cursor-pointer transition-all duration-300 relative ${
                    isActive
                      ? 'bg-slate-800/95 border-[#FCD116] shadow-[0_0_35px_rgba(252,209,22,0.3)] scale-[1.03]'
                      : 'bg-slate-900/60 border-white/10 hover:border-white/30 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-pixel text-[11px] text-[#FCD116] bg-slate-950 px-3 py-1 rounded-md border border-white/10">
                      {exp.world}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/20 px-3 py-0.5 rounded-full border border-emerald-500/30">
                      {exp.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                    {exp.role}
                  </h3>
                  <div className="text-base font-bold text-[#38BDF8] mt-1">
                    {exp.company}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-4 text-xs sm:text-sm text-slate-300 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={15} /> {exp.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={15} /> {exp.location}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Castle Mascot Card */}
            <div className="p-5 bg-slate-900/70 border border-white/10 rounded-3xl flex items-center gap-4 mt-6">
              <MarioCharacter state="idle" size={64} />
              <div className="text-xs sm:text-sm text-slate-200">
                <span className="text-[#FCD116] font-bold block mb-1">VERIFIED EXPERIENCE:</span>
                Both internships evaluated and completed with full technical commendation.
              </div>
            </div>
          </div>

          {/* Right Column: Mission Briefing Details (7 cols) */}
          <div className="shimmer-card lg:col-span-7 bg-slate-900/90 border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
            {/* Header */}
            <div className="border-b border-white/10 pb-6 mb-6">
              <div className="text-xs font-pixel text-[#FCD116] uppercase tracking-wide">
                MISSION BRIEFING // {activeExp.type}
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white mt-1">
                {activeExp.role}
              </h3>
              <p className="text-lg sm:text-xl font-bold text-[#38BDF8] mt-1">
                {activeExp.company}
              </p>
            </div>

            {/* Context */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-white/10 mb-6 text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              {activeExp.description}
            </div>

            {/* Responsibilities */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs sm:text-sm font-extrabold text-[#FCD116] uppercase tracking-wider flex items-center gap-2">
                <Shield size={18} className="text-emerald-400" />
                Key Deliverables & Responsibilities:
              </h4>

              <div className="space-y-3">
                {activeExp.responsibilities.map((resp, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-2xl border border-white/5">
                    <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      {resp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Weapons */}
            <div className="pt-6 border-t border-white/10">
              <span className="text-xs font-extrabold text-slate-400 block mb-3">
                TECHNOLOGIES EMPLOYED:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {activeExp.technologies.map((tech, tIdx) => (
                  <span key={tIdx} className="text-xs font-bold bg-rose-950/60 border border-rose-600/40 text-rose-300 px-3.5 py-1.5 rounded-xl shadow-sm">
                    ⚔️ {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
