// ===================================================================
// TEAM REGISTRY — SINGLE SOURCE OF TRUTH FOR EMPLOYEE DATA
// All contracts MUST reference this file for employee information.
// When onboarding or updating staff, update HERE ONLY
// then run: npm run contracts:generate
//
// Last updated: March 2026
// ===================================================================

export type EmployeeRole = 'sales' | 'backoffice' | 'field' | 'director';
export type EmployeeStatus = 'active' | 'probation' | 'terminated' | 'pending';
export type CompensationType = 'employee' | 'subcontractor';

export interface Employee {
  id: string;
  fullName: string;
  cyprusId: string;
  socialInsurance: string;
  address?: string;
  mobile?: string;
  email?: string;
  title: string;
  role: EmployeeRole;
  compensationType: CompensationType;
  startDate: string;
  contractDate: string;
  monthlyGross: number;
  salaryDisplay: string;
  status: EmployeeStatus;
  hasEtek?: boolean;
  duties: string[];
  annexes: string[];
}

// ─────────────────────────────────────────────
// SALES TARGET MODEL
// Target = 20x annual gross salary
// Minimum = 9x annual gross salary
// ─────────────────────────────────────────────

export const TARGET_MODEL = {
  salesTargetMultiplier: 20,
  minTargetMultiplier: 9,
} as const;

export function calcSalesTargets(monthlyGross: number) {
  const annualGross = monthlyGross * 12;
  const annualTarget = annualGross * TARGET_MODEL.salesTargetMultiplier;
  const annualMinimum = annualGross * TARGET_MODEL.minTargetMultiplier;
  const sixMonthMinimum = annualMinimum / 2;
  return {
    annualGross,
    annualTarget,
    annualMinimum,
    sixMonthMinimum,
  };
}

// ─────────────────────────────────────────────
// COMMISSION STRUCTURE (Sales team only)
// ─────────────────────────────────────────────

export const COMMISSION = {
  bands: [
    { min: 0,      max: 10_000,  rate: 0 },
    { min: 10_001, max: 20_000,  rate: 5 },
    { min: 20_001, max: 35_000,  rate: 7.5 },
    { min: 35_001, max: 50_000,  rate: 10 },
    { min: 50_001, max: 75_000,  rate: 12.5 },
    { min: 75_001, max: Infinity, rate: 15 },
  ],
  milestones: {
    contractSigning: 40,
    installation: 50,
    commissioning: 10,
  },
} as const;

// ─────────────────────────────────────────────
// TEAM ROSTER
// ─────────────────────────────────────────────

