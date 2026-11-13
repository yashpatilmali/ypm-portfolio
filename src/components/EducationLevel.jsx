import React from 'react';
import MarioCharacter from './MarioCharacter';
import { portfolioData } from '../data/portfolioData';
import { GraduationCap, MapPin, Calendar, CheckCircle2, Star } from 'lucide-react';

export default function EducationLevel() {
  const edu = portfolioData.education;

  return (
    <section id="education" className="relative py-24 bg-[#0a101f] text-white overflow-hidden border-t border-white/10">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#38BDF8]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* World Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 bg-[#38BDF8] px-4 py-1.5 rounded-full shadow-lg">
            <span className="font-pixel text-xs text-slate-950 uppercase tracking-widest font-bold">
              WORLD 6-0
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            LEVEL 6: EDUCATION WORLD
          </h2>
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium">
            Engineering foundation & university academic milestones
          </p>
        </div>

        {/* Education Platform Stage */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900/80 border border-white/15 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            
            {/* CGPA Badge Top Right */}
            <div className="absolute top-0 right-0 bg-[#FCD116] text-[#451A03] font-bold text-xs sm:text-sm px-6 py-2 rounded-bl-3xl shadow-lg">
              CGPA: {edu.cgpa}
            </div>

            {/* Institution Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-8">
              <div className="w-16 h-16 bg-blue-500/20 border border-blue-500/40 rounded-2xl flex items-center justify-center shrink-0 text-[#38BDF8]">
                <GraduationCap size={36} />
              </div>
              <div>
                <span className="text-xs font-bold text-[#FCD116] uppercase tracking-wider">
                  {edu.status}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {edu.degree}
                </h3>
                <p className="text-base sm:text-lg font-bold text-[#38BDF8]">
                  Branch: {edu.branch}
                </p>
              </div>
            </div>

            {/* College & Location Card */}
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-white/10 mb-8 space-y-3">
              <div className="text-lg sm:text-xl font-bold text-white">
                {edu.college}
              </div>
              <div className="flex flex-wrap gap-5 text-sm font-medium text-slate-300">
                <span className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#E52521]" /> {edu.location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#FCD116]" /> {edu.duration}
                </span>
              </div>
            </div>

            {/* University Milestones Highlights */}
            <h4 className="text-xs sm:text-sm font-bold text-[#FCD116] uppercase tracking-wider mb-5 flex items-center gap-2">
              <Star size={16} className="fill-[#FCD116]" />
              Academic Highlights & Campus Leadership:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {edu.highlights.map((item, idx) => (
                <div key={idx} className="bg-slate-950/50 border border-white/5 p-4 rounded-2xl flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-200 leading-relaxed font-normal">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer summary */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-slate-400 font-medium">
              <span>🏛️ Department of Computer Science & Engineering</span>
              <span className="text-emerald-400 font-bold">STAGE COMPLETED ★★★</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
