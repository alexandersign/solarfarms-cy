/**
 * Single HTML sales targeting report with contacts (from cyprus-energy-plants.json).
 *
 * Usage:
 *   npx tsx scripts/generate-cyprus-sales-targets-html.ts
 *   npx tsx scripts/generate-cyprus-sales-targets-html.ts --min-score 35
 */

import * as fs from 'fs'
import * as path from 'path'
import { normalizeDisplayPhone } from '../lib/csv-utf8'
import type { DeveloperGroup } from '../lib/cyprus-developer-groups'

const REPO = process.cwd()
const PLANTS_JSON = path.join(REPO, 'marketing', 'cyprus-energy-plants.json')
const DIRECTORS_JSON = path.join(REPO, 'marketing', 'cyprus-top-directors.json')
const GROUPS_JSON = path.join(REPO, 'marketing', 'cyprus-developer-groups.json')
const DOCS_INTERNAL = path.join(REPO, 'docs', 'internal')

interface PlantRow {
  cera_license_no?: string
  company_name: string
  company_reg_no?: string
  primary_sales_target?: string
  secondary_sales_targets?: string[]
  sales_target_summary?: string
  pipeline_stage?: string
  pv_kw?: number
  bess_kw?: number
  bess_kwh?: number
  plant_class?: string
  license_status?: string
  district_en?: string
  district?: string
  municipality?: string
  eac_res_listed?: boolean
  eac_match_confidence?: number
  contact_director_1?: string
  contact_director_2?: string
  contact_secretary?: string
  contact_email?: string
  contact_phone?: string
  contact_linkedin?: string
  contact_website?: string
  contact_email_source?: string
  registered_address?: string
  priority_score?: number
  outreach_priority?: string
  existing_client?: boolean
}

