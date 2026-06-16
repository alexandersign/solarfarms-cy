/**
 * CRM prospect list search — PostgREST-safe ilike filters.
 * Excludes text[] columns (tags) and director columns until migration is applied.
 */

/** Text columns safe for PostgREST `.or(...ilike...)` (no text[] / missing columns). */
export const PROSPECT_ILIKE_COLUMNS = [
  'plant_name',
  'company_name',
  'contact_name',
  'secondary_contact_name',
  'parent_group',
  'location',
  'district',
  'industry',
  'search_aliases',
] as const

/** After running director columns in pv-prospects-crm-migration.sql, append these. */
export const PROSPECT_DIRECTOR_ILIKE_COLUMNS = [
  'all_directors',
  'contact_director_1',
  'contact_director_2',
] as const

export function escapeIlikeTerm(raw: string): string {
  return raw
    .replace(/\\/g, '\\\\')
    .replace(/%/g, '\\%')
    .replace(/_/g, '\\_')
    .replace(/,/g, '')
    .trim()
}

/** Strip trailing legal suffixes (LTD, LIMITED, ΛΤΔ, …) from a search term so
 *  "Acme Solar Ltd" matches both "ACME SOLAR LTD" and "ACME SOLAR LIMITED" in the DB. */
function stripLegalSuffix(raw: string): string {
  return raw
    .replace(/\s+(LTD\.?|LIMITED|ΛΤΔ\.?|ΛΙΜΙΤΕΔ|PLC|LLC)\s*$/i, '')
    .trim()
}

export function buildProspectSearchFilter(search: string): string | null {
  const term = escapeIlikeTerm(search)
  if (!term) return null

  // For company_name, use the suffix-stripped form so "Ltd" also matches "Limited" rows.
  const stripped = escapeIlikeTerm(stripLegalSuffix(search))
  const useStripped = stripped.length > 0 && stripped.toUpperCase() !== term.toUpperCase()

  return PROSPECT_ILIKE_COLUMNS.map((col) => {
    const t = col === 'company_name' && useStripped ? stripped : term
    return `${col}.ilike.%${t}%`
  }).join(',')
}

export function formatSupabaseError(error: unknown): string {
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message)
  }
  return String(error)
}

export function normalizeRoofImageUrl(url?: string | null): string | undefined {
  if (!url?.trim()) return undefined
  const u = url.trim()
  return u.startsWith('/') ? u : `/${u}`
}
