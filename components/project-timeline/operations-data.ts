// ===================================================================
// BESS Cyprus Portfolio — Operations & Asset Tracking Data
// Commissioning Program, Maintenance Schedule, Shared Asset Constraints
// ===================================================================

export type AssetType = 'crane' | 'truck' | 'forklift' | 'vehicle' | 'engineer';
export type ConstraintSeverity = 'critical' | 'warning' | 'info';
export type MaintenanceVisitStatus = 'scheduled' | 'completed' | 'in-progress' | 'overdue' | 'not-scheduled';

// ─────────────────────────────────────────────
// SHARED / CONSTRAINED ASSETS
// ─────────────────────────────────────────────

export interface SharedAsset {
  id: string;
  name: string;
  type: AssetType;
  totalAvailable: number;
  owned: boolean;
  costPerDay: number;
  constraint: string;
  notes: string;
}

export const sharedAssets: SharedAsset[] = [
  {
    id: 'crane-1',
    name: 'Heavy Duty Crane (100T+)',
    type: 'crane',
    totalAvailable: 1,
    owned: false,
    costPerDay: 2500,
    constraint: 'ONLY 1 available in Cyprus — must be pre-booked',
    notes: 'Required for container placement (2.9m height, ~30 tonnes each). Must coordinate across all batches. No backup if crane breaks down or is booked by other projects.',
  },
  {
    id: 'truck-fleet',
    name: 'Low-Loader Trucks (Container Transport)',
    type: 'truck',
    totalAvailable: 0,
    owned: false,
    costPerDay: 800,
    constraint: 'UNKNOWN AVAILABILITY — RFI required to A. Soulis & Interfreight',
    notes: 'Availability TBC. Need to confirm how many low-loaders can be committed for the Jul–Oct window. A. Soulis quoted Larnaca route (€2,360/ct incl crane). Interfreight quoted all routes (€210-250/ct, no crane). Island fleet is limited — must confirm capacity before locking batch schedule.',
  },
  {
    id: 'forklift-1',
    name: 'Forklift (2.5-3T)',
    type: 'forklift',
    totalAvailable: 1,
    owned: true,
    costPerDay: 33,
    constraint: 'Single unit — shared between warehouse and site work',
    notes: 'Rented for 2026. Battery module handling, spare parts movement, site equipment positioning.',
  },
  {
    id: 'van-fleet',
    name: 'Service Vans (O&M Fleet)',
    type: 'vehicle',
    totalAvailable: 3,
    owned: true,
    costPerDay: 41,
    constraint: 'Adequate for 5-engineer team',
    notes: '3 vans for day/night/float rotation. Leased from Q1 2026.',
  },
  {
    id: 'eng-team',
    name: 'Field Engineers',
    type: 'engineer',
    totalAvailable: 5,
    owned: true,
    costPerDay: 150,
    constraint: 'Split between commissioning support and O&M duties during ramp-up',
    notes: '3 Lighthief Poland + 2 Linyang Poland. All trained at Czestochowa HQ. During commissioning, engineers support installation. After PAC, transition to O&M.',
  },
];

// ─────────────────────────────────────────────
// PARK DATA — For scheduling
// ─────────────────────────────────────────────

export interface ParkSchedule {
  id: string;
  name: string;
  group: string;
  district: 'Famagusta' | 'Larnaca' | 'Limassol' | 'Nicosia' | 'Paphos';
  mw: number;
  mwh: number;
  containers: number;
  batch: 1 | 2 | 3;
}

