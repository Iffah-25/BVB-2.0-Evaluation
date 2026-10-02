import React from 'react';
import { useHackathon } from '../context/HackathonContext';
import {
  LayoutDashboard,
  Trophy,
  Shield,
  Columns2
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentJudge,
    logoutJudge,
    isAdmin,
    toggleAdminMode,
    activeView,
    setActiveView,
    activeProblemStatementId,
    isFirestoreConnected
  } = useHackathon();

  return (
    <>
      {/* Top Header Bar */}
      <header className="bg-[#140a0d]/95 backdrop-blur-md border-b border-purple-900/40 text-[#fffbf5] sticky top-0 z-40 shadow-xl shadow-black/50">
        <div className="max-w-6xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            
            {/* Logo & Website Title */}
            <div 
              onClick={() => setActiveView('dashboard')}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <div className="relative p-0.5 rounded-lg bg-gradient-to-r from-purple-500 via-amber-400 to-orange-500 shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform shrink-0">
                <img
                  src="/bvb_logo.jpg"
                  alt="BvB Logo"
                  className="h-8 sm:h-9 w-auto rounded-md object-contain bg-[#160c0e]"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-1.5">
                  <span className="font-orbitron font-extrabold text-sm sm:text-base tracking-wider text-white group-hover:text-orange-400 transition-colors truncate">
                    BVB EVALUATION
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-orbitron font-bold px-1.5 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-700/60 hidden md:inline-block shrink-0">
                    BUILD VS BREAK
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 text-[10px] sm:text-[11px] text-slate-400 font-mono truncate">
                  <span className="hidden sm:inline">15 PS • 30 Teams • 8 Judges</span>
                  <span className="inline sm:hidden">15 PS • 30 Teams</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                  <span className="text-emerald-400 text-[10px]">
                    {isFirestoreConnected ? 'Live' : 'Connected'}
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Tabs (Hidden on mobile, shown on md and larger) */}
            <nav className="hidden md:flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => setActiveView('dashboard')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-orbitron font-bold tracking-wider transition-all ${
                  activeView === 'dashboard'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30 border border-purple-400/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-purple-400" />
                <span>DASHBOARD</span>
              </button>

              {activeView === 'evaluation' && (
                <button
                  onClick={() => setActiveView('evaluation')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-orbitron font-bold tracking-wider bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md shadow-orange-500/30 border border-orange-400/60"
                >
                  <Columns2 className="w-3.5 h-3.5" />
                  <span>EVAL ({activeProblemStatementId || 'PS-01'})</span>
                </button>
              )}

              <button
                onClick={() => setActiveView('leaderboard')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-orbitron font-bold tracking-wider transition-all ${
                  activeView === 'leaderboard'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-md shadow-amber-500/30 border border-amber-300 font-black'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>LEADERBOARD</span>
              </button>

              <button
                onClick={() => {
                  toggleAdminMode(true);
                  setActiveView('admin');
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-orbitron font-bold tracking-wider transition-all ${
                  activeView === 'admin'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/30 border border-purple-400/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>ADMIN</span>
              </button>
            </nav>

            {/* Current Judge & Switcher Pill */}
            <div className="flex items-center space-x-2">
              {currentJudge ? (
                <button
                  onClick={logoutJudge}
                  title="Click to switch judge"
                  className="flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#1a0e12] hover:bg-[#251319] border border-orange-500/40 text-xs text-white transition-all shadow-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shrink-0" />
                  <span className="font-semibold text-orange-200 truncate max-w-[90px] sm:max-w-[120px]">
                    {currentJudge.name}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-purple-300 bg-purple-950/80 border border-purple-700/50 px-1 py-0.5 rounded font-mono">
                    Switch
                  </span>
                </button>
              ) : (
                <button
                  onClick={logoutJudge}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-orange-500 text-[11px] sm:text-xs font-orbitron font-bold text-white shadow"
                >
                  SELECT JUDGE
                </button>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Fixed for mobile reachability, hidden on md+) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#12080a]/95 backdrop-blur-lg border-t border-purple-900/50 px-2 py-1.5 flex items-center justify-around shadow-2xl print:hidden">
        <button
          onClick={() => setActiveView('dashboard')}
          className={`flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-orbitron font-bold transition-all ${
            activeView === 'dashboard'
              ? 'text-orange-400 bg-orange-950/40 border border-orange-800/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 mb-0.5" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => setActiveView('evaluation')}
          className={`flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-orbitron font-bold transition-all ${
            activeView === 'evaluation'
              ? 'text-orange-400 bg-orange-950/40 border border-orange-800/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Columns2 className="w-4 h-4 mb-0.5" />
          <span>Eval ({activeProblemStatementId || 'PS-01'})</span>
        </button>

        <button
          onClick={() => setActiveView('leaderboard')}
          className={`flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-orbitron font-bold transition-all ${
            activeView === 'leaderboard'
              ? 'text-amber-400 bg-amber-950/40 border border-amber-800/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Trophy className="w-4 h-4 mb-0.5" />
          <span>Leaderboard</span>
        </button>

        <button
          onClick={() => {
            toggleAdminMode(true);
            setActiveView('admin');
          }}
          className={`flex flex-col items-center py-1 px-3 rounded-lg text-[10px] font-orbitron font-bold transition-all ${
            activeView === 'admin' || isAdmin
              ? 'text-purple-400 bg-purple-950/40 border border-purple-800/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield className="w-4 h-4 mb-0.5" />
          <span>Admin</span>
        </button>
      </nav>
    </>
  );
};
