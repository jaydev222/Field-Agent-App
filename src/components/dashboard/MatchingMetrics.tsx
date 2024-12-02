import React from 'react';
import { Target, Zap } from 'lucide-react';
import { MatchMetrics } from '../../types/matching';

interface MatchingMetricsProps {
  metrics: MatchMetrics;
}

export function MatchingMetrics({ metrics }: MatchingMetricsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Matching Insights</h3>
        <Target className="text-blue-500" size={20} />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Match Rate</span>
          <span className="text-lg font-semibold">
            {(metrics.averageScore * 100).toFixed(1)}%
          </span>
        </div>

        <div className="space-y-2">
          <span className="text-sm text-gray-600">Top Matching Skills</span>
          <div className="flex flex-wrap gap-2">
            {metrics.topSkills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-yellow-500" size={16} />
            <span className="text-sm font-medium">Recent Matches</span>
          </div>
          <div className="space-y-2">
            {metrics.recentMatches.slice(0, 3).map((match, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 bg-gray-50 rounded"
              >
                <span className="text-sm truncate">Job #{match.jobId}</span>
                <span className="text-sm font-medium text-blue-600">
                  {(match.score * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}