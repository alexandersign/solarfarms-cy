'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ClipboardList,
  AlertTriangle,
  Package,
  User,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/tablet/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/tablet/work-orders', label: 'Work Orders', icon: ClipboardList },
  { href: '/tablet/alarms', label: 'Alarms', icon: AlertTriangle },
  { href: '/tablet/warehouse', label: 'Warehouse', icon: Package },
  { href: '/tablet/profile', label: 'Profile', icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full gap-0.5 transition-colors',
                'active:bg-gray-100 touch-manipulation',
                isActive
                  ? 'text-cyprus-700'
                  : 'text-gray-500'
              )}
            >
              <Icon className={cn('w-6 h-6', isActive && 'stroke-[2.5]')} />
              <span className="text-[10px] font-medium leading-tight">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
