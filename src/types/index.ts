export interface Job {
  id?: string;
  title: string;
  company: string;
  location: {
    lat?: number;
    lng?: number;
    address: string;
  };
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  type: 'full-time' | 'part-time' | 'contract';
  createdAt: Date;
  syncStatus: 'pending' | 'synced' | 'failed';
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  stats: {
    jobsCollected: number;
    pendingSync: number;
    syncedToday: number;
  };
}