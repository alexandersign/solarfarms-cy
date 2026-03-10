import { NextRequest, NextResponse } from 'next/server'
import { alexTasksService, PROJECTS, PRIORITIES, STATUSES } from '@/lib/alex-tasks'

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.ALEX_TASKS_SECRET
  if (!secret) return false
  const auth = request.headers.get('authorization')
  if (auth === `Bearer ${secret}`) return true
  const cookieVal = request.cookies.get('alex_tasks_auth')?.value
  return cookieVal === secret
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()

    const allowed = ['title', 'description', 'project', 'priority', 'status', 'deadline', 'delegated_to', 'notes']
    const updates: Record<string, unknown> = {}
    for (const key of allowed) {
      if (key in body) {
        updates[key] = body[key]
      }
    }

    if (updates.project && !PROJECTS.includes(updates.project as any)) {
      return NextResponse.json({ error: `Invalid project` }, { status: 400 })
    }
    if (updates.priority && !PRIORITIES.includes(updates.priority as any)) {
      return NextResponse.json({ error: `Invalid priority` }, { status: 400 })
    }
    if (updates.status && !STATUSES.includes(updates.status as any)) {
      return NextResponse.json({ error: `Invalid status` }, { status: 400 })
    }

    const task = await alexTasksService.update(id, updates)
    return NextResponse.json({ task })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update task', details: String(error) },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await alexTasksService.delete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete task', details: String(error) },
      { status: 500 }
    )
  }
}
