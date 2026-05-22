// ===================================================================
// BESS CYPRUS PORTFOLIO — SINGLE SOURCE OF TRUTH
// All documents MUST reference this file for portfolio data.
// When an RFI response or updated quotation arrives, update HERE ONLY
// then run: npm run docs:generate && npm run docs:validate
//
// Last updated: 18 May 2026
// Source: Lighthief-EPC-Confirmed-Adders-v4-Feb2026.xlsx + Disperon SHA v5
// ABIO REMOVED: Chose another supplier (CATL at €124K/MWh flat). Mar 2026.
// Spanercom (Anarita 2×5/20, €119k/MWh client offer) — high probability.
// Galascope resized: G1 15→20 MWh (CIF €1,848,712), G2 8→10 MWh (CIF €974,457).
//   CIF sourced from same-config park quotations (LY202601271 Jan 2026).
// Aeolian Dynamics added: 6.5 MW / 20 MWh wind hybrid, Larnaca. Final offer €2,660,000.
// EMS/SCADA: corrected to Disperon v3 pricing — flat €15K SCADA Local ALL parks (not tiered).
//   SCADA Global €60K first park per group. Annual maintenance: €3K/park + €12K/group.
//   Total 28-park upfront EMS/SCADA: €2,158,730.
// SIGNING STATUS: Esperia (incl. Galascope) — full contract package sent to Dino; awaiting client legal review.
// LINYANG: Sales Contract (17 Mar 2026 baseline) — fully executed (both parties). See RFI_STATUS.linyangSalesContract.
// ===================================================================

import { getFeasibilityTemplateVars } from './pv-feasibility-packages';

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
  parks: 29,        // 28 group-order parks + 1 Aeolian standalone
  mw: 141,          // 134 group order + 6.5 Aeolian
  mwh: 516.50,      // 496.5 group order + 20 Aeolian
  containers: 144,  // 138 group order + 6 Aeolian (4 BESS + 2 MV skids)
  districts: 5,
  orderDate: '2026-04-01',
  firstClientInvoiceDate: '2026-04-01',
  vatStartQuarter: 'Q2 2026',
  // SIGNING STATUS (10 May 2026):
  // CONFIRMED:       Esperia Energy (incl. Galascope) — package emailed to Dino; awaiting review / signature
  // HIGH (80-90%):   Spanercom (Anarita), Aeolian Dynamics (wind hybrid)
  // PENDING (50%):   Timotheos Timotheou, Lampros Andreadis
  // UNCONFIRMED:     A. Kerasi, Ioannis Karis
  _meta: { source: 'Lighthief-EPC-Confirmed-Adders-v4-Feb2026.xlsx + May 2026 signing updates', date: '2026-05-10',
           note: 'Galascope resized (G1 20MWh, G2 10MWh). Aeolian added. Esperia/Galascope v5.1 pack emailed to Dino — awaiting client legal review. Spanercom/Aeolian high; Timotheos/Lampros 50%.' } as MetaInfo,
} as const;

// ─────────────────────────────────────────────
// FINANCIAL TOTALS
// ─────────────────────────────────────────────

