import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { ServiceSessionProvider } from '@/components/service/providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lighthief Field Service',
  description: 'Field Service Management System - Lighthief Cyprus',
  manifest: '/service-manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Lighthief FSM',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0369a1',
}

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/service-icon-192.png" />
      </head>
      <body className="font-sans antialiased bg-gray-50 min-h-screen">
        <ServiceSessionProvider>
          {children}
        </ServiceSessionProvider>
      </body>
    </html>
  )
}
