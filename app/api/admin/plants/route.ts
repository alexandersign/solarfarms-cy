import { NextRequest, NextResponse } from 'next/server'
import { getCyprusPlants } from '@/lib/cyprus-plants-data'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const minConf = searchParams.get('min_match_confidence')
    const { plants, source } = await getCyprusPlants({
      plant_class: searchParams.get('plant_class') || undefined,
      eac_res_listed:
        searchParams.get('eac_res_listed') === 'true'
          ? true
          : searchParams.get('eac_res_listed') === 'false'
            ? false
            : undefined,
      commercial_segment: searchParams.get('commercial_segment') || undefined,
      primary_sales_target: searchParams.get('primary_sales_target') || undefined,
      min_match_confidence: minConf ? parseFloat(minConf) : undefined,
      district: searchParams.get('district') || undefined,
      existing_client:
        searchParams.get('existing_client') === 'true'
          ? true
          : searchParams.get('existing_client') === 'false'
            ? false
            : undefined,
      search: searchParams.get('search') || undefined,
    })

    const stats = {
      total: plants.length,
      eacListed: plants.filter((p) => p.eac_res_listed).length,
      standaloneBess: plants.filter((p) => p.plant_class === 'bess_standalone').length,
      highPriority: plants.filter((p) => (p.priority_score || 0) >= 55).length,
      existingClients: plants.filter((p) => p.existing_client).length,
    }

    return NextResponse.json({
      success: true,
      data: plants,
      stats,
      source,
      count: plants.length,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      data: [],
      message: 'Failed to fetch plants: ' + String(error),
    })
  }
}
