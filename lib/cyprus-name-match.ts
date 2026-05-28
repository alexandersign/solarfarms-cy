/**
 * Normalize company / applicant names for CERA ↔ EAC matching.
 */

const STRIP_SUFFIXES =
  /\b(LTD|LIMITED|ΛΤΔ|ΛΙΜΙΤΕΔ|ΚΥΠΡΟΥ|CYPRUS|HOLDINGS|ENERGY|ENERGIES|SOLAR|PHOTOVOLTAIC|PV|PROJECT|INVESTMENT|INVESTMENTS)\b/gi

const GREEK_TO_LATIN: Record<string, string> = {
  α: 'a', β: 'b', γ: 'g', δ: 'd', ε: 'e', ζ: 'z', η: 'i', θ: 'th',
  ι: 'i', κ: 'k', λ: 'l', μ: 'm', ν: 'n', ξ: 'x', ο: 'o', π: 'p',
  ρ: 'r', σ: 's', ς: 's', τ: 't', υ: 'y', φ: 'f', χ: 'ch', ψ: 'ps', ω: 'o',
}

export function transliterateGreek(text: string): string {
  return text
    .split('')
    .map((c) => {
      const lower = c.toLowerCase()
      return GREEK_TO_LATIN[lower] ?? c
    })
    .join('')
}

export function normalizeCompanyName(name: string): string {
  let s = name.toUpperCase().trim()
  s = transliterateGreek(s)
  s = s.replace(/&AMP;/g, '&').replace(/[^A-Z0-9&\s]/g, ' ')
  s = s.replace(STRIP_SUFFIXES, ' ')
  s = s.replace(/\s+/g, ' ').trim()
  return s
}

/** Token-set similarity 0–100 (no external deps). */
export function tokenSetRatio(a: string, b: string): number {
  const na = normalizeCompanyName(a)
  const nb = normalizeCompanyName(b)
  if (na === nb) return 100
  if (!na || !nb) return 0
  const ta = new Set(na.split(' ').filter(Boolean))
  const tb = new Set(nb.split(' ').filter(Boolean))
  if (ta.size === 0 || tb.size === 0) return 0
  let inter = 0
  for (const t of ta) {
    if (tb.has(t)) inter++
  }
  const union = new Set([...ta, ...tb]).size
  return Math.round((inter / union) * 100)
}

export function capacityWithinTolerance(
  aKw: number,
  bKw: number,
  pct: number
): boolean {
  if (aKw <= 0 || bKw <= 0) return false
  const diff = Math.abs(aKw - bKw) / Math.max(aKw, bKw)
  return diff <= pct
}

export const MUNICIPALITY_ALIASES: Record<string, string> = {
  ANARITA: 'Αναρίτα',
  ANARITAS: 'Αναρίτα',
  LIMASSOL: 'Λεμεσός',
  NICOSIA: 'Λευκωσία',
  LARNACA: 'Λάρνακα',
  PAPHOS: 'Πάφος',
}

export function normalizeMunicipality(m: string): string {
  return m.trim().toUpperCase().replace(/\s+/g, ' ')
}

export function municipalitiesMatch(a: string, b: string): boolean {
  const na = normalizeMunicipality(a)
  const nb = normalizeMunicipality(b)
  if (!na || !nb) return false
  if (na === nb) return true
  if (na.includes(nb) || nb.includes(na)) return true
  const aliasA = MUNICIPALITY_ALIASES[na]
  const aliasB = MUNICIPALITY_ALIASES[nb]
  if (aliasA && normalizeMunicipality(aliasA) === nb) return true
  if (aliasB && normalizeMunicipality(aliasB) === na) return true
  return tokenSetRatio(a, b) >= 85
}
