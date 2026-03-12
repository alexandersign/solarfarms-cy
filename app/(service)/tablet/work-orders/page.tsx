'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge, PriorityBadge } from '@/components/service/shared/status-badge'
import type { WorkOrder, WorkOrderStatus } from '@/lib/service/types'
import {
  MapPin, Clock, Filter, Search, ArrowLeft,
} from 'lucide-react'

const STATUS_FILTERS: { value: WorkOrderStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'assigned', label: 'Assigned' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'pending_parts', label: 'Parts' },
  { value: 'completed', label: 'Done' },
]

export default function WorkOrderListPage() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<WorkOrderStatus | 'all'>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchWorkOrders()
  }, [statusFilter])

  async function fetchWorkOrders() {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.set('status', statusFilter)
      const res = await fetch(`/api/service/work-orders?${params}`)
      if (res.ok) {
        const data = await res.json()
        setWorkOrders(data.workOrders || [])
      }
    } catch (err) {
      console.error('Failed to fetch work orders:', err)
    } finally {
      setLoading(false)
    }
  }

  const filtered = search
    ? workOrders.filter(wo =>
        wo.title.toLowerCase().includes(search.toLowerCase()) ||
        wo.wo_number.toLowerCase().includes(search.toLowerCase()) ||
        wo.park?.site_name?.toLowerCase().includes(search.toLowerCase())
      )
    : workOrders

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 pt-2">
        <Link href="/tablet/dashboard">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Work Orders</h1>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search work orders..."
          className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyprus-500 focus:border-transparent outline-none text-base"
        />
      </div>

      {/* Status Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar">
        {STATUS_FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setStatusFilter(filter.value)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors touch-manipulation ${
              statusFilter === filter.value
                ? 'bg-cyprus-700 text-white'
                : 'bg-white border border-gray-300 text-gray-700'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Work Order List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="space-y-3 pb-4">
          {filtered.map((wo) => (
            <Link key={wo.id} href={`/tablet/work-orders/${wo.id}`}>
              <Card className="hover:shadow-md transition-shadow active:bg-gray-50 touch-manipulation mb-3">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{wo.title}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{wo.wo_number}</p>
                    </div>
                    <PriorityBadge priority={wo.priority} />
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                    {wo.park && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {wo.park.site_name}
                      </span>
                    )}
                    {wo.scheduled_date && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(wo.scheduled_date).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <StatusBadge status={wo.status} />
                    <span className="text-xs text-gray-400">
                      {wo.type.replace('_', ' ')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No work orders found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
