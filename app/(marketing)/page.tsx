import { Metadata } from 'next'
import Image from 'next/image'
import { ROICalculator } from '@/components/calculators/ROICalculator'
import { ContactForm } from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'SolarFarms.cy - Cyprus Solar Farm Investments | 15-20% ROI',
  description: 'Invest in Cyprus solar farms with guaranteed 15-20% ROI. Premium returns in Europe\'s sunniest climate. Ready-to-build projects with full lifecycle support.',
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50 overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/solar-panels-on-bright-blue-sky-background-2024-12-16-05-51-23-utc.jpg"
              alt="Solar panels against bright blue Cyprus sky"
              fill
              className="object-cover opacity-10"
              priority
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
                Invest in ready-to-build solar farms with guaranteed 15-20% ROI, 
                5-8 year payback, and full lifecycle support from Lighthief Cyprus.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <button className="btn-primary text-lg px-8 py-4">
                  Download Investment Guide
                </button>
                <button className="btn-secondary text-lg px-8 py-4">
                  Schedule Consultation
                </button>
              </div>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold gradient-text">3,300+</div>
                  <div className="text-sm text-gray-600">Sun Hours/Year</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold gradient-text">15-20%</div>
                  <div className="text-sm text-gray-600">Annual ROI</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold gradient-text">5-8</div>
                  <div className="text-sm text-gray-600">Years Payback</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold gradient-text">1GW+</div>
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
              
              <button className="w-full btn-primary">
                Learn More
              </button>
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
              
              <button className="w-full btn-primary">
                Learn More
              </button>
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
              
              <button className="w-full btn-primary">
                Learn More
              </button>
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
  )
}
