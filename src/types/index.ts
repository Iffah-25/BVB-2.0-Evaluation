export interface EvaluationParameter {
  id: string;
  name: string;
  maxScore: number;
  description: string;
  weight?: number;
}

export interface Judge {
  id: string;
  name: string;
  title: string;
  expertise: string;
  avatar: string;
  email?: string;
}

export interface ProblemStatement {
  id: string; // e.g. "PS-01"
  code: string;
  title: string;
  category: string;
  description: string;
  teamIds: [string, string]; // exactly 2 teams
}

export interface Team {
  id: string; // e.g. "team-01"
  teamNumber: number;
  teamName: string;
  problemStatementId: string;
  projectTitle: string;
  description: string;
  members: string[];
  techStack: string[];
}

export interface EvaluationScores {
  creativity: number;
  technicalImplementation: number;
  innovation: number;
  feasibility: number;
  presentation: number;
}

export interface Evaluation {
  id: string; // usually `${judgeId}_${teamId}`
  judgeId: string;
  judgeName: string;
  problemStatementId: string;
  teamId: string;
  teamName: string;
  creativity: number;
  technicalImplementation: number;
  innovation: number;
  feasibility: number;
  presentation: number;
  totalScore: number; // max 25
  feedback?: string;
  status: 'draft' | 'submitted' | 'unlocked';
  submittedAt: string;
  updatedAt: string;
}

export interface JudgeAssignment {
  id: string; // `${judgeId}_${problemStatementId}`
  judgeId: string;
  problemStatementId: string;
  assignedAt?: string;
}

export interface EventConfig {
  minRequiredJudges: number;
  showIncompleteTeams: boolean;
  parameters: EvaluationParameter[];
  lastUpdated?: string;
}

export interface TeamLeaderboardEntry {
  rank: number;
  teamId: string;
  teamName: string;
  problemStatementId: string;
  problemStatementTitle: string;
  projectTitle: string;
  evaluationsCount: number;
  requiredEvaluations: number;
  isComplete: boolean;
  averageScore: number; // e.g. 22.33
  percentage: number; // e.g. 89.32
  judgeScores: {
    judgeId: string;
    judgeName: string;
    score: number;
  }[];
}
