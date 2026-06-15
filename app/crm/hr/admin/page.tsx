'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { CrmHeader } from '@/components/crm/crm-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Users, Clock, CheckCircle2, XCircle, RefreshCw,
  AlertCircle, Sun, Stethoscope, TimerOff, Hourglass,
  Calendar, ChevronLeft, Edit2, Save,
} from 'lucide-react'

const ALEXANDER_EMAIL = 'alexander.papacosta@lighthief.com'
const CURRENT_YEAR = new Date().getFullYear()

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

interface Balance {
  employee_email: string
  year: number
  annual_entitlement: number
  annual_taken: number
  sick_taken: number
  unpaid_taken: number
  overtime_accrued: number
  toil_taken: number
}

interface LeaveRequest {
  id: string
  employee_email: string
  type: string
  start_date: string
  end_date: string
  days: number
  notes?: string
  status: string
  admin_note?: string
  created_at: string
}

interface Employee {
  id: string
  name: string
  email: string
  balance: Balance | null
  requests: LeaveRequest[]
  pendingCount: number
}

interface AdminData {
  employees: Employee[]
  pendingRequests: LeaveRequest[]
  year: number
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function nameFromEmail(email: string, employees: Employee[]) {
  return employees.find(e => e.email === email)?.name || email
}

export default function HrAdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [data, setData] = useState<AdminData | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'pending' | 'employees'>('pending')
  const [year, setYear] = useState(CURRENT_YEAR)

  // Approve/reject state
  const [actioning, setActioning] = useState<string | null>(null)
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({})

