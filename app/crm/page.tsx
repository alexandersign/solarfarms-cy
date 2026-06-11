'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { CrmHeader } from '@/components/crm/crm-header'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Users, Search, Plus, RefreshCw, ExternalLink, Download, Filter,
  Building, MapPin, Phone, Mail, Linkedin, Globe, Calendar, DollarSign,
  Zap, Target, ChevronDown, ChevronUp, Edit, Trash2, CheckCircle, XCircle,
  Clock, AlertCircle, BarChart3, FileText, Copy, UserCheck,
  Send, Eye, MailCheck, MessageSquare, ArrowUpDown, Folder, PhoneCall,
  X, Save, ListTodo, Square, CheckSquare, Inbox,
} from 'lucide-react'
import type { PvProspect, ActivityEntry, CrmTask, CrmTaskType } from '@/lib/supabase'
import { CRM_USERS } from '@/lib/crm-users'
import { normalizeRoofImageUrl } from '@/lib/crm-prospect-search'
import { getDailyCallTarget } from '@/lib/crm-targets'
import {
  getQualifyingQuestions, questionsByPhase,
  SPIN_PHASE_LABELS, PROGRESS_LABELS,
  type SpinPhase, type CallProgress, type SpinCallData,
} from '@/lib/crm-qualifying-questions'

// ─── Constants ────────────────────────────────────────────────────────────────

const OUTREACH_STATUSES = [
  { value: 'new',            label: 'New',           color: 'bg-gray-100 text-gray-800'    },
  { value: 'researching',    label: 'Researching',   color: 'bg-blue-100 text-blue-800'    },
  { value: 'contacted',      label: 'Contacted',     color: 'bg-yellow-100 text-yellow-800' },
  { value: 'responded',      label: 'Responded',     color: 'bg-green-100 text-green-800'  },
  { value: 'meeting_set',    label: 'Meeting Set',   color: 'bg-purple-100 text-purple-800' },
  { value: 'proposal_sent',  label: 'Proposal Sent', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'negotiating',    label: 'Negotiating',   color: 'bg-orange-100 text-orange-800' },
  { value: 'won',            label: 'Won',           color: 'bg-emerald-100 text-emerald-800'},
  { value: 'lost',           label: 'Lost',          color: 'bg-red-100 text-red-800'      },
  { value: 'not_interested', label: 'Not Interested',color: 'bg-slate-100 text-slate-800'  },
]

const PRIORITIES = [
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800'    },
  { value: 'high',   label: 'High',   color: 'bg-orange-100 text-orange-800'},
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800'},
  { value: 'low',    label: 'Low',    color: 'bg-gray-100 text-gray-800'   },
]

const OFFER_TYPES = [
  { value: 'bess_retrofit', label: 'BESS Retrofit'  },
  { value: 'acquisition',   label: 'Acquisition'    },
  { value: 'epc',           label: 'EPC Services'   },
  { value: 'o_and_m',       label: 'O&M Services'   },
  { value: 'rooftop_pv',    label: 'Rooftop PV'     },
  { value: 'partnership',   label: 'Partnership'    },
  { value: 'consulting',    label: 'Consulting'     },
]

const RTB_STAGES = [
  { value: 'operational',        label: 'Operational' },
  { value: 'under_construction', label: 'Under construction' },
  { value: 'mixed',              label: 'Mixed portfolio' },
]

const BUILT_STAGES = [
  { value: 'built',           label: 'Built' },
  { value: 'partially_built', label: 'Partially built' },
  { value: 'not_built',       label: 'Not built' },
  { value: 'unknown',         label: 'Unknown' },
]

const DISTRICTS    = ['Nicosia', 'Limassol', 'Larnaca', 'Paphos', 'Famagusta']
const TECHNOLOGIES = ['PV', 'Wind', 'Biomass', 'BESS', 'Hybrid', 'CSP']
const DATA_SOURCES = [
  { value: 'cera',             label: 'CERA Licensing Archive' },
  { value: 'company_register', label: 'Cyprus Company Register' },
  { value: 'linkedin',         label: 'LinkedIn' },
  { value: 'referral',         label: 'Referral' },
  { value: 'web_research',     label: 'Web Research' },
  { value: 'conference',       label: 'Conference / Event' },
  { value: 'tsoc',             label: 'TSOC / DSO' },
]
const PLANT_STATUSES = [
  { value: 'operational',       label: 'Operational'        },
  { value: 'under_construction',label: 'Under Construction' },
  { value: 'licensed',          label: 'Licensed'           },
  { value: 'planned',           label: 'Planned'            },
  { value: 'decommissioned',    label: 'Decommissioned'     },
]

// Developer folder groups (derived from offer_type + BESS)
const DEV_FOLDERS = [
  { id: 'pv_epc',    label: 'PV EPC',          match: (p: ProspectFull) => p.offer_type === 'epc' && !p.bess_potential_mwh  },
  { id: 'pv_bess',   label: 'PV + BESS EPC',   match: (p: ProspectFull) => p.offer_type === 'epc' && !!p.bess_potential_mwh },
  { id: 'pv_om',     label: 'PV O&M',          match: (p: ProspectFull) => p.offer_type === 'o_and_m' },
  { id: 'bess',      label: 'BESS',            match: (p: ProspectFull) => p.offer_type === 'bess_retrofit' },
  { id: 'other_dev', label: 'Other',           match: (p: ProspectFull) => !['epc','o_and_m','bess_retrofit'].includes(p.offer_type||'') },
]

// Commercial industries (map from industry column)
const COMMERCIAL_INDUSTRIES = [
  'Warehouse / Logistics','Hotel / Hospitality','Clinic / Medical','Supermarket / Retail',
  'Factory / Manufacturing','Car Dealership','Gym / Sports','Restaurant / Café','Other',
]

const EMPTY_PROSPECT: PvProspect = {
  plant_name: '', cera_license_no: '', capacity_mwp: undefined,
  technology: 'PV', plant_status: 'operational', location: '', district: '',
  grid_connection_point: '', commissioning_date: '', curtailment_rate: undefined,
  company_name: '', company_reg_no: '', parent_group: '', registered_address: '',
  company_website: '', contact_name: '', contact_title: '', contact_email: '',
  contact_phone: '', contact_linkedin: '', secondary_contact_name: '',
  secondary_contact_title: '', secondary_contact_email: '', secondary_contact_phone: '',
  secondary_contact_linkedin: '', outreach_status: 'new', outreach_channel: '',
  first_contact_date: '', last_contact_date: '', next_follow_up: '', offer_type: '',
  estimated_deal_value: undefined, bess_potential_mwh: undefined, notes: '',
  data_source: '', tags: [], priority: 'medium',
}

// ─── Types ────────────────────────────────────────────────────────────────────

