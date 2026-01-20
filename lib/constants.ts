// Bank Financing Options (Updated with realistic caps)
export const FINANCING_OPTIONS = {
  CASH: {
    name: "Cash Purchase",
    downPayment: 100, // 100% cash
    loanAmount: 0,
    interestRate: 0,
    loanTermYears: 0,
    description: "Full cash investment with immediate ownership",
    note: null
  },
  SOLAR_ONLY: {
    name: "Solar-Only Financing",
    downPayment: 0, // Calculated based on €500k/MW cap
    loanAmount: 0, // Calculated based on €500k/MW cap
    maxDebtPerMW: 500000, // €500k/MW maximum
    interestRate: 4.5, // Typical Cyprus commercial loan rate
    loanTermYears: 15, // Standard term for solar projects
    description: "Bank financing capped at €500,000 per MW",
    note: "For solar-only projects - conservative bank lending"
  },
  SOLAR_BESS: {
    name: "Solar + BESS Financing",
    downPayment: 30, // 30% down payment
    loanAmount: 70, // Up to 70% of total capex
    interestRate: 4.5, // Similar rate due to BESS revenue streams
    loanTermYears: 15,
    description: "Up to 70% financing for solar + battery storage",
    note: "Enhanced bankability with BESS revenue streams"
  }
} as const

// Cyprus Bank Rates (as of 2025)
export const CYPRUS_BANK_RATES = {
  commercialLoans: {
    prime: 4.0, // Prime rate
    solarProjects: 4.5, // Solar project rate
    greenFinancing: 4.2, // EU green financing rate
  },
  terms: {
    short: { years: 10, rate: 4.8 },
    medium: { years: 15, rate: 4.5 },
    long: { years: 20, rate: 5.2 }
  }
} as const

// Capex Modes - Realistic 2025 Cyprus Market Pricing
export const CAPEX_MODES = {
  'epc-dev': {
    name: 'EPC Development',
    pricePerMW: 500000,
    description: 'Development from scratch - €500k/MW',
    financingCap: 500000 // €500k/MW max debt
  },
  'turnkey': {
    name: 'Turnkey New Build',
    pricePerMW: 1200000,
    description: 'Complete turnkey project - €1.2M/MW',
    financingCap: 500000
  },
  'rtb-old': {
    name: 'RTB Park (Fixed-Tilt)',
    pricePerMW: 1200000,
    description: 'Ready-to-build, older/fixed - €1.2M/MW',
    financingCap: 500000
  },
  'rtb-new': {
    name: 'RTB Park (Tracking)',
    pricePerMW: 1700000,
    description: 'Ready-to-build, new/tracking - €1.7M/MW',
    financingCap: 500000
  }
} as const

// Investment Constants (Based on Real 5.01MW Park Data - €1.5M/MW baseline)
export const INVESTMENT_SIZES = {
  "1MW": {
    minInvestment: 1500000,  // €1.5M/MW baseline
    maxInvestment: 1500000,
    minRevenue: 200000,      // Based on ~2,000 kWh/kWp * €0.19/kWh * 25% curtailment
    maxRevenue: 280000,      // With optimal performance
    minROI: 8,               // Conservative with current curtailment
    maxROI: 13,              // With BESS or better conditions
    minPayback: 7,           
    maxPayback: 10,
    minNPV: 2000000,
    maxNPV: 3500000,
    financingCap: 500000,    // €500k/MW max debt (SOLAR ONLY)
    bessFinancingPct: 70,    // 70% of total for solar+BESS
  },
  "5MW": {
    minInvestment: 7500000,  // €1.5M/MW * 5 = €7.5M baseline
    maxInvestment: 7500000,
    minRevenue: 1000000,     // Based on real park data with curtailment
    maxRevenue: 1400000,     // Optimized scenario
    minROI: 8,               // Conservative 
    maxROI: 13,              // With BESS (real 5.01MW park shows 13.3%-13.6%)
    minPayback: 7,
    maxPayback: 10,
    minNPV: 10000000,
    maxNPV: 17500000,
    financingCap: 2500000,   // €500k/MW * 5MW max debt (SOLAR ONLY)
    bessFinancingPct: 70,    // 70% of total for solar+BESS
  },
  "10MW": {
    minInvestment: 15000000,  // €1.5M/MW * 10 = €15M baseline
    maxInvestment: 15000000,
    minRevenue: 2000000,      // Scaled from 5MW data
    maxRevenue: 2800000,
    minROI: 8,               
    maxROI: 13,
    minPayback: 7,
    maxPayback: 10,
    minNPV: 20000000,
    maxNPV: 35000000,
    financingCap: 5000000,   // €500k/MW * 10MW max debt (SOLAR ONLY)
    bessFinancingPct: 70,    // 70% of total for solar+BESS
  },
} as const

