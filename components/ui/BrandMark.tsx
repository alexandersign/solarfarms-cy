import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BrandMarkProps {
  variant?: 'header' | 'footer'
  className?: string
}

export function BrandMark({ variant = 'header', className }: BrandMarkProps) {
  const isFooter = variant === 'footer'

  return (
    <Link href="/" className={cn('flex items-center gap-2.5', className)}>
      <Image
        src="/images/solarfarms-favicon.png"
        alt=""
        width={32}
        height={32}
        className="rounded-md shrink-0"
      />
      <span
        className={cn(
          'font-heading font-semibold text-lg tracking-tight',
          isFooter ? 'text-white' : 'text-brand-navy'
        )}
      >
        SolarFarms.cy
      </span>
    </Link>
  )
}
