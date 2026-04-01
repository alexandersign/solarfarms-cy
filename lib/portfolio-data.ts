// ===================================================================
// BESS CYPRUS PORTFOLIO — SINGLE SOURCE OF TRUTH
// All documents MUST reference this file for portfolio data.
// When an RFI response or updated quotation arrives, update HERE ONLY
// then run: npm run docs:generate && npm run docs:validate
//
// Last updated: 24 March 2026
// Source: Lighthief-EPC-Confirmed-Adders-v4-Feb2026.xlsx
// ABIO REMOVED: Chose another supplier (CATL at €124K/MWh flat). Mar 2026.
// Spanercom (Anarita 2×5/20, €119k/MWh client offer) — Batch 1.
// ===================================================================

export type DataStatus = 'confirmed' | 'quoted' | 'estimated' | 'pending' | 'client-paid' | 'superseded';

interface MetaInfo {
  source: string;
  date: string;
  rfiDoc?: string;
  note?: string;
}

// ─────────────────────────────────────────────
// PORTFOLIO SUMMARY
// ─────────────────────────────────────────────

export const PORTFOLIO = {
  parks: 28,
  mw: 134,
  mwh: 496.50,
  containers: 138,
  districts: 5,
  orderDate: '2026-04-01',
  firstClientInvoiceDate: '2026-04-01',
  vatStartQuarter: 'Q2 2026',
  _meta: { source: 'Lighthief-EPC-Confirmed-Adders-v4-Feb2026.xlsx', date: '2026-02-20',
           note: 'April 1 start confirmed: no client invoice or payment before 1 Apr 2026. Clean Q1 VAT. Linyang production order may be placed earlier.' } as MetaInfo,
} as const;

// ─────────────────────────────────────────────
// FINANCIAL TOTALS
// ─────────────────────────────────────────────

export const FINANCIALS = {
  cifTotal: 48_443_684,
  cifAvgPerMWh: 97_570,

  physicalAdders: 4_200_000,
  emsScadaTotal: 2_200_000,

  installedCost: 54_763_066,
  installedCostAvgPerMWh: 110_300,

  clientRevenue: 61_391_195,
  clientRevenueAvgPerMWh: 123_650,

  netMargin: 6_628_129,
  netMarginPct: 10.80,
  netMarginRounded: 10.8,

  importDutyRate: 2.66,
  importDutyTotal: 2_286_640.47,

  vatRate: 19,

  _meta: { source: 'Lighthief-EPC-Confirmed-Adders-v4-Feb2026.xlsx + Spanercom 2×5/20 revision', date: '2026-03-24' } as MetaInfo,
} as const;

// ─────────────────────────────────────────────
// EPC ADDER COST STACK (per-item)
// ─────────────────────────────────────────────

export const ADDERS = {
  importDuty:         { total: 2_286_640.47, status: 'confirmed' as DataStatus, rate: '2.66% of CIF (weighted HS codes)' },
  portLanding:        { total: 161_895.00,   status: 'quoted' as DataStatus,    rate: '€600 per 40HC container', supplier: 'ECTL' },
  customsClearance:   { total: 4_335.00,     status: 'quoted' as DataStatus,    rate: '€85 per declaration', supplier: 'Interfreight' },
  craneTransport:     { total: 350_000.00,   status: 'confirmed' as DataStatus,  rate: '€2,500 per container (flat rate, all routes, all container types)', supplier: 'A. Soulis',
                        fleet: { trucks20ft: 6, capacity20ft: '43 tonnes', trucks40ft: 'TBC', cranes: ['Liebherr LTM1095', 'Liebherr LTM1100', 'Demag AC100', 'Demag AC160', 'Liebherr LTM1200', 'Demag AC250'] },
                        proposedCrane: '160T (Demag AC160)', craneFootprint: '10 m outrigger spread',
                        portStorage: '10 days', permitLeadTime: '15 days', permitValidity: '30 days',
                        portClearancePayment: '10 working days before vessel arrival',
                        insurance: { goodsInTransit: 440_000, publicLiability: 5_000_000, dualCoverage: true, note: '€440K goods-in-transit per incident (A. Soulis policy) + €5M public liability (A. Soulis policy). Dual coverage: subcontractor (Soulis) carries own GIT + PL, Lighthief also covers under Marsh inland transit (€2M/shipment) + Lighthief PL (€10M aggregate). Max single container CIF ~€338K — €440K adequate. Upgrade to €500K available for €1,500 if required.' },
                        additionalCharges: { weekendHoliday: '50% surcharge', waitingTime: '€500/hr (after 2 hrs)', craneMobilisation: '€3,000 per additional mobilisation' },
                        volumeDiscount: 'N/A — no discount offered',
                        openItems: ['Precision positioning (±50mm) — Soulis flagged as potential additional cost', 'Levelling/shimming — Soulis flagged as potential additional cost', 'Payment terms — to be discussed', 'Cancellation terms — to be discussed', 'Confirm Linyang ISO lifting attachment points'],
                        references: ['COL Group: 20 transformers 10-20MVA (2024-25), 19 transformers 40MVA (2026-27) for EAC', 'APR Energy: 160 containerised generators at Moni station', 'Vestas Med Cyprus: 75 wind components at Kelia Wind Farm (up to 82m special transport)'],
                      },
  dehnLpsSpdEarthing: { total: 446_384.61,   status: 'quoted' as DataStatus,    supplier: 'DEHN + StrikeRA' },
  dehnInstallLabour:  { total: 81_600.00,    status: 'confirmed' as DataStatus, rate: '€1,600 per park', supplier: 'StrikeRA' },
  civilWorks:         { total: 1_763_560.00, status: 'confirmed' as DataStatus, rate: '€2,000 per MWh', supplier: 'Lighthief subcontractors' },
  insurance:          { total: 644_729.40,   status: 'pending' as DataStatus, rate: '0.75% of CIF budget', note: 'EPC construction insurance (CAR/EAR, TPL, PI). Marine cargo NOT needed — Linyang CIF. Budget: 0.75% of CIF. Marsh (Aris Samaras, 20 Mar 2026): approached CHUBB, AXIS, GARD, AGCS (all A-rated). AXIS + GARD rough non-binding indications only — CAR 0.24–0.29% of sum insured (+tax); DSU 0.34–0.36% of sum insured (+tax). Deductibles: EQ 2% VARTOL; other Nat CAT incl theft 5% min €50K; thermal runaway €150K–€200K; DSU waiting period 30 days (45 for thermal runaway & EQ); other losses €50K. CHUBB/AGCS pending. Linyang AXA CGL — Absolute Pollution / PFL / Cyber gaps; env liability strategy unchanged.' },
  docsCompliance:     { total: 357_000.00,   status: 'estimated' as DataStatus, rate: '€7,000 per park' },
  lvCabling:          { total: 363_300.00,   status: 'estimated' as DataStatus },
  mvCabling:          { total: 245_000.00,   status: 'estimated' as DataStatus, rate: '€3,500 per MV feeder' },
  mvTerminations:     { total: 154_000.00,   status: 'estimated' as DataStatus, rate: '€2,200 per MV feeder' },
  protectionEng:      { total: 275_000.00,   status: 'estimated' as DataStatus, rate: '€5K (≤3 cnt) / €6K (≥4 cnt)' },
  remoteTripScada:    { total: 153_000.00,   status: 'estimated' as DataStatus, rate: '€3,000 per park' },
  upsAuxiliary:       { total: 102_000.00,   status: 'estimated' as DataStatus, rate: '€2,000 per park' },

  // EMS / SCADA (Voltus)
  voltusEms:       { total: 2_298_609.00, status: 'quoted' as DataStatus, supplier: 'Voltus' },
  scadaLocal:      { total: 1_275_000.00, status: 'quoted' as DataStatus, supplier: 'Voltus', note: '€15K basic (≤8 MWh) / €30K advanced (≥10 MWh)' },
  scadaGlobal:     { total: 420_008.00,   status: 'quoted' as DataStatus, supplier: 'Voltus', note: '€60K per group (3 groups) + standalone' },

  _meta: { source: 'Lighthief-EPC-Confirmed-Adders-v4-Feb2026.xlsx', date: '2026-02-20' } as MetaInfo,
} as const;

