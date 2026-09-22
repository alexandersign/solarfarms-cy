import type { Metadata } from 'next'
import { AlexShell } from './alex-shell'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AlexLayout({ children }: { children: React.ReactNode }) {
  return <AlexShell>{children}</AlexShell>
}
