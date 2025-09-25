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
