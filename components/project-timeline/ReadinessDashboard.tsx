'use client';

import { readinessCategories } from './timeline-data';

const STATUS_COLORS = {
  'ready': { bg: 'bg-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-500' },
  'partial': { bg: 'bg-amber-500/20', text: 'text-amber-400', dot: 'bg-amber-500' },
  'blocked': { bg: 'bg-red-500/20', text: 'text-red-400', dot: 'bg-red-500' },
  'not-started': { bg: 'bg-gray-500/20', text: 'text-gray-400', dot: 'bg-gray-500' },
};

function ScoreRing({ score, size = 48 }: { score: number; size?: number }) {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke="#374151" strokeWidth={3} fill="none"
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={color} strokeWidth={3} fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[11px] font-bold text-white">{score}%</span>
      </div>
    </div>
  );
}

export default function ReadinessDashboard() {
  const overallScore = Math.round(
    readinessCategories.reduce((sum, c) => sum + c.score, 0) / readinessCategories.length
  );

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700/50 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-700/50 bg-gray-800/50 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white">EPC Readiness</h2>
          <p className="text-[10px] text-gray-500 mt-0.5">Assessment: 10 Feb 2026</p>
        </div>
        <ScoreRing score={overallScore} size={40} />
      </div>

      <div className="p-3 space-y-3">
        {readinessCategories.map((cat) => (
          <div key={cat.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-medium text-gray-300">{cat.name}</span>
              <span className={`text-[10px] font-bold ${
                cat.score >= 70 ? 'text-emerald-400' : cat.score >= 40 ? 'text-amber-400' : 'text-red-400'
              }`}>{cat.score}%</span>
            </div>
            {/* Progress bar */}
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden mb-2">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  cat.score >= 70 ? 'bg-emerald-500' : cat.score >= 40 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${cat.score}%` }}
              />
            </div>
            {/* Items */}
            <div className="grid grid-cols-1 gap-0.5">
              {cat.items.map((item) => {
                const colors = STATUS_COLORS[item.status];
                return (
                  <div key={item.name} className="flex items-center gap-1.5 py-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot}`} />
                    <span className={`text-[10px] ${colors.text}`}>{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
