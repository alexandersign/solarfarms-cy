'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Navigation, NavigationOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GPSTrackerProps {
  workOrderId?: string
  intervalMs?: number
  onLocationUpdate?: (lat: number, lng: number) => void
}

export function GPSTracker({ workOrderId, intervalMs = 30000, onLocationUpdate }: GPSTrackerProps) {
  const [tracking, setTracking] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const watchIdRef = useRef<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const sendLocation = useCallback(async (position: GeolocationPosition) => {
    const { latitude, longitude, accuracy, speed, heading } = position.coords

    try {
      await fetch('/api/service/tracking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat: latitude,
          lng: longitude,
          accuracy,
          speed,
          heading,
          work_order_id: workOrderId,
        }),
      })

      setLastUpdate(new Date().toLocaleTimeString())
      setError(null)
      onLocationUpdate?.(latitude, longitude)
    } catch {
      setError('Failed to send location')
    }
  }, [workOrderId, onLocationUpdate])

  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setError('GPS not available')
      return
    }

    setTracking(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(sendLocation, (err) => {
      setError(err.message)
    })

    watchIdRef.current = navigator.geolocation.watchPosition(
      sendLocation,
      (err) => setError(err.message),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 }
    )

    intervalRef.current = setInterval(() => {
      navigator.geolocation.getCurrentPosition(sendLocation, (err) => {
        setError(err.message)
      })
    }, intervalMs)
  }, [sendLocation, intervalMs])

  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setTracking(false)
  }, [])

  useEffect(() => {
    return () => {
      stopTracking()
    }
  }, [stopTracking])

  return (
    <button
      onClick={tracking ? stopTracking : startTracking}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
        tracking
          ? 'bg-green-100 text-green-700 border border-green-300'
          : 'bg-gray-100 text-gray-600 border border-gray-300'
      )}
    >
      {tracking ? (
        <>
          <Navigation className="w-4 h-4 animate-pulse" />
          <span>Tracking {lastUpdate && `(${lastUpdate})`}</span>
        </>
      ) : (
        <>
          <NavigationOff className="w-4 h-4" />
          <span>GPS Off</span>
        </>
      )}
      {error && <span className="text-red-500 text-xs ml-1">({error})</span>}
    </button>
  )
}
