/**
 * Sync commercial rooftop prospects (solar-prospect-sweep CSV) into the CRM.
 * COMMERCIAL segment. Idempotent + field-preserving (dedup on place_id).
 *
 * Copies the qualifying satellite roof image into public/crm-roofs/<id>.png
 * (public/ is web-served & not gitignored) and stores roof_image_url.
 *
 * Usage:
 *   npx tsx scripts/sync-solar-sweep-to-crm.ts                 # latest sweep CSV
 *   npx tsx scripts/sync-solar-sweep-to-crm.ts --csv docs/solar-prospects/solar-sweep-XXXX.csv
 *   npx tsx scripts/sync-solar-sweep-to-crm.ts --min-roof 200 --dry-run
 */

import * as fs from 'fs'
import * as path from 'path'
import { inferCyprusDistrict } from '../lib/cyprus-district-infer'
import { supabase, type PvProspect } from '../lib/supabase'
import { buildSearchAliases } from '../lib/greek-translit'
import { normalizeDisplayPhone } from '../lib/csv-utf8'

const SWEEP_DIR = path.join(process.cwd(), 'docs', 'solar-prospects')
const ROOFS_OUT = path.join(process.cwd(), 'public', 'crm-roofs')

function arg(name: string, fallback: string): string {
  const i = process.argv.indexOf(name)
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback
}

/** Minimal CSV parser handling quoted fields with commas/quotes. */
function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = []
  let field = ''
  let row: string[] = []
  let inQ = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ }
        else inQ = false
      } else field += c
    } else if (c === '"') inQ = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      if (field !== '' || row.length) { row.push(field); rows.push(row); row = []; field = '' }
    } else field += c
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row) }
  if (!rows.length) return []
  const header = rows[0]
  return rows.slice(1).map((r) => {
    const o: Record<string, string> = {}
    header.forEach((h, idx) => (o[h] = r[idx] ?? ''))
    return o
  })
}

function latestSweepCsv(): string | null {
  if (!fs.existsSync(SWEEP_DIR)) return null
  const files = fs
    .readdirSync(SWEEP_DIR)
    .filter((f) => f.startsWith('solar-sweep-') && f.endsWith('.csv'))
    .sort()
  if (!files.length) return null
  const merged = files.filter((f) => f.includes('merged'))
  const pick = merged.length ? merged[merged.length - 1] : files[files.length - 1]
  return path.join(SWEEP_DIR, pick)
}

