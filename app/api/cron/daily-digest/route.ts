import { NextRequest, NextResponse } from 'next/server'
import { alexTasksService, PROJECT_LABELS, PROJECT_COLORS } from '@/lib/alex-tasks'
import type { AlexTask, Priority } from '@/lib/alex-tasks'
import { sendEmail } from '@/lib/email'

const RECIPIENT = 'alexander.papacosta@lighthief.com'
const DASHBOARD_URL = 'https://solarfarms.cy/alex/dashboard'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const isVercelCron = authHeader === `Bearer ${process.env.CRON_SECRET}`
  const isManual = authHeader === `Bearer ${process.env.ALEX_TASKS_SECRET}`

  if (!isVercelCron && !isManual) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const digest = await alexTasksService.getDigestData()
    const html = buildDigestEmail(digest)

    const today = new Date().toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Nicosia',
    })

    const result = await sendEmail({
      to: RECIPIENT,
      subject: `Task Digest — ${today} | ${digest.overdue.length} overdue, ${digest.totalActive} active`,
      html,
    })

    return NextResponse.json({
      success: result.success,
      summary: {
        totalActive: digest.totalActive,
        overdue: digest.overdue.length,
        dueToday: digest.dueToday.length,
        dueThisWeek: digest.dueThisWeek.length,
        blocked: digest.blocked.length,
        recentlyCompleted: digest.recentlyCompleted.length,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Daily digest failed', details: String(error) },
      { status: 500 }
    )
  }
}

function priorityBadge(p: Priority): string {
  const colors: Record<Priority, string> = {
    critical: '#dc2626',
    high: '#ea580c',
    medium: '#ca8a04',
    low: '#6b7280',
  }
  return `<span style="display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;color:#fff;background:${colors[p]};">${p.toUpperCase()}</span>`
}

