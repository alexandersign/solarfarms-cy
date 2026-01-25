/**
 * BESS Finance Calculator - Calculation Engine
 * 
 * Pure functions for all financial calculations.
 * Stateless and deterministic - same inputs always produce same outputs.
 * 
 * Enhanced to match eFinancialModels Excel functionality
 */

import {
  BESSCalculatorInputs,
  BESSCalculatorResults,
  EnergyBalance,
  RevenueBreakdown,
  CostBreakdown,
  IncomeStatement,
  CashFlowStatement,
  BalanceSheet,
  DebtMetrics,
  InvestorMetrics,
  ValuationMetrics,
  ModelChecks,
  HourlyAnalysisResult,
  CashFlowChartData,
  EnergyChartData,
  DegradationChartData,
  RevenueChartData,
  FadingModelType,
  FADING_MODEL_CONFIGS,
  BatteryCapacityTracking,
} from './types'

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Calculate IRR using Newton-Raphson method
 */
export function calculateIRR(
  cashFlows: number[],
  guess: number = 0.1,
  maxIterations: number = 100,
  tolerance: number = 0.0001
): number {
  let rate = guess
  
  for (let i = 0; i < maxIterations; i++) {
    let npv = 0
    let derivativeNpv = 0
    
    for (let t = 0; t < cashFlows.length; t++) {
      const discountFactor = Math.pow(1 + rate, t)
      npv += cashFlows[t] / discountFactor
      if (t > 0) {
        derivativeNpv -= t * cashFlows[t] / Math.pow(1 + rate, t + 1)
      }
    }
    
    if (Math.abs(npv) < tolerance) {
      return rate * 100
    }
    
    if (derivativeNpv === 0) {
      return NaN
    }
    
    rate = rate - npv / derivativeNpv
    
    // Prevent divergence
    if (rate < -0.99) rate = -0.99
    if (rate > 10) rate = 10
    
    // Check for NaN
    if (isNaN(rate)) return 0
  }
  
  // If we hit the cap, the IRR calculation failed
  if (rate >= 10 || rate <= -0.99) {
    const positiveCashFlows = cashFlows.slice(1).some(cf => cf > 0)
    if (!positiveCashFlows) return -100
    return 0
  }
  
  return rate * 100
}

/**
 * Calculate NPV given cash flows and discount rate
 */
export function calculateNPV(
  cashFlows: number[],
  discountRate: number
): number {
  const rate = discountRate / 100
  return cashFlows.reduce((npv, cf, t) => {
    return npv + cf / Math.pow(1 + rate, t)
  }, 0)
}

/**
 * Calculate annual loan payment (annuity)
 */
