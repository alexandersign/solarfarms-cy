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

    // Read existing feed
    const { data: row, error: re } = await supabase
      .from('pv_prospects')
      .select('activity_feed')
      .eq('id', id)
      .single()
    if (re) throw re

    const feed: ActivityEntry[] = (row?.activity_feed as ActivityEntry[]) || []
    const entry: ActivityEntry = {
      ts: new Date().toISOString(),
      author: (token.name as string) || (token.email as string) || 'CRM',
      type,
      body: text.trim(),
    }
    // newest first
    const updated = [entry, ...feed]

    const patch: Record<string, unknown> = { activity_feed: updated }
    // stamp contact dates for email/call events
    if (type === 'email' || type === 'call') {
      patch.last_contact_date = entry.ts
    }

    const { data, error } = await supabase
      .from('pv_prospects')
      .update(patch)
      .eq('id', id)
      .select('activity_feed, last_contact_date')
      .single()
    if (error) throw error

    return NextResponse.json({ success: true, data, entry })
  } catch (error) {
    return NextResponse.json({ success: false, message: String(error) }, { status: 500 })
  }
}
