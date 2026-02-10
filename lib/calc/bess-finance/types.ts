/**
 * BESS Finance Calculator - Type Definitions
 * 
 * Comprehensive type system for the Battery Energy Storage System
 * financial modeling calculator.
 * 
 * Enhanced to match eFinancialModels Excel functionality
 */

// ============================================
// ENUMS & CONSTANTS
// ============================================

export type CalculatorMode = 'standalone' | 'solar_bess'

export type BatteryChemistry = 'LFP' | 'NMC' | 'NCA'

export type PricingModel = 'merchant' | 'ppa' | 'hybrid'

export type FinancingType = 'cash' | 'debt' | 'mixed'

export type UsageModel = 'simplified' | 'hourly'

// NEW: Battery use modes (how the battery gets charged)
export type BatteryUseMode = 'excess_production' | 'solar_only' | 'price_arbitrage'

// NEW: Extended fading models (8 types like Excel)
export type FadingModelType = 
  | 'constant'           // Linear degradation
  | 'low_acceleration'   // Slight acceleration
  | 'medium_acceleration' // Moderate acceleration
  | 'high_acceleration'  // Aggressive acceleration
  | 'constant_recycling' // Linear with recycling
  | 'low_acceleration_recycling'
  | 'medium_acceleration_recycling'
  | 'high_acceleration_recycling'

// ============================================
// INPUT INTERFACES
// ============================================

export interface ProjectInputs {
  projectName: string
  mode: CalculatorMode
  currency: 'EUR' | 'USD' | 'GBP'
  forecastYears: number // Extended to 40 years max
  usageModel: UsageModel
  discountRate: number // WACC %
  inflationRate: number // Annual %
  
  // NEW: Construction phase
  constructionMonths: number
  constructionStartDate: string // ISO date
}

// NEW: Individual battery unit configuration
export interface BatteryUnitConfig {
  id: string
  name: string
  enabled: boolean
  capacityKWh: number
  chargingDurationHours: number
  dischargingDurationHours: number
  chargingSpeedKWhHour: number // Derived
  dischargingSpeedKWhHour: number // Derived
  roundTripEfficiency: number // %
  lifetimeMonths: number
  startMonth: number // When this battery comes online
  endMonth: number // When this battery is retired
  fadingModel: FadingModelType
  recyclingCost: number // Cost to recycle/replace
  recyclingMonthInterval: number // How often to recycle (0 = never)
}

export interface BatteryInputs {
  // NEW: Battery use mode
  useMode: BatteryUseMode
  
  // Primary battery (backwards compatible)
  capacityMWh: number
  durationHours: number // 2, 3, or 4 hours
  powerMW: number // Derived: capacityMWh / durationHours
  chemistry: BatteryChemistry
  roundTripEfficiency: number // % (87.8 system AC-AC for Linyang LFP)
  maxDoD: number // Max depth of discharge %
  minSoC: number // Min state of charge %
  dailyCycles: number
  annualDegradation: number // % capacity loss per year
  warrantyYears: number
  availability: number // % (97% with LTSA)
  
  // NEW: Extended fading model
  fadingModelType: FadingModelType
  baseFadeRate: number // % per year
  accelerationFactor: number // For accelerating models
  
  // NEW: Multi-battery support (up to 5)
  multiBatteryEnabled: boolean
  batteries: BatteryUnitConfig[]
}

// NEW: Individual solar phase configuration
export interface SolarPhaseConfig {
  id: string
  name: string
  enabled: boolean
  capacityKWp: number
  solarYieldKWhKWp: number
  efficiencyFactor: number // %
  capacityDecline: number // % per year
  startMonth: number // When this phase comes online
  endMonth: number // Project end
  constructionMonths: number
}

export interface SolarInputs {
  // Only used when mode === 'solar_bess'
  enabled: boolean
  pvCapacityMWp: number
  pvCapacityMWac: number // AC grid connection
  annualYieldKwhKwp: number // Specific yield (1650 Cyprus)
  pvDegradation: number // % per year
  capacityFactor: number // % (22% Cyprus)
  technologyType: 'fixed' | 'tracker' | 'bifacial_tracker'
  technologyMultiplier: number // 1.0, 1.15, 1.25
  
  // Curtailment
  curtailmentRate: number // % of production curtailed
  curtailmentCompensation: number // % compensated
  curtailmentRecoveryRate: number // % recoverable via BESS
  
  // NEW: Multi-phase solar support (up to 3)
  multiPhaseEnabled: boolean
  phases: SolarPhaseConfig[]
  
  // NEW: Monthly production share (12 values, sum = 100%)
  monthlyProductionShare: number[]
}

