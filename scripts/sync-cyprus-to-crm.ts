/**
 * Sync enriched Cyprus prospect intelligence into the Supabase CRM (pv_prospects).
 *
 * COMPANY-LEVEL to match the existing CRM (one row per SPV, licences aggregated).
 *
 * Idempotent + field-preserving:
 *   - keyed on company_name (normalized)
 *   - INSERT new companies with outreach_status='new'
 *   - UPDATE existing rows' INTELLIGENCE columns only — never overwrites
 *     human-edited CRM fields (outreach_status, notes, next_follow_up,
 *     estimated_deal_value, follow-up dates, tags).
 *
 * Usage:
 *   npx tsx scripts/sync-cyprus-to-crm.ts
 *   npx tsx scripts/sync-cyprus-to-crm.ts --min-score 35 --dry-run
 *   npx tsx scripts/sync-cyprus-to-crm.ts --limit 50
 */

import * as fs from 'fs'
import * as path from 'path'
import { directorFieldsFromPlants, collectDirectorsFromPlantRows } from '../lib/crm-search-aliases'
import { supabase, type PvProspect } from '../lib/supabase'
import { normalizeDisplayPhone } from '../lib/csv-utf8'
import type { DeveloperGroup } from '../lib/cyprus-developer-groups'

const PLANTS_JSON = path.join(process.cwd(), 'marketing', 'cyprus-energy-plants.json')
const GROUPS_JSON = path.join(process.cwd(), 'marketing', 'cyprus-developer-groups.json')

function arg(name: string, fallback: number): number {
  const i = process.argv.indexOf(name)
  if (i >= 0 && process.argv[i + 1]) return parseInt(process.argv[i + 1], 10)
  return fallback
}

interface PlantRow {
  cera_license_no?: string
  company_name: string
  company_reg_no?: string
  pv_kw?: number
  bess_kw?: number
  bess_kwh?: number
  plant_class?: string
  license_status?: 'operational' | 'under_construction' | string
  district_en?: string
  district?: string
  municipality?: string
  primary_sales_target?: string
  priority_score?: number
  outreach_priority?: string
  existing_client?: boolean
  contact_director_1?: string
  contact_director_2?: string
  directors_all?: string[]
  contact_secretary?: string
  contact_name?: string
  contact_email?: string
  contact_phone?: string
  contact_linkedin?: string
  contact_website?: string
  contact_email_source?: string
  email_confidence?: number
  registered_address?: string
  developer_group?: string
  developer_domain?: string
}

const OFFER_TYPE_MAP: Record<string, string> = {
  'PV O&M': 'o_and_m',
  'PV EPC': 'epc',
  'BESS EPC': 'epc',
  'Hybrid EPC (PV + BESS)': 'epc',
  'BESS O&M': 'o_and_m',
  'PV O&M + BESS O&M': 'o_and_m',
  'BESS retrofit': 'bess_retrofit',
}

function technologyOf(plantClass?: string): string {
  if (plantClass === 'pv_bess_hybrid') return 'Hybrid'
  if (plantClass === 'bess_standalone') return 'BESS'
  return 'PV'
}

function plantStatusOf(status?: string): string {
  if (status === 'operational') return 'operational'
  if (status === 'under_construction') return 'under_construction'
  return 'licensed'
}

function priorityOf(p: PlantRow): string {
  const op = p.outreach_priority
  if (op === 'high' || op === 'urgent' || op === 'medium' || op === 'low') return op
  const s = p.priority_score || 0
  return s >= 50 ? 'high' : s >= 35 ? 'medium' : 'low'
}

/** Canonical dedup key: collapses LTD/LIMITED variants so "Acme Solar Ltd" and
 *  "Acme Solar Limited" map to the same key. */
function companyKey(name: string): string {
  return name
    .trim()
    .toUpperCase()
    .replace(/\s+/g, ' ')
    .replace(/\b(LIMITED|ΛΤΔ\.?|ΛΙΜΙΤΕΔ)\b/g, 'LTD')
}

/** Map normalized company_name -> existing CRM row id (first match wins). */
async function fetchExisting(): Promise<Map<string, string>> {
  const map = new Map<string, string>()
  const pageSize = 1000
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabase
      .from('pv_prospects')
      .select('id, company_name')
      .range(from, from + pageSize - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    for (const r of data as { id: string; company_name?: string }[]) {
      if (r.company_name) {
        const k = companyKey(r.company_name)
        if (!map.has(k)) map.set(k, r.id)
      }
    }
    if (data.length < pageSize) break
  }
  return map
}

