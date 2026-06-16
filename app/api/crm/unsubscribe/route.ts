/**
 * One-click unsubscribe for cold outreach. Public (no session) so it works
 * from the email link. Adds the 'unsubscribed' tag to the prospect so it is
 * never emailed again. Supports GET (link) and POST (List-Unsubscribe-Post).
 */
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

async function suppress(id: string): Promise<boolean> {
  const { data } = await supabase.from('pv_prospects').select('tags').eq('id', id).single()
  if (!data) return false
  const tags: string[] = (data.tags as string[]) || []
  if (!tags.includes('unsubscribed')) tags.push('unsubscribed')
  const { error } = await supabase
    .from('pv_prospects')
    .update({ tags, outreach_status: 'not_interested' })
    .eq('id', id)
  return !error
}

const PAGE = (msg: string) => `<!DOCTYPE html><html><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Unsubscribe — Lighthief</title></head>
<body style="font-family:Arial,sans-serif;background:#F0F4F8;margin:0;padding:48px 16px;text-align:center;color:#1A365D;">
  <div style="max-width:460px;margin:0 auto;background:#fff;border-radius:8px;padding:32px;box-shadow:0 1px 4px rgba(26,54,93,0.12);">
    <h1 style="color:#C9A432;font-size:20px;margin:0 0 12px;">Lighthief Cyprus</h1>
    <p style="font-size:15px;line-height:1.5;color:#333;">${msg}</p>
    <p style="font-size:12px;color:#7a869a;margin-top:20px;">HE 477423 · solarfarms.cy</p>
  </div>
</body></html>`

export async function GET(request: NextRequest) {
  const id = new URL(request.url).searchParams.get('id')
  if (!id) return new NextResponse(PAGE('Invalid unsubscribe link.'), { status: 400, headers: { 'Content-Type': 'text/html' } })
  const ok = await suppress(id)
  return new NextResponse(
    PAGE(ok ? 'You have been unsubscribed and will not receive further emails from us. Thank you.' : 'We could not process this request, but you can reply to any email to opt out.'),
    { status: 200, headers: { 'Content-Type': 'text/html' } }
  )
}

export async function POST(request: NextRequest) {
  const id = new URL(request.url).searchParams.get('id')
  if (id) await suppress(id)
  return NextResponse.json({ success: true })
}
