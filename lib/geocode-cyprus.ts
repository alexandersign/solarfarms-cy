/**
 * Lightweight geocoding for Cyprus locations (Nominatim).
 * Used to enable DLS zone queries when user only provides village/district text.
 */

export interface GeocodeResult {
  lat: number
  lng: number
  displayName: string
  confidence: 'high' | 'medium' | 'low'
}

export async function geocodeCyprusLocation(
  query: string,
  hints?: { district?: string; village?: string }
): Promise<GeocodeResult | null> {
  const parts = [hints?.village, hints?.district, query, 'Cyprus'].filter(Boolean)
  const q = [...new Set(parts)].join(', ').trim()
  if (!q || q.length < 3) return null

  try {
    const url = new URL('https://nominatim.openstreetmap.org/search')
    url.searchParams.set('q', q)
    url.searchParams.set('format', 'json')
    url.searchParams.set('limit', '1')
    url.searchParams.set('countrycodes', 'cy')

    const res = await fetch(url.toString(), {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'LighthiefSolarFarmsCy/1.0 (land assessment; contact office@lighthief.com)',
      },
      next: { revalidate: 86400 },
    })

    if (!res.ok) return null
    const data = (await res.json()) as Array<{ lat: string; lon: string; display_name: string; importance?: number }>
    if (!data?.length) return null

    const hit = data[0]
    const importance = hit.importance ?? 0
    return {
      lat: parseFloat(hit.lat),
      lng: parseFloat(hit.lon),
      displayName: hit.display_name,
      confidence: importance > 0.5 ? 'high' : importance > 0.25 ? 'medium' : 'low',
    }
  } catch {
    return null
  }
}
