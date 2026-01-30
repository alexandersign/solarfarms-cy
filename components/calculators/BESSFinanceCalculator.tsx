'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Battery,
  Sun,
  TrendingUp,
  Euro,
  Zap,
  Calculator,
  Download,
  Settings,
  BarChart3,
  PieChart,
  Wallet,
  Building2,
  HelpCircle,
  CheckCircle,
  AlertTriangle,
  Clock,
  Lock,
  Timer,
  Save,
  FolderOpen,
  Trash2,
  Users,
  Loader2,
} from 'lucide-react'
import { formatCurrency, formatPercentage } from '@/lib/utils'
import {
  BESSCalculatorInputs,
  BESSCalculatorResults,
  BESS_CALCULATOR_DEFAULTS,
  CalculatorMode,
  HourlyPriceCurve,
} from '@/lib/calc/bess-finance'
import {
  calculateBESSFinancials,
  generateCashFlowChartData,
  generateEnergyChartData,
  generateDegradationChartData,
  generateRevenueChartData,
} from '@/lib/calc/bess-finance/calculations'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart as RechartsPie,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'
import { trackEvent } from '@/components/analytics/GoogleAnalytics'

// ============================================
// TYPES
// ============================================

interface SavedScenario {
  id: string
  project_name: string
  scenario_name: string
  mode: string
  inputs: BESSCalculatorInputs
  results?: BESSCalculatorResults
  created_at: string
  updated_at: string
}

// ============================================
// HELPER COMPONENTS
// ============================================

function FormTooltip({ text }: { text: string }) {
  return (
    <span className="group relative inline-block ml-1">
      <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help inline" />
      <span className="invisible group-hover:visible absolute z-50 w-64 p-2 text-xs text-white bg-gray-800 rounded-lg -top-2 left-6 shadow-lg">
        {text}
      </span>
    </span>
  )
}

function FormField({
  label,
  tooltip,
  children,
  className = '',
}: {
  label: string
  tooltip?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm font-medium text-gray-700 flex items-center">
        {label}
        {tooltip && <FormTooltip text={tooltip} />}
      </Label>
      {children}
    </div>
  )
}

