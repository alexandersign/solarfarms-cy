import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Initialize database tables and seed data
export async function POST(request: NextRequest) {
  try {
    // Check admin key
    const adminKey = request.headers.get('x-admin-key')
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const results: string[] = []

    // Check if projects table exists by trying to query it
    const { error: checkError } = await supabase
      .from('projects')
      .select('id')
      .limit(1)

    if (checkError && checkError.code === '42P01') {
      // Table doesn't exist - we can't create it via API (need SQL editor)
      return NextResponse.json({
        success: false,
        message: 'Projects table does not exist. Please run the SQL schema first.',
        sqlNeeded: true
      })
    }

    // Table exists, check if we have projects
    const { data: existingProjects } = await supabase
      .from('projects')
      .select('reference_code')

    const existingCodes = existingProjects?.map(p => p.reference_code) || []

    // Define projects to add
    const projectsToAdd = [
      {
        reference_code: 'PARK-RTB-2026',
        title: 'Agios Theodoros Solar Park with Battery Storage',
        slug: 'agios-theodoros-rtb',
        location: 'Agios Theodoros, Larnaca District, Cyprus',
        district: 'Larnaca',
        status: 'available',
        status_label: 'Ready to Build',
        target_date: 'Q4 2026',
        capacity_mwp: 2.64,
        capacity_mwh_bess: 10.56,
        bess_duration_hours: 4,
        technology: 'Bifacial PV',
        mounting: 'Fixed Tilt',
        specific_yield: 2100,
        annual_generation_gwh: 5.54,
        total_capex: 4590000,
        bess_cost_per_mwh: 127000,
        rtb_acquisition_cost: 1000000,
        equity_required: 1750000,
        annual_revenue: 1230000,
        annual_opex: 89000,
        net_cash_flow: 1140000,
        leveraged_irr: '35%+',
        dscr: 'Above 3.0x',
        base_power_price: 110,
        evening_arbitrage_price: 160,
        image_url: '/images/solar-farm-aerial-unsplash.jpg',
        highlights: [
          'Integrated 10.56 MWh BESS - 4-hour duration (€127k/MWh)',
          'Bifacial PV modules - 2,100 kWh/kWp yield',
          'Zero curtailment risk with battery arbitrage',
          'Leveraged equity IRR: high 30% range',
          'Single operator: Lighthief EPC + O&M'
        ],
        featured: true
      },
      {
        reference_code: 'PARK-ANARITA-10',
        title: 'Anarita Solar Park - 10MW Operational',
        slug: 'anarita-10mw',
        location: 'Anarita, Paphos District, Cyprus',
        district: 'Paphos',
        status: 'operational',
        status_label: 'Operational',
        target_date: 'Energized',
        capacity_mwp: 10,
        capacity_mwh_bess: 0,
        bess_duration_hours: 0,
        technology: 'Monocrystalline',
        mounting: 'Fixed Tilt',
        specific_yield: 1750,
        annual_generation_gwh: 17.5,
        total_capex: 12500000,
        bess_cost_per_mwh: 127000,
        rtb_acquisition_cost: 0,
        equity_required: 12500000,
        annual_revenue: 1950000,
        annual_opex: 150000,
        net_cash_flow: 1800000,
        leveraged_irr: '14.5%',
        dscr: 'N/A',
        base_power_price: 110,
        evening_arbitrage_price: 160,
        image_url: '/images/solar-park-field-unsplash.jpg',
        highlights: [
          'Fully operational 10MW utility-scale park',
          'Already energized and grid connected',
          'BESS-ready infrastructure in place',
          'Strong merchant revenue track record',
          'Immediate cash flow from day one'
        ],
        featured: true
      },
      {
        reference_code: 'PARK-REF-5001',
        title: '5MW Solar Park with Single-Axis Tracking',
        slug: 'park-ref-5001',
        location: 'Cyprus',
        district: 'Confidential',
        status: 'available',
        status_label: 'Available for Acquisition',
        target_date: 'Operational since 2020',
        capacity_mwp: 5.01,
        capacity_mwh_bess: 0,
        bess_duration_hours: 0,
        technology: 'Monocrystalline',
        mounting: 'Single-Axis Tracker',
        specific_yield: 1800,
        annual_generation_gwh: 9.0,
        total_capex: 9600000,
        bess_cost_per_mwh: 127000,
        rtb_acquisition_cost: 0,
        equity_required: 9600000,
        annual_revenue: 1410000,
        annual_opex: 100000,
        net_cash_flow: 1310000,
        leveraged_irr: '13.3%',
        dscr: 'N/A',
        base_power_price: 110,
        evening_arbitrage_price: 160,
        image_url: '/images/IMG_0149.JPG',
        highlights: [
          'Single-axis tracking system - premium technology',
          'Real curtailment data: 45.8% (2025) - BESS opportunity',
          'Tier-1 equipment: Trina, Huawei, Nclave trackers',
          '€18.5k in spare parts included',
          'BESS compatible - enhance ROI to 15.4%'
        ],
        featured: true
      }
    ]

    // Add projects that don't exist yet
    for (const project of projectsToAdd) {
      if (!existingCodes.includes(project.reference_code)) {
        const { error } = await supabase
          .from('projects')
          .insert([project])

        if (error) {
          results.push(`❌ Failed to add ${project.reference_code}: ${error.message}`)
        } else {
          results.push(`✅ Added ${project.reference_code}: ${project.title}`)
        }
      } else {
        results.push(`⏭️ Skipped ${project.reference_code} (already exists)`)
      }
    }

    // Check newsletter_subscribers table
    const { error: nlError } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .limit(1)

    if (nlError && nlError.code === '42P01') {
      results.push('⚠️ newsletter_subscribers table needs to be created via SQL')
    } else {
      results.push('✅ newsletter_subscribers table exists')
    }

    return NextResponse.json({
      success: true,
      message: 'Database initialization complete',
      results
    })

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to initialize database', error: String(error) },
      { status: 500 }
    )
  }
}

// GET - Check database status
export async function GET(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key')
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const status: Record<string, unknown> = {}

    // Check projects table
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('id, reference_code, title')

    if (projectsError) {
      status.projects = { exists: false, error: projectsError.message }
    } else {
      status.projects = { exists: true, count: projects?.length || 0, items: projects }
    }

    // Check newsletter_subscribers table
    const { data: subscribers, error: subscribersError } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .eq('status', 'active')

    if (subscribersError) {
      status.subscribers = { exists: false, error: subscribersError.message }
    } else {
      status.subscribers = { exists: true, activeCount: subscribers?.length || 0 }
    }

    // Check contacts table
    const { data: contacts, error: contactsError } = await supabase
      .from('contacts')
      .select('id')

    if (contactsError) {
      status.contacts = { exists: false, error: contactsError.message }
    } else {
      status.contacts = { exists: true, count: contacts?.length || 0 }
    }

    return NextResponse.json({ success: true, status })

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to check database status', error: String(error) },
      { status: 500 }
    )
  }
}