  // Edit balance state
  const [editingBalance, setEditingBalance] = useState<string | null>(null) // email
  const [balanceEdits, setBalanceEdits] = useState<Record<string, Record<string, string>>>({})
  const [savingBalance, setSavingBalance] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) { router.push('/crm/login'); return }
    if (session.user?.email !== ALEXANDER_EMAIL) { router.push('/crm/hr'); return }
  }, [session, status, router])

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/crm/hr/admin?year=${year}`)
    if (res.ok) setData(await res.json())
    setLoading(false)
  }, [year])

  useEffect(() => {
    if (status === 'authenticated') load()
  }, [load, status])

  const handleAction = async (requestId: string, action: 'approve' | 'reject') => {
    setActioning(requestId)
    await fetch('/api/crm/hr/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action,
        requestId,
        admin_note: adminNotes[requestId] || undefined,
      }),
    })
    setActioning(null)
    load()
  }

  const startEditBalance = (email: string, balance: Balance | null) => {
    setEditingBalance(email)
    setBalanceEdits(prev => ({
      ...prev,
      [email]: {
        annual_entitlement: String(balance?.annual_entitlement ?? 20),
        annual_taken:       String(balance?.annual_taken ?? 0),
        sick_taken:         String(balance?.sick_taken ?? 0),
        unpaid_taken:       String(balance?.unpaid_taken ?? 0),
        overtime_accrued:   String(balance?.overtime_accrued ?? 0),
        toil_taken:         String(balance?.toil_taken ?? 0),
      },
    }))
  }

  const saveBalance = async (email: string) => {
    const edits = balanceEdits[email]
    if (!edits) return
    setSavingBalance(email)
    for (const [field, value] of Object.entries(edits)) {
      await fetch('/api/crm/hr/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'adjust_balance',
          employee_email: email,
          year,
          field,
          value,
        }),
      })
    }
    setSavingBalance(null)
    setEditingBalance(null)
    load()
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="w-6 h-6 animate-spin text-[#1A365D]" />
      </div>
    )
  }

  if (!data) return null

  const { employees, pendingRequests } = data

  return (
    <>
      <CrmHeader activeNav="hr" />

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-[#1A365D] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#C9A432]" />
              HR Admin
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">Manage team leave and payroll records</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push('/crm/hr')}
              className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded border text-gray-600 hover:bg-gray-50 transition"
            >
              <ChevronLeft className="w-3 h-3" /> My HR
            </button>
            <select
              value={year}
              onChange={e => setYear(parseInt(e.target.value))}
              className="border rounded px-2 py-1.5 text-sm text-gray-700"
            >
              {[CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <button
              onClick={load}
              className="p-1.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-500"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Total employees', val: employees.length, icon: Users, color: 'text-gray-700' },
            { label: 'Pending requests', val: pendingRequests.length, icon: Clock, color: 'text-amber-600' },
            { label: 'Approved this year', val: employees.reduce((s, e) => s + e.requests.filter(r => r.status === 'approved').length, 0), icon: CheckCircle2, color: 'text-emerald-600' },
            { label: 'Rejected', val: employees.reduce((s, e) => s + e.requests.filter(r => r.status === 'rejected').length, 0), icon: XCircle, color: 'text-red-400' },
          ].map(({ label, val, icon: Icon, color }) => (
            <div key={label} className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-gray-500">{label}</p>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <p className={`text-2xl font-bold ${color}`}>{val}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b">
          {[
            { key: 'pending', label: 'Pending Requests', count: pendingRequests.length },
            { key: 'employees', label: 'All Employees' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as 'pending' | 'employees')}
              className={`px-4 py-2 text-sm font-medium transition border-b-2 -mb-px flex items-center gap-1.5 ${
                tab === t.key
                  ? 'border-[#1A365D] text-[#1A365D]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.label}
              {t.count != null && t.count > 0 && (
                <span className="bg-amber-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Pending requests tab ────────────────────────────────────────────── */}
        {tab === 'pending' && (
          <div className="space-y-3">
            {pendingRequests.length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-gray-400 italic py-4">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                No pending requests — all up to date.
              </div>
            ) : (
              pendingRequests.map(req => {
                const LIcon = LEAVE_ICONS[req.type] || Calendar
                return (
                  <Card key={req.id}>
                    <CardContent className="pt-4 space-y-3">
                      <div className="flex flex-wrap items-start gap-3">
                        <div className="flex items-center gap-2">
                          <LIcon className="w-4 h-4 text-[#C9A432]" />
                          <span className="font-medium text-sm text-gray-900">
                            {nameFromEmail(req.employee_email, employees)}
                          </span>
                          <span className="text-xs text-gray-400">{req.employee_email}</span>
                        </div>
                        <div className="flex-1" />
                        <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 rounded-full px-2 py-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <p className="text-xs text-gray-400">Leave type</p>
                          <p className="font-medium">{LEAVE_LABELS[req.type] || req.type}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">From</p>
                          <p className="font-medium">{fmtDate(req.start_date)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">To</p>
                          <p className="font-medium">{fmtDate(req.end_date)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Days</p>
                          <p className="font-medium">{req.days}</p>
                        </div>
                      </div>

                      {req.notes && (
                        <p className="text-xs text-gray-500 italic bg-gray-50 rounded px-2 py-1">
                          &ldquo;{req.notes}&rdquo;
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-2">
                        <input
                          type="text"
                          placeholder="Admin note (optional)..."
                          className="flex-1 min-w-[200px] border rounded px-2 py-1.5 text-xs"
                          value={adminNotes[req.id] || ''}
                          onChange={e => setAdminNotes(prev => ({ ...prev, [req.id]: e.target.value }))}
                        />
                        <button
                          onClick={() => handleAction(req.id, 'approve')}
                          disabled={actioning === req.id}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 transition"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {actioning === req.id ? 'Saving...' : 'Approve'}
                        </button>
                        <button
                          onClick={() => handleAction(req.id, 'reject')}
                          disabled={actioning === req.id}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 transition"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          {actioning === req.id ? 'Saving...' : 'Reject'}
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        )}

        {/* ── All employees tab ───────────────────────────────────────────────── */}
        {tab === 'employees' && (
          <div className="space-y-4">
            {employees.map(emp => {
              const bal = emp.balance
              const isEditing = editingBalance === emp.email
              const edits = balanceEdits[emp.email] || {}
              const isSaving = savingBalance === emp.email

              const balFields = [
                { key: 'annual_entitlement', label: 'Entitlement', icon: Sun },
                { key: 'annual_taken',        label: 'Annual taken', icon: Sun },
                { key: 'sick_taken',          label: 'Sick taken', icon: Stethoscope },
                { key: 'unpaid_taken',        label: 'Unpaid taken', icon: TimerOff },
                { key: 'overtime_accrued',    label: 'OT accrued', icon: Hourglass },
                { key: 'toil_taken',          label: 'TOIL taken', icon: Hourglass },
              ] as const

              return (
                <Card key={emp.email}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#C9A432]" />
                        {emp.name}
                        <span className="text-xs text-gray-400 font-normal">{emp.email}</span>
                      </span>
                      <div className="flex items-center gap-2">
                        {emp.pendingCount > 0 && (
                          <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 rounded-full px-2 py-0.5">
                            {emp.pendingCount} pending
                          </span>
                        )}
                        {!isEditing ? (
                          <button
                            onClick={() => startEditBalance(emp.email, bal)}
                            className="flex items-center gap-1 text-xs px-2 py-1 rounded border text-gray-600 hover:bg-gray-50 transition"
                          >
                            <Edit2 className="w-3 h-3" /> Edit balances
                          </button>
                        ) : (
                          <div className="flex gap-1">
                            <button
                              onClick={() => saveBalance(emp.email)}
                              disabled={isSaving}
                              className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-[#1A365D] text-white disabled:opacity-50 transition"
                            >
                              <Save className="w-3 h-3" /> {isSaving ? 'Saving...' : 'Save'}
                            </button>
                            <button
                              onClick={() => setEditingBalance(null)}
                              className="flex items-center gap-1 text-xs px-2 py-1 rounded border text-gray-600 hover:bg-gray-50 transition"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* Balance grid */}
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                      {balFields.map(f => {
                        const currentVal = bal ? (bal as unknown as Record<string, number>)[f.key] ?? 0 : 0
                        const BIcon = f.icon
                        return (
                          <div key={f.key} className="bg-gray-50 border rounded p-2 space-y-1">
                            <p className="text-xs text-gray-400 flex items-center gap-1">
                              <BIcon className="w-3 h-3" /> {f.label}
                            </p>
                            {isEditing ? (
                              <input
                                type="number"
                                min="0"
                                step="0.5"
                                className="w-full border rounded px-1.5 py-1 text-sm font-medium"
                                value={edits[f.key] ?? String(currentVal)}
                                onChange={e => setBalanceEdits(prev => ({
                                  ...prev,
                                  [emp.email]: { ...(prev[emp.email] || {}), [f.key]: e.target.value },
                                }))}
                              />
                            ) : (
                              <p className="text-sm font-bold text-gray-800">{currentVal}</p>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {/* Annual leave progress bar */}
                    {bal && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Annual leave used: {bal.annual_taken} / {bal.annual_entitlement} days</span>
                          <span className="font-medium text-[#1A365D]">
                            {bal.annual_entitlement - bal.annual_taken} remaining
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              bal.annual_taken / bal.annual_entitlement >= 0.9
                                ? 'bg-red-500'
                                : bal.annual_taken / bal.annual_entitlement >= 0.6
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.min(100, Math.round((bal.annual_taken / bal.annual_entitlement) * 100))}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Recent requests */}
                    {emp.requests.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Leave history</p>
                        <div className="divide-y">
                          {emp.requests.slice(0, 5).map(req => {
                            const LIcon = LEAVE_ICONS[req.type] || Calendar
                            const statusColors: Record<string, string> = {
                              pending: 'text-amber-600',
                              approved: 'text-emerald-600',
                              rejected: 'text-red-500',
                            }
                            return (
                              <div key={req.id} className="flex items-center gap-2 py-1.5 text-sm">
                                <LIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                <span className="flex-1 text-gray-700">
                                  {LEAVE_LABELS[req.type]} · {fmtDate(req.start_date)}
                                  {req.start_date !== req.end_date && ` – ${fmtDate(req.end_date)}`}
                                  <span className="text-gray-400 text-xs ml-1">({req.days}d)</span>
                                </span>
                                <span className={`text-xs font-medium ${statusColors[req.status] || 'text-gray-400'}`}>
                                  {req.status}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        <p className="text-xs text-gray-400 text-center pb-4">
          HR Admin · Alexander only · Cyprus Annual Holidays with Pay Law (Cap. 8)
        </p>
      </div>
    </>
  )
}
