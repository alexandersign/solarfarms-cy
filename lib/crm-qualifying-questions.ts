/**
 * SPIN qualifying questions for each CRM segment and offer type.
 * Used in the call log form to guide the salesperson through the right questions
 * and record answers that advance the sales process.
 *
 * SPIN phases:
 *   S — Situation: understand the prospect's current position
 *   P — Problem:   surface pain points and losses
 *   I — Implication: deepen the consequences of inaction
 *   N — Need-payoff: get the prospect to articulate the value of acting
 */

export type SpinPhase = 'situation' | 'problem' | 'implication' | 'need_payoff'
export type CallProgress = 'advanced' | 'hold' | 'stalled'

export interface QualifyingQuestion {
  id: string
  spin: SpinPhase
  question: string
  hint: string          // why this question matters / what to listen for
  fieldToUpdate?: string  // CRM field this answer informs
  options?: string[]    // optional dropdown choices
}

export interface SpinCallData {
  spin_phase: SpinPhase
  progress: CallProgress
  summary: string
  answers: Record<string, string>   // question id → answer
  next_action?: string
}

// ─── Developer / PV park qualifying questions ─────────────────────────────────

export const DEVELOPER_QUESTIONS: QualifyingQuestion[] = [
  // ─── Situation ─────────────────────────────────────────────────────────────
  {
    id: 'park_status',
    spin: 'situation',
    question: 'Is the park operational, under construction, or still in permitting?',
    hint: 'Determines offer type: operational → O&M + BESS retrofit; construction → EPC; permitting → early pipeline',
    fieldToUpdate: 'rtb_status',
    options: ['Operational', 'Under construction', 'Licensed / permitting', 'Pre-permit'],
  },
  {
    id: 'total_mwp',
    spin: 'situation',
    question: 'What is the total installed capacity (MWp)?',
    hint: 'Sizes BESS, determines O&M pricing tier',
    fieldToUpdate: 'capacity_mwp',
  },
  {
    id: 'connection_terms',
    spin: 'situation',
    question: 'Do you have connection terms (POS) issued by EAC?',
    hint: 'If yes → RTB candidate. Ask for the reference number and date.',
    fieldToUpdate: 'connection_terms_status',
    options: ['Yes — issued', 'Applied — waiting', 'Not yet applied', 'Final terms issued'],
  },
  {
    id: 'has_om',
    spin: 'situation',
    question: 'Is the park currently under an O&M contract? If so, who with and when does it expire?',
    hint: 'Identifies renewal opportunity. If expiring in <12 months = urgent.',
    options: ['Yes — EAC', 'Yes — third party', 'No O&M contract', 'In-house maintenance'],
  },
  // ─── Problem ───────────────────────────────────────────────────────────────
  {
    id: 'curtailment',
    spin: 'problem',
    question: 'Is the park being curtailed by EAC? Approximately what percentage of output?',
    hint: 'Key BESS pain point. If yes → calculate lost revenue. Cyprus average 47% in 2025.',
    fieldToUpdate: 'curtailment_rate',
    options: ['Yes — >30%', 'Yes — 20–30%', 'Yes — <20%', 'No / unknown'],
  },
  {
    id: 'revenue_loss',
    spin: 'problem',
    question: 'Are you aware of the annual revenue you are losing to curtailment?',
    hint: 'Open the BESS conversation. Use: (MWp × curtailment% × EAC tariff €110/MWh × 2000h) ÷ 1 to estimate.',
  },
  {
    id: 'om_issues',
    spin: 'problem',
    question: 'Have you had any downtime, inverter failures, or availability issues in the last 12 months?',
    hint: 'Surfaces O&M pain. Poor availability = strong pitch for our guaranteed O&M.',
  },
  // ─── Implication ──────────────────────────────────────────────────────────
  {
    id: 'curtailment_future',
    spin: 'implication',
    question: 'EAC curtailment doubled in 2024→2025. If it continues to increase, how does that affect your project ROI and lender covenants?',
    hint: 'Forces them to confront the financial consequence of inaction. Project finance often has availability / revenue covenants.',
  },
  {
    id: 'opportunity_cost',
    spin: 'implication',
    question: 'If you could capture the curtailed energy with BESS and sell it in the evening peak — what would that mean for the park\'s return over the next 5 years?',
    hint: 'Pivots to positive framing. Evening peak rate ~€203/MWh vs midday ~€84/MWh in the Oct 2025–Jul 2026 TSOC sample (seasonal).',
  },
  // ─── Need-payoff ──────────────────────────────────────────────────────────
  {
    id: 'bess_interest',
    spin: 'need_payoff',
    question: 'If a BESS solution could pay back in 4–5 years and increase annual revenue by €X, would that justify moving forward with a feasibility study?',
    hint: 'Trial close. If yes → schedule technical review and request EAC SLD + curtailment data.',
    options: ['Yes — worth studying', 'Maybe — need more numbers', 'Not now', 'Decision not mine alone'],
  },
  {
    id: 'next_step_dev',
    spin: 'need_payoff',
    question: 'Who else is involved in the decision — directors, lenders, EPC partner?',
    hint: 'Maps the decision unit. Lenders are often the real decision-maker for grid-scale BESS.',
  },
]

