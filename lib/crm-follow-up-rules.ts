/**
 * CRM follow-up rules — single source of truth for when to auto-create tasks.
 *
 * The daily cron (auto-followup-tasks) applies these rules each morning and
 * inserts a task into pv_prospects.tasks if the prospect is stale and no open
 * task of the same type already exists.
 *
 * To change timing: edit daysWithoutContact.
 * To add a new rule: add an entry to FOLLOW_UP_RULES.
 */
import type { CrmTaskType } from './supabase'

export interface FollowUpRule {
  id: string
  stages: string[]              // which outreach_status values trigger this rule
  daysWithoutContact: number    // days since last_contact_date (or created_at if no contact)
  taskType: CrmTaskType
  text: string                  // task body pre-filled
  priority: 'urgent' | 'high' | 'medium'
  skipIfOpenTask?: boolean       // default true — skip if any open task of this type exists
}

export const FOLLOW_UP_RULES: FollowUpRule[] = [
  {
    id: 'proposal-chase',
    stages: ['proposal_sent'],
    daysWithoutContact: 5,
    taskType: 'call',
    text: 'Chase proposal — no contact in 5 days',
    priority: 'urgent',
  },
  {
    id: 'negotiation-check',
    stages: ['negotiating'],
    daysWithoutContact: 3,
    taskType: 'call',
    text: 'Follow up on negotiation — no contact in 3 days',
    priority: 'urgent',
  },
  {
    id: 'responded-follow',
    stages: ['responded'],
    daysWithoutContact: 3,
    taskType: 'email',
    text: 'Send proposal or schedule meeting — prospect responded',
    priority: 'high',
  },
  {
    id: 'meeting-prep',
    stages: ['meeting_set'],
    daysWithoutContact: 1,
    taskType: 'meeting',
    text: 'Confirm meeting and prepare agenda',
    priority: 'high',
  },
  {
    id: 'contacted-reengage',
    stages: ['contacted'],
    daysWithoutContact: 7,
    taskType: 'call',
    text: 'Re-engage — no response in 7 days',
    priority: 'medium',
  },
  {
    id: 'researching-data-chase',
    stages: ['researching'],
    daysWithoutContact: 10,
    taskType: 'email',
    text: 'Chase for data / documents — still waiting after 10 days',
    priority: 'medium',
  },
  {
    id: 'new-first-contact',
    stages: ['new'],
    daysWithoutContact: 5,
    taskType: 'call',
    text: 'First contact overdue — prospect not yet reached',
    priority: 'medium',
  },
]

/** Days since a date string (YYYY-MM-DD or ISO). Returns null if no date given. */
export function daysSince(dateStr?: string | null): number | null {
  if (!dateStr) return null
  const ms = Date.now() - new Date(dateStr).getTime()
  return Math.floor(ms / 86400000)
}

/** Return the rule that applies to a prospect, or null. Checks most urgent first. */
export function matchingRule(
  stage: string,
  lastContactDate: string | null,
  createdAt: string | null,
): FollowUpRule | null {
  const days = daysSince(lastContactDate) ?? daysSince(createdAt) ?? 999
  for (const rule of FOLLOW_UP_RULES) {
    if (rule.stages.includes(stage) && days >= rule.daysWithoutContact) {
      return rule
    }
  }
  return null
}
