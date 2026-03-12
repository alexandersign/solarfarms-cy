import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/service/auth'
import { workOrderService, alarmService } from '@/lib/service/db'
import type { WorkOrderStatus, WorkOrderPriority } from '@/lib/service/types'

export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const view = searchParams.get('view')
  const status = searchParams.get('status') as WorkOrderStatus | null
  const priority = searchParams.get('priority') as WorkOrderPriority | null

  try {
    if (view === 'dashboard') {
      const userId = session.user.id

      const [activeWOs, activeAlarms, stats] = await Promise.all([
        workOrderService.list({
          assignedTo: session.user.role === 'serviceman' ? userId : undefined,
          status: ['open', 'assigned', 'in_transit', 'on_site', 'in_progress', 'pending_parts'],
          limit: 20,
        }),
        alarmService.list({ status: ['active', 'acknowledged'], limit: 5 }),
        workOrderService.getStats(session.user.role === 'serviceman' ? userId : undefined),
      ])

      const today = new Date().toISOString().split('T')[0]
      const todayWOs = activeWOs.filter(wo =>
        wo.scheduled_date === today ||
        ['in_transit', 'on_site', 'in_progress'].includes(wo.status)
      )

      return NextResponse.json({
        activeWorkOrders: activeWOs,
        todayWorkOrders: todayWOs,
        activeAlarms: activeAlarms,
        stats: {
          open: (stats.open || 0) + (stats.assigned || 0),
          in_progress: (stats.in_transit || 0) + (stats.on_site || 0) + (stats.in_progress || 0),
          completed_today: stats.completed || 0,
          pending_parts: stats.pending_parts || 0,
        },
      })
    }

    const filters: Parameters<typeof workOrderService.list>[0] = { limit: 50 }
    if (status) filters.status = status
    if (priority) filters.priority = priority
    if (session.user.role === 'serviceman') filters.assignedTo = session.user.id

    const workOrders = await workOrderService.list(filters)
    return NextResponse.json({ workOrders })
  } catch (error) {
    console.error('Work orders GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch work orders' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role === 'client') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    const workOrder = await workOrderService.create({
      park_id: body.park_id,
      assigned_to: body.assigned_to,
      created_by: session.user.id,
      type: body.type,
      priority: body.priority,
      status: body.assigned_to ? 'assigned' : 'open',
      title: body.title,
      description: body.description,
      checklist_template_id: body.checklist_template_id,
      scheduled_date: body.scheduled_date,
      alarm_id: body.alarm_id,
      notes: body.notes,
    })

    return NextResponse.json(workOrder, { status: 201 })
  } catch (error) {
    console.error('Work order POST error:', error)
    return NextResponse.json({ error: 'Failed to create work order' }, { status: 500 })
  }
}
