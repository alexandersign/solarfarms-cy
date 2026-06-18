/**
 * GET  /api/crm/hr/admin  — Alexander only: all employees' balances + requests
 * POST /api/crm/hr/admin  — approve/reject a request OR manually adjust a balance
 *
 * POST body for approve/reject:
 *   { action: 'approve' | 'reject', requestId: string, admin_note?: string }
 *
 * POST body for balance adjustment:
 *   { action: 'adjust_balance', employee_email: string, year: number,
 *     field: 'annual_entitlement'|'annual_taken'|'sick_taken'|'unpaid_taken'|'overtime_accrued'|'toil_taken',
 *     value: number }
 */
import { NextRequest, NextResponse } from 'next/server'
import { getCrmToken } from '@/lib/crm-auth'
import { supabase } from '@/lib/supabase'
import { CRM_USERS } from '@/lib/crm-users'

const ALEXANDER_EMAIL = 'alexander.papacosta@lighthief.com'
const CURRENT_YEAR = new Date().getFullYear()

const ADJUSTABLE_FIELDS = [
  'annual_entitlement', 'annual_taken', 'sick_taken',
  'unpaid_taken', 'overtime_accrued', 'toil_taken',
] as const

export async function GET(request: NextRequest) {
  const token = await getCrmToken(request)
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (token.email !== ALEXANDER_EMAIL) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const year = parseInt(new URL(request.url).searchParams.get('year') || String(CURRENT_YEAR))

  // All leave requests (pending first, then recent)
  const { data: allRequests, error: reqErr } = await supabase
    .from('hr_leave_requests')
    .select('*')
    .order('status', { ascending: true })   // pending sorts first alphabetically vs approved/rejected
    .order('created_at', { ascending: false })

  if (reqErr) return NextResponse.json({ error: reqErr.message }, { status: 500 })

  // All balances for the year
  const { data: balances, error: balErr } = await supabase
    .from('hr_leave_balances')
    .select('*')
    .eq('year', year)

  if (balErr) return NextResponse.json({ error: balErr.message }, { status: 500 })

  // Ensure every employee has a balance row
  const existingEmails = new Set((balances || []).map((b: { employee_email: string }) => b.employee_email))
  const missing = CRM_USERS.filter(u => !existingEmails.has(u.email))
  if (missing.length > 0) {
    await supabase.from('hr_leave_balances').insert(
      missing.map(u => ({ employee_email: u.email, year }))
    )
  }

  // Re-fetch after potential inserts
  const { data: finalBalances } = await supabase
    .from('hr_leave_balances')
    .select('*')
    .eq('year', year)

  // Build per-employee summary
  const employees = CRM_USERS.map(user => {
    const balance = (finalBalances || []).find((b: { employee_email: string }) => b.employee_email === user.email) || null
    const requests = (allRequests || []).filter((r: { employee_email: string }) => r.employee_email === user.email)
    const pending = requests.filter((r: { status: string }) => r.status === 'pending').length
    return { ...user, balance, requests, pendingCount: pending }
  })

  const pendingRequests = (allRequests || []).filter((r: { status: string }) => r.status === 'pending')

  return NextResponse.json({ employees, pendingRequests, year })
}

export async function POST(request: NextRequest) {
  const token = await getCrmToken(request)
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (token.email !== ALEXANDER_EMAIL) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()
  const { action } = body

  // ── Approve / Reject ─────────────────────────────────────────────────────
  if (action === 'approve' || action === 'reject') {
    const { requestId, admin_note } = body
    if (!requestId) return NextResponse.json({ error: 'Missing requestId' }, { status: 400 })

    const newStatus = action === 'approve' ? 'approved' : 'rejected'

    // Fetch the request first
    const { data: req, error: fetchErr } = await supabase
      .from('hr_leave_requests')
      .select('*')
      .eq('id', requestId)
      .single()

    if (fetchErr || !req) return NextResponse.json({ error: 'Request not found' }, { status: 404 })

    // Update request status
    const { error: updateErr } = await supabase
      .from('hr_leave_requests')
      .update({ status: newStatus, admin_note: admin_note || null })
      .eq('id', requestId)

    if (updateErr) return NextResponse.json({ error: updateErr.message }, { status: 500 })

    // If approving annual/sick/unpaid/toil, increment the taken counter
    if (action === 'approve') {
      const fieldMap: Record<string, string> = {
        annual: 'annual_taken',
        sick:   'sick_taken',
        unpaid: 'unpaid_taken',
        toil:   'toil_taken',
      }
      const field = fieldMap[req.type]
      if (field) {
        const year = new Date(req.start_date).getFullYear()

        // Get current value
        const { data: bal } = await supabase
          .from('hr_leave_balances')
          .select(field)
          .eq('employee_email', req.employee_email)
          .eq('year', year)
          .single()

        const current = bal ? (bal as unknown as Record<string, number>)[field] ?? 0 : 0

        await supabase
          .from('hr_leave_balances')
          .upsert({
            employee_email: req.employee_email,
            year,
            [field]: Number(current) + Number(req.days),
            last_updated_by: ALEXANDER_EMAIL,
          }, { onConflict: 'employee_email,year' })
      }
    }

    return NextResponse.json({ ok: true, status: newStatus })
  }

  // ── Manual balance adjustment ─────────────────────────────────────────────
  if (action === 'adjust_balance') {
    const { employee_email, year, field, value } = body

    if (!employee_email || !year || !field || value === undefined) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    if (!ADJUSTABLE_FIELDS.includes(field)) {
      return NextResponse.json({ error: 'Invalid field' }, { status: 400 })
    }

    const numVal = parseFloat(value)
    if (isNaN(numVal) || numVal < 0) {
      return NextResponse.json({ error: 'Value must be a non-negative number' }, { status: 400 })
    }

    const { error } = await supabase
      .from('hr_leave_balances')
      .upsert({
        employee_email,
        year: parseInt(year),
        [field]: numVal,
        last_updated_by: ALEXANDER_EMAIL,
      }, { onConflict: 'employee_email,year' })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