// ─────────────────────────────────────────────
// EXCLUDED / CLIENT-PAID ITEMS
// ─────────────────────────────────────────────

export const CLIENT_PAID = {
  protectionTesting: { rate: '€1,250 per container', estimated: 313_750, status: 'client-paid' as DataStatus, note: 'Per Dino confirmation Feb 2026' },
  electricalDrawings: { rate: '€5,000–€15,000 per site', status: 'client-paid' as DataStatus, note: 'Licensed engineer drawings for EAC/building permit' },
  externalLps:       { status: 'client-paid' as DataStatus, note: 'DEHN quoted per site, coordinated by Lighthief' },
  vat:               { rate: '19% of EPC price', status: 'client-paid' as DataStatus },
} as const;

// ─────────────────────────────────────────────
// GROUP BREAKDOWN
// ─────────────────────────────────────────────

interface GroupData {
  name: string;
  key: string;
  parks: number;
  mw: number;
  mwh: number;
  cif: number;
  installedCost: number;
  revenue: number;
  margin: number;
  marginPct: number;
}

// ABIO Power REMOVED Mar 2026 — chose another supplier (CATL at €124K/MWh flat)
export const GROUPS: GroupData[] = [
  { name: 'Esperia Energy', key: 'esperia', parks: 11, mw: 79.5, mwh: 315.50, cif: 28_802_957.61, installedCost: 32_218_768.88, revenue: 36_412_811.96, margin: 4_194_043.09, marginPct: 11.52 },
  { name: 'Timotheos Timotheou', key: 'timotheos', parks: 9, mw: 25.5, mwh: 81.00, cif: 8_994_033.00, installedCost: 10_408_394.01, revenue: 11_818_919.17, margin: 1_410_525.16, marginPct: 11.93 },
  { name: 'A. Kerasi', key: 'kerasi', parks: 3, mw: 6.5, mwh: 20.00, cif: 2_283_660.00, installedCost: 2_841_296.88, revenue: 3_061_369.92, margin: 220_073.03, marginPct: 7.19 },
  { name: 'Lampros Andreadis', key: 'lampros', parks: 2, mw: 4.8, mwh: 15.00, cif: 1_593_785.00, installedCost: 1_923_085.24, revenue: 2_117_419.61, margin: 194_334.36, marginPct: 9.18 },
  { name: 'Ioannis Karis', key: 'karis', parks: 1, mw: 7.7, mwh: 25.00, cif: 2_523_652.00, installedCost: 2_819_401.34, revenue: 3_220_674.61, margin: 401_273.27, marginPct: 12.46 },
  { name: 'Spanercom (Anarita)', key: 'spanercom', parks: 2, mw: 10.0, mwh: 40.00, cif: 4_245_597.00, installedCost: 4_552_264.00, revenue: 4_760_000.00, margin: 207_736.00, marginPct: 4.37 },
];

// ─────────────────────────────────────────────
// BATCH SCHEDULE (Revised 6 March 2026)
// Previous 3-batch plan (27 Feb 2026 RFIs) was aspirational.
// Rebuilt from confirmed commitments only.
// Old plan: B1=15/280, B2=19/230, B3=12/288 (all unconfirmed)
// ─────────────────────────────────────────────

export type BatchStatus = 'confirmed' | 'pipeline' | 'unplaced';

export const BATCHES = [
  {
    id: 1, name: 'Batch 1: Confirmed',
    status: 'confirmed' as BatchStatus,
    groups: ['Galascope (2 parks)', 'Timotheos (3 parks)', 'Lampros (2 parks)', 'Spanercom (2 parks)'],
    parks: 9, mw: 33.8, mwh: 120.0, containers: 34,
    cif: 12_177_400, installed: 13_868_100, revenue: 15_067_200, margin: 1_199_100, marginPct: 7.96,
    productionStart: '2026-04-01', productionEnd: '2026-06-30',
    fatDate: '2026-06-30', shipDate: '2026-07-01',
    cifDate: '2026-08-20', pacDate: '2026-12-31',
    _meta: { source: 'Dino/Timotheos verbal, Lampros confirmed, Spanercom Anarita 2×5/20 @ €119k/MWh. ABIO removed Mar 2026.', date: '2026-03-24' } as MetaInfo,
  },
  {
    id: 2, name: 'Batch 2: Pipeline',
    status: 'pipeline' as BatchStatus,
    groups: ['Soteria (committed to sign)', 'Esperia core (TBC)'],
    parks: 0, mwh: 0, containers: 0,
    productionStart: '', productionEnd: '',
    shipDate: '',
    cifDate: '', pacDate: '',
    _meta: { source: 'Early signals only — Soteria committed but no system details', date: '2026-03-06' } as MetaInfo,
  },
  {
    id: 3, name: 'Batch 3: Unplaced',
    status: 'unplaced' as BatchStatus,
    groups: ['ELESTORE (5/200MWh)', 'Esperia remaining', 'A. Kerasi (3/20MWh)', 'Ioannis Karis (1/25MWh)', 'Timotheos remaining (6/46MWh)'],
    parks: 0, mwh: 0, containers: 0,
    productionStart: '', productionEnd: '',
    shipDate: '',
    cifDate: '', pacDate: '',
    _meta: { source: 'No RFI responses returned, no drawings, no contracts signed', date: '2026-03-06' } as MetaInfo,
  },
] as const;

export const BATCH1_PARKS = [
  { name: 'Galascope 1',      group: 'Galascope',  mw: 5.0,  mwh: 20,    containers: 6,  district: 'Famagusta', revenue: 2_258_900 },
  { name: 'Galascope 2',      group: 'Galascope',  mw: 2.5,  mwh: 10,    containers: 3,  district: 'Famagusta', revenue: 1_206_300 },
  { name: 'AGM Sunfield 1',   group: 'Timotheos',  mw: 5.0,  mwh: 15,    containers: 5,  district: 'Nicosia',   revenue: 1_961_880 },
  { name: 'L&T Sun Energy',   group: 'Timotheos',  mw: 5.0,  mwh: 15,    containers: 5,  district: 'Limassol',  revenue: 1_961_880 },
  { name: 'TBC (5 MWh park)', group: 'Timotheos',  mw: 1.5,  mwh: 5,     containers: 2,  district: 'TBC',       revenue: 800_000 },
  { name: 'Solar Breeze',     group: 'Lampros',    mw: 1.51, mwh: 5,     containers: 2,  district: 'Limassol',  revenue: 795_443 },
  { name: 'Solar Garden',     group: 'Lampros',    mw: 3.29, mwh: 10,    containers: 3,  district: 'Limassol',  revenue: 1_321_976 },
  { name: 'Anarita 1',        group: 'Spanercom',  mw: 5.0,  mwh: 20,    containers: 4,  district: 'Paphos',    revenue: 2_380_000 },
  { name: 'Anarita 2',        group: 'Spanercom',  mw: 5.0,  mwh: 20,    containers: 4,  district: 'Paphos',    revenue: 2_380_000 },
] as const;

