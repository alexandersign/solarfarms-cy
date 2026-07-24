/**
 * Shia-Sia investor pack — sourced Excel model + 2-page justified teaser.
 *
 * Output:
 *   public/lighthief-cyprus/parks-for-sale/shia-sia-nicosia/
 *   parks-for-sale/novikov/investor-pack/  (mirror)
 *
 * Run: npx tsx scripts/generate-shia-sia-investor-pack.ts
 */

import * as fs from 'fs'
import * as path from 'path'
import * as XLSX from 'xlsx'
import { SHIA_SIA_RTB } from '../lib/deals/shia-sia-rtb'
import {
  BESS_DEFAULTS,
  DAM,
  computeRevenueModel,
  LH_EPC,
} from '../lib/deals/rtb-deal-types'
import { CYPRUS_TSOC_DAM_SAMPLE } from '../lib/market/cyprus-tsoc-dam-sample'
import { COMPANY_DATA } from '../lib/constants'
import {
  EAC_CONNECTION,
  LH_PRICING,
  OPEX_SOURCES,
  PERMITS,
  PV_SITE,
  PV_YIELD,
  SELLER_COMMERCIAL,
  SHIA_SIA_INVESTOR_PACK,
} from '../lib/deals/shia-sia-sources'

const CONTACT = {
  companyName: COMPANY_DATA.name,
  companyNumber: COMPANY_DATA.registration.companyNumber,
  director: COMPANY_DATA.contacts.cyprusDirector.name,
  directorTitle: COMPANY_DATA.contacts.cyprusDirector.title,
  directorPhone: COMPANY_DATA.contacts.cyprusDirector.phone,
  email: COMPANY_DATA.email,
  website: 'solarfarms.cy',
  address: COMPANY_DATA.address.office.full,
}

const D = SHIA_SIA_RTB
const C = D.capex
const R = D.revenueModel
const O = D.opexY1
const eacFees = OPEX_SOURCES.eacAnnualFeesEUR
const totalOpexY1 = O.pvOm + O.bessOm + O.landLease + O.other + eacFees

function enc(r: number, c: number) {
  return XLSX.utils.encode_cell({ r: r - 1, c: c - 1 })
}

function setCell(ws: XLSX.WorkSheet, r: number, c: number, v: string | number) {
  const addr = enc(r, c)
  if (typeof v === 'number') ws[addr] = { v, t: 'n', z: '#,##0.00' }
  else ws[addr] = { v, t: 's' }
}

function setFormula(ws: XLSX.WorkSheet, r: number, c: number, f: string, z = '#,##0') {
  ws[enc(r, c)] = { f, t: 'n', z, v: 0 }
}

// ── P&L helpers ─────────────────────────────────────────────────────────────

const aggFee = R.grossRevY1EUR * D.finance.aggregatorFeePct
const netRev = R.grossRevY1EUR - aggFee
const ebitda = netRev - totalOpexY1
const daYear = Math.round((C.pvEpc + C.bessEpc) / 20 + C.rtbAcquisition / 15)
const taxY1 = Math.round(Math.max(0, ebitda - daYear) * D.finance.citPct)
const fcfY1 = ebitda - taxY1
const payback = C.total / fcfY1
const cashYield = fcfY1 / C.total

function damScenario(solarRate: number, bessRate: number) {
  const gross = Math.round(R.uncurtailedSolarMWh * solarRate + R.bessDischargedMWh * bessRate)
  const net = gross * (1 - D.finance.aggregatorFeePct)
  const eb = net - totalOpexY1
  const tax = Math.round(Math.max(0, eb - daYear) * D.finance.citPct)
  const fcf = eb - tax
  return { gross, fcf, yield: fcf / C.total, payback: C.total / fcf }
}

// ── Excel builders ────────────────────────────────────────────────────────────

function buildCover(): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {}
  const lines = [
    ['Sia Solar Park + BESS — Investor Financial Model'],
    [`${D.referenceCode} | ${CONTACT.companyName} | ${new Date().toISOString().slice(0, 10)}`],
    [],
    ['ABOUT THIS MODEL'],
    ['Indicative 100% equity economics. This pack separates two domains:'],
    ['  PART A — SELLER PACKAGE (Novikov DD, May 2026): permits, EAC terms, land, seller PPA & FM.'],
    ['  PART B — LIGHTHIEF ANALYSIS: our E-W yield, BESS sizing, EPC pricing, merchant DAM revenue.'],
    ['  PART C — Seller financial model shown for comparison only (NOT the Lighthief stack).'],
    ['Sources: EAC OCR (498000141), PVGIS (Jun 2026), Lighthief EPC v4, TSOC DAM (Oct 2025–Feb 2026).'],
    ['Not an offer to sell securities.'],
    [],
    ['SHEETS'],
    ['• Document_Sources — assumption registry with DD / market references'],
    ['• Assumptions — editable inputs'],
    ['• Revenue_Model — energy + DAM dispatch'],
    ['• CAPEX — line items with unit rates'],
    ['• OPEX — annual operating costs'],
    ['• P_and_L — 10-year simplified cash flow'],
    ['• DAM_Sensitivity — merchant price scenarios'],
    [],
    ['KEY OUTPUTS (Y1)'],
    [`Total CAPEX €${(C.total / 1e6).toFixed(2)}M | Gross revenue €${Math.round(R.grossRevY1EUR / 1000)}k | FCF €${Math.round(fcfY1 / 1000)}k`],
    [`Cash-on-cash ${(cashYield * 100).toFixed(1)}% | Simple payback ${payback.toFixed(1)} years`],
  ]
  lines.forEach((row, i) => setCell(ws, i + 1, 1, row[0] as string))
  ws['!ref'] = `A1:A${lines.length}`
  ws['!cols'] = [{ wch: 100 }]
  return ws
}

