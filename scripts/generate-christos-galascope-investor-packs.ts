/**
 * Christos 3.3 MW + Galascope 5 MW operational investor packs (teaser HTML + Excel).
 *
 * Output:
 *   public/lighthief-cyprus/parks-for-sale/{slug}/
 *   parks-for-sale/{slug}/  (mirror)
 *   L:/My Drive/SOLARFARMS/parks-for-sale/{slug}/  (Google Drive)
 *
 * Run: npx tsx scripts/generate-christos-galascope-investor-packs.ts
 */

import * as fs from 'fs'
import * as path from 'path'
import * as XLSX from 'xlsx'
import { COMPANY_DATA } from '../lib/constants'
import {
  CHRISTOS_INVESTOR_PACK,
  CHRISTOS_NICOSIA_OPERATIONAL as CHR,
  CHRISTOS_PV_ONLY,
  CHRISTOS_WITH_BESS,
} from '../lib/deals/christos-nicosia-3.3-operational'
import {
  GALASCOPE_5MW_OPERATIONAL as GAL,
  GALASCOPE_INVESTOR_PACK,
  GALASCOPE_PV_ONLY,
  GALASCOPE_PV_ONLY_STRESS,
  GALASCOPE_WITH_BESS,
} from '../lib/deals/galascope-5mw-operational'

const CONTACT = {
  company: COMPANY_DATA.name,
  reg: COMPANY_DATA.registration.companyNumber,
  director: COMPANY_DATA.contacts.cyprusDirector.name,
  phone: COMPANY_DATA.contacts.cyprusDirector.phone,
  email: COMPANY_DATA.email,
  website: 'solarfarms.cy',
  address: COMPANY_DATA.address.office.full,
}

const GDRIVE_ROOT = path.join('L:', 'My Drive', 'SOLARFARMS', 'parks-for-sale')

const CSS = `
*{margin:0;padding:0;box-sizing:border-box}
:root{--navy:#1A365D;--gold:#C9A432;--bg:#F0F4F8;--border:#E2E8F0;--text:#1A202C;--muted:#64748B;--green:#059669;--amber:#D97706}
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
.metric.hi{border-color:var(--navy);background:#EFF6FF}
.metric.gr .v{color:var(--green)}
table{width:100%;border-collapse:collapse;font-size:7.5pt;margin:4px 0}
th{background:var(--navy);color:#fff;padding:4px 6px;text-align:left}
td{padding:3px 6px;border-bottom:1px solid var(--border)}
td.r{text-align:right}
tr.total td{font-weight:700;background:#f8fafc}
tr.cur td{background:#ECFDF5}
tr.new td{background:#EFF6FF}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.box{background:var(--bg);border-left:3px solid var(--gold);padding:6px 8px;font-size:7pt;margin:6px 0}
.badge{display:inline-block;font-size:6.5pt;font-weight:700;padding:2px 8px;border-radius:10px;background:#DCFCE7;color:#166534;margin-right:4px}
.foot{font-size:6pt;color:var(--muted);margin-top:8px;border-top:1px solid var(--border);padding-top:6px}
@media print{body{background:#fff;padding:0}.page{box-shadow:none;margin:0}.page2{page-break-before:always}}
`

function eur(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `€${(n / 1e6).toFixed(2)}M`
  if (Math.abs(n) >= 1000) return `€${Math.round(n / 1000)}K`
  return `€${Math.round(n)}`
}

