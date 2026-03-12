'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge, PriorityBadge, SeverityBadge } from '@/components/service/shared/status-badge'
import type { WorkOrder, Alarm } from '@/lib/service/types'
import {
  ClipboardList,
  AlertTriangle,
  MapPin,
  ArrowRight,
  Wrench,
  Clock,
  CheckCircle,
  Package,
} from 'lucide-react'

interface DashboardData {
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

export default function TabletDashboard() {
  const { data: session } = useSession()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboard()
  }, [])

  async function fetchDashboard() {
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

  const greeting = getGreeting()
  const firstName = session?.user?.name?.split(' ')[0] || 'Engineer'

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="pt-2 pb-2">
        <p className="text-gray-500 text-sm">{greeting}</p>
        <h1 className="text-2xl font-bold text-gray-900">{firstName}</h1>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={<ClipboardList className="w-5 h-5 text-blue-600" />}
          label="Open"
          value={data?.stats.open ?? '-'}
          bg="bg-blue-50"
        />
        <StatCard
          icon={<Wrench className="w-5 h-5 text-cyan-600" />}
          label="In Progress"
          value={data?.stats.in_progress ?? '-'}
          bg="bg-cyan-50"
        />
        <StatCard
          icon={<CheckCircle className="w-5 h-5 text-green-600" />}
          label="Done Today"
          value={data?.stats.completed_today ?? '-'}
          bg="bg-green-50"
        />
        <StatCard
          icon={<Package className="w-5 h-5 text-orange-600" />}
          label="Pending Parts"
          value={data?.stats.pending_parts ?? '-'}
          bg="bg-orange-50"
        />
      </div>

      {/* Active Alarms */}
      {data?.activeAlarms && data.activeAlarms.length > 0 && (
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2 text-red-800">
                <AlertTriangle className="w-5 h-5" />
                Active Alarms ({data.activeAlarms.length})
              </CardTitle>
              <Link href="/tablet/alarms" className="text-sm text-red-600 font-medium">
                View All
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.activeAlarms.slice(0, 3).map((alarm) => (
              <div key={alarm.id} className="bg-white rounded-lg p-3 border border-red-100">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">{alarm.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{alarm.park?.site_name}</p>
                  </div>
                  <SeverityBadge severity={alarm.severity} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Today's Work Orders */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Today&apos;s Work Orders</h2>
          <Link href="/tablet/work-orders" className="text-sm text-cyprus-600 font-medium flex items-center gap-1">
            All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : data?.todayWorkOrders && data.todayWorkOrders.length > 0 ? (
          <div className="space-y-3">
            {data.todayWorkOrders.map((wo) => (
              <WorkOrderCard key={wo.id} workOrder={wo} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
              <p className="text-gray-500">No work orders scheduled for today</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 pb-4">
        <Link href="/tablet/warehouse">
          <Button variant="outline" className="w-full h-14 text-base gap-2">
            <Package className="w-5 h-5" />
            Scan QR
          </Button>
        </Link>
        <Link href="/tablet/work-orders">
          <Button className="w-full h-14 text-base gap-2 bg-cyprus-700 hover:bg-cyprus-800">
            <ClipboardList className="w-5 h-5" />
            All Work Orders
          </Button>
        </Link>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, bg }: {
  icon: React.ReactNode
  label: string
  value: number | string
  bg: string
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
            {icon}
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function WorkOrderCard({ workOrder }: { workOrder: WorkOrder }) {
  return (
    <Link href={`/tablet/work-orders/${workOrder.id}`}>
      <Card className="hover:shadow-md transition-shadow active:bg-gray-50 touch-manipulation">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{workOrder.title}</p>
              <p className="text-sm text-gray-500 mt-0.5">{workOrder.wo_number}</p>
            </div>
            <PriorityBadge priority={workOrder.priority} />
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            {workOrder.park && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {workOrder.park.site_name}
              </span>
            )}
            {workOrder.scheduled_date && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {new Date(workOrder.scheduled_date).toLocaleDateString()}
              </span>
            )}
          </div>

          <div className="mt-2">
            <StatusBadge status={workOrder.status} />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}