function buildDocumentSources(): XLSX.WorkSheet {
  const rows: (string | number)[][] = [
    ['Parameter', 'Value', 'Source document / method'],
    ['── PART A · SELLER-PROVIDED (Novikov DD, as received) ──', '', ''],
    ['CERA licence', PERMITS.ceraLicence, 'DD package — CERA E3511 Apr 2025'],
    ['Town planning', `${PERMITS.townPlanningMWp} MWp`, `Issued ${PERMITS.townPlanningIssued}`],
    ['Land', PERMITS.landPlot, `Lease executed ${PERMITS.landLeaseExecuted}`],
    ['EAC connection ref', EAC_CONNECTION.reference, EAC_CONNECTION.ddDocuments[0]],
    ['EAC grid works (prelim.)', EAC_CONNECTION.preliminaryGridWorksEUR, 'OCR 498000141 — NOT BINDING'],
    ['EAC deposit paid', EAC_CONNECTION.depositInclVATEUR, `Paid ${EAC_CONNECTION.depositPaidDate}`],
    ['EAC annual telecom', EAC_CONNECTION.annualTelecomEUR, 'Connection terms OCR'],
    ['EAC substation sublease', EAC_CONNECTION.annualSubleaseEUR, 'Connection terms OCR'],
    ['AC export limit', `${EAC_CONNECTION.acExportLimitMW} MW`, EAC_CONNECTION.inverterNote],
    ['Seller PPA (not in LH base)', `$${SELLER_COMMERCIAL.ppaRateUSDPerKwhY1}/kWh`, `${SELLER_COMMERCIAL.ppaStatus}`],
    ['Seller FM total CAPEX', SELLER_COMMERCIAL.novikovTotalCapexEUR, `${SELLER_COMMERCIAL.novikovFmFile} — comparison only`],
    ['Seller equity IRR', `${SELLER_COMMERCIAL.novikovEquityIrrPct}%`, 'Seller model — south-facing, levered'],
    ['── PART B · LIGHTHIEF ANALYSIS (our EPC + merchant model) ──', '', ''],
    ['PV layout', PV_YIELD.layout, `${PV_YIELD.method} ${PV_YIELD.runDate}`],
    ['PV yield (model)', PV_YIELD.modelKwhKwp, PV_YIELD.script],
    ['South 15° reference (not used)', PV_YIELD.southReferenceKwhKwp, 'Permit layout comparison only'],
    ['Curtailment base', `${R.curtailmentPct * 100}%`, 'E-W flatter profile vs 50% south baseline'],
    ['BESS size', `${D.bessPowerMW} MW / ${D.bessMWh} MWh`, `${D.bessDurationHours}h — energy cap 280 cycle days/yr`],
    ['Solar DAM price', DAM.daytimeEURPerMWh, CYPRUS_TSOC_DAM_SAMPLE.sampleNote],
    ['BESS discharge price', R.bessDischargeRateEURPerMWh, `TSOC evening avg 17–21h — ${CYPRUS_TSOC_DAM_SAMPLE.sampleNote}`],
    ['BESS RTE', BESS_DEFAULTS.rteAcAc, 'Galascope 2.5 MW 2025 actual'],
    ['BESS capture', `${(R.bessCapturePct * 100).toFixed(1)}%`, 'Curtailed energy × cap at MWh×280 days'],
    ['PV EPC rate', LH_PRICING.pvEURPerMWp, LH_PRICING.source],
    ['BESS EPC rate', LH_PRICING.bessEURPerMWh, LH_PRICING.source],
    ['RTB acquisition', C.rtbAcquisition, `€${LH_PRICING.rtbPerMWpEUR / 1000}k/MWp × ${D.solarMWp} MWp (RTB incl. connection terms)`],
    ['PV O&M', OPEX_SOURCES.pvOmEURPerMWp, OPEX_SOURCES.pvOmNote],
    ['Land lease', OPEX_SOURCES.landLeaseEUR, OPEX_SOURCES.landLeaseNote],
    ['LH total CAPEX', C.total, 'Lighthief EPC stack (ex VAT)'],
  ]
  const ws = XLSX.utils.aoa_to_sheet(rows)
  ws['!cols'] = [{ wch: 30 }, { wch: 22 }, { wch: 55 }]
  return ws
}

