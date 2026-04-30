import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iipbxwyvlzxthlblayvw.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGJ4d3l2bHp4dGhsYmxheXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3OTM5MjUsImV4cCI6MjA3NDM2OTkyNX0.-hfq9twwZxILD4mIW4Flgngryaxaw34hN1qzY6rBDdE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Contact {
  id?: string
  created_at?: string
  name: string
  email: string
  phone?: string
  company?: string
  investment_size: string
  timeline: string
  message?: string
  source?: string
  status?: 'new' | 'contacted' | 'qualified' | 'closed'
  assigned_to?: string
  notes?: string[]
  attached_files?: string[] // URLs of uploaded files
}

export interface LandAssessment {
  id?: string
  created_at?: string
  owner_name: string
  owner_email: string
  owner_phone?: string
  plot_size?: string
  location?: string
  current_use?: string
  title_deed_url?: string
  assessment_results?: any
  status?: 'pending' | 'assessed' | 'contacted' | 'contracted'
  estimated_value?: string
  solar_potential?: string
  attached_files?: string[] // Additional supporting documents
}

export interface NewsletterSubscriber {
  id?: string
  created_at?: string
  email: string
  source?: string
  status?: 'active' | 'unsubscribed'
}

// Helper functions for database operations
export const contactsService = {
  async create(contact: Contact) {
    const { data, error } = await supabase
      .from('contacts')
      .insert(contact)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getAll() {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async updateStatus(id: string, status: Contact['status']) {
    const { data, error } = await supabase
      .from('contacts')
      .update({ status })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

export const landAssessmentsService = {
  async create(assessment: LandAssessment) {
    const { data, error } = await supabase
      .from('land_assessments')
      .insert(assessment)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getAll() {
    const { data, error } = await supabase
      .from('land_assessments')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}

export const newsletterService = {
  async subscribe(email: string, source?: string) {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email, source })
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// LOI Submission Types
export interface LOISubmission {
  id?: string
  created_at?: string
  updated_at?: string
  investor_name: string
  investor_company?: string
  investor_address: string
  investor_email: string
  investor_phone?: string
  project_name: string
  project_reference?: string
  project_capacity_mw?: number
  estimated_investment?: number
  investment_amount?: number
  investment_type?: 'equity' | 'debt' | 'hybrid'
  timeline?: string
  bess_included?: boolean
  ltsa_tier?: 'A' | 'B' | 'C' | 'D'
  financing_required?: boolean
  conditions?: string[]
  loi_html?: string
  source?: string
  status?: 'received' | 'reviewed' | 'countersigned' | 'expired' | 'withdrawn'
  notes?: string[]
}

export const loiSubmissionsService = {
  async create(submission: LOISubmission) {
    const { data, error } = await supabase
      .from('loi_submissions')
      .insert(submission)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getAll() {
    const { data, error } = await supabase
      .from('loi_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as LOISubmission[]
  },

  async updateStatus(id: string, status: LOISubmission['status'], notes?: string) {
    const updates: Record<string, unknown> = { status }
    if (notes) {
      updates.notes = notes
    }
    const { data, error } = await supabase
      .from('loi_submissions')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },
}

// PV Prospects CRM Types
export interface PvProspect {
  id?: string
  created_at?: string
  updated_at?: string
  plant_name: string
  cera_license_no?: string
  capacity_mwp?: number
  technology?: string
  plant_status?: string
  location?: string
  district?: string
  grid_connection_point?: string
  commissioning_date?: string
  curtailment_rate?: number
  company_name?: string
  company_reg_no?: string
  parent_group?: string
  registered_address?: string
  company_website?: string
  contact_name?: string
  contact_title?: string
  contact_email?: string
  contact_phone?: string
  contact_linkedin?: string
  secondary_contact_name?: string
  secondary_contact_title?: string
  secondary_contact_email?: string
  secondary_contact_phone?: string
  secondary_contact_linkedin?: string
  outreach_status?: 'new' | 'researching' | 'contacted' | 'responded' | 'meeting_set' | 'proposal_sent' | 'negotiating' | 'won' | 'lost' | 'not_interested'
  outreach_channel?: string
  first_contact_date?: string
  last_contact_date?: string
  next_follow_up?: string
  offer_type?: string
  estimated_deal_value?: number
  bess_potential_mwh?: number
  notes?: string
  data_source?: string
  tags?: string[]
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  /** RTB pipeline: candidate | verified | not_rtb | partial_candidate */
  rtb_status?: string
  connection_terms_status?: 'none' | 'applied' | 'preliminary_issued' | 'final_issued'
  env_permit_status?: 'none' | 'applied' | 'approved'
  building_permit_status?: 'none' | 'applied' | 'approved'
  satellite_check?: 'not_built' | 'partially_built' | 'built' | 'unknown'
  /** retrofit | pre_sale | both | none */
  bess_sales_angle?: string
  construction_mwp?: number
  operational_mwp?: number
}

export interface GridOperatorContact {
  id?: string
  created_at?: string
  organization: string
  department?: string
  contact_name?: string
  contact_title?: string
  email?: string
  phone?: string
  address?: string
  website?: string
  notes?: string
}

export const pvProspectsService = {
  async getAll(filters?: {
    outreach_status?: string
    priority?: string
    district?: string
    offer_type?: string
    search?: string
  }) {
    let query = supabase
      .from('pv_prospects')
      .select('*')
      .order('created_at', { ascending: false })

    if (filters?.outreach_status) {
      query = query.eq('outreach_status', filters.outreach_status)
    }
    if (filters?.priority) {
      query = query.eq('priority', filters.priority)
    }
    if (filters?.district) {
      query = query.eq('district', filters.district)
    }
    if (filters?.offer_type) {
      query = query.eq('offer_type', filters.offer_type)
    }
    if (filters?.search) {
      query = query.or(
        `plant_name.ilike.%${filters.search}%,company_name.ilike.%${filters.search}%,contact_name.ilike.%${filters.search}%`
      )
    }

    const { data, error } = await query
    if (error) throw error
    return data as PvProspect[]
  },

  async getStats() {
    const { data, error } = await supabase
      .from('pv_prospects')
      .select('outreach_status, priority, estimated_deal_value, capacity_mwp')

    if (error) throw error

    const prospects = data || []
    const byStatus: Record<string, number> = {}
    const byPriority: Record<string, number> = {}
    let totalPipeline = 0
    let totalCapacity = 0

    for (const p of prospects) {
      byStatus[p.outreach_status || 'new'] = (byStatus[p.outreach_status || 'new'] || 0) + 1
      byPriority[p.priority || 'medium'] = (byPriority[p.priority || 'medium'] || 0) + 1
      totalPipeline += Number(p.estimated_deal_value) || 0
      totalCapacity += Number(p.capacity_mwp) || 0
    }

    return {
      total: prospects.length,
      byStatus,
      byPriority,
      totalPipeline,
      totalCapacity,
    }
  },

  async create(prospect: Partial<PvProspect>) {
    const { data, error } = await supabase
      .from('pv_prospects')
      .insert(prospect)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<PvProspect>) {
    const { data, error } = await supabase
      .from('pv_prospects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('pv_prospects')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  async getDueFollowUps() {
    const today = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('pv_prospects')
      .select('*')
      .lte('next_follow_up', today)
      .not('outreach_status', 'in', '("won","lost","not_interested")')
      .order('next_follow_up', { ascending: true })

    if (error) throw error
    return data as PvProspect[]
  },
}

export const gridOperatorService = {
  async getAll() {
    const { data, error } = await supabase
      .from('grid_operator_contacts')
      .select('*')
      .order('organization', { ascending: true })

    if (error) throw error
    return data as GridOperatorContact[]
  },

  async create(contact: Partial<GridOperatorContact>) {
    const { data, error } = await supabase
      .from('grid_operator_contacts')
      .insert(contact)
      .select()
      .single()

    if (error) throw error
    return data
  },
}

// File Upload Service
export const fileUploadService = {
  async uploadFile(file: File, bucket: string = 'documents', folder?: string): Promise<string> {
    const fileExtension = file.name.split('.').pop()
    const timestamp = Date.now()
    const randomId = Math.random().toString(36).substring(2)
    const fileName = folder 
      ? `${folder}/${timestamp}-${randomId}.${fileExtension}`
      : `${timestamp}-${randomId}.${fileExtension}`
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) throw error
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)
    
    return publicUrl
  },

  async uploadMultipleFiles(files: File[], bucket: string = 'documents', folder?: string): Promise<string[]> {
    const uploadPromises = files.map(file => 
      this.uploadFile(file, bucket, folder)
    )
    
    return Promise.all(uploadPromises)
  },

  async deleteFile(url: string, bucket: string = 'documents'): Promise<void> {
    // Extract file path from URL
    const urlParts = url.split('/')
    const fileName = urlParts[urlParts.length - 1]
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName])
    
    if (error) throw error
  }
}
