'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard, ClipboardList, AlertTriangle,
  Package, Users, MapPin, BarChart3, LogOut, Wrench,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const sidebarItems = [
  { href: '/manager/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/manager/dispatch', label: 'Dispatch', icon: MapPin },
  { href: '/manager/work-orders', label: 'Work Orders', icon: ClipboardList },
  { href: '/manager/tracking', label: 'Live Tracking', icon: MapPin },
  { href: '/manager/alarms', label: 'Alarms', icon: AlertTriangle },
  { href: '/manager/inventory', label: 'Inventory', icon: Package },
  { href: '/manager/team', label: 'Team', icon: Users },
  { href: '/manager/reports', label: 'Reports', icon: BarChart3 },
]

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyprus-600 rounded-lg flex items-center justify-center">
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm">Lighthief FSM</p>
              <p className="text-xs text-gray-400">Manager Console</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4 space-y-1 px-2">
          {sidebarItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                  isActive
                    ? 'bg-cyprus-700 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        {children}
      </main>
    </div>
  )
}
