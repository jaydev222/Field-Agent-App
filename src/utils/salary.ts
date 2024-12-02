import { Job } from '../types';

export interface SalaryPreference {
  minimum: number;
  maximum: number;
  currency: string;
}

export function calculateSalaryMatch(
  job: Job,
  preference: SalaryPreference
): number {
  if (job.salary.currency !== preference.currency) {
    return 0.5; // Different currency, neutral score
  }

  const jobMedian = (job.salary.min + job.salary.max) / 2;
  const preferenceMedian = (preference.minimum + preference.maximum) / 2;
  
  // Calculate how close the job's median salary is to the preferred median
  const difference = Math.abs(jobMedian - preferenceMedian);
  const range = Math.max(job.salary.max - job.salary.min, preference.maximum - preference.minimum);
  
  return Math.max(0, 1 - (difference / range));
}