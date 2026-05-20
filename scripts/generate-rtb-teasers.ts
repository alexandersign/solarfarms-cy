/**
 * Universal RTB investor teaser generator — 2-page A4 HTML.
 * Loops all RTB deal data files and outputs one teaser per project.
 *
 * Output: public/lighthief-cyprus/teasers/{slug}/{slug}-teaser.html
 *         docs/teasers/{slug}-teaser.html  (internal copy)
 *
 * Run: npx tsx scripts/generate-rtb-teasers.ts
 *
 * To add a new project:
 *   1. Create lib/deals/{project}-rtb.ts following the RtbDeal interface
 *   2. Import and add to ALL_DEALS below
 *   3. Re-run this script
 */

import * as fs from 'fs'
import * as path from 'path'
import type { RtbDeal } from '../lib/deals/rtb-deal-types'
import { DAM, LH_EPC, BESS_DEFAULTS, investorPackForDeal, computeRevenueModel } from '../lib/deals/rtb-deal-types'
import { COMPANY_DATA } from '../lib/constants'

// ── Contact shortcuts (SSOT: lib/constants.ts) ──────────────────────────────
const CONTACT = {
  companyName: COMPANY_DATA.name,
  companyNumber: COMPANY_DATA.registration.companyNumber,
  officeEmail: COMPANY_DATA.email,                                  // office@lighthief.com
  officePhone: COMPANY_DATA.phone,                                  // +357 77 77 00 50
  website: 'solarfarms.cy',
  director: COMPANY_DATA.contacts.cyprusDirector.name,              // Alexander Papacosta
  directorTitle: COMPANY_DATA.contacts.cyprusDirector.title,        // Cyprus Director
  directorPhone: COMPANY_DATA.contacts.cyprusDirector.phone,        // +357 99 164 158
  directorEmail: COMPANY_DATA.contacts.cyprusDirector.email,        // office@lighthief.com
  address: COMPANY_DATA.address.office.full,
} as const

import { ALL_RTB_DEALS as ALL_DEALS } from '../lib/deals/rtb-deals-registry'

// ── Embed logo as base64 so HTML works offline / in email ────────────────────
const LOGO_PATH = path.join(process.cwd(), 'public', 'images', 'logo', 'lighthief-logo-200.png')
const LOGO_B64 = fs.existsSync(LOGO_PATH)
  ? `data:image/png;base64,${fs.readFileSync(LOGO_PATH).toString('base64')}`
  : ''  // fallback: empty src (shows alt text)

// ── Helpers ──────────────────────────────────────────────────────────────────

function e(s: string | number): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function eurM(n: number, dp = 2): string {
  if (n >= 1_000_000) return `&euro;${(n / 1e6).toFixed(dp)}M`
  return `&euro;${Math.round(n / 1000)}K`
}

function eurK(n: number): string {
  return `&euro;${Math.round(n / 1000).toLocaleString('en')}K`
}

function pct(n: number, dp = 0): string {
  return `${(n * 100).toFixed(dp)}%`
}

/** Compute annuity payment */
function annuityPmt(pv: number, rate: number, years: number): number {
  const r = rate
  return pv * (r * Math.pow(1 + r, years)) / (Math.pow(1 + r, years) - 1)
}

/** Y1 net cash to equity (EBITDA minus debt service, approximate) */
function y1CashToEquity(deal: RtbDeal): number {
  const c = deal.capex
  const f = deal.finance
  const rv = deal.revenueModel
  const op = deal.opexY1
  const netRev = rv.grossRevY1EUR * (1 - f.aggregatorFeePct)
  const ebitda = netRev - (op.pvOm + op.bessOm + op.landLease + op.other)
  const debtService = annuityPmt(f.seniorDebtEUR, f.loanNominalRate, f.loanTermYears)
  return Math.max(0, ebitda - debtService)
}

function statusBadge(deal: RtbDeal): string {
  const grid =
    deal.gridConnectionStatus === 'final_issued'
      ? { label: 'Connection terms issued', cls: 'badge-green' }
      : { label: 'Connection terms pending', cls: 'badge-amber' }
  return `<span class="badge ${grid.cls}">${grid.label}</span>`
}

