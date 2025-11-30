// Meta Conversions API Integration for SolarFarms.cy
import { FacebookAdsApi, ServerEvent, EventRequest, UserData, CustomData } from 'facebook-nodejs-business-sdk'

const ACCESS_TOKEN = process.env.META_CONVERSION_ACCESS_TOKEN
const PIXEL_ID = process.env.META_PIXEL_ID

// Initialize Facebook API
if (ACCESS_TOKEN) {
  FacebookAdsApi.init(ACCESS_TOKEN)
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
  fbp?: string // Facebook browser ID
  fbc?: string // Facebook click ID
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

    // Build user data
    const userData = new UserData()
    
    if (eventData.email) {
      // Hash email with SHA256
      const crypto = await import('crypto')
      const hashedEmail = crypto.createHash('sha256').update(eventData.email.toLowerCase().trim()).digest('hex')
      userData.setEmails([hashedEmail])
    }
    
    if (eventData.phone) {
      // Hash phone with SHA256
      const crypto = await import('crypto')
      const hashedPhone = crypto.createHash('sha256').update(eventData.phone.replace(/\D/g, '')).digest('hex')
      userData.setPhones([hashedPhone])
    }

    if (eventData.firstName) userData.setFirstNames([eventData.firstName])
    if (eventData.lastName) userData.setLastNames([eventData.lastName])
    if (eventData.city) userData.setCities([eventData.city])
    if (eventData.country) userData.setCountryCodes([eventData.country])
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

// Helper function to track lead submission
export async function trackLeadConversion(data: {
  email: string
  phone?: string
  value?: number
  source?: string
}) {
  return trackMetaConversion('Lead', {
    email: data.email,
    phone: data.phone,
    value: data.value || 142.52, // Default lead value
    currency: 'EUR',
    country: 'CY',
    eventSourceUrl: `https://solarfarms.cy${data.source || '/contact'}`
  })
}

// Helper for project interest
export async function trackProjectInterest(data: {
  email: string
  projectRef: string
  value: number
}) {
  return trackMetaConversion('InitiateCheckout', {
    email: data.email,
    value: data.value,
    currency: 'EUR',
    country: 'CY',
    eventSourceUrl: `https://solarfarms.cy/projects/${projectRef}`
  })
}

