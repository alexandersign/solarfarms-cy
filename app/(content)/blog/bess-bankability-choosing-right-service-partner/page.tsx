import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  CheckCircle, 
  Award, 
  Globe, 
  Battery, 
  Lock, 
  FileCheck, 
  Building2, 
  Handshake, 
  ArrowRight,
  AlertTriangle,
  TrendingUp,
  Wrench
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'BESS Bankability: Why Choosing the Right Service Partner Makes or Breaks Your Investment',
  description: 'Discover why BESS bankability depends on choosing the right EPC and O&M partner. Learn how Linyang backs Lighthief with Tier-1 technology, and how multi-layered insurance makes BESS assets bankable and reliable investments.',
  keywords: [
    'BESS bankability',
    'battery energy storage bankability',
    'BESS service partner',
    'BESS EPC partner',
    'Linyang BESS',
    'Lighthief Cyprus',
    'BESS insurance',
    'BESS warranty',
    'bankable BESS investment',
    'BESS O&M partner',
    'battery storage investment',
    'BESS project finance',
    'Tier 1 BESS manufacturer',
    'BESS risk mitigation',
    'Cyprus BESS investment'
  ],
}

export default function BESSBankabilityArticle() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-emerald-600 text-white">
              Investment Guide - BESS Bankability
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              BESS Bankability:
              <span className="block gradient-text mt-2">
                Why Choosing the Right Service Partner Makes or Breaks Your Investment
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              In BESS project finance, bankability is everything. Lenders don't just evaluate the technology — they
              scrutinise the entire value chain behind it. From OEM pedigree to insurance coverage, the service partner
              you choose determines whether your project gets financed, stays operational, and delivers returns for decades.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>•</span>
              <span>February 10, 2026</span>
              <span>•</span>
              <span>12 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Section 1: What is BESS Bankability */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">What Does "Bankable" Actually Mean for BESS?</h2>
              <p className="text-lg text-gray-700 mb-4">
                In the world of project finance, "bankable" is a term of art. It means a project meets the rigorous
                credit committee requirements of lenders and institutional investors. For a BESS project, bankability
                goes far beyond having a good battery — it requires demonstrable proof that revenue forecasts are
                achievable, technology risks are mitigated, and long-term performance is guaranteed.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Debt typically funds 50-75% of BESS project costs, making lender confidence the single most important
                factor in getting a project off the ground. Lenders evaluate three critical pillars before approving
                BESS financing:
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Revenue Certainty</h3>
                    <p className="text-gray-700 text-sm">
                      Independent yield and price forecasts from trusted consultants, modelling energy arbitrage,
                      ancillary services, and capacity payments over the project lifetime.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-4">
                      <Battery className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Technology Risk Mitigation</h3>
                    <p className="text-gray-700 text-sm">
                      Proven equipment with international certifications, documented degradation curves, safety testing
                      (UL 9540A), and traceable cell-to-system supply chain provenance.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Contractual Protection</h3>
                    <p className="text-gray-700 text-sm">
                      Multi-layered warranties, comprehensive insurance policies, performance guarantees, and
                      long-term O&M agreements that transfer risk from the project company to creditworthy counterparties.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-amber-900 mb-2">
                  <AlertTriangle className="inline w-5 h-5 mr-2" />
                  The Hidden Truth About BESS Bankability
                </p>
                <p className="text-gray-700">
                  Many developers focus solely on equipment cost per kWh when selecting a BESS supplier. But lenders
                  look deeper — they want to know who stands behind the equipment, what happens when something fails,
                  and whether the service infrastructure exists to maintain 97%+ availability for 15-20 years. The
                  cheapest system is rarely the most bankable.
                </p>
              </div>
            </div>

            {/* Section 2: Why the Right Service Partner Matters */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">Why the Right Service Partner Is the Keystone of Bankability</h2>
              <p className="text-lg text-gray-700 mb-6">
                A BESS system is not a "set and forget" asset. Unlike solar panels, which have no moving parts and
                degrade predictably, battery systems are complex electrochemical systems that require active management,
                thermal regulation, firmware updates, and preventive maintenance. The service partner you choose becomes
                the operational backbone of your investment.
              </p>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Wrench className="w-5 h-5 text-blue-600 mr-2" />
                      1. Operational Expertise Determines Uptime
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      BESS availability directly translates to revenue. A system that sits idle during peak arbitrage
                      windows due to a fault that takes weeks to diagnose costs far more than the repair itself. A
                      dedicated BESS service partner with factory-trained technicians, 24/7 remote monitoring, and local
                      spare parts inventory can maintain 97%+ annual availability — the benchmark lenders expect to see
                      in financial models.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <FileCheck className="w-5 h-5 text-emerald-600 mr-2" />
                      2. Warranty Enforcement Requires OEM Alignment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      BESS warranties are only as valuable as your ability to enforce them. A service partner with a
                      direct contractual relationship with the OEM — not a reseller chain or intermediary — can
                      expedite warranty claims, coordinate factory support, and ensure that replacement parts meet
                      original specifications. Without this direct alignment, warranty disputes can leave your asset
                      underperforming for months.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Lock className="w-5 h-5 text-purple-600 mr-2" />
                      3. Lender Due Diligence Scrutinises the Service Chain
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      When lenders conduct technical due diligence, they don't just evaluate the battery cells — they
                      assess the entire service delivery chain. Who performs commissioning? Who handles preventive
                      maintenance? What is the response time for critical faults? Is there a dedicated BESS team (not
                      shared with solar or wind)? Independent engineers hired by lenders will probe every link in this
                      chain, and any weakness becomes a financing risk.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Globe className="w-5 h-5 text-cyan-600 mr-2" />
                      4. Local Presence Is Non-Negotiable
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      For island markets like Cyprus, relying on an overseas OEM for direct support introduces
                      unacceptable response time risk. A local service partner who understands the grid conditions,
                      regulatory environment, and climate factors — and who maintains spare parts on the ground — is
                      what separates a bankable project from a speculative one. Lenders specifically look for local
                      O&M capability as a condition of financing.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 3: How Linyang Backs Lighthief */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <Badge className="mb-3 bg-blue-600 text-white">Strategic OEM Partnership</Badge>
                <h2 className="text-3xl font-heading font-bold mb-4">
                  How Linyang Backs Lighthief: A Tier-1 OEM Partnership Built for Bankability
                </h2>
                <p className="text-lg text-gray-600">
                  The relationship between Lighthief and Linyang Energy isn't a simple buyer-seller arrangement —
                  it's a strategic exclusivity partnership designed to deliver bankable BESS assets.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Building2 className="w-6 h-6 text-blue-600 mr-2" />
                    About Linyang Energy
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Jiangsu Linyang Energy Storage Technology Co., Ltd (Nanjing, China) is a
                    <strong> BloombergNEF Tier-1 global energy storage manufacturer</strong> (Q4 2024) and a
                    Global Top 500 New Energy Enterprise. Linyang is a strategic shareholder in EVE Energy, the
                    cell manufacturer behind their BESS systems, giving full vertical integration from cell
                    chemistry to containerised system.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700"><strong>Product:</strong> Linyang Power Atlantic — 5.015 MWh containerised BESS (20HC)</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700"><strong>Chemistry:</strong> LFP (Lithium Iron Phosphate) — EVE Energy MB31 314Ah cells</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700"><strong>Certifications:</strong> UL 9540A (PASSED), IEC 62619, EN 50549-2, IEC 63056, UN 38.3</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700"><strong>Global Partnerships:</strong> Hoppecke (Germany), Saudi ECC, Thundergrid (Australia), Bison Energy (Japan)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Handshake className="w-6 h-6 text-emerald-600 mr-2" />
                    The Exclusive Distribution Agreement
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Signed on 28 November 2025, the 3-year exclusive distribution agreement makes Lighthief the
                    sole authorised Linyang BESS distributor for the Republic of Cyprus. This isn't just a
                    commercial arrangement — it's a commitment to joint market development with deep technical
                    integration.
                  </p>
                  <div className="bg-white rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold text-blue-800">What Linyang Provides to Lighthief:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Factory-trained commissioning technicians</strong> from Nanjing HQ for every project</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>4-hour critical fault response</strong> via 24/7 remote technical support</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>5-day initial training programme</strong> + quarterly webinars + annual refresher</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>950 m² dedicated spare parts warehouse</strong> in Poland (EU logistics hub)</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Minimum 2 engineering visits per year</strong> (travel covered by Linyang)</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Product liability insurance: €5,000,000</strong> (AXA) maintained by Linyang</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SOH Warranty Table */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-center">OEM Warranty: State of Health (SOH) Performance Guarantee</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center bg-green-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Year 5</div>
                    <div className="text-3xl font-bold text-green-600">≥ 85%</div>
                    <div className="text-xs text-gray-500">SOH Guarantee</div>
                  </div>
                  <div className="text-center bg-blue-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Year 10</div>
                    <div className="text-3xl font-bold text-blue-600">≥ 79.6%</div>
                    <div className="text-xs text-gray-500">SOH Guarantee</div>
                  </div>
                  <div className="text-center bg-purple-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Year 15</div>
                    <div className="text-3xl font-bold text-purple-600">≥ 70%</div>
                    <div className="text-xs text-gray-500">SOH Guarantee</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Base warranty: 5 years from PAC (all components) | Extended warranty available up to 15 years |
                  Warranty reserve: ~1.9% of system value/year maintained on Linyang books
                </p>
              </div>
            </div>

            {/* Section 4: Insurance Makes BESS Bankable */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                How Insurance Backs Lighthief — and Makes Your BESS Asset Bankable
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Bankability isn't just about technology and track record — it's about transferring risk to
                creditworthy insurers. The multi-layered insurance structure behind Lighthief's BESS projects is
                specifically designed to satisfy lender requirements and protect investor capital at every stage,
                from manufacturing to long-term operations.
              </p>

              {/* Insurance Layers */}
              <div className="space-y-6 mb-8">
                {/* Layer 1: OEM Insurance */}
                <Card className="border-2 border-blue-200">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="flex items-center text-blue-900">
                      <Shield className="w-6 h-6 mr-2" />
                      Layer 1: OEM Protection (Linyang)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-700">€5,000,000</div>
                        <div className="text-sm text-gray-600">Product Liability (AXA)</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-700">€2,000,000</div>
                        <div className="text-sm text-gray-600">Professional Indemnity</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-700">Full</div>
                        <div className="text-sm text-gray-600">Manufacturing Defect Indemnification</div>
                      </div>
                    </div>
                    <p className="text-gray-700 mt-4 text-sm">
                      Linyang maintains product liability insurance with AXA — one of the world's most
                      recognised insurers. This covers defects in design, materials, or workmanship across all
                      system components. Additionally, Linyang provides full indemnification to Lighthief for
                      any manufacturing defects, creating a direct OEM accountability chain that lenders value highly.
                    </p>
                  </CardContent>
                </Card>

                {/* Layer 2: EPC/O&M Insurance */}
                <Card className="border-2 border-emerald-200">
                  <CardHeader className="bg-emerald-50">
                    <CardTitle className="flex items-center text-emerald-900">
                      <Shield className="w-6 h-6 mr-2" />
                      Layer 2: EPC & O&M Protection (Lighthief)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-emerald-50 rounded-lg p-4 text-center">
                        <div className="text-xl font-bold text-emerald-700">€1,000,000</div>
                        <div className="text-sm text-gray-600">General Commercial Liability</div>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-4 text-center">
                        <div className="text-xl font-bold text-emerald-700">€1,000,000</div>
                        <div className="text-sm text-gray-600">Professional Indemnity</div>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-4 text-center">
                        <div className="text-xl font-bold text-emerald-700">Full Value</div>
                        <div className="text-sm text-gray-600">CAR/EAR Insurance (Construction)</div>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-4 text-center">
                        <div className="text-xl font-bold text-emerald-700">0.75%</div>
                        <div className="text-sm text-gray-600">Marine Cargo (of CIF value)</div>
                      </div>
                    </div>
                    <p className="text-gray-700 mt-4 text-sm">
                      Lighthief carries comprehensive insurance covering every phase of the project lifecycle.
                      Contractor's All Risks (CAR) insurance covers the full contract value during construction
                      with the LEG3 defects clause recommended for lender protection. Marine cargo insurance at 0.75%
                      of CIF value protects equipment in transit from the factory to site. Professional indemnity
                      covers design and engineering advice provided during EPC delivery.
                    </p>
                  </CardContent>
                </Card>

                {/* Layer 3: Asset Owner Insurance */}
                <Card className="border-2 border-purple-200">
                  <CardHeader className="bg-purple-50">
                    <CardTitle className="flex items-center text-purple-900">
                      <Shield className="w-6 h-6 mr-2" />
                      Layer 3: Asset Owner Protection (Client SPV)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <div className="text-xl font-bold text-purple-700">Full Replacement</div>
                        <div className="text-sm text-gray-600">Property/Asset Insurance</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <div className="text-xl font-bold text-purple-700">From Commissioning</div>
                        <div className="text-sm text-gray-600">Operational Liability</div>
                      </div>
                    </div>
                    <p className="text-gray-700 mt-4 text-sm">
                      The asset owner (typically a Special Purpose Vehicle) maintains property insurance for the
                      full BESS replacement value and operational liability from commissioning. Combined with
                      the OEM and EPC layers, this creates a three-tier insurance structure where no single event
                      can leave the asset unprotected — exactly what lenders need to see in their risk assessments.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Insurance Flow Visual */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-center mb-6">Complete Risk Transfer Chain</h3>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 text-center w-full md:w-1/3">
                    <div className="font-bold text-blue-800 mb-1">Linyang (OEM)</div>
                    <div className="text-xs text-gray-600">€5M Product Liability</div>
                    <div className="text-xs text-gray-600">€2M Professional Indemnity</div>
                    <div className="text-xs text-gray-600">Full Defect Indemnification</div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
                  <div className="bg-emerald-100 border-2 border-emerald-300 rounded-lg p-4 text-center w-full md:w-1/3">
                    <div className="font-bold text-emerald-800 mb-1">Lighthief (EPC/O&M)</div>
                    <div className="text-xs text-gray-600">€1M Commercial Liability</div>
                    <div className="text-xs text-gray-600">€1M Professional Indemnity</div>
                    <div className="text-xs text-gray-600">Full Value CAR Insurance</div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
                  <div className="bg-purple-100 border-2 border-purple-300 rounded-lg p-4 text-center w-full md:w-1/3">
                    <div className="font-bold text-purple-800 mb-1">Client SPV (Owner)</div>
                    <div className="text-xs text-gray-600">Full Replacement Value</div>
                    <div className="text-xs text-gray-600">Operational Liability</div>
                    <div className="text-xs text-gray-600">Protected from Day One</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Lighthief's Unique Position */}
            <div className="bg-gradient-to-br from-cyprus-50 to-solar-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-heading font-bold mb-4">
                  What Makes Lighthief Different as a BESS Service Partner
                </h2>
                <p className="text-xl text-gray-600">
                  Not all EPC contractors are built the same. Here's why Lighthief's structure is designed for bankability.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-5">
                    <h4 className="font-semibold text-lg mb-2 flex items-center">
                      <Award className="w-5 h-5 text-cyan-600 mr-2" />
                      Dedicated BESS Team
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Unlike generalist EPC companies that treat batteries as an add-on to solar, Lighthief operates a
                      dedicated BESS division — not shared with other business lines. This means specialised
                      engineers, dedicated monitoring infrastructure, and BESS-specific maintenance protocols. Lenders
                      specifically look for this separation as a marker of operational maturity.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-5">
                    <h4 className="font-semibold text-lg mb-2 flex items-center">
                      <Globe className="w-5 h-5 text-blue-600 mr-2" />
                      EU Infrastructure Backbone
                    </h4>
                    <p className="text-gray-700 text-sm">
                      With EU headquarters in Częstochowa, Poland — featuring a 23-hectare facility with operational
                      BESS test systems, 3,500 m² warehouse, and a 950 m² dedicated Linyang spare parts depot —
                      Lighthief has the infrastructure to support long-term operations. This isn't a start-up
                      promise; it's operational reality with 150+ engineers across Europe.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-5">
                    <h4 className="font-semibold text-lg mb-2 flex items-center">
                      <Battery className="w-5 h-5 text-emerald-600 mr-2" />
                      863.5 MWh Portfolio in Cyprus
                    </h4>
                    <p className="text-gray-700 text-sm">
                      With 863.5 MWh across 51 parks in Cyprus (249 MW total, ~€92-104M portfolio value),
                      Lighthief has demonstrated market commitment at scale. This portfolio size creates economies
                      of scale in spare parts, monitoring, and service delivery that smaller operators cannot match.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-5">
                    <h4 className="font-semibold text-lg mb-2 flex items-center">
                      <Handshake className="w-5 h-5 text-purple-600 mr-2" />
                      Complete Technology Ecosystem
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Beyond Linyang for battery systems, Lighthief has established partnerships with Kehua for
                      Power Conversion Systems (PCS), Voltus for Energy Management and SCADA systems, and local
                      subcontractors for civil and electrical works. This integrated ecosystem means single-point
                      accountability for the entire BESS installation — a key bankability differentiator.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-5">
                    <h4 className="font-semibold text-lg mb-2 flex items-center">
                      <Shield className="w-5 h-5 text-red-600 mr-2" />
                      97% Availability Guarantee
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Lighthief's O&M contracts include a 97% annual availability guarantee — the industry
                      benchmark that lenders use in their financial models. This isn't a marketing claim; it's
                      backed by contractual penalties and supported by 24/7 remote monitoring, preventive
                      maintenance schedules, and rapid response capabilities with critical fault response in 4 hours.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-5">
                    <h4 className="font-semibold text-lg mb-2 flex items-center">
                      <Lock className="w-5 h-5 text-amber-600 mr-2" />
                      Turnkey EPC with OEM Warranty Pass-Through
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Lighthief provides 2-year EPC works warranty covering civil, cabling, and earthing works,
                      plus a full 5-year OEM warranty pass-through on equipment. This dual warranty structure means
                      the client has a single point of contact (Lighthief) while retaining the full backing of
                      Linyang's OEM guarantee — simplifying both operations and lender reporting.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6: What Lenders Actually Look For */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">What Lenders Actually Look For: A Bankability Checklist</h2>
              <p className="text-lg text-gray-700 mb-6">
                Based on current project finance requirements for BESS systems, here is what banks and institutional
                investors evaluate — and how the Lighthief-Linyang structure addresses each requirement:
              </p>

              <div className="overflow-hidden rounded-xl border">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-4 font-semibold text-gray-900">Lender Requirement</th>
                      <th className="text-left p-4 font-semibold text-gray-900">How It's Addressed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-4 text-gray-700">Tier-1 OEM equipment</td>
                      <td className="p-4 text-gray-700">
                        <span className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          Linyang — BNEF Tier-1 (Q4 2024)
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 text-gray-700">International safety certifications</td>
                      <td className="p-4 text-gray-700">
                        <span className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          UL 9540A, IEC 62619, UN 38.3, IEC 63056
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 text-gray-700">Product liability insurance (OEM)</td>
                      <td className="p-4 text-gray-700">
                        <span className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          €5M AXA policy maintained by Linyang
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 text-gray-700">Long-term SOH warranty</td>
                      <td className="p-4 text-gray-700">
                        <span className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          5-year base, extendable to 15 years (≥70% SOH)
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 text-gray-700">Construction-phase insurance</td>
                      <td className="p-4 text-gray-700">
                        <span className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          CAR/EAR at full contract value with LEG3 clause
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 text-gray-700">Dedicated O&M with SLA</td>
                      <td className="p-4 text-gray-700">
                        <span className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          97% availability guarantee, 4-hour critical response
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 text-gray-700">Local service presence</td>
                      <td className="p-4 text-gray-700">
                        <span className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          Limassol office, dedicated Cyprus BESS team
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 text-gray-700">Spare parts availability</td>
                      <td className="p-4 text-gray-700">
                        <span className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          950 m² EU warehouse (Poland) + local Cyprus inventory
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 text-gray-700">Proven cell supply chain</td>
                      <td className="p-4 text-gray-700">
                        <span className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          EVE Energy (Linyang strategic shareholder) — full traceability
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 text-gray-700">Enhanced bankability for financing</td>
                      <td className="p-4 text-gray-700">
                        <span className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          Solar+BESS projects qualify for up to 70% LTV (vs 30% solar-only)
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 7: The Cost of Choosing Wrong */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">The Cost of Choosing the Wrong Partner</h2>
              <p className="text-lg text-gray-700 mb-6">
                The consequences of partnering with an unqualified or undercapitalised BESS service provider
                ripple through every aspect of your investment:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-red-200 bg-red-50/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-red-900 text-lg mb-3">Financing Risk</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Banks reject projects with unproven OEMs or weak service agreements</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Higher interest rates and lower LTV ratios increase equity burden</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Independent engineer red flags can kill financing at due diligence stage</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-red-900 text-lg mb-3">Operational Risk</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Extended downtime from lack of local spare parts or trained technicians</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Warranty disputes with no OEM relationship to enforce claims</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Accelerated degradation from improper maintenance or monitoring gaps</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-red-900 text-lg mb-3">Insurance Risk</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Gaps in coverage between OEM, EPC, and operational phases</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Inadequate product liability exposes investors to manufacturing defect losses</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Missing CAR insurance during construction leaves the most vulnerable phase unprotected</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50/50">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-red-900 text-lg mb-3">Exit Risk</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Assets with weak service agreements trade at discounts on secondary markets</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Institutional buyers require proven O&M track records before acquiring BESS assets</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Poor documentation and maintenance records reduce asset resale value</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Conclusion */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">Conclusion: Bankability Is Built, Not Bought</h2>
              <p className="text-lg text-gray-700 mb-4">
                BESS bankability is not a feature you can purchase off a spec sheet. It's the result of deliberate
                choices — choosing a Tier-1 OEM with proven global partnerships, selecting a service partner with
                dedicated BESS expertise and local presence, and building a multi-layered insurance and warranty
                structure that satisfies the most rigorous lender requirements.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                The Lighthief-Linyang partnership was designed with this understanding from the ground up. From
                Linyang's BloombergNEF Tier-1 status and €5M AXA product liability coverage, to Lighthief's
                dedicated BESS team with 97% availability guarantees and full EPC/O&M insurance — every element
                of the value chain is structured to make your BESS investment bankable, insurable, and profitable
                for decades.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                In a market where BESS projects with the right structure can access up to 70% loan-to-value
                financing, the choice of service partner isn't just an operational decision — it's a financial one
                that determines whether your project gets built, stays performing, and delivers the returns you
                planned for.
              </p>
            </div>

            {/* References */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">References & Sources</h3>
              <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
                <li>
                  GridCog — <em>"Bankability and the Funding Pathway for BESS and Hybrid Projects"</em>
                  <span className="block ml-5 text-blue-600">gridcog.com/blog/bankability-and-the-funding-pathway-for-bess-and-hybrid-projects</span>
                </li>
                <li>
                  Dentons — <em>"Banking on Batteries: How Finance Is Fuelling Australia's BESS-T Energy Future"</em> (September 2025)
                </li>
                <li>
                  Pacific Green Technologies — <em>"Making Project Finance Work for Battery Energy Storage Projects"</em>
                </li>
                <li>
                  Morgan Lewis — <em>"The Project Financing Outlook for Global Energy Projects in 2025"</em> (March 2025)
                </li>
                <li>
                  Freeths LLP — <em>"Managing Key Risks in BESS Projects"</em> (2025)
                </li>
                <li>
                  BloombergNEF — Tier-1 Energy Storage Manufacturer List, Q4 2024
                </li>
                <li>
                  Linyang-Lighthief Exclusive Distribution Agreement — November 28, 2025
                </li>
                <li>
                  Lighthief Internal — Warranties and Insurance Documentation (February 2026)
                </li>
              </ol>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-cyprus-600 to-solar-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Ready to Build a Bankable BESS Project?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Talk to our team about how the Lighthief-Linyang partnership can make your BESS investment
                bankable, insurable, and future-proof.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-cyprus-600 hover:bg-gray-100" asChild>
                  <Link href="/contact?service=bess">
                    Request a Bankability Assessment
                  </Link>
                </Button>
                <Button variant="outline-on-dark" size="lg" asChild>
                  <Link href="/blog/cyprus-curtailment-crisis-bess-solution">
                    Read: The Curtailment Crisis & BESS Solution
                  </Link>
                </Button>
              </div>
              <p className="mt-6 text-sm opacity-75">
                Contact Alexander Papacosta: +357 99 164 158 | lighthiefcyprus@gmail.com
              </p>
            </div>

          </div>
        </div>
      </article>
    </div>
  )
}
