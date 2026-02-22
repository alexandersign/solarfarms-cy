import { NextRequest, NextResponse } from 'next/server'
import { pvProspectsService } from '@/lib/supabase'

// GET - Fetch all prospects with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filters = {
      outreach_status: searchParams.get('status') || undefined,
      priority: searchParams.get('priority') || undefined,
      district: searchParams.get('district') || undefined,
      offer_type: searchParams.get('offer_type') || undefined,
      search: searchParams.get('search') || undefined,
    }

    const prospects = await pvProspectsService.getAll(filters)
    const stats = await pvProspectsService.getStats()

    return NextResponse.json({
      success: true,
      data: prospects,
      stats,
      count: prospects?.length || 0
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      data: [],
      message: 'Failed to fetch prospects. ' + String(error)
    })
  }
}

// POST - Create a new prospect
export async function POST(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key')
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    if (!body.plant_name) {
      return NextResponse.json(
        { success: false, message: 'plant_name is required' },
        { status: 400 }
      )
    }

    const prospect = await pvProspectsService.create(body)

    return NextResponse.json({
      success: true,
      data: prospect,
      message: 'Prospect created successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create prospect: ' + String(error) },
      { status: 500 }
    )
  }
}

// PUT - Update a prospect
export async function PUT(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key')
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'id is required' },
        { status: 400 }
      )
    }

    const prospect = await pvProspectsService.update(id, updates)

    return NextResponse.json({
      success: true,
      data: prospect,
      message: 'Prospect updated successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update prospect: ' + String(error) },
      { status: 500 }
    )
  }
}

// DELETE - Remove a prospect
export async function DELETE(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key')
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'id is required' },
        { status: 400 }
      )
    }

    await pvProspectsService.delete(id)

    return NextResponse.json({
      success: true,
      message: 'Prospect deleted successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete prospect: ' + String(error) },
      { status: 500 }
    )
  }
}
