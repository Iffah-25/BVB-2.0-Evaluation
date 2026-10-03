import React, { useState } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { CheckCircle2, ArrowRight, MapPin } from 'lucide-react';

export const JudgeDashboardView: React.FC = () => {
  const {
    currentJudge,
    problemStatements,
    teams,
    getProblemStatementStatus,
    openEvaluation,
    getEvaluationForTeam
  } = useHackathon();

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [selectedLab, setSelectedLab] = useState<string>('all');

  const total = problemStatements.length;
  const completed = problemStatements.filter(
    ps => getProblemStatementStatus(ps.id, currentJudge?.id) === 'evaluated'
  ).length;

  const filtered = problemStatements.filter(ps => {
    const status = getProblemStatementStatus(ps.id, currentJudge?.id);
    if (filter === 'completed' && status !== 'evaluated') return false;
    if (filter === 'pending' && status === 'evaluated') return false;

    if (selectedLab !== 'all' && ps.lab !== selectedLab) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const t1 = teams.find(t => t.id === ps.teamIds[0]);
      const t2 = teams.find(t => t.id === ps.teamIds[1]);
      return ps.code.toLowerCase().includes(q) ||
        ps.title.toLowerCase().includes(q) ||
        (ps.lab && ps.lab.toLowerCase().includes(q)) ||
        (t1 && t1.teamName.toLowerCase().includes(q)) ||
        (t2 && t2.teamName.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 pb-24 md:pb-8">
      
      {/* Futuristic Banner */}
      <div className="bg-[#180d11] border border-purple-900/60 rounded-2xl p-5 sm:p-7 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl bvb-hud-corner">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-[10px] font-orbitron font-bold text-orange-400 bg-orange-950/80 px-2.5 py-0.5 rounded border border-orange-800 uppercase">
              BVB LAB ALLOCATION
            </span>
            <span className="text-[10px] font-orbitron text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800">
              BUILD vs BREAK
            </span>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
              Date: 3rd Oct, 2026
            </span>
          </div>
          <h1 className="text-xl sm:text-3xl font-orbitron font-extrabold text-white tracking-wide glow-purple">
            Welcome, {currentJudge?.name}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl font-sans">
            Select an assigned problem statement to evaluate Team A and Team B side-by-side. Check the allocated lab for venue navigation.
          </p>
        </div>

        {/* Clean Progress Pill */}
        <div className="bg-[#241219] px-4 sm:px-5 py-3 rounded-xl border border-purple-800/60 shrink-0 flex items-center space-x-4 shadow-inner self-start sm:self-auto">
          <div>
            <div className="text-[10px] font-orbitron uppercase text-purple-300">COMPLETION</div>
            <div className="text-sm sm:text-base font-orbitron font-bold text-amber-400">
              {completed} of {total} PS
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/50 flex items-center justify-center font-orbitron font-black text-xs text-orange-400">
            {Math.round((completed / total) * 100)}%
          </div>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-6">
        
        {/* Status filters */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-orbitron font-bold tracking-wider transition-all ${
              filter === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-[#1a0e13] text-slate-300 hover:text-white border border-purple-900/40'
            }`}
          >
            All PS ({total})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-orbitron font-bold tracking-wider transition-all ${
              filter === 'pending'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30'
                : 'bg-[#1a0e13] text-slate-300 hover:text-white border border-purple-900/40'
            }`}
          >
            Pending ({total - completed})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-orbitron font-bold tracking-wider transition-all ${
              filter === 'completed'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'bg-[#1a0e13] text-slate-300 hover:text-white border border-purple-900/40'
            }`}
          >
            Done ({completed})
          </button>

          {/* Lab quick selector */}
          <div className="flex items-center space-x-1 pl-2 border-l border-purple-900/50">
            <span className="text-[11px] text-slate-400 font-mono flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
            </span>
            <select
              value={selectedLab}
              onChange={(e) => setSelectedLab(e.target.value)}
              className="bg-[#1a0e13] border border-purple-800/60 rounded-lg text-xs text-amber-400 font-orbitron font-bold px-2 py-1.5 focus:outline-none focus:border-orange-500"
            >
              <option value="all">All Labs</option>
              <option value="Lab 414">Lab 414 (PS 1-4)</option>
              <option value="Lab 413">Lab 413 (PS 5-8)</option>
              <option value="Lab 412">Lab 412 (PS 9-12)</option>
              <option value="Lab 411">Lab 411 (PS 13-15)</option>
            </select>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search statement, team, or lab..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full lg:w-64 px-3 py-1.5 bg-[#1a0e13] border border-purple-800/60 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
        />
      </div>

      {/* 15 Problem Statement Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(ps => {
          const status = getProblemStatementStatus(ps.id, currentJudge?.id);
          const isDone = status === 'evaluated';

          const team1 = teams.find(t => t.id === ps.teamIds[0]);
          const team2 = teams.find(t => t.id === ps.teamIds[1]);

          const eval1 = currentJudge ? getEvaluationForTeam(currentJudge.id, ps.teamIds[0]) : undefined;
          const eval2 = currentJudge ? getEvaluationForTeam(currentJudge.id, ps.teamIds[1]) : undefined;

          return (
            <div
              key={ps.id}
              className={`rounded-2xl border p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 bvb-hud-corner ${
                isDone
                  ? 'bg-[#1a0e13] border-emerald-500/50 shadow-md shadow-emerald-950/40'
                  : 'bg-[#180d11] border-purple-900/50 hover:border-orange-500/60 hover:shadow-lg hover:shadow-orange-500/10'
              }`}
            >
              <div>
                {/* Header: PS code + Lab Allocated + Status */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-orbitron text-xs font-bold text-orange-400 bg-orange-950/80 px-2 py-0.5 rounded border border-orange-800">
                      {ps.code}
                    </span>
                    {ps.lab && (
                      <span className="font-orbitron text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/70 flex items-center space-x-0.5">
                        <MapPin className="w-2.5 h-2.5 text-orange-400" />
                        <span>{ps.lab}</span>
                      </span>
                    )}
                  </div>

                  {isDone ? (
                    <span className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Evaluated ✓</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-400 bg-[#241219] px-2 py-0.5 rounded border border-purple-900/40">
                      Not Evaluated
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight line-clamp-2 mt-1">
                  {ps.title}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-1 mt-1 font-mono">
                  {ps.category}
                </p>

                {/* Matchup: Team A vs Team B */}
                <div className="mt-3.5 p-3 rounded-xl bg-[#12080a] border border-purple-900/40 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 truncate max-w-[190px]">
                      <span className="text-[9px] font-orbitron font-extrabold px-1.5 py-0.2 rounded bg-orange-950 text-orange-400 border border-orange-800/60 shrink-0">
                        TEAM A
                      </span>
                      <span className="text-orange-200 font-semibold truncate">
                        {team1?.teamName}
                      </span>
                    </div>
                    {eval1 ? (
                      <span className="font-mono font-bold text-amber-400 shrink-0">
                        {eval1.totalScore}/25
                      </span>
                    ) : (
                      <span className="text-slate-600 font-mono shrink-0">—</span>
                    )}
                  </div>

                  <div className="text-[10px] text-purple-400 text-center font-orbitron font-bold tracking-widest">
                    VS
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 truncate max-w-[190px]">
                      <span className="text-[9px] font-orbitron font-extrabold px-1.5 py-0.2 rounded bg-purple-950 text-purple-400 border border-purple-800/60 shrink-0">
                        TEAM B
                      </span>
                      <span className="text-purple-200 font-semibold truncate">
                        {team2?.teamName}
                      </span>
                    </div>
                    {eval2 ? (
                      <span className="font-mono font-bold text-amber-400 shrink-0">
                        {eval2.totalScore}/25
                      </span>
                    ) : (
                      <span className="text-slate-600 font-mono shrink-0">—</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-purple-900/40">
                <button
                  onClick={() => openEvaluation(ps.id)}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-orbitron font-bold tracking-wider flex items-center justify-center space-x-1.5 transition-all shadow ${
                    isDone
                      ? 'bg-[#251319] hover:bg-[#321822] text-slate-200 border border-purple-800/60'
                      : 'bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-500 hover:to-orange-400 text-white shadow-md shadow-orange-500/20'
                  }`}
                >
                  <span>{isDone ? 'REVIEW SCORES' : 'EVALUATE SIDE-BY-SIDE'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
