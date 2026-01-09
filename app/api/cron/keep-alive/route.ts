import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// This endpoint is called by Vercel Cron to keep Supabase active
// Free tier Supabase pauses after 7 days of inactivity

export async function GET(request: NextRequest) {
  // Verify the request is from Vercel Cron (optional but recommended)
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // Allow without auth for testing, but log it
    console.log('Keep-alive called without proper authorization')
  }

  try {
    // Simple query to keep the database active
    const { data, error } = await supabase
      .from('contacts')
      .select('count')
      .limit(1)

    if (error) {
      console.error('Keep-alive query failed:', error.message)
      return NextResponse.json(
        { success: false, error: error.message, timestamp: new Date().toISOString() },
        { status: 500 }
      )
    }

    console.log('Keep-alive successful:', new Date().toISOString())
    
    return NextResponse.json({
      success: true,
      message: 'Database keep-alive successful',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Keep-alive error:', error)
    return NextResponse.json(
      { success: false, error: 'Keep-alive failed', timestamp: new Date().toISOString() },
      { status: 500 }
    )
  }
}
