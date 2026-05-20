/**
 * Cyprus grid / substation context for landowner assessments.
 * Public dashboard (EAC / grid capacity — verify attribution with data owner).
 */

export const CYPRUS_SUBSTATION_DASHBOARD = {
  /** ArcGIS Dashboard — substation / grid situation (public link) */
  dashboardUrl:
    'https://www.arcgis.com/apps/dashboards/134fdd8988d44ade8dd33b5c1c26ca65',
  embedUrl:
    'https://www.arcgis.com/apps/dashboards/134fdd8988d44ade8dd33b5c1c26ca65?embed=true',
  title: 'Cyprus Substation & Grid Situation',
  description:
    'Live map of substation capacity and grid constraints in Cyprus. Use this to see whether your area has connection headroom before committing to development.',
  attribution: 'Source: ArcGIS dashboard (third-party). Indicative only — confirm with EAC/TSOC during feasibility.',
} as const

export type GridConnectionHint = {
  status: 'unknown' | 'review' | 'favorable' | 'constrained'
  summary: string
  nearestFeature?: string
  distanceKm?: number
  dashboardUrl: string
}
