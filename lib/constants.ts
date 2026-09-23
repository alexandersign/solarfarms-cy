import {
  PUBLIC_HYBRID,
  PUBLIC_INVESTMENT_SIZES,
  publicPvSidePerMW,
} from './public-hybrid-ssot'

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

// Capex Modes — public EPC (20% on self-cost €500k fixed / €650k tracker)
// All-in turnkey below is PV + RTB + EAC connection (BESS extra at 4h × €125k/MWh)
export const CAPEX_MODES = {
  'epc-dev': {
    name: 'EPC Development',
    pricePerMW: PUBLIC_HYBRID.pvEpcPublicFixedPerMW,
    description: `Fixed-tilt public EPC — €${PUBLIC_HYBRID.pvEpcPublicFixedPerMW / 1000}k/MW`,
    financingCap: 500000,
    selfCostPerMW: PUBLIC_HYBRID.pvEpcSelfFixedPerMW,
    epcMarkupPerMW: PUBLIC_HYBRID.pvEpcPublicFixedPerMW - PUBLIC_HYBRID.pvEpcSelfFixedPerMW,
  },
  'turnkey': {
    name: 'Turnkey New Build',
    pricePerMW: publicPvSidePerMW('fixed'),
    description: `Fixed PV + RTB + connection — €${publicPvSidePerMW('fixed') / 1000}k/MW (BESS extra)`,
    financingCap: 500000,
  },
  'rtb-old': {
    name: 'RTB Park (Fixed-Tilt)',
    pricePerMW: publicPvSidePerMW('fixed'),
    description: `Fixed bifacial public stack — €${publicPvSidePerMW('fixed') / 1000}k/MW`,
    financingCap: 500000,
  },
  'rtb-new': {
    name: 'RTB Park (Tracking)',
    pricePerMW: publicPvSidePerMW('tracker'),
    description: `2P tracker public stack — €${publicPvSidePerMW('tracker') / 1000}k/MW`,
    financingCap: 500000,
  },
} as const

/** 1 / 5 / 10 MW + 4h BESS public all-in (fixed min → tracker max) */
export const INVESTMENT_SIZES = PUBLIC_INVESTMENT_SIZES

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
  founded: "2015", // Nearly a decade ago
  incorporatedCyprus: "July 1, 2025",
  founders: ["Dr. Arkadius Sybaris"],
  headquarters: "Limassol, Cyprus",
  globalHQ: "Częstochowa, Poland",
  businessModel: "European-Asian renewable energy O&M operator with comprehensive EPC services",
  evolution: "Polish-British startup → Pan-European operator → 11 countries across Europe and Asia",
  specialization: "Solar, wind, biogas O&M and EPC services across the entire project lifecycle",
  offices: "11 countries: Poland, Cyprus, Greece, Italy, Spain, Germany, Netherlands, Kazakhstan, Uzbekistan, Romania, Ukraine",
  countries: ["Poland", "Cyprus", "Greece", "Italy", "Spain", "Germany", "Netherlands", "Kazakhstan", "Uzbekistan", "Romania", "Ukraine"],
  assetsManaged: "Hundreds of MW across solar, wind, and biogas",
  teamSize: "150+",
  certifications: ["NATO Certified", "EU Grants Recipient"],
  rdCenter: {
    location: "Częstochowa, Poland",
    size: "23 hectares",
    facilities: ["2×8 MW PV farm", "1 MW biogas plant", "BESS systems", "1,000 m² office", "3,500 m² warehouse"]
  },
  constructionCostPerMW: {
    min: PUBLIC_HYBRID.pvEpcPublicFixedPerMW,
    max: PUBLIC_HYBRID.pvEpcPublicTrackerPerMW,
  },
  rtbCostPerMW: {
    min: PUBLIC_HYBRID.rtbPerMW,
    max: PUBLIC_HYBRID.rtbPerMW,
  },
  address: {
    office: {
      street: "15 Agaritsis",
      building: "Nektaria Court, Office 201",
      city: "Limassol",
      postalCode: "3045",
      country: "Cyprus",
      full: "15 Agaritsis, Nektaria Court, Office 201, 3045 Zakaki, Limassol, Cyprus"
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
    /** Cyprus Social Insurance employer registry (Α.Μ.Ε.) */
    employerAME: "3520458/5/4329",
    country: "Cyprus"
  },
  contacts: {
    ceo: {
      name: "Dr. Arkadius Sybaris",
      title: "Founder & CEO",
      email: "a.sybaris@lighthief.com",
      markets: ["Poland", "UK", "Kazakhstan", "Uzbekistan", "Ukraine", "Romania"],
      description: "Investor relations and new market development"
    },
    cyprusDirector: {
      name: "Alexander Papacosta",
      title: "Cyprus Director",
      email: "office@lighthief.com",
      phone: "+357 99 164 158",
      markets: ["Cyprus", "Greece"],
      description: "Cyprus & Greece operations, BESS, crypto/AI integration"
    },
    engineer: {
      name: "Costas Hadjikyriacou",
      title: "Electrical Engineer (ETEK)",
      email: "costas@lighthief.com",
      markets: ["Cyprus"],
      description: "PV systems design, installation, and O&M"
    },
    polandDirector: {
      name: "Maciej Krzyżanowski",
      title: "Poland Director",
      email: "m.krzyzanowski@lighthief.com",
      markets: ["Poland"],
      description: "Polish operations, EPC, BESS division"
    },
    italyDirector: {
      name: "Maurizio Ganis",
      title: "Italy Director",
      email: "m.ganis@lighthief.com",
      markets: ["Italy"],
      description: "Italian market, institutional investors"
    }
  },
  monitoringCenters: ["Częstochowa (Poland)", "Hannover (Germany)", "Trieste (Italy)", "Malaga (Spain)"]
} as const

