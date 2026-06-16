/**
 * Cluster Cyprus SPV shell companies into real developer groups.
 *
 * Signals (edges in a union-find graph):
 *   1. Shared director (primary, accent-folded key)
 *   2. Shared SPV name-prefix / brand (BIOLAND PROJECT n, AGM *, HELIOPEX n, ...)
 *   3. Shared registered address (secondary — usually the service firm, but
 *      still groups SPVs administered together)
 *
 * The output group represents a single beneficial developer that controls
 * several licence-holding SPVs, so sales can run one relationship-led approach.
 */

import { normalizeDirectorKey } from './cyprus-company-register'

export interface DeveloperGroupPlant {
  cera_license_no?: string
  company_name: string
  company_reg_no?: string
  pv_kw?: number
  bess_kw?: number
  bess_kwh?: number
  primary_sales_target?: string
  pipeline_stage?: string
  license_status?: string
  district_en?: string
  district?: string
  municipality?: string
  priority_score?: number
  existing_client?: boolean
  contact_director_1?: string
  contact_director_2?: string
  contact_secretary?: string
  registered_address?: string
  contact_email?: string
  contact_phone?: string
  contact_linkedin?: string
  contact_website?: string
  contact_email_source?: string
  email_confidence?: number
  [key: string]: unknown
}

export interface DeveloperGroup {
  group_id: string
  brand: string
  spv_count: number
  licence_count: number
  total_pv_mwp: number
  total_bess_mwp: number
  total_bess_mwh: number
  max_priority_score: number
  primary_sales_target: string
  sales_targets: string[]
  pipeline_stages: string[]
  districts: string[]
  companies: string[]
  company_reg_nos: string[]
  directors: string[]
  registered_addresses: string[]
  edges: string[]
  // Developer resolution (Phase 2) + verified contact (Phase 3)
  developer_domain?: string
  developer_website?: string
  developer_linkedin?: string
  developer_source?: string
  // low-confidence director-query hit kept for human review, not fed to Hunter
  developer_domain_suggested?: string
  developer_suggested_source?: string
  developer_name_resolved?: string
  best_contact_name?: string
  best_contact_email?: string
  best_contact_phone?: string
  best_contact_linkedin?: string
  best_contact_confidence?: number
  best_contact_source?: string
}

/** Lightweight union-find (disjoint set). */
class UnionFind {
  private parent = new Map<string, string>()

  find(x: string): string {
    if (!this.parent.has(x)) this.parent.set(x, x)
    let root = x
    while (this.parent.get(root) !== root) {
      root = this.parent.get(root)!
    }
    // path compression
    let cur = x
    while (this.parent.get(cur) !== root) {
      const next = this.parent.get(cur)!
      this.parent.set(cur, root)
      cur = next
    }
    return root
  }

  union(a: string, b: string): void {
    const ra = this.find(a)
    const rb = this.find(b)
    if (ra !== rb) this.parent.set(ra, rb)
  }

  has(x: string): boolean {
    return this.parent.has(x)
  }
}

const GENERIC_TOKENS = new Set([
  'SOLAR',
  'ENERGY',
  'ENERGIES',
  'POWER',
  'PROJECT',
  'PROJECTS',
  'HOLDINGS',
  'HOLDING',
  'INVESTMENT',
  'INVESTMENTS',
  'VENTURES',
  'ELECTRIC',
  'ELECTRICITY',
  'RENEWABLES',
  'GREEN',
  'PV',
  'BESS',
  'CYPRUS',
  'COMPANY',
  'LTD',
  'LIMITED',
  'THE',
])

/**
 * Brand key from an SPV name — drops legal suffix, trailing numbers and
 * roman numerals so "BIOLAND PROJECT 93 LTD" and "BIOLAND PROJECT 1 LTD"
 * collapse to "BIOLAND". Returns '' when no meaningful brand survives.
 */
export function brandKeyFromCompany(name: string): string {
  const cleaned = name
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,&()]/g, ' ')
    .replace(/\b(LTD|LIMITED|PLC|PUBLIC|LLC|ΛΤΔ|ΛΙΜΙΤΕΔ)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  const tokens = cleaned
    .split(' ')
    .filter(Boolean)
    // strip pure numbers and roman numerals (project/phase counters)
    .filter((t) => !/^\d+$/.test(t))
    .filter((t) => !/^[IVXLCDM]+$/.test(t))

  // Keep leading non-generic tokens as the brand.
  const brandTokens: string[] = []
  for (const t of tokens) {
    if (GENERIC_TOKENS.has(t)) {
      if (brandTokens.length > 0) break
      continue
    }
    brandTokens.push(t)
    if (brandTokens.length >= 2) break
  }
  return brandTokens.join(' ')
}

/** Normalize a registered address for grouping (street+building+parish). */
export function normalizeAddressKey(address?: string): string {
  if (!address) return ''
  const a = address
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,]/g, ' ')
    .replace(/\b(FLOOR|FLAT|OFFICE|FL|OF)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return a.length >= 12 ? a : ''
}

function nodeCompany(name: string): string {
  return `C::${name.trim().toUpperCase()}`
}
function nodeDirector(key: string): string {
  return `D::${key}`
}
function nodeBrand(brand: string): string {
  return `B::${brand}`
}
function nodeAddress(addr: string): string {
  return `A::${addr}`
}

function uniq(arr: (string | undefined | null)[]): string[] {
  return [...new Set(arr.filter((s): s is string => !!s && s.trim().length > 0))]
}

export interface ClusterOptions {
  minScore?: number
  includeExistingClients?: boolean
  useAddressEdges?: boolean
}

