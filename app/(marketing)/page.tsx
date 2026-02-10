import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ROICalculator } from '@/components/calculators/ROICalculator'
import { ContactForm } from '@/components/forms/ContactForm'
import { Testimonials } from '@/components/sections/Testimonials'
import { StructuredData, organizationSchema, websiteSchema, serviceSchema } from '@/components/seo/StructuredData'
import { BarChart3, TrendingUp, Battery, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'SolarFarms.cy - Cyprus Solar Farm Investments | 8-12% IRR',
  description: 'Invest in Cyprus solar farms with 8-12% equity IRR. Premium returns in Europe\'s sunniest climate. Ready-to-build projects with full lifecycle support from Lighthief Cyprus.',
  keywords: [
    'Cyprus solar investment',
    'solar farm ROI Cyprus',
    'renewable energy investment',
    'solar PV Cyprus',
    'Lighthief Cyprus',
    'solar farm returns',
    'Cyprus renewable energy'
  ],
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
      <section className="relative section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50 overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/solar-park-field-unsplash.jpg"
              alt="Solar panels against bright blue Cyprus sky"
              fill
              className="object-cover opacity-10"
              priority
              quality={75}
              sizes="100vw"
            />
          </div>
        </div>
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                Cyprus Solar Farm Investments
                <span className="block gradient-text">
                  Premium Returns in Europe's Sunniest Climate
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 text-balance">
                Invest in ready-to-build solar farms with 8-12% equity IRR, 
                7-10 year payback, and full lifecycle support from Lighthief Cyprus.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button variant="solar" size="xl" asChild>
                  <Link href="/investment-guide">
                    Investment Guide
                  </Link>
                </Button>
                <Button variant="cyprus" size="xl" asChild>
                  <Link href="/contact">
                    Schedule Consultation
                  </Link>
                </Button>
              </div>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold gradient-text">3,300+</div>
                  <div className="text-sm text-gray-600">Sun Hours/Year</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold gradient-text">8-12%</div>
                  <div className="text-sm text-gray-600">Equity IRR</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold gradient-text">7-10</div>
                  <div className="text-sm text-gray-600">Years Payback</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold gradient-text">100s MW</div>
                  <div className="text-sm text-gray-600">Assets Managed</div>
                </div>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg"
                  alt="Modern solar farm installation in Cyprus"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">€2.5M+</div>
                  <div className="text-xs text-gray-600">25-Year NPV</div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">300+</div>
                  <div className="text-xs text-gray-600">Sunny Days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="section-padding bg-gray-50">
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
          <ROICalculator />
        </div>
      </section>


      {/* Investment Opportunities */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Investment Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from scalable solar farm investments with proven returns
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* 1MW Investment */}
            <div className="bg-white rounded-2xl shadow-lg p-8 card-hover">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold gradient-text mb-2">1MW</div>
                <div className="text-gray-600">Solar Farm</div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-600">Investment</span>
                  <span className="font-semibold">€900K - €1.2M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Revenue</span>
                  <span className="font-semibold">€200K - €250K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ROI</span>
                  <span className="font-semibold text-green-600">15-20%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">25-year NPV</span>
                  <span className="font-semibold">€2.5M - €4.0M</span>
                </div>
              </div>
              
              <Button variant="gradient" className="w-full" asChild>
                <Link href="/calculator">
                  Calculate Returns
                </Link>
              </Button>
            </div>

            {/* 5MW Investment */}
            <div className="bg-white rounded-2xl shadow-lg p-8 card-hover border-2 border-solar-200">
              <div className="text-center mb-6">
                <div className="bg-solar-100 text-solar-800 text-sm font-medium px-3 py-1 rounded-full mb-2">
                  Most Popular
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">5MW</div>
                <div className="text-gray-600">Solar Farm</div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-600">Investment</span>
                  <span className="font-semibold">€4.5M - €6.0M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Revenue</span>
                  <span className="font-semibold">€1.0M - €1.25M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ROI</span>
                  <span className="font-semibold text-green-600">15-20%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">25-year NPV</span>
                  <span className="font-semibold">€12M - €20M</span>
                </div>
              </div>
              
              <Button variant="gradient" className="w-full" asChild>
                <Link href="/calculator">
                  Calculate Returns
                </Link>
              </Button>
            </div>

            {/* 10MW Investment */}
            <div className="bg-white rounded-2xl shadow-lg p-8 card-hover">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold gradient-text mb-2">10MW</div>
                <div className="text-gray-600">Solar Farm</div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-600">Investment</span>
                  <span className="font-semibold">€9.0M - €12.0M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Revenue</span>
                  <span className="font-semibold">€2.0M - €2.5M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ROI</span>
                  <span className="font-semibold text-green-600">15-20%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">25-year NPV</span>
                  <span className="font-semibold">€25M - €40M</span>
                </div>
              </div>
              
              <Button variant="gradient" className="w-full" asChild>
                <Link href="/calculator">
                  Calculate Returns
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & Trust Signals */}
      <Testimonials />

      {/* Market Data CTA Section */}
      <section className="section-padding bg-gradient-to-br from-cyprus-50 via-white to-green-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-cyprus-100 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left - Info */}
                <div className="p-8 md:p-10">
                  <div className="inline-flex items-center gap-1.5 bg-cyprus-100 text-cyprus-700 px-3 py-1 rounded-full text-xs font-medium mb-4">
                    <BarChart3 className="w-3.5 h-3.5" />
                    Cyprus Open Market
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                    Live Electricity
                    <span className="block gradient-text">Market Pricing</span>
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Track real-time day-ahead market prices from TSOC Cyprus. Understand when energy is cheapest, 
                    when peak demand drives prices up, and how battery storage captures the spread.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="gradient" asChild>
                      <Link href="/market">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Market Data
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/energy-storage/calculator">
                        <Battery className="w-4 h-4 mr-2" />
                        BESS Calculator
                      </Link>
                    </Button>
                  </div>
                </div>
                
                {/* Right - Key Stats Preview */}
                <div className="bg-gradient-to-br from-cyprus-600 to-cyprus-800 p-8 md:p-10 text-white">
                  <h3 className="font-heading font-semibold text-lg mb-6 opacity-90">Market Insights</h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-solar-300" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Hourly Price Charts</p>
                        <p className="text-xs text-cyprus-200">24-hour price curves showing solar dip and evening peak</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-4 h-4 text-green-300" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">BESS Arbitrage Analysis</p>
                        <p className="text-xs text-cyprus-200">Charge low during solar, sell high during peak demand</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Battery className="w-4 h-4 text-amber-300" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Revenue Projections</p>
                        <p className="text-xs text-cyprus-200">Real-data-backed storage revenue estimates per MWh</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Landowner CTA */}
      <section className="section-padding bg-gradient-to-r from-green-500 to-solar-500 text-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Own Land in Cyprus?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Discover your land's solar potential. Get instant assessment and learn how 
                to earn €15K-80K annually or €200K-2M sale premium.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" size="lg" className="bg-white text-green-600 hover:bg-gray-100" asChild>
                  <Link href="/landowners">
                    Assess My Land Value
                  </Link>
                </Button>
                <Button variant="outline-on-dark" size="lg" asChild>
                  <Link href="/landowners">
                    Upload Title Deed
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold mb-1">€25K/year</div>
                <div className="text-sm opacity-80">Average 5-acre lease</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold mb-1">€600K</div>
                <div className="text-sm opacity-80">Average sale premium</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold mb-1">18 months</div>
                <div className="text-sm opacity-80">To Ready-to-Build</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold mb-1">Free</div>
                <div className="text-sm opacity-80">Initial Assessment</div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
