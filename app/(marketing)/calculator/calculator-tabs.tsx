'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ROICalculator } from '@/components/calculators/ROICalculator'
import { AdvancedProjectCalculator } from '@/components/calculators/AdvancedProjectCalculator'
import { Calculator, Cog } from 'lucide-react'

export function CalculatorTabs() {
  const [activeTab, setActiveTab] = useState('basic')

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex justify-center mb-8">
        <TabsList className="grid grid-cols-2 w-full max-w-lg h-auto p-1">
          <TabsTrigger 
            value="basic" 
            className="flex items-center gap-2 py-3 data-[state=active]:bg-solar-500 data-[state=active]:text-white"
          >
            <Calculator className="w-4 h-4" />
            <span>Quick Calculator</span>
          </TabsTrigger>
          <TabsTrigger 
            value="advanced" 
            className="flex items-center gap-2 py-3 data-[state=active]:bg-cyprus-600 data-[state=active]:text-white"
          >
            <Cog className="w-4 h-4" />
            <span>Advanced Project</span>
            <Badge variant="secondary" className="ml-1 text-[10px] py-0 px-1.5">PRO</Badge>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="basic" className="mt-0">
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Quick estimates for standard 1MW, 5MW, and 10MW solar farm investments
          </p>
        </div>
        <ROICalculator />
      </TabsContent>

      <TabsContent value="advanced" className="mt-0">
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Full investment analysis with customizable parameters, BESS integration, and downloadable reports
          </p>
        </div>
        <AdvancedProjectCalculator />
      </TabsContent>
    </Tabs>
  )
}

