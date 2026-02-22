import { NextRequest, NextResponse } from 'next/server'
import { pvProspectsService } from '@/lib/supabase'

// GET - Export prospects as CSV
export async function GET(request: NextRequest) {
  try {
    const adminKey = request.headers.get('x-admin-key') || 
                     new URL(request.url).searchParams.get('key')
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const prospects = await pvProspectsService.getAll()

    if (!prospects || prospects.length === 0) {
      return NextResponse.json({ success: false, message: 'No prospects to export' })
    }

    // CSV headers
    const headers = [
      'Plant Name', 'CERA License', 'Capacity (MWp)', 'Technology', 'Plant Status',
      'Location', 'District', 'Curtailment %',
      'Company Name', 'Company Reg No', 'Parent Group', 'Website',
      'Contact Name', 'Contact Title', 'Contact Email', 'Contact Phone', 'Contact LinkedIn',
      'Secondary Contact', 'Secondary Email', 'Secondary Phone',
      'Outreach Status', 'Outreach Channel', 'First Contact', 'Last Contact', 'Next Follow-up',
      'Offer Type', 'Deal Value (EUR)', 'BESS Potential (MWh)',
      'Priority', 'Data Source', 'Tags', 'Notes'
    ]

    const csvRows = [headers.join(',')]

    for (const p of prospects) {
      const row = [
        p.plant_name, p.cera_license_no, p.capacity_mwp, p.technology, p.plant_status,
        p.location, p.district, p.curtailment_rate,
        p.company_name, p.company_reg_no, p.parent_group, p.company_website,
        p.contact_name, p.contact_title, p.contact_email, p.contact_phone, p.contact_linkedin,
        p.secondary_contact_name, p.secondary_contact_email, p.secondary_contact_phone,
        p.outreach_status, p.outreach_channel, p.first_contact_date, p.last_contact_date, p.next_follow_up,
        p.offer_type, p.estimated_deal_value, p.bess_potential_mwh,
        p.priority, p.data_source, (p.tags || []).join('; '), p.notes
      ].map(v => {
        if (v === null || v === undefined) return ''
        const str = String(v)
        // Escape CSV values containing commas, quotes, or newlines
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`
        }
        return str
      })

      csvRows.push(row.join(','))
    }

    const csv = csvRows.join('\n')

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="pv-prospects-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Export failed: ' + String(error) },
      { status: 500 }
    )
  }
}
