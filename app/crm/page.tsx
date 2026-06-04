'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Users,
  Search,
  Plus,
  RefreshCw,
  ExternalLink,
  Download,
  Filter,
  Building,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Globe,
  Calendar,
  DollarSign,
  Zap,
  Target,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  BarChart3,
  FileText,
  Copy,
  UserCheck,
  LogOut,
} from 'lucide-react'
import type { PvProspect } from '@/lib/supabase'

// ─── Constants ───────────────────────────────────────────────────────────────

const CRM_USERS = [
  { email: 'zinovia@lighthief.com',              name: 'Zinovia' },
  { email: 'alexander.papacosta@lighthief.com',  name: 'Alexander' },
  { email: 'office@lighthief.com',               name: 'Office' },
  { email: 'costas@lighthief.com',               name: 'Costas' },
]

const OUTREACH_STATUSES = [
  { value: 'new',           label: 'New',             color: 'bg-gray-100 text-gray-800'   },
  { value: 'researching',   label: 'Researching',     color: 'bg-blue-100 text-blue-800'   },
  { value: 'contacted',     label: 'Contacted',       color: 'bg-yellow-100 text-yellow-800'},
  { value: 'responded',     label: 'Responded',       color: 'bg-green-100 text-green-800' },
  { value: 'meeting_set',   label: 'Meeting Set',     color: 'bg-purple-100 text-purple-800'},
  { value: 'proposal_sent', label: 'Proposal Sent',   color: 'bg-indigo-100 text-indigo-800'},
  { value: 'negotiating',   label: 'Negotiating',     color: 'bg-orange-100 text-orange-800'},
  { value: 'won',           label: 'Won',             color: 'bg-emerald-100 text-emerald-800'},
  { value: 'lost',          label: 'Lost',            color: 'bg-red-100 text-red-800'     },
  { value: 'not_interested',label: 'Not Interested',  color: 'bg-slate-100 text-slate-800' },
]

const PRIORITIES = [
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800'   },
  { value: 'high',   label: 'High',   color: 'bg-orange-100 text-orange-800'},
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800'},
  { value: 'low',    label: 'Low',    color: 'bg-gray-100 text-gray-800'  },
]

const OFFER_TYPES = [
  { value: 'bess_retrofit', label: 'BESS Retrofit'  },
  { value: 'acquisition',   label: 'Acquisition'    },
  { value: 'epc',           label: 'EPC Services'   },
  { value: 'o_and_m',       label: 'O&M Services'   },
  { value: 'partnership',   label: 'Partnership'    },
  { value: 'consulting',    label: 'Consulting'     },
]