export const ESP_2028 = {
  name: 'Esperia Tseri (2028)',
  parks: 5, mw: 27.5, mwh: 87.5,
  note: 'Separate future order — not in current timeline',
} as const;

// ─────────────────────────────────────────────
// GROUP ORDER REMAINING (post-ABIO removal)
// Total order value with Lighthief after ABIO chose CATL supplier
// ─────────────────────────────────────────────

export const GROUP_ORDER_REMAINING = {
  clientRevenue: 61_391_195,
  cifTotal: 48_443_684,
  installedCost: 54_763_066,
  netMargin: 6_628_129,
  netMarginPct: 10.80,
  parks: 28,
  mwh: 496.50,
  _meta: { source: 'portfolio-data.ts', date: '2026-03-24', note: 'ABIO removed Mar 2026; Spanercom 2×5/20 Mar 2026' } as MetaInfo,
} as const;

// ─────────────────────────────────────────────
// EXPECTED COMMISSION (30% of net margin model)
// Commission = 30% × net margin. Batch 1 commission paid pro-rata with client payments.
// ─────────────────────────────────────────────

export const EXPECTED_COMMISSION = {
  totalPortfolio: 1_988_439,   // 30% of net margin (~€6.63M)
  batch1: 359_730,             // 30% of Batch 1 margin (~€1.20M)
  ratePct: 30,
  basis: '30% of net margin per milestone',
  _meta: { source: 'commission-cashflow-model-feb2026', date: '2026-03-24', note: 'Recomputed after Spanercom 2×5/20' } as MetaInfo,
} as const;

export const FAC_DATE = '2027-03-31';

// ─────────────────────────────────────────────
// VAT REFUND PROCEDURE (Q3 return — urgent)
// Confirmed with VAT reporting office Limassol (Sofia). Refund assumed ~40 days after claim.
// ─────────────────────────────────────────────

export const VAT_REFUND_PROCEDURE = {
  claimDate: '2026-10-02',
  action: 'Upload Q3 VAT return (Jul–Sep) with supporting documents, requesting urgent refund',
  notes: 'VAT office Limassol confirmed rush processing from 1 Oct; assume refund ~40 days after claim (mid-Nov).',
  _meta: { source: 'Sofia, VAT reporting office Limassol', date: '2026-03' } as MetaInfo,
} as const;

// ─────────────────────────────────────────────
// PAYMENT TERMS
// ─────────────────────────────────────────────

export const PAYMENT_TERMS = {
  client: {
    advance:     { pct: 30, trigger: 'On or after 1 April 2026 (no invoice/payment before April 1 — clean Q1 VAT)' },
    preShipment: { pct: 55, trigger: 'Equipment ready, factory inspection passed' },
    pac:         { pct: 10, trigger: 'System commissioned & grid-connected' },
    retention:   { pct: 5,  trigger: 'Released after 24-month DLP' },
  },
  linyang: {
    advance:     { pct: 20, trigger: 'On or after 1 April (final confirmed Mar 2026)' },
    preShipment: { pct: 50, trigger: 'Ready to ship (Ex-Works, within 3 days of FAT + photo evidence)' },
    dap:         { pct: 20, trigger: 'Delivery at Place (CIF Limassol port arrival)' },
    sat:         { pct: 10, trigger: 'Site Acceptance Test / PAC completion' },
  },
  voltus: {
    advance:     { pct: 50, trigger: 'Order date' },
    preDelivery: { pct: 20, trigger: 'Pre-delivery' },
    acceptance:  { pct: 30, trigger: 'Acceptance' },
  },
} as const;

// ─────────────────────────────────────────────
// WARRANTY & LTSA
// ─────────────────────────────────────────────

// COMMERCIAL STRUCTURE:
// - LTSA (O&M):       Client → Lighthief.  Lighthief keeps 100%. Only Lighthief's
//                      own operating costs (field team, spares, vehicles) are deducted.
// - Extended Warranty: Client → Linyang DIRECTLY. NOT a Lighthief cost or revenue item.
//                      Lighthief may facilitate/coordinate but does not handle the funds.
// - Base Warranty:     Included in Linyang CIF price (Years 1–5). No additional cost.

export const WARRANTY = {
  baseYears: 5,
  maxExtendedYears: 15,
  cycleLife: 7000,
  cycleLifeDoD: '70% EOL',

  sohGuarantees: {
    year5: 85,
    year10: 79.58,
    year15: 70,
  },

  // Extended warranty: paid by CLIENT directly to Linyang — not a Lighthief P&L item
  extendedYr6to10: {
    bessPerMWh: 913.92,
    pcsPerMWh: 747.76,
    totalPerMWh: 1_661.68,
    paidBy: 'client' as const,
    paidTo: 'Linyang' as const,
    status: 'confirmed' as DataStatus,
  },
  extendedYr11to15: {
    bessPerMWh: 1_157.62,
    pcsPerMWh: 926.10,
    totalPerMWh: 2_083.72,
    paidBy: 'client' as const,
    paidTo: 'Linyang' as const,
    status: 'confirmed' as DataStatus,
    note: 'V1 conflict (€4,182.25) superseded by V3 confirmed pricing',
  },
  extendedYr16to20: {
    bessPerMWh: 3_858.75,
    pcsPerMWh: 2_315.25,
    totalPerMWh: 6_174.00,
    paidBy: 'client' as const,
    paidTo: 'Linyang' as const,
    status: 'quoted' as DataStatus,
  },

  upfrontSparesAlternative: {
    ratePerMWh: { min: 1_000, max: 1_250 },
    note: 'One-time upfront purchase, alternative to Yr 11-15 warranty',
    status: 'confirmed' as DataStatus,
  },

  _meta: { source: 'RFI V3 Linyang', date: '2026-02-15', rfiDoc: 'rfi-linyang-final-feb2026' } as MetaInfo,
} as const;

// LTSA = Lighthief's O&M service agreement. Revenue is retained by Lighthief in full.
// Only Lighthief operating costs (field engineers, spares, SCADA, vehicles) are deducted.
// Extended warranty is a SEPARATE arrangement: client pays Linyang directly.
export const LTSA = {
  tierC: {
    ratePerMWh: 1_740,
    bessMaintenancePerMWh: 815.72,
    pcsMvsMaintenancePerMWh: 924.28,
    duration: 15,
    availabilityTarget: 97,
    maintenanceAllowanceDays: 10,
    maintenanceAllowanceHours: 240,
    plannedMaintenanceDays: 8,
    provider: 'Lighthief Cyprus Ltd',
    fieldEngineers: 6,
    revenueRetainedBy: 'Lighthief' as const,
    status: 'confirmed' as DataStatus,
  },
  sla: {
    critical: { remoteHours: 4, onSiteHours: 8, resolutionHours: 48, coverage: '24/7/365', creditPerHour: 100, creditCap: 1_000 },
    major:    { remoteHours: 8, onSiteHours: 48, resolutionHours: 120, coverage: '24/7/365', creditPerHour: 50, creditCap: 500 },
    minor:    { remoteHours: 48, onSite: 'Next scheduled visit or 5 business days', coverage: 'Business hours (Mon–Fri 08:00–17:00)' },
    quarterlyCreditCap: '10% of quarterly Service Fee',
  },
  availabilityLD: {
    ratePerDayPerMWh: 30,
    status: 'confirmed' as DataStatus,
  },
  _meta: { source: 'confirmed-client-pricing-feb2026.md + ClientLTSA.md §8.2', date: '2026-02-20' } as MetaInfo,
} as const;

