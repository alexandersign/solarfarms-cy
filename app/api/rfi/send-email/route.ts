import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'
import { rfiService } from '@/lib/rfi-service'
import type { RfiItem } from '@/lib/rfi-service'

// POST /api/rfi/send-email — Send an RFI/RFP email and update tracker
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      rfiId,         // existing RFI ID to mark as sent
      to_email,
      to_name,
      cc,            // optional CC
      subject,
      body_html,     // optional: custom body HTML
      template,      // optional: 'rfi' | 'rfp' | 'followup' | 'reminder'
      rfi_data,      // data for template rendering
    } = body

    if (!to_email || !subject) {
      return NextResponse.json(
        { error: 'to_email and subject are required' },
        { status: 400 }
      )
    }

    // Build email HTML
    let html = body_html
    if (!html && template) {
      html = renderTemplate(template, { to_name, subject, ...rfi_data })
    }
    if (!html) {
      return NextResponse.json(
        { error: 'Either body_html or template is required' },
        { status: 400 }
      )
    }

    // Send via Resend
    const result = await sendEmail({
      to: to_email,
      subject,
      html,
      from: 'Lighthief Cyprus <noreply@solarfarms.cy>',
      replyTo: 'lighthiefcyprus@gmail.com',
    })

    if (!result.success) {
      return NextResponse.json(
        { error: 'Email sending failed', detail: result.message },
        { status: 500 }
      )
    }

    // Update RFI tracker if rfiId provided
    if (rfiId) {
      await rfiService.update(rfiId, {
        email_sent: true,
        status: 'sent',
        date_sent: new Date().toISOString().split('T')[0],
      })

      // Log correspondence
      await rfiService.addCorrespondence({
        rfi_id: rfiId,
        direction: 'sent',
        date: new Date().toISOString().split('T')[0],
        from_email: 'lighthiefcyprus@gmail.com',
        to_email,
        subject,
        body_preview: html.substring(0, 300).replace(/<[^>]*>/g, ''),
      })
    }

    return NextResponse.json({
      success: true,
      message: `Email sent to ${to_email}`,
      rfi_updated: !!rfiId,
    })
  } catch (error: any) {
    console.error('RFI email error:', error)
    return NextResponse.json(
      { error: 'Failed to send email', detail: error?.message },
      { status: 500 }
    )
  }
}

// ─────────────────── Email Templates ───────────────────

function renderTemplate(
  template: string,
  data: Record<string, any>
): string {
  switch (template) {
    case 'rfi':
      return rfiTemplate(data)
    case 'rfp':
      return rfpTemplate(data)
    case 'followup':
      return followupTemplate(data)
    case 'reminder':
      return reminderTemplate(data)
    default:
      return rfiTemplate(data)
  }
}