/**
 * Build developer groups from the plant list. One company can hold many
 * licences; we group at the company level first, then union companies.
 */
export function buildDeveloperGroups(
  plants: DeveloperGroupPlant[],
  opts: ClusterOptions = {}
): DeveloperGroup[] {
  const { minScore = 0, includeExistingClients = false, useAddressEdges = true } = opts

  // 1. Collapse to unique companies (carry the licence rows).
  const byCompany = new Map<string, DeveloperGroupPlant[]>()
  for (const p of plants) {
    if (!includeExistingClients && p.existing_client) continue
    if ((p.priority_score || 0) < minScore) continue
    const key = p.company_name.trim().toUpperCase()
    if (!byCompany.has(key)) byCompany.set(key, [])
    byCompany.get(key)!.push(p)
  }

  const uf = new UnionFind()
  // ensure every company is a node even if it has no edges
  for (const key of byCompany.keys()) uf.find(nodeCompany(key))

  // 2. Add edges.
  for (const [key, rows] of byCompany) {
    const cNode = nodeCompany(key)
    const r0 = rows[0]

    // director edges
    for (const dir of [r0.contact_director_1, r0.contact_director_2]) {
      if (!dir) continue
      const dk = normalizeDirectorKey(dir)
      if (dk.length < 5) continue
      uf.union(cNode, nodeDirector(dk))
    }

    // brand edge
    const brand = brandKeyFromCompany(r0.company_name)
    if (brand && brand.length >= 4) {
      uf.union(cNode, nodeBrand(brand))
    }

    // address edge (secondary)
    if (useAddressEdges) {
      const ak = normalizeAddressKey(r0.registered_address)
      if (ak) uf.union(cNode, nodeAddress(ak))
    }
  }

  // 3. Gather companies by root.
  const rootToCompanies = new Map<string, string[]>()
  for (const key of byCompany.keys()) {
    const root = uf.find(nodeCompany(key))
    if (!rootToCompanies.has(root)) rootToCompanies.set(root, [])
    rootToCompanies.get(root)!.push(key)
  }

  // 4. Build group objects.
  const groups: DeveloperGroup[] = []
  for (const [, companyKeys] of rootToCompanies) {
    const allRows: DeveloperGroupPlant[] = []
    for (const ck of companyKeys) allRows.push(...byCompany.get(ck)!)

    const companies = companyKeys.map(
      (ck) => byCompany.get(ck)![0].company_name
    )
    const directors = uniq(
      allRows.flatMap((r) => [r.contact_director_1, r.contact_director_2])
    )
    const addresses = uniq(allRows.map((r) => r.registered_address))
    const regNos = uniq(allRows.map((r) => r.company_reg_no))

    const total_pv_mwp = allRows.reduce((s, r) => s + (r.pv_kw || 0) / 1000, 0)
    const total_bess_mwp = allRows.reduce((s, r) => s + (r.bess_kw || 0) / 1000, 0)
    const total_bess_mwh = allRows.reduce((s, r) => s + (r.bess_kwh || 0) / 1000, 0)
    const max_priority_score = allRows.reduce(
      (m, r) => Math.max(m, r.priority_score || 0),
      0
    )

    // brand = most common non-empty brandKey across member companies
    const brandCounts = new Map<string, number>()
    for (const ck of companyKeys) {
      const b = brandKeyFromCompany(byCompany.get(ck)![0].company_name)
      if (b) brandCounts.set(b, (brandCounts.get(b) || 0) + 1)
    }
    const brand =
      [...brandCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ||
      brandKeyFromCompany(companies[0]) ||
      companies[0]

    const sales_targets = uniq(allRows.map((r) => r.primary_sales_target))
    const pipeline_stages = uniq(allRows.map((r) => r.pipeline_stage))
    const districts = uniq(allRows.map((r) => r.district_en || r.district))

    // primary target = target of the highest-scoring licence
    const topRow = [...allRows].sort(
      (a, b) => (b.priority_score || 0) - (a.priority_score || 0)
    )[0]

    const group_id = brand
      ? brand.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : companies[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')

    groups.push({
      group_id,
      brand,
      spv_count: companies.length,
      licence_count: allRows.length,
      total_pv_mwp: round2(total_pv_mwp),
      total_bess_mwp: round2(total_bess_mwp),
      total_bess_mwh: round2(total_bess_mwh),
      max_priority_score,
      primary_sales_target: topRow?.primary_sales_target || sales_targets[0] || '',
      sales_targets,
      pipeline_stages,
      districts,
      companies: companies.sort(),
      company_reg_nos: regNos,
      directors,
      registered_addresses: addresses,
      edges: edgeLabels(allRows[0]),
    })
  }

  // sort: multi-SPV groups first, then by MWp/score
  groups.sort(
    (a, b) =>
      b.spv_count - a.spv_count ||
      b.max_priority_score - a.max_priority_score ||
      b.total_pv_mwp - a.total_pv_mwp
  )

  // make group_id unique (brands can collide)
  const seen = new Map<string, number>()
  for (const g of groups) {
    const n = seen.get(g.group_id) || 0
    seen.set(g.group_id, n + 1)
    if (n > 0) g.group_id = `${g.group_id}-${n + 1}`
  }

  return groups
}

function edgeLabels(r: DeveloperGroupPlant): string[] {
  const labels: string[] = []
  if (r.contact_director_1) labels.push('director')
  const brand = brandKeyFromCompany(r.company_name)
  if (brand) labels.push('brand')
  if (normalizeAddressKey(r.registered_address)) labels.push('address')
  return [...new Set(labels)]
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}
