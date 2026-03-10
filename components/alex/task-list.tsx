'use client'

import { useState } from 'react'
import { ProjectBadge, PriorityBadge, StatusBadge } from './project-badge'
import { STATUSES, PRIORITY_ORDER } from '@/lib/alex-tasks'
import type { AlexTask, TaskStatus } from '@/lib/alex-tasks'

interface TaskListProps {
  tasks: AlexTask[]
  onUpdateStatus: (id: string, status: TaskStatus) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onUpdateTask: (id: string, updates: Partial<AlexTask>) => Promise<void>
}

function formatDeadline(deadline: string | null): { text: string; className: string } {
  if (!deadline) return { text: '—', className: 'text-gray-400' }
  const d = new Date(deadline + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = Math.floor((d.getTime() - today.getTime()) / 86400000)

  const text = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })

  if (diff < 0) return { text: `${text} (${Math.abs(diff)}d overdue)`, className: 'text-red-600 font-semibold' }
  if (diff === 0) return { text: `${text} (today)`, className: 'text-amber-600 font-semibold' }
  if (diff <= 3) return { text: `${text} (${diff}d)`, className: 'text-amber-500' }
  if (diff <= 7) return { text, className: 'text-blue-600' }
  return { text, className: 'text-gray-500' }
}

const nextStatus: Record<TaskStatus, TaskStatus> = {
  not_started: 'in_progress',
  in_progress: 'complete',
  complete: 'not_started',
  blocked: 'in_progress',
  deferred: 'not_started',
}

export function TaskList({ tasks, onUpdateStatus, onDelete, onUpdateTask }: TaskListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editingNotes, setEditingNotes] = useState<{ id: string; value: string } | null>(null)

  const sorted = [...tasks].sort((a, b) => {
    const pa = PRIORITY_ORDER[a.priority] ?? 2
    const pb = PRIORITY_ORDER[b.priority] ?? 2
    if (pa !== pb) return pa - pb
    if (a.deadline && b.deadline) return a.deadline.localeCompare(b.deadline)
    if (a.deadline) return -1
    if (b.deadline) return 1
    return 0
  })

  if (sorted.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">No tasks match the current filters.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {sorted.map(task => {
        const dl = formatDeadline(task.deadline)
        const isExpanded = expandedId === task.id

        return (
          <div
            key={task.id}
            className={`border rounded-lg transition-all ${
              task.status === 'complete'
                ? 'bg-gray-50 border-gray-200 opacity-70'
                : task.priority === 'critical'
                ? 'bg-red-50/30 border-red-200'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3 px-4 py-3">
              <button
                onClick={() => onUpdateStatus(task.id, nextStatus[task.status])}
                className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                  task.status === 'complete'
                    ? 'bg-green-500 border-green-500 text-white'
                    : task.status === 'in_progress'
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : task.status === 'blocked'
                    ? 'bg-red-500 border-red-500 text-white'
                    : 'border-gray-300 hover:border-sky-400'
                }`}
                title={`Click to set: ${nextStatus[task.status].replace('_', ' ')}`}
              >
                {task.status === 'complete' && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {task.status === 'in_progress' && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5" />
                  </svg>
                )}
                {task.status === 'blocked' && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>

              <div className="flex-1 min-w-0">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : task.id)}
                  className="text-left w-full"
                >
                  <span className={`text-sm font-medium ${task.status === 'complete' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                    {task.title}
                  </span>
                </button>
                {task.delegated_to && (
                  <span className="text-xs text-gray-400 ml-2">→ {task.delegated_to}</span>
                )}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <ProjectBadge project={task.project} />
                <PriorityBadge priority={task.priority} />
                <span className={`text-xs whitespace-nowrap ${dl.className}`}>{dl.text}</span>
              </div>
            </div>

            {isExpanded && (
              <div className="px-4 pb-3 pt-1 border-t border-gray-100">
                <div className="flex flex-wrap gap-2 mb-3">
                  <StatusBadge status={task.status} />
                  {STATUSES.filter(s => s !== task.status).map(s => (
                    <button
                      key={s}
                      onClick={() => onUpdateStatus(task.id, s)}
                      className="text-xs px-2 py-0.5 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      → {s.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                {task.description && (
                  <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                )}

                <div className="flex items-start gap-2 mt-2">
                  <textarea
                    className="flex-1 text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sky-500 resize-none"
                    placeholder="Add notes..."
                    rows={2}
                    value={editingNotes?.id === task.id ? editingNotes.value : task.notes || ''}
                    onChange={e => setEditingNotes({ id: task.id, value: e.target.value })}
                    onBlur={() => {
                      if (editingNotes?.id === task.id && editingNotes.value !== (task.notes || '')) {
                        onUpdateTask(task.id, { notes: editingNotes.value })
                      }
                      setEditingNotes(null)
                    }}
                  />
                </div>

                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => {
                      if (confirm('Delete this task?')) onDelete(task.id)
                    }}
                    className="text-xs text-red-500 hover:text-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