function licenceLabel(licences: string[]): string {
  if (licences.length <= 3) return licences.join(', ')
  return `${licences.slice(0, 3).join(', ')} (+${licences.length - 3} more)`
}

async function main() {
  const minScore = arg('--min-score', 35)
  const limit = arg('--limit', 100000)
  const dryRun = process.argv.includes('--dry-run')

  if (!fs.existsSync(PLANTS_JSON)) {
    console.error('Missing', PLANTS_JSON)
    process.exit(1)
  }

  const allPlants: PlantRow[] = (JSON.parse(fs.readFileSync(PLANTS_JSON, 'utf-8')).plants || [])
    .filter((p: PlantRow) => !p.existing_client && (p.priority_score || 0) >= minScore)
    .filter((p: PlantRow) => p.cera_license_no)
    .filter((p: PlantRow) => (p.pv_kw || 0) >= 250)  // 250 kW minimum — smaller installations are commercial rooftop

  // developer-group lookup (parent_group, domain, best contact fallback)
  const companyToGroup = new Map<string, DeveloperGroup>()
  if (fs.existsSync(GROUPS_JSON)) {
    const groups: DeveloperGroup[] = JSON.parse(fs.readFileSync(GROUPS_JSON, 'utf-8')).groups || []
    for (const g of groups) for (const c of g.companies) companyToGroup.set(companyKey(c), g)
  }

  // aggregate licences -> one record per company
  const byCompany = new Map<string, PlantRow[]>()
  for (const p of allPlants) {
    const k = companyKey(p.company_name)
    if (!byCompany.has(k)) byCompany.set(k, [])
    byCompany.get(k)!.push(p)
  }

  const companies = [...byCompany.values()]
    .sort(
      (a, b) =>
        Math.max(...b.map((x) => x.priority_score || 0)) -
        Math.max(...a.map((x) => x.priority_score || 0))
    )
    .slice(0, limit)

  function buildIntelligence(rows: PlantRow[]): Partial<PvProspect> {
    const top = [...rows].sort((a, b) => (b.priority_score || 0) - (a.priority_score || 0))[0]
    const grp = companyToGroup.get(companyKey(top.company_name))
    const isMulti = grp && grp.spv_count >= 2
    const totalPv = rows.reduce((s, r) => s + (r.pv_kw || 0) / 1000, 0)
    const totalBessMw = rows.reduce((s, r) => s + (r.bess_kw || 0) / 1000, 0)
    const totalBessMwh = rows.reduce((s, r) => s + (r.bess_kwh || 0) / 1000, 0)
    const licences = rows.map((r) => r.cera_license_no!).filter(Boolean)
    const email = top.contact_email || grp?.best_contact_email
    const phone =
      normalizeDisplayPhone(top.contact_phone) || normalizeDisplayPhone(grp?.best_contact_phone)

    // MWp split + RTB stage from per-licence status
    const opMwp = rows
      .filter((r) => r.license_status === 'operational')
      .reduce((s, r) => s + (r.pv_kw || 0) / 1000, 0)
    const conMwp = rows
      .filter((r) => r.license_status === 'under_construction')
      .reduce((s, r) => s + (r.pv_kw || 0) / 1000, 0)
    let rtbStatus = 'mixed'
    if (opMwp > 0 && conMwp === 0) rtbStatus = 'operational'
    else if (conMwp > 0 && opMwp === 0) rtbStatus = 'under_construction'
    const satellite = rtbStatus === 'operational' ? 'built' : 'unknown'

    // BESS angle: operational PV without storage = retrofit; construction hybrid = pre_sale
    const hasBess = totalBessMw > 0
    let bessAngle: string | undefined
    if (rtbStatus === 'operational' && !hasBess) bessAngle = 'retrofit'
    else if (hasBess) bessAngle = 'pre_sale'

    const plantDirectors = collectDirectorsFromPlantRows(rows)
    const primaryContact =
      top.contact_name || grp?.best_contact_name || top.contact_director_1
    const secondaryFromRegister =
      plantDirectors.find(
        (n) => n.toUpperCase() !== (primaryContact || '').toUpperCase()
      ) || top.contact_director_2

    const directorMeta = directorFieldsFromPlants(top.company_name, rows, {
      parent_group: isMulti ? grp!.brand : undefined,
      groupDirectors: grp?.directors,
      contact_name: primaryContact,
      secondary_contact_name: secondaryFromRegister,
      // Pass the full register list so all directors end up in all_directors
      all_directors: top.directors_all?.join(' · '),
    })

    return {
      segment: 'developer',
      company_name: top.company_name,
      cera_license_no: licenceLabel(licences),
      capacity_mwp: totalPv || undefined,
      bess_potential_mwh: totalBessMwh || undefined,
      construction_mwp: conMwp || undefined,
      operational_mwp: opMwp || undefined,
      rtb_status: rtbStatus,
      satellite_check: satellite,
      bess_sales_angle: bessAngle,
      technology: technologyOf(top.plant_class),
      plant_status: plantStatusOf(top.license_status),
      district: top.district_en || top.district,
      location: top.municipality,
      company_reg_no: top.company_reg_no,
      parent_group: isMulti ? grp!.brand : undefined,
      developer_group: isMulti ? grp!.group_id : undefined,
      developer_domain: grp?.developer_domain,
      email_confidence: top.email_confidence,
      registered_address: top.registered_address,
      company_website: grp?.developer_domain
        ? `https://${grp.developer_domain}`
        : top.contact_website,
      contact_name: primaryContact,
      secondary_contact_name: secondaryFromRegister,
      contact_director_1: directorMeta.contact_director_1,
      contact_director_2: directorMeta.contact_director_2,
      all_directors: directorMeta.all_directors,
      contact_email: email,
      contact_phone: phone || undefined,
      contact_linkedin: top.contact_linkedin || grp?.best_contact_linkedin,
      offer_type: top.primary_sales_target ? OFFER_TYPE_MAP[top.primary_sales_target] : undefined,
      priority: priorityOf(top) as PvProspect['priority'],
      search_aliases: directorMeta.search_aliases,
    }
  }

  console.log(`Sync candidates: ${companies.length} companies (min score ${minScore})`)

  const existing = await fetchExisting()
  console.log(`Existing CRM rows: ${existing.size}`)

  const toInsert: Partial<PvProspect>[] = []
  const toUpdate: { id: string; patch: Partial<PvProspect> }[] = []

  for (const rows of companies) {
    const intel = buildIntelligence(rows)
    const id = existing.get(companyKey(rows[0].company_name))
    if (id) {
      toUpdate.push({ id, patch: intel })
    } else {
      const top = rows[0]
      const grp = companyToGroup.get(companyKey(top.company_name))
      const batchDate = new Date().toISOString().split('T')[0]
      const tags = [
        `batch:${batchDate}`,
        grp && grp.spv_count >= 2 ? `dev:${grp.brand}` : '',
        top.email_confidence != null ? `email_conf:${top.email_confidence}` : '',
        top.contact_email_source ? `src:${top.contact_email_source}` : '',
      ].filter(Boolean)
      toInsert.push({
        ...intel,
        plant_name: top.company_name,
        outreach_status: 'new',
        data_source: 'cera+enrichment',
        tags,
      })
    }
  }

  console.log(`  Insert: ${toInsert.length} · Update: ${toUpdate.length}`)

  if (dryRun) {
    console.log('DRY RUN — no writes')
    toInsert.slice(0, 8).forEach((r) =>
      console.log(`  + ${r.company_name} ${r.contact_email || '—'} [${r.parent_group || ''}]`)
    )
    return
  }

  // batch insert
  let inserted = 0
  for (let i = 0; i < toInsert.length; i += 100) {
    const chunk = toInsert.slice(i, i + 100)
    const { error } = await supabase.from('pv_prospects').insert(chunk)
    if (error) {
      console.error('Insert error:', error.message)
      break
    }
    inserted += chunk.length
    console.log(`  inserted ${inserted}/${toInsert.length}`)
  }

  // per-row updates (intelligence fields only)
  let updated = 0
  for (const u of toUpdate) {
    const { error } = await supabase.from('pv_prospects').update(u.patch).eq('id', u.id)
    if (error) {
      console.error(`Update error (${u.id}):`, error.message)
      continue
    }
    updated++
    if (updated % 50 === 0) console.log(`  updated ${updated}/${toUpdate.length}`)
  }

  console.log(`\nDone: ${inserted} inserted, ${updated} updated in pv_prospects`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
