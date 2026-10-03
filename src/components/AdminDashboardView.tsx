import React, { useState } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { exportLeaderboardPDF } from '../lib/pdfExport';
import { Judge, ProblemStatement } from '../types';
import {
  Download,
  Unlock,
  Trash2,
  CheckCircle2,
  Settings,
  Shield,
  Save,
  X,
  RotateCcw,
  Users,
  Layers,
  FileDown
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    judges,
    problemStatements,
    teams,
    evaluations,
    eventConfig,
    updateEventConfig,
    unlockEvaluation,
    resetEvaluation,
    updateJudge,
    updateProblemStatement,
    resetAllToDefaultEventData,
    seedDemoDataToFirestore,
    clearAllEvaluationsFromFirestore,
    getLeaderboard
  } = useHackathon();

  const [activeTab, setActiveTab] = useState<'judges' | 'statements' | 'stats' | 'evaluations' | 'settings'>('judges');
  const [notice, setNotice] = useState<string | null>(null);

  // Editing state for Judge
  const [editingJudgeId, setEditingJudgeId] = useState<string | null>(null);
  const [judgeFormName, setJudgeFormName] = useState('');
  const [judgeFormTitle, setJudgeFormTitle] = useState('');
  const [judgeFormExpertise, setJudgeFormExpertise] = useState('');

  // Editing state for Problem Statement
  const [editingPSId, setEditingPSId] = useState<string | null>(null);
  const [psFormTitle, setPsFormTitle] = useState('');
  const [psFormCategory, setPsFormCategory] = useState('');
  const [psFormDescription, setPsFormDescription] = useState('');
  const [psFormTeam1, setPsFormTeam1] = useState('');
  const [psFormTeam2, setPsFormTeam2] = useState('');

  const allEvals = Object.values(evaluations);
  const completedCount = allEvals.filter(e => e.status === 'submitted').length;
  const leaderboard = getLeaderboard();
  const fullyEvaluatedCount = leaderboard.filter(t => t.isComplete).length;

  const startEditJudge = (judge: Judge) => {
    setEditingJudgeId(judge.id);
    setJudgeFormName(judge.name);
    setJudgeFormTitle(judge.title);
    setJudgeFormExpertise(judge.expertise);
  };

  const handleSaveJudge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJudgeId) return;

    await updateJudge(editingJudgeId, {
      name: judgeFormName.trim() || 'Judge',
      title: judgeFormTitle.trim() || 'Evaluator',
      expertise: judgeFormExpertise.trim()
    });

    setEditingJudgeId(null);
    setNotice(`Updated ${judgeFormName} successfully!`);
    setTimeout(() => setNotice(null), 3000);
  };

  const startEditPS = (ps: ProblemStatement) => {
    const t1 = teams.find(t => t.id === ps.teamIds[0]);
    const t2 = teams.find(t => t.id === ps.teamIds[1]);

    setEditingPSId(ps.id);
    setPsFormTitle(ps.title);
    setPsFormCategory(ps.category);
    setPsFormDescription(ps.description);
    setPsFormTeam1(t1 ? t1.teamName : '');
    setPsFormTeam2(t2 ? t2.teamName : '');
  };

  const handleSavePS = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPSId) return;

    await updateProblemStatement(editingPSId, {
      title: psFormTitle.trim(),
      category: psFormCategory.trim(),
      description: psFormDescription.trim(),
      team1Name: psFormTeam1.trim(),
      team2Name: psFormTeam2.trim()
    });

    setEditingPSId(null);
    setNotice(`Updated ${editingPSId} and teams successfully!`);
    setTimeout(() => setNotice(null), 3000);
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = [
      'Rank',
      'Team Name',
      'Problem Statement',
      'Project Title',
      'Judges Evaluated',
      'Average Score (/25)',
      'Percentage (%)',
      'Is Complete',
      'Judge Scores'
    ];

    const rows = leaderboard.map(t => [
      t.rank,
      `"${t.teamName.replace(/"/g, '""')}"`,
      `"${t.problemStatementId}"`,
      `"${t.projectTitle.replace(/"/g, '""')}"`,
      t.evaluationsCount,
      t.averageScore.toFixed(2),
      `${t.percentage.toFixed(2)}%`,
      t.isComplete ? 'YES' : 'NO',
      `"${t.judgeScores.map(j => `${j.judgeName}: ${j.score}`).join('; ')}"`
    ].join(','));

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `bvb_results_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setNotice('Results CSV exported successfully.');
    setTimeout(() => setNotice(null), 3000);
  };

  const handleDownloadPDF = () => {
    exportLeaderboardPDF(leaderboard, eventConfig, '/bvb_logo.jpg');
    setNotice('Leaderboard PDF downloaded successfully!');
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 pb-24 md:pb-8">
      
      {/* Header */}
      <div className="bg-[#180d11] border border-purple-900/60 rounded-2xl p-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl bvb-hud-corner">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="text-[10px] font-orbitron font-bold text-orange-400 bg-orange-950/80 px-2 py-0.5 rounded border border-orange-800">
              BVB EVENT CONTROL
            </span>
            <span className="text-[10px] font-orbitron text-purple-300">
              BUILD vs BREAK
            </span>
          </div>
          <h1 className="text-2xl font-orbitron font-extrabold text-white tracking-wide flex items-center space-x-2">
            <Shield className="w-6 h-6 text-orange-400" />
            <span>Admin Console</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Configure judge profiles, customize problem statements and teams, and download certified results.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black text-xs font-orbitron font-extrabold shadow transition-all"
          >
            <FileDown className="w-4 h-4 text-black" />
            <span>DOWNLOAD LEADERBOARD PDF</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#241219] hover:bg-[#321822] text-purple-300 border border-purple-800/60 text-xs font-orbitron font-bold transition-all"
          >
            <Download className="w-4 h-4" />
            <span>CSV EXPORT</span>
          </button>
        </div>
      </div>

      {notice && (
        <div className="mb-6 p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-xs font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-purple-900/40 pb-3 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('judges')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-orbitron font-bold tracking-wider flex items-center space-x-1.5 transition-all ${
            activeTab === 'judges'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Judges (8)</span>
        </button>

        <button
          onClick={() => setActiveTab('statements')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-orbitron font-bold tracking-wider flex items-center space-x-1.5 transition-all ${
            activeTab === 'statements'
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Problem Statements (15)</span>
        </button>

        <button
          onClick={() => setActiveTab('stats')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-orbitron font-bold tracking-wider transition-all ${
            activeTab === 'stats'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Overview Statistics
        </button>

        <button
          onClick={() => setActiveTab('evaluations')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-orbitron font-bold tracking-wider transition-all ${
            activeTab === 'evaluations'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Evaluations & Locks ({allEvals.length})
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-orbitron font-bold tracking-wider transition-all ${
            activeTab === 'settings'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Settings & Reset
        </button>
      </div>

      {/* TAB 1: JUDGES */}
      {activeTab === 'judges' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-base font-orbitron font-bold text-white">Event Judges & Evaluators</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click "Edit" on any judge to enter their real name and details. Changes update instantly across login cards and scoring headers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {judges.map(judge => {
              const isEditing = editingJudgeId === judge.id;
              const count = allEvals.filter(e => e.judgeId === judge.id && e.status === 'submitted').length;

              return (
                <div
                  key={judge.id}
                  className="bg-[#180d11] border border-purple-900/50 rounded-2xl p-4 transition-all bvb-hud-corner"
                >
                  {isEditing ? (
                    <form onSubmit={handleSaveJudge} className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-purple-950">
                        <span className="font-orbitron text-xs font-bold text-orange-400">
                          Editing {judge.id.toUpperCase()}
                        </span>
                        <button
                          type="button"
                          onClick={() => setEditingJudgeId(null)}
                          className="text-slate-400 hover:text-white p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Judge Full Name
                        </label>
                        <input
                          type="text"
                          value={judgeFormName}
                          onChange={(e) => setJudgeFormName(e.target.value)}
                          placeholder="e.g. Dr. Jane Smith"
                          className="w-full bg-[#12080a] border border-purple-800/60 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Title / Affiliation
                        </label>
                        <input
                          type="text"
                          value={judgeFormTitle}
                          onChange={(e) => setJudgeFormTitle(e.target.value)}
                          placeholder="e.g. Principal AI Research Scientist"
                          className="w-full bg-[#12080a] border border-purple-800/60 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Expertise Area
                        </label>
                        <input
                          type="text"
                          value={judgeFormExpertise}
                          onChange={(e) => setJudgeFormExpertise(e.target.value)}
                          placeholder="e.g. Distributed Cloud & Security"
                          className="w-full bg-[#12080a] border border-purple-800/60 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div className="flex items-center space-x-2 pt-1">
                        <button
                          type="submit"
                          className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-500 hover:to-orange-400 text-black font-orbitron font-bold text-xs flex items-center space-x-1.5 shadow"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Judge</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingJudgeId(null)}
                          className="px-3 py-1.5 rounded-lg bg-[#251219] hover:bg-[#321721] text-slate-300 text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-orbitron text-[10px] font-bold text-orange-400 bg-orange-950/80 px-1.5 py-0.5 rounded border border-orange-800">
                            {judge.id}
                          </span>
                          <h3 className="text-sm font-orbitron font-bold text-white">{judge.name}</h3>
                        </div>
                        <div className="text-xs text-purple-200 mt-1">{judge.title}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{judge.expertise}</div>
                        <div className="text-[10px] text-amber-400 font-mono mt-2">
                          {count} evaluations submitted
                        </div>
                      </div>

                      <button
                        onClick={() => startEditJudge(judge)}
                        className="px-2.5 py-1 rounded-lg bg-[#251219] hover:bg-orange-600 hover:text-black text-slate-200 text-xs font-semibold transition-all border border-purple-900/50"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: PROBLEM STATEMENTS & TEAMS */}
      {activeTab === 'statements' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-base font-orbitron font-bold text-white">Problem Statements & Assigned Team Pairs</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Customize problem briefs and team names. Both assigned teams are evaluated side-by-side.
            </p>
          </div>

          <div className="space-y-4">
            {problemStatements.map(ps => {
              const isEditing = editingPSId === ps.id;
              const team1 = teams.find(t => t.id === ps.teamIds[0]);
              const team2 = teams.find(t => t.id === ps.teamIds[1]);

              return (
                <div
                  key={ps.id}
                  className="bg-[#180d11] border border-purple-900/60 rounded-2xl p-5 transition-all bvb-hud-corner"
                >
                  {isEditing ? (
                    <form onSubmit={handleSavePS} className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-purple-950">
                        <span className="font-orbitron text-xs font-bold text-orange-400">
                          Editing {ps.code}
                        </span>
                        <button
                          type="button"
                          onClick={() => setEditingPSId(null)}
                          className="text-slate-400 hover:text-white p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                            Problem Statement Title
                          </label>
                          <input
                            type="text"
                            value={psFormTitle}
                            onChange={(e) => setPsFormTitle(e.target.value)}
                            className="w-full bg-[#12080a] border border-purple-800/60 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                            Category / Domain
                          </label>
                          <input
                            type="text"
                            value={psFormCategory}
                            onChange={(e) => setPsFormCategory(e.target.value)}
                            className="w-full bg-[#12080a] border border-purple-800/60 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Problem Description / Brief
                        </label>
                        <textarea
                          rows={2}
                          value={psFormDescription}
                          onChange={(e) => setPsFormDescription(e.target.value)}
                          className="w-full bg-[#12080a] border border-purple-800/60 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      {/* 2 Assigned Teams */}
                      <div className="p-3.5 bg-[#12080a] rounded-xl border border-purple-900/60 space-y-3">
                        <div className="text-[10px] font-orbitron font-bold text-amber-400 uppercase tracking-wider">
                          The Two Teams Assigned to this Problem (Side-by-Side Matchup)
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-semibold text-orange-400 mb-1">
                              Team 1 Name ({ps.teamIds[0]})
                            </label>
                            <input
                              type="text"
                              value={psFormTeam1}
                              onChange={(e) => setPsFormTeam1(e.target.value)}
                              className="w-full bg-[#180d11] border border-orange-900/60 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-purple-400 mb-1">
                              Team 2 Name ({ps.teamIds[1]})
                            </label>
                            <input
                              type="text"
                              value={psFormTeam2}
                              onChange={(e) => setPsFormTeam2(e.target.value)}
                              className="w-full bg-[#180d11] border border-purple-900/60 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-1">
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-orbitron font-bold text-xs flex items-center space-x-1.5 shadow"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Statement & Teams</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingPSId(null)}
                          className="px-3.5 py-2 rounded-lg bg-[#241219] text-slate-300 text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-orbitron text-xs font-bold text-orange-400 bg-orange-950/80 px-2 py-0.5 rounded border border-orange-800">
                              {ps.code}
                            </span>
                            <span className="text-xs text-purple-300 font-medium">
                              {ps.category}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-white">{ps.title}</h3>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2">{ps.description}</p>
                        </div>

                        <button
                          onClick={() => startEditPS(ps)}
                          className="px-3 py-1.5 rounded-lg bg-[#251219] hover:bg-orange-600 hover:text-black text-slate-200 text-xs font-semibold transition-all border border-purple-900/50 shrink-0"
                        >
                          Edit
                        </button>
                      </div>

                      <div className="mt-3 pt-3 border-t border-purple-900/40 flex flex-wrap items-center gap-4 text-xs font-mono">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-orange-400" />
                          <span className="text-slate-400">Team 1:</span>
                          <span className="font-bold text-orange-200">{team1?.teamName}</span>
                        </div>
                        <span className="text-purple-400 font-orbitron font-bold">vs</span>
                        <div className="flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-purple-400" />
                          <span className="text-slate-400">Team 2:</span>
                          <span className="font-bold text-purple-200">{team2?.teamName}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: STATS */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="bg-[#180d11] border border-purple-900/50 p-4 rounded-xl">
              <div className="text-[11px] text-purple-300 font-orbitron uppercase">Total Teams</div>
              <div className="text-2xl font-bold font-orbitron text-white mt-1">{teams.length}</div>
            </div>
            <div className="bg-[#180d11] border border-purple-900/50 p-4 rounded-xl">
              <div className="text-[11px] text-purple-300 font-orbitron uppercase">Statements</div>
              <div className="text-2xl font-bold font-orbitron text-white mt-1">{problemStatements.length}</div>
            </div>
            <div className="bg-[#180d11] border border-purple-900/50 p-4 rounded-xl">
              <div className="text-[11px] text-purple-300 font-orbitron uppercase">Judges</div>
              <div className="text-2xl font-bold font-orbitron text-white mt-1">{judges.length}</div>
            </div>
            <div className="bg-[#180d11] border border-purple-900/50 p-4 rounded-xl">
              <div className="text-[11px] text-purple-300 font-orbitron uppercase">Evals Done</div>
              <div className="text-2xl font-bold font-orbitron text-emerald-400 mt-1">{completedCount}</div>
            </div>
            <div className="bg-[#180d11] border border-purple-900/50 p-4 rounded-xl">
              <div className="text-[11px] text-purple-300 font-orbitron uppercase">Teams Complete</div>
              <div className="text-2xl font-bold font-orbitron text-amber-400 mt-1">{fullyEvaluatedCount}</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: EVALUATIONS & LOCKS */}
      {activeTab === 'evaluations' && (
        <div className="bg-[#180d11] border border-purple-900/60 rounded-2xl overflow-hidden shadow">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#12080a] border-b border-purple-900/60 text-[11px] font-orbitron uppercase text-purple-300">
                  <th className="py-2.5 px-3">Judge</th>
                  <th className="py-2.5 px-3">PS</th>
                  <th className="py-2.5 px-3">Team</th>
                  <th className="py-2.5 px-3 text-right">Score</th>
                  <th className="py-2.5 px-3 text-center">Lock Status</th>
                  <th className="py-2.5 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/30">
                {allEvals.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-slate-500 font-mono">
                      No evaluations submitted yet.
                    </td>
                  </tr>
                ) : (
                  allEvals.map(ev => (
                    <tr key={ev.id} className="hover:bg-purple-950/20">
                      <td className="py-2.5 px-3 font-semibold text-white">{ev.judgeName}</td>
                      <td className="py-2.5 px-3 font-mono text-orange-400 font-bold">{ev.problemStatementId}</td>
                      <td className="py-2.5 px-3 text-slate-200">{ev.teamName}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-300">{ev.totalScore}/25</td>
                      <td className="py-2.5 px-3 text-center">
                        {ev.status === 'submitted' ? (
                          <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                            Locked ✓
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                            Unlocked
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-center space-x-2">
                        {ev.status === 'submitted' && (
                          <button
                            onClick={() => unlockEvaluation(ev.id)}
                            className="px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-semibold"
                          >
                            Unlock
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (confirm('Delete this evaluation?')) resetEvaluation(ev.id);
                          }}
                          className="px-2 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-[11px]"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: SETTINGS & RESET */}
      {activeTab === 'settings' && (
        <div className="space-y-4">
          <div className="bg-[#180d11] border border-purple-900/60 p-5 rounded-xl">
            <h3 className="text-sm font-orbitron font-bold text-white mb-2">Required Judges per Team</h3>
            <p className="text-xs text-slate-400 mb-3 font-sans">
              Number of judge evaluations needed before a team is marked "Evaluation Complete".
            </p>
            <div className="flex items-center space-x-3 max-w-xs">
              <input
                type="range"
                min={1}
                max={8}
                value={eventConfig.minRequiredJudges}
                onChange={(e) => updateEventConfig({ minRequiredJudges: parseInt(e.target.value) })}
                className="w-full accent-orange-500"
              />
              <span className="font-orbitron font-bold text-amber-400 text-base">{eventConfig.minRequiredJudges}</span>
            </div>
          </div>

          {/* Firebase Credentials & Database Connection Details */}
          <div className="bg-[#180d11] border border-purple-900/60 p-5 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-orbitron font-bold text-white flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  <span>Firebase Credentials & Connection Config</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Live Firestore database configuration provisioned for this application.
                </p>
              </div>

              <a
                href="https://console.firebase.google.com/project/studio-9616154876-12878/firestore/databases/ai-studio-0a43b2d0-ea3a-48f6-8f99-958a45a91a48/data"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-black text-xs font-orbitron font-bold transition-all shadow"
              >
                Open in Firebase Console ↗
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-2">
              <div className="p-3 bg-[#12080a] rounded-lg border border-purple-900/40">
                <span className="text-[10px] text-slate-500 uppercase block font-orbitron">Firebase Project ID</span>
                <span className="text-orange-400 font-bold select-all">studio-9616154876-12878</span>
              </div>
              <div className="p-3 bg-[#12080a] rounded-lg border border-purple-900/40">
                <span className="text-[10px] text-slate-500 uppercase block font-orbitron">Firestore Database ID</span>
                <span className="text-purple-300 font-bold select-all">ai-studio-0a43b2d0-ea3a-48f6-8f99-958a45a91a48</span>
              </div>
              <div className="p-3 bg-[#12080a] rounded-lg border border-purple-900/40">
                <span className="text-[10px] text-slate-500 uppercase block font-orbitron">Auth Domain</span>
                <span className="text-slate-300 select-all">studio-9616154876-12878.firebaseapp.com</span>
              </div>
              <div className="p-3 bg-[#12080a] rounded-lg border border-purple-900/40">
                <span className="text-[10px] text-slate-500 uppercase block font-orbitron">Storage Bucket</span>
                <span className="text-slate-300 select-all">studio-9616154876-12878.firebasestorage.app</span>
              </div>
            </div>
          </div>

          <div className="bg-[#180d11] border border-purple-900/60 p-5 rounded-xl">
            <h3 className="text-sm font-orbitron font-bold text-white mb-2">Event Operations & Data Reset</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={async () => {
                  await seedDemoDataToFirestore();
                  setNotice('Sample demo evaluations seeded!');
                  setTimeout(() => setNotice(null), 3000);
                }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-orange-500 text-black font-orbitron font-bold text-xs"
              >
                Seed Sample Evaluations
              </button>

              <button
                onClick={async () => {
                  if (confirm('Reset judge names and problem statements back to initial defaults?')) {
                    await resetAllToDefaultEventData();
                    setNotice('Reset all judges and problem statements to default.');
                    setTimeout(() => setNotice(null), 3000);
                  }
                }}
                className="px-4 py-2 rounded-lg bg-[#241219] hover:bg-[#321721] text-slate-200 border border-purple-800/60 text-xs font-bold flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
                <span>Reset to Default Names & Statements</span>
              </button>

              <button
                onClick={async () => {
                  if (confirm('Clear all evaluations?')) {
                    await clearAllEvaluationsFromFirestore();
                    setNotice('All evaluations cleared.');
                    setTimeout(() => setNotice(null), 3000);
                  }
                }}
                className="px-4 py-2 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-bold"
              >
                Clear All Evaluations
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
