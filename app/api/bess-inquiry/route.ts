import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { sendEmail, getContactAutoresponderTemplate } from '@/lib/email'
import { COMPANY_DATA } from '@/lib/constants'

const bessInquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  parkSize: z.string().min(1, 'Please select park size'),
  curtailmentRate: z.string().optional(),
  parkStatus: z.string().min(1, 'Please select park status'),
  location: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = bessInquirySchema.parse(body)

    // Save to contacts table with BESS inquiry tag
    const { error: dbError } = await supabase.from('contacts').insert({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone ?? undefined,
      company: validatedData.company ?? undefined,
      investment_size: validatedData.parkSize,
      message: `BESS INQUIRY
Park Size: ${validatedData.parkSize}
Curtailment Rate: ${validatedData.curtailmentRate || 'Not specified'}
Park Status: ${validatedData.parkStatus}
Location: ${validatedData.location || 'Not specified'}
Timeline: ${validatedData.timeline || 'Not specified'}

Additional Info:
${validatedData.message || 'None provided'}`,
      source: 'bess-inquiry-form',
      timeline: validatedData.timeline ?? undefined,
    })

    if (dbError) {
      console.error('Database error:', dbError)
    }

    // Send team notification
    const teamNotificationHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e40af, #0369a1); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
    .section { margin-bottom: 20px; }
    .label { font-weight: bold; color: #1e40af; }
    .value { margin-left: 10px; }
    .highlight { background: #dbeafe; padding: 15px; border-radius: 8px; margin: 15px 0; }
    .footer { background: #1e293b; color: #94a3b8; padding: 15px; font-size: 12px; text-align: center; border-radius: 0 0 8px 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">🔋 New BESS Inquiry</h1>
      <p style="margin: 5px 0 0 0; opacity: 0.9;">Battery Storage Interest from Solar Park Owner</p>
    </div>
    <div class="content">
      <div class="highlight">
        <h3 style="margin-top: 0; color: #1e40af;">Priority Lead - BESS Opportunity</h3>
        <p style="margin-bottom: 0;"><strong>${validatedData.parkSize}</strong> solar park interested in battery storage</p>
      </div>
      
      <div class="section">
        <h3>Contact Information</h3>
        <p><span class="label">Name:</span><span class="value">${validatedData.name}</span></p>
        <p><span class="label">Email:</span><span class="value">${validatedData.email}</span></p>
        <p><span class="label">Phone:</span><span class="value">${validatedData.phone || 'Not provided'}</span></p>
        <p><span class="label">Company:</span><span class="value">${validatedData.company || 'Not provided'}</span></p>
      </div>
      
      <div class="section">
        <h3>🔌 Park Details</h3>
        <p><span class="label">Park Size:</span><span class="value">${validatedData.parkSize}</span></p>
        <p><span class="label">Current Curtailment:</span><span class="value">${validatedData.curtailmentRate || 'Not specified'}</span></p>
        <p><span class="label">Park Status:</span><span class="value">${validatedData.parkStatus}</span></p>
        <p><span class="label">Location:</span><span class="value">${validatedData.location || 'Not specified'}</span></p>
        <p><span class="label">Timeline:</span><span class="value">${validatedData.timeline || 'Not specified'}</span></p>
      </div>
      
      ${validatedData.message ? `
      <div class="section">
        <h3>Additional Information</h3>
        <p>${validatedData.message}</p>
      </div>
      ` : ''}
      
      <div class="highlight" style="background: #dcfce7;">
        <h4 style="margin-top: 0; color: #166534;">Recommended Actions:</h4>
        <ol style="margin-bottom: 0; padding-left: 20px;">
          <li>Respond within 24 hours with preliminary BESS sizing</li>
          <li>Request production data if available</li>
          <li>Schedule site assessment call</li>
          <li>Prepare Linyang pricing proposal</li>
        </ol>
      </div>
    </div>
    <div class="footer">
      <p>BESS Inquiry received via SolarFarms.cy Energy Storage page</p>
      <p>Lighthief Cyprus Ltd - Official Linyang ESS Distributor</p>
    </div>
  </div>
</body>
</html>
`

    await sendEmail({
      to: COMPANY_DATA.email,
      subject: `🔋 BESS Inquiry: ${validatedData.parkSize} Park - ${validatedData.name}`,
      html: teamNotificationHtml,
    })

    // Send autoresponder to customer
    const customerHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e40af, #0369a1); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
    .content { background: white; padding: 30px; border: 1px solid #e2e8f0; }
    .highlight { background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .footer { background: #1e293b; color: #94a3b8; padding: 20px; font-size: 12px; text-align: center; border-radius: 0 0 8px 8px; }
    .btn { display: inline-block; background: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">Thank You for Your BESS Inquiry</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">We've received your battery storage inquiry</p>
    </div>
    <div class="content">
      <p>Dear ${validatedData.name},</p>
      
      <p>Thank you for your interest in battery energy storage solutions for your ${validatedData.parkSize} solar park. 
      As the official Linyang ESS distributor in Cyprus, we're well-positioned to help you maximize your 
      solar investment through intelligent energy storage.</p>
      
      <div class="highlight">
        <h3 style="margin-top: 0; color: #1e40af;">What Happens Next?</h3>
        <ol>
          <li><strong>Technical Review (24-48 hours)</strong> - We'll analyze your park details and curtailment situation</li>
          <li><strong>Preliminary Proposal</strong> - You'll receive initial BESS sizing recommendations</li>
          <li><strong>Discovery Call</strong> - We'll schedule a call to discuss your specific needs</li>
          <li><strong>Detailed ROI Analysis</strong> - Custom financial modeling for your project</li>
        </ol>
      </div>
      
      <h3>Why Linyang BESS?</h3>
      <ul>
        <li>✓ 88.39% round-trip efficiency (LFP technology)</li>
        <li>✓ 15-year performance warranty</li>
        <li>✓ Competitive pricing from €100k/MWh for large systems</li>
        <li>✓ Local O&M support from Lighthief Cyprus</li>
      </ul>
      
      <p>If you have production data or curtailment reports available, please reply to this email 
      with any documents you can share - this will help us prepare a more accurate proposal.</p>
      
      <p style="margin-top: 30px;">
        <a href="https://solarfarms.cy/projects/anarita-10mw" class="btn">View BESS Case Study</a>
      </p>
      
      <p style="margin-top: 30px;">Best regards,</p>
      <p><strong>The Lighthief BESS Team</strong><br>
      ${COMPANY_DATA.contacts.businessDevelopment.name}<br>
      ${COMPANY_DATA.contacts.businessDevelopment.phone}<br>
      ${COMPANY_DATA.contacts.businessDevelopment.email}</p>
    </div>
    <div class="footer">
      <p>Lighthief Cyprus Ltd - Official Linyang Energy Storage Distributor</p>
      <p>${COMPANY_DATA.address.office.full}</p>
    </div>
  </div>
</body>
</html>
`

    await sendEmail({
      to: validatedData.email,
      subject: 'BESS Inquiry Received - Lighthief Cyprus',
      html: customerHtml,
    })

    return NextResponse.json({
      success: true,
      message: 'BESS inquiry submitted successfully',
    })
  } catch (error) {
    console.error('BESS inquiry error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Failed to submit inquiry' },
      { status: 500 }
    )
  }
}