/** Compute revenue at alternate curtailment levels for sensitivity table */
function revAtCurtailment(deal: RtbDeal, curtPct: number): { gross: number; solarRev: number; bessRev: number } {
  const rv = computeRevenueModel({
    solarMWp: deal.solarMWp,
    specificYieldKwhPerKwp: deal.specificYieldKwhPerKwp,
    curtailmentPct: curtPct,
    bessCapacityMWh: deal.bessMWh,
  })
  return { gross: rv.grossRevY1EUR, solarRev: rv.uncurtailedSolarRevY1EUR, bessRev: rv.bessRevY1EUR }
}

/** Indicative IRR shift vs base (simplified linear approximation) */
function irrAtCurtailment(deal: RtbDeal, curtPct: number): string {
  const base = deal.revenueModel.grossRevY1EUR
  const alt = revAtCurtailment(deal, curtPct).gross
  const delta = (alt - base) / base   // revenue change ratio
  // Each 1% revenue change ≈ 0.3% IRR shift (rule of thumb for levered solar)
  const baseIrrMid = 18   // midpoint of ~16-20%
  const shiftedMid = Math.round(baseIrrMid + delta * 100 * 0.3)
  const lo = Math.max(10, shiftedMid - 2)
  const hi = shiftedMid + 2
  return `~${lo}–${hi}%`
}

// ── Shared CSS ────────────────────────────────────────────────────────────────

const CSS = `
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --navy:#1A365D;--gold:#C9A432;--navy-light:#2B5FA0;
  --bg:#F0F4F8;--border:#e2e8f0;--text:#1a202c;--muted:#64748b;
  --green:#059669;--amber:#d97706
}
body{font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,sans-serif;font-size:9pt;line-height:1.5;color:var(--text);background:#edf2f7;padding:16px}
.page{background:#fff;width:210mm;max-width:100%;margin:0 auto 0;padding:12mm 14mm;box-shadow:0 4px 16px rgba(0,0,0,.08)}
.page2{margin-top:8px}

/* Header */
.header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid var(--navy);padding-bottom:8px;margin-bottom:12px}
.logo-img{height:36px;width:auto;display:block}
.logo-fallback{font-size:14pt;font-weight:900;color:var(--navy);letter-spacing:-0.5px}
.tagline{font-size:7pt;color:var(--muted);margin-top:1px}
.doc-info{text-align:right;font-size:7pt;color:var(--muted);line-height:1.6}

/* Title */
h1{font-size:12.5pt;color:var(--navy);margin:8px 0 2px;font-weight:800}
.location{font-size:9pt;color:var(--navy-light);font-weight:600;margin-bottom:3px}
.permit-line{font-size:7.5pt;color:var(--muted);margin-bottom:6px;line-height:1.5}

/* Status badge */
.badge{display:inline-block;padding:2px 10px;border-radius:12px;font-size:7pt;font-weight:700;text-transform:uppercase;letter-spacing:.4px;margin-bottom:8px}
.badge-green{background:#dcfce7;color:#166534}
.badge-amber{background:#fef9c3;color:#92400e}

/* Metric grids */
.metric-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0 4px}
.metric-box{background:var(--bg);border:1px solid var(--border);border-radius:5px;padding:8px 5px;text-align:center}
.metric-box.solar{border-color:#f59e0b;background:#fffbeb}
.metric-box.solar .val{color:#b45309}
.metric-box.bess{border-color:var(--navy-light);background:#eff6ff}
.metric-box.bess .val{color:var(--navy-light)}
.metric-box.gross{border-color:var(--green);background:#ecfdf5}
.metric-box.gross .val{color:var(--green)}
.metric-box.accent{border-color:var(--navy);background:#eff6ff}
.metric-box.accent .val{color:var(--navy)}
.metric-box.gold{border-color:var(--gold);background:#fefce8}
.metric-box.gold .val{color:#92400e}
.metric-box .val{font-size:13.5pt;font-weight:800;color:var(--navy)}
.metric-box .lbl{font-size:6pt;color:var(--muted);text-transform:uppercase;margin-top:2px;letter-spacing:.3px}
.metric-box .sub-lbl{font-size:5.5pt;color:var(--muted);margin-top:1px}

/* Section headings */
h2{font-size:9.5pt;color:var(--navy);margin:10px 0 4px;border-bottom:2px solid var(--gold);padding-bottom:2px;display:inline-block;font-weight:700}
h3{font-size:8.5pt;color:var(--navy);margin:8px 0 3px;font-weight:700}

/* Tables */
table{width:100%;border-collapse:collapse;font-size:7.5pt;margin:3px 0 7px}
th{background:var(--navy);color:#fff;padding:4px 6px;text-align:left;font-size:7pt;font-weight:600}
th.r,td.r{text-align:right}
td{padding:3.5px 6px;border-bottom:1px solid var(--border)}
tr:last-child td{border-bottom:none}
.total-row td{background:var(--navy);color:#fff;font-weight:700;border:none}
.solar-row td{background:#fffbeb;color:#92400e}
.bess-row td{background:#eff6ff;color:#1e40af}
.subtotal-row td{background:#f1f5f9;font-weight:600;border-top:1px solid var(--border)}
.highlight-row td{background:#f0fdf4;color:#166534;font-weight:600}
.note{font-size:7pt;color:var(--muted);margin:2px 0 5px;line-height:1.4}

/* Callout / disclaimer */
.box{background:#eff6ff;border:1px solid #bfdbfe;border-radius:5px;padding:8px 10px;margin:6px 0;font-size:7pt;line-height:1.5}
.box.warn{background:#fefce8;border-color:#fde68a}

/* 2-col layout */
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:0}
.two-col-wide{display:grid;grid-template-columns:3fr 2fr;gap:12px}

/* Footnote + footer */
.footnote{font-size:6.5pt;color:var(--muted);margin:3px 0}
.footer{margin-top:10px;padding-top:7px;border-top:2px solid var(--navy);font-size:6.5pt;color:var(--muted);text-align:center}
.page-label{font-size:6.5pt;color:var(--muted);text-align:right;margin-bottom:4px}

/* Risk pill */
.risk-pill{display:inline-block;padding:1px 7px;border-radius:10px;font-size:6.5pt;font-weight:600;margin:1px 2px}
.risk-low{background:#dcfce7;color:#166534}
.risk-med{background:#fef9c3;color:#92400e}
.risk-high{background:#fee2e2;color:#991b1b}

/* Print */
.print-btn{position:fixed;top:12px;right:12px;background:var(--navy);color:#fff;border:none;padding:8px 14px;border-radius:5px;cursor:pointer;z-index:100;font-size:12px}
@media print{
  .print-btn{display:none}
  html,body{background:#fff;padding:0}
  .page{box-shadow:none;padding:10mm 12mm;margin:0;max-width:none;width:auto}
  .page2{margin-top:0}
  .page-break{page-break-before:always}
}
`

