// ═══════════════════════════════════════════════════════════════
// VENDOR CONTACT REGISTRY
// Central registry of all vendor/supplier contacts for the
// Cyprus BESS project. Used by the procurement dashboard to
// auto-populate recipients when sending RFI/RFP documents.
// ═══════════════════════════════════════════════════════════════

export type VendorCategory =
  | 'oem'
  | 'logistics'
  | 'electrical'
  | 'civil'
  | 'insurance'
  | 'ems_scada'
  | 'lightning_protection'
  | 'consulting'

export interface VendorContact {
  id: string
  company: string
  category: VendorCategory
  contacts: {
    name: string
    role?: string
    email: string
    phone?: string
    primary?: boolean
  }[]
  address?: string
  website?: string
  notes?: string
  documents: string[]
}

export const VENDORS: VendorContact[] = [
  {
    id: 'linyang',
    company: 'Linyang Energy Storage Technology',
    category: 'oem',
    contacts: [
      { name: 'Kamil Tyburski', role: 'Project Coordinator', email: '', phone: '', primary: true },
      { name: 'Klaudia', role: 'Solarfun / RFI Contact', email: '', primary: false },
    ],
    address: 'F17, Building D1, No. 2 Mudanjiang Street, Jianye District, Nanjing, Jiangsu 210004, China',
    notes: 'OEM manufacturer. All technical RFIs go through Kamil. Fill in emails before first use.',
    documents: [
      'docs/internal/rfi/rfi-linyang-final-feb2026.html',
      'docs/internal/rfi/rfi-legal-guarantees-linyang-feb2026.html',
      'docs/internal/rfi/rfi-epc-scope-responsibility-feb2026.html',
      'docs/internal/rfi/rfi-spares-list-jan2026.md',
    ],
  },
  {
    id: 'voltus',
    company: 'Voltus Energy',
    category: 'ems_scada',
    contacts: [
      { name: 'A. Lechowicz', role: 'Sales', email: 'a.lechowicz@voltusenergy.pl', phone: '+48 696 043 508', primary: true },
    ],
    address: 'ul. Zielona 15, 47-320 Gogolin, Poland',
    documents: [
      'docs/internal/rfi/rfi-voltus-ems-update-feb2026.html',
      'docs/internal/rfi/rfi-voltus-bms-ems-monitoring-feb2026.html',
      'docs/internal/rfi/rfi-voltus-scada-curtailment-signals-feb2026.html',
      'docs/internal/rfp/rfp-scada-ems-jan2026.html',
    ],
  },
  {
    id: 'asoulis',
    company: 'A. Soulis Crane & Transport',
    category: 'logistics',
    contacts: [
      { name: 'Stephanos Soulis', role: 'General Manager', email: 'stephanos@souliscranes.com', phone: '+357 99 522 736', primary: true },
    ],
    address: 'Cyprus',
    website: 'www.soulis-cranes.com.cy',
    documents: [
      'docs/quotations/asoulis/rfq-transport-asoulis-jan2026.html',
    ],
  },
  {
    id: 'interfreight',
    company: 'Interfreight Logistics',
    category: 'logistics',
    contacts: [
      { name: 'Vasilis N. Markides', role: 'Director', email: 'markides@interfreightlogistics.com', phone: '+357 99 464 613', primary: true },
    ],
    address: '37 Galileou Str., Limassol, CY 3015, Cyprus',
    website: 'www.interfreightlogistics.com',
    documents: [
      'docs/quotations/interfreight/logistics-quote-interfreight-jan2026.md',
    ],
  },
  {
    id: 'dehn',
    company: 'DEHN Cyprus / StrikeRA',
    category: 'lightning_protection',
    contacts: [
      { name: 'DEHN Representative', role: 'Sales', email: '', phone: '', primary: true },
    ],
    notes: 'Lightning protection SPD/LPS supplier. Fill in email before first use.',
    documents: [
      'docs/quotations/dehn/rfq-dehn-lightning-protection-jan2026.md',
      'docs/internal/rfp/rfp-earthing-grounding-jan2026.html',
      'docs/internal/rfp/rfp-protection-testing-jan2026.html',
    ],
  },
  {
    id: 'marsh',
    company: 'Marsh Specialty',
    category: 'insurance',
    contacts: [
      { name: 'Jan-Willem Hoogenboezem', role: 'Europe', email: 'jan-willem.hoogenboezem@marsh.com', phone: '+31 6 211 30 976', primary: true },
      { name: 'Jack Wieland', role: 'UK', email: 'jack.wieland@marsh.com', phone: '+44 739 2123 548' },
      { name: 'Robert Hale', role: 'UK', email: 'robert.hale@marsh.com', phone: '+44 738 8488 395' },
    ],
    documents: [
      'docs/internal/rfp/rfp-insurance-marsh-bess-project-feb2026.html',
      'docs/internal/rfp/rfp-insurance-comprehensive-feb2026.html',
      'docs/internal/rfp/rfp-insurance-car-timeline-feb2026.html',
    ],
  },
  {
    id: 'inteso',
    company: 'Inteso Engineering',
    category: 'consulting',
    contacts: [
      { name: 'Inteso Contact', role: 'Electrical Design', email: '', phone: '', primary: true },
    ],
    notes: 'Electrical design and CT consultation. Fill in email before first use.',
    documents: [
      'docs/internal/rfp/rfp-electrical-design-ct-consultation-inteso-feb2026.html',
    ],
  },
  {
    id: 'ectl',
    company: 'ECTL (Eurogate Container Terminal Limassol)',
    category: 'logistics',
    contacts: [
      { name: 'ECTL Port Operations', role: 'Port Landing', email: '', phone: '', primary: true },
    ],
    notes: 'Port landing and container handling. Fill in email before first use.',
    documents: [],
  },
]

