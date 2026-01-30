// Newsletter system for SolarFarms.cy
import { Resend } from 'resend'
import { supabase } from './supabase'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export interface NewsletterSubscriber {
  email: string
  status: 'active' | 'unsubscribed'
}

export interface NewParkNotification {
  parkReference: string
  parkName: string
  sizeMW: number
  price: number
  highlights: string[]
  linkUrl: string
}

export interface NewBlogPostNotification {
  title: string
  excerpt: string
  author: string
  readTime: string
  linkUrl: string
  category: string
}

// Get all active newsletter subscribers
export async function getActiveSubscribers(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('status', 'active')
    
    if (error) throw error
    return data.map(sub => sub.email)
  } catch (error) {
    // Failed to get subscribers - return empty array
    return []
  }
}

// Send new park notification to all subscribers
export async function sendNewParkNotification(park: NewParkNotification) {
  if (!resend) return { success: false, message: 'Email service not configured' }
  
  const subscribers = await getActiveSubscribers()
  if (subscribers.length === 0) return { success: false, message: 'No active subscribers' }
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'SolarFarms.cy <noreply@solarfarms.cy>',
      to: subscribers,
      subject: `New Solar Park Available: ${park.parkName} - €${(park.price / 1000000).toFixed(1)}M`,
      html: getNewParkEmailTemplate(park)
    })
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    return { success: false, error }
  }
}

// Send new blog post notification
export async function sendNewBlogPostNotification(post: NewBlogPostNotification) {
  if (!resend) return { success: false, message: 'Email service not configured' }
  
  const subscribers = await getActiveSubscribers()
  if (subscribers.length === 0) return { success: false, message: 'No active subscribers' }
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'SolarFarms.cy Insights <noreply@solarfarms.cy>',
      to: subscribers,
      subject: `New Article: ${post.title}`,
      html: getNewBlogPostEmailTemplate(post)
    })
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    return { success: false, error }
  }
}

