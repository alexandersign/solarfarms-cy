import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'SolarFarms.cy - Premium Cyprus Solar Investment Platform',
  description: 'Invest in Cyprus solar farms with 15-20% ROI. Premium returns in Europe\'s sunniest climate with Lighthief Cyprus.',
  keywords: ['Cyprus solar investment', 'solar farm ROI', 'renewable energy investment', 'solar PV Cyprus'],
  authors: [{ name: 'Lighthief Cyprus' }],
  creator: 'Lighthief Cyprus',
  publisher: 'Lighthief Cyprus',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://solarfarms.cy',
    siteName: 'SolarFarms.cy',
    title: 'SolarFarms.cy - Premium Cyprus Solar Investment Platform',
    description: 'Invest in Cyprus solar farms with 15-20% ROI. Premium returns in Europe\'s sunniest climate.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SolarFarms.cy - Cyprus Solar Investment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SolarFarms.cy - Premium Cyprus Solar Investment Platform',
    description: 'Invest in Cyprus solar farms with 15-20% ROI. Premium returns in Europe\'s sunniest climate.',
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
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
