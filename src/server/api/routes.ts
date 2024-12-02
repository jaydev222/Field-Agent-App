import { Router } from 'express';
import { createJob, getJobs, getJobMatches } from './jobs/controller';
import { apiLimiter } from '../middleware/rateLimiter';

const router = Router();

// Jobs routes
router.post('/jobs', apiLimiter, createJob);
router.get('/jobs', apiLimiter, getJobs);
router.get('/jobs/:jobId/matches', apiLimiter, getJobMatches);

export default router;