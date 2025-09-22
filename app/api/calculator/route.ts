import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema for calculator data
const calculatorSchema = z.object({
  projectSize: z.enum(['1MW', '5MW', '10MW']),
  customInvestment: z.number().optional(),
  electricityRate: z.number().min(0.05).max(0.5),
  operatingCosts: z.number().min(5).max(25), // Percentage
  location: z.string().optional(),
  generatePDF: z.boolean().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = calculatorSchema.parse(body)
    
    // Calculate ROI based on validated data
    const results = calculateROI(validatedData)
    
    // Track analytics
    await trackCalculatorUsage(validatedData, results)
    
    // Generate PDF if requested
    let pdfUrl = null
    if (validatedData.generatePDF) {
      pdfUrl = await generatePDFReport(validatedData, results)
    }
    
    return NextResponse.json(
      { 
        success: true,
        results,
        pdfUrl,
        calculationId: generateCalculationId()
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Calculator API error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid calculator parameters',
          errors: error.errors 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Calculation failed. Please try again.' 
      },
      { status: 500 }
    )
  }
}

function calculateROI(data: any) {
  // Cyprus solar constants
  const CYPRUS_CAPACITY_FACTOR = 0.22 // 22% capacity factor
  const HOURS_PER_YEAR = 8760
  
  // Determine capacity in MW
  const capacityMW = data.projectSize === '1MW' ? 1 : 
                    data.projectSize === '5MW' ? 5 : 10
  
  // Use custom investment or default ranges
  const investment = data.customInvestment || getDefaultInvestment(data.projectSize)
  
  // Calculate annual energy production
  const annualEnergyMWh = capacityMW * CYPRUS_CAPACITY_FACTOR * HOURS_PER_YEAR
  
  // Calculate revenue
  const annualRevenue = annualEnergyMWh * data.electricityRate * 1000 // Convert to €
  
  // Calculate operating costs
  const annualOperatingCosts = annualRevenue * (data.operatingCosts / 100)
  const annualProfit = annualRevenue - annualOperatingCosts
  
  // Calculate financial metrics
  const roi = (annualProfit / investment) * 100
  const paybackYears = investment / annualProfit
  const monthlyProfit = annualProfit / 12
  const breakEvenMonth = Math.ceil(paybackYears * 12)
  
  // Calculate 25-year NPV (8% discount rate)
  const discountRate = 0.08
  let npv25 = -investment
  for (let year = 1; year <= 25; year++) {
    // Account for 0.5% annual degradation
    const degradationFactor = Math.pow(0.995, year - 1)
    const yearlyProfit = annualProfit * degradationFactor
    npv25 += yearlyProfit / Math.pow(1 + discountRate, year)
  }
  
  // Calculate IRR (simplified approximation)
  const irr = calculateIRR(investment, annualProfit)
  
  return {
    projectSize: data.projectSize,
    location: data.location || 'Cyprus',
    investment,
    annualRevenue,
    annualOperatingCosts,
    annualProfit,
    monthlyProfit,
    roi,
    paybackYears,
    breakEvenMonth,
    npv25,
    irr,
    electricityRate: data.electricityRate,
    operatingCostsPercent: data.operatingCosts,
    annualEnergyMWh,
    capacityMW,
    calculatedAt: new Date().toISOString()
  }
}

function getDefaultInvestment(projectSize: string): number {
  const investments = {
    '1MW': 1050000,  // Average of 900k-1.2M
    '5MW': 5250000,  // Average of 4.5M-6M  
    '10MW': 10500000 // Average of 9M-12M
  }
  return investments[projectSize as keyof typeof investments]
}

function calculateIRR(investment: number, annualProfit: number): number {
  // Simplified IRR calculation (more accurate would use iterative method)
  // This approximates IRR for 25-year project
  const totalReturn = annualProfit * 25
  const totalMultiple = totalReturn / investment
  const irr = (Math.pow(totalMultiple, 1/25) - 1) * 100
  return Math.min(irr, 35) // Cap at reasonable maximum
}

async function trackCalculatorUsage(data: any, results: any) {
  // Track calculator usage for analytics
  // In production, send to analytics platform
  const analyticsData = {
    projectSize: data.projectSize,
    roi: results.roi,
    investment: results.investment,
    timestamp: new Date().toISOString()
  }
  
  // TODO: Send to PostHog, Google Analytics, or other analytics platform
  
  // TODO: Integrate with analytics platform (PostHog, Google Analytics)
  return true
}

async function generatePDFReport(data: any, results: any): Promise<string> {
  // In production, generate PDF using Puppeteer or similar
  // Processing calculator('Generating PDF report for:', data.projectSize)
  
  // TODO: Implement PDF generation
  // Example: Use @react-pdf/renderer or Puppeteer
  
  // Return placeholder URL for now
  return `/api/calculator/report/${generateCalculationId()}.pdf`
}

function generateCalculationId(): string {
  return 'CALC_' + Date.now().toString(36) + Math.random().toString(36).substr(2)
}