// ─────────────────────────────────────────────
// O&M OPEX MODEL (Recurring, Steady-State Annual)
// Source: opex-plan-2026.md + real-world overestimates
// All costs are fully loaded (incl. social insurance,
// accommodation, employer contributions).
// ─────────────────────────────────────────────

export const OM_OPEX = {
  personnel: {
    fieldEngineers:      { headcount: 6, monthlyLoaded: 4_500, annual: 324_000, note: '5 minimum + 1 buffer for leave/growth. €4,500 = €3,000 gross + €900 accommodation + €600 social' },
    driverLogistics:     { headcount: 1, monthlyLoaded: 2_200, annual:  26_400, note: 'Warehouse ops, equipment transport, forklift, deliveries' },
    omBackOffice:        { headcount: 1, monthlyLoaded: 2_500, annual:  30_000, note: 'Work orders, CMMS, client reporting, spare parts procurement' },
    omManager:           { headcount: 1, monthlyLoaded: 3_500, annual:  21_000, note: '50% allocation to O&M (balance is sales/project management)', allocation: 0.5 },
  },
  personnelTotal: 401_400,

  fleet: {
    serviceVans:         { count: 4, monthlyPerUnit: 1_235, annual: 59_280, note: '3 shift vehicles + 1 logistics. Lease + insurance + fuel + maintenance' },
    forklift:            { count: 1, monthlyPerUnit:   980, annual: 11_760, note: 'Rented. Battery module handling, warehouse ops' },
  },
  fleetTotal: 71_040,

  premises: {
    warehouse:           { annual: 48_000, note: 'Ypsonas warehouse €8,000/mo gross. 7Sun funds 50% (€4,000/mo). Lighthief net: €4,000/mo. Upfront: 2 deposits + 1 month = €24,000.' },
  },
  premisesTotal: 48_000,

  operations: {
    scadaGlobalMaint:    { annual: 34_000, note: '3 groups × Voltus annual maintenance' },
    sparesParts:         { annual: 60_000, note: 'Critical BESS/PCS/MV spares. Increases ~20% after Year 5 as fleet ages' },
    toolsConsumables:    { annual: 12_000, note: 'PPE, calibration, minor replacement parts' },
    itMonitoringCmms:    { annual: 10_000, note: 'SCADA access, CMMS software, mobile data, cloud' },
    insuranceCompliance: { annual: 10_000, note: 'Employer liability, PI, equipment cover, ETEK renewal, H&S' },
    trainingAnnual:      { annual:  5_000, note: 'Linyang refresher, local H&S, HV safety recert' },
    travelMisc:          { annual:  6_000, note: 'Inter-district travel, overnight stays, office supplies' },
  },
  operationsTotal: 137_000,

  sevenSunFunded: {
    warehouseContribution: { annual: 48_000, note: '7Sun pays 50% of €8,000/mo warehouse rent (€4,000/mo)' },
    andreasChristoforou:   { annual: 30_000, note: 'Energy & BESS Consultant salary funded by 7Sun — not a Lighthief OPEX item' },
  },

  subtotal: 657_440,
  contingencyRate: 0.10,
  contingency: 65_744,
  total: 723_184,
  totalRounded: 724_000,

  assumptions: [
    '6 field engineers (1 buffer over 5-minimum workload model)',
    '2 engineers per HV maintenance visit (safety requirement)',
    'Fully loaded engineer cost = €4,500/mo (incl. accommodation, social insurance)',
    '10 planned maintenance days per park per year',
    '80–150 reactive calls per year across 28 parks',
    'Warehouse: Ypsonas €8,000/mo gross, 7Sun funds 50% (€4,000/mo net to Lighthief)',
    '4 service vehicles (3 shift + 1 logistics/driver)',
    '10% contingency on all recurring OPEX',
    'Extended warranty is client-paid directly to Linyang (no P&L impact)',
    'Spare parts budget increases ~20% after Year 5 as fleet ages',
    'Andreas Christoforou (Energy & BESS Consultant) salary funded by 7Sun — excluded from Lighthief OPEX',
    'Warehouse upfront: 2 deposits (€16,000) + 1 month advance (€8,000) = €24,000 on signing',
  ],

  _meta: { source: 'opex-plan-2026.md + warehouse-rental-proposal-8000-mar2026', date: '2026-03-16' } as MetaInfo,
} as const;

// ─────────────────────────────────────────────
// CYPRUS TAX & SOCIAL INSURANCE (2026 Reform)
// Enacted: 22 Dec 2025, effective 1 Jan 2026
// ─────────────────────────────────────────────

export const CYPRUS_TAX = {
  corporateTax: 15,   // Increased from 12.5% → 15% on 1 Jan 2026 (OECD Pillar II alignment)
  vatStandard: 19,
  vatReduced: [9, 5, 3],

  stampDuty: 0,       // Fully abolished 1 Jan 2026

  dividendSdc: 5,     // SDC on dividends for CY-resident individuals (reduced from 17%)
  dividendWhtTreaty: 0,   // WHT on dividends to treaty / EU recipients
  dividendWhtLowTax: 5,   // WHT if recipient in jurisdiction with <7.5% tax
  dividendWhtBlacklist: 17, // WHT if recipient in EU non-cooperative jurisdiction

  deemedDividend: false,    // DDD abolished for profits earned from 2026 onwards
  lossCarryForwardYears: 7, // Extended from 5 to 7 years

  ipBoxEffectiveRate: 3,    // ~3% effective (80% deduction on qualifying IP income at 15% CIT)

  socialInsurance: {
    employee: 8.8,
    employer: 8.8,
    socialCohesionFund: 2.0,    // Employer-only, uncapped
    redundancyFund: 1.2,        // Employer-only
    industrialTrainingFund: 0.5, // Employer-only
    totalEmployer: 12.5,        // 8.8 + 2.0 + 1.2 + 0.5
    totalEmployee: 8.8,
    maxInsurableEarnings: 68_904, // Annual cap (€5,742/month)
    selfEmployed: 16.6,
  },

  gesyHealthcare: {
    employee: 2.65,
    employer: 2.90,
    selfEmployed: 4.0,
    pensioner: 2.65,
    cap: 180_000,     // Annual earnings cap
  },

  totalEmployerBurden: 15.4,  // SI (12.5%) + GeSY (2.9%) ≈ 15.4% of gross salary

  _meta: {
    source: 'Cyprus Tax Reform 2026 (Parliament approved 22 Dec 2025, published 31 Dec 2025)',
    date: '2026-01-01',
    note: 'CIT 12.5%→15%, stamp duty abolished, SDC dividends 17%→5%, DDD abolished, loss c/f 5→7yr',
  } as MetaInfo,
} as const;

// ─────────────────────────────────────────────
// OEM EQUIPMENT SPECS
// ─────────────────────────────────────────────

