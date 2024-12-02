import { Job } from '../../../types';
import { JobMatch, SkillMatch } from '../../../types/matching';
import { calculateLocationScore } from '../../../utils/location';
import { calculateSalaryMatch } from '../../../utils/salary';

interface MatchPreferences {
  skills: string[];
  location: {
    lat: number;
    lng: number;
    radius: number;
  };
  salary: {
    minimum: number;
    maximum: number;
    currency: string;
  };
}

export async function calculateJobMatch(
  job: Job,
  preferences: MatchPreferences
): Promise<JobMatch> {
  // Calculate skill matches with NLP-inspired matching
  const skillMatches = await calculateSkillMatches(job.requirements, preferences.skills);
  
  // Calculate location score with distance weighting
  const locationScore = calculateLocationScore(job, preferences.location);
  
  // Calculate salary match with range overlap
  const salaryMatch = calculateSalaryMatch(job, preferences.salary);

  // Calculate final score with dynamic weighting
  const weights = calculateDynamicWeights(skillMatches, locationScore, salaryMatch);
  const finalScore = (
    skillMatches.reduce((acc, match) => acc + match.score * match.weight, 0) * weights.skills +
    locationScore * weights.location +
    salaryMatch * weights.salary
  );

  return {
    jobId: job.id!,
    score: finalScore,
    skillMatches,
    locationScore,
    salaryMatch,
  };
}

async function calculateSkillMatches(
  jobRequirements: string[],
  userSkills: string[]
): Promise<SkillMatch[]> {
  return jobRequirements.map(requirement => {
    const matches = userSkills.map(skill => ({
      skill,
      similarity: calculateStringSimilarity(requirement.toLowerCase(), skill.toLowerCase()),
    }));

    const bestMatch = matches.reduce((best, current) => 
      current.similarity > best.similarity ? current : best
    );

    return {
      skill: requirement,
      weight: calculateSkillWeight(requirement),
      score: bestMatch.similarity,
    };
  });
}

function calculateStringSimilarity(str1: string, str2: string): number {
  // Implement Levenshtein distance or similar algorithm
  // This is a simplified version
  const commonChars = str1.split('').filter(char => str2.includes(char)).length;
  return commonChars / Math.max(str1.length, str2.length);
}

function calculateSkillWeight(skill: string): number {
  // Implement skill importance weighting
  // This could be based on market demand, historical data, etc.
  return 1;
}

function calculateDynamicWeights(
  skillMatches: SkillMatch[],
  locationScore: number,
  salaryMatch: number
) {
  // Implement dynamic weight calculation based on context
  return {
    skills: 0.5,
    location: 0.3,
    salary: 0.2,
  };
}