// Cyprus Solar Data
export const CYPRUS_SOLAR_DATA = {
  sunHours: 3300,
  solarIrradiation: 1800, // kWh/m²/year
  renewablePercentage: 13.8,
  euAverageRenewable: 19.7,
  targetCapacity: 1250, // MW by 2030
  residentialElectricityRate: 0.32, // €/kWh
  commercialElectricityRate: 0.267, // €/kWh
  ppaRate: 0.15, // €/kWh average
  generationCost: 0.06, // €/kWh average
} as const

// Company Data (Real Lighthief Information)
export const COMPANY_DATA = {
  name: "Lighthief Cyprus Ltd",
  legalName: "LIGHTHIEF CYPRUS LTD",
  website: "https://solarfarms.cy",
  email: "office@lighthief.com",
  phone: "+357 77 77 00 50",
  founded: "2017",
  incorporatedCyprus: "July 1, 2025",
  founders: ["Darius", "Arkadius"],
  headquarters: "Limassol, Cyprus",
  businessModel: "Full-service solar solutions from recycling to EPC",
  evolution: "Started with solar panel recycling (2017) → O&M services → Full EPC contractor",
  specialization: "Residential to large-scale solar farms and panel recycling",
  offices: "International presence with Cyprus headquarters",
  countries: ["Cyprus", "Europe", "International markets"],
  constructionCostPerMW: {
    min: 450000,
    max: 600000,
  },
  rtbCostPerMW: {
    min: 450000,
    max: 600000,
  },
  address: {
    office: {
      street: "28 October Ave 249",
      building: "Lophitis Business Center 1, Office 201",
      city: "Limassol",
      postalCode: "3035",
      country: "Cyprus",
      full: "28 October Ave 249, Lophitis Business Center 1, Office 201, 3035 Limassol, Cyprus"
    },
    registered: {
      street: "Agiou Andreou 241",
      building: "AG TRIAS COURT, Flat/Office 31",
      city: "Limassol", 
      postalCode: "3036",
      country: "Cyprus",
      full: "Agiou Andreou 241, AG TRIAS COURT, Flat/Office 31, 3036 Limassol, Cyprus"
    }
  },
  registration: {
    companyNumber: "HE 477423",
    tin: "60187188Q",
    country: "Cyprus"
  },
  contacts: {
    businessDevelopment: {
      name: "Alexander Papacosta",
      title: "Business Development Manager",
      email: "alexander.papacosta@lighthief.com",
      phone: "+357 99 164 158"
    },
    investors: {
      name: "Akradiusz Sybaris",
      title: "Investor Relations & Partnership Director",
      email: "a.sybaris@lighthief.com",
      phone: "+357 95 152 788",
      description: "Contact for investors and potential partners"
    }
  }
} as const

// SEO Constants
export const SEO_CONFIG = {
  siteName: "SolarFarms.cy",
  siteUrl: "https://solarfarms.cy",
  defaultTitle: "SolarFarms.cy - Premium Cyprus Solar Investment Platform",
  defaultDescription: "Invest in Cyprus solar farms with 15-20% ROI. Premium returns in Europe's sunniest climate with Lighthief Cyprus.",
  defaultKeywords: [
    "Cyprus solar investment",
    "solar farm ROI Cyprus",
    "renewable energy investment Cyprus",
    "solar PV investment opportunities",
    "Lighthief Cyprus",
    "solar farm returns",
    "Cyprus renewable energy",
  ],
  twitterHandle: "@SolarFarmsCy",
  facebookPage: "SolarFarmsCyprus",
  linkedinPage: "lighthief-cyprus",
} as const