function taskRow(task: AlexTask): string {
  const projectColor = PROJECT_COLORS[task.project] || '#6b7280'
  const projectLabel = PROJECT_LABELS[task.project] || task.project
  const deadlineStr = task.deadline
    ? new Date(task.deadline + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
    : '—'
  const delegated = task.delegated_to ? ` → ${task.delegated_to}` : ''

  return `
    <tr style="border-bottom:1px solid #e5e7eb;">
      <td style="padding:10px 8px;">
        <span style="display:inline-block;width:4px;height:28px;border-radius:2px;background:${projectColor};margin-right:8px;vertical-align:middle;"></span>
        <span style="vertical-align:middle;font-weight:500;">${task.title}</span>
        ${delegated ? `<span style="color:#9ca3af;font-size:12px;">${delegated}</span>` : ''}
      </td>
      <td style="padding:10px 8px;text-align:center;">
        <span style="display:inline-block;padding:2px 6px;border-radius:4px;font-size:11px;color:${projectColor};background:${projectColor}15;border:1px solid ${projectColor}40;">${projectLabel}</span>
      </td>
      <td style="padding:10px 8px;text-align:center;">${priorityBadge(task.priority)}</td>
      <td style="padding:10px 8px;text-align:center;font-size:13px;color:#6b7280;">${deadlineStr}</td>
    </tr>`
}

function taskSection(title: string, emoji: string, color: string, tasks: AlexTask[]): string {
  if (tasks.length === 0) return ''
  return `
    <div style="margin:24px 0;">
      <h3 style="color:${color};margin:0 0 12px 0;font-size:16px;">${emoji} ${title} (${tasks.length})</h3>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="border-bottom:2px solid #e5e7eb;">
            <th style="text-align:left;padding:8px;color:#6b7280;font-weight:500;">Task</th>
            <th style="text-align:center;padding:8px;color:#6b7280;font-weight:500;">Project</th>
            <th style="text-align:center;padding:8px;color:#6b7280;font-weight:500;">Priority</th>
            <th style="text-align:center;padding:8px;color:#6b7280;font-weight:500;">Deadline</th>
          </tr>
        </thead>
        <tbody>
          ${tasks.map(taskRow).join('')}
        </tbody>
      </table>
    </div>`
}

interface DigestData {
  totalActive: number
  overdue: AlexTask[]
  dueToday: AlexTask[]
  dueThisWeek: AlexTask[]
  byProject: Record<string, number>
  recentlyCompleted: AlexTask[]
  blocked: AlexTask[]
}

function buildDigestEmail(data: DigestData): string {
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Nicosia',
  })

  const projectBreakdown = Object.entries(data.byProject)
    .sort(([, a], [, b]) => b - a)
    .map(([proj, count]) => {
      const color = PROJECT_COLORS[proj as keyof typeof PROJECT_COLORS] || '#6b7280'
      const label = PROJECT_LABELS[proj as keyof typeof PROJECT_LABELS] || proj
      return `<span style="display:inline-block;margin:4px 6px 4px 0;padding:4px 10px;border-radius:6px;font-size:13px;background:${color}15;color:${color};border:1px solid ${color}30;">${label}: <strong>${count}</strong></span>`
    })
    .join('')

  const completedList = data.recentlyCompleted
    .map(t => {
      const label = PROJECT_LABELS[t.project] || t.project
      return `<li style="margin:4px 0;color:#059669;">✓ ${t.title} <span style="color:#9ca3af;font-size:12px;">(${label})</span></li>`
    })
    .join('')

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alex Task Digest</title>
</head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#1f2937;margin:0;padding:0;background:#f3f4f6;">
  <div style="max-width:680px;margin:0 auto;background:#ffffff;">
    
    <div style="background:linear-gradient(135deg,#1e3a5f 0%,#0ea5e9 100%);padding:28px 24px;color:#ffffff;">
      <h1 style="margin:0 0 4px 0;font-size:22px;font-weight:600;">Task Digest</h1>
      <p style="margin:0;font-size:14px;opacity:0.85;">${today}</p>
    </div>

    <div style="padding:20px 24px;">
      <div style="display:flex;gap:12px;margin-bottom:20px;">
        <div style="flex:1;text-align:center;padding:14px;background:${data.overdue.length > 0 ? '#fef2f2' : '#f0fdf4'};border-radius:8px;">
          <div style="font-size:28px;font-weight:700;color:${data.overdue.length > 0 ? '#dc2626' : '#16a34a'};">${data.overdue.length}</div>
          <div style="font-size:12px;color:#6b7280;">OVERDUE</div>
        </div>
        <div style="flex:1;text-align:center;padding:14px;background:#fffbeb;border-radius:8px;">
          <div style="font-size:28px;font-weight:700;color:#d97706;">${data.dueToday.length}</div>
          <div style="font-size:12px;color:#6b7280;">TODAY</div>
        </div>
        <div style="flex:1;text-align:center;padding:14px;background:#eff6ff;border-radius:8px;">
          <div style="font-size:28px;font-weight:700;color:#2563eb;">${data.dueThisWeek.length}</div>
          <div style="font-size:12px;color:#6b7280;">THIS WEEK</div>
        </div>
        <div style="flex:1;text-align:center;padding:14px;background:#f5f3ff;border-radius:8px;">
          <div style="font-size:28px;font-weight:700;color:#7c3aed;">${data.totalActive}</div>
          <div style="font-size:12px;color:#6b7280;">ACTIVE</div>
        </div>
      </div>

      ${taskSection('OVERDUE', '🔴', '#dc2626', data.overdue)}
      ${taskSection('DUE TODAY', '🟡', '#d97706', data.dueToday)}
      ${taskSection('DUE THIS WEEK', '🔵', '#2563eb', data.dueThisWeek)}
      ${taskSection('BLOCKED', '⛔', '#7c3aed', data.blocked)}

      <div style="margin:24px 0;">
        <h3 style="color:#374151;margin:0 0 8px 0;font-size:15px;">By Project</h3>
        <div>${projectBreakdown}</div>
      </div>

      ${data.recentlyCompleted.length > 0 ? `
      <div style="margin:24px 0;padding:16px;background:#f0fdf4;border-radius:8px;">
        <h3 style="color:#059669;margin:0 0 8px 0;font-size:15px;">Recently Completed (Last 3 Days)</h3>
        <ul style="margin:0;padding-left:20px;">${completedList}</ul>
      </div>` : ''}

      <div style="text-align:center;margin:28px 0;">
        <a href="${DASHBOARD_URL}" style="display:inline-block;padding:12px 32px;background:#0ea5e9;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Open Dashboard</a>
      </div>
    </div>

    <div style="padding:16px 24px;background:#f9fafb;font-size:12px;color:#9ca3af;text-align:center;">
      <p style="margin:0;">Lighthief Cyprus Ltd — Personal Task Hub</p>
      <p style="margin:4px 0 0 0;">Sent daily at 08:00 CY time | <a href="${DASHBOARD_URL}" style="color:#0ea5e9;">Manage Tasks</a></p>
    </div>
  </div>
</body>
</html>`
}
