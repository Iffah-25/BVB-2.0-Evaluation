import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  writeBatch
} from 'firebase/firestore';
import { db, testConnection } from '../lib/firebase';
import {
  Judge,
  ProblemStatement,
  Team,
  Evaluation,
  JudgeAssignment,
  EventConfig,
  TeamLeaderboardEntry
} from '../types';
import {
  INITIAL_JUDGES,
  INITIAL_PROBLEM_STATEMENTS,
  INITIAL_TEAMS,
  INITIAL_EVENT_CONFIG,
  SEED_DEMO_EVALUATIONS
} from '../data/seedData';

interface HackathonContextType {
  judges: Judge[];
  problemStatements: ProblemStatement[];
  teams: Team[];
  evaluations: Record<string, Evaluation>;
  judgeAssignments: JudgeAssignment[];
  eventConfig: EventConfig;
  currentJudge: Judge | null;
  isAdmin: boolean;
  activeView: 'dashboard' | 'evaluation' | 'leaderboard' | 'admin';
  activeProblemStatementId: string | null;
  isFirestoreConnected: boolean;
  isSyncing: boolean;
  lastSyncTime: Date | null;
  
  // Actions
  loginAsJudge: (judgeId: string) => void;
  logoutJudge: () => void;
  toggleAdminMode: (admin?: boolean) => void;
  setActiveView: (view: 'dashboard' | 'evaluation' | 'leaderboard' | 'admin') => void;
  openEvaluation: (psId: string) => void;
  
  // Scoring
  submitDualEvaluation: (
    judgeId: string,
    problemStatementId: string,
    team1Data: {
      teamId: string;
      teamName: string;
      creativity: number;
      technicalImplementation: number;
      innovation: number;
      feasibility: number;
      presentation: number;
      feedback: string;
    },
    team2Data: {
      teamId: string;
      teamName: string;
      creativity: number;
      technicalImplementation: number;
      innovation: number;
      feasibility: number;
      presentation: number;
      feedback: string;
    }
  ) => Promise<boolean>;
  
  unlockEvaluation: (evaluationId: string) => Promise<void>;
  resetEvaluation: (evaluationId: string) => Promise<void>;
  toggleJudgeAssignment: (judgeId: string, problemStatementId: string) => Promise<void>;
  updateEventConfig: (newConfig: Partial<EventConfig>) => Promise<void>;
  seedDemoDataToFirestore: () => Promise<void>;
  clearAllEvaluationsFromFirestore: () => Promise<void>;
  
  // Admin Entry of Judges & Problem Statements
  updateJudge: (judgeId: string, updatedData: Partial<Judge>) => Promise<void>;
  updateProblemStatement: (
    psId: string,
    data: {
      title: string;
      category?: string;
      description?: string;
      team1Name?: string;
      team2Name?: string;
    }
  ) => Promise<void>;
  resetAllToDefaultEventData: () => Promise<void>;

  // Computed helpers
  getEvaluationForTeam: (judgeId: string, teamId: string) => Evaluation | undefined;
  getProblemStatementStatus: (psId: string, judgeId?: string) => 'evaluated' | 'in_progress' | 'not_evaluated';
  isJudgeAssignedToPS: (judgeId: string, psId: string) => boolean;
  getLeaderboard: () => TeamLeaderboardEntry[];
  getTeamById: (teamId: string) => Team | undefined;
  getPSById: (psId: string) => ProblemStatement | undefined;
  getJudgeById: (judgeId: string) => Judge | undefined;
}

const HackathonContext = createContext<HackathonContextType | undefined>(undefined);

const LOCAL_STORAGE_JUDGE_KEY = 'hackathon_eval_judge_id';
const LOCAL_STORAGE_ADMIN_KEY = 'hackathon_eval_is_admin';
const LOCAL_STORAGE_EVALUATIONS_KEY = 'hackathon_eval_local_fallback';
const LOCAL_STORAGE_JUDGES_KEY = 'hackathon_eval_judges_custom';
const LOCAL_STORAGE_PS_KEY = 'hackathon_eval_ps_custom';
const LOCAL_STORAGE_TEAMS_KEY = 'hackathon_eval_teams_custom';

