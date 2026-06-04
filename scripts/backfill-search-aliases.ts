/**
 * Backfill search_aliases, all_directors, and contact_director_* for all pv_prospects.
 * Merges CRM row data with cyprus-energy-plants.json + cyprus-developer-groups.json.
 *
 * Usage: npx tsx scripts/backfill-search-aliases.ts
 */
import * as fs from 'fs'
import * as path from 'path'
import { supabase } from '../lib/supabase'
import {
  buildProspectSearchAliases,
  collectDirectorsFromPlantRows,
  formatAllDirectors,
  uniqueDirectorNames,
  type PlantDirectorRow,
} from '../lib/crm-search-aliases'
import type { DeveloperGroup } from '../lib/cyprus-developer-groups'

const PLANTS_JSON = path.join(process.cwd(), 'marketing', 'cyprus-energy-plants.json')
const GROUPS_JSON = path.join(process.cwd(), 'marketing', 'cyprus-developer-groups.json')

function companyKey(name: string): string {
  return name.trim().toUpperCase().replace(/\s+/g, ' ')
}

function loadPlantDirectorMap(): Map<string, PlantDirectorRow[]> {
  const map = new Map<string, PlantDirectorRow[]>()
  if (!fs.existsSync(PLANTS_JSON)) return map
  const plants = JSON.parse(fs.readFileSync(PLANTS_JSON, 'utf-8')).plants || []
  for (const p of plants) {
    if (!p.company_name) continue
    const k = companyKey(p.company_name)
    if (!map.has(k)) map.set(k, [])
    map.get(k)!.push({
      contact_director_1: p.contact_director_1,
      contact_director_2: p.contact_director_2,
      contact_secretary: p.contact_secretary,
      contact_name: p.contact_name,
    })
  }
  return map
}

function loadCompanyToGroup(): Map<string, DeveloperGroup> {
  const map = new Map<string, DeveloperGroup>()
  if (!fs.existsSync(GROUPS_JSON)) return map
  const groups: DeveloperGroup[] = JSON.parse(fs.readFileSync(GROUPS_JSON, 'utf-8')).groups || []
  for (const g of groups) {
    for (const c of g.companies) map.set(companyKey(c), g)
  }
  return map
}

async function main() {
  const plantMap = loadPlantDirectorMap()
  const groupMap = loadCompanyToGroup()
  console.log(`Plant director map: ${plantMap.size} companies · Groups: ${groupMap.size} company links`)

  let from = 0
  const pageSize = 500
  let updated = 0

  for (;;) {
    const { data, error } = await supabase
      .from('pv_prospects')
      .select(
        'id, company_name, contact_name, secondary_contact_name, parent_group, contact_director_1, contact_director_2, all_directors'
      )
      .range(from, from + pageSize - 1)
    if (error) throw error
    if (!data || data.length === 0) break

    for (const row of data as {
      id: string
      company_name?: string
      contact_name?: string
      secondary_contact_name?: string
      parent_group?: string
      contact_director_1?: string
      contact_director_2?: string
      all_directors?: string
    }[]) {
      const k = row.company_name ? companyKey(row.company_name) : ''
      const grp = k ? groupMap.get(k) : undefined
      const plantRows = k ? plantMap.get(k) || [] : []

      const names = uniqueDirectorNames({
        company_name: row.company_name,
        contact_name: row.contact_name,
        contact_director_1: row.contact_director_1,
        contact_director_2: row.contact_director_2,
        secondary_contact_name: row.secondary_contact_name,
        all_directors: row.all_directors,
        parent_group: row.parent_group || grp?.brand,
        groupDirectors: grp?.directors,
        extraNames: collectDirectorsFromPlantRows(plantRows),
      })

      const patch = {
        search_aliases: buildProspectSearchAliases({
          company_name: row.company_name,
          contact_name: row.contact_name,
          contact_director_1: names[0],
          contact_director_2: names[1],
          secondary_contact_name: row.secondary_contact_name,
          parent_group: row.parent_group || grp?.brand,
          groupDirectors: grp?.directors,
          extraNames: collectDirectorsFromPlantRows(plantRows),
        }),
        contact_director_1: names[0] || null,
        contact_director_2: names[1] || null,
        all_directors: names.length ? formatAllDirectors(names) : null,
      }

      const { error: ue } = await supabase.from('pv_prospects').update(patch).eq('id', row.id)
      if (!ue) updated++
    }
    console.log(`  updated ${updated} rows so far…`)
    if (data.length < pageSize) break
    from += pageSize
  }
  console.log(`Done: directors + search_aliases backfilled on ${updated} rows.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
