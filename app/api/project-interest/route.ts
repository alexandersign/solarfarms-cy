import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Validation schema for project interest
const projectInterestSchema = z.object({
  projectRef: z.string().min(1, 'Project reference is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().optional(),
  scenario: z.enum(['solar-only', 'solar-bess']).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = projectInterestSchema.parse(body)
    
    // Save to Supabase project_interests table (with fallback)
    let savedInterest = null
    try {
      const { data, error } = await supabase
        .from('project_interests')
        .insert({
          project_ref: validatedData.projectRef,
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          message: validatedData.message,
          scenario: validatedData.scenario,
          source: 'project_listing',
          status: 'new'
        })
        .select()
        .single()
      
      if (error) throw error
      savedInterest = data
    } catch (dbError) {
      // Continue even if database fails
      savedInterest = { id: 'temp_' + Date.now() }
    }
    
    // Send email notification to Alexander (private - only admin sees buyer contact)
    if (resend) {
      try {
        await resend.emails.send({
          from: 'SolarFarms.cy <noreply@solarfarms.cy>',
          replyTo: validatedData.email,
          to: ['lighthiefcyprus@gmail.com'],
          subject: `PROJECT INTEREST - ${validatedData.projectRef} - ${validatedData.name}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .header { background: linear-gradient(135deg, #f59e0b 0%, #0ea5e9 100%); color: white; padding: 20px; text-align: center; }
                    .content { padding: 20px; }
                    .highlight { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; }
                    .private { background: #fee2e2; border: 2px solid #dc2626; padding: 15px; border-radius: 8px; margin: 15px 0; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>🏗️ New Project Interest</h1>
                    <p>SolarFarms.cy Project Listing</p>
                </div>
                
                <div class="content">
                    <div class="private">
                        <h3>⚠️ CONFIDENTIAL - Private Buyer Contact Information</h3>
                        <p><strong>Project:</strong> ${validatedData.projectRef}</p>
                        <p><strong>Buyer Name:</strong> ${validatedData.name}</p>
                        <p><strong>Buyer Email:</strong> ${validatedData.email}</p>
                        <p><strong>Buyer Phone:</strong> ${validatedData.phone || 'Not provided'}</p>
                        <p><strong>Scenario Interest:</strong> ${validatedData.scenario || 'Not specified'}</p>
                    </div>
                    
                    ${validatedData.message ? `
                    <div class="highlight">
                        <h3>Buyer Message</h3>
                        <p>${validatedData.message}</p>
                    </div>
                    ` : ''}
                    
                    <h3>Next Steps</h3>
                    <ul>
                        <li>Contact buyer within 24 hours</li>
                        <li>Prepare detailed financial model and due diligence package</li>
                        <li>Schedule site visit if requested</li>
                        <li>Provide seller contact information only after NDA</li>
                    </ul>
                    
                    <p><strong>This information is confidential and should not be shared with the park owner without buyer consent.</strong></p>
                </div>
                
                <div style="background: #f3f4f6; padding: 15px; font-size: 12px; color: #666;">
                    <p>Submitted: ${new Date().toLocaleString()}</p>
                    <p>Source: Project Listing Page</p>
                    <p>Reference: ${validatedData.projectRef}</p>
                </div>
            </body>
            </html>
          `
        })
      } catch (emailError) {
        // Email failed but continue
      }
    }
    
    // Send autoresponder to buyer
    if (resend) {
      try {
        await resend.emails.send({
          from: 'SolarFarms.cy <noreply@solarfarms.cy>',
          replyTo: 'lighthiefcyprus@gmail.com',
          to: [validatedData.email],
          subject: `Thank you for your interest in ${validatedData.projectRef}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .header { background: linear-gradient(135deg, #f59e0b 0%, #0ea5e9 100%); color: white; padding: 30px; text-align: center; }
                    .content { padding: 30px; }
                    .cta { background: #f59e0b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>🌞 Thank You for Your Interest</h1>
                    <p>${validatedData.projectRef} - 5MW Solar Park</p>
                </div>
                
                <div class="content">
                    <h2>Dear ${validatedData.name},</h2>
                    
                    <p>Thank you for expressing interest in our ${validatedData.projectRef} solar park listing.</p>
                    
                    <p>Our team will contact you within 24 hours with:</p>
                    <ul>
                        <li><strong>Detailed financial model</strong> with actual production data</li>
                        <li><strong>Due diligence package</strong> including all technical documentation</li>
                        <li><strong>Site visit arrangements</strong> if desired</li>
                        <li><strong>Acquisition terms</strong> and process timeline</li>
                    </ul>
                    
                    <p>For immediate questions, contact Alexander Papacosta directly:</p>
                    <p><strong>WhatsApp:</strong> +357 99 164 158<br>
                    <strong>Email:</strong> lighthiefcyprus@gmail.com</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="https://wa.me/35799164158?text=I inquired about ${validatedData.projectRef}" class="cta">
                            Contact on WhatsApp
                        </a>
                    </div>
                    
                    <p>Best regards,<br>
                    <strong>Alexander Papacosta</strong><br>
                    Business Development Manager<br>
                    Lighthief Cyprus Ltd</p>
                </div>
            </body>
            </html>
          `
        })
      } catch (emailError) {
        // Email failed
      }
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your interest. We will contact you within 24 hours.',
        interestId: savedInterest.id
      },
      { status: 200 }
    )
    
  } catch (error) {
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