export const FINANCIALS = {
  // GROUP ORDER (28 parks, post-ABIO, Galascope + Spanercom CIF corrected):
  cifTotal: 48_255_355,       // Corrected: Galascope +€359,844 AND Spanercom -€548,173 → net -€188,329 vs prior
  cifAvgPerMWh: 97_185,       // 48,255,355 / 496.5 MWh

  physicalAdders: 4_200_000,  // Budget estimate; ADDERS.* totals are stale 51-park figures — see notes
  emsScadaTotal: 2_158_730,   // Corrected: Disperon v3 pricing, 28 parks, flat €15K SCADA Local all parks

  installedCost: 54_614_085,  // cifTotal + physicalAdders + emsScadaTotal (group order only)
  installedCostAvgPerMWh: 110_000,

  clientRevenue: 61_370_295,  // Galascope 1 negotiated rate €111,900/MWh (10 May 2026): -€20,900
  clientRevenueAvgPerMWh: 123_607,

  netMargin: 6_756_210,       // Revenue − installedCost. -€20,900 vs prior (Galascope 1 negotiation)
  netMarginPct: 11.01,
  netMarginRounded: 11.0,

  // STANDALONE (Aeolian Dynamics — not in group order):
  aeolianRevenue: 2_660_000,
  aeolianCif: 1_951_711,      // CIF LY202601271 (6.5 MW / 20 MWh = same as Esperia Famagusta)
  aeolianMargin: 402_083,     // Revenue €2,660,000 − installed ~€2,257,917 (see AEOLIAN constant)

  importDutyRate: 2.66,
  importDutyTotal: 2_298_174, // 2.66% × 48,803,528 (corrected cifTotal)

  vatRate: 19,

  _meta: { source: 'v4 Excel + Galascope CIF correction (LY202601271) + Disperon v3 EMS pricing', date: '2026-05-08',
           note: 'ADDERS section totals are STALE (51-park figures from Feb 2026 Excel). Use FINANCIALS totals for current 28-park portfolio. Aeolian tracked separately.' } as MetaInfo,
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
  // Joha Cable — per-park quoted supply (DC/LV/MV cable material). v4 Excel column "LV MV DC AC Cables (joha)".
  // 29 active parks ≈ €223,660 total (not split LV/MV in quote — totals below are legacy split for reporting).
  johaCabling:        { total: 223_660.00,   status: 'quoted' as DataStatus, supplier: 'Joha Cable',
                        note: 'Per-park lump-sum from Joha quotation — use park-level figure in adders v5/v4, not €1,400×BESS formula. Galascope-scale parks ~€17,300 vs ~€9,100 formula.' },
  lvCabling:          { total: 363_300.00,   status: 'quoted' as DataStatus, supplier: 'Joha Cable',
                        note: 'STALE 51-park total. Joha quote is per-park combined (see johaCabling). Legacy model split: ~€1,400/BESS cnt.' },
  mvCabling:          { total: 245_000.00,   status: 'quoted' as DataStatus, supplier: 'Joha Cable', rate: 'Per Joha park quote (combined with LV in johaCabling)',
                        note: 'STALE 51-park total. Do not use €3,500/MV skid formula for margin — use johaCabling per-park total.' },
  mvTerminations:     { total: 154_000.00,   status: 'estimated' as DataStatus, rate: '€2,200 per MV feeder',
                        note: 'Terminations/joints — confirm if included in Joha quote or separate subcontractor.' },
  protectionEng:      { total: 275_000.00,   status: 'estimated' as DataStatus, rate: '€5K (≤3 cnt) / €6K (≥4 cnt)' },
  remoteTripComms:    { total: 153_000.00,   status: 'estimated' as DataStatus, rate: '€3,000 per park',
                        note: 'Physical RTU/modem hardware for DSO grid remote trip compliance. SEPARATE from Voltus SCADA monitoring platform — do not confuse.' },
  upsAuxiliary:       { total: 102_000.00,   status: 'estimated' as DataStatus, rate: '€2,000 per park',
                        note: 'Site-level UPS for protection relays and RTU. Linyang container has its own internal UPS (BAMS). This is the external site-level supply.' },

  // EMS / SCADA — Disperon brand (Lighthief EUBESS Ltd / Voltus JV)
  // Source: Voltus v3 pricing CSV (voltusv3pricing) — flat rates, container-count-based
  // SHA v5: Exhibit C rates BLANK — to be agreed within 14 days of execution (BLOCKER for project brief submission)
  // Upfront structure: EMS hardware+install (per container config) + SCADA Local €15K/park + SCADA Global €60K/first park per group
  // Annual recurring: SCADA Local maint €3K/park/yr + SCADA Global maint €12K/group/yr (= €180K/yr for 28 parks, 8 groups)
  // EMS Subscription (SHA §6.7): €400/MWh/yr charged to client; 20% to Voltus (€80/MWh/yr); Lighthief EUBESS retains 80% (€320/MWh/yr)
  // SCADA Local rate: FLAT €15,000/park ALL parks (v3 corrected — v2/v4-Excel tier of €30K for ≥10MWh was WRONG)
  // SCADA Global: €60,000 per client group (first park only; subsequent parks in same group = zero additional)
  // SCADA Global for margin: allocate proportionally by MWh within group for per-park internal calculations
  emsHardwareInstall: { total: 1_258_730,   status: 'quoted' as DataStatus, supplier: 'Voltus/Disperon',
                        note: 'EMS System + Hardware + Remote Config + On-site Install. 28 parks. Container-count-based from v3 pricing CSV.' },
  scadaLocal:         { total: 420_000,     status: 'quoted' as DataStatus, supplier: 'Voltus/Disperon',
                        rate: '€15,000/park flat (ALL parks — NOT tiered)', note: '28 parks × €15K = €420K. v4 Excel used €30K for ≥10MWh — CORRECTED. +€3K/park/yr maintenance.' },
  scadaGlobal:        { total: 480_000,     status: 'quoted' as DataStatus, supplier: 'Voltus/Disperon',
                        rate: '€60,000 per client group (first park only)', note: '8 groups × €60K = €480K. +€12K/group/yr maintenance. Allocate proportionally by MWh for per-park margins.' },
  // Legacy names kept for backwards compatibility:
  voltusEms:       { total: 2_298_609.00, status: 'superseded' as DataStatus, supplier: 'Voltus',
                     note: 'STALE — 51-park figure from v4 Excel. Use emsHardwareInstall + scadaLocal + scadaGlobal above.' },

  _meta: { source: 'Lighthief-EPC-Confirmed-Adders-v4-Feb2026.xlsx + Voltus v3 pricing CSV (voltusv3pricing) + Disperon SHA v5', date: '2026-05-08',
           note: 'WARNING: Most ADDERS totals are stale 51-park figures from v4 Excel (Feb 2026). Only craneTransport, emsHardwareInstall, scadaLocal, scadaGlobal have been corrected for the current 28-park portfolio. Use FINANCIALS.physicalAdders (€4.2M) and FINANCIALS.emsScadaTotal (€2,158,730) for portfolio totals.' } as MetaInfo,
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
  signingStatus: 'confirmed' | 'high' | 'pending' | 'unconfirmed';
  signingProbabilityPct: number;  // 100 = confirmed, 80 = high, 50 = pending, etc.
  signingNote?: string;
}

