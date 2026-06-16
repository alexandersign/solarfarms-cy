import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'
import { getCrmToken } from '@/lib/crm-auth'
import { CRM_KB_DOCUMENTS } from '@/lib/crm-kb-documents'

export async function GET(request: NextRequest) {
  const token = await getCrmToken(request)
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const slug = new URL(request.url).searchParams.get('slug')
  if (!slug || !(slug in CRM_KB_DOCUMENTS)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const doc = CRM_KB_DOCUMENTS[slug]
  const filePath = path.join(process.cwd(), doc.path)

  try {
    const html = await readFile(filePath, 'utf-8')
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'private, no-store, no-cache, must-revalidate',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
        'Referrer-Policy': 'no-referrer',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Document file not found' }, { status: 404 })
  }
}
