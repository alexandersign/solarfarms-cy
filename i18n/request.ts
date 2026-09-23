import { headers } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'
import { DEFAULT_LOCALE, isLocale, LOCALE_HEADER, type Locale } from './config'

export default getRequestConfig(async () => {
  const headerLocale = headers().get(LOCALE_HEADER)
  const locale: Locale = isLocale(headerLocale) ? headerLocale : DEFAULT_LOCALE
  const messages = (await import(`../messages/${locale}.json`)).default

  return {
    locale,
    messages,
  }
})
