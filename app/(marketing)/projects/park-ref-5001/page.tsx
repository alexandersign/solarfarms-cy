'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { 
  Zap, 
  TrendingUp, 
  Battery, 
  Calendar,
  Euro,
  BarChart3,
  CheckCircle,
  Info,
  MessageCircle
} from 'lucide-react'
import { formatCurrency, formatPercentage } from '@/lib/utils'

// Real data from Galascope Limited 5.01MW park
const PARK_DATA = {
  referenceNumber: 'PARK-REF-5001',
  sizeMW: 5.01,
  sizeDC: 5.01,
  sizeAC: 4.62,
  askingPrice: 9600000, // €9.6M based on curtailment scenario
  
  // Equipment
  equipment: {
    panels: 'Trina Solar TSM-DEG15M.20 (II) – glass/glass (395Wp & 400Wp)',
    inverters: 'Huawei SUN2000-105KTL-H1 (44 units)',
    tracking: 'Nclave SP160 single-axis solar trackers (2P)',
    substations: 'ABB & Siemens',
    transformers: 'Lemi Trafo 1250 kVA 11-22 / 0.8 kV (4 units)',
    scada: 'IESA Automation'
  },
  
  // Historical production and curtailment data
  productionHistory: [
    { year: 2020, production: 7171270, curtailment: 0, curtailmentPct: 0 },
    { year: 2021, production: 10146040, curtailment: 0, curtailmentPct: 0 },
    { year: 2022, production: 9896864, curtailment: 357463, curtailmentPct: 3.5 },
    { year: 2023, production: 8861341, curtailment: 1362297, curtailmentPct: 13.4 },
    { year: 2024, production: 7436287, curtailment: 2710110, curtailmentPct: 26.7 },
    { year: 2025, production: 5598546, curtailment: 4597691, curtailmentPct: 45.8 }
  ],
  
  // O&M costs
  omCosts: {
    insurance: 5000,
    accounting: 5000,
    ceraLicense: 3000,
    administrator: 25000,
    onsiteEmployee: 25000,
    electricalOfficer: 2000,
    electricalMaintenance: 1000,
    electrician: 5000,
    motorFailures: 1000,
    controllerRepairs: 2000,
    moduleCleaning: 20000,
    securitySystem: 2000,
    utilities: 2000,
    repairsRenewals: 15000,
    total: 113000
  },
  
  // PPA details
  ppa: {
    offtaker: 'Local independent distributor',
    discount: 'Preferential discount to EAC D40',
    tariff2023: 201, // €201/MWh
    tariff2024: 190, // €190/MWh
  },
  
  // Land lease
  landLease: {
    startDate: '2019-09-01',
    endDate: '2039-09-01',
    annualRent: 25000,
    escalation: '10% every 5 years',
    extensions: '2 x 5-year options'
  },
  
  // Spares included
  spares: {
    inverters: { qty: 1, value: 4000 },
    panels: { qty: 40, value: 5000 },
    trackerMotors: { qty: 20, value: 6000 },
    trackerControlUnits: { qty: 5, value: 1500 },
    slewingDrives: { qty: 1, value: 1000 },
    trackerPosts: { value: 1000 }
  }
}

