import { NextRequest, NextResponse } from 'next/server'
import { getCyprusPlants } from '@/lib/cyprus-plants-data'

export async function GET(request: NextRequest) {
  try {
    const adminKey =
      request.headers.get('x-admin-key') ||
      new URL(request.url).searchParams.get('key')
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const minConf = searchParams.get('min_match_confidence')
    const minScore = searchParams.get('min_score')
    const { plants } = await getCyprusPlants({
      plant_class: searchParams.get('plant_class') || undefined,
      eac_res_listed:
        searchParams.get('eac_res_listed') === 'true' ? true : undefined,
      commercial_segment: searchParams.get('commercial_segment') || undefined,
      primary_sales_target: searchParams.get('primary_sales_target') || undefined,
      min_match_confidence: minConf ? parseFloat(minConf) : undefined,
      district: searchParams.get('district') || undefined,
      existing_client: searchParams.get('existing_client') === 'false' ? false : undefined,
      search: searchParams.get('search') || undefined,
    })

    let filtered = plants
    if (minScore) {
      const ms = parseFloat(minScore)
      filtered = plants.filter((p) => (p.priority_score || 0) >= ms)
    }

    const headers = [
      'CERA licence',
      'SPV / Company',
      'HE reg no',
      'Primary sales target',
      'Secondary targets',
      'Sales summary',
      'Pipeline stage',
      'PV MWp',
      'BESS MW',
      'BESS MWh',
      'Plant class',
      'Licence status',
      'District',
      'Municipality',
      'EAC listed',
      'Match confidence',
      'Director 1',
      'Director 2',
      'Secretary',
      'Contact email',
      'Website',
      'Email source',
      'Registered address',
      'Priority score',
      'Outreach priority',
      'Portfolio client',
    ]

    const rows = filtered.map((p) =>
      [
        p.cera_license_no,
        p.company_name,
        p.company_reg_no,
        p.primary_sales_target,
        (p.secondary_sales_targets || []).join('; '),
        p.sales_target_summary,
        p.pipeline_stage,
        ((p.pv_kw || 0) / 1000).toFixed(3),
        ((p.bess_kw || 0) / 1000).toFixed(3),
        ((p.bess_kwh || 0) / 1000).toFixed(3),
        p.plant_class,
        p.license_status,
        p.district,
        p.municipality,
        p.eac_res_listed ? 'yes' : 'no',
        p.eac_match_confidence,
        p.contact_director_1,
        p.contact_director_2,
        p.contact_secretary,
        p.contact_email,
        p.contact_website,
        p.contact_email_source,
        p.registered_address,
        p.priority_score,
        p.outreach_priority,
        p.existing_client ? 'yes' : 'no',
      ]
        .map((v) => {
          if (v === null || v === undefined) return ''
          const str = String(v)
          if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`
          }
          return str
        })
        .join(',')
    )

    const csv = [headers.join(','), ...rows].join('\n')
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="cyprus-sales-targets-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Export failed: ' + String(error) },
      { status: 500 }
    )
  }
}
