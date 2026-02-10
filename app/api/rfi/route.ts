import { NextRequest, NextResponse } from 'next/server'
import { rfiService, SEED_DATA } from '@/lib/rfi-service'

// GET /api/rfi — List all RFIs (with optional filters)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const statsOnly = searchParams.get('stats') === 'true'

    if (statsOnly) {
      const stats = await rfiService.getStats()
      return NextResponse.json(stats)
    }

    const items = await rfiService.getAll()
    return NextResponse.json({ items, count: items.length })
  } catch (error: any) {
    console.error('RFI GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch RFIs', detail: error?.message },
      { status: 500 }
    )
  }
}

// POST /api/rfi — Create a new RFI (or seed initial data)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Special: seed database with initial tracker data
    if (body._action === 'seed') {
      const results = []
      for (const item of SEED_DATA) {
        try {
          const created = await rfiService.create(item)
          results.push({ reference: created.reference, status: 'created' })
        } catch (err: any) {
          results.push({ reference: item.reference, status: 'error', detail: err?.message })
        }
      }
      return NextResponse.json({ seeded: results.length, results })
    }

    // Normal create
    const { reference, type, direction, subject, ...rest } = body
    if (!reference || !subject) {
      return NextResponse.json(
        { error: 'reference and subject are required' },
        { status: 400 }
      )
    }

    const item = await rfiService.create({
      reference,
      type: type || 'RFI',
      direction: direction || 'outbound',
      subject,
      status: 'draft',
      priority: 'medium',
      from_company: 'Lighthief Cyprus',
      from_contact: 'Alex Papacosta',
      from_email: 'lighthiefcyprus@gmail.com',
      to_company: '',
      ...rest,
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error: any) {
    console.error('RFI POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create RFI', detail: error?.message },
      { status: 500 }
    )
  }
}
