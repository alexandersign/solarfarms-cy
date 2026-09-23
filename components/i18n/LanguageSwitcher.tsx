'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { LOCALES, LOCALE_META, prefixPath, stripLocalePrefix, type Locale } from '@/i18n/config'

export function LanguageSwitcher() {
  const t = useTranslations('language')
  const locale = useLocale() as Locale
  const pathname = usePathname() || '/'
  const path = stripLocalePrefix(pathname)

  return (
    <div className="flex items-center gap-1" role="navigation" aria-label={t('switcher')}>
      {LOCALES.map((code) => {
        const active = code === locale
        return (
          <a
            key={code}
            href={prefixPath(path, code)}
            hrefLang={code}
            className={`px-1.5 py-0.5 text-xs font-semibold rounded ${
              active
                ? 'bg-brand-navy text-white'
                : 'text-brand-navy/70 hover:text-brand-gold'
            }`}
            aria-current={active ? 'true' : undefined}
          >
            {code.toUpperCase()}
          </a>
        )
      })}
    </div>
  )
}

export function LanguageSwitcherLabels() {
  const locale = useLocale() as Locale
  const pathname = usePathname() || '/'
  const path = stripLocalePrefix(pathname)

  return (
    <div className="flex flex-wrap gap-3">
      {LOCALES.map((code) => (
        <a
          key={code}
          href={prefixPath(path, code)}
          className={`text-sm ${code === locale ? 'text-brand-gold font-semibold' : 'text-white/70 hover:text-brand-gold'}`}
        >
          {LOCALE_META[code].nativeLabel}
        </a>
      ))}
    </div>
  )
}
