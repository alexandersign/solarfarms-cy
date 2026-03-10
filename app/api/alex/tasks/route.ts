import { NextRequest, NextResponse } from 'next/server'
import { alexTasksService, PROJECTS, PRIORITIES, STATUSES } from '@/lib/alex-tasks'
import type { Project, Priority, TaskStatus } from '@/lib/alex-tasks'

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.ALEX_TASKS_SECRET
  if (!secret) return false
  const auth = request.headers.get('authorization')
  if (auth === `Bearer ${secret}`) return true
  const cookieVal = request.cookies.get('alex_tasks_auth')?.value
  return cookieVal === secret
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const url = new URL(request.url)
    const project = url.searchParams.get('project') as Project | null
    const priority = url.searchParams.get('priority') as Priority | null
    const status = url.searchParams.get('status') as TaskStatus | null
    const overdue = url.searchParams.get('overdue') === 'true'

    const tasks = await alexTasksService.list({
      ...(project && PROJECTS.includes(project) ? { project } : {}),
      ...(priority && PRIORITIES.includes(priority) ? { priority } : {}),
      ...(status && STATUSES.includes(status) ? { status } : {}),
      ...(overdue ? { overdue } : {}),
    })

    return NextResponse.json({ tasks })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tasks', details: String(error) },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, project, priority, description, deadline, delegated_to, notes, status } = body

    if (!title || !project || !priority) {
      return NextResponse.json(
        { error: 'title, project, and priority are required' },
        { status: 400 }
      )
    }

    if (!PROJECTS.includes(project)) {
      return NextResponse.json({ error: `Invalid project: ${project}` }, { status: 400 })
    }
    if (!PRIORITIES.includes(priority)) {
      return NextResponse.json({ error: `Invalid priority: ${priority}` }, { status: 400 })
    }

    const task = await alexTasksService.create({
      title,
      project,
      priority,
      description: description || null,
      deadline: deadline || null,
      delegated_to: delegated_to || null,
      notes: notes || null,
      status: status || 'not_started',
    })

    return NextResponse.json({ task }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create task', details: String(error) },
      { status: 500 }
    )
  }
}
