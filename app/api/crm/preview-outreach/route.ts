/**
 * Render the intro email as HTML for in-browser approval.
 * GET /api/crm/preview-outreach            -> sample prospect
 * GET /api/crm/preview-outreach?id=<uuid>  -> rendered for a real prospect
 * Session-authenticated.
 */
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { supabase } from '@/lib/supabase'
import { renderIntroEmail, type OutreachRecipient } from '@/lib/crm-outreach'

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })

  const baseUrl = process.env.NEXTAUTH_URL || new URL(request.url).origin
  const id = new URL(request.url).searchParams.get('id')

  let recipient: OutreachRecipient = {
    company_name: 'Sample SPV Ltd',
    contact_name: 'Sample Director',
    primary_target: 'Hybrid EPC (PV + BESS)',
    parent_group: 'Sample Developer',
  }

  if (id) {
    const { data } = await supabase.from('pv_prospects').select('*').eq('id', id).single()
    if (data) {
      recipient = {
        id: data.id,
        company_name: data.company_name,
        contact_name: data.contact_name,
        contact_email: data.contact_email,
        primary_target: data.primary_sales_target,
        parent_group: data.parent_group,
      }
    }
  }

  const { html } = renderIntroEmail(recipient, {
    baseUrl,
    senderName: (token.name as string) || undefined,
    senderEmail: (token.email as string) || undefined,
  })

  return new NextResponse(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } })
}
