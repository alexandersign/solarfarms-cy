import * as XLSX from 'xlsx';
import * as path from 'path';
import { PORTFOLIO, FINANCIALS, ADDERS, GROUPS, BATCHES, LTSA, COMPANY, PAYMENT_TERMS, WARRANTY, OEM, OM_OPEX } from '../lib/portfolio-data';

const wb = XLSX.utils.book_new();

// ─── Sheet 1: Contract EBITDA ───
const summaryData = [
  ['LIGHTHIEF CYPRUS LTD — CONTRACT EBITDA FORECAST'],
  ['Investor Presentation | Confidential | 3 March 2026'],
  ['Full contract basis — 51 parks, 882 MWh, ~13-month execution'],
  [],
  ['CONTRACT INCOME STATEMENT'],
  [],
  ['Line Item', 'Amount (€)', "Amount (€'000)", '% of Revenue', 'Notes'],
  ['Revenue', FINANCIALS.clientRevenue, Math.round(FINANCIALS.clientRevenue / 1000), '100.0%', `${PORTFOLIO.parks} parks, ${PORTFOLIO.mwh} MWh, fixed turnkey pricing`],
  [],
  ['COST OF REVENUE'],
  ['Equipment (CIF Limassol)', -FINANCIALS.cifTotal, -Math.round(FINANCIALS.cifTotal / 1000), '78.7%', 'Linyang Energy — exclusive distributor'],
  ['Import Duty (2.66%)', -ADDERS.importDuty.total, -Math.round(ADDERS.importDuty.total / 1000), '2.1%', 'Weighted average HS codes — confirmed'],
  ['Port Landing', -ADDERS.portLanding.total, -Math.round(ADDERS.portLanding.total / 1000), '0.1%', `${ADDERS.portLanding.supplier} — ${ADDERS.portLanding.rate}`],
  ['Customs Clearance', -ADDERS.customsClearance.total, -Math.round(ADDERS.customsClearance.total / 1000), '0.0%', `${ADDERS.customsClearance.supplier}`],
  ['Crane Transport', -ADDERS.craneTransport.total, -Math.round(ADDERS.craneTransport.total / 1000), '0.6%', `${ADDERS.craneTransport.supplier} — ${ADDERS.craneTransport.rate}`],
  ['Civil Works', -ADDERS.civilWorks.total, -Math.round(ADDERS.civilWorks.total / 1000), '1.6%', `${ADDERS.civilWorks.rate} — confirmed`],
  ['DEHN LPS/SPD', -ADDERS.dehnLpsSpdEarthing.total, -Math.round(ADDERS.dehnLpsSpdEarthing.total / 1000), '0.4%', `${ADDERS.dehnLpsSpdEarthing.supplier}`],
  ['DEHN Install Labour', -ADDERS.dehnInstallLabour.total, -Math.round(ADDERS.dehnInstallLabour.total / 1000), '0.1%', `${ADDERS.dehnInstallLabour.supplier} — ${ADDERS.dehnInstallLabour.rate}`],
  ['Insurance (CAR/EAR/TPL/PI)', -ADDERS.insurance.total, -Math.round(ADDERS.insurance.total / 1000), '0.6%', ADDERS.insurance.rate!],
  ['Documentation & Compliance', -ADDERS.docsCompliance.total, -Math.round(ADDERS.docsCompliance.total / 1000), '0.3%', ADDERS.docsCompliance.rate!],
  ['LV Cabling', -ADDERS.lvCabling.total, -Math.round(ADDERS.lvCabling.total / 1000), '0.3%', ''],
  ['MV Cabling', -ADDERS.mvCabling.total, -Math.round(ADDERS.mvCabling.total / 1000), '0.2%', ADDERS.mvCabling.rate!],
  ['MV Terminations', -ADDERS.mvTerminations.total, -Math.round(ADDERS.mvTerminations.total / 1000), '0.1%', ADDERS.mvTerminations.rate!],
  ['Protection Engineering', -ADDERS.protectionEng.total, -Math.round(ADDERS.protectionEng.total / 1000), '0.3%', ADDERS.protectionEng.rate!],
  ['Remote trip / comms (RTU)', -ADDERS.remoteTripComms.total, -Math.round(ADDERS.remoteTripComms.total / 1000), '0.1%', ADDERS.remoteTripComms.rate!],
  ['UPS / Auxiliary', -ADDERS.upsAuxiliary.total, -Math.round(ADDERS.upsAuxiliary.total / 1000), '0.1%', ADDERS.upsAuxiliary.rate!],
  ['Voltus EMS', -ADDERS.voltusEms.total, -Math.round(ADDERS.voltusEms.total / 1000), '2.1%', `${ADDERS.voltusEms.supplier}`],
  ['SCADA Local', -ADDERS.scadaLocal.total, -Math.round(ADDERS.scadaLocal.total / 1000), '1.2%', `${ADDERS.scadaLocal.supplier}`],
  ['SCADA Global', -ADDERS.scadaGlobal.total, -Math.round(ADDERS.scadaGlobal.total / 1000), '0.4%', `${ADDERS.scadaGlobal.supplier}`],
  [],
  ['TOTAL COGS', -FINANCIALS.installedCost, -Math.round(FINANCIALS.installedCost / 1000), '89.4%', ''],
  ['GROSS PROFIT', FINANCIALS.netMargin, Math.round(FINANCIALS.netMargin / 1000), `${FINANCIALS.netMarginRounded}%`, ''],
  [],
  ['OPERATING EXPENSES (SG&A) — 13 MONTHS'],
  ['Payroll & Benefits', -190_000, -190, '0.2%', '8 FTEs incl. ETEK engineer'],
  ['Premises (Office + Warehouse)', -62_000, -62, '0.1%', 'Lophitis BC + warehouse'],
  ['Professional Services', -58_000, -58, '0.1%', 'Accounting, legal, audit'],
  ['Operations', -80_000, -80, '0.1%', 'Vehicles, IT, travel, marketing'],
  ['TOTAL SG&A', -390_000, -390, '0.4%', '~13-month project duration'],
  [],
  ['EBITDA', 11_251_000, 11_251, '10.3%', ''],
  ['Depreciation & Amortisation', -30_000, -30, '—', 'Asset-light model'],
  ['EBIT', 11_221_000, 11_221, '10.3%', ''],
];

