import { supabase } from './supabase'

// ───────────────────────────────── Types ─────────────────────────────────

export type RfiDirection = 'outbound' | 'inbound'
export type RfiType = 'RFI' | 'RFP' | 'RFQ' | 'RFC' | 'NDA' | 'OTHER'
export type RfiStatus =
  | 'draft'
  | 'sent'
  | 'awaiting_response'
  | 'partial_response'
  | 'complete'
  | 'overdue'
  | 'cancelled'
export type RfiPriority = 'critical' | 'high' | 'medium' | 'low'

export interface RfiItem {
  id?: string
  created_at?: string
  updated_at?: string
  // Core
  reference: string        // e.g. LCY-RFI-001
  type: RfiType
  direction: RfiDirection
  subject: string
  description?: string
  // Parties
  from_company: string
  from_contact?: string
  from_email?: string
  to_company: string
  to_contact?: string
  to_email?: string
  // Dates
  date_sent?: string       // ISO date
  date_due?: string        // ISO date
  date_responded?: string  // ISO date
  // Status
  status: RfiStatus
  priority: RfiPriority
  // Content
  category?: string        // e.g. Technical, Commercial, Legal, MV Equipment
  items_count?: number
  items_resolved?: number
  // Response tracking
  response_summary?: string
  // File references
  file_ref?: string        // path to local file
  // Email tracking
  email_sent?: boolean
  email_message_id?: string
  // Tags
  tags?: string[]
  notes?: string
}

export interface RfiCorrespondence {
  id?: string
  created_at?: string
  rfi_id: string
  direction: 'sent' | 'received'
  date: string
  from_email: string
  to_email: string
  subject: string
  body_preview?: string
  email_message_id?: string
  attachments?: string[]
}

// ────────────────────────────── Service ──────────────────────────────────

