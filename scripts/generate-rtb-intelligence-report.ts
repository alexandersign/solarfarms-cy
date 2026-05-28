/**
 * Generate internal HTML report from marketing/cera-rtb-segments.json
 * (produced by: npx tsx scripts/import-cera-prospects.ts --dry-run --min-mwp 1)
 *
 * Usage:
 *   npx tsx scripts/generate-rtb-intelligence-report.ts
 */

import * as fs from 'fs'
import * as path from 'path'

const REPO = process.cwd()
const SEGMENTS = path.join(REPO, 'marketing', 'cera-rtb-segments.json')
const DOCS_INTERNAL = path.join(REPO, 'docs', 'internal')

interface SegmentRow {
  company: string
  capacityMwp: number
  constructionMwp: number
  operationalMwp: number
  hasBess: boolean
  bessKwh: number
  status: string
  districts: string[]
  municipalities: string[]
  licenseCount: number
  licenses: string[]
  rtb_status?: string
  bess_sales_angle?: string
  priority?: string
  offerType?: string
}

interface PlantLevelRow {
  cera_license_no?: string
  company_name: string
  pv_kw?: number
  bess_kw?: number
  plant_class?: string
  license_status?: string
  municipality?: string
  district?: string
  district_en?: string
  eac_res_listed?: boolean
  commercial_segments?: string[]
  primary_sales_target?: string
  contact_director_1?: string
  contact_email?: string
  priority_score?: number
}

interface SegmentsFile {
  generatedAt?: string
  minMwpPanel?: number
  counts?: Record<string, number>
  rtbCandidates: SegmentRow[]
  mixedConstructionPipeline: SegmentRow[]
  bessRetrofitTargets: SegmentRow[]
  bessPreSaleTargets: SegmentRow[]
  plantLevel?: {
    standaloneBess?: PlantLevelRow[]
    eacMatchedConstruction?: PlantLevelRow[]
    bessPreSalePlants?: PlantLevelRow[]
    pvOmPlants?: PlantLevelRow[]
    unmatchedEacSample?: unknown[]
  }
}

