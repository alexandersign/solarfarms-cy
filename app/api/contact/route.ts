import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendContactNotification, sendContactAutoresponder } from '@/lib/email'
import { supabase, contactsService, fileUploadService } from '@/lib/supabase'
import { trackLeadConversion } from '@/lib/meta-conversions'

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  investmentSize: z.string().min(1, 'Please select investment size'),
  timeline: z.string().min(1, 'Please select timeline'),
  message: z.string().optional().nullable(),
  // Meta tracking fields (optional, from client) - can be null if cookies don't exist
  fbp: z.string().optional().nullable(),
  fbc: z.string().optional().nullable(),
  eventId: z.string().optional().nullable(),
})

export async function POST(request: NextRequest) {
  try {
    // Handle JSON data for investor contact form (no file uploads)
    const body = await request.json()
    
    // Validate the request body
    const validatedData = contactSchema.parse(body)
    
    // In a real implementation, you would:
    // 1. Save to database (Supabase)
    // 2. Send email notification
    // 3. Add to CRM system
    // 4. Send autoresponder email
    
    // For now, we'll simulate the process
    // Processing contact form submission
    
    // Save contact to Supabase database
    // Convert null values to undefined for database compatibility
    const contactToSave = {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone ?? undefined,
      company: validatedData.company ?? undefined,
      investment_size: validatedData.investmentSize, // Map field name
      timeline: validatedData.timeline,
      message: validatedData.message ?? undefined,
      source: 'website'
    }
    
    // No file uploads for investor contact form
    
    // Try to save to Supabase, but continue if database is down
    let savedContact = null
    try {
      savedContact = await contactsService.create(contactToSave)
    } catch (dbError) {
      // Database save failed (Supabase may be paused) - continue with email sending
      savedContact = { id: 'temp_' + Date.now() }
    }
    
    // Create email data with null converted to undefined
    const emailData = {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone ?? undefined,
      company: validatedData.company ?? undefined,
      investmentSize: validatedData.investmentSize,
      timeline: validatedData.timeline,
      message: validatedData.message ?? undefined,
    }
    
    // Send email notification to team
    const notificationResult = await sendContactNotification(emailData)
    
    // Send autoresponder to client
    const autoresponderResult = await sendContactAutoresponder(emailData)
    
    // Extract first and last name from full name
    const nameParts = validatedData.name.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : undefined
    
    // Get client IP and user agent from request headers
    const clientIpAddress = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                            request.headers.get('x-real-ip') || 
                            undefined
    const clientUserAgent = request.headers.get('user-agent') || undefined
    
    // Track Meta conversion with deduplication (async, don't wait)
    // Lead value: €150 for general investor inquiry
    trackLeadConversion({
      email: validatedData.email,
      phone: validatedData.phone ?? undefined,
      firstName,
      lastName,
      country: 'CY',
      value: 150, // Investor contact lead value in EUR
      source: '/contact',
      fbp: validatedData.fbp ?? undefined,
      fbc: validatedData.fbc ?? undefined,
      eventId: validatedData.eventId ?? undefined,
      clientIpAddress,
      clientUserAgent,
    }).catch(() => {}) // Ignore errors, don't block response
    
    // Check if emails failed
    if (!notificationResult.success || !autoresponderResult.success) {
      // Email sending failed
      
      return NextResponse.json(
        { 
          success: false, 
          message: 'Form submitted but email delivery failed. We have your information and will contact you directly.',
          emailError: true
        },
        { status: 200 } // Still 200 since form data was saved
      )
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your inquiry. We will contact you within 24 hours.',
        submissionId: savedContact.id
      },
      { status: 200 }
    )
    
  } catch (error) {
    // Contact form processing error
    
    if (error instanceof z.ZodError) {
      // Build user-friendly error message
      const errorMessages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      return NextResponse.json(
        { 
          success: false, 
          message: `Please check your form: ${errorMessages}`,
          errors: error.errors 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred. Please try again or contact us directly.' 
      },
      { status: 500 }
    )
  }
}

function generateSubmissionId(): string {
  return 'SF_' + Date.now().toString(36) + Math.random().toString(36).substr(2)
}
