import React from 'react';
import { HackathonProvider, useHackathon } from './context/HackathonContext';
import { Navbar } from './components/Navbar';
import { JudgeSelectView } from './components/JudgeSelectView';
import { JudgeDashboardView } from './components/JudgeDashboardView';
import { SideBySideEvaluationView } from './components/SideBySideEvaluationView';
import { LeaderboardView } from './components/LeaderboardView';
import { AdminDashboardView } from './components/AdminDashboardView';

const MainApp: React.FC = () => {
  const { currentJudge, isAdmin, activeView } = useHackathon();

  // If no judge is selected and not in admin mode, show the clean Judge Selection screen
  if (!currentJudge && !isAdmin) {
    return <JudgeSelectView />;
  }

  return (
    <div className="min-h-screen bg-[#12090b] text-[#fffbf5] flex flex-col font-sans selection:bg-orange-500 selection:text-black">
      <Navbar />

      <main className="flex-1">
        {activeView === 'dashboard' && <JudgeDashboardView />}
        {activeView === 'evaluation' && <SideBySideEvaluationView />}
        {activeView === 'leaderboard' && <LeaderboardView />}
        {activeView === 'admin' && <AdminDashboardView />}
      </main>

      <footer className="bg-[#140a0d] border-t border-purple-900/40 py-4 text-center text-xs text-slate-500 font-mono print:hidden">
        BVB EVALUATION // BUILD vs BREAK • 15 Problem Statements • 30 Teams • 8 Judges • Real-Time Firestore Sync
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <HackathonProvider>
      <MainApp />
    </HackathonProvider>
  );
}
