/**
 * CRM email sequence runner — Vercel Cron, daily at 07:00 CY time (04:00 UTC).
 *
 * Sends follow-up 1 (sequence_step=1) and follow-up 2 (sequence_step=2) emails
 * to prospects where next_follow_up <= today and the prospect is not suppressed.
 *
 * Sequence flow (set by send-outreach when intro is sent):
 *   sequence_step=1, next_follow_up = intro_date + 7 days → sends follow-up 1
 *   sequence_step=2, next_follow_up = followup1_date + 7 days → sends follow-up 2
 *   sequence_step=3 → done, no more automated emails
 *
 * Cap: 100 emails per cron run to stay within Resend limits.
 */
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import {
  sendSequenceEmail,
  isSuppressed,
  withSequenceStepTag,
  type OutreachRecipient,
} from '@/lib/crm-outreach'

const MAX_PER_RUN = 100
const SEND_DELAY_MS = 700
const FOLLOWUP_INTERVAL_DAYS = 7
const BASE_URL = process.env.NEXTAUTH_URL || 'https://solarfarms.cy'

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)) }

function daysFromNow(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString().split('T')[0]
}

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const today = new Date().toISOString().split('T')[0]

  // Fetch prospects in sequence steps 1 or 2 where follow-up date has arrived
  const { data, error } = await supabase
    .from('pv_prospects')
    .select('id, company_name, contact_name, contact_email, offer_type, bess_sales_angle, parent_group, tags, sequence_step, outreach_status')
    .in('sequence_step', [1, 2])
    .lte('next_follow_up', today)
    .not('contact_email', 'is', null)
    .limit(MAX_PER_RUN)

  if (error) {
    return NextResponse.json({ error: 'DB query failed', details: error.message }, { status: 500 })
  }

  type SequenceRow = OutreachRecipient & {
    sequence_step: number
    outreach_status?: string
    offer_type?: string
    bess_sales_angle?: string
  }

  const rows = (data || []) as SequenceRow[]
  const eligible = rows.filter((r) => !isSuppressed(r))

  let sent = 0, skipped = 0, failed = 0
  const errors: string[] = []
  const now = new Date().toISOString()

  for (const r of eligible) {
    const step = r.sequence_step

    const result = await sendSequenceEmail(
      { ...r, primary_target: r.offer_type, bess_angle: r.bess_sales_angle },
      { baseUrl: BASE_URL }
    )

    if (result.ok) {
      sent++
      const nextStep = step + 1
      const updates: Record<string, unknown> = {
        tags: withSequenceStepTag(r.tags, step),
        last_contact_date: now,
        outreach_channel: 'email',
        sequence_step: nextStep,
        // Only set next_follow_up if there's another step remaining
        next_follow_up: nextStep <= 2 ? daysFromNow(FOLLOWUP_INTERVAL_DAYS) : null,
      }
      // If prospect was stalled at 'contacted', keep status — do not regress
      await supabase.from('pv_prospects').update(updates).eq('id', r.id)
    } else if (result.skipped) {
      skipped++
    } else {
      failed++
      if (errors.length < 10) errors.push(`${r.company_name}: ${result.error}`)
    }

    await sleep(SEND_DELAY_MS)
  }

  return NextResponse.json({
    success: true,
    summary: { eligible: eligible.length, sent, skipped, failed },
    errors,
    timestamp: now,
  })
}