// ABIO Power REMOVED Mar 2026 — chose another supplier (CATL at €124K/MWh flat)
// Signing status updated 8 May 2026:
//   confirmed  = EPC being executed now
//   high       = ~80-90% probability, active negotiation
//   pending    = ~50% probability, part of group order discussion
//   unconfirmed= no active timeline
export const GROUPS: GroupData[] = [
  {
    name: 'Esperia Energy (incl. Galascope)', key: 'esperia',
    parks: 11, mw: 79.5, mwh: 315.50,
    // CIF corrected 8 May 2026: Galascope G1 €1,848,712 (was €1,592,018) + G2 €974,457 (was €871,308) → +€359,844
    cif: 29_162_802,
    installedCost: 32_574_613,  // prior installedCost + €359,844 CIF delta (approx; full recalc pending)
    revenue: 36_391_912,        // Galascope 1 negotiated 10 May 2026: -€20,900 (€2,258,900 → €2,238,000)
    margin: 3_817_299,          // revenue − installedCost (Galascope 1 price reduction)
    marginPct: 10.49,
    signingStatus: 'confirmed',
    signingProbabilityPct: 100,
    signingNote: 'Galascope Ltd — full EPC v5.1 + LTSA + EMS addendum + OEM DWU + updated pipeline LOI emailed to Dino (Esperia) 10 May 2026; awaiting client legal review. G1 €111,900/MWh; G2 €120,630/MWh.',
  },
  {
    name: 'Spanercom (Anarita)', key: 'spanercom',
    parks: 2, mw: 10.0, mwh: 40.00,
    // CIF CORRECTED 8 May 2026: Anarita 1 + 2 are each 5 MW / 20 MWh = identical config to
    // Esperia Famagusta 2 (LY202601271 Jan 2026). Old SSOT CIF €4,245,597 was a stale estimate
    // at €106/kWh. Correct CIF = 2 × €1,848,712 = €3,697,424 (€92.44/kWh, same as Famagusta 2).
    cif: 3_697_424,       // Corrected: 2 × €1,848,712 from LY202601271 (was €4,245,597 — overestimated by €548,173)
    installedCost: 4_170_754, // Corrected: CIF + phys (2×€158,222) + EMS (€97,897 + €37,897)
    revenue: 4_760_000,
    margin: 589_246,      // Corrected: €4,760,000 − €4,170,754 (was €207,736 — margin now 12.4%)
    marginPct: 12.38,
    signingStatus: 'high',
    signingProbabilityPct: 85,
    signingNote: 'Active negotiation. EPC to be sent. Margin corrected to 12.4% (old 4.37% was wrong CIF estimate). Same hardware as Galascope 1, higher client price €119K/MWh.',
  },
  {
    name: 'Timotheos Timotheou', key: 'timotheos',
    parks: 9, mw: 25.5, mwh: 81.00,
    cif: 8_994_033, installedCost: 10_408_394, revenue: 11_818_919, margin: 1_410_525, marginPct: 11.93,
    signingStatus: 'pending',
    signingProbabilityPct: 50,
    signingNote: 'Part of group order discussion. Verbal confirmation of intent. No signed EPC. 50% probability.',
  },
  {
    name: 'Lampros Andreadis', key: 'lampros',
    parks: 2, mw: 4.8, mwh: 15.00,
    cif: 1_593_785, installedCost: 1_923_085, revenue: 2_117_420, margin: 194_334, marginPct: 9.18,
    signingStatus: 'pending',
    signingProbabilityPct: 50,
    signingNote: 'Part of group order discussion. Verbal confirmation. No signed EPC. 50% probability.',
  },
  {
    name: 'A. Kerasi', key: 'kerasi',
    parks: 3, mw: 6.5, mwh: 20.00,
    cif: 2_283_660, installedCost: 2_841_297, revenue: 3_061_370, margin: 220_073, marginPct: 7.19,
    signingStatus: 'unconfirmed',
    signingProbabilityPct: 30,
    signingNote: 'No active timeline. Low margin (7.19%). Await Esperia/Timotheos signing before chasing.',
  },
  {
    name: 'Ioannis Karis', key: 'karis',
    parks: 1, mw: 7.7, mwh: 25.00,
    cif: 2_523_652, installedCost: 2_819_401, revenue: 3_220_675, margin: 401_273, marginPct: 12.46,
    signingStatus: 'unconfirmed',
    signingProbabilityPct: 30,
    signingNote: 'No active timeline. Good margin. Revisit after B1 committed.',
  },
];

