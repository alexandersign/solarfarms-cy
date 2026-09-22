'use client'

import { SessionProvider } from 'next-auth/react'

export function CrmSessionProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
