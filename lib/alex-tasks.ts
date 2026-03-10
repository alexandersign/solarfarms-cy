import { supabase } from './supabase'

export const PROJECTS = [
  'bess_cyprus', '7sun', 'greece', 'ems', 'shark_fund',
  'bd_cyprus', 'legal', 'clients', 'platform',
] as const

export type Project = typeof PROJECTS[number]

export const PRIORITIES = ['critical', 'high', 'medium', 'low'] as const
export type Priority = typeof PRIORITIES[number]

export const STATUSES = ['not_started', 'in_progress', 'complete', 'blocked', 'deferred'] as const
export type TaskStatus = typeof STATUSES[number]

export interface AlexTask {
  id: string
  title: string
  description: string | null
  project: Project
  priority: Priority
  status: TaskStatus
  deadline: string | null
  delegated_to: string | null
  notes: string | null
  created_at: string
  updated_at: string
  completed_at: string | null
}

export type CreateTaskInput = Pick<AlexTask, 'title' | 'project' | 'priority'> &
  Partial<Pick<AlexTask, 'description' | 'deadline' | 'delegated_to' | 'notes' | 'status'>>

export type UpdateTaskInput = Partial<
  Pick<AlexTask, 'title' | 'description' | 'project' | 'priority' | 'status' | 'deadline' | 'delegated_to' | 'notes'>
>

export interface TaskFilters {
  project?: Project
  priority?: Priority
  status?: TaskStatus
  overdue?: boolean
}

export const PROJECT_LABELS: Record<Project, string> = {
  bess_cyprus: 'BESS Cyprus',
  '7sun': '7SUN',
  greece: 'Greece',
  ems: 'EMS',
  shark_fund: 'Shark Fund',
  bd_cyprus: 'BD Cyprus',
  legal: 'Legal',
  clients: 'Clients',
  platform: 'Platform',
}

export const PROJECT_COLORS: Record<Project, string> = {
  bess_cyprus: '#ef4444',
  '7sun': '#f59e0b',
  greece: '#3b82f6',
  ems: '#8b5cf6',
  shark_fund: '#06b6d4',
  bd_cyprus: '#10b981',
  legal: '#ec4899',
  clients: '#f97316',
  platform: '#6366f1',
}

export const PRIORITY_ORDER: Record<Priority, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
}

export const alexTasksService = {
  async list(filters?: TaskFilters): Promise<AlexTask[]> {
    let query = supabase
      .from('alex_tasks')
      .select('*')
      .order('deadline', { ascending: true, nullsFirst: false })

    if (filters?.project) {
      query = query.eq('project', filters.project)
    }
    if (filters?.priority) {
      query = query.eq('priority', filters.priority)
    }
    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.overdue) {
      const today = new Date().toISOString().split('T')[0]
      query = query
        .lt('deadline', today)
        .not('status', 'in', '("complete","deferred")')
    }

    const { data, error } = await query
    if (error) throw error
    return (data ?? []) as AlexTask[]
  },

  async getById(id: string): Promise<AlexTask | null> {
    const { data, error } = await supabase
      .from('alex_tasks')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }
    return data as AlexTask
  },

  async create(input: CreateTaskInput): Promise<AlexTask> {
    const { data, error } = await supabase
      .from('alex_tasks')
      .insert({
        ...input,
        status: input.status ?? 'not_started',
      })
      .select()
      .single()

    if (error) throw error
    return data as AlexTask
  },

  async update(id: string, input: UpdateTaskInput): Promise<AlexTask> {
    const updates: Record<string, unknown> = {
      ...input,
      updated_at: new Date().toISOString(),
    }

    if (input.status === 'complete') {
      updates.completed_at = new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('alex_tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as AlexTask
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('alex_tasks')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  async getDigestData() {
    const today = new Date().toISOString().split('T')[0]
    const threeDaysAgo = new Date(Date.now() - 3 * 86400000).toISOString()

    const [allActive, overdue, recentlyCompleted] = await Promise.all([
      supabase
        .from('alex_tasks')
        .select('*')
        .not('status', 'in', '("complete","deferred")')
        .order('deadline', { ascending: true, nullsFirst: false }),
      supabase
        .from('alex_tasks')
        .select('*')
        .lt('deadline', today)
        .not('status', 'in', '("complete","deferred")')
        .order('deadline', { ascending: true }),
      supabase
        .from('alex_tasks')
        .select('*')
        .eq('status', 'complete')
        .gte('completed_at', threeDaysAgo)
        .order('completed_at', { ascending: false }),
    ])

    if (allActive.error) throw allActive.error
    if (overdue.error) throw overdue.error
    if (recentlyCompleted.error) throw recentlyCompleted.error

    const tasks = (allActive.data ?? []) as AlexTask[]
    const dueToday = tasks.filter(t => t.deadline === today)
    const endOfWeek = getEndOfWeek(today)
    const dueThisWeek = tasks.filter(
      t => t.deadline && t.deadline > today && t.deadline <= endOfWeek
    )

    const byProject: Record<string, number> = {}
    for (const t of tasks) {
      byProject[t.project] = (byProject[t.project] || 0) + 1
    }

    return {
      totalActive: tasks.length,
      overdue: (overdue.data ?? []) as AlexTask[],
      dueToday,
      dueThisWeek,
      byProject,
      recentlyCompleted: (recentlyCompleted.data ?? []) as AlexTask[],
      blocked: tasks.filter(t => t.status === 'blocked'),
    }
  },
}

function getEndOfWeek(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00Z')
  const day = d.getUTCDay()
  const daysUntilFriday = day <= 5 ? 5 - day : 5 + 7 - day
  d.setUTCDate(d.getUTCDate() + daysUntilFriday)
  return d.toISOString().split('T')[0]
}