export const OEM = {
  manufacturer: 'Linyang Energy',
  distributor: 'Lighthief Cyprus Ltd (exclusive)',
  pcsModels: [
    { model: 'BCS1000K-C-HUD', mw: 1.00, status: 'confirmed' as DataStatus, note: 'C-series 1.0 MW — in production' },
    { model: 'BCS1250K-C-HUD', mw: 1.25, status: 'confirmed' as DataStatus, note: 'C-series 1.25 MW — in production, most common in Cyprus portfolio' },
    { model: 'BCS1500K-C-HUD', mw: 1.50, status: 'pending' as DataStatus, note: 'C-series 1.5 MW — upcoming, expected late 2026' },
  ],
  pcs: 'Kehua BCS1000K-C-HUD / BCS1250K-C-HUD / BCS1500K-C-HUD',
  skidModels: [
    { model: 'T1', container: '20ft Std', pcsSlots: 1, maxMw: 1.50 },
    { model: 'T2', container: '20ft Std', pcsSlots: 2, maxMw: 3.00 },
    { model: 'T4', container: '40ft HC',  pcsSlots: 4, maxMw: 6.00 },
    { model: 'T8', container: '40ft HC',  pcsSlots: 8, maxMw: 12.00 },
  ],
  cells: 'EVE (LFP)',
  containerCapacity: 5.015,
  rte: 86.32, // Full system AC-AC round trip incl. cabling. Linyang PCS-level calc = 87.8% (excludes cabling losses).
  gridCodeCert: 'EN 50549-2 (TÜV cert D 115067 0077)',
  incoterms: 'CIF Limassol',
  productionLeadDays: 90,
  shippingDays: 50,
} as const;

// ─────────────────────────────────────────────
// COMPANY DATA (subset — full in lib/constants.ts)
// ─────────────────────────────────────────────

export const COMPANY = {
  name: 'Lighthief Cyprus Ltd',
  legalName: 'LIGHTHIEF CYPRUS LTD',
  regNumber: 'HE 477423',
  tin: '60187188Q',
  address: '28 October Ave 249, Lophitis Business Center 1, Office 201, 3035 Limassol, Cyprus',
  email: 'office@lighthief.com',
  phone: '+357 77 77 00 50',
  website: 'https://solarfarms.cy',
  cyprusDirector: 'Alexander Papacosta',
  /** Director higher education — confirm level (BA/BSc/MSc) on diploma; wording per CV/LinkedIn */
  cyprusDirectorEducation:
    'Business Development & Entrepreneurship — Halmstad University (Högskolan i Halmstad), Sweden',
  directorPhone: '+357 99 164 158',
  bessProjectContact: 'Alexander Papacosta',
  bessProjectPhone: '+357 99 164 158',
  bessProjectEmail: 'alexander.papacosta@lighthief.com',
} as const;

// ─────────────────────────────────────────────
// CLIENT PRICING (per MWh, all-in turnkey)
// ─────────────────────────────────────────────

export const CLIENT_PRICING = {
  '5MW_20MWh':   { ratePerMWh: 112_945, status: 'confirmed' as DataStatus },
  '5MW_15MWh':   { ratePerMWh: 130_792, status: 'confirmed' as DataStatus },
  '5MW_10MWh':   { ratePerMWh: 136_106, status: 'confirmed' as DataStatus },
  '2.5MW_10MWh': { ratePerMWh: 120_630, status: 'confirmed' as DataStatus },
  '3.5MW_15MWh':  { ratePerMWh: 131_000, status: 'confirmed' as DataStatus, note: 'Same hardware as 3.75MW/15MWh (3×1.25MW PCS, T2+T1 skids, 3×5MWh) — PCS derated to 3.5MW at grid connection, no cost difference. Scandinavian Solar Parks (Group7) Mar 2026.' },
  '3.75MW_15MWh': { ratePerMWh: 131_000, status: 'confirmed' as DataStatus, note: 'Scandinavian Solar Parks (Group7) Mar 2026 — same hardware as 3.5MW/15MWh, full PCS rating.' },
  '8MW_60MWh':   { ratePerMWh: 100_052, status: 'confirmed' as DataStatus },
  '12MW_40MWh':  { ratePerMWh: 114_990, status: 'confirmed' as DataStatus },
  '25MW_100MWh': { ratePerMWh: 106_279, status: 'confirmed' as DataStatus },
  _meta: { source: 'confirmed-client-pricing-feb2026.md + Group7 Scandinavian Solar', date: '2026-03-24' } as MetaInfo,
} as const;

// ─────────────────────────────────────────────
// CIF SOURCE VERIFICATION
// ─────────────────────────────────────────────

export const CIF_SOURCES = {
  jan2026: { ref: 'LY202601271', parks: 40, amount: 74_314_218.00 },
  feb2026: { ref: 'LY202602111', parks: 11, amount: 11_649_708.00 },
  total: 85_963_925.47,
  _meta: { source: 'CIF Verification sheet, v4 Excel', date: '2026-02-16' } as MetaInfo,
} as const;

// ─────────────────────────────────────────────
// RFI STATUS TRACKER
// Tracks which data points are confirmed vs pending
// ─────────────────────────────────────────────

export const RFI_STATUS = {
  cifPricing:           { status: 'confirmed' as DataStatus, version: 'V3',  date: '2026-02-11', doc: 'Quotation - Linyang ESS 202602111.xlsx' },
  extWarrantyYr6to10:   { status: 'confirmed' as DataStatus, version: 'V3',  date: '2026-02-15', doc: 'rfi-linyang-final-feb2026' },
  extWarrantyYr11to15:  { status: 'confirmed' as DataStatus, version: 'V3',  date: '2026-02-15', doc: 'rfi-linyang-final-feb2026', note: 'V1 conflict resolved' },
  sohGuarantees:        { status: 'confirmed' as DataStatus, version: 'V3',  date: '2026-02-15', doc: 'rfi-linyang-final-feb2026' },
  gridCodeCert:         { status: 'confirmed' as DataStatus, version: 'V1',  date: '2026-02-10', doc: 'TÜV cert D 115067 0077' },
  voltusEmsPricing:     { status: 'confirmed' as DataStatus, version: 'V2',  date: '2026-02-16', doc: 'rfi-voltus-ems-update-feb2026' },
  civilWorksPricing:    { status: 'confirmed' as DataStatus, version: 'V1',  date: '2026-02-13', doc: 'civil-works-estimate.md' },
  dehnPricing:          { status: 'quoted' as DataStatus,    version: 'V1',  date: '2026-01-28', doc: 'rfq-dehn-lightning-protection-jan2026' },
  transportPricing:     { status: 'confirmed' as DataStatus,  version: 'V3',  date: '2026-03-17', doc: 'docs/quotations/asoulis/A Soulis Proposal .pdf', note: '€2,500/container flat rate (all routes, all types). 160T crane proposed (10m footprint). Fleet: 6 trucks + 6 cranes. Port: 10 days storage. Permits: 15 days lead, 30 days valid. Insurance: €440K GIT (adequate — max container CIF ~€338K), €5M PL. Open: positioning/levelling may be extra, payment & cancellation terms TBC.' },
  insurancePricing:     { status: 'pending' as DataStatus,   version: 'NBI-rough' as const,  date: '2026-03-20', doc: 'email-marsh-aris-samaras-20mar2026', note: 'Marsh rough NBI (AXIS+GARD consolidated, 20 Mar 2026): CAR 0.24–0.29% SI + tax; DSU 0.34–0.36% SI + tax. EQ ded 2% VARTOL; Nat CAT/theft 5% min €50K; thermal runaway €150K–€200K; DSU 30d (45d TR/EQ); other €50K. CHUBB/AGCS still out. Budget adder still €644,729 (0.75% CIF) until firm quotes. Holland NBI €350K ex marine; €10M/site CAR inadequate vs €50M need.' },
  performanceBond:      { status: 'confirmed' as DataStatus,  version: 'V1',  date: '2026-02-10', doc: 'linyang-blended-sales-ltsa', note: '5% bank guarantee (corporate), no parent company backing. Agreed per Linyang RFI.' },
  linyangAxaInsurance:  { status: 'confirmed' as DataStatus,  version: 'V1',  date: '2026-03-09', doc: 'legal/in-negotiation/linyang-sales/linyang-axa-product-liability-policy-mar2026.pdf', note: 'AXA Tianping CGL policy received 9 Mar 2026. 36 pages — policy terms + endorsements only. MISSING: declarations page (named insured, limits €5M, territory, period, product schedule). KEY EXCLUSIONS: Absolute Pollution, Pure Financial Loss, Pure Indirect Third-Party Financial Loss, Silicon, Professional, Cyber/Network, Terrorism, Sanctions (PRC/EU/UK/US), PFAS, Nuclear, Asbestos, Lead. Insured Products clause limits coverage to products listed in schedule (not provided). Mandatory Safety Standards clause requires product compliance with destination country standards. ACTION: Request declarations page + product schedule from Linyang.' },
  mvSkidDatasheets:     { status: 'confirmed' as DataStatus,  version: 'V2',  date: '2026-02-22', doc: 'docs/hardware/PCS+SKID+Transformer', note: 'All 4 skid models received: T1, T2, T4, T8. PCS units are 1.00MW or 1.25MW; all park MW sizes are combinations of skids + PCS count. MV transformer range: 1000–10000 kVA (docs/hardware/mv-transformers/).' },
} as const;

