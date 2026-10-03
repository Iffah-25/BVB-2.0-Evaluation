import React, { useState } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { exportLeaderboardPDF } from '../lib/pdfExport';
import {
  Trophy,
  Download,
  Printer,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  Medal,
  FileDown
} from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  const { getLeaderboard, problemStatements, eventConfig, updateEventConfig } = useHackathon();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPS, setSelectedPS] = useState('all');
  const [selectedLab, setSelectedLab] = useState('all');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const leaderboardEntries = getLeaderboard();

  const filtered = leaderboardEntries.filter(entry => {
    if (selectedPS !== 'all' && entry.problemStatementId !== selectedPS) return false;
    if (selectedLab !== 'all' && entry.lab !== selectedLab) return false;
    if (!eventConfig.showIncompleteTeams && !entry.isComplete) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return entry.teamName.toLowerCase().includes(q) ||
        entry.projectTitle.toLowerCase().includes(q) ||
        (entry.lab && entry.lab.toLowerCase().includes(q)) ||
        entry.problemStatementId.toLowerCase().includes(q);
    }
    return true;
  });

  const podiumEntries = filtered.slice(0, 3);

  // Download PDF Handler
  const handleDownloadPDF = () => {
    try {
      exportLeaderboardPDF(filtered, eventConfig, '/bvb_logo.jpg');
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('PDF export error:', err);
      // Fallback to print dialog if needed
      window.print();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 pb-24 md:pb-8 print:p-0">
      
      {/* Header Banner */}
      <div className="bg-[#180d11] border border-purple-900/50 rounded-2xl p-6 sm:p-7 shadow-2xl mb-8 bvb-hud-corner print:hidden relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute right-0 top-0 w-72 h-72 bg-gradient-to-br from-purple-600/10 to-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-[10px] font-orbitron font-bold tracking-widest text-amber-400 bg-amber-950/70 border border-amber-600/50 px-2.5 py-0.5 rounded-full uppercase">
                BVB LEADERBOARD CORE
              </span>
              <span className="text-[10px] font-orbitron font-semibold text-purple-300 bg-purple-950/70 border border-purple-800/60 px-2 py-0.5 rounded-full">
                LIVE REALTIME
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-orbitron font-black text-white tracking-wider flex items-center space-x-3 glow-orange">
              <span>BVB EVALUATION LEADERBOARD</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              Dynamic team rankings. Required evaluations per team: <span className="font-mono text-amber-400 font-bold">{eventConfig.minRequiredJudges} Judges</span>. Standings update live without page refresh.
            </p>
          </div>

          {/* PDF Download Button (ACTIVATED) */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-black font-orbitron font-extrabold text-xs shadow-lg shadow-orange-500/25 transition-all transform active:scale-95"
            >
              <FileDown className="w-4 h-4 text-black" />
              <span>DOWNLOAD PDF LEADERBOARD</span>
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-[#201016] hover:bg-[#2b161e] text-slate-300 border border-purple-800/50 text-xs font-semibold transition-colors"
              title="Open browser print dialog"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Print View</span>
            </button>
          </div>
        </div>

        {/* Download Success Notice */}
        {downloadSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Official BvB Leaderboard PDF generated and downloaded! Check your downloads folder.</span>
          </div>
        )}
      </div>

      {/* Cyber Podium Spotlight for Top 3 Teams */}
      {podiumEntries.length >= 3 && !searchQuery && selectedPS === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8 print:hidden">
          
          {/* Rank 2 (Silver / Electric Purple) */}
          <div className="order-2 md:order-1 rounded-2xl bg-[#190d12] border-2 border-purple-500/50 p-5 shadow-xl relative overflow-hidden flex flex-col justify-between bvb-hud-corner">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-lg bg-purple-900/60 border border-purple-400/60 flex items-center justify-center font-orbitron font-extrabold text-xs text-purple-300">
                  #02
                </span>
                <span className="text-[10px] font-orbitron font-bold text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-700">
                  {podiumEntries[1]?.problemStatementId}
                </span>
              </div>
              <h3 className="text-base font-orbitron font-bold text-white truncate">
                {podiumEntries[1]?.teamName}
              </h3>
              <p className="text-xs text-slate-400 truncate mt-1">
                {podiumEntries[1]?.projectTitle}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-purple-900/40 flex items-end justify-between font-mono">
              <div>
                <div className="text-[10px] text-purple-400">AVG SCORE</div>
                <div className="text-xl font-black text-purple-200">
                  {podiumEntries[1]?.averageScore.toFixed(2)} <span className="text-xs font-normal text-slate-400">/ 25</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-purple-300 font-orbitron">
                  {podiumEntries[1]?.percentage.toFixed(2)}%
                </div>
                <div className="text-[10px] text-slate-500">
                  {podiumEntries[1]?.evaluationsCount} / {podiumEntries[1]?.requiredEvaluations} Judges
                </div>
              </div>
            </div>
          </div>

          {/* Rank 1 (Gold / Vibrant Orange) */}
          <div className="order-1 md:order-2 rounded-2xl bg-gradient-to-b from-[#281219] via-[#1a0e13] to-[#12090b] border-2 border-amber-400 p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between transform md:-translate-y-2 bvb-hud-corner">
            <div className="absolute top-0 right-0 p-3 pointer-events-none">
              <span className="font-orbitron text-3xl font-black text-amber-500/20">#01</span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/80 flex items-center justify-center font-orbitron font-black text-base text-amber-400 shadow-md shadow-amber-500/30">
                  <Trophy className="w-5 h-5 text-amber-300" />
                </div>
                <span className="text-[10px] font-orbitron font-black text-black bg-gradient-to-r from-amber-400 to-orange-400 px-2.5 py-0.5 rounded shadow">
                  LEADER ★
                </span>
              </div>
              <span className="text-[10px] font-orbitron font-bold text-orange-400 bg-orange-950/80 px-2 py-0.5 rounded border border-orange-800">
                {podiumEntries[0]?.problemStatementId}
              </span>
              <h3 className="text-lg font-orbitron font-black text-white mt-2 truncate glow-orange">
                {podiumEntries[0]?.teamName}
              </h3>
              <p className="text-xs text-amber-200/80 truncate mt-1">
                {podiumEntries[0]?.projectTitle}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-amber-800/40 flex items-end justify-between font-mono">
              <div>
                <div className="text-[10px] text-amber-400">AVG SCORE</div>
                <div className="text-2xl font-black text-amber-300 font-orbitron">
                  {podiumEntries[0]?.averageScore.toFixed(2)} <span className="text-xs font-normal text-amber-500/70">/ 25</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-amber-300 font-orbitron">
                  {podiumEntries[0]?.percentage.toFixed(2)}%
                </div>
                <div className="text-[10px] text-amber-400/70">
                  {podiumEntries[0]?.evaluationsCount} / {podiumEntries[0]?.requiredEvaluations} Judges
                </div>
              </div>
            </div>
          </div>

          {/* Rank 3 (Bronze / Vibrant Orange) */}
          <div className="order-3 md:order-3 rounded-2xl bg-[#190d12] border-2 border-orange-600/50 p-5 shadow-xl relative overflow-hidden flex flex-col justify-between bvb-hud-corner">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-lg bg-orange-900/60 border border-orange-500/60 flex items-center justify-center font-orbitron font-extrabold text-xs text-orange-300">
                  #03
                </span>
                <span className="text-[10px] font-orbitron font-bold text-orange-400 bg-orange-950/80 px-2 py-0.5 rounded border border-orange-800">
                  {podiumEntries[2]?.problemStatementId}
                </span>
              </div>
              <h3 className="text-base font-orbitron font-bold text-white truncate">
                {podiumEntries[2]?.teamName}
              </h3>
              <p className="text-xs text-slate-400 truncate mt-1">
                {podiumEntries[2]?.projectTitle}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-orange-900/40 flex items-end justify-between font-mono">
              <div>
                <div className="text-[10px] text-orange-400">AVG SCORE</div>
                <div className="text-xl font-black text-orange-300">
                  {podiumEntries[2]?.averageScore.toFixed(2)} <span className="text-xs font-normal text-slate-400">/ 25</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-orange-300 font-orbitron">
                  {podiumEntries[2]?.percentage.toFixed(2)}%
                </div>
                <div className="text-[10px] text-slate-500">
                  {podiumEntries[2]?.evaluationsCount} / {podiumEntries[2]?.requiredEvaluations} Judges
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Filter and Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 print:hidden">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* PS Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-mono">Statement:</span>
            <select
              value={selectedPS}
              onChange={(e) => setSelectedPS(e.target.value)}
              className="bg-[#1c0f14] border border-purple-800/60 text-white font-mono text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-orange-500"
            >
              <option value="all">All Statements (15)</option>
              {problemStatements.map(ps => (
                <option key={ps.id} value={ps.id}>{ps.code} — {ps.title.slice(0, 26)}...</option>
              ))}
            </select>
          </div>

          {/* Lab Dropdown */}
          <div className="flex items-center space-x-1.5">
            <span className="text-xs text-slate-400 font-mono">Lab:</span>
            <select
              value={selectedLab}
              onChange={(e) => setSelectedLab(e.target.value)}
              className="bg-[#1c0f14] border border-purple-800/60 text-amber-400 font-orbitron font-bold text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-orange-500"
            >
              <option value="all">All Labs</option>
              <option value="Lab 414">Lab 414</option>
              <option value="Lab 413">Lab 413</option>
              <option value="Lab 412">Lab 412</option>
              <option value="Lab 411">Lab 411</option>
            </select>
          </div>

          {/* Toggle incomplete */}
          <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer bg-[#1c0f14] px-3 py-1.5 rounded-lg border border-purple-900/50 hover:border-orange-500/50 select-none">
            <input
              type="checkbox"
              checked={eventConfig.showIncompleteTeams}
              onChange={(e) => updateEventConfig({ showIncompleteTeams: e.target.checked })}
              className="rounded bg-slate-900 border-purple-700 text-orange-500 w-3.5 h-3.5 accent-orange-500"
            />
            <span>Show incomplete teams</span>
          </label>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search team or project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[#1c0f14] border border-purple-800/60 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Cyber Table */}
      <div className="bg-[#180d11] border border-purple-900/60 rounded-2xl overflow-hidden shadow-2xl bvb-hud-corner">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#13070a] border-b border-purple-900/60 text-[11px] font-orbitron uppercase tracking-wider text-purple-300">
                <th className="py-3.5 px-4 text-center w-16">Rank</th>
                <th className="py-3.5 px-4">Team</th>
                <th className="py-3.5 px-4">Statement</th>
                <th className="py-3.5 px-3 text-center">Lab</th>
                <th className="py-3.5 px-4 text-center">Judges</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Average Score</th>
                <th className="py-3.5 px-4 text-right">Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/30">
              {filtered.map(entry => (
                <tr key={entry.teamId} className="hover:bg-purple-950/20 transition-colors">
                  <td className="py-3.5 px-4 text-center font-orbitron font-bold">
                    {entry.rank === 1 ? (
                      <span className="inline-block w-7 h-7 rounded-lg bg-gradient-to-r from-amber-400 to-orange-400 text-black font-black leading-7 text-center text-xs shadow-md">
                        1
                      </span>
                    ) : entry.rank === 2 ? (
                      <span className="inline-block w-7 h-7 rounded-lg bg-purple-500 text-white font-black leading-7 text-center text-xs shadow-md">
                        2
                      </span>
                    ) : entry.rank === 3 ? (
                      <span className="inline-block w-7 h-7 rounded-lg bg-orange-600 text-white font-black leading-7 text-center text-xs shadow-md">
                        3
                      </span>
                    ) : (
                      <span className="text-slate-400 font-mono">{entry.rank}</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-1.5">
                      {entry.teamRole && (
                        <span className={`text-[9px] font-orbitron font-extrabold px-1.5 py-0.2 rounded border ${
                          entry.teamRole === 'Team A' ? 'bg-orange-950 text-orange-400 border-orange-800/60' : 'bg-purple-950 text-purple-400 border-purple-800/60'
                        }`}>
                          {entry.teamRole}
                        </span>
                      )}
                      <span className="font-bold text-white font-sans text-sm">{entry.teamName}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{entry.projectTitle}</div>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-orange-400">
                    <span className="bg-orange-950/60 border border-orange-800/60 px-2 py-0.5 rounded text-[11px]">
                      {entry.problemStatementId}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-center font-orbitron font-bold text-amber-300">
                    <span className="bg-[#1f1017] border border-amber-800/50 px-2 py-0.5 rounded text-[10px]">
                      {entry.lab || 'Lab 414'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center font-mono">
                    <span className="bg-[#241219] px-2.5 py-1 rounded text-[11px] text-purple-200 border border-purple-900/50">
                      {entry.evaluationsCount} / {entry.requiredEvaluations}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    {entry.isComplete ? (
                      <span className="inline-flex items-center space-x-1 text-[11px] font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-700">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Complete</span>
                      </span>
                    ) : entry.evaluationsCount > 0 ? (
                      <span className="inline-flex items-center space-x-1 text-[11px] font-mono text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-700">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>Pending {entry.requiredEvaluations - entry.evaluationsCount}</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-500">
                        Unscored
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono font-black text-sm text-white">
                    {entry.evaluationsCount > 0 ? (
                      <>
                        <span className="text-amber-300">{entry.averageScore.toFixed(2)}</span>
                        <span className="text-[10px] text-slate-500 font-normal"> / 25</span>
                      </>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right font-orbitron font-bold text-xs">
                    {entry.evaluationsCount > 0 ? (
                      <span className={entry.percentage >= 90 ? 'text-amber-400 font-extrabold' : 'text-orange-300'}>
                        {entry.percentage.toFixed(2)}%
                      </span>
                    ) : (
                      <span className="text-slate-600">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
