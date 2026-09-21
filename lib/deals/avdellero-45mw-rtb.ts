/**
 * Avdellero 45 MW Solar PV + BESS — Deal data (SSOT)
 * Source: KPMG Factsheet Apr 2024 (G.P. Rodik Services Ltd / K. Ellinas Energy Group)
 * Model date: Sep 2026
 *
 * Deal type: RTB/share acquisition or turn-key — all 11 sub-projects
 * Seller: G.P. Rodik Services Limited (SPV owner)
 * Contact (via KPMG): Christophoros Anayiotos — canayiotos@kpmg.com · +357 22 209292
 *
 * Status: ANALYSIS — no term sheet issued
 */

import { CYPRUS_TSOC_DAM_SAMPLE } from '../market/cyprus-tsoc-dam-sample';

// ─── SUB-PROJECTS ─────────────────────────────────────────────────────────────

export const AVDELLERO_SUB_PROJECTS = [
  { id: 1,  name: 'Avdellero 1',  type: 'Solar PV' as const, mw: 5.00, area_m2:  74630, landLeaseStatus: 'signed' as const,  bessContainers: 4, bessMwh: 20.060, bessSkid: 'T4',  bessGif: 1_848_712, bessGifSource: 'confirmed' as const, planningPermit: 'issued' as const },
  { id: 2,  name: 'Avdellero 2',  type: 'Agri-PV'  as const, mw: 3.30, area_m2:  46787, landLeaseStatus: 'pending' as const,  bessContainers: 3, bessMwh: 15.045, bessSkid: 'T4',  bessGif: 1_457_542, bessGifSource: 'derived'   as const, planningPermit: 'pending' as const },
  { id: 3,  name: 'Avdellero 3',  type: 'Agri-PV'  as const, mw: 4.90, area_m2:  62103, landLeaseStatus: 'pending' as const,  bessContainers: 4, bessMwh: 20.060, bessSkid: 'T4',  bessGif: 1_848_712, bessGifSource: 'confirmed' as const, planningPermit: 'pending' as const },
  { id: 4,  name: 'Avdellero 4',  type: 'Solar PV' as const, mw: 5.00, area_m2:  79777, landLeaseStatus: 'signed' as const,  bessContainers: 4, bessMwh: 20.060, bessSkid: 'T4',  bessGif: 1_848_712, bessGifSource: 'confirmed' as const, planningPermit: 'issued' as const },
  { id: 5,  name: 'Avdellero 5',  type: 'Solar PV' as const, mw: 4.91, area_m2:  66215, landLeaseStatus: 'signed' as const,  bessContainers: 4, bessMwh: 20.060, bessSkid: 'T4',  bessGif: 1_848_712, bessGifSource: 'confirmed' as const, planningPermit: 'issued' as const },
  { id: 6,  name: 'Avdellero 6',  type: 'Solar PV' as const, mw: 2.79, area_m2:  41865, landLeaseStatus: 'signed' as const,  bessContainers: 3, bessMwh: 15.045, bessSkid: 'T4',  bessGif: 1_457_542, bessGifSource: 'derived'   as const, planningPermit: 'issued' as const },
  { id: 7,  name: 'Avdellero 7',  type: 'Solar PV' as const, mw: 4.05, area_m2:  59081, landLeaseStatus: 'signed' as const,  bessContainers: 4, bessMwh: 20.060, bessSkid: 'T4',  bessGif: 1_848_712, bessGifSource: 'confirmed' as const, planningPermit: 'issued' as const },
  { id: 8,  name: 'Avdellero 8',  type: 'Agri-PV'  as const, mw: 2.90, area_m2:  59036, landLeaseStatus: 'pending' as const,  bessContainers: 3, bessMwh: 15.045, bessSkid: 'T4',  bessGif: 1_457_542, bessGifSource: 'derived'   as const, planningPermit: 'pending' as const },
  { id: 9,  name: 'Avdellero 9',  type: 'Solar PV' as const, mw: 4.78, area_m2:  76444, landLeaseStatus: 'signed' as const,  bessContainers: 4, bessMwh: 20.060, bessSkid: 'T4',  bessGif: 1_848_712, bessGifSource: 'confirmed' as const, planningPermit: 'issued' as const },
  { id: 10, name: 'Avdellero 10', type: 'Solar PV' as const, mw: 5.00, area_m2:  71085, landLeaseStatus: 'signed' as const,  bessContainers: 4, bessMwh: 20.060, bessSkid: 'T4',  bessGif: 1_848_712, bessGifSource: 'confirmed' as const, planningPermit: 'issued' as const },
  { id: 11, name: 'Avdellero 11', type: 'Agri-PV'  as const, mw: 2.60, area_m2:  38879, landLeaseStatus: 'pending' as const,  bessContainers: 2, bessMwh: 10.030, bessSkid: 'T2',  bessGif:   974_457, bessGifSource: 'confirmed' as const, planningPermit: 'pending' as const },
] as const;