// ─────────────────────────────────────────────
// BATCH SCHEDULE (Updated 10 May 2026)
// Restructured to reflect actual signing status:
// B1_ESPERIA: Galascope 1+2 (Esperia confirmed) — order on EPC signing
// B1_CONDITIONAL: Timotheos (3 parks) + Lampros (2 parks) + Spanercom (2 parks) — pending their EPC
// B2: Esperia main portfolio (Famagusta + Limassol + Frenaros) — pipeline Q3 2026
// B3: Remaining Esperia Tseri + conditional group order — pipeline 2027
// AEOLIAN: Standalone, independent timeline — high probability
// ─────────────────────────────────────────────

export type BatchStatus = 'confirmed' | 'pipeline' | 'conditional' | 'unplaced';

export const BATCHES = [
  {
    id: 1, name: 'Batch 1 — Esperia/Galascope (Confirmed)',
    status: 'confirmed' as BatchStatus,
    groups: ['Galascope (2 parks — Esperia confirmed)'],
    parks: 2, mw: 7.5, mwh: 30.0, containers: 8,
    // Galascope 1: 4 BESS + 1 MV = 5 units; Galascope 2: 2 BESS + 1 MV = 3 units
    cif: 2_823_169,       // G1 €1,848,712 + G2 €974,457 (CIF corrected 8 May 2026)
    installed: 3_193_707, // CIF + physical adders + EMS (proportional, Disperon v3 pricing)
    revenue: 3_444_300,   // G1 €2,238,000 (€111,900/MWh, negotiated 10 May 2026) + G2 €1,206,300
    margin: 250_593, marginPct: 7.28,
    productionStart: '2026-05-01', productionEnd: '2026-07-31',
    fatDate: '2026-07-31', shipDate: '2026-08-01',
    cifDate: '2026-09-15', pacDate: '2027-01-31',
    _meta: { source: 'Galascope package emailed to Dino 10 May 2026 — awaiting review. Galascope resized: G1 20MWh (€1,848,712 CIF), G2 10MWh (€974,457 CIF). EPC v5.1.', date: '2026-05-10' } as MetaInfo,
  },
  {
    id: 2, name: 'Batch 1 Extension — Conditional (50-85% probability)',
    status: 'conditional' as BatchStatus,
    groups: [
      'Timotheos Timotheou — 3 parks (35 MWh) — 50% probability',
      'Lampros Andreadis — 2 parks (15 MWh) — 50% probability',
      'Spanercom (Anarita) — 2 parks (40 MWh) — 85% probability',
    ],
    parks: 7, mw: 26.3, mwh: 90.0, containers: 26,
    cif: 9_354_231, installed: 10_674_393, revenue: 11_601_976,
    margin: 927_583, marginPct: 8.00,
    notes: 'Order to be placed when client EPCs are signed. Timeline mirrors B1 Esperia if signed May/Jun 2026.',
    productionStart: '2026-05-01', productionEnd: '2026-07-31',
    fatDate: '2026-07-31', shipDate: '2026-08-01',
    cifDate: '2026-09-15', pacDate: '2027-01-31',
    _meta: { source: 'Conditional on EPC signatures. Timotheos/Lampros verbal, Spanercom active negotiation.', date: '2026-05-08' } as MetaInfo,
  },
  {
    id: 3, name: 'Batch 2 — Esperia Main Portfolio (Pipeline Q3 2026)',
    status: 'pipeline' as BatchStatus,
    groups: [
      'Esperia Famagusta — 6.5 MW / 20 MWh',
      'Esperia Famagusta 2 — 5 MW / 20 MWh',
      'Esperia Limassol — 8 MW / 60 MWh',
      'Esperia Frenaros — 25 MW / 100 MWh',
    ],
    parks: 4, mw: 44.5, mwh: 200.0, containers: 0,
    revenue: 21_841_589, margin: 2_440_000, marginPct: 11.17,
    productionStart: '2026-09-01', productionEnd: '2026-11-30',
    fatDate: '2026-11-30', shipDate: '2026-12-01',
    cifDate: '2027-01-20', pacDate: '2027-05-31',
    _meta: { source: 'Esperia main parks per group-proposal.template.html. Timeline follows B1 Esperia signing.', date: '2026-05-08' } as MetaInfo,
  },
  {
    id: 4, name: 'Batch 3 — Esperia Tseri + Remaining Group Order (2027)',
    status: 'pipeline' as BatchStatus,
    groups: [
      'Esperia Tseri (5 parks — 87.5 MWh) — 2028 order',
      'Timotheos remaining (6 parks) — if signed',
      'A. Kerasi (3 parks) — if signed',
      'Ioannis Karis (1 park) — if signed',
    ],
    parks: 15, mw: 54.65, mwh: 237.5, containers: 0,
    revenue: 28_663_988, margin: 3_193_000, marginPct: 11.14,
    productionStart: '2027-06-01', productionEnd: '2027-09-30',
    fatDate: '2027-09-30', shipDate: '2027-10-01',
    cifDate: '2027-11-15', pacDate: '2028-03-31',
    _meta: { source: 'Esperia Tseri + remaining conditional clients. Dates estimated.', date: '2026-05-08' } as MetaInfo,
  },
] as const;