function buildAssumptions(): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {}
  const items: [string, number | string][] = [
    ['Solar MWp', D.solarMWp],
    ['Specific yield kWh/kWp', D.specificYieldKwhPerKwp],
    ['Curtailment %', R.curtailmentPct],
    ['BESS MWh', D.bessMWh],
    ['BESS power MW', D.bessPowerMW],
    ['Solar sell €/MWh', DAM.daytimeEURPerMWh],
    ['BESS discharge €/MWh', R.bessDischargeRateEURPerMWh],
    ['Aggregator fee %', D.finance.aggregatorFeePct],
    ['CIT %', D.finance.citPct],
    ['RTB acquisition €', C.rtbAcquisition],
    ['EAC grid works €', C.connectionTerms],
    ['PV EPC €', C.pvEpc],
    ['BESS EPC €', C.bessEpc],
    ['Total CAPEX €', C.total],
    ['PV O&M €/yr', O.pvOm],
    ['BESS O&M €/yr', O.bessOm],
    ['Land lease €/yr', O.landLease],
    ['EAC fees €/yr', eacFees],
    ['Insurance+admin €/yr', O.other],
  ]
  setCell(ws, 1, 1, 'Assumption')
  setCell(ws, 1, 2, 'Value')
  items.forEach(([k, v], i) => {
    setCell(ws, i + 2, 1, k)
    setCell(ws, i + 2, 2, v as number)
  })
  ws['!ref'] = `A1:B${items.length + 1}`
  ws['!cols'] = [{ wch: 28 }, { wch: 16 }]
  return ws
}

function buildRevenueModel(): XLSX.WorkSheet {
  const annual = D.annualProductionMWh
  const curt = Math.round(annual * R.curtailmentPct)
  const uncurt = R.uncurtailedSolarMWh
  const rows = [
    ['Line', 'MWh/yr', '€/MWh', 'EUR Y1'],
    ['Gross generation', annual, '', ''],
    ['Curtailed', curt, '0 (stored)', 0],
    ['Uncurtailed solar export', uncurt, DAM.daytimeEURPerMWh, R.uncurtailedSolarRevY1EUR],
    ['BESS discharged', R.bessDischargedMWh, R.bessDischargeRateEURPerMWh, R.bessRevY1EUR],
    ['Gross revenue Y1', '', '', R.grossRevY1EUR],
    ['BESS capture %', '', '', R.bessCapturePct],
  ]
  const ws = XLSX.utils.aoa_to_sheet(rows)
  ws['!cols'] = [{ wch: 26 }, { wch: 12 }, { wch: 12 }, { wch: 14 }]
  return ws
}

function buildCapex(): XLSX.WorkSheet {
  const rows = [
    ['Item', 'Qty', 'Unit', 'Unit rate €', 'Total €', 'Source'],
    ['RTB acquisition (incl. connection terms issued)', D.solarMWp, 'MWp', LH_PRICING.rtbPerMWpEUR, C.rtbAcquisition, `€${LH_PRICING.rtbPerMWpEUR / 1000}k/MWp ready-to-build`],
    ['EAC grid infrastructure works', 1, 'lump sum', C.connectionTerms, C.connectionTerms, `OCR ${EAC_CONNECTION.reference} — ${EAC_CONNECTION.preliminaryDisclaimer}`],
    ['PV EPC', D.solarMWp, 'MWp', LH_EPC.pvPerMWp, C.pvEpc, LH_EPC.pvUnitNote],
    ['BESS EPC', D.bessMWh, 'MWh', LH_EPC.bessPerMWh, C.bessEpc, LH_EPC.bessUnitNote],
    ['Total project CAPEX (LIGHTHIEF stack)', '', '', '', C.total, 'Sum — ex VAT'],
    ['', '', '', '', '', ''],
    ['── SELLER MODEL (comparison only, NOT Lighthief) ──', '', '', '', '', ''],
    ['Seller total CAPEX', '', '', '', SELLER_COMMERCIAL.novikovTotalCapexEUR, SELLER_COMMERCIAL.novikovFmFile],
    ['  of which seller dev/licence', '', '', '', SELLER_COMMERCIAL.novikovDevCostEUR, 'Novikov embedded development'],
  ]
  const ws = XLSX.utils.aoa_to_sheet(rows)
  ws['!cols'] = [{ wch: 38 }, { wch: 8 }, { wch: 10 }, { wch: 14 }, { wch: 14 }, { wch: 42 }]
  return ws
}

function buildOpex(): XLSX.WorkSheet {
  const rows = [
    ['Cost line', 'EUR/yr', 'Basis', 'Source'],
    ['PV O&M', O.pvOm, `€${OPEX_SOURCES.pvOmEURPerMWp}/MWp × ${D.solarMWp} MWp`, OPEX_SOURCES.pvOmNote],
    ['BESS O&M', O.bessOm, `€${OPEX_SOURCES.bessOmEURPerMWh}/MWh × ${D.bessMWh} MWh`, OPEX_SOURCES.bessOmNote],
    ['Land lease', O.landLease, 'Annual', OPEX_SOURCES.landLeaseNote],
    ['EAC telecom / metering', EAC_CONNECTION.annualTelecomEUR, 'Per connection terms', '498000141 OCR'],
    ['EAC substation sublease', EAC_CONNECTION.annualSubleaseEUR, 'Per connection terms', '498000141 OCR'],
    ['Insurance + admin + SCADA', O.other, `0.5% CAPEX + €${OPEX_SOURCES.adminEUR} admin`, 'Standard RTB model'],
    ['Total OPEX Y1', totalOpexY1, '', ''],
  ]
  const ws = XLSX.utils.aoa_to_sheet(rows)
  ws['!cols'] = [{ wch: 28 }, { wch: 12 }, { wch: 28 }, { wch: 40 }]
  return ws
}

