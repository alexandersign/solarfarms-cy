'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Mail, 
  MapPin, 
  TrendingUp, 
  Clock,
  FileText,
  ArrowRight,
  RefreshCw,
  ExternalLink
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

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [landAssessments, setLandAssessments] = useState<LandAssessment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const [contactsRes, landRes] = await Promise.all([
        fetch('/api/admin/contacts'),
        fetch('/api/admin/land-assessments')
      ])
      
      if (contactsRes.ok) {
        const contactsData = await contactsRes.json()
        setContacts(contactsData.data || [])
      }
      
      if (landRes.ok) {
        const landData = await landRes.json()
        setLandAssessments(landData.data || [])
      }
    } catch (err) {
      setError('Failed to fetch data. Make sure Supabase is connected.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      'new': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'contacted': 'bg-blue-100 text-blue-800',
      'qualified': 'bg-purple-100 text-purple-800',
      'closed': 'bg-gray-100 text-gray-800',
      'contracted': 'bg-green-100 text-green-800'
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
              <p className="text-gray-600">SolarFarms.cy Lead Management</p>
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
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
            <p className="text-red-600 text-sm mt-1">
              Note: Admin features require Supabase to be connected and running.
            </p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Contacts</p>
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
                  <p className="text-sm text-gray-600">New This Week</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {contacts.filter(c => {
                      const weekAgo = new Date()
                      weekAgo.setDate(weekAgo.getDate() - 7)
                      return new Date(c.created_at) > weekAgo
                    }).length}
                  </p>
                </div>
                <TrendingUp className="w-10 h-10 text-purple-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Review</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {contacts.filter(c => c.status === 'new').length + 
                     landAssessments.filter(l => l.status === 'pending').length}
                  </p>
                </div>
                <Clock className="w-10 h-10 text-yellow-500 opacity-50" />
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
                  <p className="text-sm">Leads will appear here when submitted</p>
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
                  <p className="text-sm">Landowner submissions will appear here</p>
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
                        {assessment.solar_potential && (
                          <>
                            <span>•</span>
                            <span className="font-medium text-green-600">{assessment.solar_potential}</span>
                          </>
                        )}
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
                      <div className="text-xs text-gray-400 mt-2">
                        {formatDate(assessment.created_at)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
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
              <Link href="/projects/park-ref-5001">
                <div className="text-left">
                  <div className="font-semibold">View Featured Park</div>
                  <div className="text-sm text-gray-500">PARK-REF-5001</div>
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
      </div>
    </div>
  )
}
