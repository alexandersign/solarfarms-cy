import { COMPANY_DATA } from '@/lib/constants'

export interface BessDeliveryStep {
  step: number
  title: string
  description: string
  duration: string
  lighthiefAdvantage: string
  deliverables: string[]
}

export interface BessTeamMember {
  name: string
  position: string
  role: string
  bio: string
  credentials: string[]
  email: string
  phone?: string
  image: string
}

export const BESS_DELIVERY_STEPS: BessDeliveryStep[] = [
  {
    step: 1,
    title: 'Site & Production Review',
    description:
      'We review metered production, grid connection status, and export constraints to size BESS correctly for your park.',
    duration: '1–2 weeks',
    lighthiefAdvantage:
      'Cyprus-based engineers use real operational data — not generic assumptions — for sizing and revenue modelling.',
    deliverables: [
      'Site visit or remote data review',
      'Production and yield baseline',
      'Preliminary BESS capacity recommendation',
    ],
  },
  {
    step: 2,
    title: 'Engineering & Permits',
    description:
      'ETEK-signed electrical design, MV skid layout, and coordination with DSO/EAC for storage integration.',
    duration: '2–4 weeks',
    lighthiefAdvantage:
      'In-house ETEK electrical engineering — no outsourced design for grid-critical work.',
    deliverables: [
      'Single-line diagrams and layout drawings',
      'Grid connection and protection study',
      'Permit and utility submission support',
    ],
  },
  {
    step: 3,
    title: 'Commercial Proposal',
    description:
      'Turnkey CAPEX breakdown, LTSA options, and indicative returns using verified market pricing.',
    duration: '1–2 weeks',
    lighthiefAdvantage:
      'Transparent Tier-1 pricing through our official distribution channel — calculator-backed projections.',
    deliverables: [
      'Itemised equipment and EPC quote',
      'LTSA and warranty options',
      'Indicative ROI model (solar-only vs solar+BESS)',
    ],
  },
  {
    step: 4,
    title: 'Procurement & QA',
    description:
      'Factory-order Tier-1 LFP containers with acceptance testing and delivery scheduling to Cyprus.',
    duration: '3–6 months',
    lighthiefAdvantage:
      'Direct OEM relationship with factory QA oversight from our European operations team.',
    deliverables: [
      'Purchase order and delivery schedule',
      'Factory acceptance test (FAT) coordination',
      'Logistics and customs handling',
    ],
  },
  {
    step: 5,
    title: 'EPC Installation',
    description:
      'Civil works, container placement, MV integration, and EMS/SCADA hook-up to your existing plant.',
    duration: '8–12 weeks',
    lighthiefAdvantage:
      'Proven utility-scale EPC discipline from a group managing hundreds of MW across 11 countries.',
    deliverables: [
      'Civil and foundation works',
      'MV skid and container installation',
      'EMS/SCADA integration with existing PV',
    ],
  },
  {
    step: 6,
    title: 'Commissioning',
    description:
      'Grid acceptance testing, performance verification, and formal warranty commencement.',
    duration: '2–4 weeks',
    lighthiefAdvantage:
      'ETEK engineer on-site for commissioning — same team that designed the system.',
    deliverables: [
      'Grid connection and energisation',
      'Performance and safety testing',
      'Handover documentation and warranties',
    ],
  },
  {
    step: 7,
    title: 'Operations & Optimization',
    description:
      '24/7 remote monitoring, preventive maintenance, and dispatch tuning under LTSA packages.',
    duration: 'Ongoing (15+ years)',
    lighthiefAdvantage:
      'Certified Tier-1 BESS O&M partner with 97% availability guarantee options and local spare parts.',
    deliverables: [
      'SCADA monitoring and alerting',
      'Scheduled preventive maintenance',
      'Performance reporting and optimization',
    ],
  },
]

export const BESS_CYPRUS_TEAM: BessTeamMember[] = [
  {
    name: COMPANY_DATA.contacts.cyprusDirector.name,
    position: COMPANY_DATA.contacts.cyprusDirector.title,
    role: 'Commercial lead & BESS proposals',
    bio: 'Leads Cyprus and Greece operations. Manages investor relations, BESS sizing, and turnkey proposals for utility-scale solar+storage projects.',
    credentials: [
      'Cyprus & Greece Market Lead',
      'Off-Grid & BESS Specialist',
      '7Sun JV Partnership',
    ],
    email: COMPANY_DATA.contacts.cyprusDirector.email,
    phone: COMPANY_DATA.contacts.cyprusDirector.phone,
    image: '/images/team/alexander-papacosta.jpg',
  },
  {
    name: COMPANY_DATA.contacts.engineer.name,
    position: COMPANY_DATA.contacts.engineer.title,
    role: 'Design, grid integration & commissioning',
    bio: 'ETEK-licensed electrical engineer with extensive PV and storage experience — from single-line design through grid acceptance and O&M handover.',
    credentials: [
      'ETEK Licensed Engineer',
      'MEng Electrical & Computer Engineering',
      'MSc Energy Systems',
    ],
    email: COMPANY_DATA.contacts.engineer.email,
    image: '/images/1690376781153.jpg',
  },
]

export const BESS_POLAND_BACKING = {
  name: COMPANY_DATA.contacts.polandDirector.name,
  position: COMPANY_DATA.contacts.polandDirector.title,
  email: COMPANY_DATA.contacts.polandDirector.email,
  image: '/images/team/maciej.jpg',
  headline: 'European EPC & O&M depth behind every Cyprus BESS project',
  description:
    'Your Cyprus project team is backed by Lighthief Poland — factory-grade EPC, warehouse spares, and a live R&D site where BESS systems are tested alongside utility-scale PV.',
  rdCenter: {
    location: COMPANY_DATA.rdCenter.location,
    size: COMPANY_DATA.rdCenter.size,
    facilities: COMPANY_DATA.rdCenter.facilities,
  },
  credentials: [
    'Poland Operations Director',
    'Solar EPC & BESS Division',
    'Częstochowa HQ & R&D Centre',
  ],
}