// CONFIRMED B1 parks (Esperia/Galascope — signing now)
export const BATCH1_PARKS_CONFIRMED = [
  {
    name: 'Galascope 1', group: 'Galascope', mw: 5.0, mwh: 20, containers: 5, district: 'Famagusta',
    // 5 units = 4 BESS (5.015 MWh each) + 1 T4 MV Skid (4×1.25 MW = 5 MW)
    cif: 1_848_712,         // CIF LY202601271 — same config as Esperia Famagusta 2 (5 MW/20 MWh)
    physAdders: 158_222,    // corrected (civil +€10K, duty +€6.8K, vs old 15 MWh)
    emsAllocated: 66_935,   // Disperon v3 proportional: €46,718 EMS + €15,000 SCADA Local + €5,217 SCADA Global (20/230 MWh share)
    installedCost: 2_073_869,
    revenue: 2_238_000,     // Negotiated 10 May 2026: €111,900/MWh × 20 MWh (was €112,945/MWh = €2,258,900)
    margin: 164_131, marginPct: 7.33,
  },
  {
    name: 'Galascope 2', group: 'Galascope', mw: 2.5, mwh: 10, containers: 3, district: 'Famagusta',
    // 3 units = 2 BESS + 1 T2 MV Skid (2×1.25 MW = 2.5 MW)
    cif: 974_457,           // CIF LY202601271 — same config as Dianary 1 (2.5 MW/10 MWh)
    physAdders: 96_030,     // corrected (civil +€4K, vs old 8 MWh)
    emsAllocated: 49_351,   // Disperon v3 proportional: €31,742 EMS + €15,000 SCADA Local + €2,609 SCADA Global (10/230 MWh share)
    installedCost: 1_119_838,
    revenue: 1_206_300,
    margin: 86_462, marginPct: 7.17,
  },
] as const;

