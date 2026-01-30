import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Password for internal docs access
const DOCS_PASSWORD = 'CyprusBess2026';

// Simple hash for the auth token (in production, use a proper secret)
const AUTH_TOKEN = Buffer.from(`docs-auth-${DOCS_PASSWORD}-valid`).toString('base64');

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === DOCS_PASSWORD) {
      // Set auth cookie (7 days expiry)
      const cookieStore = await cookies();
      cookieStore.set('docs-auth', AUTH_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE() {
  // Logout - clear the cookie
  const cookieStore = await cookies();
  cookieStore.delete('docs-auth');
  return NextResponse.json({ success: true });
}

// Verify auth (used by middleware)
export async function GET() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('docs-auth');

  if (authCookie?.value === AUTH_TOKEN) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
