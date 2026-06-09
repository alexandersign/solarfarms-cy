/**
 * Auto follow-up task creation — runs Mon–Fri at 06:30 CY time (03:30 UTC).
 *
 * For each active prospect, applies FOLLOW_UP_RULES:
 *   - If the rule fires (stage matches + days-since-contact >= threshold)
 *   - And no open task of the same type already exists
 *   → Inserts a new CrmTask (due today, author='System') into pv_prospects.tasks
 *
 * Idempotent: re-running the same day creates no duplicates because it checks
 * for open tasks of the same type before inserting.
 */
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { FOLLOW_UP_RULES, matchingRule } from '@/lib/crm-follow-up-rules'
import type { CrmTask } from '@/lib/supabase'

function uuid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const today = new Date().toISOString().split('T')[0]
  const ACTIVE_STAGES = ['researching', 'contacted', 'responded', 'meeting_set', 'proposal_sent', 'negotiating']

  // Fetch all active prospects with their task + contact date data
  const { data, error } = await supabase
    .from('pv_prospects')
    .select('id, company_name, outreach_status, last_contact_date, created_at, tasks, assigned_to, assigned_name')
    .in('outreach_status', ACTIVE_STAGES)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const prospects = (data || []) as {
    id: string
    company_name?: string
    outreach_status?: string
    last_contact_date?: string
    created_at?: string
    tasks?: CrmTask[]
    assigned_to?: string
    assigned_name?: string
  }[]

  let created = 0
  let skipped = 0
  const log: string[] = []

  for (const p of prospects) {
    const stage = p.outreach_status || ''
    const rule = matchingRule(stage, p.last_contact_date || null, p.created_at || null)
    if (!rule) { skipped++; continue }

    const existingTasks = (p.tasks || []) as CrmTask[]

    // Skip if open (not done) task of same type already exists
    const alreadyHasTask = existingTasks.some((t) => !t.done && t.type === rule.taskType)
    if (alreadyHasTask) { skipped++; continue }

    const newTask: CrmTask = {
      id: uuid(),
      type: rule.taskType,
      text: rule.text,
      due: today,
      done: false,
      author: 'System',
      created_at: new Date().toISOString(),
    }

    const updatedTasks = [newTask, ...existingTasks]
    const { error: ue } = await supabase
      .from('pv_prospects')
      .update({ tasks: updatedTasks })
      .eq('id', p.id)

    if (ue) {
      log.push(`✗ ${p.company_name}: ${ue.message}`)
    } else {
      created++
      log.push(`✓ ${p.company_name} [${stage}] → ${rule.taskType}: ${rule.text}`)
    }
  }

  return NextResponse.json({
    success: true,
    summary: { prospects_checked: prospects.length, created, skipped },
    log: log.slice(0, 50),
    date: today,
  })
}
