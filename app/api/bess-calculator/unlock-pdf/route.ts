import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Schema for PDF unlock
const unlockSchema = z.object({
  email: z.string().email('Valid email required'),
  scenarioId: z.string().uuid().optional(),
  projectName: z.string().optional(),
  bessCapacity: z.number().optional(),
  mode: z.enum(['standalone', 'solar_bess']).optional(),
})

/**
 * POST /api/bess-calculator/unlock-pdf
 * Capture email and unlock PDF download
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = unlockSchema.parse(body)
    
    // Record the unlock
    const { error: unlockError } = await supabase
      .from('bess_pdf_unlocks')
      .insert({
        email: validated.email,
        scenario_id: validated.scenarioId || null,
        source: 'bess-calculator',
      })
    
    if (unlockError) {
      // Ignore errors (e.g., duplicates, table not exists)
      // Non-critical for PDF unlock flow
    }
    
    // Also add to newsletter subscribers (opt-in to BESS updates)
    const { error: subError } = await supabase
      .from('newsletter_subscribers')
      .upsert({
        email: validated.email,
        source: 'bess-calculator-pdf',
        status: 'active',
        preferences: {
          bess_updates: true,
          project_alerts: true,
        },
      }, {
        onConflict: 'email',
        ignoreDuplicates: true,
      })
    
    if (subError) {
      // Non-critical, continue
    }
    
    // Send email notification to team
    if (resend) {
      try {
        await resend.emails.send({
          from: 'SolarFarms.cy <noreply@solarfarms.cy>',
          to: ['alexander.papacosta@lighthief.com'],
          subject: `BESS Calculator Lead - ${validated.email}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .header { background: linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%); color: white; padding: 20px; }
                .content { padding: 20px; }
                .highlight { background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>🔋 New BESS Calculator Lead</h1>
              </div>
              <div class="content">
                <div class="highlight">
                  <p><strong>Email:</strong> ${validated.email}</p>
                  ${validated.projectName ? `<p><strong>Project:</strong> ${validated.projectName}</p>` : ''}
                  ${validated.bessCapacity ? `<p><strong>BESS Capacity:</strong> ${validated.bessCapacity} MWh</p>` : ''}
                  ${validated.mode ? `<p><strong>Mode:</strong> ${validated.mode === 'solar_bess' ? 'Solar + BESS' : 'Standalone BESS'}</p>` : ''}
                </div>
                <p>This lead downloaded a BESS financial analysis PDF from the calculator.</p>
                <p>Consider following up with a personalized proposal.</p>
              </div>
            </body>
            </html>
          `
        })
      } catch (emailError) {
        // Non-critical
      }
    }
    
    // Send autoresponder to user
    if (resend) {
      try {
        await resend.emails.send({
          from: 'SolarFarms.cy <noreply@solarfarms.cy>',
          replyTo: 'alexander.papacosta@lighthief.com',
          to: [validated.email],
          subject: 'Your BESS Investment Analysis | SolarFarms.cy',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .header { background: linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%); color: white; padding: 30px; text-align: center; }
                .content { padding: 30px; }
                .cta { background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>🔋 Your BESS Analysis</h1>
              </div>
              <div class="content">
                <p>Thank you for using our BESS Finance Calculator!</p>
                
                <p>Your analysis is ready. You can now download the PDF report directly from the calculator.</p>
                
                <h3>What's Next?</h3>
                <ul>
                  <li>Review your financial projections</li>
                  <li>Compare different scenarios</li>
                  <li>Contact us for a customized proposal</li>
                </ul>
                
                <p>Interested in discussing your BESS project? Our team specializes in:</p>
                <ul>
                  <li>Linyang battery systems (€100-127k/MWh)</li>
                  <li>Solar + BESS integration</li>
                  <li>Curtailment recovery solutions</li>
                  <li>Full O&M support</li>
                </ul>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://wa.me/35799164158?text=I used the BESS calculator and want to discuss my project" class="cta">
                    Contact Our BESS Team
                  </a>
                </div>
                
                <p>Best regards,<br>
                <strong>Alexander Papacosta</strong><br>
                Business Development<br>
                Lighthief Cyprus Ltd</p>
              </div>
            </body>
            </html>
          `
        })
      } catch (emailError) {
        // Non-critical
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'PDF unlocked successfully',
      unlocked: true,
    })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address', errors: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, message: 'Failed to process request' },
      { status: 500 }
    )
  }
}
