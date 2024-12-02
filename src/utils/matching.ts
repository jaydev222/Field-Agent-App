import { Job } from '../types';
import { JobMatch, SkillMatch } from '../types/matching';
import { calculateLocationScore } from './location';
import { calculateSalaryMatch, SalaryPreference } from './salary';

interface MatchingPreferences {
  skills: string[];
  location: {
    lat: number;
    lng: number;
  };
  salary: SalaryPreference;
}

export function calculateJobMatch(
  job: Job,
  preferences: MatchingPreferences
): JobMatch {
  // Calculate skill matches
  const skillMatches: SkillMatch[] = job.requirements.map(req => {
    const matchingSkill = preferences.skills.find(skill => 
      skill.toLowerCase().includes(req.toLowerCase()) ||
      req.toLowerCase().includes(skill.toLowerCase())
    );
    
    return {
      skill: req,
      weight: matchingSkill ? 1 : 0.5,
      score: matchingSkill ? 1 : 0
    };
  });

  const skillScore = skillMatches.reduce((acc, match) => 
    acc + (match.score * match.weight), 0) / skillMatches.length;

  const locationScore = calculateLocationScore(job, preferences.location);
  const salaryMatch = calculateSalaryMatch(job, preferences.salary);

  // Calculate final score with weights
  const finalScore = (
    skillScore * 0.5 +
    locationScore * 0.3 +
    salaryMatch * 0.2
  );

  return {
    jobId: job.id!,
    score: finalScore,
    skillMatches,
    locationScore,
    salaryMatch
  };
}