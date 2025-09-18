'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  MapPin, 
  Upload, 
  Calculator, 
  TrendingUp, 
  Euro, 
  Clock, 
  CheckCircle,
  Zap,
  FileText,
  Award,
  Target,
  Compass,
  Map,
  Building
} from 'lucide-react'

const plotValueExamples = [
  {
    size: "5 Acres (2 Hectares)",
    capacity: "1-1.5 MW",
    investment: "€800K - €1.2M",
    annualRevenue: "€180K - €240K",
    landValue: "€200K - €400K",
    rtbValue: "€400K - €600K",
    timeline: "12-18 months to RTB",
    roiForLandowner: "Land lease: €8K-15K/year OR Land sale: €200K-400K premium"
  },
  {
    size: "12 Acres (5 Hectares)", 
    capacity: "2.5-3.5 MW",
    investment: "€2M - €4.2M",
    annualRevenue: "€450K - €840K",
    landValue: "€500K - €1M",
    rtbValue: "€1M - €2M",
    timeline: "12-18 months to RTB",
    roiForLandowner: "Land lease: €20K-40K/year OR Land sale: €500K-1M premium"
  },
  {
    size: "25 Acres (10 Hectares)",
    capacity: "5-7 MW", 
    investment: "€4M - €8.4M",
    annualRevenue: "€900K - €1.68M",
    landValue: "€1M - €2M",
    rtbValue: "€2M - €4M",
    timeline: "15-24 months to RTB",
    roiForLandowner: "Land lease: €40K-80K/year OR Land sale: €1M-2M premium"
  }
]

const assessmentFactors = [
  {
    factor: "Solar Irradiation",
    description: "Annual sunshine hours and solar potential",
    cyprusAverage: "1,800 kWh/m²/year",
    importance: "Primary factor for energy yield"
  },
  {
    factor: "Grid Proximity",
    description: "Distance to electrical grid connection",
    cyprusAverage: "Within 5km preferred",
    importance: "Affects connection costs and feasibility"
  },
  {
    factor: "Zoning Compliance",
    description: "Land use regulations and permits",
    cyprusAverage: "Agricultural/Industrial zones",
    importance: "Determines development permissions"
  },
  {
    factor: "Topography",
    description: "Land slope and orientation",
    cyprusAverage: "0-15% slope optimal",
    importance: "Affects installation costs and efficiency"
  },
  {
    factor: "Access & Infrastructure",
    description: "Road access and site accessibility",
    cyprusAverage: "Public road access required",
    importance: "Construction and maintenance access"
  }
]

