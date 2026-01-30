// BESS (Battery Energy Storage System) calculation utilities

export interface BESSScenario {
  bessSizeMWhPerMW: number
  bessCapexPerMWh: number
  curtailmentRecoveryPct: number
  dayTariff: number
  nightTariff: number
}

export interface BESSResults {
  bessCapacity: number // Total MWh
  bessCapex: number
  totalCapex: number
  recoveredEnergy: number // kWh/year
  additionalRevenue: number
  bessOpex: number // Annual BESS O&M
  bessROI: number
  enhancedSystemROI: number
  paybackPeriod: number
}

export function calculateBESSImpact(
  parkSizeMW: number,
  baseCapex: number,
  curtailedEnergyAnnual: number,
  scenario: BESSScenario
): BESSResults {
  // BESS sizing
  const bessCapacity = scenario.bessSizeMWhPerMW * parkSizeMW
  const bessCapex = bessCapacity * scenario.bessCapexPerMWh
  const totalCapex = baseCapex + bessCapex
  
  // Energy recovery
  const recoveredEnergy = curtailedEnergyAnnual * (scenario.curtailmentRecoveryPct / 100)
  
  // Revenue calculation
  // Recovered energy is shifted from day tariff to night tariff
  const additionalRevenue = recoveredEnergy * (scenario.nightTariff / 100) // Convert cents to euros
  
  // BESS O&M (typically 2% of capex or €2k/MWh/year)
  const bessOpex = bessCapacity * 2000
  
  // BESS standalone ROI
  const bessNetRevenue = additionalRevenue - bessOpex
  const bessROI = (bessNetRevenue / bessCapex) * 100
  
  return {
    bessCapacity,
    bessCapex,
    totalCapex,
    recoveredEnergy,
    additionalRevenue,
    bessOpex,
    bessROI,
    enhancedSystemROI: 0, // To be calculated by caller with full system context
    paybackPeriod: bessCapex / bessNetRevenue
  }
}

export function calculateOptimalBESSSize(
  curtailedEnergyAnnual: number,
  parkSizeMW: number,
  bessCapexPerMWh: number,
  dayTariff: number,
  nightTariff: number
): number {
  // Optimal BESS size is typically 0.5-1.0 MWh per MW for curtailment arbitrage
  // This assumes ~2 cycles per day during curtailment periods
  
  const scenarios = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0]
  let bestROI = 0
  let optimalSize = 2.5 // Default to 2.5 MWh/MW
  
  scenarios.forEach(sizeMWhPerMW => {
    const result = calculateBESSImpact(parkSizeMW, 0, curtailedEnergyAnnual, {
      bessSizeMWhPerMW: sizeMWhPerMW,
      bessCapexPerMWh,
      curtailmentRecoveryPct: 50, // Conservative 50% recovery
      dayTariff,
      nightTariff
    })
    
    if (result.bessROI > bestROI) {
      bestROI = result.bessROI
      optimalSize = sizeMWhPerMW
    }
  })
  
  return optimalSize
}

export function calculateCurtailmentTrend(historicalData: Array<{year: number, curtailmentPct: number}>) {
  if (historicalData.length < 2) return 0
  
  // Calculate average year-over-year increase
  let totalIncrease = 0
  for (let i = 1; i < historicalData.length; i++) {
    totalIncrease += historicalData[i].curtailmentPct - historicalData[i-1].curtailmentPct
  }
  
  return totalIncrease / (historicalData.length - 1)
}

export function projectFutureCurtailment(
  currentCurtailmentPct: number,
  yearlyIncrease: number,
  yearsAhead: number
): number {
  // Cap at realistic maximum (typically 60-70%)
  const projected = currentCurtailmentPct + (yearlyIncrease * yearsAhead)
  return Math.min(projected, 65)
}