function pct(n: number, dp = 1): string {
  return `${n.toFixed(dp)}%`
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function renderChristosTeaser(): string {
  const pv = CHRISTOS_PV_ONLY
  const bess = CHRISTOS_WITH_BESS
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<title>${esc(CHR.publicTitle)} | ${CHR.referenceCode}</title>
<style>${CSS}</style></head><body>
<div class="page">
  <div class="header">
    <div><strong style="color:var(--navy);font-size:12pt">Lighthief Cyprus</strong><div class="sub">Operational PV + BESS upside</div></div>
    <div class="sub" style="text-align:right"><strong>INVESTOR PACK</strong><br>${CHR.referenceCode}<br>Confidential — Jun 2026</div>
  </div>
  <h1>${esc(CHR.publicTitle)}</h1>
  <div class="sub">${esc(CHR.locationLine)} · CERA ${esc(CHR.ceraLicense)} · Operational since ${CHR.operationalSince}</div>
  <div style="margin:6px 0"><span class="badge">Operational</span><span class="badge" style="background:#FEF9C3;color:#92400E">+1.7 MWp captive-load expansion</span></div>

  <div class="metrics">
    <div class="metric hi"><div class="v">${CHR.solarMWp} MWp</div><div class="l">Built &amp; connected</div></div>
    <div class="metric"><div class="v">${CHR.expansionMWp} MWp</div><div class="l">Permit only (no grid)</div></div>
    <div class="metric gr"><div class="v">${eur(pv.fcfY1)}</div><div class="l">Y1 FCF (PV only)</div></div>
    <div class="metric gr"><div class="v">${eur(bess.fcfY1)}</div><div class="l">Y1 FCF (+ BESS)</div></div>
  </div>

  <div class="two-col">
    <div>
      <h2>Asset summary</h2>
      <table>
        <tr><th>Item</th><th>Detail</th></tr>
        <tr><td>Operational PV</td><td>${CHR.solarMWp} MWp — ${CHR.annualProductionMWh.toLocaleString()} MWh/yr (${CHR.specificYieldKwhPerKwp} kWh/kWp bifacial)</td></tr>
        <tr><td>Expansion plot</td><td>${CHR.expansionMWp} MWp licensed — building permit, <strong>no EAC connection</strong></td></tr>
        <tr><td>Captive-load angle</td><td>${esc(CHR.expansionStatus)}</td></tr>
        <tr><td>BESS option</td><td>${CHR.bessPowerMW} MW / ${CHR.bessMWh} MWh — ${eur(CHR.bessEpcClientQuoteEUR)} turnkey (quoted)</td></tr>
      </table>
      <h2>Current vs BESS-augmented (Y1, merchant model)</h2>
      <table>
        <tr><th>Scenario</th><th class="r">Gross rev</th><th class="r">OPEX</th><th class="r">FCF Y1</th><th class="r">Notes</th></tr>
        <tr class="cur"><td>PV only (${pct(CHR.curtailmentPctCurrent * 100, 0)} curt.)</td><td class="r">${eur(pv.rev.grossRevY1EUR)}</td><td class="r">${eur(pv.totalOpex)}</td><td class="r"><strong>${eur(pv.fcfY1)}</strong></td><td>TSOC DAM daytime</td></tr>
        <tr class="new"><td>+ BESS (${pct(CHR.curtailmentPctWithBess * 100, 0)} curt.)</td><td class="r">${eur(bess.rev.grossRevY1EUR)}</td><td class="r">${eur(bess.totalOpex)}</td><td class="r"><strong>${eur(bess.fcfY1)}</strong></td><td>+${eur(bess.bessEpc)} BESS EPC</td></tr>
        <tr class="total"><td>BESS incremental</td><td class="r">+${eur(bess.rev.grossRevY1EUR - pv.rev.grossRevY1EUR)}</td><td class="r">+${eur(bess.totalOpex - pv.totalOpex)}</td><td class="r">+${eur(bess.incrementalFcf)}</td><td>ROI ${pct(bess.bessRoiPct)} · ~${bess.bessPaybackYears.toFixed(1)} yr</td></tr>
      </table>
    </div>
    <div>
      <h2>BESS revenue stack (with augmentation)</h2>
      <table>
        <tr><th>Source</th><th class="r">MWh/yr</th><th class="r">€/MWh</th><th class="r">Y1</th></tr>
        <tr><td>Solar (uncurtailed)</td><td class="r">${bess.rev.uncurtailedSolarMWh.toLocaleString()}</td><td class="r">141</td><td class="r">${eur(bess.rev.uncurtailedSolarRevY1EUR)}</td></tr>
        <tr><td>BESS discharge</td><td class="r">${bess.rev.bessDischargedMWh.toLocaleString()}</td><td class="r">195</td><td class="r">${eur(bess.rev.bessRevY1EUR)}</td></tr>
        <tr class="total"><td><strong>Gross Y1</strong></td><td class="r">—</td><td class="r">—</td><td class="r"><strong>${eur(bess.rev.grossRevY1EUR)}</strong></td></tr>
      </table>
      <div class="box"><strong>1.7 MWp expansion:</strong> ${CHR.expansionMWhPerYear.toLocaleString()} MWh/yr available behind-the-meter — data centre / mining anchor without grid export licence.</div>
      <div class="box"><strong>Contact:</strong> ${CONTACT.director} · ${CONTACT.phone} · ${CONTACT.email}</div>
    </div>
  </div>
  <div class="foot">${CONTACT.company} (${CONTACT.reg}) · ${CONTACT.website} · Non-binding · Full dataroom under NDA</div>
</div>
</body></html>`
}

function renderGalascopeTeaser(): string {
  const cur = GALASCOPE_PV_ONLY
  const stress = GALASCOPE_PV_ONLY_STRESS
  const bess = GALASCOPE_WITH_BESS
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<title>${esc(GAL.publicTitle)} | ${GAL.referenceCode}</title>
<style>${CSS}</style></head><body>
<div class="page">
  <div class="header">
    <div><strong style="color:var(--navy);font-size:12pt">Lighthief Cyprus</strong><div class="sub">Operational tracker · BESS upside</div></div>
    <div class="sub" style="text-align:right"><strong>INVESTOR PACK</strong><br>${GAL.referenceCode}<br>Confidential — Jun 2026</div>
  </div>
  <h1>${esc(GAL.publicTitle)}</h1>
  <div class="sub">${esc(GAL.locationLine)} · ${GAL.solarMWp} MWp DC / ${GAL.solarMWac} MW AC · Trackers since 2020</div>
  <div style="margin:6px 0"><span class="badge">Operational</span><span class="badge" style="background:#DBEAFE;color:#1E40AF">For sale</span></div>

  <div class="metrics">
    <div class="metric hi"><div class="v">${eur(GAL.askingPriceEUR)}</div><div class="l">Asking price</div></div>
    <div class="metric"><div class="v">${pct(cur.roiPct)}</div><div class="l">Cash yield (PV only)</div></div>
    <div class="metric gr"><div class="v">${pct(bess.roiPct)}</div><div class="l">Cash yield (+ BESS)</div></div>
    <div class="metric"><div class="v">${GAL.bessMWh} MWh</div><div class="l">BESS option (${GAL.bessDurationHours}h)</div></div>
  </div>

  <h2>Production &amp; curtailment (actual)</h2>
  <table>
    <tr><th>Year</th><th class="r">Net MWh</th><th class="r">Curtailment</th></tr>
    ${GAL.productionHistory.map((r) => `<tr><td>${r.year}</td><td class="r">${r.productionMWh.toLocaleString()}</td><td class="r">${r.curtailmentPct}%</td></tr>`).join('')}
  </table>

  <div class="two-col">
    <div>
      <h2>Current vs BESS-augmented economics</h2>
      <table>
        <tr><th>Scenario</th><th class="r">Revenue Y1</th><th class="r">OPEX</th><th class="r">Net / FCF</th><th class="r">Yield</th></tr>
        <tr class="cur"><td>PV only (${pct(GAL.curtailmentPctCurrentCase * 100, 0)} curt., PPA)</td><td class="r">${eur(cur.grossRev)}</td><td class="r">${eur(cur.opex)}</td><td class="r"><strong>${eur(cur.netIncome)}</strong></td><td class="r">${pct(cur.roiPct)}</td></tr>
        <tr><td>PV stress (${pct(GAL.curtailmentPct2025 * 100, 1)} curt. 2025)</td><td class="r">${eur(stress.grossRev)}</td><td class="r">${eur(stress.opex)}</td><td class="r">${eur(stress.netIncome)}</td><td class="r">${pct(stress.roiPct)}</td></tr>
        <tr class="new"><td>Acquisition + BESS (${eur(GAL.bessEpcTotalEUR)})</td><td class="r">${eur(bess.rev.grossRevY1EUR)}</td><td class="r">${eur(bess.totalOpex)}</td><td class="r"><strong>${eur(bess.fcfY1)}</strong></td><td class="r">${pct(bess.roiPct)}</td></tr>
        <tr class="total"><td>Total investment</td><td class="r">—</td><td class="r">—</td><td class="r">${eur(bess.totalCapex)}</td><td class="r">~${bess.paybackYears.toFixed(1)} yr payback</td></tr>
      </table>
      <p class="sub">PPA model for current ops; merchant DAM for BESS scenario (solar + evening dispatch).</p>
    </div>
    <div>
      <h2>Equipment</h2>
      <table>
        <tr><td>Modules</td><td>${esc(GAL.equipment.panels)}</td></tr>
        <tr><td>Inverters</td><td>${esc(GAL.equipment.inverters)}</td></tr>
        <tr><td>Tracking</td><td>${esc(GAL.equipment.tracking)}</td></tr>
        <tr><td>SCADA</td><td>${esc(GAL.equipment.scada)}</td></tr>
        <tr><td>Land lease</td><td>${GAL.landLease.start} – ${GAL.landLease.end} · ${eur(GAL.landLeaseY1EUR)}/yr</td></tr>
      </table>
      <div class="box"><strong>BESS uplift:</strong> +${eur(bess.upliftVsPvOnly)} gross revenue Y1 vs PV-only merchant case at ${pct(GAL.curtailmentPctCurrentCase * 100, 0)} curtailment.</div>
      <div class="box"><strong>Contact:</strong> ${CONTACT.director} · ${CONTACT.phone} · ${CONTACT.email}</div>
    </div>
  </div>
  <div class="foot">${CONTACT.company} (${CONTACT.reg}) · ${CONTACT.website} · Non-binding · ${GAL.referenceCode}</div>
</div>
</body></html>`
}

function setCell(ws: XLSX.WorkSheet, r: number, c: number, v: string | number) {
  const addr = XLSX.utils.encode_cell({ r: r - 1, c: c - 1 })
  if (typeof v === 'number') ws[addr] = { v, t: 'n', z: '#,##0' }
  else ws[addr] = { v, t: 's' }
}

function sheetFromRows(rows: (string | number)[][]): XLSX.WorkSheet {
  const ws = XLSX.utils.aoa_to_sheet(rows)
  ws['!cols'] = [{ wch: 28 }, { wch: 18 }, { wch: 22 }, { wch: 18 }]
  return ws
}

function buildChristosWorkbook(): XLSX.WorkBook {
  const wb = XLSX.utils.book_new()
  const pv = CHRISTOS_PV_ONLY
  const bess = CHRISTOS_WITH_BESS
  XLSX.utils.book_append_sheet(
    wb,
    sheetFromRows([
      ['Christos Nicosia 3.3 MW — Investor Model'],
      [CHR.referenceCode, new Date().toISOString().slice(0, 10)],
      [],
      ['Operational PV + optional BESS · 1.7 MWp captive expansion'],
      ['Sheets: Summary, PV_Only, With_BESS, Expansion'],
    ]),
    'Cover'
  )
  XLSX.utils.book_append_sheet(
    wb,
    sheetFromRows([
      ['Metric', 'PV only', 'With BESS', 'Delta'],
      ['Curtailment %', CHR.curtailmentPctCurrent * 100, CHR.curtailmentPctWithBess * 100, ''],
      ['Gross revenue Y1', pv.rev.grossRevY1EUR, bess.rev.grossRevY1EUR, bess.rev.grossRevY1EUR - pv.rev.grossRevY1EUR],
      ['OPEX Y1', pv.totalOpex, bess.totalOpex, bess.totalOpex - pv.totalOpex],
      ['FCF Y1', pv.fcfY1, bess.fcfY1, bess.fcfY1 - pv.fcfY1],
      ['BESS EPC', 0, bess.bessEpc, bess.bessEpc],
      ['BESS incremental FCF', '', bess.incrementalFcf, ''],
      ['BESS ROI %', '', bess.bessRoiPct, ''],
      ['Expansion MWp (no grid)', CHR.expansionMWp, '', ''],
      ['Expansion MWh/yr', CHR.expansionMWhPerYear, '', 'Data centre / captive'],
    ]),
    'Summary'
  )
  return wb
}

function buildGalascopeWorkbook(): XLSX.WorkBook {
  const wb = XLSX.utils.book_new()
  const cur = GALASCOPE_PV_ONLY
  const stress = GALASCOPE_PV_ONLY_STRESS
  const bess = GALASCOPE_WITH_BESS
  XLSX.utils.book_append_sheet(
    wb,
    sheetFromRows([
      ['Galascope 5.01 MWp Trackers — Investor Model'],
      [GAL.referenceCode, new Date().toISOString().slice(0, 10)],
      [],
      ['Asking', GAL.askingPriceEUR],
      ['BESS option', GAL.bessMWh, 'MWh at', GAL.bessEpcPerMWhEUR, '/MWh'],
    ]),
    'Cover'
  )
  XLSX.utils.book_append_sheet(
    wb,
    sheetFromRows([
      ['Scenario', 'Curtailment %', 'Revenue Y1', 'OPEX Y1', 'Net/FCF Y1', 'ROI %', 'Investment'],
      ['PV only (base)', GAL.curtailmentPctCurrentCase * 100, cur.grossRev, cur.opex, cur.netIncome, cur.roiPct, GAL.askingPriceEUR],
      ['PV only (2025 stress)', GAL.curtailmentPct2025 * 100, stress.grossRev, stress.opex, stress.netIncome, stress.roiPct, GAL.askingPriceEUR],
      ['+ BESS merchant', GAL.curtailmentPctCurrentCase * 100, bess.rev.grossRevY1EUR, bess.totalOpex, bess.fcfY1, bess.roiPct, bess.totalCapex],
    ]),
    'Summary'
  )
  XLSX.utils.book_append_sheet(
    wb,
    sheetFromRows([
      ['Year', 'Net MWh', 'Curtailment %'],
      ...GAL.productionHistory.map((r) => [r.year, r.productionMWh, r.curtailmentPct]),
    ]),
    'Production_History'
  )
  return wb
}

type PackConfig = {
  pack: typeof CHRISTOS_INVESTOR_PACK
  teaserHtml: string
  workbook: XLSX.WorkBook
  label: string
}

function writePack({ pack, teaserHtml, workbook, label }: PackConfig) {
  const root = process.cwd()
  const publicDir = path.join(root, pack.outputDir)
  const internalDir = path.join(root, pack.internalDir)
  fs.mkdirSync(publicDir, { recursive: true })
  fs.mkdirSync(internalDir, { recursive: true })

  const teaserPath = path.join(publicDir, pack.teaserFile)
  const modelPath = path.join(publicDir, pack.modelFile)
  fs.writeFileSync(teaserPath, teaserHtml, 'utf8')
  fs.copyFileSync(teaserPath, path.join(internalDir, pack.teaserFile))
  XLSX.writeFile(workbook, modelPath)
  fs.copyFileSync(modelPath, path.join(internalDir, pack.modelFile))

  const gdriveDir = path.join(GDRIVE_ROOT, pack.slug)
  try {
    fs.mkdirSync(gdriveDir, { recursive: true })
    fs.writeFileSync(path.join(gdriveDir, pack.teaserFile), teaserHtml, 'utf8')
    XLSX.writeFile(workbook, path.join(gdriveDir, pack.modelFile))
    console.log(`  → Google Drive: ${gdriveDir}`)
  } catch (err) {
    console.warn(`  ⚠ Google Drive copy skipped for ${label}:`, (err as Error).message)
  }

  console.log(`\n${label}`)
  console.log(`  → ${teaserPath}`)
  console.log(`  → ${modelPath}`)
  console.log(`  → ${internalDir}`)
}

function main() {
  writePack({
    pack: CHRISTOS_INVESTOR_PACK,
    teaserHtml: renderChristosTeaser(),
    workbook: buildChristosWorkbook(),
    label: 'Christos Nicosia 3.3 MW',
  })
  writePack({
    pack: GALASCOPE_INVESTOR_PACK,
    teaserHtml: renderGalascopeTeaser(),
    workbook: buildGalascopeWorkbook(),
    label: 'Galascope 5 MW trackers',
  })
  console.log('\nDone — 2 investor packs generated.\n')
}

main()
