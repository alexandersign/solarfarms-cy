import { cn } from '@/lib/utils'
import {
  STATUS_CONFIG, PRIORITY_CONFIG, SEVERITY_CONFIG,
  type WorkOrderStatus, type WorkOrderPriority, type AlarmSeverity,
} from '@/lib/service/types'

export function StatusBadge({ status }: { status: WorkOrderStatus }) {
  const config = STATUS_CONFIG[status]
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', config.bgColor, config.color)}>
      {config.label}
    </span>
  )
}

export function PriorityBadge({ priority }: { priority: WorkOrderPriority }) {
  const config = PRIORITY_CONFIG[priority]
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', config.bgColor, config.color)}>
      {config.label}
    </span>
  )
}

export function SeverityBadge({ severity }: { severity: AlarmSeverity }) {
  const config = SEVERITY_CONFIG[severity]
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', config.bgColor, config.color)}>
      {config.label}
    </span>
  )
}
