import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Bitcoin, 
  Sun, 
  TrendingUp, 
  Zap,
  Battery,
  ArrowRight,
  CheckCircle,
  Calculator,
  Clock,
  DollarSign,
  BarChart3,
  AlertTriangle,
  Timer,
  Plug,
  TrendingDown,
  Coins
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solar Bitcoin Mining Cyprus | Mine While Waiting for Grid Connection | SolarFarms.cy',
  description: 'Turn your idle solar park into a Bitcoin mining operation. Waiting for grid connection? Generate €50K-150K/month mining crypto until connection terms arrive.',
  keywords: [
    'solar bitcoin mining',
    'BTC mining Cyprus',
    'renewable energy mining',
    'solar powered mining',
    'waiting for grid connection',
    'off-grid bitcoin mining',
    'Cyprus crypto mining',
    'idle solar park',
  ],
}

// Connection delay statistics
const connectionDelayData = [
  { phase: 'Application', duration: '3-6 months', status: 'submitted' },
  { phase: 'EAC Review', duration: '6-12 months', status: 'waiting' },
  { phase: 'Grid Study', duration: '12-18 months', status: 'waiting' },
  { phase: 'Connection Terms', duration: '6-12 months', status: 'waiting' },
  { phase: 'Final Connection', duration: '3-6 months', status: 'waiting' },
]

// BTC Mining Economics (realistic 2025 data)
const btcMiningEconomics = {
  btcPrice: 95000, // EUR
  networkDifficulty: '75T',
  blockReward: 3.125,
  antminerS21: {
    model: 'Antminer S21',
    hashrate: 200, // TH/s
    power: 3500, // Watts
    efficiency: 17.5, // J/TH
    price: 5500, // EUR
    dailyBTC: 0.000085, // per unit at current difficulty
    dailyEUR: 8.07, // at €95K BTC
  },
  antminerS19XP: {
    model: 'Antminer S19 XP',
    hashrate: 140, // TH/s
    power: 3010, // Watts
    efficiency: 21.5, // J/TH
    price: 3500, // EUR
    dailyBTC: 0.000059,
    dailyEUR: 5.61,
  },
}

const miningScenarios = [
  {
    title: 'Waiting for Connection',
    subtitle: 'Park built, no grid terms yet',
    icon: Timer,
    highlight: 'BRIDGE INCOME',
    featured: true,
    economics: {
      energyCost: '€0/kWh (your own power)',
      operatingHours: '10-14 hrs/day (with BESS)',
      annualEnergy: '~8,000 MWh (full output)',
      miners: '~1,400 Antminer S21 (3.5kW each)',
      hashrate: '280 PH/s total',
      monthlyRevenue: '~€65,000-85,000',
      annualROI: '30-45% on mining investment'
    },
    pros: [
      'Generate income while waiting 2-5 years',
      'Zero energy cost - use your own solar',
      'Equipment resale value after connection',
      'Cover O&M costs during idle period'
    ],
    cons: [
      'Mining equipment investment required',
      'Need containerized mining setup',
      'Transition to grid when connected'
    ]
  },
  {
    title: 'Curtailment Mining (No BESS)',
    subtitle: 'Mine during grid curtailment periods',
    icon: Sun,
    highlight: 'FREE ENERGY',
    featured: false,
    economics: {
      energyCost: '€0/kWh (curtailed)',
      operatingHours: '6-8 hrs/day peak curtailment',
      annualEnergy: '~1,200 MWh (25% curtailed from 5MW)',
      miners: '~350 Antminer S19 XP (3.25kW each)',
      hashrate: '49 PH/s total',
      monthlyRevenue: '~€35,000-50,000',
      annualROI: '15-25% on equipment'
    },
    pros: [
      'Zero energy cost - using "waste" curtailed power',
      'No additional grid infrastructure needed',
      'Quick setup - plug into existing solar output',
      'Income from otherwise lost production'
    ],
    cons: [
      'Variable operating hours (depends on curtailment)',
      'Equipment idle during non-curtailment',
      'Weather dependent production'
    ]
  },
  {
    title: 'BESS-Enabled 24/7 Mining',
    subtitle: 'Continuous mining with battery storage',
    icon: Battery,
    highlight: '24/7 OPERATION',
    featured: false,
    economics: {
      energyCost: '€0.06-0.08/kWh average',
      operatingHours: '24 hrs/day',
      annualEnergy: '~2,500 MWh utilized',
      miners: '~280 Antminer S19 XP (optimized for 24/7)',
      hashrate: '39 PH/s total',
      monthlyRevenue: '~€28,000-40,000',
      annualROI: '18-30% on total investment'
    },
    pros: [
      'Consistent 24/7 mining operation',
      'Optimized equipment utilization',
      'Energy arbitrage opportunities',
      'Predictable revenue streams'
    ],
    cons: [
      'Higher initial BESS investment',
      'Battery degradation costs',
      'More complex operations'
    ]
  },
  {
    title: 'Off-Grid Mining Park',
    subtitle: 'For parks without grid connection',
    icon: Zap,
    highlight: '100% UTILIZATION',
    featured: false,
    economics: {
      energyCost: '€0.05-0.07/kWh',
      operatingHours: '10-12 hrs/day (daylight)',
      annualEnergy: '~4,000 MWh (full 5MW output)',
      miners: '~800 Antminer S19 XP',
      hashrate: '112 PH/s total',
      monthlyRevenue: '~€80,000-120,000',
      annualROI: '25-40% on total investment'
    },
    pros: [
      'No grid connection delays (2-5 years wait)',
      '100% energy utilization - no curtailment',
      'Maximum mining capacity',
      'Immediate revenue generation'
    ],
    cons: [
      'Daytime only without BESS',
      'Full mining infrastructure required',
      'Larger upfront investment'
    ]
  }
]

