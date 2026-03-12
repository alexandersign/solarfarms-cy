import { createClient } from '@supabase/supabase-js'
import type {
  ServiceUser, ServicePark, WorkOrder, Alarm,
  ChecklistSubmission, ServicePhoto, LocationPoint,
  InventoryItem, InventoryTransaction, ReorderAlert,
  WorkOrderStatus, WorkOrderPriority, AlarmStatus,
} from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iipbxwyvlzxthlblayvw.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export function getServiceDb() {
  return createClient(supabaseUrl, supabaseServiceKey)
}

// ============================================================
// WORK ORDERS
// ============================================================

export const workOrderService = {
  async list(filters?: {
    assignedTo?: string
    parkId?: string
    status?: WorkOrderStatus | WorkOrderStatus[]
    priority?: WorkOrderPriority
    limit?: number
    offset?: number
  }) {
    const db = getServiceDb()
    let query = db
      .from('work_orders')
      .select(`
        *,
        park:service_parks(*),
        assignee:service_users!work_orders_assigned_to_fkey(id, name, email, phone, current_lat, current_lng)
      `)
      .order('created_at', { ascending: false })

    if (filters?.assignedTo) query = query.eq('assigned_to', filters.assignedTo)
    if (filters?.parkId) query = query.eq('park_id', filters.parkId)
    if (filters?.priority) query = query.eq('priority', filters.priority)
    if (filters?.limit) query = query.limit(filters.limit)
    if (filters?.offset) query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1)

    if (filters?.status) {
      if (Array.isArray(filters.status)) {
        query = query.in('status', filters.status)
      } else {
        query = query.eq('status', filters.status)
      }
    }

    const { data, error } = await query
    if (error) throw error
    return data as WorkOrder[]
  },

  async getById(id: string) {
    const db = getServiceDb()
    const { data, error } = await db
      .from('work_orders')
      .select(`
        *,
        park:service_parks(*),
        assignee:service_users!work_orders_assigned_to_fkey(id, name, email, phone, current_lat, current_lng),
        creator:service_users!work_orders_created_by_fkey(id, name, email),
        photos:service_photos(*),
        checklist:checklist_submissions(*)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data as WorkOrder
  },

  async create(wo: Partial<WorkOrder>) {
    const db = getServiceDb()
    const { data, error } = await db
      .from('work_orders')
      .insert(wo)
      .select()
      .single()

    if (error) throw error
    return data as WorkOrder
  },

  async update(id: string, updates: Partial<WorkOrder>) {
    const db = getServiceDb()
    const { data, error } = await db
      .from('work_orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as WorkOrder
  },

  async updateStatus(id: string, status: WorkOrderStatus, extras?: Partial<WorkOrder>) {
    const updates: Partial<WorkOrder> = { status, ...extras }

    if (status === 'in_progress' || status === 'on_site') {
      updates.started_at = new Date().toISOString()
    }
    if (status === 'completed') {
      updates.completed_at = new Date().toISOString()
    }

    return this.update(id, updates)
  },

  async getStats(assignedTo?: string) {
    const db = getServiceDb()
    let query = db
      .from('work_orders')
      .select('status', { count: 'exact' })

    if (assignedTo) query = query.eq('assigned_to', assignedTo)

    const statuses: WorkOrderStatus[] = ['open', 'assigned', 'in_transit', 'on_site', 'in_progress', 'pending_parts', 'completed']
    const stats: Record<string, number> = {}

    for (const status of statuses) {
      let q = db.from('work_orders').select('*', { count: 'exact', head: true }).eq('status', status)
      if (assignedTo) q = q.eq('assigned_to', assignedTo)
      const { count } = await q
      stats[status] = count || 0
    }

    return stats
  },
}

// ============================================================
// ALARMS
// ============================================================

export const alarmService = {
  async list(filters?: {
    parkId?: string
    status?: AlarmStatus | AlarmStatus[]
    severity?: string
    limit?: number
  }) {
    const db = getServiceDb()
    let query = db
      .from('alarms')
      .select('*, park:service_parks(*)')
      .order('created_at', { ascending: false })

    if (filters?.parkId) query = query.eq('park_id', filters.parkId)
    if (filters?.severity) query = query.eq('severity', filters.severity)
    if (filters?.limit) query = query.limit(filters.limit)

    if (filters?.status) {
      if (Array.isArray(filters.status)) {
        query = query.in('status', filters.status)
      } else {
        query = query.eq('status', filters.status)
      }
    }

    const { data, error } = await query
    if (error) throw error
    return data as Alarm[]
  },

  async create(alarm: Partial<Alarm>) {
    const db = getServiceDb()
    const { data, error } = await db
      .from('alarms')
      .insert(alarm)
      .select()
      .single()

    if (error) throw error
    return data as Alarm
  },

  async acknowledge(id: string, userId: string) {
    const db = getServiceDb()
    const { data, error } = await db
      .from('alarms')
      .update({
        status: 'acknowledged',
        acknowledged_by: userId,
        acknowledged_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Alarm
  },

  async resolve(id: string) {
    const db = getServiceDb()
    const { data, error } = await db
      .from('alarms')
      .update({
        status: 'resolved',
        resolved_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Alarm
  },

  async getActiveCount(parkIds?: string[]) {
    const db = getServiceDb()
    let query = db
      .from('alarms')
      .select('*', { count: 'exact', head: true })
      .in('status', ['active', 'acknowledged'])

    if (parkIds) query = query.in('park_id', parkIds)

    const { count } = await query
    return count || 0
  },
}

// ============================================================
// PARKS
// ============================================================

export const parkService = {
  async list(filters?: { clientGroup?: string; parkType?: string }) {
    const db = getServiceDb()
    let query = db.from('service_parks').select('*').order('project_id')

    if (filters?.clientGroup) query = query.eq('client_group', filters.clientGroup)
    if (filters?.parkType) query = query.eq('park_type', filters.parkType)

    const { data, error } = await query
    if (error) throw error
    return data as ServicePark[]
  },

  async getById(id: string) {
    const db = getServiceDb()
    const { data, error } = await db
      .from('service_parks')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as ServicePark
  },
}

// ============================================================
// USERS
// ============================================================

export const userService = {
  async list(role?: string) {
    const db = getServiceDb()
    let query = db
      .from('service_users')
      .select('id, email, name, role, phone, is_active, current_lat, current_lng, location_updated_at, client_group, created_at')
      .eq('is_active', true)
      .order('name')

    if (role) query = query.eq('role', role)

    const { data, error } = await query
    if (error) throw error
    return data as ServiceUser[]
  },

  async updateLocation(userId: string, lat: number, lng: number) {
    const db = getServiceDb()
    const { error } = await db
      .from('service_users')
      .update({
        current_lat: lat,
        current_lng: lng,
        location_updated_at: new Date().toISOString(),
      })
      .eq('id', userId)

    if (error) throw error
  },
}

// ============================================================
// LOCATION HISTORY
// ============================================================

export const locationService = {
  async record(point: Omit<LocationPoint, 'id' | 'recorded_at'>) {
    const db = getServiceDb()
    const { error } = await db.from('location_history').insert(point)
    if (error) throw error

    await userService.updateLocation(point.user_id, point.lat, point.lng)
  },

  async getRoute(userId: string, from: string, to: string) {
    const db = getServiceDb()
    const { data, error } = await db
      .from('location_history')
      .select('*')
      .eq('user_id', userId)
      .gte('recorded_at', from)
      .lte('recorded_at', to)
      .order('recorded_at')

    if (error) throw error
    return data as LocationPoint[]
  },
}

// ============================================================
// INVENTORY
// ============================================================

export const inventoryService = {
  async listItems(filters?: { category?: string; lowStockOnly?: boolean }) {
    const db = getServiceDb()
    let query = db.from('inventory_items').select('*').order('name')

    if (filters?.category) query = query.eq('category', filters.category)
    if (filters?.lowStockOnly) query = query.lte('current_stock', db.rpc as any) // handled below

    const { data, error } = await query
    if (error) throw error

    let items = data as InventoryItem[]
    if (filters?.lowStockOnly) {
      items = items.filter(i => i.current_stock <= i.reorder_point)
    }

    return items
  },

  async checkout(itemId: string, quantity: number, userId: string, workOrderId?: string) {
    const db = getServiceDb()
    const { data, error } = await db
      .from('inventory_transactions')
      .insert({
        item_id: itemId,
        user_id: userId,
        work_order_id: workOrderId,
        type: 'checkout',
        quantity,
        scanned_qr: true,
      })
      .select()
      .single()

    if (error) throw error
    return data as InventoryTransaction
  },

  async getAlerts(status?: string) {
    const db = getServiceDb()
    let query = db
      .from('reorder_alerts')
      .select('*, item:inventory_items(*)')
      .order('notified_at', { ascending: false })

    if (status) query = query.eq('status', status)

    const { data, error } = await query
    if (error) throw error
    return data as ReorderAlert[]
  },
}

// ============================================================
// PHOTOS
// ============================================================

export const photoService = {
  async upload(photo: Omit<ServicePhoto, 'id' | 'uploaded_at'>) {
    const db = getServiceDb()
    const { data, error } = await db
      .from('service_photos')
      .insert(photo)
      .select()
      .single()

    if (error) throw error
    return data as ServicePhoto
  },

  async listByWorkOrder(workOrderId: string) {
    const db = getServiceDb()
    const { data, error } = await db
      .from('service_photos')
      .select('*')
      .eq('work_order_id', workOrderId)
      .order('uploaded_at')

    if (error) throw error
    return data as ServicePhoto[]
  },
}
