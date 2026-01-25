import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'

// Schema for scenario update
const updateScenarioSchema = z.object({
  projectName: z.string().optional(),
  scenarioName: z.string().optional(),
  inputs: z.record(z.any()).optional(),
  results: z.record(z.any()).optional(),
  isLocked: z.boolean().optional(),
})

interface RouteParams {
  params: Promise<{ id: string }>
}

/**
 * GET /api/bess-calculator/scenarios/[id]
 * Get a single scenario with full data
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    
    const { data, error } = await supabase
      .from('bess_scenarios')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error || !data) {
      return NextResponse.json(
        { success: false, message: 'Scenario not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      scenario: data,
    })
    
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch scenario' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/bess-calculator/scenarios/[id]
 * Update a scenario
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validated = updateScenarioSchema.parse(body)
    
    // Check if scenario is locked
    const { data: existing } = await supabase
      .from('bess_scenarios')
      .select('is_locked')
      .eq('id', id)
      .single()
    
    if (existing?.is_locked) {
      return NextResponse.json(
        { success: false, message: 'Scenario is locked and cannot be modified' },
        { status: 403 }
      )
    }
    
    const updateData: Record<string, unknown> = {}
    if (validated.projectName !== undefined) updateData.project_name = validated.projectName
    if (validated.scenarioName !== undefined) updateData.scenario_name = validated.scenarioName
    if (validated.inputs !== undefined) updateData.inputs = validated.inputs
    if (validated.results !== undefined) updateData.results = validated.results
    if (validated.isLocked !== undefined) updateData.is_locked = validated.isLocked
    
    const { data, error } = await supabase
      .from('bess_scenarios')
      .update(updateData)
      .eq('id', id)
      .select('id, project_name, scenario_name, updated_at')
      .single()
    
    if (error) {
      throw error
    }
    
    return NextResponse.json({
      success: true,
      message: 'Scenario updated',
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
      { success: false, message: 'Failed to update scenario' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/bess-calculator/scenarios/[id]
 * Delete a scenario
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    
    const { error } = await supabase
      .from('bess_scenarios')
      .delete()
      .eq('id', id)
    
    if (error) {
      throw error
    }
    
    return NextResponse.json({
      success: true,
      message: 'Scenario deleted',
    })
    
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to delete scenario' },
      { status: 500 }
    )
  }
}
