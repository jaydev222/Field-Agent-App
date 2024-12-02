import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Job } from '../types';

interface FieldAgentDB extends DBSchema {
  jobs: {
    key: string;
    value: Job;
    indexes: { 'by-sync-status': string };
  };
}

const DB_NAME = 'field-agent-db';
const DB_VERSION = 1;

export async function initDB(): Promise<IDBPDatabase<FieldAgentDB>> {
  return openDB<FieldAgentDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const jobStore = db.createObjectStore('jobs', {
        keyPath: 'id',
        autoIncrement: true,
      });
      jobStore.createIndex('by-sync-status', 'syncStatus');
    },
  });
}

export async function saveJob(job: Omit<Job, 'id'>): Promise<string> {
  const db = await initDB();
  const id = await db.add('jobs', job as Job);
  return String(id);
}

export async function getPendingJobs(): Promise<Job[]> {
  const db = await initDB();
  return db.getAllFromIndex('jobs', 'by-sync-status', 'pending');
}

export async function updateJobSyncStatus(id: string, status: Job['syncStatus']): Promise<void> {
  const db = await initDB();
  const job = await db.get('jobs', id);
  if (job) {
    job.syncStatus = status;
    await db.put('jobs', job);
  }
}