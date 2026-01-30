'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Users, 
  Mail, 
  MapPin, 
  TrendingUp, 
  Clock,
  FileText,
  RefreshCw,
  ExternalLink,
  Send,
  Building,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap
} from 'lucide-react'

interface Contact {
  id: string
  created_at: string
  name: string
  email: string
  phone?: string
  company?: string
  investment_size: string
  timeline: string
  message?: string
  status: string
}

interface LandAssessment {
  id: string
  created_at: string
  owner_name: string
  owner_email: string
  owner_phone?: string
  plot_size?: string
  location?: string
  title_deed_url?: string
  status: string
  estimated_value?: string
  solar_potential?: string
}

interface Project {
  id: string
  reference_code: string
  title: string
  slug: string
  status: string
  capacity_mwp: number
  total_capex: number
  featured: boolean
  newsletter_sent_at?: string
  newsletter_sent_to?: number
}

interface SubscriberStats {
  total: number
  active: number
  unsubscribed: number
}

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [landAssessments, setLandAssessments] = useState<LandAssessment[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [subscriberStats, setSubscriberStats] = useState<SubscriberStats>({ total: 0, active: 0, unsubscribed: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'newsletter'>('overview')
  const [sendingNewsletter, setSendingNewsletter] = useState<string | null>(null)
  const [newsletterResult, setNewsletterResult] = useState<{ success: boolean; message: string } | null>(null)
  const [adminKey, setAdminKey] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [bulkEmails, setBulkEmails] = useState('')
  const [addingSubscriber, setAddingSubscriber] = useState(false)
  const [importResult, setImportResult] = useState<{ success: boolean; message: string } | null>(null)
  const [initializingDb, setInitializingDb] = useState(false)
  const [initResult, setInitResult] = useState<{ success: boolean; message: string; results?: string[] } | null>(null)
  const [importingLeads, setImportingLeads] = useState(false)
  const [leadsImportResult, setLeadsImportResult] = useState<{ success: boolean; message: string } | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const [contactsRes, landRes, projectsRes, subscribersRes] = await Promise.all([
        fetch('/api/admin/contacts'),
        fetch('/api/admin/land-assessments'),
        fetch('/api/admin/projects'),
        fetch('/api/admin/subscribers', {
          headers: { 'x-admin-key': adminKey || localStorage.getItem('adminKey') || '' }
        })
      ])
      
      if (contactsRes.ok) {
        const contactsData = await contactsRes.json()
        setContacts(contactsData.data || [])
      }
      
      if (landRes.ok) {
        const landData = await landRes.json()
        setLandAssessments(landData.data || [])
      }
      
      if (projectsRes.ok) {
        const projectsData = await projectsRes.json()
        setProjects(projectsData.data || [])
      }
      
      if (subscribersRes.ok) {
        const subscribersData = await subscribersRes.json()
        setSubscriberStats(subscribersData.stats || { total: 0, active: 0, unsubscribed: 0 })
      }
    } catch (err) {
      setError('Failed to fetch data. Make sure Supabase is connected.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Try to get admin key from localStorage
    const storedKey = localStorage.getItem('adminKey')
    if (storedKey) {
      setAdminKey(storedKey)
    }
    fetchData()
  }, [])

  const saveAdminKey = () => {
    localStorage.setItem('adminKey', adminKey)
    fetchData()
  }

  const sendProjectNewsletter = async (projectId: string, projectName: string) => {
    if (!adminKey) {
      alert('Please enter admin key first')
      return
    }
    
    setSendingNewsletter(projectId)
    setNewsletterResult(null)
    
    try {
      const response = await fetch('/api/admin/send-project-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey
        },
        body: JSON.stringify({ projectId })
      })
      
      const result = await response.json()
      setNewsletterResult({
        success: result.success,
        message: result.message || (result.success ? `Newsletter sent for ${projectName}` : 'Failed to send')
      })
      
      if (result.success) {
        fetchData() // Refresh to show updated newsletter status
      }
    } catch (err) {
      setNewsletterResult({
        success: false,
        message: 'Network error sending newsletter'
      })
    } finally {
      setSendingNewsletter(null)
    }
  }

  const addSingleSubscriber = async () => {
    if (!newEmail || !adminKey) return
    
    setAddingSubscriber(true)
    setImportResult(null)
    
    try {
      const response = await fetch('/api/admin/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey
        },
        body: JSON.stringify({ email: newEmail })
      })
      
      const result = await response.json()
      setImportResult({
        success: result.success,
        message: result.success ? `Added ${newEmail}` : result.message
      })
      
      if (result.success) {
        setNewEmail('')
        fetchData()
      }
    } catch {
      setImportResult({ success: false, message: 'Failed to add subscriber' })
    } finally {
      setAddingSubscriber(false)
    }
  }

  const addBulkSubscribers = async () => {
    if (!bulkEmails.trim() || !adminKey) return
    
    setAddingSubscriber(true)
    setImportResult(null)
    
    const emails = bulkEmails
      .split('\n')
      .map(e => e.trim())
      .filter(e => e.length > 0)
    
    try {
      const response = await fetch('/api/admin/subscribers/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey
        },
        body: JSON.stringify({ emails })
      })
      
      const result = await response.json()
      setImportResult({
        success: result.success,
        message: result.success ? `Successfully imported ${result.added} subscribers` : result.message
      })
      
      if (result.success) {
        setBulkEmails('')
        fetchData()
      }
    } catch {
      setImportResult({ success: false, message: 'Failed to import subscribers' })
    } finally {
      setAddingSubscriber(false)
    }
  }

  const initializeDatabase = async () => {
    if (!adminKey) {
      alert('Please enter admin key first')
      return
    }
    
    setInitializingDb(true)
    setInitResult(null)
    
    try {
      const response = await fetch('/api/admin/init-database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey
        }
      })
      
      const result = await response.json()
      setInitResult({
        success: result.success,
        message: result.message,
        results: result.results
      })
      
      if (result.success) {
        fetchData()
      }
    } catch {
      setInitResult({ success: false, message: 'Failed to initialize database' })
    } finally {
      setInitializingDb(false)
    }
  }

  const importLeadsToNewsletter = async () => {
    if (!adminKey) {
      alert('Please enter admin key first')
      return
    }
    
    setImportingLeads(true)
    setLeadsImportResult(null)
    
    try {
      const response = await fetch('/api/admin/import-leads-to-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey
        },
        body: JSON.stringify({})
      })
      
      const result = await response.json()
      setLeadsImportResult({
        success: result.success,
        message: result.success 
          ? `✅ Imported ${result.imported} investor leads to newsletter!` 
          : result.message
      })
      
      if (result.success) {
        fetchData()
      }
    } catch {
      setLeadsImportResult({ success: false, message: 'Failed to import leads' })
    } finally {
      setImportingLeads(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      'new': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'contacted': 'bg-blue-100 text-blue-800',
      'qualified': 'bg-purple-100 text-purple-800',
      'closed': 'bg-gray-100 text-gray-800',
      'contracted': 'bg-green-100 text-green-800',
      'draft': 'bg-gray-100 text-gray-800',
      'available': 'bg-green-100 text-green-800',
      'under_offer': 'bg-yellow-100 text-yellow-800',
      'sold': 'bg-red-100 text-red-800',
      'construction': 'bg-blue-100 text-blue-800',
      'operational': 'bg-green-100 text-green-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">SolarFarms.cy Management</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={fetchData} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="gradient" asChild>
                <Link href="/">
                  View Website
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-4 mt-6">
            <Button 
              variant={activeTab === 'overview' ? 'default' : 'outline'}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </Button>
            <Button 
              variant={activeTab === 'projects' ? 'default' : 'outline'}
              onClick={() => setActiveTab('projects')}
            >
              <Building className="w-4 h-4 mr-2" />
              Projects
            </Button>
            <Button 
              variant={activeTab === 'newsletter' ? 'default' : 'outline'}
              onClick={() => setActiveTab('newsletter')}
            >
              <Mail className="w-4 h-4 mr-2" />
              Newsletter
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Admin Key Input */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <Label htmlFor="adminKey">Admin Secret Key</Label>
                <Input
                  id="adminKey"
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="Enter admin secret key for protected actions"
                />
              </div>
              <Button onClick={saveAdminKey}>Save Key</Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Required for sending newsletters and managing projects. Set ADMIN_SECRET_KEY in Vercel env vars.
            </p>
          </CardContent>
        </Card>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {newsletterResult && (
          <div className={`border rounded-lg p-4 mb-6 flex items-center gap-3 ${
            newsletterResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          }`}>
            {newsletterResult.success ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <p className={newsletterResult.success ? 'text-green-800' : 'text-red-800'}>
              {newsletterResult.message}
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-auto"
              onClick={() => setNewsletterResult(null)}
            >
              Dismiss
            </Button>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div className="grid md:grid-cols-5 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Investor Leads</p>
                      <p className="text-3xl font-bold text-gray-900">{contacts.length}</p>
                    </div>
                    <Users className="w-10 h-10 text-blue-500 opacity-50" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Land Assessments</p>
                      <p className="text-3xl font-bold text-gray-900">{landAssessments.length}</p>
                    </div>
                    <MapPin className="w-10 h-10 text-green-500 opacity-50" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Projects</p>
                      <p className="text-3xl font-bold text-gray-900">{projects.length}</p>
                    </div>
                    <Building className="w-10 h-10 text-purple-500 opacity-50" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Subscribers</p>
                      <p className="text-3xl font-bold text-gray-900">{subscriberStats.active}</p>
                    </div>
                    <Mail className="w-10 h-10 text-yellow-500 opacity-50" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">New This Week</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {contacts.filter(c => {
                          const weekAgo = new Date()
                          weekAgo.setDate(weekAgo.getDate() - 7)
                          return new Date(c.created_at) > weekAgo
                        }).length}
                      </p>
                    </div>
                    <TrendingUp className="w-10 h-10 text-green-500 opacity-50" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Contacts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Recent Investor Leads
                  </CardTitle>
                  <CardDescription>Contact form submissions from investors</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8 text-gray-500">Loading...</div>
                  ) : contacts.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No contacts yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {contacts.slice(0, 5).map((contact) => (
                        <div key={contact.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                              <p className="text-sm text-gray-600">{contact.email}</p>
                            </div>
                            <Badge className={getStatusBadge(contact.status)}>
                              {contact.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="font-medium text-green-600">{contact.investment_size}</span>
                            <span>•</span>
                            <span>{contact.timeline}</span>
                            <span>•</span>
                            <span>{formatDate(contact.created_at)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Land Assessments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Recent Land Assessments
                  </CardTitle>
                  <CardDescription>Landowner submissions for solar development</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8 text-gray-500">Loading...</div>
                  ) : landAssessments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No land assessments yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {landAssessments.slice(0, 5).map((assessment) => (
                        <div key={assessment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{assessment.owner_name}</h4>
                              <p className="text-sm text-gray-600">{assessment.location}</p>
                            </div>
                            <Badge className={getStatusBadge(assessment.status)}>
                              {assessment.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="font-medium text-blue-600">{assessment.plot_size}</span>
                            {assessment.title_deed_url && (
                              <>
                                <span>•</span>
                                <a 
                                  href={assessment.title_deed_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline flex items-center gap-1"
                                >
                                  <FileText className="w-3 h-3" />
                                  Title Deed
                                </a>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Project Management</h2>
              <Button 
                variant="gradient" 
                onClick={initializeDatabase}
                disabled={initializingDb || !adminKey}
              >
                {initializingDb ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Initializing...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Add All Projects
                  </>
                )}
              </Button>
            </div>

            {initResult && (
              <Card className={initResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    {initResult.success ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className={`font-medium ${initResult.success ? 'text-green-800' : 'text-red-800'}`}>
                        {initResult.message}
                      </p>
                      {initResult.results && (
                        <ul className="mt-2 space-y-1 text-sm">
                          {initResult.results.map((r, i) => (
                            <li key={i} className={initResult.success ? 'text-green-700' : 'text-red-700'}>
                              {r}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setInitResult(null)}>
                      Dismiss
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {projects.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Building className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold mb-2">No Projects in Database</h3>
                  <p className="text-gray-600 mb-6">
                    Click the button above to automatically add all projects.
                  </p>
                  <Button 
                    variant="solar" 
                    size="lg"
                    onClick={initializeDatabase}
                    disabled={initializingDb || !adminKey}
                  >
                    {initializingDb ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Adding Projects...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Initialize Projects Now
                      </>
                    )}
                  </Button>
                  {!adminKey && (
                    <p className="text-sm text-red-500 mt-4">
                      ⚠️ Please enter your admin key at the top of the page first
                    </p>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <div className="flex items-start gap-6 p-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{project.title}</h3>
                          <Badge className={getStatusBadge(project.status)}>
                            {project.status}
                          </Badge>
                          {project.featured && (
                            <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          Ref: {project.reference_code} • {project.capacity_mwp} MWp • {formatCurrency(project.total_capex || 0)}
                        </p>
                        <div className="flex items-center gap-4">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/projects/${project.slug}`}>
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Page
                            </Link>
                          </Button>
                          
                          {project.newsletter_sent_at ? (
                            <div className="flex items-center gap-2 text-green-600 text-sm">
                              <CheckCircle className="w-4 h-4" />
                              Newsletter sent to {project.newsletter_sent_to} subscribers
                              <span className="text-gray-400">
                                ({formatDate(project.newsletter_sent_at)})
                              </span>
                            </div>
                          ) : (
                            <Button 
                              variant="solar" 
                              size="sm"
                              onClick={() => sendProjectNewsletter(project.id, project.title)}
                              disabled={sendingNewsletter === project.id || !adminKey}
                            >
                              {sendingNewsletter === project.id ? (
                                <>
                                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                  Sending...
                                </>
                              ) : (
                                <>
                                  <Send className="w-4 h-4 mr-2" />
                                  Send Newsletter
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Newsletter Tab */}
        {activeTab === 'newsletter' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Subscribers</p>
                      <p className="text-3xl font-bold text-green-600">{subscriberStats.active}</p>
                    </div>
                    <CheckCircle className="w-10 h-10 text-green-500 opacity-50" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Subscribers</p>
                      <p className="text-3xl font-bold text-gray-900">{subscriberStats.total}</p>
                    </div>
                    <Users className="w-10 h-10 text-blue-500 opacity-50" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Unsubscribed</p>
                      <p className="text-3xl font-bold text-gray-400">{subscriberStats.unsubscribed}</p>
                    </div>
                    <XCircle className="w-10 h-10 text-gray-300 opacity-50" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Quick Send: Agios Theodoros Project Newsletter
                </CardTitle>
                <CardDescription>
                  Send an announcement to all active subscribers about the new RTB project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-solar-50 border border-solar-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-solar-800 mb-2">
                    Agios Theodoros Solar Park with Battery Storage
                  </h4>
                  <ul className="text-sm text-solar-700 space-y-1">
                    <li>• 2.64 MWp Solar + 10.56 MWh BESS</li>
                    <li>• Total CAPEX: €4.59M</li>
                    <li>• Leveraged IRR: 35%+</li>
                    <li>• Target: Q4 2026</li>
                  </ul>
                </div>
                
                {projects.find(p => p.slug === 'agios-theodoros-rtb') ? (
                  <Button 
                    variant="gradient"
                    onClick={() => {
                      const project = projects.find(p => p.slug === 'agios-theodoros-rtb')
                      if (project) {
                        sendProjectNewsletter(project.id, project.title)
                      }
                    }}
                    disabled={sendingNewsletter !== null || !adminKey}
                    className="w-full"
                  >
                    {sendingNewsletter ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Sending to {subscriberStats.active} subscribers...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Newsletter to {subscriberStats.active} Subscribers
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-yellow-800 font-medium">Project not in database yet</p>
                      <p className="text-yellow-700 text-sm">
                        Run the SQL schema in Supabase to add the Agios Theodoros project, then refresh this page.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Import Existing Leads */}
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Import Existing Investor Leads
                </CardTitle>
                <CardDescription>
                  Add all your contact form submissions to the newsletter list with one click
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-blue-800">
                        You have <span className="text-2xl font-bold">{contacts.length}</span> investor leads
                      </p>
                      <p className="text-sm text-blue-600 mt-1">
                        Import them all to your newsletter subscriber list
                      </p>
                    </div>
                    <Mail className="w-10 h-10 text-blue-400" />
                  </div>
                </div>
                
                <Button 
                  variant="gradient"
                  className="w-full"
                  onClick={importLeadsToNewsletter}
                  disabled={importingLeads || !adminKey || contacts.length === 0}
                >
                  {importingLeads ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Importing {contacts.length} leads...
                    </>
                  ) : (
                    <>
                      <Users className="w-4 h-4 mr-2" />
                      Import All {contacts.length} Investor Leads
                    </>
                  )}
                </Button>

                {leadsImportResult && (
                  <div className={`mt-4 rounded-lg p-4 flex items-start gap-3 ${
                    leadsImportResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}>
                    {leadsImportResult.success ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    )}
                    <p className={leadsImportResult.success ? 'text-green-800' : 'text-red-800'}>
                      {leadsImportResult.message}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Add Subscribers Manually */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add More Subscribers
                </CardTitle>
                <CardDescription>
                  Manually add additional emails not in your leads database
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Single Email */}
                  <div>
                    <Label htmlFor="singleEmail">Add Single Email</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        id="singleEmail"
                        type="email"
                        placeholder="investor@example.com"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                      />
                      <Button 
                        onClick={addSingleSubscriber}
                        disabled={!newEmail || !adminKey || addingSubscriber}
                      >
                        {addingSubscriber ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  {/* Bulk Import */}
                  <div>
                    <Label htmlFor="bulkEmails">Bulk Import (one email per line)</Label>
                    <textarea
                      id="bulkEmails"
                      className="w-full mt-2 p-3 border rounded-lg min-h-[120px] text-sm"
                      placeholder="investor1@example.com&#10;investor2@example.com&#10;investor3@example.com"
                      value={bulkEmails}
                      onChange={(e) => setBulkEmails(e.target.value)}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-500">
                        {bulkEmails.split('\n').filter(e => e.trim()).length} emails entered
                      </span>
                      <Button 
                        onClick={addBulkSubscribers}
                        disabled={!bulkEmails.trim() || !adminKey || addingSubscriber}
                      >
                        {addingSubscriber ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Importing...
                          </>
                        ) : (
                          <>
                            <Users className="w-4 h-4 mr-2" />
                            Import All
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {importResult && (
                    <div className={`rounded-lg p-4 flex items-start gap-3 ${
                      importResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}>
                      {importResult.success ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      )}
                      <div>
                        <p className={importResult.success ? 'text-green-800' : 'text-red-800'}>
                          {importResult.message}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Newsletter Setup</CardTitle>
                <CardDescription>Environment configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Required Environment Variables</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li><code className="bg-gray-200 px-1 rounded">RESEND_API_KEY</code> - Your Resend API key</li>
                      <li><code className="bg-gray-200 px-1 rounded">ADMIN_SECRET_KEY</code> - Secret key for admin actions</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Subscribers are added from:</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Website newsletter signup form</li>
                      <li>• Admin panel (above)</li>
                      <li>• Contact form submissions (auto-subscribe)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        {activeTab === 'overview' && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Button variant="outline" className="justify-start h-auto py-4" asChild>
                <Link href="/contact">
                  <div className="text-left">
                    <div className="font-semibold">Test Contact Form</div>
                    <div className="text-sm text-gray-500">Submit a test lead</div>
                  </div>
                </Link>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-4" asChild>
                <Link href="/landowners">
                  <div className="text-left">
                    <div className="font-semibold">Test Land Assessment</div>
                    <div className="text-sm text-gray-500">Submit a test assessment</div>
                  </div>
                </Link>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-4" asChild>
                <Link href="/projects/agios-theodoros-rtb">
                  <div className="text-left">
                    <div className="font-semibold">View RTB Project</div>
                    <div className="text-sm text-gray-500">Agios Theodoros</div>
                  </div>
                </Link>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-4" asChild>
                <Link href="/calculator">
                  <div className="text-left">
                    <div className="font-semibold">Test Calculator</div>
                    <div className="text-sm text-gray-500">ROI Calculator</div>
                  </div>
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