// ─── TOTALS ───────────────────────────────────────────────────────────────────

export const AVDELLERO_TOTALS = {
  totalPvMw:        45.21,
  totalBessMwh:     195.585,
  totalBessUnits:   50,          // 39 BESS containers + 11 MV skids
  totalAreaM2:      675_902,
  landLeaseTerm:    33,          // years (government lease from 2023)
  landLeaseAnnualPv: 80_000,     // €/yr — signed
  landLeaseAnnualAgri: 40_000,   // €/yr — estimated (pending signature)
  solarPvMw:        31.5,        // 7 Solar PV sub-projects
  agriPvMw:         13.7,        // 4 Agri-PV sub-projects (planning pending)
  eacSubstationCost: 7_200_000,  // EAC builds — confirm if SPV or EAC cost
} as const;

// ─── CAPEX ────────────────────────────────────────────────────────────────────

export const AVDELLERO_CAPEX = {
  rtb:          { amount: 20_344_500, basis: '45.21 MW × €450,000/MW',           status: 'confirmed' as const },
  pvEpc:        { amount: 22_605_000, basis: '45,210 kWp × €0.50/Wp self-perform', status: 'estimated' as const },
  bessCif:      { amount: 18_288_067, basis: 'LY202601271 confirmed + 3 derived configs', status: 'quoted' as const },
  bessAdders:   { amount:  2_254_625, basis: '€11,528/MWh × 195.585 MWh (duty+port+crane+civil+EMS)', status: 'confirmed' as const },
  development:  { amount:    750_000, basis: 'Planning, design, legal',            status: 'estimated' as const },
  total:        64_242_192,
  eacSubstation:{ amount:  7_200_000, basis: 'EAC transmission substation — status TBC', status: 'pending' as const },
  totalWithSubstation: 71_442_192,
  _note: 'Confirm with K. Ellinas / KPMG whether EAC substation (€7.2M) sits in SPV CAPEX or is EAC infrastructure.',
} as const;

// ─── FINANCING ────────────────────────────────────────────────────────────────

export const AVDELLERO_FINANCING = {
  alphaBank: {
    principal:   32_267_000,
    rateBasis:   'Euribor 3M + 1.50%',
    euribor3m:   2.620,        // as of Sep 18, 2026
    margin:      1.500,
    allInRate:   4.120,        // %
    termYears:   15,
    annualPayment: 2_934_000,  // approximate annuity
    collateral:  '75% LTV on bankable EPC (PV + BESS)',
    source:      'Confirmed by Dino (Alpha Bank Cyprus) for RES projects',
  },
  equityPartner: {
    investment:    25_000_000,
    ssvShare:      25,         // %
    description:   'Partner provides €25M for 25% of SPV as "bonus equity" for anchor capital contribution',
    partnerIrrConservative: 4.5,  // %
    partnerIrrCurrent:      6.5,  // %
    paybackYrConservative:  18,
    paybackYrCurrent:       15,
  },
  yourEquity: {
    contribution: 6_975_192,
    spvShare:     75,          // %
    irrConservative: 200,      // % (>100%)
    irrCurrent:      200,      // % (>100%)
    paybackYrs:      1.27,     // years (current DAM)
  },
} as const;

// ─── REVENUE MODEL ────────────────────────────────────────────────────────────

