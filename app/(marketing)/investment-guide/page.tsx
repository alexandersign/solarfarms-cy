'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  FileDown,
  Printer,
  Sun,
  Battery,
  TrendingUp,
  Shield,
  Building2,
  Globe,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Zap,
  Euro,
  BarChart3,
  Clock,
  Users,
  FileText,
  Send,
  FileCheck,
  PenTool,
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────
interface MarketStats {
  avgPrice: number
  minPrice: number
  maxPrice: number
  solarHoursAvg: number
  peakHoursAvg: number
  offPeakAvg: number
  arbitrageSpread: number
  totalRecords: number
}

interface BESSArbitrage {
  avgDailySpread: number
  avgChargePrice: number
  avgDischargePrice: number
  middayAvgPrice: number
  estimatedRevenuePerMWhPerDay: number
  annualRevenuePerMWh: number
  curtailmentRevenuePerMWh: number
  curtailmentAnnualPerMWh25: number
  curtailmentAnnualPerMWh38: number
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function InvestmentGuidePage() {
  const [marketData, setMarketData] = useState<MarketStats | null>(null)
  const [bessData, setBessData] = useState<BESSArbitrage | null>(null)
  const [isRealData, setIsRealData] = useState(false)

  // LOI Form State
  const [loiForm, setLoiForm] = useState({
    investorName: '',
    investorCompany: '',
    investorAddress: '',
    investorEmail: '',
    investorPhone: '',
    projectName: '',
    projectReference: '',
    projectCapacityMW: '',
    estimatedInvestment: '',
    investmentAmount: '',
    investmentType: 'equity' as 'equity' | 'debt' | 'hybrid',
    timeline: '',
    bessIncluded: true,
    financingRequired: false,
    ltsaTier: 'B' as 'A' | 'B' | 'C' | 'D',
    conditions: '',
  })
  const [loiGenerating, setLoiGenerating] = useState(false)
  const [loiGenerated, setLoiGenerated] = useState(false)
  const [loiSubmitting, setLoiSubmitting] = useState(false)
  const [loiSubmitted, setLoiSubmitted] = useState(false)

  const handleGenerateLOI = async () => {
    setLoiGenerating(true)
    try {
      const loiData = {
        ...loiForm,
        projectCapacityMW: parseFloat(loiForm.projectCapacityMW) || 0,
        estimatedInvestment: parseFloat(loiForm.estimatedInvestment) || 0,
        investmentAmount: parseFloat(loiForm.investmentAmount) || 0,
        conditions: loiForm.conditions ? loiForm.conditions.split('\n').filter(c => c.trim()) : [],
      }

      const response = await fetch('/api/generate-loi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loiData),
      })

      if (response.ok) {
        const html = await response.text()
        const loiWindow = window.open('', '_blank')
        if (loiWindow) {
          loiWindow.document.write(html)
          loiWindow.document.close()
          loiWindow.focus()
          setLoiGenerated(true)
        } else {
          alert('Please allow pop-ups to view your Letter of Intent.')
        }
      } else {
        const error = await response.json()
        alert(error.message || 'Please fill in all required fields.')
      }
    } catch {
      alert('An error occurred generating the LOI. Please try again.')
    } finally {
      setLoiGenerating(false)
    }
  }