const ws1 = XLSX.utils.aoa_to_sheet(summaryData);
ws1['!cols'] = [{ wch: 32 }, { wch: 16 }, { wch: 14 }, { wch: 12 }, { wch: 50 }];
XLSX.utils.book_append_sheet(wb, ws1, 'Contract EBITDA');

// ─── Sheet 2: Revenue by Group ───
const revenueData = [
  ['REVENUE BY CLIENT GROUP'],
  [],
  ['Client Group', 'Parks', 'MW', 'MWh', 'CIF (€)', 'Installed Cost (€)', 'Revenue (€)', 'Margin (€)', 'Margin %'],
  ...GROUPS.map(g => [g.name, g.parks, g.mw, g.mwh, Math.round(g.cif), Math.round(g.installedCost), Math.round(g.revenue), Math.round(g.margin), `${g.marginPct}%`]),
  ['TOTAL', PORTFOLIO.parks, PORTFOLIO.mw, PORTFOLIO.mwh, Math.round(FINANCIALS.cifTotal), Math.round(FINANCIALS.installedCost), Math.round(FINANCIALS.clientRevenue), Math.round(FINANCIALS.netMargin), `${FINANCIALS.netMarginRounded}%`],
  [],
  [],
  ['BILLING MILESTONES'],
  [],
  ['Milestone', 'Trigger', '% of Contract', 'Amount (€\'000)'],
  ['Advance', PAYMENT_TERMS.client.advance.trigger, `${PAYMENT_TERMS.client.advance.pct}%`, Math.round(FINANCIALS.clientRevenue * PAYMENT_TERMS.client.advance.pct / 100 / 1000)],
  ['Pre-Shipment', PAYMENT_TERMS.client.preShipment.trigger, `${PAYMENT_TERMS.client.preShipment.pct}%`, Math.round(FINANCIALS.clientRevenue * PAYMENT_TERMS.client.preShipment.pct / 100 / 1000)],
  ['PAC', PAYMENT_TERMS.client.pac.trigger, `${PAYMENT_TERMS.client.pac.pct}%`, Math.round(FINANCIALS.clientRevenue * PAYMENT_TERMS.client.pac.pct / 100 / 1000)],
  ['Retention', PAYMENT_TERMS.client.retention.trigger, `${PAYMENT_TERMS.client.retention.pct}%`, Math.round(FINANCIALS.clientRevenue * PAYMENT_TERMS.client.retention.pct / 100 / 1000)],
  ['TOTAL', '', '100%', Math.round(FINANCIALS.clientRevenue / 1000)],
  [],
  [],
  ['DELIVERY BATCHES'],
  [],
  ['Batch', 'Name', 'Parks', 'MWh', 'Containers', 'Prod Start', 'Ship Date', 'CIF Arrival', 'PAC Target'],
  ...BATCHES.map(b => [b.id, b.name, b.parks, b.mwh, b.containers, b.productionStart, b.shipDate, b.cifDate, b.pacDate]),
];

