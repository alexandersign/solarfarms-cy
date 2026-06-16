/**
 * Infer Cyprus district from WGS84 coordinates (commercial / OSM prospects).
 * Approximate bounding boxes — good enough for CRM district filters.
 */

const BOXES: { district: string; south: number; north: number; west: number; east: number }[] = [
  { district: 'Paphos', south: 34.65, north: 34.88, west: 32.25, east: 32.55 },
  { district: 'Limassol', south: 34.54, north: 34.84, west: 32.82, east: 33.22 },
  { district: 'Larnaca', south: 34.76, north: 35.05, west: 33.45, east: 33.82 },
  { district: 'Famagusta', south: 34.88, north: 35.18, west: 33.82, east: 34.15 },
  { district: 'Nicosia', south: 34.98, north: 35.38, west: 32.88, east: 33.58 },
]

export function inferCyprusDistrict(lat: number, lon: number): string | undefined {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return undefined
  for (const b of BOXES) {
    if (lat >= b.south && lat <= b.north && lon >= b.west && lon <= b.east) return b.district
  }
  return undefined
}