// Email Templates
function getNewParkEmailTemplate(park: NewParkNotification): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>New Solar Park Investment Opportunity</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { 
                background: linear-gradient(135deg, #f59e0b 0%, #0ea5e9 100%); 
                color: white; 
                padding: 40px 20px; 
                text-align: center; 
            }
            .content { padding: 30px 20px; background: #fff; }
            .park-card {
                background: linear-gradient(135deg, #fef3c7 0%, #dbeafe 100%);
                border: 2px solid #f59e0b;
                border-radius: 12px;
                padding: 25px;
                margin: 20px 0;
            }
            .highlight {
                background: #ecfdf5;
                border-left: 4px solid #10b981;
                padding: 15px;
                margin: 15px 0;
            }
            .stats {
                display: flex;
                justify-content: space-around;
                margin: 20px 0;
                flex-wrap: wrap;
            }
            .stat {
                text-align: center;
                padding: 15px;
                min-width: 120px;
            }
            .stat-value {
                font-size: 24px;
                font-weight: bold;
                color: #0ea5e9;
            }
            .stat-label {
                font-size: 12px;
                color: #666;
                margin-top: 5px;
            }
            .cta {
                background: #f59e0b;
                color: white;
                padding: 15px 40px;
                text-decoration: none;
                border-radius: 8px;
                display: inline-block;
                font-weight: bold;
                margin: 20px 0;
            }
            .cta:hover { background: #d97706; }
            .footer {
                background: #f3f4f6;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #666;
            }
            ul { list-style: none; padding: 0; }
            ul li { padding: 8px 0; padding-left: 25px; position: relative; }
            ul li:before {
                content: "✓";
                position: absolute;
                left: 0;
                color: #10b981;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="margin: 0; font-size: 32px;">🏗️ New Solar Park Available</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
                    Exclusive Investment Opportunity - Cyprus
                </p>
            </div>
            
            <div class="content">
                <div class="park-card">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                        <div>
                            <h2 style="margin: 0; color: #1e40af;">${park.parkName}</h2>
                            <p style="margin: 5px 0; color: #666;">Ref: ${park.parkReference}</p>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 28px; font-weight: bold; color: #0ea5e9;">
                                €${(park.price / 1000000).toFixed(1)}M
                            </div>
                            <div style="font-size: 12px; color: #666;">Asking Price</div>
                        </div>
                    </div>
                    
                    <div class="stats">
                        <div class="stat">
                            <div class="stat-value">${park.sizeMW} MW</div>
                            <div class="stat-label">Capacity</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">€${(park.price / park.sizeMW / 1000000).toFixed(2)}M</div>
                            <div class="stat-label">Price per MW</div>
                        </div>
                    </div>
                </div>

                <h3 style="color: #1e40af; margin-top: 30px;">Key Highlights</h3>
                <ul>
                    ${park.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>

                <div class="highlight">
                    <p style="margin: 0; font-weight: bold;">💡 Early Access Advantage</p>
                    <p style="margin: 10px 0 0 0;">
                        As a SolarFarms.cy newsletter subscriber, you're among the first to see this opportunity. 
                        Contact us today to receive the complete due diligence package.
                    </p>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://solarfarms.cy${park.linkUrl}" class="cta">
                        View Complete Project Details →
                    </a>
                </div>

                <p style="color: #666; margin: 20px 0;">
                    <strong>Next Steps:</strong><br>
                    1. Review the complete project listing online<br>
                    2. Use the interactive BESS calculator to model scenarios<br>
                    3. Contact Alexander Papacosta for due diligence materials<br>
                    4. Schedule a consultation or site visit
                </p>

                <div style="background: #f0f9ff; border-radius: 8px; padding: 20px; margin: 20px 0;">
                    <p style="margin: 0; text-align: center;">
                        <strong>Contact Alexander Papacosta</strong><br>
                        Business Development Manager<br>
                        📱 WhatsApp: +357 99 164 158<br>
                        📧 Email: lighthiefcyprus@gmail.com<br>
                        📅 <a href="https://calendly.com/lighthiefcyprus" style="color: #0ea5e9;">Schedule Video Call</a>
                    </p>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>LIGHTHIEF CYPRUS LTD</strong><br>
                28 October Ave 249, Lophitis Business Center 1, Office 201<br>
                3035 Limassol, Cyprus</p>
                
                <p style="margin-top: 15px;">
                    You received this email because you subscribed to SolarFarms.cy newsletter.<br>
                    <a href="https://solarfarms.cy/unsubscribe?email={{email}}" style="color: #666;">Unsubscribe</a> | 
                    <a href="https://solarfarms.cy/preferences?email={{email}}" style="color: #666;">Update Preferences</a>
                </p>
            </div>
        </div>
    </body>
    </html>
  `
}

function getNewBlogPostEmailTemplate(post: NewBlogPostNotification): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>New Article from SolarFarms.cy</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { 
                background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%); 
                color: white; 
                padding: 40px 20px; 
                text-align: center; 
            }
            .content { padding: 30px 20px; background: #fff; }
            .article-card {
                background: #f0f9ff;
                border-radius: 12px;
                padding: 25px;
                margin: 20px 0;
            }
            .category-badge {
                background: #0ea5e9;
                color: white;
                padding: 5px 15px;
                border-radius: 20px;
                font-size: 12px;
                display: inline-block;
                margin-bottom: 15px;
            }
            .cta {
                background: #f59e0b;
                color: white;
                padding: 15px 40px;
                text-decoration: none;
                border-radius: 8px;
                display: inline-block;
                font-weight: bold;
            }
            .footer {
                background: #f3f4f6;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="margin: 0; font-size: 32px;">📰 New Expert Analysis</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
                    Latest insights from Cyprus solar investment experts
                </p>
            </div>
            
            <div class="content">
                <div class="article-card">
                    <span class="category-badge">${post.category}</span>
                    <h2 style="margin: 10px 0; color: #1e40af; font-size: 24px;">${post.title}</h2>
                    
                    <div style="color: #666; font-size: 14px; margin: 10px 0;">
                        By ${post.author} • ${post.readTime}
                    </div>
                    
                    <p style="font-size: 16px; color: #374151; margin: 20px 0;">
                        ${post.excerpt}
                    </p>
                    
                    <div style="text-align: center; margin-top: 25px;">
                        <a href="https://solarfarms.cy${post.linkUrl}" class="cta">
                            Read Full Article →
                        </a>
                    </div>
                </div>

                <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; margin: 25px 0; border-radius: 4px;">
                    <p style="margin: 0; font-weight: bold; color: #065f46;">💡 Expert Insight</p>
                    <p style="margin: 10px 0 0 0; color: #047857;">
                        This article provides actionable insights for solar investors in Cyprus. 
                        Apply these strategies to enhance your investment returns.
                    </p>
                </div>

                <h3 style="color: #1e40af;">Stay Ahead of the Market</h3>
                <p style="color: #666;">
                    Our weekly newsletter delivers:
                </p>
                <ul style="color: #666; list-style: none; padding: 0;">
                    <li style="padding: 8px 0; padding-left: 25px; position: relative;">
                        <span style="position: absolute; left: 0;">📊</span>
                        Market analysis and curtailment trends
                    </li>
                    <li style="padding: 8px 0; padding-left: 25px; position: relative;">
                        <span style="position: absolute; left: 0;">🏗️</span>
                        New project listings and acquisition opportunities
                    </li>
                    <li style="padding: 8px 0; padding-left: 25px; position: relative;">
                        <span style="position: absolute; left: 0;">💰</span>
                        ROI optimization strategies and financing updates
                    </li>
                    <li style="padding: 8px 0; padding-left: 25px; position: relative;">
                        <span style="position: absolute; left: 0;">⚡</span>
                        BESS technology and performance data
                    </li>
                </ul>

                <div style="text-align: center; margin-top: 30px;">
                    <p style="color: #666;">Questions about this article?</p>
                    <a href="https://wa.me/35799164158" style="color: #0ea5e9; text-decoration: none;">
                        💬 Contact Alexander on WhatsApp
                    </a>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>LIGHTHIEF CYPRUS LTD</strong><br>
                Premium Solar Investment Platform<br>
                www.solarfarms.cy</p>
                
                <p style="margin-top: 15px;">
                    You received this because you subscribed to SolarFarms.cy Insights.<br>
                    <a href="https://solarfarms.cy/unsubscribe?email={{email}}" style="color: #666;">Unsubscribe</a> | 
                    <a href="https://solarfarms.cy/preferences?email={{email}}" style="color: #666;">Update Preferences</a>
                </p>
            </div>
        </div>
    </body>
    </html>
  `
}

// Send weekly digest newsletter
export async function sendWeeklyDigest() {
  if (!resend) return { success: false, message: 'Email service not configured' }
  
  const subscribers = await getActiveSubscribers()
  if (subscribers.length === 0) return { success: false, message: 'No active subscribers' }
  
  // Get recent projects and posts from database
  // This would query Supabase for content from the past week
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'SolarFarms.cy Weekly Digest <noreply@solarfarms.cy>',
      to: subscribers,
      subject: `This Week in Cyprus Solar: Market Updates & Investment Opportunities`,
      html: getWeeklyDigestTemplate()
    })
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    return { success: false, error }
  }
}

function getWeeklyDigestTemplate(): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Weekly Solar Investment Digest</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { 
                background: linear-gradient(135deg, #f59e0b 0%, #0ea5e9 100%); 
                color: white; 
                padding: 40px 20px; 
                text-align: center; 
            }
            .content { padding: 30px 20px; background: #fff; }
            .section { margin: 30px 0; }
            .footer {
                background: #f3f4f6;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="margin: 0;">📊 Weekly Solar Digest</h1>
                <p style="margin: 10px 0 0 0;">Cyprus Solar Investment Insights</p>
            </div>
            
            <div class="content">
                <p>Dear Solar Investor,</p>
                
                <p>Here's your weekly roundup of Cyprus solar market developments, new opportunities, and expert insights.</p>
                
                <div class="section">
                    <h3 style="color: #0ea5e9;">This Week's Highlights</h3>
                    <!-- Dynamic content would be inserted here -->
                    <p>Check our latest updates at <a href="https://solarfarms.cy/blog" style="color: #0ea5e9;">solarfarms.cy/blog</a></p>
                </div>
            </div>
            
            <div class="footer">
                <p>LIGHTHIEF CYPRUS LTD | www.solarfarms.cy</p>
                <p><a href="https://solarfarms.cy/unsubscribe?email={{email}}">Unsubscribe</a></p>
            </div>
        </div>
    </body>
    </html>
  `
}

