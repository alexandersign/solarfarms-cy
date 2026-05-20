import { COMPANY_DATA } from '@/lib/constants'

export interface TeamMember {
  name: string
  position: string
  countries: string[]
  bio: string
  credentials: string[]
  email: string
  linkedin?: boolean
  image: string
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

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Dr. Arkadius Sybaris',
    position: 'Founder & CEO',
    countries: ['PL', 'UK', 'KZ', 'UZ', 'UA', 'RO'],
    bio: "Dr. Arkadius founded Lighthief nearly a decade ago and has been instrumental in renewable energy for over 10 years. He focuses on investor relations and new market development, overseeing Eurasian expansion across Kazakhstan, Uzbekistan, and Kyrgyzstan, as well as operations in Ukraine and Romania. As a private investor, he holds substantial renewable energy assets: over 250 MW in photovoltaic farms, 60 MW in wind energy, and 4 MW in biogas installations.",
    credentials: [
      'Founder & CEO, Lighthief Group',
      '250+ MW PV, 60 MW Wind, 4 MW Biogas',
      'Biomethane LTD - Biogas Division',
      'Future Business Strategy Architect',
    ],
    email: 'a.sybaris@lighthief.com',
    linkedin: true,
    image: '/images/team/arkadius.jpg',
  },
  {
    name: COMPANY_DATA.contacts.cyprusDirector.name,
    position: COMPANY_DATA.contacts.cyprusDirector.title,
    countries: ['CY', 'GR'],
    bio: "Alexander leads our rapidly expanding Cyprus operations, specializing in off-grid energy systems and the innovative integration of renewable energy with cryptocurrency mining and AI infrastructure. He manages investor relations for photovoltaic farm development across Cyprus and Greece, overseeing strategic Joint Ventures including our partnership with 7Sun, one of Europe's major renewable energy wholesalers.",
    credentials: [
      'Cyprus & Greece Market Lead',
      'Off-Grid & BESS Specialist',
      '7Sun JV Partnership',
      'Crypto & AI Infrastructure Integration',
    ],
    email: COMPANY_DATA.contacts.cyprusDirector.email,
    linkedin: true,
    image: '/images/team/alexander-papacosta.jpg',
  },
  {
    name: COMPANY_DATA.contacts.engineer.name,
    position: COMPANY_DATA.contacts.engineer.title,
    countries: ['CY'],
    bio: 'ETEK-licensed Electrical Engineer with extensive experience in photovoltaic systems design, installation, and O&M. Background includes leading B2B green energy solutions and managing residential and commercial PV operations. Holds MEng in Electrical & Computer Engineering from Aristotle University of Thessaloniki and MSc in Energy Systems from International Hellenic University.',
    credentials: [
      'ETEK Licensed Engineer',
      'MEng Electrical & Computer Engineering',
      'MSc Energy Systems - Energy Management',
      'Certified PV Installer (Cyprus)',
    ],
    email: COMPANY_DATA.contacts.engineer.email,
    linkedin: true,
    image: '/images/1690376781153.jpg',
  },
  {
    name: COMPANY_DATA.contacts.polandDirector.name,
    position: COMPANY_DATA.contacts.polandDirector.title,
    countries: ['PL'],
    bio: "Maciej brings years of renewable energy experience from leading OZE companies. For the past four years, he has architected the Polish operation's strategy and explosive growth. Under his leadership, Lighthief Poland developed the state-of-the-art Częstochowa headquarters—a facility combining 1,000 m² of office space, 3,500 m² of warehouse capacity, and a 23-hectare research center with integrated PV farms, biogas plant, and BESS systems.",
    credentials: [
      'Poland Operations Director',
      'Częstochowa HQ Development Lead',
      'Solar EPC & BESS Division',
      'European O&M Expansion',
    ],
    email: COMPANY_DATA.contacts.polandDirector.email,
    linkedin: true,
    image: '/images/team/maciej.jpg',
  },
  {
    name: 'Maurizio Ganis',
    position: 'Italy Director',
    countries: ['IT'],
    bio: 'Maurizio brings elite-level expertise from decades of operating at the highest echelons of European, American, and Asian investment funds. His career spans Renewable Energy, Oil & Gas, and Real Estate sectors, where he has held senior executive positions including Chairman, CEO, and Commercial Director. His deep relationships with institutional investors and understanding of structured finance position Lighthief Italy for aggressive growth.',
    credentials: [
      'Italy Market Director',
      'Institutional Investment Expert',
      'Structured Finance Specialist',
      'Utility-Scale Project Execution',
    ],
    email: 'm.ganis@lighthief.com',
    linkedin: true,
    image: '/images/team/maurizio.jpg',
  },
  {
    name: 'Leon Volkerink',
    position: 'Director & Chief Compliance Officer',
    countries: ['NL', 'DE', 'CY'],
    bio: 'Leon oversees our Dutch market and plays a key role in German operations while serving as Chief Compliance Officer for the entire Lighthief Group. He ensures transaction security, manages KYC protocols, and establishes procedural frameworks that protect operations across 11 countries and maintain NATO certification standards. A Dutch national who has lived in Cyprus for over 15 years, Leon bridges Northern and Mediterranean European business cultures seamlessly.',
    credentials: [
      'Chief Compliance Officer',
      'Netherlands & Germany Operations',
      'NATO Certification Compliance',
      'KYC & Transaction Security',
    ],
    email: 'leon.volkerink@lighthief.com',
    linkedin: true,
    image: '/images/team/leon.jpg',
  },
  {
    name: 'Marko Hernaiz',
    position: 'Spain / Poland Director',
    countries: ['ES', 'PL'],
    bio: "One of Lighthief's founding members alongside Arkadius, helping build the company from its earliest days. Today, he oversees Spanish market development, leveraging his unique dual heritage—half Polish, half Spanish—to bridge cultural and business practices across our European operations. His expertise in people management and team building has been invaluable to Lighthief's growth.",
    credentials: [
      'Co-Founder, Lighthief',
      'Spain Market Director',
      'Team Building Expert',
      'Circular Economy Specialist',
    ],
    email: 'm.hernaiz@lighthief.com',
    linkedin: true,
    image: '/images/team/marko.jpg',
  },
]

export const BESS_CYPRUS_TEAM: BessTeamMember[] = [
  {
    name: COMPANY_DATA.contacts.cyprusDirector.name,
    position: COMPANY_DATA.contacts.cyprusDirector.title,
    role: 'Commercial lead & BESS proposals',
    bio: 'Leads Cyprus and Greece operations. Manages investor relations, BESS sizing, and turnkey proposals for utility-scale solar+storage projects.',
    credentials: ['Cyprus & Greece Market Lead', 'Off-Grid & BESS Specialist', '7Sun JV Partnership'],
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
  credentials: ['Poland Operations Director', 'Solar EPC & BESS Division', 'Częstochowa HQ & R&D Centre'],
}