const equipmentSpecs = [
  {
    model: 'Antminer S19 XP',
    hashrate: '140 TH/s',
    power: '3,250W',
    efficiency: '21.5 J/TH',
    price: '~€3,500',
    recommended: true
  },
  {
    model: 'Antminer S19k Pro',
    hashrate: '120 TH/s',
    power: '2,760W',
    efficiency: '23 J/TH',
    price: '~€2,800',
    recommended: false
  },
  {
    model: 'Whatsminer M50S',
    hashrate: '126 TH/s',
    power: '3,276W',
    efficiency: '26 J/TH',
    price: '~€2,500',
    recommended: false
  }
]

export default function SolarMiningPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-orange-900 via-amber-900 to-yellow-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg"
            alt="Solar Bitcoin mining farm"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/90 via-amber-900/80 to-yellow-900/90 z-10"></div>
        
        <div className="container relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 mb-6 text-base px-4 py-2">
              <Bitcoin className="w-5 h-5 mr-2" />
              Solar-Powered Bitcoin Mining
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Your Park Is Built.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300">
                Make Money While You Wait.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 text-balance">
              Waiting 2-5 years for grid connection? Turn your idle solar park into a Bitcoin mining 
              operation. Generate €50K-150K/month until connection terms arrive.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="xl" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold" asChild>
                <Link href="/contact">
                  <Calculator className="w-5 h-5 mr-2" />
                  Get Mining Quote
                </Link>
              </Button>
              <Button size="xl" className="bg-white/20 border-2 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm" asChild>
                <Link href="/projects/park-ref-5001">
                  View 5MW Park Example
                </Link>
              </Button>
            </div>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-red-400">2-5 yrs</div>
                <div className="text-sm text-gray-300">Avg. Connection Wait</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-green-400">€50-150K</div>
                <div className="text-sm text-gray-300">Monthly Mining Revenue</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-orange-400">8%</div>
                <div className="text-sm text-gray-300">Cyprus Crypto Tax</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-yellow-400">8-12 wks</div>
                <div className="text-sm text-gray-300">Mining Setup Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Connection Crisis Section */}
      <section className="section-padding bg-gradient-to-b from-red-50 to-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-red-100 text-red-700 border-red-200 mb-4">
                <AlertTriangle className="w-4 h-4 mr-2" />
                The Cyprus Grid Connection Crisis
              </Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Your Solar Park Is Ready. The Grid Isn&apos;t.
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hundreds of solar projects in Cyprus are stuck waiting 2-5 years for grid connection terms. 
                Your investment sits idle, depreciating, costing money—generating nothing.
              </p>
            </div>

            {/* Timeline Visualization */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Timer className="w-5 h-5 text-red-500" />
                Typical Connection Timeline in Cyprus
              </h3>
              
              <div className="relative">
                {/* Progress Bar Background */}
                <div className="absolute top-8 left-0 right-0 h-2 bg-gray-200 rounded-full"></div>
                <div className="absolute top-8 left-0 w-1/5 h-2 bg-green-500 rounded-l-full"></div>
                
                <div className="grid grid-cols-5 gap-2 relative z-10">
                  {connectionDelayData.map((phase, idx) => (
                    <div key={phase.phase} className="text-center">
                      <div className={`w-6 h-6 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xs font-bold ${
                        idx === 0 ? 'bg-green-500' : 'bg-gray-400'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="h-8"></div>
                      <div className="text-xs font-semibold text-gray-900">{phase.phase}</div>
                      <div className={`text-xs mt-1 ${idx === 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {phase.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="text-4xl font-bold text-red-600">30-54</div>
                  <div>
                    <div className="font-semibold text-red-800">Months Total Wait</div>
                    <div className="text-sm text-red-600">Your park generates €0 during this entire period</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison: Idle vs Mining */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-2 border-red-200 bg-red-50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <TrendingDown className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <CardTitle className="text-red-800">Idle Park (Do Nothing)</CardTitle>
                      <CardDescription className="text-red-600">3-year wait scenario for 5MW park</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-red-200">
                      <span className="text-gray-600">Revenue Generated</span>
                      <span className="font-bold text-red-600">€0</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-red-200">
                      <span className="text-gray-600">O&M Costs (3 years)</span>
                      <span className="font-bold text-red-600">-€135,000</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-red-200">
                      <span className="text-gray-600">Insurance (3 years)</span>
                      <span className="font-bold text-red-600">-€45,000</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-red-200">
                      <span className="text-gray-600">Equipment Depreciation</span>
                      <span className="font-bold text-red-600">-€750,000</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-red-200">
                      <span className="text-gray-600">Lost Opportunity Cost</span>
                      <span className="font-bold text-red-600">-€2,400,000</span>
                    </div>
                    <div className="flex justify-between py-3 bg-red-100 rounded-lg px-3 -mx-3">
                      <span className="font-semibold text-red-800">Total Impact</span>
                      <span className="font-bold text-red-600 text-lg">-€3,330,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-green-50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Bitcoin className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-green-800">Mining Park (Smart Move)</CardTitle>
                      <CardDescription className="text-green-600">3-year mining scenario for 5MW park</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-green-200">
                      <span className="text-gray-600">BTC Mining Revenue (3 yrs)</span>
                      <span className="font-bold text-green-600">+€2,880,000</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-green-200">
                      <span className="text-gray-600">Mining Equipment Cost</span>
                      <span className="font-bold text-red-600">-€850,000</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-green-200">
                      <span className="text-gray-600">O&M + Operations (3 yrs)</span>
                      <span className="font-bold text-red-600">-€200,000</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-green-200">
                      <span className="text-gray-600">Cyprus Tax (8%)</span>
                      <span className="font-bold text-red-600">-€146,400</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-green-200">
                      <span className="text-gray-600">Equipment Resale Value</span>
                      <span className="font-bold text-green-600">+€300,000</span>
                    </div>
                    <div className="flex justify-between py-3 bg-green-100 rounded-lg px-3 -mx-3">
                      <span className="font-semibold text-green-800">Net Profit</span>
                      <span className="font-bold text-green-600 text-lg">+€1,983,600</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* The Difference */}
            <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 rounded-2xl p-8 text-center text-white">
              <div className="text-5xl md:text-6xl font-bold mb-2">€5,313,600</div>
              <div className="text-xl opacity-90">Difference Between Idle and Mining Over 3 Years</div>
              <p className="mt-4 text-sm opacity-80 max-w-2xl mx-auto">
                This is the real cost of waiting. While you sit idle, smart investors are mining Bitcoin 
                and will have already paid off their entire solar investment before connection arrives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Realistic BTC Earnings Calculator */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-orange-100 text-orange-700 border-orange-200 mb-4">
                <Calculator className="w-4 h-4 mr-2" />
                Real Numbers, No Hype
              </Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Realistic BTC Mining Earnings
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Based on current Bitcoin price (~€95,000), network difficulty, and actual Antminer specifications.
                These are conservative estimates—BTC price appreciation not included.
              </p>
            </div>

            {/* Mining Calculator Visual */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white mb-12">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-400" />
                5MW Solar Park → Mining Operation
              </h3>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Daylight Only */}
                <div className="bg-white/10 rounded-xl p-6">
                  <div className="text-sm text-orange-400 font-semibold mb-2">DAYLIGHT MINING</div>
                  <div className="text-2xl font-bold text-yellow-400 mb-1">~10 hrs/day</div>
                  <div className="text-gray-400 text-sm mb-4">No BESS, solar hours only</div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Miners (S21)</span>
                      <span className="font-semibold">~1,400 units</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Hashrate</span>
                      <span className="font-semibold">280 PH/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Daily BTC</span>
                      <span className="font-semibold text-yellow-400">~0.05 BTC</span>
                    </div>
                    <div className="flex justify-between border-t border-white/20 pt-3">
                      <span className="text-gray-300">Monthly Revenue</span>
                      <span className="font-bold text-green-400">~€47,000</span>
                    </div>
                  </div>
                </div>

                {/* With 2h BESS */}
                <div className="bg-white/10 rounded-xl p-6 border-2 border-orange-500">
                  <div className="text-sm text-orange-400 font-semibold mb-2">WITH 2-HOUR BESS</div>
                  <div className="text-2xl font-bold text-yellow-400 mb-1">~14 hrs/day</div>
                  <div className="text-gray-400 text-sm mb-4">Extended operations</div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Miners (S21)</span>
                      <span className="font-semibold">~1,400 units</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Hashrate</span>
                      <span className="font-semibold">280 PH/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Daily BTC</span>
                      <span className="font-semibold text-yellow-400">~0.07 BTC</span>
                    </div>
                    <div className="flex justify-between border-t border-white/20 pt-3">
                      <span className="text-gray-300">Monthly Revenue</span>
                      <span className="font-bold text-green-400">~€66,000</span>
                    </div>
                  </div>
                </div>

                {/* With 4h BESS */}
                <div className="bg-white/10 rounded-xl p-6">
                  <div className="text-sm text-orange-400 font-semibold mb-2">WITH 4-HOUR BESS</div>
                  <div className="text-2xl font-bold text-yellow-400 mb-1">~18 hrs/day</div>
                  <div className="text-gray-400 text-sm mb-4">Near 24/7 operations</div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Miners (S21)</span>
                      <span className="font-semibold">~1,400 units</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Hashrate</span>
                      <span className="font-semibold">280 PH/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Daily BTC</span>
                      <span className="font-semibold text-yellow-400">~0.09 BTC</span>
                    </div>
                    <div className="flex justify-between border-t border-white/20 pt-3">
                      <span className="text-gray-300">Monthly Revenue</span>
                      <span className="font-bold text-green-400">~€85,000</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculation Breakdown */}
              <div className="bg-black/30 rounded-xl p-6">
                <h4 className="font-semibold mb-4 text-yellow-400">How We Calculate This:</h4>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <div className="text-gray-400 mb-2">Mining Formula:</div>
                    <code className="text-xs bg-black/50 p-2 rounded block text-green-400">
                      Daily BTC = (Hashrate × 86400) / (Difficulty × 2³²) × Block Reward
                    </code>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-2">Current Parameters:</div>
                    <div className="space-y-1 text-gray-300">
                      <div>• BTC Price: €95,000</div>
                      <div>• Network Difficulty: ~75T</div>
                      <div>• Block Reward: 3.125 BTC</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BESS Options for 24/7 Mining */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center">BESS Options for Extended Mining</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">2-Hour BESS</CardTitle>
                      <Badge variant="secondary">Popular</Badge>
                    </div>
                    <CardDescription>10 MWh capacity for 5MW park</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">BESS Cost</span>
                        <span className="font-semibold">~€1,400,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Extra Mining Hours</span>
                        <span className="font-semibold text-green-600">+4 hrs/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Additional Revenue</span>
                        <span className="font-semibold text-green-600">+€19K/month</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600">Payback Period</span>
                        <span className="font-bold text-orange-600">~6 years</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-orange-500">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">3-Hour BESS</CardTitle>
                      <Badge className="bg-orange-500">Recommended</Badge>
                    </div>
                    <CardDescription>15 MWh capacity for 5MW park</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">BESS Cost</span>
                        <span className="font-semibold">~€2,100,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Extra Mining Hours</span>
                        <span className="font-semibold text-green-600">+6 hrs/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Additional Revenue</span>
                        <span className="font-semibold text-green-600">+€28K/month</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600">Payback Period</span>
                        <span className="font-bold text-orange-600">~6.3 years</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">4-Hour BESS</CardTitle>
                      <Badge variant="secondary">Maximum</Badge>
                    </div>
                    <CardDescription>20 MWh capacity for 5MW park</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">BESS Cost</span>
                        <span className="font-semibold">~€2,800,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Extra Mining Hours</span>
                        <span className="font-semibold text-green-600">+8 hrs/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Additional Revenue</span>
                        <span className="font-semibold text-green-600">+€38K/month</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600">Payback Period</span>
                        <span className="font-bold text-orange-600">~6.1 years</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <p className="text-center text-gray-500 text-sm mt-4">
                Note: BESS can be repurposed for grid services once connection is established, 
                providing additional revenue streams and faster payback.
              </p>
            </div>

            <div className="text-center">
              <Button size="xl" variant="gradient" asChild>
                <Link href="/contact">
                  <Calculator className="w-5 h-5 mr-2" />
                  Get Custom Mining Analysis for Your Park
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Curtailment Opportunity (Existing Connected Parks) */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 mb-4">
                <Plug className="w-4 h-4 mr-2" />
                For Connected Parks
              </Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Already Connected? Mine Your Curtailed Energy
              </h2>
              <p className="text-xl text-gray-600">
                Cyprus grid curtailment has reached 45.8% in 2025 - solar parks are losing nearly half their potential revenue. 
                Smart investors are turning this wasted energy into Bitcoin.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Cyprus Curtailment Crisis (2021-2025)
              </h3>
              <div className="grid grid-cols-5 gap-4 text-center">
                {[
                  { year: '2021', rate: '0%' },
                  { year: '2022', rate: '1.6%' },
                  { year: '2023', rate: '13.7%' },
                  { year: '2024', rate: '26.7%' },
                  { year: '2025', rate: '45.8%' }
                ].map((item) => (
                  <div key={item.year} className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="text-sm text-gray-600">{item.year}</div>
                    <div className={`text-xl font-bold ${item.rate === '45.8%' ? 'text-red-600' : 'text-gray-800'}`}>
                      {item.rate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-green-800 mb-3">The Problem:</h4>
                  <p className="text-green-700 text-sm">
                    Solar parks are forced to curtail (shut down) during peak production hours when the grid can't absorb 
                    excess power. This energy is completely lost - no revenue, no compensation in most cases.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-yellow-800 mb-3">The Solution:</h4>
                  <p className="text-yellow-700 text-sm">
                    Instead of wasting curtailed energy, direct it to Bitcoin mining equipment on-site. 
                    Transform "worthless" curtailed power into valuable cryptocurrency at zero marginal energy cost.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mining Scenarios */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Mining Scenarios for 5MW Solar Park
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Four approaches to solar-powered Bitcoin mining, each optimized for different investment profiles
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {miningScenarios.map((scenario) => (
              <Card 
                key={scenario.title} 
                className={`hover:shadow-xl transition-all duration-300 ${
                  scenario.featured 
                    ? 'border-2 border-orange-500 ring-2 ring-orange-200 shadow-lg relative' 
                    : 'border-2'
                }`}
              >
                {scenario.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    RECOMMENDED
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      scenario.featured 
                        ? 'bg-gradient-to-r from-orange-500 to-yellow-500' 
                        : 'bg-gradient-to-r from-orange-100 to-yellow-100'
                    }`}>
                      <scenario.icon className={`w-6 h-6 ${scenario.featured ? 'text-white' : 'text-orange-600'}`} />
                    </div>
                    <Badge className={scenario.featured ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}>
                      {scenario.highlight}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{scenario.title}</CardTitle>
                  <CardDescription className="text-sm">{scenario.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Economics */}
                  <div className={`rounded-lg p-3 space-y-1.5 text-xs ${scenario.featured ? 'bg-orange-50' : 'bg-gray-50'}`}>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Energy Cost:</span>
                      <span className="font-semibold text-green-600">{scenario.economics.energyCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Operating Hours:</span>
                      <span className="font-medium">{scenario.economics.operatingHours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Miners:</span>
                      <span className="font-medium text-xs">{scenario.economics.miners}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hashrate:</span>
                      <span className="font-medium">{scenario.economics.hashrate}</span>
                    </div>
                    <div className="flex justify-between border-t pt-1.5">
                      <span className="text-gray-600">Monthly Revenue:</span>
                      <span className="font-bold text-green-600">{scenario.economics.monthlyRevenue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual ROI:</span>
                      <span className="font-bold text-orange-600">{scenario.economics.annualROI}</span>
                    </div>
                  </div>
                  
                  {/* Pros */}
                  <div>
                    <h4 className="font-semibold text-green-700 mb-1.5 text-xs">Advantages:</h4>
                    <div className="space-y-1">
                      {scenario.pros.slice(0, 3).map((pro) => (
                        <div key={pro} className="flex items-start gap-1.5 text-xs">
                          <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{pro}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="xl" variant="gradient" asChild>
              <Link href="/contact">
                Get Custom Mining Analysis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Recommended Mining Equipment
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Industry-leading ASIC miners optimized for solar power operations
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {equipmentSpecs.map((equipment) => (
                <Card 
                  key={equipment.model} 
                  className={`${equipment.recommended ? 'border-2 border-orange-500 shadow-lg' : ''}`}
                >
                  {equipment.recommended && (
                    <div className="bg-orange-500 text-white text-center text-sm font-semibold py-1">
                      RECOMMENDED
                    </div>
                  )}
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg mb-4">{equipment.model}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hashrate:</span>
                        <span className="font-semibold">{equipment.hashrate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Power:</span>
                        <span className="font-semibold">{equipment.power}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Efficiency:</span>
                        <span className="font-semibold">{equipment.efficiency}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-bold text-orange-600">{equipment.price}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-blue-50 rounded-xl">
              <h4 className="font-semibold text-blue-800 mb-2">Equipment Financing Available</h4>
              <p className="text-blue-700 text-sm">
                Through our network of equipment partners, we can arrange financing for mining hardware 
                with terms up to 24 months. Contact us for current rates and availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Getting Started
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From solar park to mining operation in 8-12 weeks
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Site Assessment', desc: 'Evaluate solar output, curtailment patterns, and infrastructure', icon: Calculator },
                { step: '2', title: 'Equipment Sizing', desc: 'Calculate optimal miner count and power infrastructure', icon: BarChart3 },
                { step: '3', title: 'Installation', desc: 'Container setup, electrical connections, cooling systems', icon: Zap },
                { step: '4', title: 'Operations', desc: 'Remote monitoring, maintenance, revenue optimization', icon: TrendingUp }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm text-orange-400 font-bold mb-1">STEP {item.step}</div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12 flex items-center justify-center gap-4">
              <Clock className="w-6 h-6 text-orange-400" />
              <span className="text-gray-300">Typical implementation: <strong className="text-white">8-12 weeks</strong> from assessment to first hash</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Turn Your Curtailed Energy Into Bitcoin
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Stop losing money to grid curtailment. Start mining with free solar energy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" className="bg-white text-orange-600 hover:bg-gray-100 font-bold" asChild>
              <Link href="/contact">
                <Bitcoin className="w-5 h-5 mr-2" />
                Get Mining Consultation
              </Link>
            </Button>
            <Button size="xl" className="bg-white/20 border-2 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm" asChild>
              <Link href="/crypto/ai-mining">
                Explore AI GPU Mining
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
