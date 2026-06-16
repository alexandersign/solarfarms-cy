/**
 * CRM activity feed — append dated events to pv_prospects.activity_feed (JSONB).
 *
 * POST body: { id: string, type: 'note'|'status'|'assign'|'email'|'call', body: string }
 * Returned: updated full activity_feed array.
 */
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getCrmToken } from '@/lib/crm-auth'
import type { ActivityEntry } from '@/lib/supabase'

/** Days until next follow-up by pipeline stage (after a call or email contact). */
const FOLLOW_UP_DAYS_BY_STAGE: Record<string, number> = {
  new:           7,
  researching:   7,
  contacted:     7,
  responded:     3,
  meeting_set:   1,
  proposal_sent: 5,
  negotiating:   3,
}

export async function POST(request: NextRequest) {
  const token = await getCrmToken(request)
  if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { id, type = 'note', body: text } = body as {
      id: string
      type?: ActivityEntry['type']
      body: string
    }

    if (!id || !text?.trim()) {
      return NextResponse.json({ success: false, message: 'id and body required' }, { status: 400 })
    }

    // Read existing feed + outreach_status (needed for follow-up interval)
    const { data: row, error: re } = await supabase
      .from('pv_prospects')
      .select('activity_feed, outreach_status')
      .eq('id', id)
      .single()
    if (re) throw re

    const feed: ActivityEntry[] = (row?.activity_feed as ActivityEntry[]) || []
    const stage: string = (row as { outreach_status?: string })?.outreach_status || 'new'

    const entry: ActivityEntry = {
      ts: new Date().toISOString(),
      author: (token.name as string) || (token.email as string) || 'CRM',
      type,
      body: text.trim(),
    }
    // newest first
    const updated = [entry, ...feed]

    const patch: Record<string, unknown> = { activity_feed: updated }

    // For call or email: stamp last_contact_date AND auto-set next_follow_up
    if (type === 'email' || type === 'call') {
      patch.last_contact_date = entry.ts
      // Set next follow-up based on current pipeline stage
      const intervalDays = FOLLOW_UP_DAYS_BY_STAGE[stage] ?? 7
      const followUpDate = new Date()
      followUpDate.setDate(followUpDate.getDate() + intervalDays)
      patch.next_follow_up = followUpDate.toISOString().split('T')[0]
    }

    const { data, error } = await supabase
      .from('pv_prospects')
      .update(patch)
      .eq('id', id)
      .select('activity_feed, last_contact_date, next_follow_up')
      .single()
    if (error) throw error

    return NextResponse.json({ success: true, data, entry })
  } catch (error) {
    return NextResponse.json({ success: false, message: String(error) }, { status: 500 })
  }
}
