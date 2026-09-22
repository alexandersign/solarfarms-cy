import type { Metadata } from 'next'
import { CrmSessionProvider } from './crm-session-provider'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return <CrmSessionProvider>{children}</CrmSessionProvider>
}