export const rfiService = {
  // ── List all RFIs ──
  async getAll(): Promise<RfiItem[]> {
    const { data, error } = await supabase
      .from('rfi_tracker')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // ── Get single RFI ──
  async getById(id: string): Promise<RfiItem | null> {
    const { data, error } = await supabase
      .from('rfi_tracker')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // ── Create RFI ──
  async create(item: Omit<RfiItem, 'id' | 'created_at' | 'updated_at'>): Promise<RfiItem> {
    const { data, error } = await supabase
      .from('rfi_tracker')
      .insert({ ...item, updated_at: new Date().toISOString() })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // ── Update RFI ──
  async update(id: string, updates: Partial<RfiItem>): Promise<RfiItem> {
    const { data, error } = await supabase
      .from('rfi_tracker')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // ── Delete RFI ──
  async remove(id: string): Promise<void> {
    const { error } = await supabase
      .from('rfi_tracker')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // ── Get correspondence for an RFI ──
  async getCorrespondence(rfiId: string): Promise<RfiCorrespondence[]> {
    const { data, error } = await supabase
      .from('rfi_correspondence')
      .select('*')
      .eq('rfi_id', rfiId)
      .order('date', { ascending: false })

    if (error) throw error
    return data || []
  },

  // ── Add correspondence ──
  async addCorrespondence(item: Omit<RfiCorrespondence, 'id' | 'created_at'>): Promise<RfiCorrespondence> {
    const { data, error } = await supabase
      .from('rfi_correspondence')
      .insert(item)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // ── Stats ──
  async getStats() {
    const all = await this.getAll()
    const now = new Date()
    const overdue = all.filter(r => {
      if (!r.date_due || r.status === 'complete' || r.status === 'cancelled') return false
      return new Date(r.date_due) < now
    })

    return {
      total: all.length,
      sent: all.filter(r => r.direction === 'outbound').length,
      received: all.filter(r => r.direction === 'inbound').length,
      awaiting: all.filter(r => r.status === 'awaiting_response' || r.status === 'sent').length,
      overdue: overdue.length,
      complete: all.filter(r => r.status === 'complete').length,
      byType: {
        RFI: all.filter(r => r.type === 'RFI').length,
        RFP: all.filter(r => r.type === 'RFP').length,
        RFQ: all.filter(r => r.type === 'RFQ').length,
        RFC: all.filter(r => r.type === 'RFC').length,
      },
      byPriority: {
        critical: all.filter(r => r.priority === 'critical').length,
        high: all.filter(r => r.priority === 'high').length,
        medium: all.filter(r => r.priority === 'medium').length,
        low: all.filter(r => r.priority === 'low').length,
      },
    }
  },

  // ── Generate next reference number ──
  async nextReference(type: RfiType = 'RFI'): Promise<string> {
    const all = await this.getAll()
    const prefix = `LCY-${type}`
    const existing = all.filter(r => r.reference.startsWith(prefix))
    const nextNum = existing.length + 1
    return `${prefix}-${String(nextNum).padStart(3, '0')}`
  },
}

// ────────────────────────── Seed / Initial Data ─────────────────────────

export const SEED_DATA: Omit<RfiItem, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    reference: 'LCY-RFI-001',
    type: 'RFI',
    direction: 'outbound',
    subject: 'Final RFI — Outstanding Technical Documents',
    description: 'Comprehensive RFI covering EN 50549-2 cert, LVRT/HVRT, frequency response curves, IEC-104 point list, MV component brands, and documentation.',
    from_company: 'Lighthief Cyprus',
    from_contact: 'Alex Papacosta',
    from_email: 'alexander.papacosta@lighthief.com',
    to_company: 'Linyang Energy',
    to_contact: 'Kamil',
    to_email: '',
    date_sent: '2026-01-25',
    date_due: '2026-02-08',
    date_responded: '2026-01-30',
    status: 'partial_response',
    priority: 'critical',
    category: 'Technical',
    items_count: 12,
    items_resolved: 9,
    response_summary: 'Kehua catalogues + drawings received. LVRT/HVRT, frequency curves, IEC-104 point list still pending.',
    file_ref: 'docs/internal/rfi/rfi-linyang-final-feb2026.md',
    tags: ['linyang', 'kehua', 'technical', 'certifications'],
    email_sent: true,
  },
  {
    reference: 'LCY-RFI-002',
    type: 'RFI',
    direction: 'outbound',
    subject: 'MV Equipment Brands & Lead Times',
    description: 'Request for MV transformer brand, switchgear type (SF6 vs air), protection relay model, and lead time confirmation.',
    from_company: 'Lighthief Cyprus',
    from_contact: 'Alex Papacosta',
    from_email: 'alexander.papacosta@lighthief.com',
    to_company: 'Linyang Energy',
    to_contact: 'Kamil',
    to_email: '',
    date_sent: '2026-01-30',
    date_due: '2026-02-05',
    status: 'overdue',
    priority: 'high',
    category: 'MV Equipment',
    items_count: 6,
    items_resolved: 1,
    response_summary: 'RMU confirmed as Schneider (Kamil, 27 Jan). Others pending.',
    file_ref: 'docs/internal/rfi/rfi-linyang-final-feb2026.md',
    tags: ['linyang', 'mv-equipment', 'switchgear', 'transformer'],
    email_sent: true,
  },
  {
    reference: 'LCY-RFI-003',
    type: 'RFI',
    direction: 'outbound',
    subject: 'Spares List & LTSA Pricing',
    description: 'Request for critical spares list (7 days), complete spares list (14 days), FOB/CIF pricing, and EU consignment stock option.',
    from_company: 'Lighthief Cyprus',
    from_contact: 'Alex Papacosta',
    from_email: 'alexander.papacosta@lighthief.com',
    to_company: 'Linyang Energy + Kehua',
    to_contact: 'Kamil',
    to_email: '',
    date_sent: '2026-01-31',
    date_due: '2026-02-14',
    status: 'awaiting_response',
    priority: 'medium',
    category: 'Spares & LTSA',
    items_count: 5,
    items_resolved: 1,
    response_summary: 'LTSA rates defined. Spares lists pending.',
    file_ref: 'docs/internal/rfi/rfi-spares-list-jan2026.md',
    tags: ['linyang', 'kehua', 'spares', 'ltsa', 'maintenance'],
    email_sent: true,
  },
  {
    reference: 'LCY-RFI-004',
    type: 'RFI',
    direction: 'outbound',
    subject: 'Voltus EMS — Updated Group Structure & Pricing',
    description: 'RFI to Voltus for updated pricing based on new 3-group client structure (Abio, Esperia, Timotheos), WAGO BoM confirmation, Lighthief ordering responsibilities.',
    from_company: 'Lighthief Cyprus',
    from_contact: 'Alex Papacosta',
    from_email: 'alexander.papacosta@lighthief.com',
    to_company: 'Voltus Energy',
    to_contact: '',
    to_email: '',
    date_sent: '2026-02-10',
    date_due: '2026-02-17',
    status: 'sent',
    priority: 'high',
    category: 'EMS/SCADA',
    items_count: 8,
    items_resolved: 0,
    file_ref: 'docs/internal/rfi/rfi-voltus-ems-update-feb2026.html',
    tags: ['voltus', 'ems', 'scada', 'wago', 'pricing'],
    email_sent: false,
  },
  {
    reference: 'LCY-RFI-005',
    type: 'RFI',
    direction: 'outbound',
    subject: 'Legal Guarantees — APG, Performance Bond, SOH Remedy',
    description: 'Request for Advance Payment Guarantee (bank guarantee), performance bond format, performance retention terms, and SOH remedy cap improvement.',
    from_company: 'Lighthief Cyprus',
    from_contact: 'Alex Papacosta',
    from_email: 'alexander.papacosta@lighthief.com',
    to_company: 'Linyang Energy',
    to_contact: '',
    to_email: '',
    date_sent: '2026-01-25',
    date_due: '2026-02-03',
    status: 'overdue',
    priority: 'critical',
    category: 'Commercial',
    items_count: 8,
    items_resolved: 2,
    response_summary: 'Delay LDs confirmed at 0.1-0.2%/day, 10% cap. Payment terms and APG still pending.',
    file_ref: 'docs/internal/rfi/rfi-legal-guarantees-linyang-feb2026.html',
    tags: ['linyang', 'legal', 'commercial', 'guarantees', 'payment'],
    email_sent: true,
  },
  {
    reference: 'LCY-RFC-001',
    type: 'RFC',
    direction: 'inbound',
    subject: 'PCS Catalogues & Technical Drawings',
    description: 'Received Kehua PCS catalogues, 5MW SLD at 33kV, container layout, and 2.5MW foundation drawings.',
    from_company: 'Kehua (via Linyang)',
    from_contact: '',
    from_email: '',
    to_company: 'Lighthief Cyprus',
    to_contact: 'Alex Papacosta',
    to_email: 'alexander.papacosta@lighthief.com',
    date_sent: '2026-01-30',
    date_responded: '2026-01-30',
    status: 'complete',
    priority: 'medium',
    category: 'Technical',
    items_count: 8,
    items_resolved: 8,
    response_summary: '8 files received and added to internal portal.',
    tags: ['kehua', 'pcs', 'drawings', 'sld'],
    email_sent: false,
  },
  {
    reference: 'LCY-RFC-002',
    type: 'RFC',
    direction: 'inbound',
    subject: 'DSO Compliance Package — EN 50549-2, LVD, CB, IEC 62933',
    description: '19 documents received covering TÜV EN 50549-2 cert + 447p test report, LVD, EMC, CB scheme, IEC 62933-5-2 (pending), UL 9540A, UN38.3.',
    from_company: 'Linyang Energy / Kehua',
    from_contact: '',
    from_email: '',
    to_company: 'Lighthief Cyprus',
    to_contact: 'Alex Papacosta',
    to_email: 'alexander.papacosta@lighthief.com',
    date_sent: '2025-12-09',
    date_responded: '2026-02-10',
    status: 'partial_response',
    priority: 'critical',
    category: 'Technical',
    items_count: 19,
    items_resolved: 16,
    response_summary: 'EN 50549-2 TÜV cert + full test report confirmed. IEC 62933-5-2 cert still pending from TÜV SÜD (testing done June 2025). UL 9540A module-level report incomplete.',
    file_ref: 'legal/linyang_hardware_specs_docs/EAC Complience/Re_RFI - DSO Compliance_____20251209',
    tags: ['en-50549-2', 'dso', 'grid-code', 'tuv', 'compliance'],
    email_sent: false,
  },
]
