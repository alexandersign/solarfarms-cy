/**
 * CRM prospects API — session-authenticated (next-auth JWT).
 * Accepts + saves assigned_to / assigned_name on all writes.
 * GET accepts optional ?assigned_to=email filter.
 */
import { NextRequest, NextResponse } from 'next/server'
import { getToken }                  from 'next-auth/jwt'
import { supabase }                  from '@/lib/supabase'

async function requireSession(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  return token
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    let query = supabase.from('pv_prospects').select('*').order('created_at', { ascending: false })

    const status     = searchParams.get('status')
    const priority   = searchParams.get('priority')
    const district   = searchParams.get('district')
    const offerType  = searchParams.get('offer_type')
    const search     = searchParams.get('search')
    const assignedTo = searchParams.get('assigned_to')

    if (status)     query = query.eq('outreach_status', status)
    if (priority)   query = query.eq('priority',        priority)
    if (district)   query = query.eq('district',        district)
    if (offerType)  query = query.eq('offer_type',      offerType)
    if (assignedTo) query = query.eq('assigned_to',     assignedTo)
    if (search)     query = query.or(
      `plant_name.ilike.%${search}%,company_name.ilike.%${search}%,contact_name.ilike.%${search}%,parent_group.ilike.%${search}%`
    )

    const { data, error } = await query
    if (error) throw error

    // stats
    const all = data || []
    const byStatus: Record<string,number>   = {}
    const byPriority: Record<string,number> = {}
    let totalPipeline = 0, totalCapacity = 0
    for (const p of all) {
      byStatus[p.outreach_status||'new']    = (byStatus[p.outreach_status||'new']    || 0) + 1
      byPriority[p.priority||'medium']      = (byPriority[p.priority||'medium']      || 0) + 1
      totalPipeline += Number(p.estimated_deal_value) || 0
      totalCapacity += Number(p.capacity_mwp)         || 0
    }

    return NextResponse.json({
      success: true, data: all, count: all.length,
      stats: { total: all.length, byStatus, byPriority, totalPipeline, totalCapacity },
    })
  } catch (error) {
    return NextResponse.json({ success: false, data: [], message: String(error) })
  }
}

export async function POST(request: NextRequest) {
  const token = await requireSession(request)
  if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    if (!body.plant_name) return NextResponse.json({ success: false, message: 'plant_name required' }, { status: 400 })

    const { data, error } = await supabase.from('pv_prospects').insert(body).select().single()
    if (error) throw error
    return NextResponse.json({ success: true, data, message: 'Prospect created' })
  } catch (error) {
    return NextResponse.json({ success: false, message: String(error) }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const token = await requireSession(request)
  if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { id, ...updates } = body
    if (!id) return NextResponse.json({ success: false, message: 'id required' }, { status: 400 })

    const { data, error } = await supabase.from('pv_prospects').update(updates).eq('id', id).select().single()
    if (error) throw error
    return NextResponse.json({ success: true, data, message: 'Updated' })
  } catch (error) {
    return NextResponse.json({ success: false, message: String(error) }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const token = await requireSession(request)
  if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })

  try {
    const id = new URL(request.url).searchParams.get('id')
    if (!id) return NextResponse.json({ success: false, message: 'id required' }, { status: 400 })

    const { error } = await supabase.from('pv_prospects').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true, message: 'Deleted' })
  } catch (error) {
    return NextResponse.json({ success: false, message: String(error) }, { status: 500 })
  }
}
