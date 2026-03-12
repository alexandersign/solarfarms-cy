export type UserRole = 'serviceman' | 'manager' | 'client'

export type ParkType = 'bess' | 'pv'

export type LTSATier = 'A' | 'B' | 'C' | 'D'

export type WorkOrderType =
  | 'preventive'
  | 'corrective'
  | 'inspection'
  | 'commissioning'
  | 'warranty_claim'
  | 'emergency'

export type WorkOrderStatus =
  | 'open'
  | 'assigned'
  | 'in_transit'
  | 'on_site'
  | 'in_progress'
  | 'pending_parts'
  | 'completed'
  | 'cancelled'

export type WorkOrderPriority = 'critical' | 'major' | 'minor' | 'routine'

export type AlarmSeverity = 'critical' | 'major' | 'minor' | 'informational'

export type AlarmSource = 'voltus' | 'manual' | 'system'

export type AlarmStatus = 'active' | 'acknowledged' | 'work_order_created' | 'resolved'

export type PhotoCategory =
  | 'defect'
  | 'before'
  | 'after'
  | 'thermal'
  | 'serial_number'
  | 'general'
  | 'warranty_evidence'

export type InventoryCategory =
  | 'bms'
  | 'cooling'
  | 'electrical'
  | 'pcs'
  | 'sensors'
  | 'communications'
  | 'consumables'
  | 'pv_panels'
  | 'pv_inverters'
  | 'pv_electrical'
  | 'other'

export type TransactionType = 'checkout' | 'checkin' | 'restock' | 'adjustment' | 'damaged'

export interface ServiceUser {
  id: string
  email: string
  name: string
  role: UserRole
  phone?: string
  avatar_url?: string
  is_active: boolean
  tablet_device_id?: string
  current_lat?: number
  current_lng?: number
  location_updated_at?: string
  client_group?: string
  created_at: string
  updated_at: string
}

export interface ServicePark {
  id: string
  project_id: string
  park_type: ParkType
  client_group: string
  site_name: string
  site_address?: string
  district?: string
  lat?: number
  lng?: number
  capacity_mw?: number
  capacity_mwh?: number
  container_count?: number
  commissioning_date?: string
  warranty_expiry?: string
  ltsa_tier?: LTSATier
  voltus_site_id?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface WorkOrder {
  id: string
  wo_number: string
  park_id: string
  assigned_to?: string
  created_by?: string
  type: WorkOrderType
  priority: WorkOrderPriority
  status: WorkOrderStatus
  title: string
  description?: string
  checklist_template_id?: string
  scheduled_date?: string
  eta_minutes?: number
  started_at?: string
  completed_at?: string
  alarm_id?: string
  notes?: string
  created_at: string
  updated_at: string
  // Joined data
  park?: ServicePark
  assignee?: ServiceUser
  creator?: ServiceUser
  photos?: ServicePhoto[]
  checklist?: ChecklistSubmission
}

export interface Alarm {
  id: string
  park_id: string
  source: AlarmSource
  voltus_alarm_id?: string
  severity: AlarmSeverity
  status: AlarmStatus
  title: string
  description?: string
  alarm_code?: string
  component?: string
  work_order_id?: string
  acknowledged_by?: string
  acknowledged_at?: string
  resolved_at?: string
  raw_data?: Record<string, unknown>
  created_at: string
  updated_at: string
  park?: ServicePark
}

export interface ChecklistSubmission {
  id: string
  work_order_id: string
  template_id: string
  submitted_by?: string
  data: Record<string, unknown>
  result?: 'pass' | 'fail' | 'partial'
  notes?: string
  submitted_at: string
}

export interface ServicePhoto {
  id: string
  work_order_id: string
  checklist_submission_id?: string
  uploaded_by?: string
  storage_path: string
  thumbnail_path?: string
  caption?: string
  category?: PhotoCategory
  lat?: number
  lng?: number
  uploaded_at: string
}

export interface LocationPoint {
  id: string
  user_id: string
  lat: number
  lng: number
  accuracy?: number
  speed?: number
  heading?: number
  work_order_id?: string
  recorded_at: string
}

export interface InventoryItem {
  id: string
  sku: string
  qr_code: string
  name: string
  category: InventoryCategory
  description?: string
  unit: string
  current_stock: number
  min_stock: number
  reorder_point: number
  reorder_qty?: number
  lead_time_days?: number
  unit_cost?: number
  supplier?: string
  oem_part_number?: string
  compatible_with?: string[]
  location_in_warehouse?: string
  created_at: string
  updated_at: string
}

export interface InventoryTransaction {
  id: string
  item_id: string
  user_id?: string
  work_order_id?: string
  type: TransactionType
  quantity: number
  notes?: string
  scanned_qr: boolean
  created_at: string
  item?: InventoryItem
}

export interface ReorderAlert {
  id: string
  item_id: string
  alert_type: 'low_stock' | 'reorder_triggered' | 'out_of_stock'
  current_stock: number
  threshold: number
  status: 'open' | 'ordered' | 'received' | 'dismissed'
  notified_at: string
  resolved_at?: string
  item?: InventoryItem
}

export const PRIORITY_CONFIG: Record<WorkOrderPriority, { label: string; color: string; bgColor: string }> = {
  critical: { label: 'Critical', color: 'text-red-700', bgColor: 'bg-red-100' },
  major: { label: 'Major', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  minor: { label: 'Minor', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  routine: { label: 'Routine', color: 'text-blue-700', bgColor: 'bg-blue-100' },
}

export const STATUS_CONFIG: Record<WorkOrderStatus, { label: string; color: string; bgColor: string }> = {
  open: { label: 'Open', color: 'text-gray-700', bgColor: 'bg-gray-100' },
  assigned: { label: 'Assigned', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  in_transit: { label: 'In Transit', color: 'text-purple-700', bgColor: 'bg-purple-100' },
  on_site: { label: 'On Site', color: 'text-indigo-700', bgColor: 'bg-indigo-100' },
  in_progress: { label: 'In Progress', color: 'text-cyan-700', bgColor: 'bg-cyan-100' },
  pending_parts: { label: 'Pending Parts', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  completed: { label: 'Completed', color: 'text-green-700', bgColor: 'bg-green-100' },
  cancelled: { label: 'Cancelled', color: 'text-red-700', bgColor: 'bg-red-100' },
}

export const SEVERITY_CONFIG: Record<AlarmSeverity, { label: string; color: string; bgColor: string; response: string }> = {
  critical: { label: 'Critical', color: 'text-red-700', bgColor: 'bg-red-100', response: 'Phone + Email within 30 min' },
  major: { label: 'Major', color: 'text-orange-700', bgColor: 'bg-orange-100', response: 'Email within 2 hours' },
  minor: { label: 'Minor', color: 'text-yellow-700', bgColor: 'bg-yellow-100', response: 'Next scheduled report' },
  informational: { label: 'Info', color: 'text-blue-700', bgColor: 'bg-blue-100', response: 'No immediate response' },
}
