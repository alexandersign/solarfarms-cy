import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase, landAssessmentsService, fileUploadService } from '@/lib/supabase'
import { sendLandAssessmentNotification, sendLandAssessmentAutoresponder } from '@/lib/email'
import { trackLandownerLead } from '@/lib/meta-conversions'
import { 
  performLandAssessment, 
  assessZoneViability,
  ZONE_RULES,
  type LandAssessmentResult 
} from '@/lib/dls-api'

// Validation schema for land assessment
const landAssessmentSchema = z.object({
  plotSize: z.string().min(1, 'Plot size is required'),
  location: z.string().min(1, 'Location is required'),
  currentUse: z.string().optional(),
  ownerName: z.string().min(2, 'Owner name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  zoneCode: z.string().optional(), // User can optionally enter zone code
  coordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }).optional()
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Handle file upload if present
    let titleDeedUrl = null
    const file = formData.get('titleDeed') as File | null
    
    if (file) {
      try {
        titleDeedUrl = await fileUploadService.uploadFile(file, 'title-deeds', 'assessments')
      } catch (uploadError) {
        return NextResponse.json(
          { success: false, message: 'File upload failed. Please try again.' },
          { status: 500 }
        )
      }
    }
    
    // Extract form data
    const assessmentData = {
      plotSize: formData.get('plotSize') as string,
      location: formData.get('location') as string,
      currentUse: formData.get('currentUse') as string || '',
      ownerName: formData.get('ownerName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string || '',
      zoneCode: formData.get('zoneCode') as string || '',
    }
    
    // Parse coordinates if provided
    let coordinates: { lat: number; lng: number } | undefined
    const latStr = formData.get('lat') as string
    const lngStr = formData.get('lng') as string
    if (latStr && lngStr) {
      const lat = parseFloat(latStr)
      const lng = parseFloat(lngStr)
      if (!isNaN(lat) && !isNaN(lng)) {
        coordinates = { lat, lng }
      }
    }
    
    // Validate the form data
    const validatedData = landAssessmentSchema.parse(assessmentData)
    
    // Perform DLS-based land assessment
    const dlsAssessment = await performLandAssessment(
      validatedData.plotSize,
      validatedData.location,
      coordinates,
      0.16 // Default tariff €0.16/kWh
    )
    
    // If user provided zone code, override the assessment
    if (validatedData.zoneCode) {
      const userZoneAssessment = assessZoneViability(validatedData.zoneCode)
      dlsAssessment.zoning = userZoneAssessment
      dlsAssessment.recommendation.viable = userZoneAssessment.isViable
      if (!userZoneAssessment.isViable) {
        dlsAssessment.recommendation.bestOption = 'NONE'
        dlsAssessment.recommendation.summary = userZoneAssessment.reason
      }
    }
    
    // Format results for legacy compatibility and email templates
    const assessmentResults = formatAssessmentResults(dlsAssessment, validatedData.currentUse)
    
    // Try to save to Supabase database, continue if database is down
    let landAssessment = null
    try {
      landAssessment = await landAssessmentsService.create({
        owner_name: validatedData.ownerName,
        owner_email: validatedData.email,
        owner_phone: validatedData.phone,
        plot_size: validatedData.plotSize,
        location: validatedData.location,
        current_use: validatedData.currentUse,
        title_deed_url: titleDeedUrl || undefined,
        assessment_results: assessmentResults,
        estimated_value: assessmentResults.financialProjections.rtbValue,
        solar_potential: assessmentResults.plotAnalysis.capacity,
        status: 'pending'
      })
    } catch (dbError) {
      // Database save failed (Supabase may be paused) - continue with assessment results
      landAssessment = { id: 'temp_' + Date.now() }
    }
    
    // Send notification to team with file attachment info
    await notifyTeamOfLandAssessment(validatedData, assessmentResults, titleDeedUrl, dlsAssessment)
    
    // Get client IP and user agent from request headers
    const clientIpAddress = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                            request.headers.get('x-real-ip') || 
                            undefined
    const clientUserAgent = request.headers.get('user-agent') || undefined
    
    // Get Meta tracking data from form if present
    const fbp = formData.get('fbp') as string || undefined
    const fbc = formData.get('fbc') as string || undefined
    const eventId = formData.get('eventId') as string || undefined
    
    // Track Meta conversion for landowner lead with deduplication
    trackLandownerLead({
      email: validatedData.email,
      phone: validatedData.phone,
      plotSize: validatedData.plotSize,
      location: validatedData.location,
      fbp,
      fbc,
      eventId,
      clientIpAddress,
      clientUserAgent,
    }).catch(() => {}) // Non-blocking
    
    return NextResponse.json(
      { 
        success: true,
        assessment: assessmentResults,
        dlsAssessment, // Full DLS assessment data
        message: 'Assessment completed successfully',
        assessmentId: landAssessment.id
      },
      { status: 200 }
    )
    
  } catch (error) {
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

/**
 * Format DLS assessment results into legacy format for compatibility
 */
function formatAssessmentResults(dls: LandAssessmentResult, currentUse?: string) {
  const bestEstimate = dls.recommendation.bestOption === 'EAST_WEST' 
    ? dls.eastWest 
    : dls.southFacing
  
  // Calculate financial projections
  // PV+BESS All-In Client: ~€1.44M/MW (5MW scale with 4h BESS)
  // Based on: PV EPC (self-cost + €100k/MW) + BESS (+17.4%) + RTB (€350k/MW)
  const investmentPerMW = 1440000 // €1.44M per MW (PV+BESS All-In Client)
  const totalInvestment = bestEstimate.capacityMW * investmentPerMW
  const rtbValue = totalInvestment
  
  // Land owner options (8% of annual revenue for lease)
  const annualLeaseRate = bestEstimate.annualRevenueEUR * 0.08
  const landSalePremium = rtbValue * 0.25 // 25% of RTB value for land sale
  
  return {
    plotAnalysis: {
      size: `${dls.plot.areaHectares.toFixed(1)} hectares (${(dls.plot.areaSquareMeters).toLocaleString()} m²)`,
      capacity: `${bestEstimate.capacityMW.toFixed(2)} MW`,
      capacityKWp: `${bestEstimate.capacityKWp.toLocaleString()} kWp`,
      panelCount: `${bestEstimate.panelCount.toLocaleString()} panels`,
      orientation: dls.recommendation.bestOption === 'EAST_WEST' ? 'East-West (1m pitch)' : 'South-facing (4m pitch)',
      solarIrradiation: `${bestEstimate.specificYield} kWh/kWp/year`,
      gridDistance: 'To be verified during site survey',
      zoning: dls.zoning.status === 'GO' 
        ? `✅ ${dls.zoning.zoneCode} - Favorable for solar development`
        : dls.zoning.status === 'NO_GO'
          ? `❌ ${dls.zoning.zoneCode} - NOT suitable for solar`
          : dls.zoning.status === 'RESTRICTED'
            ? `⚠️ ${dls.zoning.zoneCode} - Restricted (environmental)`
            : `❓ ${dls.zoning.zoneCode} - Requires manual review`,
      zoningDetails: dls.zoning.reason,
      zoningRestrictions: dls.zoning.restrictions,
      developmentFeasibility: dls.recommendation.viable ? 'Viable' : 'Restricted'
    },
    capacityComparison: {
      southFacing: {
        orientation: 'South-facing (4m pitch)',
        capacityMW: dls.southFacing.capacityMW,
        capacityKWp: dls.southFacing.capacityKWp,
        panelCount: dls.southFacing.panelCount,
        annualProductionMWh: dls.southFacing.annualProductionMWh,
        annualRevenueEUR: dls.southFacing.annualRevenueEUR,
        specificYield: dls.southFacing.specificYield
      },
      eastWest: {
        orientation: 'East-West (1m pitch)',
        capacityMW: dls.eastWest.capacityMW,
        capacityKWp: dls.eastWest.capacityKWp,
        panelCount: dls.eastWest.panelCount,
        annualProductionMWh: dls.eastWest.annualProductionMWh,
        annualRevenueEUR: dls.eastWest.annualRevenueEUR,
        specificYield: dls.eastWest.specificYield
      },
      recommended: dls.recommendation.bestOption
    },
    annualProduction: {
      kWh: bestEstimate.annualProductionKWh.toLocaleString(),
      MWh: bestEstimate.annualProductionMWh.toFixed(1),
      revenue: `€${bestEstimate.annualRevenueEUR.toLocaleString()}`
    },
    financialProjections: {
      totalInvestment: `€${(totalInvestment / 1000000).toFixed(1)}M`,
      annualRevenue: `€${(bestEstimate.annualRevenueEUR / 1000).toFixed(0)}K`,
      rtbValue: `€${(rtbValue / 1000000).toFixed(1)}M`,
      developmentTimeline: '12-18 months to RTB'
    },
    landOwnerOptions: {
      annualLease: `€${(annualLeaseRate / 1000).toFixed(0)}K per year`,
      landSale: `€${(landSalePremium / 1000).toFixed(0)}K premium`,
      leaseTotal25Years: `€${(annualLeaseRate * 25 / 1000000).toFixed(1)}M over 25 years`
    },
    environmental: {
      natura2000: dls.environmental.inNatura2000 ? '⚠️ Within Natura 2000 area' : '✅ Not in protected area',
      birdPath: dls.environmental.inBirdPath ? '⚠️ In bird migration path' : '✅ No bird migration restrictions',
      notes: dls.environmental.environmentalNotes
    },
    nextSteps: dls.recommendation.nextSteps,
    confidence: dls.recommendation.viable 
      ? (dls.zoning.status === 'GO' ? 'High' : 'Medium')
      : 'Low',
    dataSource: dls.dataSource,
    timestamp: dls.timestamp
  }
}

async function notifyTeamOfLandAssessment(
  data: any, 
  assessment: any, 
  titleDeedUrl?: string | null,
  dlsAssessment?: LandAssessmentResult
) {
  // Send email notification to team
  await sendLandAssessmentNotification({
    ownerName: data.ownerName,
    email: data.email,
    phone: data.phone,
    plotSize: data.plotSize,
    location: data.location,
    currentUse: data.currentUse,
    titleDeedUrl,
    assessment,
    dlsData: dlsAssessment ? {
      zoning: dlsAssessment.zoning,
      viable: dlsAssessment.recommendation.viable,
      bestOption: dlsAssessment.recommendation.bestOption,
      southFacing: dlsAssessment.southFacing,
      eastWest: dlsAssessment.eastWest
    } : undefined
  })
  
  // Send autoresponder to landowner
  await sendLandAssessmentAutoresponder({
    ownerName: data.ownerName,
    email: data.email,
    phone: data.phone,
    plotSize: data.plotSize,
    location: data.location,
    currentUse: data.currentUse,
    titleDeedUrl,
    assessment
  })
  
  return true
}