export const TEAM: Employee[] = [
  {
    id: 'costas-hadjikyriacou',
    fullName: 'Costas Hadjikyriacou',
    cyprusId: '874287',
    socialInsurance: '1347386',
    address: '1, 78th Road, Kato Polemidia, 4170, Cyprus',
    mobile: '96531833',
    email: 'costas.eng@outlook.com',
    title: 'BESS Division Lead — ETEK Licensed Engineer, Sales & Technical Consultant',
    role: 'sales',
    compensationType: 'employee',
    startDate: '19 January 2026',
    contractDate: '19 January 2026',
    monthlyGross: 3_000,
    salaryDisplay: 'EUR 3,000',
    status: 'active',
    hasEtek: true,
    duties: [
      'Professional sign-off and certification of BESS park installations as ETEK licensed electrician.',
      'Electrical inspection, validation, and compliance verification of BESS installations.',
      'Pre-installation park studies and site electrical assessments.',
      'Business development and client acquisition for BESS projects.',
      'Preparation of technical and commercial quotations and proposals for BESS systems.',
      'Client engagement, relationship management, and ongoing account management for BESS clients.',
      'Coordination with engineering, operations, and installation teams on BESS project scoping and delivery.',
      'Documentation support for EAC/CERA submissions, Net Billing, and permitting.',
      'Strict adherence to Company pricing and approval rules.',
    ],
    annexes: [
      'Annex A: Unified Sales Commission Structure (LCY-COM-001)',
    ],
  },
  {
    id: 'andreas',
    fullName: 'Andreas Christoforou',
    cyprusId: '[ID NUMBER]',
    socialInsurance: '[SI NUMBER]',
    mobile: '+447707499503',
    email: 'xristoforou.andreass@gmail.com',
    title: 'Business Development & Technical Sales Consultant',
    role: 'sales',
    compensationType: 'employee',
    startDate: '[START DATE]',
    contractDate: '[DATE]',
    monthlyGross: 2_500,
    salaryDisplay: 'EUR 2,500',
    status: 'active',
    duties: [
      'Technical and commercial sales of BESS and PV systems.',
      'Preparation of proposals, quotations, ROI analyses, and client business cases.',
      'Client engagement, preliminary technical assessments, and energy analysis.',
      'Coordination with engineering and operations teams on project scoping.',
      'Documentation support for EAC/CERA submissions and permitting.',
      'Business development — identification and qualification of new project opportunities.',
      'Strict adherence to Company pricing and approval rules.',
    ],
    annexes: [
      'Annex A: Unified Sales Commission Structure (LCY-COM-001)',
    ],
  },
  {
    id: 'zinovia-efesopoulou',
    fullName: 'Zinovia Efesopoulou',
    cyprusId: '1160290',
    socialInsurance: '1676925',
    title: 'Sales Executive and Lead Intake Coordinator',
    role: 'sales',
    compensationType: 'employee',
    startDate: '1 December 2025',
    contractDate: '1 December 2025',
    monthlyGross: 1_400,
    salaryDisplay: 'EUR 1,400',
    status: 'active',
    duties: [
      'First point of contact for inbound residential, commercial, and BESS sales leads.',
      'Qualification of leads and collection of technical and commercial information.',
      'Assignment and coordination of leads with Business Development and Technical teams.',
      'Assistance in preparation of proposals, quotations, and client documentation.',
      'Follow-up with clients on offers, documentation, and scheduling.',
      'Support of sales closure processes.',
      'CRM data entry and maintenance.',
      'Coordination between sales, engineering, and back office.',
      'Support with documentation required for EAC submissions and internal workflows.',
    ],
    annexes: [
      'Annex A: Unified Sales Commission Structure (LCY-COM-001)',
    ],
  },
  {
    id: 'chris',
    fullName: 'Christos Nicolaou',
    cyprusId: '[ID NUMBER]',
    socialInsurance: '[SI NUMBER]',
    title: 'Back Office & Operations Coordinator',
    role: 'backoffice',
    compensationType: 'subcontractor',
    startDate: '[START DATE]',
    contractDate: '[DATE]',
    monthlyGross: 2_000,
    salaryDisplay: 'EUR 2,000',
    status: 'terminated',
    duties: [
      'Maintenance of complete project files including contracts, quotations, permits, and correspondence.',
      'Preparation of EAC submission packages and regulatory document support.',
      'CRM data entry, pipeline tracking, and reporting.',
      'Preparation of client invoices and payment tracking.',
      'Supplier invoice processing and expense tracking.',
      'Coordination between sales, engineering, and operations teams.',
      'Meeting support including agendas, minutes, and follow-up.',
      'Tracking of EAC, CERA, and permitting deadlines.',
      'Insurance certificate management and renewal tracking.',
      'Inventory record maintenance and spare parts reorder alerting.',
    ],
    annexes: [
      'Annex A: Back Office KPI Framework (LCY-KPI-001)',
    ],
  },
  {
    id: 'jihat',
    fullName: 'Cihat Ertugrul',
    cyprusId: '[ID NUMBER]',
    socialInsurance: '[SI NUMBER]',
    mobile: '+357 96 108651',
    email: 'cihatertgrl65@gmail.com',
    title: 'Field Engineer — Civil Works & O&M',
    role: 'field',
    compensationType: 'employee',
    startDate: '[START DATE]',
    contractDate: '[DATE]',
    monthlyGross: 1_400,
    salaryDisplay: 'EUR 1,400',
    status: 'active',
    duties: [
      'On-site supervision and execution of BESS and PV civil installation works.',
      'Management and coordination of installation teams and subcontractors on site.',
      'Preventive and corrective maintenance visits for PV systems.',
      'O&M call response for PV installations — fault diagnosis and small repairs.',
      'Completion of site inspection checklists, torque registers, and quality documentation.',
      'Coordination with engineering and back office on project progress and material requirements.',
      'Warehouse support — loading, receiving, and inventory verification of equipment.',
      'Adherence to all health and safety protocols on site.',
    ],
    annexes: [
      'Annex A: Field Engineer & Service KPI Framework (LCY-KPI-002)',
    ],
  },
  {
    id: 'alexander-papacosta',
    fullName: 'Alexander Papacosta',
    cyprusId: '',
    socialInsurance: '',
    title: 'Director',
    role: 'director',
    compensationType: 'employee',
    startDate: '',
    contractDate: '',
    monthlyGross: 0,
    salaryDisplay: '',
    status: 'active',
    duties: [],
    annexes: [],
  },
];

export function getEmployee(id: string): Employee | undefined {
  return TEAM.find(e => e.id === id);
}

export function getSalesTeam(): Employee[] {
  return TEAM.filter(e => e.role === 'sales');
}

export function getServiceTeam(): Employee[] {
  return TEAM.filter(e => e.role === 'field' || e.role === 'backoffice');
}