function buildDamSensitivity(): XLSX.WorkSheet {
  const scenarios = [
    ['Scenario', 'Solar €/MWh', 'BESS €/MWh', 'Gross Y1', 'FCF Y1', 'Cash yield', 'Payback yr'],
    ['Base (TSOC evening avg)', DAM.daytimeEURPerMWh, R.bessDischargeRateEURPerMWh, R.grossRevY1EUR, fcfY1, cashYield, payback],
    ['Upside blended €195 BESS', DAM.daytimeEURPerMWh, BESS_DEFAULTS.dischargePriceEURPerMWh, 0, 0, 0, 0],
    ['Conservative', 120, 165, 0, 0, 0, 0],
    ['Stress', 100, 150, 0, 0, 0, 0],
    ['PPA solar €148 + cautious BESS', 148, 165, 0, 0, 0, 0],
  ]
  for (let i = 2; i <= 5; i++) {
    const s = damScenario(scenarios[i][1] as number, scenarios[i][2] as number)
    scenarios[i][3] = s.gross
    scenarios[i][4] = Math.round(s.fcf)
    scenarios[i][5] = s.yield
    scenarios[i][6] = s.payback
  }
  const ws = XLSX.utils.aoa_to_sheet(scenarios)
  ws['!cols'] = [{ wch: 28 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }]
  return ws
}

function buildPandL(): XLSX.WorkSheet {
  const ws: XLSX.WorkSheet = {}
  setCell(ws, 1, 1, 'Year')
  setCell(ws, 1, 2, 'Gross rev')
  setCell(ws, 1, 3, 'EBITDA')
  setCell(ws, 1, 4, 'Tax')
  setCell(ws, 1, 5, 'FCF')
  setCell(ws, 1, 6, 'Cumulative FCF')
  for (let y = 1; y <= 10; y++) {
    const r = y + 1
    setCell(ws, r, 1, y)
    const g = y === 1 ? R.grossRevY1EUR : Math.round(R.grossRevY1EUR * 0.995)
    const eb = y === 1 ? ebitda : Math.round(ebitda * 0.995)
    const tax = y === 1 ? taxY1 : Math.round(Math.max(0, eb - daYear) * D.finance.citPct)
    const fcf = eb - tax
    setCell(ws, r, 2, g)
    setCell(ws, r, 3, eb)
    setCell(ws, r, 4, tax)
    setCell(ws, r, 5, fcf)
    setFormula(ws, r, 6, y === 1 ? `E${r}` : `F${r - 1}+E${r}`)
  }
  ws['!ref'] = 'A1:F12'
  ws['!cols'] = [{ wch: 8 }, { wch: 12 }, { wch: 12 }, { wch: 10 }, { wch: 12 }, { wch: 14 }]
  return ws
}

function writeWorkbook(outPath: string) {
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, buildCover(), 'Cover')
  XLSX.utils.book_append_sheet(wb, buildDocumentSources(), 'Document_Sources')
  XLSX.utils.book_append_sheet(wb, buildAssumptions(), 'Assumptions')
  XLSX.utils.book_append_sheet(wb, buildRevenueModel(), 'Revenue_Model')
  XLSX.utils.book_append_sheet(wb, buildCapex(), 'CAPEX')
  XLSX.utils.book_append_sheet(wb, buildOpex(), 'OPEX')
  XLSX.utils.book_append_sheet(wb, buildPandL(), 'P_and_L')
  XLSX.utils.book_append_sheet(wb, buildDamSensitivity(), 'DAM_Sensitivity')
  XLSX.writeFile(wb, outPath, { bookType: 'xlsx' })
}

// ── HTML teaser (2 pages, source-heavy) ──────────────────────────────────────

const CSS = `
*{margin:0;padding:0;box-sizing:border-box}
:root{--navy:#1A365D;--gold:#C9A432;--bg:#F0F4F8;--border:#E2E8F0;--text:#1A202C;--muted:#64748B;--green:#059669}
body{font-family:'Segoe UI',system-ui,sans-serif;font-size:9pt;line-height:1.45;color:var(--text);background:#edf2f7;padding:14px}
.page{background:#fff;width:210mm;max-width:100%;margin:0 auto;padding:11mm 13mm;box-shadow:0 4px 16px rgba(0,0,0,.08)}
.page2{margin-top:10px}
.header{display:flex;justify-content:space-between;border-bottom:3px solid var(--navy);padding-bottom:8px;margin-bottom:10px}
h1{font-size:13pt;color:var(--gold);margin:4px 0}
h2{font-size:9.5pt;color:var(--navy);margin:10px 0 4px;border-bottom:1px solid var(--border);padding-bottom:2px}
.sub{font-size:8pt;color:var(--muted)}
.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0}
.metric{background:var(--bg);border:1px solid var(--border);border-radius:4px;padding:7px 5px;text-align:center}
.metric .v{font-size:11pt;font-weight:800;color:var(--navy)}
.metric .l{font-size:6.5pt;color:var(--muted);text-transform:uppercase}
table{width:100%;border-collapse:collapse;font-size:7.5pt;margin:4px 0}
th{background:var(--navy);color:#fff;padding:4px 6px;text-align:left}
td{padding:3px 6px;border-bottom:1px solid var(--border)}
td.r{text-align:right}
tr.total td{font-weight:700;background:#f8fafc}
tr.src td{font-size:6.5pt;color:var(--muted)}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.box{background:var(--bg);border-left:3px solid var(--gold);padding:6px 8px;font-size:7pt;margin:6px 0}
.foot{font-size:6pt;color:var(--muted);margin-top:8px;border-top:1px solid var(--border);padding-top:6px}
.band{display:flex;justify-content:space-between;align-items:center;padding:5px 9px;border-radius:4px;margin:10px 0 6px;font-size:8.5pt;font-weight:700}
.band .tag{font-size:6pt;font-weight:700;text-transform:uppercase;letter-spacing:.4px;padding:1px 6px;border-radius:8px}
.band-seller{background:#EDF1F5;color:#475569;border:1px solid #CBD5E1}
.band-seller .tag{background:#475569;color:#fff}
.band-lh{background:var(--navy);color:#fff}
.band-lh .tag{background:var(--gold);color:#1A365D}
.seller-zone{border:1px solid #CBD5E1;border-radius:5px;padding:0 9px 7px;background:#FAFBFC}
.lh-zone{border:1px solid var(--navy);border-radius:5px;padding:0 9px 7px;background:#fff}
.seller-zone h2{color:#475569;border-bottom-color:#CBD5E1}
.lh-zone h2{color:var(--navy)}
.seller-zone th{background:#64748B}
.legend{display:flex;gap:14px;font-size:6.5pt;color:var(--muted);margin:4px 0 0}
.legend span{display:inline-flex;align-items:center;gap:4px}
.dot{width:8px;height:8px;border-radius:2px;display:inline-block}
.dot-seller{background:#64748B}
.dot-lh{background:var(--navy);border:1px solid var(--gold)}
@media print{body{background:#fff;padding:0}.page{box-shadow:none;margin:0}.page2{page-break-before:always}}
`

