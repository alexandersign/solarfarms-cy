'use client';

import { keyMilestones, type KeyMilestone, type TaskStatus } from './timeline-data';

const STATUS_CONFIG: Record<TaskStatus, { dot: string; line: string; label: string; bg: string }> = {
  'complete': { dot: 'bg-emerald-500', line: 'bg-emerald-500', label: 'Done', bg: 'bg-emerald-500/10' },
  'in-progress': { dot: 'bg-amber-500 animate-pulse', line: 'bg-amber-500', label: 'Active', bg: 'bg-amber-500/10' },
  'not-started': { dot: 'bg-gray-600', line: 'bg-gray-700', label: 'Pending', bg: 'bg-gray-500/5' },
  'blocked': { dot: 'bg-red-500', line: 'bg-red-500/50', label: 'Blocked', bg: 'bg-red-500/10' },
  'critical': { dot: 'bg-red-500 animate-pulse', line: 'bg-red-500/50', label: 'Critical', bg: 'bg-red-500/10' },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() !== 2026 ? d.getFullYear() : ''}`.trim();
}

function daysFromNow(iso: string): number {
  const now = new Date();
  const target = new Date(iso);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export default function MilestoneTracker() {
  const sorted = [...keyMilestones].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700/50 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-700/50 bg-gray-800/50">
        <h2 className="text-sm font-semibold text-white">Key Milestones</h2>
        <p className="text-[10px] text-gray-500 mt-0.5">
          {sorted.filter(m => m.status === 'complete').length}/{sorted.length} complete
        </p>
      </div>

      <div className="p-4 space-y-0">
        {sorted.map((milestone, i) => {
          const config = STATUS_CONFIG[milestone.status];
          const days = daysFromNow(milestone.date);
          const isLast = i === sorted.length - 1;
          const isPast = days < 0;

          return (
            <div key={milestone.id} className="flex gap-3">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full border-2 border-gray-800 flex-shrink-0 ${config.dot}`} />
                {!isLast && (
                  <div className={`w-0.5 flex-1 min-h-[24px] ${config.line}`} />
                )}
              </div>

              {/* Content */}
              <div className={`flex-1 pb-3 -mt-0.5 ${isLast ? '' : ''}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium leading-tight ${
                      milestone.status === 'complete' ? 'text-gray-500 line-through' : 'text-white'
                    }`}>
                      {milestone.name}
                      {milestone.critical && milestone.status !== 'complete' && (
                        <span className="text-red-400 text-[9px] ml-1">*</span>
                      )}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[10px] text-gray-400">{formatDate(milestone.date)}</p>
                    {milestone.status !== 'complete' && (
                      <p className={`text-[9px] ${
                        days <= 7 ? 'text-red-400' : days <= 30 ? 'text-amber-400' : 'text-gray-500'
                      }`}>
                        {isPast ? `${Math.abs(days)}d overdue` : days === 0 ? 'Today' : `${days}d`}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
