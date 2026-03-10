import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iipbxwyvlzxthlblayvw.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''

if (!supabaseKey) {
  console.error('Set NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

interface SeedTask {
  title: string
  description?: string
  project: string
  priority: string
  status?: string
  deadline?: string
  delegated_to?: string
  notes?: string
}

const SEED_TASKS: SeedTask[] = [
  // ===== CRITICAL =====
  {
    title: 'Finalize Linyang Sales Contract (18 amendments)',
    description: 'CIF Limassol, payment terms, Singapore law, warranty start, subordination to Distribution Agreement, new sections 5A/9A/18/19/20',
    project: 'legal',
    priority: 'critical',
    deadline: '2026-03-15',
    notes: 'Blocks all BESS orders (EUR 30M+ portfolio). Latest draft: rev260306',
  },
  {
    title: 'Resolve warranty Yr 11-15 pricing gap (261%)',
    description: 'Linyang EUR 4,182 vs client model EUR 1,158/MWh/yr — must reconcile before signing',
    project: 'bess_cyprus',
    priority: 'critical',
    deadline: '2026-03-07',
    notes: 'OVERDUE. Either renegotiate Linyang price or update client pricing model',
  },
  {
    title: 'Agree CT class and location with DSO',
    description: 'Critical path for grid connection of all 51 parks. DSO confirmation needed for metering transformer specs',
    project: 'bess_cyprus',
    priority: 'critical',
    deadline: '2026-03-12',
  },
  {
    title: 'Engage Greek corporate lawyer',
    description: 'IKE formation — lawyer needed for Articles of Association, POA, e-OSS submission. Week 1-2 target is NOW',
    project: 'greece',
    priority: 'critical',
    deadline: '2026-03-14',
    notes: 'Blocks entire Greece expansion. Budget EUR 3K-5K for formation + ongoing retainer',
  },
  {
    title: 'Pre-book heavy-duty crane (Jul-Oct)',
    description: 'Only 1 unit on island. Need exclusive commitment for 51 parks (~51 crane-days). Contact crane operator immediately',
    project: 'bess_cyprus',
    priority: 'critical',
    deadline: '2026-03-07',
    delegated_to: 'Costas',
    notes: 'OVERDUE. No backup crane available — single point of failure',
  },

  // ===== HIGH =====
  {
    title: 'Begin TEE engineer recruitment (Greece)',
    description: 'Cannot participate in BESS tenders without TEE-licensed engineer. Greek polytechnic, 5-10yr energy/BESS, English fluency. Salary EUR 40-56K',
    project: 'greece',
    priority: 'high',
    deadline: '2026-03-21',
    notes: 'Post on LinkedIn Greece, Kariera.gr, Skywalker.gr. Target onboarding by Week 6-8',
  },
  {
    title: 'SolarEdge channel verification (BIGSOLAR/Epiphaniou)',
    description: 'Verify if BIGSOLAR or Epiphaniou hold exclusive SolarEdge representation in Cyprus. Blocks 7SUN stock plan',
    project: '7sun',
    priority: 'high',
    deadline: '2026-03-14',
    notes: 'If exclusive, cannot stock SolarEdge. Pivot to Huawei/Deye-only strategy',
  },
  {
    title: 'Obtain purchase prices from Pawel (7sun.eu)',
    description: 'Need actual cost per SKU (not H1-H5 tiers) to calculate margins and finalize first stock order',
    project: '7sun',
    priority: 'high',
    deadline: '2026-03-12',
    notes: 'Requested in Reply to Pawel email. Blocks first order calculation',
  },
  {
    title: 'Aeolian Dynamics — send technical RFI to Sotiris',
    description: '5.4 MW / 16.2+ MWh Agia Anna wind farm. Questions: MV cubicle (Ormazabal vs ABB ZX1.2), protection scope, export limit, earthing studies',
    project: 'clients',
    priority: 'high',
    deadline: '2026-03-14',
    notes: 'New client. Also verify Voltus IEC 60870-5-104 capability and request ABB studies',
  },
  {
    title: 'Spanercom — follow up Anarita 10MW offer',
    description: 'Commercial offer sent to Muminjon (Mar 2026). 10 MW standalone BESS client',
    project: 'clients',
    priority: 'high',
    deadline: '2026-03-14',
  },
  {
    title: 'RFP: crane and transport (A. Soulis / Interfreight)',
    description: 'How many low-loaders available Jul-Oct 2026? Can they commit exclusivity? Fleet size confirmation needed',
    project: 'bess_cyprus',
    priority: 'high',
    deadline: '2026-03-12',
    delegated_to: 'Costas',
  },
  {
    title: 'Legal review quotation (Georgiades)',
    description: 'Engage Georgiades law firm for Linyang contract review. RFP deadline was Mar 7',
    project: 'legal',
    priority: 'high',
    deadline: '2026-03-10',
    notes: 'OVERDUE. Need external legal review before signing EUR 30M+ contract',
  },
  {
    title: 'Voltus BoM/RFI follow-up',
    description: 'RFI sent 10 Feb, response was due 21 Feb. Need updated pricing (3 groups + 6 standalone) and per-site BoM',
    project: 'ems',
    priority: 'high',
    deadline: '2026-03-10',
    notes: 'OVERDUE. Chase Voltus. Also need OEM interface and master management confirmation',
  },
  {
    title: 'Google Ads conversion tracking setup',
    description: 'GTM + Google Ads conversions must be live before any ad spend. Currently blocking EUR 4.6K/mo campaigns',
    project: 'bd_cyprus',
    priority: 'high',
    deadline: '2026-03-14',
    notes: 'Install GTM, configure GA4 events, set up conversion actions in Google Ads',
  },
  {
    title: 'AE Solar South Africa — BESS sizing proposal',
    description: 'DMSH Geelvloer facility, ~75 MW solar. Clarify 50 MWh sizing, SA grid code (NRS 097-2-1), prepare Linyang/Kehua proposal',
    project: 'clients',
    priority: 'high',
    deadline: '2026-03-21',
    notes: 'Contact: Natalia Iniotaki (natalia@ae-solar.com). PPA expected end March',
  },
  {
    title: 'Linyang Distribution Agreement — finalize comments',
    description: 'Replace Penalty Fee with Contractual Liquidated Damages, reduce post-term exclusivity 24→12mo, add Data Protection + Anti-Bribery',
    project: 'legal',
    priority: 'high',
    deadline: '2026-03-21',
    notes: 'Underpins all sales contracts. Add Deal Registration (X.5) and Quotation Baseline Protection',
  },

  // ===== MEDIUM =====
  {
    title: 'Submit IKE incorporation via e-OSS',
    description: 'Lighthief Greece IKE (or Lighthief Hellas IKE). EUR 5K capital, Alexander as MD. Requires POA from Cyprus',
    project: 'greece',
    priority: 'medium',
    deadline: '2026-04-04',
    notes: 'Depends on Greek lawyer engagement. POA needs notarisation + apostille in Cyprus',
  },
  {
    title: 'Secure virtual office in Athens',
    description: 'Registered address for IKE. Budget EUR 100-250/month. Needed before incorporation',
    project: 'greece',
    priority: 'medium',
    deadline: '2026-04-04',
    notes: 'Can be arranged through Greek lawyer',
  },
  {
    title: 'Appoint Greek accountant',
    description: 'Bookkeeping, VAT, CIT, myDATA, e-invoicing. Budget EUR 400-750/month. Via lawyer referral',
    project: 'greece',
    priority: 'medium',
    deadline: '2026-04-18',
  },
  {
    title: 'Register 7SUN Cyprus company (Ltd)',
    description: 'Entity for PV wholesale JV. Company, bank account, VAT registration (VIES for intra-EU B2B)',
    project: '7sun',
    priority: 'medium',
    deadline: '2026-04-04',
  },
  {
    title: '7SUN warehouse lease signing',
    description: 'Shared with Lighthief, 700 sqm Ypsonas. Needs power, loading bay, vehicle access',
    project: '7sun',
    priority: 'medium',
    deadline: '2026-03-31',
    notes: 'Depends on identifying 2-3 candidates first',
  },
  {
    title: '7SUN bank account + VAT registration',
    description: 'Open Cyprus business bank account. Register for VAT (VIES for intra-EU B2B zero-rated purchases)',
    project: '7sun',
    priority: 'medium',
    deadline: '2026-04-04',
  },
  {
    title: 'Grid connection applications Batch 1 (15 parks)',
    description: 'Begin EAC submission for 15 ABIO parks. EN 50549-2 TUV cert now available. Long lead time',
    project: 'bess_cyprus',
    priority: 'medium',
    deadline: '2026-03-31',
    delegated_to: 'Costas',
  },
  {
    title: 'Warehouse lease shortlist (Limassol)',
    description: 'Identify 2-3 candidate warehouses in Limassol industrial area. Min 5,000 sq ft, power, loading bay, vehicle access',
    project: 'bess_cyprus',
    priority: 'medium',
    deadline: '2026-03-21',
    delegated_to: 'Costas',
  },
  {
    title: 'Issue subcontractor RFPs (civil/mech/elec)',
    description: 'Need quotes from 2-3 Cyprus contractors per trade. No RFPs sent yet for mechanical, electrical, civil, MV cabling, earthing',
    project: 'bess_cyprus',
    priority: 'medium',
    deadline: '2026-03-31',
    delegated_to: 'Costas',
  },
  {
    title: 'Commission agreement (30% net margin)',
    description: 'Commission extraction: 30% of net margin, paid pro-rata. Finalize terms before April',
    project: 'bess_cyprus',
    priority: 'medium',
    deadline: '2026-04-01',
  },
  {
    title: 'Launch Google Ads campaigns 1-3',
    description: 'Brand (EUR 15/day), BESS Curtailment (EUR 60/day), Solar Investment (EUR 80/day). Requires conversion tracking first',
    project: 'bd_cyprus',
    priority: 'medium',
    deadline: '2026-03-21',
    notes: 'Phase 1 budget: EUR 4,650/month',
  },
  {
    title: 'Confirm team start dates (Andreas, Chris, Jihat)',
    description: 'Andreas Christoforou (BD, EUR 2,500), Chris (Back Office, EUR 2,000), Jihat (Field Engineer, EUR 1,400)',
    project: 'bess_cyprus',
    priority: 'medium',
    deadline: '2026-03-14',
  },
  {
    title: '7SUN: hire warehouse operative + sales rep',
    description: 'Bilingual Greek+English. Warehouse operative for stock management, sales rep for installer outreach',
    project: '7sun',
    priority: 'medium',
    deadline: '2026-04-18',
  },
  {
    title: 'Place first 7SUN stock order (~EUR 86K)',
    description: 'Initial stock from 7sun.eu Poland. Requires purchase prices from Pawel + SolarEdge channel verification first',
    project: '7sun',
    priority: 'medium',
    deadline: '2026-04-18',
    notes: 'Also arrange shipping Poland->Limassol (EUR 6-8K transport)',
  },
  {
    title: 'Draft client EPC contracts',
    description: 'Template EPC contracts for BESS installations. Based on signed OEM agreement terms',
    project: 'bess_cyprus',
    priority: 'medium',
    deadline: '2026-03-21',
    notes: 'Depends on Linyang Sales Contract finalization',
  },
  {
    title: 'Linyang RFI: SOH/cell augmentation letter',
    description: 'Request State of Health guarantee and cell augmentation commitment letter from Linyang. 10 working day response time',
    project: 'legal',
    priority: 'medium',
    deadline: '2026-03-14',
    notes: 'Also need final UL 9540A report, SCADA signal matrix, grid-forming declaration',
  },
  {
    title: 'Micro inverter EAC compliance check',
    description: 'Verify EAC accepts micro inverters for apartment installations before 7SUN stocks Deye micro inverters',
    project: '7sun',
    priority: 'medium',
    deadline: '2026-03-31',
  },
  {
    title: 'Vehicle leases — 3 service vans',
    description: 'Commercial lease, 36-month, tool storage fitted. For field service team',
    project: 'bess_cyprus',
    priority: 'medium',
    deadline: '2026-03-31',
    delegated_to: 'Costas',
  },
  {
    title: 'Insurance RFP — CAR/EPC/PI',
    description: 'Send insurance brief to 2-3 local brokers for Construction All Risk, EPC, Professional Indemnity',
    project: 'bess_cyprus',
    priority: 'medium',
    deadline: '2026-03-31',
    delegated_to: 'Costas',
  },
  {
    title: 'Protection coordination studies',
    description: 'All 4 MV skid datasheets received. Extract transformer impedance data, initiate studies for all park configs',
    project: 'bess_cyprus',
    priority: 'medium',
    deadline: '2026-03-31',
    delegated_to: 'Costas',
    notes: 'Unblocked — T1/T2/T4/T8 datasheets available',
  },
  {
    title: 'Set up Meta Business Manager for 7SUN',
    description: 'Ad Account, Pixel, Business Manager, Custom Audiences from installer lists',
    project: '7sun',
    priority: 'medium',
    deadline: '2026-04-15',
  },
  {
    title: 'Build installer contact database (200+)',
    description: 'Cyprus PV installers for 7SUN wholesale outreach. Use RES Fund database + CERA licensee list',
    project: '7sun',
    priority: 'medium',
    deadline: '2026-04-15',
  },
  {
    title: 'Schedule Poland training visit',
    description: 'Training at Linyang/7sun facilities for Lighthief installation team',
    project: 'bess_cyprus',
    priority: 'medium',
    deadline: '2026-03-28',
  },
  {
    title: 'Request DQG files from Linyang',
    description: 'Design Qualification Guide files needed for electrical design finalization',
    project: 'bess_cyprus',
    priority: 'medium',
    deadline: '2026-03-14',
  },

  // ===== LOW / DEFERRED =====
  {
    title: 'Shark Fund structuring',
    description: 'Investment fund for BESS asset acquisitions. Begin structuring in Q4 2026',
    project: 'shark_fund',
    priority: 'low',
    deadline: '2026-10-01',
    status: 'deferred',
  },
  {
    title: 'LighthiefEMS Phase 1 development',
    description: 'Custom EMS platform development. Target Q2-Q3 2026',
    project: 'ems',
    priority: 'low',
    deadline: '2026-06-01',
    status: 'deferred',
  },
  {
    title: '7SUN website full build (Medusa.js)',
    description: '12-week development plan: Medusa.js v2 backend, Next.js storefront, B2B portal, AI chatbot',
    project: '7sun',
    priority: 'low',
    deadline: '2026-06-15',
    status: 'deferred',
    notes: 'Consider WooCommerce quick-start as hybrid approach per Pawel discussion',
  },
  {
    title: 'SolarFarms.cy platform enhancements',
    description: 'Database integration, email testing, content enhancements, admin dashboard improvements',
    project: 'platform',
    priority: 'low',
    notes: 'Ongoing — lower priority than revenue-generating projects',
  },
  {
    title: 'Nicosia pickup point evaluation',
    description: 'Evaluate opening satellite pickup point in Nicosia for 7SUN (Month 5-6)',
    project: '7sun',
    priority: 'low',
    deadline: '2026-08-01',
    status: 'deferred',
  },
  {
    title: '7SUN Deye net billing kit campaign',
    description: 'Landing page with kit configurator, targeted Meta + Google campaigns for homeowners',
    project: '7sun',
    priority: 'low',
    deadline: '2026-05-15',
    status: 'deferred',
  },
  {
    title: 'Greece: first developer relationship',
    description: 'Target within 3 months of IKE formation. Pipeline value >= EUR 5M within 9 months',
    project: 'greece',
    priority: 'low',
    deadline: '2026-07-01',
    status: 'deferred',
    notes: 'Depends on TEE engineer hire and IKE formation',
  },
  {
    title: 'Greece: first tender submission',
    description: 'Target within 6 months of IKE formation. Requires TEE engineer',
    project: 'greece',
    priority: 'low',
    deadline: '2026-09-01',
    status: 'deferred',
  },
]

async function seed() {
  console.log(`Seeding ${SEED_TASKS.length} tasks...`)

  const { data: existing, error: fetchErr } = await supabase
    .from('alex_tasks')
    .select('title')

  if (fetchErr) {
    console.error('Failed to fetch existing tasks:', fetchErr.message)
    process.exit(1)
  }

  const existingTitles = new Set((existing ?? []).map((t: { title: string }) => t.title))

  const newTasks = SEED_TASKS.filter(t => !existingTitles.has(t.title))

  if (newTasks.length === 0) {
    console.log('All tasks already exist. Nothing to insert.')
    return
  }

  console.log(`Inserting ${newTasks.length} new tasks (${SEED_TASKS.length - newTasks.length} already exist)...`)

  const rows = newTasks.map(t => ({
    title: t.title,
    description: t.description || null,
    project: t.project,
    priority: t.priority,
    status: t.status || 'not_started',
    deadline: t.deadline || null,
    delegated_to: t.delegated_to || null,
    notes: t.notes || null,
  }))

  const BATCH_SIZE = 20
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE)
    const { error } = await supabase.from('alex_tasks').insert(batch)
    if (error) {
      console.error(`Batch insert failed at index ${i}:`, error.message)
      process.exit(1)
    }
    console.log(`  Inserted batch ${Math.floor(i / BATCH_SIZE) + 1} (${batch.length} tasks)`)
  }

  console.log(`Done! ${newTasks.length} tasks seeded.`)

  const { count } = await supabase
    .from('alex_tasks')
    .select('*', { count: 'exact', head: true })
  console.log(`Total tasks in database: ${count}`)
}

seed().catch(err => {
  console.error('Seed script failed:', err)
  process.exit(1)
})