export const parks: ParkSchedule[] = [
  // ─── BATCH 1: ABIO Phase 1 — 15 parks, ~280 MWh ───
  { id: 'b1-01', name: 'ELESTORE 1', group: 'ABIO', district: 'Nicosia', mw: 5, mwh: 20, containers: 5, batch: 1 },
  { id: 'b1-02', name: 'ELESTORE 2', group: 'ABIO', district: 'Nicosia', mw: 5, mwh: 20, containers: 5, batch: 1 },
  { id: 'b1-03', name: 'ELESTORE 3', group: 'ABIO', district: 'Nicosia', mw: 5, mwh: 20, containers: 5, batch: 1 },
  { id: 'b1-04', name: 'ELESTORE 4', group: 'ABIO', district: 'Nicosia', mw: 5, mwh: 20, containers: 5, batch: 1 },
  { id: 'b1-05', name: 'ELESTORE 5', group: 'ABIO', district: 'Nicosia', mw: 5, mwh: 20, containers: 5, batch: 1 },
  { id: 'b1-06', name: 'Easy Power 1', group: 'ABIO', district: 'Nicosia', mw: 5, mwh: 20, containers: 5, batch: 1 },
  { id: 'b1-07', name: 'Easy Power 2', group: 'ABIO', district: 'Nicosia', mw: 5, mwh: 20, containers: 5, batch: 1 },
  { id: 'b1-08', name: 'Easy Power 3', group: 'ABIO', district: 'Nicosia', mw: 5, mwh: 20, containers: 5, batch: 1 },
  { id: 'b1-09', name: 'Easy Power 4', group: 'ABIO', district: 'Nicosia', mw: 5, mwh: 20, containers: 5, batch: 1 },
  { id: 'b1-10', name: 'Dianary 1', group: 'ABIO', district: 'Nicosia', mw: 5, mwh: 20, containers: 5, batch: 1 },
  { id: 'b1-11', name: 'Dianary 2', group: 'ABIO', district: 'Nicosia', mw: 5, mwh: 20, containers: 5, batch: 1 },
  { id: 'b1-12', name: 'Dianary 3', group: 'ABIO', district: 'Nicosia', mw: 2.5, mwh: 10, containers: 3, batch: 1 },
  { id: 'b1-13', name: 'Potamia p151', group: 'ABIO', district: 'Nicosia', mw: 5, mwh: 20, containers: 5, batch: 1 },
  { id: 'b1-14', name: 'Potamia p208', group: 'ABIO', district: 'Nicosia', mw: 5, mwh: 20, containers: 5, batch: 1 },
  { id: 'b1-15', name: 'Agios Sozomenos', group: 'ABIO', district: 'Nicosia', mw: 5, mwh: 20, containers: 5, batch: 1 },

  // ─── BATCH 2: ABIO Phase 2 + TIM — 19 parks, ~230 MWh ───
  { id: 'b2-01', name: 'Renergetic 1', group: 'ABIO', district: 'Nicosia', mw: 5, mwh: 20, containers: 5, batch: 2 },
  { id: 'b2-02', name: 'Renergetic 2', group: 'ABIO', district: 'Nicosia', mw: 5, mwh: 20, containers: 5, batch: 2 },
  { id: 'b2-03', name: 'Solarity', group: 'ABIO', district: 'Nicosia', mw: 2.5, mwh: 10, containers: 3, batch: 2 },
  { id: 'b2-04', name: 'Solartech 3 Ext', group: 'ABIO', district: 'Nicosia', mw: 2.5, mwh: 10, containers: 3, batch: 2 },
  { id: 'b2-05', name: 'Waneron', group: 'ABIO', district: 'Nicosia', mw: 2.5, mwh: 10, containers: 3, batch: 2 },
  { id: 'b2-06', name: 'Greendorado Agri', group: 'ABIO', district: 'Larnaca', mw: 2.5, mwh: 8.36, containers: 2, batch: 2 },
  { id: 'b2-07', name: 'Greendorado Lar 1', group: 'ABIO', district: 'Larnaca', mw: 2.5, mwh: 10, containers: 3, batch: 2 },
  { id: 'b2-08', name: 'Polemi', group: 'ABIO', district: 'Paphos', mw: 5, mwh: 20, containers: 5, batch: 2 },
  { id: 'b2-09', name: 'Greendorado Lar 2', group: 'ABIO', district: 'Larnaca', mw: 2.5, mwh: 10, containers: 3, batch: 2 },
  { id: 'b2-10', name: 'Greendorado 1', group: 'ABIO', district: 'Larnaca', mw: 2.5, mwh: 10, containers: 3, batch: 2 },
  { id: 'b2-11', name: 'L&T Res Systems', group: 'TIM', district: 'Nicosia', mw: 2.5, mwh: 7.5, containers: 2, batch: 2 },
  { id: 'b2-12', name: 'L&T Solar Power', group: 'TIM', district: 'Nicosia', mw: 2.5, mwh: 10, containers: 3, batch: 2 },
  { id: 'b2-13', name: 'L&T Sun Energy', group: 'TIM', district: 'Nicosia', mw: 2.5, mwh: 10, containers: 3, batch: 2 },
  { id: 'b2-14', name: 'L&T Energia', group: 'TIM', district: 'Nicosia', mw: 2.5, mwh: 7.5, containers: 2, batch: 2 },
  { id: 'b2-15', name: 'L&T PV Tech', group: 'TIM', district: 'Nicosia', mw: 2.5, mwh: 10, containers: 3, batch: 2 },
  { id: 'b2-16', name: 'AGM Lightpower', group: 'TIM', district: 'Nicosia', mw: 5, mwh: 10, containers: 3, batch: 2 },
  { id: 'b2-17', name: 'AGM Sunfield 1', group: 'TIM', district: 'Nicosia', mw: 1.5, mwh: 5, containers: 2, batch: 2 },
  { id: 'b2-18', name: 'AGM Sunfield 2', group: 'TIM', district: 'Nicosia', mw: 1.5, mwh: 5, containers: 2, batch: 2 },
  { id: 'b2-19', name: 'AGM Sunfield 3', group: 'TIM', district: 'Nicosia', mw: 1.5, mwh: 5, containers: 2, batch: 2 },

  // ─── BATCH 3: ESP Phase 1 + Standalone — 12 parks, ~283 MWh ───
  { id: 'b3-01', name: 'Esperia Fam 1', group: 'ESP', district: 'Famagusta', mw: 12, mwh: 40, containers: 10, batch: 3 },
  { id: 'b3-02', name: 'Esperia Fam 2', group: 'ESP', district: 'Famagusta', mw: 12, mwh: 40, containers: 10, batch: 3 },
  { id: 'b3-03', name: 'Esperia Frenaros', group: 'ESP', district: 'Famagusta', mw: 8, mwh: 60, containers: 14, batch: 3 },
  { id: 'b3-04', name: 'Esperia Limassol', group: 'ESP', district: 'Limassol', mw: 7.5, mwh: 25, containers: 7, batch: 3 },
  { id: 'b3-05', name: 'Galascope 1', group: 'ESP', district: 'Famagusta', mw: 5, mwh: 20, containers: 5, batch: 3 },
  { id: 'b3-06', name: 'Galascope 2', group: 'ESP', district: 'Famagusta', mw: 5, mwh: 20, containers: 5, batch: 3 },
  { id: 'b3-07', name: 'Classone Breeze', group: 'Andreadis', district: 'Limassol', mw: 1.5, mwh: 5, containers: 2, batch: 3 },
  { id: 'b3-08', name: 'Classone Garden', group: 'Andreadis', district: 'Limassol', mw: 3.3, mwh: 10, containers: 3, batch: 3 },
  { id: 'b3-09', name: 'Paphos 1', group: 'Kerasi', district: 'Paphos', mw: 2.5, mwh: 7.5, containers: 2, batch: 3 },
  { id: 'b3-10', name: 'Paphos 2', group: 'Kerasi', district: 'Paphos', mw: 2.5, mwh: 7.5, containers: 2, batch: 3 },
  { id: 'b3-11', name: 'Paphos 3', group: 'Kerasi', district: 'Paphos', mw: 1.5, mwh: 5, containers: 2, batch: 3 },
  { id: 'b3-12', name: 'My Sun Park', group: 'Karis', district: 'Nicosia', mw: 7.7, mwh: 25, containers: 7, batch: 3 },
];

