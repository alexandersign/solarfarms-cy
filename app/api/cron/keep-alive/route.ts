import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// This endpoint is called by Vercel Cron to keep Supabase active
// Free tier Supabase pauses after 7 days of inactivity

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }

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
      timestamp: new Date().toISOString()
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Keep-alive failed', timestamp: new Date().toISOString() },
      { status: 500 }
    )
  }
}
