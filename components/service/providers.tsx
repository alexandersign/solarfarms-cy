'use client'

import { SessionProvider } from 'next-auth/react'

export function ServiceSessionProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
