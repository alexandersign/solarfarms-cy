'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge, PriorityBadge, SeverityBadge } from '@/components/service/shared/status-badge'
import type { WorkOrder, Alarm } from '@/lib/service/types'
import {
  ClipboardList, AlertTriangle, Users, Package,
  ArrowRight, TrendingUp, MapPin, Clock,
} from 'lucide-react'

interface ManagerDashboardData {
  activeWorkOrders: WorkOrder[]
  todayWorkOrders: WorkOrder[]
  activeAlarms: Alarm[]
  stats: {
    open: number
    in_progress: number
    completed_today: number
    pending_parts: number
  }
}

export default function ManagerDashboard() {
  const [data, setData] = useState<ManagerDashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch_data() {
      try {
        const res = await fetch('/api/service/work-orders?view=dashboard')
        if (res.ok) {
          setData(await res.json())
        }
      } catch (err) {
        console.error('Failed to fetch dashboard:', err)
      } finally {
        setLoading(false)
      }
    }
    fetch_data()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
        <p className="text-gray-500">Field Service Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        <StatsCard
          title="Open Work Orders"
          value={data?.stats.open ?? '-'}
          icon={<ClipboardList className="w-5 h-5 text-blue-600" />}
          trend="+3 today"
          bg="bg-blue-50"
        />
        <StatsCard
          title="In Progress"
          value={data?.stats.in_progress ?? '-'}
          icon={<TrendingUp className="w-5 h-5 text-cyan-600" />}
          trend="Active now"
          bg="bg-cyan-50"
        />
        <StatsCard
          title="Active Alarms"
          value={data?.activeAlarms?.length ?? '-'}
          icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
          trend={data?.activeAlarms?.filter(a => a.severity === 'critical').length
            ? `${data.activeAlarms.filter(a => a.severity === 'critical').length} critical`
            : 'None critical'}
          bg="bg-red-50"
        />
        <StatsCard
          title="Pending Parts"
          value={data?.stats.pending_parts ?? '-'}
          icon={<Package className="w-5 h-5 text-orange-600" />}
          trend="Awaiting stock"
          bg="bg-orange-50"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Active Alarms */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Active Alarms
              </CardTitle>
              <Link href="/manager/alarms" className="text-sm text-cyprus-600 font-medium flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />)}
              </div>
            ) : data?.activeAlarms && data.activeAlarms.length > 0 ? (
              <div className="space-y-2">
                {data.activeAlarms.slice(0, 5).map(alarm => (
                  <div key={alarm.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{alarm.title}</p>
                      <p className="text-xs text-gray-500">{alarm.park?.site_name} &middot; {alarm.component}</p>
                    </div>
                    <SeverityBadge severity={alarm.severity} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center py-6">No active alarms</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Work Orders */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-blue-500" />
                Recent Work Orders
              </CardTitle>
              <Link href="/manager/work-orders" className="text-sm text-cyprus-600 font-medium flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />)}
              </div>
            ) : data?.activeWorkOrders && data.activeWorkOrders.length > 0 ? (
              <div className="space-y-2">
                {data.activeWorkOrders.slice(0, 5).map(wo => (
                  <Link key={wo.id} href={`/manager/work-orders/${wo.id}`}>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{wo.title}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                          <span>{wo.wo_number}</span>
                          <span>&middot;</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {wo.park?.site_name}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <StatusBadge status={wo.status} />
                        <PriorityBadge priority={wo.priority} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center py-6">No active work orders</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatsCard({ title, value, icon, trend, bg }: {
  title: string
  value: number | string
  icon: React.ReactNode
  trend: string
  bg: string
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center`}>
            {icon}
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-0.5">{title}</p>
        <p className="text-xs text-gray-400 mt-1">{trend}</p>
      </CardContent>
    </Card>
  )
}
