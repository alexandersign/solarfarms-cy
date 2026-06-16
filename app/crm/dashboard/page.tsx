'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { CrmHeader } from '@/components/crm/crm-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  BarChart3, Phone, Mail, MessageSquare, RefreshCw,
  TrendingUp, DollarSign, Target, Award, Calendar, Users, ArrowUpDown,
} from 'lucide-react'

const ALEXANDER_EMAIL = 'alexander.papacosta@lighthief.com'

// Stage probability defaults for display
const STAGE_PROB: Record<string, number> = {
  new: 5, researching: 10, contacted: 20, responded: 35,
  meeting_set: 50, proposal_sent: 65, negotiating: 80,
  won: 100, lost: 0, not_interested: 0,
}

const STAGE_COLOR: Record<string, string> = {
  new: '#94a3b8', researching: '#60a5fa', contacted: '#fbbf24',
  responded: '#34d399', meeting_set: '#a78bfa', proposal_sent: '#818cf8',
  negotiating: '#fb923c', won: '#10b981', lost: '#f87171', not_interested: '#d1d5db',
}

function formatCurrency(v: number): string {
  if (v >= 1000000) return `€${(v / 1000000).toFixed(1)}M`
  if (v >= 1000) return `€${(v / 1000).toFixed(0)}k`
  return `€${Math.round(v).toLocaleString()}`
}

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function relativeTime(ts: string | null): string {
  if (!ts) return '—'
  const diff = Date.now() - new Date(ts).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

interface ActivityUser {
  author: string
  calls: number
  emails: number
  notes: number
  statusChanges: number
  lastActive: string | null
  callTarget?: number
  callPct?: number
}

interface StageRow {
  stage: string
  count: number
  totalDealValue: number
  weightedValue: number
}

interface DealRow {
  id: string
  company_name?: string
  outreach_status?: string
  offer_type?: string
  estimated_deal_value?: number
  assigned_name?: string
  assigned_to?: string
  close_probability: number
  expected_close_date?: string
  last_contact_date?: string
  days_since_contact: number | null
  segment?: string
  district?: string
  weighted_value: number
}

interface DashData {
  activitySummary: ActivityUser[]
  pipelineByStage: StageRow[]
  deals: DealRow[]
  totals: { total: number; active: number; won: number; totalPipeline: number; weightedPipeline: number }
  range: string
}

export default function CrmDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [data, setData] = useState<DashData | null>(null)
  const [loading, setLoading] = useState(true)
  const [range, setRange] = useState<'today' | 'week' | 'month'>('week')
  const [saving, setSaving] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (status === 'loading') return
    if (!session) { router.push('/crm/login'); return }
    if (session.user?.email !== ALEXANDER_EMAIL) { router.push('/crm'); return }
  }, [session, status, router])

  const load = useCallback(async () => {
    setLoading(true)
    const r = await fetch(`/api/crm/dashboard?range=${range}`)
    const d = await r.json()
    setData(d)
    setLoading(false)
  }, [range])

  useEffect(() => { if (status === 'authenticated') load() }, [load, status])

  // Inline patch for deal probability + close date
  const patchDeal = async (id: string, field: 'close_probability' | 'expected_close_date', value: unknown) => {
    setSaving(prev => ({ ...prev, [id]: true }))
    await fetch('/api/crm/prospects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, [field]: value }),
    })
    setSaving(prev => ({ ...prev, [id]: false }))
    // Optimistic update in local state
    setData(prev => {
      if (!prev) return prev
      return {
        ...prev,
        deals: prev.deals.map(d => d.id === id ? { ...d, [field]: value } : d),
      }
    })
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="w-6 h-6 animate-spin text-[#1A365D]" />
      </div>
    )
  }

  if (!data) return null

  const { activitySummary, pipelineByStage, deals, totals } = data

  const OFFER_LABELS: Record<string, string> = {
    bess_retrofit: 'BESS Retrofit', epc: 'EPC', o_and_m: 'O&M',
    rooftop_pv: 'Rooftop PV', acquisition: 'Acquisition', partnership: 'Partnership',
  }

  return (
    <>
      <CrmHeader activeNav="dashboard" />

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* Top KPIs */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-bold text-[#1A365D] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#C9A432]" />Sales Dashboard
          </h1>
          <div className="flex gap-1">
            {(['today', 'week', 'month'] as const).map(r => (
              <button key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1 rounded text-sm font-medium transition ${
                  range === r ? 'bg-[#1A365D] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {r === 'today' ? 'Today' : r === 'week' ? 'This week' : 'This month'}
              </button>
            ))}
            <button onClick={load} className="ml-2 p-1.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-500" title="Refresh">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Total prospects', val: totals.total, icon: Users, color: 'text-gray-700' },
            { label: 'Active pipeline', val: totals.active, icon: Target, color: 'text-green-600' },
            { label: 'Pipeline value', val: formatCurrency(totals.totalPipeline), icon: DollarSign, color: 'text-blue-600' },
            { label: 'Weighted forecast', val: formatCurrency(totals.weightedPipeline), icon: TrendingUp, color: 'text-indigo-600' },
            { label: 'Won', val: totals.won, icon: Award, color: 'text-emerald-600' },
          ].map(({ label, val, icon: Icon, color }) => (
            <Card key={label}>
              <CardContent className="pt-4 pb-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-gray-500">{label}</p>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <p className={`text-2xl font-bold ${color}`}>{val}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section A — Team activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-[#C9A432]" />Team Activity
              <span className="text-xs text-gray-400 font-normal ml-1">
                ({range === 'today' ? 'today' : range === 'week' ? 'last 7 days' : 'this month'})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activitySummary.length === 0 ? (
              <p className="text-sm text-gray-400 italic">No activity recorded in this period.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 text-xs text-gray-500 font-medium">Salesperson</th>
                    <th className="text-center py-2 px-3 text-xs text-gray-500 font-medium"><Phone className="w-3 h-3 inline mr-1"/>Calls</th>
                    <th className="text-center py-2 px-3 text-xs text-gray-500 font-medium">Target</th>
                    <th className="text-center py-2 px-3 text-xs text-gray-500 font-medium">Progress</th>
                    <th className="text-center py-2 px-3 text-xs text-gray-500 font-medium"><Mail className="w-3 h-3 inline mr-1"/>Emails</th>
                    <th className="text-center py-2 px-3 text-xs text-gray-500 font-medium"><MessageSquare className="w-3 h-3 inline mr-1"/>Notes</th>
                    <th className="text-center py-2 px-3 text-xs text-gray-500 font-medium"><ArrowUpDown className="w-3 h-3 inline mr-1"/>Status chg</th>
                    <th className="text-right py-2 px-3 text-xs text-gray-500 font-medium">Last active</th>
                  </tr>
                </thead>
                <tbody>
                  {activitySummary.map(u => {
                    const target = u.callTarget ?? 10
                    const pct = u.callPct ?? Math.min(100, Math.round((u.calls / target) * 100))
                    const done = u.calls >= target
                    return (
                      <tr key={u.author} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="py-2.5 px-3 font-medium text-gray-800">{u.author}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`font-semibold ${done ? 'text-emerald-600' : u.calls > 0 ? 'text-blue-600' : 'text-gray-300'}`}>{u.calls}</span>
                        </td>
                        <td className="py-2.5 px-3 text-center text-gray-500">{target}</td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-1.5">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className={`h-2 rounded-full ${done ? 'bg-emerald-500' : 'bg-[#1A365D]'}`} style={{ width: `${pct}%` }}/>
                            </div>
                            <span className={`text-xs font-medium w-8 text-right ${done ? 'text-emerald-600' : 'text-gray-500'}`}>{pct}%</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`font-semibold ${u.emails > 0 ? 'text-emerald-600' : 'text-gray-300'}`}>{u.emails}</span>
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`font-semibold ${u.notes > 0 ? 'text-amber-600' : 'text-gray-300'}`}>{u.notes}</span>
                        </td>
                        <td className="py-2.5 px-3 text-center text-gray-600">{u.statusChanges}</td>
                        <td className="py-2.5 px-3 text-right text-gray-400 text-xs">{relativeTime(u.lastActive)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>

        {/* Section B — Pipeline by stage */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#C9A432]" />Pipeline by Stage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pipelineByStage.filter(s => !['won','lost','not_interested'].includes(s.stage)).map(row => {
                const maxCount = Math.max(...pipelineByStage.map(r => r.count), 1)
                const pct = Math.round((row.count / maxCount) * 100)
                const color = STAGE_COLOR[row.stage] || '#94a3b8'
                return (
                  <div key={row.stage} className="grid grid-cols-[140px_1fr_120px_120px] items-center gap-3">
                    <span className="text-sm text-gray-700 capitalize font-medium">
                      {row.stage.replace(/_/g, ' ')}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
                      </div>
                      <span className="text-xs text-gray-500 w-8 text-right">{row.count}</span>
                    </div>
                    <span className="text-sm text-right text-gray-600">{row.totalDealValue > 0 ? formatCurrency(row.totalDealValue) : '—'}</span>
                    <span className="text-sm text-right text-indigo-600 font-medium">{row.weightedValue > 0 ? formatCurrency(row.weightedValue) : '—'}</span>
                  </div>
                )
              })}
              <div className="grid grid-cols-[140px_1fr_120px_120px] items-center gap-3 pt-1 border-t">
                <span className="text-xs text-gray-400">Won / Lost</span>
                <div />
                <span className="text-sm text-right text-gray-400">
                  {pipelineByStage.filter(s=>s.stage==='won').map(s=>s.count)[0]||0} won ·{' '}
                  {pipelineByStage.filter(s=>s.stage==='lost').map(s=>s.count)[0]||0} lost
                </span>
                <span />
              </div>
            </div>
            <div className="flex justify-end gap-6 mt-4 pt-3 border-t text-xs text-gray-400">
              <span>Total value column</span>
              <span className="text-indigo-600">Weighted forecast column</span>
            </div>
          </CardContent>
        </Card>

        {/* Section C — Deals table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#C9A432]" />Open Deals
              <Badge variant="outline" className="text-xs">{deals.length} offers</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {deals.length === 0 ? (
              <p className="text-sm text-gray-400 italic">No proposals or negotiations in progress.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[900px]">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-2 px-3 text-xs text-gray-500 font-medium">Company</th>
                      <th className="text-left py-2 px-3 text-xs text-gray-500 font-medium">Stage</th>
                      <th className="text-left py-2 px-3 text-xs text-gray-500 font-medium">Offer type</th>
                      <th className="text-right py-2 px-3 text-xs text-gray-500 font-medium">Deal value</th>
                      <th className="text-center py-2 px-3 text-xs text-gray-500 font-medium">Probability %</th>
                      <th className="text-right py-2 px-3 text-xs text-gray-500 font-medium">Weighted</th>
                      <th className="text-center py-2 px-3 text-xs text-gray-500 font-medium">Close by</th>
                      <th className="text-center py-2 px-3 text-xs text-gray-500 font-medium">Last contact</th>
                      <th className="text-left py-2 px-3 text-xs text-gray-500 font-medium">Assigned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deals.map(deal => {
                      const stageColor = STAGE_COLOR[deal.outreach_status || 'new']
                      const isSaving = saving[deal.id]
                      const daysOld = deal.days_since_contact
                      const overdue = daysOld != null && daysOld > 14
                      return (
                        <tr key={deal.id} className="border-b last:border-0 hover:bg-gray-50">
                          <td className="py-2.5 px-3">
                            <div className="font-medium text-gray-900 max-w-[200px] truncate">{deal.company_name}</div>
                            {deal.district && <div className="text-xs text-gray-400">{deal.district}</div>}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium text-white"
                              style={{ background: stageColor }}>
                              {(deal.outreach_status || '').replace(/_/g, ' ')}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-gray-600 text-xs">
                            {OFFER_LABELS[deal.offer_type || ''] || deal.offer_type || '—'}
                          </td>
                          <td className="py-2.5 px-3 text-right font-medium text-gray-800">
                            {deal.estimated_deal_value ? formatCurrency(deal.estimated_deal_value) : '—'}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <input
                                type="number" min={0} max={100}
                                className={`w-14 border rounded text-center text-sm py-0.5 ${isSaving ? 'opacity-50' : ''}`}
                                value={deal.close_probability}
                                onChange={e => {
                                  const v = Math.max(0, Math.min(100, parseInt(e.target.value) || 0))
                                  setData(prev => prev ? {
                                    ...prev,
                                    deals: prev.deals.map(d => d.id === deal.id ? { ...d, close_probability: v } : d)
                                  } : prev)
                                }}
                                onBlur={e => patchDeal(deal.id, 'close_probability', parseInt(e.target.value) || 0)}
                              />
                              <span className="text-xs text-gray-400">%</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-right text-indigo-600 font-medium">
                            {deal.estimated_deal_value ? formatCurrency(deal.weighted_value) : '—'}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <input
                              type="date"
                              className={`border rounded text-xs py-0.5 px-1 ${isSaving ? 'opacity-50' : ''}`}
                              value={deal.expected_close_date || ''}
                              onChange={e => patchDeal(deal.id, 'expected_close_date', e.target.value || null)}
                            />
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            {deal.last_contact_date ? (
                              <div className="flex flex-col items-center">
                                <span className="text-xs text-gray-600">{formatDate(deal.last_contact_date)}</span>
                                {daysOld != null && (
                                  <span className={`text-xs ${overdue ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
                                    {daysOld}d ago{overdue ? ' ⚠' : ''}
                                  </span>
                                )}
                              </div>
                            ) : '—'}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="text-xs text-gray-600">{deal.assigned_name || '—'}</span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                  {deals.length > 0 && (
                    <tfoot>
                      <tr className="bg-gray-50 border-t-2">
                        <td colSpan={3} className="py-2 px-3 text-xs font-medium text-gray-500">Total</td>
                        <td className="py-2 px-3 text-right font-bold text-gray-800">
                          {formatCurrency(deals.reduce((s, d) => s + (d.estimated_deal_value || 0), 0))}
                        </td>
                        <td />
                        <td className="py-2 px-3 text-right font-bold text-indigo-600">
                          {formatCurrency(deals.reduce((s, d) => s + d.weighted_value, 0))}
                        </td>
                        <td colSpan={3} />
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-xs text-gray-400 text-center pb-4">
          Dashboard visible to Alexander only · Lighthief CRM
        </p>
      </div>
    </>
  )
}