// ── Header HTML (shared) ──────────────────────────────────────────────────────

function headerHtml(deal: RtbDeal, page: number, totalPages: number): string {
  const logoHtml = LOGO_B64
    ? `<img class="logo-img" src="${LOGO_B64}" alt="Lighthief Cyprus">`
    : `<div class="logo-fallback">Lighthief</div>`
  return `
  <div class="header">
    <div>
      ${logoHtml}
      <div class="tagline">Hybrid Solar + BESS &mdash; Cyprus</div>
    </div>
    <div class="doc-info">
      <strong>INVESTOR TEASER</strong> &mdash; Page ${page}/${totalPages}<br>
      ${e(deal.referenceCode)}<br>
      Confidential &mdash; ${new Date(deal._meta.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
    </div>
  </div>`
}

// ── Main HTML renderer ────────────────────────────────────────────────────────

function renderTeaser(deal: RtbDeal): string {
  const c = deal.capex
  const f = deal.finance
  const rv = deal.revenueModel
  const op = deal.opexY1
  const totalOpexY1 = op.pvOm + op.bessOm + op.landLease + op.other
  const netRevY1 = rv.grossRevY1EUR * (1 - f.aggregatorFeePct)
  const ebitdaY1 = netRevY1 - totalOpexY1
  // 100% equity — no debt; estimate D&A for tax shield (PV+BESS over 20yr, RTB over 15yr)
  const bessEpcBase = c.bessEpc
  const pvEpcBase   = c.pvEpc
  const daYear = Math.round((pvEpcBase + bessEpcBase) / 20 + c.rtbAcquisition / 15)
  const taxableIncome = Math.max(0, ebitdaY1 - daYear)
  const taxY1 = Math.round(taxableIncome * f.citPct)
  const cashToEq = ebitdaY1 - taxY1  // FCF = EBITDA - tax (no debt service)
  const cashYield = cashToEq / f.equityEUR
  const dscr = 0  // n/a — 100% equity

  // Sensitivity curtailment scenarios
  const upside  = revAtCurtailment(deal, Math.max(0.25, deal.revenueModel.curtailmentPct - 0.15))
  const base    = { gross: rv.grossRevY1EUR, solarRev: rv.uncurtailedSolarRevY1EUR, bessRev: rv.bessRevY1EUR }
  const downside = revAtCurtailment(deal, Math.min(0.75, deal.revenueModel.curtailmentPct + 0.15))

  const upsideCurt   = Math.max(0.25, deal.revenueModel.curtailmentPct - 0.15)
  const downsideCurt = Math.min(0.75, deal.revenueModel.curtailmentPct + 0.15)

  // Equity ticket sizes
  const tickets = [0.25, 0.50, 1.00]

  // Grid connection status for timeline row
  const gridMap: Record<string, { pill: string; label: string }> = {
    final_issued:      { pill: 'risk-low',  label: 'Final terms issued' },
    preliminary_filed: { pill: 'risk-med',  label: 'Prelim. filed — offer expected Q3 2026' },
    pending_upgrade:   { pill: 'risk-high', label: 'Pending area grid upgrade (TSO est. Q4 2026)' },
    not_filed:         { pill: 'risk-high', label: 'Not yet filed' },
  }
  const gridDisplay = gridMap[deal.gridConnectionStatus] ?? { pill: 'risk-med', label: 'Status TBC' }

  // Financial close note — varies by grid status
  const financialCloseLabel = deal.gridConnectionStatus === 'pending_upgrade'
    ? 'Conditional on grid upgrade (ETA Q4 2026)'
    : deal.gridConnectionStatus === 'preliminary_filed'
    ? 'Upon EAC offer (expected Q3 2026)'
    : 'Q3–Q4 2026 (upon final steps)'

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${e(deal.publicTitle)} &mdash; ${e(deal.referenceCode)} | Lighthief Cyprus</title>
<style>${CSS}</style>
</head>
<body>
<button class="print-btn" type="button" onclick="window.print()">Print / PDF</button>

<!-- ════════════════════════════════ PAGE 1 ════════════════════════════════ -->
<div class="page">
  ${headerHtml(deal, 1, 2)}

  <!-- Title block -->
  <h1>${e(deal.publicTitle)}</h1>
  <div class="location">${e(deal.locationLine)}</div>
  <div>${statusBadge(deal)}</div>
  <div class="permit-line">${e(deal.permitSummary)}</div>

  <!-- Headline KPIs -->
  <div class="metric-grid">
    <div class="metric-box"><div class="val">${deal.solarMWp} MWp</div><div class="lbl">PV capacity</div><div class="sub-lbl">${e(deal.technologySolar.split(',')[0])}</div></div>
    <div class="metric-box"><div class="val">${deal.bessMWh} MWh</div><div class="lbl">BESS (${deal.bessDurationHours}h)</div><div class="sub-lbl">LFP &middot; ${deal.bessPowerMW} MW</div></div>
    <div class="metric-box"><div class="val">${eurM(c.total)}</div><div class="lbl">Total CAPEX</div><div class="sub-lbl">ex VAT</div></div>
    <div class="metric-box accent"><div class="val">${e(f.leveredEquityIrrIndicative)}</div><div class="lbl">Lev. equity IRR</div><div class="sub-lbl">indicative &dagger;</div></div>
  </div>

  <!-- Revenue KPIs -->
  <div class="metric-grid">
    <div class="metric-box"><div class="val">${(deal.annualProductionMWh / 1000).toFixed(2)} GWh</div><div class="lbl">Annual production</div><div class="sub-lbl">${deal.specificYieldKwhPerKwp.toLocaleString()} kWh/kWp&middot;yr</div></div>
    <div class="metric-box solar"><div class="val">${eurK(rv.uncurtailedSolarRevY1EUR)}</div><div class="lbl">Solar rev Y1</div><div class="sub-lbl">${rv.uncurtailedSolarMWh.toLocaleString()} MWh &times; &euro;${rv.uncurtailedSolarRateEURPerMWh.toFixed(0)}/MWh</div></div>
    <div class="metric-box bess"><div class="val">${eurK(rv.bessRevY1EUR)}</div><div class="lbl">BESS rev Y1</div><div class="sub-lbl">${rv.bessDischargedMWh.toLocaleString()} MWh &times; &euro;${rv.bessDischargeRateEURPerMWh.toFixed(0)}/MWh</div></div>
    <div class="metric-box gross"><div class="val">${eurK(rv.grossRevY1EUR)}</div><div class="lbl">Gross Y1 revenue</div><div class="sub-lbl">before fees &amp; tax</div></div>
  </div>

  <div class="two-col-wide">
    <div>
      <!-- Revenue mechanics -->
      <h2>Revenue mechanics</h2>
      <p class="note">${Math.round(rv.curtailmentPct * 100)}% curtailment (Cyprus ${new Date(deal._meta.date).getFullYear() + 1} baseline). BESS captures ${Math.round(rv.bessCapturePct * 100)}% &rarr; dispatches at DAM evening peak. RTE 86.32% AC&ndash;AC.</p>
      <table>
        <thead><tr><th>Source</th><th class="r">MWh/yr</th><th class="r">&euro;/MWh</th><th class="r">Y1 Revenue</th></tr></thead>
        <tbody>
          <tr class="solar-row">
            <td>Solar — uncurtailed ${Math.round((1 - rv.curtailmentPct) * 100)}%</td>
            <td class="r">${rv.uncurtailedSolarMWh.toLocaleString()}</td>
            <td class="r">${rv.uncurtailedSolarRateEURPerMWh.toFixed(2)}</td>
            <td class="r"><strong>${eurK(rv.uncurtailedSolarRevY1EUR)}</strong></td>
          </tr>
          <tr class="bess-row">
            <td>BESS — curtailed &times; capture &times; RTE</td>
            <td class="r">${rv.bessDischargedMWh.toLocaleString()}</td>
            <td class="r">${rv.bessDischargeRateEURPerMWh.toFixed(2)}</td>
            <td class="r"><strong>${eurK(rv.bessRevY1EUR)}</strong></td>
          </tr>
          <tr class="total-row">
            <td><strong>Total gross Y1</strong></td>
            <td class="r"><strong>${(rv.uncurtailedSolarMWh + rv.bessDischargedMWh).toLocaleString()}</strong></td>
            <td class="r">&mdash;</td>
            <td class="r"><strong>${eurK(rv.grossRevY1EUR)}</strong></td>
          </tr>
        </tbody>
      </table>
      <p class="footnote">DAM basis: ${e(DAM.sampleNote)}. BESS charges from curtailed solar at &euro;0 cost. Grid arbitrage (buy/sell) not yet legal in Cyprus (Feb 2026). Spring/summer peaks observed &gt;&euro;340/MWh (Apr 2026); figures use conservative winter-biased sample.</p>
    </div>

    <div>
      <!-- DAM reference -->
      <h2>Wholesale reference (DAM)</h2>
      <table>
        <thead><tr><th>Price block</th><th class="r">Measured</th><th class="r">Model used</th></tr></thead>
        <tbody>
          <tr><td>24h average</td><td class="r">${DAM.avgEURPerMWh.toFixed(0)}</td><td class="r">&mdash;</td></tr>
          <tr><td>Daytime 06:00&ndash;17:00 (solar sell)</td><td class="r">${DAM.daytimeEURPerMWh.toFixed(0)}</td><td class="r"><strong>${DAM.daytimeEURPerMWh.toFixed(0)}</strong></td></tr>
          <tr><td>Evening peak 17:00&ndash;21:00 (BESS discharge)</td><td class="r">${DAM.peakEveningEURPerMWh.toFixed(0)}</td><td class="r"><strong>${BESS_DEFAULTS.dischargePriceEURPerMWh}</strong></td></tr>
          <tr><td>Apr 2026 observed peak</td><td class="r">&gt;340</td><td class="r">&mdash;</td></tr>
        </tbody>
      </table>
      <p class="note">Measured: ${e(DAM.sampleNote)}. Model uses &euro;${BESS_DEFAULTS.dischargePriceEURPerMWh}/MWh discharge price (blended conservative; actual measured avg &euro;${DAM.peakEveningEURPerMWh.toFixed(0)}, Apr peak &gt;&euro;340).</p>

      <!-- Investment summary -->
      <h2>Investment summary</h2>
      <table>
        <thead><tr><th>Component</th><th class="r">EUR</th></tr></thead>
        <tbody>
          <tr><td>RTB acquisition (SPV share purchase)</td><td class="r">${eurM(c.rtbAcquisition)}</td></tr>
          <tr><td>PV EPC — ${deal.solarMWp} MWp</td><td class="r">${eurM(c.pvEpc)}</td></tr>
          <tr><td>BESS EPC — ${deal.bessPowerMW} MW / ${deal.bessMWh} MWh</td><td class="r">${eurM(c.bessEpc)}</td></tr>
          <tr class="total-row"><td><strong>Total (100% equity)</strong></td><td class="r"><strong>${eurM(c.total)}</strong></td></tr>
        </tbody>
      </table>
      <p class="note">${c.connectionTerms > 0 ? '&#10003; EAC grid connection terms included in RTB price.' : '&#9888; EAC grid connection terms pending &mdash; priced separately (case-by-case).'}</p>
    </div>
  </div>

  <div class="footer">
    <strong>${e(CONTACT.companyName)}</strong> (${e(CONTACT.companyNumber)}) &mdash; ${e(CONTACT.address)} &mdash; ${e(CONTACT.website)} &mdash; Page 1 of 2 &mdash; CONFIDENTIAL
  </div>
</div>

<!-- ════════════════════════════════ PAGE 2 ════════════════════════════════ -->
<div class="page page2 page-break">
  ${headerHtml(deal, 2, 2)}

  <div class="two-col">
    <div>
      <!-- Investment structure -->
      <h2>Investment structure (100% equity)</h2>
      <table>
        <thead><tr><th>Item</th><th class="r">Value</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>RTB acquisition</td><td class="r">${eurM(c.rtbAcquisition)}</td><td>${c.connectionTerms > 0 ? 'Incl. EAC grid connection terms' : 'Excl. EAC grid connection terms'}</td></tr>
          <tr><td>PV EPC</td><td class="r">${eurM(c.pvEpc)}</td><td>${e(c.pvUnitNote)}</td></tr>
          <tr><td>BESS EPC (${deal.bessPowerMW} MW / ${deal.bessMWh} MWh)</td><td class="r">${eurM(c.bessEpc)}</td><td>${e(c.bessUnitNote)}</td></tr>
          <tr class="total-row"><td><strong>Total equity required</strong></td><td class="r"><strong>${eurM(f.equityEUR)}</strong></td><td>100% equity — no debt</td></tr>
          <tr><td>Y1 gross revenue</td><td class="r">${eurK(rv.grossRevY1EUR)}</td><td>Solar + BESS</td></tr>
          <tr><td>Aggregator fee (${pct(f.aggregatorFeePct)})</td><td class="r">−${eurK(rv.grossRevY1EUR * f.aggregatorFeePct)}</td><td>Of gross revenue</td></tr>
          <tr><td>Y1 OPEX</td><td class="r">−${eurK(totalOpexY1)}</td><td>O&amp;M + land + insurance</td></tr>
          <tr class="subtotal-row"><td>Y1 EBITDA</td><td class="r">${eurK(ebitdaY1)}</td><td>EBITDA margin ${pct(ebitdaY1 / rv.grossRevY1EUR, 0)}</td></tr>
          <tr><td>D&amp;A (est., tax shield)</td><td class="r">−${eurK(daYear)}</td><td>PV+BESS 20yr · RTB 15yr SL</td></tr>
          <tr><td>Cyprus CIT ${pct(f.citPct)} on taxable income</td><td class="r">−${eurK(taxY1)}</td><td>From 1 Jan 2026</td></tr>
          <tr class="highlight-row"><td><strong>Y1 free cash flow</strong></td><td class="r"><strong>${eurK(cashToEq)}</strong></td><td><strong>${pct(cashYield, 1)} cash-on-cash yield</strong></td></tr>
        </tbody>
      </table>

      <!-- Y1 OPEX breakdown -->
      <h2>Y1 OPEX breakdown</h2>
      <table>
        <thead><tr><th>Cost line</th><th class="r">&euro;/yr</th></tr></thead>
        <tbody>
          <tr><td>PV O&amp;M</td><td class="r">${eurK(op.pvOm)}</td></tr>
          <tr><td>BESS O&amp;M (LTSA basis)</td><td class="r">${eurK(op.bessOm)}</td></tr>
          <tr><td>Land lease</td><td class="r">${eurK(op.landLease)}</td></tr>
          <tr><td>Insurance + admin + monitoring</td><td class="r">${eurK(op.other)}</td></tr>
          <tr class="total-row"><td><strong>Total OPEX Y1</strong></td><td class="r"><strong>${eurK(totalOpexY1)}</strong></td></tr>
        </tbody>
      </table>
    </div>

    <div>
      <!-- Equity investment options -->
      <h2>Equity investment options</h2>
      <table>
        <thead><tr><th>Stake</th><th class="r">Investment &euro;</th><th class="r">Y1 FCF &euro;</th><th class="r">Cash yield</th></tr></thead>
        <tbody>
          ${tickets.map(t => {
            const eq = Math.round(f.equityEUR * t)
            const cash = Math.round(cashToEq * t)
            const yld = cashToEq / f.equityEUR
            return `<tr${t === 1.0 ? ' class="highlight-row"' : ''}><td>${pct(t)} stake</td><td class="r">${eurK(eq)}</td><td class="r">${eurK(cash)}</td><td class="r">${pct(yld, 1)}</td></tr>`
          }).join('\n          ')}
        </tbody>
      </table>
      <p class="footnote">100% equity structure — no bank debt. Cash yield = Y1 FCF (post-tax) &times; stake %. Full 25-year model available under NDA.</p>

      <!-- IRR sensitivity -->
      <h2>Revenue sensitivity</h2>
      <table>
        <thead><tr><th>Curtailment scenario</th><th class="r">Y1 Gross Rev</th><th class="r">Indic. IRR</th></tr></thead>
        <tbody>
          <tr class="highlight-row"><td>Upside &mdash; ${Math.round(upsideCurt * 100)}% curtailment</td><td class="r">${eurK(upside.gross)}</td><td class="r">${irrAtCurtailment(deal, upsideCurt)}</td></tr>
          <tr class="subtotal-row"><td><strong>Base &mdash; ${Math.round(rv.curtailmentPct * 100)}% curtailment</strong></td><td class="r"><strong>${eurK(base.gross)}</strong></td><td class="r"><strong>${e(f.leveredEquityIrrIndicative)}</strong></td></tr>
          <tr><td>Downside &mdash; ${Math.round(downsideCurt * 100)}% curtailment</td><td class="r">${eurK(downside.gross)}</td><td class="r">${irrAtCurtailment(deal, downsideCurt)}</td></tr>
        </tbody>
      </table>
      <p class="footnote">Revenue increases with higher curtailment because BESS dispatches at evening peak (&euro;183/MWh avg) vs direct solar (&euro;141/MWh avg) &mdash; provided BESS is sized to capture daily curtailed volume.</p>

      <!-- Project timeline -->
      <h2>Project timeline</h2>
      <table>
        <thead><tr><th>Milestone</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>CERA generation licence</td><td><span class="risk-pill risk-low">Issued</span></td></tr>
          <tr><td>Town planning &amp; building permits</td><td><span class="risk-pill risk-low">Issued</span></td></tr>
          <tr><td>Environmental approvals</td><td><span class="risk-pill risk-low">Issued</span></td></tr>
          <tr><td>Land lease / site control</td><td><span class="risk-pill risk-low">Executed</span></td></tr>
          <tr><td>EAC grid connection</td><td><span class="risk-pill ${gridDisplay.pill}">${e(gridDisplay.label)}</span></td></tr>
          <tr><td>EPC contract (Lighthief)</td><td><span class="risk-pill risk-med">Upon NDA</span></td></tr>
          <tr><td>Financial close</td><td><span class="risk-pill ${deal.gridConnectionStatus === 'pending_upgrade' ? 'risk-high' : 'risk-med'}">${e(financialCloseLabel)}</span></td></tr>
          <tr><td>Target COD</td><td><span class="risk-pill risk-med">${e(deal.timelineNote.replace(/^Target COD\s+/, '').split('—')[0].split('(')[0].trim())}</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Key investment rationale -->
  <h2>Investment rationale</h2>
  <div class="two-col">
    <div class="box">
      <strong>Why Cyprus BESS now?</strong><br>
      Curtailment on the island grid is rising rapidly (50%+ at peak solar hours). BESS earns at &euro;0 charge cost — storing otherwise-curtailed solar and dispatching at evening peak (&euro;183&ndash;340/MWh). This structural arbitrage is locked in before DAM grid-charging legislation (expected 2027+) further compresses economics for late movers.
    </div>
    <div class="box warn">
      <strong>Key risks</strong><br>
      <span class="risk-pill risk-low">Low</span> Technology — Tier-1 LFP BESS, 7,000-cycle / 15yr warranty.<br>
      <span class="risk-pill risk-low">Low</span> Permitting — CERA + planning already issued.<br>
      <span class="risk-pill risk-${gridDisplay.pill.replace('risk-', '')}">${gridDisplay.pill === 'risk-low' ? 'Low' : gridDisplay.pill === 'risk-med' ? 'Med' : 'High'}</span> Grid connection — ${e(deal.gridConnectionNote)}<br>
      <span class="risk-pill risk-med">Med</span> DAM price — conservative TSOC sample used; April peaks &gt;&euro;340/MWh.<br>
      <span class="risk-pill risk-low">Low</span> Regulatory — Cyprus CIT 15% fixed from Jan 2026.
    </div>
  </div>

  <!-- Disclaimer -->
  <div class="box" style="margin-top:6px;font-size:6.5pt">
    <strong>Non-binding indicative summary.</strong> Figures based on Lighthief EPC pricing schedule (v4 Feb 2026), TSOC DAM sample (Oct 2025&ndash;Feb 2026), and project documentation on file. Not a prospectus or offer. Investors must conduct independent due diligence and obtain legal and tax advice. Full dataroom, Excel financial model, and EPC term sheet available under NDA. All figures ex VAT unless stated. Timeline subject to EAC and regulatory progress. ${e(CONTACT.companyName)} (${e(CONTACT.companyNumber)}).
  </div>

  <!-- Contact -->
  <div class="box" style="margin-top:5px;background:#f8fafc">
    <strong>To receive the full dataroom and Excel model:</strong><br>
    ${e(CONTACT.director)} &mdash; ${e(CONTACT.directorTitle)} &middot; ${e(CONTACT.directorPhone)} &middot; ${e(CONTACT.directorEmail)}<br>
    ${e(CONTACT.companyName)} &middot; ${e(CONTACT.website)} &middot; ${e(CONTACT.officePhone)}
  </div>

  <div class="footer">
    <strong>${e(CONTACT.companyName)}</strong> (${e(CONTACT.companyNumber)}) &mdash; ${e(CONTACT.address)} &mdash; Page 2 of 2 &mdash; CONFIDENTIAL &mdash; ${e(deal.referenceCode)}
  </div>
</div>

</body>
</html>`
}

// ── Writer ───────────────────────────────────────────────────────────────────

function writeTeaser(deal: RtbDeal): void {
  const pack = investorPackForDeal(deal)
  const publicDir = path.join(process.cwd(), 'public', 'lighthief-cyprus', 'teasers', deal.slug)
  const docsDir   = path.join(process.cwd(), 'docs', 'teasers')

  fs.mkdirSync(publicDir, { recursive: true })
  fs.mkdirSync(docsDir,   { recursive: true })

  const html = renderTeaser(deal)

  fs.writeFileSync(path.join(publicDir, pack.teaserFile), html, 'utf8')
  fs.writeFileSync(path.join(docsDir,   pack.teaserFile), html, 'utf8')

  const c = deal.capex
  const rv = deal.revenueModel
  console.log(`  ✓ ${deal.referenceCode} — ${deal.solarMWp} MWp + ${deal.bessMWh} MWh | CAPEX ${eurMConsole(c.total)} | Y1 rev ${eurKConsole(rv.grossRevY1EUR)}`)
  console.log(`    → ${path.join(publicDir, pack.teaserFile)}`)
}

function eurMConsole(n: number): string {
  return n >= 1_000_000 ? `€${(n / 1e6).toFixed(2)}M` : `€${Math.round(n / 1000)}K`
}

function eurKConsole(n: number): string {
  return `€${Math.round(n / 1000)}K`
}

function main(): void {
  console.log(`\nLighthief RTB Teaser Generator (2-page) — ${new Date().toISOString().slice(0, 10)}`)
  console.log(`Logo: ${LOGO_B64 ? `embedded (${Math.round(LOGO_B64.length / 1024)}KB base64)` : 'NOT FOUND — check public/images/logo/lighthief-logo-200.png'}`)
  console.log(`Generating ${ALL_DEALS.length} teasers...\n`)

  for (const deal of ALL_DEALS) {
    writeTeaser(deal)
  }

  console.log(`\nDone. 2-page HTML teasers written to:`)
  console.log(`  public/lighthief-cyprus/teasers/{slug}/{slug}-teaser.html`)
  console.log(`  docs/teasers/{slug}-teaser.html\n`)
}

main()
