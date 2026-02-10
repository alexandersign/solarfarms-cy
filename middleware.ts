import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Password for internal docs access (must match API route)
const DOCS_PASSWORD = 'CyprusBess2026';
const AUTH_TOKEN = Buffer.from(`docs-auth-${DOCS_PASSWORD}-valid`).toString('base64');

// Password for BESS project timeline access
const BESS_PASSWORD = 'BessCyprus2026';
const BESS_AUTH_TOKEN = Buffer.from(`bess-project-auth-${BESS_PASSWORD}-valid`).toString('base64');

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /internal-docs routes (except login page)
  if (pathname.startsWith('/internal-docs') && !pathname.startsWith('/internal-docs/login')) {
    const authCookie = request.cookies.get('docs-auth');

    if (authCookie?.value !== AUTH_TOKEN) {
      const loginUrl = new URL('/internal-docs/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect /bess-project routes (except login page)
  if (pathname.startsWith('/bess-project') && !pathname.startsWith('/bess-project/login')) {
    const authCookie = request.cookies.get('bess-project-auth');

    if (authCookie?.value !== BESS_AUTH_TOKEN) {
      const loginUrl = new URL('/bess-project/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/internal-docs/:path*', '/bess-project/:path*'],
};
