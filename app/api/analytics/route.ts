import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema for analytics events
const analyticsSchema = z.object({
  event: z.string().min(1),
  category: z.string().min(1),
  label: z.string().optional(),
  value: z.number().optional(),
  userId: z.string().optional(),
  sessionId: z.string().optional(),
  properties: z.record(z.any()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = analyticsSchema.parse(body)
    
    // Track event (in production, send to analytics platform)
    await trackEvent(validatedData)
    
    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Analytics tracking error:', error)
    
    return NextResponse.json(
      { success: false },
      { status: 400 }
    )
  }
}

async function trackEvent(data: any) {
  console.log('Analytics event:', data)
  
  // In production, integrate with:
  // - PostHog: await posthog.capture(data.userId, data.event, data.properties)
  // - Google Analytics: Send to GA4 via Measurement Protocol
  // - Mixpanel: await mixpanel.track(data.event, data.properties)
  
  return true
}
