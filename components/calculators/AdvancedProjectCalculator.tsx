'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Info, 
  Download, 
  Calculator, 
  Battery, 
  Sun, 
  TrendingUp, 
  Euro,
  Zap,
  AlertTriangle,
  CheckCircle,
  HelpCircle
} from 'lucide-react'
import { formatCurrency, formatPercentage } from '@/lib/utils'
import { 
  CYPRUS_MARKET_DEFAULTS, 
  BESS_DEFAULTS, 
  PROJECT_STAGES, 
  TECHNOLOGY_TYPES, 
  PPA_TYPES,
  CAPEX_MODES,
  COMPANY_DATA,
  FINANCING_OPTIONS
} from '@/lib/constants'
import { trackEvent } from '@/components/analytics/GoogleAnalytics'

// Tooltip component for help text
function Tooltip({ text }: { text: string }) {
  return (
    <span className="group relative inline-block ml-1">
      <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help inline" />
      <span className="invisible group-hover:visible absolute z-50 w-64 p-2 text-xs text-white bg-gray-800 rounded-lg -top-2 left-6 shadow-lg">
        {text}
      </span>
    </span>
  )
}

// Input field with label and tooltip
function FormField({ 
  label, 
  tooltip, 
  children, 
  className = '' 
}: { 
  label: string
  tooltip?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm font-medium text-gray-700 flex items-center">
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </Label>
      {children}
    </div>
  )
}

// IRR Calculation using Newton-Raphson method
function calculateIRR(cashFlows: number[], guess: number = 0.1, maxIterations: number = 100, tolerance: number = 0.0001): number {
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
      return rate * 100 // Return as percentage
    }
    
    if (derivativeNpv === 0) {
      return NaN
    }
    
    rate = rate - npv / derivativeNpv
    
    // Prevent divergence
    if (rate < -0.99) rate = -0.99
    if (rate > 10) rate = 10
  }
  
  return rate * 100 // Return as percentage
}

// Types
interface ProjectInputs {
  // Project Info
  projectName: string
  projectStage: keyof typeof PROJECT_STAGES
  capacityDC: number
  capacityAC: number
  technology: keyof typeof TECHNOLOGY_TYPES
  
  // Pricing
  askingPrice: number
  capexMode: keyof typeof CAPEX_MODES
  
  // Production
  annualYield: number
  capacityFactor: number
  annualDegradation: number
  systemAvailability: number
  
  // Revenue
  daytimeRate: number
  nightRate: number
  ppaType: keyof typeof PPA_TYPES
  ppaRate: number
  
  // Curtailment
  curtailmentRate: number
  curtailedEnergyRate: number
  curtailmentCompensation: number
  
  // BESS
  includeBESS: boolean
  bessDuration: number
  bessCostPerKwh: number
  bessRTE: number
  dailyCycles: number
  curtailmentRecoveryRate: number
  nightArbitragePremium: number
  
  // OPEX
  omCostPerMW: number
  insurance: number
  landLease: number
  administration: number
  otherCosts: number
  bessOmPct: number // BESS O&M as % of capex
  
  // Flexible Financing
  ltvPercent: number          // Loan-to-Value percentage
  existingLoan: number        // Existing loan balance (for operational projects)
  interestRate: number
  loanTermYears: number
  discountRate: number
}

interface CalculationResults {
  // Solar Only
  solarCapex: number
  grossProduction: number
  curtailedEnergy: number
  netProduction: number
  grossRevenue: number
  curtailmentLoss: number
  curtailmentCompensationRevenue: number
  netRevenue: number
  totalOpex: number
  ebitda: number
  debtService: number
  netProfit: number
  cashRequired: number
  loanAmount: number
  roi: number
  paybackYears: number
  npv25: number
  irr: number
  
  // With BESS
  bessCapacity: number
  bessCapex: number
  totalCapex: number
  recoverableEnergy: number
  bessGrossRevenue: number
  lostCurtailmentCompensation: number
  bessNetRevenue: number
  bessOpex: number
  netBessBenefit: number
  totalRevenueWithBESS: number
  totalOpexWithBESS: number
  ebitdaWithBESS: number
  debtServiceWithBESS: number
  netProfitWithBESS: number
  cashRequiredWithBESS: number
  loanAmountWithBESS: number
  roiWithBESS: number
  paybackWithBESS: number
  npv25WithBESS: number
  irrWithBESS: number
  
  // Investor Metrics
  cashOnCashReturn: number
  equityMultiple: number
  dscr: number
  cashOnCashReturnWithBESS: number
  equityMultipleWithBESS: number
  dscrWithBESS: number
  
  // 25-year totals
  totalDistributions25: number
  totalDistributions25WithBESS: number
}

