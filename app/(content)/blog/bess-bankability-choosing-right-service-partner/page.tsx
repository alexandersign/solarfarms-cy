import Link from 'next/link'
import { Metadata } from 'next'
import { StructuredData } from '@/components/seo/StructuredData'
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
  Users, 
  ArrowRight,
  AlertTriangle,
  TrendingUp,
  Wrench,
  Zap,
  Network
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'BESS Bankability: Why the Right Service Partner Matters',
  description: 'BESS bankability depends on the right EPC and O&M partner. Learn how Tier-1 OEM partnerships and multi-layered insurance make BESS assets bankable in Cyprus.',
  keywords: [
    'BESS bankability',
    'battery energy storage bankability',
    'BESS service partner',
    'BESS EPC partner',
    'Lighthief Cyprus',
    'BESS insurance',
    'BESS warranty',
    'bankable BESS investment',
    'BESS O&M partner',
    'battery storage investment',
    'BESS project finance',
    'Tier 1 BESS manufacturer',
    'BESS risk mitigation',
    'Cyprus BESS investment',
    'Cyprus grid stability',
    'island grid BESS',
    'BESS cycle Europe'
  ],
}

export default function BESSBankabilityArticle() {
  return (
    <div className="min-h-screen">
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "BESS Bankability: Why the Right Service Partner Matters",
        "author": { "@type": "Person", "name": "Alexander Papacosta" },
        "publisher": { "@type": "Organization", "name": "Lighthief Cyprus Ltd", "url": "https://solarfarms.cy" },
        "datePublished": "2026-02-10",
        "description": "BESS bankability depends on the right EPC and O&M partner. Learn how Tier-1 OEM partnerships and multi-layered insurance make BESS assets bankable in Cyprus.",
        "mainEntityOfPage": "https://solarfarms.cy/blog/bess-bankability-choosing-right-service-partner"
      }} />
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
            <p className="text-2xl font-semibold text-cyprus-700 italic mb-4">
              "Lighthief — Leading the Way for Lenders in Cyprus"
            </p>
            <p className="text-xl text-gray-600 mb-6">
              Cyprus stands at a critical juncture in its energy transition. With an isolated grid, rising curtailment,
              and ambitious renewable targets, the island is entering a BESS cycle that demands not just technology —
              but bankable technology backed by the right partnerships. Here's why your choice of service partner
              determines whether your BESS project gets financed, stays operational, and delivers returns for decades.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>By Alexander Papacosta, Lighthief Cyprus</span>
              <span>•</span>
              <span>February 10, 2026</span>
              <span>•</span>
              <span>14 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Section 1: The Cyprus Context */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">Why Cyprus — and Why Now</h2>
              <p className="text-lg text-gray-700 mb-4">
                Cyprus faces a unique challenge among European Union member states: an isolated electrical grid
                operating with one of the highest power outage frequencies in the region. Unlike mainland European
                nations benefiting from interconnected transmission networks, Cyprus cannot export excess renewable
                generation to neighbouring grids during peak production periods, nor import power during generation
                deficits.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                This geographical constraint, combined with rapidly increasing renewable generation capacity, has
                created significant grid stability issues. The Cyprus Transmission System Operator (TSO) reports
                frequency fluctuations and curtailment events that reflect the fundamental challenge of balancing
                intermittent solar and wind generation without adequate storage infrastructure.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
                <p className="text-lg text-gray-700 italic border-l-4 border-blue-500 pl-4">
                  "Cyprus, with its very specific transmission networks and one of the highest outage levels due to
                  a closed energy market, provides enormous opportunities for BESS utilisation. The island's electrical
                  isolation makes it an ideal case study for energy storage deployment."
                </p>
                <p className="text-sm text-gray-500 mt-3 pl-4">
                  — Dr. Arkadius Sybaris, Founder of Lighthief International
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                      <Network className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Isolated Grid</h3>
                    <p className="text-gray-700 text-sm">
                      No interconnections to neighbouring countries. Excess power cannot be exported and deficits
                      cannot be imported — creating mandatory curtailment during peak solar hours.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">High Outage Frequency</h3>
                    <p className="text-gray-700 text-sm">
                      One of the highest power outage rates among EU member states. Grid instability affects
                      both consumers and the economic viability of renewable energy assets.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                      <Battery className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">The BESS Opportunity</h3>
                    <p className="text-gray-700 text-sm">
                      These constraints create enormous demand for BESS — providing frequency regulation,
                      peak shaving, and renewable energy time-shifting that the grid urgently needs.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 2: The BESS Cycle */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">Europe Is Entering a BESS Cycle — Cyprus Leads the Way</h2>
              <p className="text-lg text-gray-700 mb-4">
                The first wave of photovoltaic and wind installations across Europe has reached the technical limits
                of what existing transmission infrastructure can accommodate. Without BESS development, there is
                currently no other viable pathway for grid stabilisation — meaning further generation capacity
                cannot be built until storage catches up.
              </p>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
                <p className="text-lg text-gray-700 italic border-l-4 border-indigo-500 pl-4">
                  "Without BESS development in Europe, there is currently no other possibility for grid stabilisation.
                  We can clearly see that we are now entering a BESS cycle, so that in a few years we can once again
                  build significantly more generation sources."
                </p>
                <p className="text-sm text-gray-500 mt-3 pl-4">
                  — Dr. Arkadius Sybaris, Founder of Lighthief International
                </p>
              </div>

              <p className="text-lg text-gray-700 mb-4">
                BESS installations represent the necessary intermediate phase — providing grid services including
                frequency regulation, peak shaving, and renewable energy time-shifting — that enables subsequent
                expansion of generation capacity. For Cyprus, with its isolated grid and ambitious renewable targets,
                this cycle isn't just relevant — it's urgent.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                But entering the BESS cycle is only half the challenge. The other half — the one that determines
                whether projects actually get built — is <strong>bankability</strong>. And bankability starts with
                who you choose as your service partner.
              </p>
            </div>

            {/* Section 3: What is BESS Bankability */}
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

            {/* Section 4: Why the Right Service Partner Matters */}
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
                      direct contractual relationship with the OEM — as an official distributor, not a reseller chain
                      or intermediary — can expedite warranty claims, coordinate factory support, and ensure that
                      replacement parts meet original specifications. Without this direct alignment, warranty disputes
                      can leave your asset underperforming for months.
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
                      <Zap className="w-5 h-5 text-amber-600 mr-2" />
                      4. Technical Sophistication for Island Grids
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      In an isolated grid environment like Cyprus, BESS installations must be capable of operating
                      autonomously during grid disturbances while seamlessly synchronising when normal operations
                      resume. This requires sophisticated inverter technology, grid-forming capabilities during
                      islanding events, and advanced control systems coordinating with the TSO's dispatch algorithms.
                      This level of technical sophistication demands experienced commissioning teams who understand
                      both the equipment and the specific grid characteristics of the market they operate in.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Globe className="w-5 h-5 text-cyan-600 mr-2" />
                      5. Local Presence Is Non-Negotiable
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

            {/* Section 5: Cross-European Expertise */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <Badge className="mb-3 bg-cyan-600 text-white">Multi-Jurisdictional Experience</Badge>
                <h2 className="text-3xl font-heading font-bold mb-4">
                  Why Cross-European Expertise Is a Bankability Multiplier
                </h2>
                <p className="text-lg text-gray-600">
                  BESS technology requires specialised expertise in electrical engineering, thermal management,
                  fire suppression systems, and sophisticated control algorithms. Knowledge gained across diverse
                  European markets becomes preventive intelligence for new deployments.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 mb-6">
                <p className="text-lg text-gray-700 italic border-l-4 border-cyan-500 pl-4">
                  "What we're implementing here is not simply technology transfer — it's the integration of
                  operational knowledge gained from managing hundreds of megawatts across diverse European markets.
                  Our teams in Poland, Italy, and Spain have encountered and solved problems that Cyprus hasn't
                  yet faced, and that preventive knowledge is invaluable."
                </p>
                <p className="text-sm text-gray-500 mt-3 pl-4">
                  — Alexander Papacosta, Managing Director, Lighthief Cyprus & Greece
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-5 text-center">
                  <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Globe className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Multi-Market Operations</h4>
                  <p className="text-sm text-gray-700">
                    Lighthief International operates across eleven European nations. Each market has different
                    regulatory frameworks, grid codes, and technical requirements — creating a depth of operational
                    knowledge that single-market operators cannot replicate.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-5 text-center">
                  <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Cross-Border Team Reinforcement</h4>
                  <p className="text-sm text-gray-700">
                    The local Cyprus team is reinforced by experienced service technicians and installers from
                    Lighthief Poland and Lighthief Italy, as well as directly by factory trainers from the OEM
                    manufacturer — ensuring commissioning excellence from day one.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-5 text-center">
                  <div className="w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Mediterranean Climate Mastery</h4>
                  <p className="text-sm text-gray-700">
                    High ambient temperatures require robust thermal management systems and impact battery
                    degradation rates. Lighthief's teams have already mastered BESS performance in Mediterranean
                    conditions through deployments in southern Italy and Spain.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 6: How the OEM Partnership Works */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <Badge className="mb-3 bg-blue-600 text-white">Strategic OEM Partnership</Badge>
                <h2 className="text-3xl font-heading font-bold mb-4">
                  How Lighthief's Tier-1 OEM Partnership Is Built for Bankability
                </h2>
                <p className="text-lg text-gray-600">
                  Lighthief has signed exclusive distribution agreements with a BloombergNEF Tier-1 BESS
                  manufacturer and cell producer, as well as a leading PCS manufacturer — creating a fully
                  integrated, bankable supply chain for the Cyprus market.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Building2 className="w-6 h-6 text-blue-600 mr-2" />
                    Why OEM Status Matters
                  </h3>
                  <p className="text-gray-700 mb-4">
                    The difference between being an official distributor and simply buying equipment on the open
                    market is the difference between a bankable project and a speculative one. As the exclusive
                    authorised distributor for a BloombergNEF Tier-1 BESS manufacturer in Cyprus, Lighthief has
                    secured the kind of OEM relationship that lenders require:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700"><strong>Tier-1 BESS Manufacturer:</strong> BloombergNEF Tier-1 listed, Global Top 500 New Energy Enterprise with vertically integrated production</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700"><strong>Tier-1 Cell Manufacturer:</strong> Strategic shareholder relationship with the cell producer ensures full traceability from cell chemistry to containerised system</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700"><strong>Leading PCS Manufacturer:</strong> Grid-code compliant Power Conversion Systems (EN 50549-2 certified) ensuring seamless grid integration</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700"><strong>Full Certifications:</strong> UL 9540A (PASSED), IEC 62619, EN 50549-2, IEC 63056, UN 38.3</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Users className="w-6 h-6 text-emerald-600 mr-2" />
                    What the Exclusive Distribution Agreement Delivers
                  </h3>
                  <p className="text-gray-700 mb-4">
                    This isn't just a commercial arrangement — it's a commitment to joint market development
                    with deep technical integration. The exclusive distribution agreement makes Lighthief the
                    sole authorised BESS distributor for Cyprus, with the following OEM commitments:
                  </p>
                  <div className="bg-white rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold text-blue-800">OEM Commitments to Lighthief:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Factory-trained commissioning technicians</strong> deployed directly from OEM headquarters for every project</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>4-hour critical fault response</strong> via 24/7 remote technical support</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Comprehensive training programme</strong> with quarterly webinars and annual refresher courses</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Dedicated spare parts warehouse</strong> in Poland (EU logistics hub) for rapid European supply</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Minimum 2 engineering visits per year</strong> covered by the OEM</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Comprehensive product liability insurance</strong> maintained by the OEM with a global Tier-1 insurer</span>
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
                    <div className="text-3xl font-bold text-blue-600">≥ 79.58%</div>
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
                  Warranty reserve maintained on OEM books — not a paper promise, but a funded commitment.
                </p>
              </div>
            </div>

            {/* Section 7: Insurance & Warranty Flow */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">
                How Insurance and Warranties Flow — and Why OEM-O&M Partnership Is Essential
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Bankability isn't just about technology and track record — it's about transferring risk to
                creditworthy counterparties through a seamless chain of insurance and warranties. When the OEM
                manufacturer and the O&M service partner operate in a formal partnership — as official distributors
                rather than loose reseller arrangements — this chain becomes unbreakable.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Here's why: if your O&M provider has no direct relationship with the OEM, warranty claims become a
                game of telephone. Fault reports go through intermediaries, replacement parts come from unknown sources,
                and insurance coverage can have gaps between who manufactured the equipment and who maintains it.
                When your service partner is the official distributor — with a contractual exclusivity agreement —
                the OEM's insurance, warranties, and technical support flow directly through to your project without
                breaks in the chain.
              </p>

              {/* Why OEM + O&M Partnership Matters */}
              <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4 text-center">Why the OEM-Distributor-O&M Chain Must Be Unified</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileCheck className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="font-semibold mb-2">Warranty Enforcement</h4>
                    <p className="text-sm text-gray-700">
                      As official distributor, Lighthief can enforce warranty claims directly with the OEM —
                      no intermediaries, no delays, no finger-pointing. Manufacturing defect indemnification
                      flows straight from the manufacturer to your project.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="font-semibold mb-2">Insurance Continuity</h4>
                    <p className="text-sm text-gray-700">
                      The OEM's product liability insurance seamlessly connects to the EPC/O&M provider's
                      professional indemnity and construction insurance. No gaps between manufacturing,
                      delivery, installation, and operations.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Lock className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="font-semibold mb-2">Lender Confidence</h4>
                    <p className="text-sm text-gray-700">
                      Lenders can trace the entire accountability chain from cell manufacturer to system integrator
                      to on-site service team. A unified chain with formal agreements is what credit committees
                      need to approve financing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Insurance & Warranty Flow */}
              <div className="space-y-6 mb-8">
                <Card className="border-2 border-blue-200">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="flex items-center text-blue-900">
                      <Shield className="w-6 h-6 mr-2" />
                      Layer 1: OEM Protection (Tier-1 Manufacturer)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-lg font-bold text-blue-700">Product Liability</div>
                        <div className="text-sm text-gray-600">Insured with a global Tier-1 insurer</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-lg font-bold text-blue-700">Professional Indemnity</div>
                        <div className="text-sm text-gray-600">Covers design & engineering defects</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-lg font-bold text-blue-700">Defect Indemnification</div>
                        <div className="text-sm text-gray-600">Full manufacturing defect coverage to Lighthief</div>
                      </div>
                    </div>
                    <p className="text-gray-700 mt-4 text-sm">
                      The OEM manufacturer maintains comprehensive product liability insurance with a globally
                      recognised insurer, covering defects in design, materials, or workmanship across all system
                      components. Critically, the OEM provides full indemnification to Lighthief as their official
                      distributor for any manufacturing defects — creating a direct accountability chain that
                      lenders value highly. This protection only exists because of the formal distributor relationship.
                    </p>
                  </CardContent>
                </Card>

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
                        <div className="text-lg font-bold text-emerald-700">Commercial Liability</div>
                        <div className="text-sm text-gray-600">General third-party coverage</div>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-4 text-center">
                        <div className="text-lg font-bold text-emerald-700">Professional Indemnity</div>
                        <div className="text-sm text-gray-600">Design & advisory coverage</div>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-4 text-center">
                        <div className="text-lg font-bold text-emerald-700">Construction All Risks</div>
                        <div className="text-sm text-gray-600">Full contract value during build</div>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-4 text-center">
                        <div className="text-lg font-bold text-emerald-700">Marine Cargo</div>
                        <div className="text-sm text-gray-600">Factory-to-site transit protection</div>
                      </div>
                    </div>
                    <p className="text-gray-700 mt-4 text-sm">
                      Lighthief carries comprehensive insurance covering every phase of the project lifecycle.
                      Contractor's All Risks (CAR) insurance covers the full contract value during construction,
                      with the LEG3 defects clause recommended for lender protection. Marine cargo insurance
                      protects equipment in transit from the factory to site. Professional indemnity covers
                      design and engineering advice provided during EPC delivery. Because Lighthief is the
                      official distributor, there is seamless handoff from OEM coverage to EPC coverage with
                      no gaps.
                    </p>
                  </CardContent>
                </Card>

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
                        <div className="text-lg font-bold text-purple-700">Property/Asset Insurance</div>
                        <div className="text-sm text-gray-600">Full BESS replacement value</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <div className="text-lg font-bold text-purple-700">Operational Liability</div>
                        <div className="text-sm text-gray-600">Active from commissioning onwards</div>
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
                    <div className="font-bold text-blue-800 mb-1">Tier-1 OEM Manufacturer</div>
                    <div className="text-xs text-gray-600">Product Liability Insurance</div>
                    <div className="text-xs text-gray-600">Professional Indemnity</div>
                    <div className="text-xs text-gray-600">Full Defect Indemnification</div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
                  <div className="bg-emerald-100 border-2 border-emerald-300 rounded-lg p-4 text-center w-full md:w-1/3">
                    <div className="font-bold text-emerald-800 mb-1">Lighthief (Official Distributor / EPC / O&M)</div>
                    <div className="text-xs text-gray-600">Commercial Liability</div>
                    <div className="text-xs text-gray-600">Professional Indemnity</div>
                    <div className="text-xs text-gray-600">Construction All Risks</div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
                  <div className="bg-purple-100 border-2 border-purple-300 rounded-lg p-4 text-center w-full md:w-1/3">
                    <div className="font-bold text-purple-800 mb-1">Client SPV (Owner)</div>
                    <div className="text-xs text-gray-600">Full Replacement Value</div>
                    <div className="text-xs text-gray-600">Operational Liability</div>
                    <div className="text-xs text-gray-600">Protected from Day One</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 text-center mt-4">
                  The official distributor relationship is what connects these layers into a seamless chain —
                  without it, gaps appear between OEM coverage and on-site service accountability.
                </p>
              </div>
            </div>

            {/* Section 8: Lighthief's Unique Position */}
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
                      With EU headquarters in Poland — featuring a 23-hectare facility with operational
                      BESS test systems, large-scale warehouse, and a dedicated OEM spare parts depot —
                      Lighthief has the infrastructure to support long-term operations. This isn't a start-up
                      promise; it's operational reality with 150+ engineers across Europe.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-5">
                    <h4 className="font-semibold text-lg mb-2 flex items-center">
                      <Battery className="w-5 h-5 text-emerald-600 mr-2" />
                      Significant Cyprus Portfolio
                    </h4>
                    <p className="text-gray-700 text-sm">
                      With a substantial BESS portfolio across dozens of parks in Cyprus, Lighthief has
                      demonstrated market commitment at scale. This portfolio size creates economies of scale
                      in spare parts, monitoring, and service delivery that smaller operators cannot match.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-5">
                    <h4 className="font-semibold text-lg mb-2 flex items-center">
                      <Users className="w-5 h-5 text-purple-600 mr-2" />
                      Complete Technology Ecosystem
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Lighthief has signed with a Tier-1 BESS manufacturer and cell producer, a leading PCS
                      manufacturer, a global leader for Energy Management and SCADA systems, and qualified local
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
                      Lighthief provides an EPC works warranty covering civil, cabling, and earthing works,
                      plus a full OEM warranty pass-through on equipment. This dual warranty structure means
                      the client has a single point of contact (Lighthief) while retaining the full backing of
                      the OEM's guarantee — simplifying both operations and lender reporting.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 9: What Lenders Actually Look For */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">What Lenders Actually Look For: A Bankability Checklist</h2>
              <p className="text-lg text-gray-700 mb-6">
                Based on current project finance requirements for BESS systems, here is what banks and institutional
                investors evaluate — and how the Lighthief structure addresses each requirement:
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
                          BloombergNEF Tier-1 manufacturer (exclusive distribution agreement)
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
                          Comprehensive policy with global Tier-1 insurer, maintained by OEM
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
                          EU warehouse (Poland) + local Cyprus inventory
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 text-gray-700">Proven cell supply chain</td>
                      <td className="p-4 text-gray-700">
                        <span className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          OEM is strategic shareholder in cell manufacturer — full traceability
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 text-gray-700">Cross-jurisdictional expertise</td>
                      <td className="p-4 text-gray-700">
                        <span className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          Lighthief operates across 11 European nations with 150+ engineers
                        </span>
                      </td>
                    </tr>
                    <tr>
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

            {/* Section 10: The Cost of Choosing Wrong */}
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
                Cyprus stands at a critical juncture. The island's isolated grid, combined with ambitious renewable
                energy targets, creates an urgent need for BESS infrastructure. But the successful implementation of
                energy storage requires not only appropriate technology — it requires the operational expertise,
                insurance framework, and OEM partnerships that make projects financeable.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                BESS bankability is not a feature you can purchase off a spec sheet. It's the result of deliberate
                choices — choosing a Tier-1 OEM with proven global partnerships, selecting a service partner with
                dedicated BESS expertise and local presence, ensuring cross-European operational knowledge transfer,
                and building a multi-layered insurance and warranty structure that satisfies the most rigorous
                lender requirements.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Lighthief's approach to the Cyprus market draws on this exact framework. With exclusive distribution
                agreements with a Tier-1 BESS manufacturer and cell producer, a leading PCS manufacturer, and
                comprehensive EPC/O&M insurance — every element of the value chain is structured to make your
                BESS investment bankable, insurable, and profitable for decades. The official distributor
                relationship is what makes this chain unbreakable: warranties flow directly from the OEM, insurance
                layers connect without gaps, and accountability is clear at every stage.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                As the island develops its BESS infrastructure, the technical knowledge and experience of companies
                operating across multiple jurisdictions will prove essential to achieving stable, sustainable
                electrical systems — and bankable investment returns.
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
                  Cyprus Mail — <em>"Cyprus Energy Storage Market: BESS Technology Emerges as Critical Solution to Grid Instability"</em>
                </li>
                <li>
                  Lighthief Internal — Warranties and Insurance Documentation (February 2026)
                </li>
              </ol>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-cyprus-600 to-solar-600 rounded-2xl p-8 text-white text-center">
              <p className="text-2xl font-semibold italic mb-4 opacity-90">
                "Lighthief — Leading the Way for Lenders in Cyprus"
              </p>
              <h2 className="text-3xl font-heading font-bold mb-4">
                Ready to Build a Bankable BESS Project?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Talk to our team about how Lighthief's Tier-1 OEM partnerships can make your BESS investment
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
                Contact Alexander Papacosta: +357 99 164 158 | office@lighthief.com
              </p>
            </div>

          </div>
        </div>
      </article>
    </div>
  )
}
