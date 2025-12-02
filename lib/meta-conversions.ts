// Meta Conversions API Integration for SolarFarms.cy
// Server-side tracking with event deduplication support
import { FacebookAdsApi, ServerEvent, EventRequest, UserData, CustomData } from 'facebook-nodejs-business-sdk'
import crypto from 'crypto'

const ACCESS_TOKEN = process.env.META_CONVERSION_ACCESS_TOKEN
const PIXEL_ID = process.env.META_PIXEL_ID || '1339065790896028'

// Initialize Facebook API
if (ACCESS_TOKEN) {
  FacebookAdsApi.init(ACCESS_TOKEN)
}

// Hash helper function for PII data
const hash = (str: string | undefined): string | null => {
  if (!str) return null
  return crypto.createHash('sha256').update(str.trim().toLowerCase()).digest('hex')
}

export interface ConversionEventData {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  city?: string
  country?: string
  value?: number
  currency?: string
  eventSourceUrl?: string
  clientIpAddress?: string
  clientUserAgent?: string
  fbp?: string // Facebook browser ID cookie
  fbc?: string // Facebook click ID cookie
  eventId?: string // For deduplication with browser pixel
}

export async function trackMetaConversion(
  eventName: 'Lead' | 'Contact' | 'CompleteRegistration' | 'ViewContent' | 'InitiateCheckout',
  eventData: ConversionEventData
) {
  if (!ACCESS_TOKEN || !PIXEL_ID) {
    // Meta Conversion API not configured
    return { success: false, message: 'API not configured' }
  }

  try {
    const currentTimestamp = Math.floor(new Date().getTime() / 1000)

    // Build user data with proper hashing
    const userData = new UserData()
    
    // Hash all PII fields per Meta requirements
    const hashedEmail = hash(eventData.email)
    const hashedPhone = eventData.phone ? hash(eventData.phone.replace(/\D/g, '')) : null
    const hashedFirstName = hash(eventData.firstName)
    const hashedLastName = hash(eventData.lastName)
    const hashedCity = hash(eventData.city)
    const hashedCountry = hash(eventData.country)
    
    if (hashedEmail) userData.setEmails([hashedEmail])
    if (hashedPhone) userData.setPhones([hashedPhone])
    if (hashedFirstName) userData.setFirstNames([hashedFirstName])
    if (hashedLastName) userData.setLastNames([hashedLastName])
    if (hashedCity) userData.setCities([hashedCity])
    if (hashedCountry) userData.setCountries([hashedCountry])
    
    // Non-hashed browser data
    if (eventData.clientIpAddress) userData.setClientIpAddress(eventData.clientIpAddress)
    if (eventData.clientUserAgent) userData.setClientUserAgent(eventData.clientUserAgent)
    if (eventData.fbp) userData.setFbp(eventData.fbp)
    if (eventData.fbc) userData.setFbc(eventData.fbc)

    // Build custom data
    const customData = new CustomData()
    if (eventData.value) customData.setValue(eventData.value)
    if (eventData.currency) customData.setCurrency(eventData.currency)

    // Build server event
    const serverEvent = new ServerEvent()
      .setEventName(eventName)
      .setEventTime(currentTimestamp)
      .setUserData(userData)
      .setCustomData(customData)
      .setActionSource('website')
    
    // Set event ID for deduplication with browser pixel
    if (eventData.eventId) {
      serverEvent.setEventId(eventData.eventId)
    }
    
    if (eventData.eventSourceUrl) {
      serverEvent.setEventSourceUrl(eventData.eventSourceUrl)
    }

    // Send event
    const eventRequest = new EventRequest(ACCESS_TOKEN, PIXEL_ID)
      .setEvents([serverEvent])

    const response = await eventRequest.execute()
    
    return { success: true, data: response }
    
  } catch (error) {
    // Meta Conversion API error - fail silently
    return { success: false, error }
  }
}

