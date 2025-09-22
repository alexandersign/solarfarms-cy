import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendNewsletterWelcome } from '@/lib/email'

// Validation schema for newsletter signup
const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().optional(), // Track where signup came from
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = newsletterSchema.parse(body)
    
    // In a real implementation, you would:
    // 1. Save to email marketing platform (Mailchimp, ConvertKit, etc.)
    // 2. Add to Supabase database
    // 3. Send welcome email
    // 4. Tag based on source
    
    // Processing newsletter signup
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Add to email list (placeholder - integrate with email platform)
    await addToEmailList(validatedData)
    
    // Send welcome email
    await sendNewsletterWelcome(validatedData)
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed! Check your email for a welcome message.',
        subscriberId: generateSubscriberId()
      },
      { status: 200 }
    )
    
  } catch (error) {
    // Newsletter signup error
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please enter a valid email address',
          errors: error.errors 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Subscription failed. Please try again.' 
      },
      { status: 500 }
    )
  }
}

async function addToEmailList(data: any) {
  // In production, integrate with email marketing platform
  // Adding to email list
  
  // TODO: Integrate with Mailchimp, ConvertKit, or similar
  // Example: await mailchimp.lists.addListMember(listId, { email_address: data.email })
  
  return true
}

async function sendWelcomeEmail(data: any) {
  // In production, send welcome email with investment resources
  // Sending welcome email
  
  const welcomeContent = `
    Welcome to SolarFarms.cy!
    
    Thank you for subscribing to our solar investment insights newsletter. You'll receive:
    
    📊 Weekly market analysis and investment opportunities
    📈 Exclusive ROI data and performance reports
    📋 Early access to new project launches
    🎯 Personalized investment recommendations
    
    As a welcome gift, here are some valuable resources:
    
    📖 Free Download: "Complete Guide to Cyprus Solar Investments"
    🧮 ROI Calculator: Calculate your potential returns
    📞 Free Consultation: Schedule with our experts
    
    Stay tuned for valuable insights delivered to your inbox every week!
    
    Best regards,
    The SolarFarms.cy Team
  `
  
  // TODO: Integrate with email service (Resend, SendGrid, etc.)
  return true
}

function generateSubscriberId(): string {
  return 'NL_' + Date.now().toString(36) + Math.random().toString(36).substr(2)
}
