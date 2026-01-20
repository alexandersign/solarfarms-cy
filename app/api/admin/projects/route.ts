import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'

// Project schema for validation
const projectSchema = z.object({
  reference_code: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),
  location: z.string().min(1),
  district: z.string().optional(),
  status: z.enum(['draft', 'available', 'under_offer', 'sold', 'construction', 'operational']),
  status_label: z.string().optional(),
  target_date: z.string().optional(),
  capacity_mwp: z.number().optional(),
  capacity_mwh_bess: z.number().optional(),
  bess_duration_hours: z.number().optional(),
  technology: z.string().optional(),
  mounting: z.string().optional(),
  specific_yield: z.number().optional(),
  annual_generation_gwh: z.number().optional(),
  total_capex: z.number().optional(),
  bess_cost_per_mwh: z.number().optional(),
  rtb_acquisition_cost: z.number().optional(),
  equity_required: z.number().optional(),
  annual_revenue: z.number().optional(),
  annual_opex: z.number().optional(),
  net_cash_flow: z.number().optional(),
  leveraged_irr: z.string().optional(),
  dscr: z.string().optional(),
  base_power_price: z.number().optional(),
  evening_arbitrage_price: z.number().optional(),
  image_url: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  sort_order: z.number().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
})

// GET - Fetch all projects
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      throw error
    }
    
    return NextResponse.json({ success: true, data: data || [] })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch projects', error: String(error), data: [] },
      { status: 500 }
    )
  }
}

// POST - Create new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Check admin key
    const adminKey = request.headers.get('x-admin-key')
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const validatedData = projectSchema.parse(body)
    
    const { data, error } = await supabase
      .from('projects')
      .insert([validatedData])
      .select()
      .single()
    
    if (error) throw error
    
    return NextResponse.json({ success: true, data })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation error', errors: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, message: 'Failed to create project', error },
      { status: 500 }
    )
  }
}

// PUT - Update project
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    
    // Check admin key
    const adminKey = request.headers.get('x-admin-key')
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Project ID required' },
        { status: 400 }
      )
    }
    
    const { data, error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update project', error },
      { status: 500 }
    )
  }
}

// DELETE - Delete project
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    // Check admin key
    const adminKey = request.headers.get('x-admin-key')
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Project ID required' },
        { status: 400 }
      )
    }
    
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    return NextResponse.json({ success: true, message: 'Project deleted' })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete project', error },
      { status: 500 }
    )
  }
}