function rfiTemplate(data: Record<string, any>): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a2e; line-height: 1.6; margin: 0; padding: 0; background: #f5f5f5; }
    .container { max-width: 680px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); color: white; padding: 32px 40px; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 600; }
    .header .ref { font-size: 12px; opacity: 0.7; margin-top: 4px; letter-spacing: 1px; }
    .header .type-badge { display: inline-block; background: rgba(255,255,255,0.15); padding: 3px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; margin-top: 12px; letter-spacing: 0.5px; }
    .body { padding: 32px 40px; }
    .body p { margin: 0 0 16px; font-size: 15px; }
    .meta-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .meta-table td { padding: 10px 16px; font-size: 14px; border-bottom: 1px solid #e5e7eb; }
    .meta-table td:first-child { font-weight: 600; color: #6b7280; width: 140px; }
    .items-section { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 24px 0; }
    .items-section h3 { margin: 0 0 12px; font-size: 14px; color: #334155; }
    .item-row { display: flex; align-items: center; padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
    .item-row:last-child { border: none; }
    .item-num { width: 28px; height: 28px; background: #0f172a; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; flex-shrink: 0; margin-right: 12px; }
    .cta-section { text-align: center; margin: 32px 0; }
    .cta { display: inline-block; background: #2563eb; color: white; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 40px; font-size: 12px; color: #6b7280; }
    .footer strong { color: #334155; }
    .urgency { background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 12px 16px; margin: 16px 0; }
    .urgency p { margin: 0; font-size: 13px; color: #991b1b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="type-badge">REQUEST FOR INFORMATION</div>
      <h1>${data.subject || 'Information Request'}</h1>
      <div class="ref">${data.reference || ''}</div>
    </div>
    <div class="body">
      <p>Dear ${data.to_name || 'Sir/Madam'},</p>
      <p>${data.intro || 'We are writing to request the following information in relation to our ongoing BESS project in Cyprus.'}</p>
      
      <table class="meta-table">
        <tr><td>Project</td><td>${data.project || 'Cyprus BESS Portfolio — 189.2 MWh'}</td></tr>
        <tr><td>Reference</td><td>${data.reference || 'LCY-RFI-XXX'}</td></tr>
        <tr><td>Category</td><td>${data.category || 'Technical'}</td></tr>
        <tr><td>Response Due</td><td><strong style="color: #dc2626;">${data.due_date || 'ASAP'}</strong></td></tr>
      </table>

      ${data.items?.length ? `
      <div class="items-section">
        <h3>Information Requested (${data.items.length} items)</h3>
        ${data.items.map((item: string, i: number) => `
        <div class="item-row">
          <div class="item-num">${i + 1}</div>
          <div>${item}</div>
        </div>`).join('')}
      </div>
      ` : ''}

      ${data.context ? `<p>${data.context}</p>` : ''}

      ${data.urgent ? `
      <div class="urgency">
        <p><strong>⚠ URGENT:</strong> ${data.urgent_note || 'This information is critical for our project timeline. Delayed response may impact the March 1 order date.'}</p>
      </div>` : ''}

      <p>Please do not hesitate to contact us should you require any clarification on the above.</p>
      <p>Kind regards,<br><strong>Alexander Papacosta</strong><br>Cyprus Director — Lighthief Cyprus Ltd</p>
    </div>
    <div class="footer">
      <strong>LIGHTHIEF CYPRUS LTD</strong><br>
      28 October Ave 249, Lophitis Business Center 1, Office 201 · 3035 Limassol, Cyprus<br>
      lighthiefcyprus@gmail.com · +357 99 164 158 · solarfarms.cy
    </div>
  </div>
</body>
</html>`
}

function rfpTemplate(data: Record<string, any>): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a2e; line-height: 1.6; margin: 0; padding: 0; background: #f5f5f5; }
    .container { max-width: 680px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #1e3a5f 0%, #0d9488 100%); color: white; padding: 32px 40px; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 600; }
    .header .ref { font-size: 12px; opacity: 0.7; margin-top: 4px; letter-spacing: 1px; }
    .header .type-badge { display: inline-block; background: rgba(255,255,255,0.15); padding: 3px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; margin-top: 12px; }
    .body { padding: 32px 40px; }
    .body p { margin: 0 0 16px; font-size: 15px; }
    .scope-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .scope-table th { background: #0f172a; color: white; padding: 10px 16px; font-size: 12px; text-align: left; }
    .scope-table td { padding: 10px 16px; font-size: 14px; border-bottom: 1px solid #e5e7eb; }
    .deadline-box { background: #fef2f2; border: 2px solid #fecaca; border-radius: 8px; padding: 16px; text-align: center; margin: 24px 0; }
    .deadline-box .date { font-size: 24px; font-weight: 700; color: #dc2626; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 40px; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="type-badge">REQUEST FOR PROPOSAL</div>
      <h1>${data.subject || 'Proposal Request'}</h1>
      <div class="ref">${data.reference || ''}</div>
    </div>
    <div class="body">
      <p>Dear ${data.to_name || 'Sir/Madam'},</p>
      <p>${data.intro || 'Lighthief Cyprus Ltd invites your company to submit a proposal for the following scope of work.'}</p>
      
      ${data.scope ? `
      <table class="scope-table">
        <tr><th>Item</th><th>Description</th><th>Qty</th></tr>
        ${data.scope.map((s: any) => `
        <tr><td>${s.item}</td><td>${s.description}</td><td>${s.qty || '-'}</td></tr>
        `).join('')}
      </table>
      ` : ''}

      ${data.requirements ? `
      <h3>Proposal Requirements</h3>
      <ul>
        ${data.requirements.map((r: string) => `<li>${r}</li>`).join('')}
      </ul>
      ` : ''}

      <div class="deadline-box">
        <p style="margin: 0; font-size: 12px; color: #6b7280;">PROPOSAL DEADLINE</p>
        <p class="date">${data.due_date || 'TBD'}</p>
      </div>

      <p>We look forward to your competitive proposal.</p>
      <p>Kind regards,<br><strong>Alexander Papacosta</strong><br>Cyprus Director — Lighthief Cyprus Ltd</p>
    </div>
    <div class="footer">
      <strong>LIGHTHIEF CYPRUS LTD</strong><br>
      28 October Ave 249, Lophitis Business Center 1, Office 201 · 3035 Limassol, Cyprus<br>
      lighthiefcyprus@gmail.com · +357 99 164 158 · solarfarms.cy
    </div>
  </div>
</body>
</html>`
}

function followupTemplate(data: Record<string, any>): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a2e; line-height: 1.6; margin: 0; padding: 0; background: #f5f5f5; }
    .container { max-width: 680px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #92400e 0%, #f59e0b 100%); color: white; padding: 24px 40px; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 600; }
    .header .type-badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 3px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; margin-top: 8px; }
    .body { padding: 32px 40px; }
    .body p { margin: 0 0 16px; font-size: 15px; }
    .timeline { background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 16px; margin: 20px 0; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 40px; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="type-badge">FOLLOW-UP</div>
      <h1>Re: ${data.subject || 'Follow-up'}</h1>
    </div>
    <div class="body">
      <p>Dear ${data.to_name || 'Sir/Madam'},</p>
      <p>We are writing to follow up on our previous ${data.original_type || 'RFI'} (Ref: <strong>${data.reference || ''}</strong>) sent on ${data.original_date || 'N/A'}.</p>
      
      <div class="timeline">
        <p style="margin: 0; font-size: 13px;"><strong>Original request:</strong> ${data.original_date || 'N/A'}</p>
        <p style="margin: 4px 0 0; font-size: 13px;"><strong>Response due:</strong> ${data.due_date || 'N/A'}</p>
        <p style="margin: 4px 0 0; font-size: 13px;"><strong>Days overdue:</strong> <span style="color: #dc2626; font-weight: 600;">${data.days_overdue || '—'}</span></p>
      </div>

      ${data.outstanding_items?.length ? `
      <p><strong>Outstanding items (${data.outstanding_items.length}):</strong></p>
      <ol>
        ${data.outstanding_items.map((item: string) => `<li>${item}</li>`).join('')}
      </ol>
      ` : ''}

      <p>${data.closing || 'Your prompt response would be greatly appreciated as these items are on the critical path for our project.'}</p>
      <p>Kind regards,<br><strong>Alexander Papacosta</strong><br>Cyprus Director — Lighthief Cyprus Ltd</p>
    </div>
    <div class="footer">
      <strong>LIGHTHIEF CYPRUS LTD</strong><br>
      28 October Ave 249, Lophitis Business Center 1, Office 201 · 3035 Limassol, Cyprus<br>
      lighthiefcyprus@gmail.com · +357 99 164 158 · solarfarms.cy
    </div>
  </div>
</body>
</html>`
}

function reminderTemplate(data: Record<string, any>): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a2e; line-height: 1.6; margin: 0; padding: 0; background: #f5f5f5; }
    .container { max-width: 680px; margin: 0 auto; background: white; }
    .header { background: #dc2626; color: white; padding: 24px 40px; }
    .header h1 { margin: 0; font-size: 20px; }
    .body { padding: 32px 40px; }
    .body p { margin: 0 0 16px; font-size: 15px; }
    .urgent-box { background: #fef2f2; border: 2px solid #dc2626; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 40px; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>URGENT REMINDER — ${data.subject || 'Response Required'}</h1>
    </div>
    <div class="body">
      <p>Dear ${data.to_name || 'Sir/Madam'},</p>
      <p>This is an <strong>urgent reminder</strong> regarding ${data.reference || 'our pending request'}. The response deadline has passed and these items remain critical to our project timeline.</p>
      
      <div class="urgent-box">
        <p style="margin: 0; font-size: 24px; font-weight: 700; color: #dc2626;">${data.days_overdue || '?'} DAYS OVERDUE</p>
        <p style="margin: 8px 0 0; font-size: 13px; color: #6b7280;">Original deadline: ${data.due_date || 'N/A'}</p>
      </div>

      <p>${data.impact || 'Continued delays may impact our order placement date and overall project schedule.'}</p>
      <p>We would appreciate your immediate attention to this matter.</p>
      <p>Kind regards,<br><strong>Alexander Papacosta</strong><br>Cyprus Director — Lighthief Cyprus Ltd</p>
    </div>
    <div class="footer">
      <strong>LIGHTHIEF CYPRUS LTD</strong><br>
      28 October Ave 249, Lophitis Business Center 1, Office 201 · 3035 Limassol, Cyprus<br>
      lighthiefcyprus@gmail.com · +357 99 164 158 · solarfarms.cy
    </div>
  </div>
</body>
</html>`
}
