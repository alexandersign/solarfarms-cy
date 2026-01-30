/**
 * Cyprus Department of Land and Surveys (DLS) API Integration
 * https://portal.dls.moi.gov.cy/en/alles-ypiresies/katalogos-apis/
 * 
 * This module provides integration with the public DLS ArcGIS REST APIs
 * for land zoning verification and solar farm feasibility assessment.
 */

// API Endpoints
const DLS_BASE_URL = 'https://eservices.dls.moi.gov.cy/arcgis/rest/services/National'
const CADASTRAL_MAP = `${DLS_BASE_URL}/CadastralMap_EN/MapServer`
const TOPOGRAPHY_MAP = `${DLS_BASE_URL}/Topography_EN/MapServer`

// Layer IDs from DLS API
const LAYERS = {
  PARCELS: 0,
  PLANNING_ZONES: 12,
  DEVELOPMENT_PLANS: 11,
  DISTRICTS: 15,
  MUNICIPALITIES: 16,
  NATURA_2000: 8, // In Topography map
}

// Cyprus Solar Farm Zoning Rules
export const ZONE_RULES = {
  // No-go zones - Solar development NOT permitted
  NO_GO_ZONES: ['Η2', 'H2', 'Ζ', 'Z', 'Ζα', 'Za', 'Ζβ', 'Zb', 'Ζγ', 'Zc'],
  
  // Restricted zones - Requires special permits
  RESTRICTED_ZONES: ['Natura 2000', 'SPA', 'SAC', 'Bird Path', 'Migration Corridor'],
  
  // Favorable zones - Solar typically permitted
  FAVORABLE_ZONES: ['Γ3', 'G3', 'Γ4', 'G4', 'Α2', 'A2', 'Α3', 'A3', 'ΒΕ', 'BE', 'Κα', 'Ka'],
  
  // Agricultural zones - Solar may be permitted
  AGRICULTURAL_ZONES: ['Α1', 'A1', 'Α4', 'A4', 'Γ1', 'G1', 'Γ2', 'G2']
}

// Solar capacity calculation constants
export const SOLAR_CONSTANTS = {
  // Panel specifications (typical 550W bifacial)
  PANEL_WIDTH_M: 2.28,           // meters
  PANEL_HEIGHT_M: 1.13,          // meters
  PANEL_POWER_KW: 0.55,          // kW per panel
  
  // Row spacing by orientation
  SOUTH_PITCH_M: 4.0,            // 4 meter pitch for south-facing
  EAST_WEST_PITCH_M: 1.0,        // 1 meter pitch for east-west
  
  // Ground coverage ratio (GCR)
  SOUTH_GCR: 0.35,               // 35% coverage for south (accounting for shading)
  EAST_WEST_GCR: 0.75,           // 75% coverage for east-west (minimal shading)
  
  // Cyprus-specific production factors
  CYPRUS_YIELD_SOUTH_KWH_KWP: 1650,     // kWh/kWp for south-facing
  CYPRUS_YIELD_EW_KWH_KWP: 1450,        // kWh/kWp for east-west (slightly less)
  
  // Default electricity price
  DEFAULT_TARIFF_EUR_KWH: 0.16,
  
  // Area efficiency (roads, inverters, transformers, buffers)
  USABLE_AREA_RATIO: 0.70,       // 70% of plot is usable for panels
}

/**
 * Zone assessment result
 */
export interface ZoneAssessment {
  zoneCode: string
  zoneName: string
  isViable: boolean
  status: 'GO' | 'NO_GO' | 'RESTRICTED' | 'REVIEW_NEEDED'
  reason: string
  restrictions: string[]
}

/**
 * Solar capacity estimate
 */
export interface CapacityEstimate {
  orientation: 'SOUTH' | 'EAST_WEST'
  capacityMW: number
  capacityKWp: number
  panelCount: number
  annualProductionKWh: number
  annualProductionMWh: number
  annualRevenueEUR: number
  specificYield: number // kWh/kWp
}

/**
 * Complete land assessment result
 */
export interface LandAssessmentResult {
  // Location data
  location: {
    query: string
    coordinates?: { lat: number; lng: number }
    district?: string
    municipality?: string
  }
  
  // Plot data
  plot: {
    areaHectares: number
    areaSquareMeters: number
    usableAreaM2: number
  }
  
  // Zoning assessment
  zoning: ZoneAssessment
  
  // Capacity estimates
  southFacing: CapacityEstimate
  eastWest: CapacityEstimate
  
  // Environmental restrictions
  environmental: {
    inNatura2000: boolean
    inBirdPath: boolean
    protectedArea: boolean
    environmentalNotes: string[]
  }
  
  // Overall recommendation
  recommendation: {
    viable: boolean
    bestOption: 'SOUTH' | 'EAST_WEST' | 'NONE'
    summary: string
    nextSteps: string[]
  }
  
