// ===================================================================
// BESS CYPRUS PORTFOLIO — SINGLE SOURCE OF TRUTH
// All documents MUST reference this file for portfolio data.
// When an RFI response or updated quotation arrives, update HERE ONLY
// then run: npm run docs:generate && npm run docs:validate
//
// Last updated: 22 February 2026
// Source: Lighthief-EPC-Confirmed-Adders-v4-Feb2026.xlsx
// Confirmed: v4 Excel = total SSOT (51 parks incl. 5 Esperia 2028)
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
  parks: 51,
  mw: 249,
  mwh: 881.78,
  containers: 251,
  districts: 5,
  orderDate: '2026-03-01',
  _meta: { source: 'Lighthief-EPC-Confirmed-Adders-v4-Feb2026.xlsx', date: '2026-02-20' } as MetaInfo,
} as const;

// ─────────────────────────────────────────────
// FINANCIAL TOTALS
// ─────────────────────────────────────────────

export const FINANCIALS = {
  cifTotal: 85_963_925.47,
  cifAvgPerMWh: 97_490.09,

  physicalAdders: 7_642_204.48,
  emsScadaTotal: 3_993_617.00,

  installedCost: 97_599_746.95,
  installedCostAvgPerMWh: 110_700,

  clientRevenue: 109_241_186.79,
  clientRevenueAvgPerMWh: 123_900,

  netMargin: 11_641_439.85,
  netMarginPct: 10.66,
  netMarginRounded: 10.7,

  importDutyRate: 2.66,
  importDutyTotal: 2_286_640.47,

  vatRate: 19,

  _meta: { source: 'Lighthief-EPC-Confirmed-Adders-v4-Feb2026.xlsx', date: '2026-02-20' } as MetaInfo,
} as const;

// ─────────────────────────────────────────────
// EPC ADDER COST STACK (per-item)
// ─────────────────────────────────────────────

