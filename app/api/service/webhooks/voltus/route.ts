import { NextRequest, NextResponse } from 'next/server'
import { alarmService, parkService } from '@/lib/service/db'
import type { AlarmSeverity } from '@/lib/service/types'

const VOLTUS_WEBHOOK_SECRET = process.env.VOLTUS_WEBHOOK_SECRET || ''

function classifyAlarmSeverity(alarmData: Record<string, unknown>): AlarmSeverity {
  const code = (alarmData.alarm_code as string || '').toLowerCase()
  const level = (alarmData.level as string || '').toLowerCase()

  if (level === 'critical' || code.includes('fire') || code.includes('thermal_runaway') || code.includes('emergency')) {
    return 'critical'
  }
  if (level === 'major' || code.includes('pcs_fault') || code.includes('bms_comm_loss') || code.includes('overcurrent')) {
    return 'major'
  }
  if (level === 'minor' || code.includes('hvac') || code.includes('sensor') || code.includes('filter')) {
    return 'minor'
  }
  return 'informational'
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('x-webhook-secret')
  if (VOLTUS_WEBHOOK_SECRET && authHeader !== VOLTUS_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await request.json()

    const severity = classifyAlarmSeverity(payload)

    const alarm = await alarmService.create({
      park_id: payload.park_id,
      source: 'voltus',
      voltus_alarm_id: payload.alarm_id || payload.id,
      severity,
      title: payload.title || payload.message || 'Voltus EMS Alarm',
      description: payload.description || payload.details,
      alarm_code: payload.alarm_code || payload.code,
      component: payload.component || payload.equipment,
      raw_data: payload,
    })

    // TODO: Phase 4 - trigger notification pipeline based on severity
    // if (severity === 'critical') { await sendCriticalNotification(alarm) }
    // if (severity === 'major') { await sendMajorNotification(alarm) }

    return NextResponse.json({ received: true, alarm_id: alarm.id, severity })
  } catch (error) {
    console.error('Voltus webhook error:', error)
    return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 })
  }
}
