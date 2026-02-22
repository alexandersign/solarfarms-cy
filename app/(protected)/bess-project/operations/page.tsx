'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  sharedAssets,
  batchCommissioning,
  resourceConflicts,
  parks,
  districtPlans,
  maintenanceStats,
  getBatchSummary,
  BATCH_COLORS,
  daysBetweenOps,
  opsTimelineStart,
  opsTimelineEnd,
  generateCraneSchedule,
  type BatchCommissioning,
  type ResourceConflict,
  type SharedAsset,
  type DistrictMaintenancePlan,
} from '@/components/project-timeline/operations-data';

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function getMonths(start: string, end: string) {
  const months: { label: string; year: number; startDay: number; days: number }[] = [];
  const s = new Date(start);
  const e = new Date(end);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let current = new Date(s.getFullYear(), s.getMonth(), 1);
  while (current <= e) {
    const monthStart = current < s ? s : new Date(current);
    const monthEnd = new Date(current.getFullYear(), current.getMonth() + 1, 0);
    const effectiveEnd = monthEnd > e ? e : monthEnd;
    const startDay = daysBetweenOps(start, monthStart.toISOString().split('T')[0]);
    const days = daysBetweenOps(monthStart.toISOString().split('T')[0], effectiveEnd.toISOString().split('T')[0]) + 1;

    months.push({ label: monthNames[current.getMonth()], year: current.getFullYear(), startDay, days });
    current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
  }
  return months;
}

// ─────────────────────────────────────────────
// CONSTRAINT ALERT PANEL
// ─────────────────────────────────────────────

