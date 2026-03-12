'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GPSTracker } from '@/components/service/tablet/gps-tracker'
import {
  ArrowLeft, User, Mail, Phone, Shield,
  LogOut, MapPin, Wrench,
} from 'lucide-react'

export default function ProfilePage() {
  const { data: session } = useSession()

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3 pt-2">
        <Link href="/tablet/dashboard">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Profile</h1>
      </div>

      {/* User Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-cyprus-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-cyprus-700" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{session?.user?.name || 'Engineer'}</p>
              <p className="text-sm text-gray-500 capitalize">{session?.user?.role || 'Serviceman'}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{session?.user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700 capitalize">{session?.user?.role} Access</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GPS Tracking */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-3">
            Enable GPS tracking when on duty. Your location will be shared with the operations team.
          </p>
          <GPSTracker />
        </CardContent>
      </Card>

      {/* App Info */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            App Info
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Version</span>
            <span className="font-mono">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span>Platform</span>
            <span>PWA</span>
          </div>
          <div className="flex justify-between">
            <span>Last Sync</span>
            <span>{new Date().toLocaleString('en-GB')}</span>
          </div>
        </CardContent>
      </Card>

      {/* Sign Out */}
      <Button
        variant="destructive"
        className="w-full h-12 text-base gap-2"
        onClick={() => signOut({ callbackUrl: '/login' })}
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </Button>
    </div>
  )
}
