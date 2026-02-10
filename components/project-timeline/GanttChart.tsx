'use client';

import { useMemo, useState } from 'react';
import { phases, daysBetween, timelineStart, timelineEnd, type Phase, type TimelineTask, type TaskStatus } from './timeline-data';

const STATUS_COLORS: Record<TaskStatus, { bg: string; bar: string; text: string }> = {
  'complete': { bg: 'bg-emerald-500/20', bar: 'bg-emerald-500', text: 'text-emerald-400' },
  'in-progress': { bg: 'bg-amber-500/20', bar: 'bg-amber-500', text: 'text-amber-400' },
  'not-started': { bg: 'bg-slate-500/20', bar: 'bg-slate-500', text: 'text-slate-400' },
  'blocked': { bg: 'bg-red-500/20', bar: 'bg-red-500', text: 'text-red-400' },
  'critical': { bg: 'bg-red-600/30', bar: 'bg-red-600', text: 'text-red-300' },
};

const BATCH_LABELS: Record<string, string> = {
  '1': 'B1',
  '2': 'B2',
  '3': 'B3',
  'all': 'ALL',
};

function getMonths(start: string, end: string): { label: string; year: number; startDay: number; days: number }[] {
  const months: { label: string; year: number; startDay: number; days: number }[] = [];
  const s = new Date(start);
  const e = new Date(end);
  const totalDays = daysBetween(start, end);

  let current = new Date(s.getFullYear(), s.getMonth(), 1);
  while (current <= e) {
    const monthStart = current < s ? s : new Date(current);
    const monthEnd = new Date(current.getFullYear(), current.getMonth() + 1, 0);
    const effectiveEnd = monthEnd > e ? e : monthEnd;

    const startDay = daysBetween(start, monthStart.toISOString().split('T')[0]);
    const days = daysBetween(monthStart.toISOString().split('T')[0], effectiveEnd.toISOString().split('T')[0]) + 1;

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    months.push({
      label: monthNames[current.getMonth()],
      year: current.getFullYear(),
      startDay,
      days,
    });

    current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
  }

  return months;
}

function TaskBar({ task, totalDays, tlStart }: { task: TimelineTask; totalDays: number; tlStart: string }) {
  const startOffset = Math.max(0, daysBetween(tlStart, task.start));
  const duration = daysBetween(task.start, task.end) || 1;
  const leftPct = (startOffset / totalDays) * 100;
  const widthPct = Math.max((duration / totalDays) * 100, 0.5);
  const colors = STATUS_COLORS[task.status];

  if (task.milestone) {
    return (
      <div className="relative h-6 w-full">
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: `${leftPct}%` }}
        >
          <div className={`w-4 h-4 rotate-45 ${colors.bar} border-2 border-gray-700`} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-6 w-full">
      <div
        className={`absolute top-1 h-4 rounded-sm ${colors.bg} border border-white/5`}
        style={{ left: `${leftPct}%`, width: `${widthPct}%`, minWidth: '4px' }}
      >
        <div
          className={`h-full rounded-sm ${colors.bar} transition-all duration-500`}
          style={{ width: `${task.progress}%` }}
        />
      </div>
    </div>
  );
}

function PhaseSection({ phase, totalDays, tlStart, expanded, onToggle }: {
  phase: Phase;
  totalDays: number;
  tlStart: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  const phaseStartOffset = Math.max(0, daysBetween(tlStart, phase.start));
  const phaseDuration = daysBetween(phase.start, phase.end);
  const phaseLeftPct = (phaseStartOffset / totalDays) * 100;
  const phaseWidthPct = (phaseDuration / totalDays) * 100;

  return (
    <>
      {/* Phase header row */}
      <tr
        className="cursor-pointer hover:bg-white/5 transition-colors border-b border-gray-700/50"
        onClick={onToggle}
      >
        <td className="sticky left-0 z-10 bg-gray-900/95 backdrop-blur-sm px-3 py-2 border-r border-gray-700/50 min-w-[280px]">
          <div className="flex items-center gap-2">
            <svg
              className={`w-3 h-3 text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`}
              fill="currentColor" viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: phase.color }} />
            <span className="font-semibold text-white text-xs">{phase.shortName}</span>
            <span className="text-gray-500 text-[10px]">({phase.tasks.length})</span>
          </div>
        </td>
        <td className="py-2 px-0">
          <div className="relative h-6 w-full">
            <div
              className="absolute top-1 h-4 rounded-sm opacity-30"
              style={{
                left: `${phaseLeftPct}%`,
                width: `${phaseWidthPct}%`,
                backgroundColor: phase.color,
                minWidth: '4px',
              }}
            />
            <div
              className="absolute top-1 h-4 rounded-sm"
              style={{
                left: `${phaseLeftPct}%`,
                width: `${phaseWidthPct}%`,
                backgroundColor: phase.color,
                opacity: 0.7,
                minWidth: '4px',
              }}
            />
          </div>
        </td>
      </tr>

      {/* Task rows */}
      {expanded && phase.tasks.map((task) => (
        <tr key={task.id} className="hover:bg-white/3 border-b border-gray-800/50 group">
          <td className="sticky left-0 z-10 bg-gray-900/95 backdrop-blur-sm px-3 py-1.5 border-r border-gray-700/50 min-w-[280px]">
            <div className="flex items-center gap-2 pl-5">
              {task.milestone ? (
                <span className="w-2.5 h-2.5 rotate-45 flex-shrink-0" style={{ backgroundColor: phase.color }} />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gray-600" />
              )}
              <span className={`text-[11px] leading-tight ${task.milestone ? 'font-semibold text-white' : 'text-gray-300'}`}>
                {task.name}
              </span>
              {task.batch && (
                <span className="text-[9px] px-1 py-0.5 rounded bg-gray-700 text-gray-400 flex-shrink-0">
                  {BATCH_LABELS[String(task.batch)]}
                </span>
              )}
              {task.status === 'blocked' && (
                <span className="text-[9px] px-1 py-0.5 rounded bg-red-900/50 text-red-400 flex-shrink-0">BLOCKED</span>
              )}
              {task.status === 'critical' && (
                <span className="text-[9px] px-1 py-0.5 rounded bg-red-900/50 text-red-300 flex-shrink-0 animate-pulse">CRITICAL</span>
              )}
            </div>
          </td>
          <td className="py-1.5 px-0">
            <TaskBar task={task} totalDays={totalDays} tlStart={tlStart} />
          </td>
        </tr>
      ))}
    </>
  );
}

