/**
 * Build CRM search_aliases and all_directors from company register + group data.
 */

import { buildSearchAliases } from './greek-translit'

export type DirectorFields = {
  company_name?: string | null
  contact_name?: string | null
  contact_director_1?: string | null
  contact_director_2?: string | null
  contact_secretary?: string | null
  secondary_contact_name?: string | null
  parent_group?: string | null
  all_directors?: string | null
  groupDirectors?: string[]
  extraNames?: string[]
}

function pushName(bucket: string[], seen: Set<string>, raw?: string | null) {
  if (!raw?.trim()) return
  const display = raw.trim()
  const key = display.toUpperCase()
  if (seen.has(key)) return
  seen.add(key)
  bucket.push(display)
}

/** Unique director / contact display names (preserves first-seen order). */
export function uniqueDirectorNames(fields: DirectorFields): string[] {
  const seen = new Set<string>()
  const names: string[] = []

  for (const raw of [
    fields.contact_name,
    fields.contact_director_1,
    fields.contact_director_2,
    fields.secondary_contact_name,
    fields.contact_secretary,
    ...(fields.groupDirectors || []),
    ...(fields.extraNames || []),
  ]) {
    pushName(names, seen, raw)
  }

  if (fields.all_directors?.trim()) {
    for (const part of fields.all_directors.split(/[·,;/]|(?:\s+and\s+)/i)) {
      pushName(names, seen, part.trim())
    }
  }

  return names
}

export function formatAllDirectors(names: string[]): string {
  return names.join(' · ')
}

export function buildProspectSearchAliases(fields: DirectorFields): string {
  const names = uniqueDirectorNames(fields)
  return buildSearchAliases(
    fields.company_name,
    fields.parent_group,
    ...names,
  )
}

export type PlantDirectorRow = {
  contact_director_1?: string
  contact_director_2?: string
  contact_secretary?: string
  contact_name?: string
  /** All directors from the company register (full list, not capped at 2). */
  directors_all?: string[]
}

/** Collect every director name seen across licence rows for one SPV.
 *  Prefers directors_all (full register list) over the 2-slot contact_director_* fields. */
export function collectDirectorsFromPlantRows(rows: PlantDirectorRow[]): string[] {
  const seen = new Set<string>()
  const names: string[] = []
  for (const r of rows) {
    if (r.directors_all?.length) {
      for (const n of r.directors_all) pushName(names, seen, n)
    } else {
      pushName(names, seen, r.contact_director_1)
      pushName(names, seen, r.contact_director_2)
    }
    pushName(names, seen, r.contact_secretary)
    pushName(names, seen, r.contact_name)
  }
  return names
}

export function directorFieldsFromPlants(
  companyName: string,
  plantRows: PlantDirectorRow[],
  opts?: {
    parent_group?: string
    groupDirectors?: string[]
    contact_name?: string
    secondary_contact_name?: string
    all_directors?: string
  }
): { contact_director_1?: string; contact_director_2?: string; all_directors: string; search_aliases: string } {
  const fromPlants = collectDirectorsFromPlantRows(plantRows)
  const names = uniqueDirectorNames({
    company_name: companyName,
    parent_group: opts?.parent_group,
    contact_name: opts?.contact_name,
    secondary_contact_name: opts?.secondary_contact_name,
    all_directors: opts?.all_directors,
    groupDirectors: opts?.groupDirectors,
    extraNames: fromPlants,
  })

  return {
    contact_director_1: names[0],
    contact_director_2: names[1],
    all_directors: formatAllDirectors(names),
    search_aliases: buildProspectSearchAliases({
      company_name: companyName,
      parent_group: opts?.parent_group,
      contact_name: opts?.contact_name,
      secondary_contact_name: opts?.secondary_contact_name,
      contact_director_1: names[0],
      contact_director_2: names[1],
      groupDirectors: opts?.groupDirectors,
      extraNames: fromPlants,
    }),
  }
}
