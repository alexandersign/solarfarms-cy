import { NextRequest, NextResponse } from 'next/server'
import { gridOperatorService } from '@/lib/supabase'

// GET - Fetch all grid operator contacts (DSO, TSO, CERA)
export async function GET() {
  try {
    const contacts = await gridOperatorService.getAll()

    return NextResponse.json({
      success: true,
      data: contacts,
      count: contacts?.length || 0
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      data: [],
      message: 'Failed to fetch grid contacts. ' + String(error)
    })
  }
}

// POST - Add a new grid operator contact
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
    const contact = await gridOperatorService.create(body)

    return NextResponse.json({
      success: true,
      data: contact,
      message: 'Grid contact added'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to add contact: ' + String(error) },
      { status: 500 }
    )
  }
}
