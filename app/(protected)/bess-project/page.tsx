'use client';

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { portfolioStats, phases, keyMilestones, daysBetween } from '@/components/project-timeline/timeline-data';

const GanttChart = dynamic(() => import('@/components/project-timeline/GanttChart'), { ssr: false });
const MilestoneTracker = dynamic(() => import('@/components/project-timeline/MilestoneTracker'), { ssr: false });
const ReadinessDashboard = dynamic(() => import('@/components/project-timeline/ReadinessDashboard'), { ssr: false });

function StatCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/30 p-4">
      <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${accent || 'text-white'}`}>{value}</p>
      {sub && <p className="text-[10px] text-gray-500 mt-0.5">{sub}</p>}
    </div>
  );
}

function BatchCard({ batch }: { batch: typeof portfolioStats.batches[0] }) {
  const daysToShip = daysBetween(new Date().toISOString().split('T')[0], batch.cifDate);
  const daysToPac = daysBetween(new Date().toISOString().split('T')[0], batch.pacDate);

  return (
    <div className="bg-gray-800/30 rounded-lg border border-gray-700/30 p-3">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-semibold text-white">{batch.name}</h4>
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          {batch.parks} parks
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[10px]">
        <div>
          <p className="text-gray-500">Capacity</p>
          <p className="text-gray-300 font-medium">{batch.mwh} MWh</p>
        </div>
        <div>
          <p className="text-gray-500">CIF Limassol</p>
          <p className="text-gray-300 font-medium">
            {new Date(batch.cifDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
            <span className="text-gray-500 ml-1">({daysToShip}d)</span>
          </p>
        </div>
        <div>
          <p className="text-gray-500">PAC Target</p>
          <p className="text-gray-300 font-medium">
            {new Date(batch.pacDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })}
            <span className="text-gray-500 ml-1">({daysToPac}d)</span>
          </p>
        </div>
        <div>
          <p className="text-gray-500">Status</p>
          <p className="text-amber-400 font-medium">Pre-order</p>
        </div>
      </div>
    </div>
  );
}

function CriticalBlockers() {
  const blockers = [
    { id: 1, text: 'EN 50549-2 grid code cert — CONFIRMED ✓ (TÜV cert + test report)', severity: 'resolved' as const },
    { id: 9, text: '5 field engineers confirmed ✓ (3 Lighthief PL + 2 Linyang PL, deploying Q1)', severity: 'resolved' as const },
    { id: 10, text: 'OPEX plan finalized ✓ (€511k budget, 510 maint. days/yr)', severity: 'resolved' as const },
    { id: 2, text: 'OEM Sales Agreement — NOT SIGNED (18 amendments)', severity: 'critical' as const },
    { id: 3, text: 'Ext. warranty Yr 11-15 pricing — 261% gap', severity: 'critical' as const },
    { id: 11, text: 'Heavy-duty crane — PRE-BOOK NOW (only 1 in Cyprus, need Jul–Oct)', severity: 'critical' as const },
    { id: 12, text: 'Low-loader trucks — UNKNOWN availability (RFI to A. Soulis & Interfreight)', severity: 'critical' as const },
    { id: 4, text: 'MV Skid datasheets — partial (40MW SLDs available, smaller configs TBD)', severity: 'high' as const },
    { id: 5, text: 'Grid connection applications — can now proceed with EN 50549-2', severity: 'high' as const },
    { id: 6, text: 'Local subcontractor quotes — NOT STARTED', severity: 'high' as const },
    { id: 7, text: 'Warehouse lease — NOT SIGNED', severity: 'high' as const },
  ];

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700/50 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-700/50 bg-red-500/5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <h2 className="text-sm font-semibold text-white">Critical Blockers</h2>
        </div>
        <p className="text-[10px] text-gray-500 mt-0.5">Must resolve before March 1 order — updated 19 Feb 2026</p>
      </div>
      <div className="p-3 space-y-1.5">
          {blockers.map(b => (
          <div key={b.id} className={`flex items-start gap-2 p-2 rounded-lg ${
            b.severity === 'resolved' ? 'bg-emerald-500/5 border border-emerald-500/10'
            : b.severity === 'critical' ? 'bg-red-500/5 border border-red-500/10'
            : 'bg-amber-500/5 border border-amber-500/10'
          }`}>
            <span className={`text-[9px] px-1 py-0.5 rounded font-bold flex-shrink-0 mt-0.5 ${
              b.severity === 'resolved'
                ? 'bg-emerald-500/20 text-emerald-400'
                : b.severity === 'critical'
                ? 'bg-red-500/20 text-red-400'
                : 'bg-amber-500/20 text-amber-400'
            }`}>
              {b.severity === 'resolved' ? 'DONE' : b.severity === 'critical' ? 'CRIT' : 'HIGH'}
            </span>
            <span className={`text-[11px] ${b.severity === 'resolved' ? 'text-gray-500 line-through' : 'text-gray-300'}`}>{b.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OpsReadinessPanel() {
  const opsItems = [
    { name: '5 field engineers confirmed', status: 'complete' as const, target: 'Feb 19', note: '3 Lighthief Poland + 2 Linyang Poland — deploying Q1' },
    { name: 'OPEX plan (€511k)', status: 'complete' as const, target: 'Feb 19', note: 'Personnel, vehicles, warehouse, tools, training, contingency' },
    { name: 'Maintenance program', status: 'complete' as const, target: 'Feb 19', note: '510 planned days/yr, 10 days/park, 5 districts' },
    { name: 'Crane pre-booking', status: 'not-started' as const, target: 'Feb 28', note: 'ONLY 1 heavy-duty crane on island — must lock Jul–Oct' },
    { name: 'Transport RFI (trucks)', status: 'not-started' as const, target: 'Feb 28', note: 'A. Soulis & Interfreight — fleet size UNKNOWN' },
    { name: 'Warehouse lease', status: 'not-started' as const, target: 'Mar 15', note: 'Limassol industrial area, 50% of 10,000 sqft, €5k/mo' },
    { name: 'Forklift rental', status: 'not-started' as const, target: 'Mar 31', note: '2.5-3T diesel, 12-month rental, €600/mo' },
    { name: '3 service vans (lease)', status: 'not-started' as const, target: 'Mar 31', note: '36-month lease, day/night/float rotation' },
    { name: 'Poland HQ training (5 eng × 3wk)', status: 'not-started' as const, target: 'Apr 04', note: 'Czestochowa — BMS, safety, installation. €15k total' },
    { name: 'Kehua PCS training', status: 'not-started' as const, target: 'Apr 30', note: 'PCS commissioning — all engineers' },
    { name: 'Voltus EMS/SCADA training', status: 'not-started' as const, target: 'May 31', note: 'WAGO PFC200, IEC-104, Voltus platform' },
    { name: 'HV safety certification', status: 'not-started' as const, target: 'May 01', note: 'All 5 engineers, Cyprus HV auth, €1.5k' },
  ];

  const statusColors = {
    'not-started': { dot: 'bg-gray-500', text: 'text-gray-400' },
    'in-progress': { dot: 'bg-amber-500', text: 'text-amber-400' },
    'complete': { dot: 'bg-emerald-500', text: 'text-emerald-400' },
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700/50 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-700/50 bg-purple-500/5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500" />
          <h2 className="text-sm font-semibold text-white">Operational Readiness</h2>
        </div>
        <p className="text-[10px] text-gray-500 mt-0.5">Team, assets, fleet, training — updated 19 Feb 2026</p>
      </div>
      <div className="p-3 space-y-1">
        {opsItems.map((item, i) => {
          const colors = statusColors[item.status];
          return (
            <div key={i} className="flex items-center gap-2 py-1.5 border-b border-gray-800/50 last:border-0">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot}`} />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-gray-300 truncate">{item.name}</p>
                <p className="text-[9px] text-gray-600 truncate">{item.note}</p>
              </div>
              <span className="text-[9px] text-gray-500 flex-shrink-0">{item.target}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BessProjectDashboard() {
  const router = useRouter();

  const totalTasks = phases.reduce((sum, p) => sum + p.tasks.length, 0);
  const completedTasks = phases.reduce((sum, p) => sum + p.tasks.filter(t => t.status === 'complete').length, 0);
  const blockedTasks = phases.reduce((sum, p) => sum + p.tasks.filter(t => t.status === 'blocked' || t.status === 'critical').length, 0);
  const daysToOrder = daysBetween(new Date().toISOString().split('T')[0], portfolioStats.orderDate);

  const handleLogout = async () => {
    await fetch('/api/bess-project-auth', { method: 'DELETE' });
    router.push('/bess-project/login');
    router.refresh();
  };

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
              <h1 className="text-sm font-bold text-white">BESS Cyprus Portfolio</h1>
              <p className="text-[10px] text-gray-500">Lighthief Energy — Project Timeline Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] text-gray-500">Order Date</p>
              <p className={`text-xs font-bold ${daysToOrder <= 14 ? 'text-red-400' : daysToOrder <= 30 ? 'text-amber-400' : 'text-cyan-400'}`}>
                1 Mar 2026
                <span className="text-gray-500 font-normal ml-1">({daysToOrder}d)</span>
              </p>
            </div>
            <button
              onClick={() => router.push('/bess-project/operations')}
              className="text-[10px] px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 transition-colors border border-emerald-500/20 font-semibold"
            >
              Operations
            </button>
            <button
              onClick={() => router.push('/bess-project/procurement')}
              className="text-[10px] px-3 py-1.5 rounded-lg bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/30 transition-colors border border-cyan-500/20 font-semibold"
            >
              RFI Tracker
            </button>
            <button
              onClick={handleLogout}
              className="text-[10px] px-3 py-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors border border-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 py-6 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <StatCard label="Parks" value={String(portfolioStats.totalParks)} sub="46 active + 5 ESP-2028" />
          <StatCard label="Capacity" value={`${portfolioStats.totalMW} MW`} sub={`${portfolioStats.totalMWh} MWh`} />
          <StatCard label="Containers" value={String(portfolioStats.totalContainers)} sub="5 MWh each" />
          <StatCard label="Tasks" value={`${completedTasks}/${totalTasks}`} sub={`${Math.round((completedTasks / totalTasks) * 100)}% complete`} />
          <StatCard label="Blocked" value={String(blockedTasks)} accent="text-red-400" sub="Requires action" />
          <StatCard label="Batches" value="3" sub="Staggered delivery" />
          <StatCard label="Target FAC" value="Mar '27" sub="All parks live" accent="text-cyan-400" />
        </div>

        {/* Batch cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {portfolioStats.batches.map(batch => (
            <BatchCard key={batch.id} batch={batch} />
          ))}
        </div>

        {/* Gantt Chart (full width) */}
        <GanttChart />

        {/* Bottom grid: 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <MilestoneTracker />
          <ReadinessDashboard />
          <div className="space-y-4">
            <CriticalBlockers />
            <OpsReadinessPanel />
          </div>
        </div>

        {/* ESP 2028 note */}
        <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold">2028</span>
            <h3 className="text-xs font-semibold text-white">Esperia Tseri — Future Phase</h3>
          </div>
          <p className="text-[11px] text-gray-400">
            {portfolioStats.esp2028Parks} parks ({portfolioStats.esp2028Note}) — not included in current timeline.
            Separate order to be placed in H2 2027 once Phase 1 is operational and Esperia Tseri permits are secured.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50 mt-8">
        <div className="max-w-[1600px] mx-auto px-4 py-4 flex items-center justify-between">
          <p className="text-[10px] text-gray-600">
            Lighthief Cyprus Ltd — Confidential Project Dashboard
          </p>
          <p className="text-[10px] text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </footer>
    </div>
  );
}
