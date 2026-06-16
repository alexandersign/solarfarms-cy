/**
 * Cluster SPV shells into developer groups -> marketing/cyprus-developer-groups.json (+ .csv)
 *
 * Usage:
 *   npx tsx scripts/cluster-cyprus-developers.ts
 *   npx tsx scripts/cluster-cyprus-developers.ts --min-score 35
 *   npx tsx scripts/cluster-cyprus-developers.ts --min-spvs 2   (only multi-SPV groups in console)
 */

import * as fs from 'fs'
import * as path from 'path'
import {
  buildDeveloperGroups,
  type DeveloperGroup,
  type DeveloperGroupPlant,
} from '../lib/cyprus-developer-groups'
import { escCsvCell, normalizeDisplayPhone, writeCsvUtf8 } from '../lib/csv-utf8'

const REPO = process.cwd()
const PLANTS_JSON = path.join(REPO, 'marketing', 'cyprus-energy-plants.json')
const OUT_JSON = path.join(REPO, 'marketing', 'cyprus-developer-groups.json')
const OUT_CSV = path.join(REPO, 'marketing', 'cyprus-developer-groups.csv')

function arg(name: string, fallback: number): number {
  const i = process.argv.indexOf(name)
  if (i >= 0 && process.argv[i + 1]) return parseInt(process.argv[i + 1], 10)
  return fallback
}

function main() {
  const minScore = arg('--min-score', 35)
  const minSpvsConsole = arg('--min-spvs', 1)

  if (!fs.existsSync(PLANTS_JSON)) {
    console.error('Missing', PLANTS_JSON, '— run npm run cyprus:plants first')
    process.exit(1)
  }

  const data = JSON.parse(fs.readFileSync(PLANTS_JSON, 'utf-8'))
  const plants: DeveloperGroupPlant[] = data.plants || []

  // preserve previously resolved developer/contact fields across re-runs
  const prev: Record<string, DeveloperGroup> = {}
  if (fs.existsSync(OUT_JSON)) {
    try {
      const old = JSON.parse(fs.readFileSync(OUT_JSON, 'utf-8'))
      for (const g of old.groups || []) prev[g.group_id] = g
    } catch {
      /* ignore */
    }
  }

  const groups = buildDeveloperGroups(plants, { minScore })

  // carry forward developer-domain / best-contact resolution
  for (const g of groups) {
    const p = prev[g.group_id]
    if (!p) continue
    g.developer_domain = p.developer_domain
    g.developer_website = p.developer_website
    g.developer_linkedin = p.developer_linkedin
    g.developer_source = p.developer_source
    g.best_contact_name = p.best_contact_name
    g.best_contact_email = p.best_contact_email
    g.best_contact_phone = p.best_contact_phone
    g.best_contact_linkedin = p.best_contact_linkedin
    g.best_contact_confidence = p.best_contact_confidence
    g.best_contact_source = p.best_contact_source
  }

  const multi = groups.filter((g) => g.spv_count >= 2)
  const payload = {
    generatedAt: new Date().toISOString(),
    minScore,
    groupCount: groups.length,
    multiSpvGroupCount: multi.length,
    groups,
  }
  fs.writeFileSync(OUT_JSON, JSON.stringify(payload, null, 2), 'utf8')

  const headers = [
    'Developer group',
    'Brand',
    'SPVs',
    'Licences',
    'PV MWp',
    'BESS MW',
    'Max score',
    'Primary target',
    'Districts',
    'Directors',
    'Developer domain',
    'Best contact',
    'Best email',
    'Best phone',
    'Confidence',
    'Companies',
  ]
  const rows = groups.map((g) =>
    [
      g.group_id,
      g.brand,
      g.spv_count,
      g.licence_count,
      g.total_pv_mwp.toFixed(2),
      g.total_bess_mwp.toFixed(2),
      g.max_priority_score,
      g.primary_sales_target,
      g.districts.join('; '),
      g.directors.slice(0, 4).join('; '),
      g.developer_domain || '',
      g.best_contact_name || '',
      g.best_contact_email || '',
      normalizeDisplayPhone(g.best_contact_phone),
      g.best_contact_confidence != null ? String(g.best_contact_confidence) : '',
      g.companies.slice(0, 8).join('; '),
    ]
      .map(escCsvCell)
      .join(',')
  )
  writeCsvUtf8(OUT_CSV, [headers.join(','), ...rows])

  console.log(`Developer groups: ${groups.length} (multi-SPV: ${multi.length})`)
  groups
    .filter((g) => g.spv_count >= minSpvsConsole)
    .slice(0, 20)
    .forEach((g) => {
      console.log(
        `  ${g.brand} — ${g.spv_count} SPVs, ${g.licence_count} licences, ${g.total_pv_mwp.toFixed(1)} MWp · ${g.primary_sales_target}`
      )
    })
  console.log(`Wrote ${OUT_JSON}`)
  console.log(`Wrote ${OUT_CSV}`)
}

main()
