/**
 * GET  /api/crm/hr/leave  — own balance + requests for authenticated employee
 * POST /api/crm/hr/leave  — submit a new leave request
 */
import { NextRequest, NextResponse } from 'next/server'
import { getCrmToken } from '@/lib/crm-auth'
import { supabase } from '@/lib/supabase'

const CURRENT_YEAR = new Date().getFullYear()

export async function GET(request: NextRequest) {
  const token = await getCrmToken(request)
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const email = token.email as string

  // Fetch balance for current year (upsert a default row if missing)
  let { data: balance, error: balErr } = await supabase
    .from('hr_leave_balances')
    .select('*')
    .eq('employee_email', email)
    .eq('year', CURRENT_YEAR)
    .single()

  if (balErr && balErr.code === 'PGRST116') {
    // Row doesn't exist — create default
    const { data: inserted } = await supabase
      .from('hr_leave_balances')
      .insert({ employee_email: email, year: CURRENT_YEAR })
      .select()
      .single()
    balance = inserted
  } else if (balErr) {
    return NextResponse.json({ error: balErr.message }, { status: 500 })
  }

  // Fetch all leave requests for this employee (most recent first)
  const { data: requests, error: reqErr } = await supabase
    .from('hr_leave_requests')
    .select('*')
    .eq('employee_email', email)
    .order('created_at', { ascending: false })

  if (reqErr) return NextResponse.json({ error: reqErr.message }, { status: 500 })

  return NextResponse.json({ balance, requests: requests || [] })
}

export async function POST(request: NextRequest) {
  const token = await getCrmToken(request)
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const email = token.email as string
  const body = await request.json()

  const { type, start_date, end_date, days, notes } = body

  // Validate
  if (!type || !start_date || !end_date || !days) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const validTypes = ['annual', 'sick', 'unpaid', 'toil', 'public']
  if (!validTypes.includes(type)) {
    return NextResponse.json({ error: 'Invalid leave type' }, { status: 400 })
  }

  const daysNum = parseFloat(days)
  if (isNaN(daysNum) || daysNum <= 0 || daysNum > 365) {
    return NextResponse.json({ error: 'Invalid days value' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('hr_leave_requests')
    .insert({
      employee_email: email,
      type,
      start_date,
      end_date,
      days: daysNum,
      notes: notes || null,
      status: 'pending',
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ request: data }, { status: 201 })
}