// SEO Constants
export const SEO_CONFIG = {
  siteName: "SolarFarms.cy",
  siteUrl: "https://solarfarms.cy",
  defaultTitle: "SolarFarms.cy - Premium Cyprus Solar Investment Platform",
  defaultDescription: "Invest in Cyprus solar farms and BESS with 8-12% equity IRR. Turnkey EPC, O&M, and bankable energy storage by Lighthief.",
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
    { name: "C&I Solar", href: "/commercial" },
    { name: "Energy Storage", href: "/energy-storage" },
    { name: "Market Data", href: "/market" },
    { name: "Projects", href: "/projects" },
    { name: "Landowners", href: "/landowners" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  desktop: [
    { name: "C&I", href: "/commercial" },
    { name: "BESS", href: "/energy-storage" },
    { name: "Projects", href: "/projects" },
    { name: "Land", href: "/landowners" },
    { name: "Blog", href: "/blog" },
  ],
  crypto: [
    { name: "Crypto Investments", href: "/crypto" },
    { name: "Solar BTC Mining", href: "/crypto/solar-mining" },
    { name: "AI GPU Mining", href: "/crypto/ai-mining" },
  ],
  energyStorage: [
    { name: "BESS Solutions", href: "/energy-storage" },
    { name: "BESS ROI Calculator", href: "/energy-storage/calculator" },
    { name: "Cyprus Market Pricing", href: "/market" },
    { name: "Linyang Systems", href: "/energy-storage#systems" },
    { name: "O&M Services", href: "/energy-storage#om-services" },
    { name: "Get BESS Quote", href: "/energy-storage#inquiry-form" },
  ],
  services: [
    { name: "EPC Services", href: "/services/epc-services" },
    { name: "C&I Solar", href: "/commercial" },
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
    { name: "Cyprus Market Pricing", href: "/market" },
    { name: "Generate LOI", href: "/loi" },
    { name: "Investment Guide", href: "/investment-guide" },
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
  GENERATE_LEAD: "generate_lead",
  BESS_CALCULATOR_PDF_UNLOCK: "bess_calculator_pdf_unlock",
} as const

// Cyprus Market Defaults — COMPLETE DATASET (Oct 1, 2025 – Sep 4, 2026)
// Source: 339 TSOC DAM Excel files, 62,670 half-hourly records
// VERIFIED from: https://tsoc.org.cy/competitive-electricity-market/mms-reports/day-ahead-market-daily-activity-reports-en/
// Live SSOT: lib/market/cyprus-tsoc-dam-sample.ts
//
// KEY METRICS (339 days):
//   Overall avg MCP:    €200.23/MWh (half-hourly mean, zeros excluded)
//   Midday (10-14):     €104.55/MWh  ← deep in Apr–May; summer 2026 much higher
//   Peak evening (17-21): €212.42/MWh
//   Peak-Midday Spread: €107.88/MWh  ← BESS opportunity
//   Solar hours (06-17): €151.38/MWh
//
// Seasonal: Apr–May 2026 midday often near zero; Jul–early Sep 2026 duck curve flattened.
//
// ⚠️ REGULATORY NOTE: BESS CANNOT buy electricity from the DAM grid yet.
// DAM arbitrage (buy at solar hours, sell at peak) is NOT YET legal in Cyprus.
// Current BESS revenue model: CURTAILMENT RECOVERY ONLY
//   → Store otherwise-curtailed solar energy (charge cost = €0)
//   → Discharge at evening peak prices (€212/MWh)
//   → Revenue per MWh discharged: €183.40/MWh (at 86.32% RTE)
//
export const CYPRUS_MARKET_DEFAULTS = {
  // Revenue rates (VERIFIED Sep 2026 from 339-day complete TSOC DAM dataset, Oct 2025–Sep 2026)
  daytimeSellingRate: 0.151,      // €/kWh - Solar hours avg €151.38/MWh (06:00-17:00)
  middayRate: 0.105,              // €/kWh - Midday avg €104.55/MWh (10:00-14:00)
  nightDischargeRate: 0.212,      // €/kWh - Evening peak avg €212.42/MWh (BESS discharge price)
  ppaFixedRate: 0.150,            // €/kWh - Typical fixed PPA rate
  wholesaleAvgRate: 0.200,        // €/kWh - Overall avg MCP €200.23/MWh
  
  // Curtailment — public hybrid underwrite (Avdellero / 2027 merchant case)
  curtailmentRate: 0.50,
  curtailedEnergyRate: 0.00,      // €/kWh - Rate paid for curtailed energy
  curtailmentCompensation: 0.00,  // % compensated under PPA
  
  // Production — public SSOT (fixed bifacial). Tracker uses TECHNOLOGY_TYPES multiplier.
  annualYield: PUBLIC_HYBRID.yieldFixedKwhKwp,
  capacityFactor: PUBLIC_HYBRID.yieldFixedKwhKwp / 8760,
  annualDegradation: 0.005,       // 0.5% per year
  systemAvailability: 0.99,       // 99% uptime
  
  // Operating costs — public O&M
  omCostPerMW: PUBLIC_HYBRID.pvOmPerMW,
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

// BESS Parameters (Tier-1 OEM System Defaults via Lighthief Cyprus)
// BESS Margin Structure: 15% on CIF (equipment) + 15% on EPC costs
// See docs/internal/solarpark-epc.md for detailed breakdown
export const BESS_DEFAULTS = {
  // OEM specifications
  roundTripEfficiency: 0.8632,    // 86.32% full system AC-AC RTE incl. cabling (PCS-level = 87.8%)
  warrantyYearsBase: 5,           // Base OEM warranty
  warrantyYearsWithLTSA: 15,      // Extended warranty with LTSA (Years 6-15 paid)
  cycleLife: 6000,                // Cycles at 100% DoD @ 80% SOH
  cycleLifeReducedDoD: 8000,      // Cycles at 90% DoD @ 70% SOH
  containerCapacity: 5.015,       // MWh per 20HC container (actual rated)
  
  // Client pricing tiers (€/MWh, includes 15% CIF margin + 15% EPC margin)
  // Self-cost → Client: CIF × 1.15 + EPC costs × 1.15
  pricing: {
    small: { minMW: 1, maxMW: 2, costPerMWh: 166000 },      // 4 MWh: ~€166k/MWh client
    medium: { minMW: 2.5, maxMW: 5, costPerMWh: 121000 },   // 10 MWh: ~€121k/MWh client
    large: { minMW: 8, maxMW: 25, costPerMWh: 111000 },     // 20 MWh: ~€111k/MWh client
    utility: { minMW: 25, maxMW: 100, costPerMWh: 108000 }, // 40+ MWh: ~€108k/MWh client
  },
  
  // EPC Markup structure
  epcMarkup: {
    cifMarginPercent: 15,          // CIF equipment: +15% margin
    epcCostsMarginPercent: 15,     // EPC installation costs: +15% margin
    pvMarkupPerMW: PUBLIC_HYBRID.pvEpcPublicFixedPerMW - PUBLIC_HYBRID.pvEpcSelfFixedPerMW,
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
  curtailmentRecoveryRate: 0.95,  // share of curtailed energy captured by 4h BESS
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
  FIXED: {
    name: 'Fixed-Tilt Bifacial',
    yieldMultiplier: 1.0,
    costMultiplier: 1.0,
  },
  TRACKER: {
    name: 'Single-Axis Tracker 2P Bifacial',
    yieldMultiplier: PUBLIC_HYBRID.yieldTrackerKwhKwp / PUBLIC_HYBRID.yieldFixedKwhKwp,
    costMultiplier: PUBLIC_HYBRID.pvEpcPublicTrackerPerMW / PUBLIC_HYBRID.pvEpcPublicFixedPerMW,
  },
  BIFACIAL: {
    name: 'Bifacial + Tracker',
    yieldMultiplier: PUBLIC_HYBRID.yieldTrackerKwhKwp / PUBLIC_HYBRID.yieldFixedKwhKwp,
    costMultiplier: PUBLIC_HYBRID.pvEpcPublicTrackerPerMW / PUBLIC_HYBRID.pvEpcPublicFixedPerMW,
  },
} as const

// PPA Types
export const PPA_TYPES = {
  MERCHANT: { name: 'Merchant (Spot Market)', description: 'Sell at market rates' },
  FIXED: { name: 'Fixed PPA', description: 'Locked rate contract' },
  HYBRID: { name: 'Hybrid', description: 'Partial fixed, partial merchant' },
} as const
