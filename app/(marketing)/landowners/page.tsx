'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FeasibilityPackages } from '@/components/sections/landowners/FeasibilityPackages'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  Building,
  AlertTriangle,
  XCircle,
  Sun,
  ArrowLeftRight,
  Loader2,
  Info
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

const zoneInfo = [
  { code: 'Γ3/G3', status: 'go', description: 'Agricultural - Solar Permitted' },
  { code: 'Γ4/G4', status: 'go', description: 'Agricultural - Solar Permitted' },
  { code: 'Α2/A2', status: 'go', description: 'Agricultural - Solar Permitted' },
  { code: 'ΒΕ/BE', status: 'go', description: 'Industrial - Solar Permitted' },
  { code: 'Η2/H2', status: 'no_go', description: 'Protected - NO Solar' },
  { code: 'Ζ/Z', status: 'no_go', description: 'Strict Protection - NO Solar' },
  { code: 'Natura 2000', status: 'restricted', description: 'Environmental - Restricted' },
]

export default function LandownersPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    plotSize: '',
    location: '',
    currentUse: '',
    ownerName: '',
    email: '',
    phone: '',
    zoneCode: '' // Optional zone code input
  })
  const [showAssessment, setShowAssessment] = useState(false)
  const [assessmentResults, setAssessmentResults] = useState<any>(null)
  const [dlsAssessment, setDlsAssessment] = useState<any>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleAssessmentSubmit = async () => {
    if (!formData.ownerName || !formData.email || !formData.location || !formData.plotSize) {
      alert('Please fill in all required fields: Name, Email, Location, and Plot Size')
      return
    }

    setIsSubmitting(true)

    try {
      const submitData = new FormData()
      
      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value)
      })
      
      // Add title deed file if uploaded
      if (uploadedFile) {
        submitData.append('titleDeed', uploadedFile)
      }
      
      const response = await fetch('/api/land-assessment', {
        method: 'POST',
        body: submitData,
      })
      
      const result = await response.json()
      
      if (result.success) {
        setAssessmentResults(result.assessment)
        setDlsAssessment(result.dlsAssessment)
        setShowAssessment(true)
      } else {
        alert(result.message || 'Assessment failed. Please try again.')
      }
    } catch (error) {
      alert('Assessment failed. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getZoneStatusIcon = (status: string) => {
    switch (status) {
      case 'GO':
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case 'NO_GO':
        return <XCircle className="w-6 h-6 text-red-500" />
      case 'RESTRICTED':
        return <AlertTriangle className="w-6 h-6 text-amber-500" />
      default:
        return <Info className="w-6 h-6 text-blue-500" />
    }
  }

  const getZoneStatusColor = (status: string) => {
    switch (status) {
      case 'GO':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'NO_GO':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'RESTRICTED':
        return 'bg-amber-50 border-amber-200 text-amber-800'
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800'
    }
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
                of your plot&apos;s solar potential with real zone data and capacity calculations.
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
      <section id="assessment-form" className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-green-100 text-green-800">Powered by Cyprus Land Registry Data</Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Instant Land Solar Assessment
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get immediate feedback on your land&apos;s solar potential including zone verification,
                capacity estimates, and revenue projections.
              </p>
            </div>

            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-heading gradient-text">
                  <Calculator className="w-8 h-8 mx-auto mb-3" />
                  Solar Potential Calculator
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Zone checking • Capacity estimation • Revenue projection • Instant results
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8">
                {!showAssessment ? (
                  <>
                    {/* File Upload */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <span className="w-8 h-8 bg-solar-500 text-white rounded-full flex items-center justify-center text-sm">1</span>
                        Upload Title Deed or Plot Map (Optional)
                      </h3>
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
                            Drop your title deed or plot map here
                          </p>
                          <p className="text-sm text-gray-500">
                            PDF, JPG, PNG files • Helps our team verify zone data
                          </p>
                        </label>
                      </div>
                      {uploadedFile && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-green-800 font-medium">
                            ✓ {uploadedFile.name} uploaded successfully
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Plot Information */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <span className="w-8 h-8 bg-cyprus-500 text-white rounded-full flex items-center justify-center text-sm">2</span>
                        Plot Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Plot Size *
                          </label>
                          <Input
                            placeholder="e.g., 5 hectares, 12 acres, 50000 m²"
                            value={formData.plotSize}
                            onChange={(e) => setFormData({...formData, plotSize: e.target.value})}
                          />
                          <p className="text-xs text-gray-500 mt-1">Supports: hectares, acres, m², donum</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Location/Area *
                          </label>
                          <Input
                            placeholder="e.g., Nicosia, Paphos, Limassol"
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Zone Code (if known)
                          </label>
                          <Input
                            placeholder="e.g., Γ3, G3, A2, H2"
                            value={formData.zoneCode}
                            onChange={(e) => setFormData({...formData, zoneCode: e.target.value})}
                          />
                          <p className="text-xs text-gray-500 mt-1">From your title deed or planning department</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Current Land Use
                          </label>
                          <Input
                            placeholder="e.g., Agricultural, Unused, Grazing"
                            value={formData.currentUse}
                            onChange={(e) => setFormData({...formData, currentUse: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Zone Reference */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Map className="w-5 h-5" />
                        Cyprus Zoning Quick Reference
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        {zoneInfo.map((zone) => (
                          <div 
                            key={zone.code}
                            className={`p-2 rounded border ${
                              zone.status === 'go' ? 'bg-green-50 border-green-200' :
                              zone.status === 'no_go' ? 'bg-red-50 border-red-200' :
                              'bg-amber-50 border-amber-200'
                            }`}
                          >
                            <div className="font-semibold">{zone.code}</div>
                            <div className={`text-xs ${
                              zone.status === 'go' ? 'text-green-700' :
                              zone.status === 'no_go' ? 'text-red-700' :
                              'text-amber-700'
                            }`}>{zone.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">3</span>
                        Your Contact Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          placeholder="Your Name *"
                          value={formData.ownerName}
                          onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                        />
                        <Input
                          type="email"
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                        <Input
                          type="tel"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="md:col-span-2"
                        />
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <div className="text-center pt-6">
                      <Button 
                        variant="gradient" 
                        size="xl" 
                        onClick={handleAssessmentSubmit}
                        disabled={isSubmitting || !formData.ownerName || !formData.email || !formData.location || !formData.plotSize}
                        className="px-12"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Zap className="w-5 h-5 mr-2" />
                            Get Instant Assessment
                          </>
                        )}
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">
                        Free instant analysis powered by Cyprus Land Registry data
                      </p>
                    </div>
                  </>
                ) : (
                  /* Assessment Results */
                  <div className="space-y-8">
                    {/* Zone Status Header */}
                    <div className={`rounded-xl p-6 border-2 ${getZoneStatusColor(dlsAssessment?.zoning?.status || 'REVIEW_NEEDED')}`}>
                      <div className="flex items-start gap-4">
                        {getZoneStatusIcon(dlsAssessment?.zoning?.status || 'REVIEW_NEEDED')}
                        <div>
                          <h3 className="text-xl font-bold mb-2">
                            {dlsAssessment?.zoning?.status === 'GO' && '✅ Land is Suitable for Solar Development'}
                            {dlsAssessment?.zoning?.status === 'NO_GO' && '❌ Land is NOT Suitable for Solar'}
                            {dlsAssessment?.zoning?.status === 'RESTRICTED' && '⚠️ Land Has Environmental Restrictions'}
                            {dlsAssessment?.zoning?.status === 'REVIEW_NEEDED' && '❓ Manual Review Required'}
                          </h3>
                          <p className="mb-2">{dlsAssessment?.zoning?.reason}</p>
                          {dlsAssessment?.zoning?.restrictions?.length > 0 && (
                            <ul className="text-sm space-y-1 mt-2">
                              {dlsAssessment.zoning.restrictions.map((r: string, i: number) => (
                                <li key={i}>• {r}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Capacity Comparison */}
                    {dlsAssessment?.recommendation?.viable && (
                      <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                          <Calculator className="w-6 h-6 text-solar-500" />
                          Capacity Comparison: South vs East-West
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* South Facing */}
                          <Card className={`border-2 ${dlsAssessment?.recommendation?.bestOption === 'SOUTH' ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'}`}>
                            <CardHeader className="pb-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Sun className="w-6 h-6 text-amber-500" />
                                  <CardTitle className="text-lg">South-Facing</CardTitle>
                                </div>
                                {dlsAssessment?.recommendation?.bestOption === 'SOUTH' && (
                                  <Badge className="bg-green-500">Recommended</Badge>
                                )}
                              </div>
                              <CardDescription>4 meter row pitch</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-600">Capacity:</span>
                                  <div className="font-bold text-lg">{assessmentResults?.capacityComparison?.southFacing?.capacityMW} MW</div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Panels:</span>
                                  <div className="font-bold">{assessmentResults?.capacityComparison?.southFacing?.panelCount?.toLocaleString()}</div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Annual Production:</span>
                                  <div className="font-bold">{assessmentResults?.capacityComparison?.southFacing?.annualProductionMWh?.toLocaleString()} MWh</div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Annual Revenue:</span>
                                  <div className="font-bold text-green-600">€{assessmentResults?.capacityComparison?.southFacing?.annualRevenueEUR?.toLocaleString()}</div>
                                </div>
                              </div>
                              <div className="text-xs text-gray-500 pt-2 border-t">
                                Yield: {assessmentResults?.capacityComparison?.southFacing?.specificYield} kWh/kWp @ €0.16/kWh
                              </div>
                            </CardContent>
                          </Card>

                          {/* East-West */}
                          <Card className={`border-2 ${dlsAssessment?.recommendation?.bestOption === 'EAST_WEST' ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'}`}>
                            <CardHeader className="pb-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <ArrowLeftRight className="w-6 h-6 text-blue-500" />
                                  <CardTitle className="text-lg">East-West</CardTitle>
                                </div>
                                {dlsAssessment?.recommendation?.bestOption === 'EAST_WEST' && (
                                  <Badge className="bg-green-500">Recommended</Badge>
                                )}
                              </div>
                              <CardDescription>1 meter row pitch (higher density)</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-600">Capacity:</span>
                                  <div className="font-bold text-lg">{assessmentResults?.capacityComparison?.eastWest?.capacityMW} MW</div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Panels:</span>
                                  <div className="font-bold">{assessmentResults?.capacityComparison?.eastWest?.panelCount?.toLocaleString()}</div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Annual Production:</span>
                                  <div className="font-bold">{assessmentResults?.capacityComparison?.eastWest?.annualProductionMWh?.toLocaleString()} MWh</div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Annual Revenue:</span>
                                  <div className="font-bold text-green-600">€{assessmentResults?.capacityComparison?.eastWest?.annualRevenueEUR?.toLocaleString()}</div>
                                </div>
                              </div>
                              <div className="text-xs text-gray-500 pt-2 border-t">
                                Yield: {assessmentResults?.capacityComparison?.eastWest?.specificYield} kWh/kWp @ €0.16/kWh
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    )}

                    {/* Key Metrics */}
                    <div className="grid md:grid-cols-3 gap-6">
                      <Card className="text-center border-solar-200">
                        <CardContent className="pt-6">
                          <Zap className="w-8 h-8 text-solar-500 mx-auto mb-3" />
                          <div className="text-xl font-bold gradient-text mb-2">{assessmentResults?.plotAnalysis?.capacity}</div>
                          <div className="text-sm text-gray-600">Recommended Capacity</div>
                          <div className="text-xs text-gray-500 mt-1">{assessmentResults?.plotAnalysis?.panelCount} panels</div>
                        </CardContent>
                      </Card>

                      <Card className="text-center border-green-200">
                        <CardContent className="pt-6">
                          <Euro className="w-8 h-8 text-green-500 mx-auto mb-3" />
                          <div className="text-xl font-bold gradient-text mb-2">{assessmentResults?.annualProduction?.revenue}</div>
                          <div className="text-sm text-gray-600">Annual Revenue</div>
                          <div className="text-xs text-gray-500 mt-1">{assessmentResults?.annualProduction?.MWh} MWh/year</div>
                        </CardContent>
                      </Card>

                      <Card className="text-center border-cyprus-200">
                        <CardContent className="pt-6">
                          <Clock className="w-8 h-8 text-cyprus-500 mx-auto mb-3" />
                          <div className="text-xl font-bold gradient-text mb-2">{assessmentResults?.financialProjections?.rtbValue}</div>
                          <div className="text-sm text-gray-600">RTB Project Value</div>
                          <div className="text-xs text-gray-500 mt-1">{assessmentResults?.financialProjections?.developmentTimeline}</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Environmental Status */}
                    <Card className="bg-gray-50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Map className="w-5 h-5" />
                          Environmental & Zone Status
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <span>{assessmentResults?.environmental?.natura2000}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>{assessmentResults?.environmental?.birdPath}</span>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-sm text-gray-600">{assessmentResults?.plotAnalysis?.zoning}</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Landowner Options */}
                    {dlsAssessment?.recommendation?.viable && (
                      <Card className="bg-green-50 border-green-200">
                        <CardHeader>
                          <CardTitle className="text-xl text-green-900">Your Revenue Options</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-green-800 mb-2">Option 1: Land Lease</h4>
                              <p className="text-green-700 text-lg font-bold mb-2">{assessmentResults?.landOwnerOptions?.annualLease}</p>
                              <ul className="text-green-600 text-sm space-y-1">
                                <li>• Keep land ownership</li>
                                <li>• Guaranteed income for 25+ years</li>
                                <li>• Total: {assessmentResults?.landOwnerOptions?.leaseTotal25Years}</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-green-800 mb-2">Option 2: Land Sale</h4>
                              <p className="text-green-700 text-lg font-bold mb-2">{assessmentResults?.landOwnerOptions?.landSale}</p>
                              <ul className="text-green-600 text-sm space-y-1">
                                <li>• Immediate lump sum payment</li>
                                <li>• Premium price for solar-ready land</li>
                                <li>• No ongoing responsibilities</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Next Steps */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Next Steps</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {assessmentResults?.nextSteps?.map((step: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Data Source */}
                    <div className="text-center text-sm text-gray-500">
                      <p>Data source: {assessmentResults?.dataSource}</p>
                      <p>Assessment generated: {new Date(assessmentResults?.timestamp).toLocaleString()}</p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                      <Button 
                        variant="gradient" 
                        size="lg"
                        asChild
                      >
                        <Link href="#feasibility-packages">
                          View Feasibility Packages
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg"
                        asChild
                      >
                        <Link href="/contact?subject=Free%20Landowner%20Consultation">
                          Schedule Consultation
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg"
                        onClick={() => {
                          setShowAssessment(false)
                          setAssessmentResults(null)
                          setDlsAssessment(null)
                        }}
                      >
                        Assess Another Plot
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <FeasibilityPackages />

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
                They&apos;re ready for immediate construction and investment.
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
                        <Button variant="outline" className="w-full" size="sm" asChild>
                          <Link href="#assessment-form">
                            Get Detailed Analysis for This Size
                          </Link>
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

      {/* Why Choose Lighthief */}
      <section className="section-padding bg-gray-50">
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
            Ready to Unlock Your Land&apos;s Solar Potential?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Free instant assessment · Feasibility packages from €2,500 · Fees credited toward EPC
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white text-solar-600 hover:bg-gray-100"
              asChild
            >
              <Link href="#assessment-form">
                Get Instant Assessment
              </Link>
            </Button>
            <Button variant="cyprus" size="lg" asChild>
              <Link href="#feasibility-packages">
                View Feasibility Packages
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
