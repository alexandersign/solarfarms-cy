import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/service/auth'
import { workOrderService } from '@/lib/service/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const workOrder = await workOrderService.getById(params.id)
    return NextResponse.json(workOrder)
  } catch (error) {
    console.error('Work order GET error:', error)
    return NextResponse.json({ error: 'Work order not found' }, { status: 404 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    let workOrder

    if (body.status) {
      const { status, ...extras } = body
      workOrder = await workOrderService.updateStatus(params.id, status, extras)
    } else {
      workOrder = await workOrderService.update(params.id, body)
    }

    return NextResponse.json(workOrder)
  } catch (error) {
    console.error('Work order PATCH error:', error)
    return NextResponse.json({ error: 'Failed to update work order' }, { status: 500 })
  }
}
