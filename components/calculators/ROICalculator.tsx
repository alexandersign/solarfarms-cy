'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { INVESTMENT_SIZES, CYPRUS_SOLAR_DATA, FINANCING_OPTIONS } from '@/lib/constants'
import { calculateROI, calculateNPV, formatCurrency, formatPercentage } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { trackEvent } from '@/components/analytics/GoogleAnalytics'

type InvestmentSize = keyof typeof INVESTMENT_SIZES

interface CalculatorResults {
  investment: number
  annualRevenue: number
  annualProfit: number
  roi: number
  paybackYears: number
  npv25: number
  monthlyProfit: number
  breakEvenMonth: number
  cashInvested: number
  loanAmount: number
  annualLoanPayment: number
  financingType: string
}

export function ROICalculator() {
  const [selectedSize, setSelectedSize] = useState<InvestmentSize>('5MW')
  const [customInvestment, setCustomInvestment] = useState(0)
  const [electricityRate, setElectricityRate] = useState([0.15])
  const [operatingCosts, setOperatingCosts] = useState([8]) // Percentage of revenue
  const [financingOption, setFinancingOption] = useState('CASH')
  const [results, setResults] = useState<CalculatorResults | null>(null)
  const [showResults, setShowResults] = useState(false)

  const sizeData = INVESTMENT_SIZES[selectedSize]

  const calculateResults = useCallback(() => {
    const totalInvestment = customInvestment > 0 ? customInvestment : 
      (sizeData.minInvestment + sizeData.maxInvestment) / 2
    
    // Track calculator usage
    trackEvent('calculator_calculation', 'ROI Calculator', selectedSize, totalInvestment)

    // Calculate capacity first (needed for financing calculations)
    const capacityMW = selectedSize === '1MW' ? 1 : selectedSize === '5MW' ? 5 : 10

    // Get financing details
    const financing = FINANCING_OPTIONS[financingOption as keyof typeof FINANCING_OPTIONS]
    
    // Calculate financing structure based on option type
    let downPayment = 0
    let loanAmount = 0
    
    if (financingOption === 'CASH') {
      downPayment = totalInvestment
      loanAmount = 0
    } else if (financingOption === 'SOLAR_ONLY' && 'maxDebtPerMW' in financing) {
      // Solar-only: Cap at €500k/MW
      const maxDebt = financing.maxDebtPerMW * capacityMW
      loanAmount = Math.min(maxDebt, totalInvestment)
      downPayment = totalInvestment - loanAmount
    } else if (financingOption === 'SOLAR_BESS' && 'downPayment' in financing && 'loanAmount' in financing) {
      // Solar+BESS: Up to 70% financing
      downPayment = totalInvestment * (financing.downPayment / 100)
      loanAmount = totalInvestment * (financing.loanAmount / 100)
    } else {
      // Fallback for any other options
      downPayment = totalInvestment
      loanAmount = 0
    }
    
    // Calculate annual energy production (MW * capacity factor * hours per year)
    const capacityFactor = 0.22 // Cyprus average capacity factor
    const annualEnergyMWh = capacityMW * capacityFactor * 8760 // hours per year
    
    // Calculate revenue
    const annualRevenue = annualEnergyMWh * electricityRate[0] * 1000 // Convert to €

    // Calculate operating costs
    const annualOperatingCosts = annualRevenue * (operatingCosts[0] / 100)
    
    // Calculate loan payments (if financed)
    let annualLoanPayment = 0
    if (loanAmount > 0 && financing.loanTermYears > 0) {
      const monthlyRate = financing.interestRate / 100 / 12
      const numPayments = financing.loanTermYears * 12
      const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                            (Math.pow(1 + monthlyRate, numPayments) - 1)
      annualLoanPayment = monthlyPayment * 12
    }
    
    // Calculate net profit after all costs
    const annualProfit = annualRevenue - annualOperatingCosts - annualLoanPayment
    
    // Calculate metrics based on actual cash invested (down payment)
    const cashInvested = downPayment
    const roi = (annualProfit / cashInvested) * 100
    const paybackYears = cashInvested / annualProfit
    const npv25 = calculateNPV(cashInvested, annualProfit, 0.08, 25)
    const monthlyProfit = annualProfit / 12
    const breakEvenMonth = Math.ceil(paybackYears * 12)

    setResults({
      investment: totalInvestment,
      annualRevenue,
      annualProfit,
      roi,
      paybackYears,
      npv25,
      monthlyProfit,
      breakEvenMonth,
      // Add financing details
      cashInvested,
      loanAmount,
      annualLoanPayment,
      financingType: financing.name,
    })
  }, [selectedSize, customInvestment, electricityRate, operatingCosts, financingOption, sizeData])

  useEffect(() => {
    calculateResults()
  }, [selectedSize, customInvestment, electricityRate, operatingCosts, financingOption, calculateResults])

  const handleCalculate = () => {
    setShowResults(true)
    // Track analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_used', {
        event_category: 'engagement',
        event_label: selectedSize,
        value: results?.investment || 0
      })
    }
  }

  const handleDownloadReport = () => {
    if (!results) return
    
    // Generate HTML report
    const reportHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Solar Investment ROI Report - ${selectedSize} Farm</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
          .header { text-align: center; border-bottom: 3px solid #0ea5e9; padding-bottom: 20px; margin-bottom: 30px; }
          .header h1 { color: #0ea5e9; margin: 0; }
          .header p { color: #666; margin: 10px 0 0 0; }
          .section { margin: 30px 0; }
          .section h2 { color: #333; border-bottom: 2px solid #f59e0b; padding-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          td { padding: 12px; border-bottom: 1px solid #ddd; }
          td:first-child { font-weight: bold; width: 50%; }
          td:last-child { text-align: right; color: #0ea5e9; font-weight: bold; }
          .highlight { background: #fef3c7; padding: 20px; border-left: 4px solid #f59e0b; margin: 20px 0; }
          .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #0ea5e9; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Solar Farm Investment ROI Report</h1>
          <p>SolarFarms.cy - ${selectedSize} Solar Farm | ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="section">
          <h2>Investment Summary</h2>
          <table>
            <tr><td>Investment Size</td><td>${selectedSize} Solar Farm</td></tr>
            <tr><td>Total Project Cost</td><td>${formatCurrency(results.investment)}</td></tr>
            <tr><td>Financing Type</td><td>${results.financingType}</td></tr>
            <tr><td>Cash Required</td><td>${formatCurrency(results.cashInvested)}</td></tr>
            ${results.loanAmount > 0 ? `
              <tr><td>Bank Financing</td><td>${formatCurrency(results.loanAmount)}</td></tr>
              <tr><td>Annual Loan Payment</td><td>${formatCurrency(results.annualLoanPayment)}</td></tr>
            ` : ''}
          </table>
        </div>
        
        <div class="highlight">
          <h3 style="margin: 0 0 15px 0; color: #92400e;">Key Investment Metrics</h3>
          <table style="margin: 0;">
            <tr><td>Annual ROI on Cash Invested</td><td style="font-size: 24px; color: #10b981;">${formatPercentage(results.roi)}</td></tr>
            <tr><td>Payback Period</td><td>${results.paybackYears.toFixed(1)} years</td></tr>
            <tr><td>Break-even Month</td><td>Month ${results.breakEvenMonth}</td></tr>
            <tr><td>25-Year NPV</td><td>${formatCurrency(results.npv25)}</td></tr>
          </table>
        </div>
        
        <div class="section">
          <h2>Financial Performance</h2>
          <table>
            <tr><td>Annual Revenue</td><td>${formatCurrency(results.annualRevenue)}</td></tr>
            <tr><td>Annual Profit (after all costs)</td><td>${formatCurrency(results.annualProfit)}</td></tr>
            <tr><td>Monthly Profit</td><td>${formatCurrency(results.monthlyProfit)}</td></tr>
          </table>
        </div>
        
        <div class="section">
          <h2>Investment Highlights - Cyprus Solar Advantages</h2>
          <ul>
            <li>Europe's sunniest climate with 3,300+ sun hours annually</li>
            <li>Stable EU regulatory framework with long-term guarantees</li>
            <li>Professional O&M services from Lighthief Cyprus</li>
            <li>Strategic location with excellent grid infrastructure</li>
            <li>25-year performance warranties on all equipment</li>
          </ul>
        </div>
        
        <div class="footer">
          <p><strong>LIGHTHIEF CYPRUS LTD</strong><br>
          28 October Ave 249, Lophitis Business Center 1, Office 201, 3035 Limassol, Cyprus<br>
          Email: office@lighthief.com | Phone: +357 77 77 00 50<br>
          www.solarfarms.cy</p>
          
          <p style="margin-top: 15px; font-size: 10px;">
            This report is for informational purposes only and does not constitute investment advice. 
            Actual returns may vary based on market conditions, operational performance, and other factors.
          </p>
        </div>
      </body>
      </html>
    `
    
    // Open in new window for printing/saving as PDF
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(reportHTML)
      printWindow.document.close()
      printWindow.focus()
      
      // Auto-trigger print dialog after a short delay
      setTimeout(() => {
        printWindow.print()
      }, 500)
    }
    
    // Track analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'report_downloaded', {
        event_category: 'conversion',
        event_label: selectedSize,
        value: results?.investment || 0
      })
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-heading gradient-text">
            Solar Farm ROI Calculator
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Calculate your potential returns from Cyprus solar farm investments
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Investment Size Selection */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Select Investment Size</h3>
            <Tabs value={selectedSize} onValueChange={(value) => setSelectedSize(value as InvestmentSize)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="1MW" className="text-sm">1MW Farm</TabsTrigger>
                <TabsTrigger value="5MW" className="text-sm">
                  5MW Farm
                  <Badge variant="secondary" className="ml-2 text-xs">Popular</Badge>
                </TabsTrigger>
                <TabsTrigger value="10MW" className="text-sm">10MW Farm</TabsTrigger>
              </TabsList>

              <TabsContent value="1MW" className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Investment</div>
                    <div className="font-semibold">{formatCurrency(sizeData.minInvestment)} - {formatCurrency(sizeData.maxInvestment)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Annual Revenue</div>
                    <div className="font-semibold">{formatCurrency(sizeData.minRevenue)} - {formatCurrency(sizeData.maxRevenue)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">ROI Range</div>
                    <div className="font-semibold text-green-600">{sizeData.minROI}% - {sizeData.maxROI}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Payback</div>
                    <div className="font-semibold">{sizeData.minPayback} - {sizeData.maxPayback} years</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="5MW" className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Investment</div>
                    <div className="font-semibold">{formatCurrency(sizeData.minInvestment)} - {formatCurrency(sizeData.maxInvestment)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Annual Revenue</div>
                    <div className="font-semibold">{formatCurrency(sizeData.minRevenue)} - {formatCurrency(sizeData.maxRevenue)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">ROI Range</div>
                    <div className="font-semibold text-green-600">{sizeData.minROI}% - {sizeData.maxROI}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Payback</div>
                    <div className="font-semibold">{sizeData.minPayback} - {sizeData.maxPayback} years</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="10MW" className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Investment</div>
                    <div className="font-semibold">{formatCurrency(sizeData.minInvestment)} - {formatCurrency(sizeData.maxInvestment)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Annual Revenue</div>
                    <div className="font-semibold">{formatCurrency(sizeData.minRevenue)} - {formatCurrency(sizeData.maxRevenue)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">ROI Range</div>
                    <div className="font-semibold text-green-600">{sizeData.minROI}% - {sizeData.maxROI}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Payback</div>
                    <div className="font-semibold">{sizeData.minPayback} - {sizeData.maxPayback} years</div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Advanced Parameters */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Electricity Rate (€/kWh)</h3>
              <div className="space-y-4">
                <Slider
                  value={electricityRate}
                  onValueChange={setElectricityRate}
                  max={0.35}
                  min={0.10}
                  step={0.01}
                  className="w-full"
                  aria-label="Electricity rate slider"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>€0.10</span>
                  <span className="font-semibold">€{electricityRate[0].toFixed(3)}/kWh</span>
                  <span>€0.35</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Operating Costs (% of Revenue)</h3>
              <div className="space-y-4">
                <Slider
                  value={operatingCosts}
                  onValueChange={setOperatingCosts}
                  max={20}
                  min={5}
                  step={0.5}
                  className="w-full"
                  aria-label="Operating costs percentage slider"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>5%</span>
                  <span className="font-semibold">{operatingCosts[0]}%</span>
                  <span>20%</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Financing Option</h3>
              <div className="space-y-4">
            <Select value={financingOption} onValueChange={setFinancingOption}>
              <SelectTrigger aria-label="Select financing option">
                <SelectValue placeholder="Select financing option" />
              </SelectTrigger>
                  <SelectContent>
                    {Object.entries(FINANCING_OPTIONS).map(([key, option]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex flex-col">
                          <span className="font-medium">{option.name}</span>
                          <span className="text-xs text-gray-500">{option.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {financingOption !== 'CASH' && (
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Interest Rate: {FINANCING_OPTIONS[financingOption as keyof typeof FINANCING_OPTIONS].interestRate}%</div>
                    <div>Loan Term: {FINANCING_OPTIONS[financingOption as keyof typeof FINANCING_OPTIONS].loanTermYears} years</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <div className="text-center">
            <Button 
              onClick={handleCalculate}
              size="xl"
              variant="gradient"
              className="px-12 py-4 text-lg font-semibold"
            >
              Calculate ROI & Generate Report
            </Button>
          </div>

          {/* Results Display */}
          {showResults && results && (
            <div className="mt-12 space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-heading font-bold mb-4">Your Investment Results</h3>
                <p className="text-gray-600">Based on {selectedSize} solar farm in Cyprus</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold gradient-text mb-2">
                      {formatPercentage(results.roi)}
                    </div>
                    <div className="text-sm text-gray-600">Annual ROI</div>
                    <div className="text-xs text-gray-500">On cash invested</div>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold gradient-text mb-2">
                      {results.paybackYears.toFixed(1)} yrs
                    </div>
                    <div className="text-sm text-gray-600">Payback Period</div>
                    <div className="text-xs text-gray-500">Cash investment</div>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold gradient-text mb-2">
                      {formatCurrency(results.annualProfit)}
                    </div>
                    <div className="text-sm text-gray-600">Annual Profit</div>
                    <div className="text-xs text-gray-500">After all costs</div>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold gradient-text mb-2">
                      {formatCurrency(results.cashInvested)}
                    </div>
                    <div className="text-sm text-gray-600">Cash Required</div>
                    <div className="text-xs text-gray-500">{results.financingType}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Investment Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Investment Structure</h4>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Project Cost</span>
                        <span className="font-semibold">{formatCurrency(results.investment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cash Investment</span>
                        <span className="font-semibold text-blue-600">{formatCurrency(results.cashInvested)}</span>
                      </div>
                      {results.loanAmount > 0 && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Bank Financing</span>
                            <span className="font-semibold">{formatCurrency(results.loanAmount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Annual Loan Payment</span>
                            <span className="font-semibold text-red-600">{formatCurrency(results.annualLoanPayment)}</span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600">Financing Type</span>
                        <span className="font-semibold">{results.financingType}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Financial Performance</h4>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Annual Revenue</span>
                        <span className="font-semibold">{formatCurrency(results.annualRevenue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Annual Profit</span>
                        <span className="font-semibold text-green-600">{formatCurrency(results.annualProfit)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Profit</span>
                        <span className="font-semibold text-green-600">{formatCurrency(results.monthlyProfit)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Break-even Month</span>
                        <span className="font-semibold">{results.breakEvenMonth}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600">25-Year NPV</span>
                        <span className="font-semibold text-green-600">{formatCurrency(results.npv25)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleDownloadReport}
                  variant="solar"
                  size="lg"
                  className="px-8"
                >
                  Download PDF Report
                </Button>
                <Button 
                  variant="cyprus"
                  size="lg"
                  className="px-8"
                >
                  Schedule Consultation
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
