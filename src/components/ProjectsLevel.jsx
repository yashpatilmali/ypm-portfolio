import React, { useState } from 'react';
import MarioCharacter from './MarioCharacter';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../audio/soundEngine';
import { ExternalLink, Star, CheckCircle, Globe, Shield, Sparkles, MapPin, Compass } from 'lucide-react';
import { Github } from './BrandIcons';

export default function ProjectsLevel({ onCoinCollect }) {
  const [activeStageId, setActiveStageId] = useState("world-3-1");

  const scrollToStage = (id) => {
    sound.playPipe();
    setActiveStageId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="projects" className="relative py-28 bg-[#070d1a] text-white overflow-hidden border-t border-white/10">
      
      {/* Background Soft Ambient Lights */}
      <div className="absolute top-1/4 left-1/3 w-[650px] h-[650px] bg-[#059669]/15 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-[#38BDF8]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* World Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-[#059669] px-5 py-2 rounded-full shadow-[0_0_20px_rgba(5,150,105,0.5)]">
            <Sparkles size={14} className="text-[#FCD116]" />
            <span className="font-pixel text-xs text-white uppercase tracking-widest">
              WORLD 3-0
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-[#FCD116] tracking-tight drop-shadow-[0_4px_25px_rgba(252,209,22,0.3)]">
            LEVEL 3: WORLD MAP PROJECTS
          </h2>
          <p className="text-lg sm:text-2xl text-slate-300 max-w-2xl mx-auto font-medium">
            Explore software engineering stages across the realm. Click nodes to jump to stage!
          </p>

          {/* Interactive Overworld Map Navigation Bar */}
          <div className="max-w-3xl mx-auto mt-8 bg-slate-900/90 border-2 border-white/15 p-4 rounded-3xl shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-xs font-pixel text-[#FCD116] uppercase tracking-wider flex items-center gap-2">
                <Compass size={16} />
                OVERWORLD STAGE SELECT:
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">4 STAGES READY</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {portfolioData.projects.map((p) => {
                const isActive = activeStageId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => scrollToStage(p.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 border-white text-white shadow-[0_0_20px_rgba(16,185,129,0.5)] scale-105'
                        : 'bg-slate-950/70 border-white/10 text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-[10px] font-pixel text-[#FCD116] truncate">{p.world}</div>
                    <div className="font-extrabold text-xs sm:text-sm truncate mt-0.5">{p.title}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Project Stages Grid */}
        <div className="space-y-10">
          {portfolioData.projects.map((proj, idx) => {
            const isFeatured = idx === 0;

            return (
              <div
                key={proj.id}
                id={proj.id}
                onMouseEnter={() => sound.playHover()}
                className={`shimmer-card bg-slate-900/90 border rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl transition-all duration-300 relative ${
                  isFeatured
                    ? 'border-[#FCD116]/80 shadow-[0_0_40px_rgba(252,209,22,0.2)]'
                    : 'border-white/15 hover:border-white/40'
                }`}
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="font-pixel text-xs bg-slate-800 text-[#FCD116] px-3.5 py-1.5 rounded-lg border border-white/10 shadow-sm">
                        {proj.world}
                      </span>
                      <span className="text-xs font-extrabold bg-emerald-500/20 text-emerald-400 px-3.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        {proj.status}
                      </span>
                      {proj.badge && (
                        <span className="text-xs font-bold bg-[#E52521]/20 text-[#FF6B6B] px-3.5 py-1 rounded-full border border-[#E52521]/40 hidden sm:inline">
                          ★ {proj.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-black text-white mt-2">
                      {proj.title}
                    </h3>
                    <p className="text-base sm:text-lg font-bold text-[#38BDF8] mt-1">
                      {proj.tagline}
                    </p>
                  </div>

                  {/* High Contrast Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playCoin()}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-sm rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
                      >
                        <Globe size={18} />
                        <span>PLAY LIVE DEMO</span>
                        <ExternalLink size={16} />
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playClick()}
                        className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-sm rounded-xl border border-white/25 shadow-lg flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
                      >
                        <Github size={18} />
                        <span>GITHUB REPO</span>
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                  {proj.description}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#FCD116] uppercase tracking-wider flex items-center gap-2">
                    <Star size={18} className="fill-[#FCD116]" />
                    Key Deliverables & System Architecture:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {proj.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="bg-slate-950/75 border border-white/5 p-4 rounded-2xl flex items-start gap-3.5">
                        <CheckCircle size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-extrabold text-slate-400 mr-2">TECH STACK:</span>
                  {proj.tech.map((t, tIdx) => (
                    <span key={tIdx} className="text-xs font-bold bg-blue-950/60 border border-blue-600/40 text-blue-300 px-3.5 py-1.5 rounded-xl shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
