import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/service/auth'
import { locationService, userService } from '@/lib/service/db'

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { lat, lng, accuracy, speed, heading, work_order_id } = await request.json()

    if (!lat || !lng) {
      return NextResponse.json({ error: 'lat and lng are required' }, { status: 400 })
    }

    await locationService.record({
      user_id: session.user.id,
      lat,
      lng,
      accuracy,
      speed,
      heading,
      work_order_id,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Tracking POST error:', error)
    return NextResponse.json({ error: 'Failed to record location' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role === 'serviceman') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const servicemen = await userService.list('serviceman')

    const activeServicemen = servicemen
      .filter(s => s.current_lat && s.current_lng)
      .map(s => ({
        id: s.id,
        name: s.name,
        lat: s.current_lat,
        lng: s.current_lng,
        updated_at: s.location_updated_at,
      }))

    return NextResponse.json({ servicemen: activeServicemen })
  } catch (error) {
    console.error('Tracking GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 })
  }
}