// NEW: Monthly price configuration
export interface MonthlyPriceConfig {
  month: number // 1-12
  purchasePrice: number // €/MWh or cents/kWh
  salesPrice: number // €/MWh or cents/kWh
  ppaPrice: number
  recPrice: number
}

export interface RevenueInputs {
  // Electricity prices (€/MWh)
  dayPrice: number // Daytime wholesale
  nightPrice: number // Evening peak
  arbitrageSpread: number // Calculated: nightPrice - dayPrice
  
  // For solar mode
  solarSellingRate: number // €/kWh
  curtailedEnergyRate: number // €/kWh compensation
  
  // Grid services (€/MW/year or €/MWh)
  frequencyRegulation: number
  spinningReserve: number
  voltageSupport: number
  capacityPayment: number
  
  // PPA (if applicable)
  ppaEnabled: boolean
  ppaRate: number // €/kWh
  ppaDuration: number // years
  ppaEscalation: number // % annual increase
  
  // NEW: REC (Renewable Energy Certificates)
  recEnabled: boolean
  recRate: number // €/kWh premium
  recDuration: number // years
  recEscalation: number // % annual increase
  
  // NEW: Battery Reserve (selling reserve capacity)
  batteryReserveEnabled: boolean
  batteryReservePrice: number // €/kWh/month
  
  // NEW: Electricity Savings (for consumption modeling)
  electricitySavingsEnabled: boolean
  
  // Other income
  otherIncome: number // €/year
  
  // Price escalation
  priceEscalation: number // % annual increase
  
  // NEW: Monthly price variations
  monthlyPricesEnabled: boolean
  monthlyPrices: MonthlyPriceConfig[]
}

export interface HourlyPriceCurve {
  hour: number // 0-23
  buyPrice: number // €/MWh
  sellPrice: number // €/MWh
}

// NEW: Monthly hourly price matrix (24h × 12 months)
export interface MonthlyHourlyPrices {
  month: number // 1-12
  hourlyPrices: HourlyPriceCurve[] // 24 values
}

export interface HourlyInputs {
  enabled: boolean
  priceCurve: HourlyPriceCurve[] // 24 values (default curve)
  consumptionPattern: number[] // 24 values, % of daily consumption
  chargeHours: number[] // Hours when charging is preferred
  dischargeHours: number[] // Hours when discharging is preferred
  
  // NEW: Monthly variations (24h × 12 months)
  monthlyVariationsEnabled: boolean
  monthlyHourlyPrices: MonthlyHourlyPrices[]
  
  // NEW: Production pattern (24h)
  productionPattern: number[] // 24 values, % of daily production
}

// NEW: Consumption modeling
export interface ConsumptionInputs {
  enabled: boolean
  annualConsumptionKWh: number
  yearlyGrowthRate: number // %
  monthlyBreakdown: number[] // 12 values, % of annual
  hourlyPattern: number[] // 24 values, % of daily
}

export interface CapexInputs {
  // BESS costs
  bessCostPerMWh: number // €/MWh installed (127k Linyang)
  bessSystemCost: number // Calculated: capacityMWh * costPerMWh
  pcsAndBos: number // % of BESS cost (included or separate)
  
  // Solar costs (when applicable)
  pvCostPerMWp: number // €/MWp turnkey
  pvSystemCost: number // Calculated
  
  // NEW: Detailed line items
  fixtures: number
  inverters: number
  transportInstallation: number
  
  // Other costs
  gridConnection: number
  development: number // RTB acquisition, permitting
  engineering: number
  contingency: number // % of subtotal
  
  // Working capital
  receivablesDays: number
  inventoryDays: number
  payablesDays: number
}

export interface OpexInputs {
  // BESS O&M (€/MWh/year based on LTSA)
  bessOmBasic: number // 2,470 basic
  bessOmPcs: number // PCS maintenance
  bessOmAvailability: number // 97% guarantee (optional)
  bessOmTotal: number // Calculated
  
  // Solar O&M (when applicable)
  pvOmPerMW: number // €/MW/year
  
  // Fixed costs
  insurance: number // % of CAPEX or fixed €
  landLease: number // €/year
  administration: number // €/year
  monitoring: number // €/year
  brokerFees: number // % of sales
  otherOpex: number // €/year
  
  // Battery replacement reserve
  replacementReserve: number // % of BESS capex per year
  
  // NEW: Additional O&M items
  cleaning: number // €/kWp/year
  repairsMaintenance: number // €/kWh
}

// NEW: Individual debt facility
export interface DebtFacilityConfig {
  id: string
  name: string
  enabled: boolean
  ltvPercent: number // % of total CAPEX
  amount: number // Calculated or manual
  interestRate: number // % annual
  termYears: number
  gracePeriodMonths: number
  repaymentType: 'linear' | 'annuity' | 'service_payment'
  drawdownStartMonth: number
  drawdownEndMonth: number
}

