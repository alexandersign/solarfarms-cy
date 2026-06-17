/**
 * Shia-Sia site & model cross-validation.
 * Run: npx tsx scripts/validate-shia-sia-site.ts
 *
 * Checks land, capacity, layout, coords, and financial consistency across
 * DD analysis, sources, deal SSOT, PVGIS audit, and investor pack outputs.
 */

import * as fs from 'fs'
import * as path from 'path'
import { SHIA_SIA_RTB } from '../lib/deals/shia-sia-rtb'
import {
  EAC_CONNECTION,
  PERMITS,
  PV_YIELD,
  SHIA_SIA_INVESTOR_PACK,
} from '../lib/deals/shia-sia-sources'

type Status = 'pass' | 'warn' | 'fail' | 'gap'

interface Check {
  id: string
  area: string
  status: Status
  message: string
  sources: string[]
}

const checks: Check[] = []

function add(
  id: string,
  area: string,
  status: Status,
  message: string,
  sources: string[] = [],
) {
  checks.push({ id, area, status, message, sources })
}

const PANEL_W = 645
const D = SHIA_SIA_RTB
const root = process.cwd()

// ── Land & location ───────────────────────────────────────────────────────────

add(
  'land.plot',
  'Land',
  PERMITS.landPlot.includes('Plot 316') && PERMITS.landPlot.includes('Sia') ? 'pass' : 'fail',
  `Land registry: ${PERMITS.landPlot} (lease executed ${PERMITS.landLeaseExecuted})`,
  ['lib/deals/shia-sia-sources.ts', 'SHIA-SIA-PROJECT-ANALYSIS.md'],
)

const sheetNorm = PERMITS.landPlot.match(/Sheet (?:XXXIX|39)\/47/i)
add(
  'land.sheet',
  'Land',
  sheetNorm ? 'pass' : 'warn',
  sheetNorm
    ? 'Cadastral sheet 39/47 (XXXIX/47) — consistent with DD'
    : 'Sheet reference format differs from DD (39/47)',
  ['SHIA-SIA-PROJECT-ANALYSIS.md'],
)

add(
  'land.district',
  'Land',
  D.locationLine.includes('Larnaca') ? 'pass' : 'fail',
  `Public location: ${D.locationLine} — matches DD (Larnaca District, not Nicosia city)`,
  ['lib/deals/shia-sia-rtb.ts'],
)

add(
  'land.coords',
  'Land',
  'warn',
  `PVGIS coords ${PV_YIELD.coords.lat}, ${PV_YIELD.coords.lon} — APPROXIMATE (Sia village centroid); refine from town planning topographic plan when PDF available in repo`,
  ['scripts/pvgis-park-yield.py', 'pvgis-yield-shia-sia.json'],
)

// ── Capacity stack ────────────────────────────────────────────────────────────

const modulesAtModel = Math.round((D.solarMWp * 1e6) / PANEL_W)
const modulesAtPermit = Math.round((PERMITS.townPlanningMWp * 1e6) / PANEL_W)
const dcAcRatio = D.solarMWp / EAC_CONNECTION.acExportLimitMW

add(
  'cap.mwp-stack',
  'Capacity',
  D.solarMWp === PERMITS.townPlanningMWp ? 'pass' : 'warn',
  `Model ${D.solarMWp} MWp vs town planning ${PERMITS.townPlanningMWp} MWp vs EAC licence ${EAC_CONNECTION.licensedMWp} MWp — AC export cap ${EAC_CONNECTION.acExportLimitMW} MW`,
  ['shia-sia-rtb.ts', 'shia-sia-sources.ts', 'SHIA-SIA-PROJECT-ANALYSIS.md'],
)

add(
  'cap.modules',
  'Capacity',
  'pass',
  `Jinko ${PANEL_W}W: model ≈ ${modulesAtModel} modules (${D.solarMWp} MWp); permit max ≈ ${modulesAtPermit} modules (${PERMITS.townPlanningMWp} MWp)`,
  ['SHIA-SIA-PROJECT-ANALYSIS.md'],
)

