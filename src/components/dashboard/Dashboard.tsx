import React, { useState, useEffect } from 'react';
import { Briefcase, Users, MapPin, Target } from 'lucide-react';
import { MetricsCard } from './MetricsCard';
import { SyncStatus } from './SyncStatus';
import { ActivityChart } from './ActivityChart';
import { MatchingMetrics } from './MatchingMetrics';
import { getPendingJobs } from '../../utils/db';
import { syncJobs } from '../../utils/sync';
import { Job } from '../../types';
import { MatchMetrics } from '../../types/matching';

export function Dashboard() {
  const [pendingJobs, setPendingJobs] = useState<Job[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  useEffect(() => {
    const loadPendingJobs = async () => {
      const jobs = await getPendingJobs();
      setPendingJobs(jobs);
    };

    loadPendingJobs();

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncError(null);
    
    try {
      const result = await syncJobs();
      if (!result.success) {
        setSyncError(result.errors[0]);
      }
      // Refresh pending jobs
      const jobs = await getPendingJobs();
      setPendingJobs(jobs);
    } catch (error) {
      setSyncError(error.message);
    } finally {
      setIsSyncing(false);
    }
  };

  const mockActivityData = [
    { date: new Date('2024-03-01'), jobs: 5 },
    { date: new Date('2024-03-02'), jobs: 8 },
    { date: new Date('2024-03-03'), jobs: 12 },
    { date: new Date('2024-03-04'), jobs: 7 },
    { date: new Date('2024-03-05'), jobs: 15 },
  ];

  const mockMatchMetrics: MatchMetrics = {
    totalMatches: 45,
    averageScore: 0.78,
    topSkills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
    recentMatches: [
      { jobId: '001', score: 0.92, skillMatches: [], locationScore: 1, salaryMatch: 1 },
      { jobId: '002', score: 0.85, skillMatches: [], locationScore: 1, salaryMatch: 1 },
      { jobId: '003', score: 0.79, skillMatches: [], locationScore: 1, salaryMatch: 1 },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Jobs"
          value={156}
          change={12}
          icon={<Briefcase size={24} />}
        />
        <MetricsCard
          title="Active Agents"
          value={24}
          change={-3}
          icon={<Users size={24} />}
        />
        <MetricsCard
          title="Coverage Area"
          value={8}
          change={25}
          icon={<MapPin size={24} />}
        />
        <MetricsCard
          title="Match Rate"
          value={78}
          change={15}
          icon={<Target size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ActivityChart data={mockActivityData} />
        </div>
        <div className="space-y-6">
          <SyncStatus
            pendingJobs={pendingJobs}
            onSync={handleSync}
            isOnline={isOnline}
            isSyncing={isSyncing}
            error={syncError}
          />
          <MatchingMetrics metrics={mockMatchMetrics} />
        </div>
      </div>
    </div>
  );
}