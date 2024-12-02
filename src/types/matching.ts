export interface SkillMatch {
  skill: string;
  weight: number;
  score: number;
}

export interface JobMatch {
  jobId: string;
  score: number;
  skillMatches: SkillMatch[];
  locationScore: number;
  salaryMatch: number;
}

export interface MatchMetrics {
  totalMatches: number;
  averageScore: number;
  topSkills: string[];
  recentMatches: JobMatch[];
}