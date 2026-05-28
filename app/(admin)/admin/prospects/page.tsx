'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
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
  ArrowLeft,
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
  Copy
} from 'lucide-react'
import type { PvProspect } from '@/lib/supabase'

// Constants
const OUTREACH_STATUSES = [
  { value: 'new', label: 'New', color: 'bg-gray-100 text-gray-800' },
  { value: 'researching', label: 'Researching', color: 'bg-blue-100 text-blue-800' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'responded', label: 'Responded', color: 'bg-green-100 text-green-800' },
  { value: 'meeting_set', label: 'Meeting Set', color: 'bg-purple-100 text-purple-800' },
  { value: 'proposal_sent', label: 'Proposal Sent', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'negotiating', label: 'Negotiating', color: 'bg-orange-100 text-orange-800' },
  { value: 'won', label: 'Won', color: 'bg-emerald-100 text-emerald-800' },
  { value: 'lost', label: 'Lost', color: 'bg-red-100 text-red-800' },
  { value: 'not_interested', label: 'Not Interested', color: 'bg-slate-100 text-slate-800' },
]

const PRIORITIES = [
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
]

const OFFER_TYPES = [
  { value: 'bess_retrofit', label: 'BESS Retrofit' },
  { value: 'acquisition', label: 'Acquisition' },
  { value: 'epc', label: 'EPC Services' },
  { value: 'o_and_m', label: 'O&M Services' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'consulting', label: 'Consulting' },
]

const DISTRICTS = ['Nicosia', 'Limassol', 'Larnaca', 'Paphos', 'Famagusta']

const DATA_SOURCES = [
  { value: 'cera', label: 'CERA Licensing Archive' },
  { value: 'company_register', label: 'Cyprus Company Register' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'referral', label: 'Referral' },
  { value: 'web_research', label: 'Web Research' },
  { value: 'conference', label: 'Conference / Event' },
  { value: 'tsoc', label: 'TSOC / DSO' },
]

const TECHNOLOGIES = ['PV', 'Wind', 'Biomass', 'BESS', 'Hybrid', 'CSP']

const PLANT_STATUSES = [
  { value: 'operational', label: 'Operational' },
  { value: 'under_construction', label: 'Under Construction' },
  { value: 'licensed', label: 'Licensed' },
  { value: 'planned', label: 'Planned' },
  { value: 'decommissioned', label: 'Decommissioned' },
]

// Empty form state
const EMPTY_PROSPECT: PvProspect = {
  plant_name: '',
  cera_license_no: '',
  capacity_mwp: undefined,
  technology: 'PV',
  plant_status: 'operational',
  location: '',
  district: '',
  grid_connection_point: '',
  commissioning_date: '',
  curtailment_rate: undefined,
  company_name: '',
  company_reg_no: '',
  parent_group: '',
  registered_address: '',
  company_website: '',
  contact_name: '',
  contact_title: '',
  contact_email: '',
  contact_phone: '',
  contact_linkedin: '',
  secondary_contact_name: '',
  secondary_contact_title: '',
  secondary_contact_email: '',
  secondary_contact_phone: '',
  secondary_contact_linkedin: '',
  outreach_status: 'new',
  outreach_channel: '',
  first_contact_date: '',
  last_contact_date: '',
  next_follow_up: '',
  offer_type: '',
  estimated_deal_value: undefined,
  bess_potential_mwh: undefined,
  notes: '',
  data_source: '',
  tags: [],
  priority: 'medium',
}

