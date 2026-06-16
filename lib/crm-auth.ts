/**
 * Read the Auth.js v5 session token in middleware / route handlers.
 *
 * On Vercel (HTTPS) the cookie is `__Secure-authjs.session-token`; getToken's
 * default assumes the non-secure name and the wrong salt, so we set both
 * explicitly. Without this, valid sessions read as null -> redirect loops / 401s.
 */
import { getToken, type JWT } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export async function getCrmToken(req: NextRequest): Promise<JWT | null> {
  const secure =
    (process.env.NEXTAUTH_URL || '').startsWith('https://') ||
    process.env.NODE_ENV === 'production'
  const cookieName = secure
    ? '__Secure-authjs.session-token'
    : 'authjs.session-token'

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: secure,
    salt: cookieName,
    cookieName,
  } as Parameters<typeof getToken>[0])

  return (token as JWT | null) ?? null
}