export interface FinancingInputs {
  type: FinancingType
  
  // Single debt (backwards compatible)
  ltvPercent: number // Loan-to-value %
  debtAmount: number // Calculated or manual
  interestRate: number // % annual
  loanTermYears: number
  gracePeriodMonths: number
  repaymentType: 'linear' | 'annuity' | 'sculpted'
  
  // Equity
  equityAmount: number // Calculated: CAPEX - Debt
  
  // Covenants
  minDscr: number // Minimum debt service coverage ratio
  maxLtv: number // Maximum loan-to-value
  minInterestCoverage: number
  
  // NEW: Multi-debt facility support (up to 3)
  multiDebtEnabled: boolean
  debtFacilities: DebtFacilityConfig[]
}

// NEW: Enhanced investor config
export interface InvestorConfig {
  id: string
  name: string
  equityPercent: number // % of total equity
  capitalContribution: number
  entryDate: string // ISO date
  exitDate?: string
  entryMonth: number // Month number from project start
  exitMonth: number // Month number for exit
  preferredReturnRate?: number
  
  // NEW: Equity stake changes
  preEquityPercent: number // Before any purchases/sales
  purchasedSoldPercent: number // +/- change
  postEquityPercent: number // After transactions
}

export interface InvestorInputs {
  investors: InvestorConfig[]
  dividendPolicy: 'fixed' | 'available_cash' | 'waterfall' | 'cash_sweep' | 'profit_share'
  preferredReturn: number // % for waterfall
  catchUpPercent: number // % for waterfall
  profitSplitDeveloper: number // % after catch-up
  
  // NEW: Dividend settings
  dividendStartYear: number // Year to start dividends
  cashSweepThreshold: number // Minimum cash before dividends
  profitSharePercent: number // % of net income
}

// NEW: Tax settings
export interface TaxInputs {
  enabled: boolean
  corporateTaxRate: number // %
  
  // Cyprus-specific
  taxHolidayYears: number
  
  // US-specific (optional)
  federalTaxEnabled: boolean
  federalTaxRate: number
  stateTaxEnabled: boolean
  stateTaxRate: number
  
  // Tax credits
  investmentTaxCreditEnabled: boolean
  investmentTaxCreditPercent: number
  investmentTaxCreditValidityYears: number
  
  productionTaxCreditEnabled: boolean
  productionTaxCreditPerKWh: number
  productionTaxCreditValidityYears: number
  
  taxLossCarryForwardEnabled: boolean
  taxLossCarryForwardYears: number
}

// Combined inputs
export interface BESSCalculatorInputs {
  project: ProjectInputs
  battery: BatteryInputs
  solar: SolarInputs
  revenue: RevenueInputs
  hourly: HourlyInputs
  capex: CapexInputs
  opex: OpexInputs
  financing: FinancingInputs
  investors: InvestorInputs
  
  // NEW: Additional input sections
  consumption: ConsumptionInputs
  tax: TaxInputs
}

// ============================================
// OUTPUT INTERFACES
// ============================================

export interface EnergyBalance {
  year: number
  month?: number
  
  // Solar (if applicable)
  solarProduction: number // MWh
  curtailedEnergy: number // MWh
  
  // Battery
  batteryCharge: number // MWh in
  batteryDischarge: number // MWh out
  batteryLosses: number // MWh (RTE losses)
  batteryCapacity: number // MWh (after degradation)
  batteryCapacityPercent: number // % of original
  
  // Grid
  gridExport: number // MWh sold
  gridImport: number // MWh purchased
  
  // Metrics
  cycleCount: number
  throughput: number // MWh total
  selfSufficiency: number // % (for solar+bess)
  
  // NEW: Consumption-based metrics
  consumption?: number // MWh consumed
  electricitySavings?: number // MWh saved vs grid purchase
}

export interface RevenueBreakdown {
  year: number
  month?: number
  
  // BESS revenues
  arbitrageRevenue: number
  gridServicesRevenue: number
  capacityPayments: number
  
  // Solar revenues (if applicable)
  solarRevenue: number
  curtailmentRecovery: number
  curtailmentCompensation: number
  
  // PPA
  ppaRevenue: number
  
  // NEW: REC revenue
  recRevenue: number
  
  // NEW: Battery Reserve revenue
  batteryReserveRevenue: number
  
  // NEW: Electricity Savings value
  electricitySavingsValue: number
  
  // Other
  otherRevenue: number
  
  // Totals
  totalRevenue: number
  revenuePerMWh: number // €/MWh throughput
}

export interface CostBreakdown {
  year: number
  
