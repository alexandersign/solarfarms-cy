// ===================================================================
// BESS Cyprus Portfolio — Master Project Timeline
// Order Date: 1 March 2026 | 51 Parks | 249 MW | 882 MWh
// ===================================================================

export type TaskStatus = 'not-started' | 'in-progress' | 'complete' | 'blocked' | 'critical';

export interface TimelineTask {
  id: string;
  name: string;
  phase: string;
  start: string;      // ISO date
  end: string;        // ISO date
  status: TaskStatus;
  progress: number;   // 0-100
  dependencies?: string[];
  milestone?: boolean;
  notes?: string;
  assignee?: string;
  batch?: 'all' | 1 | 2 | 3;
}

export interface Phase {
  id: string;
  name: string;
  shortName: string;
  color: string;
  start: string;
  end: string;
  tasks: TimelineTask[];
}

export interface KeyMilestone {
  id: string;
  name: string;
  date: string;
  status: TaskStatus;
  phase: string;
  critical: boolean;
}

export interface ReadinessCategory {
  name: string;
  score: number;
  items: { name: string; status: 'ready' | 'partial' | 'blocked' | 'not-started' }[];
}

// ===================================================================
// DELIVERY SCHEDULE (from client proposals)
// Contract/Order: 1 Mar 2026
// Production: +90 days → 29 May 2026
// Shipment: +7 days → 5 Jun 2026
// CIF Limassol: +30 days → 5 Jul 2026
// Installation: +23 days per batch
// Commissioning: +14 days per batch
// ===================================================================

// Batch strategy: 3 delivery batches aligned with group priority
// Batch 1: ABIO Phase 1 (15 verified parks, ~280 MWh) — Jul-Sep 2026
// Batch 2: ABIO Phase 2 + TIM (10+9 parks, ~230 MWh) — Sep-Nov 2026
// Batch 3: ESP Phase 1 + Standalone (6+6 parks, ~283 MWh) — Oct-Dec 2026
// ESP 2028 parks: Separate future order