// ─── Commercial rooftop qualifying questions ───────────────────────────────────

export const COMMERCIAL_QUESTIONS: QualifyingQuestion[] = [
  // ─── Situation ─────────────────────────────────────────────────────────────
  {
    id: 'ownership',
    spin: 'situation',
    question: 'Do you own the building, or do you lease the premises?',
    hint: 'CRITICAL: If leasing, the landlord must consent and sign. Changes the permitting path significantly.',
    options: ['Own — freehold', 'Own — mortgaged', 'Lease — long term (>10yr)', 'Lease — short term', 'Lease — need to check'],
  },
  {
    id: 'monthly_bill',
    spin: 'situation',
    question: 'Approximately what is your monthly EAC electricity bill?',
    hint: 'Sizes the system. Rule of thumb: €1,000/month → ~15 kWp system → ~€3,500/yr saving.',
    options: ['<€500/mo', '€500–€2,000/mo', '€2,000–€5,000/mo', '€5,000–€15,000/mo', '>€15,000/mo'],
  },
  {
    id: 'roof_access',
    spin: 'situation',
    question: 'Is the roof accessible and free of obstructions (AC units, skylights, water tanks)?',
    hint: 'Affects usable area and structural assessment scope.',
    options: ['Yes — clear roof', 'Partially obstructed', 'Heavily obstructed', 'Not sure'],
  },
  {
    id: 'building_docs',
    spin: 'situation',
    question: 'Do you have the title deed and building permit available?',
    hint: 'Essential for EAC net billing application. Titles deed, building permit, and topographic plan must all reference the same plot number.',
    options: ['Yes — both available', 'Title deed only', 'Neither — need to obtain', 'Not sure'],
  },
  // ─── Problem ───────────────────────────────────────────────────────────────
  {
    id: 'bill_pain',
    spin: 'problem',
    question: 'How significant is the electricity cost as a percentage of your operating expenses?',
    hint: 'For warehouses/cold storage it can be 30–50% of opex — a very compelling saving.',
    options: ['>30% of opex', '15–30% of opex', '<15% of opex', 'Not tracked'],
  },
  {
    id: 'peak_hours',
    spin: 'problem',
    question: 'Does your business operate primarily during the day (09:00–18:00)?',
    hint: 'Daytime operations = highest self-consumption rate → best ROI. Nighttime-heavy businesses need battery.',
    options: ['Yes — daytime only', 'Mixed day/night', 'Mostly night shift', '24/7'],
  },
  // ─── Implication ──────────────────────────────────────────────────────────
  {
    id: 'roi_urgency',
    spin: 'implication',
    question: 'EAC commercial tariffs have risen ~25% in 3 years and are expected to continue rising. How does that trajectory affect your business costs if nothing changes?',
    hint: 'Locks in the urgency. Rising tariffs = shrinking margins without solar protection.',
  },
  {
    id: 'competitors',
    spin: 'implication',
    question: 'Are you aware that competitors in your industry are beginning to install rooftop solar to reduce their operating costs?',
    hint: 'Creates competitive pressure. Particularly relevant in hospitality, logistics, and retail.',
  },
  // ─── Need-payoff ──────────────────────────────────────────────────────────
  {
    id: 'saving_value',
    spin: 'need_payoff',
    question: 'If we could reduce your electricity bill by €X per year with a payback of under 5 years — what would that mean for your business profitability?',
    hint: 'Gets the prospect to articulate the value themselves. Much more powerful than us stating it.',
  },
  {
    id: 'next_step_comm',
    spin: 'need_payoff',
    question: 'Would you be open to a free site visit so we can confirm the roof area and give you a precise savings figure?',
    hint: 'Trial close → site visit is the natural next step for commercial.',
    options: ['Yes — arrange visit', 'Yes — send estimate first', 'Not yet — follow up in X weeks', 'No'],
  },
]

