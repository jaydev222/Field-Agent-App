import React from 'react';
import { CloudOff, RefreshCw, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Job } from '../../types';

interface SyncStatusProps {
  pendingJobs: Job[];
  onSync: () => void;
  isOnline: boolean;
  isSyncing: boolean;
  error: string | null;
}

export function SyncStatus({ 
  pendingJobs, 
  onSync, 
  isOnline, 
  isSyncing,
  error 
}: SyncStatusProps) {
  const pendingCount = pendingJobs.length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Sync Status</h3>
        {isOnline ? (
          <CheckCircle className="text-green-500" size={20} />
        ) : (
          <CloudOff className="text-gray-400" size={20} />
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Pending Uploads</span>
          <span className="font-semibold">{pendingCount}</span>
        </div>

        {error && (
          <div className="text-sm text-red-600 flex items-center gap-2">
            <XCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={onSync}
          disabled={!isOnline || pendingCount === 0 || isSyncing}
          className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg
            ${isOnline && pendingCount > 0 && !isSyncing
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
        >
          {isSyncing ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <RefreshCw size={16} />
          )}
          <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
        </button>
      </div>
    </div>
  );
}