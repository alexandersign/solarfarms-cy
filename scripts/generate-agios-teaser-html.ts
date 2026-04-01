/**
 * One-page investor teaser for Agios Theodoros RTB — figures from lib/deals/agios-theodoros-rtb.ts
 * Run: npx tsx scripts/generate-agios-teaser-html.ts
 */
import * as fs from 'fs'
import * as path from 'path'
import { AGIOS_THEODOROS_RTB as A } from '../lib/deals/agios-theodoros-rtb'

const OUT_DOCS = path.join(process.cwd(), 'docs', 'teasers', 'agios-theodoros-park-sale-teaser-mar2026.html')
const OUT_PUBLIC = path.join(
  process.cwd(),
  'public',
  'lighthief-cyprus',
  'parks-for-sale',
  'agios-theodoros-park-sale-teaser-mar2026.html'
)

function e(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function eurM(n: number): string {
  return `&euro;${(n / 1e6).toFixed(2)}M`
}

function eurK(n: number): string {
  return `&euro;${Math.round(n / 1000)}K`
}

function buildHtml(): string {
  const c = A.capexStackEUR
  const f = A.finance
  const m = A.marketDAM
  const o = A.opexY1EUR
  const d = A.depreciationEUR

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${e(A.publicTitle)} &mdash; ${e(A.referenceCode)} | Lighthief Cyprus</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--primary:#1e3a5f;--accent:#2563eb;--bg:#f8fafc;--border:#e2e8f0;--text:#1a202c;--muted:#64748b;--ok:#059669}
body{font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,sans-serif;font-size:9.5pt;line-height:1.55;color:var(--text);background:#edf2f7;padding:20px}
.page{background:#fff;width:210mm;max-width:100%;margin:0 auto;padding:14mm 16mm;box-shadow:0 4px 16px rgba(0,0,0,.08)}
.header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid var(--primary);padding-bottom:10px;margin-bottom:16px}
.logo-img{height:40px;width:auto;display:block}
.tagline{font-size:8pt;color:var(--muted)}
.doc-info{text-align:right;font-size:7.5pt;color:var(--muted);line-height:1.6}
h1{font-size:13pt;color:var(--primary);margin:12px 0 6px}
.sub{font-size:9.5pt;color:var(--accent);font-weight:600;margin-bottom:14px}
.metric-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:12px 0 16px}
.metric-box{background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:10px 6px;text-align:center}
.metric-box .val{font-size:15pt;font-weight:800;color:var(--primary)}
.metric-box .lbl{font-size:6.5pt;color:var(--muted);text-transform:uppercase;margin-top:2px}
h2{font-size:10pt;color:var(--primary);margin:14px 0 6px;border-bottom:2px solid var(--accent);padding-bottom:3px;display:inline-block}
table{width:100%;border-collapse:collapse;font-size:8pt;margin:6px 0 10px}
th{background:var(--primary);color:#fff;padding:5px 6px;text-align:left}
td{padding:4px 6px;border-bottom:1px solid var(--border)}
.r{text-align:right}
.total-row{background:var(--primary)!important;color:#fff;font-weight:700}
.total-row td{border:none}
.note{font-size:7.5pt;color:var(--muted);margin:6px 0}
.box{background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:10px 12px;margin:10px 0;font-size:8pt}
.footer{margin-top:16px;padding-top:10px;border-top:2px solid var(--primary);font-size:7pt;color:var(--muted);text-align:center}
.print-btn{position:fixed;top:15px;right:15px;background:var(--primary);color:#fff;border:none;padding:10px 16px;border-radius:6px;cursor:pointer;z-index:100}
@media print{.print-btn{display:none}html,body{background:#fff;padding:0}.page{box-shadow:none;padding:0;max-width:none;width:auto}}
</style>
</head>
<body>
<button class="print-btn" type="button" onclick="window.print()">Print / PDF</button>
<div class="page">
  <div class="header">
    <div>
      <img class="logo-img" src="/images/logo/lighthief-logo-200.png" alt="Lighthief">
      <div class="tagline">Hybrid solar + BESS &mdash; Cyprus</div>
    </div>
    <div class="doc-info"><strong>INVESTOR TEASER (1 page)</strong><br>${e(A.referenceCode)}<br>Confidential &mdash; Mar 2026</div>
  </div>

  <h1>${e(A.publicTitle)}</h1>
  <p class="sub">${e(A.locationLine)} &mdash; CERA ${e(A.ceraLicense)} &mdash; Ready to build. Official economics: download the Excel model (same figures as this page).</p>

  <div class="metric-grid">
    <div class="metric-box"><div class="val">${A.solarMWp}</div><div class="lbl">MWp PV</div></div>
    <div class="metric-box"><div class="val">${A.bessMWh}</div><div class="lbl">MWh BESS</div></div>
    <div class="metric-box"><div class="val">${eurM(c.total)}</div><div class="lbl">Total CAPEX</div></div>
    <div class="metric-box"><div class="val">${eurK(f.grossEnergyRevenueY1EUR)}</div><div class="lbl">Y1 gross revenue</div></div>
    <div class="metric-box"><div class="val">~30%</div><div class="lbl">Lev. IRR (indic.)</div></div>
  </div>

  <h2>CAPEX stack (ex VAT)</h2>
  <table>
    <thead><tr><th>Line</th><th class="r">EUR</th><th>Notes</th></tr></thead>
    <tbody>
      <tr><td>PV EPC (${A.solarMWp} MWp)</td><td class="r">${eurM(c.pvEpc)}</td><td>${e(c.pvUnitNote)}</td></tr>
      <tr><td>BESS EPC (${A.bessPowerMW} MW / ${A.bessMWh} MWh)</td><td class="r">${eurM(c.bessEpc)}</td><td>${e(c.bessUnitNote)}</td></tr>
      <tr><td>RTB acquisition</td><td class="r">${eurM(c.rtbAcquisition)}</td><td></td></tr>
      <tr><td>Development</td><td class="r">${eurM(c.development)}</td><td>Grid, permits, fees, contingency</td></tr>
      <tr class="total-row"><td><strong>Total</strong></td><td class="r"><strong>${eurM(c.total)}</strong></td><td>Aligns with v4 EPC workbook + site</td></tr>
    </tbody>
  </table>

  <h2>Financing &amp; model (summary)</h2>
  <table>
    <thead><tr><th>Item</th><th class="r">Value</th><th>Notes</th></tr></thead>
    <tbody>
      <tr><td>Senior debt</td><td class="r">${eurM(f.seniorDebtEUR)}</td><td>${Math.round((f.seniorDebtEUR / (c.pvEpc + c.bessEpc)) * 100)}% of PV+BESS EPC; ${f.loanTermYears} yr, ${f.loanNominalRate * 100}% nominal</td></tr>
      <tr><td>Equity (all-in)</td><td class="r">${eurM(f.equityEUR)}</td><td>RTB + dev + equity share of stack</td></tr>
      <tr><td>Y1 gross energy revenue</td><td class="r">${eurK(f.grossEnergyRevenueY1EUR)}</td><td>${e(f.grossRevenueNote)}</td></tr>
      <tr><td>Aggregator / offtake fee</td><td class="r">${f.aggregatorFeePct * 100}%</td><td>Of gross energy revenue</td></tr>
      <tr><td>Cyprus CIT</td><td class="r">${f.citPct * 100}%</td><td>${e(f.citNote)}</td></tr>
      <tr><td>Y1 OPEX (PV+BESS+other+land)</td><td class="r">${eurK(o.pvOm + o.bessOm + o.other + o.landLease)}</td><td>Escalates in model</td></tr>
      <tr><td>D&amp;A bases</td><td class="r">${eurM(d.pvPlusBessBase)} / ${eurM(d.rtbPlusDevBase)}</td><td>PV+BESS ${d.pvPlusBessYears}yr; RTB+dev ${d.rtbPlusDevYears}yr SL</td></tr>
    </tbody>
  </table>

  <h2>Wholesale reference (DAM)</h2>
  <p class="note">Indicative only. ${e(m.sampleNote)}.</p>
  <table>
    <thead><tr><th>Block</th><th class="r">Avg &euro;/MWh</th></tr></thead>
    <tbody>
      <tr><td>24h average</td><td class="r"><strong>${m.avgEURPerMWh.toFixed(2)}</strong></td></tr>
      <tr><td>Evening peak (17:00&ndash;21:00)</td><td class="r"><strong>${m.peakEveningEURPerMWh.toFixed(2)}</strong></td></tr>
      <tr><td>Midday (10:00&ndash;14:00)</td><td class="r">${m.middayEURPerMWh.toFixed(2)}</td></tr>
      <tr><td>Peak &ndash; midday spread</td><td class="r"><strong>${m.peakMiddaySpreadEURPerMWh.toFixed(2)}</strong></td></tr>
    </tbody>
  </table>

  <div class="box">
    <strong>Binding numbers:</strong> use the downloadable Excel model (${e(A.referenceCode)}) &mdash; Cover + Assumptions sheets. This teaser is a non-binding summary. Not an offer. Investors should take tax and legal advice. Ex VAT unless stated.
  </div>

  <div class="footer">
    <strong>Lighthief Cyprus Ltd</strong> (HE 477423), Limassol &mdash; solarfarms.cy<br>
    ${e(A._meta.source)}. ${e(A._meta.note)}
  </div>
</div>
</body>
</html>`
}

function main() {
  const html = buildHtml()
  fs.mkdirSync(path.dirname(OUT_DOCS), { recursive: true })
  fs.mkdirSync(path.dirname(OUT_PUBLIC), { recursive: true })
  fs.writeFileSync(OUT_DOCS, html, 'utf8')
  fs.writeFileSync(OUT_PUBLIC, html, 'utf8')
  console.log('Wrote', OUT_DOCS)
  console.log('Wrote', OUT_PUBLIC)
}

main()