const ws2 = XLSX.utils.aoa_to_sheet(revenueData);
ws2['!cols'] = [{ wch: 22 }, { wch: 38 }, { wch: 10 }, { wch: 10 }, { wch: 16 }, { wch: 16 }, { wch: 16 }, { wch: 14 }, { wch: 12 }];
XLSX.utils.book_append_sheet(wb, ws2, 'Revenue Detail');

// ─── Sheet 3: SG&A Detail ───
const sgaData = [
  ['OPERATING EXPENSES (SG&A) — 13-MONTH PROJECT DURATION'],
  [],
  ['PAYROLL'],
  [],
  ['Role', 'Headcount', 'Monthly Gross (€)', 'Project Months', 'Project Total (€)'],
  ['BESS Division Lead (ETEK)', 1, 3_000, 13, 39_000],
  ['Business Development & Sales', 1, 2_500, 13, 32_500],
  ['Sales Executive & Lead Coordinator', 1, 1_400, 13, 18_200],
  ['Back Office & Operations', 1, 2_000, 13, 26_000],
  ['Field Engineer (existing)', 1, 1_400, 13, 18_200],
  ['Field Engineers (new hires)', 3, 1_800, 7, 37_800],
  ['Employer Social Contributions (12.5%)', '', '', '', 21_463],
  [],
  ['PAYROLL SUBTOTAL', 8, '', '', 193_163],
  [],
  [],
  ['OTHER OPERATING EXPENSES'],
  [],
  ['Category', '', 'Monthly (€)', 'Project Months', 'Project Total (€)'],
  ['Office Rent (Lophitis BC)', '', 1_800, 13, 23_400],
  ['Warehouse', '', 4_000, 10, 40_000],
  ['Accounting & Audit', '', '', '', 20_000],
  ['Legal Counsel', '', '', '', 38_000],
  ['Vehicles (fuel, lease, insurance)', '', 2_500, 13, 32_500],
  ['IT / Software / Communications', '', 1_000, 13, 13_000],
  ['Travel & Entertainment', '', '', '', 16_000],
  ['Marketing & Website', '', '', '', 11_000],
  ['Office Supplies & Misc', '', 500, 13, 6_500],
  [],
  ['OTHER OPEX SUBTOTAL', '', '', '', 200_400],
  [],
  ['TOTAL SG&A (EXACT)', '', '', '', 393_563],
  ['TOTAL SG&A (ROUNDED)', '', '', '', 390_000],
];

const ws3 = XLSX.utils.aoa_to_sheet(sgaData);
ws3['!cols'] = [{ wch: 36 }, { wch: 12 }, { wch: 16 }, { wch: 16 }, { wch: 16 }];
XLSX.utils.book_append_sheet(wb, ws3, 'SG&A Detail');

