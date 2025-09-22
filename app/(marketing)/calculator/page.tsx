import { Metadata } from 'next'
import Image from 'next/image'
import { ROICalculator } from '@/components/calculators/ROICalculator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calculator, TrendingUp, Euro, Clock, Shield, Info } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solar Farm ROI Calculator | Calculate Cyprus Solar Investment Returns',
  description: 'Free interactive ROI calculator for Cyprus solar farm investments. Calculate potential returns, payback periods, and NPV for 1MW, 5MW, and 10MW solar projects.',
  keywords: [
    'solar ROI calculator',
    'Cyprus solar calculator',
    'solar farm returns calculator',
    'renewable energy ROI',
    'solar investment calculator',
  ],
}

const calculatorFeatures = [
  {
    icon: Calculator,
    title: "Real-Time Calculations",
    description: "Instant ROI calculations based on current Cyprus market data and electricity rates"
  },
  {
    icon: TrendingUp,
    title: "25-Year Projections",
    description: "Complete financial modeling including NPV, IRR, and cash flow analysis"
  },
  {
    icon: Euro,
    title: "Accurate Pricing",
    description: "Based on actual project costs and verified PPA rates in Cyprus market"
  },
  {
    icon: Clock,
    title: "Payback Analysis",
    description: "Detailed payback period calculations with break-even analysis"
  }
]

const assumptions = [
  {
    category: "Technical Assumptions",
    items: [
      "Solar irradiation: 1,800 kWh/m²/year (Cyprus average)",
      "System efficiency: 20-22% (Tier 1 components)",
      "Capacity factor: 22% (Cyprus conditions)",
      "Annual degradation: 0.5% (industry standard)",
      "System availability: 99.5% (with proper O&M)"
    ]
  },
  {
    category: "Financial Assumptions", 
    items: [
      "Electricity rates: €0.15-0.35/kWh (market range)",
      "Operating costs: 5-20% of revenue (configurable)",
      "Discount rate: 8% (for NPV calculations)",
      "Project lifetime: 25 years (standard warranty)",
      "Construction cost: €450-600k/MW (current market)"
    ]
  },
  {
    category: "Market Assumptions",
    items: [
      "PPA rates: €0.15-0.25/kWh (current Cyprus market)",
      "Grid connection: Available within 5km",
      "Regulatory environment: Stable (EU framework)",
      "Currency: EUR (no exchange rate risk)",
      "Inflation: 2% annual (ECB target)"
    ]
  }
]

export default function CalculatorPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/1690376781153.jpg"
              alt="Solar investment calculator"
              fill
              className="object-cover opacity-10"
            />
          </div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Solar Farm ROI
              <span className="block gradient-text">
                Calculator
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 text-balance">
              Calculate your potential returns from Cyprus solar farm investments. 
              Get instant projections for 1MW, 5MW, and 10MW projects with real market data.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">3,300+</div>
                <div className="text-sm text-gray-600">Sun Hours/Year</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">15-20%</div>
                <div className="text-sm text-gray-600">Annual ROI</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">5-8</div>
                <div className="text-sm text-gray-600">Years Payback</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">25</div>
                <div className="text-sm text-gray-600">Year Warranty</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Features */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Advanced ROI Calculator Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional-grade financial modeling with real Cyprus market data
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {calculatorFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-solar-100 to-cyprus-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-solar-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Interactive Calculator */}
          <ROICalculator />
        </div>
      </section>

      {/* Calculator Assumptions */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Calculator Methodology
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our calculations are based on verified market data and conservative assumptions
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {assumptions.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="w-5 h-5 text-cyprus-500 mr-2" />
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.items.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-solar-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-3xl mx-auto">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold text-blue-900 mb-2">Disclaimer</h3>
                  <p className="text-sm text-blue-800">
                    This calculator provides estimates based on current market conditions and historical data. 
                    Actual returns may vary based on weather conditions, electricity rates, equipment performance, 
                    and market factors. All investments carry risk, and past performance does not guarantee future results. 
                    Consult with our investment advisors for personalized projections and risk assessment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-solar-500 to-cyprus-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to Validate Your Investment?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Schedule a consultation to review your calculator results with our investment experts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-solar-600 hover:bg-gray-100">
              Schedule Consultation
            </Button>
            <Button variant="outline-on-dark" size="lg">
              Download Detailed Analysis
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
