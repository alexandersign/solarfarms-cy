/**
 * CSV helpers for Excel on Windows — requires UTF-8 BOM for Greek/Cyrillic text.
 */
import * as fs from 'fs'

/** Excel on Windows opens CSV as ANSI unless this BOM is present. */
export const UTF8_BOM = '\uFEFF'

export function writeCsvUtf8(filePath: string, lines: string[]): void {
  fs.writeFileSync(filePath, UTF8_BOM + lines.join('\n'), 'utf8')
}

export function csvWithUtf8Bom(content: string): string {
  return content.startsWith(UTF8_BOM) ? content : UTF8_BOM + content
}

export function escCsvCell(v: unknown): string {
  if (v === null || v === undefined) return ''
  const s = String(v)
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

/** Decode URL-encoded phone strings from Google Places (e.g. %20). */
export function normalizeDisplayPhone(phone?: string | null): string {
  if (!phone) return ''
  const raw = String(phone).replace(/%20/gi, ' ').trim()
  try {
    return decodeURIComponent(raw).trim()
  } catch {
    return raw
  }
}
