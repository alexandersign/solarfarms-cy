/**
 * Send the developer/SPV intro email to selected prospects, a filtered set,
 * or the full filtered list. Session-authenticated.
 *
 * POST body:
 *   { ids: string[] }                 -> send to those prospect ids
 *   { all: true, filter: {...} }      -> send to everyone matching the filter
 *   { test: true, ids?|filter? }      -> render first match, send only to the logged-in user
 *   { resend: true }                  -> include prospects already sent (default skips them)
 *
 * Suppression (unsubscribed / no email) is always enforced.
 */
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getCrmToken } from '@/lib/crm-auth'
import {
  sendIntroEmail,
  isSuppressed,
  alreadySent,
  withIntroSentTag,
  type OutreachRecipient,
} from '@/lib/crm-outreach'

const MAX_PER_CALL = 150
const SEND_DELAY_MS = 600

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

function toRecipient(row: Record<string, unknown>): OutreachRecipient {
  return {
    id: row.id as string,
    company_name: row.company_name as string,
    contact_name: row.contact_name as string,
    contact_email: row.contact_email as string,
    primary_target: (row.primary_sales_target as string) || (row.offer_type as string) || undefined,
    parent_group: (row.parent_group as string) || undefined,
    bess_angle: (row.bess_sales_angle as string) || undefined,
    tags: (row.tags as string[]) || [],
  }
}

export async function POST(request: NextRequest) {
  const token = await getCrmToken(request)
  if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })

  const baseUrl = process.env.NEXTAUTH_URL || new URL(request.url).origin
  const senderEmail = (token.email as string) || undefined
  const senderName = (token.name as string) || undefined

  try {
    const body = await request.json()
    const { ids, all, filter, test, resend } = body as {
      ids?: string[]
      all?: boolean
      filter?: Record<string, string>
      test?: boolean
      resend?: boolean
    }

    // Build recipient query
    let rows: Record<string, unknown>[] = []
    if (ids && ids.length) {
      const { data, error } = await supabase.from('pv_prospects').select('*').in('id', ids)
      if (error) throw error
      rows = data || []
    } else {
      let q = supabase.from('pv_prospects').select('*')
      const f = filter || {}
      if (f.segment)     q = q.eq('segment', f.segment)
      if (f.status)      q = q.eq('outreach_status', f.status)
      if (f.district)    q = q.eq('district', f.district)
      if (f.offer_type)  q = q.eq('offer_type', f.offer_type)
      if (f.assigned_to) q = q.eq('assigned_to', f.assigned_to)
      if (f.search)      q = q.or(`company_name.ilike.%${f.search}%,contact_name.ilike.%${f.search}%`)
      const { data, error } = await q
      if (error) throw error
      rows = data || []
    }

    const recipients = rows.map(toRecipient).filter((r) => r.contact_email)

    // TEST MODE — render the first eligible recipient, send only to the logged-in user
    if (test) {
      if (!senderEmail) return NextResponse.json({ success: false, message: 'No session email for test' }, { status: 400 })
      const sample = recipients[0] || { company_name: 'Sample SPV Ltd', contact_name: 'Sample Director', primary_target: 'PV O&M' }
      const res = await sendIntroEmail(
        { ...sample, contact_email: senderEmail, id: undefined },
        { baseUrl, replyTo: senderEmail, senderName, senderEmail }
      )
      return NextResponse.json({
        success: res.ok,
        message: res.ok ? `Test sent to ${senderEmail}` : `Test failed: ${res.error}`,
        previewOf: sample.company_name,
      })
    }

    if (!ids && !all) {
      return NextResponse.json({ success: false, message: 'Provide ids[] or all:true' }, { status: 400 })
    }

    // filter out suppressed + already-sent (unless resend)
    const eligible = recipients.filter((r) => {
      if (isSuppressed(r)) return false
      if (!resend && alreadySent(r)) return false
      return true
    })

    if (eligible.length > MAX_PER_CALL) {
      return NextResponse.json({
        success: false,
        message: `${eligible.length} recipients exceeds the ${MAX_PER_CALL}/call cap. Narrow the filter or send in batches.`,
        eligible: eligible.length,
      }, { status: 400 })
    }

    let sent = 0, failed = 0
    const skipped = recipients.length - eligible.length
    const errors: string[] = []
    const now = new Date().toISOString()

    for (const r of eligible) {
      const res = await sendIntroEmail(r, { baseUrl, replyTo: senderEmail, senderName, senderEmail })
      if (res.ok) {
        sent++
        const followUpDate = new Date(now)
        followUpDate.setDate(followUpDate.getDate() + 7)
        const updates: Record<string, unknown> = {
          tags: withIntroSentTag(r.tags),
          last_contact_date: now,
          outreach_channel: 'email',
          // Enrol in sequence: step 1 follow-up in 7 days
          sequence_step: 1,
          next_follow_up: followUpDate.toISOString().split('T')[0],
        }
        // advance pipeline + stamp first contact for brand-new prospects
        const { data: cur } = await supabase
          .from('pv_prospects').select('outreach_status, first_contact_date').eq('id', r.id).single()
        if (cur?.outreach_status === 'new') updates.outreach_status = 'contacted'
        if (!cur?.first_contact_date) updates.first_contact_date = now
        await supabase.from('pv_prospects').update(updates).eq('id', r.id)
      } else {
        failed++
        if (errors.length < 10) errors.push(`${r.company_name}: ${res.error}`)
      }
      await sleep(SEND_DELAY_MS)
    }

    return NextResponse.json({
      success: true,
      message: `Sent ${sent}, skipped ${skipped} (unsubscribed/already-sent), failed ${failed}`,
      sent, skipped, failed, errors,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: String(error) }, { status: 500 })
  }
}
