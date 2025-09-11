import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { CYPRUS_CITIES, INVESTMENT_SIZES, CYPRUS_SOLAR_DATA } from '@/lib/constants'
import { ROICalculator } from '@/components/calculators/ROICalculator'
import { ContactForm } from '@/components/forms/ContactForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Sun, Zap, TrendingUp, Shield, Clock } from 'lucide-react'

interface CityPageProps {
  params: {
    city: string
  }
}

// Generate static params for all cities
export async function generateStaticParams() {
  return CYPRUS_CITIES.map((city) => ({
    city: city.slug,
  }))
}

// Generate metadata for each city
export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const city = CYPRUS_CITIES.find(c => c.slug === params.city)
  
  if (!city) {
    return {
      title: 'City Not Found',
    }
  }

  return {
    title: `${city.name} Solar Farm Investment | 15-20% ROI in Cyprus`,
    description: `Invest in ${city.name} solar farms with guaranteed 15-20% ROI. ${city.description}. Premium returns with Lighthief Cyprus.`,
    keywords: [
      `${city.name} solar investment`,
      `${city.name} solar farm`,
      `Cyprus solar ${city.name}`,
      'renewable energy investment',
      'solar PV Cyprus',
    ],
    openGraph: {
      title: `${city.name} Solar Farm Investment | SolarFarms.cy`,
      description: `Invest in ${city.name} solar farms with guaranteed 15-20% ROI. ${city.description}.`,
      type: 'website',
    },
  }
}

export default function CityPage({ params }: CityPageProps) {
  const city = CYPRUS_CITIES.find(c => c.slug === params.city)
  
  if (!city) {
    notFound()
  }

  const cityData = {
    ...city,
    // City-specific solar data (in real implementation, this would come from a database)
    solarIrradiation: CYPRUS_SOLAR_DATA.solarIrradiation + Math.floor(Math.random() * 200) - 100, // Slight variation
    averageROI: 17.5 + (Math.random() * 2 - 1), // 16.5-18.5%
    projectsAvailable: Math.floor(Math.random() * 5) + 3, // 3-7 projects
    electricityRate: CYPRUS_SOLAR_DATA.commercialElectricityRate + (Math.random() * 0.05 - 0.025), // Slight variation
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/1690376781153.jpg"
              alt={`Solar panels in ${city.name}, Cyprus`}
              fill
              className="object-cover opacity-10"
              priority
            />
          </div>
        </div>
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <Badge variant="secondary" className="bg-cyprus-100 text-cyprus-800">
                  <MapPin className="w-4 h-4 mr-2" />
                  {city.name}, Cyprus
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                {city.name} Solar Farm
                <span className="block gradient-text">
                  Investment Opportunities
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                {city.description}. Invest in premium solar farms with guaranteed 15-20% ROI 
                and full lifecycle support from Lighthief Cyprus.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <button className="btn-primary text-lg px-8 py-4">
                  View {city.name} Projects
                </button>
                <button className="btn-secondary text-lg px-8 py-4">
                  Schedule Site Visit
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg"
                  alt={`Solar farm in ${city.name}`}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Location Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">{cityData.projectsAvailable}</div>
                  <div className="text-xs text-gray-600">Projects Available</div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">{cityData.averageROI.toFixed(1)}%</div>
                  <div className="text-xs text-gray-600">Average ROI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* City-Specific Stats */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Why Invest in {city.name}?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {city.name} offers exceptional solar investment opportunities with premium returns 
              and strategic advantages in the Cyprus market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Sun className="w-12 h-12 text-solar-500 mx-auto mb-4" />
                <div className="text-2xl font-bold mb-2">{cityData.solarIrradiation}</div>
                <div className="text-sm text-gray-600">kWh/m²/year</div>
                <div className="text-xs text-gray-500 mt-1">Solar Irradiation</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Zap className="w-12 h-12 text-cyprus-500 mx-auto mb-4" />
                <div className="text-2xl font-bold mb-2">€{cityData.electricityRate.toFixed(3)}</div>
                <div className="text-sm text-gray-600">per kWh</div>
                <div className="text-xs text-gray-500 mt-1">Electricity Rate</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <div className="text-2xl font-bold mb-2">{cityData.averageROI.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Annual ROI</div>
                <div className="text-xs text-gray-500 mt-1">Average Return</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <div className="text-2xl font-bold mb-2">25</div>
                <div className="text-sm text-gray-600">Years</div>
                <div className="text-xs text-gray-500 mt-1">Performance Guarantee</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              {city.name} Investment Options
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from scalable solar farm investments tailored to your portfolio size and goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(INVESTMENT_SIZES).map(([size, data]) => (
              <Card key={size} className="hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">{size}</div>
                  <CardTitle>Solar Farm in {city.name}</CardTitle>
                  <CardDescription>
                    Premium location with excellent grid connectivity
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment</span>
                      <span className="font-semibold">€{(data.minInvestment / 1000000).toFixed(1)}M - €{(data.maxInvestment / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Revenue</span>
                      <span className="font-semibold">€{(data.minRevenue / 1000).toFixed(0)}K - €{(data.maxRevenue / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ROI</span>
                      <span className="font-semibold text-green-600">{data.minROI}% - {data.maxROI}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">25-year NPV</span>
                      <span className="font-semibold">€{(data.minNPV / 1000000).toFixed(1)}M - €{(data.maxNPV / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <button className="w-full btn-primary">
                      Learn More About {size}
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Calculate Your {city.name} Solar Returns
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Use our advanced calculator to see potential returns from solar farm investments in {city.name}.
            </p>
          </div>
          
          <ROICalculator />
        </div>
      </section>

      {/* Local Advantages */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              {city.name} Strategic Advantages
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <MapPin className="w-8 h-8 text-cyprus-500 mb-2" />
                <CardTitle>Prime Location</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Strategic position in Cyprus with excellent access to transmission infrastructure 
                  and proximity to major population centers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-8 h-8 text-solar-500 mb-2" />
                <CardTitle>Grid Connectivity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Direct connection to Cyprus's electricity grid with minimal transmission losses 
                  and priority access for renewable energy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="w-8 h-8 text-green-500 mb-2" />
                <CardTitle>Regulatory Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Full regulatory approval and government incentives for renewable energy projects 
                  in the {city.name} region.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="w-8 h-8 text-blue-500 mb-2" />
                <CardTitle>Fast Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Streamlined permitting process and established infrastructure enable faster 
                  project development and earlier returns.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-purple-500 mb-2" />
                <CardTitle>Market Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Growing electricity demand in {city.name} and surrounding areas ensures 
                  long-term revenue stability and growth potential.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Sun className="w-8 h-8 text-orange-500 mb-2" />
                <CardTitle>Optimal Climate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {city.name}'s climate provides over {CYPRUS_SOLAR_DATA.sunHours} hours of sunshine 
                  annually, maximizing energy production and returns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Ready to Invest in {city.name}?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Schedule a consultation to explore solar farm investment opportunities in {city.name}. 
              Our local experts will provide detailed project information and site visits.
            </p>
          </div>
          
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