type ProspectFull = PvProspect & {
  assigned_to?: string; assigned_name?: string; segment?: string
  rtb_status?: string; satellite_check?: string; bess_sales_angle?: string
  construction_mwp?: number; operational_mwp?: number; developer_group?: string
  developer_domain?: string; email_confidence?: number; contact_director_1?: string
  roof_area_m2?: number; annual_kwh?: number; annual_savings_eur?: number
  payback_years?: number; has_existing_pv?: boolean; roof_image_url?: string
  industry?: string; activity_feed?: ActivityEntry[]; search_aliases?: string
  all_directors?: string; contact_director_2?: string
  connection_terms_status?: string; env_permit_status?: string; building_permit_status?: string
  sequence_step?: number; tasks?: CrmTask[]
  close_probability?: number; expected_close_date?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatDate = (d?: string) => {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}
const formatDateTime = (d?: string) => {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('en-EU', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

const getStatusColor = (s: string) =>
  OUTREACH_STATUSES.find(x => x.value === s)?.color || 'bg-gray-100 text-gray-800'

const getPriorityColor = (p: string) =>
  PRIORITIES.find(x => x.value === p)?.color || 'bg-gray-100 text-gray-800'

const activityIcon = (type: ActivityEntry['type']) => {
  if (type === 'note')   return <MessageSquare className="w-3 h-3" />
  if (type === 'call')   return <PhoneCall className="w-3 h-3" />
  if (type === 'email')  return <Mail className="w-3 h-3" />
  if (type === 'status') return <CheckCircle className="w-3 h-3" />
  if (type === 'assign') return <UserCheck className="w-3 h-3" />
  return <Clock className="w-3 h-3" />
}

// ─── Inline editable field component ─────────────────────────────────────────

function InlineEdit({ label, value, onSave, href, type = 'text' }: {
  label: string; value?: string; onSave: (v: string) => void
  href?: string; type?: string
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value || '')
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => { if (editing) ref.current?.focus() }, [editing])
  const save = () => { onSave(draft); setEditing(false) }
  if (editing) {
    return (
      <div>
        <dt className="text-gray-400 text-xs">{label}</dt>
        <dd className="flex items-center gap-1">
          <input ref={ref} type={type} value={draft} onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setEditing(false) }}
            className="border rounded px-2 py-0.5 text-sm flex-1" />
          <button onClick={save} className="text-green-600 hover:text-green-700"><Save className="w-3.5 h-3.5" /></button>
          <button onClick={() => { setDraft(value||''); setEditing(false) }} className="text-gray-400"><X className="w-3.5 h-3.5" /></button>
        </dd>
      </div>
    )
  }
  return (
    <div>
      <dt className="text-gray-400 text-xs">{label}</dt>
      <dd className="flex items-center gap-1 group">
        {value
          ? href
            ? <a href={href} target={href.startsWith('http')?'_blank':'_self'} rel="noopener noreferrer" className="text-blue-600 hover:underline">{value}</a>
            : <span>{value}</span>
          : <span className="text-gray-300 italic text-xs">not set</span>}
        <button onClick={() => { setDraft(value||''); setEditing(true) }}
          className="opacity-0 group-hover:opacity-100 transition ml-1 text-gray-400 hover:text-[#1A365D]">
          <Edit className="w-3 h-3" />
        </button>
      </dd>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CrmPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [prospects,    setProspects]    = useState<ProspectFull[]>([])
  const [followUps,    setFollowUps]    = useState<ProspectFull[]>([])
  const [stats,        setStats]        = useState<{
    total: number; byStatus: Record<string,number>; byPriority: Record<string,number>;
    totalPipeline: number; totalCapacity: number; weightedPipeline?: number
  }>({ total: 0, byStatus: {}, byPriority: {}, totalPipeline: 0, totalCapacity: 0 })
  const [loading,      setLoading]      = useState(true)
  const [activeView,   setActiveView]   = useState<'list'|'pipeline'|'grid_contacts'|'data_sources'|'queue'>('list')
  const [queue,        setQueue]        = useState<{
    tasks: {prospectId:string;prospectName:string;taskId:string;taskType:string;taskText:string;due:string|null;daysSinceContact:number|null;assignedName?:string;priority:string}[]
    followUps: {prospectId:string;prospectName:string;nextFollowUp:string;assignedName?:string;daysSinceContact:number|null}[]
    stale: {prospectId:string;prospectName:string;outreachStatus:string;daysSinceContact:number;assignedName?:string;ruleText:string}[]
    callsToday: number; emailsToday: number; callTarget: number; totalActionable: number
  } | null>(null)
  const [showForm,     setShowForm]     = useState(false)
  const [editingId,    setEditingId]    = useState<string|null>(null)
  const [expandedId,   setExpandedId]   = useState<string|null>(null)
  const [formData,     setFormData]     = useState<ProspectFull>(EMPTY_PROSPECT)
  const [actionResult, setActionResult] = useState<{success:boolean;message:string}|null>(null)
  const [noteText,     setNoteText]     = useState<Record<string,string>>({})
  const [logForm,      setLogForm]      = useState<Record<string,'call'|'email'|null>>({})
  const [logText,      setLogText]      = useState<Record<string,string>>({})
  const [spinData,     setSpinData]     = useState<Record<string, Partial<SpinCallData>>>({})
  const [showSpin,     setShowSpin]     = useState<Record<string,boolean>>({})
  const [taskForm,     setTaskForm]     = useState<Record<string,{type:CrmTaskType;text:string;due:string}>>({})
  const [groupBy,      setGroupBy]      = useState(false)
  const [openFolders,  setOpenFolders]  = useState<Set<string>>(new Set(['pv_epc','pv_bess','pv_om','bess','other_dev','Other']))
  const [sortBy,       setSortBy]       = useState<'created_at'|'priority_score'|'capacity'|'last_activity'>('created_at')
  const [dragId,       setDragId]       = useState<string|null>(null)
  const [dropTarget,   setDropTarget]   = useState<string|null>(null)

  // Filters
  const [searchQuery,     setSearchQuery]     = useState('')
  const [filterStatus,    setFilterStatus]    = useState('all')
  const [filterPriority,  setFilterPriority]  = useState('all')
  const [filterDistrict,  setFilterDistrict]  = useState('all')
  const [filterOfferType, setFilterOfferType] = useState('all')
  const [filterAssigned,  setFilterAssigned]  = useState<'all'|'mine'>('all')
  const [filterNew,       setFilterNew]       = useState<'all'|'7'|'30'>('all')
  const [segment,         setSegment]         = useState<'developer'|'commercial'>('developer')
  const [filterRtb,       setFilterRtb]       = useState('all')
  const [filterBuilt,     setFilterBuilt]     = useState('all')
  const [filterTech,      setFilterTech]      = useState('all')
  const [filterBess,      setFilterBess]      = useState('all')
  const [filterIndustry,  setFilterIndustry]  = useState('all')

  // Outreach
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [sending,     setSending]     = useState(false)

  const myEmail = session?.user?.email ?? ''
  const myName  = CRM_USERS.find(u => u.email === myEmail)?.name ?? ''

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/crm/login')
  }, [status, router])

  const fetchProspects = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filterStatus    !== 'all') params.set('status',    filterStatus)
      if (filterPriority  !== 'all') params.set('priority',  filterPriority)
      if (filterDistrict  !== 'all') params.set('district',  filterDistrict)
      if (filterOfferType !== 'all') params.set('offer_type',filterOfferType)
      if (searchQuery)               params.set('search',    searchQuery)
      if (filterAssigned === 'mine' && myEmail) params.set('assigned_to', myEmail)
      if (filterNew !== 'all')       params.set('new_days',  filterNew)
      params.set('segment', segment)
      if (segment === 'developer') {
        if (filterRtb   !== 'all') params.set('rtb_status',     filterRtb)
        if (filterBuilt !== 'all') params.set('satellite_check', filterBuilt)
        if (filterTech  !== 'all') params.set('technology',      filterTech)
        if (filterBess  !== 'all') params.set('has_bess',        filterBess)
      }
      if (segment === 'commercial' && filterIndustry !== 'all') params.set('industry', filterIndustry)

      const [pRes, fRes, qRes] = await Promise.all([
        fetch(`/api/crm/prospects?${params.toString()}`),
        fetch('/api/crm/prospects/follow-ups'),
        fetch('/api/crm/prospects/queue'),
      ])
      if (pRes.ok) {
        const d = await pRes.json()
        setProspects((d.data || []) as ProspectFull[])
        setStats(d.stats || { total:0, byStatus:{}, byPriority:{}, totalPipeline:0, totalCapacity:0 })
      }
      if (fRes.ok) {
        const d = await fRes.json()
        setFollowUps((d.data || []) as ProspectFull[])
      }
      if (qRes.ok) {
        const d = await qRes.json()
        setQueue(d)
      }
    } catch {
      setActionResult({ success: false, message: 'Failed to load prospects' })
    } finally {
      setLoading(false)
    }
  }, [filterStatus, filterPriority, filterDistrict, filterOfferType, searchQuery,
      filterAssigned, filterNew, segment, filterRtb, filterBuilt, filterTech, filterBess,
      filterIndustry, myEmail])

  useEffect(() => { if (status === 'authenticated') fetchProspects() }, [fetchProspects, status])

  // ─── In-place row patch (no scroll jump) ─────────────────────────────────
  const patchRow = useCallback((id: string, updates: Partial<ProspectFull>) => {
    setProspects(ps => ps.map(p => p.id === id ? { ...p, ...updates } : p))
  }, [])

  const putRow = useCallback(async (id: string, updates: Partial<ProspectFull>) => {
    patchRow(id, updates)  // optimistic
    try {
      await fetch('/api/crm/prospects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      })
    } catch { /* revert not implemented — silent */ }
  }, [patchRow])

  // ─── CRUD ─────────────────────────────────────────────────────────────────
  const saveProspect = async () => {
    if (!formData.plant_name) { setActionResult({ success: false, message: 'Plant name required' }); return }
    try {
      const method = editingId ? 'PUT' : 'POST'
      const body   = editingId ? { ...formData, id: editingId } : formData
      const res    = await fetch('/api/crm/prospects', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const result = await res.json()
      setActionResult({ success: result.success, message: result.message })
      if (result.success) {
        setShowForm(false); setEditingId(null); setFormData(EMPTY_PROSPECT)
        if (editingId) {
          patchRow(editingId, formData)
        } else {
          fetchProspects()
        }
      }
    } catch { setActionResult({ success: false, message: 'Network error' }) }
  }

  const deleteProspect = async (id: string) => {
    if (!confirm('Delete this prospect?')) return
    try {
      const res = await fetch(`/api/crm/prospects?id=${id}`, { method: 'DELETE' })
      const result = await res.json()
      setActionResult({ success: result.success, message: result.message })
      if (result.success) setProspects(ps => ps.filter(p => p.id !== id))
    } catch { setActionResult({ success: false, message: 'Failed to delete' }) }
  }

  const quickUpdateStatus = useCallback(async (id: string, outreach_status: string) => {
    const now = new Date().toISOString()
    const updates: Partial<ProspectFull> = { outreach_status: outreach_status as PvProspect['outreach_status'] }
    if (outreach_status === 'contacted' || outreach_status === 'responded') updates.last_contact_date = now
    const existing = prospects.find(p => p.id === id)
    if (!existing?.first_contact_date && outreach_status === 'contacted') updates.first_contact_date = now
    await putRow(id, updates)
    // log activity
    fetch('/api/crm/prospects/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, type: 'status', body: `Status → ${outreach_status}` }),
    }).then(r => r.json()).then(d => {
      if (d.data?.activity_feed) patchRow(id, { activity_feed: d.data.activity_feed })
    }).catch(() => {})
  }, [prospects, putRow, patchRow])

  const assignProspect = useCallback(async (id: string, email: string) => {
    const user = CRM_USERS.find(u => u.email === email)
    await putRow(id, { assigned_to: email || undefined, assigned_name: user?.name || undefined })
    if (email) {
      fetch('/api/crm/prospects/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type: 'assign', body: `Assigned to ${user?.name || email}` }),
      }).then(r => r.json()).then(d => {
        if (d.data?.activity_feed) patchRow(id, { activity_feed: d.data.activity_feed })
      }).catch(() => {})
    }
  }, [putRow, patchRow])

  const addNote = async (id: string, type: ActivityEntry['type'] = 'note') => {
    const text = noteText[id]?.trim()
    if (!text) return
    const res = await fetch('/api/crm/prospects/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, type, body: text }),
    })
    const d = await res.json()
    if (d.success) {
      setNoteText(prev => ({ ...prev, [id]: '' }))
      patchRow(id, { activity_feed: d.data.activity_feed, last_contact_date: d.data.last_contact_date })
    }
  }

  /** Submit a quick call/email log — embeds SPIN data when phase is selected. */
  const submitLog = async (id: string, type: 'call' | 'email') => {
    const rawText = (logText[id] || '').trim() || (type === 'call' ? 'Call logged' : 'Email logged')
    const spin = spinData[id]
    // Build structured body when SPIN phase is set
    let body: string
    if (type === 'call' && spin?.spin_phase) {
      const structured: SpinCallData = {
        spin_phase: spin.spin_phase as SpinPhase,
        progress:   (spin.progress as CallProgress) || 'hold',
        summary:    rawText,
        answers:    spin.answers || {},
        next_action: spin.next_action,
      }
      body = JSON.stringify(structured)
    } else {
      body = rawText
    }
    setLogForm(prev => ({ ...prev, [id]: null }))
    setLogText(prev => ({ ...prev, [id]: '' }))
    setSpinData(prev => ({ ...prev, [id]: {} }))
    setShowSpin(prev => ({ ...prev, [id]: false }))
    const res = await fetch('/api/crm/prospects/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, type, body }),
    })
    const d = await res.json()
    if (d.success) patchRow(id, { activity_feed: d.data.activity_feed, last_contact_date: d.data.last_contact_date })
  }

  // ─── Tasks ────────────────────────────────────────────────────────────────
  const addTask = async (id: string) => {
    const f = taskForm[id]
    if (!f?.text?.trim()) return
    const res = await fetch('/api/crm/prospects/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, type: f.type || 'other', text: f.text.trim(), due: f.due || undefined }),
    })
    const d = await res.json()
    if (d.success) {
      setTaskForm(prev => ({ ...prev, [id]: { type: 'call', text: '', due: '' } }))
      patchRow(id, { tasks: d.data })
    }
  }

  const completeTask = async (prospectId: string, taskId: string, done: boolean) => {
    const res = await fetch('/api/crm/prospects/tasks', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: prospectId, taskId, done }),
    })
    const d = await res.json()
    if (d.success) patchRow(prospectId, { tasks: d.data })
  }

  const deleteTask = async (prospectId: string, taskId: string) => {
    const res = await fetch('/api/crm/prospects/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: prospectId, taskId }),
    })
    const d = await res.json()
    if (d.success) patchRow(prospectId, { tasks: d.data })
  }

  // ─── DnD pipeline ─────────────────────────────────────────────────────────
  const handleDrop = useCallback((stage: string) => {
    if (dragId && stage !== dropTarget) {
      quickUpdateStatus(dragId, stage)
    }
    setDragId(null); setDropTarget(null)
  }, [dragId, dropTarget, quickUpdateStatus])

  // ─── Outreach helpers ─────────────────────────────────────────────────────
  const toggleSelect = (id: string) => {
    setSelectedIds(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n })
  }

  const currentFilter = () => {
    const f: Record<string,string> = { segment }
    if (filterStatus    !== 'all') f.status    = filterStatus
    if (filterDistrict  !== 'all') f.district  = filterDistrict
    if (filterOfferType !== 'all') f.offer_type= filterOfferType
    if (searchQuery) f.search = searchQuery
    if (filterAssigned === 'mine' && myEmail) f.assigned_to = myEmail
    if (segment === 'developer') {
      if (filterRtb   !== 'all') f.rtb_status    = filterRtb
      if (filterBuilt !== 'all') f.satellite_check= filterBuilt
      if (filterTech  !== 'all') f.technology     = filterTech
      if (filterBess  !== 'all') f.has_bess       = filterBess
    }
    return f
  }

  const runOutreach = async (payload: Record<string,unknown>, confirmMsg?: string) => {
    if (confirmMsg && !confirm(confirmMsg)) return
    setSending(true)
    try {
      const res = await fetch('/api/crm/send-outreach', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const result = await res.json()
      setActionResult({ success: result.success, message: result.message })
      if (result.success && !payload.test) setSelectedIds(new Set())
    } catch { setActionResult({ success: false, message: 'Outreach failed' }) }
    finally { setSending(false) }
  }

  const openPreview   = (id?: string) => window.open(`/api/crm/preview-outreach${id ? `?id=${id}` : ''}`, '_blank')
  const exportCSV     = () => window.open('/api/admin/plants/export', '_blank')
  const copyEmailList = () => {
    const emails = prospects.filter(p => p.contact_email).map(p => p.contact_email).join(', ')
    navigator.clipboard.writeText(emails)
    setActionResult({ success: true, message: `Copied ${emails.split(',').length} emails` })
  }

  // ─── Sorted prospects ─────────────────────────────────────────────────────
  const sortedProspects = [...prospects].sort((a, b) => {
    if (sortBy === 'capacity')      return (b.capacity_mwp || 0) - (a.capacity_mwp || 0)
    if (sortBy === 'last_activity') {
      const aFeed = (a.activity_feed || [])[0]?.ts || a.last_contact_date || a.created_at || ''
      const bFeed = (b.activity_feed || [])[0]?.ts || b.last_contact_date || b.created_at || ''
      return bFeed.localeCompare(aFeed)
    }
    if (sortBy === 'priority_score') {
      const PRI = { urgent:4, high:3, medium:2, low:1 }
      return (PRI[b.priority as keyof typeof PRI]||0) - (PRI[a.priority as keyof typeof PRI]||0)
    }
    return (b.created_at || '').localeCompare(a.created_at || '')
  })

  // ─── Folder grouping ──────────────────────────────────────────────────────
  const toggleFolder = (id: string) => {
    setOpenFolders(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n })
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  if (status === 'loading' || status === 'unauthenticated') {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">Loading…</div>
  }

  // Sticky header wraps: header + sub-header + tabs
  return (
    <div className="min-h-screen bg-gray-50">

      <CrmHeader activeNav="prospects">
        {/* Segment tabs + action buttons */}
        <div className="bg-[#1A365D] border-b border-blue-800">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between flex-wrap gap-2">
            <div className="flex gap-2">
              {([
                { key: 'developer',  label: 'PV Parks & Developers', icon: Zap     },
                { key: 'commercial', label: 'Commercial Rooftop',    icon: Building },
              ] as const).map(({ key, label, icon: Icon }) => (
                <button key={key}
                  onClick={() => { setSegment(key); setExpandedId(null); setSelectedIds(new Set()) }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-semibold transition ${
                    segment === key ? 'bg-[#C9A432] text-[#1A365D]' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                  <Icon className="w-4 h-4" />{label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { label: 'Refresh', icon: <RefreshCw className={`w-3 h-3 mr-1 ${loading?'animate-spin':''}`}/>, onClick: fetchProspects, disabled: loading },
                { label: 'CSV',     icon: <Download  className="w-3 h-3 mr-1"/>, onClick: exportCSV },
                { label: 'Emails',  icon: <Copy      className="w-3 h-3 mr-1"/>, onClick: copyEmailList },
                { label: 'Preview', icon: <Eye       className="w-3 h-3 mr-1"/>, onClick: () => openPreview() },
                { label: 'Test email', icon: <MailCheck className="w-3 h-3 mr-1"/>, onClick: () => runOutreach({ test: true, filter: currentFilter() }), disabled: sending },
              ].map(({ label, icon, onClick, disabled }) => (
                <button key={label} onClick={onClick} disabled={disabled}
                  className="flex items-center text-xs font-medium px-3 py-1.5 rounded border border-white/30 text-white bg-transparent hover:bg-white/10 disabled:opacity-50 transition">
                  {icon}{label}
                </button>
              ))}
              <button
                onClick={() => { setFormData(EMPTY_PROSPECT); setEditingId(null); setShowForm(s => !s) }}
                className="flex items-center text-xs font-medium px-3 py-1.5 rounded bg-[#C9A432] text-[#1A365D] hover:bg-[#b8931f] transition">
                <Plus className="w-3 h-3 mr-1" />Add
              </button>
            </div>
          </div>
        </div>

        {/* View tabs */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-2 flex gap-2 flex-wrap">
            {([
              { key: 'list',         label: 'Prospects', icon: Users     },
              { key: 'pipeline',     label: 'Pipeline',  icon: BarChart3 },
              { key: 'grid_contacts',label: 'DSO / TSO', icon: Zap       },
              { key: 'data_sources', label: 'Sources',   icon: FileText  },
            ] as const).map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setActiveView(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition ${
                  activeView === key ? 'bg-[#1A365D] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                <Icon className="w-3.5 h-3.5" />{label}
              </button>
            ))}
            <button onClick={() => setActiveView('queue')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition ${
                activeView === 'queue' ? 'bg-[#1A365D] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              <Inbox className="w-3.5 h-3.5" />Queue
              {(queue?.totalActionable || 0) > 0 && (
                <span className={`ml-1 text-xs font-bold px-1.5 py-0.5 rounded-full ${
                  activeView === 'queue' ? 'bg-white text-[#1A365D]' : 'bg-red-500 text-white'}`}>
                  {queue!.totalActionable}
                </span>
              )}
            </button>
          </div>
        </div>
      </CrmHeader>

      <div className="container mx-auto px-4 py-5">

        {/* Banner */}
        {actionResult && (
          <div className={`border rounded-lg p-3 mb-4 flex items-center gap-3 ${
            actionResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            {actionResult.success ? <CheckCircle className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
            <p className={`text-sm ${actionResult.success ? 'text-green-800' : 'text-red-800'}`}>{actionResult.message}</p>
            <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setActionResult(null)}>×</Button>
          </div>
        )}

        {/* Follow-ups */}
        {followUps.length > 0 && activeView === 'list' && (
          <Card className="mb-4 border-orange-200 bg-orange-50">
            <CardContent className="pt-4 pb-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-orange-800 text-sm">{followUps.length} Follow-up{followUps.length>1?'s':''} due</h3>
                  <div className="mt-1 space-y-0.5">
                    {followUps.slice(0,5).map(f => (
                      <div key={f.id} className="flex items-center gap-2 text-xs text-orange-700">
                        <Clock className="w-3 h-3" />
                        <span className="font-medium">{f.plant_name}</span>
                        {f.assigned_name && <span className="text-orange-500">→ {f.assigned_name}</span>}
                        <span>due {formatDate(f.next_follow_up)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        {activeView === 'list' && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
            {[
              { label: 'Total', val: stats.total, color: '' },
              { label: 'Active pipeline', val: ['contacted','responded','meeting_set','proposal_sent','negotiating'].reduce((s,k)=>s+(stats.byStatus[k]||0),0), color: 'text-green-600' },
              { label: 'Pipeline value', val: stats.totalPipeline>0 ? formatCurrency(stats.totalPipeline) : '—', color: 'text-blue-600' },
              { label: 'Weighted forecast', val: (stats.weightedPipeline||0)>0 ? formatCurrency(stats.weightedPipeline!) : '—', color: 'text-indigo-600' },
              { label: 'Total capacity', val: stats.totalCapacity>0 ? `${stats.totalCapacity.toFixed(1)} MWp` : '—', color: 'text-purple-600' },
              { label: 'Won', val: stats.byStatus['won']||0, color: 'text-emerald-600' },
            ].map(({ label, val, color }) => (
              <Card key={label}><CardContent className="pt-3 pb-2">
                <p className="text-xs text-gray-500">{label}</p>
                <p className={`text-2xl font-bold ${color}`}>{val}</p>
              </CardContent></Card>
            ))}
          </div>
        )}

        {/* ─── ADD / EDIT FORM ─── */}
        {showForm && (
          <Card className="mb-5 border-2 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{editingId ? 'Edit Prospect' : 'Add New Prospect'}</CardTitle>
              <CardDescription>Enter plant, company, and contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {/* Plant */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm flex items-center gap-1"><Zap className="w-4 h-4"/>Plant</h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div><Label className="text-xs">Plant Name *</Label><Input value={formData.plant_name} onChange={e=>setFormData({...formData,plant_name:e.target.value})} /></div>
                    <div><Label className="text-xs">CERA License</Label><Input value={formData.cera_license_no||''} onChange={e=>setFormData({...formData,cera_license_no:e.target.value})} /></div>
                    <div><Label className="text-xs">Capacity (MWp)</Label><Input type="number" step="0.01" value={formData.capacity_mwp||''} onChange={e=>setFormData({...formData,capacity_mwp:e.target.value?parseFloat(e.target.value):undefined})} /></div>
                    <div><Label className="text-xs">Technology</Label>
                      <select className="w-full border rounded-md px-3 py-2 text-sm" value={formData.technology||'PV'} onChange={e=>setFormData({...formData,technology:e.target.value})}>
                        {TECHNOLOGIES.map(t=><option key={t}>{t}</option>)}
                      </select></div>
                    <div><Label className="text-xs">District</Label>
                      <select className="w-full border rounded-md px-3 py-2 text-sm" value={formData.district||''} onChange={e=>setFormData({...formData,district:e.target.value})}>
                        <option value="">Select…</option>{DISTRICTS.map(d=><option key={d}>{d}</option>)}
                      </select></div>
                    <div><Label className="text-xs">Location</Label><Input value={formData.location||''} onChange={e=>setFormData({...formData,location:e.target.value})} /></div>
                  </div>
                </div>
                {/* Company */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm flex items-center gap-1"><Building className="w-4 h-4"/>Company</h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div><Label className="text-xs">Company Name</Label><Input value={formData.company_name||''} onChange={e=>setFormData({...formData,company_name:e.target.value})} /></div>
                    <div><Label className="text-xs">Reg. No.</Label><Input value={formData.company_reg_no||''} onChange={e=>setFormData({...formData,company_reg_no:e.target.value})} /></div>
                    <div><Label className="text-xs">Developer / Parent Group</Label><Input value={formData.parent_group||''} onChange={e=>setFormData({...formData,parent_group:e.target.value})} /></div>
                    <div><Label className="text-xs">Website</Label><Input value={formData.company_website||''} onChange={e=>setFormData({...formData,company_website:e.target.value})} /></div>
                  </div>
                </div>
                {/* Contact */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm flex items-center gap-1"><Users className="w-4 h-4"/>Contact</h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div><Label className="text-xs">Name</Label><Input value={formData.contact_name||''} onChange={e=>setFormData({...formData,contact_name:e.target.value})} /></div>
                    <div><Label className="text-xs">Title</Label><Input value={formData.contact_title||''} onChange={e=>setFormData({...formData,contact_title:e.target.value})} /></div>
                    <div><Label className="text-xs">Email</Label><Input type="email" value={formData.contact_email||''} onChange={e=>setFormData({...formData,contact_email:e.target.value})} /></div>
                    <div><Label className="text-xs">Phone</Label><Input value={formData.contact_phone||''} onChange={e=>setFormData({...formData,contact_phone:e.target.value})} /></div>
                    <div><Label className="text-xs">LinkedIn</Label><Input value={formData.contact_linkedin||''} onChange={e=>setFormData({...formData,contact_linkedin:e.target.value})} /></div>
                  </div>
                </div>
                {/* Outreach */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm flex items-center gap-1"><Target className="w-4 h-4"/>Outreach</h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div><Label className="text-xs">Status</Label>
                      <select className="w-full border rounded-md px-3 py-2 text-sm" value={formData.outreach_status||'new'} onChange={e=>setFormData({...formData,outreach_status:e.target.value as PvProspect['outreach_status']})}>
                        {OUTREACH_STATUSES.map(s=><option key={s.value} value={s.value}>{s.label}</option>)}
                      </select></div>
                    <div><Label className="text-xs">Priority</Label>
                      <select className="w-full border rounded-md px-3 py-2 text-sm" value={formData.priority||'medium'} onChange={e=>setFormData({...formData,priority:e.target.value as PvProspect['priority']})}>
                        {PRIORITIES.map(p=><option key={p.value} value={p.value}>{p.label}</option>)}
                      </select></div>
                    <div><Label className="text-xs">Offer Type</Label>
                      <select className="w-full border rounded-md px-3 py-2 text-sm" value={formData.offer_type||''} onChange={e=>setFormData({...formData,offer_type:e.target.value})}>
                        <option value="">Select…</option>{OFFER_TYPES.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
                      </select></div>
                    <div><Label className="text-xs">Deal Value (EUR)</Label><Input type="number" value={formData.estimated_deal_value||''} onChange={e=>setFormData({...formData,estimated_deal_value:e.target.value?parseFloat(e.target.value):undefined})} /></div>
                    <div><Label className="text-xs">BESS Potential (MWh)</Label><Input type="number" step="0.1" value={formData.bess_potential_mwh||''} onChange={e=>setFormData({...formData,bess_potential_mwh:e.target.value?parseFloat(e.target.value):undefined})} /></div>
                    <div><Label className="text-xs">Next Follow-up</Label><Input type="date" value={formData.next_follow_up||''} onChange={e=>setFormData({...formData,next_follow_up:e.target.value})} /></div>
                  </div>
                  <div className="mt-3"><Label className="text-xs">Notes</Label>
                    <textarea className="w-full border rounded-md px-3 py-2 text-sm min-h-[70px] mt-1"
                      value={formData.notes||''} onChange={e=>setFormData({...formData,notes:e.target.value})}
                      placeholder="Research notes, call summary…" /></div>
                </div>
                <div className="flex gap-3 pt-3 border-t">
                  <Button onClick={saveProspect}><CheckCircle className="w-4 h-4 mr-2"/>{editingId?'Update':'Save'}</Button>
                  <Button variant="outline" onClick={() => { setShowForm(false); setEditingId(null); setFormData(EMPTY_PROSPECT) }}>Cancel</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ─── LIST VIEW ─── */}
        {activeView === 'list' && (
          <>
            {/* Filters */}
            <Card className="mb-4">
              <CardContent className="pt-3 pb-3">
                <div className="flex flex-wrap items-end gap-3">
                  <div className="flex-1 min-w-[200px]">
                    <Label className="text-xs">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input className="pl-9 text-sm" placeholder={segment === 'commercial'
                        ? 'Business name, address, district, industry…'
                        : 'Company, director, SPV, Greek or English…'}
                        value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
                        onKeyDown={e=>e.key==='Enter'&&fetchProspects()} />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1 leading-snug">
                      {segment === 'commercial'
                        ? 'Matches company, address, district, and industry. Use District / Industry filters for exact lists.'
                        : 'Matches company, plant, all directors (incl. Greek transliteration), parent group, and aliases.'}
                    </p>
                  </div>
                  <div><Label className="text-xs">Status</Label>
                    <select className="w-full border rounded-md px-2 py-2 text-sm" value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
                      <option value="all">All</option>{OUTREACH_STATUSES.map(s=><option key={s.value} value={s.value}>{s.label}</option>)}
                    </select></div>
                  <div><Label className="text-xs">Priority</Label>
                    <select className="w-full border rounded-md px-2 py-2 text-sm" value={filterPriority} onChange={e=>setFilterPriority(e.target.value)}>
                      <option value="all">All</option>{PRIORITIES.map(p=><option key={p.value} value={p.value}>{p.label}</option>)}
                    </select></div>
                  <div><Label className="text-xs">District</Label>
                    <select className="w-full border rounded-md px-2 py-2 text-sm" value={filterDistrict} onChange={e=>setFilterDistrict(e.target.value)}>
                      <option value="all">All</option>{DISTRICTS.map(d=><option key={d}>{d}</option>)}
                    </select></div>
                  <div><Label className="text-xs">Offer type</Label>
                    <select className="w-full border rounded-md px-2 py-2 text-sm" value={filterOfferType} onChange={e=>setFilterOfferType(e.target.value)}>
                      <option value="all">All</option>{OFFER_TYPES.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
                    </select></div>
                  <div><Label className="text-xs">Assigned</Label>
                    <select className="w-full border rounded-md px-2 py-2 text-sm" value={filterAssigned} onChange={e=>setFilterAssigned(e.target.value as 'all'|'mine')}>
                      <option value="all">All</option><option value="mine">Mine</option>
                    </select></div>
                  <div><Label className="text-xs">Added</Label>
                    <select className="w-full border rounded-md px-2 py-2 text-sm" value={filterNew} onChange={e=>setFilterNew(e.target.value as 'all'|'7'|'30')}>
                      <option value="all">Any time</option><option value="7">Last 7d</option><option value="30">Last 30d</option>
                    </select></div>
                  {segment==='developer' && (<>
                    <div><Label className="text-xs">RTB stage</Label>
                      <select className="w-full border rounded-md px-2 py-2 text-sm" value={filterRtb} onChange={e=>setFilterRtb(e.target.value)}>
                        <option value="all">All</option>{RTB_STAGES.map(s=><option key={s.value} value={s.value}>{s.label}</option>)}
                      </select></div>
                    <div><Label className="text-xs">Built</Label>
                      <select className="w-full border rounded-md px-2 py-2 text-sm" value={filterBuilt} onChange={e=>setFilterBuilt(e.target.value)}>
                        <option value="all">Any</option>{BUILT_STAGES.map(s=><option key={s.value} value={s.value}>{s.label}</option>)}
                      </select></div>
                    <div><Label className="text-xs">Tech</Label>
                      <select className="w-full border rounded-md px-2 py-2 text-sm" value={filterTech} onChange={e=>setFilterTech(e.target.value)}>
                        <option value="all">All</option>{TECHNOLOGIES.map(t=><option key={t}>{t}</option>)}
                      </select></div>
                    <div><Label className="text-xs">BESS</Label>
                      <select className="w-full border rounded-md px-2 py-2 text-sm" value={filterBess} onChange={e=>setFilterBess(e.target.value)}>
                        <option value="all">Any</option><option value="true">With</option><option value="false">PV only</option>
                      </select></div>
                  </>)}
                  {segment==='commercial' && (
                    <div><Label className="text-xs">Industry</Label>
                      <select className="w-full border rounded-md px-2 py-2 text-sm" value={filterIndustry} onChange={e=>setFilterIndustry(e.target.value)}>
                        <option value="all">All</option>{COMMERCIAL_INDUSTRIES.map(i=><option key={i}>{i}</option>)}
                      </select></div>
                  )}
                  <Button size="sm" onClick={fetchProspects}><Filter className="w-3 h-3 mr-1"/>Apply</Button>
                </div>
              </CardContent>
            </Card>

            {/* Toolbar: sort + group + outreach */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-gray-500" />
                <select className="border rounded px-2 py-1 text-sm" value={sortBy} onChange={e=>setSortBy(e.target.value as typeof sortBy)}>
                  <option value="created_at">Date added</option>
                  <option value="priority_score">Priority</option>
                  <option value="capacity">Capacity</option>
                  <option value="last_activity">Last activity</option>
                </select>
              </div>
              <button onClick={()=>setGroupBy(v=>!v)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm border transition ${groupBy?'bg-[#1A365D] text-white border-[#1A365D]':'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>
                <Folder className="w-3.5 h-3.5"/>Group by {segment==='commercial'?'industry':'offer type'}
              </button>
              <div className="ml-auto flex items-center gap-2">
                <Send className="w-4 h-4 text-gray-500" />
                <Button size="sm" variant="outline" onClick={()=>runOutreach({ids:[...selectedIds]},`Send to ${selectedIds.size} selected?`)} disabled={sending||selectedIds.size===0}>
                  <Mail className="w-3 h-3 mr-1"/>Email {selectedIds.size>0?`(${selectedIds.size})`:'selected'}
                </Button>
                <Button size="sm" variant="outline" onClick={()=>runOutreach({all:true,filter:currentFilter()},'Send to ALL matching filter?')} disabled={sending}>
                  <Send className="w-3 h-3 mr-1"/>Email all
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading…</div>
            ) : prospects.length === 0 ? (
              <Card><CardContent className="py-12 text-center">
                <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <h3 className="font-semibold mb-2">No prospects</h3>
                <Button onClick={() => { setFormData(EMPTY_PROSPECT); setShowForm(true) }}>
                  <Plus className="w-4 h-4 mr-2"/>Add First
                </Button>
              </CardContent></Card>
            ) : groupBy ? (
              /* ── Grouped / folder view ── */
              <div className="space-y-3">
                {(segment==='developer' ? DEV_FOLDERS : COMMERCIAL_INDUSTRIES.map(ind=>({
                  id: ind, label: ind,
                  match: (p: ProspectFull) => (p.industry || 'Other') === ind,
                }))).map(folder => {
                  const folderProspects = sortedProspects.filter(folder.match)
                  if (folderProspects.length === 0) return null
                  const open = openFolders.has(folder.id)
                  return (
                    <div key={folder.id}>
                      <button onClick={()=>toggleFolder(folder.id)}
                        className="w-full flex items-center gap-2 px-4 py-2.5 bg-[#1A365D] text-white rounded-lg text-sm font-semibold hover:bg-[#2B5FA0] transition">
                        <Folder className="w-4 h-4" />
                        {folder.label}
                        <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-full text-xs">{folderProspects.length}</span>
                        {open ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                      </button>
                      {open && (
                        <div className="mt-1 space-y-2 pl-2">
                          {folderProspects.map(prospect => renderCard(prospect))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="space-y-2">
                {sortedProspects.map(prospect => renderCard(prospect))}
              </div>
            )}
          </>
        )}

        {/* ─── PIPELINE VIEW (DnD) ─── */}
        {activeView === 'pipeline' && (
          <div className="space-y-3">
            <h2 className="text-base font-semibold">Sales Pipeline — drag cards between stages</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {OUTREACH_STATUSES.filter(s=>!['won','lost','not_interested'].includes(s.value)).map(status => {
                const sp = prospects.filter(p => p.outreach_status === status.value)
                return (
                  <Card key={status.value}
                    className={`min-h-[200px] transition-all ${dropTarget===status.value?'ring-2 ring-[#C9A432] bg-amber-50':''}`}
                    onDragOver={e=>{e.preventDefault();setDropTarget(status.value)}}
                    onDragLeave={()=>setDropTarget(null)}
                    onDrop={()=>handleDrop(status.value)}>
                    <CardHeader className="pb-2 pt-3 px-3">
                      <div className="flex items-center justify-between">
                        <Badge className={status.color}>{status.label}</Badge>
                        <span className="text-xs text-gray-400">{sp.length}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="px-2 pb-2">
                      <div className="space-y-1.5">
                        {sp.length === 0 ? <p className="text-xs text-gray-400 text-center py-4">Drop here</p> :
                          sp.map(p => (
                            <div key={p.id}
                              draggable
                              onDragStart={()=>setDragId(p.id||null)}
                              onDragEnd={()=>{setDragId(null);setDropTarget(null)}}
                              className={`bg-white border rounded p-2 text-xs shadow-sm cursor-grab active:cursor-grabbing transition ${dragId===p.id?'opacity-50':''}`}
                              onClick={() => { setActiveView('list'); setExpandedId(p.id||null) }}>
                              <p className="font-medium truncate">{p.plant_name}</p>
                              <p className="text-gray-400 truncate">{p.company_name}</p>
                              {p.contact_email && <p className="text-blue-500 truncate">{p.contact_email}</p>}
                              {p.contact_phone && <p className="text-gray-500">{p.contact_phone}</p>}
                              {p.assigned_name && <p className="text-[#1A365D] font-medium">{p.assigned_name}</p>}
                              {p.capacity_mwp && <p className="text-blue-400">{p.capacity_mwp} MWp</p>}
                            </div>
                          ))
                        }
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            {/* Won / Lost */}
            <div className="grid md:grid-cols-2 gap-3 mt-4">
              {(['won','lost'] as const).map(v => (
                <Card key={v} className={v==='won'?'border-green-200':'border-red-200'}
                  onDragOver={e=>{e.preventDefault();setDropTarget(v)}}
                  onDragLeave={()=>setDropTarget(null)}
                  onDrop={()=>handleDrop(v)}>
                  <CardHeader className="pb-2"><CardTitle className={`text-sm flex items-center gap-2 ${v==='won'?'text-green-700':'text-red-700'}`}>
                    {v==='won'?<CheckCircle className="w-4 h-4"/>:<XCircle className="w-4 h-4"/>}
                    {v==='won'?'Won':'Lost'} ({stats.byStatus[v]||0})
                  </CardTitle></CardHeader>
                  <CardContent>
                    {prospects.filter(p=>p.outreach_status===v).map(p=>
                      <div key={p.id} className="text-xs py-0.5">{p.plant_name} — {p.company_name}</div>
                    )}
                    {!prospects.some(p=>p.outreach_status===v) && <p className="text-xs text-gray-400">None</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ─── DSO / TSO ─── */}
        {activeView === 'grid_contacts' && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold">DSO / TSO / Regulatory Contacts</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title:'EAC - DSO', desc:'Grid connections, metering', icon:'⚡', items:[
                  {icon:<Phone className="w-4 h-4 text-gray-400"/>, val:<a href="tel:+35722201000" className="text-blue-600 hover:underline">+357 22 201 000</a>},
                  {icon:<Mail className="w-4 h-4 text-gray-400"/>, val:<a href="mailto:eac@eac.com.cy" className="text-blue-600 hover:underline">eac@eac.com.cy</a>},
                  {icon:<Globe className="w-4 h-4 text-gray-400"/>, val:<a href="https://www.eac.com.cy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.eac.com.cy</a>},
                ]},
                { title:'TSOC', desc:'Transmission grid, RES, ENTSO-E', icon:'🔌', items:[
                  {icon:<Users className="w-4 h-4 text-gray-400"/>, val:<span><strong>Director:</strong> Stavros Stavrinos</span>},
                  {icon:<Phone className="w-4 h-4 text-gray-400"/>, val:<a href="tel:+35722277000" className="text-blue-600 hover:underline">+357 22 277 000</a>},
                  {icon:<Mail className="w-4 h-4 text-gray-400"/>, val:<a href="mailto:director@dsm.org.cy" className="text-blue-600 hover:underline">director@dsm.org.cy</a>},
                ]},
                { title:'CERA', desc:'Licensing, regulation, archive', icon:'📋', items:[
                  {icon:<Phone className="w-4 h-4 text-gray-400"/>, val:<a href="tel:+35722666363" className="text-blue-600 hover:underline">+357 22 666 363</a>},
                  {icon:<Globe className="w-4 h-4 text-gray-400"/>, val:<a href="https://www.cera.org.cy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.cera.org.cy</a>},
                ]},
                { title:'CSE Energy Exchange', desc:'Day-Ahead Market operator', icon:'📊', items:[
                  {icon:<Globe className="w-4 h-4 text-gray-400"/>, val:<a href="https://www.cse.com.cy/en-GB/AGORA-ELECTRISMOY/Home/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CSE Energy Market</a>},
                ]},
              ].map(c=>(
                <Card key={c.title}><CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2">
                  <span>{c.icon}</span>{c.title}
                </CardTitle><CardDescription className="text-xs">{c.desc}</CardDescription></CardHeader>
                <CardContent className="space-y-1.5 text-sm">
                  {c.items.map((item,i)=><p key={i} className="flex items-center gap-2">{item.icon}{item.val}</p>)}
                </CardContent></Card>
              ))}
            </div>
          </div>
        )}

        {/* ─── QUEUE ─── */}
        {activeView === 'queue' && (
          <div className="space-y-5 max-w-3xl mx-auto">
            {/* Call target progress bar */}
            {queue && (() => {
              const target = queue.callTarget || getDailyCallTarget(myEmail)
              const calls = queue.callsToday || 0
              const pct = Math.min(100, Math.round((calls / target) * 100))
              const done = calls >= target
              return (
                <Card className={done ? 'border-emerald-300 bg-emerald-50' : ''}>
                  <CardContent className="pt-4 pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#1A365D]"/>
                        Calls today: {calls} / {target}
                      </h3>
                      <span className={`text-sm font-bold ${done ? 'text-emerald-600' : calls === 0 ? 'text-red-500' : 'text-[#1A365D]'}`}>
                        {done ? 'Target reached!' : `${target - calls} to go`}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-3 rounded-full transition-all ${done ? 'bg-emerald-500' : pct === 0 ? 'bg-red-400' : 'bg-[#1A365D]'}`}
                        style={{ width: `${pct}%` }} />
                    </div>
                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                      <span><Mail className="w-3 h-3 inline mr-0.5"/>{queue.emailsToday} emails</span>
                      <span><MessageSquare className="w-3 h-3 inline mr-0.5"/>{queue.callsToday + queue.emailsToday} total contacts</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })()}

            {/* Today's tasks */}
            {(queue?.tasks?.length || 0) > 0 && (
              <div>
                <h3 className="font-semibold text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <ListTodo className="w-4 h-4 text-[#C9A432]"/>Tasks due today
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{queue!.tasks.length}</span>
                </h3>
                <div className="space-y-2">
                  {queue!.tasks.map(t => (
                    <Card key={t.taskId} className="border-l-4" style={{ borderLeftColor: t.priority === 'urgent' ? '#ef4444' : t.priority === 'high' ? '#f97316' : '#94a3b8' }}>
                      <CardContent className="pt-3 pb-3">
                        <div className="flex items-start gap-3">
                          <button
                            className="mt-0.5 shrink-0"
                            onClick={async () => {
                              const r = await fetch('/api/crm/prospects/tasks', {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: t.prospectId, taskId: t.taskId, done: true }),
                              })
                              if ((await r.json()).success) {
                                setQueue(prev => prev ? {
                                  ...prev,
                                  tasks: prev.tasks.filter(x => x.taskId !== t.taskId),
                                  totalActionable: prev.totalActionable - 1,
                                } : prev)
                              }
                            }}>
                            <Square className="w-5 h-5 text-amber-500 hover:text-emerald-500"/>
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm text-gray-800">{t.prospectName}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{t.taskText}</div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              t.taskType === 'call' ? 'bg-blue-100 text-blue-700' :
                              t.taskType === 'email' ? 'bg-emerald-100 text-emerald-700' :
                              t.taskType === 'meeting' ? 'bg-purple-100 text-purple-700' :
                              'bg-gray-100 text-gray-600'}`}>
                              {t.taskType}
                            </span>
                            {t.daysSinceContact != null && (
                              <div className="text-xs text-gray-400 mt-1">{t.daysSinceContact}d since contact</div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Overdue follow-ups */}
            {(queue?.followUps?.length || 0) > 0 && (
              <div>
                <h3 className="font-semibold text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500"/>Overdue follow-ups
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{queue!.followUps.length}</span>
                </h3>
                <div className="space-y-2">
                  {queue!.followUps.map(f => (
                    <Card key={f.prospectId} className="border-l-4 border-l-orange-400">
                      <CardContent className="pt-3 pb-3 flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-orange-500 shrink-0"/>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-gray-800">{f.prospectName}</div>
                          <div className="text-xs text-gray-500">Due {f.nextFollowUp}{f.assignedName ? ` · ${f.assignedName}` : ''}</div>
                        </div>
                        {f.daysSinceContact != null && (
                          <span className="text-xs text-gray-400 shrink-0">{f.daysSinceContact}d since contact</span>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Stale prospects */}
            {(queue?.stale?.length || 0) > 0 && (
              <div>
                <h3 className="font-semibold text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-gray-400"/>Stale prospects needing attention
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{queue!.stale.length}</span>
                </h3>
                <div className="space-y-2">
                  {queue!.stale.slice(0, 15).map(s => (
                    <Card key={s.prospectId} className="border-l-4 border-l-gray-300">
                      <CardContent className="pt-3 pb-3 flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-gray-800">{s.prospectName}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{s.ruleText}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs capitalize text-gray-400">{s.outreachStatus.replace(/_/g,' ')}</span>
                          <div className={`text-xs font-medium ${s.daysSinceContact > 14 ? 'text-red-500' : 'text-amber-600'}`}>
                            {s.daysSinceContact}d stale
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {queue && queue.totalActionable === 0 && (
              <Card className="border-emerald-300 bg-emerald-50">
                <CardContent className="pt-6 pb-6 text-center">
                  <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2"/>
                  <p className="font-semibold text-emerald-700">All clear — no pending actions!</p>
                  <p className="text-xs text-emerald-600 mt-1">Check back after logging more calls or when new prospects need attention.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* ─── DATA SOURCES ─── */}
        {activeView === 'data_sources' && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold">Research Data Sources</h2>
            {[
              { n:'1', title:'CERA Licensing Archive', body:<>Go to the <a href="https://www.cera.org.cy/en-gb/ilektrismos/1169/ilektrismos-paragwgoi1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CERA Producers Page</a> → download the licensing archive (capacity, location, company name, licence no).</> },
              { n:'2', title:'Cyprus Company Register', body:<>Search on the <a href="https://efiling.drcor.mcit.gov.cy/DrcorPublic/SearchForm.aspx?sc=0&cultureInfo=en-AU" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Department of Registrar</a> — free directors, address, group structure. The enrichment pipeline runs this automatically.</> },
              { n:'3', title:'LinkedIn', body:'Search director names from the register → find profiles → connect with a BESS / curtailment pitch.' },
              { n:'4', title:'Hunter.io (integrated)', body:<>Run <code>npm run cyprus:full</code> locally to auto-verify director emails.</> },
            ].map(s=>(
              <Card key={s.n}><CardHeader className="pb-1"><CardTitle className="text-sm">{s.n}. {s.title}</CardTitle></CardHeader>
              <CardContent className="text-sm text-gray-600">{s.body}</CardContent></Card>
            ))}
          </div>
        )}
      </div>

      <div className="text-center py-5 text-xs text-gray-400">
        Lighthief Cyprus Ltd · HE 477423 · solarfarms.cy
      </div>
    </div>
  )

  // ─── Card renderer (function component avoids JSX repetition) ──────────────
  function renderCard(prospect: ProspectFull) {
    const feed: ActivityEntry[] = (prospect.activity_feed || []) as ActivityEntry[]
    const lastActivity = feed[0]?.ts || prospect.last_contact_date
    const roofSrc = normalizeRoofImageUrl(prospect.roof_image_url)
    return (
      <Card key={prospect.id} className={`overflow-hidden transition-all ${expandedId===prospect.id?'ring-2 ring-[#1A365D]':''}`}>
        <div className="p-4">
          <div className="flex items-start gap-3">
            <input type="checkbox" className="mt-1.5 h-4 w-4 shrink-0 accent-[#1A365D]"
              checked={prospect.id?selectedIds.has(prospect.id):false}
              onChange={()=>prospect.id&&toggleSelect(prospect.id)} title="Select" />
            {roofSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={roofSrc} alt="Roof" loading="lazy"
                className="w-24 h-16 object-cover rounded border shrink-0 hidden sm:block"
                onError={(e) => { e.currentTarget.style.display = 'none' }} />
            )}
            <div className="flex-1 min-w-0">
              {/* Title row */}
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-gray-900 truncate text-sm">{prospect.plant_name}</h3>
                {prospect.capacity_mwp && <span className="text-xs text-blue-600 font-medium">{prospect.capacity_mwp} MWp</span>}
                <Badge className={getStatusColor(prospect.outreach_status||'new')}>
                  {OUTREACH_STATUSES.find(s=>s.value===prospect.outreach_status)?.label||'New'}
                </Badge>
                <Badge className={getPriorityColor(prospect.priority||'medium')}>{prospect.priority||'medium'}</Badge>
                {prospect.offer_type && <Badge variant="outline">{OFFER_TYPES.find(o=>o.value===prospect.offer_type)?.label||prospect.offer_type}</Badge>}
                {segment === 'commercial' && prospect.industry && (
                  <Badge variant="outline" className="border-[#C9A432] text-[#1A365D]">{prospect.industry}</Badge>
                )}
                {prospect.assigned_name && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#1A365D] text-white flex items-center gap-1">
                    <UserCheck className="w-3 h-3"/>{prospect.assigned_name}
                  </span>
                )}
                {(prospect.tags||[]).some(t=>t.startsWith('intro_sent')) && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1">
                    <MailCheck className="w-3 h-3"/>intro sent
                  </span>
                )}
                {(prospect.sequence_step||0) > 0 && (prospect.sequence_step||0) < 3 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 flex items-center gap-1"
                    title={`Follow-up ${prospect.sequence_step} scheduled for ${prospect.next_follow_up||'…'}`}>
                    <Send className="w-3 h-3"/>seq {prospect.sequence_step}/2
                  </span>
                )}
                {(prospect.tasks||[]).filter(t=>!t.done).length > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 flex items-center gap-1">
                    <ListTodo className="w-3 h-3"/>{(prospect.tasks||[]).filter(t=>!t.done).length} task{(prospect.tasks||[]).filter(t=>!t.done).length>1?'s':''}
                  </span>
                )}
              </div>
              {/* Company + contact row — email + phone as text */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-gray-500">
                {prospect.company_name && <span className="flex items-center gap-1"><Building className="w-3 h-3"/>{prospect.company_name}</span>}
                {prospect.parent_group && <span className="text-gray-400">({prospect.parent_group})</span>}
                {prospect.district && (
                  <a
                    href={
                      prospect.place_id
                        ? `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(prospect.place_id)}`
                        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(prospect.location || prospect.district + ' Cyprus')}`
                    }
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-blue-600"
                    title="Open in Google Maps">
                    <MapPin className="w-3 h-3"/>{prospect.district}
                  </a>
                )}
                {prospect.contact_name && <span className="flex items-center gap-1"><Users className="w-3 h-3"/>{prospect.contact_name}</span>}
                {prospect.all_directors && prospect.all_directors !== prospect.contact_name && (
                  <span className="flex items-center gap-1 text-gray-600" title="All directors (searchable)">
                    <Users className="w-3 h-3 opacity-60"/>{prospect.all_directors}
                  </span>
                )}
                {prospect.contact_email && (
                  <a href={`mailto:${prospect.contact_email}`} className="flex items-center gap-1 text-blue-600 hover:underline">
                    <Mail className="w-3 h-3"/>{prospect.contact_email}
                  </a>
                )}
                {prospect.contact_phone && (
                  <a href={`tel:${prospect.contact_phone}`} className="flex items-center gap-1 text-gray-600 hover:text-green-600">
                    <Phone className="w-3 h-3"/>{prospect.contact_phone}
                  </a>
                )}
                {prospect.estimated_deal_value && (
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <DollarSign className="w-3 h-3"/>{formatCurrency(prospect.estimated_deal_value)}
                  </span>
                )}
                {prospect.next_follow_up && (
                  <span className="flex items-center gap-1 text-orange-600">
                    <Calendar className="w-3 h-3"/>Follow-up: {formatDate(prospect.next_follow_up)}
                  </span>
                )}
              </div>
              {/* Segment metrics */}
              {segment === 'commercial' ? (
                <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                  {prospect.roof_area_m2 != null && <span>{Math.round(prospect.roof_area_m2).toLocaleString()} m²</span>}
                  {prospect.capacity_mwp != null && <span>{(prospect.capacity_mwp*1000).toFixed(0)} kWp</span>}
                  {prospect.annual_savings_eur != null && <span className="text-green-600 font-medium">€{Math.round(prospect.annual_savings_eur).toLocaleString()}/yr</span>}
                  {prospect.payback_years != null && <span>{prospect.payback_years}-yr payback</span>}
                  {prospect.has_existing_pv && <span className="text-amber-600">existing PV → BESS</span>}
                  {lastActivity && <span className="text-gray-400 ml-auto">last activity {formatDate(lastActivity)}</span>}
                </div>
              ) : (
                <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                  {prospect.rtb_status && <span className="capitalize">RTB: {prospect.rtb_status.replace(/_/g,' ')}</span>}
                  {prospect.operational_mwp ? <span>{prospect.operational_mwp.toFixed(1)} MWp op.</span> : null}
                  {prospect.construction_mwp ? <span>{prospect.construction_mwp.toFixed(1)} MWp constr.</span> : null}
                  {prospect.bess_potential_mwh ? <span className="text-[#1A365D]">{prospect.bess_potential_mwh.toFixed(1)} MWh BESS</span> : null}
                  {prospect.bess_sales_angle && (
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold capitalize ${
                      prospect.bess_sales_angle === 'retrofit' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>{prospect.bess_sales_angle.replace(/_/g,' ')}</span>
                  )}
                  {prospect.curtailment_rate != null && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-100 text-red-700">
                      {prospect.curtailment_rate}% curtailed
                    </span>
                  )}
                  {prospect.satellite_check && prospect.satellite_check!=='unknown' && <span className="capitalize">{prospect.satellite_check.replace(/_/g,' ')}</span>}
                  {lastActivity && <span className="text-gray-400 ml-auto">last activity {formatDate(lastActivity)}</span>}
                </div>
              )}
            </div>

            {/* Quick action icons */}
            <div className="flex items-center gap-0.5 flex-shrink-0">
              {prospect.contact_linkedin && <a href={prospect.contact_linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-blue-700"><Linkedin className="w-4 h-4"/></a>}
              {prospect.company_website && <a href={prospect.company_website} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-purple-600"><Globe className="w-4 h-4"/></a>}
              <button className="p-1.5 text-gray-400 hover:text-[#C9A432]" onClick={()=>prospect.id&&openPreview(prospect.id)} title="Preview email"><Eye className="w-4 h-4"/></button>
              <button className="p-1.5 text-gray-400 hover:text-blue-600" title="Edit" onClick={()=>{setFormData(prospect);setEditingId(prospect.id||null);setShowForm(true)}}><Edit className="w-4 h-4"/></button>
              <button className="p-1.5 text-gray-400 hover:text-red-600" title="Delete" onClick={()=>prospect.id&&deleteProspect(prospect.id)}><Trash2 className="w-4 h-4"/></button>
              <button className="p-1.5 text-gray-400 hover:text-gray-600" onClick={()=>setExpandedId(expandedId===prospect.id?null:prospect.id||null)}>
                {expandedId===prospect.id?<ChevronUp className="w-4 h-4"/>:<ChevronDown className="w-4 h-4"/>}
              </button>
            </div>
          </div>

          {/* ── Expanded panel ── */}
          {expandedId === prospect.id && (
            <div className="mt-4 pt-4 border-t space-y-5">
              {/* Assign + status */}
              <div className="flex flex-wrap gap-6">
                <div className="flex-1 min-w-[200px]">
                  <Label className="text-xs text-gray-500 flex items-center gap-1 mb-1"><UserCheck className="w-3 h-3"/>Assign to</Label>
                  <select className="w-full border rounded-md px-2 py-2 text-sm"
                    value={prospect.assigned_to||''}
                    onChange={e=>prospect.id&&assignProspect(prospect.id,e.target.value)}>
                    <option value="">Unassigned</option>
                    {CRM_USERS.map(u=><option key={u.email} value={u.email}>{u.name} ({u.email})</option>)}
                  </select>
                </div>
                <div className="flex-1 min-w-[260px]">
                  <Label className="text-xs text-gray-500 mb-1">Quick status</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {OUTREACH_STATUSES.map(s=>(
                      <button key={s.value}
                        className={`text-xs px-2 py-1 rounded-full transition ${prospect.outreach_status===s.value?s.color+' font-semibold ring-2 ring-offset-1':'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                        onClick={()=>prospect.id&&quickUpdateStatus(prospect.id,s.value)}>
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick log call/email */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Button size="sm" variant="outline"
                    onClick={()=>setLogForm(prev=>({...prev,[prospect.id||'']:prev[prospect.id||'']===null||!prev[prospect.id||'']?'call':null}))}>
                    <PhoneCall className="w-3 h-3 mr-1"/>Log call
                  </Button>
                  <Button size="sm" variant="outline"
                    onClick={()=>setLogForm(prev=>({...prev,[prospect.id||'']:prev[prospect.id||'']===null||prev[prospect.id||'']!=='email'?'email':null}))}>
                    <Mail className="w-3 h-3 mr-1"/>Log email
                  </Button>
                </div>
                {logForm[prospect.id||''] && (() => {
                  const pid = prospect.id || ''
                  const sd = spinData[pid] || {}
                  const isCall = logForm[pid] === 'call'
                  const questions = isCall ? getQualifyingQuestions(segment, prospect.offer_type) : []
                  const phaseQs = sd.spin_phase ? questionsByPhase(questions, sd.spin_phase as SpinPhase) : []
                  return (
                    <div className="space-y-2 border rounded-lg p-3 bg-gray-50">
                      {/* Summary text */}
                      <div className="flex gap-2 items-center">
                        <input autoFocus type="text"
                          placeholder={isCall ? 'Call summary… (Enter to save)' : 'Email summary… (Enter to save)'}
                          value={logText[pid] || ''}
                          onChange={e => setLogText(prev => ({ ...prev, [pid]: e.target.value }))}
                          onKeyDown={e => {
                            if (e.key === 'Enter' && prospect.id) submitLog(prospect.id, logForm[pid]!)
                            if (e.key === 'Escape') setLogForm(prev => ({ ...prev, [pid]: null }))
                          }}
                          className="flex-1 border rounded-md px-3 py-1.5 text-sm bg-white"/>
                        <button className="text-gray-400 hover:text-gray-600"
                          onClick={()=>setLogForm(prev=>({...prev,[pid]:null}))}>
                          <X className="w-4 h-4"/>
                        </button>
                      </div>

                      {/* SPIN toggle for calls */}
                      {isCall && (
                        <button className="text-xs text-blue-500 hover:text-blue-700 underline"
                          onClick={()=>setShowSpin(prev=>({...prev,[pid]:!prev[pid]}))}>
                          {showSpin[pid] ? 'Hide SPIN fields' : '+ Add SPIN qualification'}
                        </button>
                      )}

                      {isCall && showSpin[pid] && (
                        <div className="space-y-2">
                          {/* SPIN phase */}
                          <div>
                            <p className="text-xs text-gray-500 mb-1">SPIN phase of this call</p>
                            <div className="flex gap-1">
                              {(Object.entries(SPIN_PHASE_LABELS) as [SpinPhase, typeof SPIN_PHASE_LABELS[SpinPhase]][]).map(([phase, meta]) => (
                                <button key={phase}
                                  onClick={()=>setSpinData(prev=>({...prev,[pid]:{...sd,spin_phase:phase}}))}
                                  className={`px-3 py-1 rounded text-xs font-bold border transition ${sd.spin_phase===phase ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'}`}
                                  style={sd.spin_phase===phase ? {background:meta.color,borderColor:meta.color} : {}}>
                                  {meta.short} — {meta.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Progress */}
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Call outcome</p>
                            <div className="flex gap-1">
                              {(Object.entries(PROGRESS_LABELS) as [CallProgress, typeof PROGRESS_LABELS[CallProgress]][]).map(([prog, meta]) => (
                                <button key={prog}
                                  onClick={()=>setSpinData(prev=>({...prev,[pid]:{...sd,progress:prog}}))}
                                  className={`px-3 py-1 rounded text-xs font-semibold border transition ${sd.progress===prog ? 'text-white border-transparent' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'}`}
                                  style={sd.progress===prog ? {background:meta.color,borderColor:meta.color} : {}}>
                                  {meta.icon} {meta.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Qualifying questions for current phase */}
                          {phaseQs.length > 0 && (
                            <div className="space-y-1.5">
                              <p className="text-xs text-gray-500">
                                {SPIN_PHASE_LABELS[sd.spin_phase as SpinPhase]?.label} questions for {segment === 'commercial' ? 'commercial' : 'developer'} prospect:
                              </p>
                              {phaseQs.map(q => (
                                <div key={q.id} className="flex items-start gap-2">
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-700 leading-snug">{q.question}</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5 italic">{q.hint}</p>
                                  </div>
                                  {q.options ? (
                                    <select className="text-xs border rounded px-1.5 py-1 bg-white shrink-0 max-w-[160px]"
                                      value={(sd.answers || {})[q.id] || ''}
                                      onChange={e => setSpinData(prev => ({
                                        ...prev,
                                        [pid]: { ...sd, answers: { ...(sd.answers || {}), [q.id]: e.target.value } }
                                      }))}>
                                      <option value="">— select —</option>
                                      {q.options.map(o => <option key={o} value={o}>{o}</option>)}
                                    </select>
                                  ) : (
                                    <input type="text" placeholder="Answer…"
                                      className="text-xs border rounded px-1.5 py-1 bg-white shrink-0 w-36"
                                      value={(sd.answers || {})[q.id] || ''}
                                      onChange={e => setSpinData(prev => ({
                                        ...prev,
                                        [pid]: { ...sd, answers: { ...(sd.answers || {}), [q.id]: e.target.value } }
                                      }))}/>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Next action */}
                          <input type="text" placeholder="Next action from this call…"
                            className="w-full text-xs border rounded-md px-2 py-1.5 bg-white"
                            value={sd.next_action || ''}
                            onChange={e => setSpinData(prev=>({...prev,[pid]:{...sd,next_action:e.target.value}}))}/>
                        </div>
                      )}

                      <Button size="sm" onClick={()=>prospect.id&&submitLog(prospect.id,logForm[pid]!)}>
                        Save
                      </Button>
                    </div>
                  )
                })()}
              </div>

              {/* Details — inline editable */}
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">{segment==='commercial'?'Site & System':'Plant & RTB'}</h4>
                  <dl className="space-y-2">
                    {prospect.cera_license_no && <div><dt className="text-gray-400 text-xs">CERA License</dt><dd className="text-xs">{prospect.cera_license_no}</dd></div>}
                    {prospect.technology && <div><dt className="text-gray-400 text-xs">Technology</dt><dd>{prospect.technology}</dd></div>}
                    {segment==='developer' && prospect.rtb_status && <div><dt className="text-gray-400 text-xs">RTB stage</dt><dd className="capitalize">{prospect.rtb_status.replace(/_/g,' ')}</dd></div>}
                    {prospect.operational_mwp ? <div><dt className="text-gray-400 text-xs">Operating</dt><dd>{prospect.operational_mwp.toFixed(1)} MWp</dd></div> : null}
                    {prospect.construction_mwp ? <div><dt className="text-gray-400 text-xs">Construction</dt><dd>{prospect.construction_mwp.toFixed(1)} MWp</dd></div> : null}
                    {prospect.bess_potential_mwh ? <div><dt className="text-gray-400 text-xs">BESS Potential</dt><dd className="text-green-600 font-medium">{prospect.bess_potential_mwh} MWh</dd></div> : null}
                    {segment==='commercial' && prospect.roof_area_m2 != null && <div><dt className="text-gray-400 text-xs">Roof area</dt><dd>{Math.round(prospect.roof_area_m2).toLocaleString()} m²</dd></div>}
                    {segment==='commercial' && prospect.annual_savings_eur != null && <div><dt className="text-gray-400 text-xs">Annual saving</dt><dd className="text-green-600 font-medium">€{Math.round(prospect.annual_savings_eur).toLocaleString()}</dd></div>}
                    {segment==='commercial' && prospect.payback_years != null && <div><dt className="text-gray-400 text-xs">Payback</dt><dd>{prospect.payback_years} yrs</dd></div>}
                    {prospect.location && (
                      <div>
                        <dt className="text-gray-400 text-xs">Location</dt>
                        <dd className="flex items-center gap-2">
                          <span>{prospect.location}</span>
                          <a
                            href={
                              prospect.place_id
                                ? `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(prospect.place_id)}`
                                : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(prospect.location)}`
                            }
                            target="_blank" rel="noopener noreferrer"
                            className="text-[11px] text-blue-500 hover:text-blue-700 underline shrink-0"
                            title="Open in Google Maps">Maps</a>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Company & Contact</h4>
                  <dl className="space-y-2">
                    {prospect.parent_group && <div><dt className="text-gray-400 text-xs">Developer group</dt><dd className="font-medium text-[#1A365D]">{prospect.parent_group}</dd></div>}
                    <InlineEdit label="Contact name" value={prospect.contact_name} onSave={v=>prospect.id&&putRow(prospect.id,{contact_name:v})} />
                    {prospect.all_directors && (
                      <div>
                        <dt className="text-gray-400 text-xs">All directors</dt>
                        <dd className="text-sm text-gray-700">{prospect.all_directors}</dd>
                      </div>
                    )}
                    <InlineEdit label="Secondary contact" value={prospect.secondary_contact_name}
                      onSave={v=>prospect.id&&putRow(prospect.id,{secondary_contact_name:v})} />
                    {prospect.secondary_contact_email && (
                      <div><dt className="text-gray-400 text-xs">Secondary email</dt>
                        <dd><a href={`mailto:${prospect.secondary_contact_email}`} className="text-blue-600 hover:underline text-sm">{prospect.secondary_contact_email}</a></dd></div>
                    )}
                    {prospect.secondary_contact_phone && (
                      <div><dt className="text-gray-400 text-xs">Secondary phone</dt>
                        <dd><a href={`tel:${prospect.secondary_contact_phone}`} className="text-blue-600 hover:underline text-sm">{prospect.secondary_contact_phone}</a></dd></div>
                    )}
                    <InlineEdit label="Title" value={prospect.contact_title} onSave={v=>prospect.id&&putRow(prospect.id,{contact_title:v})} />
                    <InlineEdit label="Email" value={prospect.contact_email} type="email"
                      href={prospect.contact_email?`mailto:${prospect.contact_email}`:undefined}
                      onSave={v=>prospect.id&&putRow(prospect.id,{contact_email:v})} />
                    <InlineEdit label="Phone" value={prospect.contact_phone} type="tel"
                      href={prospect.contact_phone?`tel:${prospect.contact_phone}`:undefined}
                      onSave={v=>prospect.id&&putRow(prospect.id,{contact_phone:v})} />
                    <InlineEdit label="LinkedIn" value={prospect.contact_linkedin}
                      href={prospect.contact_linkedin}
                      onSave={v=>prospect.id&&putRow(prospect.id,{contact_linkedin:v})} />
                    <InlineEdit label="Website" value={prospect.company_website}
                      href={prospect.company_website}
                      onSave={v=>prospect.id&&putRow(prospect.id,{company_website:v})} />
                    {prospect.company_reg_no && <div><dt className="text-gray-400 text-xs">Reg. No.</dt>
                      <dd><a href="https://efiling.drcor.mcit.gov.cy/DrcorPublic/SearchForm.aspx?sc=0&cultureInfo=en-AU" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{prospect.company_reg_no}</a></dd></div>}
                    {segment === 'commercial' && !prospect.contact_name && (
                      <p className="text-xs text-gray-400 italic pt-1">
                        Find contact:{' '}
                        <a
                          href={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(prospect.company_name || '')}`}
                          target="_blank" rel="noopener noreferrer"
                          className="text-blue-500 hover:underline">LinkedIn</a>
                        {' · '}
                        <a
                          href="https://efiling.drcor.mcit.gov.cy/DrcorPublic/SearchForm.aspx?sc=0&cultureInfo=en-AU"
                          target="_blank" rel="noopener noreferrer"
                          className="text-blue-500 hover:underline">Company Register</a>
                        {' — then fill Contact name above'}
                      </p>
                    )}
                  </dl>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Permits & Timeline</h4>
                  <dl className="space-y-2">
                    {segment==='developer' && prospect.connection_terms_status && <div><dt className="text-gray-400 text-xs">Connection terms</dt><dd className="capitalize">{prospect.connection_terms_status.replace(/_/g,' ')}</dd></div>}
                    {segment==='developer' && prospect.env_permit_status && <div><dt className="text-gray-400 text-xs">Env permit</dt><dd className="capitalize">{prospect.env_permit_status.replace(/_/g,' ')}</dd></div>}
                    {segment==='developer' && prospect.building_permit_status && <div><dt className="text-gray-400 text-xs">Building permit</dt><dd className="capitalize">{prospect.building_permit_status.replace(/_/g,' ')}</dd></div>}
                    {prospect.first_contact_date && <div><dt className="text-gray-400 text-xs">First contact</dt><dd>{formatDate(prospect.first_contact_date)}</dd></div>}
                    {prospect.last_contact_date && <div><dt className="text-gray-400 text-xs">Last contact</dt><dd>{formatDate(prospect.last_contact_date)}</dd></div>}
                    {prospect.outreach_channel && <div><dt className="text-gray-400 text-xs">Channel</dt><dd className="capitalize">{prospect.outreach_channel.replace('_',' ')}</dd></div>}
                  </dl>
                </div>
              </div>

              {/* Tasks */}
              <div>
                <h4 className="font-medium text-gray-700 text-sm mb-2 flex items-center gap-2"><ListTodo className="w-4 h-4"/>Tasks</h4>
                {/* Pending tasks */}
                {(prospect.tasks||[]).length > 0 && (
                  <div className="space-y-1 mb-3">
                    {(prospect.tasks as CrmTask[]).map(task=>(
                      <div key={task.id} className={`flex items-start gap-2 text-xs rounded-md px-2 py-1.5 ${task.done?'bg-gray-50 opacity-60':'bg-amber-50'}`}>
                        <button onClick={()=>prospect.id&&completeTask(prospect.id,task.id,!task.done)} className="mt-0.5 shrink-0">
                          {task.done
                            ? <CheckSquare className="w-4 h-4 text-emerald-500"/>
                            : <Square className="w-4 h-4 text-amber-500"/>}
                        </button>
                        <span className={`flex-1 ${task.done?'line-through text-gray-400':''}`}>{task.text}</span>
                        {task.due && <span className="text-gray-400 shrink-0">{task.due}</span>}
                        <span className="text-gray-300 capitalize shrink-0">{task.type}</span>
                        <button onClick={()=>prospect.id&&deleteTask(prospect.id,task.id)} className="text-gray-300 hover:text-red-400 shrink-0"><X className="w-3 h-3"/></button>
                      </div>
                    ))}
                  </div>
                )}
                {/* Add task form */}
                <div className="flex gap-1.5 flex-wrap">
                  <select className="border rounded px-2 py-1.5 text-xs"
                    value={taskForm[prospect.id||'']?.type||'call'}
                    onChange={e=>setTaskForm(prev=>({...prev,[prospect.id||'']:{...prev[prospect.id||''],type:e.target.value as CrmTaskType}}))}>
                    {(['call','email','meeting','proposal','research','other'] as CrmTaskType[]).map(t=>(
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <input type="text" placeholder="Task description…"
                    value={taskForm[prospect.id||'']?.text||''}
                    onChange={e=>setTaskForm(prev=>({...prev,[prospect.id||'']:{...prev[prospect.id||''],text:e.target.value,type:prev[prospect.id||'']?.type||'call',due:prev[prospect.id||'']?.due||''}}))}
                    onKeyDown={e=>e.key==='Enter'&&prospect.id&&addTask(prospect.id)}
                    className="flex-1 min-w-[160px] border rounded px-2 py-1.5 text-xs"/>
                  <input type="date" className="border rounded px-2 py-1.5 text-xs"
                    value={taskForm[prospect.id||'']?.due||''}
                    onChange={e=>setTaskForm(prev=>({...prev,[prospect.id||'']:{...prev[prospect.id||''],due:e.target.value,type:prev[prospect.id||'']?.type||'call',text:prev[prospect.id||'']?.text||''}}))}/>
                  <Button size="sm" variant="outline" onClick={()=>prospect.id&&addTask(prospect.id)}>
                    <Plus className="w-3 h-3 mr-1"/>Add
                  </Button>
                </div>
              </div>

              {/* Notes + add note */}
              <div>
                <h4 className="font-medium text-gray-700 text-sm mb-2 flex items-center gap-2"><MessageSquare className="w-4 h-4"/>Activity feed</h4>
                <div className="flex gap-2 mb-3">
                  <input type="text" placeholder="Add a note, call summary, next steps…"
                    value={noteText[prospect.id||'']||''}
                    onChange={e=>setNoteText(prev=>({...prev,[prospect.id||'']:e.target.value}))}
                    onKeyDown={e=>e.key==='Enter'&&prospect.id&&addNote(prospect.id,'note')}
                    className="flex-1 border rounded-md px-3 py-2 text-sm" />
                  <Button size="sm" onClick={()=>prospect.id&&addNote(prospect.id,'note')}>
                    <MessageSquare className="w-3 h-3 mr-1"/>Note
                  </Button>
                </div>
                {feed.length > 0 ? (
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {feed.map((entry,i)=>(
                      <div key={i} className="flex gap-2 text-xs">
                        <div className="mt-0.5 text-gray-400">{activityIcon(entry.type)}</div>
                        <div className="flex-1 bg-gray-50 rounded p-2">
                          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                            <span className="font-medium text-gray-700">{entry.author}</span>
                            <span className="text-gray-400">{formatDateTime(entry.ts)}</span>
                            {/* SPIN badges if body is structured JSON */}
                            {(() => {
                              try {
                                const s: SpinCallData = JSON.parse(entry.body)
                                if (!s.spin_phase) return <span className="capitalize text-gray-400 ml-auto">{entry.type}</span>
                                const pm = SPIN_PHASE_LABELS[s.spin_phase]
                                const prm = PROGRESS_LABELS[s.progress]
                                return (
                                  <div className="flex items-center gap-1 ml-auto">
                                    {pm && <span className="text-[10px] px-1.5 py-0.5 rounded font-bold text-white" style={{background:pm.color}}>{pm.short} {pm.label}</span>}
                                    {prm && <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold text-white" style={{background:prm.color}}>{prm.icon} {prm.label}</span>}
                                  </div>
                                )
                              } catch { return <span className="capitalize text-gray-400 ml-auto">{entry.type}</span> }
                            })()}
                          </div>
                          {/* Render SPIN or plain body */}
                          {(() => {
                            try {
                              const s: SpinCallData = JSON.parse(entry.body)
                              if (!s.spin_phase) throw new Error()
                              return (
                                <div className="text-xs text-gray-600 space-y-1">
                                  {s.summary && <p className="whitespace-pre-wrap">{s.summary}</p>}
                                  {Object.entries(s.answers || {}).map(([k, v]) => v ? (
                                    <p key={k} className="text-gray-500"><span className="font-medium">{k.replace(/_/g,' ')}:</span> {String(v)}</p>
                                  ) : null)}
                                  {s.next_action && <p className="text-indigo-700 font-medium">Next: {s.next_action}</p>}
                                </div>
                              )
                            } catch { return <p className="text-gray-600 whitespace-pre-wrap text-xs">{entry.body}</p> }
                          })()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">No activity yet.</p>
                )}
              </div>

              {/* Tags viewer */}
              {(prospect.tags||[]).length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-700 text-sm mb-2">Data tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {(prospect.tags||[]).map((tag: string) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    )
  }
}
