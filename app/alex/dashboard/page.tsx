'use client'

import { useState, useEffect, useCallback } from 'react'
import { TaskList } from '@/components/alex/task-list'
import { TaskForm } from '@/components/alex/task-form'
import { ProjectBadge } from '@/components/alex/project-badge'
import { PROJECTS, PRIORITIES, STATUSES, PROJECT_LABELS, PRIORITY_ORDER } from '@/lib/alex-tasks'
import type { AlexTask, Project, Priority, TaskStatus } from '@/lib/alex-tasks'

function getAuthHeader(): string {
  const secret = document.cookie
    .split('; ')
    .find(c => c.startsWith('alex_tasks_auth='))
    ?.split('=')[1]
  return secret ? `Bearer ${secret}` : ''
}

export default function AlexDashboard() {
  const [tasks, setTasks] = useState<AlexTask[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [filterProject, setFilterProject] = useState<Project | ''>('')
  const [filterPriority, setFilterPriority] = useState<Priority | ''>('')
  const [filterStatus, setFilterStatus] = useState<TaskStatus | ''>('')

  const fetchTasks = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (filterProject) params.set('project', filterProject)
      if (filterPriority) params.set('priority', filterPriority)
      if (filterStatus) params.set('status', filterStatus)

      const res = await fetch(`/api/alex/tasks?${params}`, {
        headers: { Authorization: getAuthHeader() },
      })
      if (res.ok) {
        const data = await res.json()
        setTasks(data.tasks)
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [filterProject, filterPriority, filterStatus])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  async function handleCreate(input: {
    title: string
    project: Project
    priority: Priority
    deadline: string
    description: string
    delegated_to: string
  }) {
    const res = await fetch('/api/alex/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify(input),
    })
    if (res.ok) {
      setShowForm(false)
      fetchTasks()
    }
  }

  async function handleUpdateStatus(id: string, status: TaskStatus) {
    await fetch(`/api/alex/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify({ status }),
    })
    fetchTasks()
  }

  async function handleUpdateTask(id: string, updates: Partial<AlexTask>) {
    await fetch(`/api/alex/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify(updates),
    })
    fetchTasks()
  }

  async function handleDelete(id: string) {
    await fetch(`/api/alex/tasks/${id}`, {
      method: 'DELETE',
      headers: { Authorization: getAuthHeader() },
    })
    fetchTasks()
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayStr = today.toISOString().split('T')[0]

  const activeTasks = tasks.filter(t => t.status !== 'complete' && t.status !== 'deferred')
  const overdue = activeTasks.filter(t => t.deadline && t.deadline < todayStr)
  const dueToday = activeTasks.filter(t => t.deadline === todayStr)
  const blocked = activeTasks.filter(t => t.status === 'blocked')
  const critical = activeTasks.filter(t => t.priority === 'critical')

  const projectCounts: Record<string, number> = {}
  for (const t of activeTasks) {
    projectCounts[t.project] = (projectCounts[t.project] || 0) + 1
  }

  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <SummaryCard
          label="Overdue"
          count={overdue.length}
          color={overdue.length > 0 ? 'red' : 'green'}
        />
        <SummaryCard label="Due Today" count={dueToday.length} color="amber" />
        <SummaryCard label="Blocked" count={blocked.length} color="purple" />
        <SummaryCard label="Critical" count={critical.length} color="red" />
      </div>

      {/* Project Overview */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Active by Project</h2>
        <div className="flex flex-wrap gap-2">
          {PROJECTS.filter(p => projectCounts[p]).map(p => (
            <button
              key={p}
              onClick={() => setFilterProject(filterProject === p ? '' : p)}
              className={`transition-all ${filterProject === p ? 'ring-2 ring-sky-400 rounded-md' : ''}`}
            >
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-gray-200 hover:bg-gray-50 text-sm">
                <ProjectBadge project={p} />
                <span className="font-semibold text-gray-700">{projectCounts[p]}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Filters + Add Button */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select
          value={filterProject}
          onChange={e => setFilterProject(e.target.value as Project | '')}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="">All Projects</option>
          {PROJECTS.map(p => (
            <option key={p} value={p}>{PROJECT_LABELS[p]}</option>
          ))}
        </select>

        <select
          value={filterPriority}
          onChange={e => setFilterPriority(e.target.value as Priority | '')}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="">All Priorities</option>
          {PRIORITIES.map(p => (
            <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value as TaskStatus | '')}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="">All Statuses</option>
          {STATUSES.map(s => (
            <option key={s} value={s}>{s.replace('_', ' ').replace(/^\w/, c => c.toUpperCase())}</option>
          ))}
        </select>

        {(filterProject || filterPriority || filterStatus) && (
          <button
            onClick={() => { setFilterProject(''); setFilterPriority(''); setFilterStatus('') }}
            className="text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Clear filters
          </button>
        )}

        <div className="flex-1" />

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700 transition-colors flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </button>
      </div>

      {/* Add Task Form */}
      {showForm && (
        <div className="mb-4">
          <TaskForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {/* Task List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-pulse text-gray-400">Loading tasks...</div>
        </div>
      ) : (
        <TaskList
          tasks={tasks}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDelete}
          onUpdateTask={handleUpdateTask}
        />
      )}

      {/* Task count */}
      <div className="mt-4 text-xs text-gray-400 text-center">
        {tasks.length} task{tasks.length !== 1 ? 's' : ''} shown
        {activeTasks.length !== tasks.length && ` (${activeTasks.length} active)`}
      </div>
    </div>
  )
}

function SummaryCard({ label, count, color }: { label: string; count: number; color: string }) {
  const colorMap: Record<string, string> = {
    red: count > 0 ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700',
    amber: 'bg-amber-50 text-amber-700',
    purple: 'bg-purple-50 text-purple-700',
    green: 'bg-green-50 text-green-700',
    blue: 'bg-blue-50 text-blue-700',
  }

  return (
    <div className={`rounded-xl p-4 text-center ${colorMap[color] || 'bg-gray-50 text-gray-700'}`}>
      <div className="text-3xl font-bold">{count}</div>
      <div className="text-xs font-medium mt-1 opacity-75">{label}</div>
    </div>
  )
}
