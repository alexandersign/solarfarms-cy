/**
 * Manual contact overrides for Cyprus plant / SPV outreach.
 * Source file: marketing/cyprus-contact-overrides.json
 */

import * as fs from 'fs'
import * as path from 'path'
import { normalizeDirectorKey } from './cyprus-company-register'

export interface CyprusContactOverride {
  director_key?: string
  company_name?: string
  company_reg_no?: string
  contact_name?: string
  contact_email?: string
  contact_phone?: string
  contact_linkedin?: string
  email_source?: string
  notes?: string
}

export interface ContactPatch {
  contact_email?: string
  contact_phone?: string
  contact_linkedin?: string
  contact_name?: string
  contact_email_source?: string
  contact_notes?: string
}

const OVERRIDES_PATH = path.join(
  process.cwd(),
  'marketing',
  'cyprus-contact-overrides.json'
)

let cached: CyprusContactOverride[] | null = null

export function loadCyprusContactOverrides(): CyprusContactOverride[] {
  if (cached) return cached
  if (!fs.existsSync(OVERRIDES_PATH)) {
    cached = []
    return cached
  }
  const raw = JSON.parse(fs.readFileSync(OVERRIDES_PATH, 'utf-8'))
  cached = (raw.overrides || []) as CyprusContactOverride[]
  return cached
}

export function applyCyprusContactOverrides(opts: {
  company_name: string
  company_reg_no?: string
  contact_director_1?: string
  contact_director_2?: string
  existing?: ContactPatch
}): ContactPatch {
  const overrides = loadCyprusContactOverrides()
  const out: ContactPatch = { ...opts.existing }
  const companyUpper = opts.company_name.trim().toUpperCase()
  const directorKeys = [opts.contact_director_1, opts.contact_director_2]
    .filter(Boolean)
    .map((n) => normalizeDirectorKey(n!))

  for (const o of overrides) {
    const matchCompany =
      o.company_name && o.company_name.trim().toUpperCase() === companyUpper
    const matchReg =
      o.company_reg_no &&
      opts.company_reg_no &&
      o.company_reg_no.replace(/\s/g, '') === opts.company_reg_no.replace(/\s/g, '')
    const matchDirector =
      o.director_key && directorKeys.includes(normalizeDirectorKey(o.director_key))

    if (!matchCompany && !matchReg && !matchDirector) continue

    if (o.contact_email && !out.contact_email) {
      out.contact_email = o.contact_email
      out.contact_email_source = o.email_source || 'manual_override'
    }
    if (o.contact_phone && !out.contact_phone) out.contact_phone = o.contact_phone
    if (o.contact_linkedin && !out.contact_linkedin) out.contact_linkedin = o.contact_linkedin
    if (o.contact_name && !out.contact_name) out.contact_name = o.contact_name
    if (o.notes) out.contact_notes = o.notes
  }

  return out
}