// ─────────────────────────────────────────────
// COMMISSIONING TIMELINE — Per Batch
// ─────────────────────────────────────────────

export interface CommissioningPhase {
  id: string;
  name: string;
  start: string;
  end: string;
  color: string;
  craneRequired: boolean;
  trucksRequired: number;
  engineersRequired: number;
}

export interface BatchCommissioning {
  batch: number;
  name: string;
  parks: number;
  containers: number;
  mwh: number;
  cifDate: string;
  phases: CommissioningPhase[];
  constraints: string[];
}

export const batchCommissioning: BatchCommissioning[] = [
  {
    batch: 1,
    name: 'ABIO Phase 1',
    parks: 15,
    containers: 73,
    mwh: 280,
    cifDate: '2026-07-05',
    phases: [
      { id: 'b1-port', name: 'Port Clearance & Customs', start: '2026-07-05', end: '2026-07-12', color: '#94a3b8', craneRequired: false, trucksRequired: 0, engineersRequired: 0 },
      { id: 'b1-transport', name: 'Container Transport to Sites', start: '2026-07-12', end: '2026-08-05', color: '#f59e0b', craneRequired: false, trucksRequired: -1, engineersRequired: 1 },
      { id: 'b1-crane', name: 'Crane Placement (15 parks)', start: '2026-07-12', end: '2026-07-30', color: '#ef4444', craneRequired: true, trucksRequired: 0, engineersRequired: 2 },
      { id: 'b1-mech', name: 'Mechanical Installation', start: '2026-07-15', end: '2026-08-15', color: '#22c55e', craneRequired: false, trucksRequired: 0, engineersRequired: 3 },
      { id: 'b1-elec', name: 'Electrical Installation', start: '2026-08-01', end: '2026-09-01', color: '#3b82f6', craneRequired: false, trucksRequired: 0, engineersRequired: 3 },
      { id: 'b1-scada', name: 'EMS/SCADA Install', start: '2026-08-15', end: '2026-09-15', color: '#8b5cf6', craneRequired: false, trucksRequired: 0, engineersRequired: 2 },
      { id: 'b1-comm', name: 'OEM Commissioning', start: '2026-09-01', end: '2026-09-30', color: '#06b6d4', craneRequired: false, trucksRequired: 0, engineersRequired: 3 },
      { id: 'b1-grid', name: 'Grid Testing & PAC', start: '2026-10-01', end: '2026-10-31', color: '#10b981', craneRequired: false, trucksRequired: 0, engineersRequired: 2 },
    ],
    constraints: [
      'Crane must complete all 15 parks before Batch 2 arrival',
      'July heat: container cooling systems must be activated immediately after placement',
      'Nicosia cluster — 14 of 15 parks in same district, efficient for crane routing',
    ],
  },
  {
    batch: 2,
    name: 'ABIO Ph.2 + TIM',
    parks: 19,
    containers: 59,
    mwh: 230,
    cifDate: '2026-08-20',
    phases: [
      { id: 'b2-port', name: 'Port Clearance & Customs', start: '2026-08-20', end: '2026-08-27', color: '#94a3b8', craneRequired: false, trucksRequired: 0, engineersRequired: 0 },
      { id: 'b2-transport', name: 'Container Transport to Sites', start: '2026-08-27', end: '2026-09-15', color: '#f59e0b', craneRequired: false, trucksRequired: -1, engineersRequired: 1 },
      { id: 'b2-crane', name: 'Crane Placement (19 parks)', start: '2026-08-27', end: '2026-09-18', color: '#ef4444', craneRequired: true, trucksRequired: 0, engineersRequired: 2 },
      { id: 'b2-mech', name: 'Mechanical Installation', start: '2026-09-01', end: '2026-10-01', color: '#22c55e', craneRequired: false, trucksRequired: 0, engineersRequired: 3 },
      { id: 'b2-elec', name: 'Electrical Installation', start: '2026-10-01', end: '2026-11-01', color: '#3b82f6', craneRequired: false, trucksRequired: 0, engineersRequired: 3 },
      { id: 'b2-scada', name: 'EMS/SCADA Install', start: '2026-10-15', end: '2026-11-15', color: '#8b5cf6', craneRequired: false, trucksRequired: 0, engineersRequired: 2 },
      { id: 'b2-comm', name: 'OEM Commissioning', start: '2026-11-01', end: '2026-12-15', color: '#06b6d4', craneRequired: false, trucksRequired: 0, engineersRequired: 3 },
      { id: 'b2-grid', name: 'Grid Testing & PAC', start: '2026-12-01', end: '2027-01-15', color: '#10b981', craneRequired: false, trucksRequired: 0, engineersRequired: 2 },
    ],
    constraints: [
      'Crane overlap risk: Batch 1 crane window ends Jul 30, Batch 2 needs crane Aug 27 — OK if on schedule',
      'Multi-district: Larnaca + Paphos parks require separate truck routes from Nicosia cluster',
      'Engineers split between Batch 1 commissioning and Batch 2 installation',
    ],
  },
  {
    batch: 3,
    name: 'ESP + Standalone',
    parks: 12,
    containers: 69,
    mwh: 265,
    cifDate: '2026-09-20',
    phases: [
      { id: 'b3-port', name: 'Port Clearance & Customs', start: '2026-09-20', end: '2026-09-27', color: '#94a3b8', craneRequired: false, trucksRequired: 0, engineersRequired: 0 },
      { id: 'b3-transport', name: 'Container Transport to Sites', start: '2026-09-27', end: '2026-10-18', color: '#f59e0b', craneRequired: false, trucksRequired: -1, engineersRequired: 1 },
      { id: 'b3-crane', name: 'Crane Placement (12 parks)', start: '2026-09-27', end: '2026-10-12', color: '#ef4444', craneRequired: true, trucksRequired: 0, engineersRequired: 2 },
      { id: 'b3-mech', name: 'Mechanical Installation', start: '2026-10-01', end: '2026-11-01', color: '#22c55e', craneRequired: false, trucksRequired: 0, engineersRequired: 3 },
      { id: 'b3-elec', name: 'Electrical Installation', start: '2026-11-01', end: '2026-12-01', color: '#3b82f6', craneRequired: false, trucksRequired: 0, engineersRequired: 3 },
      { id: 'b3-scada', name: 'EMS/SCADA Install', start: '2026-11-15', end: '2026-12-15', color: '#8b5cf6', craneRequired: false, trucksRequired: 0, engineersRequired: 2 },
      { id: 'b3-comm', name: 'OEM Commissioning', start: '2026-12-15', end: '2027-02-01', color: '#06b6d4', craneRequired: false, trucksRequired: 0, engineersRequired: 3 },
      { id: 'b3-grid', name: 'Grid Testing & PAC', start: '2027-01-15', end: '2027-02-28', color: '#10b981', craneRequired: false, trucksRequired: 0, engineersRequired: 2 },
    ],
    constraints: [
      'Crane overlap risk: Batch 2 crane ends Sep 18, Batch 3 needs Sep 27 — tight 9-day buffer',
      'Largest containers: Esperia Frenaros (60 MWh, 14 containers) — longest crane day',
      'Multi-district spread: Famagusta, Limassol, Paphos, Nicosia — crane travel time significant',
      'Concurrent arrival risk: if Batch 2 ships delayed, could overlap with Batch 3 at port',
    ],
  },
];

