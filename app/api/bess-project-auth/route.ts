import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Password for BESS project timeline access
const BESS_PASSWORD = 'BessCyprus2026';

// Auth token
const AUTH_TOKEN = Buffer.from(`bess-project-auth-${BESS_PASSWORD}-valid`).toString('base64');

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === BESS_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set('bess-project-auth', AUTH_TOKEN, {
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
  const cookieStore = await cookies();
  cookieStore.delete('bess-project-auth');
  return NextResponse.json({ success: true });
}

export async function GET() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('bess-project-auth');

  if (authCookie?.value === AUTH_TOKEN) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