// ─── BESS-specific additional questions (append to developer set) ─────────────

export const BESS_SPECIFIC_QUESTIONS: QualifyingQuestion[] = [
  {
    id: 'existing_sld',
    spin: 'situation',
    question: 'Do you have the existing Single Line Diagram (SLD) for the park from EAC?',
    hint: 'Essential for BESS integration design. If not, we can request from EAC.',
    options: ['Yes — available', 'No — need to request from EAC', 'Not sure'],
  },
  {
    id: 'grid_capacity',
    spin: 'situation',
    question: 'Has EAC confirmed the grid connection point can accept BESS discharge (not just PV injection)?',
    hint: 'Some connection points only allow export at PV peak. BESS evening discharge may require capacity confirmation.',
    options: ['Confirmed — can discharge', 'Unknown — not checked', 'EAC said no capacity', 'Using co-location exemption (Jan 2026)'],
  },
  {
    id: 'geo_study',
    spin: 'situation',
    question: 'Has a geotechnical / soil study been done for the site?',
    hint: 'Required for BESS container foundations if ground-mounted. Confirms soil bearing capacity for 10–20 tonne containers.',
    options: ['Yes — available', 'No — needed', 'Not required (roof/existing slab)', 'Not sure'],
  },
  {
    id: 'cera_bess_licence',
    spin: 'situation',
    question: 'Has CERA issued or approved a BESS construction licence for this site?',
    hint: 'CERA BESS licence must be obtained BEFORE EAC PCC application. Common blocker.',
    options: ['Yes — licence in hand', 'Applied — waiting', 'Not yet applied', 'Using exemption (<1 MW)'],
  },
]

// ─── Lookup helper ────────────────────────────────────────────────────────────

export function getQualifyingQuestions(segment: string, offerType?: string): QualifyingQuestion[] {
  if (segment === 'commercial') return COMMERCIAL_QUESTIONS
  // Developer: always include base questions; add BESS-specific if relevant
  const base = DEVELOPER_QUESTIONS
  const wantsBess = offerType === 'bess_retrofit' || offerType === 'epc' ||
    !offerType  // unknown → show BESS in case
  return wantsBess ? [...base, ...BESS_SPECIFIC_QUESTIONS] : base
}

export function questionsByPhase(questions: QualifyingQuestion[], phase: SpinPhase): QualifyingQuestion[] {
  return questions.filter(q => q.spin === phase)
}

export const SPIN_PHASE_LABELS: Record<SpinPhase, { short: string; label: string; color: string }> = {
  situation:    { short: 'S', label: 'Situation',   color: '#1A365D' },
  problem:      { short: 'P', label: 'Problem',     color: '#92400e' },
  implication:  { short: 'I', label: 'Implication', color: '#991b1b' },
  need_payoff:  { short: 'N', label: 'Need-payoff', color: '#065f46' },
}

export const PROGRESS_LABELS: Record<CallProgress, { label: string; icon: string; color: string }> = {
  advanced: { label: 'Advanced',  icon: '↑', color: '#059669' },
  hold:     { label: 'Hold',      icon: '→', color: '#6b7280' },
  stalled:  { label: 'Stalled',   icon: '↓', color: '#dc2626' },
}