export function AdvancedProjectCalculator() {
  // Initialize with defaults
  const [inputs, setInputs] = useState<ProjectInputs>({
    projectName: '',
    projectStage: 'RTB',
    capacityDC: 5.0,
    capacityAC: 4.6,
    technology: 'TRACKER',
    
    askingPrice: 7500000,
    capexMode: 'rtb-new',
    
    annualYield: CYPRUS_MARKET_DEFAULTS.annualYield,
    capacityFactor: CYPRUS_MARKET_DEFAULTS.capacityFactor * 100,
    annualDegradation: CYPRUS_MARKET_DEFAULTS.annualDegradation * 100,
    systemAvailability: CYPRUS_MARKET_DEFAULTS.systemAvailability * 100,
    
    daytimeRate: CYPRUS_MARKET_DEFAULTS.daytimeSellingRate,
    nightRate: CYPRUS_MARKET_DEFAULTS.nightDischargeRate,
    ppaType: 'MERCHANT',
    ppaRate: CYPRUS_MARKET_DEFAULTS.ppaFixedRate,
    
    curtailmentRate: CYPRUS_MARKET_DEFAULTS.curtailmentRate * 100,
    curtailedEnergyRate: CYPRUS_MARKET_DEFAULTS.curtailedEnergyRate,
    curtailmentCompensation: CYPRUS_MARKET_DEFAULTS.curtailmentCompensation * 100,
    
    includeBESS: false,
    bessDuration: BESS_DEFAULTS.defaultDuration,
    bessCostPerKwh: BESS_DEFAULTS.pricing.medium.costPerMWh / 1000, // €135/kWh from medium tier
    bessRTE: BESS_DEFAULTS.roundTripEfficiency * 100,
    dailyCycles: BESS_DEFAULTS.dailyCycles,
    curtailmentRecoveryRate: BESS_DEFAULTS.curtailmentRecoveryRate * 100,
    nightArbitragePremium: BESS_DEFAULTS.nightArbitragePremium * 100,
    
    omCostPerMW: CYPRUS_MARKET_DEFAULTS.omCostPerMW,
    insurance: CYPRUS_MARKET_DEFAULTS.insurance,
    landLease: CYPRUS_MARKET_DEFAULTS.landLease,
    administration: CYPRUS_MARKET_DEFAULTS.administration,
    otherCosts: CYPRUS_MARKET_DEFAULTS.otherCosts,
    bessOmPct: 2, // 2% of BESS CAPEX per year
    
    // Flexible financing defaults
    ltvPercent: 0, // Default to cash (0% LTV)
    existingLoan: 0,
    interestRate: CYPRUS_MARKET_DEFAULTS.interestRate * 100,
    loanTermYears: CYPRUS_MARKET_DEFAULTS.loanTermYears,
    discountRate: CYPRUS_MARKET_DEFAULTS.discountRate * 100,
  })

  const [results, setResults] = useState<CalculationResults | null>(null)
  const [activeSection, setActiveSection] = useState('project')

  // Update a single input
  const updateInput = useCallback(<K extends keyof ProjectInputs>(
    key: K, 
    value: ProjectInputs[K]
  ) => {
    setInputs(prev => ({ ...prev, [key]: value }))
  }, [])

  // Calculate price per MW
  const pricePerMW = useMemo(() => {
    return inputs.capacityDC > 0 ? inputs.askingPrice / inputs.capacityDC : 0
  }, [inputs.askingPrice, inputs.capacityDC])

  // Main calculation function
  const calculateResults = useCallback(() => {
    const {
      capacityDC, capacityAC, technology, askingPrice,
      annualYield, annualDegradation, systemAvailability,
      daytimeRate, nightRate, ppaType, ppaRate,
      curtailmentRate, curtailedEnergyRate, curtailmentCompensation,
      includeBESS, bessDuration, bessCostPerKwh, bessRTE, dailyCycles,
      curtailmentRecoveryRate, nightArbitragePremium,
      omCostPerMW, insurance, landLease, administration, otherCosts, bessOmPct,
      ltvPercent, existingLoan, interestRate, loanTermYears, discountRate
    } = inputs

    // Convert percentages to decimals
    const curtailmentPct = curtailmentRate / 100
    const curtailmentCompPct = curtailmentCompensation / 100
    const degradationPct = annualDegradation / 100
    const availabilityPct = systemAvailability / 100
    const rtePct = bessRTE / 100
    const recoveryPct = curtailmentRecoveryRate / 100
    const arbitragePremiumPct = nightArbitragePremium / 100
    const interestPct = interestRate / 100
    const discountPct = discountRate / 100
    const ltvPct = ltvPercent / 100
    const bessOmPctDecimal = bessOmPct / 100

    // Technology yield multiplier
    const techMultiplier = TECHNOLOGY_TYPES[technology].yieldMultiplier

    // === SOLAR ONLY CALCULATIONS ===
    const solarCapex = askingPrice

    // Annual production (Year 1)
    const grossProduction = capacityDC * 1000 * annualYield * techMultiplier * availabilityPct // kWh
    const curtailedEnergy = grossProduction * curtailmentPct
    const netProduction = grossProduction - curtailedEnergy

    // Revenue calculation
    const effectiveRate = ppaType === 'FIXED' ? ppaRate : daytimeRate
    const grossRevenue = grossProduction * effectiveRate
    const curtailmentLoss = curtailedEnergy * effectiveRate
    const curtailmentCompensationRevenue = curtailedEnergy * curtailedEnergyRate * curtailmentCompPct
    const netRevenue = netProduction * effectiveRate + curtailmentCompensationRevenue

    // OPEX
    const totalOpex = (omCostPerMW * capacityDC) + insurance + landLease + administration + otherCosts

    // EBITDA
    const ebitda = netRevenue - totalOpex

    // Flexible financing calculations
    const loanAmount = existingLoan > 0 ? existingLoan : solarCapex * ltvPct
    let cashRequired = solarCapex - loanAmount
    if (cashRequired < 0) cashRequired = 0
    
    let debtService = 0
    if (loanAmount > 0 && loanTermYears > 0) {
      const monthlyRate = interestPct / 12
      const numPayments = loanTermYears * 12
      if (monthlyRate > 0) {
        const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                              (Math.pow(1 + monthlyRate, numPayments) - 1)
        debtService = monthlyPayment * 12
      } else {
        debtService = loanAmount / loanTermYears
      }
    }

    // Net profit and metrics
    const netProfit = ebitda - debtService
    const roi = cashRequired > 0 ? (netProfit / cashRequired) * 100 : 0
    const paybackYears = netProfit > 0 ? cashRequired / netProfit : 999
    
    // Cash-on-cash return (same as ROI for simple case)
    const cashOnCashReturn = roi
    
    // DSCR (Debt Service Coverage Ratio)
    const dscr = debtService > 0 ? ebitda / debtService : 999

    // Generate 25-year cash flows for IRR calculation
    const cashFlows: number[] = [-cashRequired]
    let totalDistributions25 = 0
    for (let year = 1; year <= 25; year++) {
      const yearDegradation = Math.pow(1 - degradationPct, year - 1)
      const yearNetProfit = netProfit * yearDegradation
      cashFlows.push(yearNetProfit)
      totalDistributions25 += yearNetProfit
    }
    
    // Calculate IRR
    const irr = calculateIRR(cashFlows)
    
    // Equity Multiple
    const equityMultiple = cashRequired > 0 ? totalDistributions25 / cashRequired : 0

    // NPV calculation (25 years)
    let npv25 = -cashRequired
    for (let year = 1; year <= 25; year++) {
      const yearDegradation = Math.pow(1 - degradationPct, year - 1)
      const yearProfit = netProfit * yearDegradation
      npv25 += yearProfit / Math.pow(1 + discountPct, year)
    }

    // === BESS CALCULATIONS ===
    const bessCapacity = capacityAC * bessDuration * 1000 // kWh
    const bessCapex = bessCapacity * bessCostPerKwh
    const totalCapex = solarCapex + bessCapex

    // Recoverable energy from curtailment
    const recoverableEnergy = curtailedEnergy * recoveryPct * rtePct

    // BESS revenue breakdown
    const bessSellingRate = nightRate * (1 + arbitragePremiumPct)
    const bessGrossRevenue = recoverableEnergy * bessSellingRate
    
    // Lost compensation (energy we store instead of getting compensated for)
    const lostCurtailmentCompensation = (recoverableEnergy / rtePct) * curtailedEnergyRate * curtailmentCompPct
    
    // Net BESS revenue
    const bessNetRevenue = bessGrossRevenue - lostCurtailmentCompensation

    // BESS OPEX
    const bessOpex = bessCapex * bessOmPctDecimal

    // Net BESS benefit
    const netBessBenefit = bessNetRevenue - bessOpex

    // Combined metrics with BESS
    const totalRevenueWithBESS = netRevenue + bessNetRevenue
    const totalOpexWithBESS = totalOpex + bessOpex
    const ebitdaWithBESS = totalRevenueWithBESS - totalOpexWithBESS

    // Financing with BESS
    const loanAmountWithBESS = existingLoan > 0 ? existingLoan : totalCapex * ltvPct
    let cashRequiredWithBESS = totalCapex - loanAmountWithBESS
    if (cashRequiredWithBESS < 0) cashRequiredWithBESS = 0
    
    let debtServiceWithBESS = 0
    if (loanAmountWithBESS > 0 && loanTermYears > 0) {
      const monthlyRate = interestPct / 12
      const numPayments = loanTermYears * 12
      if (monthlyRate > 0) {
        const monthlyPayment = loanAmountWithBESS * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                              (Math.pow(1 + monthlyRate, numPayments) - 1)
        debtServiceWithBESS = monthlyPayment * 12
      } else {
        debtServiceWithBESS = loanAmountWithBESS / loanTermYears
      }
    }

    const netProfitWithBESS = ebitdaWithBESS - debtServiceWithBESS
    const roiWithBESS = cashRequiredWithBESS > 0 ? (netProfitWithBESS / cashRequiredWithBESS) * 100 : 0
    const paybackWithBESS = netProfitWithBESS > 0 ? cashRequiredWithBESS / netProfitWithBESS : 999
    
    // Cash-on-cash with BESS
    const cashOnCashReturnWithBESS = roiWithBESS
    
    // DSCR with BESS
    const dscrWithBESS = debtServiceWithBESS > 0 ? ebitdaWithBESS / debtServiceWithBESS : 999

    // Generate 25-year cash flows with BESS for IRR
    const cashFlowsWithBESS: number[] = [-cashRequiredWithBESS]
    let totalDistributions25WithBESS = 0
    for (let year = 1; year <= 25; year++) {
      const yearDegradation = Math.pow(1 - degradationPct, year - 1)
      const bessDegradation = Math.pow(1 - BESS_DEFAULTS.annualCapacityLoss, year - 1)
      const yearSolarProfit = netProfit * yearDegradation
      const yearBessBenefit = netBessBenefit * bessDegradation
      const yearTotalProfit = yearSolarProfit + yearBessBenefit - (debtServiceWithBESS - debtService) * (year <= loanTermYears ? 1 : 0)
      // Simplified: assume same debt service pattern
      const yearNetProfit = netProfitWithBESS * yearDegradation * (year <= 15 ? 1 : (1 + (debtService > 0 ? debtService/netProfitWithBESS : 0)))
      cashFlowsWithBESS.push(netProfitWithBESS * Math.pow(1 - degradationPct, year - 1) * Math.pow(1 - BESS_DEFAULTS.annualCapacityLoss * 0.3, year - 1))
      totalDistributions25WithBESS += netProfitWithBESS * Math.pow(1 - degradationPct, year - 1)
    }
    
    // IRR with BESS
    const irrWithBESS = calculateIRR(cashFlowsWithBESS)
    
    // Equity Multiple with BESS
    const equityMultipleWithBESS = cashRequiredWithBESS > 0 ? totalDistributions25WithBESS / cashRequiredWithBESS : 0

    // NPV with BESS
    let npv25WithBESS = -cashRequiredWithBESS
    for (let year = 1; year <= 25; year++) {
      const yearDegradation = Math.pow(1 - degradationPct, year - 1)
      const bessDegradation = Math.pow(1 - BESS_DEFAULTS.annualCapacityLoss, year - 1)
      const yearProfit = (netProfit * yearDegradation) + (netBessBenefit * bessDegradation)
      npv25WithBESS += yearProfit / Math.pow(1 + discountPct, year)
    }

    setResults({
      solarCapex,
      grossProduction,
      curtailedEnergy,
      netProduction,
      grossRevenue,
      curtailmentLoss,
      curtailmentCompensationRevenue,
      netRevenue,
      totalOpex,
      ebitda,
      debtService,
      netProfit,
      cashRequired,
      loanAmount,
      roi,
      paybackYears,
      npv25,
      irr,
      
      bessCapacity,
      bessCapex,
      totalCapex,
      recoverableEnergy,
      bessGrossRevenue,
      lostCurtailmentCompensation,
      bessNetRevenue,
      bessOpex,
      netBessBenefit,
      totalRevenueWithBESS,
      totalOpexWithBESS,
      ebitdaWithBESS,
      debtServiceWithBESS,
      netProfitWithBESS,
      cashRequiredWithBESS,
      loanAmountWithBESS,
      roiWithBESS,
      paybackWithBESS,
      npv25WithBESS,
      irrWithBESS,
      
      // Investor metrics
      cashOnCashReturn,
      equityMultiple,
      dscr,
      cashOnCashReturnWithBESS,
      equityMultipleWithBESS,
      dscrWithBESS,
      totalDistributions25,
      totalDistributions25WithBESS,
    })
  }, [inputs])

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateResults()
  }, [calculateResults])

  // Generate and download report
  const generateReport = () => {
    if (!results) return

    trackEvent('advanced_calculator_report', 'Calculator', inputs.projectName || 'Unnamed', results.totalCapex)

    const reportDate = new Date().toLocaleDateString('en-GB', { 
      day: 'numeric', month: 'long', year: 'numeric' 
    })
    const referenceId = `SF-${Date.now().toString(36).toUpperCase()}`
    
    // Calculate effective rates for formulas
    const effectiveRate = inputs.ppaType === 'FIXED' ? inputs.ppaRate : inputs.daytimeRate
    const bessSellingRate = inputs.nightRate * (1 + inputs.nightArbitragePremium / 100)

    const reportHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Investment Analysis - ${inputs.projectName || 'Solar Project'}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      color: #1f2937; 
      line-height: 1.6;
      background: #f9fafb;
    }
    .page { 
      max-width: 210mm; 
      margin: 0 auto; 
      background: white; 
      padding: 40px;
      min-height: 297mm;
    }
    .header { 
      display: flex; 
      justify-content: space-between; 
      align-items: center;
      border-bottom: 3px solid #f59e0b; 
      padding-bottom: 20px; 
      margin-bottom: 30px; 
    }
    .logo { font-size: 28px; font-weight: bold; }
    .logo span { color: #f59e0b; }
    .logo .sub { font-size: 12px; color: #6b7280; font-weight: normal; }
    .meta { text-align: right; font-size: 12px; color: #6b7280; }
    .meta .ref { font-weight: bold; color: #1f2937; }
    
    h1 { font-size: 24px; color: #1f2937; margin-bottom: 10px; }
    h2 { font-size: 18px; color: #0ea5e9; margin: 25px 0 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
    h3 { font-size: 14px; color: #374151; margin: 15px 0 10px; }
    
    .executive-summary { 
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); 
      padding: 25px; 
      border-radius: 12px; 
      margin-bottom: 30px;
      border-left: 5px solid #f59e0b;
    }
    .summary-title { font-size: 16px; font-weight: bold; color: #92400e; margin-bottom: 15px; }
    .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
    .kpi { text-align: center; background: white; padding: 15px 10px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .kpi-value { font-size: 20px; font-weight: bold; color: #059669; }
    .kpi-label { font-size: 11px; color: #6b7280; margin-top: 5px; }
    
    .section { margin-bottom: 25px; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th { background: #f3f4f6; padding: 10px; text-align: left; font-weight: 600; }
    td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
    td:last-child { text-align: right; font-weight: 500; }
    
    .comparison-table { margin-top: 20px; }
    .comparison-table th { background: #0ea5e9; color: white; }
    .comparison-table .highlight { background: #ecfdf5; }
    .comparison-table .better { color: #059669; font-weight: bold; }
    .comparison-table .worse { color: #dc2626; }
    
    .bess-section { background: #f0f9ff; padding: 20px; border-radius: 8px; border: 1px solid #bae6fd; margin-bottom: 20px; }
    .formula-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 11px; margin: 10px 0; }
    .formula-box .label { color: #64748b; margin-bottom: 5px; }
    .formula-box .formula { color: #1e293b; }
    .formula-box .result { color: #059669; font-weight: bold; margin-top: 5px; }
    
    .investor-metrics { background: #faf5ff; padding: 20px; border-radius: 8px; border: 1px solid #e9d5ff; }
    
    .disclaimer { 
      background: #fef2f2; 
      border: 1px solid #fecaca; 
      padding: 15px; 
      border-radius: 8px; 
      font-size: 11px; 
      color: #991b1b;
      margin-top: 30px;
    }
    
    .footer { 
      margin-top: 40px; 
      padding-top: 20px; 
      border-top: 2px solid #0ea5e9; 
      font-size: 11px; 
      color: #6b7280;
    }
    .footer-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
    .footer h4 { font-size: 12px; color: #1f2937; margin-bottom: 8px; }
    .footer a { color: #0ea5e9; text-decoration: none; }
    
    @media print {
      body { background: white; }
      .page { box-shadow: none; padding: 20px; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="logo">
        Solar<span>Farms</span>.cy
        <div class="sub">by Lighthief Cyprus Ltd</div>
      </div>
      <div class="meta">
        <div class="ref">Ref: ${referenceId}</div>
        <div>${reportDate}</div>
        <div>Investment Analysis Report</div>
      </div>
    </div>

    <h1>${inputs.projectName || 'Solar Project'} - Investment Analysis</h1>
    <p style="color: #6b7280; margin-bottom: 20px;">
      ${inputs.capacityDC} MW DC / ${inputs.capacityAC} MW AC | ${PROJECT_STAGES[inputs.projectStage].name} | ${TECHNOLOGY_TYPES[inputs.technology].name}
    </p>

    <div class="executive-summary">
      <div class="summary-title">Executive Summary ${inputs.includeBESS ? '(Solar + BESS)' : '(Solar Only)'}</div>
      <div class="kpi-grid">
        <div class="kpi">
          <div class="kpi-value">${formatCurrency(inputs.includeBESS ? results.totalCapex : results.solarCapex)}</div>
          <div class="kpi-label">Total Investment</div>
        </div>
        <div class="kpi">
          <div class="kpi-value">${formatPercentage(inputs.includeBESS ? results.roiWithBESS : results.roi)}</div>
          <div class="kpi-label">Cash-on-Cash ROI</div>
        </div>
        <div class="kpi">
          <div class="kpi-value">${(inputs.includeBESS ? results.irrWithBESS : results.irr).toFixed(1)}%</div>
          <div class="kpi-label">IRR (25-Year)</div>
        </div>
        <div class="kpi">
          <div class="kpi-value">${(inputs.includeBESS ? results.paybackWithBESS : results.paybackYears).toFixed(1)} yrs</div>
          <div class="kpi-label">Payback Period</div>
        </div>
      </div>
      <div class="kpi-grid" style="margin-top: 15px;">
        <div class="kpi">
          <div class="kpi-value">${formatCurrency(inputs.includeBESS ? results.netProfitWithBESS : results.netProfit)}</div>
          <div class="kpi-label">Annual Net Profit</div>
        </div>
        <div class="kpi">
          <div class="kpi-value">${formatCurrency(inputs.includeBESS ? results.npv25WithBESS : results.npv25)}</div>
          <div class="kpi-label">25-Year NPV</div>
        </div>
        <div class="kpi">
          <div class="kpi-value">${(inputs.includeBESS ? results.equityMultipleWithBESS : results.equityMultiple).toFixed(2)}x</div>
          <div class="kpi-label">Equity Multiple</div>
        </div>
        <div class="kpi">
          <div class="kpi-value">${(inputs.includeBESS ? results.dscrWithBESS : results.dscr).toFixed(2)}x</div>
          <div class="kpi-label">DSCR</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Project Parameters</h2>
      <table>
        <tr><td>Project Stage</td><td>${PROJECT_STAGES[inputs.projectStage].name}</td></tr>
        <tr><td>Technology</td><td>${TECHNOLOGY_TYPES[inputs.technology].name}</td></tr>
        <tr><td>DC Capacity</td><td>${inputs.capacityDC.toFixed(2)} MW</td></tr>
        <tr><td>AC Capacity (Grid)</td><td>${inputs.capacityAC.toFixed(2)} MW</td></tr>
        <tr><td>Asking Price</td><td>${formatCurrency(inputs.askingPrice)}</td></tr>
        <tr><td>Price per MW</td><td>${formatCurrency(pricePerMW)}/MW</td></tr>
        <tr><td>Annual Yield</td><td>${inputs.annualYield.toLocaleString()} kWh/kWp</td></tr>
        <tr><td>Annual Degradation</td><td>${inputs.annualDegradation}%</td></tr>
      </table>
    </div>

    <div class="section">
      <h2>Revenue & Curtailment Analysis</h2>
      <table>
        <tr><td>PPA Type</td><td>${PPA_TYPES[inputs.ppaType].name}</td></tr>
        <tr><td>Daytime Selling Rate</td><td>€${inputs.daytimeRate.toFixed(3)}/kWh</td></tr>
        <tr><td>Night Discharge Rate (BESS)</td><td>€${inputs.nightRate.toFixed(3)}/kWh</td></tr>
        <tr><td>Curtailment Rate</td><td>${inputs.curtailmentRate.toFixed(1)}%</td></tr>
        <tr><td>Curtailed Energy Rate</td><td>€${inputs.curtailedEnergyRate.toFixed(3)}/kWh</td></tr>
        <tr><td>Curtailment Compensation %</td><td>${inputs.curtailmentCompensation.toFixed(1)}%</td></tr>
      </table>
      
      <h3>Curtailment Compensation Value</h3>
      <div class="formula-box">
        <div class="label">Formula:</div>
        <div class="formula">Compensation = Curtailed Energy × Curtailed Rate × Compensation %</div>
        <div class="formula">= ${(results.curtailedEnergy / 1000).toFixed(0)} MWh × €${inputs.curtailedEnergyRate.toFixed(3)} × ${inputs.curtailmentCompensation}%</div>
        <div class="result">= ${formatCurrency(results.curtailmentCompensationRevenue)}/year</div>
      </div>
    </div>

    <div class="section">
      <h2>Production & Revenue Analysis</h2>
      <table>
        <tr><td>Gross Annual Production</td><td>${(results.grossProduction / 1000).toLocaleString()} MWh</td></tr>
        <tr><td>Curtailed Energy</td><td>${(results.curtailedEnergy / 1000).toLocaleString()} MWh (${inputs.curtailmentRate.toFixed(1)}%)</td></tr>
        <tr><td>Net Sold Energy</td><td>${(results.netProduction / 1000).toLocaleString()} MWh</td></tr>
        <tr><td>Gross Revenue (if no curtailment)</td><td>${formatCurrency(results.grossRevenue)}</td></tr>
        <tr style="color: #dc2626;"><td>Revenue Loss to Curtailment</td><td>-${formatCurrency(results.curtailmentLoss)}</td></tr>
        <tr style="color: #059669;"><td>Curtailment Compensation Revenue</td><td>+${formatCurrency(results.curtailmentCompensationRevenue)}</td></tr>
        <tr style="background: #ecfdf5;"><td><strong>Net Annual Revenue</strong></td><td><strong>${formatCurrency(results.netRevenue)}</strong></td></tr>
      </table>
    </div>

    ${inputs.includeBESS ? `
    <div class="section bess-section">
      <h2 style="color: #0369a1; border-color: #0ea5e9; margin-top: 0;">BESS Integration Analysis</h2>
      <table>
        <tr><td>BESS Duration</td><td>${inputs.bessDuration}-hour system</td></tr>
        <tr><td>BESS Capacity</td><td>${(results.bessCapacity / 1000).toFixed(2)} MWh</td></tr>
        <tr><td>BESS Capex</td><td>${formatCurrency(results.bessCapex)}</td></tr>
        <tr><td>Round Trip Efficiency (RTE)</td><td>${inputs.bessRTE.toFixed(2)}%</td></tr>
        <tr><td>BESS O&M Cost</td><td>${inputs.bessOmPct}% of capex = ${formatCurrency(results.bessOpex)}/year</td></tr>
      </table>

      <h3>BESS Revenue Calculation</h3>
      <div class="formula-box">
        <div class="label">Step 1: Recoverable Energy</div>
        <div class="formula">= Curtailed Energy × Recovery Rate × RTE</div>
        <div class="formula">= ${(results.curtailedEnergy / 1000).toFixed(0)} MWh × ${inputs.curtailmentRecoveryRate}% × ${inputs.bessRTE}%</div>
        <div class="result">= ${(results.recoverableEnergy / 1000).toFixed(1)} MWh/year</div>
      </div>
      
      <div class="formula-box">
        <div class="label">Step 2: BESS Gross Revenue (Night Discharge)</div>
        <div class="formula">= Recoverable Energy × Night Rate × (1 + Arbitrage Premium)</div>
        <div class="formula">= ${(results.recoverableEnergy / 1000).toFixed(1)} MWh × €${inputs.nightRate.toFixed(3)} × (1 + ${inputs.nightArbitragePremium}%)</div>
        <div class="formula">= ${(results.recoverableEnergy / 1000).toFixed(1)} MWh × €${bessSellingRate.toFixed(3)}/kWh</div>
        <div class="result">= ${formatCurrency(results.bessGrossRevenue)}/year</div>
      </div>
      
      <div class="formula-box">
        <div class="label">Step 3: Lost Curtailment Compensation</div>
        <div class="formula">= (Recoverable Energy ÷ RTE) × Curtailed Rate × Compensation %</div>
        <div class="formula">= ${((results.recoverableEnergy / (inputs.bessRTE/100)) / 1000).toFixed(1)} MWh × €${inputs.curtailedEnergyRate.toFixed(3)} × ${inputs.curtailmentCompensation}%</div>
        <div class="result" style="color: #dc2626;">= -${formatCurrency(results.lostCurtailmentCompensation)}/year</div>
      </div>
      
      <div class="formula-box">
        <div class="label">Step 4: Net BESS Benefit</div>
        <div class="formula">= Gross Revenue - Lost Compensation - BESS O&M</div>
        <div class="formula">= ${formatCurrency(results.bessGrossRevenue)} - ${formatCurrency(results.lostCurtailmentCompensation)} - ${formatCurrency(results.bessOpex)}</div>
        <div class="result">= ${formatCurrency(results.netBessBenefit)}/year</div>
      </div>

      <h3 style="margin-top: 20px;">Solar Only vs Solar + BESS Comparison</h3>
      <table class="comparison-table">
        <tr>
          <th>Metric</th>
          <th>Solar Only</th>
          <th>Solar + BESS</th>
          <th>Difference</th>
        </tr>
        <tr>
          <td>Total Capex</td>
          <td>${formatCurrency(results.solarCapex)}</td>
          <td>${formatCurrency(results.totalCapex)}</td>
          <td>+${formatCurrency(results.bessCapex)}</td>
        </tr>
        <tr>
          <td>Equity Required</td>
          <td>${formatCurrency(results.cashRequired)}</td>
          <td>${formatCurrency(results.cashRequiredWithBESS)}</td>
          <td>+${formatCurrency(results.cashRequiredWithBESS - results.cashRequired)}</td>
        </tr>
        <tr>
          <td>Annual Net Profit</td>
          <td>${formatCurrency(results.netProfit)}</td>
          <td>${formatCurrency(results.netProfitWithBESS)}</td>
          <td class="${results.netProfitWithBESS > results.netProfit ? 'better' : 'worse'}">+${formatCurrency(results.netProfitWithBESS - results.netProfit)}</td>
        </tr>
        <tr class="highlight">
          <td><strong>Cash-on-Cash ROI</strong></td>
          <td>${formatPercentage(results.roi)}</td>
          <td>${formatPercentage(results.roiWithBESS)}</td>
          <td class="${results.roiWithBESS > results.roi ? 'better' : 'worse'}">${results.roiWithBESS > results.roi ? '+' : ''}${(results.roiWithBESS - results.roi).toFixed(2)}%</td>
        </tr>
        <tr class="highlight">
          <td><strong>IRR (25-Year)</strong></td>
          <td>${results.irr.toFixed(1)}%</td>
          <td>${results.irrWithBESS.toFixed(1)}%</td>
          <td class="${results.irrWithBESS > results.irr ? 'better' : 'worse'}">${results.irrWithBESS > results.irr ? '+' : ''}${(results.irrWithBESS - results.irr).toFixed(1)}%</td>
        </tr>
        <tr>
          <td>Payback Period</td>
          <td>${results.paybackYears.toFixed(1)} years</td>
          <td>${results.paybackWithBESS.toFixed(1)} years</td>
          <td class="${results.paybackWithBESS < results.paybackYears ? 'better' : 'worse'}">${(results.paybackWithBESS - results.paybackYears).toFixed(1)} years</td>
        </tr>
        <tr>
          <td>25-Year NPV</td>
          <td>${formatCurrency(results.npv25)}</td>
          <td>${formatCurrency(results.npv25WithBESS)}</td>
          <td class="${results.npv25WithBESS > results.npv25 ? 'better' : 'worse'}">+${formatCurrency(results.npv25WithBESS - results.npv25)}</td>
        </tr>
        <tr>
          <td>Equity Multiple</td>
          <td>${results.equityMultiple.toFixed(2)}x</td>
          <td>${results.equityMultipleWithBESS.toFixed(2)}x</td>
          <td class="${results.equityMultipleWithBESS > results.equityMultiple ? 'better' : 'worse'}">${results.equityMultipleWithBESS > results.equityMultiple ? '+' : ''}${(results.equityMultipleWithBESS - results.equityMultiple).toFixed(2)}x</td>
        </tr>
      </table>
    </div>
    ` : ''}

    <div class="section investor-metrics">
      <h2 style="color: #7c3aed; border-color: #a78bfa;">Investor Metrics</h2>
      <table>
        <tr><td>Total Investment</td><td>${formatCurrency(inputs.includeBESS ? results.totalCapex : results.solarCapex)}</td></tr>
        <tr><td>Equity Required</td><td>${formatCurrency(inputs.includeBESS ? results.cashRequiredWithBESS : results.cashRequired)}</td></tr>
        <tr><td>Debt Financing</td><td>${formatCurrency(inputs.includeBESS ? results.loanAmountWithBESS : results.loanAmount)} (${inputs.ltvPercent}% LTV)</td></tr>
        <tr><td>Interest Rate</td><td>${inputs.interestRate.toFixed(2)}%</td></tr>
        <tr><td>Loan Term</td><td>${inputs.loanTermYears} years</td></tr>
        <tr><td>Annual Debt Service</td><td>${formatCurrency(inputs.includeBESS ? results.debtServiceWithBESS : results.debtService)}</td></tr>
        <tr style="background: #f5f3ff;"><td><strong>DSCR (Debt Service Coverage)</strong></td><td><strong>${(inputs.includeBESS ? results.dscrWithBESS : results.dscr).toFixed(2)}x</strong></td></tr>
        <tr style="background: #f5f3ff;"><td><strong>Cash-on-Cash Return</strong></td><td><strong>${formatPercentage(inputs.includeBESS ? results.cashOnCashReturnWithBESS : results.cashOnCashReturn)}</strong></td></tr>
        <tr style="background: #f5f3ff;"><td><strong>IRR (25-Year)</strong></td><td><strong>${(inputs.includeBESS ? results.irrWithBESS : results.irr).toFixed(1)}%</strong></td></tr>
        <tr style="background: #f5f3ff;"><td><strong>Equity Multiple (25-Year)</strong></td><td><strong>${(inputs.includeBESS ? results.equityMultipleWithBESS : results.equityMultiple).toFixed(2)}x</strong></td></tr>
        <tr><td>Total Distributions (25 years)</td><td>${formatCurrency(inputs.includeBESS ? results.totalDistributions25WithBESS : results.totalDistributions25)}</td></tr>
      </table>
    </div>

    <div class="section">
      <h2>Operating Costs Breakdown</h2>
      <table>
        <tr><td>O&M (${formatCurrency(inputs.omCostPerMW)}/MW × ${inputs.capacityDC} MW)</td><td>${formatCurrency(inputs.omCostPerMW * inputs.capacityDC)}</td></tr>
        <tr><td>Insurance</td><td>${formatCurrency(inputs.insurance)}</td></tr>
        <tr><td>Land Lease</td><td>${formatCurrency(inputs.landLease)}</td></tr>
        <tr><td>Administration</td><td>${formatCurrency(inputs.administration)}</td></tr>
        <tr><td>Other Costs</td><td>${formatCurrency(inputs.otherCosts)}</td></tr>
        ${inputs.includeBESS ? `<tr><td>BESS O&M (${inputs.bessOmPct}% of €${(results.bessCapex/1000).toFixed(0)}k)</td><td>${formatCurrency(results.bessOpex)}</td></tr>` : ''}
        <tr style="background: #f3f4f6;"><td><strong>Total Annual OPEX</strong></td><td><strong>${formatCurrency(inputs.includeBESS ? results.totalOpexWithBESS : results.totalOpex)}</strong></td></tr>
      </table>
    </div>

    <div class="section">
      <h2>Financing Structure</h2>
      <table>
        <tr><td>LTV (Loan-to-Value)</td><td>${inputs.ltvPercent}%</td></tr>
        <tr><td>Total Investment</td><td>${formatCurrency(inputs.includeBESS ? results.totalCapex : results.solarCapex)}</td></tr>
        <tr><td>Equity Required</td><td>${formatCurrency(inputs.includeBESS ? results.cashRequiredWithBESS : results.cashRequired)}</td></tr>
        <tr><td>Debt Financing</td><td>${formatCurrency(inputs.includeBESS ? results.loanAmountWithBESS : results.loanAmount)}</td></tr>
        ${inputs.existingLoan > 0 ? `<tr><td>Existing Loan Balance</td><td>${formatCurrency(inputs.existingLoan)}</td></tr>` : ''}
        ${(inputs.includeBESS ? results.loanAmountWithBESS : results.loanAmount) > 0 ? `
        <tr><td>Interest Rate</td><td>${inputs.interestRate.toFixed(2)}%</td></tr>
        <tr><td>Loan Term</td><td>${inputs.loanTermYears} years</td></tr>
        <tr><td>Annual Debt Service</td><td>${formatCurrency(inputs.includeBESS ? results.debtServiceWithBESS : results.debtService)}</td></tr>
        ` : ''}
      </table>
    </div>

    <div class="disclaimer">
      <strong>Important Disclaimer:</strong> This analysis is provided for informational purposes only and does not constitute investment advice. 
      Actual returns may vary based on weather conditions, electricity market prices, grid curtailment levels, equipment performance, 
      regulatory changes, and other factors. All investments carry risk, including potential loss of capital. 
      Past performance does not guarantee future results. The IRR calculation assumes reinvestment at the same rate and may not reflect actual returns.
      Consult with qualified financial and legal advisors before making investment decisions.
    </div>

    <div class="footer">
      <div class="footer-grid">
        <div>
          <h4>Company</h4>
          <div>${COMPANY_DATA.legalName}</div>
          <div>${COMPANY_DATA.address.office.full}</div>
          <div>Reg: ${COMPANY_DATA.registration.companyNumber}</div>
        </div>
        <div>
          <h4>Business Development</h4>
          <div>${COMPANY_DATA.contacts.businessDevelopment.name}</div>
          <div>${COMPANY_DATA.contacts.businessDevelopment.phone}</div>
          <div><a href="mailto:${COMPANY_DATA.contacts.businessDevelopment.email}">${COMPANY_DATA.contacts.businessDevelopment.email}</a></div>
        </div>
        <div>
          <h4>Investor Relations</h4>
          <div>${COMPANY_DATA.contacts.investors.name}</div>
          <div>${COMPANY_DATA.contacts.investors.phone}</div>
          <div><a href="mailto:${COMPANY_DATA.contacts.investors.email}">${COMPANY_DATA.contacts.investors.email}</a></div>
        </div>
      </div>
      <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #e5e7eb;">
        <a href="https://solarfarms.cy" style="font-weight: bold;">www.solarfarms.cy</a> | ${COMPANY_DATA.phone} | ${COMPANY_DATA.email}
      </div>
    </div>
  </div>
</body>
</html>
    `

    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(reportHTML)
      printWindow.document.close()
      printWindow.focus()
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="text-center pb-4 border-b">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calculator className="w-8 h-8 text-solar-500" />
            <CardTitle className="text-2xl font-heading gradient-text">
              Advanced Project Calculator
            </CardTitle>
          </div>
          <CardDescription className="text-base text-gray-600">
            Comprehensive investment analysis with customizable parameters • All fields pre-filled with Cyprus market data
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Inputs */}
            <div className="lg:col-span-2 space-y-6">
              {/* Input Navigation */}
              <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="project" className="text-xs">Project</TabsTrigger>
                  <TabsTrigger value="revenue" className="text-xs">Revenue</TabsTrigger>
                  <TabsTrigger value="curtailment" className="text-xs">Curtailment</TabsTrigger>
                  <TabsTrigger value="bess" className="text-xs">BESS</TabsTrigger>
                  <TabsTrigger value="finance" className="text-xs">Finance</TabsTrigger>
                </TabsList>

                {/* Project Info Tab */}
                <TabsContent value="project" className="mt-4 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField label="Project Name" tooltip="Enter a name for your investment report">
                      <Input
                        value={inputs.projectName}
                        onChange={(e) => updateInput('projectName', e.target.value)}
                        placeholder="e.g., Nicosia Solar Park"
                      />
                    </FormField>

                    <FormField label="Project Stage" tooltip="Current development status">
                      <Select value={inputs.projectStage} onValueChange={(v) => updateInput('projectStage', v as keyof typeof PROJECT_STAGES)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {Object.entries(PROJECT_STAGES).map(([key, { name }]) => (
                            <SelectItem key={key} value={key}>{name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormField>

                    <FormField label="Capacity DC (MW)" tooltip="Total DC capacity of the solar array">
                      <Input
                        type="number"
                        step="0.01"
                        value={inputs.capacityDC}
                        onChange={(e) => updateInput('capacityDC', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>

                    <FormField label="Capacity AC (MW)" tooltip="Grid connection capacity (typically 90-95% of DC)">
                      <Input
                        type="number"
                        step="0.01"
                        value={inputs.capacityAC}
                        onChange={(e) => updateInput('capacityAC', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>

                    <FormField label="Technology" tooltip="Panel and mounting system type">
                      <Select value={inputs.technology} onValueChange={(v) => updateInput('technology', v as keyof typeof TECHNOLOGY_TYPES)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {Object.entries(TECHNOLOGY_TYPES).map(([key, { name }]) => (
                            <SelectItem key={key} value={key}>{name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormField>

                    <FormField label="Asking Price (€)" tooltip="Total acquisition cost for the project">
                      <Input
                        type="number"
                        step="100000"
                        value={inputs.askingPrice}
                        onChange={(e) => updateInput('askingPrice', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Price per MW:</span>
                        <span className="font-semibold ml-2">{formatCurrency(pricePerMW)}/MW</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Technology Yield Boost:</span>
                        <span className="font-semibold ml-2">+{((TECHNOLOGY_TYPES[inputs.technology].yieldMultiplier - 1) * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField label="Annual Yield (kWh/kWp)" tooltip="Expected energy production per kWp installed (Cyprus avg: 1,500-1,800)">
                      <Input
                        type="number"
                        value={inputs.annualYield}
                        onChange={(e) => updateInput('annualYield', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>

                    <FormField label="Annual Degradation (%)" tooltip="Annual panel performance loss (industry standard: 0.5%)">
                      <Input
                        type="number"
                        step="0.1"
                        value={inputs.annualDegradation}
                        onChange={(e) => updateInput('annualDegradation', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>
                  </div>
                </TabsContent>

                {/* Revenue Tab */}
                <TabsContent value="revenue" className="mt-4 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField label="PPA Type" tooltip="Power Purchase Agreement structure">
                      <Select value={inputs.ppaType} onValueChange={(v) => updateInput('ppaType', v as keyof typeof PPA_TYPES)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {Object.entries(PPA_TYPES).map(([key, { name }]) => (
                            <SelectItem key={key} value={key}>{name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormField>

                    <FormField label="Daytime Selling Rate (€/kWh)" tooltip="Average merchant rate during solar hours (Cyprus 2024-25 avg: €0.19/kWh)">
                      <Input
                        type="number"
                        step="0.001"
                        value={inputs.daytimeRate}
                        onChange={(e) => updateInput('daytimeRate', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>

                    <FormField label="Night Discharge Rate (€/kWh)" tooltip="Evening peak rate for BESS discharge (typically €0.19-0.21/kWh)">
                      <Input
                        type="number"
                        step="0.001"
                        value={inputs.nightRate}
                        onChange={(e) => updateInput('nightRate', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>

                    {inputs.ppaType === 'FIXED' && (
                      <FormField label="Fixed PPA Rate (€/kWh)" tooltip="Contracted rate for fixed PPA">
                        <Input
                          type="number"
                          step="0.001"
                          value={inputs.ppaRate}
                          onChange={(e) => updateInput('ppaRate', parseFloat(e.target.value) || 0)}
                        />
                      </FormField>
                    )}
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg text-sm">
                    <Info className="w-4 h-4 inline text-blue-600 mr-2" />
                    <span className="text-blue-800">
                      Cyprus 2024-25 market rates: Daytime €0.17-0.21/kWh, Evening peak €0.19-0.23/kWh
                    </span>
                  </div>
                </TabsContent>

                {/* Curtailment Tab */}
                <TabsContent value="curtailment" className="mt-4 space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg mb-4">
                    <AlertTriangle className="w-4 h-4 inline text-red-600 mr-2" />
                    <span className="text-red-800 text-sm">
                      Cyprus grid curtailment reached 45.8% in 2025. Average 2022-2025: 25.8%
                    </span>
                  </div>

                  <div className="space-y-6">
                    <FormField label={`Curtailment Rate: ${inputs.curtailmentRate.toFixed(1)}%`} tooltip="Percentage of energy curtailed by the grid operator">
                      <Slider
                        value={[inputs.curtailmentRate]}
                        onValueChange={([v]) => updateInput('curtailmentRate', v)}
                        min={0}
                        max={60}
                        step={0.5}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0%</span>
                        <span>30%</span>
                        <span>60%</span>
                      </div>
                    </FormField>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField label="Curtailed Energy Rate (€/kWh)" tooltip="Rate paid by grid for curtailed energy (enter 0 if none)">
                        <Input
                          type="number"
                          step="0.001"
                          value={inputs.curtailedEnergyRate}
                          onChange={(e) => updateInput('curtailedEnergyRate', parseFloat(e.target.value) || 0)}
                        />
                      </FormField>

                      <FormField label="Curtailment Compensation (%)" tooltip="Percentage of curtailed energy compensated under PPA terms">
                        <Input
                          type="number"
                          step="1"
                          value={inputs.curtailmentCompensation}
                          onChange={(e) => updateInput('curtailmentCompensation', parseFloat(e.target.value) || 0)}
                        />
                      </FormField>
                    </div>
                    
                    {results && (
                      <div className="bg-green-50 p-4 rounded-lg text-sm">
                        <CheckCircle className="w-4 h-4 inline text-green-600 mr-2" />
                        <span className="text-green-800">
                          Curtailment Compensation Revenue: <strong>{formatCurrency(results.curtailmentCompensationRevenue)}/year</strong>
                        </span>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* BESS Tab */}
                <TabsContent value="bess" className="mt-4 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Battery className="w-6 h-6 text-blue-600" />
                      <div>
                        <div className="font-semibold">Include BESS Analysis</div>
                        <div className="text-sm text-gray-600">Add battery storage to recover curtailed energy</div>
                      </div>
                    </div>
                    <Switch
                      checked={inputs.includeBESS}
                      onCheckedChange={(v) => updateInput('includeBESS', v)}
                    />
                  </div>

                  {inputs.includeBESS && (
                    <div className="space-y-4 p-4 border border-blue-200 rounded-lg bg-blue-50/50">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField label="BESS Duration (Hours)" tooltip="System size: capacity = MW × hours">
                          <Select value={inputs.bessDuration.toString()} onValueChange={(v) => updateInput('bessDuration', parseInt(v))}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2">2-Hour System</SelectItem>
                              <SelectItem value="3">3-Hour System</SelectItem>
                              <SelectItem value="4">4-Hour System</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormField>

                        <FormField label="BESS Cost (€/kWh)" tooltip="Linyang full system cost per kWh installed (€140 typical)">
                          <Input
                            type="number"
                            value={inputs.bessCostPerKwh}
                            onChange={(e) => updateInput('bessCostPerKwh', parseFloat(e.target.value) || 0)}
                          />
                        </FormField>

                        <FormField label="Round Trip Efficiency (%)" tooltip="Linyang system RTE: 87.8% AC-AC (editable for other brands)">
                          <Input
                            type="number"
                            step="0.01"
                            value={inputs.bessRTE}
                            onChange={(e) => updateInput('bessRTE', parseFloat(e.target.value) || 0)}
                          />
                        </FormField>

                        <FormField label="BESS O&M (% of Capex)" tooltip="Annual O&M cost as percentage of BESS capex (typically 2%)">
                          <Input
                            type="number"
                            step="0.1"
                            value={inputs.bessOmPct}
                            onChange={(e) => updateInput('bessOmPct', parseFloat(e.target.value) || 0)}
                          />
                        </FormField>
                      </div>

                      <FormField label={`Curtailment Recovery Rate: ${inputs.curtailmentRecoveryRate.toFixed(0)}%`} tooltip="Percentage of curtailed energy recoverable via BESS">
                        <Slider
                          value={[inputs.curtailmentRecoveryRate]}
                          onValueChange={([v]) => updateInput('curtailmentRecoveryRate', v)}
                          min={20}
                          max={80}
                          step={5}
                          className="mt-2"
                        />
                      </FormField>
                      
                      <FormField label={`Night Arbitrage Premium: ${inputs.nightArbitragePremium.toFixed(1)}%`} tooltip="Additional premium for evening discharge vs day rate">
                        <Slider
                          value={[inputs.nightArbitragePremium]}
                          onValueChange={([v]) => updateInput('nightArbitragePremium', v)}
                          min={0}
                          max={30}
                          step={0.5}
                          className="mt-2"
                        />
                      </FormField>

                      {results && (
                        <div className="bg-white p-4 rounded-lg text-sm space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <div>BESS Capacity: <strong>{((inputs.capacityAC * inputs.bessDuration)).toFixed(1)} MWh</strong></div>
                            <div>BESS Capex: <strong>{formatCurrency(results.bessCapex)}</strong></div>
                            <div>BESS O&M: <strong>{formatCurrency(results.bessOpex)}/yr</strong></div>
                            <div>Net BESS Benefit: <strong className="text-green-600">{formatCurrency(results.netBessBenefit)}/yr</strong></div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>

                {/* Finance Tab */}
                <TabsContent value="finance" className="mt-4 space-y-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Financing Structure</h3>
                  
                  <FormField label={`Loan-to-Value (LTV): ${inputs.ltvPercent}%`} tooltip="Percentage of project cost financed by debt (0% = all cash)">
                    <Slider
                      value={[inputs.ltvPercent]}
                      onValueChange={([v]) => updateInput('ltvPercent', v)}
                      min={0}
                      max={80}
                      step={5}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0% (Cash)</span>
                      <span>40%</span>
                      <span>80% (Max)</span>
                    </div>
                  </FormField>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField label="Existing Loan (€)" tooltip="For operational projects with existing debt (leave 0 for new projects)">
                      <Input
                        type="number"
                        value={inputs.existingLoan}
                        onChange={(e) => updateInput('existingLoan', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>

                    <FormField label="Interest Rate (%)" tooltip="Annual loan interest rate (Cyprus avg: 4.5%)">
                      <Input
                        type="number"
                        step="0.1"
                        value={inputs.interestRate}
                        onChange={(e) => updateInput('interestRate', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>

                    <FormField label="Loan Term (Years)" tooltip="Loan repayment period">
                      <Input
                        type="number"
                        value={inputs.loanTermYears}
                        onChange={(e) => updateInput('loanTermYears', parseInt(e.target.value) || 0)}
                      />
                    </FormField>

                    <FormField label="Discount Rate (%)" tooltip="Rate used for NPV calculation (typical: 8%)">
                      <Input
                        type="number"
                        step="0.5"
                        value={inputs.discountRate}
                        onChange={(e) => updateInput('discountRate', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>
                  </div>
                  
                  {results && inputs.ltvPercent > 0 && (
                    <div className="bg-purple-50 p-4 rounded-lg text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div>Loan Amount: <strong>{formatCurrency(inputs.includeBESS ? results.loanAmountWithBESS : results.loanAmount)}</strong></div>
                        <div>Annual Debt Service: <strong>{formatCurrency(inputs.includeBESS ? results.debtServiceWithBESS : results.debtService)}</strong></div>
                        <div>DSCR: <strong>{(inputs.includeBESS ? results.dscrWithBESS : results.dscr).toFixed(2)}x</strong></div>
                        <div>Equity Required: <strong>{formatCurrency(inputs.includeBESS ? results.cashRequiredWithBESS : results.cashRequired)}</strong></div>
                      </div>
                    </div>
                  )}

                  <h3 className="font-semibold text-gray-900 mt-6 mb-3">Operating Costs</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField label="O&M Cost (€/MW/year)" tooltip="Operations & maintenance per MW">
                      <Input
                        type="number"
                        value={inputs.omCostPerMW}
                        onChange={(e) => updateInput('omCostPerMW', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>

                    <FormField label="Insurance (€/year)" tooltip="Annual asset insurance">
                      <Input
                        type="number"
                        value={inputs.insurance}
                        onChange={(e) => updateInput('insurance', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>

                    <FormField label="Land Lease (€/year)" tooltip="Annual land rental">
                      <Input
                        type="number"
                        value={inputs.landLease}
                        onChange={(e) => updateInput('landLease', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>

                    <FormField label="Administration (€/year)" tooltip="Management and accounting">
                      <Input
                        type="number"
                        value={inputs.administration}
                        onChange={(e) => updateInput('administration', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>

                    <FormField label="Other Costs (€/year)" tooltip="Miscellaneous operating costs">
                      <Input
                        type="number"
                        value={inputs.otherCosts}
                        onChange={(e) => updateInput('otherCosts', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Live Results */}
            <div className="space-y-4">
              <div className="sticky top-4">
                <Card className="border-2 border-solar-200 bg-gradient-to-br from-solar-50 to-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-solar-500" />
                      Live Results
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant={inputs.includeBESS ? "secondary" : "default"}>
                        {inputs.includeBESS ? 'Solar + BESS' : 'Solar Only'}
                      </Badge>
                      {inputs.ltvPercent > 0 && (
                        <Badge variant="outline">{inputs.ltvPercent}% LTV</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {results && (
                      <>
                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                            <div className="text-2xl font-bold text-green-600">
                              {formatPercentage(inputs.includeBESS ? results.roiWithBESS : results.roi)}
                            </div>
                            <div className="text-xs text-gray-600">Cash-on-Cash ROI</div>
                          </div>
                          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                            <div className="text-2xl font-bold text-blue-600">
                              {(inputs.includeBESS ? results.irrWithBESS : results.irr).toFixed(1)}%
                            </div>
                            <div className="text-xs text-gray-600">IRR (25-Year)</div>
                          </div>
                          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                            <div className="text-2xl font-bold text-purple-600">
                              {(inputs.includeBESS ? results.paybackWithBESS : results.paybackYears).toFixed(1)}
                            </div>
                            <div className="text-xs text-gray-600">Years Payback</div>
                          </div>
                          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                            <div className="text-2xl font-bold text-orange-600">
                              {(inputs.includeBESS ? results.equityMultipleWithBESS : results.equityMultiple).toFixed(2)}x
                            </div>
                            <div className="text-xs text-gray-600">Equity Multiple</div>
                          </div>
                        </div>

                        {/* Financial Summary */}
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Investment</span>
                            <span className="font-semibold">{formatCurrency(inputs.includeBESS ? results.totalCapex : results.solarCapex)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Equity Required</span>
                            <span className="font-semibold text-blue-600">{formatCurrency(inputs.includeBESS ? results.cashRequiredWithBESS : results.cashRequired)}</span>
                          </div>
                          {(inputs.includeBESS ? results.loanAmountWithBESS : results.loanAmount) > 0 && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Debt Financing</span>
                                <span className="font-semibold">{formatCurrency(inputs.includeBESS ? results.loanAmountWithBESS : results.loanAmount)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">DSCR</span>
                                <span className="font-semibold">{(inputs.includeBESS ? results.dscrWithBESS : results.dscr).toFixed(2)}x</span>
                              </div>
                            </>
                          )}
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Annual Revenue</span>
                              <span className="font-semibold">{formatCurrency(inputs.includeBESS ? results.totalRevenueWithBESS : results.netRevenue)}</span>
                            </div>
                            <div className="flex justify-between text-red-600">
                              <span>Curtailment Loss</span>
                              <span>-{formatCurrency(results.curtailmentLoss)}</span>
                            </div>
                            {results.curtailmentCompensationRevenue > 0 && (
                              <div className="flex justify-between text-green-600">
                                <span>Curtailment Comp.</span>
                                <span>+{formatCurrency(results.curtailmentCompensationRevenue)}</span>
                              </div>
                            )}
                            {inputs.includeBESS && (
                              <div className="flex justify-between text-green-600">
                                <span>BESS Net Benefit</span>
                                <span>+{formatCurrency(results.netBessBenefit)}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total OPEX</span>
                              <span className="font-semibold">-{formatCurrency(inputs.includeBESS ? results.totalOpexWithBESS : results.totalOpex)}</span>
                            </div>
                          </div>
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between text-lg">
                              <span className="font-semibold">Net Annual Profit</span>
                              <span className="font-bold text-green-600">{formatCurrency(inputs.includeBESS ? results.netProfitWithBESS : results.netProfit)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">25-Year NPV</span>
                              <span className="font-semibold text-green-600">{formatCurrency(inputs.includeBESS ? results.npv25WithBESS : results.npv25)}</span>
                            </div>
                          </div>
                        </div>

                        {/* BESS Comparison (if enabled) */}
                        {inputs.includeBESS && (
                          <div className="bg-blue-50 p-3 rounded-lg text-xs">
                            <div className="font-semibold text-blue-800 mb-2">BESS Impact</div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="text-gray-600">ROI Boost:</span>
                                <span className={`ml-1 font-semibold ${results.roiWithBESS > results.roi ? 'text-green-600' : 'text-red-600'}`}>
                                  {results.roiWithBESS > results.roi ? '+' : ''}{(results.roiWithBESS - results.roi).toFixed(2)}%
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600">IRR Boost:</span>
                                <span className={`ml-1 font-semibold ${results.irrWithBESS > results.irr ? 'text-green-600' : 'text-red-600'}`}>
                                  {results.irrWithBESS > results.irr ? '+' : ''}{(results.irrWithBESS - results.irr).toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Download Button */}
                        <Button 
                          onClick={generateReport}
                          className="w-full mt-4"
                          variant="gradient"
                          size="lg"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Investment Report
                        </Button>

                        <p className="text-xs text-gray-500 text-center">
                          Opens printable report • Save as PDF from browser
                        </p>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