  // OPEX
  bessOm: number
  pvOm: number
  insurance: number
  landLease: number
  administration: number
  monitoring: number
  brokerFees: number
  otherOpex: number
  totalOpex: number
  
  // NEW: Battery recycling costs
  batteryRecyclingCost: number
  
  // Financing
  interestExpense: number
  principalRepayment: number
  debtService: number
}

export interface IncomeStatement {
  year: number
  
  // Revenue
  totalRevenue: number
  
  // NEW: Cost of sales (electricity purchases)
  electricityPurchases: number
  grossProfit: number
  grossProfitMargin: number // %
  
  // Operating costs
  totalOpex: number
  
  // EBITDA
  ebitda: number
  ebitdaMargin: number // %
  
  // Depreciation
  depreciation: number
  
  // EBIT
  ebit: number
  ebitMargin: number // %
  
  // Interest
  interestExpense: number
  
  // EBT
  ebt: number
  
  // Taxes
  taxExpense: number
  taxRate: number
  
  // NEW: Tax credits applied
  taxCreditsApplied: number
  
  // Net income
  netIncome: number
  netMargin: number // %
}

export interface CashFlowStatement {
  year: number
  
  // Operating
  netIncome: number
  depreciation: number
  workingCapitalChange: number
  operatingCashFlow: number
  
  // Investing
  capex: number
  batteryReplacement: number
  investingCashFlow: number
  
  // Financing
  debtDrawdown: number
  debtRepayment: number
  equityInjection: number
  dividends: number
  financingCashFlow: number
  
  // Net
  netCashFlow: number
  cumulativeCashFlow: number
  
  // Free cash flow
  fcfUnlevered: number
  fcfLevered: number
  
  // NEW: Cash position
  openingCash: number
  closingCash: number
}

export interface BalanceSheet {
  year: number
  
  // Assets
  cash: number
  receivables: number
  inventory: number
  currentAssets: number
  
  fixedAssets: number
  accumulatedDepreciation: number
  netFixedAssets: number
  
  totalAssets: number
  
  // Liabilities
  payables: number
  currentDebt: number
  currentLiabilities: number
  
  longTermDebt: number
  totalLiabilities: number
  
  // Equity
  paidInCapital: number
  retainedEarnings: number
  totalEquity: number
  
  // Check
  liabilitiesPlusEquity: number
  
  // NEW: Additional ratios
  netWorkingCapital: number
  investedCapital: number
}

export interface DebtMetrics {
  year: number
  
  openingBalance: number
  drawdown: number
  principalRepayment: number
  closingBalance: number
  interestExpense: number
  debtService: number
  
  // Ratios
  ltv: number // Loan-to-value
  dscr: number // Debt service coverage
  interestCoverage: number
  debtToEquity: number
  
  // NEW: Per-facility breakdown
  facilityBreakdown?: {
    facilityId: string
    facilityName: string
    openingBalance: number
    repayment: number
    interest: number
    closingBalance: number
  }[]
}

export interface InvestorMetrics {
  investorId: string
  investorName: string
  
  equityContribution: number
  totalDistributions: number
  netProceeds: number
  
  irr: number
  multiple: number // MOIC
  paybackYears: number
  
  cashFlows: number[] // Annual
  
  // NEW: Enhanced metrics
  cashOnCashYield: number // Average annual
  entryYear: number
  exitYear: number
  holdingPeriod: number
}

export interface ValuationMetrics {
  // NPV
  npvUnlevered: number
  npvLevered: number
  
  // IRR
  projectIrr: number // Unlevered
  equityIrr: number // Levered
  
  // Payback
  simplePayback: number // Years
  discountedPayback: number // Years
  
  // Value
  enterpriseValue: number
  equityValue: number
  
  // Per unit metrics
  evPerMWh: number
  evPerMW: number
  
  // NEW: LCOE
  lcoe: number // €/MWh - Levelized Cost of Energy
  
  // NEW: Relative metrics
  revenuePerKWp: number
  revenuePerKWh: number
  opexPerKWp: number
  opexPerKWh: number
  ebitdaPerKWp: number
  ebitdaPerKWh: number
}

export interface ModelChecks {
  energyBalanceCloses: boolean
  cashFlowBalances: boolean
  balanceSheetBalances: boolean
  covenantsBreach: boolean
  negativeEnergyFlows: boolean
  
  warnings: string[]
  errors: string[]
}

// Combined results
export interface BESSCalculatorResults {
  // Summary KPIs
  summary: {
    totalCapex: number
    equityRequired: number
    debtAmount: number
    
    year1Revenue: number
    year1Opex: number
    year1Ebitda: number
    year1NetProfit: number
    
    averageAnnualRevenue: number
    averageAnnualProfit: number
    
    lifetimeRevenue: number
    lifetimeProfit: number
    
    cashOnCashReturn: number
    projectIrr: number
    equityIrr: number
    npv: number
    paybackYears: number
    dscr: number
    equityMultiple: number
    
    // NEW: Additional KPIs
    lcoe: number
    selfSufficiency: number
    totalElectricitySavings: number
  }
  