export const AVDELLERO_REVENUE = {
  specificYieldKwhKwp: 1900,
  curtailmentPct:      50,
  rteAcAc:             86.32,
  bessCapturePct:      95,
  annualPvOutputMwh:   85_899,
  uncurtailedMwh:      42_950,
  bessDischargeMwh:    35_201,

  conservative: {
    solarRateEurMwh:  140.88,   // DAM daytime 06–17h (frozen Feb 2026 underwriting)
    bessRateEurMwh:   182.99,   // DAM evening peak (frozen Feb 2026 underwriting)
    grossRevY1:       12_361_000,
    netRevY1:         11_125_000,
    ebitdaY1:          9_793_000,
    fcfeY1:            6_021_000,
    partnerCashY1:     1_505_000,
    partnerCashOnCash: 6.0,     // %
  },
  current: {
    solarRateEurMwh:  151.38,   // TSOC DAM 339-day sample avg (Oct 2025–Sep 2026)
    bessRateEurMwh:   212.42,   // TSOC DAM 339-day sample evening peak
    grossRevY1:       13_981_000,
    netRevY1:         12_583_000,
    ebitdaY1:         11_251_000,
    fcfeY1:            7_303_000,
    partnerCashY1:     1_826_000,
    partnerCashOnCash: 7.3,     // %
  },

  damReference: CYPRUS_TSOC_DAM_SAMPLE,
  aggregatorFeePct: 10,
  degradationPctPerYr: 0.5,     // revenue degradation (PV-limited — BESS never capacity-constrained)
  opexInflationPctPerYr: 2,
} as const;

// ─── OPEX ─────────────────────────────────────────────────────────────────────

export const AVDELLERO_OPEX_Y1 = {
  pvOm:         361_680,   // €8k/MWp/yr × 45.21 MWp
  bessLtsa:     285_000,   // Lighthief internal LTSA cost
  insurance:    300_000,   // All-risk CAR/EAR
  landLease:    120_000,   // PV €80k + Agri €40k (estimated)
  scadaMaint:    45_000,   // Disperon v3: €3k/park × 11 + €12k/group
  adminMisc:    220_000,   // SPV overhead, audit, compliance
  total:      1_331_680,
} as const;

// ─── DEAL METADATA ────────────────────────────────────────────────────────────

export const AVDELLERO_DEAL = {
  referenceCode:   'AVDELLERO-45MW-2026',
  projectName:     'Avdellero Solar PV + BESS',
  location:        'Avdellero village, Larnaca District, Cyprus',
  spvName:         'G.P. Rodik Services Limited',
  ownerGroup:      'K. Ellinas Energy Ltd',
  ownerContact:    'Mr. Kleanthis Ellinas',
  kpmgContact:     'Christophoros Anayiotos (Board Member, Deal Advisory)',
  kpmgEmail:       'canayiotos@kpmg.com',
  kpmgPhone:       '+357 22 209292',
  teaserDate:      '2024-04-06',
  modelDate:       '2026-09-21',
  status:          'analysis' as const,

  dealTypes: ['share-acquisition', 'turn-key'] as const,
  ceraLicences:    'All 11 sub-projects issued',
  envApprovals:    'All 11 sub-projects issued',
  planningPermits: '26.5 MW issued (Solar PV partial + all 7 solar parks); 13.7 MW Agri-PV pending',
  buildingPermits: '7 Solar PV parks — applications submitted',

  openItems: [
    'Confirm whether EAC substation €7.2M is SPV cost or EAC infrastructure',
    'Clarify if acquisition is share-only or can be turn-key (Ellinas builds)',
    'Agri-PV planning permit timeline for 4 parks (13.7 MW)',
    'Formal Linyang quotation for 3-BESS + T4 configs (Avd 2, 6, 8)',
    'Formal Alpha Bank indicative term sheet for RES project finance',
    'Agri-PV land lease final cost (currently estimated €40K/yr)',
  ],

  _meta: {
    source: 'KPMG Avdellero Factsheet Apr 2024 · Linyang LY202601271 · TSOC DAM 339-day sample · Alpha Bank RES rate (Dino) · lib/portfolio-data.ts',
    date: '2026-09-21',
    analyst: 'Alexander Papacosta (Cyprus Director)',
  },
} as const;

export type AvdelleroSubProject = (typeof AVDELLERO_SUB_PROJECTS)[number];
export type AvdelleroScenario  = 'conservative' | 'current';