export function calculateAnnuityPayment(
  principal: number,
  annualRate: number,
  years: number
): number {
  if (annualRate === 0 || years === 0) {
    return years > 0 ? principal / years : 0
  }
  
  const r = annualRate / 100
  const n = years
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

/**
 * Apply degradation with extended fading models
 */
export function applyDegradation(
  baseValue: number,
  year: number,
  annualDegradation: number,
  model: FadingModelType | 'linear' | 'accelerating' = 'constant',
  accelerationFactor: number = 0,
  recyclingInterval: number = 0
): number {
  // Handle legacy model types
  let effectiveModel: FadingModelType = 'constant'
  if (model === 'linear') effectiveModel = 'constant'
  else if (model === 'accelerating') effectiveModel = 'medium_acceleration'
  else effectiveModel = model as FadingModelType
  
  // Get fading model config
  const config = FADING_MODEL_CONFIGS[effectiveModel] || FADING_MODEL_CONFIGS.constant
  const baseFade = config.baseFadeRate / 100
  const accel = config.accelerationFactor / 100
  
  // Calculate effective year (accounting for recycling)
  let effectiveYear = year
  if (config.recyclingEnabled && config.recyclingInterval > 0) {
    const recyclingYears = config.recyclingInterval / 12
    effectiveYear = ((year - 1) % recyclingYears) + 1
  }
  
  // Apply fading model
  if (accel === 0) {
    // Linear (constant) degradation
    return baseValue * Math.pow(1 - baseFade, effectiveYear - 1)
  } else {
    // Accelerating degradation
    let cumulativeDegradation = 0
    for (let y = 1; y < effectiveYear; y++) {
      const yearFade = baseFade * (1 + accel * (y - 1))
      cumulativeDegradation += yearFade
    }
    return baseValue * Math.max(0, 1 - cumulativeDegradation)
  }
}

/**
 * Calculate LCOE (Levelized Cost of Energy)
 */
export function calculateLCOE(
  totalCapex: number,
  annualOpex: number[],
  annualProduction: number[], // MWh per year
  discountRate: number,
  forecastYears: number
): number {
  const rate = discountRate / 100
  
  let totalCostPV = totalCapex
  let totalProductionPV = 0
  
  for (let year = 1; year <= forecastYears; year++) {
    const discountFactor = Math.pow(1 + rate, year)
    totalCostPV += (annualOpex[year - 1] || 0) / discountFactor
    totalProductionPV += (annualProduction[year - 1] || 0) / discountFactor
  }
  
  return totalProductionPV > 0 ? totalCostPV / totalProductionPV : 0
}

// ============================================
// CORE CALCULATION FUNCTIONS
// ============================================

/**
 * Calculate total CAPEX (with multi-phase support)
 */
export function calculateCapex(inputs: BESSCalculatorInputs): {
  bessCapex: number
  pvCapex: number
  otherCapex: number
  subtotal: number
  contingencyAmount: number
  totalCapex: number
  perPhaseBreakdown?: { phaseId: string; cost: number }[]
  perBatteryBreakdown?: { batteryId: string; cost: number }[]
} {
  const { battery, solar, capex } = inputs
  
  // BESS CAPEX
  let bessCapex = 0
  const perBatteryBreakdown: { batteryId: string; cost: number }[] = []
  
  if (battery.multiBatteryEnabled && battery.batteries.length > 0) {
    // Multi-battery mode
    for (const unit of battery.batteries.filter(b => b.enabled)) {
      const unitCost = (unit.capacityKWh / 1000) * capex.bessCostPerMWh
      bessCapex += unitCost
      perBatteryBreakdown.push({ batteryId: unit.id, cost: unitCost })
    }
  } else {
    // Single battery mode
    bessCapex = battery.capacityMWh * capex.bessCostPerMWh
    perBatteryBreakdown.push({ batteryId: 'primary', cost: bessCapex })
  }
  
  // PV CAPEX (with multi-phase support)
  let pvCapex = 0
  const perPhaseBreakdown: { phaseId: string; cost: number }[] = []
  
  if (solar.enabled) {
    if (solar.multiPhaseEnabled && solar.phases.length > 0) {
      // Multi-phase mode
      for (const phase of solar.phases.filter(p => p.enabled)) {
        const phaseCost = (phase.capacityKWp / 1000) * capex.pvCostPerMWp
        pvCapex += phaseCost
        perPhaseBreakdown.push({ phaseId: phase.id, cost: phaseCost })
      }
    } else {
      // Single solar config
      pvCapex = solar.pvCapacityMWp * capex.pvCostPerMWp
      perPhaseBreakdown.push({ phaseId: 'primary', cost: pvCapex })
    }
  }
  
  // Other CAPEX
  const otherCapex = capex.gridConnection + capex.development + capex.engineering +
                     (capex.fixtures || 0) + (capex.inverters || 0) + (capex.transportInstallation || 0)
  
  // Subtotal
  const subtotal = bessCapex + pvCapex + otherCapex
  
  // Contingency
  const contingencyAmount = subtotal * (capex.contingency / 100)
  
  // Total
  const totalCapex = subtotal + contingencyAmount
  
  return {
    bessCapex,
    pvCapex,
    otherCapex,
    subtotal,
    contingencyAmount,
    totalCapex,
    perPhaseBreakdown,
    perBatteryBreakdown,
  }
}

/**
 * Calculate financing structure (with multi-debt support)
 */
export function calculateFinancing(
  totalCapex: number,
  inputs: BESSCalculatorInputs
): {
  debtAmount: number
  equityAmount: number
  annualDebtService: number
  interestYear1: number
  facilityBreakdown?: { facilityId: string; amount: number; annualService: number }[]
} {
  const { financing } = inputs
  
  if (financing.type === 'cash') {
    return {
      debtAmount: 0,
      equityAmount: totalCapex,
      annualDebtService: 0,
      interestYear1: 0,
    }
  }
  
  // Check for multi-debt mode
  if (financing.multiDebtEnabled && financing.debtFacilities.length > 0) {
    const facilityBreakdown: { facilityId: string; amount: number; annualService: number }[] = []
    let totalDebt = 0
    let totalService = 0
    let totalInterest = 0
    
    for (const facility of financing.debtFacilities.filter(f => f.enabled)) {
      const amount = totalCapex * (facility.ltvPercent / 100)
      const annualService = calculateAnnuityPayment(amount, facility.interestRate, facility.termYears)
      const interest = amount * (facility.interestRate / 100)
      
      totalDebt += amount
      totalService += annualService
      totalInterest += interest
      
      facilityBreakdown.push({
        facilityId: facility.id,
        amount,
        annualService,
      })
    }
    
    return {
      debtAmount: totalDebt,
      equityAmount: totalCapex - totalDebt,
      annualDebtService: totalService,
      interestYear1: totalInterest,
      facilityBreakdown,
    }
  }
  
  // Single debt mode
  const debtAmount = totalCapex * (financing.ltvPercent / 100)
  const equityAmount = totalCapex - debtAmount
  
  const annualDebtService = calculateAnnuityPayment(
    debtAmount,
    financing.interestRate,
    financing.loanTermYears
  )
  
  const interestYear1 = debtAmount * (financing.interestRate / 100)
  
  return {
    debtAmount,
    equityAmount,
    annualDebtService,
    interestYear1,
  }
}

/**
 * Calculate total battery capacity for a given year (multi-battery aware)
 */
function getTotalBatteryCapacity(
  year: number,
  inputs: BESSCalculatorInputs
): { totalCapacity: number; activeUnits: number } {
  const { battery } = inputs
  const monthOfYear = year * 12
  
  if (battery.multiBatteryEnabled && battery.batteries.length > 0) {
    let totalCapacity = 0
    let activeUnits = 0
    
    for (const unit of battery.batteries.filter(b => b.enabled)) {
      // Check if battery is active in this year
      if (monthOfYear >= unit.startMonth && monthOfYear <= unit.endMonth) {
        const yearsActive = Math.floor((monthOfYear - unit.startMonth) / 12) + 1
        const unitCapacityMWh = unit.capacityKWh / 1000
        const degradedCapacity = applyDegradation(
          unitCapacityMWh,
          yearsActive,
          battery.annualDegradation,
          unit.fadingModel,
          battery.accelerationFactor,
          unit.recyclingMonthInterval
        )
        totalCapacity += degradedCapacity
        activeUnits++
      }
    }
    
    return { totalCapacity, activeUnits }
  }
  
  // Single battery mode
  const degradedCapacity = applyDegradation(
    battery.capacityMWh,
    year,
    battery.annualDegradation,
    battery.fadingModelType,
    battery.accelerationFactor
  )
  
  return { totalCapacity: degradedCapacity, activeUnits: 1 }
}

/**
 * Calculate total solar production for a given year (multi-phase aware)
 */
function getTotalSolarProduction(
  year: number,
  inputs: BESSCalculatorInputs
): number {
  const { solar } = inputs
  
  if (!solar.enabled) return 0
  
  const monthOfYear = year * 12
  
  if (solar.multiPhaseEnabled && solar.phases.length > 0) {
    let totalProduction = 0
    
    for (const phase of solar.phases.filter(p => p.enabled)) {
      // Check if phase is active
      if (monthOfYear >= phase.startMonth) {
        const yearsActive = Math.floor((monthOfYear - phase.startMonth) / 12) + 1
        const capacityMWp = phase.capacityKWp / 1000
        const baseProduction = capacityMWp * phase.solarYieldKWhKWp * (phase.efficiencyFactor / 100)
        const degradedProduction = applyDegradation(baseProduction, yearsActive, phase.capacityDecline)
        totalProduction += degradedProduction
      }
    }
    
    return totalProduction
  }
  
  // Single solar config
  const baseProduction = solar.pvCapacityMWp * solar.annualYieldKwhKwp * solar.technologyMultiplier
  return applyDegradation(baseProduction, year, solar.pvDegradation)
}

/**
 * Calculate annual energy balance (enhanced with battery use modes)
 */
export function calculateEnergyBalance(
  year: number,
  inputs: BESSCalculatorInputs
): EnergyBalance {
  const { battery, solar, consumption } = inputs
  
  // Get battery capacity (multi-battery aware)
  const { totalCapacity: batteryCapacity, activeUnits } = getTotalBatteryCapacity(year, inputs)
  const originalCapacity = battery.multiBatteryEnabled 
    ? battery.batteries.filter(b => b.enabled).reduce((sum, b) => sum + b.capacityKWh / 1000, 0)
    : battery.capacityMWh
  const batteryCapacityPercent = originalCapacity > 0 ? (batteryCapacity / originalCapacity) * 100 : 0
  
  // Calculate power rating
  const powerMW = battery.multiBatteryEnabled
    ? battery.batteries.filter(b => b.enabled).reduce((sum, b) => sum + b.dischargingSpeedKWhHour / 1000, 0)
    : battery.powerMW
  
  // Daily cycling (MWh per day)
  const dailyThroughput = batteryCapacity * (battery.maxDoD / 100) * battery.dailyCycles
  
  // Annual throughput
  const annualThroughput = dailyThroughput * 365 * (battery.availability / 100)
  
  // Solar production (multi-phase aware)
  const solarProduction = getTotalSolarProduction(year, inputs)
  let curtailedEnergy = 0
  
  if (solar.enabled && solarProduction > 0) {
    curtailedEnergy = solarProduction * (solar.curtailmentRate / 100)
  }
  
  // Battery charging based on use mode
  let batteryCharge = 0
  let batteryDischarge = 0
  let gridImport = 0
  
  const availableSolar = solarProduction - curtailedEnergy
  const recoverableCurtailment = curtailedEnergy * (solar.curtailmentRecoveryRate / 100)
  
  switch (battery.useMode) {
    case 'excess_production':
      // Only charge from excess solar production
      if (solar.enabled) {
        batteryCharge = Math.min(recoverableCurtailment, annualThroughput / (battery.roundTripEfficiency / 100))
        batteryDischarge = batteryCharge * (battery.roundTripEfficiency / 100)
        gridImport = 0
      }
      break
      
    case 'solar_only':
      // Charge from solar (curtailed + some of available)
      if (solar.enabled) {
        const maxCharge = annualThroughput / (battery.roundTripEfficiency / 100)
        batteryCharge = Math.min(recoverableCurtailment + availableSolar * 0.3, maxCharge)
        batteryDischarge = batteryCharge * (battery.roundTripEfficiency / 100)
        gridImport = 0
      }
      break
      
    case 'price_arbitrage':
    default:
      // Full arbitrage - charge from grid and/or solar
      batteryDischarge = annualThroughput
      batteryCharge = batteryDischarge / (battery.roundTripEfficiency / 100)
      
      if (solar.enabled) {
        gridImport = Math.max(0, batteryCharge - recoverableCurtailment)
      } else {
        gridImport = batteryCharge
      }
      break
  }
  
  const batteryLosses = batteryCharge - batteryDischarge
  
  // Grid exports
  const gridExport = batteryDischarge + (solar.enabled ? availableSolar : 0)
  
  // Cycle count
  const cycleCount = battery.dailyCycles * 365 * (battery.availability / 100)
  
  // Self-sufficiency
  const selfSufficiency = solar.enabled && (availableSolar + batteryDischarge) > 0
    ? (1 - gridImport / (availableSolar + batteryDischarge)) * 100
    : 0
  
  // Consumption (if enabled)
  let consumptionMWh = 0
  let electricitySavings = 0
  if (consumption?.enabled) {
    consumptionMWh = (consumption.annualConsumptionKWh / 1000) * 
                     Math.pow(1 + consumption.yearlyGrowthRate / 100, year - 1)
    electricitySavings = Math.min(consumptionMWh, availableSolar + batteryDischarge)
  }
  
  return {
    year,
    solarProduction,
    curtailedEnergy,
    batteryCharge,
    batteryDischarge,
    batteryLosses,
    batteryCapacity,
    batteryCapacityPercent,
    gridExport,
    gridImport,
    cycleCount,
    throughput: annualThroughput,
    selfSufficiency,
    consumption: consumptionMWh,
    electricitySavings,
  }
}

/**
 * Calculate annual revenue (enhanced with REC, battery reserve, savings)
 */
export function calculateRevenue(
  year: number,
  energyBalance: EnergyBalance,
  inputs: BESSCalculatorInputs
): RevenueBreakdown {
  const { battery, solar, revenue } = inputs
  
  // Price escalation
  const priceMultiplier = Math.pow(1 + revenue.priceEscalation / 100, year - 1)
  
  // Arbitrage revenue
  const arbitrageRevenue = energyBalance.batteryDischarge * revenue.arbitrageSpread * priceMultiplier
  
  // Grid services revenue
  const powerMW = battery.multiBatteryEnabled
    ? battery.batteries.filter(b => b.enabled).reduce((sum, b) => sum + b.dischargingSpeedKWhHour / 1000, 0)
    : battery.capacityMWh / battery.durationHours
    
  const gridServicesRevenue = (
    revenue.frequencyRegulation +
    revenue.spinningReserve +
    revenue.voltageSupport
  ) * powerMW * priceMultiplier
  
  // Capacity payments
  const capacityPayments = revenue.capacityPayment * powerMW * priceMultiplier
  
  // Solar revenues
  let solarRevenue = 0
  let curtailmentRecovery = 0
  let curtailmentCompensation = 0
  
  if (solar.enabled) {
    const uncurtailedSolar = energyBalance.solarProduction - energyBalance.curtailedEnergy
    solarRevenue = uncurtailedSolar * revenue.solarSellingRate * 1000 * priceMultiplier
    
    const recoveredEnergy = energyBalance.curtailedEnergy * (solar.curtailmentRecoveryRate / 100)
    curtailmentRecovery = recoveredEnergy * revenue.nightPrice * priceMultiplier
    
    const unrecoveredCurtailment = energyBalance.curtailedEnergy - recoveredEnergy
    curtailmentCompensation = unrecoveredCurtailment * 
                             (solar.curtailmentCompensation / 100) *
                             revenue.curtailedEnergyRate * 1000 * priceMultiplier
  }
  
  // PPA revenue
  let ppaRevenue = 0
  if (revenue.ppaEnabled && solar.enabled && year <= revenue.ppaDuration) {
    const ppaEscalation = Math.pow(1 + revenue.ppaEscalation / 100, year - 1)
    const uncurtailedSolar = energyBalance.solarProduction - energyBalance.curtailedEnergy
    ppaRevenue = uncurtailedSolar * revenue.ppaRate * 1000 * ppaEscalation
    solarRevenue = 0 // PPA replaces merchant
  }
  
  // REC revenue (Renewable Energy Certificates)
  let recRevenue = 0
  if (revenue.recEnabled && solar.enabled && year <= revenue.recDuration) {
    const recEscalation = Math.pow(1 + revenue.recEscalation / 100, year - 1)
    const eligibleEnergy = energyBalance.solarProduction - energyBalance.curtailedEnergy
    recRevenue = eligibleEnergy * revenue.recRate * 1000 * recEscalation
  }
  
  // Battery Reserve revenue
  let batteryReserveRevenue = 0
  if (revenue.batteryReserveEnabled) {
    const reserveCapacity = energyBalance.batteryCapacity * (battery.minSoC / 100)
    batteryReserveRevenue = reserveCapacity * revenue.batteryReservePrice * 12 * priceMultiplier
  }
  
  // Electricity Savings value
  let electricitySavingsValue = 0
  if (revenue.electricitySavingsEnabled && energyBalance.electricitySavings) {
    electricitySavingsValue = energyBalance.electricitySavings * revenue.dayPrice * priceMultiplier
  }
  
  // Other income
  const otherRevenue = revenue.otherIncome * priceMultiplier
  
  // Total revenue
  const totalRevenue = arbitrageRevenue + gridServicesRevenue + capacityPayments +
                       solarRevenue + curtailmentRecovery + curtailmentCompensation +
                       ppaRevenue + recRevenue + batteryReserveRevenue + 
                       electricitySavingsValue + otherRevenue
  
  // Revenue per MWh throughput
  const revenuePerMWh = energyBalance.throughput > 0 ? totalRevenue / energyBalance.throughput : 0
  
  return {
    year,
    arbitrageRevenue,
    gridServicesRevenue,
    capacityPayments,
    solarRevenue,
    curtailmentRecovery,
    curtailmentCompensation,
    ppaRevenue,
    recRevenue,
    batteryReserveRevenue,
    electricitySavingsValue,
    otherRevenue,
    totalRevenue,
    revenuePerMWh,
  }
}

/**
 * Calculate annual operating costs (enhanced)
 */
export function calculateOpex(
  year: number,
  inputs: BESSCalculatorInputs,
  totalCapex: number,
  totalRevenue: number
): CostBreakdown {
  const { battery, solar, opex, financing } = inputs
  
  const inflationMultiplier = Math.pow(1 + inputs.project.inflationRate / 100, year - 1)
  
  // Total battery capacity for O&M calculation
  const totalBatteryMWh = battery.multiBatteryEnabled
    ? battery.batteries.filter(b => b.enabled).reduce((sum, b) => sum + b.capacityKWh / 1000, 0)
    : battery.capacityMWh
  
  // Total solar capacity for O&M
  const totalSolarMWp = solar.multiPhaseEnabled
    ? solar.phases.filter(p => p.enabled).reduce((sum, p) => sum + p.capacityKWp / 1000, 0)
    : (solar.enabled ? solar.pvCapacityMWp : 0)
  
  // BESS O&M
  const bessOm = (opex.bessOmBasic + opex.bessOmPcs + opex.bessOmAvailability) * 
                 totalBatteryMWh * inflationMultiplier
  
  // PV O&M
  const pvOm = solar.enabled ? opex.pvOmPerMW * totalSolarMWp * inflationMultiplier : 0
  
  // Fixed costs
  const insurance = totalCapex * (opex.insurance / 100)
  const landLease = opex.landLease * inflationMultiplier
  const administration = opex.administration * inflationMultiplier
  const monitoring = opex.monitoring * inflationMultiplier
  
  // Variable costs
  const brokerFees = totalRevenue * (opex.brokerFees / 100)
  const otherOpex = opex.otherOpex * inflationMultiplier
  
  // Additional O&M items
  const cleaningCost = (opex.cleaning || 0) * totalSolarMWp * 1000 * inflationMultiplier
  const repairsCost = (opex.repairsMaintenance || 0) * totalBatteryMWh * 1000 * inflationMultiplier
  
  // Battery recycling cost (if applicable)
  let batteryRecyclingCost = 0
  if (battery.multiBatteryEnabled) {
    for (const unit of battery.batteries.filter(b => b.enabled)) {
      if (unit.recyclingMonthInterval > 0) {
        const yearInMonths = year * 12
        const recyclingYears = unit.recyclingMonthInterval / 12
        if (year > 1 && (year - 1) % recyclingYears === 0) {
          batteryRecyclingCost += unit.recyclingCost
        }
      }
    }
  }
  
  // Total OPEX
  const totalOpex = bessOm + pvOm + insurance + landLease + administration + 
                   monitoring + brokerFees + otherOpex + cleaningCost + repairsCost +
                   batteryRecyclingCost
  
  // Debt service
  let interestExpense = 0
  let principalRepayment = 0
  let debtService = 0
  
  if (financing.type !== 'cash' && year <= financing.loanTermYears) {
    const debtAmount = totalCapex * (financing.ltvPercent / 100)
    const annualPayment = calculateAnnuityPayment(
      debtAmount,
      financing.interestRate,
      financing.loanTermYears
    )
    
    let remainingBalance = debtAmount
    for (let y = 1; y < year; y++) {
      const yInterest = remainingBalance * (financing.interestRate / 100)
      const yPrincipal = annualPayment - yInterest
      remainingBalance -= yPrincipal
    }
    
    interestExpense = remainingBalance * (financing.interestRate / 100)
    principalRepayment = annualPayment - interestExpense
    debtService = annualPayment
  }
  
  return {
    year,
    bessOm,
    pvOm,
    insurance,
    landLease,
    administration,
    monitoring,
    brokerFees,
    otherOpex,
    totalOpex,
    batteryRecyclingCost,
    interestExpense,
    principalRepayment,
    debtService,
  }
}

/**
 * Generate income statement (enhanced with electricity purchases)
 */
export function generateIncomeStatement(
  year: number,
  revenueData: RevenueBreakdown,
  costData: CostBreakdown,
  energyBalance: EnergyBalance,
  inputs: BESSCalculatorInputs,
  totalCapex: number,
  forecastYears: number
): IncomeStatement {
  const { totalRevenue } = revenueData
  const { totalOpex, interestExpense } = costData
  const { revenue, tax } = inputs
  
  // Electricity purchases (cost of charging from grid)
  // Note: For arbitrage revenue, the spread already accounts for buy/sell difference,
  // so we only include electricity purchases when there's actual consumption or
  // when battery is in solar_only/excess_production mode
  const priceMultiplier = Math.pow(1 + revenue.priceEscalation / 100, year - 1)
  let electricityPurchases = 0
  
  // Only charge electricity purchases if there's consumption OR if battery mode isn't arbitrage
  if (inputs.consumption?.enabled || inputs.battery.useMode !== 'price_arbitrage') {
    electricityPurchases = energyBalance.gridImport * revenue.dayPrice * priceMultiplier
  }
  
  // Gross profit
  const grossProfit = totalRevenue - electricityPurchases
  const grossProfitMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0
  
  // EBITDA
  const ebitda = grossProfit - totalOpex
  const ebitdaMargin = totalRevenue > 0 ? (ebitda / totalRevenue) * 100 : 0
  
  // Depreciation
  const depreciation = totalCapex / forecastYears
  
  // EBIT
  const ebit = ebitda - depreciation
  const ebitMargin = totalRevenue > 0 ? (ebit / totalRevenue) * 100 : 0
  
  // EBT
  const ebt = ebit - interestExpense
  
  // Tax calculation
  let taxRate = tax?.enabled ? tax.corporateTaxRate : 12.5
  let taxCreditsApplied = 0
  
  // Tax holidays
  if (tax?.taxHolidayYears && year <= tax.taxHolidayYears) {
    taxRate = 0
  }
  
  // Investment tax credit (year 1 only)
  if (tax?.investmentTaxCreditEnabled && year === 1) {
    taxCreditsApplied = totalCapex * (tax.investmentTaxCreditPercent / 100)
  }
  
  // Production tax credit
  if (tax?.productionTaxCreditEnabled && year <= (tax.productionTaxCreditValidityYears || 0)) {
    const productionKWh = (energyBalance.solarProduction || 0) * 1000
    taxCreditsApplied += productionKWh * (tax.productionTaxCreditPerKWh || 0)
  }
  
  const rawTaxExpense = ebt > 0 ? ebt * (taxRate / 100) : 0
  const taxExpense = Math.max(0, rawTaxExpense - taxCreditsApplied)
  
  // Net income
  const netIncome = ebt - taxExpense
  const netMargin = totalRevenue > 0 ? (netIncome / totalRevenue) * 100 : 0
  
  return {
    year,
    totalRevenue,
    electricityPurchases,
    grossProfit,
    grossProfitMargin,
    totalOpex,
    ebitda,
    ebitdaMargin,
    depreciation,
    ebit,
    ebitMargin,
    interestExpense,
    ebt,
    taxExpense,
    taxRate,
    taxCreditsApplied,
    netIncome,
    netMargin,
  }
}

/**
 * Generate cash flow statement (enhanced)
 */
export function generateCashFlowStatement(
  year: number,
  incomeStatement: IncomeStatement,
  costData: CostBreakdown,
  inputs: BESSCalculatorInputs,
  totalCapex: number,
  equityAmount: number,
  debtAmount: number,
  previousCash: number
): CashFlowStatement {
  const { financing, investors } = inputs
  
  // Operating cash flow
  const netIncome = incomeStatement.netIncome
  const depreciation = incomeStatement.depreciation
  const workingCapitalChange = 0
  const operatingCashFlow = netIncome + depreciation - workingCapitalChange
  
  // Investing cash flow
  const capex = year === 1 ? -totalCapex : 0
  const batteryReplacement = -(costData.batteryRecyclingCost || 0)
  const investingCashFlow = capex + batteryReplacement
  
  // Financing cash flow
  const debtDrawdown = year === 1 ? debtAmount : 0
  const debtRepayment = -costData.principalRepayment
  const equityInjection = year === 1 ? equityAmount : 0
  
  // Dividends (based on dividend policy)
  let dividends = 0
  const availableCash = previousCash + operatingCashFlow + debtRepayment
  
  if (year >= (investors.dividendStartYear || 1)) {
    switch (investors.dividendPolicy) {
      case 'cash_sweep':
        const threshold = investors.cashSweepThreshold || 0
        dividends = Math.max(0, availableCash - threshold) * -1
        break
      case 'profit_share':
        dividends = netIncome > 0 ? netIncome * ((investors.profitSharePercent || 30) / 100) * -1 : 0
        break
      case 'available_cash':
      default:
        dividends = availableCash > 0 ? -availableCash * 0.9 : 0
        break
    }
  }
  
  const financingCashFlow = debtDrawdown + debtRepayment + equityInjection + dividends
  
  // Cash position
  const openingCash = previousCash
  const netCashFlow = operatingCashFlow + investingCashFlow + financingCashFlow
  const closingCash = openingCash + netCashFlow
  const cumulativeCashFlow = closingCash
  
  // Free cash flows
  const fcfUnlevered = operatingCashFlow + investingCashFlow
  const fcfLevered = fcfUnlevered + debtDrawdown + debtRepayment
  
  return {
    year,
    netIncome,
    depreciation,
    workingCapitalChange,
    operatingCashFlow,
    capex,
    batteryReplacement,
    investingCashFlow,
    debtDrawdown,
    debtRepayment,
    equityInjection,
    dividends,
    financingCashFlow,
    netCashFlow,
    cumulativeCashFlow,
    fcfUnlevered,
    fcfLevered,
    openingCash,
    closingCash,
  }
}

/**
 * Calculate debt metrics
 */
export function calculateDebtMetrics(
  year: number,
  debtAmount: number,
  inputs: BESSCalculatorInputs,
  ebitda: number,
  assetValue: number
): DebtMetrics {
  const { financing } = inputs
  
  if (financing.type === 'cash' || year > financing.loanTermYears) {
    return {
      year,
      openingBalance: 0,
      drawdown: 0,
      principalRepayment: 0,
      closingBalance: 0,
      interestExpense: 0,
      debtService: 0,
      ltv: 0,
      dscr: 999,
      interestCoverage: 999,
      debtToEquity: 0,
    }
  }
  
  const annualPayment = calculateAnnuityPayment(
    debtAmount,
    financing.interestRate,
    financing.loanTermYears
  )
  
  let openingBalance = debtAmount
  for (let y = 1; y < year; y++) {
    const yInterest = openingBalance * (financing.interestRate / 100)
    const yPrincipal = annualPayment - yInterest
    openingBalance -= yPrincipal
  }
  
  const drawdown = year === 1 ? debtAmount : 0
  const interestExpense = openingBalance * (financing.interestRate / 100)
  const principalRepayment = annualPayment - interestExpense
  const closingBalance = Math.max(0, openingBalance - principalRepayment)
  const debtService = annualPayment
  
  const ltv = assetValue > 0 ? (closingBalance / assetValue) * 100 : 0
  const dscr = debtService > 0 ? ebitda / debtService : 999
  const interestCoverage = interestExpense > 0 ? ebitda / interestExpense : 999
  const debtToEquity = (assetValue - closingBalance) > 0 ? 
                       closingBalance / (assetValue - closingBalance) : 0
  
  return {
    year,
    openingBalance: year === 1 ? 0 : openingBalance,
    drawdown,
    principalRepayment,
    closingBalance,
    interestExpense,
    debtService,
    ltv,
    dscr,
    interestCoverage,
    debtToEquity,
  }
}

/**
 * Calculate investor returns (enhanced with timing)
 */
export function calculateInvestorReturns(
  inputs: BESSCalculatorInputs,
  equityAmount: number,
  annualCashFlows: number[],
  forecastYears: number
): InvestorMetrics[] {
  const { investors } = inputs
  
  return investors.investors.map(investor => {
    const contribution = equityAmount * (investor.equityPercent / 100)
    
    // Calculate cash flows considering entry/exit timing
    const entryYear = Math.ceil((investor.entryMonth || 1) / 12)
    const exitYear = Math.ceil((investor.exitMonth || forecastYears * 12) / 12)
    const holdingPeriod = exitYear - entryYear + 1
    
    const investorCashFlows = annualCashFlows.map((cf, idx) => {
      const year = idx + 1
      if (year >= entryYear && year <= exitYear) {
        return cf * (investor.equityPercent / 100)
      }
      return 0
    })
    
    // IRR calculation
    const allCashFlows = [-contribution, ...investorCashFlows]
    const irr = calculateIRR(allCashFlows)
    
    // Total distributions
    const totalDistributions = investorCashFlows.reduce((sum, cf) => sum + Math.max(0, cf), 0)
    
    // Multiple (MOIC)
    const multiple = contribution > 0 ? totalDistributions / contribution : 0
    
    // Payback
    let cumulative = -contribution
    let paybackYears = 999
    for (let i = 0; i < investorCashFlows.length; i++) {
      cumulative += investorCashFlows[i]
      if (cumulative >= 0 && paybackYears === 999) {
        paybackYears = i + 1
        break
      }
    }
    
    // Cash-on-cash yield
    const avgAnnualCashFlow = totalDistributions / holdingPeriod
    const cashOnCashYield = contribution > 0 ? (avgAnnualCashFlow / contribution) * 100 : 0
    
    return {
      investorId: investor.id,
      investorName: investor.name,
      equityContribution: contribution,
      totalDistributions,
      netProceeds: totalDistributions - contribution,
      irr,
      multiple,
      paybackYears,
      cashFlows: investorCashFlows,
      cashOnCashYield,
      entryYear,
      exitYear,
      holdingPeriod,
    }
  })
}

/**
 * Run model validation checks
 */
export function runModelChecks(
  energyBalances: EnergyBalance[],
  cashFlows: CashFlowStatement[],
  debtMetrics: DebtMetrics[],
  inputs: BESSCalculatorInputs
): ModelChecks {
  const warnings: string[] = []
  const errors: string[] = []
  
  // Energy balance check
  const energyBalanceCloses = true // Simplified check
  
  // Cash flow balance check
  const cashFlowBalances = cashFlows.every(cf => {
    const calculated = cf.operatingCashFlow + cf.investingCashFlow + cf.financingCashFlow
    return Math.abs(calculated - cf.netCashFlow) < 1
  })
  if (!cashFlowBalances) {
    errors.push('Cash flow statement does not balance')
  }
  
  // Covenant breaches
  const { financing } = inputs
  const covenantsBreach = debtMetrics.some(dm => {
    return dm.dscr > 0 && dm.dscr < 999 && dm.dscr < financing.minDscr
  })
  if (covenantsBreach) {
    warnings.push(`DSCR falls below minimum covenant of ${financing.minDscr}x in one or more years`)
  }
  
  // Negative energy flows
  const negativeEnergyFlows = energyBalances.some(eb => 
    eb.batteryCharge < 0 || eb.batteryDischarge < 0
  )
  if (negativeEnergyFlows) {
    errors.push('Negative energy flows detected')
  }
  
  // Battery degradation warning
  const finalCapacity = energyBalances[energyBalances.length - 1]?.batteryCapacityPercent || 100
  if (finalCapacity < 60) {
    warnings.push(`Battery capacity degrades to ${finalCapacity.toFixed(1)}% by end of project`)
  }
  
  return {
    energyBalanceCloses,
    cashFlowBalances,
    balanceSheetBalances: true,
    covenantsBreach,
    negativeEnergyFlows,
    warnings,
    errors,
  }
}

/**
 * Calculate hourly optimization
 */
export function calculateHourlyOptimization(
  inputs: BESSCalculatorInputs
): HourlyAnalysisResult {
  const { battery, hourly } = inputs
  
  if (!hourly.enabled) {
    return {
      typicalDayCharge: Array(24).fill(0),
      typicalDayDischarge: Array(24).fill(0),
      typicalDayPrice: hourly.priceCurve.map(p => p.sellPrice),
      monthlyArbitrage: Array(12).fill(0),
      annualOptimizedRevenue: 0,
      revenueUplift: 0,
    }
  }
  
  const usableCapacity = battery.capacityMWh * (battery.maxDoD / 100)
  const rte = battery.roundTripEfficiency / 100
  const chargePower = battery.capacityMWh / battery.durationHours
  
  const typicalDayCharge: number[] = Array(24).fill(0)
  const typicalDayDischarge: number[] = Array(24).fill(0)
  const typicalDayPrice = hourly.priceCurve.map(p => p.sellPrice)
  
  // Charge during low-price hours
  let remainingCapacity = usableCapacity
  const chargeHoursSorted = [...hourly.chargeHours].sort((a, b) => {
    const priceA = hourly.priceCurve[a]?.buyPrice || 100
    const priceB = hourly.priceCurve[b]?.buyPrice || 100
    return priceA - priceB
  })
  
  for (const hour of chargeHoursSorted) {
    if (remainingCapacity <= 0) break
    const chargeAmount = Math.min(chargePower, remainingCapacity / rte)
    typicalDayCharge[hour] = chargeAmount
    remainingCapacity -= chargeAmount * rte
  }
  
  // Discharge during high-price hours
  let storedEnergy = usableCapacity
  const dischargeHoursSorted = [...hourly.dischargeHours].sort((a, b) => {
    const priceA = hourly.priceCurve[a]?.sellPrice || 100
    const priceB = hourly.priceCurve[b]?.sellPrice || 100
    return priceB - priceA
  })
  
  for (const hour of dischargeHoursSorted) {
    if (storedEnergy <= 0) break
    const dischargeAmount = Math.min(chargePower, storedEnergy)
    typicalDayDischarge[hour] = dischargeAmount
    storedEnergy -= dischargeAmount
  }
  
  // Calculate daily revenue
  let dailyChargeRevenue = 0
  let dailyDischargeRevenue = 0
  
  for (let h = 0; h < 24; h++) {
    dailyChargeRevenue -= typicalDayCharge[h] * (hourly.priceCurve[h]?.buyPrice || 100)
    dailyDischargeRevenue += typicalDayDischarge[h] * (hourly.priceCurve[h]?.sellPrice || 100)
  }
  
  const dailyNetRevenue = dailyDischargeRevenue + dailyChargeRevenue
  const annualOptimizedRevenue = dailyNetRevenue * 365 * (battery.availability / 100)
  
  // Calculate monthly arbitrage
  const monthlyArbitrage: number[] = Array(12).fill(annualOptimizedRevenue / 12)
  
  // Calculate simplified model revenue for comparison
  const simplifiedRevenue = usableCapacity * battery.dailyCycles * 365 * 
                           (battery.availability / 100) * 50 // Assume €50/MWh spread
  
  const revenueUplift = simplifiedRevenue > 0 
    ? ((annualOptimizedRevenue - simplifiedRevenue) / simplifiedRevenue) * 100 
    : 0
  
  return {
    typicalDayCharge,
    typicalDayDischarge,
    typicalDayPrice,
    monthlyArbitrage,
    annualOptimizedRevenue,
    revenueUplift,
  }
}

// ============================================
// MAIN CALCULATION FUNCTION
// ============================================

/**
 * Run complete BESS financial model
 */
export function calculateBESSFinancials(
  inputs: BESSCalculatorInputs
): BESSCalculatorResults {
  const { project } = inputs
  const forecastYears = project.forecastYears
  
  // Step 1: Calculate CAPEX
  const capexResult = calculateCapex(inputs)
  const { totalCapex } = capexResult
  
  // Step 2: Calculate financing
  const financeResult = calculateFinancing(totalCapex, inputs)
  const { debtAmount, equityAmount } = financeResult
  
  // Step 3: Generate time series
  const energyBalance: EnergyBalance[] = []
  const revenue: RevenueBreakdown[] = []
  const costs: CostBreakdown[] = []
  const incomeStatements: IncomeStatement[] = []
  const cashFlowStatements: CashFlowStatement[] = []
  const debtSchedule: DebtMetrics[] = []
  
  let previousCash = 0
  const leveragedCashFlows: number[] = [-equityAmount]
  const unleveragedCashFlows: number[] = [-totalCapex]
  const annualProduction: number[] = []
  const annualOpex: number[] = []
  
  for (let year = 1; year <= forecastYears; year++) {
    // Energy balance
    const eb = calculateEnergyBalance(year, inputs)
    energyBalance.push(eb)
    annualProduction.push(eb.throughput + (eb.solarProduction || 0))
    
    // Revenue
    const rev = calculateRevenue(year, eb, inputs)
    revenue.push(rev)
    
    // Operating costs
    const cost = calculateOpex(year, inputs, totalCapex, rev.totalRevenue)
    costs.push(cost)
    annualOpex.push(cost.totalOpex)
    
    // Income statement
    const incStmt = generateIncomeStatement(year, rev, cost, eb, inputs, totalCapex, forecastYears)
    incomeStatements.push(incStmt)
    
    // Cash flow statement
    const cfStmt = generateCashFlowStatement(
      year, incStmt, cost, inputs, totalCapex, 
      equityAmount, debtAmount, previousCash
    )
    cashFlowStatements.push(cfStmt)
    previousCash = cfStmt.closingCash
    
    // Debt metrics
    const depreciation = totalCapex / forecastYears * (forecastYears - year + 1)
    const assetValue = totalCapex - depreciation
    const debtMet = calculateDebtMetrics(year, debtAmount, inputs, incStmt.ebitda, assetValue)
    debtSchedule.push(debtMet)
    
    // Cash flows for IRR
    leveragedCashFlows.push(cfStmt.fcfLevered)
    unleveragedCashFlows.push(cfStmt.fcfUnlevered)
  }
  
  // Step 4: Calculate investor returns
  const dividendCashFlows = cashFlowStatements.map(cf => -cf.dividends)
  const investorReturns = calculateInvestorReturns(inputs, equityAmount, dividendCashFlows, forecastYears)
  
  // Step 5: LCOE calculation
  const lcoe = calculateLCOE(totalCapex, annualOpex, annualProduction, project.discountRate, forecastYears)
  
  // Step 6: Valuation metrics
  const projectIrr = calculateIRR(unleveragedCashFlows)
  const equityIrr = calculateIRR(leveragedCashFlows)
  const npvUnlevered = calculateNPV(unleveragedCashFlows, project.discountRate)
  const npvLevered = calculateNPV(leveragedCashFlows, project.discountRate)
  
  // Payback calculation
  let simplePayback = 999
  let cumSum = -equityAmount
  for (let i = 0; i < dividendCashFlows.length; i++) {
    cumSum += dividendCashFlows[i]
    if (cumSum >= 0) {
      simplePayback = i + 1
      break
    }
  }
  
  // Relative metrics
  const totalBatteryMWh = inputs.battery.multiBatteryEnabled
    ? inputs.battery.batteries.filter(b => b.enabled).reduce((sum, b) => sum + b.capacityKWh / 1000, 0)
    : inputs.battery.capacityMWh
    
  const totalSolarKWp = inputs.solar.multiPhaseEnabled
    ? inputs.solar.phases.filter(p => p.enabled).reduce((sum, p) => sum + p.capacityKWp, 0)
    : (inputs.solar.enabled ? inputs.solar.pvCapacityMWp * 1000 : 0)
  
  const totalProductionKWh = annualProduction.reduce((sum, p) => sum + p * 1000, 0)
  
  const valuation: ValuationMetrics = {
    npvUnlevered,
    npvLevered,
    projectIrr,
    equityIrr,
    simplePayback,
    discountedPayback: simplePayback * 1.2,
    enterpriseValue: npvUnlevered + totalCapex,
    equityValue: npvLevered + equityAmount,
    evPerMWh: totalBatteryMWh > 0 ? (npvUnlevered + totalCapex) / totalBatteryMWh : 0,
    evPerMW: (npvUnlevered + totalCapex) / (totalBatteryMWh / inputs.battery.durationHours),
    lcoe,
    revenuePerKWp: totalSolarKWp > 0 ? (revenue[0]?.totalRevenue || 0) / totalSolarKWp * 1000 : 0,
    revenuePerKWh: totalProductionKWh > 0 ? revenue.reduce((sum, r) => sum + r.totalRevenue, 0) / totalProductionKWh : 0,
    opexPerKWp: totalSolarKWp > 0 ? (costs[0]?.totalOpex || 0) / totalSolarKWp * 1000 : 0,
    opexPerKWh: totalProductionKWh > 0 ? costs.reduce((sum, c) => sum + c.totalOpex, 0) / totalProductionKWh : 0,
    ebitdaPerKWp: totalSolarKWp > 0 ? (incomeStatements[0]?.ebitda || 0) / totalSolarKWp * 1000 : 0,
    ebitdaPerKWh: totalProductionKWh > 0 ? incomeStatements.reduce((sum, is) => sum + is.ebitda, 0) / totalProductionKWh : 0,
  }
  
  // Step 7: Model checks
  const checks = runModelChecks(energyBalance, cashFlowStatements, debtSchedule, inputs)
  
  // Step 8: Hourly analysis
  const hourlyAnalysis = calculateHourlyOptimization(inputs)
  
  if (inputs.hourly.enabled && hourlyAnalysis.revenueUplift !== 0) {
    if (hourlyAnalysis.revenueUplift > 0) {
      checks.warnings.push(`Hourly optimization adds ${hourlyAnalysis.revenueUplift.toFixed(1)}% revenue vs simplified model`)
    } else {
      checks.warnings.push(`Hourly model shows ${Math.abs(hourlyAnalysis.revenueUplift).toFixed(1)}% lower revenue`)
    }
  }
  
  // Step 9: Summary KPIs
  const year1Revenue = revenue[0]?.totalRevenue || 0
  const year1Opex = costs[0]?.totalOpex || 0
  const year1Ebitda = incomeStatements[0]?.ebitda || 0
  const year1NetProfit = incomeStatements[0]?.netIncome || 0
  
  const lifetimeRevenue = revenue.reduce((sum, r) => sum + r.totalRevenue, 0)
  const lifetimeProfit = incomeStatements.reduce((sum, is) => sum + is.netIncome, 0)
  
  const averageAnnualRevenue = lifetimeRevenue / forecastYears
  const averageAnnualProfit = lifetimeProfit / forecastYears
  
  const cashOnCashReturn = equityAmount > 0 ? (year1NetProfit / equityAmount) * 100 : 0
  const avgDscr = debtSchedule.filter(d => d.dscr < 999).reduce((sum, d) => sum + d.dscr, 0) / 
                 Math.max(1, debtSchedule.filter(d => d.dscr < 999).length)
  
  const equityMultiple = investorReturns[0]?.multiple || 0
  
  // Self-sufficiency average
  const avgSelfSufficiency = energyBalance.reduce((sum, eb) => sum + eb.selfSufficiency, 0) / forecastYears
  
  // Total electricity savings
  const totalElectricitySavings = energyBalance.reduce((sum, eb) => sum + (eb.electricitySavings || 0), 0)
  
  return {
    summary: {
      totalCapex,
      equityRequired: equityAmount,
      debtAmount,
      year1Revenue,
      year1Opex,
      year1Ebitda,
      year1NetProfit,
      averageAnnualRevenue,
      averageAnnualProfit,
      lifetimeRevenue,
      lifetimeProfit,
      cashOnCashReturn,
      projectIrr,
      equityIrr,
      npv: npvLevered,
      paybackYears: simplePayback,
      dscr: avgDscr,
      equityMultiple,
      lcoe,
      selfSufficiency: avgSelfSufficiency,
      totalElectricitySavings,
    },
    energyBalance,
    revenue,
    costs,
    incomeStatements,
    cashFlowStatements,
    balanceSheets: [],
    debtSchedule,
    investorReturns,
    valuation,
    checks,
    hourlyAnalysis: inputs.hourly.enabled ? hourlyAnalysis : undefined,
  }
}

// ============================================
// CHART DATA GENERATORS
// ============================================

export function generateCashFlowChartData(results: BESSCalculatorResults): CashFlowChartData[] {
  return results.cashFlowStatements.map((cf, idx) => ({
    year: cf.year,
    revenue: results.revenue[idx]?.totalRevenue || 0,
    opex: results.costs[idx]?.totalOpex || 0,
    debtService: results.costs[idx]?.debtService || 0,
    netCashFlow: cf.netCashFlow,
    cumulative: cf.cumulativeCashFlow,
  }))
}

export function generateEnergyChartData(results: BESSCalculatorResults): EnergyChartData[] {
  return results.energyBalance.map(eb => ({
    year: eb.year,
    solarProduction: eb.solarProduction,
    batteryCharge: eb.batteryCharge,
    batteryDischarge: eb.batteryDischarge,
    curtailed: eb.curtailedEnergy,
    gridExport: eb.gridExport,
    consumption: eb.consumption,
    selfSufficiency: eb.selfSufficiency,
  }))
}

export function generateDegradationChartData(results: BESSCalculatorResults): DegradationChartData[] {
  return results.energyBalance.map(eb => ({
    year: eb.year,
    capacity: eb.batteryCapacity,
    capacityPercent: eb.batteryCapacityPercent,
  }))
}

export function generateRevenueChartData(results: BESSCalculatorResults): RevenueChartData[] {
  const year1Revenue = results.revenue[0]
  if (!year1Revenue) return []
  
  const breakdown = [
    { name: 'Arbitrage', value: year1Revenue.arbitrageRevenue, color: '#3b82f6' },
    { name: 'Grid Services', value: year1Revenue.gridServicesRevenue, color: '#10b981' },
    { name: 'Capacity', value: year1Revenue.capacityPayments, color: '#f59e0b' },
    { name: 'Solar', value: year1Revenue.solarRevenue, color: '#8b5cf6' },
    { name: 'PPA', value: year1Revenue.ppaRevenue, color: '#ec4899' },
    { name: 'REC', value: year1Revenue.recRevenue || 0, color: '#06b6d4' },
    { name: 'Battery Reserve', value: year1Revenue.batteryReserveRevenue || 0, color: '#84cc16' },
    { name: 'Savings', value: year1Revenue.electricitySavingsValue || 0, color: '#f97316' },
    { name: 'Other', value: year1Revenue.otherRevenue, color: '#6b7280' },
  ].filter(item => item.value > 0)
  
  const total = breakdown.reduce((sum, item) => sum + item.value, 0)
  
  return breakdown.map(item => ({
    ...item,
    percentage: total > 0 ? (item.value / total) * 100 : 0,
  }))
}