  // Time series
  energyBalance: EnergyBalance[]
  revenue: RevenueBreakdown[]
  costs: CostBreakdown[]
  
  // Financial statements
  incomeStatements: IncomeStatement[]
  cashFlowStatements: CashFlowStatement[]
  balanceSheets: BalanceSheet[]
  
  // Debt & equity
  debtSchedule: DebtMetrics[]
  investorReturns: InvestorMetrics[]
  
  // Valuation
  valuation: ValuationMetrics
  
  // Validation
  checks: ModelChecks
  
  // Hourly (if enabled)
  hourlyAnalysis?: HourlyAnalysisResult
  
  // NEW: Battery capacity tracking per unit
  batteryCapacityTracking?: BatteryCapacityTracking[]
}

export interface HourlyAnalysisResult {
  typicalDayCharge: number[] // 24 values
  typicalDayDischarge: number[] // 24 values
  typicalDayPrice: number[] // 24 values
  monthlyArbitrage: number[] // 12 values
  annualOptimizedRevenue: number
  revenueUplift: number // vs simplified model
  
  // NEW: Monthly breakdown
  monthlyAnalysis?: {
    month: number
    chargeHours: number[]
    dischargeHours: number[]
    revenue: number
    avgBuyPrice: number
    avgSellPrice: number
  }[]
}

// NEW: Battery capacity tracking per unit
export interface BatteryCapacityTracking {
  batteryId: string
  batteryName: string
  yearlyCapacity: {
    year: number
    capacityKWh: number
    capacityPercent: number
    cycleCount: number
    isRecycled: boolean
  }[]
}

// ============================================
// CHART DATA INTERFACES
// ============================================

export interface ChartDataPoint {
  name: string
  value: number
  [key: string]: string | number
}

export interface CashFlowChartData {
  year: number
  revenue: number
  opex: number
  debtService: number
  netCashFlow: number
  cumulative: number
}

export interface EnergyChartData {
  year: number
  solarProduction: number
  batteryCharge: number
  batteryDischarge: number
  curtailed: number
  gridExport: number
  consumption?: number
  selfSufficiency?: number
}

export interface DegradationChartData {
  year: number
  capacity: number
  capacityPercent: number
  // NEW: Per-battery tracking
  batteries?: {
    id: string
    name: string
    capacity: number
    capacityPercent: number
  }[]
}

export interface RevenueChartData {
  name: string
  value: number
  percentage: number
  color: string
}

// NEW: Debt/LTV chart data
export interface DebtLtvChartData {
  year: number
  financialDebt: number
  ltv: number
  dscr: number
}

// NEW: DSCR chart data
export interface DscrChartData {
  year: number
  interestPaid: number
  debtRepayment: number
  unleveredFcf: number
  dscr: number
}

// ============================================
// DEFAULTS
// ============================================

const DEFAULT_BATTERY_UNIT: BatteryUnitConfig = {
  id: 'battery-1',
  name: 'Battery 1',
  enabled: true,
  capacityKWh: 500,
  chargingDurationHours: 2,
  dischargingDurationHours: 2,
  chargingSpeedKWhHour: 250,
  dischargingSpeedKWhHour: 250,
  roundTripEfficiency: 80,
  lifetimeMonths: 84,
  startMonth: 7,
  endMonth: 90,
  fadingModel: 'low_acceleration',
  recyclingCost: 0,
  recyclingMonthInterval: 0,
}

const DEFAULT_SOLAR_PHASE: SolarPhaseConfig = {
  id: 'phase-1',
  name: 'Phase 1',
  enabled: true,
  capacityKWp: 500,
  solarYieldKWhKWp: 1350,
  efficiencyFactor: 100,
  capacityDecline: 0.5,
  startMonth: 7,
  endMonth: 306,
  constructionMonths: 6,
}

const DEFAULT_DEBT_FACILITY: DebtFacilityConfig = {
  id: 'loan-a',
  name: 'Loan A',
  enabled: true,
  ltvPercent: 60,
  amount: 0,
  interestRate: 4.0,
  termYears: 15,
  gracePeriodMonths: 3,
  repaymentType: 'annuity',
  drawdownStartMonth: 1,
  drawdownEndMonth: 6,
}

const DEFAULT_MONTHLY_PRODUCTION = [6, 7, 8, 9, 10, 11, 10.5, 9.5, 8.5, 7.5, 7, 6] // % per month

