import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../audio/soundEngine';
import { Trophy, Medal, Award, Sparkles, CheckCircle2, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AchievementsLevel() {
  const triggerCelebration = () => {
    sound.playTrophy();
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.7 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 120,
          origin: { y: 0.4 }
        });
      }, 250);
    } catch (e) {}
  };

  return (
    <section id="achievements" className="relative py-28 bg-[#070b14] text-white overflow-hidden border-t border-white/10">
      
      {/* Background Golden Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#FCD116]/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#E52521]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* World Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FCD116] px-5 py-2 rounded-full shadow-[0_0_25px_rgba(252,209,22,0.6)]">
            <Sparkles size={16} className="text-[#451A03]" />
            <span className="font-pixel text-xs text-[#451A03] uppercase tracking-widest font-black">
              WORLD 5-0
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-[#FCD116] tracking-tight drop-shadow-[0_4px_30px_rgba(252,209,22,0.4)]">
            LEVEL 5: ACHIEVEMENTS HALL
          </h2>
          <p className="text-lg sm:text-2xl text-slate-300 max-w-2xl mx-auto font-medium">
            Hackathon podium finishes, research convention awards, and verified credentials
          </p>
        </div>

        {/* FEATURED SPOTLIGHT: Medical Device Hackathon (MEDHA) Trophy */}
        <div 
          onClick={triggerCelebration}
          onMouseEnter={() => sound.playHover()}
          className="mb-16 shimmer-card bg-gradient-to-r from-amber-950/50 via-slate-900 to-amber-950/50 border-2 border-[#FCD116] rounded-3xl p-8 sm:p-14 shadow-[0_0_50px_rgba(252,209,22,0.3)] relative overflow-hidden cursor-pointer group"
          title="Click to celebrate victory with fanfare & confetti!"
        >
          {/* Rotating Sunburst Light Rays in Background */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] opacity-20 pointer-events-none animate-sunburst">
            <svg viewBox="0 0 200 200" className="w-full h-full fill-[#FCD116]">
              {[...Array(12)].map((_, i) => (
                <path
                  key={i}
                  d="M100 100 L90 0 L110 0 Z"
                  transform={`rotate(${i * 30} 100 100)`}
                />
              ))}
            </svg>
          </div>

          <div className="absolute top-0 right-0 bg-gradient-to-r from-[#E52521] to-[#DC2626] text-white text-xs sm:text-sm font-black px-6 py-2 rounded-bl-3xl uppercase tracking-wider shadow-lg">
            ★ FEATURED PODIUM HONORS ★
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Trophy Pedestal */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative mb-5 group-hover:scale-115 transition-transform duration-300">
                <div className="w-32 h-32 bg-gradient-to-br from-[#FFE600] via-[#FCD116] to-[#F59E0B] rounded-3xl flex items-center justify-center shadow-[0_0_35px_rgba(252,209,22,0.7)] border-2 border-white">
                  <Trophy size={68} className="text-[#451A03] drop-shadow" />
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-[#E52521] rounded-full border-2 border-white flex items-center justify-center font-black text-xs text-white shadow-xl">
                  3rd
                </div>
              </div>
              <span className="text-lg font-black text-[#FCD116] tracking-wide">
                MEDHA HACKATHON
              </span>
              <span className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                K. J. Somaiya School of Engineering, Mumbai
              </span>
            </div>

            {/* Description */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-block bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-extrabold text-xs sm:text-sm px-4 py-1 rounded-full shadow-sm">
                PODIUM FINISH: 3RD PRIZE (STATEWIDE)
              </div>
              <h3 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                Medical Device Hackathon (MEDHA)
              </h3>
              <p className="text-slate-200 text-base sm:text-xl leading-relaxed font-normal">
                Awarded 3rd place in this elite biomedical engineering hackathon organized by K. J. Somaiya School of Engineering in Mumbai. Demonstrated exceptional problem-solving, rapid medical tech prototyping, and interdisciplinary engineering.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#FCD116] font-bold">
                <span>⚡ Rapid Prototyping • Biomedical Tech • Pitching</span>
                <span className="text-emerald-400 font-extrabold flex items-center gap-1.5 animate-pulse">
                  <Sparkles size={16} /> Click card to celebrate!
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Other Hackathon & Research Trophies */}
        <div className="mb-20">
          <h3 className="text-xl sm:text-2xl font-black text-white mb-8 flex items-center gap-3">
            <Medal className="text-[#FCD116]" size={26} />
            COMPETITION ACHIEVEMENTS & DISTRICT HONORS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioData.achievements.slice(1).map((ach) => (
              <div
                key={ach.id}
                onClick={triggerCelebration}
                onMouseEnter={() => sound.playHover()}
                className="shimmer-card bg-slate-900/90 hover:bg-slate-900 border border-white/15 hover:border-[#FCD116] rounded-3xl p-7 sm:p-8 cursor-pointer transition-all duration-300 flex flex-col justify-between group shadow-2xl hover:scale-[1.02]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-[#FCD116] bg-slate-950 px-3.5 py-1.5 rounded-full border border-white/10">
                      {ach.place}
                    </span>
                    <Trophy size={24} className="text-[#FCD116] group-hover:scale-125 transition-transform" />
                  </div>

                  <h4 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#FCD116] transition-colors leading-snug">
                    {ach.title}
                  </h4>

                  <p className="text-base font-bold text-[#38BDF8] mt-1.5">
                    {ach.organizer}
                  </p>

                  <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed font-normal">
                    {ach.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-xs sm:text-sm font-bold text-emerald-400 flex items-center justify-between">
                  <span>{ach.skillsApplied}</span>
                  <Sparkles size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Certifications */}
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-white mb-8 flex items-center gap-3">
            <Award className="text-emerald-400" size={26} />
            VERIFIED INDUSTRY CERTIFICATIONS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioData.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="shimmer-card bg-slate-900/90 border border-white/15 rounded-3xl p-6 shadow-xl hover:border-emerald-500/60 hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#38BDF8] uppercase">
                    {cert.category}
                  </span>
                  <span className="text-xs font-extrabold bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
                    {cert.badge}
                  </span>
                </div>

                <h4 className="font-black text-lg sm:text-xl text-white leading-snug">
                  {cert.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-400 mt-4 pt-3 border-t border-white/10">
                  Issuer: <span className="text-slate-200 font-bold">{cert.issuer}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
