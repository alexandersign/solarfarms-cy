import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { generateLOIHTML, LOIData } from '@/lib/loi-generator'
import { loiSubmissionsService } from '@/lib/supabase'
import { sendEmail } from '@/lib/email'
import { trackLOIGenerated } from '@/lib/meta-conversions'

const loiSchema = z.object({
  investorName: z.string().min(2),
  investorCompany: z.string().optional(),
  investorAddress: z.string().min(5),
  investorEmail: z.string().email(),
  investorPhone: z.string(),
  projectName: z.string().min(1),
  projectReference: z.string().optional(),
  projectCapacityMW: z.number(),
  estimatedInvestment: z.number(),
  investmentAmount: z.number(),
  investmentType: z.enum(['equity', 'debt', 'hybrid']),
  timeline: z.string(),
  conditions: z.array(z.string()).optional(),
  bessIncluded: z.boolean().optional(),
  ltsaTier: z.enum(['A', 'B', 'C', 'D']).optional(),
  financingRequired: z.boolean().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = loiSchema.parse(body)

    const loiData: LOIData = {
      investorName: data.investorName,
      investorCompany: data.investorCompany,
      investorAddress: data.investorAddress,
      investorEmail: data.investorEmail,
      investorPhone: data.investorPhone,
      projectName: data.projectName,
      projectReference: data.projectReference,
      projectCapacityMW: data.projectCapacityMW,
      estimatedInvestment: data.estimatedInvestment,
      investmentAmount: data.investmentAmount,
      investmentType: data.investmentType,
      timeline: data.timeline,
      conditions: data.conditions,
      bessIncluded: data.bessIncluded,
      financingRequired: data.financingRequired,
    }

    const html = generateLOIHTML(loiData)

    let savedSubmission = null
    try {
      savedSubmission = await loiSubmissionsService.create({
        investor_name: data.investorName,
        investor_company: data.investorCompany,
        investor_address: data.investorAddress,
        investor_email: data.investorEmail,
        investor_phone: data.investorPhone,
        project_name: data.projectName,
        project_reference: data.projectReference,
        project_capacity_mw: data.projectCapacityMW,
        estimated_investment: data.estimatedInvestment,
        investment_amount: data.investmentAmount,
        investment_type: data.investmentType,
        timeline: data.timeline,
        bess_included: data.bessIncluded,
        ltsa_tier: data.ltsaTier,
        financing_required: data.financingRequired,
        conditions: data.conditions,
        loi_html: html,
        source: 'website',
      })
    } catch {
      savedSubmission = { id: 'temp_' + Date.now() }
    }

    const investmentFormatted = `€${data.investmentAmount.toLocaleString()}`
    const capacityFormatted = `${data.projectCapacityMW} MW`

    sendEmail({
      to: 'office@lighthief.com',
      subject: `New LOI Submission — ${data.investorName} — ${data.projectName} (${capacityFormatted})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
            New Letter of Intent Submitted
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Investor</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.investorName}${data.investorCompany ? ` (${data.investorCompany})` : ''}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${data.investorEmail}">${data.investorEmail}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.investorPhone}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Project</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.projectName}${data.projectReference ? ` (${data.projectReference})` : ''}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Capacity</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${capacityFormatted}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Investment</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${investmentFormatted}</strong> (${data.investmentType})</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Timeline</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.timeline}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">BESS</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.bessIncluded ? `Yes — LTSA Tier ${data.ltsaTier || 'TBD'}` : 'No'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Financing</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.financingRequired ? 'Required' : 'Not required'}</td></tr>
            ${data.conditions?.length ? `<tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Conditions</td>
                <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.conditions.join('<br>')}</td></tr>` : ''}
          </table>
          <p style="margin-top: 20px; padding: 12px; background: #fef3c7; border-left: 4px solid #f59e0b; font-size: 14px;">
            <strong>Action required:</strong> Review the LOI and contact the investor within 2 business days.
            The full LOI document is attached below and saved in Supabase (ID: ${savedSubmission?.id || 'pending'}).
          </p>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Submitted via solarfarms.cy — ${new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}
          </p>
        </div>
      `,
      replyTo: data.investorEmail,
    }).catch(() => {})

    sendEmail({
      to: data.investorEmail,
      subject: `Your Letter of Intent — ${data.projectName} — Lighthief Cyprus`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #0ea5e9;">Thank You for Your Letter of Intent</h2>
          <p>Dear ${data.investorName},</p>
          <p>
            We have received your Letter of Intent for <strong>${data.projectName}</strong>
            (${capacityFormatted}, ${investmentFormatted} ${data.investmentType} investment).
          </p>
          <p><strong>What happens next:</strong></p>
          <ol>
            <li>Our team will review your LOI within <strong>2 business days</strong></li>
            <li>We will prepare and send a <strong>Mutual NDA</strong> for execution</li>
            <li>Upon NDA signing, you will receive the full <strong>Due Diligence Package</strong></li>
            <li>A site visit can be arranged during the due diligence period</li>
          </ol>
          <p>
            A copy of your LOI was opened in your browser for your records. You can also
            regenerate it at any time at
            <a href="https://solarfarms.cy/loi" style="color: #0ea5e9;">solarfarms.cy/loi</a>.
          </p>
          <p>
            If you have any questions, please reply to this email or contact us at
            <a href="mailto:office@lighthief.com">office@lighthief.com</a> / +357 77 77 00 50.
          </p>
          <p>Best regards,<br><strong>The Lighthief Cyprus Team</strong></p>
          <hr style="border: none; border-top: 2px solid #0ea5e9; margin: 20px 0;">
          <p style="color: #666; font-size: 11px;">
            LIGHTHIEF CYPRUS LTD | HE 477423 | 28 October Ave 249, Lophitis Business Center 1, Office 201, 3035 Limassol, Cyprus<br>
            <a href="https://solarfarms.cy" style="color: #0ea5e9;">solarfarms.cy</a>
          </p>
        </div>
      `,
    }).catch(() => {})

    trackLOIGenerated({
      email: data.investorEmail,
      projectRef: data.projectReference,
      investmentAmount: data.investmentAmount,
    }).catch(() => {})

    return NextResponse.json({
      success: true,
      message: 'LOI submitted successfully. We will review and contact you within 2 business days.',
      submissionId: savedSubmission?.id,
      html,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid data. Please check all required fields.', errors: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Submission failed. Please try again or contact us directly at office@lighthief.com.' },
      { status: 500 }
    )
  }
}