  // Data source info
  dataSource: string
  timestamp: string
}

/**
 * Query DLS API for zone information at a location
 */
export async function queryZoneAtLocation(
  lat: number, 
  lng: number
): Promise<{ zone: string; zoneName: string } | null> {
  try {
    // Query Planning Zones layer (12) using identify
    const url = new URL(`${CADASTRAL_MAP}/identify`)
    url.searchParams.set('geometry', `${lng},${lat}`)
    url.searchParams.set('geometryType', 'esriGeometryPoint')
    url.searchParams.set('sr', '4326') // WGS84
    url.searchParams.set('layers', `all:${LAYERS.PLANNING_ZONES}`)
    url.searchParams.set('tolerance', '10')
    url.searchParams.set('mapExtent', `${lng-0.01},${lat-0.01},${lng+0.01},${lat+0.01}`)
    url.searchParams.set('imageDisplay', '400,400,96')
    url.searchParams.set('returnGeometry', 'false')
    url.searchParams.set('f', 'json')
    
    const response = await fetch(url.toString(), {
      headers: { 'Accept': 'application/json' }
    })
    
    if (!response.ok) {
      throw new Error(`DLS API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.results && data.results.length > 0) {
      const result = data.results[0]
      return {
        zone: result.attributes?.Zone || result.attributes?.ZONE_CODE || 'Unknown',
        zoneName: result.attributes?.Zone_Name || result.attributes?.ZONE_NAME || 'Unknown Zone'
      }
    }
    
    return null
  } catch (error) {
    // DLS API query failed, will use fallback
    return null
  }
}

/**
 * Query DLS API for Natura 2000 area at location
 */
export async function queryNatura2000AtLocation(
  lat: number,
  lng: number
): Promise<boolean> {
  try {
    const url = new URL(`${TOPOGRAPHY_MAP}/identify`)
    url.searchParams.set('geometry', `${lng},${lat}`)
    url.searchParams.set('geometryType', 'esriGeometryPoint')
    url.searchParams.set('sr', '4326')
    url.searchParams.set('layers', `all:${LAYERS.NATURA_2000}`)
    url.searchParams.set('tolerance', '10')
    url.searchParams.set('mapExtent', `${lng-0.01},${lat-0.01},${lng+0.01},${lat+0.01}`)
    url.searchParams.set('imageDisplay', '400,400,96')
    url.searchParams.set('returnGeometry', 'false')
    url.searchParams.set('f', 'json')
    
    const response = await fetch(url.toString(), {
      headers: { 'Accept': 'application/json' }
    })
    
    if (!response.ok) return false
    
    const data = await response.json()
    return data.results && data.results.length > 0
  } catch (error) {
    return false
  }
}

/**
 * Assess zone viability for solar development
 */
export function assessZoneViability(zoneCode: string): ZoneAssessment {
  const normalizedZone = zoneCode.trim().toUpperCase()
  
  // Check no-go zones
  for (const noGo of ZONE_RULES.NO_GO_ZONES) {
    if (normalizedZone.includes(noGo.toUpperCase())) {
      return {
        zoneCode,
        zoneName: getZoneName(zoneCode),
        isViable: false,
        status: 'NO_GO',
        reason: `Zone ${zoneCode} is classified as a protected or restricted zone where solar development is NOT permitted.`,
        restrictions: [
          'Solar farm construction not allowed',
          'Zone protected under Cyprus planning regulations',
          'No permits can be issued for renewable energy installations'
        ]
      }
    }
  }
  
  // Check restricted zones (Natura, Bird paths)
  for (const restricted of ZONE_RULES.RESTRICTED_ZONES) {
    if (normalizedZone.includes(restricted.toUpperCase())) {
      return {
        zoneCode,
        zoneName: getZoneName(zoneCode),
        isViable: false,
        status: 'RESTRICTED',
        reason: `Zone ${zoneCode} falls within a ${restricted} protected area.`,
        restrictions: [
          'Environmental impact assessment required',
          'Special permits from Environment Department needed',
          'Bird migration patterns may restrict development seasons',
          'Higher scrutiny from EU environmental regulations'
        ]
      }
    }
  }
  
  // Check favorable zones
  for (const favorable of ZONE_RULES.FAVORABLE_ZONES) {
    if (normalizedZone.includes(favorable.toUpperCase())) {
      return {
        zoneCode,
        zoneName: getZoneName(zoneCode),
        isViable: true,
        status: 'GO',
        reason: `Zone ${zoneCode} is favorable for solar development with standard permitting.`,
        restrictions: []
      }
    }
  }
  
  // Check agricultural zones
  for (const agri of ZONE_RULES.AGRICULTURAL_ZONES) {
    if (normalizedZone.includes(agri.toUpperCase())) {
      return {
        zoneCode,
        zoneName: getZoneName(zoneCode),
        isViable: true,
        status: 'GO',
        reason: `Zone ${zoneCode} is agricultural land where solar may be permitted with appropriate permits.`,
        restrictions: [
          'Agricultural permit conversion may be required',
          'Environmental impact study recommended'
        ]
      }
    }
  }
  
  // Unknown zone - needs review
  return {
    zoneCode,
    zoneName: getZoneName(zoneCode),
    isViable: false,
    status: 'REVIEW_NEEDED',
    reason: `Zone ${zoneCode} requires manual review to determine solar development eligibility.`,
    restrictions: [
      'Zone classification not in standard categories',
      'Site visit and planning department consultation recommended'
    ]
  }
}

/**
 * Get human-readable zone name
 */
function getZoneName(zoneCode: string): string {
  const zoneNames: Record<string, string> = {
    'Γ3': 'Agricultural Zone G3 - Mixed Use',
    'G3': 'Agricultural Zone G3 - Mixed Use',
    'Γ4': 'Agricultural Zone G4 - Rural',
    'G4': 'Agricultural Zone G4 - Rural',
    'Η2': 'Protection Zone H2 - Environmental',
    'H2': 'Protection Zone H2 - Environmental',
    'Ζ': 'Strict Protection Zone Z',
    'Z': 'Strict Protection Zone Z',
    'Α1': 'Agricultural Zone A1 - Primary',
    'A1': 'Agricultural Zone A1 - Primary',
    'Α2': 'Agricultural Zone A2 - Secondary',
    'A2': 'Agricultural Zone A2 - Secondary',
    'ΒΕ': 'Industrial Zone BE',
    'BE': 'Industrial Zone BE',
    'Κα': 'Residential Zone Ka',
    'Ka': 'Residential Zone Ka',
  }
  
  return zoneNames[zoneCode] || `Zone ${zoneCode}`
}

/**
 * Calculate solar capacity for a given plot area
 */
export function calculateSolarCapacity(
  areaHectares: number,
  orientation: 'SOUTH' | 'EAST_WEST',
  tariffEurKwh: number = SOLAR_CONSTANTS.DEFAULT_TARIFF_EUR_KWH
): CapacityEstimate {
  const areaM2 = areaHectares * 10000
  const usableAreaM2 = areaM2 * SOLAR_CONSTANTS.USABLE_AREA_RATIO
  
  // Calculate based on orientation
  const gcr = orientation === 'SOUTH' 
    ? SOLAR_CONSTANTS.SOUTH_GCR 
    : SOLAR_CONSTANTS.EAST_WEST_GCR
  
  const specificYield = orientation === 'SOUTH'
    ? SOLAR_CONSTANTS.CYPRUS_YIELD_SOUTH_KWH_KWP
    : SOLAR_CONSTANTS.CYPRUS_YIELD_EW_KWH_KWP
  
  // Calculate panel area that fits
  const panelArea = usableAreaM2 * gcr
  const panelSizeM2 = SOLAR_CONSTANTS.PANEL_WIDTH_M * SOLAR_CONSTANTS.PANEL_HEIGHT_M
  const panelCount = Math.floor(panelArea / panelSizeM2)
  
  // Calculate capacity
  const capacityKWp = panelCount * SOLAR_CONSTANTS.PANEL_POWER_KW
  const capacityMW = capacityKWp / 1000
  
  // Calculate production
  const annualProductionKWh = capacityKWp * specificYield
  const annualProductionMWh = annualProductionKWh / 1000
  
  // Calculate revenue
  const annualRevenueEUR = annualProductionKWh * tariffEurKwh
  
  return {
    orientation,
    capacityMW: Math.round(capacityMW * 100) / 100,
    capacityKWp: Math.round(capacityKWp),
    panelCount,
    annualProductionKWh: Math.round(annualProductionKWh),
    annualProductionMWh: Math.round(annualProductionMWh * 10) / 10,
    annualRevenueEUR: Math.round(annualRevenueEUR),
    specificYield
  }
}

/**
 * Parse plot size from user input (handles various formats)
 */
export function parsePlotSize(input: string): number {
  const normalized = input.toLowerCase().trim()
  
  // Try to extract number
  const numberMatch = normalized.match(/[\d.,]+/)
  if (!numberMatch) return 0
  
  const value = parseFloat(numberMatch[0].replace(',', '.'))
  
  // Detect unit and convert to hectares
  if (normalized.includes('acre')) {
    return value * 0.404686 // acres to hectares
  } else if (normalized.includes('donum') || normalized.includes('decare') || normalized.includes('stremma')) {
    return value * 0.1 // 1 donum/decare/stremma = 0.1 hectares
  } else if (normalized.includes('m2') || normalized.includes('sqm') || normalized.includes('square meter')) {
    return value / 10000 // sq meters to hectares
  } else if (normalized.includes('ha') || normalized.includes('hectare')) {
    return value
  } else {
    // Assume hectares if no unit specified
    return value
  }
}

/**
 * Perform complete land assessment
 */
export async function performLandAssessment(
  plotSizeInput: string,
  location: string,
  coordinates?: { lat: number; lng: number },
  tariffEurKwh: number = 0.16
): Promise<LandAssessmentResult> {
  const areaHectares = parsePlotSize(plotSizeInput)
  const areaM2 = areaHectares * 10000
  const usableAreaM2 = areaM2 * SOLAR_CONSTANTS.USABLE_AREA_RATIO
  
  // Default zone assessment (will be updated if API call succeeds)
  let zoning: ZoneAssessment = {
    zoneCode: 'Unknown',
    zoneName: 'Unknown - Manual Review Required',
    isViable: true, // Optimistic default
    status: 'REVIEW_NEEDED',
    reason: 'Zone data could not be retrieved. Manual verification required.',
    restrictions: ['Zone verification pending site survey']
  }
  
  // Environmental defaults
  let inNatura2000 = false
  const inBirdPath = false // Bird path detection not yet implemented in DLS API
  
  // Query DLS API if coordinates provided
  if (coordinates) {
    const [zoneData, natura2000] = await Promise.all([
      queryZoneAtLocation(coordinates.lat, coordinates.lng),
      queryNatura2000AtLocation(coordinates.lat, coordinates.lng)
    ])
    
    if (zoneData) {
      zoning = assessZoneViability(zoneData.zone)
    }
    
    inNatura2000 = natura2000
    if (inNatura2000) {
      zoning = {
        ...zoning,
        isViable: false,
        status: 'RESTRICTED',
        reason: 'Location falls within Natura 2000 protected area.',
        restrictions: [
          ...zoning.restrictions,
          'Natura 2000 environmental restrictions apply',
          'Special EU environmental permits required'
        ]
      }
    }
  }
  
  // Calculate capacity for both orientations
  const southFacing = calculateSolarCapacity(areaHectares, 'SOUTH', tariffEurKwh)
  const eastWest = calculateSolarCapacity(areaHectares, 'EAST_WEST', tariffEurKwh)
  
  // Determine best option
  let bestOption: 'SOUTH' | 'EAST_WEST' | 'NONE' = 'NONE'
  let viable = false
  let summary = ''
  
  if (zoning.isViable) {
    viable = true
    // East-West typically has higher capacity but lower yield per kWp
    // South typically has better overall economics for Cyprus
    if (southFacing.annualRevenueEUR >= eastWest.annualRevenueEUR * 0.95) {
      bestOption = 'SOUTH'
      summary = `Your ${areaHectares.toFixed(1)} hectare plot is viable for solar development. South-facing installation is recommended with ${southFacing.capacityMW} MW capacity and estimated annual revenue of €${southFacing.annualRevenueEUR.toLocaleString()}.`
    } else {
      bestOption = 'EAST_WEST'
      summary = `Your ${areaHectares.toFixed(1)} hectare plot is viable for solar development. East-West installation maximizes capacity at ${eastWest.capacityMW} MW with estimated annual revenue of €${eastWest.annualRevenueEUR.toLocaleString()}.`
    }
  } else {
    summary = `Your plot in zone ${zoning.zoneCode} has restrictions: ${zoning.reason}`
  }
  
  // Compile next steps
  const nextSteps = viable
    ? [
        'Professional site survey to confirm topography and shading',
        'Grid connection feasibility study with EAC',
        'Environmental impact assessment (if required)',
        'Planning permit application preparation',
        'Financial structuring and investor matching'
      ]
    : [
        'Consult with planning department for zone clarification',
        'Review environmental restrictions with authorities',
        'Consider alternative development options',
        'Contact our team for guidance on next steps'
      ]
  
  return {
    location: {
      query: location,
      coordinates,
      district: undefined, // Could be enriched from DLS API
      municipality: undefined
    },
    plot: {
      areaHectares,
      areaSquareMeters: areaM2,
      usableAreaM2
    },
    zoning,
    southFacing,
    eastWest,
    environmental: {
      inNatura2000,
      inBirdPath,
      protectedArea: inNatura2000 || inBirdPath,
      environmentalNotes: inNatura2000 
        ? ['Located within Natura 2000 network - special permits required']
        : []
    },
    recommendation: {
      viable,
      bestOption,
      summary,
      nextSteps
    },
    dataSource: coordinates 
      ? 'Cyprus Department of Land and Surveys (DLS) API + Calculations'
      : 'Calculations based on user input (Zone verification pending)',
    timestamp: new Date().toISOString()
  }
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CY', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

/**
 * Format large numbers with K/M suffixes
 */
export function formatLargeNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K'
  }
  return num.toLocaleString()
}
