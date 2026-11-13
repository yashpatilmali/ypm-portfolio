import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../audio/soundEngine';
import { Download, ExternalLink, X, FileText, CheckCircle, GraduationCap, Briefcase, Trophy, Code } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#0f172a] border-4 border-[#FCD116] rounded-xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl relative animate-bounceGentle overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-[#1e293b] px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E52521] rounded-lg border-2 border-white flex items-center justify-center text-white">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="font-pixel text-sm sm:text-base text-white font-bold">
                YASH MALI — CURRICULUM VITAE
              </h3>
              <p className="font-mono text-xs sm:text-sm text-[#FCD116]">
                Official Single Source of Truth
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              download="Yash_Mali_Resume.pdf"
              onClick={() => sound.playCoin()}
              className="px-4 py-2 bg-[#00A800] hover:bg-[#00c800] text-white font-pixel text-xs sm:text-sm font-bold rounded-lg border-2 border-white flex items-center gap-2 shadow-[0_2px_0_#005000] transition-colors"
            >
              <Download size={15} />
              <span>DOWNLOAD PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body / PDF & Interactive Resume */}
        <div className="p-6 overflow-y-auto space-y-6 text-white font-sans">
          
          {/* Quick PDF Viewer Box */}
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left font-mono text-xs text-gray-300">
              <span className="text-[#FCD116] font-bold block mb-1">
                ORIGINAL UPLOADED RESUME:
              </span>
              <span>Yash_Sahadev_Mali.pdf (Verified & Attached to Web Server)</span>
            </div>
            <div className="flex gap-2">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-mono rounded border border-slate-600 flex items-center gap-1"
              >
                <span>Open in Tab</span>
                <ExternalLink size={12} />
              </a>
              <a
                href="/resume.pdf"
                download="Yash_Mali_Resume.pdf"
                className="px-3 py-1.5 bg-[#E52521] hover:bg-[#ff3b37] text-xs font-mono rounded font-semibold text-white flex items-center gap-1"
              >
                <Download size={12} />
                <span>Download</span>
              </a>
            </div>
          </div>

          {/* Clean Printable Profile View */}
          <div className="bg-white text-slate-900 p-6 sm:p-8 rounded-lg shadow-lg font-sans text-sm space-y-5">
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-4 text-center">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                {portfolioData.personal.name}
              </h1>
              <div className="text-xs text-slate-700 font-mono mt-1 space-x-2">
                <span>{portfolioData.personal.phone}</span>
                <span>•</span>
                <span>{portfolioData.personal.email}</span>
                <span>•</span>
                <span>{portfolioData.personal.location}</span>
              </div>
              <div className="text-xs text-blue-700 font-mono mt-1 space-x-3">
                <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer" className="underline">
                  {portfolioData.personal.linkedinHandle}
                </a>
                <span>•</span>
                <a href={portfolioData.personal.github} target="_blank" rel="noreferrer" className="underline">
                  {portfolioData.personal.githubHandle}
                </a>
                <span>•</span>
                <a href={portfolioData.personal.portfolioUrl} target="_blank" rel="noreferrer" className="underline">
                  {portfolioData.personal.portfolioHandle}
                </a>
              </div>
            </div>

            {/* Summary */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Summary
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                {portfolioData.personal.summary}
              </p>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Education
              </h2>
              <div className="flex justify-between items-baseline text-xs font-bold text-slate-900">
                <span>{portfolioData.education.degree}</span>
                <span className="font-normal text-slate-600">{portfolioData.education.duration}</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-slate-700">
                <span>{portfolioData.education.college}</span>
                <span className="font-semibold text-slate-900">CGPA: {portfolioData.education.cgpa}</span>
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Experience
              </h2>
              <div className="space-y-3">
                {portfolioData.experience.map((exp, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{exp.role}</span>
                      <span className="font-normal text-slate-600">{exp.duration}</span>
                    </div>
                    <div className="text-slate-700 italic mb-1">
                      {exp.company} — {exp.location}
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                      {exp.responsibilities.map((r, ri) => (
                        <li key={ri}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Projects
              </h2>
              <div className="space-y-3">
                {portfolioData.projects.map((proj, pi) => (
                  <div key={pi} className="text-xs">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{proj.title} {proj.liveUrl && `(Live: ${proj.liveUrl})`}</span>
                      <span className="font-normal text-slate-600 font-mono">[{proj.tech.slice(0, 3).join(', ')}]</span>
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-700 mt-1">
                      {proj.highlights.map((h, hi) => (
                        <li key={hi}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Achievements & Awards
              </h2>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-700">
                {portfolioData.achievements.map((ach, ai) => (
                  <li key={ai}>
                    <strong className="text-slate-900">{ach.place}:</strong> {ach.title} ({ach.organizer})
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#1e293b] px-6 py-3 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-[#E52521] hover:bg-[#ff3b37] text-white font-pixel text-xs sm:text-sm font-bold rounded-lg border-2 border-white shadow-[0_2px_0_#800]"
          >
            CLOSE VIEWER
          </button>
        </div>

      </div>
    </div>
  );
}