// ─────────────────────────────────────────────
// STALE VALUE PATTERNS (for validation script)
// Maps old/wrong values to their correct replacements
// ─────────────────────────────────────────────

export const STALE_VALUES: Array<{ pattern: string; regex: RegExp; correct: string; context: string }> = [
  { pattern: '863.5 MWh',  regex: /863\.5\s*MWh/g,                correct: `${PORTFOLIO.mwh} MWh`,          context: 'Portfolio MWh' },
  { pattern: '863.5',      regex: /\b863\.5\b/g,                  correct: `${PORTFOLIO.mwh}`,               context: 'Portfolio MWh (standalone)' },
  { pattern: '47 parks',   regex: /\b47\s+parks?\b/gi,            correct: `${PORTFOLIO.parks} parks`,       context: 'Portfolio park count' },
  { pattern: '47 Parks',   regex: /\b47\s+Parks?\b/g,             correct: `${PORTFOLIO.parks} Parks`,       context: 'Portfolio park count' },
  { pattern: '47 Projects',regex: /\b47\s+Projects?\b/g,          correct: `${PORTFOLIO.parks} Projects`,    context: 'Portfolio project count' },
  { pattern: '46 parks',   regex: /\b46\s+parks?\b/gi,            correct: `${PORTFOLIO.parks} parks`,       context: 'Old park count' },
  { pattern: '41 parks',   regex: /\b41\s+parks?\b/gi,            correct: `${PORTFOLIO.parks} parks`,       context: 'Old park count (pre-ABIO Feb RFP)' },
  { pattern: '41 Parks',   regex: /\b41\s+Parks?\b/g,             correct: `${PORTFOLIO.parks} Parks`,       context: 'Old park count (pre-ABIO Feb RFP)' },
  { pattern: '739 MWh',    regex: /\b739\s*MWh/g,                 correct: `${PORTFOLIO.mwh} MWh`,           context: 'Old MWh (pre-ABIO Feb RFP)' },
  { pattern: '756 MWh',    regex: /\b756\s*MWh/g,                 correct: `${PORTFOLIO.mwh} MWh`,           context: 'Old MWh (intermediate estimate)' },
  { pattern: '€84.7M',     regex: /€84\.7M/g,                     correct: '€86.0M',                         context: 'CIF total' },
  { pattern: '€84,693',    regex: /€84,693/g,                     correct: '€85,964',                        context: 'CIF total (thousands)' },
  { pattern: '7.7%',       regex: /\b7\.7\s*%/g,                  correct: `${FINANCIALS.netMarginRounded}%`, context: 'Net margin (old)' },
  { pattern: '€8.37M',     regex: /€8\.37M/g,                     correct: '€11.64M',                        context: 'Net margin amount (old)' },
  { pattern: '€100.9M',    regex: /€100\.9M/g,                    correct: '€97.6M',                         context: 'Installed cost (old)' },
  { pattern: '€95.5M',     regex: /€95\.5M/g,                     correct: '€97.6M',                         context: 'Installed cost (old v2)' },
  { pattern: '€107.96M',   regex: /€107\.96M/g,                   correct: '€109.2M',                        context: 'Revenue (old)' },
  { pattern: '€12.42M',    regex: /€12\.42M/g,                    correct: '€11.64M',                        context: 'Margin (old)' },
  { pattern: '€12,420',    regex: /€12,420/g,                     correct: '€11,641',                        context: 'Margin thousands (old)' },
  { pattern: '€4,182',     regex: /€4,182/g,                      correct: '€2,084',                         context: 'Yr 11-15 warranty (V1 error)' },
];

// ─────────────────────────────────────────────
// HISTORICAL DOCUMENT PATHS (skip during validation)
// ─────────────────────────────────────────────

export const HISTORICAL_PATHS = [
  'docs/quotations/rfi/',
  'docs/quotations/rfp/',
  'docs/quotations/rfq/',
  'docs/quotations/dehn/',
  'docs/quotations/interfreight/',
  'docs/quotations/linyang/',
  'docs/quotations/voltus/',
  'docs/quotations/asoulis/',
  'docs/quotations/abio-request/',
  'docs/internal/rfi/',
  'docs/internal/rfp/',
  'docs/internal/rfq/',
  'docs/internal/meetings/',
  'docs/internal/proposals/group-order/clients/client-proposal-cyprus-bess-jan2026.html',
  'docs/internal/proposals/group-order/clients/client-proposal-group-epc-jan2026.html',
  'docs/internal/proposals/group-order/clients/confirmed-client-pricing-feb2026.md',
  'docs/internal/linyang-quotation-jan2026.md',
  'docs/internal/logistics-cost-comparison-jan2026.md',
  'docs/internal/ltsa-updated-rates-jan2026.md',
  'docs/linyang.md',
  'docs/hardware/',
  'legal/Documents/',
  'legal/linyang-sales-comments.html',
  'legal/DOCUMENT_INDEX.md',
  'legal/introducer-agreement-moiostrov-voltus.html',
] as const;

// ─────────────────────────────────────────────
// TEMPLATE VARIABLE MAP
// Flat map of all {{VARIABLE}} placeholders used in templates
// ─────────────────────────────────────────────

