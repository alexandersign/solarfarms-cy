import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/service/auth'
import { alarmService } from '@/lib/service/db'
import type { AlarmStatus } from '@/lib/service/types'

export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status') as AlarmStatus | null
  const severity = searchParams.get('severity')
  const limit = searchParams.get('limit')

  try {
    const alarms = await alarmService.list({
      status: status ? status : ['active', 'acknowledged'],
      severity: severity || undefined,
      limit: limit ? parseInt(limit) : 50,
    })

    return NextResponse.json({ alarms })
  } catch (error) {
    console.error('Alarms GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch alarms' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role === 'client') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    const alarm = await alarmService.create({
      park_id: body.park_id,
      source: body.source || 'manual',
      severity: body.severity,
      title: body.title,
      description: body.description,
      alarm_code: body.alarm_code,
      component: body.component,
    })

    return NextResponse.json(alarm, { status: 201 })
  } catch (error) {
    console.error('Alarms POST error:', error)
    return NextResponse.json({ error: 'Failed to create alarm' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id, action } = await request.json()

    let alarm
    if (action === 'acknowledge') {
      alarm = await alarmService.acknowledge(id, session.user.id)
    } else if (action === 'resolve') {
      alarm = await alarmService.resolve(id)
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    return NextResponse.json(alarm)
  } catch (error) {
    console.error('Alarms PATCH error:', error)
    return NextResponse.json({ error: 'Failed to update alarm' }, { status: 500 })
  }
}
