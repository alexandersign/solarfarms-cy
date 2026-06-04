/**
 * CRM prospects API — session-authenticated (next-auth JWT).
 * Accepts + saves assigned_to / assigned_name on all writes.
 * GET accepts optional ?assigned_to=email filter.
 */
import { NextRequest, NextResponse } from 'next/server'
import { supabase }                  from '@/lib/supabase'
import { getCrmToken }               from '@/lib/crm-auth'

async function requireSession(req: NextRequest) {
  return getCrmToken(req)
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
    const segment    = searchParams.get('segment')
    const newDays    = searchParams.get('new_days')
    const rtb        = searchParams.get('rtb_status')
    const built      = searchParams.get('satellite_check')
    const technology = searchParams.get('technology')
    const hasBess    = searchParams.get('has_bess')

    if (status)     query = query.eq('outreach_status', status)
    if (priority)   query = query.eq('priority',        priority)
    if (district)   query = query.eq('district',        district)
    if (offerType)  query = query.eq('offer_type',      offerType)
    if (assignedTo) query = query.eq('assigned_to',     assignedTo)
    if (segment)    query = query.eq('segment',         segment)
    if (rtb)        query = query.eq('rtb_status',       rtb)
    if (built)      query = query.eq('satellite_check',  built)
    if (technology) query = query.eq('technology',       technology)
    if (hasBess === 'true')  query = query.gt('bess_potential_mwh', 0)
    if (hasBess === 'false') query = query.or('bess_potential_mwh.is.null,bess_potential_mwh.eq.0')
    if (newDays) {
      const since = new Date(Date.now() - parseInt(newDays, 10) * 86400000).toISOString()
      query = query.gte('created_at', since)
    }
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