// CONDITIONAL B1 parks (Timotheos, Lampros, Spanercom — pending EPC signature)
export const BATCH1_PARKS_CONDITIONAL = [
  { name: 'AGM Sunfield 1',   group: 'Timotheos',  mw: 5.0,  mwh: 15,  containers: 5,  district: 'Nicosia',   revenue: 1_961_880, signingProbabilityPct: 50 },
  { name: 'L&T Sun Energy',   group: 'Timotheos',  mw: 5.0,  mwh: 15,  containers: 5,  district: 'Limassol',  revenue: 1_961_880, signingProbabilityPct: 50 },
  { name: 'TBC (5 MWh park)', group: 'Timotheos',  mw: 1.5,  mwh: 5,   containers: 2,  district: 'TBC',       revenue: 800_000,   signingProbabilityPct: 50 },
  { name: 'Solar Breeze',     group: 'Lampros',    mw: 1.51, mwh: 5,   containers: 2,  district: 'Limassol',  revenue: 795_443,   signingProbabilityPct: 50 },
  { name: 'Solar Garden',     group: 'Lampros',    mw: 3.29, mwh: 10,  containers: 3,  district: 'Limassol',  revenue: 1_321_976, signingProbabilityPct: 50 },
  { name: 'Anarita 1',        group: 'Spanercom',  mw: 5.0,  mwh: 20,  containers: 5,  district: 'Paphos',    revenue: 2_380_000, signingProbabilityPct: 85 },
  { name: 'Anarita 2',        group: 'Spanercom',  mw: 5.0,  mwh: 20,  containers: 5,  district: 'Paphos',    revenue: 2_380_000, signingProbabilityPct: 85 },
] as const;

// Backwards-compat alias — full 9-park B1 (use when assuming all sign)
export const BATCH1_PARKS = [
  ...BATCH1_PARKS_CONFIRMED,
  ...BATCH1_PARKS_CONDITIONAL,
] as const;

export const ESP_2027 = {
  name: 'Esperia Green Energy Ltd (Famagusta) — Q3 2027',
  parks: 1, mw: 5.0, mwh: 20,
  revenue: 2_258_900, margin: 260_225, marginPct: 11.52,
  orderDate: 'Q3 2027', pacDate: '~Q2 2028',
  note: 'Standalone order between B3 and Tseri 2028. €112.94/kWh per group-proposal. Probability 99% — EPC V4 contract in final review.',
  _meta: { source: 'group-proposal.template.html — Esperia Famagusta 2 entry', date: '2026-04-17' },
} as const;