function eur(n: number) {
  return n >= 1e6 ? `€${(n / 1e6).toFixed(2)}M` : `€${Math.round(n / 1000)}K`
}

function renderTeaser(): string {
  const damUpside = damScenario(DAM.daytimeEURPerMWh, BESS_DEFAULTS.dischargePriceEURPerMWh)
  const damCons = damScenario(120, 165)
  const ppaEur = Math.round(SELLER_COMMERCIAL.ppaRateUSDPerKwhY1 * 1000 * 0.93) // $0.16/kWh → ~€149/MWh

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<title>Sia Solar Park + BESS — Investor Pack | ${D.referenceCode}</title>
<style>${CSS}</style></head><body>

<div class="page">
  <div class="header">
    <div><strong style="color:var(--navy);font-size:12pt">Lighthief Cyprus</strong><div class="sub">Hybrid Solar + BESS — Cyprus</div></div>
    <div class="sub" style="text-align:right"><strong>INVESTOR PACK</strong><br>${D.referenceCode}<br>Confidential — ${new Date().toISOString().slice(0, 10)}</div>
  </div>

  <h1>Sia Solar Park with Battery Storage</h1>
  <div class="sub">${D.locationLine} · ${PERMITS.landPlot} · ${D.solarMWp} MWp / ${D.bessMWh} MWh BESS (${D.bessDurationHours}h) · 100% equity</div>
  <div class="legend">
    <span><span class="dot dot-seller"></span> Seller package (Novikov DD, as received — verified facts)</span>
    <span><span class="dot dot-lh"></span> Lighthief independent EPC &amp; merchant analysis (our work)</span>
  </div>

  <div class="metrics">
    <div class="metric"><div class="v">${eur(C.total)}</div><div class="l">Total CAPEX ex VAT (LH)</div></div>
    <div class="metric"><div class="v">${eur(R.grossRevY1EUR)}</div><div class="l">Gross Y1 revenue (LH)</div></div>
    <div class="metric"><div class="v">${(cashYield * 100).toFixed(1)}%</div><div class="l">Y1 cash-on-cash (LH)</div></div>
    <div class="metric"><div class="v">${payback.toFixed(1)} yr</div><div class="l">Simple payback (LH)</div></div>
  </div>

  <div class="band band-seller"><span>PART A · Seller package — Novikov due-diligence (received 9 May 2026)</span><span class="tag">Verified facts</span></div>
  <div class="seller-zone">
  <div class="two-col">
    <div>
      <h2>Permits &amp; land (as licensed)</h2>
      <table>
        <tr><th>Item</th><th>Status / ref</th></tr>
        <tr><td>CERA generation licence</td><td>${PERMITS.ceraLicence} — issued ${PERMITS.ceraIssued}</td></tr>
        <tr><td>Town planning</td><td>${PERMITS.townPlanningMWp} MWp — ${PERMITS.townPlanningIssued}</td></tr>
        <tr><td>Land</td><td>${PERMITS.landPlot}</td></tr>
        <tr><td>Land lease</td><td>Executed ${PERMITS.landLeaseExecuted}</td></tr>
        <tr><td>Environmental</td><td>${PERMITS.environmentalForm}</td></tr>
      </table>
    </div>
    <div>
      <h2>EAC grid connection (ref ${EAC_CONNECTION.reference})</h2>
      <table>
        <tr><th>Parameter</th><th class="r">Value</th></tr>
        <tr><td>Preliminary terms issued</td><td class="r">${EAC_CONNECTION.preliminaryTermsDate}</td></tr>
        <tr><td>Acceptance + 5% deposit paid</td><td class="r">${EAC_CONNECTION.depositPaidDate}</td></tr>
        <tr><td>Deposit (incl. 19% VAT)</td><td class="r">€${EAC_CONNECTION.depositInclVATEUR.toLocaleString('en')}</td></tr>
        <tr><td>Grid infrastructure (prelim.)</td><td class="r"><strong>€${EAC_CONNECTION.preliminaryGridWorksRoundedEUR.toLocaleString('en')}</strong></td></tr>
        <tr><td>Voltage / licensed / AC export</td><td class="r">${EAC_CONNECTION.voltageKv} kV / ${EAC_CONNECTION.licensedMWp} MWp / ${EAC_CONNECTION.acExportLimitMW} MW</td></tr>
        <tr><td>Annual EAC fees (telecom + sublease)</td><td class="r">€${eacFees}/yr</td></tr>
        <tr class="src"><td colspan="2">${EAC_CONNECTION.preliminaryDisclaimer}</td></tr>
      </table>
    </div>
  </div>
  </div>

  <div class="band band-lh"><span>PART B · Lighthief independent analysis — technology &amp; build cost</span><span class="tag">Our EPC</span></div>
  <div class="lh-zone">
  <div class="two-col">
    <div>
      <h2>Technology &amp; yield (Lighthief design)</h2>
      <table>
        <tr><th>Parameter</th><th class="r">Value</th></tr>
        <tr><td>PV layout (build design)</td><td class="r"><strong>Bifacial E–W 10°</strong></td></tr>
        <tr><td>Modules (645W) / row spacing</td><td class="r">~${PV_SITE.moduleCountAtModel} / ${PV_SITE.rowSpacingM} m</td></tr>
        <tr><td>Yield used (PVGIS ${PV_YIELD.runDate})</td><td class="r"><strong>${PV_YIELD.modelKwhKwp} kWh/kWp</strong></td></tr>
        <tr><td>Curtailment base case</td><td class="r">${Math.round(R.curtailmentPct * 100)}%</td></tr>
        <tr><td>BESS (Lighthief sizing)</td><td class="r">${D.bessPowerMW} MW / ${D.bessMWh} MWh (${D.bessDurationHours}h)</td></tr>
        <tr><td>Annual generation</td><td class="r">${D.annualProductionMWh.toLocaleString('en')} MWh</td></tr>
        <tr class="src"><td colspan="2">${PV_SITE.rowSpacingNote}. South 15° permit layout = ${PV_YIELD.southReferenceKwhKwp} kWh/kWp (not used — comparison only).</td></tr>
      </table>
    </div>
    <div>
      <h2>CAPEX — Lighthief quoted rates (ex VAT)</h2>
      <table>
        <tr><th>Item</th><th class="r">EUR</th></tr>
        <tr><td>RTB acquisition (${D.solarMWp} × €${(LH_PRICING.rtbPerMWpEUR / 1000).toFixed(0)}k/MWp)</td><td class="r">${C.rtbAcquisition.toLocaleString('en')}</td></tr>
        <tr><td>EAC grid works (seller prelim.)</td><td class="r">${C.connectionTerms.toLocaleString('en')}</td></tr>
        <tr><td>PV EPC (${D.solarMWp} × €${(LH_EPC.pvPerMWp / 1000).toFixed(0)}k/MWp)</td><td class="r">${C.pvEpc.toLocaleString('en')}</td></tr>
        <tr><td>BESS EPC (${D.bessMWh} × €${(LH_EPC.bessPerMWh / 1000).toFixed(0)}k/MWh)</td><td class="r">${C.bessEpc.toLocaleString('en')}</td></tr>
        <tr class="total"><td><strong>Total (Lighthief stack)</strong></td><td class="r"><strong>${C.total.toLocaleString('en')}</strong></td></tr>
        <tr class="src"><td colspan="2">Lighthief EPC v4 Feb 2026. Seller's own model: €${(SELLER_COMMERCIAL.novikovTotalCapexEUR / 1e6).toFixed(2)}M incl. €${(SELLER_COMMERCIAL.novikovDevCostEUR / 1e6).toFixed(1)}M dev (see Part C).</td></tr>
      </table>
    </div>
  </div>
  </div>
  <div class="foot">${CONTACT.companyName} (${CONTACT.companyNumber}) · Page 1 of 2 · ${D.referenceCode}</div>
</div>

<div class="page page2">
  <div class="header">
    <div><strong style="color:var(--navy)">Lighthief Cyprus</strong></div>
    <div class="sub" style="text-align:right">Revenue, DAM &amp; returns · ${D.referenceCode}</div>
  </div>

  <div class="band band-lh"><span>PART B · Lighthief independent analysis — merchant revenue &amp; returns</span><span class="tag">Our model</span></div>
  <div class="lh-zone">
  <div class="two-col">
    <div>
      <h2>Revenue model Y1 (merchant DAM base case)</h2>
      <table>
        <tr><th>Source</th><th class="r">MWh</th><th class="r">€/MWh</th><th class="r">EUR</th></tr>
        <tr><td>Solar uncurtailed (${Math.round(R.curtailmentPct * 100)}% curt.)</td><td class="r">${R.uncurtailedSolarMWh.toLocaleString('en')}</td><td class="r">${R.uncurtailedSolarRateEURPerMWh.toFixed(2)}</td><td class="r">${R.uncurtailedSolarRevY1EUR.toLocaleString('en')}</td></tr>
        <tr><td>BESS discharge</td><td class="r">${R.bessDischargedMWh.toLocaleString('en')}</td><td class="r">${R.bessDischargeRateEURPerMWh}</td><td class="r">${R.bessRevY1EUR.toLocaleString('en')}</td></tr>
        <tr class="total"><td><strong>Gross Y1</strong></td><td class="r"></td><td class="r"></td><td class="r"><strong>${R.grossRevY1EUR.toLocaleString('en')}</strong></td></tr>
      </table>
      <div class="box">Solar price = TSOC DAM daytime avg (${CYPRUS_TSOC_DAM_SAMPLE.sampleNote}). BESS discharge = TSOC measured evening avg €${R.bessDischargeRateEURPerMWh}/MWh (17–21h). RTE ${(BESS_DEFAULTS.rteAcAc * 100).toFixed(2)}% (Galascope 2025).</div>

      <h2>DAM price sensitivity</h2>
      <table>
        <tr><th>Scenario</th><th class="r">Gross</th><th class="r">FCF</th><th class="r">Yield</th><th class="r">Payback</th></tr>
        <tr class="total"><td><strong>Base (TSOC evening avg)</strong></td><td class="r">${eur(R.grossRevY1EUR)}</td><td class="r">${eur(fcfY1)}</td><td class="r">${(cashYield * 100).toFixed(1)}%</td><td class="r">${payback.toFixed(1)} yr</td></tr>
        <tr><td>Upside €195 BESS discharge</td><td class="r">${eur(damUpside.gross)}</td><td class="r">${eur(damUpside.fcf)}</td><td class="r">${(damUpside.yield * 100).toFixed(1)}%</td><td class="r">${damUpside.payback.toFixed(1)} yr</td></tr>
        <tr><td>Conservative €120 / €165</td><td class="r">${eur(damCons.gross)}</td><td class="r">${eur(damCons.fcf)}</td><td class="r">${(damCons.yield * 100).toFixed(1)}%</td><td class="r">${damCons.payback.toFixed(1)} yr</td></tr>
      </table>
    </div>
    <div>
      <h2>Y1 P&amp;L (100% equity)</h2>
      <table>
        <tr><th>Line</th><th class="r">EUR</th></tr>
        <tr><td>Gross revenue</td><td class="r">${R.grossRevY1EUR.toLocaleString('en')}</td></tr>
        <tr><td>Aggregator (10%)</td><td class="r">−${Math.round(aggFee).toLocaleString('en')}</td></tr>
        <tr><td>OPEX (incl. EAC €${eacFees}/yr)</td><td class="r">−${Math.round(totalOpexY1).toLocaleString('en')}</td></tr>
        <tr><td>EBITDA</td><td class="r">${Math.round(ebitda).toLocaleString('en')}</td></tr>
        <tr><td>CIT 15% (after D&amp;A)</td><td class="r">−${taxY1.toLocaleString('en')}</td></tr>
        <tr class="total"><td><strong>Free cash flow Y1</strong></td><td class="r"><strong>${Math.round(fcfY1).toLocaleString('en')}</strong></td></tr>
      </table>

      <h2>OPEX detail (Lighthief)</h2>
      <table>
        <tr><th>Item</th><th class="r">€/yr</th><th>Source</th></tr>
        <tr><td>PV O&M (€${OPEX_SOURCES.pvOmEURPerMWp / 1000}k/MWp)</td><td class="r">${O.pvOm.toLocaleString('en')}</td><td>LH assumption</td></tr>
        <tr><td>BESS O&M</td><td class="r">${O.bessOm.toLocaleString('en')}</td><td>€${OPEX_SOURCES.bessOmEURPerMWh}/MWh</td></tr>
        <tr><td>Land lease</td><td class="r">${O.landLease.toLocaleString('en')}</td><td>INDICATIVE — deed not OCR'd</td></tr>
        <tr><td>EAC fees</td><td class="r">${eacFees}</td><td>498000141 OCR</td></tr>
        <tr><td>Insurance + admin</td><td class="r">${O.other.toLocaleString('en')}</td><td>0.5% CAPEX</td></tr>
      </table>
    </div>
  </div>
  </div>

  <div class="band band-seller"><span>PART C · Seller's own financial model — for comparison only (NOT Lighthief)</span><span class="tag">Seller claim</span></div>
  <div class="seller-zone">
  <table>
    <tr><th>Seller metric (${SELLER_COMMERCIAL.novikovFmFile})</th><th class="r">Value</th><th>Lighthief note</th></tr>
    <tr><td>Total CAPEX</td><td class="r">€${(SELLER_COMMERCIAL.novikovTotalCapexEUR / 1e6).toFixed(2)}M</td><td>incl. €${(SELLER_COMMERCIAL.novikovDevCostEUR / 1e6).toFixed(1)}M development; LH EPC stack = €${(C.total / 1e6).toFixed(2)}M</td></tr>
    <tr><td>Offtake basis</td><td class="r">PPA $${SELLER_COMMERCIAL.ppaRateUSDPerKwhY1}/kWh (~€${ppaEur}/MWh)</td><td>Synenergia ${SELLER_COMMERCIAL.ppaStatus}; LH base = merchant DAM</td></tr>
    <tr><td>Equity IRR (levered, 30yr)</td><td class="r">${SELLER_COMMERCIAL.novikovEquityIrrPct}%</td><td>seller south-facing + leverage; LH base = ${(cashYield * 100).toFixed(1)}% cash yield, 100% equity</td></tr>
    <tr class="src"><td colspan="3">${SELLER_COMMERCIAL.novikovNote}. Shown so the investor can see seller assumptions vs Lighthief's conservative independent analysis.</td></tr>
  </table>
  </div>

  <div class="box" style="margin-top:6px">
    <strong>Excel model included:</strong> ${SHIA_SIA_INVESTOR_PACK.modelFile} — the <em>Document_Sources</em> sheet separates SELLER-PROVIDED (Novikov DD) inputs from LIGHTHIEF ANALYSIS line by line.
  </div>

  <div class="foot">
    Non-binding indicative summary. Not a prospectus. ${CONTACT.director} · ${CONTACT.directorPhone} · ${CONTACT.email} · ${CONTACT.website}<br>
    ${CONTACT.companyName} (${CONTACT.companyNumber}) · ${CONTACT.address} · Page 2 of 2
  </div>
</div>
</body></html>`
}

function writeSourcesMd(outPath: string) {
  const md = `# Shia-Sia Investor Pack — Document Sources

> ${D.referenceCode} · Generated ${new Date().toISOString().slice(0, 10)}

## DD package (Novikov, received 9 May 2026)

| Document | Key figures used |
|----------|------------------|
| \`498000141_Grid_Connection_Terms_SIA.pdf\` | Grid works **€83,842.14** ex VAT (preliminary); deposit **€4,988.61** incl. VAT paid 22 Feb 2023 |
| \`Scan_Grid_Connection_Terms_5__SIA.pdf\` | Amendment 5 (Jun 2025) |
| CERA licence | **E3511** (Apr 2025) |
| Town planning | **3.32 MWp** issued 5 May 2025 |
| Land lease | Plot 316 executed May 2025 — **annual rent not OCR'd** (€18k model = INDICATIVE) |
| PPA draft Synenergia | **$0.16/kWh Y1** — not executed; shown as comparison only |
| \`FM_3,2MW_250126_BESS.xlsx\` | Seller €4.78M CAPEX — comparison only |

## Lighthief pricing

| Item | Rate | Source |
|------|------|--------|
| PV EPC | €720,000/MWp | \`lib/deals/rtb-deal-types.ts\` / v4 workbook |
| BESS EPC | €127,000/MWh | Same |
| RTB | €600,000 | \`RTB_COSTS.withConnectionTerms\` |

## Market data

| Item | Value | Source |
|------|-------|--------|
| Solar sell | €140.88/MWh | TSOC DAM daytime 06–17h |
| BESS discharge | €${DAM.peakEveningEURPerMWh}/MWh | TSOC evening avg 17–21h (${CYPRUS_TSOC_DAM_SAMPLE.sampleNote}) |
| Sample | 134 days | 1 Oct 2025 – 11 Feb 2026 |

## Yield

PVGIS E–W 10° run → **1,480 kWh/kWp** (\`pvgis-yield-shia-sia.json\`)
`
  fs.writeFileSync(outPath, md, 'utf8')
}

