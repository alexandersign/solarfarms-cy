import { Resend } from 'resend'
import { COMPANY_DATA } from './constants'

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Generic email sending function
interface SendEmailOptions {
  to: string
  subject: string
  html: string
  from?: string
  replyTo?: string
}

export async function sendEmail(options: SendEmailOptions) {
  if (!process.env.RESEND_API_KEY || !resend) {
    return { success: false, message: 'Email service not configured' }
  }

  try {
    await resend.emails.send({
      from: options.from || `SolarFarms.cy <noreply@solarfarms.cy>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo || COMPANY_DATA.contacts.businessDevelopment.email,
    })
    return { success: true }
  } catch (error) {
    return { success: false, message: 'Failed to send email', error }
  }
}

interface ContactEmailData {
  name: string
  email: string
  phone?: string
  company?: string
  investmentSize: string
  timeline: string
  message?: string
  attachedFiles?: string[]
}

interface NewsletterEmailData {
  email: string
  source?: string
}

export async function sendContactNotification(data: ContactEmailData) {
  if (!process.env.RESEND_API_KEY || !resend) {
    return { success: false, message: 'Email service not configured' }
  }

  try {
    // Attempting to send notification to team
    
    const { data: emailResult, error } = await resend.emails.send({
      from: 'SolarFarms.cy <noreply@solarfarms.cy>',
      replyTo: 'lighthiefcyprus@gmail.com',
      to: [
        'lighthiefcyprus@gmail.com'
      ],
      subject: `NEW LEAD NOTIFICATION - ${data.investmentSize}`,
      html: getContactNotificationTemplate(data),
    })

    if (error) {
      return { success: false, error, message: 'Failed to send team notification' }
    }

    return { success: true, data: emailResult }
  } catch (error) {
    return { success: false, error, message: 'Email service error' }
  }
}

export async function sendContactAutoresponder(data: ContactEmailData) {
  if (!process.env.RESEND_API_KEY || !resend) {
    // Email service not configured('RESEND_API_KEY not configured, skipping autoresponder')
    return { success: false, message: 'Email service not configured' }
  }

  try {
    const { data: emailResult, error } = await resend.emails.send({
      from: 'SolarFarms.cy <noreply@solarfarms.cy>',
      replyTo: 'lighthiefcyprus@gmail.com',
      to: [data.email], // Send autoresponder to customer email
      subject: 'Thank you for your interest in Cyprus Solar Investments',
      html: getContactAutoresponderTemplate(data),
    })

    if (error) {
      return { success: false, error, message: 'Failed to send autoresponder' }
    }

    return { success: true, data: emailResult }
  } catch (error) {
    return { success: false, error, message: 'Autoresponder service error' }
  }
}

export async function sendNewsletterWelcome(data: NewsletterEmailData) {
  if (!process.env.RESEND_API_KEY || !resend) {
    // Email service not configured('RESEND_API_KEY not configured, skipping newsletter welcome')
    return { success: false, message: 'Email service not configured' }
  }

  try {
    const { data: emailResult, error } = await resend.emails.send({
      from: 'SolarFarms.cy <noreply@solarfarms.cy>',
      replyTo: 'lighthiefcyprus@gmail.com',
      to: [data.email],
      subject: 'Welcome to SolarFarms.cy - Your Solar Investment Journey Begins',
      html: getNewsletterWelcomeTemplate(data),
    })

    if (error) {
      // Newsletter welcome error
      return { success: false, error }
    }

    return { success: true, data: emailResult }
  } catch (error) {
    // Newsletter service error
    return { success: false, error }
  }
}

function getContactNotificationTemplate(data: ContactEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>New Solar Investment Inquiry</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #f59e0b 0%, #0ea5e9 100%); color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .highlight { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .footer { background: #f3f4f6; padding: 15px; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🌞 New Solar Investment Inquiry</h1>
            <p>SolarFarms.cy Lead Notification</p>
        </div>
        
        <div class="content">
            <h2>Contact Details</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
            <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
            
            <div class="highlight">
                <h3>Investment Interest</h3>
                <p><strong>Investment Size:</strong> ${data.investmentSize}</p>
                <p><strong>Timeline:</strong> ${data.timeline}</p>
            </div>
            
            ${data.message ? `
            <h3>Additional Message</h3>
            <p>${data.message}</p>
            ` : ''}
            
            ${data.attachedFiles && data.attachedFiles.length > 0 ? `
            <h3>Attached Files</h3>
            <ul>
            ${data.attachedFiles.map(file => `<li><a href="${file}" target="_blank" style="color: #0ea5e9;">View Document</a></li>`).join('')}
            </ul>
            ` : ''}
            
            <h3>Next Steps</h3>
            <ul>
                <li>Contact within 24 hours</li>
                <li>Prepare customized investment proposal</li>
                <li>Schedule consultation or site visit</li>
                <li>Provide detailed financial projections</li>
            </ul>
        </div>
        
        <div class="footer">
            <p>Submitted: ${new Date().toLocaleString()}</p>
            <p>Source: SolarFarms.cy Contact Form</p>
        </div>
    </body>
    </html>
  `
}

function getContactAutoresponderTemplate(data: ContactEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Thank you for your interest in Cyprus Solar Investments</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #f59e0b 0%, #0ea5e9 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .highlight { background: #ecfdf5; border: 1px solid #10b981; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .cta { background: #f59e0b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 5px; }
            .footer { background: #f3f4f6; padding: 20px; font-size: 14px; color: #666; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🌞 Welcome to SolarFarms.cy</h1>
            <p>Premium Cyprus Solar Farm Investments</p>
        </div>
        
        <div class="content">
            <h2>Dear ${data.name},</h2>
            
            <p>Thank you for your interest in Cyprus solar farm investments. We have received your inquiry and will prepare a customized investment proposal based on your requirements.</p>
            
            <div class="highlight">
                <h3>Your Investment Profile</h3>
                <p><strong>Investment Size:</strong> ${data.investmentSize}</p>
                <p><strong>Timeline:</strong> ${data.timeline}</p>
                <p><strong>Next Step:</strong> Our team will contact you within 24 hours</p>
            </div>
            
            <h3>What to Expect</h3>
            <p>Our team will contact you to discuss:</p>
            <ul>
                <li><strong>Available projects</strong> matching your investment criteria</li>
                <li><strong>Detailed financial projections</strong> and ROI analysis</li>
                <li><strong>Site visit opportunities</strong> to see projects firsthand</li>
                <li><strong>Investment process</strong> and required documentation</li>
                <li><strong>Financing options</strong> including bank partnerships</li>
            </ul>
            
            <h3>Helpful Resources</h3>
            <p>While you wait, explore these valuable resources:</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://solarfarms.cy/calculator" class="cta">ROI Calculator</a>
                <a href="https://solarfarms.cy/projects" class="cta">Project Portfolio</a>
                <a href="https://solarfarms.cy/resources" class="cta">Investment Guides</a>
            </div>
            
            <p>Best regards,<br>
            <strong>Alexander Papacosta</strong><br>
            Business Development Manager<br>
            Lighthief Cyprus Ltd</p>
        </div>
        
        <div class="footer">
            <p><strong>LIGHTHIEF CYPRUS LTD</strong></p>
            <p>28 October Ave 249, Lophitis Business Center 1, Office 201<br>
            3035 Limassol, Cyprus</p>
            
            <p><strong>Contact Information:</strong><br>
            General: office@lighthief.com | +357 77 77 00 50<br>
            Business Development: Alexander Papacosta - alexander.papacosta@lighthief.com | +357 99 164 158<br>
            Investor Relations: Akradiusz Sybaris - a.sybaris@lighthief.com | +357 95 152 788</p>
            
            <p>Company Registration: HE 477423 | TIN: 60187188Q<br>
            Website: https://solarfarms.cy</p>
        </div>
    </body>
    </html>
  `
}

// Land Assessment Notification Email
interface LandAssessmentEmailData {
  ownerName: string
  email: string
  phone?: string
  plotSize: string
  location: string
  currentUse?: string
  titleDeedUrl?: string | null
  assessment?: any
  dlsData?: {
    zoning?: {
      zoneCode: string
      zoneName: string
      isViable: boolean
      status: 'GO' | 'NO_GO' | 'RESTRICTED' | 'REVIEW_NEEDED'
      reason: string
      restrictions: string[]
    }
    viable?: boolean
    bestOption?: 'SOUTH' | 'EAST_WEST' | 'NONE'
    southFacing?: {
      capacityMW: number
      capacityKWp: number
      panelCount: number
      annualProductionMWh: number
      annualRevenueEUR: number
    }
    eastWest?: {
      capacityMW: number
      capacityKWp: number
      panelCount: number
      annualProductionMWh: number
      annualRevenueEUR: number
    }
  }
}

export async function sendLandAssessmentNotification(data: LandAssessmentEmailData) {
  if (!process.env.RESEND_API_KEY || !resend) {
    return { success: false, message: 'Email service not configured' }
  }

  try {
    const { data: emailResult, error } = await resend.emails.send({
      from: 'SolarFarms.cy <noreply@solarfarms.cy>',
      replyTo: 'a.sybaris@lighthief.com',
      to: [
        'a.sybaris@lighthief.com',
        'lighthiefcyprus@gmail.com'
      ],
      subject: `🌍 NEW LAND ASSESSMENT - ${data.location} - ${data.plotSize}`,
      html: getLandAssessmentNotificationTemplate(data),
    })

    if (error) {
      return { success: false, error, message: 'Failed to send land assessment notification' }
    }

    return { success: true, data: emailResult }
  } catch (error) {
    return { success: false, error, message: 'Email service error' }
  }
}

export async function sendLandAssessmentAutoresponder(data: LandAssessmentEmailData) {
  if (!process.env.RESEND_API_KEY || !resend) {
    return { success: false, message: 'Email service not configured' }
  }

  try {
    const { data: emailResult, error } = await resend.emails.send({
      from: 'SolarFarms.cy <noreply@solarfarms.cy>',
      replyTo: 'a.sybaris@lighthief.com',
      to: [data.email],
      subject: 'Your Land Assessment Results - SolarFarms.cy',
      html: getLandAssessmentAutoresponderTemplate(data),
    })

    if (error) {
      return { success: false, error, message: 'Failed to send autoresponder' }
    }

    return { success: true, data: emailResult }
  } catch (error) {
    return { success: false, error, message: 'Autoresponder service error' }
  }
}

function getLandAssessmentNotificationTemplate(data: LandAssessmentEmailData): string {
  // Determine zone status styling
  const zoneStatus = data.dlsData?.zoning?.status || 'REVIEW_NEEDED'
  const zoneColor = zoneStatus === 'GO' ? '#10b981' : 
                    zoneStatus === 'NO_GO' ? '#ef4444' : 
                    zoneStatus === 'RESTRICTED' ? '#f59e0b' : '#3b82f6'
  const zoneEmoji = zoneStatus === 'GO' ? '✅' : 
                    zoneStatus === 'NO_GO' ? '❌' : 
                    zoneStatus === 'RESTRICTED' ? '⚠️' : '❓'
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>New Land Assessment Submission</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #10b981 0%, #0ea5e9 100%); color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .highlight { background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #10b981; }
            .assessment { background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .file-link { background: #fef3c7; padding: 10px 15px; border-radius: 6px; margin: 10px 0; display: inline-block; }
            .file-link a { color: #92400e; text-decoration: none; font-weight: bold; }
            .footer { background: #f3f4f6; padding: 15px; font-size: 12px; color: #666; }
            .capacity-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            .capacity-table th, .capacity-table td { padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb; }
            .capacity-table th { background: #f3f4f6; }
            .zone-box { padding: 15px; border-radius: 8px; margin: 15px 0; border: 2px solid; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🌍 NEW LAND INQUIRY - ${data.dlsData?.viable ? 'VIABLE' : 'REVIEW NEEDED'}</h1>
            <p>SolarFarms.cy - DLS Data Assessment</p>
        </div>
        
        <div class="content">
            <!-- Zone Status Alert -->
            <div class="zone-box" style="border-color: ${zoneColor}; background: ${zoneColor}15;">
                <h3 style="color: ${zoneColor}; margin: 0 0 10px 0;">${zoneEmoji} ZONE STATUS: ${zoneStatus}</h3>
                <p style="margin: 0;"><strong>Zone Code:</strong> ${data.dlsData?.zoning?.zoneCode || 'Unknown'}</p>
                <p style="margin: 5px 0 0 0;">${data.dlsData?.zoning?.reason || 'Manual verification required'}</p>
                ${data.dlsData?.zoning?.restrictions?.length ? `
                <ul style="margin: 10px 0 0 0; padding-left: 20px; font-size: 14px;">
                    ${data.dlsData.zoning.restrictions.map((r: string) => `<li>${r}</li>`).join('')}
                </ul>
                ` : ''}
            </div>
            
            <h2>Landowner Details</h2>
            <p><strong>Name:</strong> ${data.ownerName}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Phone:</strong> ${data.phone ? `<a href="tel:${data.phone}">${data.phone}</a>` : 'Not provided'}</p>
            
            <div class="highlight">
                <h3>Property Information</h3>
                <p><strong>Location:</strong> ${data.location}</p>
                <p><strong>Plot Size:</strong> ${data.plotSize}</p>
                <p><strong>Current Use:</strong> ${data.currentUse || 'Not specified'}</p>
            </div>
            
            ${data.titleDeedUrl ? `
            <div class="file-link">
                📄 <a href="${data.titleDeedUrl}" target="_blank">VIEW UPLOADED TITLE DEED / PLOT MAP</a>
            </div>
            ` : '<p><em>No title deed uploaded - request from landowner</em></p>'}
            
            <!-- Capacity Comparison Table -->
            ${data.dlsData?.southFacing && data.dlsData?.eastWest ? `
            <h3>⚡ Capacity Comparison (DLS Calculated)</h3>
            <table class="capacity-table">
                <tr>
                    <th>Metric</th>
                    <th>South-Facing (4m pitch)</th>
                    <th>East-West (1m pitch)</th>
                </tr>
                <tr>
                    <td><strong>Capacity</strong></td>
                    <td>${data.dlsData.southFacing.capacityMW.toFixed(2)} MW (${data.dlsData.southFacing.capacityKWp.toLocaleString()} kWp)</td>
                    <td>${data.dlsData.eastWest.capacityMW.toFixed(2)} MW (${data.dlsData.eastWest.capacityKWp.toLocaleString()} kWp)</td>
                </tr>
                <tr>
                    <td><strong>Panel Count</strong></td>
                    <td>${data.dlsData.southFacing.panelCount.toLocaleString()} panels</td>
                    <td>${data.dlsData.eastWest.panelCount.toLocaleString()} panels</td>
                </tr>
                <tr>
                    <td><strong>Annual Production</strong></td>
                    <td>${data.dlsData.southFacing.annualProductionMWh.toLocaleString()} MWh</td>
                    <td>${data.dlsData.eastWest.annualProductionMWh.toLocaleString()} MWh</td>
                </tr>
                <tr style="background: #ecfdf5;">
                    <td><strong>Annual Revenue @€0.16/kWh</strong></td>
                    <td style="color: #059669; font-weight: bold;">€${data.dlsData.southFacing.annualRevenueEUR.toLocaleString()}</td>
                    <td style="color: #059669; font-weight: bold;">€${data.dlsData.eastWest.annualRevenueEUR.toLocaleString()}</td>
                </tr>
            </table>
            <p style="background: #dbeafe; padding: 10px; border-radius: 6px;">
                <strong>📊 Recommended:</strong> ${data.dlsData.bestOption === 'EAST_WEST' ? 'East-West' : 'South-Facing'} orientation
            </p>
            ` : ''}
            
            ${data.assessment ? `
            <div class="assessment">
                <h3>💰 Financial Estimates</h3>
                <p><strong>Estimated RTB Value:</strong> ${data.assessment.financialProjections?.rtbValue || 'Pending'}</p>
                <p><strong>Annual Lease Value (8%):</strong> ${data.assessment.landOwnerOptions?.annualLease || 'Pending'}</p>
                <p><strong>Land Sale Premium:</strong> ${data.assessment.landOwnerOptions?.landSale || 'Pending'}</p>
                <p><strong>Development Timeline:</strong> ${data.assessment.financialProjections?.developmentTimeline || '12-18 months'}</p>
            </div>
            ` : ''}
            
            <h3>Action Items</h3>
            <ul>
                <li>☐ ${data.dlsData?.viable ? 'High priority - contact within 24h' : 'Review zone restrictions first'}</li>
                <li>☐ Review uploaded title deed (if available)</li>
                <li>☐ Verify zone in Cyprus Land Registry portal</li>
                <li>☐ Check grid connection proximity</li>
                <li>☐ Schedule site visit if promising</li>
            </ul>
        </div>
        
        <div class="footer">
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Source:</strong> SolarFarms.cy DLS-Integrated Assessment Tool</p>
            <p><strong>Priority:</strong> ${data.dlsData?.viable ? '🟢 HIGH - Viable Land' : '🟡 MEDIUM - Needs Review'}</p>
        </div>
    </body>
    </html>
  `
}

function getLandAssessmentAutoresponderTemplate(data: LandAssessmentEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Your Land Assessment Results</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #10b981 0%, #0ea5e9 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .highlight { background: #ecfdf5; border: 1px solid #10b981; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .options { display: flex; gap: 20px; margin: 20px 0; }
            .option { flex: 1; background: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; }
            .cta { background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 5px; }
            .footer { background: #f3f4f6; padding: 20px; font-size: 14px; color: #666; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🌞 Your Land Assessment Results</h1>
            <p>SolarFarms.cy - Professional Land Evaluation</p>
        </div>
        
        <div class="content">
            <h2>Dear ${data.ownerName},</h2>
            
            <p>Thank you for submitting your land for solar development assessment. Based on our preliminary analysis, here are the results for your property in <strong>${data.location}</strong>.</p>
            
            ${data.assessment ? `
            <div class="highlight">
                <h3>Assessment Summary</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px 0;"><strong>Plot Size:</strong></td>
                        <td>${data.assessment.plotAnalysis?.size || data.plotSize}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0;"><strong>Zone Status:</strong></td>
                        <td>${data.assessment.plotAnalysis?.zoning || 'Pending verification'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0;"><strong>Recommended Capacity:</strong></td>
                        <td style="color: #059669; font-weight: bold;">${data.assessment.plotAnalysis?.capacity || 'To be determined'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0;"><strong>Annual Production:</strong></td>
                        <td style="color: #059669; font-weight: bold;">${data.assessment.annualProduction?.MWh || 'TBD'} MWh/year</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0;"><strong>Annual Revenue Estimate:</strong></td>
                        <td style="color: #059669; font-weight: bold;">${data.assessment.annualProduction?.revenue || 'To be determined'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0;"><strong>Estimated RTB Value:</strong></td>
                        <td style="color: #059669; font-weight: bold;">${data.assessment.financialProjections?.rtbValue || 'To be determined'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0;"><strong>Development Timeline:</strong></td>
                        <td>${data.assessment.financialProjections?.developmentTimeline || '12-24 months'}</td>
                    </tr>
                </table>
                ${data.assessment.capacityComparison ? `
                <p style="margin-top: 15px; font-size: 14px; color: #666;">
                    <strong>Capacity Options:</strong> 
                    South-facing (${data.assessment.capacityComparison.southFacing?.capacityMW || 0} MW) vs 
                    East-West (${data.assessment.capacityComparison.eastWest?.capacityMW || 0} MW)
                </p>
                ` : ''}
            </div>
            
            <h3>Your Revenue Options</h3>
            <div class="options">
                <div class="option">
                    <h4 style="color: #059669;">Option 1: Land Lease</h4>
                    <p style="font-size: 18px; font-weight: bold; color: #059669;">${data.assessment.landOwnerOptions?.annualLease || 'Contact us for details'}</p>
                    <ul style="font-size: 14px; color: #666;">
                        <li>Keep land ownership</li>
                        <li>25+ years guaranteed income</li>
                        <li>No development risk</li>
                    </ul>
                </div>
                <div class="option">
                    <h4 style="color: #0ea5e9;">Option 2: Land Sale</h4>
                    <p style="font-size: 18px; font-weight: bold; color: #0ea5e9;">${data.assessment.landOwnerOptions?.landSale || 'Contact us for details'}</p>
                    <ul style="font-size: 14px; color: #666;">
                        <li>Immediate lump sum</li>
                        <li>Premium for solar-ready land</li>
                        <li>Capital for other investments</li>
                    </ul>
                </div>
            </div>
            ` : `
            <div class="highlight">
                <h3>Assessment in Progress</h3>
                <p>Our team is reviewing your submission and will provide detailed results within 24-48 hours.</p>
            </div>
            `}
            
            <h3>Next Steps</h3>
            <p>Our land development specialist <strong>Arkadius Sybaris</strong> will contact you within 24 hours to discuss:</p>
            <ul>
                <li>Detailed site survey and feasibility study</li>
                <li>Zoning and permit requirements</li>
                <li>Grid connection analysis</li>
                <li>Financial structuring options</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://solarfarms.cy/contact" class="cta">Schedule Call with Specialist</a>
            </div>
            
            <p>Best regards,<br>
            <strong>Arkadius Sybaris</strong><br>
            Land Development Manager<br>
            Lighthief Cyprus Ltd<br>
            +357 95 152 788</p>
        </div>
        
        <div class="footer">
            <p><strong>LIGHTHIEF CYPRUS LTD</strong></p>
            <p>28 October Ave 249, Lophitis Business Center 1, Office 201<br>
            3035 Limassol, Cyprus</p>
            
            <p>Land Development: a.sybaris@lighthief.com | +357 95 152 788<br>
            General: office@lighthief.com | +357 77 77 00 50</p>
        </div>
    </body>
    </html>
  `
}

function getNewsletterWelcomeTemplate(data: NewsletterEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Welcome to SolarFarms.cy Newsletter</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #f59e0b 0%, #0ea5e9 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .benefit { background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 10px 0; }
            .cta { background: #f59e0b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 5px; }
            .footer { background: #f3f4f6; padding: 20px; font-size: 14px; color: #666; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🌞 Welcome to SolarFarms.cy!</h1>
            <p>Your Solar Investment Journey Begins</p>
        </div>
        
        <div class="content">
            <h2>Thank you for subscribing!</h2>
            
            <p>You'll now receive exclusive insights and opportunities from Cyprus's leading solar investment platform.</p>
            
            <h3>What You'll Receive:</h3>
            
            <div class="benefit">
                <strong>📊 Weekly Market Analysis</strong><br>
                Expert insights on Cyprus solar market trends and investment opportunities
            </div>
            
            <div class="benefit">
                <strong>📈 Exclusive ROI Data</strong><br>
                Real performance data from our solar farm portfolio
            </div>
            
            <div class="benefit">
                <strong>📋 Early Project Access</strong><br>
                First notification of new ready-to-build projects
            </div>
            
            <div class="benefit">
                <strong>🎯 Investment Education</strong><br>
                Guides, calculators, and strategies to maximize returns
            </div>
            
            <h3>Get Started Today</h3>
            <p>Explore our platform and discover why investors choose Cyprus for premium solar returns:</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://solarfarms.cy/calculator" class="cta">Calculate Your ROI</a>
                <a href="https://solarfarms.cy/resources" class="cta">Download Investment Guide</a>
                <a href="https://solarfarms.cy/contact" class="cta">Schedule Consultation</a>
            </div>
            
            <p>Questions? Reply to this email or contact our team directly.</p>
            
            <p>Best regards,<br>
            The SolarFarms.cy Team</p>
        </div>
        
        <div class="footer">
            <p><strong>LIGHTHIEF CYPRUS LTD</strong><br>
            28 October Ave 249, Lophitis Business Center 1, Office 201<br>
            3035 Limassol, Cyprus</p>
            
            <p>office@lighthief.com | +357 77 77 00 50<br>
            https://solarfarms.cy</p>
            
            <p><small>You received this email because you subscribed to SolarFarms.cy newsletter. 
            <a href="https://solarfarms.cy/unsubscribe">Unsubscribe</a> | <a href="https://solarfarms.cy/preferences">Update Preferences</a></small></p>
        </div>
    </body>
    </html>
  `
}
