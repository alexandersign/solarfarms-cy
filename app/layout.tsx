import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { GoogleAnalytics, ConsentBanner } from '@/components/analytics/GoogleAnalytics'
import { MetaPixel } from '@/components/analytics/MetaPixel'
import { DeferredWidgets } from '@/components/ui/DeferredWidgets'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://solarfarms.cy'),
  title: 'SolarFarms.cy — Cyprus Solar & BESS Investment Platform',
  description: 'Invest in Cyprus solar farms and BESS with 8-12% equity IRR. Turnkey EPC, O&M, and bankable energy storage by Lighthief.',
  keywords: ['Cyprus solar investment', 'solar farm ROI', 'renewable energy investment', 'solar PV Cyprus'],
  authors: [{ name: 'Lighthief Cyprus' }],
  creator: 'Lighthief Cyprus',
  publisher: 'Lighthief Cyprus',
  robots: 'index, follow',
  icons: {
    icon: '/images/solarfarms-favicon.png',
    apple: '/images/solarfarms-favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://solarfarms.cy',
    siteName: 'SolarFarms.cy',
    title: 'SolarFarms.cy — Cyprus Solar & BESS Investment Platform',
    description: 'Invest in Cyprus solar farms and BESS with 8-12% equity IRR. Turnkey EPC, O&M, and bankable energy storage.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SolarFarms.cy — Cyprus Solar & BESS Investment Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SolarFarms.cy — Cyprus Solar & BESS Investment Platform',
    description: 'Invest in Cyprus solar farms and BESS with 8-12% equity IRR. Turnkey EPC, O&M, and bankable energy storage.',
    images: ['/images/twitter-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="font-sans antialiased">
        <GoogleAnalytics />
        <MetaPixel />
        <ConsentBanner />
        <Header />
        <main>{children}</main>
        <Footer />
        <DeferredWidgets />
      </body>
    </html>
  )
}
