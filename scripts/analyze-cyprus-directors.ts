/**
 * Find directors appearing on multiple PV/BESS SPVs (portfolio developers).
 *
 * Usage:
 *   npx tsx scripts/analyze-cyprus-directors.ts
 *   npx tsx scripts/analyze-cyprus-directors.ts --min-spvs 3
 */

import * as fs from 'fs'
import * as path from 'path'
import { normalizeDirectorKey } from '../lib/cyprus-company-register'

const PLANTS_JSON = path.join(process.cwd(), 'marketing', 'cyprus-energy-plants.json')
const OUT_JSON = path.join(process.cwd(), 'marketing', 'cyprus-top-directors.json')
const OUT_CSV = path.join(process.cwd(), 'marketing', 'cyprus-top-directors.csv')

interface DirectorAgg {
  director_key: string
  display_name: string
  spv_count: number
  licence_count: number
  total_pv_mwp: number
  total_bess_mwp: number
  companies: string[]
  sample_targets: string[]
  districts: string[]
  contact_email?: string
  contact_phone?: string
  contact_linkedin?: string
}

function parseArgs() {
  const args = process.argv.slice(2)
  let minSpvs = 2
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--min-spvs' && args[i + 1]) {
      minSpvs = parseInt(args[i + 1], 10)
      i++
    }
  }
  return { minSpvs }
}

function main() {
  const { minSpvs } = parseArgs()
  if (!fs.existsSync(PLANTS_JSON)) {
    console.error('Missing plants JSON. Run import + enrich-cyprus-plants-register first.')
    process.exit(1)
  }

  const data = JSON.parse(fs.readFileSync(PLANTS_JSON, 'utf-8'))
  const plants = data.plants || []

  const byDirector = new Map<string, DirectorAgg>()

  for (const p of plants) {
    const directors = [
      p.contact_director_1,
      p.contact_director_2,
    ].filter(Boolean) as string[]

    for (const rawName of directors) {
      const key = normalizeDirectorKey(rawName)
      if (!key || key.length < 5) continue

      if (!byDirector.has(key)) {
        byDirector.set(key, {
          director_key: key,
          display_name: rawName,
          spv_count: 0,
          licence_count: 0,
          total_pv_mwp: 0,
          total_bess_mwp: 0,
          companies: [],
          sample_targets: [],
          districts: [],
        })
      }
      const agg = byDirector.get(key)!
      if (!agg.companies.includes(p.company_name)) {
        agg.companies.push(p.company_name)
        agg.spv_count++
      }
      agg.licence_count++
      agg.total_pv_mwp += (p.pv_kw || 0) / 1000
      agg.total_bess_mwp += (p.bess_kw || 0) / 1000
      if (p.primary_sales_target && !agg.sample_targets.includes(p.primary_sales_target)) {
        agg.sample_targets.push(p.primary_sales_target)
      }
      const d = p.district_en || p.district
      if (d && !agg.districts.includes(d)) agg.districts.push(d)
      if (!agg.contact_email && p.contact_email) agg.contact_email = p.contact_email
      if (!agg.contact_phone && p.contact_phone) agg.contact_phone = p.contact_phone
      if (!agg.contact_linkedin && p.contact_linkedin) agg.contact_linkedin = p.contact_linkedin
    }
  }

  const ranked = [...byDirector.values()]
    .filter((d) => d.spv_count >= minSpvs)
    .sort((a, b) => b.spv_count - a.spv_count || b.licence_count - a.licence_count)

  const payload = {
    generatedAt: new Date().toISOString(),
    minSpvs,
    directorCount: ranked.length,
    directors: ranked.slice(0, 200),
  }

  fs.writeFileSync(OUT_JSON, JSON.stringify(payload, null, 2))

  const headers = [
    'Director',
    'Email',
    'Phone',
    'LinkedIn',
    'SPV count',
    'Licences',
    'Total PV MWp',
    'Total BESS MW',
    'Primary targets (sample)',
    'Districts',
    'Companies (first 8)',
  ]
  const csvRows = ranked.map((d) =>
    [
      d.display_name,
      d.contact_email || '',
      d.contact_phone || '',
      d.contact_linkedin || '',
      d.spv_count,
      d.licence_count,
      d.total_pv_mwp.toFixed(2),
      d.total_bess_mwp.toFixed(2),
      d.sample_targets.join('; '),
      d.districts.join('; '),
      d.companies.slice(0, 8).join('; '),
    ]
      .map((v) => {
        const s = String(v)
        return s.includes(',') || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s
      })
      .join(',')
  )
  fs.writeFileSync(OUT_CSV, [headers.join(','), ...csvRows].join('\n'), 'utf-8')

  console.log(`Top directors (≥${minSpvs} SPVs): ${ranked.length}`)
  ranked.slice(0, 15).forEach((d) => {
    console.log(
      `  ${d.display_name}: ${d.spv_count} SPVs, ${d.licence_count} licences, ${d.total_pv_mwp.toFixed(1)} MWp PV`
    )
  })
  console.log(`Wrote ${OUT_JSON}`)
  console.log(`Wrote ${OUT_CSV}`)
}

main()
