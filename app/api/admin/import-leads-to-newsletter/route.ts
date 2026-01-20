import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// POST - Import leads from contacts table to newsletter subscribers
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
    const { selectedIds } = body // Optional: specific contact IDs to import

    // Get contacts to import
    let query = supabase.from('contacts').select('email, name')
    
    if (selectedIds && Array.isArray(selectedIds) && selectedIds.length > 0) {
      query = query.in('id', selectedIds)
    }

    const { data: contacts, error: contactsError } = await query

    if (contactsError) {
      throw contactsError
    }

    if (!contacts || contacts.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No contacts found to import'
      })
    }

    // Get unique emails
    const emails = [...new Set(contacts.map(c => c.email.toLowerCase()))]

    // Prepare records for upsert
    const records = emails.map(email => ({
      email,
      source: 'investor-lead',
      status: 'active'
    }))

    // Upsert to newsletter_subscribers
    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .upsert(records, { 
        onConflict: 'email',
        ignoreDuplicates: false 
      })

    if (insertError) {
      throw insertError
    }

    return NextResponse.json({
      success: true,
      message: `Imported ${emails.length} investor leads to newsletter`,
      imported: emails.length,
      emails
    })

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to import leads', error: String(error) },
      { status: 500 }
    )
  }
}

// GET - Get contacts that can be imported
export async function GET(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key')
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get all contacts
    const { data: contacts, error } = await supabase
      .from('contacts')
      .select('id, name, email, company, investment_size, created_at')
      .order('created_at', { ascending: false })

    if (error) throw error

    // Get existing newsletter subscribers
    const { data: subscribers } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('status', 'active')

    const subscriberEmails = new Set(subscribers?.map(s => s.email.toLowerCase()) || [])

    // Mark which contacts are already subscribed
    const contactsWithStatus = contacts?.map(c => ({
      ...c,
      isSubscribed: subscriberEmails.has(c.email.toLowerCase())
    })) || []

    return NextResponse.json({
      success: true,
      contacts: contactsWithStatus,
      totalContacts: contacts?.length || 0,
      alreadySubscribed: contactsWithStatus.filter(c => c.isSubscribed).length,
      notSubscribed: contactsWithStatus.filter(c => !c.isSubscribed).length
    })

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to get contacts', error: String(error) },
      { status: 500 }
    )
  }
}