// ─── Sheet 4: Recurring Revenue (from OM_OPEX SSOT) ───
const ltsaAnnual = Math.round(PORTFOLIO.mwh * LTSA.tierC.ratePerMWh);
const p = OM_OPEX.personnel;
const f = OM_OPEX.fleet;
const o = OM_OPEX.operations;
const recurringData = [
  ['RECURRING REVENUE & O&M OPEX MODEL — ANNUAL STEADY STATE'],
  ['All costs are fully loaded and deliberately overestimated with 10% contingency.'],
  [],
  ['ANNUAL RECURRING REVENUE'],
  [],
  ['Stream', 'Basis', 'Rate', 'MWh', 'Annual (€)'],
  ['LTSA Service Fees', `${PORTFOLIO.mwh} MWh × ${LTSA.tierC.duration} years`, `€${LTSA.tierC.ratePerMWh}/MWh/yr`, PORTFOLIO.mwh, ltsaAnnual],
  ['TOTAL RECURRING REVENUE', 'Retained by Lighthief in full', '', '', ltsaAnnual],
  [],
  [],
  ['ANNUAL RECURRING COSTS — PERSONNEL'],
  [],
  ['Role', 'Headcount', 'Monthly Loaded (€)', 'Annual (€)', 'Notes'],
  ['Field Engineers', p.fieldEngineers.headcount, p.fieldEngineers.monthlyLoaded, -p.fieldEngineers.annual, p.fieldEngineers.note],
  ['Driver / Logistics Coordinator', p.driverLogistics.headcount, p.driverLogistics.monthlyLoaded, -p.driverLogistics.annual, p.driverLogistics.note],
  ['O&M Back Office / Scheduler', p.omBackOffice.headcount, p.omBackOffice.monthlyLoaded, -p.omBackOffice.annual, p.omBackOffice.note],
  ['O&M Manager (50% allocation)', p.omManager.headcount, `${p.omManager.monthlyLoaded} (50%)`, -p.omManager.annual, p.omManager.note],
  ['PERSONNEL SUBTOTAL', '9 FTEs', '', -OM_OPEX.personnelTotal, ''],
  [],
  [],
  ['ANNUAL RECURRING COSTS — FLEET & PREMISES'],
  [],
  ['Item', 'Count', 'Monthly/Unit (€)', 'Annual (€)', 'Notes'],
  ['Service Vans', f.serviceVans.count, f.serviceVans.monthlyPerUnit, -f.serviceVans.annual, f.serviceVans.note],
  ['Forklift (rented)', f.forklift.count, f.forklift.monthlyPerUnit, -f.forklift.annual, f.forklift.note],
  ['Warehouse (50% share)', 1, Math.round(OM_OPEX.premises.warehouse.annual / 12), -OM_OPEX.premises.warehouse.annual, OM_OPEX.premises.warehouse.note],
  ['FLEET & PREMISES SUBTOTAL', '', '', -(OM_OPEX.fleetTotal + OM_OPEX.premisesTotal), ''],
  [],
  [],
  ['ANNUAL RECURRING COSTS — OPERATIONS'],
  [],
  ['Category', '', '', 'Annual (€)', 'Notes'],
  ['SCADA Global Maintenance', '', '', -o.scadaGlobalMaint.annual, o.scadaGlobalMaint.note],
  ['Spare Parts & Consumables', '', '', -o.sparesParts.annual, o.sparesParts.note],
  ['Tools & Consumables', '', '', -o.toolsConsumables.annual, o.toolsConsumables.note],
  ['IT / Monitoring / CMMS', '', '', -o.itMonitoringCmms.annual, o.itMonitoringCmms.note],
  ['Insurance & Compliance', '', '', -o.insuranceCompliance.annual, o.insuranceCompliance.note],
  ['Training (annual)', '', '', -o.trainingAnnual.annual, o.trainingAnnual.note],
  ['Travel & Miscellaneous', '', '', -o.travelMisc.annual, o.travelMisc.note],
  ['OPERATIONS SUBTOTAL', '', '', -OM_OPEX.operationsTotal, ''],
  [],
  [],
  ['TOTAL RECURRING COSTS'],
  [],
  ['Line', '', '', 'Annual (€)', ''],
  ['Subtotal (before contingency)', '', '', -OM_OPEX.subtotal, ''],
  [`Contingency (${OM_OPEX.contingencyRate * 100}%)`, '', '', -OM_OPEX.contingency, ''],
  ['TOTAL RECURRING COSTS', '', '', -OM_OPEX.totalRounded, ''],
  [],
  ['RECURRING EBITDA', '', '', ltsaAnnual - OM_OPEX.totalRounded, ''],
  ['RECURRING EBITDA MARGIN', '', '', '51.5%', ''],
  [],
  [],
  ['LIFETIME VALUE'],
  [],
  ['Metric', 'Value'],
  ['Contract Duration', `${LTSA.tierC.duration} years`],
  ['Undiscounted Lifetime Revenue', `€${(ltsaAnnual * 15 / 1_000_000).toFixed(1)}M`],
  ['Undiscounted Lifetime EBITDA', `€${((ltsaAnnual - OM_OPEX.totalRounded) * 15 / 1_000_000).toFixed(1)}M`],
  ['NPV @ 8% Discount Rate', '€6,800K'],
  ['NPV @ 10% Discount Rate', '€6,000K'],
  ['O&M Headcount', '9 FTEs (6 field + 1 driver + 1 back office + 1 manager at 50%)'],
  ['SLA Availability Target', `${LTSA.tierC.availabilityTarget}%`],
  ['Maintenance Allowance', `${LTSA.tierC.maintenanceAllowanceDays} days/yr`],
  [],
  [],
  ['PLANNING ASSUMPTIONS'],
  [],
  ...OM_OPEX.assumptions.map((a, i) => [`${i + 1}. ${a}`]),
  [],
  [],
  ['LTSA vs EXTENDED WARRANTY — PAYMENT STRUCTURE'],
  ['LTSA and extended warranty are SEPARATE commercial arrangements.'],
  ['Lighthief LTSA margin is CONSTANT across all 15 years.'],
  [],
  ['Item', 'Paid By', 'Paid To', 'Lighthief P&L Impact', 'Rate (€/MWh/yr)'],
  ['LTSA O&M Fee', 'Client', 'Lighthief', 'Revenue — retained in full', LTSA.tierC.ratePerMWh],
  ['Base Warranty (Yr 1–5)', '—', '—', 'Included in CIF (no additional cost)', 0],
  ['Extended Warranty Yr 6–10', 'Client', 'Linyang DIRECTLY', 'None — does not flow through Lighthief', WARRANTY.extendedYr6to10.totalPerMWh],
  ['Extended Warranty Yr 11–15', 'Client', 'Linyang DIRECTLY', 'None — does not flow through Lighthief', WARRANTY.extendedYr11to15.totalPerMWh],
];

