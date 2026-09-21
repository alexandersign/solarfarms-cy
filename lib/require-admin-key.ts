import { NextRequest, NextResponse } from 'next/server'

/** Returns a 401 response when the admin key is missing or wrong. */
export function unauthorizedUnlessAdmin(request: NextRequest): NextResponse | null {
  const expected = process.env.ADMIN_SECRET_KEY
  const provided = request.headers.get('x-admin-key')
  if (!expected || provided !== expected) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    )
  }
  return null
}
