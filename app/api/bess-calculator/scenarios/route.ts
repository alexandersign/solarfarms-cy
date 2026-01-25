import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'

// Schema for scenario creation
const createScenarioSchema = z.object({
  userEmail: z.string().email('Valid email required'),
  projectName: z.string().min(1, 'Project name required'),
  scenarioName: z.string().optional().default('Base Case'),
  mode: z.enum(['standalone', 'solar_bess']),
  inputs: z.record(z.any()), // JSON object
  results: z.record(z.any()).optional(),
})

/**
 * GET /api/bess-calculator/scenarios
 * List scenarios for a user (by email query param)
 */
export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email')
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email parameter required' },
        { status: 400 }
      )
    }
    
    const { data, error } = await supabase
      .from('bess_scenarios')
      .select('id, project_name, scenario_name, mode, created_at, updated_at, is_locked')
      .eq('user_email', email)
      .order('updated_at', { ascending: false })
      .limit(20)
    
    if (error) {
      throw error
    }
    
    return NextResponse.json({
      success: true,
      scenarios: data || [],
    })
    
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch scenarios' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/bess-calculator/scenarios
 * Create a new scenario
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = createScenarioSchema.parse(body)
    
    const { data, error } = await supabase
      .from('bess_scenarios')
      .insert({
        user_email: validated.userEmail,
        project_name: validated.projectName,
        scenario_name: validated.scenarioName,
        mode: validated.mode,
        inputs: validated.inputs,
        results: validated.results || null,
      })
      .select('id, project_name, scenario_name, mode, created_at')
      .single()
    
    if (error) {
      throw error
    }
    
    return NextResponse.json({
      success: true,
      message: 'Scenario saved successfully',
      scenario: data,
    })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid data', errors: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, message: 'Failed to save scenario' },
      { status: 500 }
    )
  }
}
