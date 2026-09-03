import { Metadata } from 'next'
import { LazyROICalculator } from '@/components/calculators/LazyROICalculator'
import { ContactForm } from '@/components/forms/ContactForm'
import { Testimonials } from '@/components/sections/Testimonials'
import { StructuredData, organizationSchema, websiteSchema, serviceSchema } from '@/components/seo/StructuredData'
import { HeroSection } from '@/components/sections/landing/HeroSection'
import { WhyLighthief } from '@/components/sections/landing/WhyLighthief'
import { BESSShowcase } from '@/components/sections/landing/BESSShowcase'
import { InvestmentTiers } from '@/components/sections/landing/InvestmentTiers'
import { MarketDataCTA } from '@/components/sections/landing/MarketDataCTA'
import { LandownerCTA } from '@/components/sections/landing/LandownerCTA'
import { JournalStrip } from '@/components/marketing/JournalStrip'
import { BESS_JOURNAL_POSTS } from '@/lib/marketing/journal-posts'

export const metadata: Metadata = {
  title: 'SolarFarms.cy — Cyprus Solar & BESS Investments',
  description: 'Invest in Cyprus solar farms and BESS with 8-12% equity IRR. Turnkey EPC, O&M, and bankable energy storage by Lighthief.',
  keywords: [
    'Cyprus solar investment',
    'solar farm ROI Cyprus',
    'renewable energy investment',
    'solar PV Cyprus',
    'BESS investment Cyprus',
    'battery energy storage Cyprus',
    'Lighthief Cyprus',
    'solar farm returns',
    'EPC solar Cyprus',
    'O&M solar Cyprus',
  ],
  alternates: {
    canonical: 'https://solarfarms.cy',
  },
  openGraph: {
    title: 'SolarFarms.cy — Cyprus Solar & BESS Investments',
    description: 'Invest in Cyprus solar farms and BESS with 8-12% equity IRR. Turnkey EPC, O&M, and bankable energy storage.',
    url: 'https://solarfarms.cy',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function HomePage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <StructuredData data={serviceSchema} />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* Why Lighthief — Services & Trust */}
        <WhyLighthief />

        {/* ROI Calculator Section */}
        <section id="calculator" className="section-padding bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Calculate Your Solar Investment Returns
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Interactive calculator showing real returns from Cyprus solar farm investments
              </p>
            </div>
            
            {/* Interactive ROI Calculator */}
            <LazyROICalculator />
          </div>
        </section>

        {/* BESS / Energy Storage Showcase */}
        <BESSShowcase />

        {/* Investment Opportunities */}
        <InvestmentTiers />

        {/* Testimonials & Trust Signals */}
        <Testimonials />

        {/* Market Data CTA Section */}
        <MarketDataCTA />

        <JournalStrip
          title="From our journal"
          subtitle="Project economics, BESS, and Cyprus market analysis — the pages that already hold attention."
          posts={BESS_JOURNAL_POSTS}
        />

        {/* Landowner CTA */}
        <LandownerCTA />

        {/* Contact Section */}
        <section className="section-padding bg-gray-50">
          <div className="container">
            <ContactForm />
          </div>
        </section>
      </div>
    </>
  )
}
