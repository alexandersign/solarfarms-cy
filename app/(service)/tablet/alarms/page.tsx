'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SeverityBadge } from '@/components/service/shared/status-badge'
import type { Alarm, AlarmSeverity } from '@/lib/service/types'
import {
  ArrowLeft, AlertTriangle, Bell, BellOff,
  CheckCircle, Clock, MapPin,
} from 'lucide-react'

const SEVERITY_FILTERS: { value: AlarmSeverity | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'critical', label: 'Critical' },
  { value: 'major', label: 'Major' },
  { value: 'minor', label: 'Minor' },
  { value: 'informational', label: 'Info' },
]

export default function AlarmsPage() {
  const [alarms, setAlarms] = useState<Alarm[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<AlarmSeverity | 'all'>('all')

  useEffect(() => {
    fetchAlarms()
  }, [])

  async function fetchAlarms() {
    try {
      const res = await fetch('/api/service/alarms')
      if (res.ok) {
        const data = await res.json()
        setAlarms(data.alarms || [])
      }
    } catch (err) {
      console.error('Failed to fetch alarms:', err)
    } finally {
      setLoading(false)
    }
  }

  async function acknowledgeAlarm(id: string) {
    try {
      const res = await fetch('/api/service/alarms', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'acknowledge' }),
      })
      if (res.ok) {
        fetchAlarms()
      }
    } catch (err) {
      console.error('Failed to acknowledge alarm:', err)
    }
  }

  const filtered = filter === 'all' ? alarms : alarms.filter(a => a.severity === filter)

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3 pt-2">
        <Link href="/tablet/dashboard">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Alarms</h1>
        <span className="ml-auto text-sm text-gray-500">{alarms.length} active</span>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar">
        {SEVERITY_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors touch-manipulation ${
              filter === f.value
                ? 'bg-cyprus-700 text-white'
                : 'bg-white border border-gray-300 text-gray-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Alarm List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse" />)}
        </div>
      ) : filtered.length > 0 ? (
        <div className="space-y-3 pb-4">
          {filtered.map((alarm) => (
            <Card key={alarm.id} className={
              alarm.severity === 'critical' ? 'border-red-300 bg-red-50/30' :
              alarm.severity === 'major' ? 'border-orange-300 bg-orange-50/30' :
              ''
            }>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">{alarm.title}</p>
                    {alarm.description && (
                      <p className="text-sm text-gray-600 mt-0.5 line-clamp-2">{alarm.description}</p>
                    )}
                  </div>
                  <SeverityBadge severity={alarm.severity} />
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  {alarm.park && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {alarm.park.site_name}
                    </span>
                  )}
                  {alarm.component && (
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {alarm.component}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(alarm.created_at).toLocaleString('en-GB')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    alarm.status === 'active' ? 'bg-red-100 text-red-700' :
                    alarm.status === 'acknowledged' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {alarm.status}
                  </span>

                  {alarm.status === 'active' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => acknowledgeAlarm(alarm.id)}
                      className="ml-auto h-8 text-xs"
                    >
                      <Bell className="w-3.5 h-3.5 mr-1" />
                      Acknowledge
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <BellOff className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No active alarms</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
