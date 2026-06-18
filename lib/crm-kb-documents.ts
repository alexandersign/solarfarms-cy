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

  // ─── Aeolian Dynamics ────────────────────────────────────────────────────
  'aeolian-final-offer': {
    path: 'docs/clients/Individual_Aeolian_Dynamics_Larnaca/bess-aeolian-dynamics-final-offer-6.5mw-20mwh-24mar2026.html',
    title: 'Aeolian Dynamics — Final BESS Offer 6.5 MW / 20 MWh',
    client: 'TP Aeolian Dynamics',
    date: 'Mar 2026',
    type: 'BESS EPC offer',
  },
  'aeolian-presentation': {
    path: 'docs/clients/Individual_Aeolian_Dynamics_Larnaca/client-presentation-mar2026.html',
    title: 'Aeolian Dynamics — BESS Client Presentation',
    client: 'TP Aeolian Dynamics',
    date: 'Mar 2026',
    type: 'Presentation',
  },

  // ─── Christos Nicosia ────────────────────────────────────────────────────
  'christos-nicosia-proposal': {
    path: 'docs/clients/Individual_Christos_Nicosia/bess-christos-3.3mw-nicosia-proposal-feb2026.html',
    title: 'Christos Nicosia — BESS Proposal 3.3 MWp / 10 MWh',
    client: 'Christos Nicosia',
    date: 'Feb 2026',
    type: 'BESS EPC offer',
  },
  'christos-nicosia-presentation': {
    path: 'docs/clients/Individual_Christos_Nicosia/client-presentation-mar2026.html',
    title: 'Christos Nicosia — BESS Client Presentation',
    client: 'Christos Nicosia',
    date: 'Mar 2026',
    type: 'Presentation',
  },

  // ─── Subarrow / Maltezos ─────────────────────────────────────────────────
  'maltezos-proposal': {
    path: 'docs/clients/Individual_Maltezos_Agios_Theodoros/bess-maltezos-2.64mw-agios-theodoros-proposal-feb2026.html',
    title: 'Subarrow (Maltezos) — BESS Proposal 2.64 MWp / 10 MWh',
    client: 'Subarrow Investments Ltd',
    date: 'Feb 2026',
    type: 'BESS EPC offer',
  },
  'maltezos-presentation': {
    path: 'docs/clients/Individual_Maltezos_Agios_Theodoros/client-presentation-mar2026.html',
    title: 'Subarrow (Maltezos) — BESS Client Presentation',
    client: 'Subarrow Investments Ltd',
    date: 'Mar 2026',
    type: 'Presentation',
  },

  // ─── Scandinavian Solar Parks ─────────────────────────────────────────────
  'scandinavian-solar-proposal': {
    path: 'docs/clients/group-order/Group7_Scandinavian_Solar/group-proposal.html',
    title: 'Scandinavian Solar Parks — BESS Group Proposal',
    client: 'S.S.H. Scandinavian Solarparks Holding Ltd',
    date: 'Mar 2026',
    type: 'BESS EPC offer',
  },
  'scandinavian-solar-presentation': {
    path: 'docs/clients/Individual_Scandinavian_Solar_Parks/client-presentation-mar2026.html',
    title: 'Scandinavian Solar Parks — BESS Client Presentation',
    client: 'S.S.H. Scandinavian Solarparks Holding Ltd',
    date: 'Mar 2026',
    type: 'Presentation',
  },

  // ─── AE Alternative Energy (South Africa + Zambia) ───────────────────────
  'ae-solar-south-africa': {
    path: 'docs/clients/Individual_AE_Solar_South_Africa/offer-ae-solar-dmsh-12mw-50mwh-mar2026.html',
    title: 'AE Solar — DMSH Geelvloer 12 MW / 50 MWh BESS Offer (South Africa)',
    client: 'AE Alternative Energy GmbH',
    date: 'Mar 2026',
    type: 'BESS EPC offer',
  },
  'ae-solar-zambia-linyang': {
    path: 'docs/clients/Individual_Zambia/offer-ae-solar-zambia-150mw-1200mwh-apr2026.html',
    title: 'AE Solar — Zambia 150 MW / 1,204 MWh BESS Offer (Linyang)',
    client: 'AE Alternative Energy GmbH',
    date: 'Apr 2026',
    type: 'BESS EPC offer',
  },
  'ae-solar-zambia-gotion': {
    path: 'docs/clients/Individual_Zambia/offer-ae-solar-zambia-215mw-1200mwh-gotion-apr2026.html',
    title: 'AE Solar — Zambia 215 MW / 1,204 MWh BESS Offer (Gotion alternative)',
    client: 'AE Alternative Energy GmbH',
    date: 'Apr 2026',
    type: 'BESS EPC offer',
  },

  // ─── Western Greece BTM ──────────────────────────────────────────────────
  'western-greece-btm-offer': {
    path: 'docs/clients/Individual_Western_Greece_BTM/bess-western-greece-final-offer-15mw-30mwh-15may2026.html',
    title: 'Western Greece BTM — 15 MW / 30 MWh BESS Final Offer',
    client: 'Western Greece PV Operator (Confidential)',
    date: 'May 2026',
    type: 'BESS EPC offer',
  },

  // ─── Shapiro / MLP Poland ─────────────────────────────────────────────────
  'shapiro-mlp-portfolio': {
    path: 'docs/clients/Individual_Shapiro/shapiro-bess-portfolio-summary.html',
    title: 'Shapiro / MLP Poland — 7-Site C&I BESS Portfolio Summary',
    client: 'Shapiro / MLP Poland',
    date: '2026',
    type: 'BESS portfolio summary',
  },

  // ─── GreenVolt Elk Poland ─────────────────────────────────────────────────
  'greenvolt-elk-om': {
    path: 'lighthief-eu-bess/clients/GreenVolt_Elk_BESS/proposal-hv-station-om-greenvolt-elk-mar2026.html',
    title: 'GreenVolt Elk — HV Station BESS O&M Proposal',
    client: 'Greenvolt Power Group sp. z o.o.',
    date: 'Mar 2026',
    type: 'BESS O&M proposal',
  },

  // ─── TOTALCON / Qiu (Konia) ───────────────────────────────────────────────
  'totalcon-qiu-epc': {
    path: 'docs/clients/Individual_Qiu_Konia/epc-qiu-1mw-konia-proposal-jun2026.html',
    title: 'TOTALCON LTD — 1 MW PV EPC Proposal, Konia (Paphos)',
    client: 'TOTALCON LTD / Mr. Qiu',
    date: 'Jun 2026',
    type: 'PV EPC offer',
  },

  // ─── Habanay / Trozena Wellness ───────────────────────────────────────────
  'habanay-trozena-proposal': {
    path: 'lighthief-cyprus/pv-clients/habanay/client-proposal.html',
    title: 'Trozena Wellness Resort — Off-Grid PV+BESS Energy Proposal',
    client: 'Habanay / Trozena Wellness Resort',
    date: 'Mar 2026',
    type: 'Off-grid PV+BESS proposal',
  },
}

export const CRM_KB_OFFERS_INDEX = Object.entries(CRM_KB_DOCUMENTS).map(([slug, doc]) => ({
  slug,
  ...doc,
}))