export const HackathonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Judges state
  const [judges, setJudges] = useState<Judge[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_JUDGES_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_JUDGES;
  });

  // 2. Problem Statements state
  const [problemStatements, setProblemStatements] = useState<ProblemStatement[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_PROBLEM_STATEMENTS;
  });

  // 3. Teams state
  const [teams, setTeams] = useState<Team[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_TEAMS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_TEAMS;
  });
  
  // 4. Evaluations state
  const [evaluations, setEvaluations] = useState<Record<string, Evaluation>>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_EVALUATIONS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    const initialMap: Record<string, Evaluation> = {};
    SEED_DEMO_EVALUATIONS.forEach(ev => {
      initialMap[ev.id] = ev;
    });
    return initialMap;
  });

  // 5. Judge assignments
  const [judgeAssignments, setJudgeAssignments] = useState<JudgeAssignment[]>(() => {
    const assignments: JudgeAssignment[] = [];
    INITIAL_JUDGES.forEach(j => {
      INITIAL_PROBLEM_STATEMENTS.forEach(ps => {
        assignments.push({
          id: `${j.id}_${ps.id}`,
          judgeId: j.id,
          problemStatementId: ps.id
        });
      });
    });
    return assignments;
  });

  const [eventConfig, setEventConfig] = useState<EventConfig>(INITIAL_EVENT_CONFIG);

  // Active Session state
  const [currentJudge, setCurrentJudge] = useState<Judge | null>(() => {
    const savedId = localStorage.getItem(LOCAL_STORAGE_JUDGE_KEY);
    if (savedId) {
      const savedJudges = localStorage.getItem(LOCAL_STORAGE_JUDGES_KEY);
      const list = savedJudges ? JSON.parse(savedJudges) : INITIAL_JUDGES;
      return list.find((j: Judge) => j.id === savedId) || null;
    }
    return null;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(LOCAL_STORAGE_ADMIN_KEY) === 'true';
  });

  const [activeView, setActiveView] = useState<'dashboard' | 'evaluation' | 'leaderboard' | 'admin'>('dashboard');
  const [activeProblemStatementId, setActiveProblemStatementId] = useState<string | null>('PS-01');

  const [isFirestoreConnected, setIsFirestoreConnected] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_EVALUATIONS_KEY, JSON.stringify(evaluations));
    } catch {}
  }, [evaluations]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_JUDGES_KEY, JSON.stringify(judges));
    } catch {}
  }, [judges]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PS_KEY, JSON.stringify(problemStatements));
    } catch {}
  }, [problemStatements]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_TEAMS_KEY, JSON.stringify(teams));
    } catch {}
  }, [teams]);

  // Test connection on boot
  useEffect(() => {
    testConnection().then(connected => {
      setIsFirestoreConnected(connected);
    });
  }, []);

  // 1. Setup real-time listener for evaluations
  useEffect(() => {
    const evCollectionRef = collection(db, 'evaluations');
    const unsubscribe = onSnapshot(
      evCollectionRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const remoteEvals: Record<string, Evaluation> = {};
          snapshot.forEach(docSnap => {
            const data = docSnap.data() as Evaluation;
            remoteEvals[docSnap.id] = {
              ...data,
              id: docSnap.id
            };
          });
          setEvaluations(remoteEvals);
          setIsFirestoreConnected(true);
          setLastSyncTime(new Date());
        }
      },
      (error) => {
        console.warn('Real-time evaluations notice:', error.message);
      }
    );
    return () => unsubscribe();
  }, []);

  // 2. Setup real-time listener for judges
  useEffect(() => {
    const judgesRef = collection(db, 'judges');
    const unsubscribe = onSnapshot(
      judgesRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const remoteJudges: Judge[] = [];
          snapshot.forEach(docSnap => {
            remoteJudges.push(docSnap.data() as Judge);
          });
          // Sort by id
          remoteJudges.sort((a, b) => a.id.localeCompare(b.id));
          setJudges(remoteJudges);
        } else {
          // Automatically populate initial judges in Firestore
          const batch = writeBatch(db);
          INITIAL_JUDGES.forEach(j => {
            batch.set(doc(db, 'judges', j.id), j);
          });
          batch.commit().catch(err => console.warn('Judge init notice:', err));
        }
      },
      (err) => console.warn('Judges sync notice:', err.message)
    );
    return () => unsubscribe();
  }, []);

  // 3. Setup real-time listener for problem statements
  useEffect(() => {
    const psRef = collection(db, 'problemStatements');
    const unsubscribe = onSnapshot(
      psRef,
      (snapshot) => {
        const needsUpdate = snapshot.empty || !snapshot.docs.some(d => d.id === 'PS-01' && d.data()?.title === 'Multimodal Misinformation Verification');
        
        if (!needsUpdate) {
          const remotePS: ProblemStatement[] = [];
          snapshot.forEach(docSnap => {
            remotePS.push(docSnap.data() as ProblemStatement);
          });
          remotePS.sort((a, b) => a.id.localeCompare(b.id));
          setProblemStatements(remotePS);
        } else {
          // Automatically populate official BVB problem statements in Firestore
          const batch = writeBatch(db);
          INITIAL_PROBLEM_STATEMENTS.forEach(ps => {
            batch.set(doc(db, 'problemStatements', ps.id), ps);
          });
          batch.commit().catch(err => console.warn('PS init notice:', err));
          setProblemStatements(INITIAL_PROBLEM_STATEMENTS);
        }
      },
      (err) => console.warn('PS sync notice:', err.message)
    );
    return () => unsubscribe();
  }, []);

  // 4. Setup real-time listener for teams
  useEffect(() => {
    const teamsRef = collection(db, 'teams');
    const unsubscribe = onSnapshot(
      teamsRef,
      (snapshot) => {
        const needsUpdate = snapshot.empty || !snapshot.docs.some(d => d.id === 'team-01' && d.data()?.teamName === 'Sike-Nova');
        
        if (!needsUpdate) {
          const remoteTeams: Team[] = [];
          snapshot.forEach(docSnap => {
            remoteTeams.push(docSnap.data() as Team);
          });
          remoteTeams.sort((a, b) => a.teamNumber - b.teamNumber);
          setTeams(remoteTeams);
        } else {
          // Automatically populate official BVB teams in Firestore
          const batch = writeBatch(db);
          INITIAL_TEAMS.forEach(t => {
            batch.set(doc(db, 'teams', t.id), t);
          });
          batch.commit().catch(err => console.warn('Teams init notice:', err));
          setTeams(INITIAL_TEAMS);
        }
      },
      (err) => console.warn('Teams sync notice:', err.message)
    );
    return () => unsubscribe();
  }, []);

  // 5. Setup real-time listener for eventConfig
  useEffect(() => {
    const configDocRef = doc(db, 'eventConfig', 'main');
    const unsubscribe = onSnapshot(
      configDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as EventConfig;
          setEventConfig(prev => ({ ...prev, ...data }));
        } else {
          // Initialize eventConfig in Firestore
          setDoc(configDocRef, INITIAL_EVENT_CONFIG).catch(err => console.warn('Config init notice:', err));
        }
      },
      (error) => console.warn('Config sync notice:', error.message)
    );
    return () => unsubscribe();
  }, []);

  // Auth / Navigation Handlers
  const loginAsJudge = useCallback((judgeId: string) => {
    const found = judges.find(j => j.id === judgeId);
    if (found) {
      setCurrentJudge(found);
      localStorage.setItem(LOCAL_STORAGE_JUDGE_KEY, found.id);
      setActiveView('dashboard');
    }
  }, [judges]);

  const logoutJudge = useCallback(() => {
    setCurrentJudge(null);
    setIsAdmin(false);
    localStorage.removeItem(LOCAL_STORAGE_JUDGE_KEY);
    localStorage.removeItem(LOCAL_STORAGE_ADMIN_KEY);
    setActiveView('dashboard');
  }, []);

  const toggleAdminMode = useCallback((adminVal?: boolean) => {
    setIsAdmin(prev => {
      const next = adminVal !== undefined ? adminVal : !prev;
      localStorage.setItem(LOCAL_STORAGE_ADMIN_KEY, String(next));
      if (next) {
        setActiveView('admin');
      } else {
        setActiveView('dashboard');
      }
      return next;
    });
  }, []);

  const openEvaluation = useCallback((psId: string) => {
    setActiveProblemStatementId(psId);
    setActiveView('evaluation');
  }, []);

  // Helpers
  const getTeamById = useCallback((teamId: string) => teams.find(t => t.id === teamId), [teams]);
  const getPSById = useCallback((psId: string) => problemStatements.find(p => p.id === psId), [problemStatements]);
  const getJudgeById = useCallback((judgeId: string) => judges.find(j => j.id === judgeId), [judges]);

  const getEvaluationForTeam = useCallback((judgeId: string, teamId: string): Evaluation | undefined => {
    return evaluations[`${judgeId}_${teamId}`];
  }, [evaluations]);

  const isJudgeAssignedToPS = useCallback((judgeId: string, psId: string): boolean => {
    return judgeAssignments.some(a => a.judgeId === judgeId && a.problemStatementId === psId);
  }, [judgeAssignments]);

  const getProblemStatementStatus = useCallback((psId: string, judgeId?: string): 'evaluated' | 'in_progress' | 'not_evaluated' => {
    const targetJudgeId = judgeId || currentJudge?.id;
    if (!targetJudgeId) return 'not_evaluated';

    const ps = problemStatements.find(p => p.id === psId);
    if (!ps) return 'not_evaluated';

    const team1Eval = evaluations[`${targetJudgeId}_${ps.teamIds[0]}`];
    const team2Eval = evaluations[`${targetJudgeId}_${ps.teamIds[1]}`];

    const team1Submitted = team1Eval && team1Eval.status === 'submitted';
    const team2Submitted = team2Eval && team2Eval.status === 'submitted';

    if (team1Submitted && team2Submitted) return 'evaluated';
    if (team1Submitted || team2Submitted) return 'in_progress';
    return 'not_evaluated';
  }, [currentJudge, problemStatements, evaluations]);

  // Admin: Update Judge Details (Name, Title, Expertise)
  const updateJudge = useCallback(async (judgeId: string, updatedData: Partial<Judge>) => {
    setJudges(prev => {
      const next = prev.map(j => {
        if (j.id === judgeId) {
          const updated = { ...j, ...updatedData };
          // If the currently logged in judge is updated, sync their profile
          if (currentJudge?.id === judgeId) {
            setCurrentJudge(updated);
          }
          return updated;
        }
        return j;
      });
      return next;
    });

    try {
      const judgeDocRef = doc(db, 'judges', judgeId);
      await setDoc(judgeDocRef, updatedData, { merge: true });
    } catch (err) {
      console.warn('Judge update notice:', err);
    }
  }, [currentJudge]);

  // Admin: Update Problem Statement Details (Title, Category, Description, Team Names)
  const updateProblemStatement = useCallback(async (
    psId: string,
    data: {
      title: string;
      category?: string;
      description?: string;
      team1Name?: string;
      team2Name?: string;
    }
  ) => {
    const targetPS = problemStatements.find(p => p.id === psId);
    if (!targetPS) return;

    // 1. Update problem statement in state
    setProblemStatements(prev => prev.map(p => {
      if (p.id === psId) {
        return {
          ...p,
          title: data.title,
          category: data.category || p.category,
          description: data.description || p.description
        };
      }
      return p;
    }));

    // 2. Update teams in state if names provided
    if (data.team1Name || data.team2Name) {
      setTeams(prev => prev.map(t => {
        if (t.id === targetPS.teamIds[0] && data.team1Name) {
          return { ...t, teamName: data.team1Name };
        }
        if (t.id === targetPS.teamIds[1] && data.team2Name) {
          return { ...t, teamName: data.team2Name };
        }
        return t;
      }));
    }

    // 3. Save to Firestore
    try {
      const psDocRef = doc(db, 'problemStatements', psId);
      await setDoc(psDocRef, {
        id: psId,
        code: targetPS.code,
        title: data.title,
        category: data.category || targetPS.category,
        description: data.description || targetPS.description,
        teamIds: targetPS.teamIds
      }, { merge: true });

      if (data.team1Name) {
        const t1Ref = doc(db, 'teams', targetPS.teamIds[0]);
        await setDoc(t1Ref, { teamName: data.team1Name }, { merge: true });
      }
      if (data.team2Name) {
        const t2Ref = doc(db, 'teams', targetPS.teamIds[1]);
        await setDoc(t2Ref, { teamName: data.team2Name }, { merge: true });
      }
    } catch (err) {
      console.warn('Problem statement update notice:', err);
    }
  }, [problemStatements]);

  // Admin: Reset judges and problem statements back to initial defaults
  const resetAllToDefaultEventData = useCallback(async () => {
    setJudges(INITIAL_JUDGES);
    setProblemStatements(INITIAL_PROBLEM_STATEMENTS);
    setTeams(INITIAL_TEAMS);
    localStorage.removeItem(LOCAL_STORAGE_JUDGES_KEY);
    localStorage.removeItem(LOCAL_STORAGE_PS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_TEAMS_KEY);

    try {
      const batch = writeBatch(db);
      INITIAL_JUDGES.forEach(j => {
        batch.set(doc(db, 'judges', j.id), j);
      });
      INITIAL_PROBLEM_STATEMENTS.forEach(ps => {
        batch.set(doc(db, 'problemStatements', ps.id), ps);
      });
      INITIAL_TEAMS.forEach(t => {
        batch.set(doc(db, 'teams', t.id), t);
      });
      await batch.commit();
    } catch (err) {
      console.warn('Reset batch notice:', err);
    }
  }, []);

  // Core Submission: SIDE-BY-SIDE DUAL EVALUATION
  const submitDualEvaluation = useCallback(async (
    judgeId: string,
    problemStatementId: string,
    team1Data: {
      teamId: string;
      teamName: string;
      creativity: number;
      technicalImplementation: number;
      innovation: number;
      feasibility: number;
      presentation: number;
      feedback: string;
    },
    team2Data: {
      teamId: string;
      teamName: string;
      creativity: number;
      technicalImplementation: number;
      innovation: number;
      feasibility: number;
      presentation: number;
      feedback: string;
    }
  ): Promise<boolean> => {
    setIsSyncing(true);
    const now = new Date().toISOString();
    const judge = judges.find(j => j.id === judgeId) || currentJudge;
    const judgeName = judge ? `${judge.name} (${judge.title})` : judgeId;

    const team1Total = team1Data.creativity + team1Data.technicalImplementation + team1Data.innovation + team1Data.feasibility + team1Data.presentation;
    const team2Total = team2Data.creativity + team2Data.technicalImplementation + team2Data.innovation + team2Data.feasibility + team2Data.presentation;

    const eval1Id = `${judgeId}_${team1Data.teamId}`;
    const eval2Id = `${judgeId}_${team2Data.teamId}`;

    const eval1: Evaluation = {
      id: eval1Id,
      judgeId,
      judgeName,
      problemStatementId,
      teamId: team1Data.teamId,
      teamName: team1Data.teamName,
      creativity: team1Data.creativity,
      technicalImplementation: team1Data.technicalImplementation,
      innovation: team1Data.innovation,
      feasibility: team1Data.feasibility,
      presentation: team1Data.presentation,
      totalScore: team1Total,
      feedback: team1Data.feedback,
      status: 'submitted',
      submittedAt: now,
      updatedAt: now
    };

    const eval2: Evaluation = {
      id: eval2Id,
      judgeId,
      judgeName,
      problemStatementId,
      teamId: team2Data.teamId,
      teamName: team2Data.teamName,
      creativity: team2Data.creativity,
      technicalImplementation: team2Data.technicalImplementation,
      innovation: team2Data.innovation,
      feasibility: team2Data.feasibility,
      presentation: team2Data.presentation,
      totalScore: team2Total,
      feedback: team2Data.feedback,
      status: 'submitted',
      submittedAt: now,
      updatedAt: now
    };

    setEvaluations(prev => ({
      ...prev,
      [eval1Id]: eval1,
      [eval2Id]: eval2
    }));

    try {
      const batch = writeBatch(db);
      const docRef1 = doc(db, 'evaluations', eval1Id);
      const docRef2 = doc(db, 'evaluations', eval2Id);

      batch.set(docRef1, eval1);
      batch.set(docRef2, eval2);

      await batch.commit();
      setIsFirestoreConnected(true);
      setLastSyncTime(new Date());
      setIsSyncing(false);
      return true;
    } catch (error) {
      console.warn('Firestore write warning:', error);
      setIsSyncing(false);
      return true;
    }
  }, [judges, currentJudge]);

  // Admin: Unlock evaluation
  const unlockEvaluation = useCallback(async (evaluationId: string) => {
    setEvaluations(prev => {
      const target = prev[evaluationId];
      if (!target) return prev;
      return {
        ...prev,
        [evaluationId]: {
          ...target,
          status: 'unlocked',
          updatedAt: new Date().toISOString()
        }
      };
    });

    try {
      const docRef = doc(db, 'evaluations', evaluationId);
      await setDoc(docRef, { status: 'unlocked', updatedAt: new Date().toISOString() }, { merge: true });
    } catch (error) {
      console.warn('Firestore unlock warning:', error);
    }
  }, []);

  // Admin: Reset evaluation
  const resetEvaluation = useCallback(async (evaluationId: string) => {
    setEvaluations(prev => {
      const copy = { ...prev };
      delete copy[evaluationId];
      return copy;
    });

    try {
      const docRef = doc(db, 'evaluations', evaluationId);
      await deleteDoc(docRef);
    } catch (error) {
      console.warn('Firestore delete warning:', error);
    }
  }, []);

  // Admin: Toggle assignment
  const toggleJudgeAssignment = useCallback(async (judgeId: string, problemStatementId: string) => {
    const assignmentId = `${judgeId}_${problemStatementId}`;
    const exists = judgeAssignments.some(a => a.id === assignmentId);

    if (exists) {
      setJudgeAssignments(prev => prev.filter(a => a.id !== assignmentId));
      try {
        await deleteDoc(doc(db, 'judgeAssignments', assignmentId));
      } catch (err) {}
    } else {
      const newAssignment: JudgeAssignment = {
        id: assignmentId,
        judgeId,
        problemStatementId,
        assignedAt: new Date().toISOString()
      };
      setJudgeAssignments(prev => [...prev, newAssignment]);
      try {
        await setDoc(doc(db, 'judgeAssignments', assignmentId), newAssignment);
      } catch (err) {}
    }
  }, [judgeAssignments]);

  // Admin: Config update
  const updateEventConfig = useCallback(async (newConfig: Partial<EventConfig>) => {
    const updated = {
      ...eventConfig,
      ...newConfig,
      lastUpdated: new Date().toISOString()
    };
    setEventConfig(updated);
    try {
      await setDoc(doc(db, 'eventConfig', 'main'), updated, { merge: true });
    } catch (err) {}
  }, [eventConfig]);

  // Demo controls: Seed demo evaluations
  const seedDemoDataToFirestore = useCallback(async () => {
    setIsSyncing(true);
    const demoMap: Record<string, Evaluation> = {};
    SEED_DEMO_EVALUATIONS.forEach(ev => {
      demoMap[ev.id] = ev;
    });
    setEvaluations(demoMap);

    try {
      const batch = writeBatch(db);
      SEED_DEMO_EVALUATIONS.forEach(ev => {
        batch.set(doc(db, 'evaluations', ev.id), ev);
      });
      await batch.commit();
      setIsFirestoreConnected(true);
      setLastSyncTime(new Date());
    } catch (err) {
      console.warn('Seed batch warning:', err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Demo controls: Clear evaluations
  const clearAllEvaluationsFromFirestore = useCallback(async () => {
    setIsSyncing(true);
    const currentIds = Object.keys(evaluations);
    setEvaluations({});

    try {
      const batch = writeBatch(db);
      currentIds.forEach(id => {
        batch.delete(doc(db, 'evaluations', id));
      });
      await batch.commit();
    } catch (err) {
      console.warn('Clear batch warning:', err);
    } finally {
      setIsSyncing(false);
    }
  }, [evaluations]);

  // Live Leaderboard Calculation
  const getLeaderboard = useCallback((): TeamLeaderboardEntry[] => {
    const entries: TeamLeaderboardEntry[] = teams.map(team => {
      const ps = problemStatements.find(p => p.id === team.problemStatementId);
      
      const teamEvals = Object.values(evaluations).filter(
        ev => ev.teamId === team.id && ev.status === 'submitted'
      );

      const count = teamEvals.length;
      const totalScoreSum = teamEvals.reduce((sum, ev) => sum + ev.totalScore, 0);
      const rawAvg = count > 0 ? totalScoreSum / count : 0;
      const averageScore = Math.round(rawAvg * 100) / 100;
      const rawPct = count > 0 ? (rawAvg / 25) * 100 : 0;
      const percentage = Math.round(rawPct * 100) / 100;

      const isComplete = count >= eventConfig.minRequiredJudges;

      return {
        rank: 0,
        teamId: team.id,
        teamName: team.teamName,
        problemStatementId: team.problemStatementId,
        problemStatementTitle: ps ? ps.title : '',
        projectTitle: team.projectTitle,
        evaluationsCount: count,
        requiredEvaluations: eventConfig.minRequiredJudges,
        isComplete,
        averageScore,
        percentage,
        lab: team.lab || ps?.lab || 'Lab 414',
        teamRole: team.teamRole,
        judgeScores: teamEvals.map(ev => ({
          judgeId: ev.judgeId,
          judgeName: ev.judgeName,
          score: ev.totalScore
        }))
      };
    });

    entries.sort((a, b) => {
      if (a.evaluationsCount === 0 && b.evaluationsCount === 0) {
        return a.teamId.localeCompare(b.teamId);
      }
      if (a.evaluationsCount === 0) return 1;
      if (b.evaluationsCount === 0) return -1;

      if (!eventConfig.showIncompleteTeams) {
        if (a.isComplete && !b.isComplete) return -1;
        if (!a.isComplete && b.isComplete) return 1;
      }

      if (b.averageScore !== a.averageScore) {
        return b.averageScore - a.averageScore;
      }
      return b.evaluationsCount - a.evaluationsCount;
    });

    return entries.map((entry, idx) => ({
      ...entry,
      rank: idx + 1
    }));
  }, [teams, problemStatements, evaluations, eventConfig]);

  const value = useMemo(() => ({
    judges,
    problemStatements,
    teams,
    evaluations,
    judgeAssignments,
    eventConfig,
    currentJudge,
    isAdmin,
    activeView,
    activeProblemStatementId,
    isFirestoreConnected,
    isSyncing,
    lastSyncTime,
    loginAsJudge,
    logoutJudge,
    toggleAdminMode,
    setActiveView,
    openEvaluation,
    submitDualEvaluation,
    unlockEvaluation,
    resetEvaluation,
    toggleJudgeAssignment,
    updateEventConfig,
    seedDemoDataToFirestore,
    clearAllEvaluationsFromFirestore,
    updateJudge,
    updateProblemStatement,
    resetAllToDefaultEventData,
    getEvaluationForTeam,
    getProblemStatementStatus,
    isJudgeAssignedToPS,
    getLeaderboard,
    getTeamById,
    getPSById,
    getJudgeById
  }), [
    judges,
    problemStatements,
    teams,
    evaluations,
    judgeAssignments,
    eventConfig,
    currentJudge,
    isAdmin,
    activeView,
    activeProblemStatementId,
    isFirestoreConnected,
    isSyncing,
    lastSyncTime,
    loginAsJudge,
    logoutJudge,
    toggleAdminMode,
    setActiveView,
    openEvaluation,
    submitDualEvaluation,
    unlockEvaluation,
    resetEvaluation,
    toggleJudgeAssignment,
    updateEventConfig,
    seedDemoDataToFirestore,
    clearAllEvaluationsFromFirestore,
    updateJudge,
    updateProblemStatement,
    resetAllToDefaultEventData,
    getEvaluationForTeam,
    getProblemStatementStatus,
    isJudgeAssignedToPS,
    getLeaderboard,
    getTeamById,
    getPSById,
    getJudgeById
  ]);

  return (
    <HackathonContext.Provider value={value}>
      {children}
    </HackathonContext.Provider>
  );
};

export const useHackathon = () => {
  const context = useContext(HackathonContext);
  if (!context) {
    throw new Error('useHackathon must be used within a HackathonProvider');
  }
  return context;
};
