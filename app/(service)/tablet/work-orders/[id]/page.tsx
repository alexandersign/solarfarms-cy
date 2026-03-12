'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge, PriorityBadge } from '@/components/service/shared/status-badge'
import type { WorkOrder, WorkOrderStatus } from '@/lib/service/types'
import {
  ArrowLeft, MapPin, Clock, User, Camera, CheckSquare,
  Play, Pause, Navigation, CheckCircle, AlertTriangle, FileText,
} from 'lucide-react'

const STATUS_TRANSITIONS: Record<WorkOrderStatus, { next: WorkOrderStatus; label: string; icon: typeof Play }[]> = {
  open: [{ next: 'assigned', label: 'Accept', icon: CheckCircle }],
  assigned: [{ next: 'in_transit', label: 'Start Route', icon: Navigation }],
  in_transit: [{ next: 'on_site', label: 'Arrived on Site', icon: MapPin }],
  on_site: [{ next: 'in_progress', label: 'Start Work', icon: Play }],
  in_progress: [
    { next: 'pending_parts', label: 'Needs Parts', icon: Pause },
    { next: 'completed', label: 'Complete', icon: CheckCircle },
  ],
  pending_parts: [{ next: 'in_progress', label: 'Resume Work', icon: Play }],
  completed: [],
  cancelled: [],
}

export default function WorkOrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [workOrder, setWorkOrder] = useState<WorkOrder | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetchWorkOrder()
  }, [params.id])

  async function fetchWorkOrder() {
    try {
      const res = await fetch(`/api/service/work-orders/${params.id}`)
      if (res.ok) {
        setWorkOrder(await res.json())
      }
    } catch (err) {
      console.error('Failed to fetch work order:', err)
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(newStatus: WorkOrderStatus) {
    if (!workOrder) return
    setUpdating(true)
    try {
      const res = await fetch(`/api/service/work-orders/${workOrder.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setWorkOrder(await res.json())
      }
    } catch (err) {
      console.error('Failed to update status:', err)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-48 bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-32 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    )
  }

  if (!workOrder) {
    return (
      <div className="p-4 text-center py-20">
        <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500">Work order not found</p>
        <Link href="/tablet/work-orders">
          <Button variant="outline" className="mt-4">Back to Work Orders</Button>
        </Link>
      </div>
    )
  }

  const transitions = STATUS_TRANSITIONS[workOrder.status] || []

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 pt-2">
        <Link href="/tablet/work-orders">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-gray-900 truncate">{workOrder.title}</h1>
          <p className="text-sm text-gray-500">{workOrder.wo_number}</p>
        </div>
      </div>

      {/* Status + Priority */}
      <div className="flex items-center gap-2">
        <StatusBadge status={workOrder.status} />
        <PriorityBadge priority={workOrder.priority} />
        <span className="text-sm text-gray-500 ml-auto capitalize">
          {workOrder.type.replace('_', ' ')}
        </span>
      </div>

      {/* Status Actions */}
      {transitions.length > 0 && (
        <div className="flex gap-2">
          {transitions.map((t) => {
            const Icon = t.icon
            const isComplete = t.next === 'completed'
            return (
              <Button
                key={t.next}
                onClick={() => updateStatus(t.next)}
                disabled={updating}
                className={`flex-1 h-14 text-base gap-2 ${
                  isComplete
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-cyprus-700 hover:bg-cyprus-800 text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {t.label}
              </Button>
            )
          })}
        </div>
      )}

      {/* Site Info */}
      {workOrder.park && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Site Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <InfoRow icon={<MapPin className="w-4 h-4" />} label="Site" value={workOrder.park.site_name} />
            {workOrder.park.site_address && (
              <InfoRow icon={<MapPin className="w-4 h-4" />} label="Address" value={workOrder.park.site_address} />
            )}
            <InfoRow icon={<FileText className="w-4 h-4" />} label="Project" value={workOrder.park.project_id} />
            <InfoRow
              icon={<FileText className="w-4 h-4" />}
              label="Type"
              value={`${workOrder.park.park_type.toUpperCase()} - ${workOrder.park.capacity_mw ?? '?'} MW`}
            />
            {workOrder.park.lat && workOrder.park.lng && (
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${workOrder.park.lat},${workOrder.park.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="w-full mt-2 h-12 text-base gap-2">
                  <Navigation className="w-5 h-5" />
                  Navigate to Site
                </Button>
              </a>
            )}
          </CardContent>
        </Card>
      )}

      {/* Description */}
      {workOrder.description && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{workOrder.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Details */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {workOrder.scheduled_date && (
            <InfoRow
              icon={<Clock className="w-4 h-4" />}
              label="Scheduled"
              value={new Date(workOrder.scheduled_date).toLocaleDateString('en-GB', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
              })}
            />
          )}
          {workOrder.assignee && (
            <InfoRow icon={<User className="w-4 h-4" />} label="Assigned To" value={workOrder.assignee.name} />
          )}
          <InfoRow
            icon={<Clock className="w-4 h-4" />}
            label="Created"
            value={new Date(workOrder.created_at).toLocaleDateString('en-GB')}
          />
          {workOrder.started_at && (
            <InfoRow
              icon={<Play className="w-4 h-4" />}
              label="Started"
              value={new Date(workOrder.started_at).toLocaleString('en-GB')}
            />
          )}
          {workOrder.completed_at && (
            <InfoRow
              icon={<CheckCircle className="w-4 h-4" />}
              label="Completed"
              value={new Date(workOrder.completed_at).toLocaleString('en-GB')}
            />
          )}
        </CardContent>
      </Card>

      {/* Photos */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Photos ({workOrder.photos?.length || 0})</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {workOrder.photos && workOrder.photos.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {workOrder.photos.map((photo) => (
                <div key={photo.id} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={photo.storage_path}
                    alt={photo.caption || 'Service photo'}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-4">No photos yet</p>
          )}
          <Button variant="outline" className="w-full mt-3 h-12 text-base gap-2">
            <Camera className="w-5 h-5" />
            Take Photo
          </Button>
        </CardContent>
      </Card>

      {/* Notes */}
      {workOrder.notes && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{workOrder.notes}</p>
          </CardContent>
        </Card>
      )}

      <div className="h-4" />
    </div>
  )
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-400">{icon}</span>
      <span className="text-gray-500 w-24 flex-shrink-0">{label}</span>
      <span className="text-gray-900 font-medium truncate">{value}</span>
    </div>
  )
}