add(
  'cap.dc-ac',
  'Capacity',
  dcAcRatio >= 1.15 && dcAcRatio <= 1.35 ? 'pass' : 'warn',
  `DC:AC ratio ${dcAcRatio.toFixed(2)} (${D.solarMWp} MWp DC / ${EAC_CONNECTION.acExportLimitMW} MW AC) — typical utility range 1.15–1.35`,
  ['EAC connection terms'],
)

// ── Layout & spacing ──────────────────────────────────────────────────────────

add(
  'layout.design',
  'Layout',
  D.technologySolar.toLowerCase().includes('east') ? 'pass' : 'fail',
  `Financial model layout: ${D.technologySolar}`,
  ['lib/deals/shia-sia-rtb.ts'],
)

add(
  'layout.permit-dd',
  'Layout',
  'warn',
  'DD quick reference still lists south fixed tilt 15° / 0.5 m pile (Dec 2024 drawings). Current Lighthief design = bifacial E–W 10° — intentional change; confirm no permit amendment required before EPC',
  ['SHIA-SIA-PROJECT-ANALYSIS.md'],
)

add(
  'layout.row-spacing',
  'Layout',
  'gap',
  'Row pitch / GCR / inter-row spacing NOT extractable — town planning drawings (Dec 2024) not in git. Cannot validate physical row fit on Plot 316 without OCR of layout PDF or seller confirmation',
  ['SHIA-SIA-PROJECT-ANALYSIS.md § Town planning drawings'],
)

add(
  'layout.yield-alignment',
  'Layout',
  Math.abs(D.specificYieldKwhPerKwp - PV_YIELD.modelKwhKwp) <= 10 ? 'pass' : 'fail',
  `Yield ${D.specificYieldKwhPerKwp} kWh/kWp matches PVGIS E–W audit ${PV_YIELD.modelKwhKwp} (south ref ${PV_YIELD.southReferenceKwhKwp})`,
  ['pvgis-yield-shia-sia.json', 'shia-sia-rtb.ts'],
)

// ── BESS vs layout ────────────────────────────────────────────────────────────

add(
  'bess.size',
  'BESS',
  D.bessMWh === 7.5 && D.bessPowerMW === 2.5 ? 'pass' : 'warn',
  `BESS ${D.bessPowerMW} MW / ${D.bessMWh} MWh (${D.bessDurationHours}h) — downsized for E–W 45% curtailment (DD still recommends 10 MWh for 50% south case)`,
  ['shia-sia-rtb.ts'],
)

// ── Financial consistency ─────────────────────────────────────────────────────

const expectedAnnual = Math.round(D.solarMWp * D.specificYieldKwhPerKwp)
add(
  'fin.generation',
  'Financial',
  D.annualProductionMWh === expectedAnnual ? 'pass' : 'fail',
  `Annual generation ${D.annualProductionMWh} MWh = ${D.solarMWp} × ${D.specificYieldKwhPerKwp}`,
  ['shia-sia-rtb.ts'],
)

const capexSum =
  D.capex.rtbAcquisition +
  D.capex.pvEpc +
  D.capex.bessEpc +
  D.capex.connectionTerms
add(
  'fin.capex',
  'Financial',
  capexSum === D.capex.total ? 'pass' : 'fail',
  `CAPEX total €${D.capex.total.toLocaleString()} = RTB + PV + BESS + EAC grid (€${D.capex.connectionTerms.toLocaleString()})`,
  ['shia-sia-rtb.ts'],
)

// ── Output files exist ────────────────────────────────────────────────────────

const packFiles = [
  path.join(root, SHIA_SIA_INVESTOR_PACK.outputDir, SHIA_SIA_INVESTOR_PACK.modelFile),
  path.join(root, SHIA_SIA_INVESTOR_PACK.outputDir, SHIA_SIA_INVESTOR_PACK.teaserFile),
  path.join(root, SHIA_SIA_INVESTOR_PACK.internalDir, SHIA_SIA_INVESTOR_PACK.sourcesFile),
]

for (const f of packFiles) {
  add(
    'pack.file',
    'Investor pack',
    fs.existsSync(f) ? 'pass' : 'fail',
    fs.existsSync(f) ? `Present: ${path.relative(root, f)}` : `Missing: ${path.relative(root, f)}`,
    ['generate-shia-sia-investor-pack.ts'],
  )
}