export const ESP_2028 = {
  name: 'Esperia Tseri (2028)',
  parks: 5, mw: 27.75, mwh: 87.5,
  revenue: 11_341_884, margin: 1_306_625, marginPct: 11.52,
  orderDate: '2028', pacDate: '~2029',
  note: 'Separate future order — individual Tseri parks. Probability 99% — EPC V4 contract in final review.',
  parks_detail: [
    { name: 'Esperia Energy (Tseri) Ltd',            mw: 7.00, mwh: 20.0, revenue: 2_559_071, margin: 294_805 },
    { name: 'Esperia Energy (Tseri 2) Ltd — 2.5 MW', mw: 2.50, mwh:  7.5, revenue: 1_159_991, margin: 133_671 },
    { name: 'Esperia Energy (Tseri 2) Ltd — 7.5 MW', mw: 7.50, mwh: 25.0, revenue: 3_169_128, margin: 365_083 },
    { name: 'Esperia Energy (Tseri 2) Ltd — 6 MW',   mw: 6.00, mwh: 20.0, revenue: 2_444_867, margin: 281_649 },
    { name: 'Esperia Energy (Tseri 3) Ltd',           mw: 4.75, mwh: 15.0, revenue: 2_008_827, margin: 231_417 },
  ],
  _meta: { source: 'group-proposal.template.html — Tseri pricing schedule', date: '2026-04-17' },
} as const;

export const ABIO_ELESTORE = {
  name: 'ABIO Power / ELESTORE (5 parks)',
  parks: 5, mw: 60, mwh: 200,
  status: 'pending-reengagement',
  probability: 20,
  note: 'ABIO indicated CATL supplier Mar 2026. Removed from active batches. Re-engagement ongoing — tracked separately at 20% probability.',
  _meta: { source: 'bess-portfolio-summary-excel.html; ABIO removed from B1 Mar 2026', date: '2026-04-17' },
} as const;