export const ADDERS = {
  importDuty:         { total: 2_286_640.47, status: 'confirmed' as DataStatus, rate: '2.66% of CIF (weighted HS codes)' },
  portLanding:        { total: 161_895.00,   status: 'quoted' as DataStatus,    rate: '€600 per 40HC container', supplier: 'ECTL' },
  customsClearance:   { total: 4_335.00,     status: 'quoted' as DataStatus,    rate: '€85 per declaration', supplier: 'Interfreight' },
  craneTransport:     { total: 604_160.00,   status: 'quoted' as DataStatus,    rate: '€2,360 per container', supplier: 'A. Soulis', fleet: { trucks20ft: 6, capacity20ft: '43 tonnes', trucks40ft: 'TBC' } },
  dehnLpsSpdEarthing: { total: 446_384.61,   status: 'quoted' as DataStatus,    supplier: 'DEHN + StrikeRA' },
  dehnInstallLabour:  { total: 81_600.00,    status: 'confirmed' as DataStatus, rate: '€1,600 per park', supplier: 'StrikeRA' },
  civilWorks:         { total: 1_763_560.00, status: 'confirmed' as DataStatus, rate: '€2,000 per MWh', supplier: 'Lighthief subcontractors' },
  marineInsurance:    { total: 644_729.40,   status: 'confirmed' as DataStatus, rate: '0.75% of CIF' },
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

export const GROUPS: GroupData[] = [
  { name: 'ABIO Power', key: 'abio', parks: 25, mw: 125.0, mwh: 430.28, cif: 41_765_837.86, installedCost: 47_388_800.60, revenue: 52_609_991.53, margin: 5_221_190.94, marginPct: 9.92 },
  { name: 'Esperia Energy', key: 'esperia', parks: 11, mw: 79.5, mwh: 310.50, cif: 28_802_957.61, installedCost: 32_218_768.88, revenue: 36_412_811.96, margin: 4_194_043.09, marginPct: 11.52 },
  { name: 'Timotheos Timotheou', key: 'timotheos', parks: 9, mw: 25.5, mwh: 81.00, cif: 8_994_033.00, installedCost: 10_408_394.01, revenue: 11_818_919.17, margin: 1_410_525.16, marginPct: 11.93 },
  { name: 'A. Kerasi', key: 'kerasi', parks: 3, mw: 6.5, mwh: 20.00, cif: 2_283_660.00, installedCost: 2_841_296.88, revenue: 3_061_369.92, margin: 220_073.03, marginPct: 7.19 },
  { name: 'Lampros Andreadis', key: 'lampros', parks: 2, mw: 4.8, mwh: 15.00, cif: 1_593_785.00, installedCost: 1_923_085.24, revenue: 2_117_419.61, margin: 194_334.36, marginPct: 9.18 },
  { name: 'Ioannis Karis', key: 'karis', parks: 1, mw: 7.7, mwh: 25.00, cif: 2_523_652.00, installedCost: 2_819_401.34, revenue: 3_220_674.61, margin: 401_273.27, marginPct: 12.46 },
];

// ─────────────────────────────────────────────
// BATCH SCHEDULE
// ─────────────────────────────────────────────

export const BATCHES = [
  {
    id: 1, name: 'Batch 1: ABIO Phase 1',
    groups: ['ABIO Phase 1'],
    parks: 15, mwh: 280, containers: 80,
    productionStart: '2026-03-08', productionEnd: '2026-06-05',
    fatDate: '2026-06-05', shipDate: '2026-06-05',
    cifDate: '2026-07-05', pacDate: '2026-10-31',
  },
  {
    id: 2, name: 'Batch 2: ABIO Ph.2 + TIM',
    groups: ['ABIO Phase 2', 'Timotheos'],
    parks: 19, mwh: 230, containers: 90,
    productionStart: '2026-04-15', productionEnd: '2026-07-15',
    shipDate: '2026-07-20',
    cifDate: '2026-08-20', pacDate: '2027-01-15',
  },
  {
    id: 3, name: 'Batch 3: ESP + Standalone',
    groups: ['Esperia Phase 1', 'Standalone'],
    parks: 12, mwh: 283, containers: 81,
    productionStart: '2026-05-15', productionEnd: '2026-08-15',
    shipDate: '2026-08-20',
    cifDate: '2026-09-20', pacDate: '2027-02-28',
  },
] as const;

export const ESP_2028 = {
  name: 'Esperia Tseri (2028)',
  parks: 5, mw: 27.5, mwh: 87.5,
  note: 'Separate future order — not in current timeline',
} as const;

export const FAC_DATE = '2027-03-31';

// ─────────────────────────────────────────────
// PAYMENT TERMS
// ─────────────────────────────────────────────

export const PAYMENT_TERMS = {
  client: {
    advance:     { pct: 30, trigger: 'Within 7 days of contract signing' },
    preShipment: { pct: 55, trigger: 'Equipment ready, factory inspection passed' },
    pac:         { pct: 10, trigger: 'System commissioned & grid-connected' },
    retention:   { pct: 5,  trigger: 'Released after 24-month DLP' },
  },
  linyang: {
    advance:     { pct: 25, trigger: 'Order date' },
    preShipment: { pct: 50, trigger: 'Ready to ship' },
    dap:         { pct: 20, trigger: 'Delivery at Place (site arrival)' },
    sat:         { pct: 5,  trigger: 'Site Acceptance Test completion' },
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

  extendedYr6to10: {
    bessPerMWh: 913.92,
    pcsPerMWh: 747.76,
    totalPerMWh: 1_661.68,
    status: 'confirmed' as DataStatus,
  },
  extendedYr11to15: {
    bessPerMWh: 1_157.62,
    pcsPerMWh: 926.10,
    totalPerMWh: 2_083.72,
    status: 'confirmed' as DataStatus,
    note: 'V1 conflict (€4,182.25) superseded by V3 confirmed pricing',
  },
  extendedYr16to20: {
    bessPerMWh: 3_858.75,
    pcsPerMWh: 2_315.25,
    totalPerMWh: 6_174.00,
    status: 'quoted' as DataStatus,
  },

  upfrontSparesAlternative: {
    ratePerMWh: { min: 1_000, max: 1_250 },
    note: 'One-time upfront purchase, alternative to Yr 11-15 warranty',
    status: 'confirmed' as DataStatus,
  },

  _meta: { source: 'RFI V3 Linyang', date: '2026-02-15', rfiDoc: 'rfi-linyang-final-feb2026' } as MetaInfo,
} as const;

export const LTSA = {
  tierC: {
    ratePerMWh: 1_740,
    bessMaintenancePerMWh: 815.72,
    pcsMvsMaintenancePerMWh: 924.28,
    duration: 15,
    availabilityTarget: 97,
    responseTimeHours: 4,
    provider: 'Lighthief Cyprus Ltd',
    status: 'confirmed' as DataStatus,
  },
  availabilityLD: {
    ratePerDayPerMWh: 30,
    status: 'confirmed' as DataStatus,
  },
  _meta: { source: 'confirmed-client-pricing-feb2026.md', date: '2026-02-05' } as MetaInfo,
} as const;

// ─────────────────────────────────────────────
// OEM EQUIPMENT SPECS
// ─────────────────────────────────────────────

export const OEM = {
  manufacturer: 'Linyang Energy',
  distributor: 'Lighthief Cyprus Ltd (exclusive)',
  pcs: 'Kehua BCS1000K-C-HUD / BCS1250K-C-HUD',
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
  directorPhone: '+357 99 164 158',
  bessProjectContact: 'Alexander Papacosta',
  bessProjectPhone: '+357 99 164 158',
} as const;

// ─────────────────────────────────────────────
// CLIENT PRICING (per MWh, all-in turnkey)
// ─────────────────────────────────────────────

export const CLIENT_PRICING = {
  '5MW_20MWh':   { ratePerMWh: 112_945, status: 'confirmed' as DataStatus },
  '5MW_15MWh':   { ratePerMWh: 130_792, status: 'confirmed' as DataStatus },
  '5MW_10MWh':   { ratePerMWh: 136_106, status: 'confirmed' as DataStatus },
  '2.5MW_10MWh': { ratePerMWh: 120_630, status: 'confirmed' as DataStatus },
  '8MW_60MWh':   { ratePerMWh: 100_052, status: 'confirmed' as DataStatus },
  '12MW_40MWh':  { ratePerMWh: 114_990, status: 'confirmed' as DataStatus },
  '25MW_100MWh': { ratePerMWh: 106_279, status: 'confirmed' as DataStatus },
  _meta: { source: 'confirmed-client-pricing-feb2026.md', date: '2026-02-05' } as MetaInfo,
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
  transportPricing:     { status: 'confirmed' as DataStatus,  version: 'V2',  date: '2026-02-22', doc: 'rfq-transport-asoulis-jan2026', note: '6× 20ft trucks confirmed (43T). 40ft TBC.' },
  insurancePricing:     { status: 'pending' as DataStatus,   version: null,  date: null, doc: 'rfp-insurance-comprehensive-feb2026' },
  performanceBond:      { status: 'pending' as DataStatus,   version: null,  date: null, doc: null, note: '5% vs 10% — unresolved' },
  mvSkidDatasheets:     { status: 'confirmed' as DataStatus,  version: 'V2',  date: '2026-02-22', doc: 'legal/linyang_hardware_specs_docs/PCS+SKID+Transformer', note: 'All 4 skid models received: T1, T2, T4, T8. PCS units are 1.00MW or 1.25MW; all park MW sizes are combinations of skids + PCS count.' },
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
  'legal/linyang_hardware_specs_docs/',
  'legal/Documents/',
  'legal/linyang-sales-comments.html',
  'legal/DOCUMENT_INDEX.md',
  'legal/introducer-agreement-moiostrov-voltus.html',
] as const;

// ─────────────────────────────────────────────
// TEMPLATE VARIABLE MAP
// Flat map of all {{VARIABLE}} placeholders used in templates
// ─────────────────────────────────────────────

export function getTemplateVars(): Record<string, string> {
  return {
    'PORTFOLIO.parks':       String(PORTFOLIO.parks),
    'PORTFOLIO.mw':          String(PORTFOLIO.mw),
    'PORTFOLIO.mwh':         String(PORTFOLIO.mwh),
    'PORTFOLIO.containers':  String(PORTFOLIO.containers),
    'PORTFOLIO.districts':   String(PORTFOLIO.districts),
    'PORTFOLIO.orderDate':   PORTFOLIO.orderDate,

    'FINANCIALS.cifTotal':               FINANCIALS.cifTotal.toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    'FINANCIALS.cifTotalM':              `€${(FINANCIALS.cifTotal / 1e6).toFixed(1)}M`,
    'FINANCIALS.cifAvgPerMWh':           FINANCIALS.cifAvgPerMWh.toLocaleString('en-IE'),
    'FINANCIALS.installedCost':          FINANCIALS.installedCost.toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    'FINANCIALS.installedCostM':         `€${(FINANCIALS.installedCost / 1e6).toFixed(1)}M`,
    'FINANCIALS.clientRevenue':          FINANCIALS.clientRevenue.toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    'FINANCIALS.clientRevenueM':         `€${(FINANCIALS.clientRevenue / 1e6).toFixed(1)}M`,
    'FINANCIALS.netMargin':              FINANCIALS.netMargin.toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    'FINANCIALS.netMarginM':             `€${(FINANCIALS.netMargin / 1e6).toFixed(2)}M`,
    'FINANCIALS.netMarginPct':           String(FINANCIALS.netMarginRounded),
    'FINANCIALS.importDutyRate':         String(FINANCIALS.importDutyRate),
    'FINANCIALS.physicalAdders':         FINANCIALS.physicalAdders.toLocaleString('en-IE', { maximumFractionDigits: 0 }),
    'FINANCIALS.emsScadaTotal':          FINANCIALS.emsScadaTotal.toLocaleString('en-IE', { maximumFractionDigits: 0 }),

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
    'LTSA.tierC.responseTimeHours':    String(LTSA.tierC.responseTimeHours),
    'LTSA.availabilityLD.ratePerDayPerMWh': String(LTSA.availabilityLD.ratePerDayPerMWh),

    'PAYMENT.client.advance':     String(PAYMENT_TERMS.client.advance.pct),
    'PAYMENT.client.preShipment': String(PAYMENT_TERMS.client.preShipment.pct),
    'PAYMENT.client.pac':         String(PAYMENT_TERMS.client.pac.pct),
    'PAYMENT.client.retention':   String(PAYMENT_TERMS.client.retention.pct),
    'PAYMENT.linyang.advance':    String(PAYMENT_TERMS.linyang.advance.pct),
    'PAYMENT.linyang.preShipment':String(PAYMENT_TERMS.linyang.preShipment.pct),
    'PAYMENT.linyang.dap':        String(PAYMENT_TERMS.linyang.dap.pct),
    'PAYMENT.linyang.sat':        String(PAYMENT_TERMS.linyang.sat.pct),

    'OEM.manufacturer':        OEM.manufacturer,
    'OEM.pcs':                 OEM.pcs,
    'OEM.containerCapacity':   String(OEM.containerCapacity),
    'OEM.rte':                 String(OEM.rte),
    'OEM.gridCodeCert':        OEM.gridCodeCert,
    'OEM.incoterms':           OEM.incoterms,

    'COMPANY.name':            COMPANY.name,
    'COMPANY.legalName':       COMPANY.legalName,
    'COMPANY.address':         COMPANY.address,
    'COMPANY.email':           COMPANY.email,
    'COMPANY.phone':           COMPANY.phone,
    'COMPANY.cyprusDirector':  COMPANY.cyprusDirector,
    'COMPANY.directorPhone':   COMPANY.directorPhone,
    'COMPANY.bessProjectContact': COMPANY.bessProjectContact,
    'COMPANY.bessProjectPhone': COMPANY.bessProjectPhone,

    'BATCH1.parks': String(BATCHES[0].parks),
    'BATCH1.mwh':   String(BATCHES[0].mwh),
    'BATCH1.cifDate': BATCHES[0].cifDate,
    'BATCH1.pacDate': BATCHES[0].pacDate,
    'BATCH2.parks': String(BATCHES[1].parks),
    'BATCH2.mwh':   String(BATCHES[1].mwh),
    'BATCH2.cifDate': BATCHES[1].cifDate,
    'BATCH2.pacDate': BATCHES[1].pacDate,
    'BATCH3.parks': String(BATCHES[2].parks),
    'BATCH3.mwh':   String(BATCHES[2].mwh),
    'BATCH3.cifDate': BATCHES[2].cifDate,
    'BATCH3.pacDate': BATCHES[2].pacDate,
    'FAC_DATE':      FAC_DATE,
  };
}
