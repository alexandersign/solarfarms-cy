'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { CrmHeader } from '@/components/crm/crm-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Calendar, FileText, Clock, AlertCircle, CheckCircle2,
  XCircle, RefreshCw, ChevronRight, Sun, Stethoscope,
  TimerOff, Hourglass, PlusCircle,
} from 'lucide-react'

const ALEXANDER_EMAIL = 'alexander.papacosta@lighthief.com'

const LEAVE_LABELS: Record<string, string> = {
  annual:  'Annual Leave',
  sick:    'Sick Leave',
  unpaid:  'Unpaid Leave',
  toil:    'Time Off in Lieu',
  public:  'Public Holiday',
}

const LEAVE_ICONS: Record<string, React.ElementType> = {
  annual: Sun,
  sick:   Stethoscope,
  unpaid: TimerOff,
  toil:   Hourglass,
  public: Calendar,
}

const STATUS_STYLES: Record<string, { label: string; cls: string; icon: React.ElementType }> = {
  pending:  { label: 'Pending', cls: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock },
  approved: { label: 'Approved', cls: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  rejected: { label: 'Rejected', cls: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
}

interface Balance {
  annual_entitlement: number
  annual_taken: number
  sick_taken: number
  unpaid_taken: number
  overtime_accrued: number
  toil_taken: number
}

interface LeaveRequest {
  id: string
  type: string
  start_date: string
  end_date: string
  days: number
  notes?: string
  status: string
  admin_note?: string
  created_at: string
}

interface PayslipEntry {
  file: string
  month: string
  label: string
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function BalanceCard({ label, taken, entitlement, icon: Icon, color }: {
  label: string; taken: number; entitlement?: number; icon: React.ElementType; color: string
}) {
  const remaining = entitlement != null ? entitlement - taken : null
  const pct = entitlement ? Math.min(100, Math.round((taken / entitlement) * 100)) : 0
  return (
    <div className="bg-white border rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Icon className={`w-4 h-4 ${color}`} />
          {label}
        </div>
        {entitlement != null && (
          <span className="text-xs text-gray-400">{taken} / {entitlement} days used</span>
        )}
        {entitlement == null && (
          <span className="text-xs text-gray-400">{taken} days</span>
        )}
      </div>
      {entitlement != null && (
        <>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all ${pct >= 90 ? 'bg-red-500' : pct >= 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xl font-bold" style={{ color: '#1A365D' }}>
            {remaining} <span className="text-sm font-normal text-gray-400">days remaining</span>
          </p>
        </>
      )}
    </div>
  )
}

export default function HrPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [balance, setBalance] = useState<Balance | null>(null)
  const [requests, setRequests] = useState<LeaveRequest[]>([])
  const [payslips, setPayslips] = useState<PayslipEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'leave' | 'payslips'>('leave')
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  // New request form state
  const [form, setForm] = useState({
    type: 'annual',
    start_date: '',
    end_date: '',
    days: '',
    notes: '',
  })

  const isAlexander = session?.user?.email === ALEXANDER_EMAIL

  useEffect(() => {
    if (status === 'loading') return
    if (!session) router.push('/crm/login')
  }, [session, status, router])

  const load = useCallback(async () => {
    setLoading(true)
    const [leaveRes, payRes] = await Promise.all([
      fetch('/api/crm/hr/leave'),
      fetch('/api/crm/hr/payslips'),
    ])
    if (leaveRes.ok) {
      const d = await leaveRes.json()
      setBalance(d.balance)
      setRequests(d.requests || [])
    }
    if (payRes.ok) {
      const d = await payRes.json()
      setPayslips(d.payslips || [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (status === 'authenticated') load()
  }, [load, status])

  // Auto-calculate days when dates change
  useEffect(() => {
    if (form.start_date && form.end_date) {
      const start = new Date(form.start_date)
      const end = new Date(form.end_date)
      if (end >= start) {
        let count = 0
        const cur = new Date(start)
        while (cur <= end) {
          const dow = cur.getDay()
          if (dow !== 0 && dow !== 6) count++
          cur.setDate(cur.getDate() + 1)
        }
        setForm(f => ({ ...f, days: String(count) }))
      }
    }
  }, [form.start_date, form.end_date])

  const submitRequest = async () => {
    setFormError('')
    if (!form.start_date || !form.end_date || !form.days) {
      setFormError('Please fill in all required fields.')
      return
    }
    setSubmitting(true)
    const res = await fetch('/api/crm/hr/leave', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSubmitting(false)
    if (res.ok) {
      setShowForm(false)
      setForm({ type: 'annual', start_date: '', end_date: '', days: '', notes: '' })
      load()
    } else {
      const d = await res.json()
      setFormError(d.error || 'Failed to submit. Please try again.')
    }
  }

  const openPayslip = (file: string) => {
    window.open(`/api/crm/hr/payslips/${encodeURIComponent(file)}`, '_blank')
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="w-6 h-6 animate-spin text-[#1A365D]" />
      </div>
    )
  }

  const annualRemaining = balance ? balance.annual_entitlement - balance.annual_taken : 0
  const toilRemaining = balance ? balance.overtime_accrued - balance.toil_taken : 0
  const pendingCount = requests.filter(r => r.status === 'pending').length

  return (
    <>
      <CrmHeader activeNav="hr" />

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">

        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-[#1A365D] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#C9A432]" />
              My HR Portal
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {session?.user?.name} · {new Date().getFullYear()} leave year
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isAlexander && (
              <button
                onClick={() => router.push('/crm/hr/admin')}
                className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded border border-[#1A365D]/30 text-[#1A365D] hover:bg-[#1A365D]/5 transition"
              >
                Admin view <ChevronRight className="w-3 h-3" />
              </button>
            )}
            <button
              onClick={load}
              className="p-1.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-500"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Leave balance cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <BalanceCard
            label="Annual Leave"
            taken={balance?.annual_taken ?? 0}
            entitlement={balance?.annual_entitlement ?? 20}
            icon={Sun}
            color="text-amber-500"
          />
          <BalanceCard
            label="Sick Leave"
            taken={balance?.sick_taken ?? 0}
            icon={Stethoscope}
            color="text-red-400"
          />
          <BalanceCard
            label="Unpaid Leave"
            taken={balance?.unpaid_taken ?? 0}
            icon={TimerOff}
            color="text-gray-400"
          />
          <BalanceCard
            label="TOIL Balance"
            taken={balance?.toil_taken ?? 0}
            entitlement={balance ? balance.overtime_accrued : 0}
            icon={Hourglass}
            color="text-indigo-500"
          />
        </div>

        {/* Cyprus public holidays info bar */}
        <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2.5 text-xs text-blue-700">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            <strong>Cyprus law:</strong> Annual leave entitlement is minimum 20 working days per year (Annual Holidays with Pay Law, Cap. 8).
            Cyprus has 14 public holidays per year — these are <em>not</em> deducted from your annual leave balance.
          </span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b">
          {(['leave', 'payslips'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium transition border-b-2 -mb-px ${
                tab === t
                  ? 'border-[#1A365D] text-[#1A365D]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t === 'leave' ? (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Leave Requests
                  {pendingCount > 0 && (
                    <span className="ml-1 bg-amber-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                      {pendingCount}
                    </span>
                  )}
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Payslips
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Leave requests tab ─────────────────────────────────────────────── */}
        {tab === 'leave' && (
          <div className="space-y-4">
            {/* New request button / form */}
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition"
                style={{ background: '#1A365D' }}
              >
                <PlusCircle className="w-4 h-4" />
                New Leave Request
              </button>
            ) : (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <PlusCircle className="w-4 h-4 text-[#C9A432]" />
                    New Leave Request
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-600">Leave Type *</label>
                      <select
                        className="w-full border rounded px-2 py-1.5 text-sm"
                        value={form.type}
                        onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                      >
                        {Object.entries(LEAVE_LABELS).map(([v, l]) => (
                          <option key={v} value={v}>{l}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-600">From *</label>
                      <input
                        type="date"
                        className="w-full border rounded px-2 py-1.5 text-sm"
                        value={form.start_date}
                        onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-600">To *</label>
                      <input
                        type="date"
                        className="w-full border rounded px-2 py-1.5 text-sm"
                        value={form.end_date}
                        min={form.start_date}
                        onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-600">Working Days *</label>
                      <input
                        type="number"
                        min="0.5"
                        step="0.5"
                        className="w-full border rounded px-2 py-1.5 text-sm"
                        value={form.days}
                        onChange={e => setForm(f => ({ ...f, days: e.target.value }))}
                        placeholder="Auto-calculated"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600">Notes (optional)</label>
                    <textarea
                      rows={2}
                      className="w-full border rounded px-2 py-1.5 text-sm resize-none"
                      placeholder="Any additional details..."
                      value={form.notes}
                      onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                    />
                  </div>
                  {formError && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />{formError}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={submitRequest}
                      disabled={submitting}
                      className="px-4 py-1.5 rounded text-sm font-medium text-white disabled:opacity-50 transition"
                      style={{ background: '#1A365D' }}
                    >
                      {submitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                    <button
                      onClick={() => { setShowForm(false); setFormError('') }}
                      className="px-4 py-1.5 rounded text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Requests list */}
            {requests.length === 0 ? (
              <p className="text-sm text-gray-400 italic py-4">No leave requests submitted yet.</p>
            ) : (
              <div className="space-y-2">
                {requests.map(req => {
                  const st = STATUS_STYLES[req.status] || STATUS_STYLES.pending
                  const StIcon = st.icon
                  const LIcon = LEAVE_ICONS[req.type] || Calendar
                  return (
                    <div
                      key={req.id}
                      className="flex flex-wrap items-start gap-3 bg-white border rounded-lg px-4 py-3"
                    >
                      <div className="flex items-center gap-2 min-w-[160px]">
                        <LIcon className="w-4 h-4 text-[#C9A432]" />
                        <span className="text-sm font-medium text-gray-800">
                          {LEAVE_LABELS[req.type] || req.type}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {fmtDate(req.start_date)}
                        {req.start_date !== req.end_date && ` – ${fmtDate(req.end_date)}`}
                        <span className="ml-2 text-gray-400 text-xs">({req.days} days)</span>
                      </div>
                      <div className="flex-1" />
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${st.cls}`}>
                        <StIcon className="w-3 h-3" />{st.label}
                      </span>
                      {req.notes && (
                        <p className="w-full text-xs text-gray-400 italic mt-0.5">{req.notes}</p>
                      )}
                      {req.admin_note && (
                        <p className="w-full text-xs text-gray-500 mt-0.5">
                          <span className="font-medium">Admin note:</span> {req.admin_note}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Payslips tab ───────────────────────────────────────────────────── */}
        {tab === 'payslips' && (
          <div className="space-y-2">
            {payslips.length === 0 ? (
              <p className="text-sm text-gray-400 italic py-4">No payslips available yet.</p>
            ) : (
              payslips.map(p => (
                <button
                  key={p.file}
                  onClick={() => openPayslip(p.file)}
                  className="w-full flex items-center justify-between bg-white border rounded-lg px-4 py-3 hover:bg-gray-50 transition group"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#C9A432]" />
                    <span className="text-sm font-medium text-gray-800">{p.label}</span>
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-[#1A365D] flex items-center gap-1">
                    View payslip <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              ))
            )}
          </div>
        )}

      </div>
    </>
  )
}