// ─────────────────────────────────────────────
// AEOLIAN DYNAMICS — STANDALONE CLIENT (High probability)
// 10.8 MW Wind Farm Hybrid, Agia Anna, Larnaca
// Tender: Θ.Α.ΛΕ.Ι.Α 2021-2027 (Just Transition Fund grant scheme)
// ─────────────────────────────────────────────
export const AEOLIAN = {
  name: 'TP Aeolian Dynamics — Agia Anna Wind Farm Hybrid',
  key: 'aeolian',
  location: 'Agia Anna, Larnaca',
  windFarmMw: 10.8,               // 6 × Vestas V100-1.8 MW turbines
  // BESS configuration (final offer 24 Mar 2026):
  parks: 1, mw: 6.5, mwh: 20,
  bessContainers: 4,              // 4 × 5.015 MWh battery containers
  mvSkids: 2,                     // T4 skid (5 MW) + T1 skid (1.25 MW) = 6.25 MW
  totalUnits: 6,
  district: 'Larnaca',
  // Pricing:
  revenue: 2_660_000,             // Final offer 24 Mar 2026 (ex VAT). Turnkey EPC.
  cif: 1_951_711,                 // CIF LY202601271 — same 6.5 MW / 20 MWh config as Esperia Famagusta
  physAdders: 177_000,            // Estimated: duty €51.9K + port €3.6K + crane €15K + civil €40K + electrical €28K + DEHN €17K + insurance €14.6K + docs €7K
  emsUpfront: 129_206,            // Disperon v3: 6 containers ~€54,206 EMS + €15,000 SCADA Local + €60,000 SCADA Global (new standalone group)
  installedCost: 2_257_917,
  margin: 402_083, marginPct: 15.12,
  // Signing:
  signingStatus: 'high' as const,
  signingProbabilityPct: 80,
  // Timeline:
  tenderDeadline: 'Q2 2026 (grant scheme)',
  orderDate: 'Q3 2026 (estimated on EPC signing)',
  pacDate: '~Q2 2027',
  // Special considerations:
  notes: [
    'Grant scheme participant (Θ.Α.ΛΕ.Ι.Α 2021-2027 Just Transition Fund) — tender compliance required.',
    'Army firing range access: Agia Anna site requires coordinated access windows with military authority.',
    'Wind + BESS export: EMS enforces combined export limit on 22 kV line to PSEUDAS S/S (5.17 km).',
    'Tender requirement: ≥5.4 MW BESS, ≥16.2 MWh at POC. Config: 6.25 MW / 20 MWh = compliant (+16% headroom).',
    'Year-10 capacity: 20 MWh × 80% SOH = 16.0 MWh (within tolerance of 16.2 MWh requirement).',
    'Standalone client — not part of group order. Separate EPC contract and LTSA.',
    'Aeolian counted separately from 28-park group order portfolio.',
    'Previous proposals on file: 5.4 MW/16.2 MWh (Mar), 6 MW/20 MWh (Mar), 6.5 MW/20 MWh final (24 Mar 2026).',
  ],
  _meta: { source: 'bess-aeolian-dynamics-final-offer-6.5mw-20mwh-24mar2026.html + technical-rfi-aeolian-dynamics-mar2026.md', date: '2026-03-24' },
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
    retention:   { pct: 5,  trigger: 'Released after 3-month DLP (post-PAC, no FAC)' },
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
  '5MW_20MWh':   { ratePerMWh: 111_900, status: 'confirmed' as DataStatus, note: 'Galascope final negotiated rate (€111,900/MWh) — Spanercom Anarita uses €119,000/MWh (separate confirmed pricing).' },
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
  /** Upstream OEM supply — Linyang Energy sales agreement (framework / Batch 1 anchor) */
  linyangSalesContract: {
    status: 'confirmed' as DataStatus,
    version: '17 Mar 2026',
    date: '2026-05-18',
    doc: 'legal/active/Linyang-sales-contract-17Mar-CLEAN-FOR-SIGNATURE.docx (executed)',
    note: 'Fully signed by Lighthief Cyprus Ltd and Linyang — replaces prior “awaiting Linyang” gate in internal risk snapshots. APG-before-advance and construction insurance CPs remain per EPC §10.9 / Sales Contract.',
  },
  cifPricing:           { status: 'confirmed' as DataStatus, version: 'V3',  date: '2026-02-11', doc: 'Quotation - Linyang ESS 202602111.xlsx' },
  extWarrantyYr6to10:   { status: 'confirmed' as DataStatus, version: 'V3',  date: '2026-02-15', doc: 'rfi-linyang-final-feb2026' },
  extWarrantyYr11to15:  { status: 'confirmed' as DataStatus, version: 'V3',  date: '2026-02-15', doc: 'rfi-linyang-final-feb2026', note: 'V1 conflict resolved' },
  sohGuarantees:        { status: 'confirmed' as DataStatus, version: 'V3',  date: '2026-02-15', doc: 'rfi-linyang-final-feb2026' },
  gridCodeCert:         { status: 'confirmed' as DataStatus, version: 'V1',  date: '2026-02-10', doc: 'TÜV cert D 115067 0077' },
  voltusEmsPricing:     { status: 'confirmed' as DataStatus, version: 'V2',  date: '2026-02-16', doc: 'rfi-voltus-ems-update-feb2026' },
  civilWorksPricing:    { status: 'confirmed' as DataStatus, version: 'V1',  date: '2026-02-13', doc: 'civil-works-estimate.md' },
  dehnPricing:          { status: 'quoted' as DataStatus,    version: 'V1',  date: '2026-01-28', doc: 'rfq-dehn-lightning-protection-jan2026' },
  johaCablingPricing:   { status: 'quoted' as DataStatus,    version: 'V1',  date: '2026-02-16', doc: 'Lighthief-EPC-Confirmed-Adders-v4-Feb2026.xlsx (column: LV MV DC AC Cables (joha))', note: 'Per-park cable supply quotes from Joha Cable. 29-park portfolio total ≈ €223,660. v5 generator script still uses €1,400/BESS + €3,500/MV formula until Joha column imported into generate-adders-v5.py.' },
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

    ...getFeasibilityTemplateVars(),
  };
}

/** Public RTB ticket (Agios) — marketing, teaser, xlsx defaults; see module for _meta.source */
export { AGIOS_THEODOROS_RTB, AGIOS_INVESTOR_PACK } from './deals/agios-theodoros-rtb';
