import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema for land assessment
const landAssessmentSchema = z.object({
  plotSize: z.string().min(1, 'Plot size is required'),
  location: z.string().min(1, 'Location is required'),
  currentUse: z.string().optional(),
  ownerName: z.string().min(2, 'Owner name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  titleDeedData: z.object({
    plotNumber: z.string().optional(),
    coordinates: z.object({
      lat: z.number().optional(),
      lng: z.number().optional()
    }).optional(),
    zoning: z.string().optional(),
    area: z.number().optional()
  }).optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = landAssessmentSchema.parse(body)
    
    // Simulate Cyprus Land Registry API integration
    const assessmentResults = await performLandAssessment(validatedData)
    
    // Save lead information
    await saveLandOwnerLead(validatedData, assessmentResults)
    
    // Send notification to team
    await notifyTeamOfLandAssessment(validatedData, assessmentResults)
    
    return NextResponse.json(
      { 
        success: true,
        assessment: assessmentResults,
        message: 'Assessment completed successfully',
        assessmentId: generateAssessmentId()
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Land assessment error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please check your form data',
          errors: error.errors 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Assessment failed. Please try again or contact us directly.' 
      },
      { status: 500 }
    )
  }
}

async function performLandAssessment(data: any) {
  // In production, this would integrate with:
  // - Cyprus Land Registry API
  // - Cyprus Topography Database  
  // - Municipal zoning databases
  // - EAC grid connection database
  // - Solar irradiation mapping services
  
  // Processing assessment('Performing land assessment for:', data.location)
  
  // Simulate assessment based on Cyprus data
  const plotSizeHectares = parseFloat(data.plotSize) || 5
  const capacityMW = Math.min(plotSizeHectares * 0.7, 10) // ~0.7 MW per hectare max
  
  // Cyprus-specific calculations
  const solarIrradiation = 1800 + (Math.random() * 200 - 100) // 1700-1900 kWh/m²/year
  const gridDistance = Math.random() * 8 + 1 // 1-9 km
  const zoningCompatibility = Math.random() > 0.3 // 70% chance compatible
  
  // Financial projections
  const investmentPerMW = 900000 // €900K average per MW
  const totalInvestment = capacityMW * investmentPerMW
  const annualRevenuePerMW = 200000 // €200K average per MW
  const totalAnnualRevenue = capacityMW * annualRevenuePerMW
  
  // RTB value calculation
  const developmentCosts = totalInvestment * 0.15 // 15% for development
  const rtbValue = totalInvestment + developmentCosts
  
  // Land owner options
  const annualLeaseRate = totalAnnualRevenue * 0.08 // 8% of revenue
  const landSalePremium = rtbValue * 0.3 // 30% of RTB value
  
  return {
    plotAnalysis: {
      size: `${plotSizeHectares.toFixed(1)} hectares`,
      capacity: `${capacityMW.toFixed(1)} MW`,
      solarIrradiation: `${solarIrradiation.toFixed(0)} kWh/m²/year`,
      gridDistance: `${gridDistance.toFixed(1)} km to nearest substation`,
      zoning: zoningCompatibility ? 'Compatible for solar development' : 'Requires zoning review',
      developmentFeasibility: zoningCompatibility && gridDistance < 5 ? 'Excellent' : 'Good with conditions'
    },
    financialProjections: {
      totalInvestment: `€${(totalInvestment / 1000000).toFixed(1)}M`,
      annualRevenue: `€${(totalAnnualRevenue / 1000).toFixed(0)}K`,
      rtbValue: `€${(rtbValue / 1000000).toFixed(1)}M`,
      developmentTimeline: gridDistance < 3 ? '12-16 months' : '16-24 months'
    },
    landOwnerOptions: {
      annualLease: `€${(annualLeaseRate / 1000).toFixed(0)}K per year`,
      landSale: `€${(landSalePremium / 1000).toFixed(0)}K premium`,
      leaseTotal25Years: `€${(annualLeaseRate * 25 / 1000000).toFixed(1)}M over 25 years`
    },
    nextSteps: [
      'Professional site survey and detailed feasibility study',
      'Zoning and permit application support',
      'Grid connection analysis and utility coordination',
      'Financial structuring and investor matching',
      'Development timeline and milestone planning'
    ],
    confidence: zoningCompatibility && gridDistance < 5 ? 'High' : 'Medium'
  }
}

async function saveLandOwnerLead(data: any, assessment: any) {
  // In production, save to Supabase database
  const leadData = {
    owner: data.ownerName,
    email: data.email,
    location: data.location,
    capacity: assessment.plotAnalysis.capacity,
    rtbValue: assessment.financialProjections.rtbValue,
    timestamp: new Date().toISOString()
  }
  
  // TODO: Integrate with Supabase to save leadData
  return true
}

async function notifyTeamOfLandAssessment(data: any, assessment: any) {
  // Notify Akradiusz Sybaris and team about new land assessment
  const notificationData = {
    landOwner: data.ownerName,
    location: data.location,
    capacity: assessment.plotAnalysis.capacity,
    confidence: assessment.confidence,
    timestamp: new Date().toISOString()
  }
  
  // TODO: Send email notification to a.sybaris@lighthief.com with notificationData
  return true
}

function generateAssessmentId(): string {
  return 'LAND_' + Date.now().toString(36) + Math.random().toString(36).substr(2)
}