const DISTRICTS       = ['Nicosia', 'Limassol', 'Larnaca', 'Paphos', 'Famagusta']
const TECHNOLOGIES    = ['PV', 'Wind', 'Biomass', 'BESS', 'Hybrid', 'CSP']
const DATA_SOURCES    = [
  { value: 'cera',             label: 'CERA Licensing Archive'   },
  { value: 'company_register', label: 'Cyprus Company Register'  },
  { value: 'linkedin',         label: 'LinkedIn'                 },
  { value: 'referral',         label: 'Referral'                 },
  { value: 'web_research',     label: 'Web Research'             },
  { value: 'conference',       label: 'Conference / Event'       },
  { value: 'tsoc',             label: 'TSOC / DSO'               },
]
const PLANT_STATUSES  = [
  { value: 'operational',      label: 'Operational'       },
  { value: 'under_construction', label: 'Under Construction'},
  { value: 'licensed',         label: 'Licensed'          },
  { value: 'planned',          label: 'Planned'           },
  { value: 'decommissioned',   label: 'Decommissioned'    },
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

type ProspectWithAssign = PvProspect & { assigned_to?: string; assigned_name?: string }

const formatDate = (d?: string) => {
  if (!d) return '-'
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('en-EU', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

const getStatusColor = (s: string) =>
  OUTREACH_STATUSES.find(x => x.value === s)?.color || 'bg-gray-100 text-gray-800'

const getPriorityColor = (p: string) =>
  PRIORITIES.find(x => x.value === p)?.color || 'bg-gray-100 text-gray-800'

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CrmPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [prospects,   setProspects]   = useState<ProspectWithAssign[]>([])
  const [followUps,   setFollowUps]   = useState<ProspectWithAssign[]>([])
  const [stats,       setStats]       = useState<{
    total: number; byStatus: Record<string,number>; byPriority: Record<string,number>;
    totalPipeline: number; totalCapacity: number
  }>({ total: 0, byStatus: {}, byPriority: {}, totalPipeline: 0, totalCapacity: 0 })
  const [loading,     setLoading]     = useState(true)
  const [activeView,  setActiveView]  = useState<'list'|'pipeline'|'grid_contacts'|'data_sources'>('list')
  const [showForm,    setShowForm]    = useState(false)
  const [editingId,   setEditingId]   = useState<string|null>(null)
  const [expandedId,  setExpandedId]  = useState<string|null>(null)
  const [formData,    setFormData]    = useState<ProspectWithAssign>(EMPTY_PROSPECT)
  const [actionResult,setActionResult]= useState<{success:boolean;message:string}|null>(null)

  // Filters
  const [searchQuery,    setSearchQuery]    = useState('')
  const [filterStatus,   setFilterStatus]   = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterDistrict, setFilterDistrict] = useState('all')
  const [filterOfferType,setFilterOfferType]= useState('all')
  const [filterAssigned, setFilterAssigned] = useState<'all'|'mine'>('all')

  const myEmail = session?.user?.email ?? ''
  const myName  = CRM_USERS.find(u => u.email === myEmail)?.name ?? ''

  // Redirect to login if not authenticated
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

      const [pRes, fRes] = await Promise.all([
        fetch(`/api/crm/prospects?${params.toString()}`),
        fetch('/api/crm/prospects/follow-ups'),
      ])
      if (pRes.ok) {
        const d = await pRes.json()
        setProspects(d.data || [])
        setStats(d.stats || { total:0, byStatus:{}, byPriority:{}, totalPipeline:0, totalCapacity:0 })
      }
      if (fRes.ok) {
        const d = await fRes.json()
        setFollowUps(d.data || [])
      }
    } catch {
      setActionResult({ success: false, message: 'Failed to load prospects' })
    } finally {
      setLoading(false)
    }
  }, [filterStatus, filterPriority, filterDistrict, filterOfferType, searchQuery, filterAssigned, myEmail])

  useEffect(() => { if (status === 'authenticated') fetchProspects() }, [fetchProspects, status])

  const saveProspect = async () => {
    if (!formData.plant_name) {
      setActionResult({ success: false, message: 'Plant name is required' }); return
    }
    try {
      const method = editingId ? 'PUT' : 'POST'
      const body   = editingId ? { ...formData, id: editingId } : formData
      const res    = await fetch('/api/crm/prospects', {
        method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      })
      const result = await res.json()
      setActionResult({ success: result.success, message: result.message })
      if (result.success) { setShowForm(false); setEditingId(null); setFormData(EMPTY_PROSPECT); fetchProspects() }
    } catch { setActionResult({ success: false, message: 'Network error saving prospect' }) }
  }

  const deleteProspect = async (id: string) => {
    if (!confirm('Delete this prospect?')) return
    try {
      const res = await fetch(`/api/crm/prospects?id=${id}`, { method: 'DELETE' })
      const result = await res.json()
      setActionResult({ success: result.success, message: result.message })
      if (result.success) fetchProspects()
    } catch { setActionResult({ success: false, message: 'Failed to delete' }) }
  }

  const quickUpdateStatus = async (id: string, outreach_status: string) => {
    try {
      const now = new Date().toISOString()
      const updates: Partial<ProspectWithAssign> = {
        outreach_status: outreach_status as PvProspect['outreach_status'],
      }
      if (outreach_status === 'contacted' || outreach_status === 'responded')
        updates.last_contact_date = now
      if (!prospects.find(p => p.id === id)?.first_contact_date && outreach_status === 'contacted')
        updates.first_contact_date = now

      await fetch('/api/crm/prospects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      })
      fetchProspects()
    } catch { /* silent */ }
  }

  const assignProspect = async (id: string, email: string) => {
    const user = CRM_USERS.find(u => u.email === email)
    try {
      await fetch('/api/crm/prospects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, assigned_to: email || null, assigned_name: user?.name || null }),
      })
      fetchProspects()
    } catch { /* silent */ }
  }

  const exportCSV = () => window.open('/api/admin/plants/export', '_blank')

  const copyEmailList = () => {
    const emails = prospects.filter(p => p.contact_email).map(p => p.contact_email).join(', ')
    navigator.clipboard.writeText(emails)
    setActionResult({ success: true, message: `Copied ${emails.split(',').length} emails` })
  }

  if (status === 'loading' || status === 'unauthenticated') {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">Loading…</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1A365D 0%, #2B5FA0 100%)' }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold" style={{ color: '#C9A432' }}>Lighthief CRM</span>
            <span className="text-sm text-blue-200 hidden md:inline">Cyprus PV prospect tracker</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-blue-200">
              {myName || myEmail}
            </span>
            <Button size="sm" variant="outline" className="text-white border-white/30 hover:bg-white/10"
              onClick={() => signOut({ callbackUrl: '/crm/login' })}>
              <LogOut className="w-3 h-3 mr-1" /> Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Sub-header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-gray-900">PV Plant Prospects</h1>
              <a href="/admin/prospects/plants"
                className="text-sm font-medium text-[#1A365D] hover:underline">
                Cyprus intelligence →
              </a>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={fetchProspects} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={exportCSV}>
                <Download className="w-4 h-4 mr-2" />Export CSV
              </Button>
              <Button variant="outline" size="sm" onClick={copyEmailList}>
                <Copy className="w-4 h-4 mr-2" />Copy Emails
              </Button>
              <Button onClick={() => { setFormData(EMPTY_PROSPECT); setEditingId(null); setShowForm(!showForm) }}>
                <Plus className="w-4 h-4 mr-2" />Add Prospect
              </Button>
            </div>
          </div>

          {/* View tabs */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {[
              { key: 'list',         label: 'Prospect List', icon: Users    },
              { key: 'pipeline',     label: 'Pipeline',      icon: BarChart3},
              { key: 'grid_contacts',label: 'DSO / TSO',     icon: Zap      },
              { key: 'data_sources', label: 'Data Sources',  icon: FileText },
            ].map(({ key, label, icon: Icon }) => (
              <Button key={key} size="sm"
                variant={activeView === key ? 'default' : 'outline'}
                onClick={() => setActiveView(key as typeof activeView)}>
                <Icon className="w-4 h-4 mr-2" />{label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Banner */}
        {actionResult && (
          <div className={`border rounded-lg p-4 mb-6 flex items-center gap-3 ${
            actionResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            {actionResult.success
              ? <CheckCircle className="w-5 h-5 text-green-600" />
              : <XCircle    className="w-5 h-5 text-red-600"   />}
            <p className={actionResult.success ? 'text-green-800' : 'text-red-800'}>{actionResult.message}</p>
            <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setActionResult(null)}>Dismiss</Button>
          </div>
        )}

        {/* Follow-ups */}
        {followUps.length > 0 && activeView === 'list' && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-800">{followUps.length} Follow-up{followUps.length > 1 ? 's' : ''} Due</h3>
                  <div className="mt-2 space-y-1">
                    {followUps.slice(0, 5).map(f => (
                      <div key={f.id} className="flex items-center gap-2 text-sm text-orange-700">
                        <Clock className="w-3 h-3" />
                        <span className="font-medium">{f.plant_name}</span>
                        <span>({f.company_name})</span>
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <Card><CardContent className="pt-4 pb-3">
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </CardContent></Card>
            <Card><CardContent className="pt-4 pb-3">
              <p className="text-xs text-gray-500">Active Pipeline</p>
              <p className="text-2xl font-bold text-green-600">
                {['contacted','responded','meeting_set','proposal_sent','negotiating']
                  .reduce((s,k) => s + (stats.byStatus[k]||0), 0)}
              </p>
            </CardContent></Card>
            <Card><CardContent className="pt-4 pb-3">
              <p className="text-xs text-gray-500">Pipeline Value</p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.totalPipeline > 0 ? formatCurrency(stats.totalPipeline) : '-'}
              </p>
            </CardContent></Card>
            <Card><CardContent className="pt-4 pb-3">
              <p className="text-xs text-gray-500">Total Capacity</p>
              <p className="text-2xl font-bold text-purple-600">
                {stats.totalCapacity > 0 ? `${stats.totalCapacity.toFixed(1)} MWp` : '-'}
              </p>
            </CardContent></Card>
            <Card><CardContent className="pt-4 pb-3">
              <p className="text-xs text-gray-500">Won</p>
              <p className="text-2xl font-bold text-emerald-600">{stats.byStatus['won']||0}</p>
            </CardContent></Card>
          </div>
        )}

        {/* ─── ADD/EDIT FORM ─── */}
        {showForm && (
          <Card className="mb-6 border-2 border-blue-200">
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Prospect' : 'Add New Prospect'}</CardTitle>
              <CardDescription>Plant, company, and contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Plant */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Zap className="w-4 h-4" /> Plant Information</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div><Label>Plant Name *</Label><Input value={formData.plant_name} onChange={e => setFormData({...formData,plant_name:e.target.value})} placeholder="e.g. Kokkinotrimithia Solar Park" /></div>
                    <div><Label>CERA License No.</Label><Input value={formData.cera_license_no||''} onChange={e => setFormData({...formData,cera_license_no:e.target.value})} placeholder="e.g. E-123/2020" /></div>
                    <div><Label>Capacity (MWp)</Label><Input type="number" step="0.01" value={formData.capacity_mwp||''} onChange={e => setFormData({...formData,capacity_mwp:e.target.value?parseFloat(e.target.value):undefined})} placeholder="10.5" /></div>
                    <div><Label>Technology</Label>
                      <select className="w-full border rounded-md px-3 py-2 text-sm" value={formData.technology||'PV'} onChange={e => setFormData({...formData,technology:e.target.value})}>
                        {TECHNOLOGIES.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div><Label>Plant Status</Label>
                      <select className="w-full border rounded-md px-3 py-2 text-sm" value={formData.plant_status||'operational'} onChange={e => setFormData({...formData,plant_status:e.target.value})}>
                        {PLANT_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </div>
                    <div><Label>District</Label>
                      <select className="w-full border rounded-md px-3 py-2 text-sm" value={formData.district||''} onChange={e => setFormData({...formData,district:e.target.value})}>
                        <option value="">Select district…</option>
                        {DISTRICTS.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                    <div><Label>Location</Label><Input value={formData.location||''} onChange={e => setFormData({...formData,location:e.target.value})} placeholder="Village / area" /></div>
                  </div>
                </div>
                {/* Company */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Building className="w-4 h-4" /> Company Information</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div><Label>Company Name</Label><Input value={formData.company_name||''} onChange={e => setFormData({...formData,company_name:e.target.value})} /></div>
                    <div><Label>Reg. No.</Label><Input value={formData.company_reg_no||''} onChange={e => setFormData({...formData,company_reg_no:e.target.value})} placeholder="HE 123456" /></div>
                    <div><Label>Parent / Developer Group</Label><Input value={formData.parent_group||''} onChange={e => setFormData({...formData,parent_group:e.target.value})} /></div>
                    <div><Label>Website</Label><Input value={formData.company_website||''} onChange={e => setFormData({...formData,company_website:e.target.value})} placeholder="https://…" /></div>
                  </div>
                </div>
                {/* Contact */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Users className="w-4 h-4" /> Primary Decision Maker</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div><Label>Name</Label><Input value={formData.contact_name||''} onChange={e => setFormData({...formData,contact_name:e.target.value})} /></div>
                    <div><Label>Title</Label><Input value={formData.contact_title||''} onChange={e => setFormData({...formData,contact_title:e.target.value})} placeholder="CEO, Director…" /></div>
                    <div><Label>Email</Label><Input type="email" value={formData.contact_email||''} onChange={e => setFormData({...formData,contact_email:e.target.value})} /></div>
                    <div><Label>Phone</Label><Input value={formData.contact_phone||''} onChange={e => setFormData({...formData,contact_phone:e.target.value})} placeholder="+357…" /></div>
                    <div><Label>LinkedIn</Label><Input value={formData.contact_linkedin||''} onChange={e => setFormData({...formData,contact_linkedin:e.target.value})} placeholder="https://linkedin.com/in/…" /></div>
                  </div>
                </div>
                {/* Outreach */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Target className="w-4 h-4" /> Outreach & Opportunity</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div><Label>Status</Label>
                      <select className="w-full border rounded-md px-3 py-2 text-sm" value={formData.outreach_status||'new'} onChange={e => setFormData({...formData,outreach_status:e.target.value as PvProspect['outreach_status']})}>
                        {OUTREACH_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </div>
                    <div><Label>Priority</Label>
                      <select className="w-full border rounded-md px-3 py-2 text-sm" value={formData.priority||'medium'} onChange={e => setFormData({...formData,priority:e.target.value as PvProspect['priority']})}>
                        {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                      </select>
                    </div>
                    <div><Label>Offer Type</Label>
                      <select className="w-full border rounded-md px-3 py-2 text-sm" value={formData.offer_type||''} onChange={e => setFormData({...formData,offer_type:e.target.value})}>
                        <option value="">Select…</option>
                        {OFFER_TYPES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                    <div><Label>Assign to</Label>
                      <select className="w-full border rounded-md px-3 py-2 text-sm"
                        value={formData.assigned_to||''}
                        onChange={e => {
                          const u = CRM_USERS.find(x => x.email === e.target.value)
                          setFormData({...formData, assigned_to: e.target.value, assigned_name: u?.name||''})
                        }}>
                        <option value="">Unassigned</option>
                        {CRM_USERS.map(u => <option key={u.email} value={u.email}>{u.name}</option>)}
                      </select>
                    </div>
                    <div><Label>Deal Value (EUR)</Label><Input type="number" value={formData.estimated_deal_value||''} onChange={e => setFormData({...formData,estimated_deal_value:e.target.value?parseFloat(e.target.value):undefined})} placeholder="500000" /></div>
                    <div><Label>BESS Potential (MWh)</Label><Input type="number" step="0.1" value={formData.bess_potential_mwh||''} onChange={e => setFormData({...formData,bess_potential_mwh:e.target.value?parseFloat(e.target.value):undefined})} /></div>
                    <div><Label>Next Follow-up</Label><Input type="date" value={formData.next_follow_up||''} onChange={e => setFormData({...formData,next_follow_up:e.target.value})} /></div>
                    <div><Label>Data Source</Label>
                      <select className="w-full border rounded-md px-3 py-2 text-sm" value={formData.data_source||''} onChange={e => setFormData({...formData,data_source:e.target.value})}>
                        <option value="">Select…</option>
                        {DATA_SOURCES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="mt-4"><Label>Notes</Label>
                    <textarea className="w-full border rounded-md px-3 py-2 text-sm min-h-[80px] mt-1"
                      value={formData.notes||''} onChange={e => setFormData({...formData,notes:e.target.value})}
                      placeholder="Research notes, call summary, next steps…" />
                  </div>
                </div>
                <div className="flex gap-3 pt-4 border-t">
                  <Button onClick={saveProspect}><CheckCircle className="w-4 h-4 mr-2" />{editingId?'Update':'Save'}</Button>
                  <Button variant="outline" onClick={() => { setShowForm(false); setEditingId(null); setFormData(EMPTY_PROSPECT) }}>Cancel</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ─── LIST VIEW ─── */}
        {activeView === 'list' && (
          <>
            <Card className="mb-6">
              <CardContent className="pt-4 pb-4">
                <div className="flex flex-wrap items-end gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <Label className="text-xs">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input className="pl-10" placeholder="Plant, company, contact…" value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && fetchProspects()} />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Status</Label>
                    <select className="w-full border rounded-md px-3 py-2 text-sm" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                      <option value="all">All</option>
                      {OUTREACH_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs">Priority</Label>
                    <select className="w-full border rounded-md px-3 py-2 text-sm" value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
                      <option value="all">All</option>
                      {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs">District</Label>
                    <select className="w-full border rounded-md px-3 py-2 text-sm" value={filterDistrict} onChange={e => setFilterDistrict(e.target.value)}>
                      <option value="all">All</option>
                      {DISTRICTS.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs">Assigned</Label>
                    <select className="w-full border rounded-md px-3 py-2 text-sm" value={filterAssigned} onChange={e => setFilterAssigned(e.target.value as 'all'|'mine')}>
                      <option value="all">All</option>
                      <option value="mine">Mine only</option>
                    </select>
                  </div>
                  <Button size="sm" onClick={fetchProspects}><Filter className="w-4 h-4 mr-1" />Apply</Button>
                </div>
              </CardContent>
            </Card>

            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading…</div>
            ) : prospects.length === 0 ? (
              <Card><CardContent className="py-12 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold mb-2">No Prospects</h3>
                <Button onClick={() => { setFormData(EMPTY_PROSPECT); setEditingId(null); setShowForm(true) }}>
                  <Plus className="w-4 h-4 mr-2" />Add First Prospect
                </Button>
              </CardContent></Card>
            ) : (
              <div className="space-y-3">
                {prospects.map(prospect => (
                  <Card key={prospect.id} className={`overflow-hidden transition-all ${expandedId===prospect.id?'ring-2 ring-blue-200':''}`}>
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-gray-900 truncate">{prospect.plant_name}</h3>
                            {prospect.capacity_mwp && <span className="text-sm text-blue-600 font-medium">{prospect.capacity_mwp} MWp</span>}
                            <Badge className={getStatusColor(prospect.outreach_status||'new')}>
                              {OUTREACH_STATUSES.find(s=>s.value===prospect.outreach_status)?.label||'New'}
                            </Badge>
                            <Badge className={getPriorityColor(prospect.priority||'medium')}>{prospect.priority||'medium'}</Badge>
                            {prospect.offer_type && <Badge variant="outline">{OFFER_TYPES.find(o=>o.value===prospect.offer_type)?.label||prospect.offer_type}</Badge>}
                            {prospect.assigned_name && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-[#1A365D] text-white flex items-center gap-1">
                                <UserCheck className="w-3 h-3" />{prospect.assigned_name}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                            {prospect.company_name && <span className="flex items-center gap-1"><Building className="w-3 h-3" />{prospect.company_name}</span>}
                            {prospect.parent_group && <span className="text-gray-400">({prospect.parent_group})</span>}
                            {prospect.district && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{prospect.district}</span>}
                            {prospect.contact_name && <span className="flex items-center gap-1"><Users className="w-3 h-3" />{prospect.contact_name}{prospect.contact_title&&` (${prospect.contact_title})`}</span>}
                            {prospect.estimated_deal_value && <span className="flex items-center gap-1 text-green-600 font-medium"><DollarSign className="w-3 h-3" />{formatCurrency(prospect.estimated_deal_value)}</span>}
                            {prospect.next_follow_up && <span className="flex items-center gap-1 text-orange-600"><Calendar className="w-3 h-3" />Follow-up: {formatDate(prospect.next_follow_up)}</span>}
                          </div>
                        </div>

                        {/* Quick actions */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {prospect.contact_email && <a href={`mailto:${prospect.contact_email}`} className="p-2 text-gray-400 hover:text-blue-600" title={prospect.contact_email}><Mail className="w-4 h-4" /></a>}
                          {prospect.contact_phone && <a href={`tel:${prospect.contact_phone}`} className="p-2 text-gray-400 hover:text-green-600" title={prospect.contact_phone}><Phone className="w-4 h-4" /></a>}
                          {prospect.contact_linkedin && <a href={prospect.contact_linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-700"><Linkedin className="w-4 h-4" /></a>}
                          {prospect.company_website && <a href={prospect.company_website} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-purple-600"><Globe className="w-4 h-4" /></a>}
                          <button className="p-2 text-gray-400 hover:text-blue-600" onClick={() => { setFormData(prospect); setEditingId(prospect.id||null); setShowForm(true); window.scrollTo({top:0,behavior:'smooth'}) }} title="Edit"><Edit className="w-4 h-4" /></button>
                          <button className="p-2 text-gray-400 hover:text-red-600" onClick={() => prospect.id && deleteProspect(prospect.id)} title="Delete"><Trash2 className="w-4 h-4" /></button>
                          <button className="p-2 text-gray-400 hover:text-gray-600" onClick={() => setExpandedId(expandedId===prospect.id?null:prospect.id||null)}>
                            {expandedId===prospect.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Expanded */}
                      {expandedId === prospect.id && (
                        <div className="mt-4 pt-4 border-t space-y-4">
                          {/* Assign + quick status side-by-side */}
                          <div className="flex flex-wrap gap-6">
                            <div className="flex-1 min-w-[200px]">
                              <Label className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                                <UserCheck className="w-3 h-3" />Assign to
                              </Label>
                              <select
                                className="w-full border rounded-md px-3 py-2 text-sm"
                                value={prospect.assigned_to||''}
                                onChange={e => prospect.id && assignProspect(prospect.id, e.target.value)}>
                                <option value="">Unassigned</option>
                                {CRM_USERS.map(u => <option key={u.email} value={u.email}>{u.name} ({u.email})</option>)}
                              </select>
                            </div>
                            <div className="flex-1 min-w-[240px]">
                              <Label className="text-xs text-gray-500 mb-1">Quick Status Update</Label>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {OUTREACH_STATUSES.map(s => (
                                  <button key={s.value}
                                    className={`text-xs px-2 py-1 rounded-full transition ${
                                      prospect.outreach_status===s.value ? s.color+' font-semibold ring-2 ring-offset-1' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                                    onClick={() => prospect.id && quickUpdateStatus(prospect.id, s.value)}>
                                    {s.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <h4 className="font-medium text-gray-700 mb-2">Plant Details</h4>
                              <dl className="space-y-1">
                                {prospect.cera_license_no && <div><dt className="text-gray-400 text-xs">CERA License</dt><dd className="text-xs">{prospect.cera_license_no}</dd></div>}
                                {prospect.technology      && <div><dt className="text-gray-400 text-xs">Technology</dt><dd>{prospect.technology}</dd></div>}
                                {prospect.bess_potential_mwh && <div><dt className="text-gray-400 text-xs">BESS Potential</dt><dd className="text-green-600 font-medium">{prospect.bess_potential_mwh} MWh</dd></div>}
                                {prospect.location        && <div><dt className="text-gray-400 text-xs">Location</dt><dd>{prospect.location}</dd></div>}
                              </dl>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-700 mb-2">Company</h4>
                              <dl className="space-y-1">
                                {prospect.company_reg_no && <div><dt className="text-gray-400 text-xs">Reg. No.</dt>
                                  <dd><a href="https://efiling.drcor.mcit.gov.cy/DrcorPublic/SearchForm.aspx?sc=0&cultureInfo=en-AU" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{prospect.company_reg_no}</a></dd></div>}
                                {prospect.registered_address && <div><dt className="text-gray-400 text-xs">Address</dt><dd>{prospect.registered_address}</dd></div>}
                              </dl>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-700 mb-2">Outreach Timeline</h4>
                              <dl className="space-y-1">
                                {prospect.first_contact_date && <div><dt className="text-gray-400 text-xs">First Contact</dt><dd>{formatDate(prospect.first_contact_date)}</dd></div>}
                                {prospect.last_contact_date  && <div><dt className="text-gray-400 text-xs">Last Contact</dt><dd>{formatDate(prospect.last_contact_date)}</dd></div>}
                                {prospect.outreach_channel   && <div><dt className="text-gray-400 text-xs">Channel</dt><dd className="capitalize">{prospect.outreach_channel.replace('_',' ')}</dd></div>}
                              </dl>
                            </div>
                          </div>
                          {prospect.notes && (
                            <div>
                              <h4 className="font-medium text-gray-700 text-sm mb-1">Notes</h4>
                              <p className="text-sm text-gray-600 bg-gray-50 rounded p-3 whitespace-pre-wrap">{prospect.notes}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* ─── PIPELINE VIEW ─── */}
        {activeView === 'pipeline' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Sales Pipeline</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {OUTREACH_STATUSES.filter(s => !['won','lost','not_interested'].includes(s.value)).map(status => {
                const sp = prospects.filter(p => p.outreach_status === status.value)
                return (
                  <Card key={status.value} className="min-h-[200px]">
                    <CardHeader className="pb-2 pt-4 px-4">
                      <div className="flex items-center justify-between">
                        <Badge className={status.color}>{status.label}</Badge>
                        <span className="text-xs text-gray-400">{sp.length}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="px-3 pb-3">
                      <div className="space-y-2">
                        {sp.length === 0 ? <p className="text-xs text-gray-400 text-center py-4">Empty</p> :
                          sp.map(p => (
                            <div key={p.id} className="bg-white border rounded p-2 text-xs shadow-sm hover:shadow cursor-pointer"
                              onClick={() => { setActiveView('list'); setExpandedId(p.id||null) }}>
                              <p className="font-medium truncate">{p.plant_name}</p>
                              <p className="text-gray-400 truncate">{p.company_name}</p>
                              {p.assigned_name && <p className="text-[#1A365D] font-medium">{p.assigned_name}</p>}
                              {p.capacity_mwp && <p className="text-blue-500">{p.capacity_mwp} MWp</p>}
                            </div>
                          ))
                        }
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* ─── DSO/TSO VIEW (unchanged) ─── */}
        {activeView === 'grid_contacts' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">DSO / TSO / Regulatory Contacts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card><CardHeader><CardTitle className="flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-600" />EAC - DSO</CardTitle><CardDescription>Grid connections, metering, distribution</CardDescription></CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /><a href="tel:+35722201000" className="text-blue-600 hover:underline">+357 22 201000</a><span className="text-gray-400">| Emergency: 1800</span></p>
                  <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /><a href="mailto:eac@eac.com.cy" className="text-blue-600 hover:underline">eac@eac.com.cy</a></p>
                  <p className="flex items-center gap-2"><Globe className="w-4 h-4 text-gray-400" /><a href="https://www.eac.com.cy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.eac.com.cy</a></p>
                </CardContent>
              </Card>
              <Card><CardHeader><CardTitle className="flex items-center gap-2"><Zap className="w-5 h-5 text-blue-600" />TSOC - Transmission SO</CardTitle><CardDescription>Transmission grid, RES integration, ENTSO-E</CardDescription></CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p className="flex items-center gap-2"><Users className="w-4 h-4 text-gray-400" /><strong>Director:</strong> Stavros Stavrinos</p>
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /><a href="tel:+35722277000" className="text-blue-600 hover:underline">+357 22 277000</a></p>
                  <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /><a href="mailto:director@dsm.org.cy" className="text-blue-600 hover:underline">director@dsm.org.cy</a></p>
                  <p className="flex items-center gap-2"><Globe className="w-4 h-4 text-gray-400" /><a href="https://www.tsoc.org.cy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.tsoc.org.cy</a></p>
                </CardContent>
              </Card>
              <Card><CardHeader><CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5 text-green-600" />CERA</CardTitle><CardDescription>Licensing, regulation, producer archive</CardDescription></CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /><a href="tel:+35722666363" className="text-blue-600 hover:underline">+357 22 666363</a></p>
                  <p className="flex items-center gap-2"><Globe className="w-4 h-4 text-gray-400" /><a href="https://www.cera.org.cy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.cera.org.cy</a></p>
                  <p className="flex items-center gap-2"><ExternalLink className="w-4 h-4 text-gray-400" /><a href="https://www.cera.org.cy/en-gb/ilektrismos/1169/ilektrismos-paragwgoi1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Producers & Licensing Archive</a></p>
                </CardContent>
              </Card>
              <Card><CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="w-5 h-5 text-purple-600" />CSE Energy Exchange</CardTitle><CardDescription>Day-Ahead Market operator</CardDescription></CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p className="flex items-center gap-2"><Globe className="w-4 h-4 text-gray-400" /><a href="https://www.cse.com.cy/en-GB/AGORA-ELECTRISMOY/Home/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CSE Energy Market Portal</a></p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* ─── DATA SOURCES VIEW ─── */}
        {activeView === 'data_sources' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Research Data Sources</h2>
            <div className="space-y-4">
              <Card><CardHeader><CardTitle className="text-base">1. CERA Licensing Archive</CardTitle></CardHeader>
                <CardContent className="text-sm"><a href="https://www.cera.org.cy/en-gb/ilektrismos/1169/ilektrismos-paragwgoi1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CERA Producers Page →</a> — download the licensing archive for all licensed RES producers (capacity, location, company name, licence number).</CardContent>
              </Card>
              <Card><CardHeader><CardTitle className="text-base">2. Cyprus Company Register</CardTitle></CardHeader>
                <CardContent className="text-sm"><a href="https://efiling.drcor.mcit.gov.cy/DrcorPublic/SearchForm.aspx?sc=0&cultureInfo=en-AU" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Department of Registrar →</a> — free search for directors, registered address, group structure. Our enrichment pipeline pulls this automatically.</CardContent>
              </Card>
              <Card><CardHeader><CardTitle className="text-base">3. LinkedIn</CardTitle></CardHeader>
                <CardContent className="text-sm">Search director names from the register → find profiles → connect with personalised BESS/curtailment pitch.</CardContent>
              </Card>
              <Card><CardHeader><CardTitle className="text-base">4. Hunter.io (integrated)</CardTitle></CardHeader>
                <CardContent className="text-sm">Our enrichment pipeline uses Hunter to find and verify developer email addresses automatically — run <code>npm run cyprus:full</code> locally.</CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-xs text-gray-400">
        Lighthief Cyprus Ltd · HE 477423 · solarfarms.cy
      </div>
    </div>
  )
}
