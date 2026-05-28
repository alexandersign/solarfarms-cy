'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  ArrowLeft,
  Download,
  RefreshCw,
  Zap,
  Battery,
  Search,
  Filter,
  ExternalLink,
} from 'lucide-react'
import type { EnrichedCyprusPlant } from '@/lib/cyprus-plants-data'

const PLANT_CLASSES = [
  { value: 'pv_only', label: 'PV only' },
  { value: 'pv_bess_hybrid', label: 'PV + BESS' },
  { value: 'bess_standalone', label: 'Standalone BESS' },
]

const SALES_TARGETS = [
  'PV O&M',
  'PV EPC',
  'BESS EPC',
  'BESS O&M',
  'Hybrid EPC (PV + BESS)',
  'PV O&M + BESS O&M',
  'BESS retrofit',
]

const DISTRICTS = ['Nicosia', 'Limassol', 'Larnaca', 'Paphos', 'Famagusta']

interface TopDirector {
  display_name: string
  spv_count: number
  licence_count: number
  total_pv_mwp: number
  companies: string[]
}

export default function CyprusPlantsPage() {
  const [plants, setPlants] = useState<EnrichedCyprusPlant[]>([])
  const [stats, setStats] = useState({
    total: 0,
    eacListed: 0,
    standaloneBess: 0,
    highPriority: 0,
    existingClients: 0,
  })
  const [source, setSource] = useState<'json' | 'supabase'>('json')
  const [loading, setLoading] = useState(true)
  const [adminKey, setAdminKey] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterClass, setFilterClass] = useState('all')
  const [filterEac, setFilterEac] = useState('all')
  const [filterTarget, setFilterTarget] = useState('all')
  const [filterDistrict, setFilterDistrict] = useState('all')
  const [minConfidence, setMinConfidence] = useState('0')
  const [hideClients, setHideClients] = useState(true)
  const [topDirectors, setTopDirectors] = useState<TopDirector[]>([])

  const fetchPlants = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filterClass !== 'all') params.set('plant_class', filterClass)
      if (filterEac === 'yes') params.set('eac_res_listed', 'true')
      if (filterEac === 'no') params.set('eac_res_listed', 'false')
      if (filterTarget !== 'all') params.set('primary_sales_target', filterTarget)
      if (filterDistrict !== 'all') params.set('district', filterDistrict)
      if (minConfidence) params.set('min_match_confidence', minConfidence)
      if (hideClients) params.set('existing_client', 'false')
      if (searchQuery) params.set('search', searchQuery)

      const res = await fetch(`/api/admin/plants?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setPlants(data.data || [])
        setStats(data.stats || stats)
        setSource(data.source || 'json')
      }
    } finally {
      setLoading(false)
    }
  }, [
    filterClass,
    filterEac,
    filterTarget,
    filterDistrict,
    minConfidence,
    hideClients,
    searchQuery,
  ])

  useEffect(() => {
    const storedKey = localStorage.getItem('adminKey')
    if (storedKey) setAdminKey(storedKey)
    fetchPlants()
    fetch('/api/admin/directors')
      .then((r) => r.json())
      .then((d) => setTopDirectors((d.data || []).slice(0, 12)))
      .catch(() => {})
  }, [fetchPlants])

  const exportCsv = () => {
    if (!adminKey) {
      alert('Set admin key on Prospects page first (localStorage adminKey)')
      return
    }
    const params = new URLSearchParams()
    if (filterClass !== 'all') params.set('plant_class', filterClass)
    if (filterEac === 'yes') params.set('eac_res_listed', 'true')
    if (filterTarget !== 'all') params.set('primary_sales_target', filterTarget)
    if (hideClients) params.set('existing_client', 'false')
    window.open(
      `/api/admin/plants/export?${params.toString()}&key=${encodeURIComponent(adminKey)}`,
      '_blank'
    )
  }

  const companyRegisterUrl = (name: string) =>
    `https://efiling.drcor.mcit.gov.cy/DrcorPublic/SearchForm.aspx?sc=0&cultureInfo=en-AU&search=${encodeURIComponent(name)}`

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <Link
            href="/admin/prospects"
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to company prospects
          </Link>
          <h1 className="text-2xl font-bold" style={{ color: '#C9A432' }}>
            Cyprus plant intelligence
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            License-level CERA data matched to EAC RES tables (municipality + capacity).
            EAC listed ≠ private connection terms PDF.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchPlants} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={exportCsv}>
            <Download className="h-4 w-4 mr-1" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Plants</CardDescription>
            <CardTitle>{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>EAC listed</CardDescription>
            <CardTitle>{stats.eacListed}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Standalone BESS</CardDescription>
            <CardTitle>{stats.standaloneBess}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>High priority</CardDescription>
            <CardTitle>{stats.highPriority}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Data source</CardDescription>
            <CardTitle className="text-base">{source}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Company, license, municipality…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-56"
            />
          </div>
          <select
            className="border rounded-md px-2 py-2 text-sm"
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
          >
            <option value="all">All classes</option>
            {PLANT_CLASSES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <select
            className="border rounded-md px-2 py-2 text-sm"
            value={filterEac}
            onChange={(e) => setFilterEac(e.target.value)}
          >
            <option value="all">EAC: any</option>
            <option value="yes">EAC listed</option>
            <option value="no">Not EAC listed</option>
          </select>
          <select
            className="border rounded-md px-2 py-2 text-sm min-w-[200px]"
            value={filterTarget}
            onChange={(e) => setFilterTarget(e.target.value)}
          >
            <option value="all">All sales targets</option>
            {SALES_TARGETS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            className="border rounded-md px-2 py-2 text-sm"
            value={filterDistrict}
            onChange={(e) => setFilterDistrict(e.target.value)}
          >
            <option value="all">All districts</option>
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            className="border rounded-md px-2 py-2 text-sm"
            value={minConfidence}
            onChange={(e) => setMinConfidence(e.target.value)}
          >
            <option value="0">Match conf: any</option>
            <option value="0.5">≥ 0.50</option>
            <option value="0.75">≥ 0.75</option>
            <option value="0.85">≥ 0.85</option>
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={hideClients}
              onChange={(e) => setHideClients(e.target.checked)}
            />
            Hide portfolio clients
          </label>
        </CardContent>
      </Card>

      {topDirectors.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Top directors (multi-SPV)</CardTitle>
            <CardDescription>
              From e-filing register enrichment — e.g. repeat portfolio developers. Full list:{' '}
              <code className="text-xs">marketing/cyprus-top-directors.csv</code>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="py-2 pr-4">Director</th>
                    <th className="py-2 pr-4">SPVs</th>
                    <th className="py-2 pr-4">Licences</th>
                    <th className="py-2 pr-4">PV MWp</th>
                    <th className="py-2">Sample companies</th>
                  </tr>
                </thead>
                <tbody>
                  {topDirectors.map((d) => (
                    <tr key={d.display_name} className="border-b border-slate-100">
                      <td className="py-2 pr-4 font-medium">{d.display_name}</td>
                      <td className="py-2 pr-4">{d.spv_count}</td>
                      <td className="py-2 pr-4">{d.licence_count}</td>
                      <td className="py-2 pr-4">{d.total_pv_mwp?.toFixed(1)}</td>
                      <td className="py-2 text-muted-foreground text-xs">
                        {d.companies?.slice(0, 3).join(' · ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {loading && <p className="text-muted-foreground">Loading…</p>}
        {!loading && plants.length === 0 && (
          <p className="text-muted-foreground">
            No plants. Run pipeline: import-cera-plants → parse-eac-res-pdf → match-cyprus-plants
          </p>
        )}
        {plants.slice(0, 200).map((p) => (
          <Card key={p.cera_license_no} className="overflow-hidden">
            <CardContent className="py-4">
              <div className="flex flex-wrap justify-between gap-2">
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    {p.company_name}
                    {p.existing_client && (
                      <Badge variant="secondary">Portfolio client</Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {p.cera_license_no} · {p.municipality}, {p.district}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 items-start">
                  {p.primary_sales_target && (
                    <Badge className="bg-[#C9A432] text-[#1A365D] font-semibold">
                      {p.primary_sales_target}
                    </Badge>
                  )}
                  {(p.secondary_sales_targets || []).map((s) => (
                    <Badge key={s} variant="outline" className="border-[#1A365D]">
                      + {s}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Zap className="h-3 w-3" /> PV {(p.pv_kw || 0) / 1000} MWp
                </span>
                {(p.bess_kw || 0) > 0 && (
                  <span className="flex items-center gap-1">
                    <Battery className="h-3 w-3" /> BESS {(p.bess_kw || 0) / 1000} MW /{' '}
                    {(p.bess_kwh || 0) / 1000} MWh
                  </span>
                )}
                <span>{p.plant_class}</span>
                <span>{p.license_status}</span>
                {p.eac_res_listed && (
                  <Badge variant="outline" className="border-[#C9A432] text-[#9C7D22]">
                    EAC RES listed
                    {p.eac_match_confidence != null &&
                      ` (${(p.eac_match_confidence * 100).toFixed(0)}%)`}
                  </Badge>
                )}
                <span>Score: {p.priority_score ?? 0}</span>
              </div>
              {p.sales_target_summary && (
                <p className="text-sm text-muted-foreground mt-2">{p.sales_target_summary}</p>
              )}
              {(p.contact_director_1 || p.contact_email) && (
                <div className="text-sm mt-2 space-y-0.5">
                  {p.contact_director_1 && (
                    <p>
                      <strong>Director:</strong> {p.contact_director_1}
                      {p.contact_director_2 ? ` · ${p.contact_director_2}` : ''}
                    </p>
                  )}
                  {p.company_reg_no && (
                    <p className="text-muted-foreground">{p.company_reg_no}</p>
                  )}
                  {p.contact_email && (
                    <p>
                      <a href={`mailto:${p.contact_email}`} className="text-[#2B5FA0]">
                        {p.contact_email}
                      </a>
                      {p.contact_email_source ? ` (${p.contact_email_source})` : ''}
                    </p>
                  )}
                  {p.contact_phone && (
                    <p>
                      <a href={`tel:${p.contact_phone}`} className="text-[#2B5FA0]">
                        {p.contact_phone}
                      </a>
                    </p>
                  )}
                  {p.contact_linkedin && (
                    <p>
                      <a
                        href={p.contact_linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2B5FA0]"
                      >
                        LinkedIn
                      </a>
                    </p>
                  )}
                </div>
              )}
              {p.eac_application_ref && (
                <p className="text-xs text-muted-foreground mt-1">
                  EAC study ref: {p.eac_application_ref}
                  {p.eac_pos_accepted ? ' · POS accepted' : ''}
                </p>
              )}
              <a
                href={companyRegisterUrl(p.company_name)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#2B5FA0] hover:underline inline-flex items-center gap-1 mt-2"
              >
                Company register <ExternalLink className="h-3 w-3" />
              </a>
            </CardContent>
          </Card>
        ))}
        {plants.length > 200 && (
          <p className="text-sm text-muted-foreground">
            Showing first 200 of {plants.length}. Export CSV for full list.
          </p>
        )}
      </div>
    </div>
  )
}