const DEFAULT_HOURLY_CONSUMPTION = [
  4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2,
  4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2
] // ~4.2% per hour = 100% / 24

export const BESS_CALCULATOR_DEFAULTS: BESSCalculatorInputs = {
  project: {
    projectName: '',
    mode: 'standalone',
    currency: 'EUR',
    forecastYears: 25,
    usageModel: 'simplified',
    discountRate: 8,
    inflationRate: 2,
    constructionMonths: 6,
    constructionStartDate: new Date().toISOString().split('T')[0],
  },
  
  battery: {
    useMode: 'price_arbitrage',
    capacityMWh: 10,
    durationHours: 4,
    powerMW: 2.5,
    chemistry: 'LFP',
    roundTripEfficiency: 87.8, // System RTE AC-AC (from linyang.md)
    maxDoD: 90,
    minSoC: 10,
    dailyCycles: 1,
    annualDegradation: 2.5,
    warrantyYears: 15, // With LTSA (base OEM is 5 years)
    availability: 97, // With LTSA (95% without)
    fadingModelType: 'constant',
    baseFadeRate: 2.5,
    accelerationFactor: 0,
    multiBatteryEnabled: false,
    batteries: [
      { ...DEFAULT_BATTERY_UNIT, id: 'battery-1', name: 'Battery 1' },
      { ...DEFAULT_BATTERY_UNIT, id: 'battery-2', name: 'Battery 2', enabled: false, startMonth: 91 },
      { ...DEFAULT_BATTERY_UNIT, id: 'battery-3', name: 'Battery 3', enabled: false, startMonth: 175 },
      { ...DEFAULT_BATTERY_UNIT, id: 'battery-4', name: 'Battery 4', enabled: false, startMonth: 187 },
      { ...DEFAULT_BATTERY_UNIT, id: 'battery-5', name: 'Battery 5', enabled: false, startMonth: 199 },
    ],
  },
  
  solar: {
    enabled: false,
    pvCapacityMWp: 5,
    pvCapacityMWac: 4.6,
    annualYieldKwhKwp: 1650,
    pvDegradation: 0.5,
    capacityFactor: 22,
    technologyType: 'tracker',
    technologyMultiplier: 1.15,
    curtailmentRate: 25.8,
    curtailmentCompensation: 0,
    curtailmentRecoveryRate: 50,
    multiPhaseEnabled: false,
    phases: [
      { ...DEFAULT_SOLAR_PHASE, id: 'phase-1', name: 'Phase 1' },
      { ...DEFAULT_SOLAR_PHASE, id: 'phase-2', name: 'Phase 2', enabled: false, startMonth: 51 },
      { ...DEFAULT_SOLAR_PHASE, id: 'phase-3', name: 'Phase 3', enabled: false, startMonth: 110 },
    ],
    monthlyProductionShare: DEFAULT_MONTHLY_PRODUCTION,
  },
  
  revenue: {
    dayPrice: 110,
    nightPrice: 160,
    arbitrageSpread: 50,
    solarSellingRate: 0.19,
    curtailedEnergyRate: 0,
    frequencyRegulation: 0,
    spinningReserve: 0,
    voltageSupport: 0,
    capacityPayment: 0,
    ppaEnabled: false,
    ppaRate: 0.15,
    ppaDuration: 15,
    ppaEscalation: 1,
    recEnabled: false,
    recRate: 0.04,
    recDuration: 20,
    recEscalation: 4,
    batteryReserveEnabled: false,
    batteryReservePrice: 2.00,
    electricitySavingsEnabled: false,
    otherIncome: 0,
    priceEscalation: 2,
    monthlyPricesEnabled: false,
    monthlyPrices: Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      purchasePrice: 20,
      salesPrice: 12,
      ppaPrice: 7,
      recPrice: 4,
    })),
  },
  
  hourly: {
    enabled: false,
    priceCurve: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      buyPrice: i >= 10 && i <= 16 ? 80 : i >= 18 && i <= 21 ? 160 : 100,
      sellPrice: i >= 10 && i <= 16 ? 90 : i >= 18 && i <= 21 ? 170 : 110,
    })),
    consumptionPattern: DEFAULT_HOURLY_CONSUMPTION,
    chargeHours: [10, 11, 12, 13, 14, 15],
    dischargeHours: [18, 19, 20, 21],
    monthlyVariationsEnabled: false,
    monthlyHourlyPrices: Array.from({ length: 12 }, (_, month) => ({
      month: month + 1,
      hourlyPrices: Array.from({ length: 24 }, (_, hour) => ({
        hour,
        buyPrice: hour >= 10 && hour <= 16 ? 80 : hour >= 18 && hour <= 21 ? 160 : 100,
        sellPrice: hour >= 10 && hour <= 16 ? 90 : hour >= 18 && hour <= 21 ? 170 : 110,
      })),
    })),
    productionPattern: [
      0, 0, 0, 0, 0, 0, 2, 6, 10, 12, 14, 14, 14, 12, 10, 6, 2, 0, 0, 0, 0, 0, 0, 0
    ], // Solar production pattern (peaks at noon)
  },
  
  consumption: {
    enabled: false,
    annualConsumptionKWh: 500000,
    yearlyGrowthRate: 1,
    monthlyBreakdown: [7, 7, 8, 8, 9, 11, 10, 9, 8, 8, 8, 7], // % per month
    hourlyPattern: DEFAULT_HOURLY_CONSUMPTION,
  },
  
  capex: {
    // BESS Client Pricing: ~€135/kWh (Non-Group) or ~€111-121/kWh (Group)
    // Includes: CIF + EPC adders + 15% CIF margin + 15% EPC margin + public markup (12%)
    // See docs/internal/solarpark-epc.md for detailed breakdown
    bessCostPerMWh: 135000,
    bessSystemCost: 1370000,
    pcsAndBos: 0,
    // PV Client Pricing: Self-cost + €100k/MW flat markup
    // At 5MWp: €540k self-cost + €100k markup = €640k/MWp client
    // At 10MWp: €510k self-cost + €100k markup = €610k/MWp client
    pvCostPerMWp: 640000, // Client price for ~5MWp scale
    pvSystemCost: 0,
    fixtures: 0,
    inverters: 0,
    transportInstallation: 0,
    gridConnection: 50000,
    development: 0,
    engineering: 0,
    contingency: 5,
    receivablesDays: 30,
    inventoryDays: 0,
    payablesDays: 30,
  },
  
  opex: {
    bessOmBasic: 2470,
    bessOmPcs: 0,
    bessOmAvailability: 2200,
    bessOmTotal: 2470,
    pvOmPerMW: 15000,
    insurance: 0.5,
    landLease: 10000,
    administration: 10000,
    monitoring: 5000,
    brokerFees: 2.5,
    otherOpex: 0,
    replacementReserve: 0,
    cleaning: 0.25,
    repairsMaintenance: 0.25,
  },
  
  financing: {
    type: 'mixed',
    ltvPercent: 70,
    debtAmount: 0,
    interestRate: 4.5,
    loanTermYears: 15,
    gracePeriodMonths: 6,
    repaymentType: 'annuity',
    equityAmount: 0,
    minDscr: 1.2,
    maxLtv: 80,
    minInterestCoverage: 2,
    multiDebtEnabled: false,
    debtFacilities: [
      { ...DEFAULT_DEBT_FACILITY, id: 'loan-a', name: 'Loan A', ltvPercent: 60 },
      { ...DEFAULT_DEBT_FACILITY, id: 'loan-b', name: 'Loan B', ltvPercent: 20, interestRate: 5.0, termYears: 10, enabled: false },
      { ...DEFAULT_DEBT_FACILITY, id: 'equipment', name: 'Equipment Finance', ltvPercent: 0, interestRate: 6.0, termYears: 5, enabled: false },
    ],
  },
  
  investors: {
    investors: [
      {
        id: 'developer',
        name: 'Developer',
        equityPercent: 20,
        capitalContribution: 0,
        entryDate: new Date().toISOString().split('T')[0],
        entryMonth: 1,
        exitMonth: 306,
        preEquityPercent: 100,
        purchasedSoldPercent: -80,
        postEquityPercent: 20,
      },
      {
        id: 'investor-2',
        name: 'Investor 2',
        equityPercent: 80,
        capitalContribution: 0,
        entryDate: new Date().toISOString().split('T')[0],
        entryMonth: 1,
        exitMonth: 306,
        preEquityPercent: 0,
        purchasedSoldPercent: 80,
        postEquityPercent: 80,
      },
      {
        id: 'investor-3',
        name: 'Investor 3',
        equityPercent: 0,
        capitalContribution: 0,
        entryDate: new Date().toISOString().split('T')[0],
        entryMonth: 1,
        exitMonth: 306,
        preEquityPercent: 0,
        purchasedSoldPercent: 0,
        postEquityPercent: 0,
      },
      {
        id: 'investor-4',
        name: 'Investor 4',
        equityPercent: 0,
        capitalContribution: 0,
        entryDate: new Date().toISOString().split('T')[0],
        entryMonth: 1,
        exitMonth: 306,
        preEquityPercent: 0,
        purchasedSoldPercent: 0,
        postEquityPercent: 0,
      },
      {
        id: 'investor-5',
        name: 'Investor 5',
        equityPercent: 0,
        capitalContribution: 0,
        entryDate: new Date().toISOString().split('T')[0],
        entryMonth: 1,
        exitMonth: 306,
        preEquityPercent: 0,
        purchasedSoldPercent: 0,
        postEquityPercent: 0,
      },
    ],
    dividendPolicy: 'available_cash',
    preferredReturn: 8,
    catchUpPercent: 20,
    profitSplitDeveloper: 20,
    dividendStartYear: 5,
    cashSweepThreshold: 200000,
    profitSharePercent: 30,
  },
  
  tax: {
    enabled: true,
    corporateTaxRate: 12.5, // Cyprus rate
    taxHolidayYears: 0,
    federalTaxEnabled: false,
    federalTaxRate: 21,
    stateTaxEnabled: false,
    stateTaxRate: 10,
    investmentTaxCreditEnabled: false,
    investmentTaxCreditPercent: 30,
    investmentTaxCreditValidityYears: 5,
    productionTaxCreditEnabled: false,
    productionTaxCreditPerKWh: 0.05,
    productionTaxCreditValidityYears: 7,
    taxLossCarryForwardEnabled: false,
    taxLossCarryForwardYears: 12,
  },
}

