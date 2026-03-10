'use client'

import { PROJECT_LABELS, PROJECT_COLORS } from '@/lib/alex-tasks'
import type { Project } from '@/lib/alex-tasks'

export function ProjectBadge({ project }: { project: Project }) {
  const label = PROJECT_LABELS[project] || project
  const color = PROJECT_COLORS[project] || '#6b7280'

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border"
      style={{
        color,
        backgroundColor: `${color}15`,
        borderColor: `${color}40`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full mr-1.5"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  )
}

export function PriorityBadge({ priority }: { priority: string }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    critical: { bg: 'bg-red-100', text: 'text-red-700', label: 'CRITICAL' },
    high: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'HIGH' },
    medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'MEDIUM' },
    low: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'LOW' },
  }
  const c = config[priority] || config.medium

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    not_started: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Not Started' },
    in_progress: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'In Progress' },
    complete: { bg: 'bg-green-100', text: 'text-green-700', label: 'Complete' },
    blocked: { bg: 'bg-red-100', text: 'text-red-700', label: 'Blocked' },
    deferred: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Deferred' },
  }
  const c = config[status] || config.not_started

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  )
}