export default function LandownersPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [assessmentData, setAssessmentData] = useState({
    plotSize: '',
    location: '',
    currentUse: '',
    ownerName: '',
    email: '',
    phone: ''
  })
  const [showAssessment, setShowAssessment] = useState(false)
  const [assessmentResults, setAssessmentResults] = useState<any>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      // In production, this would connect to Cyprus Land Registry API
      simulateAssessment()
    }
  }

  const simulateAssessment = () => {
    // Simulate automatic assessment
    setTimeout(() => {
      setAssessmentResults({
        plotSize: "8.5 acres (3.4 hectares)",
        solarPotential: "2.1 MW capacity",
        zoningStatus: "Agricultural - Solar Compatible",
        gridDistance: "2.3 km to nearest substation",
        solarIrradiation: "1,850 kWh/m²/year",
        estimatedValue: "€1.2M - €2.5M RTB value",
        developmentTimeline: "14-20 months",
        landOwnerOptions: {
          lease: "€15,000 - €25,000 annual lease",
          sale: "€600,000 - €1,200,000 premium"
        }
      })
      setShowAssessment(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-solar-50 via-white to-cyprus-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/1690376781153.jpg"
              alt="Cyprus land for solar development"
              fill
              className="object-cover opacity-15"
            />
          </div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-7xl font-heading font-bold mb-6">
                Leverage Your Land for
                <span className="block gradient-text">
                  Solar Farm Revenue
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 text-balance">
                Transform your Cyprus land into a profitable solar farm. Get instant assessment 
                of your plot's solar potential and discover how much your land could earn.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">€15K-80K</div>
                  <div className="text-sm text-gray-600">Annual Lease Income</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">€200K-2M</div>
                  <div className="text-sm text-gray-600">Land Sale Premium</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">12-24</div>
                  <div className="text-sm text-gray-600">Months to RTB</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">25+</div>
                  <div className="text-sm text-gray-600">Years Income</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Assessment Tool */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Free Instant Land Assessment
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Upload your title deed and get immediate analysis of your land's solar potential, 
                zoning status, and revenue projections.
              </p>
            </div>

            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-heading gradient-text">
                  <Upload className="w-8 h-8 mx-auto mb-3" />
                  Land Assessment Tool
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Connect to Cyprus Land Registry • Automatic Zoning Analysis • Instant Results
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8">
                {!showAssessment ? (
                  <>
                    {/* File Upload */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">1. Upload Title Deed or Plot Map</h3>
                      <div className="border-2 border-dashed border-solar-300 rounded-lg p-8 text-center hover:border-solar-500 transition-colors">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Upload className="w-12 h-12 text-solar-500 mx-auto mb-4" />
                          <p className="text-lg font-semibold text-gray-700 mb-2">
                            Drop your title deed here or click to upload
                          </p>
                          <p className="text-sm text-gray-500">
                            PDF, JPG, PNG files • Automatic data extraction • Instant analysis
                          </p>
                        </label>
                      </div>
                      {uploadedFile && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-green-800 font-medium">
                            ✓ {uploadedFile.name} uploaded successfully
                          </p>
                          <p className="text-green-600 text-sm">Analyzing with Cyprus Land Registry data...</p>
                        </div>
                      )}
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">2. Your Contact Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          placeholder="Your Name"
                          value={assessmentData.ownerName}
                          onChange={(e) => setAssessmentData({...assessmentData, ownerName: e.target.value})}
                        />
                        <Input
                          type="email"
                          placeholder="Email Address"
                          value={assessmentData.email}
                          onChange={(e) => setAssessmentData({...assessmentData, email: e.target.value})}
                        />
                        <Input
                          type="tel"
                          placeholder="Phone Number"
                          value={assessmentData.phone}
                          onChange={(e) => setAssessmentData({...assessmentData, phone: e.target.value})}
                        />
                        <Input
                          placeholder="Plot Location (City/Area)"
                          value={assessmentData.location}
                          onChange={(e) => setAssessmentData({...assessmentData, location: e.target.value})}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  /* Assessment Results */
                  <div className="space-y-8">
                    <div className="text-center">
                      <h3 className="text-2xl font-heading font-bold mb-4 text-green-600">
                        🎉 Assessment Complete!
                      </h3>
                      <p className="text-gray-600">Your land shows excellent solar potential</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <Card className="text-center border-green-200">
                        <CardContent className="pt-6">
                          <Zap className="w-8 h-8 text-solar-500 mx-auto mb-3" />
                          <div className="text-xl font-bold gradient-text mb-2">{assessmentResults?.solarPotential}</div>
                          <div className="text-sm text-gray-600">Solar Farm Capacity</div>
                        </CardContent>
                      </Card>

                      <Card className="text-center border-green-200">
                        <CardContent className="pt-6">
                          <Euro className="w-8 h-8 text-green-500 mx-auto mb-3" />
                          <div className="text-xl font-bold gradient-text mb-2">{assessmentResults?.estimatedValue}</div>
                          <div className="text-sm text-gray-600">RTB Project Value</div>
                        </CardContent>
                      </Card>

                      <Card className="text-center border-green-200">
                        <CardContent className="pt-6">
                          <Clock className="w-8 h-8 text-cyprus-500 mx-auto mb-3" />
                          <div className="text-xl font-bold gradient-text mb-2">{assessmentResults?.developmentTimeline}</div>
                          <div className="text-sm text-gray-600">To Ready-to-Build</div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="bg-green-50 border-green-200">
                      <CardHeader>
                        <CardTitle className="text-xl text-green-900">Your Land Revenue Options</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-green-800 mb-2">Option 1: Land Lease</h4>
                            <p className="text-green-700 text-sm mb-2">{assessmentResults?.landOwnerOptions.lease}</p>
                            <ul className="text-green-600 text-xs space-y-1">
                              <li>• Keep land ownership</li>
                              <li>• Guaranteed annual income for 25+ years</li>
                              <li>• No development risk</li>
                              <li>• Land returned after project life</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-green-800 mb-2">Option 2: Land Sale</h4>
                            <p className="text-green-700 text-sm mb-2">{assessmentResults?.landOwnerOptions.sale}</p>
                            <ul className="text-green-600 text-xs space-y-1">
                              <li>• Immediate lump sum payment</li>
                              <li>• Premium price for solar-ready land</li>
                              <li>• No ongoing responsibilities</li>
                              <li>• Capital available for other investments</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="text-center">
                      <Button variant="gradient" size="xl" className="px-12">
                        Order Professional Feasibility Study
                      </Button>
                      <p className="text-sm text-gray-500 mt-3">
                        Detailed study includes: Site survey, grid analysis, permit roadmap, financial projections
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What is RTB */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                What is Ready-to-Build (RTB)?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                RTB projects have all permits, grid connections, and approvals secured. 
                They're ready for immediate construction and investment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">RTB Development Process</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-solar-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Site Assessment & Design</h4>
                      <p className="text-gray-600 text-sm">Comprehensive analysis and optimal system design</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-cyprus-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Permits & Approvals</h4>
                      <p className="text-gray-600 text-sm">All regulatory approvals and environmental clearances</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Grid Connection Secured</h4>
                      <p className="text-gray-600 text-sm">Utility agreements and electrical infrastructure planned</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">4</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Investment Ready</h4>
                      <p className="text-gray-600 text-sm">Ready for investor financing and immediate construction</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-r from-solar-100 to-cyprus-100 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">RTB Value Creation</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Raw Land Value</span>
                      <span className="font-semibold">€100K - €200K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">+ Development Costs</span>
                      <span className="font-semibold">€150K - €300K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">+ Permit & Grid Value</span>
                      <span className="font-semibold">€100K - €200K</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-bold text-gray-900">RTB Project Value</span>
                      <span className="font-bold gradient-text">€350K - €700K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plot Value Examples */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Solar Farm Revenue by Plot Size
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real examples of Cyprus solar farm revenues based on different land sizes
            </p>
          </div>

          <div className="space-y-8">
            {plotValueExamples.map((example, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="grid lg:grid-cols-3 gap-0">
                  <div className="bg-gradient-to-r from-solar-500 to-cyprus-600 text-white p-8 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">{example.size}</div>
                      <div className="text-sm opacity-90">{example.capacity}</div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2 p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Project Economics</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Investment</span>
                            <span className="font-semibold">{example.investment}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Annual Revenue</span>
                            <span className="font-semibold text-green-600">{example.annualRevenue}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">RTB Value</span>
                            <span className="font-semibold text-blue-600">{example.rtbValue}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Timeline to RTB</span>
                            <span className="font-semibold">{example.timeline}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Your Revenue Options</h3>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-green-800 font-medium text-sm">{example.roiForLandowner}</p>
                        </div>
                        <Button variant="outline" className="w-full" size="sm">
                          Get Detailed Analysis for This Size
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Factors */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              What We Analyze in Your Assessment
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our automated tool analyzes multiple factors using Cyprus government databases
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {assessmentFactors.map((factor, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Map className="w-5 h-5 text-cyprus-500 mr-2" />
                    {factor.factor}
                  </CardTitle>
                  <CardDescription>{factor.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <span className="text-gray-600">Cyprus Average: </span>
                    <span className="font-semibold">{factor.cyprusAverage}</span>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-blue-800 text-xs font-medium">{factor.importance}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Lighthief */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Why Partner with Lighthief Cyprus?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From recycling pioneers to full EPC contractors - we understand the complete solar lifecycle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Award className="w-12 h-12 text-solar-500 mx-auto mb-4" />
                <div className="text-lg font-bold mb-2">Since 2017</div>
                <div className="text-sm text-gray-600">Founded by Darius & Arkadius with recycling expertise</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Building className="w-12 h-12 text-cyprus-500 mx-auto mb-4" />
                <div className="text-lg font-bold mb-2">Cyprus HQ</div>
                <div className="text-sm text-gray-600">Limassol headquarters with local market expertise</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <div className="text-lg font-bold mb-2">Full Lifecycle</div>
                <div className="text-sm text-gray-600">From development to recycling - complete solutions</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Target className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <div className="text-lg font-bold mb-2">Proven Results</div>
                <div className="text-sm text-gray-600">Realistic 8-12% IRR projections with track record</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-solar-500 to-cyprus-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to Unlock Your Land's Solar Potential?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get professional feasibility study and discover how much your land could earn from solar development
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-solar-600 hover:bg-gray-100">
              Order Professional Study
            </Button>
            <Button size="lg" className="btn-outline-on-dark" asChild>
              <Link href="/services/epc-services">
                Learn About Our EPC Services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
