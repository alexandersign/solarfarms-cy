'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ALEXANDER_EMAIL = 'alexander.papacosta@lighthief.com'
type CrmNav = 'prospects' | 'knowledge' | 'dashboard'

export function CrmHeader({
  activeNav,
  children,
}: {
  activeNav: CrmNav
  children?: React.ReactNode
}) {
  const { data: session } = useSession()
  const myEmail = session?.user?.email ?? ''
  const myName = session?.user?.name ?? ''
  const isAlexander = myEmail === ALEXANDER_EMAIL

  return (
    <div className="sticky top-0 z-50 shadow-md">
      <div style={{ background: 'linear-gradient(135deg,#1A365D 0%,#2B5FA0 100%)' }}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-xl font-bold" style={{ color: '#C9A432' }}>
              Lighthief CRM
            </span>
            <span className="text-sm text-blue-200 hidden md:inline">
              Cyprus PV prospect tracker
            </span>
            <nav className="flex gap-1 ml-2">
              <Link
                href="/crm"
                className={`px-3 py-1 rounded text-sm font-semibold transition ${
                  activeNav === 'prospects'
                    ? 'bg-[#C9A432] text-[#1A365D]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Prospects
              </Link>
              <Link
                href="/crm/knowledge"
                className={`px-3 py-1 rounded text-sm font-semibold transition ${
                  activeNav === 'knowledge'
                    ? 'bg-[#C9A432] text-[#1A365D]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Knowledge
              </Link>
              {isAlexander && (
                <Link
                  href="/crm/dashboard"
                  className={`px-3 py-1 rounded text-sm font-semibold transition ${
                    activeNav === 'dashboard'
                      ? 'bg-[#C9A432] text-[#1A365D]'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Dashboard
                </Link>
              )}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-blue-200">{myName || myEmail}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/crm/login' })}
              className="flex items-center text-xs font-medium px-3 py-1.5 rounded border border-white/30 text-white bg-transparent hover:bg-white/10 transition"
            >
              <LogOut className="w-3 h-3 mr-1" /> Sign out
            </button>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
