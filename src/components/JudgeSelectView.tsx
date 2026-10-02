import React from 'react';
import { useHackathon } from '../context/HackathonContext';
import { Shield, CheckCircle2, User, Sparkles, Terminal } from 'lucide-react';

export const JudgeSelectView: React.FC = () => {
  const { judges, loginAsJudge, toggleAdminMode, problemStatements, getProblemStatementStatus } = useHackathon();

  return (
    <div className="min-h-screen bg-[#12090b] text-[#fffbf5] flex flex-col justify-center items-center px-4 py-10 bvb-tech-grid relative overflow-hidden">
      
      {/* Subtle background ambient cyber glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full relative z-10">
        
        {/* Hero Logo & Branding */}
        <div className="text-center mb-8">
          
          {/* Exact BvB Logo Image */}
          <div className="inline-block relative p-1 rounded-2xl bg-gradient-to-r from-purple-600 via-amber-400 to-orange-500 shadow-2xl shadow-orange-500/20 mb-3 sm:mb-4 bvb-hud-corner">
            <img
              src="/bvb_logo.jpg"
              alt="BvB Build vs Break Logo"
              className="h-16 sm:h-24 md:h-28 w-auto rounded-xl object-contain bg-[#160c0e]"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-2">
            <span className="text-[10px] sm:text-[11px] font-orbitron font-bold tracking-widest text-orange-400 uppercase bg-orange-950/60 border border-orange-700/50 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
              BUILD vs BREAK HACKATHON
            </span>
            <span className="text-[10px] sm:text-[11px] font-orbitron font-bold tracking-widest text-purple-300 uppercase bg-purple-950/60 border border-purple-700/50 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
              CYBER EVALUATION CORE
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-orbitron font-black text-white tracking-wider glow-purple mt-1 sm:mt-2">
            BVB EVALUATION
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-lg mx-auto font-sans leading-relaxed">
            Select your assigned judge profile to enter the evaluation terminal. Side-by-side simultaneous scoring enabled.
          </p>
        </div>

        {/* 8 Futuristic Cyber Judge Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {judges.map((judge, idx) => {
            const evaluatedCount = problemStatements.filter(
              ps => getProblemStatementStatus(ps.id, judge.id) === 'evaluated'
            ).length;

            return (
              <button
                key={judge.id}
                onClick={() => loginAsJudge(judge.id)}
                className="group relative bg-[#180d11]/90 hover:bg-[#200f16] border border-purple-900/50 hover:border-orange-500/80 rounded-2xl p-5 text-center transition-all duration-200 shadow-xl hover:shadow-orange-500/20 hover:-translate-y-1 flex flex-col items-center bvb-hud-corner"
              >
                {/* Top Badge: 01, 02.. */}
                <div className="w-full flex items-center justify-between text-[10px] font-orbitron text-purple-400 font-bold mb-2">
                  <span className="bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-800">
                    JDG_0{idx + 1}
                  </span>
                  {evaluatedCount > 0 ? (
                    <span className="text-emerald-400 font-mono font-bold flex items-center space-x-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{evaluatedCount}/15</span>
                    </span>
                  ) : (
                    <span className="text-slate-500 font-mono">IDLE</span>
                  )}
                </div>

                {/* Judge Icon with Metallic Neon Ring */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-900/60 to-orange-900/40 group-hover:from-purple-600 group-hover:to-orange-500 border border-purple-500/40 group-hover:border-amber-400 flex items-center justify-center text-white mb-3 transition-all shadow-md">
                  <User className="w-7 h-7 text-orange-300 group-hover:text-white transition-colors" />
                </div>

                {/* Name */}
                <div className="text-sm sm:text-base font-orbitron font-extrabold text-white group-hover:text-amber-300 transition-colors tracking-wide">
                  {judge.name}
                </div>

                {/* Title */}
                <div className="text-xs text-slate-300 group-hover:text-white mt-1 line-clamp-1 font-medium">
                  {judge.title}
                </div>

                {/* Expertise */}
                <div className="text-[10px] text-purple-300/80 group-hover:text-purple-200 mt-1 line-clamp-1 font-mono">
                  {judge.expertise.split('&')[0]}
                </div>

                {/* Enter Button CTA */}
                <div className="mt-3 w-full py-1 rounded-lg bg-[#251017] group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-orange-500 text-[10px] font-orbitron font-bold text-slate-300 group-hover:text-black uppercase tracking-wider transition-all">
                  ENTER PORTAL →
                </div>
              </button>
            );
          })}
        </div>

        {/* Admin Quick Access Panel */}
        <div className="text-center pt-6 border-t border-purple-900/40 flex items-center justify-center space-x-4">
          <button
            onClick={() => toggleAdminMode(true)}
            className="inline-flex items-center space-x-2 text-xs font-orbitron font-bold text-purple-300 hover:text-orange-400 py-2.5 px-5 rounded-xl bg-[#1a0e13] hover:bg-[#25121b] border border-purple-800/60 hover:border-orange-500/60 transition-all shadow-lg"
          >
            <Shield className="w-4 h-4 text-orange-400" />
            <span>ORGANIZER & ADMIN CONSOLE</span>
          </button>
        </div>

      </div>
    </div>
  );
};
