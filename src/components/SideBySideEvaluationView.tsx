import React, { useState, useEffect, useMemo } from 'react';
import { useHackathon } from '../context/HackathonContext';
import { EvaluationScores, Team } from '../types';
import {
  CheckCircle2,
  Lock,
  ChevronLeft,
  ChevronRight,
  Send,
  Sparkles
} from 'lucide-react';

export const SideBySideEvaluationView: React.FC = () => {
  const {
    problemStatements,
    teams,
    currentJudge,
    isAdmin,
    activeProblemStatementId,
    openEvaluation,
    eventConfig,
    getEvaluationForTeam,
    submitDualEvaluation,
    unlockEvaluation,
    setActiveView
  } = useHackathon();

  const currentPS = useMemo(() => {
    return problemStatements.find(ps => ps.id === activeProblemStatementId) || problemStatements[0];
  }, [problemStatements, activeProblemStatementId]);

  const team1 = useMemo(() => teams.find(t => t.id === currentPS.teamIds[0]), [teams, currentPS]);
  const team2 = useMemo(() => teams.find(t => t.id === currentPS.teamIds[1]), [teams, currentPS]);

  const eval1 = currentJudge && team1 ? getEvaluationForTeam(currentJudge.id, team1.id) : undefined;
  const eval2 = currentJudge && team2 ? getEvaluationForTeam(currentJudge.id, team2.id) : undefined;

  const isSubmitted = (eval1?.status === 'submitted') && (eval2?.status === 'submitted');
  const isUnlocked = (eval1?.status === 'unlocked') || (eval2?.status === 'unlocked');
  const isLocked = isSubmitted && !isUnlocked && !isAdmin;

  // Mobile active tab toggle (Team 1 vs Team 2) for small screens if user prefers focused view, or "Both"
  const [mobileTeamView, setMobileTeamView] = useState<'both' | 'team1' | 'team2'>('both');

  // Scores
  const [t1Scores, setT1Scores] = useState<EvaluationScores>({
    creativity: 0,
    technicalImplementation: 0,
    innovation: 0,
    feasibility: 0,
    presentation: 0
  });
  const [t1Feedback, setT1Feedback] = useState('');

  const [t2Scores, setT2Scores] = useState<EvaluationScores>({
    creativity: 0,
    technicalImplementation: 0,
    innovation: 0,
    feasibility: 0,
    presentation: 0
  });
  const [t2Feedback, setT2Feedback] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (eval1) {
      setT1Scores({
        creativity: eval1.creativity,
        technicalImplementation: eval1.technicalImplementation,
        innovation: eval1.innovation,
        feasibility: eval1.feasibility,
        presentation: eval1.presentation
      });
      setT1Feedback(eval1.feedback || '');
    } else {
      setT1Scores({ creativity: 0, technicalImplementation: 0, innovation: 0, feasibility: 0, presentation: 0 });
      setT1Feedback('');
    }

    if (eval2) {
      setT2Scores({
        creativity: eval2.creativity,
        technicalImplementation: eval2.technicalImplementation,
        innovation: eval2.innovation,
        feasibility: eval2.feasibility,
        presentation: eval2.presentation
      });
      setT2Feedback(eval2.feedback || '');
    } else {
      setT2Scores({ creativity: 0, technicalImplementation: 0, innovation: 0, feasibility: 0, presentation: 0 });
      setT2Feedback('');
    }

    setToastMessage(null);
  }, [currentPS.id, eval1, eval2]);

  const t1Total = t1Scores.creativity + t1Scores.technicalImplementation + t1Scores.innovation + t1Scores.feasibility + t1Scores.presentation;
  const t2Total = t2Scores.creativity + t2Scores.technicalImplementation + t2Scores.innovation + t2Scores.feasibility + t2Scores.presentation;

  const currentIndex = problemStatements.findIndex(p => p.id === currentPS.id);
  const prevPS = currentIndex > 0 ? problemStatements[currentIndex - 1] : null;
  const nextPS = currentIndex < problemStatements.length - 1 ? problemStatements[currentIndex + 1] : null;

  const handleScoreChange = (teamNum: 1 | 2, paramId: keyof EvaluationScores, value: number) => {
    if (isLocked) return;
    if (teamNum === 1) {
      setT1Scores(prev => ({ ...prev, [paramId]: value }));
    } else {
      setT2Scores(prev => ({ ...prev, [paramId]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentJudge || !team1 || !team2) return;

    setIsSubmitting(true);
    try {
      await submitDualEvaluation(
        currentJudge.id,
        currentPS.id,
        {
          teamId: team1.id,
          teamName: team1.teamName,
          ...t1Scores,
          feedback: t1Feedback
        },
        {
          teamId: team2.id,
          teamName: team2.teamName,
          ...t2Scores,
          feedback: t2Feedback
        }
      );
      setIsSubmitting(false);
      setToastMessage('Evaluation successfully submitted to Firebase! The BvB Leaderboard has updated.');
    } catch {
      setIsSubmitting(false);
      setToastMessage('Failed to save scores. Please retry.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-5 pb-24 md:pb-8">
      
      {/* Top Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <button
          onClick={() => setActiveView('dashboard')}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#1c0e13] hover:bg-[#27141b] border border-purple-900/50 text-slate-200 text-xs font-orbitron font-bold transition-all"
        >
          <ChevronLeft className="w-4 h-4 text-orange-400" />
          <span>BACK</span>
        </button>

        {/* Dropdown to switch problem statement */}
        <div className="flex items-center space-x-2">
          <select
            value={currentPS.id}
            onChange={(e) => openEvaluation(e.target.value)}
            className="bg-[#1c0e13] border border-purple-800/60 text-white font-mono text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-orange-500 max-w-[200px] sm:max-w-none truncate"
          >
            {problemStatements.map(ps => (
              <option key={ps.id} value={ps.id}>
                {ps.code}: {ps.title.slice(0, 32)}...
              </option>
            ))}
          </select>

          {prevPS && (
            <button
              onClick={() => openEvaluation(prevPS.id)}
              className="px-2.5 py-1.5 rounded-lg bg-[#1c0e13] hover:bg-[#27141b] text-slate-300 border border-purple-900/50 text-xs font-semibold"
              title="Previous Problem"
            >
              Prev
            </button>
          )}

          {nextPS && (
            <button
              onClick={() => openEvaluation(nextPS.id)}
              className="px-2.5 py-1.5 rounded-lg bg-[#1c0e13] hover:bg-[#27141b] text-slate-300 border border-purple-900/50 text-xs font-semibold"
              title="Next Problem"
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* Problem Statement Header */}
      <div className="bg-[#180d11] border border-purple-900/60 rounded-2xl p-4 sm:p-6 mb-5 bvb-hud-corner shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <span className="font-orbitron text-xs font-extrabold px-2.5 py-0.5 rounded bg-orange-600 text-black">
                {currentPS.code}
              </span>
              <span className="text-xs text-purple-300 font-semibold font-orbitron">
                {currentPS.category}
              </span>
              <span className="text-[10px] text-amber-400 bg-amber-950/70 border border-amber-700/50 px-2 py-0.5 rounded font-mono">
                SIMULTANEOUS
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-orbitron font-extrabold text-white tracking-wide">
              {currentPS.title}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {currentPS.description}
            </p>
          </div>

          {/* Status Badge */}
          <div className="shrink-0 text-left sm:text-right">
            {isLocked ? (
              <div className="flex flex-col items-start sm:items-end">
                <span className="inline-flex items-center space-x-1.5 text-xs font-orbitron font-bold text-emerald-400 bg-emerald-950/90 px-3 py-1.5 rounded-xl border border-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>LOCKED ✓</span>
                </span>
                {isAdmin && (
                  <button
                    onClick={() => {
                      if (eval1) unlockEvaluation(eval1.id);
                      if (eval2) unlockEvaluation(eval2.id);
                    }}
                    className="text-xs text-amber-400 hover:underline mt-1 font-semibold"
                  >
                    Unlock Evaluation
                  </button>
                )}
              </div>
            ) : (
              <span className="text-xs font-mono text-purple-200 bg-[#251219] border border-purple-800/60 px-2.5 py-1 rounded-xl inline-block">
                Evaluator: <strong className="text-white">{currentJudge?.name}</strong>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile-Only Team View Selector (Helpful on small screens, hidden on laptop/desktop) */}
      <div className="flex lg:hidden items-center space-x-1 p-1 bg-[#160c0f] border border-purple-900/50 rounded-xl mb-4">
        <button
          type="button"
          onClick={() => setMobileTeamView('both')}
          className={`flex-1 py-1.5 rounded-lg text-[11px] font-orbitron font-bold transition-all ${
            mobileTeamView === 'both' ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-black' : 'text-slate-400'
          }`}
        >
          View Both Teams
        </button>
        <button
          type="button"
          onClick={() => setMobileTeamView('team1')}
          className={`flex-1 py-1.5 rounded-lg text-[11px] font-orbitron font-bold transition-all ${
            mobileTeamView === 'team1' ? 'bg-orange-600 text-white' : 'text-orange-300'
          }`}
        >
          Team A ({t1Total}/25)
        </button>
        <button
          type="button"
          onClick={() => setMobileTeamView('team2')}
          className={`flex-1 py-1.5 rounded-lg text-[11px] font-orbitron font-bold transition-all ${
            mobileTeamView === 'team2' ? 'bg-purple-600 text-white' : 'text-purple-300'
          }`}
        >
          Team B ({t2Total}/25)
        </button>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================
          SIDE-BY-SIDE TWO TEAMS EVALUATION FORM
          Desktop: 2 columns side-by-side
          Mobile: Stacked or toggleable
          ======================================================== */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">

          {/* ==================== TEAM 1 (VIBRANT ORANGE THEME) ==================== */}
          <div className={`bg-[#180d11] border-2 border-orange-500/40 rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-xl bvb-hud-corner ${
            mobileTeamView === 'team2' ? 'hidden lg:flex' : 'flex'
          }`}>
            <div>
              {/* Team 1 Header */}
              <div className="border-b border-orange-950 pb-3 mb-4 flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-orbitron font-extrabold text-orange-400 uppercase tracking-widest">
                    TEAM ALPHA // BUILD
                  </span>
                  <h2 className="text-base sm:text-lg font-orbitron font-extrabold text-white mt-0.5">
                    {team1?.teamName}
                  </h2>
                  <div className="text-xs font-semibold text-orange-200 mt-0.5">
                    {team1?.projectTitle}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">
                    Roster: {team1?.members.join(', ')}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xl sm:text-2xl font-orbitron font-black text-amber-300">
                    {t1Total}/25
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono font-bold text-orange-400">
                    {((t1Total / 25) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* 5 Parameters */}
              <div className="space-y-3.5">
                {eventConfig.parameters.map((param, pIdx) => {
                  const paramKey = param.id as keyof EvaluationScores;
                  const currentVal = t1Scores[paramKey];

                  return (
                    <div key={param.id} className="bg-[#12080a] p-3 rounded-xl border border-orange-950/80">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-semibold text-white flex items-center space-x-1.5">
                          <span className="font-orbitron text-[9px] text-orange-400 bg-orange-950 px-1 py-0.2 rounded border border-orange-800/60">
                            0{pIdx + 1}
                          </span>
                          <span className="truncate max-w-[170px] sm:max-w-none">{param.name}</span>
                        </span>
                        <span className="font-orbitron font-bold text-amber-300 shrink-0">{currentVal} / 5</span>
                      </div>

                      {/* 0-5 Integer Buttons (Compact touch-friendly grid) */}
                      <div className="grid grid-cols-6 gap-1 sm:gap-1.5">
                        {[0, 1, 2, 3, 4, 5].map(val => (
                          <button
                            key={val}
                            type="button"
                            disabled={isLocked}
                            onClick={() => handleScoreChange(1, paramKey, val)}
                            className={`min-h-[38px] rounded-lg font-orbitron font-bold text-xs sm:text-sm flex items-center justify-center transition-all ${
                              currentVal === val
                                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black font-black scale-105 shadow-md shadow-orange-500/40 ring-1 ring-amber-300'
                                : isLocked
                                ? 'bg-[#180d11] text-slate-600 cursor-not-allowed border border-slate-900'
                                : 'bg-[#1c0e14] hover:bg-[#28131d] text-slate-300 border border-orange-950/80 hover:text-white'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* Feedback */}
                <div className="pt-1">
                  <label className="block text-[11px] font-semibold text-orange-300 mb-1">
                    Evaluator Feedback for {team1?.teamName}
                  </label>
                  <textarea
                    rows={2}
                    disabled={isLocked}
                    value={t1Feedback}
                    onChange={(e) => setT1Feedback(e.target.value)}
                    placeholder={isLocked ? '' : 'Enter remarks or feedback...'}
                    className="w-full bg-[#12080a] border border-orange-950/80 rounded-xl p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Total Footer Box */}
            <div className="mt-4 pt-3 border-t border-orange-950/80 flex items-center justify-between bg-[#13070a] p-3 rounded-xl border border-orange-900/40">
              <span className="text-xs font-orbitron font-bold text-orange-300 uppercase">
                Team 1 Score
              </span>
              <span className="text-lg sm:text-xl font-orbitron font-black text-amber-300">
                {t1Total} <span className="text-xs font-normal text-slate-500">/ 25</span>
              </span>
            </div>
          </div>


          {/* ==================== TEAM 2 (ELECTRIC PURPLE THEME) ==================== */}
          <div className={`bg-[#180d11] border-2 border-purple-500/40 rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-xl bvb-hud-corner ${
            mobileTeamView === 'team1' ? 'hidden lg:flex' : 'flex'
          }`}>
            <div>
              {/* Team 2 Header */}
              <div className="border-b border-purple-950 pb-3 mb-4 flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-orbitron font-extrabold text-purple-400 uppercase tracking-widest">
                    TEAM BETA // BREAK
                  </span>
                  <h2 className="text-base sm:text-lg font-orbitron font-extrabold text-white mt-0.5">
                    {team2?.teamName}
                  </h2>
                  <div className="text-xs font-semibold text-purple-200 mt-0.5">
                    {team2?.projectTitle}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">
                    Roster: {team2?.members.join(', ')}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xl sm:text-2xl font-orbitron font-black text-purple-300">
                    {t2Total}/25
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono font-bold text-purple-400">
                    {((t2Total / 25) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* 5 Parameters */}
              <div className="space-y-3.5">
                {eventConfig.parameters.map((param, pIdx) => {
                  const paramKey = param.id as keyof EvaluationScores;
                  const currentVal = t2Scores[paramKey];

                  return (
                    <div key={param.id} className="bg-[#12080a] p-3 rounded-xl border border-purple-950/80">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-semibold text-white flex items-center space-x-1.5">
                          <span className="font-orbitron text-[9px] text-purple-400 bg-purple-950 px-1 py-0.2 rounded border border-purple-800/60">
                            0{pIdx + 1}
                          </span>
                          <span className="truncate max-w-[170px] sm:max-w-none">{param.name}</span>
                        </span>
                        <span className="font-orbitron font-bold text-purple-300 shrink-0">{currentVal} / 5</span>
                      </div>

                      {/* 0-5 Integer Buttons */}
                      <div className="grid grid-cols-6 gap-1 sm:gap-1.5">
                        {[0, 1, 2, 3, 4, 5].map(val => (
                          <button
                            key={val}
                            type="button"
                            disabled={isLocked}
                            onClick={() => handleScoreChange(2, paramKey, val)}
                            className={`min-h-[38px] rounded-lg font-orbitron font-bold text-xs sm:text-sm flex items-center justify-center transition-all ${
                              currentVal === val
                                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-black scale-105 shadow-md shadow-purple-600/40 ring-1 ring-purple-300'
                                : isLocked
                                ? 'bg-[#180d11] text-slate-600 cursor-not-allowed border border-slate-900'
                                : 'bg-[#1c0e14] hover:bg-[#28131d] text-slate-300 border border-purple-950/80 hover:text-white'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* Feedback */}
                <div className="pt-1">
                  <label className="block text-[11px] font-semibold text-purple-300 mb-1">
                    Evaluator Feedback for {team2?.teamName}
                  </label>
                  <textarea
                    rows={2}
                    disabled={isLocked}
                    value={t2Feedback}
                    onChange={(e) => setT2Feedback(e.target.value)}
                    placeholder={isLocked ? '' : 'Enter remarks or feedback...'}
                    className="w-full bg-[#12080a] border border-purple-950/80 rounded-xl p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Total Footer Box */}
            <div className="mt-4 pt-3 border-t border-purple-950/80 flex items-center justify-between bg-[#13070a] p-3 rounded-xl border border-purple-900/40">
              <span className="text-xs font-orbitron font-bold text-purple-300 uppercase">
                Team 2 Score
              </span>
              <span className="text-lg sm:text-xl font-orbitron font-black text-purple-300">
                {t2Total} <span className="text-xs font-normal text-slate-500">/ 25</span>
              </span>
            </div>
          </div>

        </div>

        {/* Submit Button Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#180d11] border border-purple-900/60 shadow-xl bvb-hud-corner">
          <div className="text-xs text-slate-300 font-mono text-center sm:text-left">
            Pair: <strong className="text-orange-400">{team1?.teamName}</strong> ({t1Total}/25) vs <strong className="text-purple-400">{team2?.teamName}</strong> ({t2Total}/25)
          </div>

          <div className="w-full sm:w-auto">
            {isLocked ? (
              <div className="flex items-center justify-center space-x-2 text-xs font-orbitron font-bold text-emerald-400 bg-emerald-950/80 px-5 py-2.5 rounded-xl border border-emerald-700 w-full sm:w-auto">
                <CheckCircle2 className="w-4 h-4" />
                <span>EVALUATION LOCKED (SUBMITTED)</span>
              </div>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-amber-500 to-orange-500 hover:from-purple-500 hover:to-orange-400 text-black font-orbitron font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl shadow-orange-500/25 transition-all transform active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>SAVING SCORES...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-black" />
                    <span>SUBMIT EVALUATION (BOTH TEAMS)</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </form>

    </div>
  );
};
