import { NextRequest, NextResponse } from 'next/server'
import { landAssessmentsService } from '@/lib/supabase'

export async function GET(request: NextRequest) {
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