// ─────────────────────────────────────────────
// RESOURCE CONFLICTS & CONSTRAINTS
// ─────────────────────────────────────────────

export interface ResourceConflict {
  id: string;
  severity: ConstraintSeverity;
  resource: string;
  period: string;
  description: string;
  mitigation: string;
}

export const resourceConflicts: ResourceConflict[] = [
  {
    id: 'rc-1',
    severity: 'critical',
    resource: 'Heavy Duty Crane',
    period: 'Jul–Oct 2026',
    description: 'Only 1 heavy-duty crane in Cyprus. Required for 46 parks across 3 batches over 3 months. Any breakdown or third-party booking causes cascade delays.',
    mitigation: 'Pre-book crane for entire Jul–Oct window. Negotiate exclusivity contract. Identify backup crane option from Greece (ferry 24h).',
  },
  {
    id: 'rc-2',
    severity: 'critical',
    resource: 'Low-Loader Trucks',
    period: 'Jul–Oct 2026',
    description: 'Island truck fleet is limited and UNKNOWN. 251 containers need transport from Limassol port to sites across 5 districts. No RFI sent yet to confirm how many low-loaders can be committed.',
    mitigation: 'URGENT: Send RFI to A. Soulis & Interfreight to confirm fleet size and availability for Jul–Oct window. Identify additional transport companies. Stagger port collection over 2-3 weeks per batch.',
  },
  {
    id: 'rc-3',
    severity: 'warning',
    resource: 'Port Capacity',
    period: 'Aug–Sep 2026',
    description: 'Batch 2 (Aug 20) and Batch 3 (Sep 20) arrive only 30 days apart. If Batch 2 is delayed by 2+ weeks, both arrive simultaneously. Limassol port yard has limited storage for BESS containers.',
    mitigation: 'Arrange port-side temporary storage. Coordinate with Interfreight for priority clearance. Have trucks ready to move containers immediately on arrival.',
  },
  {
    id: 'rc-4',
    severity: 'warning',
    resource: 'Engineer Capacity',
    period: 'Sep–Dec 2026',
    description: '5 engineers must simultaneously support Batch 1 commissioning, Batch 2 installation, and Batch 3 transport. Peak resource demand Sep-Nov 2026.',
    mitigation: 'Linyang commissioning team supplements during peak. Prioritize by batch PAC deadlines. Costas + Andreas provide additional project management.',
  },
  {
    id: 'rc-5',
    severity: 'info',
    resource: 'Crane + Trucks Co-dependency',
    period: 'Jul–Oct 2026',
    description: 'Crane cannot place containers that haven\'t been delivered. Trucks cannot unload at site without crane. Tight coordination required between transport and crane schedules.',
    mitigation: 'Stage containers at nearest accessible point if crane not yet at site. Create daily dispatch schedule coordinating truck arrivals with crane location.',
  },
];