export function getVendorById(id: string): VendorContact | undefined {
  return VENDORS.find(v => v.id === id)
}

export function getVendorsByCategory(category: VendorCategory): VendorContact[] {
  return VENDORS.filter(v => v.category === category)
}

export function getPrimaryContact(vendor: VendorContact) {
  return vendor.contacts.find(c => c.primary) || vendor.contacts[0]
}

export const SENDABLE_DOCUMENTS: { path: string; label: string; type: 'RFI' | 'RFP' | 'RFQ'; vendor?: string }[] = [
  // RFIs - Linyang
  { path: 'docs/internal/rfi/rfi-linyang-final-feb2026.html', label: 'Final RFI — Linyang (Feb 2026)', type: 'RFI', vendor: 'linyang' },
  { path: 'docs/internal/rfi/rfi-legal-guarantees-linyang-feb2026.html', label: 'Legal Guarantees RFI — Linyang', type: 'RFI', vendor: 'linyang' },
  { path: 'docs/internal/rfi/rfi-epc-scope-responsibility-feb2026.html', label: 'EPC Scope Responsibility RFI', type: 'RFI', vendor: 'linyang' },

  // RFIs - Voltus
  { path: 'docs/internal/rfi/rfi-voltus-ems-update-feb2026.html', label: 'EMS/SCADA Update RFI — Voltus', type: 'RFI', vendor: 'voltus' },
  { path: 'docs/internal/rfi/rfi-voltus-bms-ems-monitoring-feb2026.html', label: 'BMS/EMS Monitoring RFI — Voltus', type: 'RFI', vendor: 'voltus' },
  { path: 'docs/internal/rfi/rfi-voltus-scada-curtailment-signals-feb2026.html', label: 'SCADA Curtailment Signals RFI — Voltus', type: 'RFI', vendor: 'voltus' },

  // RFIs - General
  { path: 'docs/internal/rfi/rfi-ems-provider-feb2026.html', label: 'EMS Provider RFI (General)', type: 'RFI' },

  // RFPs
  { path: 'docs/internal/rfp/rfp-scada-ems-jan2026.html', label: 'SCADA/EMS RFP', type: 'RFP', vendor: 'voltus' },
  { path: 'docs/internal/rfp/rfp-insurance-marsh-bess-project-feb2026.html', label: 'Insurance RFP — Marsh', type: 'RFP', vendor: 'marsh' },
  { path: 'docs/internal/rfp/rfp-insurance-comprehensive-feb2026.html', label: 'Comprehensive Insurance RFP', type: 'RFP', vendor: 'marsh' },
  { path: 'docs/internal/rfp/rfp-insurance-car-timeline-feb2026.html', label: 'CAR Insurance Timeline RFP', type: 'RFP', vendor: 'marsh' },
  { path: 'docs/internal/rfp/rfp-electrical-design-ct-consultation-inteso-feb2026.html', label: 'Electrical Design CT Consultation — Inteso', type: 'RFP', vendor: 'inteso' },
  { path: 'docs/internal/rfp/rfp-civil-concrete-base-jan2026.html', label: 'Civil Works / Concrete Base RFP', type: 'RFP' },
  { path: 'docs/internal/rfp/rfp-electrical-installation-jan2026.html', label: 'MV/LV Electrical Installation RFP', type: 'RFP' },
  { path: 'docs/internal/rfp/rfp-earthing-grounding-jan2026.html', label: 'Earthing & Grounding RFP', type: 'RFP', vendor: 'dehn' },
  { path: 'docs/internal/rfp/rfp-protection-testing-jan2026.html', label: 'Protection Relay Testing RFP', type: 'RFP' },
  { path: 'docs/internal/rfp/rfp-remote-trip-ups-jan2026.html', label: 'Remote Trip & UPS RFP', type: 'RFP' },
  { path: 'docs/internal/rfp/rfp-cybersecurity-nis2-jan2026.html', label: 'Cybersecurity NIS2 RFP', type: 'RFP' },

  // RFQs
  { path: 'docs/quotations/asoulis/rfq-transport-asoulis-jan2026.html', label: 'Transport RFQ — A. Soulis', type: 'RFQ', vendor: 'asoulis' },
]