export const phases: Phase[] = [
  // ─────────────────────────────────────────────
  // PHASE 0: PRE-CONTRACT (Now → Order Date)
  // ─────────────────────────────────────────────
  {
    id: 'pre-contract',
    name: 'Pre-Contract & Legal',
    shortName: 'Legal',
    color: '#ef4444',
    start: '2026-02-10',
    end: '2026-03-01',
    tasks: [
      {
        id: 'pc-1', name: 'Resolve OEM sales contract (18 amendments)',
        phase: 'pre-contract', start: '2026-02-10', end: '2026-02-25',
        status: 'in-progress', progress: 40, notes: 'CIF dest, payment terms, governing law, warranty start',
      },
      {
        id: 'pc-2', name: 'Resolve ext. warranty Yr 11-15 pricing (261% gap)',
        phase: 'pre-contract', start: '2026-02-10', end: '2026-02-20',
        status: 'critical', progress: 0, notes: 'Linyang €4,182 vs client model €1,158/MWh/yr',
      },
      {
        id: 'pc-3', name: 'Obtain EN 50549-2 grid code cert',
        phase: 'pre-contract', start: '2026-02-10', end: '2026-03-15',
        status: 'blocked', progress: 0, notes: 'MANDATORY for EAC grid connection — Linyang/Kehua to provide',
      },
      {
        id: 'pc-4', name: 'Obtain 14 missing MV skid datasheets',
        phase: 'pre-contract', start: '2026-02-10', end: '2026-02-28',
        status: 'blocked', progress: 7, notes: 'Only 10MW config available. Blocks protection studies',
      },
      {
        id: 'pc-5', name: 'Sign OEM Sales Agreement',
        phase: 'pre-contract', start: '2026-02-25', end: '2026-03-01',
        status: 'not-started', progress: 0, milestone: true, dependencies: ['pc-1', 'pc-2'],
      },
      {
        id: 'pc-6', name: 'Voltus RFI response (BoM confirmation)',
        phase: 'pre-contract', start: '2026-02-10', end: '2026-02-21',
        status: 'in-progress', progress: 50, notes: 'RFI sent 10 Feb, response due 21 Feb',
      },
      {
        id: 'pc-7', name: 'Draft client EPC contracts',
        phase: 'pre-contract', start: '2026-02-15', end: '2026-03-10',
        status: 'not-started', progress: 0, notes: 'Needs OEM terms finalized first',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PHASE 1: ORDER & ENGINEERING
  // ─────────────────────────────────────────────
  {
    id: 'engineering',
    name: 'Order & Engineering Design',
    shortName: 'Engineering',
    color: '#f59e0b',
    start: '2026-03-01',
    end: '2026-06-15',
    tasks: [
      {
        id: 'eng-0', name: 'OEM ORDER PLACED (30% advance)',
        phase: 'engineering', start: '2026-03-01', end: '2026-03-01',
        status: 'not-started', progress: 0, milestone: true, batch: 'all',
        notes: 'Order date: 1 March 2026. Production begins +7 days.',
      },
      {
        id: 'eng-1', name: 'Protection coordination studies (all configs)',
        phase: 'engineering', start: '2026-03-01', end: '2026-04-15',
        status: 'not-started', progress: 0, dependencies: ['pc-4'],
        notes: 'Requires MV datasheets + transformer data + DSO settings',
      },
      {
        id: 'eng-2', name: 'Single-line diagrams — all 15 site sizes',
        phase: 'engineering', start: '2026-03-01', end: '2026-04-30',
        status: 'not-started', progress: 0, dependencies: ['pc-4'],
      },
      {
        id: 'eng-3', name: 'Grid connection applications (EAC) — 51 parks',
        phase: 'engineering', start: '2026-03-15', end: '2026-05-15',
        status: 'not-started', progress: 0, dependencies: ['pc-3', 'eng-1'],
        notes: 'Long lead time. Needs EN 50549-2 + protection studies',
      },
      {
        id: 'eng-4', name: 'Civil & structural design (foundations, drainage)',
        phase: 'engineering', start: '2026-03-15', end: '2026-04-30',
        status: 'not-started', progress: 0,
      },
      {
        id: 'eng-5', name: 'EMS/SCADA integration design (Voltus/WAGO)',
        phase: 'engineering', start: '2026-03-01', end: '2026-04-15',
        status: 'not-started', progress: 0, dependencies: ['pc-6'],
      },
      {
        id: 'eng-6', name: 'Site surveys & geotechnical (all 51 sites)',
        phase: 'engineering', start: '2026-03-01', end: '2026-04-15',
        status: 'not-started', progress: 0,
      },
      {
        id: 'eng-7', name: 'Voltus EMS/SCADA order placed',
        phase: 'engineering', start: '2026-03-15', end: '2026-03-15',
        status: 'not-started', progress: 0, milestone: true, dependencies: ['pc-6'],
      },
      {
        id: 'eng-8', name: 'Issue local subcontractor RFPs (civil, mech, elec)',
        phase: 'engineering', start: '2026-03-01', end: '2026-03-31',
        status: 'not-started', progress: 0,
        notes: '12+ cost columns in spreadsheet still empty',
      },
      {
        id: 'eng-9', name: 'Award local subcontracts',
        phase: 'engineering', start: '2026-04-01', end: '2026-04-30',
        status: 'not-started', progress: 0, dependencies: ['eng-8'],
      },
      {
        id: 'eng-10', name: 'Obtain CAR/EPC/PI insurance quotes',
        phase: 'engineering', start: '2026-03-01', end: '2026-03-31',
        status: 'not-started', progress: 0,
      },
      {
        id: 'eng-11', name: 'Building & electrical permits (all parks)',
        phase: 'engineering', start: '2026-03-15', end: '2026-06-15',
        status: 'not-started', progress: 0,
        notes: 'Long lead time — varies by municipality',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PHASE 2: OPERATIONAL READINESS
  // ─────────────────────────────────────────────
  {
    id: 'ops-readiness',
    name: 'Operational Readiness',
    shortName: 'Ops Setup',
    color: '#8b5cf6',
    start: '2026-02-15',
    end: '2026-07-15',
    tasks: [
      {
        id: 'ops-1', name: 'Sign warehouse lease',
        phase: 'ops-readiness', start: '2026-02-15', end: '2026-03-15',
        status: 'not-started', progress: 0, assignee: 'Operations',
        notes: 'Need warehouse for 40 pallets spares + WAGO hardware + site materials. Limassol industrial area.',
      },
      {
        id: 'ops-2', name: 'Warehouse fit-out (racking, power, security)',
        phase: 'ops-readiness', start: '2026-03-15', end: '2026-04-15',
        status: 'not-started', progress: 0, dependencies: ['ops-1'], assignee: 'Operations',
      },
      {
        id: 'ops-3', name: 'Finalize forklift selection & procurement',
        phase: 'ops-readiness', start: '2026-02-15', end: '2026-03-31',
        status: 'not-started', progress: 0, assignee: 'Operations',
        notes: 'Need: 1x 5-ton forklift (container handling), 1x 2.5-ton (pallet work). Evaluate lease vs buy.',
      },
      {
        id: 'ops-4', name: 'Procure transport vehicles (BESS O&M fleet)',
        phase: 'ops-readiness', start: '2026-03-01', end: '2026-04-30',
        status: 'not-started', progress: 0, assignee: 'Operations',
        notes: 'Service vans with tool storage. 2-3 vehicles for island-wide coverage.',
      },
      {
        id: 'ops-5', name: 'Hire Engineer #1 (Senior BESS/HV)',
        phase: 'ops-readiness', start: '2026-02-15', end: '2026-03-31',
        status: 'not-started', progress: 0, assignee: 'HR',
        notes: 'Priority hire: HV/MV experience, commissioning lead capability',
      },
      {
        id: 'ops-6', name: 'Hire Engineer #2 (Electrical/Controls)',
        phase: 'ops-readiness', start: '2026-03-01', end: '2026-04-15',
        status: 'not-started', progress: 0, assignee: 'HR',
        notes: 'PLC/SCADA experience, WAGO familiarity preferred',
      },
      {
        id: 'ops-7', name: 'Hire Engineer #3 (Mechanical/Civil)',
        phase: 'ops-readiness', start: '2026-03-15', end: '2026-04-30',
        status: 'not-started', progress: 0, assignee: 'HR',
        notes: 'Foundation works, container installation supervision',
      },
      {
        id: 'ops-8', name: 'Hire Engineer #4 (Service/O&M)',
        phase: 'ops-readiness', start: '2026-04-01', end: '2026-05-15',
        status: 'not-started', progress: 0, assignee: 'HR',
        notes: 'Post-commissioning O&M. Night shift capability.',
      },
      {
        id: 'ops-9', name: 'OEM training — Linyang BESS (Engineers #1-2)',
        phase: 'ops-readiness', start: '2026-04-15', end: '2026-05-15',
        status: 'not-started', progress: 0, dependencies: ['ops-5', 'ops-6'], assignee: 'Training',
        notes: 'Factory training in China or Poland. BMS, safety, installation procedures.',
      },
      {
        id: 'ops-10', name: 'OEM training — Kehua PCS (Engineers #1-2)',
        phase: 'ops-readiness', start: '2026-05-01', end: '2026-05-31',
        status: 'not-started', progress: 0, dependencies: ['ops-5', 'ops-6'], assignee: 'Training',
        notes: 'PCS commissioning, Modbus configuration, fault diagnosis',
      },
      {
        id: 'ops-11', name: 'Voltus EMS/SCADA training (Engineers #2, #4)',
        phase: 'ops-readiness', start: '2026-05-15', end: '2026-06-15',
        status: 'not-started', progress: 0, dependencies: ['ops-6', 'ops-8'], assignee: 'Training',
        notes: 'WAGO PFC200 programming, Voltus platform, IEC-104 config',
      },
      {
        id: 'ops-12', name: 'HV safety certification (all 4 engineers)',
        phase: 'ops-readiness', start: '2026-04-01', end: '2026-05-01',
        status: 'not-started', progress: 0, dependencies: ['ops-5'], assignee: 'Training',
        notes: 'Cyprus HV authorization, safety protocols, first aid',
      },
      {
        id: 'ops-13', name: 'Warehouse ready for spares receipt',
        phase: 'ops-readiness', start: '2026-06-15', end: '2026-06-15',
        status: 'not-started', progress: 0, milestone: true, dependencies: ['ops-1', 'ops-2', 'ops-3'],
        notes: 'Must be ready before CIF arrival of Batch 1',
      },
      {
        id: 'ops-14', name: 'Full team trained & certified',
        phase: 'ops-readiness', start: '2026-06-15', end: '2026-06-15',
        status: 'not-started', progress: 0, milestone: true,
        dependencies: ['ops-9', 'ops-10', 'ops-11', 'ops-12'],
        notes: 'All 4 engineers ready for Batch 1 installation',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PHASE 3: MANUFACTURING & SHIPPING
  // ─────────────────────────────────────────────
  {
    id: 'manufacturing',
    name: 'Manufacturing & Shipping',
    shortName: 'Mfg/Ship',
    color: '#0ea5e9',
    start: '2026-03-08',
    end: '2026-10-15',
    tasks: [
      {
        id: 'mfg-1', name: 'Production start (all batches)',
        phase: 'manufacturing', start: '2026-03-08', end: '2026-03-08',
        status: 'not-started', progress: 0, milestone: true, batch: 'all',
        notes: 'Factory starts 7 days after order. ~251 containers total.',
      },
      {
        id: 'mfg-2', name: 'Batch 1 production: ABIO Ph.1 (15 parks, ~80 containers)',
        phase: 'manufacturing', start: '2026-03-08', end: '2026-06-05',
        status: 'not-started', progress: 0, batch: 1,
      },
      {
        id: 'mfg-3', name: 'FAT inspection — Batch 1',
        phase: 'manufacturing', start: '2026-05-20', end: '2026-06-05',
        status: 'not-started', progress: 0, dependencies: ['mfg-2'], batch: 1,
        notes: 'Factory Acceptance Test at Linyang plant',
      },
      {
        id: 'mfg-4', name: 'Batch 1 shipment (CIF Limassol)',
        phase: 'manufacturing', start: '2026-06-05', end: '2026-07-05',
        status: 'not-started', progress: 0, dependencies: ['mfg-3'], batch: 1,
        notes: '~30 days sea freight China → Limassol',
      },
      {
        id: 'mfg-4b', name: '70% payment due — Batch 1 pre-shipment',
        phase: 'manufacturing', start: '2026-06-01', end: '2026-06-01',
        status: 'not-started', progress: 0, milestone: true, batch: 1,
        notes: 'Per payment terms: balance due before shipment',
      },
      {
        id: 'mfg-5', name: 'Batch 1 CIF arrival Limassol port',
        phase: 'manufacturing', start: '2026-07-05', end: '2026-07-05',
        status: 'not-started', progress: 0, milestone: true, batch: 1,
      },
      {
        id: 'mfg-6', name: 'Port clearance & customs — Batch 1',
        phase: 'manufacturing', start: '2026-07-05', end: '2026-07-12',
        status: 'not-started', progress: 0, dependencies: ['mfg-5'], batch: 1,
      },
      {
        id: 'mfg-7', name: 'Batch 2 production: ABIO Ph.2 + TIM (19 parks)',
        phase: 'manufacturing', start: '2026-04-15', end: '2026-07-15',
        status: 'not-started', progress: 0, batch: 2,
      },
      {
        id: 'mfg-8', name: 'Batch 2 shipment & CIF arrival',
        phase: 'manufacturing', start: '2026-07-20', end: '2026-08-20',
        status: 'not-started', progress: 0, dependencies: ['mfg-7'], batch: 2,
      },
      {
        id: 'mfg-9', name: 'Batch 3 production: ESP + Standalone (12 parks)',
        phase: 'manufacturing', start: '2026-05-15', end: '2026-08-15',
        status: 'not-started', progress: 0, batch: 3,
      },
      {
        id: 'mfg-10', name: 'Batch 3 shipment & CIF arrival',
        phase: 'manufacturing', start: '2026-08-20', end: '2026-09-20',
        status: 'not-started', progress: 0, dependencies: ['mfg-9'], batch: 3,
      },
      {
        id: 'mfg-11', name: 'Spares stock arrives (40 pallets)',
        phase: 'manufacturing', start: '2026-07-05', end: '2026-07-05',
        status: 'not-started', progress: 0, milestone: true, batch: 'all',
        notes: 'Ships with Batch 1. Delivered to Lighthief warehouse.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PHASE 4: CONSTRUCTION & INSTALLATION
  // ─────────────────────────────────────────────
  {
    id: 'construction',
    name: 'Construction & Installation',
    shortName: 'Construction',
    color: '#22c55e',
    start: '2026-06-01',
    end: '2027-01-31',
    tasks: [
      {
        id: 'con-1', name: 'Site prep & civil works — Batch 1 (15 parks)',
        phase: 'construction', start: '2026-06-01', end: '2026-07-15',
        status: 'not-started', progress: 0, batch: 1,
        notes: 'Foundations, drainage, fencing, access roads. Start before equipment arrives.',
      },
      {
        id: 'con-2', name: 'Equipment delivery to sites — Batch 1',
        phase: 'construction', start: '2026-07-12', end: '2026-07-25',
        status: 'not-started', progress: 0, dependencies: ['mfg-6'], batch: 1,
        notes: 'Crane + low-loader transport from port to sites',
      },
      {
        id: 'con-3', name: 'Mechanical installation — Batch 1',
        phase: 'construction', start: '2026-07-15', end: '2026-08-15',
        status: 'not-started', progress: 0, dependencies: ['con-1', 'con-2'], batch: 1,
        notes: 'Container placement, MV skid installation, transformer positioning',
      },
      {
        id: 'con-4', name: 'Electrical installation — Batch 1',
        phase: 'construction', start: '2026-08-01', end: '2026-09-01',
        status: 'not-started', progress: 0, dependencies: ['con-3'], batch: 1,
        notes: 'MV/LV cabling, terminations, earthing, LPS',
      },
      {
        id: 'con-5', name: 'EMS/SCADA hardware install — Batch 1',
        phase: 'construction', start: '2026-08-15', end: '2026-09-15',
        status: 'not-started', progress: 0, dependencies: ['con-4'], batch: 1,
        notes: 'WAGO PFC200, network equipment, Voltus on-site config',
      },
      {
        id: 'con-6', name: 'Site prep & civil works — Batch 2 (19 parks)',
        phase: 'construction', start: '2026-07-15', end: '2026-09-01',
        status: 'not-started', progress: 0, batch: 2,
      },
      {
        id: 'con-7', name: 'Equipment delivery + installation — Batch 2',
        phase: 'construction', start: '2026-08-25', end: '2026-10-15',
        status: 'not-started', progress: 0, dependencies: ['mfg-8', 'con-6'], batch: 2,
      },
      {
        id: 'con-8', name: 'Electrical + EMS install — Batch 2',
        phase: 'construction', start: '2026-10-01', end: '2026-11-15',
        status: 'not-started', progress: 0, dependencies: ['con-7'], batch: 2,
      },
      {
        id: 'con-9', name: 'Site prep & civil works — Batch 3 (12 parks)',
        phase: 'construction', start: '2026-08-15', end: '2026-10-01',
        status: 'not-started', progress: 0, batch: 3,
      },
      {
        id: 'con-10', name: 'Equipment delivery + installation — Batch 3',
        phase: 'construction', start: '2026-09-25', end: '2026-11-15',
        status: 'not-started', progress: 0, dependencies: ['mfg-10', 'con-9'], batch: 3,
      },
      {
        id: 'con-11', name: 'Electrical + EMS install — Batch 3',
        phase: 'construction', start: '2026-11-01', end: '2026-12-15',
        status: 'not-started', progress: 0, dependencies: ['con-10'], batch: 3,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PHASE 5: COMMISSIONING & HANDOVER
  // ─────────────────────────────────────────────
  {
    id: 'commissioning',
    name: 'Commissioning & Handover',
    shortName: 'Commission',
    color: '#06b6d4',
    start: '2026-09-01',
    end: '2027-03-31',
    tasks: [
      {
        id: 'com-1', name: 'OEM commissioning — Batch 1 (Linyang team on-site)',
        phase: 'commissioning', start: '2026-09-01', end: '2026-09-30',
        status: 'not-started', progress: 0, dependencies: ['con-5'], batch: 1,
        notes: 'Linyang installation team + Kehua PCS commissioning',
      },
      {
        id: 'com-2', name: 'EMS/SCADA commissioning — Batch 1 (Voltus)',
        phase: 'commissioning', start: '2026-09-15', end: '2026-10-15',
        status: 'not-started', progress: 0, dependencies: ['con-5'], batch: 1,
        notes: 'WAGO config, EMS dispatch testing, SCADA Local/Global',
      },
      {
        id: 'com-3', name: 'Protection & grid code testing — Batch 1',
        phase: 'commissioning', start: '2026-10-01', end: '2026-10-31',
        status: 'not-started', progress: 0, dependencies: ['com-1', 'com-2'], batch: 1,
        notes: 'LVRT/HVRT, anti-islanding, frequency response, IEC-104 to DSO',
      },
      {
        id: 'com-4', name: 'PAC — Batch 1 (Provisional Acceptance)',
        phase: 'commissioning', start: '2026-10-31', end: '2026-10-31',
        status: 'not-started', progress: 0, milestone: true, dependencies: ['com-3'], batch: 1,
        notes: '10% final payment released on PAC',
      },
      {
        id: 'com-5', name: 'OEM + EMS commissioning — Batch 2',
        phase: 'commissioning', start: '2026-11-01', end: '2026-12-15',
        status: 'not-started', progress: 0, dependencies: ['con-8'], batch: 2,
      },
      {
        id: 'com-6', name: 'Grid testing + PAC — Batch 2',
        phase: 'commissioning', start: '2026-12-01', end: '2027-01-15',
        status: 'not-started', progress: 0, dependencies: ['com-5'], batch: 2,
      },
      {
        id: 'com-6b', name: 'PAC — Batch 2',
        phase: 'commissioning', start: '2027-01-15', end: '2027-01-15',
        status: 'not-started', progress: 0, milestone: true, batch: 2,
      },
      {
        id: 'com-7', name: 'OEM + EMS commissioning — Batch 3',
        phase: 'commissioning', start: '2026-12-15', end: '2027-02-01',
        status: 'not-started', progress: 0, dependencies: ['con-11'], batch: 3,
      },
      {
        id: 'com-8', name: 'Grid testing + PAC — Batch 3',
        phase: 'commissioning', start: '2027-01-15', end: '2027-02-28',
        status: 'not-started', progress: 0, dependencies: ['com-7'], batch: 3,
      },
      {
        id: 'com-8b', name: 'PAC — Batch 3',
        phase: 'commissioning', start: '2027-02-28', end: '2027-02-28',
        status: 'not-started', progress: 0, milestone: true, batch: 3,
      },
      {
        id: 'com-9', name: 'FAC — All parks (Final Acceptance, 6mo after PAC)',
        phase: 'commissioning', start: '2027-03-31', end: '2027-03-31',
        status: 'not-started', progress: 0, milestone: true, batch: 'all',
        notes: 'Performance retention released after 6-month reliability run',
      },
    ],
  },
];

// ===================================================================
// KEY MILESTONES (for milestone tracker)
// ===================================================================

export const keyMilestones: KeyMilestone[] = [
  { id: 'km-1', name: 'OEM Contract Signed', date: '2026-03-01', status: 'not-started', phase: 'pre-contract', critical: true },
  { id: 'km-2', name: 'Order Placed (30% Advance)', date: '2026-03-01', status: 'not-started', phase: 'engineering', critical: true },
  { id: 'km-3', name: 'Warehouse Lease Signed', date: '2026-03-15', status: 'not-started', phase: 'ops-readiness', critical: false },
  { id: 'km-4', name: 'Voltus EMS/SCADA Ordered', date: '2026-03-15', status: 'not-started', phase: 'engineering', critical: true },
  { id: 'km-5', name: 'First 2 Engineers Hired', date: '2026-03-31', status: 'not-started', phase: 'ops-readiness', critical: true },
  { id: 'km-6', name: 'All Subcontracts Awarded', date: '2026-04-30', status: 'not-started', phase: 'engineering', critical: false },
  { id: 'km-7', name: 'All 4 Engineers Hired', date: '2026-05-15', status: 'not-started', phase: 'ops-readiness', critical: true },
  { id: 'km-8', name: 'Batch 1 Production Complete', date: '2026-06-05', status: 'not-started', phase: 'manufacturing', critical: true },
  { id: 'km-9', name: 'Batch 1 FAT Passed', date: '2026-06-05', status: 'not-started', phase: 'manufacturing', critical: true },
  { id: 'km-10', name: 'Team Fully Trained', date: '2026-06-15', status: 'not-started', phase: 'ops-readiness', critical: true },
  { id: 'km-11', name: 'Warehouse Ready', date: '2026-06-15', status: 'not-started', phase: 'ops-readiness', critical: true },
  { id: 'km-12', name: 'Batch 1 CIF Limassol', date: '2026-07-05', status: 'not-started', phase: 'manufacturing', critical: true },
  { id: 'km-13', name: 'Batch 1 PAC (15 parks live)', date: '2026-10-31', status: 'not-started', phase: 'commissioning', critical: true },
  { id: 'km-14', name: 'Batch 2 PAC (19 parks live)', date: '2027-01-15', status: 'not-started', phase: 'commissioning', critical: true },
  { id: 'km-15', name: 'Batch 3 PAC (12 parks live)', date: '2027-02-28', status: 'not-started', phase: 'commissioning', critical: true },
  { id: 'km-16', name: 'Portfolio FAC (all 46 parks)', date: '2027-03-31', status: 'not-started', phase: 'commissioning', critical: true },
];

// ===================================================================
// READINESS SCORES (from EPC assessment)
// ===================================================================

export const readinessCategories: ReadinessCategory[] = [
  {
    name: 'Equipment Procurement',
    score: 55,
    items: [
      { name: 'BESS containers (Linyang)', status: 'ready' },
      { name: 'PCS (Kehua)', status: 'ready' },
      { name: 'OEM spares stock (40 pallets)', status: 'ready' },
      { name: 'EMS/SCADA (Voltus)', status: 'partial' },
      { name: 'MV Skid datasheets (14/15 missing)', status: 'blocked' },
      { name: 'Transformers (14/15 missing)', status: 'blocked' },
    ],
  },
  {
    name: 'Legal & Contractual',
    score: 35,
    items: [
      { name: 'Distribution agreement', status: 'ready' },
      { name: 'OEM sales agreement (18 amendments)', status: 'partial' },
      { name: 'Client EPC contracts', status: 'not-started' },
      { name: 'Performance bond (5% vs 10%)', status: 'blocked' },
      { name: 'SOH remedy terms', status: 'blocked' },
    ],
  },
  {
    name: 'Technical & Engineering',
    score: 25,
    items: [
      { name: 'BESS technical specs', status: 'ready' },
      { name: 'System architecture', status: 'ready' },
      { name: 'EN 50549-2 grid code cert', status: 'blocked' },
      { name: 'Protection coordination study', status: 'not-started' },
      { name: 'Grid connection applications', status: 'not-started' },
      { name: 'Single-line diagrams', status: 'not-started' },
    ],
  },
  {
    name: 'Financial & Commercial',
    score: 50,
    items: [
      { name: 'CIF pricing confirmed', status: 'ready' },
      { name: 'EPC adders model', status: 'ready' },
      { name: 'EMS/SCADA cost model', status: 'ready' },
      { name: 'Ext. warranty Yr 11-15 (261% gap)', status: 'blocked' },
      { name: 'Local subcontractor quotes', status: 'not-started' },
      { name: 'Insurance quotes', status: 'not-started' },
    ],
  },
  {
    name: 'Operational Readiness',
    score: 10,
    items: [
      { name: 'Warehouse lease', status: 'not-started' },
      { name: 'Forklifts & transport', status: 'not-started' },
      { name: 'Hire 4 engineers', status: 'not-started' },
      { name: 'OEM training (Linyang/Kehua)', status: 'not-started' },
      { name: 'EMS training (Voltus/WAGO)', status: 'not-started' },
      { name: 'HV safety certification', status: 'not-started' },
    ],
  },
  {
    name: 'Project Management',
    score: 15,
    items: [
      { name: 'Master project schedule', status: 'partial' },
      { name: 'Construction permits', status: 'not-started' },
      { name: 'Grid connection permits', status: 'not-started' },
      { name: 'Site surveys', status: 'not-started' },
    ],
  },
];

// ===================================================================
// PORTFOLIO STATS
// ===================================================================

export const portfolioStats = {
  totalParks: 51,
  totalMW: 249,
  totalMWh: 882,
  totalContainers: 251,
  orderDate: '2026-03-01',
  batches: [
    { id: 1, name: 'Batch 1: ABIO Phase 1', parks: 15, mwh: 280, cifDate: '2026-07-05', pacDate: '2026-10-31' },
    { id: 2, name: 'Batch 2: ABIO Ph.2 + TIM', parks: 19, mwh: 230, cifDate: '2026-08-20', pacDate: '2027-01-15' },
    { id: 3, name: 'Batch 3: ESP + Standalone', parks: 12, mwh: 283, cifDate: '2026-09-20', pacDate: '2027-02-28' },
  ],
  esp2028Parks: 5,
  esp2028Note: 'Esperia Tseri (5 parks, 27.5 MW, 87.5 MWh) — separate 2028 order',
};

// ===================================================================
// HELPER: Calculate days between dates
// ===================================================================
export function daysBetween(start: string, end: string): number {
  const s = new Date(start);
  const e = new Date(end);
  return Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
}

// Total timeline span
export const timelineStart = '2026-02-10';
export const timelineEnd = '2027-03-31';