export default function ParkRef5001Page() {
  const [bessSize, setBessSize] = useState([2.5]) // MWh per MW (default 2.5)
  const [curtailmentRecovery, setCurtailmentRecovery] = useState([50]) // % recovery
  const [showContactForm, setShowContactForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  // Tariff constants
  const DAY_TARIFF = 0.19 // €190/MWh average
  const NIGHT_TARIFF = 0.228 // €228/MWh (20% premium)

  // Calculate ROI scenarios
  const calculateROI = (withBESS: boolean) => {
    const avgCurtailment = 0.258 // 25.8% average from 2022-2025
    const grossProduction = 10000000 // ~10 GWh typical for 5MW with tracking
    const tariff = DAY_TARIFF
    
    if (!withBESS) {
      // Solar only scenario
      const netProduction = grossProduction * (1 - avgCurtailment)
      const revenue = netProduction * tariff
      const opex = PARK_DATA.omCosts.total + PARK_DATA.landLease.annualRent
      const netIncome = revenue - opex
      const roi = (netIncome / PARK_DATA.askingPrice) * 100
      
      return {
        capex: PARK_DATA.askingPrice,
        grossProduction,
        curtailedEnergy: grossProduction * avgCurtailment,
        netProduction,
        revenue,
        opex,
        netIncome,
        roi,
        payback: PARK_DATA.askingPrice / netIncome
      }
    } else {
      // Solar + BESS scenario
      const bessCapacity = bessSize[0] * PARK_DATA.sizeMW // Total MWh
      const bessCapex = bessCapacity * 140000 // €140k per MWh
      const totalCapex = PARK_DATA.askingPrice + bessCapex
      
      // Curtailed energy recovery
      const curtailedEnergy = grossProduction * avgCurtailment
      const recoveredEnergy = curtailedEnergy * (curtailmentRecovery[0] / 100)
      const netProduction = grossProduction * (1 - avgCurtailment) + recoveredEnergy
      
      // Revenue (assuming night tariff 20% higher for shifted energy)
      const dayRevenue = (grossProduction * (1 - avgCurtailment)) * tariff
      const nightRevenue = recoveredEnergy * (tariff * 1.2)
      const totalRevenue = dayRevenue + nightRevenue
      
      const opex = PARK_DATA.omCosts.total + PARK_DATA.landLease.annualRent + (bessCapacity * 2000) // BESS O&M
      const netIncome = totalRevenue - opex
      const roi = (netIncome / totalCapex) * 100
      
      return {
        capex: totalCapex,
        bessCapex,
        bessSize: bessCapacity,
        grossProduction,
        curtailedEnergy,
        recoveredEnergy,
        netProduction,
        revenue: totalRevenue,
        opex,
        netIncome,
        roi,
        payback: totalCapex / netIncome,
        bessROI: (nightRevenue - (bessCapacity * 2000)) / bessCapex * 100
      }
    }
  }

  const solarOnly = calculateROI(false)
  const solarBESS = calculateROI(true)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4">
                Available for Acquisition
              </Badge>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                5MW Solar Park with Single-Axis Tracking System
                <span className="block gradient-text text-3xl md:text-4xl mt-2">
                  Reference: {PARK_DATA.referenceNumber}
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                Operational solar park with premium tracking technology and BESS expansion capability
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-cyprus-600 mb-2">
                    {PARK_DATA.sizeMW} MW
                  </div>
                  <div className="text-sm text-gray-600">DC Capacity</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-solar-600 mb-2">
                    {formatCurrency(PARK_DATA.askingPrice)}
                  </div>
                  <div className="text-sm text-gray-600">Asking Price</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {formatPercentage(solarOnly.roi)}
                  </div>
                  <div className="text-sm text-gray-600">ROI (Solar Only)</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {formatPercentage(solarBESS.roi)}
                  </div>
                  <div className="text-sm text-gray-600">ROI (with BESS)</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="section-padding">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/IMG_0149.JPG"
                alt="5MW Solar Park with Single-Axis Tracking - Aerial View"
                fill
                className="object-cover"
                priority
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
                5.01MW DC Capacity with Tracking System
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/IMG_0146.JPG"
                alt="5MW Solar Park with Single-Axis Tracking - Close View"
                fill
                className="object-cover"
                priority
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
                Nclave SP160 Single-Axis Trackers (2P)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator with BESS Scenarios */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Interactive ROI Analysis
              </h2>
              <p className="text-xl text-gray-600">
                Compare solar-only vs solar+BESS scenarios with real curtailment data
              </p>
            </div>

            <Tabs defaultValue="solar-only" className="space-y-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="solar-only">Solar Only</TabsTrigger>
                <TabsTrigger value="solar-bess">Solar + BESS</TabsTrigger>
              </TabsList>

              {/* Solar Only Scenario */}
              <TabsContent value="solar-only" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Performance (with Curtailment Impact)</CardTitle>
                    <CardDescription>
                      Historical curtailment averaging 25.8% (2022-2025)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Purchase Price</div>
                        <div className="text-2xl font-bold text-cyprus-600">
                          {formatCurrency(solarOnly.capex)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Annual Revenue</div>
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(solarOnly.revenue)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Net Income</div>
                        <div className="text-2xl font-bold text-solar-600">
                          {formatCurrency(solarOnly.netIncome)}
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Info className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-red-900 mb-1">Curtailment Impact</h4>
                          <p className="text-sm text-red-800">
                            {formatCurrency(solarOnly.curtailedEnergy * DAY_TARIFF)} annual revenue lost to curtailment
                            ({(solarOnly.curtailedEnergy / 1000).toFixed(0)} MWh curtailed)
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">
                          {formatPercentage(solarOnly.roi)}
                        </div>
                        <div className="text-xs text-gray-600">Annual ROI</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">
                          {solarOnly.payback.toFixed(1)} years
                        </div>
                        <div className="text-xs text-gray-600">Payback Period</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">
                          {(solarOnly.netProduction / 1000000).toFixed(2)} GWh
                        </div>
                        <div className="text-xs text-gray-600">Net Production</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">
                          {formatCurrency(solarOnly.opex)}
                        </div>
                        <div className="text-xs text-gray-600">Annual OPEX</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Solar + BESS Scenario */}
              <TabsContent value="solar-bess" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Enhanced Performance with Battery Storage</CardTitle>
                    <CardDescription>
                      Offset curtailment by shifting energy to night tariff periods
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* BESS Size Slider */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-base font-medium">BESS Size (MWh per MW)</label>
                        <span className="text-lg font-semibold text-cyprus-600">
                          {bessSize[0]} MWh/MW ({(bessSize[0] * PARK_DATA.sizeMW).toFixed(1)} MWh total)
                        </span>
                      </div>
                      <Slider
                        value={bessSize}
                        onValueChange={setBessSize}
                        max={4}
                        min={0.5}
                        step={0.5}
                        className="w-full"
                        aria-label="BESS size slider"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>0.5 MWh/MW</span>
                        <span>2.5 MWh/MW (Optimal)</span>
                        <span>4 MWh/MW</span>
                      </div>
                    </div>

                    {/* Curtailment Recovery Slider */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-base font-medium">Curtailment Recovery Rate</label>
                        <span className="text-lg font-semibold text-solar-600">
                          {curtailmentRecovery[0]}%
                        </span>
                      </div>
                      <Slider
                        value={curtailmentRecovery}
                        onValueChange={setCurtailmentRecovery}
                        max={80}
                        min={30}
                        step={10}
                        className="w-full"
                        aria-label="Curtailment recovery slider"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>30% (Conservative)</span>
                        <span>50% (Typical)</span>
                        <span>80% (Optimistic)</span>
                      </div>
                    </div>

                    {/* BESS Financial Impact */}
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Total Investment</div>
                        <div className="text-2xl font-bold text-cyprus-600">
                          {formatCurrency(solarBESS.capex)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Park: {formatCurrency(PARK_DATA.askingPrice)} + BESS: {formatCurrency(solarBESS.bessCapex || 0)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Annual Revenue</div>
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(solarBESS.revenue)}
                        </div>
                        <div className="text-xs text-green-700">
                          +{formatCurrency(solarBESS.revenue - solarOnly.revenue)} vs solar-only
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Net Income</div>
                        <div className="text-2xl font-bold text-solar-600">
                          {formatCurrency(solarBESS.netIncome)}
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Battery className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-green-900 mb-1">BESS Value Proposition</h4>
                          <p className="text-sm text-green-800 mb-2">
                            Recovers {((solarBESS.recoveredEnergy || 0) / 1000).toFixed(0)} MWh of curtailed energy annually
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-green-700">BESS ROI: </span>
                              <span className="font-semibold">{formatPercentage(solarBESS.bessROI || 0)}</span>
                            </div>
                            <div>
                              <span className="text-green-700">Payback: </span>
                              <span className="font-semibold">{solarBESS.payback.toFixed(1)} years</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">
                          {formatPercentage(solarBESS.roi)}
                        </div>
                        <div className="text-xs text-gray-600">Enhanced ROI</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">
                          {solarBESS.payback.toFixed(1)} years
                        </div>
                        <div className="text-xs text-gray-600">Payback Period</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">
                          {((solarBESS.netProduction || 0) / 1000000).toFixed(2)} GWh
                        </div>
                        <div className="text-xs text-gray-600">Enhanced Production</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">
                          {(solarBESS.bessSize || 0).toFixed(1)} MWh
                        </div>
                        <div className="text-xs text-gray-600">BESS Capacity</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8">Technical Specifications</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Equipment & Technology</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(PARK_DATA.equipment).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-start border-b border-gray-100 pb-3">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm text-gray-900 text-right max-w-xs">{value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Included Spares & Equipment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Inverters</span>
                    <span className="text-sm font-medium">{PARK_DATA.spares.inverters.qty} units (€{PARK_DATA.spares.inverters.value.toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">PV Panels</span>
                    <span className="text-sm font-medium">{PARK_DATA.spares.panels.qty} units (€{PARK_DATA.spares.panels.value.toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Tracker Motors</span>
                    <span className="text-sm font-medium">{PARK_DATA.spares.trackerMotors.qty} units (€{PARK_DATA.spares.trackerMotors.value.toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Tracker Control Units (TCUs)</span>
                    <span className="text-sm font-medium">{PARK_DATA.spares.trackerControlUnits.qty} units (€{PARK_DATA.spares.trackerControlUnits.value.toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Slewing Drives</span>
                    <span className="text-sm font-medium">{PARK_DATA.spares.slewingDrives.qty} unit (€{PARK_DATA.spares.slewingDrives.value.toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Tracker Posts & Fixings</span>
                    <span className="text-sm font-medium">Various (€{PARK_DATA.spares.trackerPosts.value.toLocaleString()})</span>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex justify-between font-semibold">
                      <span>Total Spares Value</span>
                      <span>€18,500</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Curtailment Chart Hero */}
      <section className="section-padding bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <Badge variant="destructive" className="mb-4">Critical Market Trend</Badge>
              <h2 className="text-3xl font-heading font-bold mb-4">
                Cyprus Curtailment Crisis: The BESS Opportunity
              </h2>
              <p className="text-xl text-gray-600">
                Curtailment increased from 0% to 45.8% in just 4 years - making BESS essential for ROI protection
              </p>
            </div>
            
            {/* Curtailment Trend Visualization */}
            <div className="bg-white rounded-xl shadow-2xl p-8">
              <div className="grid md:grid-cols-5 gap-4 mb-6">
                {PARK_DATA.productionHistory.slice(1).map((year) => (
                  <div key={year.year} className="text-center">
                    <div className="text-sm font-semibold text-gray-700 mb-2">{year.year}</div>
                    <div className="relative h-32 bg-gradient-to-t from-red-500 to-red-200 rounded-lg overflow-hidden">
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-500 to-green-300"
                        style={{ height: `${100 - year.curtailmentPct}%` }}
                      />
                    </div>
                    <div className="mt-2">
                      <div className="text-xs text-gray-500">Curtailment</div>
                      <div className={`text-lg font-bold ${year.curtailmentPct > 30 ? 'text-red-600' : year.curtailmentPct > 15 ? 'text-orange-600' : 'text-green-600'}`}>
                        {year.curtailmentPct}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  <span className="inline-block w-4 h-4 bg-green-400 rounded mr-2"></span>
                  Energy Sold
                  <span className="inline-block w-4 h-4 bg-red-400 rounded ml-6 mr-2"></span>
                  Curtailed Energy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Production Data */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8">Detailed Historical Performance Data</h2>
            
            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Year</th>
                        <th className="text-right py-3 px-4 font-semibold">Production (kWh)</th>
                        <th className="text-right py-3 px-4 font-semibold">Curtailed (kWh)</th>
                        <th className="text-right py-3 px-4 font-semibold">Curtailment %</th>
                        <th className="text-right py-3 px-4 font-semibold">kWh/kWp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PARK_DATA.productionHistory.map((year) => (
                        <tr key={year.year} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{year.year}</td>
                          <td className="py-3 px-4 text-right">{year.production.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">{year.curtailment.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">
                            <Badge variant={year.curtailmentPct > 20 ? 'destructive' : year.curtailmentPct > 10 ? 'secondary' : 'default'}>
                              {year.curtailmentPct}%
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right">
                            {((year.production + year.curtailment) / PARK_DATA.sizeDC / 1000).toFixed(0)}
                          </td>
                        </tr>
                      ))}
                      <tr className="font-semibold bg-gray-100">
                        <td className="py-3 px-4">Average 2022-2025</td>
                        <td className="py-3 px-4 text-right">7,948,229</td>
                        <td className="py-3 px-4 text-right">2,256,890</td>
                        <td className="py-3 px-4 text-right">
                          <Badge variant="destructive">25.8%</Badge>
                        </td>
                        <td className="py-3 px-4 text-right">2,033</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Express Interest Form */}
      <section className="section-padding bg-gradient-to-r from-cyprus-500 to-solar-600 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Express Interest in {PARK_DATA.referenceNumber}
              </h2>
              <p className="text-xl opacity-90">
                Contact us for detailed financial models, site visits, and acquisition terms
              </p>
            </div>

            {!showContactForm ? (
              <div className="text-center space-y-4">
                <Button 
                  variant="secondary" 
                  size="xl"
                  className="bg-white text-cyprus-600 hover:bg-gray-100 px-12"
                  onClick={() => setShowContactForm(true)}
                >
                  Request Project Information
                </Button>
                <div className="flex items-center justify-center space-x-6 text-sm opacity-90">
                  <span>Or contact directly:</span>
                  <Button variant="outline-on-dark" size="sm" asChild>
                    <a href="https://wa.me/35799164158?text=I'm interested in PARK-REF-5001" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button variant="outline-on-dark" size="sm" asChild>
                    <a href="https://calendly.com/lighthiefcyprus" target="_blank" rel="noopener noreferrer">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Call
                    </a>
                  </Button>
                </div>
              </div>
            ) : (
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-gray-900">Project Interest Form</CardTitle>
                  <CardDescription>
                    Ref: {PARK_DATA.referenceNumber} - 5MW Solar Park
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form 
                    className="space-y-4"
                    onSubmit={async (e) => {
                      e.preventDefault()
                      try {
                        const response = await fetch('/api/project-interest', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            ...formData,
                            projectRef: PARK_DATA.referenceNumber
                          })
                        })
                        
                        const result = await response.json()
                        
                        if (result.success) {
                          alert('Thank you! We will contact you within 24 hours.')
                          setShowContactForm(false)
                          setFormData({ name: '', email: '', phone: '', message: '' })
                        } else {
                          alert(result.message || 'Submission failed. Please try again.')
                        }
                      } catch (error) {
                        alert('An error occurred. Please contact us directly on WhatsApp.')
                      }
                    }}
                  >
                    <Input
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                    <Textarea
                      placeholder="Message or questions about this project..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={4}
                    />
                    <div className="flex space-x-4">
                      <Button 
                        type="submit"
                        variant="gradient"
                        className="flex-1"
                      >
                        Submit Interest
                      </Button>
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => setShowContactForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Why BESS Makes Sense */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-8">
              Why Battery Storage Enhances This Investment
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Zap className="w-8 h-8 text-solar-500 mb-2" />
                  <CardTitle>Curtailment Mitigation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    With curtailment reaching 45.8% in 2025, BESS allows you to store and shift energy to non-curtailed periods, recovering significant lost revenue.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
                  <CardTitle>Premium Night Tariff</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Shift stored energy to nighttime periods when tariffs are typically 20-30% higher, maximizing revenue per kWh produced.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Battery className="w-8 h-8 text-blue-500 mb-2" />
                  <CardTitle>Future-Proof Asset</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    As curtailment increases with more solar penetration, BESS becomes increasingly valuable, protecting and enhancing your investment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-cyprus-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to Acquire This Solar Asset?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contact Alexander Papacosta for detailed due diligence materials and site visit
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary"
              size="lg"
              className="bg-white text-cyprus-600 hover:bg-gray-100"
              onClick={() => setShowContactForm(true)}
            >
              Request Information Package
            </Button>
            <Button 
              variant="outline-on-dark"
              size="lg"
              asChild
            >
              <a href="https://wa.me/35799164158?text=I'm interested in PARK-REF-5001 - 5MW Solar Park" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp: +357 99 164 158
              </a>
            </Button>
            <Button 
              variant="outline-on-dark"
              size="lg"
              asChild
            >
              <a href="https://calendly.com/lighthiefcyprus" target="_blank" rel="noopener noreferrer">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Video Call
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