export default function ProspectsPage() {
  const [prospects, setProspects] = useState<PvProspect[]>([])
  const [stats, setStats] = useState<{
    total: number
    byStatus: Record<string, number>
    byPriority: Record<string, number>
    totalPipeline: number
    totalCapacity: number
  }>({ total: 0, byStatus: {}, byPriority: {}, totalPipeline: 0, totalCapacity: 0 })
  const [followUps, setFollowUps] = useState<PvProspect[]>([])
  const [loading, setLoading] = useState(true)
  const [adminKey, setAdminKey] = useState('')
  const [activeView, setActiveView] = useState<'list' | 'pipeline' | 'grid_contacts' | 'data_sources'>('list')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [formData, setFormData] = useState<PvProspect>(EMPTY_PROSPECT)
  const [actionResult, setActionResult] = useState<{ success: boolean; message: string } | null>(null)

  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterDistrict, setFilterDistrict] = useState('all')
  const [filterOfferType, setFilterOfferType] = useState('all')

  const fetchProspects = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filterStatus !== 'all') params.set('status', filterStatus)
      if (filterPriority !== 'all') params.set('priority', filterPriority)
      if (filterDistrict !== 'all') params.set('district', filterDistrict)
      if (filterOfferType !== 'all') params.set('offer_type', filterOfferType)
      if (searchQuery) params.set('search', searchQuery)

      const [prospectsRes, followUpsRes] = await Promise.all([
        fetch(`/api/admin/prospects?${params.toString()}`),
        fetch('/api/admin/prospects/follow-ups')
      ])

      if (prospectsRes.ok) {
        const data = await prospectsRes.json()
        setProspects(data.data || [])
        setStats(data.stats || { total: 0, byStatus: {}, byPriority: {}, totalPipeline: 0, totalCapacity: 0 })
      }

      if (followUpsRes.ok) {
        const data = await followUpsRes.json()
        setFollowUps(data.data || [])
      }
    } catch {
      setActionResult({ success: false, message: 'Failed to fetch prospects' })
    } finally {
      setLoading(false)
    }
  }, [filterStatus, filterPriority, filterDistrict, filterOfferType, searchQuery])

  useEffect(() => {
    const storedKey = localStorage.getItem('adminKey')
    if (storedKey) setAdminKey(storedKey)
    fetchProspects()
  }, [fetchProspects])

  const saveProspect = async () => {
    if (!adminKey) {
      setActionResult({ success: false, message: 'Please set admin key first' })
      return
    }
    if (!formData.plant_name) {
      setActionResult({ success: false, message: 'Plant name is required' })
      return
    }

    try {
      const method = editingId ? 'PUT' : 'POST'
      const body = editingId ? { ...formData, id: editingId } : formData

      const res = await fetch('/api/admin/prospects', {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify(body),
      })

      const result = await res.json()
      setActionResult({ success: result.success, message: result.message })

      if (result.success) {
        setShowForm(false)
        setEditingId(null)
        setFormData(EMPTY_PROSPECT)
        fetchProspects()
      }
    } catch {
      setActionResult({ success: false, message: 'Network error saving prospect' })
    }
  }

  const deleteProspect = async (id: string) => {
    if (!adminKey) return
    if (!confirm('Are you sure you want to delete this prospect?')) return

    try {
      const res = await fetch(`/api/admin/prospects?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey },
      })
      const result = await res.json()
      setActionResult({ success: result.success, message: result.message })
      if (result.success) fetchProspects()
    } catch {
      setActionResult({ success: false, message: 'Failed to delete' })
    }
  }

  const quickUpdateStatus = async (id: string, outreach_status: string) => {
    if (!adminKey) return
    try {
      const now = new Date().toISOString()
      const updates: Partial<PvProspect> = { outreach_status: outreach_status as PvProspect['outreach_status'] }

      if (outreach_status === 'contacted' || outreach_status === 'responded') {
        updates.last_contact_date = now
      }
      if (!prospects.find(p => p.id === id)?.first_contact_date && outreach_status === 'contacted') {
        updates.first_contact_date = now
      }

      const res = await fetch('/api/admin/prospects', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({ id, ...updates }),
      })
      if (res.ok) fetchProspects()
    } catch {
      // silent fail on quick update
    }
  }

  const startEdit = (prospect: PvProspect) => {
    setFormData(prospect)
    setEditingId(prospect.id || null)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const exportCSV = () => {
    if (!adminKey) return
    window.open(`/api/admin/prospects/export?key=${encodeURIComponent(adminKey)}`, '_blank')
  }

  const copyEmailList = () => {
    const emails = prospects
      .filter(p => p.contact_email)
      .map(p => p.contact_email)
      .join(', ')
    navigator.clipboard.writeText(emails)
    setActionResult({ success: true, message: `Copied ${emails.split(',').length} email addresses` })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    return OUTREACH_STATUSES.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority: string) => {
    return PRIORITIES.find(p => p.value === priority)?.color || 'bg-gray-100 text-gray-800'
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Admin
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PV Plant Prospects</h1>
                <Link
                  href="/admin/prospects/plants"
                  className="text-sm font-medium text-[#1A365D] hover:underline mt-1 inline-block"
                >
                  Cyprus plant intelligence (CERA × EAC) →
                </Link>
                <p className="text-gray-600">Track plant owners, outreach, and deals</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={fetchProspects} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={exportCSV}>
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" size="sm" onClick={copyEmailList}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Emails
              </Button>
              <Button
                onClick={() => {
                  setFormData(EMPTY_PROSPECT)
                  setEditingId(null)
                  setShowForm(!showForm)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Prospect
              </Button>
            </div>
          </div>

          {/* Admin Key */}
          <div className="flex items-end gap-4 mt-4">
            <div className="flex-1 max-w-md">
              <Input
                type="password"
                value={adminKey}
                onChange={(e) => {
                  setAdminKey(e.target.value)
                  localStorage.setItem('adminKey', e.target.value)
                }}
                placeholder="Admin secret key"
                className="text-sm"
              />
            </div>
          </div>

          {/* View Tabs */}
          <div className="flex gap-2 mt-4">
            {[
              { key: 'list', label: 'Prospect List', icon: Users },
              { key: 'pipeline', label: 'Pipeline', icon: BarChart3 },
              { key: 'grid_contacts', label: 'DSO / TSO Contacts', icon: Zap },
              { key: 'data_sources', label: 'Data Sources', icon: Globe },
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={activeView === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveView(key as typeof activeView)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Action Result Banner */}
        {actionResult && (
          <div
            className={`border rounded-lg p-4 mb-6 flex items-center gap-3 ${
              actionResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}
          >
            {actionResult.success ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <p className={actionResult.success ? 'text-green-800' : 'text-red-800'}>
              {actionResult.message}
            </p>
            <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setActionResult(null)}>
              Dismiss
            </Button>
          </div>
        )}

        {/* Follow-ups Alert */}
        {followUps.length > 0 && activeView === 'list' && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-800">
                    {followUps.length} Follow-up{followUps.length > 1 ? 's' : ''} Due
                  </h3>
                  <div className="mt-2 space-y-1">
                    {followUps.slice(0, 5).map((f) => (
                      <div key={f.id} className="flex items-center gap-2 text-sm text-orange-700">
                        <Clock className="w-3 h-3" />
                        <span className="font-medium">{f.plant_name}</span>
                        <span>({f.company_name})</span>
                        <span>- due {formatDate(f.next_follow_up)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        {activeView === 'list' && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="pt-4 pb-3">
                <p className="text-xs text-gray-500">Total Prospects</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-3">
                <p className="text-xs text-gray-500">Active Pipeline</p>
                <p className="text-2xl font-bold text-green-600">
                  {(stats.byStatus['contacted'] || 0) +
                    (stats.byStatus['responded'] || 0) +
                    (stats.byStatus['meeting_set'] || 0) +
                    (stats.byStatus['proposal_sent'] || 0) +
                    (stats.byStatus['negotiating'] || 0)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-3">
                <p className="text-xs text-gray-500">Pipeline Value</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.totalPipeline > 0 ? formatCurrency(stats.totalPipeline) : '-'}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-3">
                <p className="text-xs text-gray-500">Total Capacity</p>
                <p className="text-2xl font-bold text-purple-600">
                  {stats.totalCapacity > 0 ? `${stats.totalCapacity.toFixed(1)} MWp` : '-'}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-3">
                <p className="text-xs text-gray-500">Won Deals</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.byStatus['won'] || 0}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ============= ADD/EDIT FORM ============= */}
        {showForm && (
          <Card className="mb-6 border-2 border-blue-200">
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Prospect' : 'Add New Prospect'}</CardTitle>
              <CardDescription>Enter plant, company, and contact details from your research</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Plant Information */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Plant Information
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label>Plant Name *</Label>
                      <Input
                        value={formData.plant_name}
                        onChange={(e) => setFormData({ ...formData, plant_name: e.target.value })}
                        placeholder="e.g. Kokkinotrimithia Solar Park"
                      />
                    </div>
                    <div>
                      <Label>CERA License No.</Label>
                      <Input
                        value={formData.cera_license_no || ''}
                        onChange={(e) => setFormData({ ...formData, cera_license_no: e.target.value })}
                        placeholder="e.g. E-123/2020"
                      />
                    </div>
                    <div>
                      <Label>Capacity (MWp)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.capacity_mwp || ''}
                        onChange={(e) =>
                          setFormData({ ...formData, capacity_mwp: e.target.value ? parseFloat(e.target.value) : undefined })
                        }
                        placeholder="e.g. 10.5"
                      />
                    </div>
                    <div>
                      <Label>Technology</Label>
                      <select
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={formData.technology || 'PV'}
                        onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
                      >
                        {TECHNOLOGIES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>Plant Status</Label>
                      <select
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={formData.plant_status || 'operational'}
                        onChange={(e) => setFormData({ ...formData, plant_status: e.target.value })}
                      >
                        {PLANT_STATUSES.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>District</Label>
                      <select
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={formData.district || ''}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      >
                        <option value="">Select district...</option>
                        {DISTRICTS.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={formData.location || ''}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Village / area name"
                      />
                    </div>
                    <div>
                      <Label>Curtailment Rate (%)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={formData.curtailment_rate || ''}
                        onChange={(e) =>
                          setFormData({ ...formData, curtailment_rate: e.target.value ? parseFloat(e.target.value) : undefined })
                        }
                        placeholder="e.g. 45.8"
                      />
                    </div>
                    <div>
                      <Label>Commissioning Date</Label>
                      <Input
                        value={formData.commissioning_date || ''}
                        onChange={(e) => setFormData({ ...formData, commissioning_date: e.target.value })}
                        placeholder="e.g. 2020 or Jan 2022"
                      />
                    </div>
                  </div>
                </div>

                {/* Company Information */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Building className="w-4 h-4" /> Company Information
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label>Company Name</Label>
                      <Input
                        value={formData.company_name || ''}
                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                        placeholder="e.g. SunEnergy Cyprus Ltd"
                      />
                    </div>
                    <div>
                      <Label>Company Reg. No.</Label>
                      <Input
                        value={formData.company_reg_no || ''}
                        onChange={(e) => setFormData({ ...formData, company_reg_no: e.target.value })}
                        placeholder="e.g. HE 123456"
                      />
                    </div>
                    <div>
                      <Label>Parent Group</Label>
                      <Input
                        value={formData.parent_group || ''}
                        onChange={(e) => setFormData({ ...formData, parent_group: e.target.value })}
                        placeholder="e.g. SunGroup Holdings"
                      />
                    </div>
                    <div>
                      <Label>Registered Address</Label>
                      <Input
                        value={formData.registered_address || ''}
                        onChange={(e) => setFormData({ ...formData, registered_address: e.target.value })}
                        placeholder="Address from company register"
                      />
                    </div>
                    <div>
                      <Label>Company Website</Label>
                      <Input
                        value={formData.company_website || ''}
                        onChange={(e) => setFormData({ ...formData, company_website: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>

                {/* Primary Contact */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Primary Decision Maker
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={formData.contact_name || ''}
                        onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <Label>Title / Role</Label>
                      <Input
                        value={formData.contact_title || ''}
                        onChange={(e) => setFormData({ ...formData, contact_title: e.target.value })}
                        placeholder="e.g. CEO, Director"
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={formData.contact_email || ''}
                        onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                        placeholder="email@company.com"
                      />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={formData.contact_phone || ''}
                        onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                        placeholder="+357 ..."
                      />
                    </div>
                    <div>
                      <Label>LinkedIn URL</Label>
                      <Input
                        value={formData.contact_linkedin || ''}
                        onChange={(e) => setFormData({ ...formData, contact_linkedin: e.target.value })}
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  </div>
                </div>

                {/* Secondary Contact */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Secondary Contact
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={formData.secondary_contact_name || ''}
                        onChange={(e) => setFormData({ ...formData, secondary_contact_name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={formData.secondary_contact_title || ''}
                        onChange={(e) => setFormData({ ...formData, secondary_contact_title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={formData.secondary_contact_email || ''}
                        onChange={(e) => setFormData({ ...formData, secondary_contact_email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={formData.secondary_contact_phone || ''}
                        onChange={(e) => setFormData({ ...formData, secondary_contact_phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>LinkedIn URL</Label>
                      <Input
                        value={formData.secondary_contact_linkedin || ''}
                        onChange={(e) => setFormData({ ...formData, secondary_contact_linkedin: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Outreach & Opportunity */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" /> Outreach & Opportunity
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label>Outreach Status</Label>
                      <select
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={formData.outreach_status || 'new'}
                        onChange={(e) =>
                          setFormData({ ...formData, outreach_status: e.target.value as PvProspect['outreach_status'] })
                        }
                      >
                        {OUTREACH_STATUSES.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>Priority</Label>
                      <select
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={formData.priority || 'medium'}
                        onChange={(e) =>
                          setFormData({ ...formData, priority: e.target.value as PvProspect['priority'] })
                        }
                      >
                        {PRIORITIES.map((p) => (
                          <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>Offer Type</Label>
                      <select
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={formData.offer_type || ''}
                        onChange={(e) => setFormData({ ...formData, offer_type: e.target.value })}
                      >
                        <option value="">Select offer type...</option>
                        {OFFER_TYPES.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>Outreach Channel</Label>
                      <select
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={formData.outreach_channel || ''}
                        onChange={(e) => setFormData({ ...formData, outreach_channel: e.target.value })}
                      >
                        <option value="">Select channel...</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="referral">Referral</option>
                        <option value="in_person">In Person</option>
                      </select>
                    </div>
                    <div>
                      <Label>Estimated Deal Value (EUR)</Label>
                      <Input
                        type="number"
                        value={formData.estimated_deal_value || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            estimated_deal_value: e.target.value ? parseFloat(e.target.value) : undefined,
                          })
                        }
                        placeholder="e.g. 500000"
                      />
                    </div>
                    <div>
                      <Label>BESS Potential (MWh)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={formData.bess_potential_mwh || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bess_potential_mwh: e.target.value ? parseFloat(e.target.value) : undefined,
                          })
                        }
                        placeholder="e.g. 10.5"
                      />
                    </div>
                    <div>
                      <Label>Next Follow-up</Label>
                      <Input
                        type="date"
                        value={formData.next_follow_up || ''}
                        onChange={(e) => setFormData({ ...formData, next_follow_up: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Data Source</Label>
                      <select
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={formData.data_source || ''}
                        onChange={(e) => setFormData({ ...formData, data_source: e.target.value })}
                      >
                        <option value="">Select source...</option>
                        {DATA_SOURCES.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label>Notes</Label>
                    <textarea
                      className="w-full border rounded-md px-3 py-2 text-sm min-h-[80px] mt-1"
                      value={formData.notes || ''}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Research notes, call summary, next steps..."
                    />
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center gap-3 pt-4 border-t">
                  <Button onClick={saveProspect}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {editingId ? 'Update Prospect' : 'Save Prospect'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowForm(false)
                      setEditingId(null)
                      setFormData(EMPTY_PROSPECT)
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ============= PROSPECT LIST VIEW ============= */}
        {activeView === 'list' && (
          <>
            {/* Filters */}
            <Card className="mb-6">
              <CardContent className="pt-4 pb-4">
                <div className="flex flex-wrap items-end gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <Label className="text-xs">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        className="pl-10"
                        placeholder="Plant, company, contact, group..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && fetchProspects()}
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Status</Label>
                    <select
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      {OUTREACH_STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs">Priority</Label>
                    <select
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                    >
                      <option value="all">All Priorities</option>
                      {PRIORITIES.map((p) => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs">District</Label>
                    <select
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      value={filterDistrict}
                      onChange={(e) => setFilterDistrict(e.target.value)}
                    >
                      <option value="all">All Districts</option>
                      {DISTRICTS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs">Offer Type</Label>
                    <select
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      value={filterOfferType}
                      onChange={(e) => setFilterOfferType(e.target.value)}
                    >
                      <option value="all">All Types</option>
                      {OFFER_TYPES.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                  <Button size="sm" onClick={fetchProspects}>
                    <Filter className="w-4 h-4 mr-1" /> Apply
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Prospect Cards */}
            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading prospects...</div>
            ) : prospects.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold mb-2">No Prospects Yet</h3>
                  <p className="text-gray-600 mb-4">
                    Start adding PV plant owners from CERA&apos;s licensing archive, the Cyprus company register, or
                    LinkedIn research.
                  </p>
                  <Button
                    onClick={() => {
                      setFormData(EMPTY_PROSPECT)
                      setEditingId(null)
                      setShowForm(true)
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add First Prospect
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {prospects.map((prospect) => (
                  <Card
                    key={prospect.id}
                    className={`overflow-hidden transition-all ${
                      expandedId === prospect.id ? 'ring-2 ring-blue-200' : ''
                    }`}
                  >
                    <div className="p-4">
                      {/* Main Row */}
                      <div className="flex items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-gray-900 truncate">{prospect.plant_name}</h3>
                            {prospect.capacity_mwp && (
                              <span className="text-sm text-blue-600 font-medium">
                                {prospect.capacity_mwp} MWp
                              </span>
                            )}
                            <Badge className={getStatusColor(prospect.outreach_status || 'new')}>
                              {OUTREACH_STATUSES.find((s) => s.value === prospect.outreach_status)?.label || 'New'}
                            </Badge>
                            <Badge className={getPriorityColor(prospect.priority || 'medium')}>
                              {prospect.priority || 'medium'}
                            </Badge>
                            {prospect.offer_type && (
                              <Badge variant="outline">
                                {OFFER_TYPES.find((o) => o.value === prospect.offer_type)?.label || prospect.offer_type}
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                            {prospect.company_name && (
                              <span className="flex items-center gap-1">
                                <Building className="w-3 h-3" /> {prospect.company_name}
                              </span>
                            )}
                            {prospect.parent_group && (
                              <span className="text-gray-400">({prospect.parent_group})</span>
                            )}
                            {prospect.district && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {prospect.district}
                              </span>
                            )}
                            {prospect.contact_name && (
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" /> {prospect.contact_name}
                                {prospect.contact_title && ` (${prospect.contact_title})`}
                              </span>
                            )}
                            {prospect.estimated_deal_value && (
                              <span className="flex items-center gap-1 text-green-600 font-medium">
                                <DollarSign className="w-3 h-3" /> {formatCurrency(prospect.estimated_deal_value)}
                              </span>
                            )}
                            {prospect.next_follow_up && (
                              <span className="flex items-center gap-1 text-orange-600">
                                <Calendar className="w-3 h-3" /> Follow-up: {formatDate(prospect.next_follow_up)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {prospect.contact_email && (
                            <a
                              href={`mailto:${prospect.contact_email}`}
                              className="p-2 text-gray-400 hover:text-blue-600 transition"
                              title={prospect.contact_email}
                            >
                              <Mail className="w-4 h-4" />
                            </a>
                          )}
                          {prospect.contact_phone && (
                            <a
                              href={`tel:${prospect.contact_phone}`}
                              className="p-2 text-gray-400 hover:text-green-600 transition"
                              title={prospect.contact_phone}
                            >
                              <Phone className="w-4 h-4" />
                            </a>
                          )}
                          {prospect.contact_linkedin && (
                            <a
                              href={prospect.contact_linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-gray-400 hover:text-blue-700 transition"
                            >
                              <Linkedin className="w-4 h-4" />
                            </a>
                          )}
                          {prospect.company_website && (
                            <a
                              href={prospect.company_website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-gray-400 hover:text-purple-600 transition"
                            >
                              <Globe className="w-4 h-4" />
                            </a>
                          )}
                          <button
                            className="p-2 text-gray-400 hover:text-blue-600 transition"
                            onClick={() => startEdit(prospect)}
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-gray-400 hover:text-red-600 transition"
                            onClick={() => prospect.id && deleteProspect(prospect.id)}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-gray-400 hover:text-gray-600 transition"
                            onClick={() => setExpandedId(expandedId === prospect.id ? null : prospect.id || null)}
                          >
                            {expandedId === prospect.id ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Quick Status Update */}
                      {expandedId === prospect.id && (
                        <div className="mt-4 pt-4 border-t space-y-4">
                          {/* Status Quick Update */}
                          <div>
                            <Label className="text-xs text-gray-500">Quick Status Update</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {OUTREACH_STATUSES.map((s) => (
                                <button
                                  key={s.value}
                                  className={`text-xs px-2 py-1 rounded-full transition ${
                                    prospect.outreach_status === s.value
                                      ? s.color + ' font-semibold ring-2 ring-offset-1'
                                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                  }`}
                                  onClick={() => prospect.id && quickUpdateStatus(prospect.id, s.value)}
                                >
                                  {s.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Details Grid */}
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <h4 className="font-medium text-gray-700 mb-2">Plant Details</h4>
                              <dl className="space-y-1">
                                {prospect.cera_license_no && (
                                  <div>
                                    <dt className="text-gray-400 text-xs">CERA License</dt>
                                    <dd>{prospect.cera_license_no}</dd>
                                  </div>
                                )}
                                {prospect.technology && (
                                  <div>
                                    <dt className="text-gray-400 text-xs">Technology</dt>
                                    <dd>{prospect.technology}</dd>
                                  </div>
                                )}
                                {prospect.plant_status && (
                                  <div>
                                    <dt className="text-gray-400 text-xs">Plant Status</dt>
                                    <dd className="capitalize">{prospect.plant_status.replace('_', ' ')}</dd>
                                  </div>
                                )}
                                {prospect.location && (
                                  <div>
                                    <dt className="text-gray-400 text-xs">Location</dt>
                                    <dd>{prospect.location}</dd>
                                  </div>
                                )}
                                {prospect.curtailment_rate !== undefined && prospect.curtailment_rate !== null && (
                                  <div>
                                    <dt className="text-gray-400 text-xs">Curtailment</dt>
                                    <dd className="text-red-600 font-medium">{prospect.curtailment_rate}%</dd>
                                  </div>
                                )}
                                {prospect.bess_potential_mwh && (
                                  <div>
                                    <dt className="text-gray-400 text-xs">BESS Potential</dt>
                                    <dd className="text-green-600 font-medium">{prospect.bess_potential_mwh} MWh</dd>
                                  </div>
                                )}
                              </dl>
                            </div>

                            <div>
                              <h4 className="font-medium text-gray-700 mb-2">Company</h4>
                              <dl className="space-y-1">
                                {prospect.company_reg_no && (
                                  <div>
                                    <dt className="text-gray-400 text-xs">Reg. No.</dt>
                                    <dd>
                                      <a
                                        href={`https://efiling.drcor.mcit.gov.cy/DrcorPublic/SearchForm.aspx?sc=0&cultureInfo=en-AU`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                      >
                                        {prospect.company_reg_no}
                                      </a>
                                    </dd>
                                  </div>
                                )}
                                {prospect.registered_address && (
                                  <div>
                                    <dt className="text-gray-400 text-xs">Registered Address</dt>
                                    <dd>{prospect.registered_address}</dd>
                                  </div>
                                )}
                                {prospect.data_source && (
                                  <div>
                                    <dt className="text-gray-400 text-xs">Data Source</dt>
                                    <dd className="capitalize">{prospect.data_source.replace('_', ' ')}</dd>
                                  </div>
                                )}
                              </dl>
                            </div>

                            <div>
                              <h4 className="font-medium text-gray-700 mb-2">Outreach Timeline</h4>
                              <dl className="space-y-1">
                                {prospect.first_contact_date && (
                                  <div>
                                    <dt className="text-gray-400 text-xs">First Contact</dt>
                                    <dd>{formatDate(prospect.first_contact_date)}</dd>
                                  </div>
                                )}
                                {prospect.last_contact_date && (
                                  <div>
                                    <dt className="text-gray-400 text-xs">Last Contact</dt>
                                    <dd>{formatDate(prospect.last_contact_date)}</dd>
                                  </div>
                                )}
                                {prospect.outreach_channel && (
                                  <div>
                                    <dt className="text-gray-400 text-xs">Channel</dt>
                                    <dd className="capitalize">{prospect.outreach_channel.replace('_', ' ')}</dd>
                                  </div>
                                )}
                              </dl>
                            </div>
                          </div>

                          {/* Notes */}
                          {prospect.notes && (
                            <div>
                              <h4 className="font-medium text-gray-700 text-sm mb-1">Notes</h4>
                              <p className="text-sm text-gray-600 bg-gray-50 rounded p-3 whitespace-pre-wrap">
                                {prospect.notes}
                              </p>
                            </div>
                          )}

                          {/* Secondary Contact */}
                          {prospect.secondary_contact_name && (
                            <div className="text-sm">
                              <h4 className="font-medium text-gray-700 mb-1">Secondary Contact</h4>
                              <p>
                                {prospect.secondary_contact_name}
                                {prospect.secondary_contact_title && ` (${prospect.secondary_contact_title})`}
                                {prospect.secondary_contact_email && (
                                  <>
                                    {' '}
                                    - <a href={`mailto:${prospect.secondary_contact_email}`} className="text-blue-600 hover:underline">{prospect.secondary_contact_email}</a>
                                  </>
                                )}
                                {prospect.secondary_contact_phone && ` - ${prospect.secondary_contact_phone}`}
                              </p>
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

        {/* ============= PIPELINE VIEW ============= */}
        {activeView === 'pipeline' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Sales Pipeline</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {OUTREACH_STATUSES.filter(
                (s) => !['won', 'lost', 'not_interested'].includes(s.value)
              ).map((status) => {
                const stageProspects = prospects.filter((p) => p.outreach_status === status.value)
                return (
                  <Card key={status.value} className="min-h-[200px]">
                    <CardHeader className="pb-2 pt-4 px-4">
                      <div className="flex items-center justify-between">
                        <Badge className={status.color}>{status.label}</Badge>
                        <span className="text-xs text-gray-400">{stageProspects.length}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="px-3 pb-3">
                      <div className="space-y-2">
                        {stageProspects.length === 0 ? (
                          <p className="text-xs text-gray-400 text-center py-4">Empty</p>
                        ) : (
                          stageProspects.map((p) => (
                            <div
                              key={p.id}
                              className="bg-white border rounded p-2 text-xs shadow-sm hover:shadow transition cursor-pointer"
                              onClick={() => {
                                setActiveView('list')
                                setExpandedId(p.id || null)
                              }}
                            >
                              <p className="font-medium truncate">{p.plant_name}</p>
                              <p className="text-gray-400 truncate">{p.company_name}</p>
                              {p.capacity_mwp && (
                                <p className="text-blue-500">{p.capacity_mwp} MWp</p>
                              )}
                              {p.estimated_deal_value && (
                                <p className="text-green-600 font-medium">
                                  {formatCurrency(p.estimated_deal_value)}
                                </p>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Won / Lost Summary */}
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <Card className="border-green-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-4 h-4" /> Won ({stats.byStatus['won'] || 0})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {prospects
                    .filter((p) => p.outreach_status === 'won')
                    .map((p) => (
                      <div key={p.id} className="text-sm py-1">
                        {p.plant_name} - {p.company_name}{' '}
                        {p.estimated_deal_value && `(${formatCurrency(p.estimated_deal_value)})`}
                      </div>
                    ))}
                  {!prospects.some((p) => p.outreach_status === 'won') && (
                    <p className="text-sm text-gray-400">No won deals yet</p>
                  )}
                </CardContent>
              </Card>
              <Card className="border-red-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2 text-red-700">
                    <XCircle className="w-4 h-4" /> Lost / Not Interested (
                    {(stats.byStatus['lost'] || 0) + (stats.byStatus['not_interested'] || 0)})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {prospects
                    .filter((p) => p.outreach_status === 'lost' || p.outreach_status === 'not_interested')
                    .map((p) => (
                      <div key={p.id} className="text-sm py-1">
                        {p.plant_name} - {p.company_name}
                      </div>
                    ))}
                  {!prospects.some(
                    (p) => p.outreach_status === 'lost' || p.outreach_status === 'not_interested'
                  ) && <p className="text-sm text-gray-400">None lost</p>}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* ============= DSO/TSO GRID CONTACTS VIEW ============= */}
        {activeView === 'grid_contacts' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">DSO / TSO / Regulatory Contacts</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* EAC DSO */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    EAC - Distribution System Operator (DSO)
                  </CardTitle>
                  <CardDescription>Handles grid connections, metering, distribution network</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    11 Amfipoleos St., 2025 Strovolos, P.O. Box 24506, 1399 Lefkosia
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a href="tel:+35722201000" className="text-blue-600 hover:underline">+357 22 201000</a>
                    <span className="text-gray-400">| Emergency: 1800</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href="mailto:eac@eac.com.cy" className="text-blue-600 hover:underline">eac@eac.com.cy</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <a href="https://www.eac.com.cy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      www.eac.com.cy
                    </a>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-gray-600">
                      <strong>DSO Unit:</strong> Responsible for distribution network operation, connection terms for
                      renewables, smart grid, meter management. 
                      <a 
                        href="https://www.eac.com.cy/EN/RegulatedActivities/Distribution/about/Pages/distributionsoperator.aspx" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline ml-1"
                      >
                        DSO Page
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* TSOC */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    TSOC - Transmission System Operator Cyprus
                  </CardTitle>
                  <CardDescription>Transmission grid operation, RES integration, ENTSO-E member</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <strong>Director:</strong> Stavros Stavrinos
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a href="tel:+35722277000" className="text-blue-600 hover:underline">+357 22 277000</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href="mailto:director@dsm.org.cy" className="text-blue-600 hover:underline">director@dsm.org.cy</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <a href="https://www.tsoc.org.cy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      www.tsoc.org.cy
                    </a>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-gray-600">
                      Contact page: <a href="https://www.tsoc.org.cy/organization/contact-us/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">tsoc.org.cy/organization/contact-us/</a>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* CERA */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-600" />
                    CERA - Cyprus Energy Regulatory Authority
                  </CardTitle>
                  <CardDescription>Licensing, regulation, producer archive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    81-83 Griva Digeni Avenue, 1080 Nicosia
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a href="tel:+35722666363" className="text-blue-600 hover:underline">+357 22 666363</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <a href="https://www.cera.org.cy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      www.cera.org.cy
                    </a>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-gray-600">
                      <strong>Key Pages:</strong><br />
                      <a href="https://www.cera.org.cy/en-gb/ilektrismos/1169/ilektrismos-paragwgoi1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Producers &amp; Licensing Archive
                      </a>
                      {' | '}
                      <a href="https://www.cera.org.cy/en-gb/ilektrismos/1169/eksairesi-ape" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        RES Exemptions (50kW-8MW)
                      </a>
                      {' | '}
                      <a href="https://www.cera.org.cy/en-gb/smv" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Market Participants Share
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* CSE Energy Market */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    CSE - Cyprus Energy Exchange
                  </CardTitle>
                  <CardDescription>Day-Ahead Market operator, participant data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <a href="https://www.cse.com.cy/en-GB/AGORA-ELECTRISMOY/Home/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      CSE Energy Market Portal
                    </a>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-gray-600">
                      Operates the Cyprus electricity Day-Ahead Market. Lists registered market participants 
                      (generators, suppliers) with production/consumption data.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* ============= DATA SOURCES VIEW ============= */}
        {activeView === 'data_sources' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Research Data Sources</h2>
            <p className="text-gray-600">
              Use these sources to find PV plant owners, company details, decision makers, and contact information for outreach.
            </p>

            <div className="space-y-6">
              {/* CERA */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">1. CERA Licensing Archive - Find PV Plants</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">How to use:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-blue-700">
                      <li>
                        Go to{' '}
                        <a href="https://www.cera.org.cy/en-gb/ilektrismos/1169/ilektrismos-paragwgoi1" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                          CERA Producers Page
                        </a>
                      </li>
                      <li>Download the Licensing Archive (contains all licensed producers)</li>
                      <li>Filter for RES/PV producers - you get: license holder name, plant capacity, location, license number</li>
                      <li>
                        For plants under 8MW, check the{' '}
                        <a href="https://www.cera.org.cy/en-gb/ilektrismos/1169/eksairesi-ape" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                          RES Exemptions page
                        </a>{' '}
                        (50kW-8MW exempted plants)
                      </li>
                      <li>
                        Check{' '}
                        <a href="https://www.cera.org.cy/en-gb/smv" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                          Market Participants Share
                        </a>{' '}
                        for monthly generation data showing active producers
                      </li>
                    </ol>
                  </div>
                  <p className="text-gray-600">
                    <strong>What you get:</strong> Company name (license holder), capacity (kW/MW), location, license number, date of issue.
                  </p>
                </CardContent>
              </Card>

              {/* Company Register */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">2. Cyprus Company Register - Find Owners &amp; Directors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">How to use:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-green-700">
                      <li>
                        Go to{' '}
                        <a href="https://efiling.drcor.mcit.gov.cy/DrcorPublic/SearchForm.aspx?sc=0&cultureInfo=en-AU" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                          Department of Registrar - Company Search
                        </a>
                      </li>
                      <li>Search by company name from CERA license (e.g., &quot;SunEnergy&quot;, &quot;Solar&quot;, &quot;Photovoltaic&quot;)</li>
                      <li>
                        <strong>Free data:</strong> Company name, registration date, type, status, registered office, current directors/secretary
                      </li>
                      <li>
                        <strong>Paid search (EUR 10):</strong> Full historic file - all directors history, shareholders, share capital, charges/mortgages
                      </li>
                      <li>Use directors names to find the parent group - search again for the holding company</li>
                    </ol>
                  </div>
                  <p className="text-gray-600">
                    <strong>What you get:</strong> Directors/shareholders (decision makers), registered address, group structure, company status.
                  </p>
                  <div className="bg-yellow-50 rounded-lg p-3 mt-2">
                    <p className="text-yellow-800 text-xs">
                      <strong>Tip:</strong> Most PV SPVs are registered as HE (Limited Company). Search &quot;HE&quot; + company name. 
                      Directors of the SPV are often the same individuals running the parent group - this reveals the group structure.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* LinkedIn */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">3. LinkedIn - Find Decision Makers &amp; Contact Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Search strategies:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-blue-700">
                      <li>
                        <strong>Company search:</strong> Search for the company name on LinkedIn &rarr; go to &quot;People&quot; tab to find employees
                      </li>
                      <li>
                        <strong>People search:</strong> Use director names from company register &rarr; find their LinkedIn profiles
                      </li>
                      <li>
                        <strong>Industry filter:</strong> Search &quot;solar&quot; or &quot;renewable energy&quot; + &quot;Cyprus&quot; to discover more players
                      </li>
                      <li>
                        <strong>Sales Navigator (paid):</strong> Advanced filters by title (CEO, Director, Managing Partner), 
                        company size, industry, geography (Cyprus)
                      </li>
                      <li>Save profiles and connection-request with personalized messages about BESS/curtailment solutions</li>
                    </ol>
                  </div>
                  <p className="text-gray-600">
                    <strong>What you get:</strong> Decision maker names, titles, email (if shared), phone, company context, mutual connections for warm intros.
                  </p>
                </CardContent>
              </Card>

              {/* Email Discovery */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">4. Email Discovery Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-2">Tools to find email addresses:</h4>
                    <ul className="space-y-2 text-purple-700">
                      <li>
                        <strong>Hunter.io</strong> -{' '}
                        <a href="https://hunter.io" target="_blank" rel="noopener noreferrer" className="underline">
                          hunter.io
                        </a>{' '}
                        - Enter company domain, find all email patterns and verified addresses (50 free/month)
                      </li>
                      <li>
                        <strong>Apollo.io</strong> -{' '}
                        <a href="https://www.apollo.io" target="_blank" rel="noopener noreferrer" className="underline">
                          apollo.io
                        </a>{' '}
                        - B2B database with email + phone, Chrome extension for LinkedIn profiles
                      </li>
                      <li>
                        <strong>Lusha</strong> -{' '}
                        <a href="https://www.lusha.com" target="_blank" rel="noopener noreferrer" className="underline">
                          lusha.com
                        </a>{' '}
                        - Chrome extension to reveal contact info from LinkedIn profiles
                      </li>
                      <li>
                        <strong>Snov.io</strong> -{' '}
                        <a href="https://snov.io" target="_blank" rel="noopener noreferrer" className="underline">
                          snov.io
                        </a>{' '}
                        - Email finder + drip campaign tool
                      </li>
                      <li>
                        <strong>RocketReach</strong> -{' '}
                        <a href="https://rocketreach.co" target="_blank" rel="noopener noreferrer" className="underline">
                          rocketreach.co
                        </a>{' '}
                        - Look up emails and phone numbers by name + company
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 mt-2">
                    <p className="text-gray-700 text-xs">
                      <strong>Pattern guessing:</strong> Once you know one email from a company (e.g., john@company.com),
                      you can guess others: firstname@, firstname.lastname@, f.lastname@. Verify with Hunter or NeverBounce.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Workflow */}
              <Card className="border-2 border-gray-300">
                <CardHeader>
                  <CardTitle className="text-base">Recommended Research Workflow</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <div>
                        <p className="font-medium">Download CERA licensing archive</p>
                        <p className="text-gray-500">Get all licensed PV producers with capacity, location, company name</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <div>
                        <p className="font-medium">Look up each company in Cyprus Company Register</p>
                        <p className="text-gray-500">Get directors, registered address, parent group (free search)</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <div>
                        <p className="font-medium">Find directors on LinkedIn</p>
                        <p className="text-gray-500">Search director names, verify role, get LinkedIn profile URL</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold flex-shrink-0">4</div>
                      <div>
                        <p className="font-medium">Discover email &amp; phone</p>
                        <p className="text-gray-500">Use Hunter.io / Apollo / Lusha to find verified contact details</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold flex-shrink-0">5</div>
                      <div>
                        <p className="font-medium">Add prospect to this tracker</p>
                        <p className="text-gray-500">Enter all data, set priority, plan outreach channel &amp; follow-up date</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold flex-shrink-0">6</div>
                      <div>
                        <p className="font-medium">Execute outreach</p>
                        <p className="text-gray-500">Email, call, or LinkedIn message. Update status and notes after each touch.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