const ws4 = XLSX.utils.aoa_to_sheet(recurringData);
ws4['!cols'] = [{ wch: 32 }, { wch: 16 }, { wch: 20 }, { wch: 16 }, { wch: 60 }];
XLSX.utils.book_append_sheet(wb, ws4, 'Recurring Revenue');

// ─── Sheet 5: Sensitivity ───
const baseEbitda = 11_251;
const sensitivityData = [
  ['SENSITIVITY ANALYSIS'],
  [],
  ['Revenue is fixed by contract (€109,241K). Variance is on the cost side.'],
  [],
  ['SCENARIO COMPARISON'],
  [],
  ['Scenario', 'COGS Adjustment (€\'000)', 'EBITDA (€\'000)', 'EBITDA Margin'],
  ['Bear Case (adder +15%, insurance +50%)', '+1,755', 9_496, '8.7%'],
  ['Moderate Downside (adder +10%)', '+764', 10_487, '9.6%'],
  ['BASE CASE', '0', baseEbitda, '10.3%'],
  ['Moderate Upside (subcon -5%)', '-382', 11_633, '10.7%'],
  ['Bull Case (efficiency gains)', '-758', 12_009, '11.0%'],
  [],
  [],
  ['COGS VARIANCE TABLE'],
  [],
  ['COGS Change', 'COGS (€\'000)', 'Gross Profit (€\'000)', 'EBITDA (€\'000)', 'EBITDA Margin'],
];

for (let pct = -5; pct <= 5; pct++) {
  const cogs = Math.round(97_600 * (1 + pct / 100));
  const gp = 109_241 - cogs;
  const ebitda = gp - 390;
  const margin = (ebitda / 109_241 * 100).toFixed(1) + '%';
  sensitivityData.push([`${pct >= 0 ? '+' : ''}${pct}%`, cogs, gp, ebitda, margin]);
}

