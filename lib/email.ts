import { Resend } from 'resend'
import { COMPANY_DATA } from './constants'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactEmailData {
  name: string
  email: string
  phone?: string
  company?: string
  investmentSize: string
  timeline: string
  message?: string
}

interface NewsletterEmailData {
  email: string
  source?: string
}

export async function sendContactNotification(data: ContactEmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping email notification')
    return { success: false, message: 'Email service not configured' }
  }

  try {
    const { data: emailResult, error } = await resend.emails.send({
      from: 'SolarFarms.cy <noreply@solarfarms.cy>',
      to: [COMPANY_DATA.email, COMPANY_DATA.contacts.businessDevelopment.email],
      cc: [COMPANY_DATA.contacts.investors.email],
      subject: `New Solar Investment Inquiry - ${data.investmentSize}`,
      html: getContactNotificationTemplate(data),
    })

    if (error) {
      console.error('Email notification error:', error)
      return { success: false, error }
    }

    return { success: true, data: emailResult }
  } catch (error) {
    console.error('Email service error:', error)
    return { success: false, error }
  }
}

export async function sendContactAutoresponder(data: ContactEmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping autoresponder')
    return { success: false, message: 'Email service not configured' }
  }

  try {
    const { data: emailResult, error } = await resend.emails.send({
      from: 'Alexander Papacosta <alexander.papacosta@lighthief.com>',
      to: [data.email],
      subject: 'Thank you for your interest in Cyprus Solar Investments',
      html: getContactAutoresponderTemplate(data),
    })

    if (error) {
      console.error('Autoresponder error:', error)
      return { success: false, error }
    }

    return { success: true, data: emailResult }
  } catch (error) {
    console.error('Autoresponder service error:', error)
    return { success: false, error }
  }
}

export async function sendNewsletterWelcome(data: NewsletterEmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping newsletter welcome')
    return { success: false, message: 'Email service not configured' }
  }

  try {
    const { data: emailResult, error } = await resend.emails.send({
      from: 'SolarFarms.cy <insights@solarfarms.cy>',
      to: [data.email],
      subject: 'Welcome to SolarFarms.cy - Your Solar Investment Journey Begins',
      html: getNewsletterWelcomeTemplate(data),
    })

    if (error) {
      console.error('Newsletter welcome error:', error)
      return { success: false, error }
    }

    return { success: true, data: emailResult }
  } catch (error) {
    console.error('Newsletter service error:', error)
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
            Business Development: alexander.papacosta@lighthief.com | +357 99 164 158<br>
            Investor Relations: a.sybaris@lighthief.com | +357 95 152 788</p>
            
            <p>Company Registration: HE 477423 | TIN: 60187188Q<br>
            Website: https://solarfarms.cy</p>
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
            <a href="#">Unsubscribe</a> | <a href="#">Update Preferences</a></small></p>
        </div>
    </body>
    </html>
  `
}