// Lead values based on conversion funnel analysis
// Average deal size: €5M-€10M | Conversion rate: ~2-3% | Lead value = Deal * Conv%
export const LEAD_VALUES = {
  INVESTOR_CONTACT: 150,      // General investor inquiry (€5M avg * 3% = €150k value, report €150)
  LANDOWNER_LEAD: 200,        // Landowner with property (higher intent, scarcer)
  PROJECT_INTEREST: 500,      // Specific project inquiry (€9.6M * 5% = €480k, report €500)
  NEWSLETTER_SIGNUP: 25,      // Top of funnel, nurture lead
  CALCULATOR_LEAD: 100,       // Used calculator, showing research intent
  LOI_GENERATED: 1000,        // Letter of Intent = very high intent
} as const

// Helper function to track lead submission with full data
export async function trackLeadConversion(data: {
  email: string
  phone?: string
  firstName?: string
  lastName?: string
  city?: string
  country?: string
  value?: number
  source?: string
  fbp?: string
  fbc?: string
  eventId?: string
  clientIpAddress?: string
  clientUserAgent?: string
}) {
  return trackMetaConversion('Lead', {
    email: data.email,
    phone: data.phone,
    firstName: data.firstName,
    lastName: data.lastName,
    city: data.city,
    country: data.country || 'CY',
    value: data.value || LEAD_VALUES.INVESTOR_CONTACT,
    currency: 'EUR',
    eventSourceUrl: `https://solarfarms.cy${data.source || '/contact'}`,
    fbp: data.fbp,
    fbc: data.fbc,
    eventId: data.eventId,
    clientIpAddress: data.clientIpAddress,
    clientUserAgent: data.clientUserAgent,
  })
}

// Helper for project interest (high-value lead showing specific project intent)
export async function trackProjectInterest(data: {
  email: string
  projectRef: string
  value?: number
  fbp?: string
  fbc?: string
  eventId?: string
  clientIpAddress?: string
  clientUserAgent?: string
}) {
  return trackMetaConversion('InitiateCheckout', {
    email: data.email,
    value: data.value || LEAD_VALUES.PROJECT_INTEREST,
    currency: 'EUR',
    country: 'CY',
    eventSourceUrl: `https://solarfarms.cy/projects/${data.projectRef}`,
    fbp: data.fbp,
    fbc: data.fbc,
    eventId: data.eventId,
    clientIpAddress: data.clientIpAddress,
    clientUserAgent: data.clientUserAgent,
  })
}

// Helper for newsletter signup (top of funnel)
export async function trackNewsletterSignup(data: {
  email: string
  fbp?: string
  fbc?: string
  eventId?: string
}) {
  return trackMetaConversion('CompleteRegistration', {
    email: data.email,
    value: LEAD_VALUES.NEWSLETTER_SIGNUP,
    currency: 'EUR',
    eventSourceUrl: 'https://solarfarms.cy',
    fbp: data.fbp,
    fbc: data.fbc,
    eventId: data.eventId,
  })
}

// Helper for landowner leads (valuable property owners)
export async function trackLandownerLead(data: {
  email: string
  phone?: string
  plotSize?: string
  location?: string
  fbp?: string
  fbc?: string
  eventId?: string
  clientIpAddress?: string
  clientUserAgent?: string
}) {
  return trackMetaConversion('Lead', {
    email: data.email,
    phone: data.phone,
    country: 'CY',
    city: data.location,
    value: LEAD_VALUES.LANDOWNER_LEAD,
    currency: 'EUR',
    eventSourceUrl: 'https://solarfarms.cy/landowners',
    fbp: data.fbp,
    fbc: data.fbc,
    eventId: data.eventId,
    clientIpAddress: data.clientIpAddress,
    clientUserAgent: data.clientUserAgent,
  })
}

// Helper for LOI generation (highest intent)
export async function trackLOIGenerated(data: {
  email: string
  projectRef?: string
  investmentAmount?: number
  fbp?: string
  fbc?: string
  eventId?: string
}) {
  return trackMetaConversion('InitiateCheckout', {
    email: data.email,
    value: LEAD_VALUES.LOI_GENERATED,
    currency: 'EUR',
    eventSourceUrl: `https://solarfarms.cy/loi${data.projectRef ? `?project=${data.projectRef}` : ''}`,
    fbp: data.fbp,
    fbc: data.fbc,
    eventId: data.eventId,
  })
}

