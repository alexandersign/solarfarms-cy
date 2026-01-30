import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Fetch all subscribers with stats
export async function GET(request: NextRequest) {
  try {
    // Check admin key
    const adminKey = request.headers.get('x-admin-key')
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    const stats = {
      total: data?.length || 0,
      active: data?.filter(s => s.status === 'active').length || 0,
      unsubscribed: data?.filter(s => s.status === 'unsubscribed').length || 0
    }
    
    return NextResponse.json({ success: true, data, stats })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch subscribers', error },
      { status: 500 }
    )
  }
}

// POST - Add subscriber manually (admin)
export async function POST(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key')
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    const { email, source = 'admin' } = body
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email required' },
        { status: 400 }
      )
    }
    
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .upsert([{ email, source, status: 'active' }], { 
        onConflict: 'email',
        ignoreDuplicates: false 
      })
      .select()
      .single()
    
    if (error) throw error
    
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to add subscriber', error },
      { status: 500 }
    )
  }
}

// DELETE - Remove subscriber
export async function DELETE(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key')
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email required' },
        { status: 400 }
      )
    }
    
    const { error } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .eq('email', email)
    
    if (error) throw error
    
    return NextResponse.json({ success: true, message: 'Subscriber removed' })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to remove subscriber', error },
      { status: 500 }
    )
  }
}
