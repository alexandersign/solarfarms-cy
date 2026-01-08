import { NextRequest, NextResponse } from 'next/server'
import { contactsService } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const contacts = await contactsService.getAll()
    
    return NextResponse.json({
      success: true,
      data: contacts,
      count: contacts?.length || 0
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      data: [],
      message: 'Failed to fetch contacts. Supabase may be paused.'
    })
  }
}
