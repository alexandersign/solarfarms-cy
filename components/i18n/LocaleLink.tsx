'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import type { ComponentProps } from 'react'
import { prefixPath, type Locale } from '@/i18n/config'

type Props = ComponentProps<typeof Link>

export function LocaleLink({ href, ...props }: Props) {
  const locale = useLocale() as Locale
  if (typeof href !== 'string' || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) {
    return <Link href={href} {...props} />
  }
  return <Link href={prefixPath(href, locale)} {...props} />
}
