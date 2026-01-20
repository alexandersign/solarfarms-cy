import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// POST - Bulk add subscribers
export async function POST(request: NextRequest) {
  try {
    // Check admin key
    const adminKey = request.headers.get('x-admin-key')
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    const { emails, source = 'admin-import' } = body
    
    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No emails provided' },
        { status: 400 }
      )
    }
    
    // Filter valid emails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const validEmails = emails
      .map((e: string) => e.trim().toLowerCase())
      .filter((e: string) => emailRegex.test(e))
    
    if (validEmails.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No valid emails found' },
        { status: 400 }
      )
    }
    
    // Prepare records for upsert
    const records = validEmails.map((email: string) => ({
      email,
      source,
      status: 'active'
    }))
    
    // Upsert to handle duplicates gracefully
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .upsert(records, { 
        onConflict: 'email',
        ignoreDuplicates: false 
      })
      .select()
    
    if (error) throw error
    
    return NextResponse.json({ 
      success: true, 
      message: `Added/updated ${validEmails.length} subscribers`,
      added: validEmails.length,
      emails: validEmails
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to add subscribers', error: String(error) },
      { status: 500 }
    )
  }
}