function fmtDate(iso: string): string {
  if (!iso) return 'TBC';
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d.getTime())) return 'TBC';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function getTemplateVars(): Record<string, string> {
  return {
    'PORTFOLIO.parks':       String(PORTFOLIO.parks),
    'PORTFOLIO.mw':          String(PORTFOLIO.mw),
    'PORTFOLIO.mwh':         String(PORTFOLIO.mwh),
    'PORTFOLIO.mwhRounded':  String(Math.round(PORTFOLIO.mwh)),
    'PORTFOLIO.containers':  String(PORTFOLIO.containers),
    'PORTFOLIO.districts':   String(PORTFOLIO.districts),
    'PORTFOLIO.orderDate':   PORTFOLIO.orderDate,
    'PORTFOLIO.firstClientInvoiceDate': PORTFOLIO.firstClientInvoiceDate,
    'PORTFOLIO.firstClientInvoiceDateFmt': fmtDate(PORTFOLIO.firstClientInvoiceDate),
    'PORTFOLIO.vatStartQuarter': PORTFOLIO.vatStartQuarter,

    'FINANCIALS.cifTotal':               FINANCIALS.cifTotal.toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    'FINANCIALS.cifTotalM':              `€${(FINANCIALS.cifTotal / 1e6).toFixed(1)}M`,
    'FINANCIALS.cifTotalK':              String(Math.round(FINANCIALS.cifTotal / 1000)),
    'FINANCIALS.cifAvgPerMWh':           FINANCIALS.cifAvgPerMWh.toLocaleString('en-IE'),
    'FINANCIALS.installedCost':          FINANCIALS.installedCost.toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    'FINANCIALS.installedCostM':         `€${(FINANCIALS.installedCost / 1e6).toFixed(1)}M`,
    'FINANCIALS.clientRevenue':          FINANCIALS.clientRevenue.toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    'FINANCIALS.clientRevenueM':         `€${(FINANCIALS.clientRevenue / 1e6).toFixed(1)}M`,
    'FINANCIALS.clientRevenueK':         String(Math.round(FINANCIALS.clientRevenue / 1000)),
    'FINANCIALS.netMargin':              FINANCIALS.netMargin.toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    'FINANCIALS.netMarginM':             `€${(FINANCIALS.netMargin / 1e6).toFixed(2)}M`,
    'FINANCIALS.netMarginK':             String(Math.round(FINANCIALS.netMargin / 1000)),
    'FINANCIALS.netMarginPct':           String(FINANCIALS.netMarginRounded),
    'FINANCIALS.importDutyRate':         String(FINANCIALS.importDutyRate),
    'FINANCIALS.physicalAdders':         FINANCIALS.physicalAdders.toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    'FINANCIALS.physicalAddersM':        `€${(FINANCIALS.physicalAdders / 1e6).toFixed(1)}M`,
    'FINANCIALS.physicalAddersK':        String(Math.round(FINANCIALS.physicalAdders / 1000)),
    'FINANCIALS.emsScadaTotal':          FINANCIALS.emsScadaTotal.toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    'FINANCIALS.emsScadaM':              `€${(FINANCIALS.emsScadaTotal / 1e6).toFixed(1)}M`,
    'FINANCIALS.emsScadaK':              String(Math.round(FINANCIALS.emsScadaTotal / 1000)),
    'FINANCIALS.vatRate':                String(FINANCIALS.vatRate),

    'WARRANTY.baseYears':                   String(WARRANTY.baseYears),
    'WARRANTY.maxExtendedYears':            String(WARRANTY.maxExtendedYears),
    'WARRANTY.cycleLife':                   String(WARRANTY.cycleLife),
    'WARRANTY.sohGuarantees.year5':         String(WARRANTY.sohGuarantees.year5),
    'WARRANTY.sohGuarantees.year10':        String(WARRANTY.sohGuarantees.year10),
    'WARRANTY.sohGuarantees.year15':        String(WARRANTY.sohGuarantees.year15),
    'WARRANTY.extendedYr6to10.totalPerMWh': WARRANTY.extendedYr6to10.totalPerMWh.toLocaleString('en-IE', { minimumFractionDigits: 2 }),
    'WARRANTY.extendedYr6to10.bessPerMWh':  WARRANTY.extendedYr6to10.bessPerMWh.toLocaleString('en-IE', { minimumFractionDigits: 2 }),
    'WARRANTY.extendedYr6to10.pcsPerMWh':   WARRANTY.extendedYr6to10.pcsPerMWh.toLocaleString('en-IE', { minimumFractionDigits: 2 }),
    'WARRANTY.extendedYr11to15.totalPerMWh': WARRANTY.extendedYr11to15.totalPerMWh.toLocaleString('en-IE', { minimumFractionDigits: 2 }),
    'WARRANTY.extendedYr11to15.bessPerMWh': WARRANTY.extendedYr11to15.bessPerMWh.toLocaleString('en-IE', { minimumFractionDigits: 2 }),
    'WARRANTY.extendedYr11to15.pcsPerMWh':  WARRANTY.extendedYr11to15.pcsPerMWh.toLocaleString('en-IE', { minimumFractionDigits: 2 }),

    'LTSA.tierC.ratePerMWh':          LTSA.tierC.ratePerMWh.toLocaleString('en-IE'),
    'LTSA.tierC.availabilityTarget':   String(LTSA.tierC.availabilityTarget),
    'LTSA.tierC.maintenanceAllowanceDays': String(LTSA.tierC.maintenanceAllowanceDays),
    'LTSA.tierC.fieldEngineers':       String(LTSA.tierC.fieldEngineers),
    'LTSA.sla.critical.remoteHours':   String(LTSA.sla.critical.remoteHours),
    'LTSA.sla.critical.onSiteHours':   String(LTSA.sla.critical.onSiteHours),
    'LTSA.sla.critical.resolutionHours': String(LTSA.sla.critical.resolutionHours),
    'LTSA.sla.major.remoteHours':      String(LTSA.sla.major.remoteHours),
    'LTSA.sla.major.onSiteHours':      String(LTSA.sla.major.onSiteHours),
    'LTSA.sla.major.resolutionHours':  String(LTSA.sla.major.resolutionHours),
    'LTSA.availabilityLD.ratePerDayPerMWh': String(LTSA.availabilityLD.ratePerDayPerMWh),

    'PAYMENT.client.advance':     String(PAYMENT_TERMS.client.advance.pct),
    'PAYMENT.client.preShipment': String(PAYMENT_TERMS.client.preShipment.pct),
    'PAYMENT.client.pac':         String(PAYMENT_TERMS.client.pac.pct),
    'PAYMENT.client.retention':   String(PAYMENT_TERMS.client.retention.pct),
    'PAYMENT.linyang.advance':    String(PAYMENT_TERMS.linyang.advance.pct),
    'PAYMENT.linyang.preShipment':String(PAYMENT_TERMS.linyang.preShipment.pct),
    'PAYMENT.linyang.dap':        String(PAYMENT_TERMS.linyang.dap.pct),
    'PAYMENT.linyang.sat':        String(PAYMENT_TERMS.linyang.sat.pct),
    'BATCH1.linyangFinal10K':    String(Math.round(0.1 * BATCHES[0].cif / 1000)),

    'OEM.manufacturer':        OEM.manufacturer,
    'OEM.pcs':                 OEM.pcs,
    'OEM.containerCapacity':   String(OEM.containerCapacity),
    'OEM.rte':                 String(OEM.rte),
    'OEM.gridCodeCert':        OEM.gridCodeCert,
    'OEM.incoterms':           OEM.incoterms,

    'CYPRUS_TAX.corporateTax':        String(CYPRUS_TAX.corporateTax),
    'CYPRUS_TAX.vatStandard':         String(CYPRUS_TAX.vatStandard),
    'CYPRUS_TAX.stampDuty':           String(CYPRUS_TAX.stampDuty),
    'CYPRUS_TAX.dividendSdc':         String(CYPRUS_TAX.dividendSdc),
    'CYPRUS_TAX.dividendWhtTreaty':   String(CYPRUS_TAX.dividendWhtTreaty),
    'CYPRUS_TAX.lossCarryForwardYears': String(CYPRUS_TAX.lossCarryForwardYears),
    'CYPRUS_TAX.ipBoxEffectiveRate':  String(CYPRUS_TAX.ipBoxEffectiveRate),
    'CYPRUS_TAX.totalEmployerBurden': String(CYPRUS_TAX.totalEmployerBurden),
    'CYPRUS_TAX.socialInsurance.employee': String(CYPRUS_TAX.socialInsurance.employee),
    'CYPRUS_TAX.socialInsurance.employer': String(CYPRUS_TAX.socialInsurance.totalEmployer),
    'CYPRUS_TAX.gesyHealthcare.employee': String(CYPRUS_TAX.gesyHealthcare.employee),
    'CYPRUS_TAX.gesyHealthcare.employer': String(CYPRUS_TAX.gesyHealthcare.employer),

    'COMPANY.name':            COMPANY.name,
    'COMPANY.legalName':       COMPANY.legalName,
    'COMPANY.address':         COMPANY.address,
    'COMPANY.email':           COMPANY.email,
    'COMPANY.phone':           COMPANY.phone,
    'COMPANY.cyprusDirector':  COMPANY.cyprusDirector,
    'COMPANY.cyprusDirectorEducation': COMPANY.cyprusDirectorEducation,
    'COMPANY.directorPhone':   COMPANY.directorPhone,
    'COMPANY.bessProjectContact': COMPANY.bessProjectContact,
    'COMPANY.bessProjectPhone': COMPANY.bessProjectPhone,
    'COMPANY.bessProjectEmail': COMPANY.bessProjectEmail,

    'BATCH1.parks': String(BATCHES[0].parks),
    'BATCH1.mw':    String(BATCHES[0].mw),
    'BATCH1.mwh':   String(BATCHES[0].mwh),
    'BATCH1.containers': String(BATCHES[0].containers),
    'BATCH1.status': BATCHES[0].status,
    'BATCH1.revenue': BATCHES[0].revenue.toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    'BATCH1.revenueM': `€${(BATCHES[0].revenue / 1e6).toFixed(1)}M`,
    'BATCH1.revenueK': String(Math.round(BATCHES[0].revenue / 1000)),
    'BATCH1.cif':    BATCHES[0].cif.toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    'BATCH1.cifM':   `€${(BATCHES[0].cif / 1e6).toFixed(1)}M`,
    'BATCH1.margin': BATCHES[0].margin.toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    'BATCH1.marginPct': String(BATCHES[0].marginPct),
    'BATCH1.cifDate': BATCHES[0].cifDate,
    'BATCH1.cifDateFmt': fmtDate(BATCHES[0].cifDate),
    'BATCH1.pacDate': BATCHES[0].pacDate,
    'BATCH1.pacDateFmt': fmtDate(BATCHES[0].pacDate),
    // Batch 1 cashflow: first payment 1 April, VAT-aligned (Q2 2026)
    'BATCH1.firstPaymentDate': PORTFOLIO.firstClientInvoiceDate,
    'BATCH1.firstPaymentDateFmt': fmtDate(PORTFOLIO.firstClientInvoiceDate),
    'BATCH1.vatQuarterFirst': PORTFOLIO.vatStartQuarter,
    'BATCH1.clientAdvance30': Math.round(0.3 * BATCHES[0].revenue).toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    'BATCH1.clientAdvance30K': String(Math.round(0.3 * BATCHES[0].revenue / 1000)),
    'BATCH1.linyangAdvance20': Math.round(0.2 * BATCHES[0].cif).toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    'BATCH1.linyangAdvance20K': String(Math.round(0.2 * BATCHES[0].cif / 1000)),
    'BATCH1.linyangRequestNote': `20% advance €${(0.2 * BATCHES[0].cif / 1e6).toFixed(2)}M due on or after ${fmtDate(PORTFOLIO.firstClientInvoiceDate)} (Linyang final confirmed 20/50/20/10) to align with client receipt and VAT quarter.`,
    'GROUP_ORDER.clientRevenue': GROUP_ORDER_REMAINING.clientRevenue.toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    'GROUP_ORDER.clientRevenueM': `€${(GROUP_ORDER_REMAINING.clientRevenue / 1e6).toFixed(1)}M`,
    'GROUP_ORDER.cifTotal': GROUP_ORDER_REMAINING.cifTotal.toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    'GROUP_ORDER.cifM': `${(GROUP_ORDER_REMAINING.cifTotal / 1e6).toFixed(1)}M`,
    'GROUP_ORDER.netMargin': GROUP_ORDER_REMAINING.netMargin.toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    'GROUP_ORDER.netMarginM': `€${(GROUP_ORDER_REMAINING.netMargin / 1e6).toFixed(2)}M`,
    'GROUP_ORDER.parks': String(GROUP_ORDER_REMAINING.parks),
    'GROUP_ORDER.mwh': String(GROUP_ORDER_REMAINING.mwh),
    'COMMISSION.totalPortfolio': EXPECTED_COMMISSION.totalPortfolio.toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    'COMMISSION.totalPortfolioK': String(Math.round(EXPECTED_COMMISSION.totalPortfolio / 1000)),
    'COMMISSION.batch1': EXPECTED_COMMISSION.batch1.toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    'COMMISSION.batch1K': String(Math.round(EXPECTED_COMMISSION.batch1 / 1000)),
    // Batch 1 civil works (concrete platforms + trenches): €2,000/MWh (ADDERS.civilWorks), due by June. All costs ex-VAT; subcons charge VAT — input VAT offsets output VAT (e.g. advance) in same quarter.
    'BATCH1.civilWorks': Math.round(BATCHES[0].mwh * 2000).toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    'BATCH1.civilWorksDue': 'By June 2026',
    'BATCH1.civilWorksVatK': String(Math.round((BATCHES[0].mwh * 2000 * (FINANCIALS.vatRate / 100)) / 1000)),
    'BATCH1.civilWorksVat': Math.round(BATCHES[0].mwh * 2000 * (FINANCIALS.vatRate / 100)).toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    // VAT refund urgent procedure (confirmed with VAT office Limassol — Sofia): upload return + supporting docs, request urgent refund
    'VAT_REFUND.claimDate': VAT_REFUND_PROCEDURE.claimDate,
    'VAT_REFUND.claimDateFmt': fmtDate(VAT_REFUND_PROCEDURE.claimDate),
    'VAT_REFUND.action': VAT_REFUND_PROCEDURE.action,
    'VAT_REFUND.notes': VAT_REFUND_PROCEDURE.notes,
    'BATCH2.parks': String(BATCHES[1].parks),
    'BATCH2.mwh':   String(BATCHES[1].mwh),
    'BATCH2.status': BATCHES[1].status,
    'BATCH2.cifDate': BATCHES[1].cifDate || 'TBC',
    'BATCH2.cifDateFmt': fmtDate(BATCHES[1].cifDate),
    'BATCH2.pacDate': BATCHES[1].pacDate || 'TBC',
    'BATCH2.pacDateFmt': fmtDate(BATCHES[1].pacDate),
    'BATCH3.parks': String(BATCHES[2].parks),
    'BATCH3.mwh':   String(BATCHES[2].mwh),
    'BATCH3.status': BATCHES[2].status,
    'BATCH3.cifDate': BATCHES[2].cifDate || 'TBC',
    'BATCH3.cifDateFmt': fmtDate(BATCHES[2].cifDate),
    'BATCH3.pacDate': BATCHES[2].pacDate || 'TBC',
    'BATCH3.pacDateFmt': fmtDate(BATCHES[2].pacDate),
    'FAC_DATE':      FAC_DATE,
  };
}

/** Public RTB ticket (Agios) — marketing, teaser, xlsx defaults; see module for _meta.source */
export { AGIOS_THEODOROS_RTB } from './deals/agios-theodoros-rtb';