// Cyprus Cities for Programmatic SEO
export const CYPRUS_CITIES = [
  {
    name: "Nicosia",
    slug: "nicosia",
    population: 330000,
    description: "Cyprus's capital city with excellent solar potential",
  },
  {
    name: "Limassol",
    slug: "limassol",
    population: 235000,
    description: "Major commercial hub with premium solar opportunities",
  },
  {
    name: "Paphos",
    slug: "paphos",
    population: 62000,
    description: "Tourist destination with high solar irradiation",
  },
  {
    name: "Larnaca",
    slug: "larnaca",
    population: 85000,
    description: "Strategic location with excellent grid connectivity",
  },
  {
    name: "Famagusta",
    slug: "famagusta",
    population: 70000,
    description: "Emerging market with untapped solar potential",
  },
] as const

// Navigation Menu
export const NAVIGATION = {
  main: [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Energy Storage", href: "/energy-storage" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  crypto: [
    { name: "Crypto Investments", href: "/crypto" },
    { name: "Solar BTC Mining", href: "/crypto/solar-mining" },
    { name: "AI GPU Mining", href: "/crypto/ai-mining" },
  ],
  energyStorage: [
    { name: "BESS Solutions", href: "/energy-storage" },
    { name: "Linyang Systems", href: "/energy-storage#systems" },
    { name: "O&M Services", href: "/energy-storage#om-services" },
    { name: "Get BESS Quote", href: "/energy-storage#inquiry-form" },
  ],
  services: [
    { name: "EPC Services", href: "/services/epc-services" },
    { name: "O&M Management", href: "/services/om-management" },
    { name: "Energy Storage", href: "/energy-storage" },
    { name: "Asset Optimization", href: "/services/asset-optimization" },
    { name: "Lifecycle Support", href: "/services/lifecycle-support" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
  resources: [
    { name: "ROI Calculator", href: "/calculator" },
    { name: "Generate LOI", href: "/loi" },
    { name: "Investment Guides", href: "/resources" },
    { name: "Blog & Insights", href: "/blog" },
    { name: "Landowners", href: "/landowners" },
  ],
} as const

// Form Validation
export const FORM_LIMITS = {
  name: { min: 2, max: 50 },
  email: { max: 254 },
  phone: { min: 10, max: 15 },
  message: { min: 10, max: 1000 },
  company: { max: 100 },
} as const

// Investment Form Options
export const INVESTMENT_OPTIONS = [
  "€500K - €1M",
  "€1M - €5M",
  "€5M - €10M",
  "€10M+",
] as const

export const TIMELINE_OPTIONS = [
  "Within 3 months",
  "3-6 months",
  "6-12 months",
  "12+ months",
] as const

// Analytics Events
export const ANALYTICS_EVENTS = {
  CALCULATOR_USED: "calculator_used",
  GUIDE_DOWNLOADED: "guide_downloaded",
  CONSULTATION_REQUESTED: "consultation_requested",
  NEWSLETTER_SUBSCRIBED: "newsletter_subscribed",
  CONTACT_FORM_SUBMITTED: "contact_form_submitted",
} as const

// Cyprus Market Defaults (2024-2025 Data) - All Editable in Calculator
export const CYPRUS_MARKET_DEFAULTS = {
  // Revenue rates
  daytimeSellingRate: 0.190,      // €/kWh - Average merchant rate during solar hours
  nightDischargeRate: 0.210,      // €/kWh - Evening peak rate (19-21c typical)
  ppaFixedRate: 0.150,            // €/kWh - Typical fixed PPA rate
  
  // Curtailment (based on real 2024-2025 data)
  curtailmentRate: 0.258,         // 25.8% - 2024 Cyprus average
  curtailedEnergyRate: 0.00,      // €/kWh - Rate paid for curtailed energy
  curtailmentCompensation: 0.00,  // % compensated under PPA
  
  // Production
  annualYield: 1650,              // kWh/kWp - Cyprus typical (1,500-1,800)
  capacityFactor: 0.22,           // 22% - Cyprus conditions
  annualDegradation: 0.005,       // 0.5% per year
  systemAvailability: 0.99,       // 99% uptime
  
  // Operating costs (based on real 5MW park data)
  omCostPerMW: 15000,             // €/MW/year - Lighthief O&M
  insurance: 5000,                // €/year
  landLease: 25000,               // €/year - Typical Cyprus lease
  administration: 30000,          // €/year - Management, accounting
  otherCosts: 10000,              // €/year - Miscellaneous
  
  // Financing
  interestRate: 0.045,            // 4.5% - Cyprus commercial loan
  loanTermYears: 15,              // Standard solar project term
  discountRate: 0.08,             // 8% for NPV
  solarOnlyDebtCapPerMW: 500000,  // €500k/MW max for solar-only
  solarBessDebtPct: 0.70,         // 70% for solar+BESS
} as const

// BESS Parameters (Linyang System Defaults via Lighthief Cyprus - includes 10% markup)
export const BESS_DEFAULTS = {
  // Linyang specifications
  roundTripEfficiency: 0.8839,    // 88.39% RTE
  warrantyYears: 15,              // Standard warranty
  cycleLife: 6000,                // Cycles at 80% DoD
  containerCapacity: 5.015,       // MWh per 20HC container
  
  // Pricing tiers (€/MWh installed, includes 10% Lighthief markup)
  pricing: {
    small: { minMW: 1, maxMW: 2, costPerMWh: 170000 },      // €165-175k/MWh
    medium: { minMW: 2.5, maxMW: 5, costPerMWh: 135000 },   // €125-145k/MWh
    large: { minMW: 8, maxMW: 25, costPerMWh: 110000 },     // €100-115k/MWh
    utility: { minMW: 25, maxMW: 100, costPerMWh: 105000 }, // €100-110k/MWh
  },
  
  // O&M costs (€/MWh/year based on LTSA)
  omCosts: {
    bessMaintenancePerMWh: 1157.62,  // BESS preventive & corrective
    pcsMaintenancePerMWh: 1311.97,   // PCS + MVS maintenance
    availabilityGuaranteePerMWh: 2201.73, // 97% availability (optional)
  },
  
  // Duration options (hours)
  durationOptions: [2, 3, 4] as const,
  defaultDuration: 4,             // 4-hour system default for utility scale
  
  // Operational parameters
  dailyCycles: 1.0,               // Cycles per day
  curtailmentRecoveryRate: 0.50,  // 50% of curtailed energy recoverable
  nightArbitragePremium: 0.105,   // 10.5% premium for evening discharge
  
  // Degradation
  annualCapacityLoss: 0.025,      // 2.5% per year
} as const

// Project Stage Options
export const PROJECT_STAGES = {
  RTB: { name: 'Ready-to-Build (RTB)', description: 'Permits approved, ready for construction' },
  CONSTRUCTION: { name: 'Under Construction', description: 'Currently being built' },
  OPERATIONAL: { name: 'Operational', description: 'Producing and selling energy' },
} as const

// Technology Options
export const TECHNOLOGY_TYPES = {
  FIXED: { name: 'Fixed-Tilt', yieldMultiplier: 1.0, costMultiplier: 1.0 },
  TRACKER: { name: 'Single-Axis Tracker', yieldMultiplier: 1.15, costMultiplier: 1.15 },
  BIFACIAL: { name: 'Bifacial + Tracker', yieldMultiplier: 1.25, costMultiplier: 1.25 },
} as const

// PPA Types
export const PPA_TYPES = {
  MERCHANT: { name: 'Merchant (Spot Market)', description: 'Sell at market rates' },
  FIXED: { name: 'Fixed PPA', description: 'Locked rate contract' },
  HYBRID: { name: 'Hybrid', description: 'Partial fixed, partial merchant' },
} as const