function esc(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function rowCells(r: SegmentRow): string {
  const lic = r.licenses?.slice(0, 3).join(', ') || ''
  const more = (r.licenses?.length || 0) > 3 ? ` (+${r.licenses!.length - 3})` : ''
  return `<tr>
    <td>${esc(r.company)}</td>
    <td class="num">${r.capacityMwp?.toFixed(2) ?? '-'}</td>
    <td class="num">${r.constructionMwp?.toFixed(2) ?? '-'}</td>
    <td class="num">${r.operationalMwp?.toFixed(2) ?? '-'}</td>
    <td>${r.hasBess ? 'Yes' : 'No'}</td>
    <td>${esc(r.bess_sales_angle || '-')}</td>
    <td>${esc((r.municipalities || []).slice(0, 2).join(', '))}</td>
    <td class="lic">${esc(lic)}${esc(more)}</td>
  </tr>`
}

function plantRowCells(r: PlantLevelRow): string {
  const contact = [r.contact_director_1, r.contact_email].filter(Boolean).join(' · ')
  return `<tr>
    <td>${esc(r.company_name)}</td>
    <td class="lic">${esc(r.cera_license_no || '')}</td>
    <td><strong>${esc(r.primary_sales_target || '-')}</strong></td>
    <td class="num">${r.pv_kw != null ? (r.pv_kw / 1000).toFixed(2) : '-'}</td>
    <td class="num">${r.bess_kw != null ? (r.bess_kw / 1000).toFixed(2) : '-'}</td>
    <td>${esc(r.plant_class || '')}</td>
    <td>${esc(contact || '-')}</td>
    <td>${esc(r.municipality || '')}</td>
    <td class="num">${r.priority_score ?? '-'}</td>
  </tr>`
}

function plantTable(title: string, rows: PlantLevelRow[], intro: string): string {
  const body = rows.length
    ? rows.map(plantRowCells).join('\n')
    : '<tr><td colspan="9">No rows.</td></tr>'
  return `
  <section class="panel">
    <h2>${esc(title)}</h2>
    <p class="intro">${esc(intro)}</p>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>CERA licence</th>
            <th>Sales target</th>
            <th>PV MWp</th>
            <th>BESS MW</th>
            <th>Class</th>
            <th>Contact</th>
            <th>Municipality</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>${body}</tbody>
      </table>
    </div>
    <p class="count">${rows.length} row(s)</p>
  </section>`
}

function table(title: string, rows: SegmentRow[], intro: string): string {
  const body = rows.length ? rows.map(rowCells).join('\n') : '<tr><td colspan="8">No rows.</td></tr>'
  return `
  <section class="panel">
    <h2>${esc(title)}</h2>
    <p class="intro">${esc(intro)}</p>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Total MWp</th>
            <th>Construction MWp</th>
            <th>Operational MWp</th>
            <th>BESS (licence)</th>
            <th>BESS angle</th>
            <th>Municipality</th>
            <th>Licences (sample)</th>
          </tr>
        </thead>
        <tbody>${body}</tbody>
      </table>
    </div>
    <p class="count">${rows.length} row(s)</p>
  </section>`
}

function main() {
  if (!fs.existsSync(SEGMENTS)) {
    console.error(`Missing ${SEGMENTS}`)
    console.error('Run: npx tsx scripts/import-cera-prospects.ts --dry-run --min-mwp 1')
    process.exit(1)
  }

  const raw = fs.readFileSync(SEGMENTS, 'utf-8')
  const data = JSON.parse(raw) as SegmentsFile

  const dateSlug = new Date().toISOString().slice(0, 10)
  const outPath = path.join(DOCS_INTERNAL, `rtb-cyprus-intelligence-${dateSlug}.html`)

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Cyprus RTB / BESS intelligence — ${esc(dateSlug)}</title>
  <style>
    :root {
      --primary: #1A365D;
      --primary-light: #2B5FA0;
      --accent: #C9A432;
      --white: #FFFFFF;
      --grey-text: #404040;
      --body-bg: #F0F4F8;
    }
    body { font-family: 'Segoe UI', system-ui, sans-serif; margin: 0; background: var(--body-bg); color: var(--grey-text); font-size: 13px; }
    header {
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
      color: var(--white);
      padding: 1.25rem 1.5rem;
    }
    header h1 { margin: 0; font-size: 1.35rem; color: var(--accent); }
    header .meta { margin-top: 0.5rem; opacity: 0.95; font-size: 12px; }
    main { max-width: 1200px; margin: 0 auto; padding: 1.25rem 1rem 3rem; }
    .callout {
      background: #fff;
      border-left: 4px solid var(--accent);
      padding: 0.85rem 1rem;
      margin-bottom: 1.25rem;
      box-shadow: 0 1px 3px rgba(26,54,93,0.08);
    }
    .panel { margin-bottom: 2rem; }
    .panel h2 { color: var(--accent); font-size: 1.1rem; margin-bottom: 0.35rem; }
    .intro { margin-top: 0; max-width: 900px; line-height: 1.45; }
    .table-wrap { overflow-x: auto; background: #fff; border-radius: 6px; box-shadow: 0 1px 3px rgba(26,54,93,0.08); }
    table { border-collapse: collapse; width: 100%; min-width: 880px; }
    thead { background: var(--primary); color: var(--white); }
    th, td { padding: 8px 10px; text-align: left; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
    th { font-weight: 600; font-size: 12px; }
    td.num { text-align: right; white-space: nowrap; }
    td.lic { font-size: 11px; color: var(--grey-text); max-width: 240px; }
    tbody tr:hover { background: #f8fafc; }
    .count { font-size: 12px; color: var(--grey-text); margin-top: 0.5rem; }
    footer { max-width: 1200px; margin: 0 auto; padding: 0 1rem 2rem; font-size: 11px; color: var(--grey-text); }
  </style>
</head>
<body>
  <header>
    <h1>Cyprus RTB / BESS intelligence</h1>
    <div class="meta">Internal — generated ${esc(dateSlug)} · Source segments: ${esc(data.generatedAt || 'unknown')}</div>
    <div class="meta">Threshold: ≥ ${data.minMwpPanel ?? 1} MWp per segment axis · CERA CSV only; enrich via marketing/research/rtb-enrichment-template.csv</div>
  </header>
  <main>
    <div class="callout">
      <strong>Limits:</strong> CERA catalogue does not include connection terms, environmental approval, or building permits.
      Preliminary connection offers are not public — validate via TSOC/EAC contacts and applicant disclosures.
      Mixed portfolios (operational + construction licences) appear under “Mixed construction pipeline” rather than strict RTB candidates.
    </div>
    ${table(
      'Panel A — RTB candidates (construction ≥1 MWp, no operational CERA rows)',
      data.rtbCandidates || [],
      'Companies with only construction-phase PV licences totalling ≥1 MWp. Cross-check env permit, connection terms, and satellite imagery before outreach.'
    )}
    ${table(
      'Mixed construction pipeline (≥1 MWp construction but also operational licences)',
      data.mixedConstructionPipeline || [],
      'Developer has operating assets and new construction — RTB work may apply only to greenfield licences; verify per licence.'
    )}
    ${table(
      'Panel B — BESS retrofit targets (operational ≥1 MWp, no BESS in CERA row)',
      data.bessRetrofitTargets || [],
      'Operational PV without co-licensed BESS; priority for stand-alone BESS / hybrid studies.'
    )}
    ${table(
      'Panel C — BESS pre-sale targets (construction ≥1 MWp, no BESS in CERA row)',
      data.bessPreSaleTargets || [],
      'Construction-phase PV without BESS fields populated — co-locate BESS in build.'
    )}
    ${plantTable(
      'Panel D — Standalone BESS licences (CERA PV kW = 0)',
      data.plantLevel?.standaloneBess || [],
      'BESS-only construction licences — BESS EPC + O&M targets.'
    )}
    ${plantTable(
      'Panel E — Construction + EAC RES listed (grid POS proxy)',
      data.plantLevel?.eacMatchedConstruction || [],
      'Matched by municipality + capacity to EAC RES table. EAC listed confirms POS progress on distribution network — not the same as a private final connection terms PDF.'
    )}
    ${plantTable(
      'Panel F — PV O&M targets (operational, EAC listed)',
      data.plantLevel?.pvOmPlants || [],
      'Operational PV ≥1 MWp with EAC inventory match — PV O&M outreach.'
    )}
  </main>
  <footer>
    Counts JSON: RTB ${data.counts?.rtbCandidates ?? '-'}, mixed ${data.counts?.mixedConstructionPipeline ?? '-'}, retrofit ${data.counts?.bessRetrofitTargets ?? '-'}, pre-sale ${data.counts?.bessPreSaleTargets ?? '-'}.
    Plant-level: standalone BESS ${data.counts?.standaloneBess ?? '-'}, EAC+construction ${data.counts?.eacMatchedConstruction ?? '-'}, PV O&M ${data.counts?.pvOmPlants ?? '-'}.
  </footer>
</body>
</html>`

  fs.mkdirSync(DOCS_INTERNAL, { recursive: true })
  fs.writeFileSync(outPath, html, 'utf-8')
  console.log(`Wrote ${outPath}`)
}

main()