export default function GanttChart() {
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(
    new Set(phases.map(p => p.id))
  );
  const [batchFilter, setBatchFilter] = useState<string>('all');

  const totalDays = useMemo(() => daysBetween(timelineStart, timelineEnd), []);
  const months = useMemo(() => getMonths(timelineStart, timelineEnd), []);

  const togglePhase = (id: string) => {
    setExpandedPhases(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredPhases = useMemo(() => {
    if (batchFilter === 'all') return phases;
    return phases.map(phase => ({
      ...phase,
      tasks: phase.tasks.filter(t =>
        !t.batch || t.batch === 'all' || String(t.batch) === batchFilter
      ),
    })).filter(p => p.tasks.length > 0);
  }, [batchFilter]);

  // Today marker
  const today = new Date().toISOString().split('T')[0];
  const todayOffset = daysBetween(timelineStart, today);
  const todayPct = (todayOffset / totalDays) * 100;

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700/50 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700/50 bg-gray-800/50">
        <h2 className="text-sm font-semibold text-white">Project Gantt Chart</h2>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500 uppercase tracking-wider">Batch:</span>
          {['all', '1', '2', '3'].map(b => (
            <button
              key={b}
              onClick={() => setBatchFilter(b)}
              className={`text-[10px] px-2 py-1 rounded transition-colors ${
                batchFilter === b
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-gray-700/50 text-gray-400 border border-gray-600/50 hover:bg-gray-700'
              }`}
            >
              {b === 'all' ? 'All' : `Batch ${b}`}
            </button>
          ))}
          <div className="w-px h-4 bg-gray-700 mx-1" />
          <button
            onClick={() => setExpandedPhases(new Set(phases.map(p => p.id)))}
            className="text-[10px] px-2 py-1 rounded bg-gray-700/50 text-gray-400 hover:bg-gray-700 transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={() => setExpandedPhases(new Set())}
            className="text-[10px] px-2 py-1 rounded bg-gray-700/50 text-gray-400 hover:bg-gray-700 transition-colors"
          >
            Collapse
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-4 py-2 border-b border-gray-800/50 bg-gray-900/50">
        {Object.entries(STATUS_COLORS).map(([status, colors]) => (
          <div key={status} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-sm ${colors.bar}`} />
            <span className="text-[10px] text-gray-400 capitalize">{status.replace('-', ' ')}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rotate-45 bg-white/60" />
          <span className="text-[10px] text-gray-400">Milestone</span>
        </div>
      </div>

      {/* Chart */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] border-collapse">
          {/* Month headers */}
          <thead>
            <tr>
              <th className="sticky left-0 z-20 bg-gray-800 px-3 py-2 text-left border-r border-gray-700/50 min-w-[280px]">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">Task</span>
              </th>
              <th className="p-0 bg-gray-800">
                <div className="relative w-full h-8">
                  {months.map((m, i) => (
                    <div
                      key={i}
                      className="absolute top-0 h-full border-l border-gray-700/30 flex items-center"
                      style={{
                        left: `${(m.startDay / totalDays) * 100}%`,
                        width: `${(m.days / totalDays) * 100}%`,
                      }}
                    >
                      <span className="text-[10px] text-gray-400 px-1.5 truncate">
                        {m.label} {m.year !== 2026 ? `'${String(m.year).slice(2)}` : ''}
                      </span>
                    </div>
                  ))}
                  {/* Today marker in header */}
                  {todayPct >= 0 && todayPct <= 100 && (
                    <div
                      className="absolute top-0 h-full w-px bg-cyan-400 z-10"
                      style={{ left: `${todayPct}%` }}
                    >
                      <div className="absolute -top-0 -left-2 bg-cyan-500 text-white text-[8px] px-1 rounded-b">
                        Today
                      </div>
                    </div>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPhases.map(phase => (
              <PhaseSection
                key={phase.id}
                phase={phase}
                totalDays={totalDays}
                tlStart={timelineStart}
                expanded={expandedPhases.has(phase.id)}
                onToggle={() => togglePhase(phase.id)}
              />
            ))}
          </tbody>
        </table>

        {/* Today line overlay across the chart body */}
        {todayPct >= 0 && todayPct <= 100 && (
          <div
            className="absolute top-0 bottom-0 w-px bg-cyan-400/30 pointer-events-none z-5"
            style={{ left: `calc(280px + (100% - 280px) * ${todayPct / 100})` }}
          />
        )}
      </div>
    </div>
  );
}
