import { NextRequest, NextResponse } from 'next/server'
import { rfiService } from '@/lib/rfi-service'

// GET /api/rfi/[id] — Get single RFI
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const item = await rfiService.getById(id)
    if (!item) {
      return NextResponse.json({ error: 'RFI not found' }, { status: 404 })
    }
    return NextResponse.json(item)
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch RFI', detail: error?.message },
      { status: 500 }
    )
  }
}

// PUT /api/rfi/[id] — Update RFI
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const updates = await request.json()
    const item = await rfiService.update(id, updates)
    return NextResponse.json(item)
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to update RFI', detail: error?.message },
      { status: 500 }
    )
  }
}

// DELETE /api/rfi/[id] — Delete RFI
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await rfiService.remove(id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to delete RFI', detail: error?.message },
      { status: 500 }
    )
  }
}