function main() {
  const root = process.cwd()
  const publicDir = path.join(root, SHIA_SIA_INVESTOR_PACK.outputDir)
  const internalDir = path.join(root, SHIA_SIA_INVESTOR_PACK.internalDir)
  fs.mkdirSync(publicDir, { recursive: true })
  fs.mkdirSync(internalDir, { recursive: true })

  const modelPath = path.join(publicDir, SHIA_SIA_INVESTOR_PACK.modelFile)
  const teaserPath = path.join(publicDir, SHIA_SIA_INVESTOR_PACK.teaserFile)
  const sourcesPath = path.join(internalDir, SHIA_SIA_INVESTOR_PACK.sourcesFile)

  // HTML + sources first so a locked workbook never blocks the rest
  fs.writeFileSync(teaserPath, renderTeaser(), 'utf8')
  writeSourcesMd(sourcesPath)
  fs.copyFileSync(teaserPath, path.join(internalDir, SHIA_SIA_INVESTOR_PACK.teaserFile))

  let xlsxOk = true
  try {
    writeWorkbook(modelPath)
    fs.copyFileSync(modelPath, path.join(internalDir, SHIA_SIA_INVESTOR_PACK.modelFile))
  } catch (e: unknown) {
    const err = e as NodeJS.ErrnoException
    if (err.code === 'EBUSY' || err.code === 'EPERM') {
      xlsxOk = false
      console.warn(`\n  ⚠ Excel workbook is OPEN/locked — skipped: ${modelPath}`)
      console.warn(`    Close the file in Excel and re-run "npm run pack:shia-sia" to refresh the model.`)
    } else {
      throw e
    }
  }

  console.log(`\nShia-Sia investor pack generated`)
  console.log(`  CAPEX ${eur(C.total)} | Gross Y1 ${eur(R.grossRevY1EUR)} | FCF Y1 ${eur(fcfY1)} | ${(cashYield * 100).toFixed(1)}% yield | ${payback.toFixed(1)} yr payback`)
  console.log(`  → ${teaserPath}`)
  console.log(`  → ${sourcesPath}`)
  console.log(`  → ${modelPath}${xlsxOk ? '' : '  (SKIPPED — file locked)'}\n`)
}

main()
