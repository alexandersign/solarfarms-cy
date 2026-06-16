/**
 * Allowlisted CRM knowledge-base HTML documents.
 * Paths relative to project root — served only via /api/crm/kb/document.
 */

export const CRM_KB_DOCUMENTS: Record<
  string,
  { path: string; title: string; client: string; date: string; type: string }
> = {
  'bess-commercial-summary': {
    path: 'docs/clients/lighthief-bess-epc-ltsa-commercial-summary-may2026.html',
    title: 'BESS EPC & LTSA — Commercial Summary',
    client: 'All clients',
    date: 'May 2026',
    type: 'Commercial summary',
  },
  'spanercom-presentation': {
    path: 'docs/clients/Individual_Spanercom/client-presentation-mar2026.html',
    title: 'Spanercom — BESS Client Presentation',
    client: 'Spanercom',
    date: 'Mar 2026',
    type: 'Presentation',
  },
  'spanercom-offer-5x20': {
    path: 'docs/clients/Individual_Spanercom/offer-anarita-2x5-20-muminjon-mar2026.html',
    title: 'Spanercom Anarita — 2×5 MW / 20 MWh BESS Offer',
    client: 'Spanercom',
    date: 'Mar 2026',
    type: 'BESS EPC offer',
  },
  'spanercom-offer-5x20-compact': {
    path: 'docs/clients/Individual_Spanercom/offer-anarita-2x5-20-compact-mar2026.html',
    title: 'Spanercom Anarita — Compact BESS Offer',
    client: 'Spanercom',
    date: 'Mar 2026',
    type: 'BESS EPC offer',
  },
  'spanercom-offer-10mw': {
    path: 'docs/clients/Individual_Spanercom/offer-anarita-10mw-muminjon-mar2026.html',
    title: 'Spanercom Anarita — 10 MW BESS Offer',
    client: 'Spanercom',
    date: 'Mar 2026',
    type: 'BESS EPC offer',
  },
  'spanercom-spec-sheets': {
    path: 'docs/clients/Individual_Spanercom/equipment-spec-sheets.html',
    title: 'Spanercom — Equipment Spec Sheets',
    client: 'Spanercom',
    date: 'Mar 2026',
    type: 'Specs',
  },
  'spanercom-bess-rfi-civil': {
    path: 'docs/clients/Individual_Spanercom/rfi-spanercom-anarita-bess-civil-mar2026.html',
    title: 'Spanercom — BESS Civil RFI',
    client: 'Spanercom',
    date: 'Mar 2026',
    type: 'RFI',
  },
  'pv-om-team-profile': {
    path: 'pv-om/team-profile-pv-om-may2026.html',
    title: 'PV O&M — Team Capability Profile',
    client: 'Internal / client-facing',
    date: 'May 2026',
    type: 'PV O&M profile',
  },
  'aristoklia-commercial': {
    path: 'docs/clients/Individual_Aristoklia_Solar/commercial-offer-mar2026.html',
    title: 'Aristoklia Solar — Commercial Offer',
    client: 'Aristoklia Solar',
    date: 'Mar 2026',
    type: 'Commercial',
  },
}

export const CRM_KB_OFFERS_INDEX = Object.entries(CRM_KB_DOCUMENTS).map(([slug, doc]) => ({
  slug,
  ...doc,
}))