sensitivityData.push(
  [],
  [],
  ['RISK MATRIX'],
  [],
  ['Risk Factor', 'Probability', 'EBITDA Impact (€\'000)', 'Mitigation'],
  ['Subcontractor cost overrun >15%', 'Medium', -1_146, 'Fixed-price subcontracts'],
  ['Insurance above budget (+50%)', 'Medium', -322, 'Multi-broker competition'],
  ['Batch delivery delay >2 months', 'Low', 0, 'Timeline shift — Linyang APG guarantee'],
  ['FX exposure (EUR/CNY)', 'Nil', 0, 'All contracts in EUR'],
  ['Client default / non-payment', 'Low', 'Variable', '30% advance + APG, milestone billing'],
);

const ws5 = XLSX.utils.aoa_to_sheet(sensitivityData);
ws5['!cols'] = [{ wch: 38 }, { wch: 24 }, { wch: 20 }, { wch: 16 }, { wch: 14 }];
XLSX.utils.book_append_sheet(wb, ws5, 'Sensitivity');

// ─── Sheet 6: Key Metrics ───
const metricsData = [
  ['KEY INVESTOR METRICS'],
  [],
  ['Metric', 'Value', 'Commentary'],
  ['Contract Revenue', `€${Math.round(FINANCIALS.clientRevenue / 1000).toLocaleString()}K`, '100% contracted, zero speculative'],
  ['Portfolio', `${PORTFOLIO.parks} parks, ${PORTFOLIO.mw} MW, ${PORTFOLIO.mwh} MWh`, `${PORTFOLIO.districts} districts across Cyprus`],
  ['Equipment', `${PORTFOLIO.containers} containers`, 'Linyang BESS — CIF Limassol'],
  ['Contract Gross Margin', `${FINANCIALS.netMarginRounded}%`, 'Fixed turnkey EPC margin'],
  ['Contract EBITDA', '€11,251K', '10.3% EBITDA margin'],
  ['Contract EBIT', '€11,221K', 'D&A = €30K (asset-light)'],
  ['Free Cash Flow', '~€11,221K', '~100% FCF/EBITDA conversion'],
  ['Working Capital Required', '€0', 'Self-funding with optimised structure'],
  ['Net Debt', '€0', 'No external borrowing'],
  ['', '', ''],
  ['Recurring EBITDA (annual)', '€790K', '51.5% margin, 15-year LTSA — 9 FTE O&M team, costs overestimated with 10% contingency'],
  ['LTSA NPV (8%)', '€6,800K', '15-year DCF of recurring EBITDA'],
  ['Combined Value', '€18,051K', 'Contract EBITDA + LTSA NPV'],
  ['', '', ''],
  ['Revenue per Employee', `€${Math.round(FINANCIALS.clientRevenue / 8 / 1000).toLocaleString()}K`, '8 FTEs — highly leveraged'],
  ['EBITDA per Employee', '€1,406K', 'Top-decile productivity'],
  ['Cost Confidence', '92.2%', 'Confirmed or formally quoted'],
  ['', '', ''],
  ['Pipeline (2028)', '~€20,000K', 'Esperia Tseri Phase 2 — 87.5 MWh — pre-order'],
  ['Exclusive Distribution', 'Linyang Energy BESS — Cyprus', 'No competitor access'],
  ['OEM', 'Linyang (EVE LFP cells, Kehua PCS)', `RTE: ${OEM.rte}%`],
  ['EMS Partner', 'Voltus Energy', ''],
  [],
  [],
  ['COMPANY INFORMATION'],
  [],
  ['Field', 'Value'],
  ['Company', COMPANY.name],
  ['Legal Name', COMPANY.legalName],
  ['Registration', COMPANY.regNumber],
  ['TIN', COMPANY.tin],
  ['Address', COMPANY.address],
  ['Director', COMPANY.cyprusDirector],
  ['Email', COMPANY.email],
  ['Phone', COMPANY.phone],
  ['Website', COMPANY.website],
];

const ws6 = XLSX.utils.aoa_to_sheet(metricsData);
ws6['!cols'] = [{ wch: 30 }, { wch: 40 }, { wch: 50 }];
XLSX.utils.book_append_sheet(wb, ws6, 'Key Metrics');

// ─── Write File ───
const outputPath = path.join(__dirname, '..', 'financial', 'ebitda-forecast-2026.xlsx');
XLSX.writeFile(wb, outputPath);
console.log(`Generated: ${outputPath}`);
console.log('Sheets: Contract EBITDA, Revenue Detail, SG&A Detail, Recurring Revenue, Sensitivity, Key Metrics');