function KPICard({
  label,
  value,
  subtext,
  icon: Icon,
  color = 'blue',
}: {
  label: string
  value: string
  subtext?: string
  icon: React.ElementType
  color?: 'blue' | 'green' | 'orange' | 'purple'
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600',
  }

  return (
    <div className="text-center p-4 bg-white rounded-xl shadow-sm border">
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${colorClasses[color]} mb-2`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
      {subtext && <div className="text-xs text-gray-400 mt-1">{subtext}</div>}
    </div>
  )
}

// ============================================
// EMAIL GATE MODAL
// ============================================

function EmailGateModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (email: string) => void
}) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    onSubmit(email)
    setIsSubmitting(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle>Download Your BESS Analysis</CardTitle>
          <CardDescription>
            Enter your email to receive the detailed PDF report
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="gradient"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Get PDF Report'}
              </Button>
            </div>
            <p className="text-xs text-gray-500 text-center">
              We&apos;ll also send you updates on BESS opportunities in Cyprus.
              You can unsubscribe anytime.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================
// CHART COMPONENTS
// ============================================

const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']

function CashFlowChart({ data }: { data: ReturnType<typeof generateCashFlowChartData> }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data.slice(0, 15)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value: number) => formatCurrency(value)}
          labelFormatter={(label) => `Year ${label}`}
        />
        <Legend />
        <Bar dataKey="revenue" name="Revenue" fill="#10b981" />
        <Bar dataKey="opex" name="OPEX" fill="#f59e0b" />
        <Bar dataKey="netCashFlow" name="Net Cash Flow" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  )
}

function DegradationChart({ data }: { data: ReturnType<typeof generateDegradationChartData> }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
        <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value: number) => `${value.toFixed(1)}%`}
          labelFormatter={(label) => `Year ${label}`}
        />
        <Area
          type="monotone"
          dataKey="capacityPercent"
          name="Battery Capacity"
          stroke="#8b5cf6"
          fill="#c4b5fd"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function RevenueBreakdownChart({ data }: { data: ReturnType<typeof generateRevenueChartData> }) {
  if (data.length === 0) return null

  return (
    <ResponsiveContainer width="100%" height={250}>
      <RechartsPie>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percentage }) => `${name}: ${percentage.toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || CHART_COLORS[index % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => formatCurrency(value)} />
      </RechartsPie>
    </ResponsiveContainer>
  )
}

// Hourly Price Curve Chart
function HourlyPriceCurveChart({ 
  data, 
  chargeHours, 
  dischargeHours 
}: { 
  data: HourlyPriceCurve[]
  chargeHours: number[]
  dischargeHours: number[]
}) {
  const chartData = data.map((d) => ({
    hour: `${d.hour.toString().padStart(2, '0')}:00`,
    hourNum: d.hour,
    buyPrice: d.buyPrice,
    sellPrice: d.sellPrice,
    isCharge: chargeHours.includes(d.hour),
    isDischarge: dischargeHours.includes(d.hour),
  }))

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="hour" 
          tick={{ fontSize: 10 }} 
          interval={2}
        />
        <YAxis 
          tickFormatter={(v) => `€${v}`} 
          tick={{ fontSize: 11 }} 
          domain={[0, 'dataMax + 20']}
        />
        <Tooltip
          formatter={(value: number, name: string) => [`€${value}/MWh`, name === 'buyPrice' ? 'Buy Price' : 'Sell Price']}
          labelFormatter={(label) => `Hour: ${label}`}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="buyPrice"
          name="Buy Price"
          stroke="#3b82f6"
          fill="#93c5fd"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="sellPrice"
          name="Sell Price"
          stroke="#10b981"
          fill="#6ee7b7"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// Hourly dispatch visualization
function HourlyDispatchChart({ 
  chargeHours, 
  dischargeHours 
}: { 
  chargeHours: number[]
  dischargeHours: number[]
}) {
  const hours = Array.from({ length: 24 }, (_, i) => i)
  
  return (
    <div className="grid grid-cols-24 gap-0.5 mt-4">
      {hours.map((hour) => {
        const isCharge = chargeHours.includes(hour)
        const isDischarge = dischargeHours.includes(hour)
        let bgClass = 'bg-gray-200'
        let label = ''
        
        if (isCharge) {
          bgClass = 'bg-blue-500'
          label = '⚡'
        } else if (isDischarge) {
          bgClass = 'bg-green-500'
          label = '💰'
        }
        
        return (
          <div
            key={hour}
            className={`h-8 ${bgClass} rounded-sm flex items-center justify-center text-xs text-white`}
            title={`${hour}:00 - ${isCharge ? 'Charging' : isDischarge ? 'Discharging' : 'Idle'}`}
          >
            {label}
          </div>
        )
      })}
      <div className="col-span-24 flex justify-between text-xs text-gray-500 mt-1">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>24:00</span>
      </div>
    </div>
  )
}

// Investor Waterfall Chart
function InvestorWaterfallChart({ 
  results,
  inputs 
}: { 
  results: BESSCalculatorResults
  inputs: BESSCalculatorInputs
}) {
  // Calculate waterfall distribution
  const { investors } = inputs
  const totalEquity = results.summary.equityRequired
  const totalDistributions = results.summary.lifetimeProfit
  const preferredReturn = investors.preferredReturn / 100
  const catchUpPercent = investors.catchUpPercent / 100
  const profitSplit = investors.profitSplitDeveloper / 100
  
  // Calculate preferred return hurdle
  const preferredHurdle = totalEquity * preferredReturn * inputs.project.forecastYears
  
  // Waterfall tiers
  const returnOfCapital = Math.min(totalDistributions, totalEquity)
  const remainingAfterCapital = Math.max(0, totalDistributions - returnOfCapital)
  
  const preferredDistribution = Math.min(remainingAfterCapital, preferredHurdle)
  const remainingAfterPreferred = Math.max(0, remainingAfterCapital - preferredDistribution)
  
  const catchUpAmount = Math.min(remainingAfterPreferred, preferredDistribution * (catchUpPercent / (1 - catchUpPercent)))
  const remainingAfterCatchUp = Math.max(0, remainingAfterPreferred - catchUpAmount)
  
  const developerProfit = remainingAfterCatchUp * profitSplit
  const investorProfit = remainingAfterCatchUp * (1 - profitSplit)
  
  const waterfallData = [
    { name: 'Return of Capital', investor: returnOfCapital, developer: 0, color: '#6366f1' },
    { name: 'Preferred Return', investor: preferredDistribution, developer: 0, color: '#8b5cf6' },
    { name: 'Catch-Up', investor: 0, developer: catchUpAmount, color: '#f59e0b' },
    { name: 'Profit Split', investor: investorProfit, developer: developerProfit, color: '#10b981' },
  ].filter(d => d.investor > 0 || d.developer > 0)
  
  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={waterfallData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            type="number" 
            tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`}
            tick={{ fontSize: 11 }}
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            tick={{ fontSize: 11 }}
            width={100}
          />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
          />
          <Legend />
          <Bar dataKey="investor" name="Investor" stackId="a" fill="#6366f1" />
          <Bar dataKey="developer" name="Developer" stackId="a" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
      
      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 bg-indigo-50 rounded-lg">
          <div className="text-gray-600">Investor Total</div>
          <div className="font-bold text-indigo-700">
            {formatCurrency(returnOfCapital + preferredDistribution + investorProfit)}
          </div>
        </div>
        <div className="p-3 bg-amber-50 rounded-lg">
          <div className="text-gray-600">Developer Total</div>
          <div className="font-bold text-amber-700">
            {formatCurrency(catchUpAmount + developerProfit)}
          </div>
        </div>
      </div>
    </div>
  )
}

// Scenario Save Modal
function ScenarioSaveModal({
  isOpen,
  onClose,
  onSave,
  projectName,
  isSaving,
}: {
  isOpen: boolean
  onClose: () => void
  onSave: (email: string, scenarioName: string) => void
  projectName: string
  isSaving: boolean
}) {
  const [email, setEmail] = useState('')
  const [scenarioName, setScenarioName] = useState('Base Case')
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Save className="w-5 h-5 text-blue-600" />
          Save Scenario
        </h3>
        
        <div className="space-y-4">
          <div>
            <Label>Your Email</Label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">Used to retrieve your scenarios later</p>
          </div>
          
          <div>
            <Label>Scenario Name</Label>
            <Input
              placeholder="e.g., Base Case, High Price, Conservative"
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
            />
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Project</div>
            <div className="font-medium">{projectName || 'Untitled Project'}</div>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={() => onSave(email, scenarioName)}
            disabled={!email || !scenarioName || isSaving}
            className="flex-1 gap-2"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Scenario Load Modal
function ScenarioLoadModal({
  isOpen,
  onClose,
  onLoad,
  onDelete,
}: {
  isOpen: boolean
  onClose: () => void
  onLoad: (scenario: SavedScenario) => void
  onDelete: (id: string) => void
}) {
  const [email, setEmail] = useState('')
  const [scenarios, setScenarios] = useState<SavedScenario[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  
  const fetchScenarios = async () => {
    if (!email) return
    setIsLoading(true)
    try {
      const res = await fetch(`/api/bess-calculator/scenarios?email=${encodeURIComponent(email)}`)
      const data = await res.json()
      if (data.success) {
        setScenarios(data.scenarios || [])
      }
    } catch {
      // Error fetching
    }
    setIsLoading(false)
    setHasSearched(true)
  }
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 shadow-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-blue-600" />
          Load Scenario
        </h3>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email to find scenarios"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchScenarios()}
              className="flex-1"
            />
            <Button onClick={fetchScenarios} disabled={!email || isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
            </Button>
          </div>
          
          <div className="overflow-y-auto max-h-64 space-y-2">
            {scenarios.length > 0 ? (
              scenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className="p-3 border rounded-lg hover:bg-gray-50 flex items-center justify-between group"
                >
                  <div className="flex-1 cursor-pointer" onClick={() => onLoad(scenario)}>
                    <div className="font-medium">{scenario.project_name}</div>
                    <div className="text-sm text-gray-500">
                      {scenario.scenario_name} • {scenario.mode === 'solar_bess' ? 'Solar+BESS' : 'Standalone'}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(scenario.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
                    onClick={() => onDelete(scenario.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            ) : hasSearched ? (
              <div className="text-center py-8 text-gray-500">
                No scenarios found for this email
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                Enter your email and click Search
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-3 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

// ============================================
// MAIN CALCULATOR COMPONENT
// ============================================

export function BESSFinanceCalculator() {
  // State
  const [inputs, setInputs] = useState<BESSCalculatorInputs>(BESS_CALCULATOR_DEFAULTS)
  const [results, setResults] = useState<BESSCalculatorResults | null>(null)
  const [activeTab, setActiveTab] = useState('project')
  const [showEmailGate, setShowEmailGate] = useState(false)
  const [pdfUnlocked, setPdfUnlocked] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  
  // Scenario management state
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showLoadModal, setShowLoadModal] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [currentScenarioId, setCurrentScenarioId] = useState<string | null>(null)

  // Update input helper
  const updateInput = useCallback(<
    Section extends keyof BESSCalculatorInputs,
    Key extends keyof BESSCalculatorInputs[Section]
  >(
    section: Section,
    key: Key,
    value: BESSCalculatorInputs[Section][Key]
  ) => {
    setInputs((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }))
  }, [])

  // Mode toggle handler
  const handleModeChange = useCallback((mode: CalculatorMode) => {
    setInputs((prev) => ({
      ...prev,
      project: { ...prev.project, mode },
      solar: { ...prev.solar, enabled: mode === 'solar_bess' },
    }))
  }, [])

  // Save scenario handler
  const handleSaveScenario = useCallback(async (email: string, scenarioName: string) => {
    setIsSaving(true)
    try {
      const res = await fetch('/api/bess-calculator/scenarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          projectName: inputs.project.projectName,
          scenarioName,
          mode: inputs.project.mode,
          inputs,
          results,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setCurrentScenarioId(data.scenario.id)
        setShowSaveModal(false)
        trackEvent('bess_scenario_save', 'Calculator', scenarioName)
      }
    } catch {
      // Error saving
    }
    setIsSaving(false)
  }, [inputs, results])

  // Load scenario handler
  const handleLoadScenario = useCallback((scenario: SavedScenario) => {
    setInputs(scenario.inputs)
    setCurrentScenarioId(scenario.id)
    setShowLoadModal(false)
    trackEvent('bess_scenario_load', 'Calculator', scenario.scenario_name)
  }, [])

  // Delete scenario handler
  const handleDeleteScenario = useCallback(async (id: string) => {
    try {
      await fetch(`/api/bess-calculator/scenarios/${id}`, {
        method: 'DELETE',
      })
      // Refresh will happen when user searches again
    } catch {
      // Error deleting
    }
  }, [])

  // Auto-calculate BESS power from capacity and duration
  useEffect(() => {
    const power = inputs.battery.capacityMWh / inputs.battery.durationHours
    if (power !== inputs.battery.powerMW) {
      updateInput('battery', 'powerMW', power)
    }
  }, [inputs.battery.capacityMWh, inputs.battery.durationHours, inputs.battery.powerMW, updateInput])

  // Auto-calculate BESS system cost
  useEffect(() => {
    const cost = inputs.battery.capacityMWh * inputs.capex.bessCostPerMWh
    if (cost !== inputs.capex.bessSystemCost) {
      updateInput('capex', 'bessSystemCost', cost)
    }
  }, [inputs.battery.capacityMWh, inputs.capex.bessCostPerMWh, inputs.capex.bessSystemCost, updateInput])

  // Run calculations
  const runCalculations = useCallback(() => {
    setIsCalculating(true)
    
    // Use setTimeout to avoid blocking UI
    setTimeout(() => {
      try {
        const calculatedResults = calculateBESSFinancials(inputs)
        setResults(calculatedResults)
        trackEvent('bess_calculator_run', 'Calculator', inputs.project.mode, inputs.battery.capacityMWh)
      } catch {
        // Calculation error - results will remain null
      }
      setIsCalculating(false)
    }, 50)
  }, [inputs])

  // Auto-recalculate on input changes (debounced)
  useEffect(() => {
    const timer = setTimeout(runCalculations, 300)
    return () => clearTimeout(timer)
  }, [runCalculations])

  // Chart data (memoized)
  const cashFlowChartData = useMemo(
    () => (results ? generateCashFlowChartData(results) : []),
    [results]
  )

  const degradationChartData = useMemo(
    () => (results ? generateDegradationChartData(results) : []),
    [results]
  )

  const revenueChartData = useMemo(
    () => (results ? generateRevenueChartData(results) : []),
    [results]
  )

  // PDF generation
  const handlePDFDownload = () => {
    if (!pdfUnlocked) {
      setShowEmailGate(true)
      return
    }
    generatePDFReport()
  }

  const handleEmailSubmit = async (email: string) => {
    // Track lead
    trackEvent('bess_calculator_pdf_unlock', 'Lead', email)
    
    // Call API to record the unlock and send emails
    try {
      await fetch('/api/bess-calculator/unlock-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          projectName: inputs.project.projectName || 'BESS Project',
          bessCapacity: inputs.battery.capacityMWh,
          mode: inputs.project.mode,
        }),
      })
    } catch {
      // Non-blocking, continue anyway
    }
    
    setPdfUnlocked(true)
    setShowEmailGate(false)
    
    // Generate PDF
    setTimeout(generatePDFReport, 100)
  }

  const generatePDFReport = () => {
    if (!results) return

    const reportHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>BESS Investment Analysis - ${inputs.project.projectName || 'Untitled'}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1f2937; line-height: 1.6; }
    .page { max-width: 210mm; margin: 0 auto; background: white; padding: 40px; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #f59e0b; padding-bottom: 20px; margin-bottom: 30px; }
    .logo { font-size: 28px; font-weight: bold; }
    .logo span { background: linear-gradient(135deg, #f59e0b 0%, #0284c7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    h1 { font-size: 24px; color: #1f2937; margin-bottom: 10px; }
    h2 { font-size: 18px; color: #f59e0b; margin: 25px 0 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
    .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin: 20px 0; }
    .kpi { text-align: center; background: #f3f4f6; padding: 15px; border-radius: 8px; }
    .kpi-value { font-size: 24px; font-weight: bold; color: #10b981; }
    .kpi-label { font-size: 12px; color: #6b7280; margin-top: 5px; }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 13px; }
    th { background: #f3f4f6; padding: 10px; text-align: left; font-weight: 600; }
    td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
    td:last-child { text-align: right; }
    .highlight { background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; }
    .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #f59e0b; font-size: 11px; color: #6b7280; }
    @media print { body { background: white; } .page { box-shadow: none; } }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="logo">Solar<span>Farms</span>.cy</div>
      <div style="text-align: right; font-size: 12px; color: #6b7280;">
        <div>BESS Investment Analysis</div>
        <div>${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
      </div>
    </div>

    <h1>${inputs.project.projectName || 'BESS Investment'} - Financial Analysis</h1>
    <p style="color: #6b7280; margin-bottom: 20px;">
      ${inputs.battery.capacityMWh} MWh / ${inputs.battery.powerMW.toFixed(1)} MW | 
      ${inputs.battery.durationHours}-hour duration | 
      ${inputs.project.mode === 'solar_bess' ? 'Solar + BESS' : 'Standalone BESS'}
    </p>

    <div class="highlight">
      <h3 style="margin-bottom: 15px; color: #065f46;">Executive Summary</h3>
      <div class="kpi-grid">
        <div class="kpi">
          <div class="kpi-value">${formatCurrency(results.summary.totalCapex)}</div>
          <div class="kpi-label">Total CAPEX</div>
        </div>
        <div class="kpi">
          <div class="kpi-value">${results.summary.equityIrr.toFixed(1)}%</div>
          <div class="kpi-label">Equity IRR</div>
        </div>
        <div class="kpi">
          <div class="kpi-value">${results.summary.paybackYears.toFixed(1)} yrs</div>
          <div class="kpi-label">Payback</div>
        </div>
        <div class="kpi">
          <div class="kpi-value">${results.summary.equityMultiple.toFixed(2)}x</div>
          <div class="kpi-label">Equity Multiple</div>
        </div>
      </div>
    </div>

    <h2>Investment Structure</h2>
    <table>
      <tr><td>Total CAPEX</td><td>${formatCurrency(results.summary.totalCapex)}</td></tr>
      <tr><td>Equity Required</td><td>${formatCurrency(results.summary.equityRequired)}</td></tr>
      <tr><td>Debt Financing (${inputs.financing.ltvPercent}% LTV)</td><td>${formatCurrency(results.summary.debtAmount)}</td></tr>
      <tr><td>Interest Rate</td><td>${inputs.financing.interestRate}%</td></tr>
      <tr><td>Loan Term</td><td>${inputs.financing.loanTermYears} years</td></tr>
    </table>

    <h2>Revenue Projections (Year 1)</h2>
    <table>
      <tr><td>Annual Revenue</td><td>${formatCurrency(results.summary.year1Revenue)}</td></tr>
      <tr><td>Annual OPEX</td><td>${formatCurrency(results.summary.year1Opex)}</td></tr>
      <tr><td>EBITDA</td><td>${formatCurrency(results.summary.year1Ebitda)}</td></tr>
      <tr><td>Net Profit</td><td>${formatCurrency(results.summary.year1NetProfit)}</td></tr>
    </table>

    <h2>Key Returns</h2>
    <table>
      <tr><td>Project IRR (Unlevered)</td><td>${results.summary.projectIrr.toFixed(1)}%</td></tr>
      <tr><td>Equity IRR (Levered)</td><td>${results.summary.equityIrr.toFixed(1)}%</td></tr>
      <tr><td>NPV (${inputs.project.discountRate}% discount)</td><td>${formatCurrency(results.summary.npv)}</td></tr>
      <tr><td>Cash-on-Cash Return (Year 1)</td><td>${formatPercentage(results.summary.cashOnCashReturn)}</td></tr>
      <tr><td>Average DSCR</td><td>${results.summary.dscr.toFixed(2)}x</td></tr>
    </table>

    <h2>Battery System</h2>
    <table>
      <tr><td>Capacity</td><td>${inputs.battery.capacityMWh} MWh</td></tr>
      <tr><td>Power Rating</td><td>${inputs.battery.powerMW.toFixed(1)} MW</td></tr>
      <tr><td>Duration</td><td>${inputs.battery.durationHours} hours</td></tr>
      <tr><td>Round-Trip Efficiency</td><td>${inputs.battery.roundTripEfficiency}%</td></tr>
      <tr><td>Annual Degradation</td><td>${inputs.battery.annualDegradation}%</td></tr>
      <tr><td>Warranty</td><td>${inputs.battery.warrantyYears} years</td></tr>
    </table>

    ${results.checks.warnings.length > 0 ? `
    <div class="warning">
      <h3 style="margin-bottom: 10px; color: #92400e;">Warnings</h3>
      <ul style="margin-left: 20px;">
        ${results.checks.warnings.map(w => `<li>${w}</li>`).join('')}
      </ul>
    </div>
    ` : ''}

    <div class="footer">
      <p><strong>Disclaimer:</strong> This analysis is for informational purposes only. Actual returns may vary based on market conditions, operational performance, and other factors.</p>
      <p style="margin-top: 10px;"><strong>Lighthief Cyprus Ltd</strong> | www.solarfarms.cy | office@lighthief.com</p>
    </div>
  </div>
</body>
</html>
    `

    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(reportHTML)
      printWindow.document.close()
      printWindow.focus()
    }
  }

  return (
    <div className="w-full">
      <Card className="shadow-xl border-0 bg-white">
        <CardHeader className="text-center pb-4 border-b bg-gradient-to-r from-solar-50 via-amber-50 to-cyprus-50">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Battery className="w-8 h-8 text-solar-500" />
            <CardTitle className="text-2xl font-heading">
              <span className="bg-gradient-to-r from-solar-500 to-cyprus-600 bg-clip-text text-transparent">
                BESS Finance Calculator
              </span>
            </CardTitle>
          </div>
          <CardDescription className="text-base text-gray-600">
            Professional-grade battery storage investment analysis for <span className="font-semibold text-cyprus-600">SolarFarms.cy</span>
          </CardDescription>

          {/* Mode Toggle */}
          <div className="flex justify-center gap-4 mt-4">
            <Button
              variant={inputs.project.mode === 'standalone' ? 'default' : 'outline'}
              onClick={() => handleModeChange('standalone')}
              className="gap-2"
            >
              <Battery className="w-4 h-4" />
              Standalone BESS
            </Button>
            <Button
              variant={inputs.project.mode === 'solar_bess' ? 'default' : 'outline'}
              onClick={() => handleModeChange('solar_bess')}
              className="gap-2"
            >
              <Sun className="w-4 h-4" />
              Solar + BESS
            </Button>
          </div>
          
          {/* Scenario Management */}
          <div className="flex justify-center gap-2 mt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSaveModal(true)}
              className="gap-1 text-gray-600"
            >
              <Save className="w-4 h-4" />
              Save
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLoadModal(true)}
              className="gap-1 text-gray-600"
            >
              <FolderOpen className="w-4 h-4" />
              Load
            </Button>
            {currentScenarioId && (
              <Badge variant="outline" className="text-xs">
                Saved
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Input Sections */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-7 mb-6">
                  <TabsTrigger value="project" className="text-xs">
                    <Settings className="w-3 h-3 mr-1" />
                    Project
                  </TabsTrigger>
                  <TabsTrigger value="battery" className="text-xs">
                    <Battery className="w-3 h-3 mr-1" />
                    Battery
                  </TabsTrigger>
                  <TabsTrigger value="revenue" className="text-xs">
                    <Euro className="w-3 h-3 mr-1" />
                    Revenue
                  </TabsTrigger>
                  <TabsTrigger value="costs" className="text-xs">
                    <Wallet className="w-3 h-3 mr-1" />
                    Costs
                  </TabsTrigger>
                  <TabsTrigger value="finance" className="text-xs">
                    <Building2 className="w-3 h-3 mr-1" />
                    Finance
                  </TabsTrigger>
                  <TabsTrigger value="hourly" className="text-xs">
                    <Timer className="w-3 h-3 mr-1" />
                    Hourly
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="text-xs">
                    <Settings className="w-3 h-3 mr-1" />
                    Advanced
                  </TabsTrigger>
                </TabsList>

                {/* Project Tab */}
                <TabsContent value="project" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField label="Project Name" tooltip="Name for your investment report">
                      <Input
                        value={inputs.project.projectName}
                        onChange={(e) => updateInput('project', 'projectName', e.target.value)}
                        placeholder="e.g., Cyprus BESS Project"
                      />
                    </FormField>

                    <FormField label="Project Lifetime" tooltip="Total investment horizon in years">
                      <Select
                        value={inputs.project.forecastYears.toString()}
                        onValueChange={(v) => updateInput('project', 'forecastYears', parseInt(v))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 years</SelectItem>
                          <SelectItem value="20">20 years</SelectItem>
                          <SelectItem value="25">25 years</SelectItem>
                          <SelectItem value="30">30 years</SelectItem>
                          <SelectItem value="35">35 years</SelectItem>
                          <SelectItem value="40">40 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>

                    <FormField label="Discount Rate (WACC)" tooltip="Rate used for NPV calculations">
                      <div className="flex items-center gap-2">
                        <Slider
                          value={[inputs.project.discountRate]}
                          onValueChange={([v]) => updateInput('project', 'discountRate', v)}
                          min={5}
                          max={15}
                          step={0.5}
                          className="flex-1"
                        />
                        <span className="w-16 text-right font-medium">{inputs.project.discountRate}%</span>
                      </div>
                    </FormField>

                    <FormField label="Inflation Rate" tooltip="Annual inflation for cost escalation">
                      <div className="flex items-center gap-2">
                        <Slider
                          value={[inputs.project.inflationRate]}
                          onValueChange={([v]) => updateInput('project', 'inflationRate', v)}
                          min={0}
                          max={5}
                          step={0.5}
                          className="flex-1"
                        />
                        <span className="w-16 text-right font-medium">{inputs.project.inflationRate}%</span>
                      </div>
                    </FormField>
                  </div>

                  {/* Solar inputs (conditional) */}
                  {inputs.project.mode === 'solar_bess' && (
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <h3 className="font-semibold text-yellow-800 mb-4 flex items-center gap-2">
                        <Sun className="w-5 h-5" />
                        Solar PV Configuration
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField label="PV Capacity (MWp)" tooltip="Installed DC capacity">
                          <Input
                            type="number"
                            step="0.1"
                            value={inputs.solar.pvCapacityMWp}
                            onChange={(e) => updateInput('solar', 'pvCapacityMWp', parseFloat(e.target.value) || 0)}
                          />
                        </FormField>

                        <FormField label="Annual Yield (kWh/kWp)" tooltip="Specific yield - Cyprus avg: 1,650">
                          <Input
                            type="number"
                            value={inputs.solar.annualYieldKwhKwp}
                            onChange={(e) => updateInput('solar', 'annualYieldKwhKwp', parseFloat(e.target.value) || 0)}
                          />
                        </FormField>

                        <FormField label="Curtailment Rate (%)" tooltip="Grid curtailment - Cyprus avg: 25-30%">
                          <div className="flex items-center gap-2">
                            <Slider
                              value={[inputs.solar.curtailmentRate]}
                              onValueChange={([v]) => updateInput('solar', 'curtailmentRate', v)}
                              min={0}
                              max={60}
                              step={1}
                              className="flex-1"
                            />
                            <span className="w-16 text-right font-medium">{inputs.solar.curtailmentRate}%</span>
                          </div>
                        </FormField>

                        <FormField label="Recovery via BESS (%)" tooltip="% of curtailed energy recoverable">
                          <div className="flex items-center gap-2">
                            <Slider
                              value={[inputs.solar.curtailmentRecoveryRate]}
                              onValueChange={([v]) => updateInput('solar', 'curtailmentRecoveryRate', v)}
                              min={20}
                              max={80}
                              step={5}
                              className="flex-1"
                            />
                            <span className="w-16 text-right font-medium">{inputs.solar.curtailmentRecoveryRate}%</span>
                          </div>
                        </FormField>
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* Battery Tab */}
                <TabsContent value="battery" className="space-y-4">
                  {/* Battery Use Mode */}
                  <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
                    <FormField 
                      label="Battery Use Mode" 
                      tooltip="How the battery gets charged - affects revenue calculation"
                      className="mb-0"
                    >
                      <Select
                        value={inputs.battery.useMode}
                        onValueChange={(v) => updateInput('battery', 'useMode', v as 'excess_production' | 'solar_only' | 'price_arbitrage')}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="price_arbitrage">Price Arbitrage (Buy Low, Sell High)</SelectItem>
                          <SelectItem value="solar_only">Solar Only (Charge from Solar)</SelectItem>
                          <SelectItem value="excess_production">Excess Production (Curtailment Only)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500 mt-2">
                        {inputs.battery.useMode === 'price_arbitrage' && 'Battery can charge from grid when prices are low, enabling trading profits.'}
                        {inputs.battery.useMode === 'solar_only' && 'Battery only charges from solar production, no grid purchases.'}
                        {inputs.battery.useMode === 'excess_production' && 'Battery only stores excess/curtailed solar energy.'}
                      </p>
                    </FormField>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField label="Battery Capacity (MWh)" tooltip="Total energy storage capacity">
                      <Input
                        type="number"
                        step="0.5"
                        value={inputs.battery.capacityMWh}
                        onChange={(e) => updateInput('battery', 'capacityMWh', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>

                    <FormField label="Duration (Hours)" tooltip="Discharge duration at rated power">
                      <Select
                        value={inputs.battery.durationHours.toString()}
                        onValueChange={(v) => updateInput('battery', 'durationHours', parseInt(v))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2-hour</SelectItem>
                          <SelectItem value="3">3-hour</SelectItem>
                          <SelectItem value="4">4-hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>

                    <FormField label="Power Rating" tooltip="Calculated from capacity / duration">
                      <div className="p-3 bg-gray-100 rounded-lg text-center font-semibold">
                        {inputs.battery.powerMW.toFixed(2)} MW
                      </div>
                    </FormField>

                    <FormField label="Round-Trip Efficiency (%)" tooltip="Linyang LFP system RTE: 87.8% AC-AC">
                      <div className="flex items-center gap-2">
                        <Slider
                          value={[inputs.battery.roundTripEfficiency]}
                          onValueChange={([v]) => updateInput('battery', 'roundTripEfficiency', v)}
                          min={80}
                          max={95}
                          step={0.1}
                          className="flex-1"
                        />
                        <span className="w-16 text-right font-medium">{inputs.battery.roundTripEfficiency}%</span>
                      </div>
                    </FormField>

                    <FormField label="Daily Cycles" tooltip="Full equivalent cycles per day">
                      <div className="flex items-center gap-2">
                        <Slider
                          value={[inputs.battery.dailyCycles]}
                          onValueChange={([v]) => updateInput('battery', 'dailyCycles', v)}
                          min={0.5}
                          max={2}
                          step={0.1}
                          className="flex-1"
                        />
                        <span className="w-16 text-right font-medium">{inputs.battery.dailyCycles}</span>
                      </div>
                    </FormField>

                    <FormField label="Annual Degradation (%)" tooltip="Capacity loss per year">
                      <div className="flex items-center gap-2">
                        <Slider
                          value={[inputs.battery.annualDegradation]}
                          onValueChange={([v]) => updateInput('battery', 'annualDegradation', v)}
                          min={1}
                          max={5}
                          step={0.1}
                          className="flex-1"
                        />
                        <span className="w-16 text-right font-medium">{inputs.battery.annualDegradation}%</span>
                      </div>
                    </FormField>

                    <FormField label="Availability (%)" tooltip="Uptime guarantee - 97% with LTSA">
                      <div className="flex items-center gap-2">
                        <Slider
                          value={[inputs.battery.availability]}
                          onValueChange={([v]) => updateInput('battery', 'availability', v)}
                          min={90}
                          max={99}
                          step={1}
                          className="flex-1"
                        />
                        <span className="w-16 text-right font-medium">{inputs.battery.availability}%</span>
                      </div>
                    </FormField>

                    <FormField label="Warranty Period" tooltip="Manufacturer warranty years">
                      <Select
                        value={inputs.battery.warrantyYears.toString()}
                        onValueChange={(v) => updateInput('battery', 'warrantyYears', parseInt(v))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 years</SelectItem>
                          <SelectItem value="15">15 years</SelectItem>
                          <SelectItem value="20">20 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>
                  </div>

                  {/* Fading Model Section */}
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 mt-4">
                    <h4 className="font-medium text-purple-800 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Capacity Fading Model
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField label="Degradation Model" tooltip="How battery capacity declines over time">
                        <Select
                          value={inputs.battery.fadingModelType}
                          onValueChange={(v) => updateInput('battery', 'fadingModelType', v as typeof inputs.battery.fadingModelType)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="constant">Constant (Linear)</SelectItem>
                            <SelectItem value="low_acceleration">Low Acceleration</SelectItem>
                            <SelectItem value="medium_acceleration">Medium Acceleration</SelectItem>
                            <SelectItem value="high_acceleration">High Acceleration</SelectItem>
                            <SelectItem value="constant_recycling">Constant + Recycling</SelectItem>
                            <SelectItem value="low_acceleration_recycling">Low Acceleration + Recycling</SelectItem>
                            <SelectItem value="medium_acceleration_recycling">Medium Acceleration + Recycling</SelectItem>
                            <SelectItem value="high_acceleration_recycling">High Acceleration + Recycling</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormField>

                      <FormField label="Base Fade Rate (%/year)" tooltip="Annual capacity loss percentage">
                        <div className="flex items-center gap-2">
                          <Slider
                            value={[inputs.battery.baseFadeRate]}
                            onValueChange={([v]) => updateInput('battery', 'baseFadeRate', v)}
                            min={0.5}
                            max={5}
                            step={0.1}
                            className="flex-1"
                          />
                          <span className="w-16 text-right font-medium">{inputs.battery.baseFadeRate}%</span>
                        </div>
                      </FormField>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {inputs.battery.fadingModelType.includes('recycling') 
                        ? 'Recycling models restore capacity periodically, reducing long-term degradation impact.'
                        : 'Acceleration models increase degradation rate over time, simulating real-world aging.'}
                    </p>
                  </div>
                </TabsContent>

                {/* Revenue Tab */}
                <TabsContent value="revenue" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField label="Daytime Price (€/MWh)" tooltip="Wholesale price during low-price hours">
                      <Input
                        type="number"
                        value={inputs.revenue.dayPrice}
                        onChange={(e) => updateInput('revenue', 'dayPrice', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>

                    <FormField label="Evening Peak Price (€/MWh)" tooltip="Price during high-demand hours">
                      <Input
                        type="number"
                        value={inputs.revenue.nightPrice}
                        onChange={(e) => updateInput('revenue', 'nightPrice', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>

                    <FormField label="Arbitrage Spread (€/MWh)" tooltip="Difference between buy and sell prices">
                      <div className="p-3 bg-green-50 rounded-lg text-center font-semibold text-green-700">
                        €{(inputs.revenue.nightPrice - inputs.revenue.dayPrice).toFixed(0)}/MWh
                      </div>
                    </FormField>

                    <FormField label="Price Escalation (%/year)" tooltip="Annual increase in electricity prices">
                      <div className="flex items-center gap-2">
                        <Slider
                          value={[inputs.revenue.priceEscalation]}
                          onValueChange={([v]) => updateInput('revenue', 'priceEscalation', v)}
                          min={0}
                          max={5}
                          step={0.5}
                          className="flex-1"
                        />
                        <span className="w-16 text-right font-medium">{inputs.revenue.priceEscalation}%</span>
                      </div>
                    </FormField>
                  </div>

                  {inputs.project.mode === 'solar_bess' && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-3">Solar Revenue Settings</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField label="Solar Selling Rate (€/kWh)" tooltip="Merchant rate for solar sales">
                          <Input
                            type="number"
                            step="0.01"
                            value={inputs.revenue.solarSellingRate}
                            onChange={(e) => updateInput('revenue', 'solarSellingRate', parseFloat(e.target.value) || 0)}
                          />
                        </FormField>

                        <FormField label="Curtailment Compensation (€/kWh)" tooltip="Rate paid for curtailed energy">
                          <Input
                            type="number"
                            step="0.001"
                            value={inputs.revenue.curtailedEnergyRate}
                            onChange={(e) => updateInput('revenue', 'curtailedEnergyRate', parseFloat(e.target.value) || 0)}
                          />
                        </FormField>
                      </div>
                    </div>
                  )}

                  {/* REC (Renewable Energy Certificates) */}
                  {inputs.project.mode === 'solar_bess' && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-green-800">Renewable Energy Certificates (REC)</h4>
                        <Switch
                          checked={inputs.revenue.recEnabled}
                          onCheckedChange={(v) => updateInput('revenue', 'recEnabled', v)}
                        />
                      </div>
                      {inputs.revenue.recEnabled && (
                        <div className="grid md:grid-cols-3 gap-4">
                          <FormField label="REC Rate (€/kWh)" tooltip="Premium per kWh for RECs">
                            <Input
                              type="number"
                              step="0.01"
                              value={inputs.revenue.recRate}
                              onChange={(e) => updateInput('revenue', 'recRate', parseFloat(e.target.value) || 0)}
                            />
                          </FormField>
                          <FormField label="REC Duration (years)" tooltip="How long RECs are available">
                            <Input
                              type="number"
                              value={inputs.revenue.recDuration}
                              onChange={(e) => updateInput('revenue', 'recDuration', parseInt(e.target.value) || 0)}
                            />
                          </FormField>
                          <FormField label="REC Escalation (%/yr)" tooltip="Annual increase in REC price">
                            <Input
                              type="number"
                              step="0.5"
                              value={inputs.revenue.recEscalation}
                              onChange={(e) => updateInput('revenue', 'recEscalation', parseFloat(e.target.value) || 0)}
                            />
                          </FormField>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Grid Services */}
                  <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-medium text-amber-800 mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Grid Services Revenue
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField label="Frequency Regulation (€/MW/yr)" tooltip="Revenue from frequency response">
                        <Input
                          type="number"
                          step="100"
                          value={inputs.revenue.frequencyRegulation}
                          onChange={(e) => updateInput('revenue', 'frequencyRegulation', parseFloat(e.target.value) || 0)}
                        />
                      </FormField>
                      <FormField label="Capacity Payment (€/MW/yr)" tooltip="Payment for available capacity">
                        <Input
                          type="number"
                          step="100"
                          value={inputs.revenue.capacityPayment}
                          onChange={(e) => updateInput('revenue', 'capacityPayment', parseFloat(e.target.value) || 0)}
                        />
                      </FormField>
                    </div>
                  </div>
                </TabsContent>

                {/* Costs Tab */}
                <TabsContent value="costs" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField label="BESS Cost (€/MWh)" tooltip="Cost per MWh installed. Default €137k/MWh is Non-Group pricing. Group clients: ~€122k/MWh">
                      <Input
                        type="number"
                        step="1000"
                        value={inputs.capex.bessCostPerMWh}
                        onChange={(e) => updateInput('capex', 'bessCostPerMWh', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>

                    <FormField label="Total BESS CAPEX" tooltip="Calculated from capacity × cost">
                      <div className="p-3 bg-gray-100 rounded-lg text-center font-semibold">
                        {formatCurrency(inputs.capex.bessSystemCost)}
                      </div>
                    </FormField>

                    {inputs.project.mode === 'solar_bess' && (
                      <>
                        <FormField label="PV Cost (€/MWp)" tooltip="Turnkey PV cost per MWp">
                          <Input
                            type="number"
                            step="10000"
                            value={inputs.capex.pvCostPerMWp}
                            onChange={(e) => updateInput('capex', 'pvCostPerMWp', parseFloat(e.target.value) || 0)}
                          />
                        </FormField>

                        <FormField label="Total PV CAPEX" tooltip="Calculated from capacity × cost">
                          <div className="p-3 bg-gray-100 rounded-lg text-center font-semibold">
                            {formatCurrency(inputs.solar.pvCapacityMWp * inputs.capex.pvCostPerMWp)}
                          </div>
                        </FormField>
                      </>
                    )}

                    <FormField label="Contingency (%)" tooltip="Percentage added for unforeseen costs">
                      <div className="flex items-center gap-2">
                        <Slider
                          value={[inputs.capex.contingency]}
                          onValueChange={([v]) => updateInput('capex', 'contingency', v)}
                          min={0}
                          max={15}
                          step={1}
                          className="flex-1"
                        />
                        <span className="w-16 text-right font-medium">{inputs.capex.contingency}%</span>
                      </div>
                    </FormField>

                    <FormField label="Grid Connection (€)" tooltip="Grid connection costs">
                      <Input
                        type="number"
                        step="10000"
                        value={inputs.capex.gridConnection}
                        onChange={(e) => updateInput('capex', 'gridConnection', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-3">Operating Costs (OPEX)</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField label="BESS O&M (€/MWh/year)" tooltip="Annual maintenance per MWh">
                        <Input
                          type="number"
                          value={inputs.opex.bessOmBasic}
                          onChange={(e) => updateInput('opex', 'bessOmBasic', parseFloat(e.target.value) || 0)}
                        />
                      </FormField>

                      <FormField label="Insurance (% of CAPEX)" tooltip="Annual insurance premium">
                        <div className="flex items-center gap-2">
                          <Slider
                            value={[inputs.opex.insurance]}
                            onValueChange={([v]) => updateInput('opex', 'insurance', v)}
                            min={0.2}
                            max={1.5}
                            step={0.1}
                            className="flex-1"
                          />
                          <span className="w-16 text-right font-medium">{inputs.opex.insurance}%</span>
                        </div>
                      </FormField>

                      <FormField label="Land Lease (€/year)" tooltip="Annual land rental">
                        <Input
                          type="number"
                          value={inputs.opex.landLease}
                          onChange={(e) => updateInput('opex', 'landLease', parseFloat(e.target.value) || 0)}
                        />
                      </FormField>

                      <FormField label="Administration (€/year)" tooltip="Management and admin costs">
                        <Input
                          type="number"
                          value={inputs.opex.administration}
                          onChange={(e) => updateInput('opex', 'administration', parseFloat(e.target.value) || 0)}
                        />
                      </FormField>
                    </div>
                  </div>
                </TabsContent>

                {/* Finance Tab */}
                <TabsContent value="finance" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField label="Loan-to-Value (LTV %)" tooltip="Percentage of CAPEX financed by debt">
                      <div className="flex items-center gap-2">
                        <Slider
                          value={[inputs.financing.ltvPercent]}
                          onValueChange={([v]) => updateInput('financing', 'ltvPercent', v)}
                          min={0}
                          max={80}
                          step={5}
                          className="flex-1"
                        />
                        <span className="w-16 text-right font-medium">{inputs.financing.ltvPercent}%</span>
                      </div>
                    </FormField>

                    <FormField label="Interest Rate (%)" tooltip="Annual loan interest rate">
                      <div className="flex items-center gap-2">
                        <Slider
                          value={[inputs.financing.interestRate]}
                          onValueChange={([v]) => updateInput('financing', 'interestRate', v)}
                          min={3}
                          max={8}
                          step={0.25}
                          className="flex-1"
                        />
                        <span className="w-16 text-right font-medium">{inputs.financing.interestRate}%</span>
                      </div>
                    </FormField>

                    <FormField label="Loan Term (years)" tooltip="Repayment period">
                      <Select
                        value={inputs.financing.loanTermYears.toString()}
                        onValueChange={(v) => updateInput('financing', 'loanTermYears', parseInt(v))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 years</SelectItem>
                          <SelectItem value="12">12 years</SelectItem>
                          <SelectItem value="15">15 years</SelectItem>
                          <SelectItem value="18">18 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>

                    <FormField label="Min DSCR Covenant" tooltip="Minimum debt service coverage ratio">
                      <div className="flex items-center gap-2">
                        <Slider
                          value={[inputs.financing.minDscr]}
                          onValueChange={([v]) => updateInput('financing', 'minDscr', v)}
                          min={1}
                          max={1.5}
                          step={0.05}
                          className="flex-1"
                        />
                        <span className="w-16 text-right font-medium">{inputs.financing.minDscr}x</span>
                      </div>
                    </FormField>
                  </div>

                  {results && (
                    <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-800 mb-3">Financing Summary</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="text-sm text-gray-600">Total CAPEX</div>
                          <div className="font-bold">{formatCurrency(results.summary.totalCapex)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Debt</div>
                          <div className="font-bold">{formatCurrency(results.summary.debtAmount)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Equity Required</div>
                          <div className="font-bold text-purple-600">{formatCurrency(results.summary.equityRequired)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Avg DSCR</div>
                          <div className={`font-bold ${results.summary.dscr >= inputs.financing.minDscr ? 'text-green-600' : 'text-red-600'}`}>
                            {results.summary.dscr.toFixed(2)}x
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* Hourly Model Tab */}
                <TabsContent value="hourly" className="space-y-4">
                  {/* Hourly Toggle */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                    <div className="flex items-center gap-3">
                      <Timer className="w-6 h-6 text-indigo-600" />
                      <div>
                        <div className="font-semibold">Enable Hourly Analysis</div>
                        <div className="text-sm text-gray-600">
                          Detailed 24-hour price curve optimization
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={inputs.hourly.enabled}
                      onCheckedChange={(v) => updateInput('hourly', 'enabled', v)}
                    />
                  </div>

                  {inputs.hourly.enabled ? (
                    <div className="space-y-6">
                      {/* Price Curve Chart */}
                      <div className="p-4 bg-white border rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-indigo-600" />
                          24-Hour Price Curve
                        </h4>
                        <p className="text-sm text-gray-500 mb-4">
                          Visualize buy/sell prices throughout the day. Charge during low prices, discharge during high prices.
                        </p>
                        <HourlyPriceCurveChart 
                          data={inputs.hourly.priceCurve}
                          chargeHours={inputs.hourly.chargeHours}
                          dischargeHours={inputs.hourly.dischargeHours}
                        />
                      </div>

                      {/* Dispatch Schedule */}
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">Battery Dispatch Schedule</h4>
                        <div className="flex gap-4 text-sm mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-blue-500 rounded" />
                            <span>Charging</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded" />
                            <span>Discharging</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gray-200 rounded" />
                            <span>Idle</span>
                          </div>
                        </div>
                        <HourlyDispatchChart 
                          chargeHours={inputs.hourly.chargeHours}
                          dischargeHours={inputs.hourly.dischargeHours}
                        />
                      </div>

                      {/* Price Presets */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField label="Price Profile Preset" tooltip="Quick presets for common Cyprus market conditions">
                          <Select
                            value="custom"
                            onValueChange={(preset) => {
                              if (preset === 'cyprus-summer') {
                                // Summer: high midday solar, charge 10-15, discharge 18-22
                                const newCurve = Array.from({ length: 24 }, (_, i) => ({
                                  hour: i,
                                  buyPrice: i >= 10 && i <= 15 ? 70 : i >= 18 && i <= 22 ? 180 : 100,
                                  sellPrice: i >= 10 && i <= 15 ? 80 : i >= 18 && i <= 22 ? 190 : 110,
                                }))
                                setInputs(prev => ({
                                  ...prev,
                                  hourly: {
                                    ...prev.hourly,
                                    priceCurve: newCurve,
                                    chargeHours: [10, 11, 12, 13, 14, 15],
                                    dischargeHours: [18, 19, 20, 21, 22],
                                  }
                                }))
                              } else if (preset === 'cyprus-winter') {
                                // Winter: less solar, morning/evening peaks
                                const newCurve = Array.from({ length: 24 }, (_, i) => ({
                                  hour: i,
                                  buyPrice: i >= 11 && i <= 14 ? 90 : (i >= 7 && i <= 9) || (i >= 17 && i <= 21) ? 150 : 100,
                                  sellPrice: i >= 11 && i <= 14 ? 100 : (i >= 7 && i <= 9) || (i >= 17 && i <= 21) ? 160 : 110,
                                }))
                                setInputs(prev => ({
                                  ...prev,
                                  hourly: {
                                    ...prev.hourly,
                                    priceCurve: newCurve,
                                    chargeHours: [11, 12, 13, 14],
                                    dischargeHours: [17, 18, 19, 20, 21],
                                  }
                                }))
                              } else if (preset === 'arbitrage-max') {
                                // Maximum arbitrage: deep valley, high peak
                                const newCurve = Array.from({ length: 24 }, (_, i) => ({
                                  hour: i,
                                  buyPrice: i >= 11 && i <= 15 ? 50 : i >= 18 && i <= 21 ? 200 : 100,
                                  sellPrice: i >= 11 && i <= 15 ? 60 : i >= 18 && i <= 21 ? 210 : 110,
                                }))
                                setInputs(prev => ({
                                  ...prev,
                                  hourly: {
                                    ...prev.hourly,
                                    priceCurve: newCurve,
                                    chargeHours: [11, 12, 13, 14, 15],
                                    dischargeHours: [18, 19, 20, 21],
                                  }
                                }))
                              }
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select preset or customize" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="custom">Custom (Edit Below)</SelectItem>
                              <SelectItem value="cyprus-summer">Cyprus Summer Peak</SelectItem>
                              <SelectItem value="cyprus-winter">Cyprus Winter Peak</SelectItem>
                              <SelectItem value="arbitrage-max">Maximum Arbitrage</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormField>

                        <FormField label="Arbitrage Spread" tooltip="Difference between buy (low) and sell (high) prices">
                          <div className="p-3 bg-green-50 rounded-lg text-center">
                            <div className="text-sm text-gray-600">Estimated Daily Spread</div>
                            <div className="text-xl font-bold text-green-600">
                              €{(
                                Math.max(...inputs.hourly.priceCurve.map(p => p.sellPrice)) -
                                Math.min(...inputs.hourly.priceCurve.map(p => p.buyPrice))
                              ).toFixed(0)}/MWh
                            </div>
                          </div>
                        </FormField>
                      </div>

                      {/* Price Adjustment Sliders */}
                      <div className="p-4 bg-white border rounded-lg">
                        <h4 className="font-medium mb-4">Adjust Key Hours</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField label="Low Price (Charging Hours)" tooltip="Price during solar peak / low demand">
                            <div className="flex items-center gap-2">
                              <Slider
                                value={[inputs.hourly.priceCurve[12]?.buyPrice || 80]}
                                onValueChange={([v]) => {
                                  const newCurve = inputs.hourly.priceCurve.map(p => ({
                                    ...p,
                                    buyPrice: inputs.hourly.chargeHours.includes(p.hour) ? v : p.buyPrice,
                                    sellPrice: inputs.hourly.chargeHours.includes(p.hour) ? v + 10 : p.sellPrice,
                                  }))
                                  setInputs(prev => ({ ...prev, hourly: { ...prev.hourly, priceCurve: newCurve } }))
                                }}
                                min={30}
                                max={150}
                                step={5}
                                className="flex-1"
                              />
                              <span className="w-20 text-right font-medium">€{inputs.hourly.priceCurve[12]?.buyPrice || 80}/MWh</span>
                            </div>
                          </FormField>

                          <FormField label="High Price (Discharge Hours)" tooltip="Price during evening peak demand">
                            <div className="flex items-center gap-2">
                              <Slider
                                value={[inputs.hourly.priceCurve[19]?.sellPrice || 170]}
                                onValueChange={([v]) => {
                                  const newCurve = inputs.hourly.priceCurve.map(p => ({
                                    ...p,
                                    buyPrice: inputs.hourly.dischargeHours.includes(p.hour) ? v - 10 : p.buyPrice,
                                    sellPrice: inputs.hourly.dischargeHours.includes(p.hour) ? v : p.sellPrice,
                                  }))
                                  setInputs(prev => ({ ...prev, hourly: { ...prev.hourly, priceCurve: newCurve } }))
                                }}
                                min={100}
                                max={250}
                                step={5}
                                className="flex-1"
                              />
                              <span className="w-20 text-right font-medium">€{inputs.hourly.priceCurve[19]?.sellPrice || 170}/MWh</span>
                            </div>
                          </FormField>
                        </div>
                      </div>

                      {/* Info Box */}
                      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-indigo-800">
                            <strong>Hourly Model Active</strong>
                            <p className="mt-1">
                              The calculator will optimize battery dispatch based on the hourly price curve, 
                              maximizing arbitrage revenue by charging during low-price hours and discharging 
                              during high-price hours.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center bg-gray-50 rounded-lg">
                      <Timer className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h4 className="font-medium text-gray-600 mb-2">Simplified Model Active</h4>
                      <p className="text-sm text-gray-500 max-w-md mx-auto">
                        The calculator uses monthly averages for price calculations. 
                        Enable hourly analysis for more precise arbitrage optimization 
                        based on 24-hour price curves.
                      </p>
                    </div>
                  )}
                </TabsContent>

                {/* Advanced Tab */}
                <TabsContent value="advanced" className="space-y-4">
                  {/* Consumption Modeling */}
                  <div className="p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-slate-800 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Consumption Modeling
                      </h4>
                      <Switch
                        checked={inputs.consumption?.enabled || false}
                        onCheckedChange={(v) => updateInput('consumption', 'enabled', v)}
                      />
                    </div>
                    {inputs.consumption?.enabled && (
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField label="Annual Consumption (kWh)" tooltip="Total annual electricity usage">
                          <Input
                            type="number"
                            value={inputs.consumption?.annualConsumptionKWh || 500000}
                            onChange={(e) => updateInput('consumption', 'annualConsumptionKWh', parseInt(e.target.value) || 0)}
                          />
                        </FormField>
                        <FormField label="Yearly Growth (%)" tooltip="Annual consumption growth rate">
                          <div className="flex items-center gap-2">
                            <Slider
                              value={[inputs.consumption?.yearlyGrowthRate || 1]}
                              onValueChange={([v]) => updateInput('consumption', 'yearlyGrowthRate', v)}
                              min={0}
                              max={5}
                              step={0.5}
                              className="flex-1"
                            />
                            <span className="w-16 text-right font-medium">{inputs.consumption?.yearlyGrowthRate || 1}%</span>
                          </div>
                        </FormField>
                      </div>
                    )}
                  </div>

                  {/* Tax Settings */}
                  <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-amber-800 flex items-center gap-2">
                        <Euro className="w-4 h-4" />
                        Tax Settings
                      </h4>
                      <Switch
                        checked={inputs.tax?.enabled !== false}
                        onCheckedChange={(v) => updateInput('tax', 'enabled', v)}
                      />
                    </div>
                    {inputs.tax?.enabled !== false && (
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField label="Corporate Tax Rate (%)" tooltip="Cyprus: 12.5%">
                          <div className="flex items-center gap-2">
                            <Slider
                              value={[inputs.tax?.corporateTaxRate || 12.5]}
                              onValueChange={([v]) => updateInput('tax', 'corporateTaxRate', v)}
                              min={0}
                              max={35}
                              step={0.5}
                              className="flex-1"
                            />
                            <span className="w-16 text-right font-medium">{inputs.tax?.corporateTaxRate || 12.5}%</span>
                          </div>
                        </FormField>
                        <FormField label="Tax Holiday (years)" tooltip="Years of tax exemption">
                          <Select
                            value={(inputs.tax?.taxHolidayYears || 0).toString()}
                            onValueChange={(v) => updateInput('tax', 'taxHolidayYears', parseInt(v))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">No tax holiday</SelectItem>
                              <SelectItem value="5">5 years</SelectItem>
                              <SelectItem value="10">10 years</SelectItem>
                              <SelectItem value="15">15 years</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormField>
                      </div>
                    )}
                  </div>

                  {/* Multi-Battery Configuration */}
                  <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-cyan-800 flex items-center gap-2">
                        <Battery className="w-4 h-4" />
                        Multi-Battery Configuration
                      </h4>
                      <Switch
                        checked={inputs.battery.multiBatteryEnabled}
                        onCheckedChange={(v) => updateInput('battery', 'multiBatteryEnabled', v)}
                      />
                    </div>
                    {inputs.battery.multiBatteryEnabled && (
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          Configure up to 5 independent battery units with different lifecycles and start dates.
                        </p>
                        <div className="grid gap-2">
                          {inputs.battery.batteries.slice(0, 5).map((unit, idx) => (
                            <div key={unit.id} className="flex items-center gap-3 p-2 bg-white rounded border">
                              <Switch
                                checked={unit.enabled}
                                onCheckedChange={(v) => {
                                  const newBatteries = [...inputs.battery.batteries]
                                  newBatteries[idx] = { ...unit, enabled: v }
                                  setInputs(prev => ({
                                    ...prev,
                                    battery: { ...prev.battery, batteries: newBatteries }
                                  }))
                                }}
                              />
                              <span className="text-sm font-medium flex-1">{unit.name}</span>
                              {unit.enabled && (
                                <>
                                  <Input
                                    type="number"
                                    className="w-24 h-8 text-sm"
                                    placeholder="kWh"
                                    value={unit.capacityKWh}
                                    onChange={(e) => {
                                      const newBatteries = [...inputs.battery.batteries]
                                      newBatteries[idx] = { ...unit, capacityKWh: parseFloat(e.target.value) || 0 }
                                      setInputs(prev => ({
                                        ...prev,
                                        battery: { ...prev.battery, batteries: newBatteries }
                                      }))
                                    }}
                                  />
                                  <span className="text-xs text-gray-500">kWh</span>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Multi-Phase Solar */}
                  {inputs.project.mode === 'solar_bess' && (
                    <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-yellow-800 flex items-center gap-2">
                          <Sun className="w-4 h-4" />
                          Multi-Phase Solar
                        </h4>
                        <Switch
                          checked={inputs.solar.multiPhaseEnabled}
                          onCheckedChange={(v) => updateInput('solar', 'multiPhaseEnabled', v)}
                        />
                      </div>
                      {inputs.solar.multiPhaseEnabled && (
                        <div className="space-y-3">
                          <p className="text-sm text-gray-600">
                            Configure up to 3 solar farm phases with independent capacities and timelines.
                          </p>
                          <div className="grid gap-2">
                            {inputs.solar.phases.slice(0, 3).map((phase, idx) => (
                              <div key={phase.id} className="flex items-center gap-3 p-2 bg-white rounded border">
                                <Switch
                                  checked={phase.enabled}
                                  onCheckedChange={(v) => {
                                    const newPhases = [...inputs.solar.phases]
                                    newPhases[idx] = { ...phase, enabled: v }
                                    setInputs(prev => ({
                                      ...prev,
                                      solar: { ...prev.solar, phases: newPhases }
                                    }))
                                  }}
                                />
                                <span className="text-sm font-medium flex-1">{phase.name}</span>
                                {phase.enabled && (
                                  <>
                                    <Input
                                      type="number"
                                      className="w-24 h-8 text-sm"
                                      placeholder="kWp"
                                      value={phase.capacityKWp}
                                      onChange={(e) => {
                                        const newPhases = [...inputs.solar.phases]
                                        newPhases[idx] = { ...phase, capacityKWp: parseFloat(e.target.value) || 0 }
                                        setInputs(prev => ({
                                          ...prev,
                                          solar: { ...prev.solar, phases: newPhases }
                                        }))
                                      }}
                                    />
                                    <span className="text-xs text-gray-500">kWp</span>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Investment Tax Credit (Optional) */}
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-green-800 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Investment Tax Credit (ITC)
                      </h4>
                      <Switch
                        checked={inputs.tax?.investmentTaxCreditEnabled || false}
                        onCheckedChange={(v) => updateInput('tax', 'investmentTaxCreditEnabled', v)}
                      />
                    </div>
                    {inputs.tax?.investmentTaxCreditEnabled && (
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField label="ITC Percentage (%)" tooltip="Percentage of CAPEX as tax credit">
                          <div className="flex items-center gap-2">
                            <Slider
                              value={[inputs.tax?.investmentTaxCreditPercent || 30]}
                              onValueChange={([v]) => updateInput('tax', 'investmentTaxCreditPercent', v)}
                              min={0}
                              max={50}
                              step={5}
                              className="flex-1"
                            />
                            <span className="w-16 text-right font-medium">{inputs.tax?.investmentTaxCreditPercent || 30}%</span>
                          </div>
                        </FormField>
                        <FormField label="ITC Validity (years)" tooltip="Years to claim the credit">
                          <Select
                            value={(inputs.tax?.investmentTaxCreditValidityYears || 5).toString()}
                            onValueChange={(v) => updateInput('tax', 'investmentTaxCreditValidityYears', parseInt(v))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Year 1 only</SelectItem>
                              <SelectItem value="3">3 years</SelectItem>
                              <SelectItem value="5">5 years</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormField>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right: Live Results */}
            <div className="space-y-4">
              <div className="sticky top-4 space-y-4">
                {/* KPI Summary */}
                <Card className="border-2 border-solar-200 bg-gradient-to-br from-solar-50 via-amber-50 to-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-solar-600" />
                      Investment Returns
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant={inputs.project.mode === 'solar_bess' ? 'default' : 'secondary'}>
                        {inputs.project.mode === 'solar_bess' ? 'Solar + BESS' : 'Standalone BESS'}
                      </Badge>
                      <Badge variant="outline">{inputs.battery.capacityMWh} MWh</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isCalculating ? (
                      <div className="text-center py-8 text-gray-500">
                        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2" />
                        Calculating...
                      </div>
                    ) : results ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <KPICard
                            label="Equity IRR"
                            value={`${results.summary.equityIrr.toFixed(1)}%`}
                            icon={TrendingUp}
                            color="green"
                          />
                          <KPICard
                            label="Payback"
                            value={`${results.summary.paybackYears.toFixed(1)} yrs`}
                            icon={Clock}
                            color="blue"
                          />
                          <KPICard
                            label="NPV"
                            value={formatCurrency(results.summary.npv)}
                            icon={Euro}
                            color="orange"
                          />
                          <KPICard
                            label="Multiple"
                            value={`${results.summary.equityMultiple.toFixed(2)}x`}
                            icon={BarChart3}
                            color="purple"
                          />
                        </div>

                        {/* LCOE if available */}
                        {results.summary.lcoe > 0 && (
                          <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                            <div className="flex items-center gap-2">
                              <Zap className="w-5 h-5 text-cyan-600" />
                              <span className="text-sm font-medium text-cyan-800">LCOE</span>
                            </div>
                            <span className="font-bold text-cyan-600">€{results.summary.lcoe.toFixed(2)}/MWh</span>
                          </div>
                        )}

                        {/* Financial summary */}
                        <div className="space-y-2 text-sm border-t pt-4">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total CAPEX</span>
                            <span className="font-semibold">{formatCurrency(results.summary.totalCapex)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Equity Required</span>
                            <span className="font-semibold text-blue-600">{formatCurrency(results.summary.equityRequired)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Year 1 Revenue</span>
                            <span className="font-semibold">{formatCurrency(results.summary.year1Revenue)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Year 1 EBITDA</span>
                            <span className="font-semibold text-green-600">{formatCurrency(results.summary.year1Ebitda)}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-gray-600">Cash-on-Cash (Y1)</span>
                            <span className="font-bold text-green-600">{formatPercentage(results.summary.cashOnCashReturn)}</span>
                          </div>
                        </div>

                        {/* Warnings */}
                        {results.checks.warnings.length > 0 && (
                          <div className="bg-yellow-50 p-3 rounded-lg text-xs">
                            <div className="flex items-center gap-2 text-yellow-800 font-medium mb-1">
                              <AlertTriangle className="w-4 h-4" />
                              Warnings
                            </div>
                            <ul className="list-disc list-inside text-yellow-700">
                              {results.checks.warnings.slice(0, 2).map((w, i) => (
                                <li key={i}>{w}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Download Button */}
                        <Button
                          onClick={handlePDFDownload}
                          variant="gradient"
                          className="w-full"
                          size="lg"
                        >
                          {pdfUnlocked ? (
                            <>
                              <Download className="w-4 h-4 mr-2" />
                              Download PDF Report
                            </>
                          ) : (
                            <>
                              <Lock className="w-4 h-4 mr-2" />
                              Unlock PDF Report
                            </>
                          )}
                        </Button>
                        <p className="text-xs text-gray-500 text-center">
                          {pdfUnlocked ? 'Opens printable report' : 'Enter email to access PDF'}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        Enter values to calculate returns
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          {results && (
            <div className="mt-8 space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Financial Projections
              </h2>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Cash Flow Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Annual Cash Flows (First 15 Years)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CashFlowChart data={cashFlowChartData} />
                  </CardContent>
                </Card>

                {/* Battery Degradation Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Battery Capacity Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DegradationChart data={degradationChartData} />
                  </CardContent>
                </Card>

                {/* Revenue Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Year 1 Revenue Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {revenueChartData.length > 0 ? (
                      <RevenueBreakdownChart data={revenueChartData} />
                    ) : (
                      <div className="h-64 flex items-center justify-center text-gray-400">
                        No revenue data available
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Investor Waterfall */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Users className="w-4 h-4 text-indigo-600" />
                      Investor Waterfall
                    </CardTitle>
                    <p className="text-xs text-gray-500">
                      Distribution of returns between investors and developer
                    </p>
                  </CardHeader>
                  <CardContent>
                    {results ? (
                      <InvestorWaterfallChart results={results} inputs={inputs} />
                    ) : (
                      <div className="h-48 flex items-center justify-center text-gray-400">
                        Run calculations to see waterfall
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Key Metrics Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Investment Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between py-2 border-b">
                        <span>Lifetime Revenue</span>
                        <span className="font-semibold">{formatCurrency(results.summary.lifetimeRevenue)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span>Lifetime Profit</span>
                        <span className="font-semibold text-green-600">{formatCurrency(results.summary.lifetimeProfit)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span>Project IRR (Unlevered)</span>
                        <span className="font-semibold">{results.summary.projectIrr.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span>Equity IRR (Levered)</span>
                        <span className="font-semibold text-blue-600">{results.summary.equityIrr.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span>Average Annual Profit</span>
                        <span className="font-semibold">{formatCurrency(results.summary.averageAnnualProfit)}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span>Equity Multiple (MOIC)</span>
                        <span className="font-bold text-purple-600">{results.summary.equityMultiple.toFixed(2)}x</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Email Gate Modal */}
      <EmailGateModal
        isOpen={showEmailGate}
        onClose={() => setShowEmailGate(false)}
        onSubmit={handleEmailSubmit}
      />
      
      <ScenarioSaveModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={handleSaveScenario}
        projectName={inputs.project.projectName}
        isSaving={isSaving}
      />
      
      <ScenarioLoadModal
        isOpen={showLoadModal}
        onClose={() => setShowLoadModal(false)}
        onLoad={handleLoadScenario}
        onDelete={handleDeleteScenario}
      />
    </div>
  )
}
