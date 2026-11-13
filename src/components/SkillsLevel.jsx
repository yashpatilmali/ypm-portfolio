import React, { useState } from 'react';
import { PowerUpIcon } from './PowerUpIcons';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../audio/soundEngine';
import { Sparkles, Check, Zap, Flame, Shield, Award } from 'lucide-react';

export default function SkillsLevel({ onCoinCollect }) {
  const [selectedSkill, setSelectedSkill] = useState(portfolioData.skills[0].items[0]);
  const [collectedSkills, setCollectedSkills] = useState(new Set(["React.js", "JavaScript (ES6+)", "Node.js"]));
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [pickupAlert, setPickupAlert] = useState(null);

  const allSkills = portfolioData.skills.flatMap((cat) => cat.items);
  const totalSkillsCount = allSkills.length;

  const handleSelectSkill = (skill) => {
    sound.playPowerUp();
    setSelectedSkill(skill);

    if (!collectedSkills.has(skill.name)) {
      setCollectedSkills((prev) => new Set([...prev, skill.name]));
      onCoinCollect();
      setPickupAlert(`UNLOCKED: ${skill.powerup}!`);
      setTimeout(() => setPickupAlert(null), 1800);
    }
  };

  return (
    <section id="skills" className="relative py-28 bg-[#091021] text-white overflow-hidden border-t border-white/10">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-[#FCD116]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#059669]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* World Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FCD116] px-5 py-2 rounded-full shadow-[0_0_25px_rgba(252,209,22,0.5)]">
            <Sparkles size={14} className="text-[#451A03]" />
            <span className="font-pixel text-xs text-[#451A03] uppercase tracking-widest font-black">
              WORLD 2-1
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight drop-shadow-[0_4px_25px_rgba(255,255,255,0.2)]">
            LEVEL 2: POWER-UP VAULT
          </h2>
          <p className="text-lg sm:text-2xl text-slate-300 max-w-2xl mx-auto font-medium">
            Collect power-up items to inspect full-stack developer capabilities
          </p>

          {/* Clean Inventory Progress */}
          <div className="max-w-md mx-auto mt-6 bg-slate-900/90 border border-white/15 p-4 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-semibold shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-[#FCD116] animate-pulse" />
              <span className="text-slate-300">COLLECTED ITEMS:</span>
              <span className="text-emerald-400 font-extrabold text-base">{collectedSkills.size} / {totalSkillsCount}</span>
            </div>
            <div className="w-36 bg-slate-950 rounded-full h-3.5 overflow-hidden border border-white/10 p-0.5">
              <div 
                className="bg-gradient-to-r from-emerald-500 via-teal-400 to-[#10B981] h-full transition-all duration-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                style={{ width: `${(collectedSkills.size / totalSkillsCount) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {portfolioData.skills.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                sound.playClick();
                setActiveCategoryIndex(idx);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-6 py-3 rounded-2xl text-sm sm:text-base font-extrabold tracking-wide transition-all cursor-pointer border ${
                activeCategoryIndex === idx
                  ? 'bg-gradient-to-r from-[#E52521] to-[#DC2626] border-white/40 text-white shadow-[0_0_25px_rgba(229,37,33,0.5)] scale-105'
                  : 'bg-slate-900/80 border-white/10 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Power-Up Grid (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm sm:text-base font-extrabold text-[#FCD116] uppercase tracking-wider flex items-center gap-2">
                <Sparkles size={18} />
                {portfolioData.skills[activeCategoryIndex].category} Items
              </h3>
              {pickupAlert && (
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/40 animate-pulse">
                  {pickupAlert}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portfolioData.skills[activeCategoryIndex].items.map((skill) => {
                const isSelected = selectedSkill.name === skill.name;
                const isCollected = collectedSkills.has(skill.name);

                return (
                  <div
                    key={skill.name}
                    onClick={() => handleSelectSkill(skill)}
                    onMouseEnter={() => sound.playHover()}
                    className={`relative p-5 rounded-2xl border cursor-pointer transition-all duration-300 group flex items-center gap-4 ${
                      isSelected
                        ? 'bg-slate-800 border-[#FCD116] shadow-[0_0_30px_rgba(252,209,22,0.35)] scale-[1.03]'
                        : 'bg-slate-950/70 border-white/10 hover:border-white/30 hover:bg-slate-900/90 hover:scale-[1.01]'
                    }`}
                  >
                    {/* Glowing Icon Container */}
                    <div className="relative shrink-0 w-16 h-16 bg-slate-950 border-2 border-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                      <PowerUpIcon type={skill.icon} size={40} />
                      {isCollected && (
                        <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-[0_0_10px_rgba(16,185,129,0.9)]">
                          <Check size={14} className="text-white font-extrabold" />
                        </div>
                      )}
                    </div>

                    {/* Skill Info */}
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-[#FCD116] tracking-wide uppercase truncate">
                        {skill.powerup}
                      </div>
                      <div className="font-extrabold text-base sm:text-lg text-white truncate group-hover:text-[#38BDF8] transition-colors">
                        {skill.name}
                      </div>
                      <div className="text-xs font-mono text-slate-400 mt-1">
                        {isCollected ? '★ UNLOCKED' : 'CLICK TO COLLECT'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Power-Up Inspector (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-[#FCD116]/60 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            <div className="absolute -top-3 right-6 bg-[#E52521] text-white px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-lg">
              POWER-UP STATS
            </div>

            {/* Large Preview with Rotating Ambient Aura */}
            <div className="flex flex-col items-center text-center pb-6 border-b border-white/10 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#FCD116]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="w-28 h-28 bg-slate-950 border-2 border-white/25 rounded-3xl flex items-center justify-center shadow-2xl my-3 animate-bounce-gentle relative z-10">
                <PowerUpIcon type={selectedSkill.icon} size={72} />
              </div>

              <span className="text-xs font-extrabold text-[#FCD116] uppercase tracking-widest mt-1">
                {selectedSkill.powerup}
              </span>
              <h4 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {selectedSkill.name}
              </h4>
            </div>

            {/* Description */}
            <div className="py-6 space-y-5 leading-relaxed">
              <div className="text-slate-200 text-base sm:text-lg bg-slate-950/80 p-5 rounded-2xl border border-white/10 font-normal">
                {selectedSkill.description}
              </div>

              {/* Power Mastery Rating */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between text-xs sm:text-sm font-extrabold">
                  <span className="text-slate-400">PROFICIENCY LEVEL:</span>
                  <span className="text-[#FCD116] font-mono text-base">{selectedSkill.level} / 100</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-4 overflow-hidden border border-white/10 p-0.5 shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-[#E52521] via-[#F59E0B] to-[#FCD116] rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(252,209,22,0.8)]"
                    style={{ width: `${selectedSkill.level}%` }}
                  />
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