// ─────────────────────────────────────────────
// CRANE UTILIZATION SCHEDULE
// ─────────────────────────────────────────────

export interface CraneDay {
  date: string;
  batch: number;
  parks: string[];
  containers: number;
  district: string;
  notes?: string;
}

export function generateCraneSchedule(): CraneDay[] {
  const schedule: CraneDay[] = [];

  const addDays = (dateStr: string, days: number): string => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  };

  // Batch 1: Jul 12 – Jul 30 (15 parks, mostly Nicosia cluster)
  let dayOffset = 0;
  const b1Parks = parks.filter(p => p.batch === 1);
  for (const park of b1Parks) {
    const craneDays = Math.ceil(park.containers / 5); // ~5 containers per crane-day
    for (let d = 0; d < craneDays; d++) {
      schedule.push({
        date: addDays('2026-07-12', dayOffset),
        batch: 1,
        parks: [park.name],
        containers: Math.min(5, park.containers - d * 5),
        district: park.district,
      });
      dayOffset++;
    }
  }

  // Batch 2: Aug 27 – Sep 18 (19 parks, multi-district)
  dayOffset = 0;
  const b2Parks = parks.filter(p => p.batch === 2);
  for (const park of b2Parks) {
    const craneDays = Math.ceil(park.containers / 5);
    for (let d = 0; d < craneDays; d++) {
      schedule.push({
        date: addDays('2026-08-27', dayOffset),
        batch: 2,
        parks: [park.name],
        containers: Math.min(5, park.containers - d * 5),
        district: park.district,
      });
      dayOffset++;
    }
  }

  // Batch 3: Sep 27 – Oct 12 (12 parks, wide spread)
  dayOffset = 0;
  const b3Parks = parks.filter(p => p.batch === 3);
  for (const park of b3Parks) {
    const craneDays = Math.ceil(park.containers / 5);
    for (let d = 0; d < craneDays; d++) {
      schedule.push({
        date: addDays('2026-09-27', dayOffset),
        batch: 3,
        parks: [park.name],
        containers: Math.min(5, park.containers - d * 5),
        district: park.district,
        notes: park.containers > 10 ? 'Large park — extended crane time' : undefined,
      });
      dayOffset++;
    }
  }

  return schedule;
}

