/**
 * Shared CERA licensing CSV parser (Cyprus PV/BESS prospect pipeline).
 */

import * as fs from 'fs'
import * as path from 'path'

export const CERA_CSV_PATH = path.join(
  process.cwd(),
  'marketing',
  'ALL Cyprus PV plants.csv - Website Registry.csv'
)

export const DISTRICT_MAP: Record<string, string> = {
  'Λάρνακα': 'Larnaca',
  'Λευκωσία': 'Nicosia',
  'Λεμεσός': 'Limassol',
  'Πάφος': 'Paphos',
  'Αμμόχωστος': 'Famagusta',
  'Κερύνεια': 'Kyrenia',
}

export interface CeraRow {
  companyName: string
  licenseNo: string
  startDate: string
  endDate: string
  capacityKw: number
  bessOutputKw: number
  bessCapacityKwh: number
  technology: string
  techType: string
  fuel: string
  licenseType: string
  operatingRegime: string
  district: string
  municipality: string
}

export type PlantClass = 'pv_only' | 'pv_bess_hybrid' | 'bess_standalone'
export type LicenseStatus = 'operational' | 'under_construction'

export interface CeraPlantRecord {
  cera_license_no: string
  company_name: string
  pv_kw: number
  bess_kw: number
  bess_kwh: number
  plant_class: PlantClass
  license_status: LicenseStatus
  license_type_raw: string
  operating_regime: string
  district: string
  district_en: string
  municipality: string
  license_start_date: string
  license_end_date: string
}

export function parseNumber(val: string): number {
  const cleaned = val.trim().replace(/[^0-9.,]/g, '').replace(',', '.')
  if (cleaned === '' || cleaned === '-') return 0
  return parseFloat(cleaned) || 0
}

export function cleanCompanyName(name: string): string {
  return name.trim().replace(/&AMP;/g, '&').replace(/\s+/g, ' ')
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      fields.push(current)
      current = ''
    } else {
      current += char
    }
  }
  fields.push(current)
  return fields
}

export function parseCSV(content: string): CeraRow[] {
  const lines = content.split('\n')
  const rows: CeraRow[] = []
  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    const fields = parseCSVLine(line)
    if (fields.length < 14) continue
    rows.push({
      companyName: cleanCompanyName(fields[0]),
      licenseNo: fields[1].trim(),
      startDate: fields[2].trim(),
      endDate: fields[3].trim(),
      capacityKw: parseNumber(fields[4]),
      bessOutputKw: parseNumber(fields[5]),
      bessCapacityKwh: parseNumber(fields[6]),
      technology: fields[7].trim(),
      techType: fields[8].trim(),
      fuel: fields[9].trim(),
      licenseType: fields[10].trim(),
      operatingRegime: fields[11].trim(),
      district: fields[12].trim(),
      municipality: fields[13].trim(),
    })
  }
  return rows
}

export function readCeraCsv(filePath: string = CERA_CSV_PATH): CeraRow[] {
  if (!fs.existsSync(filePath)) {
    throw new Error(`CERA CSV not found: ${filePath}`)
  }
  return parseCSV(fs.readFileSync(filePath, 'utf-8'))
}

export function filterPvRows(
  rows: CeraRow[],
  opts: { includeIndividuals?: boolean; operationalOnly?: boolean } = {}
): CeraRow[] {
  const { includeIndividuals = false, operationalOnly = false } = opts
  return rows.filter((r) => {
    const isPV =
      r.techType.includes('Φωτοβολταϊκό') || r.techType.includes('φωτοβολταϊκό')
    if (!isPV) return false
    if (!includeIndividuals && r.companyName.includes('ΦΥΣΙΚΟ ΠΡΟΣΩΠΟ')) return false
    if (r.operatingRegime === 'Εφεδρεία') return false
    if (operationalOnly && !r.licenseType.includes('Λειτουργίας')) return false
    return true
  })
}

export function licenseStatusFromRow(row: CeraRow): LicenseStatus {
  if (row.licenseType.includes('Λειτουργίας')) return 'operational'
  if (row.licenseType.includes('Κατασκευής')) return 'under_construction'
  return 'under_construction'
}

export function plantClassFromRow(row: CeraRow): PlantClass {
  const hasPv = row.capacityKw > 0
  const hasBess = row.bessOutputKw > 0 || row.bessCapacityKwh > 0
  if (!hasPv && hasBess) return 'bess_standalone'
  if (hasPv && hasBess) return 'pv_bess_hybrid'
  return 'pv_only'
}

export function rowToPlantRecord(row: CeraRow): CeraPlantRecord {
  const district_en = DISTRICT_MAP[row.district] || row.district
  return {
    cera_license_no: row.licenseNo,
    company_name: row.companyName,
    pv_kw: row.capacityKw,
    bess_kw: row.bessOutputKw,
    bess_kwh: row.bessCapacityKwh,
    plant_class: plantClassFromRow(row),
    license_status: licenseStatusFromRow(row),
    license_type_raw: row.licenseType,
    operating_regime: row.operatingRegime,
    district: row.district,
    district_en,
    municipality: row.municipality,
    license_start_date: row.startDate,
    license_end_date: row.endDate,
  }
}

export function rowsToPlantRecords(rows: CeraRow[]): CeraPlantRecord[] {
  return rows.map(rowToPlantRecord)
}
