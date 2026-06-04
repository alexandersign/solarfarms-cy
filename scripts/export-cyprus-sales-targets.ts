/**
 * Master sales targeting CSV — one row per CERA licence with contact + offer columns.
 *
 * Usage:
 *   npx tsx scripts/export-cyprus-sales-targets.ts
 *   npx tsx scripts/export-cyprus-sales-targets.ts --min-score 35
 */

import * as fs from 'fs'
import * as path from 'path'
import { readCeraCsv, filterPvRows, rowsToPlantRecords } from '../lib/cyprus-cera-parse'
import { matchPortfolioClient } from '../lib/cyprus-portfolio-clients'
import { scorePlant } from '../lib/cyprus-prospect-scoring'
import { escCsvCell, normalizeDisplayPhone, writeCsvUtf8 } from '../lib/csv-utf8'
import type { DeveloperGroup } from '../lib/cyprus-developer-groups'

const PLANTS_JSON = path.join(process.cwd(), 'marketing', 'cyprus-energy-plants.json')
const MATCHES_JSON = path.join(process.cwd(), 'marketing', 'cyprus-plant-matches.json')
const GROUPS_JSON = path.join(process.cwd(), 'marketing', 'cyprus-developer-groups.json')
const OUT_CSV = path.join(process.cwd(), 'marketing', 'cyprus-sales-targets.csv')

function main() {
  const minScore = parseInt(
    process.argv.find((a, i) => process.argv[i - 1] === '--min-score') || '0',
    10
  )

  let plants: Record<string, unknown>[] = []

  if (fs.existsSync(PLANTS_JSON)) {
    plants = JSON.parse(fs.readFileSync(PLANTS_JSON, 'utf-8')).plants || []
  } else {
    plants = filterPvRows(readCeraCsv())
      .map((r) => rowsToPlantRecords([r])[0])
      .filter((p) => p.pv_kw >= 100 || p.bess_kw >= 100)
      .map((plant) => {
        const portfolio = matchPortfolioClient(plant.company_name)
        return { ...plant, ...scorePlant({ plant, eac_res_listed: false, eac_match_confidence: 0, existing_client: portfolio.existing_client }), ...portfolio }
      })
  }

  if (fs.existsSync(MATCHES_JSON)) {
    const matches = JSON.parse(fs.readFileSync(MATCHES_JSON, 'utf-8'))
    const byLic = new Map<string, (typeof matches.matches)[0]>()
    for (const m of matches.matches || []) {
      byLic.set(m.plant.cera_license_no, m)
    }
    plants = plants.map((p) => {
      const m = byLic.get(p.cera_license_no as string)
      if (!m) return p
      return {
        ...p,
        eac_res_listed: m.eac_res_listed,
        eac_match_confidence: m.confidence,
        eac_application_ref: m.eac?.application_ref,
      }
    })
  }

  // developer-group lookup
  const companyToGroup = new Map<string, DeveloperGroup>()
  if (fs.existsSync(GROUPS_JSON)) {
    const groups: DeveloperGroup[] = JSON.parse(fs.readFileSync(GROUPS_JSON, 'utf-8')).groups || []
    for (const g of groups) {
      for (const c of g.companies) companyToGroup.set(c.trim().toUpperCase(), g)
    }
  }

  const filtered = plants
    .filter((p) => (p.priority_score as number) >= minScore)
    .sort((a, b) => (b.priority_score as number) - (a.priority_score as number))

  const headers = [
    'CERA licence',
    'SPV / Company',
    'Developer group',
    'HE reg no',
    'Primary sales target',
    'Secondary targets',
    'Sales summary',
    'Pipeline stage',
    'PV MWp',
    'BESS MW',
    'BESS MWh',
    'Plant class',
    'Licence status',
    'District',
    'Municipality',
    'EAC listed',
    'Match confidence',
    'Director 1',
    'Director 2',
    'Secretary',
    'Contact email',
    'Email confidence',
    'Contact phone',
    'LinkedIn',
    'Website',
    'Email source',
    'Developer domain',
    'Registered address',
    'Priority score',
    'Outreach priority',
    'Portfolio client',
  ]

  const rows = filtered.map((p) => {
    const grp = companyToGroup.get(String(p.company_name).trim().toUpperCase())
    return [
      p.cera_license_no,
      p.company_name,
      grp && grp.spv_count >= 2 ? grp.brand : '',
      p.company_reg_no,
      p.primary_sales_target,
      (p.secondary_sales_targets as string[] || []).join('; '),
      p.sales_target_summary,
      p.pipeline_stage,
      ((p.pv_kw as number) || 0) / 1000,
      ((p.bess_kw as number) || 0) / 1000,
      ((p.bess_kwh as number) || 0) / 1000,
      p.plant_class,
      p.license_status,
      p.district_en || p.district,
      p.municipality,
      p.eac_res_listed ? 'yes' : 'no',
      p.eac_match_confidence,
      p.contact_director_1,
      p.contact_director_2,
      p.contact_secretary,
      p.contact_email,
      p.email_confidence ?? '',
      normalizeDisplayPhone(p.contact_phone as string | undefined),
      p.contact_linkedin,
      p.contact_website,
      p.contact_email_source,
      grp?.developer_domain || '',
      p.registered_address,
      p.priority_score,
      p.outreach_priority,
      p.existing_client ? 'yes' : 'no',
    ].map(escCsvCell).join(',')
  })

  const lines = [headers.join(','), ...rows]
  try {
    writeCsvUtf8(OUT_CSV, lines)
    console.log(`Wrote ${OUT_CSV} (${filtered.length} rows, min score ${minScore})`)
  } catch (e) {
    const err = e as NodeJS.ErrnoException
    if (err.code === 'EBUSY') {
      const alt = path.join(
        process.cwd(),
        'marketing',
        'cyprus-sales-targets-refresh.csv'
      )
      writeCsvUtf8(alt, lines)
      console.log(`Wrote ${alt} (${filtered.length} rows) — close Excel and re-run for main CSV`)
    } else {
      throw e
    }
  }
}

main()
