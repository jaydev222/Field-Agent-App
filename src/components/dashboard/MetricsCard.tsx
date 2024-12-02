import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
}

export function MetricsCard({ title, value, change, icon }: MetricsCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-gray-500">{icon}</div>
        <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span className="ml-1 text-sm">{Math.abs(change)}%</span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-4xl font-semibold">{value}</h3>
        <p className="text-gray-600 mt-1">{title}</p>
      </div>
    </div>
  );
}