// ============================================
// UTILITY TYPES
// ============================================

export type CalculatorSection = 
  | 'project'
  | 'battery'
  | 'solar'
  | 'revenue'
  | 'capex'
  | 'opex'
  | 'financing'
  | 'investors'
  | 'hourly'
  | 'consumption'
  | 'tax'

export interface CalculatorTab {
  id: CalculatorSection
  label: string
  icon: string
  enabled: boolean
}

export interface SavedScenario {
  id: string
  projectName: string
  scenarioName: string
  mode: CalculatorMode
  inputs: BESSCalculatorInputs
  results?: BESSCalculatorResults
  createdAt: string
  updatedAt: string
  isLocked: boolean
  userEmail: string
}

export interface PDFUnlock {
  email: string
  scenarioId?: string
  unlockedAt: string
}

// ============================================
// FADING MODEL CONFIGURATIONS
// ============================================

export const FADING_MODEL_CONFIGS: Record<FadingModelType, {
  label: string
  baseFadeRate: number
  accelerationFactor: number
  recyclingEnabled: boolean
  recyclingInterval: number // months
}> = {
  constant: {
    label: 'Constant (Linear)',
    baseFadeRate: 1.5,
    accelerationFactor: 0,
    recyclingEnabled: false,
    recyclingInterval: 0,
  },
  low_acceleration: {
    label: 'Low Acceleration',
    baseFadeRate: 1.5,
    accelerationFactor: 0.25,
    recyclingEnabled: false,
    recyclingInterval: 0,
  },
  medium_acceleration: {
    label: 'Medium Acceleration',
    baseFadeRate: 1.5,
    accelerationFactor: 0.5,
    recyclingEnabled: false,
    recyclingInterval: 0,
  },
  high_acceleration: {
    label: 'High Acceleration',
    baseFadeRate: 1.5,
    accelerationFactor: 1.0,
    recyclingEnabled: false,
    recyclingInterval: 0,
  },
  constant_recycling: {
    label: 'Constant + Recycling',
    baseFadeRate: 1.5,
    accelerationFactor: 0,
    recyclingEnabled: true,
    recyclingInterval: 60,
  },
  low_acceleration_recycling: {
    label: 'Low Acceleration + Recycling',
    baseFadeRate: 1.5,
    accelerationFactor: 0.25,
    recyclingEnabled: true,
    recyclingInterval: 24,
  },
  medium_acceleration_recycling: {
    label: 'Medium Acceleration + Recycling',
    baseFadeRate: 1.5,
    accelerationFactor: 0.5,
    recyclingEnabled: true,
    recyclingInterval: 24,
  },
  high_acceleration_recycling: {
    label: 'High Acceleration + Recycling',
    baseFadeRate: 1.5,
    accelerationFactor: 1.0,
    recyclingEnabled: true,
    recyclingInterval: 24,
  },
}

// ============================================
// BATTERY USE MODE DESCRIPTIONS
// ============================================

export const BATTERY_USE_MODE_INFO: Record<BatteryUseMode, {
  label: string
  description: string
}> = {
  excess_production: {
    label: 'Excess Production',
    description: 'Only excess electricity produced from the solar farm will be used to charge the battery.',
  },
  solar_only: {
    label: 'Solar Only',
    description: 'Only solar electricity will be stored in the battery. Allows for higher volumes.',
  },
  price_arbitrage: {
    label: 'Price Arbitrage',
    description: 'Battery can be charged from the grid when prices are low, enabling buy-low-sell-high trading.',
  },
}
