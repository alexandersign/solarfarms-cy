/**
 * CRM Today's Queue — session-authenticated GET.
 *
 * Returns a prioritised action list for the logged-in user:
 *   1. tasks: open tasks due today or overdue (from pv_prospects.tasks)
 *   2. followUps: prospects with next_follow_up <= today and no open task
 *   3. stale: prospects in proposal_sent/negotiating with no contact in N days and no task
 *
 * Also returns:
 *   callsToday / emailsToday: activity counts from today's activity_feed
 *   callTarget: this user's daily call target from lib/crm-targets.ts
 */
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getCrmToken } from '@/lib/crm-auth'
import { FOLLOW_UP_RULES, daysSince } from '@/lib/crm-follow-up-rules'
import { getDailyCallTarget } from '@/lib/crm-targets'
import type { CrmTask, ActivityEntry } from '@/lib/supabase'

interface QueueTask {
  prospectId: string
  prospectName: string
  taskId: string
  taskType: string
  taskText: string
  due: string | null
  daysSinceContact: number | null
  assignedName?: string
  priority: string
}

interface QueueFollowUp {
  prospectId: string
  prospectName: string
  nextFollowUp: string
  assignedName?: string
  daysSinceContact: number | null
}

interface QueueStale {
  prospectId: string
  prospectName: string
  outreachStatus: string
  daysSinceContact: number
  assignedName?: string
  ruleText: string
}

export async function GET(request: NextRequest) {
  const token = await getCrmToken(request)
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const userEmail = token.email as string
  const userName = (token.name as string) || userEmail
  const today = new Date().toISOString().split('T')[0]
  const callTarget = getDailyCallTarget(userEmail)
  const isManager = userEmail === 'alexander.papacosta@lighthief.com'

  // Fetch prospects for this operator only (or all for Alexander as manager)
  // Each salesperson sees only prospects assigned to them.
  let query = supabase
    .from('pv_prospects')
    .select(
      'id, plant_name, company_name, outreach_status, last_contact_date, created_at, ' +
      'next_follow_up, tasks, assigned_to, assigned_name, activity_feed, priority'
    )
    .not('outreach_status', 'in', '("won","lost","not_interested")')

  if (!isManager) {
    // Show prospects assigned to me, plus unassigned (anyone can action these)
    query = query.or(`assigned_to.eq.${userEmail},assigned_to.is.null`)
  }

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const all = (data as unknown as {
    id: string
    plant_name?: string
    company_name?: string
    outreach_status?: string
    last_contact_date?: string
    created_at?: string
    next_follow_up?: string
    tasks?: CrmTask[]
    assigned_to?: string
    assigned_name?: string
    activity_feed?: ActivityEntry[]
    priority?: string
  }[]) || []

  // ─── Compute today's call/email activity for this user ────────────────────
  let callsToday = 0
  let emailsToday = 0
  let totalToday = 0

  for (const p of all) {
    const feed = (p.activity_feed || []) as ActivityEntry[]
    for (const e of feed) {
      // Match entries authored by this user today
      const entryDate = e.ts.split('T')[0]
      if (entryDate !== today) continue
      const isMe = e.author === userName || e.author === userEmail
      if (!isMe) continue
      totalToday++
      if (e.type === 'call') callsToday++
      if (e.type === 'email') emailsToday++
    }
  }

  // ─── 1. Open tasks due today or overdue ───────────────────────────────────
  const taskQueue: QueueTask[] = []
  const prospectsWithOpenTasks = new Set<string>()

  for (const p of all) {
    const tasks = (p.tasks || []) as CrmTask[]
    const name = p.company_name || p.plant_name || p.id
    for (const t of tasks) {
      if (t.done) continue
      const isDue = !t.due || t.due <= today
      if (!isDue) continue
      prospectsWithOpenTasks.add(p.id)
      taskQueue.push({
        prospectId: p.id,
        prospectName: name,
        taskId: t.id,
        taskType: t.type,
        taskText: t.text,
        due: t.due || null,
        daysSinceContact: daysSince(p.last_contact_date),
        assignedName: p.assigned_name,
        priority: p.priority || 'medium',
      })
    }
  }

  // Sort: urgent first, then by due date
  const priorityOrder: Record<string, number> = { urgent: 0, high: 1, medium: 2, low: 3 }
  taskQueue.sort((a, b) =>
    (priorityOrder[a.priority] ?? 2) - (priorityOrder[b.priority] ?? 2)
  )

  // ─── 2. Overdue next_follow_up with no open task ──────────────────────────
  const followUpQueue: QueueFollowUp[] = []

  for (const p of all) {
    if (!p.next_follow_up || p.next_follow_up > today) continue
    if (prospectsWithOpenTasks.has(p.id)) continue
    const name = p.company_name || p.plant_name || p.id
    followUpQueue.push({
      prospectId: p.id,
      prospectName: name,
      nextFollowUp: p.next_follow_up,
      assignedName: p.assigned_name,
      daysSinceContact: daysSince(p.last_contact_date),
    })
  }

  followUpQueue.sort((a, b) => a.nextFollowUp.localeCompare(b.nextFollowUp))

  // ─── 3. Stale prospects matching a rule but with no open task ─────────────
  const staleQueue: QueueStale[] = []
  const seenInQueue = new Set([...prospectsWithOpenTasks, ...followUpQueue.map((f) => f.prospectId)])

  for (const p of all) {
    if (seenInQueue.has(p.id)) continue
    const stage = p.outreach_status || ''
    for (const rule of FOLLOW_UP_RULES) {
      if (!rule.stages.includes(stage)) continue
      const days = daysSince(p.last_contact_date) ?? daysSince(p.created_at) ?? 999
      if (days < rule.daysWithoutContact) continue
      const name = p.company_name || p.plant_name || p.id
      staleQueue.push({
        prospectId: p.id,
        prospectName: name,
        outreachStatus: stage,
        daysSinceContact: days,
        assignedName: p.assigned_name,
        ruleText: rule.text,
      })
      break // one stale entry per prospect
    }
  }

  staleQueue.sort((a, b) => b.daysSinceContact - a.daysSinceContact)

  const totalActionable = taskQueue.length + followUpQueue.length + staleQueue.length

  return NextResponse.json({
    tasks: taskQueue,
    followUps: followUpQueue,
    stale: staleQueue,
    callsToday,
    emailsToday,
    totalToday,
    callTarget,
    totalActionable,
  })
}
