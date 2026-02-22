import { NextRequest, NextResponse } from 'next/server'
import { pvProspectsService } from '@/lib/supabase'

// GET - Fetch prospects with due follow-ups
export async function GET(request: NextRequest) {
  try {
    const followUps = await pvProspectsService.getDueFollowUps()

    return NextResponse.json({
      success: true,
      data: followUps,
      count: followUps?.length || 0
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      data: [],
      message: 'Failed to fetch follow-ups. ' + String(error)
    })
  }
}
