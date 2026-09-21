import { NextRequest, NextResponse } from 'next/server'
import { landAssessmentsService } from '@/lib/supabase'
import { unauthorizedUnlessAdmin } from '@/lib/require-admin-key'

export async function GET(request: NextRequest) {
  const denied = unauthorizedUnlessAdmin(request)
  if (denied) return denied

  try {
    const assessments = await landAssessmentsService.getAll()
    
    return NextResponse.json({
      success: true,
      data: assessments,
      count: assessments?.length || 0
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      data: [],
      message: 'Failed to fetch land assessments. Supabase may be paused.'
    })
  }
}
