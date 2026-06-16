/**
 * CRM task management for pv_prospects.
 *
 * POST   { id, type, text, due? }          → add task
 * PATCH  { id, taskId, done: true|false }  → complete / reopen task
 * DELETE { id, taskId }                    → remove task
 */
import { NextRequest, NextResponse } from 'next/server'
import { supabase, type CrmTask } from '@/lib/supabase'
import { getCrmToken } from '@/lib/crm-auth'

function uuid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

async function getTasks(prospectId: string): Promise<CrmTask[]> {
  const { data, error } = await supabase
    .from('pv_prospects')
    .select('tasks')
    .eq('id', prospectId)
    .single()
  if (error) throw error
  return (data?.tasks || []) as CrmTask[]
}

async function saveTasks(prospectId: string, tasks: CrmTask[]) {
  const { error } = await supabase
    .from('pv_prospects')
    .update({ tasks })
    .eq('id', prospectId)
  if (error) throw error
}

export async function POST(request: NextRequest) {
  const token = await getCrmToken(request)
  if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })

  try {
    const { id, type, text, due } = await request.json()
    if (!id || !text) return NextResponse.json({ success: false, message: 'id and text required' }, { status: 400 })

    const tasks = await getTasks(id)
    const newTask: CrmTask = {
      id: uuid(),
      type: type || 'other',
      text: text.trim(),
      due: due || undefined,
      done: false,
      author: (token.name as string) || (token.email as string) || 'CRM',
      created_at: new Date().toISOString(),
    }
    tasks.unshift(newTask)
    await saveTasks(id, tasks)
    return NextResponse.json({ success: true, data: tasks })
  } catch (e) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const token = await getCrmToken(request)
  if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })

  try {
    const { id, taskId, done } = await request.json()
    if (!id || !taskId) return NextResponse.json({ success: false, message: 'id and taskId required' }, { status: 400 })

    const tasks = await getTasks(id)
    const updated = tasks.map((t) => t.id === taskId ? { ...t, done: Boolean(done) } : t)
    await saveTasks(id, updated)
    return NextResponse.json({ success: true, data: updated })
  } catch (e) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const token = await getCrmToken(request)
  if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })

  try {
    const { id, taskId } = await request.json()
    if (!id || !taskId) return NextResponse.json({ success: false, message: 'id and taskId required' }, { status: 400 })

    const tasks = await getTasks(id)
    await saveTasks(id, tasks.filter((t) => t.id !== taskId))
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ success: false, message: String(e) }, { status: 500 })
  }
}
