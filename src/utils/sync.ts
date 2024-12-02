import { Job } from '../types';
import { getPendingJobs, updateJobSyncStatus } from './db';

const API_URL = 'https://api.fieldagent.app'; // Replace with actual API URL

interface SyncResult {
  success: boolean;
  syncedCount: number;
  failedCount: number;
  errors: string[];
}

export async function syncJobs(): Promise<SyncResult> {
  const result: SyncResult = {
    success: true,
    syncedCount: 0,
    failedCount: 0,
    errors: []
  };

  try {
    const pendingJobs = await getPendingJobs();
    
    for (const job of pendingJobs) {
      try {
        const response = await fetch(`${API_URL}/jobs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add authentication headers here
          },
          body: JSON.stringify(job)
        });

        if (response.ok) {
          await updateJobSyncStatus(job.id!, 'synced');
          result.syncedCount++;
        } else {
          throw new Error(`Failed to sync job ${job.id}`);
        }
      } catch (error) {
        await updateJobSyncStatus(job.id!, 'failed');
        result.failedCount++;
        result.errors.push(`Job ${job.id}: ${error.message}`);
      }
    }
  } catch (error) {
    result.success = false;
    result.errors.push(`Sync failed: ${error.message}`);
  }

  return result;
}