import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// This endpoint is called by Vercel Cron to keep Supabase active
// Free tier Supabase pauses after 7 days of inactivity

export async function GET(request: NextRequest) {
  // Verify the request is from Vercel Cron (optional but recommended)
  const authHeader = request.headers.get('authorization')
  const isAuthorized = authHeader === `Bearer ${process.env.CRON_SECRET}`

  try {
    // Simple query to keep the database active
    const { error } = await supabase
      .from('contacts')
      .select('count')
      .limit(1)

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message, timestamp: new Date().toISOString() },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Database keep-alive successful',
      authorized: isAuthorized,
      timestamp: new Date().toISOString()
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Keep-alive failed', timestamp: new Date().toISOString() },
      { status: 500 }
    )
  }
}
