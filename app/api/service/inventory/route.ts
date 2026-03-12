import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/service/auth'
import { inventoryService } from '@/lib/service/db'

export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const lowStockOnly = searchParams.get('low_stock') === 'true'
  const alerts = searchParams.get('alerts') === 'true'

  try {
    if (alerts) {
      const reorderAlerts = await inventoryService.getAlerts('open')
      return NextResponse.json({ alerts: reorderAlerts })
    }

    const items = await inventoryService.listItems({
      category: category || undefined,
      lowStockOnly,
    })

    return NextResponse.json({ items })
  } catch (error) {
    console.error('Inventory GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { item_id, quantity, work_order_id, type } = await request.json()

    if (!item_id || !quantity) {
      return NextResponse.json({ error: 'item_id and quantity are required' }, { status: 400 })
    }

    const transaction = await inventoryService.checkout(
      item_id,
      quantity,
      session.user.id,
      work_order_id
    )

    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    console.error('Inventory POST error:', error)
    return NextResponse.json({ error: 'Failed to process transaction' }, { status: 500 })
  }
}