/** Reconstruct the roof image filename the sweep wrote (roof_<safe_name>.png). */
function roofImageFor(name: string): string | null {
  const safe = name.replace(/[\\/:*?"<>|()']+/g, '').slice(0, 40).replace(/ /g, '_')
  const direct = path.join(SWEEP_DIR, `roof_${safe}.png`)
  if (fs.existsSync(direct)) return direct
  // fallback: any roof file containing the safe token
  if (fs.existsSync(SWEEP_DIR)) {
    const hit = fs.readdirSync(SWEEP_DIR).find((f) => f.startsWith('roof_') && f.includes(safe) && f.endsWith('.png'))
    if (hit) return path.join(SWEEP_DIR, hit)
  }
  return null
}

function guessIndustry(googleTypes: string): string {
  const t = googleTypes.toLowerCase()
  if (t.includes('lodging') || t.includes('hotel')) return 'Hotel / Hospitality'
  if (t.includes('restaurant') || t.includes('cafe') || t.includes('food')) return 'Restaurant / Café'
  if (t.includes('doctor') || t.includes('dentist') || t.includes('hospital') || t.includes('health')) return 'Clinic / Medical'
  if (t.includes('supermarket') || t.includes('grocery') || t.includes('store')) return 'Supermarket / Retail'
  if (t.includes('car_dealer')) return 'Car Dealership'
  if (t.includes('gym') || t.includes('fitness') || t.includes('sport')) return 'Gym / Sports'
  if (t.includes('warehouse') || t.includes('storage') || t.includes('moving')) return 'Warehouse / Logistics'
  if (t.includes('factory') || t.includes('industrial') || t.includes('manufact')) return 'Factory / Manufacturing'
  return 'Other'
}

/** Warehouse OSM sweep rows often lack Google types — default industrial category. */
function resolveIndustry(row: Record<string, string>): string {
  const fromGoogle = guessIndustry(row.google_types || '')
  if (fromGoogle !== 'Other') return fromGoogle
  const roof = num(row.roof_area_m2) || 0
  if (roof >= 200) return 'Warehouse / Logistics'
  return 'Other'
}

function findRoofImagePath(row: Record<string, string>): string | null {
  for (const n of [row.gmb_name, row.name]) {
    if (!n?.trim()) continue
    const hit = roofImageFor(n.trim())
    if (hit) return hit
  }
  return null
}

function safeId(placeId: string, name: string): string {
  const base = placeId || name
  return base.replace(/[^A-Za-z0-9_-]+/g, '').slice(0, 60) || `c${Date.now()}`
}

function num(v: string): number | undefined {
  const n = parseFloat(v)
  return Number.isFinite(n) ? n : undefined
}

function companyKey(name: string): string {
  return name.trim().toUpperCase().replace(/\s+/g, ' ')
}

async function fetchExistingCommercial(): Promise<{
  byPlaceId: Map<string, string>
  byCompany: Map<string, string>
}> {
  const byPlaceId = new Map<string, string>()
  const byCompany = new Map<string, string>()
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase
      .from('pv_prospects')
      .select('id, place_id, company_name, plant_name')
      .eq('segment', 'commercial')
      .range(from, from + 999)
    if (error) throw error
    if (!data || !data.length) break
    for (const r of data as { id: string; place_id?: string; company_name?: string; plant_name?: string }[]) {
      if (r.place_id) byPlaceId.set(r.place_id, r.id)
      const ck = companyKey(r.company_name || r.plant_name || '')
      if (ck && !byCompany.has(ck)) byCompany.set(ck, r.id)
    }
    if (data.length < 1000) break
  }
  return { byPlaceId, byCompany }
}

async function main() {
  const minRoof = parseFloat(arg('--min-roof', '200'))
  const dryRun = process.argv.includes('--dry-run')
  const csvPath = arg('--csv', latestSweepCsv() || '')

  if (!csvPath || !fs.existsSync(csvPath)) {
    console.error('No sweep CSV found. Pass --csv <path> or run a sweep first.')
    process.exit(1)
  }
  console.log(`Reading ${csvPath}`)
  const rows = parseCsv(fs.readFileSync(csvPath, 'utf-8'))

  const noPvOnly = !process.argv.includes('--include-has-pv')

  // qualified: roof big enough + has a name; default skips sites with existing PV on roof
  let qualified = rows.filter((r) => (num(r.roof_area_m2) || 0) >= minRoof && r.name)
  if (noPvOnly) {
    qualified = qualified.filter((r) => {
      const s = (r.pv_status || '').toLowerCase()
      return !['confirmed', 'likely', 'partial'].includes(s)
    })
  }
  console.log(
    `Rows: ${rows.length} · qualified (roof >= ${minRoof} m²${noPvOnly ? ', no existing PV' : ''}): ${qualified.length}`
  )

  if (!dryRun) fs.mkdirSync(ROOFS_OUT, { recursive: true })
  const existing = await fetchExistingCommercial()

  const toInsert: Partial<PvProspect>[] = []
  const toUpdate: { id: string; patch: Partial<PvProspect> }[] = []
  let imagesCopied = 0
  const batchDate = new Date().toISOString().split('T')[0]

  for (const r of qualified) {
    const placeId = r.place_id || ''
    const id = safeId(placeId, r.name)
    const hasPv = ['confirmed', 'likely', 'partial'].includes((r.pv_status || '').toLowerCase())

    // copy roof image into public/
    let roofUrl: string | undefined
    const src = findRoofImagePath(r)
    if (src) {
      const dest = path.join(ROOFS_OUT, `${id}.png`)
      if (!dryRun) {
        try { fs.copyFileSync(src, dest); imagesCopied++ } catch { /* ignore */ }
      }
      roofUrl = `/crm-roofs/${id}.png`
    }

    const payback = num(r.payback_yrs)
    const priority: PvProspect['priority'] =
      payback != null && payback < 5 ? 'high' : payback != null && payback < 7 ? 'medium' : 'low'

    const lat = num(r.lat)
    const lon = num(r.lon)
    const district =
      lat != null && lon != null ? inferCyprusDistrict(lat, lon) : undefined
    const industry = resolveIndustry(r)
    // GMB match: use real business name. No GMB: replace raw "Building at lat,lon"
    // OSM coordinate names with a human-readable fallback.
    const rawOsmName = r.name || ''
    const osmIsBuildingCoords = /^Building\s+at\s+\d/.test(rawOsmName)
    const displayName = r.gmb_name
      || (osmIsBuildingCoords ? `Commercial Site — ${district || 'Cyprus'}` : rawOsmName)

    // Location: full GMB address wins; OSM "Cyprus" placeholder replaced with district
    const rawAddr = r.addr || ''
    const addrIsPlaceholder = rawAddr.trim().toLowerCase() === 'cyprus'
    const location: string | undefined =
      r.gmb_address ||
      (!addrIsPlaceholder ? rawAddr : undefined) ||
      (district ? `${district} District, Cyprus` : undefined)

    const intel: Partial<PvProspect> = {
      segment: 'commercial',
      company_name: displayName,
      plant_name: displayName,
      location,
      district,
      technology: 'PV',
      capacity_mwp: num(r.peak_kw) != null ? num(r.peak_kw)! / 1000 : undefined,
      roof_area_m2: num(r.roof_area_m2),
      annual_kwh: num(r.annual_kwh),
      annual_savings_eur: num(r.savings_eur),
      payback_years: payback,
      estimated_deal_value: num(r.system_cost),
      has_existing_pv: hasPv,
      bess_sales_angle: hasPv ? 'retrofit' : 'pre_sale',
      contact_email: r.email_found || undefined,
      contact_phone: normalizeDisplayPhone(r.gmb_phone || r.phone) || undefined,
      company_website: r.gmb_website || r.website || undefined,
      place_id: placeId || undefined,
      roof_image_url: roofUrl,
      offer_type: 'rooftop_pv',
      data_source: 'google_places',
      priority,
      search_aliases: buildSearchAliases(displayName, location, industry, district),
      industry,
    }

    const existId =
      (placeId ? existing.byPlaceId.get(placeId) : undefined) ||
      existing.byCompany.get(companyKey(displayName))
    const tags = [
      `batch:${batchDate}`,
      'segment:commercial',
      district ? `district:${district}` : '',
      industry ? `industry:${industry.replace(/\s*\/\s*/g, '-')}` : '',
      hasPv ? 'has_pv' : '',
    ].filter(Boolean)

    if (existId) {
      toUpdate.push({ id: existId, patch: intel })
    } else {
      toInsert.push({ ...intel, outreach_status: 'new', tags })
    }
  }

  console.log(`  Insert: ${toInsert.length} · Update: ${toUpdate.length} · Images copied: ${imagesCopied}`)
  if (dryRun) {
    console.log('DRY RUN — no writes')
    toInsert.slice(0, 8).forEach((r) =>
      console.log(`  + ${r.company_name} | ${r.contact_email || '—'} | ${r.roof_image_url || 'no image'}`)
    )
    return
  }

  let inserted = 0
  for (let i = 0; i < toInsert.length; i += 100) {
    const chunk = toInsert.slice(i, i + 100)
    const { error } = await supabase.from('pv_prospects').insert(chunk)
    if (error) { console.error('Insert error:', error.message); break }
    inserted += chunk.length
  }
  let updated = 0
  for (const u of toUpdate) {
    const { error } = await supabase.from('pv_prospects').update(u.patch).eq('id', u.id)
    if (!error) updated++
  }

  console.log(`\nDone: ${inserted} inserted, ${updated} updated, ${imagesCopied} roof images in public/crm-roofs/`)
  console.log('Commit the new public/crm-roofs/*.png so they deploy with the site.')
}

main().catch((e) => { console.error(e); process.exit(1) })