const teaserPath = path.join(root, SHIA_SIA_INVESTOR_PACK.outputDir, SHIA_SIA_INVESTOR_PACK.teaserFile)
if (fs.existsSync(teaserPath)) {
  const html = fs.readFileSync(teaserPath, 'utf8')
  add(
    'pack.teaser-land',
    'Investor pack',
    html.includes('Plot 316') && html.includes('Larnaca') ? 'pass' : 'fail',
    'Teaser includes Plot 316 + Larnaca District',
    [SHIA_SIA_INVESTOR_PACK.teaserFile],
  )
  add(
    'pack.teaser-layout',
    'Investor pack',
    html.includes('E–W 10') || html.includes('E-W 10') ? 'pass' : 'fail',
    'Teaser states E–W 10° layout',
    [SHIA_SIA_INVESTOR_PACK.teaserFile],
  )
  const mwpInTeaser = html.match(/\b(3\.\d{2}) MWp \/ 7\.5 MWh/)
  if (mwpInTeaser) {
    add(
      'pack.teaser-mwp',
      'Investor pack',
      parseFloat(mwpInTeaser[1]) === D.solarMWp ? 'pass' : 'warn',
      `Teaser headline ${mwpInTeaser[1]} MWp vs model ${D.solarMWp} MWp vs permit ${PERMITS.townPlanningMWp} MWp`,
      [SHIA_SIA_INVESTOR_PACK.teaserFile],
    )
  }
}

// ── Report ────────────────────────────────────────────────────────────────────

const counts = { pass: 0, warn: 0, fail: 0, gap: 0 }
for (const c of checks) counts[c.status]++

const lines: string[] = [
  '# Shia-Sia Site & Model Validation',
  '',
  `> Generated ${new Date().toISOString().slice(0, 10)} · \`npx tsx scripts/validate-shia-sia-site.ts\``,
  '',
  '## Summary',
  '',
  `| Status | Count |`,
  `|--------|-------|`,
  `| ✅ Pass | ${counts.pass} |`,
  `| ⚠️ Warn | ${counts.warn} |`,
  `| ❌ Fail | ${counts.fail} |`,
  `| ⬜ Gap (data not in repo) | ${counts.gap} |`,
  '',
  '## Checks',
  '',
]

for (const c of checks) {
  const icon =
    c.status === 'pass' ? '✅' : c.status === 'warn' ? '⚠️' : c.status === 'fail' ? '❌' : '⬜'
  lines.push(`### ${icon} ${c.id} — ${c.area}`)
  lines.push('')
  lines.push(c.message)
  if (c.sources.length) lines.push(`\n*Sources: ${c.sources.join(', ')}*`)
  lines.push('')
}

lines.push('## Actions required before investor send')
lines.push('')
lines.push('1. **Row spacing / GCR** — obtain town planning layout PDF from Novikov DD; OCR module count + pitch; confirm E–W 10° fits Plot 316 boundary.')
lines.push('2. **Coordinates** — replace approximate PVGIS centroid with coords from topographic plan.')
lines.push(`3. **MWp alignment** — decide model basis: ${PERMITS.townPlanningMWp} MWp (permit) vs ${D.solarMWp} MWp (current model) vs ${EAC_CONNECTION.licensedMWp} MWp (EAC licence).`)
lines.push('4. **Permit amendment** — if E–W 10° differs materially from Dec 2024 south 15° drawings, confirm with seller whether town planning amendment is needed.')
lines.push('5. **Land lease rent** — OCR executed lease for actual €/yr (currently €18k indicative).')
lines.push('')

const outPath = path.join(root, 'parks-for-sale/novikov/SITE-VALIDATION.md')
fs.writeFileSync(outPath, lines.join('\n'), 'utf8')

console.log('\nShia-Sia site validation')
console.log(`  Pass ${counts.pass} | Warn ${counts.warn} | Fail ${counts.fail} | Gap ${counts.gap}`)
console.log(`  → ${outPath}\n`)

for (const c of checks.filter((x) => x.status === 'fail' || x.status === 'gap')) {
  console.log(`  [${c.status.toUpperCase()}] ${c.id}: ${c.message}`)
}

process.exitCode = counts.fail > 0 ? 1 : 0