// ─────────────────────────────────────────────
// MAINTENANCE PROGRAM
// ─────────────────────────────────────────────

export interface MaintenanceQuarter {
  quarter: string;
  label: string;
  start: string;
  end: string;
}

export const maintenanceQuarters: MaintenanceQuarter[] = [
  { quarter: 'Q3-2026', label: 'Q3 2026', start: '2026-07-01', end: '2026-09-30' },
  { quarter: 'Q4-2026', label: 'Q4 2026', start: '2026-10-01', end: '2026-12-31' },
  { quarter: 'Q1-2027', label: 'Q1 2027', start: '2027-01-01', end: '2027-03-31' },
  { quarter: 'Q2-2027', label: 'Q2 2027', start: '2027-04-01', end: '2027-06-30' },
];

export interface DistrictMaintenancePlan {
  district: string;
  parks: number;
  totalMwh: number;
  daysPerQuarter: number;
  primaryEngineer: string;
  backupEngineer: string;
  travelTime: string;
}

export const districtPlans: DistrictMaintenancePlan[] = [
  { district: 'Nicosia', parks: 34, totalMwh: 576.5, daysPerQuarter: 85, primaryEngineer: 'Szymon + Kacper', backupEngineer: 'Dawid', travelTime: '45 min from Limassol' },
  { district: 'Famagusta', parks: 7, totalMwh: 200, daysPerQuarter: 17.5, primaryEngineer: 'Dawid', backupEngineer: 'Szymon', travelTime: '1.5 hr from Limassol' },
  { district: 'Limassol', parks: 5, totalMwh: 40, daysPerQuarter: 12.5, primaryEngineer: 'Costas', backupEngineer: 'Dawid', travelTime: 'Local' },
  { district: 'Paphos', parks: 4, totalMwh: 40, daysPerQuarter: 10, primaryEngineer: 'Kacper', backupEngineer: 'Costas', travelTime: '1.5 hr from Limassol' },
  { district: 'Larnaca', parks: 1, totalMwh: 25, daysPerQuarter: 2.5, primaryEngineer: 'Costas', backupEngineer: 'Kacper', travelTime: '30 min from Limassol' },
];

