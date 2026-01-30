import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Password for internal docs access (must match API route)
const DOCS_PASSWORD = 'CyprusBess2026';
const AUTH_TOKEN = Buffer.from(`docs-auth-${DOCS_PASSWORD}-valid`).toString('base64');

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /internal-docs routes (except login page)
  if (pathname.startsWith('/internal-docs') && !pathname.startsWith('/internal-docs/login')) {
    const authCookie = request.cookies.get('docs-auth');

    if (authCookie?.value !== AUTH_TOKEN) {
      // Redirect to login page
      const loginUrl = new URL('/internal-docs/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/internal-docs/:path*'],
};