  const handleDigitalSubmit = async () => {
    setLoiSubmitting(true)
    try {
      const loiData = {
        ...loiForm,
        projectCapacityMW: parseFloat(loiForm.projectCapacityMW) || 0,
        estimatedInvestment: parseFloat(loiForm.estimatedInvestment) || 0,
        investmentAmount: parseFloat(loiForm.investmentAmount) || 0,
        conditions: loiForm.conditions ? loiForm.conditions.split('\n').filter(c => c.trim()) : [],
      }

      const response = await fetch('/api/generate-loi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loiData),
      })

      if (response.ok) {
        setLoiSubmitted(true)
        // Also open the generated LOI for their records
        const html = await response.text()
        const loiWindow = window.open('', '_blank')
        if (loiWindow) {
          loiWindow.document.write(html)
          loiWindow.document.close()
        }
      } else {
        alert('Please fill in all required fields.')
      }
    } catch {
      alert('An error occurred. Please try again.')
    } finally {
      setLoiSubmitting(false)
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const [summaryRes, bessRes] = await Promise.all([
          fetch('/api/market-data?view=summary'),
          fetch('/api/market-data?view=bess'),
        ])
        if (summaryRes.ok) {
          const s = await summaryRes.json()
          setMarketData(s.statistics?.overall || null)
          setIsRealData(!s.isDemo)
        }
        if (bessRes.ok) {
          const b = await bessRes.json()
          setBessData(b.bess || null)
        }
      } catch { /* fallback to static values */ }
    }
    fetchData()
  }, [])

  const handleExportPDF = () => {
    window.print()
  }

  const fmt = (n: number) => `€${n.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
  const fmtDec = (n: number) => `€${n.toFixed(2)}`

  return (
    <>
      {/* ── Print Styles ──────────────────────────────────────────────── */}
      <style jsx global>{`
        @media print {
          /* Hide site chrome */
          header, footer, nav,
          .no-print,
          [data-radix-popper-content-wrapper] {
            display: none !important;
          }
          body {
            font-size: 10pt;
            color: #000;
            background: #fff;
          }
          .print-page {
            margin: 0;
            padding: 0;
          }
          .page-break {
            page-break-before: always;
          }
          .avoid-break {
            page-break-inside: avoid;
          }
          @page {
            margin: 1.8cm 2cm;
            size: A4;
          }
          /* Cover page */
          .guide-cover {
            page-break-after: always;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          /* Tables */
          table { font-size: 9pt; }
          th, td { padding: 6px 8px; }
          /* Links */
          a { color: #000; text-decoration: none; }
          /* Cards */
          .guide-card {
            border: 1px solid #ddd;
            padding: 12px;
            margin-bottom: 8px;
          }
          /* Ensure images print */
          img { max-width: 100%; }
        }
        @media screen {
          .page-break { margin-top: 3rem; }
        }
      `}</style>

      <div className="print-page min-h-screen bg-white">
        {/* ── Export Controls (hidden in print) ──────────────────────── */}
        <div className="no-print sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 px-4 py-3">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/logo/lighthief-logo.png" alt="Lighthief" width={140} height={36} className="h-8 w-auto" />
              <span className="text-sm text-gray-500 hidden sm:inline">Investment Guide 2025/26</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExportPDF}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button size="sm" onClick={handleExportPDF} className="bg-cyprus-600 hover:bg-cyprus-700">
                <FileDown className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-8 print:px-0 print:py-0">

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* COVER PAGE */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div className="guide-cover text-center py-20 print:py-0">
            <div className="bg-gradient-to-br from-amber-400 via-amber-500 to-cyan-600 text-white rounded-2xl print:rounded-none p-16 print:p-20 mb-8 print:mb-0 print:min-h-screen print:flex print:flex-col print:justify-center">
              <div className="mb-10">
                <Image
                  src="/logo/lighthief-logo.png"
                  alt="Lighthief"
                  width={280}
                  height={72}
                  className="mx-auto h-16 w-auto brightness-0 invert"
                />
              </div>
              <h1 className="text-4xl md:text-5xl print:text-5xl font-bold mb-4 tracking-tight">
                CYPRUS SOLAR &amp; BESS
              </h1>
              <h2 className="text-3xl md:text-4xl print:text-4xl font-bold mb-8">
                INVESTMENT GUIDE
              </h2>
              <p className="text-xl opacity-90 mb-2">
                Complete Guide to Solar Farm &amp; Battery Storage Investments
              </p>
              <p className="text-lg opacity-80 mb-12">
                In Europe&apos;s Sunniest Climate
              </p>
              <div className="text-base opacity-75 space-y-1">
                <p className="font-semibold text-lg">2025 / 2026 Edition</p>
                <p>Published by Lighthief Cyprus Ltd</p>
                <p>www.solarfarms.cy</p>
              </div>
            </div>
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* TABLE OF CONTENTS */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div className="page-break avoid-break mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-amber-400 pb-2">
              Table of Contents
            </h2>
            <ol className="space-y-2 text-gray-700">
              {[
                'Executive Summary',
                'Cyprus Solar Market Overview',
                'Investment Costs & Pricing',
                'Battery Energy Storage (BESS)',
                'Real Market Pricing & Arbitrage Data',
                'Featured Investment Projects',
                'Financing Options',
                'Revenue & Returns Analysis',
                'Risk Factors & Mitigation',
                'Tax Considerations',
                'Investment Process & Timeline',
                'About Lighthief Cyprus',
                'Contact & Next Steps',
                'BESS Long-Term Service Agreement (LTSA)',
                'Letter of Intent (LOI)',
              ].map((item, i) => (
                <li key={i} className="flex justify-between border-b border-dotted border-gray-300 pb-1">
                  <span className="font-medium">{i + 1}. {item}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* 1. EXECUTIVE SUMMARY */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section className="page-break mb-12">
            <SectionHeader number={1} title="Executive Summary" />

            <p className="text-gray-700 leading-relaxed mb-6">
              Cyprus has emerged as one of Europe&apos;s premier destinations for solar farm and battery storage investments,
              offering exceptional solar irradiation, an established competitive electricity market, and strong returns.
              This guide provides institutional and private investors with comprehensive data-driven insights based on
              real market data from the Cyprus Day-Ahead Market (DAM).
            </p>

            <HighlightBox>
              <strong className="text-amber-900 block mb-3">Key Investment Highlights:</strong>
              <ul className="space-y-2 text-amber-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-1 text-amber-600 flex-shrink-0" />
                  <span><strong>3,300+ sun hours annually</strong> &mdash; Among Europe&apos;s highest solar irradiation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-1 text-amber-600 flex-shrink-0" />
                  <span><strong>8&ndash;13% equity IRR</strong> &mdash; Realistic returns based on actual park performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-1 text-amber-600 flex-shrink-0" />
                  <span><strong>€{marketData ? (marketData.peakHoursAvg * 0.8632).toFixed(0) : '158'}/MWh curtailment recovery value</strong> &mdash; Charge curtailed solar (€0), discharge at peak ({marketData ? `€${marketData.peakHoursAvg.toFixed(0)}` : '€183'}/MWh × 86.32% RTE)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-1 text-amber-600 flex-shrink-0" />
                  <span><strong>Up to 70% bank financing</strong> &mdash; For Solar+BESS projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-1 text-amber-600 flex-shrink-0" />
                  <span><strong>EU regulatory framework</strong> &mdash; Stable, predictable investment environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-1 text-amber-600 flex-shrink-0" />
                  <span><strong>€146,608&ndash;222,844/year</strong> &mdash; BESS curtailment recovery revenue (2.5&ndash;3.8 MWh/day discharged × €160.67 per MWh)</span>
                </li>
              </ul>
            </HighlightBox>
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* 2. CYPRUS SOLAR MARKET OVERVIEW */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section className="page-break mb-12">
            <SectionHeader number={2} title="Cyprus Solar Market Overview" />

            <h3 className="text-xl font-semibold text-gray-800 mb-4">2.1 Market Fundamentals</h3>
            <p className="text-gray-700 mb-6">Cyprus offers exceptional conditions for solar energy generation:</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard value="3,300+" label="Annual Sun Hours" />
              <StatCard value="1,800+" label="kWh/m²/yr Irradiation" />
              <StatCard value="1,650" label="kWh/kWp Typical Yield" />
              <StatCard value="22%" label="Capacity Factor" />
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">2.2 The Curtailment Challenge (Critical 2025 Trend)</h3>
            <p className="text-gray-700 mb-4">
              Cyprus solar curtailment has increased dramatically from 0% (2021) to 45.8% (2025) in operational parks.
              This fundamentally changes investment economics and makes Battery Energy Storage Systems (BESS) essential
              for ROI protection.
            </p>

            <div className="avoid-break">
              <DataTable
                headers={['Year', 'Production (MWh)', 'Curtailment %', 'Impact on ROI']}
                rows={[
                  ['2021', '10,146', '0%', 'Full revenue capture'],
                  ['2022', '9,897', '3.5%', 'Minimal impact'],
                  ['2023', '8,861', '13.4%', 'Revenue reduction begins'],
                  ['2024', '7,436', '26.7%', 'Significant impact'],
                  ['2025', '5,599', '45.8%', 'BESS becomes essential'],
                ]}
              />
            </div>

            <InfoBox>
              <strong>Investment Implication:</strong> For new solar investments in Cyprus, BESS integration should be
              considered from the outset to protect against ongoing curtailment increases and unlock evening arbitrage revenue.
            </InfoBox>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">2.3 Competitive Electricity Market</h3>
            <p className="text-gray-700 mb-4">
              Cyprus launched its Competitive Electricity Market on 1 October 2025, transitioning from regulated pricing
              to a Day-Ahead Market (DAM) operated by TSOC (Transmission System Operator Cyprus). The market operates under
              Law N.130(I)/2021 with CERA as the regulatory authority.
            </p>
            <ul className="text-gray-700 space-y-1 mb-4 list-disc pl-6">
              <li>Day-Ahead Market (DAM) with hourly price clearing</li>
              <li>Market price cap: €500/MWh (regularly hit during evening peaks)</li>
              <li>17 registered market participants at launch</li>
              <li>EAC remains dominant (86% conventional generation)</li>
              <li>Isolated grid &mdash; no interconnection with other countries</li>
            </ul>
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* 3. INVESTMENT COSTS & PRICING */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section className="page-break mb-12">
            <SectionHeader number={3} title="Investment Costs & Pricing" />

            <h3 className="text-xl font-semibold text-gray-800 mb-4">3.1 Current Market Pricing (2025/26)</h3>
            <p className="text-gray-700 mb-4">Based on actual market transactions and Lighthief Cyprus project data:</p>

            <div className="avoid-break">
              <DataTable
                headers={['Project Type', 'Cost per MW', 'Description']}
                rows={[
                  ['EPC Development', '€640,000', 'Greenfield development from scratch'],
                  ['Turnkey New Build', '€1,090,000', 'Complete construction-ready project'],
                  ['RTB Park (Fixed-Tilt)', '€1,090,000', 'Older energized parks'],
                  ['RTB Park (Tracking)', '€1,200,000', 'Premium parks with single-axis tracking'],
                ]}
              />
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">3.2 Typical Investment Sizes</h3>
            <div className="avoid-break">
              <DataTable
                headers={['Size', 'Total Investment', 'PV Cost', 'BESS Cost', 'RTB Cost', 'Target ROI']}
                rows={[
                  ['1 MW + 4 MWh', '€1,744,000', '€730,000', '€664,000', '€350,000', '8–13%'],
                  ['5 MW + 20 MWh', '€7,370,000', '€3,200,000', '€2,420,000', '€1,750,000', '8–13%'],
                  ['10 MW + 40 MWh', '€14,041,000', '€6,101,000', '€4,440,000', '€3,500,000', '8–13%'],
                ]}
              />
            </div>

            <InfoBox>
              <strong>Note:</strong> All investment figures are complete client pricing inclusive of EPC costs.
              RTB (Ready-to-Build) premium is €350,000/MW. Prices are exclusive of land lease costs.
            </InfoBox>
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* 4. BATTERY ENERGY STORAGE (BESS) */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section className="page-break mb-12">
            <SectionHeader number={4} title="Battery Energy Storage (BESS)" />

            <p className="text-gray-700 mb-6">
              Battery Energy Storage Systems are the critical enabler for Cyprus solar investments in 2025/26.
              BESS unlocks three revenue streams: curtailment recovery, evening peak arbitrage, and future grid services.
              Lighthief is the official Cyprus distributor for a Tier-1 BESS manufacturer &mdash; a leading cell producer and PCS supplier with proven utility-scale deployments.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">4.1 Tier-1 BESS Specifications</h3>
            <div className="avoid-break">
              <DataTable
                headers={['Parameter', 'Specification']}
                rows={[
                  ['Round-Trip Efficiency', '86.32% AC-AC (full system incl. cabling)'],
                  ['Cycle Life', '6,000+ cycles @ 100% DoD (80% SOH)'],
                  ['Container Capacity', '5.015 MWh per 20HC container'],
                  ['Base Warranty', '5 years OEM'],
                  ['Extended Warranty (LTSA)', '15 years (paid Years 6–15)'],
                  ['Annual Capacity Loss', '2.5% per year'],
                  ['Daily Cycles', '1 cycle/day (charge solar, discharge peak)'],
                ]}
              />
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">4.2 BESS Pricing</h3>
            <div className="avoid-break">
              <DataTable
                headers={['System Size', 'Capacity Range', 'Price per MWh', 'Example Total']}
                rows={[
                  ['Small', '1–2 MW / 4–8 MWh', '€166,000/MWh', '4 MWh = €664,000'],
                  ['Medium', '2.5–5 MW / 10–20 MWh', '€121,000/MWh', '20 MWh = €2,420,000'],
                  ['Large', '8–25 MW / 32–100 MWh', '€111,000/MWh', '40 MWh = €4,440,000'],
                  ['Utility', '25–100 MW / 100+ MWh', '€108,000/MWh', '100 MWh = €10,800,000'],
                ]}
              />
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">4.3 BESS O&M Costs (Annual per MWh)</h3>
            <div className="avoid-break">
              <DataTable
                headers={['Service', 'Annual Cost per MWh']}
                rows={[
                  ['BESS Preventive & Corrective Maintenance', '€1,158/MWh/year'],
                  ['PCS + MVS Maintenance', '€1,312/MWh/year'],
                  ['Availability Guarantee (97%)', '€2,202/MWh/year'],
                  ['Total O&M (with guarantee)', '€4,672/MWh/year'],
                  ['Total O&M (without guarantee)', '€2,470/MWh/year'],
                ]}
              />
            </div>

            <HighlightBox>
              <strong className="text-amber-900">Why BESS is Essential in Cyprus:</strong>
              <ol className="mt-2 space-y-1 text-amber-800 list-decimal pl-6">
                <li><strong>Curtailment Recovery (Current):</strong> Store curtailed solar (€0 cost), discharge at €183/MWh peak &mdash; €157.94/MWh net, €144k&ndash;219k/year</li>
                <li><strong>Future Arbitrage:</strong> €81.86 peak-midday spread × 86.32% RTE = €70.66 net/MWh (~€64.5k/year) &mdash; when legislation permits</li>
                <li><strong>Enhanced Financing:</strong> Solar+BESS qualifies for 70% debt (vs €500k/MW cap for solar-only)</li>
                <li><strong>Future Grid Services:</strong> Frequency regulation, spinning reserve (market opening)</li>
              </ol>
            </HighlightBox>
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* 5. REAL MARKET PRICING & ARBITRAGE */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section className="page-break mb-12">
            <SectionHeader number={5} title="Real Market Pricing & Arbitrage Data" />

            <p className="text-gray-700 mb-2">
              The following data is derived from {isRealData ? 'actual' : 'modelled'} TSOC Day-Ahead Market (DAM)
              reports{isRealData ? '' : ', based on real Cyprus market patterns'}.
              {isRealData && (
                <> Source: 134 TSOC DAM files covering Oct 2025&ndash;Feb 2026.</>
              )}
            </p>
            {isRealData && (
              <Badge className="mb-4 bg-green-100 text-green-800 border-green-300">
                Real TSOC Market Data
              </Badge>
            )}

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-4">5.1 Market Clearing Price Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <StatCard
                value={marketData ? `€${marketData.avgPrice.toFixed(0)}` : '€158'}
                label="Overall Avg MCP /MWh"
                color="cyan"
              />
              <StatCard
                value="€101"
                label="Midday (10-14) /MWh"
                color="green"
              />
              <StatCard
                value={marketData ? `€${marketData.solarHoursAvg.toFixed(0)}` : '€141'}
                label="Solar Hours (06-17)"
                color="amber"
              />
              <StatCard
                value={marketData ? `€${marketData.peakHoursAvg.toFixed(0)}` : '€183'}
                label="Peak Evening (17-21)"
                color="indigo"
              />
              <StatCard
                value="€82"
                label="Peak-Midday Spread"
                color="red"
              />
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">5.2 Price Analysis by Time Period</h3>
            <div className="avoid-break">
              <DataTable
                headers={['Time Period', 'Hours', 'Avg MCP', 'Significance']}
                rows={[
                  ['Overall Average', '00:00–23:00', '€158.19/MWh', '134 DAM files, Oct 2025–Feb 2026'],
                  ['Midday Solar Peak', '10:00–14:00', '€101.13/MWh', 'Lowest prices — BESS charging window'],
                  ['Solar Hours', '06:00–17:00', '€140.88/MWh', 'Extended solar generation period'],
                  ['Peak Evening', '17:00–21:00', '€182.99/MWh', 'Highest demand — BESS discharge window'],
                  ['Peak-Midday Spread', '—', '€81.86/MWh', 'Curtailment recovery value / future arbitrage spread'],
                  ['Zero-Price Periods', '—', '336 hours (5.2%)', 'Oversupply — free BESS charging opportunities'],
                ]}
              />
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">5.3 BESS Revenue: Curtailment Recovery (Current) &amp; Future Arbitrage</h3>
            <p className="text-gray-700 mb-4">
              BESS in Cyprus currently earns revenue through <strong>curtailment recovery</strong>: during DSO-ordered
              production cutbacks, BESS stores energy that would otherwise be wasted (€0 charge cost) and discharges
              at evening peak prices (€183/MWh avg). With 25&ndash;45% curtailment rates, this yields <strong>€157.94
              per MWh discharged</strong> &mdash; or <strong>€144,120&ndash;219,007/year</strong> (2.5&ndash;3.8 MWh/day).
              Arbitrage (buying at midday, selling at peak) is <strong>not yet legal</strong> in Cyprus as of Feb 2026;
              when legislation passes, the €81.86/MWh peak-midday spread (€70.66 net after 86.32% RTE) will unlock an
              additional ~€64,478/year (at 2.5 MWh/day).
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6 avoid-break">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                <Sun className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">
                  {bessData ? fmtDec(bessData.avgChargePrice) : '€0'}
                </p>
                <p className="text-xs text-gray-600">Charge Cost (curtailed)</p>
              </div>
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center">
                <Zap className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">
                  {bessData ? fmtDec(bessData.avgDischargePrice) : '€183'}
                </p>
                <p className="text-xs text-gray-600">Peak Discharge (17-21h)</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-green-700">
                  {bessData ? fmtDec(bessData.curtailmentRevenuePerMWh || bessData.avgDailySpread) : '€160.67'}
                </p>
                <p className="text-xs text-gray-600">Revenue /MWh Discharged</p>
              </div>
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-center">
                <Euro className="w-5 h-5 text-cyan-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-cyan-700">€146,608</p>
                <p className="text-xs text-gray-600">Annual (2.5 MWh/day)</p>
              </div>
              <div className="bg-green-100 border border-green-300 rounded-lg p-4 text-center">
                <BarChart3 className="w-5 h-5 text-green-700 mx-auto mb-1" />
                <p className="text-lg font-bold text-green-800">€222,844</p>
                <p className="text-xs text-green-700 font-medium">Annual (3.8 MWh/day)</p>
              </div>
            </div>

            <InfoBox>
              <strong>Current (curtailment recovery):</strong> BESS charges during DSO-curtailed hours (typically
              10:00&ndash;14:00 peak solar) at €0 cost, discharges at evening peak (17:00&ndash;21:00) at €183/MWh avg.
              After 86.32% round-trip efficiency: <strong>€157.94 per MWh discharged</strong>. Annual revenue:
              €144,120 (2.5 MWh/day) to €219,007 (3.8 MWh/day). Based on 134 TSOC DAM files, Oct 2025&ndash;Feb 2026.
              <br /><br />
              <strong>Future (when arbitrage legislation passes):</strong> DAM grid arbitrage at €81.86/MWh
              peak-midday spread × 86.32% RTE = <strong>€70.66 net per MWh</strong>. Estimated annual: ~€64,478
              (at 2.5 MWh/day). Arbitrage is <em>not yet legal</em> in Cyprus as of Feb 2026. Additional ancillary
              services (frequency regulation, spinning reserve) will further increase revenue.
            </InfoBox>
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* 6. FEATURED PROJECTS */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section className="page-break mb-12">
            <SectionHeader number={6} title="Featured Investment Projects" />

            {/* Project 1 */}
            <div className="avoid-break border border-gray-200 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Agios Theodoros Solar Park + BESS</h3>
                <Badge className="bg-green-100 text-green-800 border-green-300">Ready to Build</Badge>
              </div>
              <p className="text-gray-600 mb-4">Agios Theodoros, Larnaca District | Target Q4 2026</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <MiniStat icon={<Sun className="w-4 h-4" />} label="Capacity" value="2.64 MW" />
                <MiniStat icon={<Battery className="w-4 h-4" />} label="BESS" value="10.56 MWh" />
                <MiniStat icon={<Euro className="w-4 h-4" />} label="Investment" value="€4.24M" />
                <MiniStat icon={<TrendingUp className="w-4 h-4" />} label="Leveraged IRR" value="~30%" />
              </div>

              <ul className="space-y-1 text-gray-700 text-sm">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />Integrated 10.56 MWh BESS &mdash; 4-hour duration (€127k/MWh)</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />Bifacial TopCon modules &mdash; 1,800 kWh/kWp yield</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />Zero curtailment risk with battery arbitrage</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />Single operator: Lighthief EPC + O&M</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />Annual revenue estimated at €1.05M</li>
              </ul>
            </div>

            {/* Project 2 */}
            <div className="avoid-break border border-gray-200 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Anarita Solar Park &mdash; 10MW Operational</h3>
                <Badge className="bg-blue-100 text-blue-800 border-blue-300">Operational</Badge>
              </div>
              <p className="text-gray-600 mb-4">Anarita, Paphos District | Energized &amp; Grid Connected</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <MiniStat icon={<Sun className="w-4 h-4" />} label="Capacity" value="10 MW" />
                <MiniStat icon={<Battery className="w-4 h-4" />} label="BESS Opportunity" value="40 MWh" />
                <MiniStat icon={<Euro className="w-4 h-4" />} label="Investment" value="€12.5M" />
                <MiniStat icon={<TrendingUp className="w-4 h-4" />} label="Current ROI" value="14.5%" />
              </div>

              <ul className="space-y-1 text-gray-700 text-sm">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />Real curtailment data: 38% average, up to 67% peak</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />18 months verified production data available</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />BESS opportunity: recover €600k+ annually in curtailed energy</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />ROI boost from 14.5% to 18%+ with 40MWh BESS integration</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />Tier-1 BESS integration ready: turnkey delivery</li>
              </ul>
            </div>

            <p className="text-sm text-gray-500 italic">
              Additional projects available under NDA. Contact Lighthief Cyprus for the current portfolio.
            </p>
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* 7. FINANCING OPTIONS */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section className="page-break mb-12">
            <SectionHeader number={7} title="Financing Options" />

            <h3 className="text-xl font-semibold text-gray-800 mb-4">7.1 Solar-Only Financing</h3>
            <HighlightBox>
              <strong className="text-amber-900">Maximum Debt: €500,000 per MW</strong>
              <p className="text-amber-800 mt-1">
                Cyprus banks cap solar-only project financing at €500,000 per MW due to
                conservative lending practices and curtailment concerns.
              </p>
            </HighlightBox>

            <ul className="text-gray-700 space-y-1 mb-6 list-disc pl-6">
              <li><strong>Interest Rate:</strong> 4.5&ndash;5.0%</li>
              <li><strong>Loan Term:</strong> 12&ndash;15 years</li>
              <li><strong>Max LTV:</strong> Varies by MW (€500k/MW cap)</li>
              <li><strong>Example (5MW, €7.5M):</strong> Max debt €2.5M, equity €5M (67%)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">7.2 Solar + BESS Financing</h3>
            <InfoBox>
              <strong>Enhanced Financing: Up to 70% of Total Capex</strong>
              <p className="mt-1">
                Projects with BESS qualify for higher leverage due to enhanced revenue streams and curtailment protection.
              </p>
            </InfoBox>

            <ul className="text-gray-700 space-y-1 mb-6 list-disc pl-6">
              <li><strong>Max LTV:</strong> 70% of total capex (solar + BESS)</li>
              <li><strong>Interest Rate:</strong> 4.5&ndash;5.0%</li>
              <li><strong>Loan Term:</strong> 15 years</li>
              <li><strong>Example (5MW + 20MWh, €9.25M):</strong> Max debt €6.475M, equity €2.775M (30%)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">7.3 Financing Comparison</h3>
            <div className="avoid-break">
              <DataTable
                headers={['Scenario', 'Investment', 'Equity Required', 'Annual Profit', 'Equity ROI']}
                rows={[
                  ['Solar Only (Cash)', '€7,500,000', '€7,500,000', '€1,000,000', '13.3%'],
                  ['Solar + BESS (Cash)', '€9,250,000', '€9,250,000', '€1,260,000', '13.6%'],
                  ['Solar Only (Financed)', '€7,500,000', '€5,000,000', '€535,000', '10.7%'],
                  ['Solar + BESS (70% Fin.)', '€9,250,000', '€2,775,000', '€560,000', '20.2%'],
                ]}
              />
            </div>
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* 8. REVENUE & RETURNS */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section className="page-break mb-12">
            <SectionHeader number={8} title="Revenue & Returns Analysis" />

            <h3 className="text-xl font-semibold text-gray-800 mb-4">8.1 Energy Production</h3>
            <ul className="text-gray-700 space-y-1 mb-6 list-disc pl-6">
              <li><strong>Capacity Factor:</strong> 20&ndash;22% (Cyprus average)</li>
              <li><strong>Annual Yield:</strong> 1,650&ndash;1,850 kWh/kWp (monofacial to bifacial TopCon)</li>
              <li><strong>Degradation:</strong> 0.5% per year (Tier-1 panels)</li>
              <li><strong>System Availability:</strong> 99%</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">8.2 Revenue Streams</h3>

            <div className="grid md:grid-cols-2 gap-4 mb-6 avoid-break">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-500" /> Primary: Energy Sales
                </h4>
                <ul className="text-gray-700 text-sm space-y-1 list-disc pl-5">
                  <li>PPA Rates: €150&ndash;210/MWh</li>
                  <li>Wholesale DAM Avg: €{marketData ? marketData.avgPrice.toFixed(0) : '158'}/MWh</li>
                  <li>Offtakers: EAC or private distributors</li>
                  <li>Term: 20&ndash;25 years typically</li>
                </ul>
              </div>
              <div className="border border-green-200 rounded-lg p-4 bg-green-50/50">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Battery className="w-4 h-4 text-green-500" /> BESS Revenue
                </h4>
                <ul className="text-gray-700 text-sm space-y-1 list-disc pl-5">
                  <li>Curtailment recovery (current): store curtailed solar (€0 cost), sell at €{marketData ? marketData.peakHoursAvg.toFixed(0) : '183'}/MWh peak &mdash; €160.67/MWh net</li>
                  <li>Annual curtailment revenue: €146,608&ndash;222,844/year (2.5&ndash;3.8 MWh/day discharged)</li>
                  <li>Future arbitrage: €{marketData ? (marketData.peakHoursAvg - marketData.solarHoursAvg).toFixed(0) : '82'}/MWh peak-midday spread × 86.32% RTE = €70.66 net/MWh (~€64.5k/year) &mdash; not yet legal (Feb 2026)</li>
                  <li>Future: grid ancillary services (frequency regulation, spinning reserve)</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">8.3 Return Expectations</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard value="8–13%" label="Equity IRR Range" />
              <StatCard value="7–10 yrs" label="Payback Period" />
              <StatCard value="20%+" label="Leveraged IRR (BESS)" />
              <StatCard value="25 yrs" label="Project Lifetime" />
            </div>
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* 9. RISK FACTORS */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section className="page-break mb-12">
            <SectionHeader number={9} title="Risk Factors & Mitigation" />

            <div className="space-y-6">
              <RiskItem
                level="critical"
                title="Curtailment Risk"
                description="Grid operator may curtail production during oversupply. Current 45.8% average in 2025."
                mitigation="BESS integration to recover 30–60% of curtailed energy. Cost: €108–166k/MWh for Tier-1 battery systems."
              />
              <RiskItem
                level="medium"
                title="Regulatory & Policy Risk"
                description="Changes in feed-in tariffs, support mechanisms, or market rules."
                mitigation="Long-term PPAs, grandfathering provisions, EU framework stability, CERA regulatory oversight."
              />
              <RiskItem
                level="medium"
                title="Market Price Risk"
                description="DAM price volatility — prices range from €0 to €500/MWh."
                mitigation="Fixed PPA contracts for base revenue. BESS enables selling at peak prices regardless of production timing."
              />
              <RiskItem
                level="low"
                title="Performance Risk"
                description="Lower than projected energy yield."
                mitigation="Conservative projections, performance guarantees, Tier-1 equipment, professional O&M from Lighthief."
              />
              <RiskItem
                level="low"
                title="Equipment & O&M Risk"
                description="Equipment failures, maintenance costs."
                mitigation="Tier-1 equipment with warranties, local Cyprus-based O&M, spare parts inventory, LTSA coverage."
              />
            </div>
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* 10. TAX CONSIDERATIONS */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section className="page-break mb-12">
            <SectionHeader number={10} title="Tax Considerations" />

            <h3 className="text-xl font-semibold text-gray-800 mb-4">10.1 Cyprus Tax Framework</h3>
            <div className="avoid-break">
              <DataTable
                headers={['Tax Type', 'Rate', 'Notes']}
                rows={[
                  ['Corporate Tax', '12.5%', 'Among lowest in EU'],
                  ['Withholding Tax (dividends)', '0%', 'To non-Cyprus tax residents'],
                  ['Capital Gains Tax', 'Generally exempt', 'For securities and shares'],
                  ['Crypto Gains', '8% flat', 'Attractive for crypto-to-solar diversification'],
                  ['VAT on Equipment', '19%', 'Recoverable for registered entities'],
                ]}
              />
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-6">10.2 Optimization Structures</h3>
            <ul className="text-gray-700 space-y-1 mb-4 list-disc pl-6">
              <li>Cyprus holding company structure</li>
              <li>Partnership with EU investors</li>
              <li>Direct ownership with tax treaty benefits (65+ double tax treaties)</li>
              <li>IP Box regime for technology-driven projects</li>
            </ul>
            <p className="text-sm text-gray-500 italic">
              Consult with qualified tax advisors for your specific situation.
            </p>
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* 11. INVESTMENT PROCESS */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section className="page-break mb-12">
            <SectionHeader number={11} title="Investment Process & Timeline" />

            <div className="space-y-6">
              <ProcessPhase
                phase={1}
                title="Initial Assessment"
                timeline="Weeks 1–2"
                steps={[
                  'Initial consultation with Lighthief Cyprus team',
                  'Review available projects and opportunities',
                  'Preliminary financial modeling with ROI calculator',
                  'Site visit arrangements (if applicable)',
                ]}
              />
              <ProcessPhase
                phase={2}
                title="Due Diligence"
                timeline="Weeks 3–6"
                steps={[
                  'Execute Non-Disclosure Agreement (NDA)',
                  'Receive complete due diligence package (technical specs, financial projections, legal documentation)',
                  'Independent technical review',
                  'Legal review of all contracts (permits, licenses, grid connection, PPA)',
                ]}
              />
              <ProcessPhase
                phase={3}
                title="Structuring & Negotiation"
                timeline="Weeks 7–10"
                steps={[
                  'Finalize investment structure (equity, debt, hybrid)',
                  'Engage banking partners for financing (if applicable)',
                  'Negotiate final terms and pricing',
                  'Draft Share Purchase Agreement (SPA)',
                ]}
              />
              <ProcessPhase
                phase={4}
                title="Execution & Close"
                timeline="Weeks 11–14"
                steps={[
                  'Execute definitive agreements',
                  'Complete legal formalities and registrations',
                  'Transfer funds and close transaction',
                  'Transition operations; establish O&M contracts',
                ]}
              />
            </div>
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* 12. ABOUT LIGHTHIEF */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section className="page-break mb-12">
            <SectionHeader number={12} title="About Lighthief Cyprus" />

            <div className="flex items-center gap-4 mb-6">
              <Image src="/logo/lighthief-logo.png" alt="Lighthief" width={180} height={46} className="h-10 w-auto" />
              <div>
                <p className="font-semibold text-gray-900">Lighthief Cyprus Ltd</p>
                <p className="text-sm text-gray-600">European-Asian Renewable Energy Operator</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Company Profile</h3>
                <ul className="text-gray-700 text-sm space-y-1.5">
                  <li><strong>Founded:</strong> 2015 (Pan-European since 2017)</li>
                  <li><strong>HQ:</strong> Limassol, Cyprus / Czestochowa, Poland</li>
                  <li><strong>Team:</strong> 150+ professionals</li>
                  <li><strong>Countries:</strong> 11 (Poland, Cyprus, Greece, Italy, Spain, Germany, Netherlands, Kazakhstan, Uzbekistan, Romania, Ukraine)</li>
                  <li><strong>Assets Managed:</strong> Hundreds of MW (solar, wind, biogas)</li>
                  <li><strong>Certifications:</strong> NATO Certified, EU Grants Recipient</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Services</h3>
                <ul className="text-gray-700 text-sm space-y-1.5">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />EPC Development: €640k/MW</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />O&M Management: 24/7 monitoring</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />BESS Integration: Tier-1 OEM systems</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />Asset Optimization &amp; Performance</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />Lifecycle Support incl. Recycling</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />Investment Advisory &amp; LOI Generation</li>
                </ul>
              </div>
            </div>

            <InfoBox>
              <strong>R&amp;D Center:</strong> 23-hectare facility in Czestochowa, Poland featuring 2&times;8 MW PV farm,
              1 MW biogas plant, BESS systems, 1,000 m&sup2; office, and 3,500 m&sup2; warehouse.
              Local presence in Cyprus with same-day emergency response.
            </InfoBox>
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* 13. CONTACT & NEXT STEPS */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section className="page-break mb-12">
            <SectionHeader number={13} title="Contact & Next Steps" />

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Immediate Actions</h3>
            <ol className="text-gray-700 space-y-3 mb-8 list-decimal pl-6">
              <li>
                <strong>Review Current Opportunities</strong> at{' '}
                <Link href="/projects" className="text-cyan-600 underline print:text-black print:no-underline">solarfarms.cy/projects</Link>
              </li>
              <li>
                <strong>Use the ROI Calculator</strong> at{' '}
                <Link href="/calculator" className="text-cyan-600 underline print:text-black print:no-underline">solarfarms.cy/calculator</Link>
              </li>
              <li>
                <strong>View Live Market Data</strong> at{' '}
                <Link href="/market" className="text-cyan-600 underline print:text-black print:no-underline">solarfarms.cy/market</Link>
              </li>
              <li>
                <strong>Generate a Letter of Intent</strong> at{' '}
                <Link href="/loi" className="text-cyan-600 underline print:text-black print:no-underline">solarfarms.cy/loi</Link>
              </li>
              <li>
                <strong>Schedule a Consultation</strong> (details below)
              </li>
            </ol>

            <div className="grid md:grid-cols-2 gap-6 mb-8 avoid-break">
              <div className="border border-gray-200 rounded-lg p-5">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-600" /> Cyprus Contact
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="font-semibold text-base">Alexander Papacosta</p>
                  <p>Cyprus Director</p>
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +357 99 164 158</p>
                  <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> office@lighthief.com</p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-5">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-cyan-600" /> Company
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="font-semibold text-base">Lighthief Cyprus Ltd</p>
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> 28 October Ave 249, Lophitis Business Center 1, Office 201, 3035 Limassol</p>
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +357 77 77 00 50</p>
                  <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> office@lighthief.com</p>
                  <p className="flex items-center gap-2"><Globe className="w-4 h-4" /> www.solarfarms.cy</p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">
              <strong>Registration:</strong> HE 477423 | TIN: 60187188Q | Limassol, Cyprus
            </p>
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* 14. BESS LONG-TERM SERVICE AGREEMENT (LTSA) */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section className="page-break mb-12">
            <SectionHeader number={14} title="BESS Long-Term Service Agreement (LTSA)" />

            <p className="text-gray-700 mb-6">
              All BESS systems supplied by Lighthief Cyprus include a comprehensive Long-Term Service Agreement
              for monitoring, maintenance, and performance guarantees. The LTSA ensures your battery investment
              operates at peak performance throughout its lifetime.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">14.1 Service Tier Options</h3>
            <div className="avoid-break">
              <DataTable
                headers={['Tier', 'Name', 'Includes', 'Annual Cost /MWh']}
                rows={[
                  ['A', 'Basic Monitoring & Maintenance', '24/7 remote monitoring, bi-annual on-site visits, quarterly reports', '€1,158/MWh'],
                  ['B', 'Comprehensive O&M', 'Tier A + corrective maintenance, PCS/MVS servicing, emergency response', '€2,470/MWh'],
                  ['C', 'Full Service + Availability', 'Tier B + 97% availability guarantee, local spare parts, liquidated damages', '€4,672/MWh'],
                  ['D', 'Premium + Performance Warranty', 'Tier C + SOH guarantee, cell augmentation, module replacement coverage', 'POA'],
                ]}
              />
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">14.2 Key LTSA Terms</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6 avoid-break">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-600" /> Monitoring &amp; Response
                </h4>
                <ul className="text-gray-700 text-sm space-y-1 list-disc pl-5">
                  <li>24/7/365 remote monitoring via Lighthief platform</li>
                  <li>Critical alerts: 4-hour response time</li>
                  <li>Bi-annual on-site preventive maintenance</li>
                  <li>OEM-compliant maintenance per manufacturer manual</li>
                  <li>Cyprus coastal protection (C5 enclosure maintenance)</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Battery className="w-4 h-4 text-green-600" /> Performance Guarantees
                </h4>
                <ul className="text-gray-700 text-sm space-y-1 list-disc pl-5">
                  <li>97% annual availability guarantee (Tier C+)</li>
                  <li>SOH guarantee: 85% at Year 5, 70% at Year 15</li>
                  <li>Liquidated damages for underperformance</li>
                  <li>Cell augmentation provisions (if applicable)</li>
                  <li>OEM-backed warranty reserve</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">14.3 Optional Warranty Extensions</h3>
            <div className="avoid-break">
              <DataTable
                headers={['Extension', 'Period', 'Cost /MWh/Year']}
                rows={[
                  ['BESS Performance & Product Warranty', 'Years 6–10', '€914/MWh/yr'],
                  ['BESS Performance & Product Warranty', 'Years 11–15', '€4,182/MWh/yr'],
                  ['PCS + MVS Product Warranty', 'Years 6–10', '€748/MWh/yr'],
                  ['PCS Product Warranty', 'Years 11–15', '€1,086/MWh/yr'],
                ]}
              />
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">14.4 SOH Degradation Guarantee (Not Currently Offered)</h3>
            <div className="avoid-break">
              <DataTable
                headers={['End of Year', 'Guaranteed SOH (1 cycle/day)', 'Guaranteed SOH (2 cycles/day)']}
                rows={[
                  ['Year 1', '95%', '93%'],
                  ['Year 3', '89%', '86%'],
                  ['Year 5', '85%', '82%'],
                  ['Year 10', '79.6%', '71%'],
                  ['Year 15', '70%', 'N/A (max 10yr for 2/day)'],
                ]}
              />
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-8">14.5 Agreement Structure</h3>
            <ul className="text-gray-700 space-y-1 mb-4 list-disc pl-6 text-sm">
              <li><strong>Initial Term:</strong> 5 years from commissioning date</li>
              <li><strong>Auto-Renewal:</strong> 1-year successive periods (90 days&apos; notice to cancel)</li>
              <li><strong>Payment:</strong> Annual in advance, 30-day terms, CPI+2% annual adjustment</li>
              <li><strong>Governing Law:</strong> Republic of Cyprus</li>
              <li><strong>Schedules:</strong> Site &amp; Equipment Details, Service Fees, Maintenance Checklist, Availability Calculation, Degradation Curve</li>
            </ul>

            <InfoBox>
              The full LTSA document (Reference: LCY-LTSA-001, Version 2.4) with all schedules, maintenance checklists,
              and detailed terms will be provided upon execution of a Letter of Intent. The LTSA is signed alongside
              the EPC Agreement and BESS procurement.
            </InfoBox>
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* 15. LETTER OF INTENT (LOI) */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <section className="page-break mb-12">
            <SectionHeader number={15} title="Letter of Intent (LOI)" />

            <p className="text-gray-700 mb-4">
              Complete the form below to generate a non-binding Letter of Intent expressing your preliminary interest.
              You can <strong>print and sign</strong> the LOI, or <strong>submit digitally</strong> to begin the
              investment process.
            </p>

            <InfoBox>
              <strong>This LOI is non-binding</strong> and does not create legal obligations. It expresses
              preliminary interest and initiates due diligence. Review with your legal counsel before signing.
              The LOI will include your selected LTSA tier for any BESS components.
            </InfoBox>

            {loiSubmitted ? (
              <div className="bg-green-50 border border-green-300 rounded-lg p-8 text-center my-8 avoid-break">
                <FileCheck className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-800 mb-2">LOI Successfully Submitted</h3>
                <p className="text-green-700 mb-4">
                  Your Letter of Intent has been generated and submitted to Lighthief Cyprus.
                  We will review and contact you within 2 business days.
                </p>
                <p className="text-sm text-green-600">
                  A copy has been opened in a new window for your records. You can print it for physical signing.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => { setLoiSubmitted(false); setLoiGenerated(false) }}
                >
                  Generate Another LOI
                </Button>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg p-6 my-6 avoid-break" id="loi-form">
                {/* Investor Information */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-cyan-600" /> Investor Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <Input
                      placeholder="Full Name *"
                      value={loiForm.investorName}
                      onChange={(e) => setLoiForm({ ...loiForm, investorName: e.target.value })}
                    />
                    <Input
                      placeholder="Company Name (optional)"
                      value={loiForm.investorCompany}
                      onChange={(e) => setLoiForm({ ...loiForm, investorCompany: e.target.value })}
                    />
                  </div>
                  <Input
                    className="mt-3"
                    placeholder="Full Address *"
                    value={loiForm.investorAddress}
                    onChange={(e) => setLoiForm({ ...loiForm, investorAddress: e.target.value })}
                  />
                  <div className="grid md:grid-cols-2 gap-3 mt-3">
                    <Input
                      type="email"
                      placeholder="Email Address *"
                      value={loiForm.investorEmail}
                      onChange={(e) => setLoiForm({ ...loiForm, investorEmail: e.target.value })}
                    />
                    <Input
                      type="tel"
                      placeholder="Phone Number *"
                      value={loiForm.investorPhone}
                      onChange={(e) => setLoiForm({ ...loiForm, investorPhone: e.target.value })}
                    />
                  </div>
                </div>

                {/* Project Information */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4 flex items-center gap-2">
                    <Sun className="w-5 h-5 text-amber-500" /> Project Information
                  </h3>
                  <Input
                    placeholder="Project Name *"
                    value={loiForm.projectName}
                    onChange={(e) => setLoiForm({ ...loiForm, projectName: e.target.value })}
                  />
                  <div className="grid md:grid-cols-2 gap-3 mt-3">
                    <Input
                      placeholder="Project Reference (e.g., PARK-RTB-2026)"
                      value={loiForm.projectReference}
                      onChange={(e) => setLoiForm({ ...loiForm, projectReference: e.target.value })}
                    />
                    <Input
                      type="number"
                      placeholder="Capacity (MW) *"
                      value={loiForm.projectCapacityMW}
                      onChange={(e) => setLoiForm({ ...loiForm, projectCapacityMW: e.target.value })}
                    />
                  </div>
                  <Input
                    className="mt-3"
                    type="number"
                    placeholder="Estimated Total Investment (€) *"
                    value={loiForm.estimatedInvestment}
                    onChange={(e) => setLoiForm({ ...loiForm, estimatedInvestment: e.target.value })}
                  />
                </div>

                {/* Investment Terms */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4 flex items-center gap-2">
                    <Euro className="w-5 h-5 text-cyan-600" /> Investment Terms
                  </h3>
                  <Input
                    type="number"
                    placeholder="Your Investment Amount (€) *"
                    value={loiForm.investmentAmount}
                    onChange={(e) => setLoiForm({ ...loiForm, investmentAmount: e.target.value })}
                  />
                  <div className="grid md:grid-cols-2 gap-3 mt-3">
                    <Select
                      value={loiForm.investmentType}
                      onValueChange={(v: 'equity' | 'debt' | 'hybrid') => setLoiForm({ ...loiForm, investmentType: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Investment Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equity">Equity Investment</SelectItem>
                        <SelectItem value="debt">Debt Financing</SelectItem>
                        <SelectItem value="hybrid">Hybrid (Equity + Debt)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Timeline (e.g., 6–12 months) *"
                      value={loiForm.timeline}
                      onChange={(e) => setLoiForm({ ...loiForm, timeline: e.target.value })}
                    />
                  </div>
                </div>

                {/* BESS & LTSA Options */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4 flex items-center gap-2">
                    <Battery className="w-5 h-5 text-green-600" /> BESS &amp; LTSA Options
                  </h3>
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="checkbox"
                      id="bess-include"
                      checked={loiForm.bessIncluded}
                      onChange={(e) => setLoiForm({ ...loiForm, bessIncluded: e.target.checked })}
                      className="w-4 h-4 accent-green-600"
                    />
                    <label htmlFor="bess-include" className="text-sm font-medium text-gray-700">
                      Include Battery Storage (BESS) in project scope
                    </label>
                  </div>

                  {loiForm.bessIncluded && (
                    <div className="ml-7 mt-2">
                      <label className="text-sm font-medium text-gray-600 mb-1 block">Preferred LTSA Service Tier:</label>
                      <Select
                        value={loiForm.ltsaTier}
                        onValueChange={(v: 'A' | 'B' | 'C' | 'D') => setLoiForm({ ...loiForm, ltsaTier: v })}
                      >
                        <SelectTrigger className="max-w-md">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">Tier A — Basic Monitoring &amp; Maintenance (€1,158/MWh/yr)</SelectItem>
                          <SelectItem value="B">Tier B — Comprehensive O&amp;M (€2,470/MWh/yr)</SelectItem>
                          <SelectItem value="C">Tier C — Full Service + 97% Availability (€4,672/MWh/yr)</SelectItem>
                          <SelectItem value="D">Tier C — Premium + Availability Guarantee</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mt-3">
                    <input
                      type="checkbox"
                      id="financing-req"
                      checked={loiForm.financingRequired}
                      onChange={(e) => setLoiForm({ ...loiForm, financingRequired: e.target.checked })}
                      className="w-4 h-4 accent-green-600"
                    />
                    <label htmlFor="financing-req" className="text-sm font-medium text-gray-700">
                      Financing assistance required
                    </label>
                  </div>

                  <Textarea
                    className="mt-4"
                    placeholder="Special conditions or notes (optional, one per line)"
                    value={loiForm.conditions}
                    onChange={(e) => setLoiForm({ ...loiForm, conditions: e.target.value })}
                    rows={3}
                  />
                </div>

                {/* Action Buttons */}
                <div className="border-t pt-6 space-y-3">
                  <div className="grid md:grid-cols-2 gap-3">
                    <Button
                      size="lg"
                      className="w-full bg-cyan-600 hover:bg-cyan-700"
                      onClick={handleGenerateLOI}
                      disabled={loiGenerating || !loiForm.investorName || !loiForm.investorEmail || !loiForm.projectName}
                    >
                      <PenTool className="w-4 h-4 mr-2" />
                      {loiGenerating ? 'Generating...' : 'Generate LOI (Print & Sign)'}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-green-500 text-green-700 hover:bg-green-50"
                      onClick={handleDigitalSubmit}
                      disabled={loiSubmitting || !loiForm.investorName || !loiForm.investorEmail || !loiForm.projectName}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {loiSubmitting ? 'Submitting...' : 'Submit LOI Digitally'}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    <strong>Print &amp; Sign:</strong> Opens LOI in new window for printing, signing, and returning to office@lighthief.com
                    <br />
                    <strong>Submit Digitally:</strong> Sends your LOI directly to Lighthief Cyprus and opens a copy for your records
                  </p>
                  {loiGenerated && !loiSubmitted && (
                    <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3 text-center text-sm text-cyan-800">
                      <FileCheck className="w-4 h-4 inline mr-1" />
                      LOI generated and opened in new window. Print, sign, and email to <strong>office@lighthief.com</strong>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Print-only signature block */}
            <div className="hidden print:block mt-8 avoid-break">
              <div className="border-t-2 border-gray-800 pt-6">
                <h3 className="text-lg font-bold mb-6">SIGNATURE BLOCK</h3>
                <div className="grid grid-cols-2 gap-12">
                  <div>
                    <p className="font-semibold mb-8">For the Investor:</p>
                    <p className="border-b border-gray-400 mb-1 pb-6">Signature: </p>
                    <p className="border-b border-gray-400 mb-1 pb-6 mt-4">Name: </p>
                    <p className="border-b border-gray-400 mb-1 pb-6 mt-4">Date: </p>
                  </div>
                  <div>
                    <p className="font-semibold mb-8">For Lighthief Cyprus Ltd:</p>
                    <p className="border-b border-gray-400 mb-1 pb-6">Signature: </p>
                    <p className="border-b border-gray-400 mb-1 pb-6 mt-4">Name: </p>
                    <p className="border-b border-gray-400 mb-1 pb-6 mt-4">Date: </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* FOOTER / DISCLAIMER */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div className="border-t-2 border-cyan-500 pt-6 mt-12 text-center text-xs text-gray-400 avoid-break">
            <Image src="/logo/lighthief-logo.png" alt="Lighthief" width={120} height={30} className="mx-auto h-6 w-auto mb-3 opacity-50" />
            <p className="mb-1">
              &copy; {new Date().getFullYear()} Lighthief Cyprus Ltd. All rights reserved.
            </p>
            <p className="max-w-2xl mx-auto">
              This guide is for informational purposes only and does not constitute investment advice.
              Past performance is not indicative of future results. Consult with qualified financial
              and legal advisors before making investment decisions. Market data sourced from TSOC Cyprus
              Day-Ahead Market reports.
            </p>
          </div>

          {/* ── CTA (screen only) ──────────────────────────────────────── */}
          <div className="no-print mt-12 bg-gradient-to-r from-cyan-50 to-amber-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Invest?</h2>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Download this guide as PDF, explore live market data, or schedule a consultation with our Cyprus team.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button onClick={handleExportPDF} className="bg-cyprus-600 hover:bg-cyprus-700">
                <FileDown className="w-4 h-4 mr-2" /> Export as PDF
              </Button>
              <Link href="/market">
                <Button variant="outline"><BarChart3 className="w-4 h-4 mr-2" /> Live Market Data</Button>
              </Link>
              <Link href="/calculator">
                <Button variant="outline"><TrendingUp className="w-4 h-4 mr-2" /> ROI Calculator</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline"><Phone className="w-4 h-4 mr-2" /> Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Reusable Sub-Components ─────────────────────────────────────────────────

function SectionHeader({ number, title }: { number: number; title: string }) {
  return (
    <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-amber-400 pb-2">
      <span className="text-cyan-600">{number}.</span> {title}
    </h2>
  )
}

function StatCard({ value, label, color = 'gray' }: { value: string; label: string; color?: string }) {
  const colorMap: Record<string, string> = {
    gray: 'bg-gray-50 border-gray-200',
    cyan: 'bg-cyan-50 border-cyan-200',
    amber: 'bg-amber-50 border-amber-200',
    indigo: 'bg-indigo-50 border-indigo-200',
    red: 'bg-red-50 border-red-200',
    green: 'bg-green-50 border-green-200',
  }
  return (
    <div className={`${colorMap[color] || colorMap.gray} border rounded-lg p-4 text-center guide-card`}>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-600 mt-1">{label}</p>
    </div>
  )
}

function MiniStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 text-center">
      <div className="text-gray-500 flex justify-center mb-1">{icon}</div>
      <p className="text-sm font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  )
}

function HighlightBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-5 my-6 rounded-r-lg avoid-break">
      {children}
    </div>
  )
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-50 border-l-4 border-cyan-500 p-5 my-6 rounded-r-lg avoid-break">
      <div className="text-blue-900 text-sm">{children}</div>
    </div>
  )
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100 print:bg-gray-200">
            {headers.map((h, i) => (
              <th key={i} className="text-left py-2.5 px-3 font-semibold text-gray-700 border-b border-gray-300 text-xs">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
              {row.map((cell, j) => (
                <td key={j} className={`py-2 px-3 text-gray-700 ${j === 0 ? 'font-medium' : ''}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function RiskItem({
  level,
  title,
  description,
  mitigation,
}: {
  level: 'critical' | 'medium' | 'low'
  title: string
  description: string
  mitigation: string
}) {
  const levelConfig = {
    critical: { color: 'text-red-700 bg-red-50 border-red-200', badge: 'bg-red-100 text-red-800' },
    medium: { color: 'text-amber-700 bg-amber-50 border-amber-200', badge: 'bg-amber-100 text-amber-800' },
    low: { color: 'text-green-700 bg-green-50 border-green-200', badge: 'bg-green-100 text-green-800' },
  }
  const cfg = levelConfig[level]

  return (
    <div className={`${cfg.color} border rounded-lg p-4 avoid-break`}>
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
        <h4 className="font-semibold">{title}</h4>
        <Badge className={`${cfg.badge} text-xs ml-auto`}>{level.toUpperCase()}</Badge>
      </div>
      <p className="text-sm mb-2"><strong>Risk:</strong> {description}</p>
      <p className="text-sm"><strong>Mitigation:</strong> {mitigation}</p>
    </div>
  )
}

function ProcessPhase({
  phase,
  title,
  timeline,
  steps,
}: {
  phase: number
  title: string
  timeline: string
  steps: string[]
}) {
  return (
    <div className="avoid-break border border-gray-200 rounded-lg p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
          {phase}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">Phase {phase}: {title}</h4>
          <p className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {timeline}</p>
        </div>
      </div>
      <ol className="text-gray-700 text-sm space-y-1 list-decimal pl-12">
        {steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  )
}