// ─────────────────────────────────────────────
// MAINTENANCE STATISTICS
// ─────────────────────────────────────────────

export const maintenanceStats = {
  totalParks: 51,
  daysPerParkPerYear: 10,
  totalDaysPerYear: 510,
  daysPerQuarter: 127.5,
  visitDuration: 2.5,
  visitsPerParkPerYear: 4,
  engineersPerVisit: 2,
  totalEngineerDaysPerYear: 510,
  nightShiftWindow: '00:00–06:00',
  maintenanceScope: [
    'Battery module inspection (visual + thermal)',
    'BMS parameter verification & calibration',
    'Liquid cooling system check (flow, temperature, leaks)',
    'Fire suppression system inspection',
    'PCS/inverter diagnostics & firmware check',
    'MV switchgear inspection & oil level check',
    'Earthing system resistance measurement',
    'SCADA/EMS data verification',
    'Container structural inspection (C5 corrosion check)',
    'Safety equipment & signage verification',
  ],
};

// ─────────────────────────────────────────────
// TIMELINE CONSTANTS
// ─────────────────────────────────────────────

export const opsTimelineStart = '2026-07-01';
export const opsTimelineEnd = '2027-03-31';

export function daysBetweenOps(start: string, end: string): number {
  const s = new Date(start);
  const e = new Date(end);
  return Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
}

// ─────────────────────────────────────────────
// BATCH SUMMARY HELPERS
// ─────────────────────────────────────────────

export function getBatchSummary(batch: number) {
  const batchParks = parks.filter(p => p.batch === batch);
  return {
    parks: batchParks.length,
    containers: batchParks.reduce((s, p) => s + p.containers, 0),
    totalMwh: batchParks.reduce((s, p) => s + p.mwh, 0),
    totalMw: batchParks.reduce((s, p) => s + p.mw, 0),
    districts: [...new Set(batchParks.map(p => p.district))],
    groups: [...new Set(batchParks.map(p => p.group))],
  };
}

export const BATCH_COLORS: Record<number, string> = {
  1: '#22c55e',
  2: '#f59e0b',
  3: '#8b5cf6',
};
