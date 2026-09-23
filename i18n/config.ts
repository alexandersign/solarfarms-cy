export const LOCALES = ['en', 'el', 'ru'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'
export const LOCALE_COOKIE = 'NEXT_LOCALE'
export const LOCALE_HEADER = 'x-locale'

export const LOCALE_META: Record<
  Locale,
  { label: string; nativeLabel: string; htmlLang: string; ogLocale: string }
> = {
  en: { label: 'English', nativeLabel: 'English', htmlLang: 'en', ogLocale: 'en_US' },
  el: { label: 'Greek', nativeLabel: 'Ελληνικά', htmlLang: 'el', ogLocale: 'el_CY' },
  ru: { label: 'Russian', nativeLabel: 'Русский', htmlLang: 'ru', ogLocale: 'ru_RU' },
}

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value)
}

export function stripLocalePrefix(pathname: string): string {
  const stripped = pathname.replace(/^\/(el|ru)(?=\/|$)/, '')
  return stripped === '' ? '/' : stripped
}

export function prefixPath(pathname: string, locale: Locale): string {
  const path = stripLocalePrefix(pathname)
  if (locale === DEFAULT_LOCALE) return path
  return path === '/' ? `/${locale}` : `/${locale}${path}`
}

export const INTERNAL_PREFIXES = [
  '/api',
  '/crm',
  '/tablet',
  '/manager',
  '/client',
  '/admin',
  '/alex',
  '/internal-docs',
  '/bess-project',
  '/login',
  '/studio',
] as const

export function isInternalPath(pathname: string): boolean {
  return INTERNAL_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
}
