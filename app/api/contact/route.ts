import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendContactNotification, sendContactAutoresponder } from '@/lib/email'
import { supabase, contactsService, fileUploadService } from '@/lib/supabase'

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  investmentSize: z.string().min(1, 'Please select investment size'),
  timeline: z.string().min(1, 'Please select timeline'),
  message: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Handle file uploads
    const uploadedFileUrls: string[] = []
    const files: File[] = []
    
    // Extract files from FormData
    const entries = Array.from(formData.entries())
    for (const [key, value] of entries) {
      if (key.startsWith('file_') && value instanceof File) {
        files.push(value)
      }
    }
    
    // Upload files to Supabase Storage
    if (files.length > 0) {
      try {
        const urls = await fileUploadService.uploadMultipleFiles(files, 'contact-documents', 'leads')
        uploadedFileUrls.push(...urls)
      } catch (uploadError) {
        return NextResponse.json(
          { success: false, message: 'File upload failed. Please try again.' },
          { status: 500 }
        )
      }
    }
    
    // Extract and validate form data
    const contactData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      investmentSize: formData.get('investmentSize') as string,
      timeline: formData.get('timeline') as string,
      message: formData.get('message') as string,
    }
    
    const validatedData = contactSchema.parse(contactData)
    
    // In a real implementation, you would:
    // 1. Save to database (Supabase)
    // 2. Send email notification
    // 3. Add to CRM system
    // 4. Send autoresponder email
    
    // For now, we'll simulate the process
    // Processing contact form submission
    
    // Save contact to Supabase database
    const savedContact = await contactsService.create({
      ...validatedData,
      attached_files: uploadedFileUrls,
      source: 'website'
    })
    
    // Send email notification to team (with file info)
    await sendContactNotification({
      ...validatedData,
      attachedFiles: uploadedFileUrls
    })
    
    // Send autoresponder to client
    await sendContactAutoresponder(validatedData)
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your inquiry. We will contact you within 24 hours.',
        submissionId: savedContact.id,
        filesUploaded: uploadedFileUrls.length
      },
      { status: 200 }
    )
    
  } catch (error) {
    // Contact form processing error
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please check your form data',
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

// Placeholder functions for email functionality
async function sendEmailNotification(data: any) {
  // In production, use Resend, SendGrid, or similar service
  // Sending email notification to team
  
  const emailContent = `
    New Solar Investment Inquiry
    
    Name: ${data.name}
    Email: ${data.email}
    Phone: ${data.phone || 'Not provided'}
    Company: ${data.company || 'Not provided'}
    Investment Size: ${data.investmentSize}
    Timeline: ${data.timeline}
    Message: ${data.message || 'No additional message'}
    
    Submitted: ${new Date().toISOString()}
  `
  
  // TODO: Integrate with email service
  return true
}

async function sendAutoresponder(data: any) {
  // In production, send personalized autoresponder
  // Sending autoresponder to client
  
  const autoresponderContent = `
    Dear ${data.name},
    
    Thank you for your interest in Cyprus solar farm investments. We have received your inquiry and will prepare a customized investment proposal based on your requirements.
    
    Investment Details:
    - Investment Size: ${data.investmentSize}
    - Timeline: ${data.timeline}
    
    Our team will contact you within 24 hours to discuss:
    - Available projects matching your investment criteria
    - Detailed financial projections and ROI analysis
    - Site visit opportunities
    - Investment process and documentation
    
    In the meantime, you may find these resources helpful:
    - Download our Complete Investment Guide: https://solarfarms.cy/resources/investment-guide
    - Explore our Project Portfolio: https://solarfarms.cy/projects
    - Use our ROI Calculator: https://solarfarms.cy/calculator
    
    Best regards,
    The Lighthief Cyprus Team
    
    LIGHTHIEF CYPRUS LTD
    28 October Ave 249, Lophitis Business Center 1, Office 201
    3035 Limassol, Cyprus
    
    General Inquiries: office@lighthief.com | +357 77 77 00 50
    Business Development: alexander.papacosta@lighthief.com | +357 99 164 158
    Investor Relations: a.sybaris@lighthief.com | +357 95 152 788
    
    Company Registration: HE 477423 | TIN: 60187188Q
    Web: https://solarfarms.cy
  `
  
  // TODO: Integrate with email service
  return true
}

function generateSubmissionId(): string {
  return 'SF_' + Date.now().toString(36) + Math.random().toString(36).substr(2)
}