function esc(s: unknown): string {
  if (s === null || s === undefined) return ''
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function linkOrDash(url?: string, label?: string): string {
  if (!url) return '—'
  const u = esc(url)
  const t = esc(label || url.replace(/^https?:\/\/(www\.)?/, '').slice(0, 40))
  return `<a href="${u}" target="_blank" rel="noopener">${t}</a>`
}

function mailOrDash(email?: string): string {
  if (!email) return '—'
  const e = esc(email)
  return `<a href="mailto:${e}">${e}</a>`
}

function phoneOrDash(phone?: string): string {
  const p = normalizeDisplayPhone(phone)
  if (!p) return '—'
  const tel = esc(p.replace(/\s/g, ''))
  return `<a href="tel:${tel}">${esc(p)}</a>`
}

function plantRow(p: PlantRow): string {
  const pv = ((p.pv_kw || 0) / 1000).toFixed(2)
  const bess = ((p.bess_kw || 0) / 1000).toFixed(2)
  const eac = p.eac_res_listed
    ? `Yes${p.eac_match_confidence != null ? ` (${(p.eac_match_confidence * 100).toFixed(0)}%)` : ''}`
    : 'No'
  const directors = [p.contact_director_1, p.contact_director_2].filter(Boolean).join('<br>')
  const secondary = (p.secondary_sales_targets || []).join('; ')

  return `<tr>
    <td class="num">${p.priority_score ?? ''}</td>
    <td><strong>${esc(p.primary_sales_target || '—')}</strong><br><span class="muted">${esc(p.sales_target_summary || '')}</span></td>
    <td>${esc(p.company_name)}<br><span class="lic">${esc(p.cera_license_no || '')}</span>${p.company_reg_no ? `<br><span class="lic">${esc(p.company_reg_no)}</span>` : ''}</td>
    <td class="num">${pv}</td>
    <td class="num">${bess}</td>
    <td>${esc(p.district_en || p.district || '')}<br>${esc(p.municipality || '')}</td>
    <td>${esc(p.pipeline_stage || p.license_status || '')}</td>
    <td>${directors || '—'}${p.contact_secretary ? `<br><span class="muted">Sec: ${esc(p.contact_secretary)}</span>` : ''}</td>
    <td>${mailOrDash(p.contact_email)}${p.contact_email_source ? `<br><span class="muted">${esc(p.contact_email_source)}</span>` : ''}</td>
    <td>${phoneOrDash(p.contact_phone)}</td>
    <td>${linkOrDash(p.contact_linkedin, 'LinkedIn')}</td>
    <td>${linkOrDash(p.contact_website, 'Web')}</td>
    <td class="muted">${esc(secondary)}</td>
    <td>${eac}</td>
  </tr>`
}

function confidenceBadge(conf?: number): string {
  if (conf == null) return '<span class="muted">—</span>'
  const color = conf >= 80 ? '#1A7F37' : conf >= 50 ? '#9C7D22' : '#9b1c1c'
  return `<span style="color:${color};font-weight:600">${conf}%</span>`
}

function developerGroupRow(g: DeveloperGroup): string {
  const domain = g.developer_domain
    ? linkOrDash(g.developer_website || `https://${g.developer_domain}`, g.developer_domain)
    : g.developer_domain_suggested
      ? `<span class="muted">? ${esc(g.developer_domain_suggested)}</span>`
      : '—'
  const name = g.developer_name_resolved || g.best_contact_name || ''
  return `<tr>
    <td><strong>${esc(g.brand)}</strong>${name ? `<br><span class="muted">${esc(name)}</span>` : ''}</td>
    <td class="num">${g.spv_count}</td>
    <td class="num">${g.licence_count}</td>
    <td class="num">${g.total_pv_mwp.toFixed(1)}</td>
    <td class="num">${g.total_bess_mwp.toFixed(1)}</td>
    <td><strong>${esc(g.primary_sales_target || '—')}</strong></td>
    <td>${domain}</td>
    <td>${mailOrDash(g.best_contact_email)}</td>
    <td>${phoneOrDash(g.best_contact_phone)}</td>
    <td>${confidenceBadge(g.best_contact_confidence)}</td>
    <td class="lic">${esc(g.companies.slice(0, 6).join('; '))}</td>
  </tr>`
}

function directorRow(d: {
  display_name: string
  contact_email?: string
  contact_phone?: string
  contact_linkedin?: string
  spv_count: number
  licence_count: number
  total_pv_mwp: number
  total_bess_mwp: number
  sample_targets: string[]
  companies: string[]
}): string {
  return `<tr>
    <td><strong>${esc(d.display_name)}</strong></td>
    <td>${mailOrDash(d.contact_email)}</td>
    <td>${phoneOrDash(d.contact_phone)}</td>
    <td>${linkOrDash(d.contact_linkedin, 'Profile')}</td>
    <td class="num">${d.spv_count}</td>
    <td class="num">${d.licence_count}</td>
    <td class="num">${d.total_pv_mwp.toFixed(1)}</td>
    <td class="num">${d.total_bess_mwp.toFixed(1)}</td>
    <td>${esc((d.sample_targets || []).join('; '))}</td>
    <td class="lic">${esc((d.companies || []).slice(0, 6).join('; '))}</td>
  </tr>`
}

function main() {
  const minScore = parseInt(
    process.argv.find((a, i) => process.argv[i - 1] === '--min-score') || '35',
    10
  )

  if (!fs.existsSync(PLANTS_JSON)) {
    console.error('Missing', PLANTS_JSON)
    process.exit(1)
  }

  const data = JSON.parse(fs.readFileSync(PLANTS_JSON, 'utf-8'))
  const plants: PlantRow[] = (data.plants || [])
    .filter((p: PlantRow) => !p.existing_client && (p.priority_score || 0) >= minScore)
    .sort((a: PlantRow, b: PlantRow) => (b.priority_score || 0) - (a.priority_score || 0))

  const directors = fs.existsSync(DIRECTORS_JSON)
    ? JSON.parse(fs.readFileSync(DIRECTORS_JSON, 'utf-8')).directors || []
    : []

  const allGroups: DeveloperGroup[] = fs.existsSync(GROUPS_JSON)
    ? JSON.parse(fs.readFileSync(GROUPS_JSON, 'utf-8')).groups || []
    : []
  const developerGroups = allGroups
    .filter((g) => g.spv_count >= 2)
    .sort(
      (a, b) =>
        b.spv_count - a.spv_count ||
        b.max_priority_score - a.max_priority_score ||
        b.total_pv_mwp - a.total_pv_mwp
    )

  const byTarget = new Map<string, number>()
  let withEmail = 0
  let withPhone = 0
  let withDirector = 0
  for (const p of plants) {
    const t = p.primary_sales_target || 'Other'
    byTarget.set(t, (byTarget.get(t) || 0) + 1)
    if (p.contact_email) withEmail++
    if (p.contact_phone) withPhone++
    if (p.contact_director_1) withDirector++
  }

  const date = new Date().toISOString().split('T')[0]
  const outPath = path.join(
    DOCS_INTERNAL,
    `cyprus-sales-targets-${date}.html`
  )

  const targetSummary = [...byTarget.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([k, n]) => `<li><strong>${esc(k)}</strong> — ${n} licences</li>`)
    .join('\n')

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Cyprus PV / BESS sales targets — ${date}</title>
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
    main { max-width: 1400px; margin: 0 auto; padding: 1.25rem 1rem 3rem; }
    .stats { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.25rem; }
    .stat {
      background: #fff;
      border-radius: 6px;
      padding: 0.75rem 1rem;
      min-width: 120px;
      box-shadow: 0 1px 3px rgba(26,54,93,0.08);
    }
    .stat strong { display: block; font-size: 1.4rem; color: var(--primary); }
    .callout {
      background: #fff;
      border-left: 4px solid var(--accent);
      padding: 0.85rem 1rem;
      margin-bottom: 1.25rem;
      box-shadow: 0 1px 3px rgba(26,54,93,0.08);
    }
    .panel { margin-bottom: 2rem; }
    .panel h2 { color: var(--accent); font-size: 1.1rem; margin-bottom: 0.35rem; }
    .intro { margin-top: 0; max-width: 960px; line-height: 1.45; }
    .table-wrap { overflow-x: auto; background: #fff; border-radius: 6px; box-shadow: 0 1px 3px rgba(26,54,93,0.08); }
    table { border-collapse: collapse; width: 100%; min-width: 1100px; }
    thead { background: var(--primary); color: var(--white); }
    th, td { padding: 8px 10px; text-align: left; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
    th { font-weight: 600; font-size: 11px; }
    td.num { text-align: right; white-space: nowrap; }
    td.lic, .lic { font-size: 11px; color: var(--grey-text); }
    .muted { font-size: 11px; color: #64748b; }
    tbody tr:hover { background: #f8fafc; }
    a { color: var(--primary-light); }
    ul.targets { margin: 0.5rem 0 0 1.2rem; padding: 0; }
    footer { max-width: 1400px; margin: 0 auto; padding: 0 1rem 2rem; font-size: 11px; color: var(--grey-text); }
    @media print { .table-wrap { overflow: visible; } }
  </style>
</head>
<body>
  <header>
    <h1>Cyprus PV / BESS sales targets</h1>
    <div class="meta">Internal — Lighthief Cyprus Ltd · Generated ${date}</div>
    <div class="meta">Source: marketing/cyprus-energy-plants.json · Min priority score ${minScore} · ${plants.length} licence rows</div>
  </header>
  <main>
    <div class="stats">
      <div class="stat"><strong>${plants.length}</strong>Licences</div>
      <div class="stat"><strong>${withDirector}</strong>With directors</div>
      <div class="stat"><strong>${withEmail}</strong>With email</div>
      <div class="stat"><strong>${withPhone}</strong>With phone</div>
      <div class="stat"><strong>${directors.length}</strong>Multi-SPV directors</div>
      <div class="stat"><strong>${developerGroups.length}</strong>Developer groups</div>
    </div>
    <div class="callout">
      <strong>Offer mapping:</strong>
      <ul class="targets">${targetSummary}</ul>
      <p style="margin:0.75rem 0 0">Emails marked <em>pattern_guess</em> or from Google Places are unverified — confirm before outreach. Manual overrides in <code>marketing/cyprus-contact-overrides.json</code>.</p>
    </div>

    <section class="panel">
      <h2>Developer groups (SPV clusters)</h2>
      <p class="intro">SPV shells grouped by shared directors / brand into the real beneficial developer. Best contact prefers Hunter-verified emails; the developer domain feeds Hunter. <span class="muted">"?" = unverified suggestion for review.</span></p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Developer / group</th>
              <th>SPVs</th>
              <th>Licences</th>
              <th>PV MWp</th>
              <th>BESS MW</th>
              <th>Primary target</th>
              <th>Developer domain</th>
              <th>Best email</th>
              <th>Best phone</th>
              <th>Conf.</th>
              <th>Companies</th>
            </tr>
          </thead>
          <tbody>
            ${developerGroups.length ? developerGroups.map(developerGroupRow).join('\n') : '<tr><td colspan="11">Run npm run cyprus:cluster.</td></tr>'}
          </tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <h2>Top directors (multiple SPVs)</h2>
      <p class="intro">Relationship-led outreach — one contact may control several licence-holding SPVs.</p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Director</th>
              <th>Email</th>
              <th>Phone</th>
              <th>LinkedIn</th>
              <th>SPVs</th>
              <th>Licences</th>
              <th>PV MWp</th>
              <th>BESS MW</th>
              <th>Targets</th>
              <th>Companies</th>
            </tr>
          </thead>
          <tbody>
            ${directors.length ? directors.map(directorRow).join('\n') : '<tr><td colspan="10">Run npm run cyprus:directors after register enrichment.</td></tr>'}
          </tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <h2>All licence-level targets</h2>
      <p class="intro">Sorted by priority score. Primary column = what to sell (PV O&amp;M, PV EPC, Hybrid EPC, BESS EPC, etc.).</p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Score</th>
              <th>Primary target</th>
              <th>SPV / Licence</th>
              <th>PV MWp</th>
              <th>BESS MW</th>
              <th>Location</th>
              <th>Stage</th>
              <th>Directors</th>
              <th>Email</th>
              <th>Phone</th>
              <th>LinkedIn</th>
              <th>Web</th>
              <th>Secondary</th>
              <th>EAC</th>
            </tr>
          </thead>
          <tbody>
            ${plants.map(plantRow).join('\n')}
          </tbody>
        </table>
      </div>
    </section>
  </main>
  <footer>
    Lighthief Cyprus Ltd · HE 477423 · solarfarms.cy · Regenerate: npm run cyprus:sales-html
  </footer>
</body>
</html>`

  fs.mkdirSync(DOCS_INTERNAL, { recursive: true })
  fs.writeFileSync(outPath, html, 'utf8')
  console.log(`Wrote ${outPath}`)
  console.log(`  ${plants.length} rows · ${withEmail} emails · ${withPhone} phones`)
}

main()