function ConstraintAlerts({ conflicts }: { conflicts: ResourceConflict[] }) {
  const severityStyle = {
    critical: { bg: 'bg-red-500/10', border: 'border-red-500/30', badge: 'bg-red-500/20 text-red-400', icon: '⚠' },
    warning: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', badge: 'bg-amber-500/20 text-amber-400', icon: '⚡' },
    info: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', badge: 'bg-blue-500/20 text-blue-400', icon: 'ℹ' },
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700/50 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-700/50 bg-red-500/5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <h2 className="text-sm font-semibold text-white">Resource Constraints & Risks</h2>
        </div>
      </div>
      <div className="p-3 space-y-2">
        {conflicts.map(c => {
          const style = severityStyle[c.severity];
          return (
            <div key={c.id} className={`${style.bg} border ${style.border} rounded-lg p-3`}>
              <div className="flex items-start gap-2">
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold flex-shrink-0 ${style.badge}`}>
                  {c.severity.toUpperCase()}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-white">{c.resource}</span>
                    <span className="text-[9px] text-gray-500">{c.period}</span>
                  </div>
                  <p className="text-[11px] text-gray-300 mb-1.5">{c.description}</p>
                  <div className="flex items-start gap-1.5">
                    <span className="text-[9px] px-1 py-0.5 rounded bg-emerald-500/10 text-emerald-400 flex-shrink-0">FIX</span>
                    <p className="text-[10px] text-gray-400">{c.mitigation}</p>
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

// ─────────────────────────────────────────────
// ASSET REGISTER
// ─────────────────────────────────────────────

function AssetRegister({ assets }: { assets: SharedAsset[] }) {
  const typeIcons: Record<string, string> = {
    crane: '🏗️',
    truck: '🚛',
    forklift: '🏭',
    vehicle: '🚐',
    engineer: '👷',
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700/50 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-700/50">
        <h2 className="text-sm font-semibold text-white">Shared Asset Register</h2>
        <p className="text-[10px] text-gray-500 mt-0.5">Critical resources for commissioning & operations</p>
      </div>
      <div className="divide-y divide-gray-800/50">
        {assets.map(asset => (
          <div key={asset.id} className="p-3 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-start gap-3">
              <span className="text-lg">{typeIcons[asset.type] || '📦'}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-white">{asset.name}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                    asset.totalAvailable === 1
                      ? 'bg-red-500/20 text-red-400'
                      : asset.totalAvailable <= 3
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {asset.totalAvailable} available
                  </span>
                  {asset.owned && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400">OWNED</span>
                  )}
                </div>
                <p className="text-[10px] text-red-400 font-medium mb-0.5">{asset.constraint}</p>
                <p className="text-[10px] text-gray-500">{asset.notes}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[10px] text-gray-500">Cost/day</p>
                <p className="text-xs font-semibold text-gray-300">€{asset.costPerDay.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// COMMISSIONING GANTT CHART
// ─────────────────────────────────────────────

function CommissioningGantt({ batches }: { batches: BatchCommissioning[] }) {
  const totalDays = useMemo(() => daysBetweenOps(opsTimelineStart, opsTimelineEnd), []);
  const months = useMemo(() => getMonths(opsTimelineStart, opsTimelineEnd), []);

  const today = new Date().toISOString().split('T')[0];
  const todayOffset = daysBetweenOps(opsTimelineStart, today);
  const todayPct = Math.max(0, Math.min(100, (todayOffset / totalDays) * 100));

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700/50 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-700/50 bg-gray-800/50">
        <h2 className="text-sm font-semibold text-white">Commissioning Timeline — All Batches</h2>
        <p className="text-[10px] text-gray-500 mt-0.5">
          Jul 2026 → Mar 2027 | Crane in <span className="text-red-400">red</span> — single unit constraint
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2 border-b border-gray-800/50 bg-gray-900/50">
        {[
          { color: '#94a3b8', label: 'Port Clearance' },
          { color: '#f59e0b', label: 'Transport' },
          { color: '#ef4444', label: 'Crane (1 unit!)' },
          { color: '#22c55e', label: 'Mechanical' },
          { color: '#3b82f6', label: 'Electrical' },
          { color: '#8b5cf6', label: 'EMS/SCADA' },
          { color: '#06b6d4', label: 'Commissioning' },
          { color: '#10b981', label: 'Grid Test/PAC' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-1.5 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-[10px] text-gray-400">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 z-20 bg-gray-800 px-3 py-2 text-left border-r border-gray-700/50 min-w-[220px]">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">Phase</span>
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
                  {todayPct >= 0 && todayPct <= 100 && (
                    <div className="absolute top-0 h-full w-px bg-cyan-400 z-10" style={{ left: `${todayPct}%` }}>
                      <div className="absolute -top-0 -left-2 bg-cyan-500 text-white text-[8px] px-1 rounded-b">Today</div>
                    </div>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {batches.map(batch => (
              <BatchRows key={batch.batch} batch={batch} totalDays={totalDays} />
            ))}

            {/* Crane utilization row */}
            <tr className="border-t-2 border-red-500/30">
              <td className="sticky left-0 z-10 bg-gray-900/95 backdrop-blur-sm px-3 py-2 border-r border-gray-700/50">
                <div className="flex items-center gap-2">
                  <span className="text-[10px]">🏗️</span>
                  <span className="text-xs font-bold text-red-400">CRANE USAGE</span>
                  <span className="text-[9px] px-1 py-0.5 rounded bg-red-500/20 text-red-300 animate-pulse">1 UNIT</span>
                </div>
              </td>
              <td className="py-2 px-0">
                <CraneUtilizationBar totalDays={totalDays} />
              </td>
            </tr>

            {/* Truck utilization row */}
            <tr className="border-t border-gray-700/50">
              <td className="sticky left-0 z-10 bg-gray-900/95 backdrop-blur-sm px-3 py-2 border-r border-gray-700/50">
                <div className="flex items-center gap-2">
                  <span className="text-[10px]">🚛</span>
                  <span className="text-xs font-bold text-amber-400">TRUCK DEMAND</span>
                  <span className="text-[9px] px-1 py-0.5 rounded bg-red-500/20 text-red-300 animate-pulse">TBC — RFI NEEDED</span>
                </div>
              </td>
              <td className="py-2 px-0">
                <TruckUtilizationBar totalDays={totalDays} batches={batches} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BatchRows({ batch, totalDays }: { batch: BatchCommissioning; totalDays: number }) {
  const [expanded, setExpanded] = useState(true);
  const batchColor = BATCH_COLORS[batch.batch];
  const summary = getBatchSummary(batch.batch);

  return (
    <>
      {/* Batch header */}
      <tr
        className="cursor-pointer hover:bg-white/5 transition-colors border-b border-gray-700/50"
        onClick={() => setExpanded(!expanded)}
      >
        <td className="sticky left-0 z-10 bg-gray-900/95 backdrop-blur-sm px-3 py-2 border-r border-gray-700/50">
          <div className="flex items-center gap-2">
            <svg
              className={`w-3 h-3 text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`}
              fill="currentColor" viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: batchColor }} />
            <span className="font-semibold text-white text-xs">Batch {batch.batch}: {batch.name}</span>
            <span className="text-[9px] text-gray-500">
              {batch.parks}pk · {batch.containers}ct · {batch.mwh} MWh
            </span>
          </div>
        </td>
        <td className="py-2 px-0">
          <div className="relative h-6 w-full">
            {/* Full batch span */}
            <div
              className="absolute top-1 h-4 rounded-sm opacity-20"
              style={{
                left: `${(daysBetweenOps(opsTimelineStart, batch.phases[0].start) / totalDays) * 100}%`,
                width: `${(daysBetweenOps(batch.phases[0].start, batch.phases[batch.phases.length - 1].end) / totalDays) * 100}%`,
                backgroundColor: batchColor,
              }}
            />
          </div>
        </td>
      </tr>

      {/* Phase rows */}
      {expanded && batch.phases.map(phase => {
        const startOffset = Math.max(0, daysBetweenOps(opsTimelineStart, phase.start));
        const duration = daysBetweenOps(phase.start, phase.end) || 1;
        const leftPct = (startOffset / totalDays) * 100;
        const widthPct = Math.max((duration / totalDays) * 100, 0.5);

        return (
          <tr key={phase.id} className="hover:bg-white/[0.02] border-b border-gray-800/50">
            <td className="sticky left-0 z-10 bg-gray-900/95 backdrop-blur-sm px-3 py-1.5 border-r border-gray-700/50">
              <div className="flex items-center gap-2 pl-5">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: phase.color }} />
                <span className="text-[11px] text-gray-300">{phase.name}</span>
                {phase.craneRequired && (
                  <span className="text-[8px] px-1 py-0.5 rounded bg-red-500/20 text-red-400 font-bold">CRANE</span>
                )}
                {phase.trucksRequired !== 0 && (
                  <span className="text-[8px] px-1 py-0.5 rounded bg-amber-500/20 text-amber-400">
                    {phase.trucksRequired === -1 ? 'TBC' : phase.trucksRequired}🚛
                  </span>
                )}
              </div>
            </td>
            <td className="py-1.5 px-0">
              <div className="relative h-6 w-full">
                <div
                  className="absolute top-1 h-4 rounded-sm transition-all duration-300"
                  style={{
                    left: `${leftPct}%`,
                    width: `${widthPct}%`,
                    backgroundColor: phase.color,
                    opacity: phase.craneRequired ? 1 : 0.7,
                    minWidth: '4px',
                    boxShadow: phase.craneRequired ? `0 0 8px ${phase.color}40` : 'none',
                  }}
                />
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
}

function CraneUtilizationBar({ totalDays }: { totalDays: number }) {
  const craneWindows = [
    { start: '2026-07-12', end: '2026-07-30', batch: 1, label: 'B1: 15 parks' },
    { start: '2026-08-27', end: '2026-09-18', batch: 2, label: 'B2: 19 parks' },
    { start: '2026-09-27', end: '2026-10-12', batch: 3, label: 'B3: 12 parks' },
  ];

  // Check for overlaps
  const b2b3gap = daysBetweenOps('2026-09-18', '2026-09-27');

  return (
    <div className="relative h-8 w-full">
      {/* Background track */}
      <div className="absolute top-2 left-0 right-0 h-4 bg-gray-800 rounded-sm" />

      {craneWindows.map(w => {
        const startOffset = Math.max(0, daysBetweenOps(opsTimelineStart, w.start));
        const duration = daysBetweenOps(w.start, w.end);
        const leftPct = (startOffset / totalDays) * 100;
        const widthPct = (duration / totalDays) * 100;
        const color = BATCH_COLORS[w.batch];

        return (
          <div key={w.label}>
            <div
              className="absolute top-2 h-4 rounded-sm border border-red-500/50"
              style={{
                left: `${leftPct}%`,
                width: `${widthPct}%`,
                backgroundColor: `${color}cc`,
                minWidth: '4px',
              }}
            />
            <div
              className="absolute top-0.5 text-[8px] font-bold text-white whitespace-nowrap"
              style={{ left: `${leftPct}%` }}
            >
              {w.label}
            </div>
          </div>
        );
      })}

      {/* Gap warning between B2 and B3 */}
      {b2b3gap < 14 && (
        <div
          className="absolute top-2 h-4 bg-red-500/20 border-x border-dashed border-red-500/50"
          style={{
            left: `${(daysBetweenOps(opsTimelineStart, '2026-09-18') / totalDays) * 100}%`,
            width: `${(b2b3gap / totalDays) * 100}%`,
          }}
          title={`Only ${b2b3gap} days between B2 and B3 crane windows`}
        />
      )}
    </div>
  );
}

function TruckUtilizationBar({ totalDays, batches }: { totalDays: number; batches: BatchCommissioning[] }) {
  const truckWindows = batches.map(b => {
    const transportPhase = b.phases.find(p => p.name.includes('Transport'));
    return transportPhase ? {
      start: transportPhase.start,
      end: transportPhase.end,
      batch: b.batch,
      trucks: transportPhase.trucksRequired,
      containers: b.containers,
    } : null;
  }).filter(Boolean);

  return (
    <div className="relative h-8 w-full">
      <div className="absolute top-2 left-0 right-0 h-4 bg-gray-800 rounded-sm" />

      {truckWindows.map(w => {
        if (!w) return null;
        const startOffset = Math.max(0, daysBetweenOps(opsTimelineStart, w.start));
        const duration = daysBetweenOps(w.start, w.end);
        const leftPct = (startOffset / totalDays) * 100;
        const widthPct = (duration / totalDays) * 100;
        const color = BATCH_COLORS[w.batch];

        return (
          <div key={w.batch}>
            <div
              className="absolute top-2 h-4 rounded-sm border border-amber-500/30"
              style={{
                left: `${leftPct}%`,
                width: `${widthPct}%`,
                backgroundColor: `${color}99`,
                minWidth: '4px',
              }}
            />
            <div
              className="absolute top-0.5 text-[8px] font-bold text-white whitespace-nowrap"
              style={{ left: `${leftPct}%` }}
            >
              {w.containers}ct
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// MAINTENANCE PROGRAM
// ─────────────────────────────────────────────

function MaintenanceProgram({ plans }: { plans: DistrictMaintenancePlan[] }) {
  const districtColors: Record<string, string> = {
    Nicosia: '#3b82f6',
    Famagusta: '#ef4444',
    Limassol: '#22c55e',
    Paphos: '#f59e0b',
    Larnaca: '#8b5cf6',
  };

  const totalDaysPerQuarter = plans.reduce((s, p) => s + p.daysPerQuarter, 0);

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700/50 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-700/50 bg-emerald-500/5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <h2 className="text-sm font-semibold text-white">Preventive Maintenance Program</h2>
        </div>
        <p className="text-[10px] text-gray-500 mt-0.5">
          {maintenanceStats.totalParks} parks × {maintenanceStats.daysPerParkPerYear} days = {maintenanceStats.totalDaysPerYear} maintenance days/year |
          Quarterly visits ({maintenanceStats.visitDuration} days/visit) | Night shift {maintenanceStats.nightShiftWindow}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-gray-800/50">
        {[
          { label: 'Days/Year', value: String(maintenanceStats.totalDaysPerYear), accent: 'text-white' },
          { label: 'Days/Quarter', value: String(maintenanceStats.daysPerQuarter), accent: 'text-cyan-400' },
          { label: 'Visits/Park/Year', value: String(maintenanceStats.visitsPerParkPerYear), accent: 'text-white' },
          { label: 'Engineers/Visit', value: String(maintenanceStats.engineersPerVisit), accent: 'text-white' },
          { label: 'Engineer-Days/Year', value: String(maintenanceStats.totalEngineerDaysPerYear), accent: 'text-amber-400' },
        ].map(stat => (
          <div key={stat.label} className="bg-gray-900 p-3 text-center">
            <p className="text-[9px] text-gray-500 uppercase tracking-wider">{stat.label}</p>
            <p className={`text-lg font-bold ${stat.accent}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* District breakdown */}
      <div className="p-4">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">District Schedule</h3>
        <div className="space-y-3">
          {plans.map(plan => {
            const color = districtColors[plan.district] || '#6b7280';
            const pct = (plan.daysPerQuarter / totalDaysPerQuarter) * 100;

            return (
              <div key={plan.district} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                    <span className="text-xs font-semibold text-white">{plan.district}</span>
                    <span className="text-[9px] text-gray-500">{plan.parks} parks · {plan.totalMwh} MWh</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="text-gray-500">{plan.travelTime}</span>
                    <span className="text-gray-300 font-semibold">{plan.daysPerQuarter} days/qtr</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden mb-1">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                  />
                </div>

                {/* Assignment */}
                <div className="flex items-center gap-2 text-[9px] text-gray-500">
                  <span>Primary: <span className="text-gray-300">{plan.primaryEngineer}</span></span>
                  <span>·</span>
                  <span>Backup: <span className="text-gray-300">{plan.backupEngineer}</span></span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total capacity analysis */}
        <div className="mt-4 p-3 rounded-lg bg-gray-800/50 border border-gray-700/30">
          <h4 className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Quarterly Capacity Analysis (5 Engineers)</h4>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-[10px] text-gray-500">Available</p>
              <p className="text-sm font-bold text-white">275</p>
              <p className="text-[9px] text-gray-600">engineer-days/qtr</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500">Planned PM</p>
              <p className="text-sm font-bold text-amber-400">255</p>
              <p className="text-[9px] text-gray-600">2-person visits</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500">Spare</p>
              <p className="text-sm font-bold text-emerald-400">20</p>
              <p className="text-[9px] text-gray-600">for reactive</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scope */}
      <div className="px-4 pb-4">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Maintenance Scope (Per Visit)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {maintenanceStats.maintenanceScope.map((item, i) => (
            <div key={i} className="flex items-center gap-2 py-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0" />
              <span className="text-[10px] text-gray-400">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// CRANE CALENDAR
// ─────────────────────────────────────────────

function CraneCalendar() {
  const schedule = useMemo(() => generateCraneSchedule(), []);
  const [selectedBatch, setSelectedBatch] = useState<number | null>(null);

  const filtered = selectedBatch ? schedule.filter(s => s.batch === selectedBatch) : schedule;

  const batchGroups = [1, 2, 3].map(b => ({
    batch: b,
    days: schedule.filter(s => s.batch === b),
    startDate: schedule.filter(s => s.batch === b)[0]?.date || '',
    endDate: schedule.filter(s => s.batch === b).slice(-1)[0]?.date || '',
  }));

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700/50 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-700/50 bg-red-500/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">🏗️</span>
            <h2 className="text-sm font-semibold text-white">Crane Booking Calendar</h2>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold animate-pulse">
              SINGLE UNIT — PRE-BOOK REQUIRED
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSelectedBatch(null)}
              className={`text-[10px] px-2 py-1 rounded ${!selectedBatch ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >All</button>
            {[1, 2, 3].map(b => (
              <button
                key={b}
                onClick={() => setSelectedBatch(selectedBatch === b ? null : b)}
                className={`text-[10px] px-2 py-1 rounded ${selectedBatch === b ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                style={selectedBatch === b ? { backgroundColor: `${BATCH_COLORS[b]}33` } : {}}
              >B{b}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-px bg-gray-800/50">
        {batchGroups.map(g => (
          <div key={g.batch} className="bg-gray-900 p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: BATCH_COLORS[g.batch] }} />
              <span className="text-[10px] text-gray-500">Batch {g.batch}</span>
            </div>
            <p className="text-sm font-bold text-white">{g.days.length} crane-days</p>
            <p className="text-[9px] text-gray-500">
              {g.startDate && new Date(g.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} →{' '}
              {g.endDate && new Date(g.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
            </p>
          </div>
        ))}
      </div>

      {/* Daily schedule */}
      <div className="max-h-64 overflow-y-auto">
        <table className="w-full text-[10px]">
          <thead className="sticky top-0 bg-gray-800 z-10">
            <tr>
              <th className="px-3 py-1.5 text-left text-gray-500 font-medium">Date</th>
              <th className="px-3 py-1.5 text-left text-gray-500 font-medium">Batch</th>
              <th className="px-3 py-1.5 text-left text-gray-500 font-medium">Park</th>
              <th className="px-3 py-1.5 text-left text-gray-500 font-medium">Containers</th>
              <th className="px-3 py-1.5 text-left text-gray-500 font-medium">District</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {filtered.map((day, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="px-3 py-1.5 text-gray-300 font-mono">
                  {new Date(day.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                </td>
                <td className="px-3 py-1.5">
                  <span
                    className="px-1.5 py-0.5 rounded text-white font-bold"
                    style={{ backgroundColor: `${BATCH_COLORS[day.batch]}66` }}
                  >B{day.batch}</span>
                </td>
                <td className="px-3 py-1.5 text-gray-300">{day.parks.join(', ')}</td>
                <td className="px-3 py-1.5 text-gray-400">{day.containers}</td>
                <td className="px-3 py-1.5 text-gray-500">{day.district}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 border-t border-gray-700/50 bg-gray-800/30">
        <p className="text-[10px] text-gray-500">
          Total: <span className="text-white font-bold">{schedule.length} crane-days</span> across {parks.length} parks.
          Buffer between batches: B1→B2 = {daysBetweenOps('2026-07-30', '2026-08-27')} days, B2→B3 = {daysBetweenOps('2026-09-18', '2026-09-27')} days.
          <span className="text-red-400 ml-1">Pre-book entire Jul 12 → Oct 12 window.</span>
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

export default function OperationsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'commissioning' | 'maintenance' | 'assets'>('commissioning');

  const totalContainers = parks.reduce((s, p) => s + p.containers, 0);
  const totalMwh = parks.reduce((s, p) => s + p.mwh, 0);
  const craneSchedule = useMemo(() => generateCraneSchedule(), []);
  const craneDays = craneSchedule.length;
  const criticalConflicts = resourceConflicts.filter(c => c.severity === 'critical').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">L</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">Operations & Asset Tracking</h1>
              <p className="text-[10px] text-gray-500">Commissioning Schedule · Maintenance Program · Resource Constraints</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push('/bess-project')}
              className="text-[10px] px-3 py-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors border border-gray-700"
            >
              ← Dashboard
            </button>
            <button
              onClick={() => router.push('/bess-project/procurement')}
              className="text-[10px] px-3 py-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors border border-gray-700"
            >
              RFI Tracker
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 py-6 space-y-6">
        {/* Top stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <StatBox label="Parks" value={String(parks.length)} accent="text-white" />
          <StatBox label="Containers" value={String(totalContainers)} accent="text-white" />
          <StatBox label="Capacity" value={`${Math.round(totalMwh)} MWh`} accent="text-cyan-400" />
          <StatBox label="Batches" value="3" sub="Jul–Oct 2026" accent="text-white" />
          <StatBox label="Crane Days" value={String(craneDays)} accent="text-red-400" sub="1 crane only!" />
          <StatBox label="Trucks" value="TBC" accent="text-red-400" sub="RFI needed!" />
          <StatBox label="Engineers" value="5" accent="text-white" sub="From Q1" />
          <StatBox label="Conflicts" value={String(criticalConflicts)} accent="text-red-400" sub="Critical" />
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-1 p-1 bg-gray-800/50 rounded-lg w-fit">
          {[
            { id: 'commissioning' as const, label: 'Commissioning Timeline', icon: '📅' },
            { id: 'maintenance' as const, label: 'Maintenance Program', icon: '🔧' },
            { id: 'assets' as const, label: 'Assets & Constraints', icon: '🏗️' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-gray-700 text-white font-semibold'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'commissioning' && (
          <div className="space-y-6">
            <CommissioningGantt batches={batchCommissioning} />
            <CraneCalendar />

            {/* Batch constraints */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {batchCommissioning.map(batch => (
                <div key={batch.batch} className="bg-gray-900 rounded-xl border border-gray-700/50 overflow-hidden">
                  <div className="px-4 py-2 border-b border-gray-700/50" style={{ backgroundColor: `${BATCH_COLORS[batch.batch]}10` }}>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: BATCH_COLORS[batch.batch] }} />
                      <span className="text-xs font-semibold text-white">Batch {batch.batch} Constraints</span>
                    </div>
                  </div>
                  <div className="p-3 space-y-1.5">
                    {batch.constraints.map((c, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-[9px] mt-0.5">⚡</span>
                        <span className="text-[10px] text-gray-400">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <MaintenanceProgram plans={districtPlans} />
        )}

        {activeTab === 'assets' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AssetRegister assets={sharedAssets} />
            <ConstraintAlerts conflicts={resourceConflicts} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50 mt-8">
        <div className="max-w-[1600px] mx-auto px-4 py-4 flex items-center justify-between">
          <p className="text-[10px] text-gray-600">Lighthief Cyprus Ltd — Operations & Asset Tracking</p>
          <p className="text-[10px] text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </footer>
    </div>
  );
}

function StatBox({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/30 p-3">
      <p className="text-[9px] uppercase tracking-wider text-gray-500 mb-0.5">{label}</p>
      <p className={`text-xl font-bold ${accent || 'text-white'}`}>{value}</p>
      {sub && <p className="text-[9px] text-gray-500 mt-0.5">{sub}</p>}
    </div>
  );
}
