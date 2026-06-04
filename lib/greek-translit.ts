/**
 * Greek → Latin transliteration (ELOT 743 inspired) for CRM search aliases.
 * One-way: converts Greek display names to searchable Latin equivalents.
 * Normalises accents/tonos (NFD strip) before transliterating.
 */

// Digraph pairs must be tested BEFORE single characters.
const DIGRAPHS: [string, string][] = [
  ['ΟΥ', 'OU'], ['ΑΙ', 'AI'], ['ΕΙ', 'EI'], ['ΟΙ', 'OI'],
  ['ΑΥ', 'AV'], ['ΕΥ', 'EV'],
  ['ΓΓ', 'NG'], ['ΓΚ', 'GK'], ['ΓΞ', 'GX'], ['ΝΤ', 'ND'],
  ['ΜΠ', 'B'],  ['ΤΖ', 'TZ'], ['ΤΣ', 'TS'],
]

const SINGLE: [string, string][] = [
  ['Α', 'A'], ['Β', 'V'], ['Γ', 'G'], ['Δ', 'D'], ['Ε', 'E'],
  ['Ζ', 'Z'], ['Η', 'I'], ['Θ', 'TH'], ['Ι', 'I'], ['Κ', 'K'],
  ['Λ', 'L'], ['Μ', 'M'], ['Ν', 'N'], ['Ξ', 'X'], ['Ο', 'O'],
  ['Π', 'P'], ['Ρ', 'R'], ['Σ', 'S'], ['Τ', 'T'], ['Υ', 'Y'],
  ['Φ', 'F'], ['Χ', 'CH'], ['Ψ', 'PS'], ['Ω', 'O'],
]

function stripAccents(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function translitGreek(input: string): string {
  if (!input) return ''
  let s = stripAccents(input).toUpperCase()
  // digraphs first
  for (const [from, to] of DIGRAPHS) {
    s = s.split(from).join(to)
  }
  // single chars
  const result: string[] = []
  for (const ch of s) {
    const row = SINGLE.find(([g]) => g === ch)
    result.push(row ? row[1] : ch)
  }
  return result.join('')
}

/**
 * Build a whitespace-and-dedupe joined alias string from one or more names.
 * Includes both the original (stripped of accents) and the transliterated form.
 */
export function buildSearchAliases(...names: (string | null | undefined)[]): string {
  const parts = new Set<string>()
  for (const name of names) {
    if (!name?.trim()) continue
    const stripped = stripAccents(name).toUpperCase()
    const translit = translitGreek(name)
    parts.add(stripped)
    parts.add(translit)
    // Index surnames / given names (≥3 chars) for partial CRM search
    for (const word of stripped.split(/\s+/)) {
      if (word.length >= 3) {
        parts.add(word)
        parts.add(translitGreek(word))
      }
    }
  }
  return [...parts].join(' ')
}
