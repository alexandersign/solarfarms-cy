import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getCrmToken } from '@/lib/crm-auth';
import {
  DEFAULT_LOCALE,
  isInternalPath,
  isLocale,
  LOCALE_COOKIE,
  LOCALE_HEADER,
  prefixPath,
  stripLocalePrefix,
  type Locale,
} from '@/i18n/config';

const DOCS_PASSWORD = process.env.DOCS_PASSWORD ?? '';
const AUTH_TOKEN = Buffer.from(`docs-auth-${DOCS_PASSWORD}-valid`).toString('base64');

const BESS_PASSWORD = process.env.BESS_PASSWORD ?? '';
const BESS_AUTH_TOKEN = Buffer.from(`bess-project-auth-${BESS_PASSWORD}-valid`).toString('base64');

function applyLocaleCookie(response: NextResponse, locale: Locale) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
  response.headers.set(LOCALE_HEADER, locale);
  return response;
}

function handleLocale(request: NextRequest): NextResponse | null {
  const { pathname, searchParams } = request.nextUrl;
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    isInternalPath(pathname) ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return null;
  }

  const hl = searchParams.get('hl');
  if (isLocale(hl)) {
    const clean = request.nextUrl.clone();
    clean.searchParams.delete('hl');
    clean.pathname = prefixPath(stripLocalePrefix(pathname), hl);
    const redirect = NextResponse.redirect(clean);
    return applyLocaleCookie(redirect, hl);
  }

  const prefix = pathname.split('/')[1];
  if (isLocale(prefix) && prefix !== DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = stripLocalePrefix(pathname);
    const rewrite = NextResponse.rewrite(url);
    return applyLocaleCookie(rewrite, prefix);
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(cookieLocale) && cookieLocale !== DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = prefixPath(pathname, cookieLocale);
    return NextResponse.redirect(url);
  }

  const next = NextResponse.next();
  return applyLocaleCookie(next, DEFAULT_LOCALE);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const localeResponse = handleLocale(request);
  if (localeResponse && (localeResponse.headers.get('location') || localeResponse.headers.get('x-middleware-rewrite'))) {
    return localeResponse;
  }

  if (pathname.startsWith('/internal-docs') && !pathname.startsWith('/internal-docs/login')) {
    const authCookie = request.cookies.get('docs-auth');

    if (authCookie?.value !== AUTH_TOKEN) {
      const loginUrl = new URL('/internal-docs/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname.startsWith('/bess-project') && !pathname.startsWith('/bess-project/login')) {
    const authCookie = request.cookies.get('bess-project-auth');

    if (authCookie?.value !== BESS_AUTH_TOKEN) {
      const loginUrl = new URL('/bess-project/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if ((pathname === '/crm' || pathname.startsWith('/crm/')) && !pathname.startsWith('/crm/login')) {
    const token = await getCrmToken(request)
    if (!token) {
      const loginUrl = new URL('/crm/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (
    (pathname.startsWith('/tablet') || pathname.startsWith('/manager') || pathname.startsWith('/client')) &&
    !pathname.startsWith('/login')
  ) {
    const token = await getToken({ req: request });

    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const role = token.role as string;
    if (pathname.startsWith('/manager') && role !== 'manager') {
      return NextResponse.redirect(new URL('/tablet/dashboard', request.url));
    }
    if (pathname.startsWith('/client') && role !== 'client' && role !== 'manager') {
      return NextResponse.redirect(new URL('/tablet/dashboard', request.url));
    }
  }

  return localeResponse ?? NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/|crm-roofs/).*)',
  ],
};
