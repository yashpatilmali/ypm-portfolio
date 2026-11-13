import React, { useState } from 'react';
import MarioCharacter from './MarioCharacter';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../audio/soundEngine';
import { Mail, Phone, MapPin, Globe, Send, CheckCircle2, Flag } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import confetti from 'canvas-confetti';

export default function ContactLevel() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [marioState, setMarioState] = useState('standing');

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playVictory();
    setSubmitted(true);
    setMarioState('celebrating');

    try {
      confetti({
        particleCount: 130,
        spread: 90,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 90,
          spread: 120,
          origin: { y: 0.4 }
        });
      }, 350);
    } catch (err) {}
  };

  return (
    <section id="contact" className="relative py-24 bg-[#070b14] text-white overflow-hidden border-t border-white/10">
      
      {/* Background Red Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#E52521]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* World Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 bg-[#E52521] px-4 py-1.5 rounded-full shadow-lg">
            <span className="font-pixel text-xs text-white uppercase tracking-widest font-bold">
              WORLD 8-4: FINAL LEVEL
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#FCD116] tracking-tight">
            LEVEL FINAL: LET'S BUILD SOMETHING AMAZING
          </h2>
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium">
            You reached the castle! Send a transmission to team up with Yash Mali for your next project or role.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact & Social Transmissions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/80 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
              <div className="text-xs font-pixel text-[#FCD116] uppercase tracking-wider mb-6 flex items-center gap-2">
                <Flag size={18} />
                DIRECT TRANSMISSIONS
              </div>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/70 hover:bg-slate-800 border border-white/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E52521]/20 border border-[#E52521]/40 flex items-center justify-center shrink-0">
                    <Mail size={22} className="text-[#E52521]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-400">EMAIL</div>
                    <div className="text-white font-bold text-sm sm:text-base truncate group-hover:text-[#FCD116]">
                      {portfolioData.personal.email}
                    </div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${portfolioData.personal.phone}`}
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/70 hover:bg-slate-800 border border-white/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <Phone size={22} className="text-emerald-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-400">PHONE</div>
                    <div className="text-white font-bold text-sm sm:text-base truncate group-hover:text-[#FCD116]">
                      {portfolioData.personal.phone}
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/70 border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center shrink-0">
                    <MapPin size={22} className="text-[#38BDF8]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400">LOCATION</div>
                    <div className="text-white font-bold text-sm sm:text-base">
                      {portfolioData.personal.location}
                    </div>
                  </div>
                </div>

                {/* Social Profiles */}
                <div className="pt-2 grid grid-cols-3 gap-3">
                  <a
                    href={portfolioData.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="p-3.5 rounded-2xl bg-slate-950/70 hover:bg-[#0077b5] border border-white/10 flex flex-col items-center justify-center text-center transition-colors group"
                  >
                    <Linkedin size={22} className="text-[#38BDF8] group-hover:text-white" />
                    <span className="text-xs font-bold mt-1 text-slate-300 group-hover:text-white">LINKEDIN</span>
                  </a>

                  <a
                    href={portfolioData.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="p-3.5 rounded-2xl bg-slate-950/70 hover:bg-slate-800 border border-white/10 flex flex-col items-center justify-center text-center transition-colors group"
                  >
                    <Github size={22} className="text-slate-200 group-hover:text-white" />
                    <span className="text-xs font-bold mt-1 text-slate-300 group-hover:text-white">GITHUB</span>
                  </a>

                  <a
                    href={portfolioData.personal.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="p-3.5 rounded-2xl bg-slate-950/70 hover:bg-[#E52521] border border-white/10 flex flex-col items-center justify-center text-center transition-colors group"
                  >
                    <Globe size={22} className="text-[#FCD116] group-hover:text-white" />
                    <span className="text-xs font-bold mt-1 text-slate-300 group-hover:text-white">PORTFOLIO</span>
                  </a>
                </div>

              </div>
            </div>

            {/* Mario Completion Greeting */}
            <div className="p-5 bg-slate-900/60 border border-white/10 rounded-3xl flex items-center gap-4">
              <MarioCharacter state={marioState} size={70} />
              <div className="text-xs sm:text-sm text-slate-300 font-medium">
                <span className="text-emerald-400 font-bold block text-sm">MISSION ACCOMPLISHED!</span>
                Thank you for playing Yash Mali's developer journey quest.
              </div>
            </div>
          </div>

          {/* Right Column: Clean High-Conversion Dispatch Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2.5">
              <Send size={20} className="text-[#FCD116]" />
              DISPATCH NEW QUEST / MESSAGE
            </h3>
            <p className="text-sm text-slate-300 mb-6 font-normal">
              Have an opening, internship opportunity, or engineering project? Send a direct dispatch:
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-4 bg-slate-950/80 border-2 border-emerald-500 rounded-2xl p-6">
                <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-2xl font-black text-[#FCD116]">
                  STAGE CLEAR! MESSAGE TRANSMITTED!
                </h4>
                <p className="text-slate-300 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                  Thank you for reaching out, Player! Yash will respond to your transmission promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#E52521] text-white font-bold text-sm rounded-xl"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Vance / Tech Recruiter"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FCD116] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="player@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FCD116] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                    Subject / Quest Topic *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Stack Opportunity / Technical Project"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FCD116] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                    Message Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your role requirements, team details, or project scope..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FCD116] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => sound.playHover()}
                  className="w-full py-4 bg-gradient-to-r from-[#E52521] via-[#EF4444] to-[#DC2626] hover:from-[#EF4444] hover:to-[#B91C1C] text-white font-extrabold text-base tracking-wider uppercase rounded-xl border border-white/30 shadow-[0_4px_25px_rgba(229,37,33,0.5)] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-3"
                >
                  <Send size={18} />
                  <span>DISPATCH MESSAGE TO YASH</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-white/10 text-center text-xs text-slate-400 space-y-2">
        <p className="text-[#FCD116] font-bold text-sm">
          ★ YASH MALI — THE DEVELOPER QUEST ★
        </p>
        <p className="text-slate-500 font-normal">
          Designed with React 18, Vite, Tailwind CSS & Web Audio API • All Qualifications Verified from Official Resume
        </p>
      </footer>
    </section>
  );
}
