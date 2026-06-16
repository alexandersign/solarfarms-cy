import { NextResponse } from 'next/server'
import { supabase }    from '@/lib/supabase'

export async function GET() {
  try {
    const today = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('pv_prospects')
      .select('*')
      .lte('next_follow_up', today)
      .not('next_follow_up', 'is', null)
      .not('outreach_status', 'in', '("won","lost","not_interested")')
      .order('next_follow_up', { ascending: true })

    if (error) throw error
    return NextResponse.json({ success: true, data: data || [], count: data?.length || 0 })
  } catch (error) {
    return NextResponse.json({ success: false, data: [], message: String(error) })
  }
}
