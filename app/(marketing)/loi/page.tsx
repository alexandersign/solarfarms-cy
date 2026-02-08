'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { FileText, Download, Info } from 'lucide-react'

export default function LOIGeneratorPage() {
  const [formData, setFormData] = useState({
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
    bessIncluded: false,
    financingRequired: false,
    conditions: ''
  })
  
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const loiData = {
        ...formData,
        projectCapacityMW: parseFloat(formData.projectCapacityMW),
        estimatedInvestment: parseFloat(formData.estimatedInvestment),
        investmentAmount: parseFloat(formData.investmentAmount),
        conditions: formData.conditions ? formData.conditions.split('\n').filter(c => c.trim()) : []
      }
      
      const response = await fetch('/api/generate-loi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loiData)
      })
      
      if (response.ok) {
        const html = await response.text()
        
        // Open LOI in new window for review and printing
        const loiWindow = window.open('', '_blank')
        if (loiWindow) {
          loiWindow.document.write(html)
          loiWindow.document.close()
          loiWindow.focus()
          
          alert('Letter of Intent opened in new window. You can review, print, or save as PDF.')
        } else {
          alert('Please allow pop-ups to view your Letter of Intent.')
        }
      } else {
        const error = await response.json()
        alert(error.message || 'Failed to generate LOI. Please check all required fields.')
      }
    } catch (error) {
      alert('An error occurred. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">Investment Documentation</Badge>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Generate Letter of Intent
                <span className="block gradient-text text-3xl mt-2">
                  Professional Investment Documentation
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                Create a professional Letter of Intent for your Cyprus solar farm investment
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">About Letters of Intent</h3>
                  <p className="text-blue-800 text-sm mb-2">
                    A Letter of Intent (LOI) is a non-binding document expressing your preliminary interest 
                    in a solar investment project. It helps facilitate discussions and due diligence while 
                    protecting both parties.
                  </p>
                  <p className="text-blue-800 text-sm">
                    <strong>Note:</strong> This LOI is non-binding and does not create legal obligations. 
                    Review with your legal counsel before signing.
                  </p>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>LOI Information Form</CardTitle>
                <CardDescription>
                  Complete all required fields to generate your Letter of Intent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Investor Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Investor Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Full Name *"
                      value={formData.investorName}
                      onChange={(e) => setFormData({...formData, investorName: e.target.value})}
                      required
                    />
                    <Input
                      placeholder="Company Name (Optional)"
                      value={formData.investorCompany}
                      onChange={(e) => setFormData({...formData, investorCompany: e.target.value})}
                    />
                  </div>
                  <Input
                    placeholder="Full Address *"
                    value={formData.investorAddress}
                    onChange={(e) => setFormData({...formData, investorAddress: e.target.value})}
                    required
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      type="email"
                      placeholder="Email Address *"
                      value={formData.investorEmail}
                      onChange={(e) => setFormData({...formData, investorEmail: e.target.value})}
                      required
                    />
                    <Input
                      type="tel"
                      placeholder="Phone Number *"
                      value={formData.investorPhone}
                      onChange={(e) => setFormData({...formData, investorPhone: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Project Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Project Information</h3>
                  <Input
                    placeholder="Project Name *"
                    value={formData.projectName}
                    onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                    required
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Project Reference (e.g., PARK-RTB-2026)"
                      value={formData.projectReference}
                      onChange={(e) => setFormData({...formData, projectReference: e.target.value})}
                    />
                    <Input
                      type="number"
                      placeholder="Capacity (MW) *"
                      value={formData.projectCapacityMW}
                      onChange={(e) => setFormData({...formData, projectCapacityMW: e.target.value})}
                      required
                    />
                  </div>
                  <Input
                    type="number"
                    placeholder="Estimated Total Investment (€) *"
                    value={formData.estimatedInvestment}
                    onChange={(e) => setFormData({...formData, estimatedInvestment: e.target.value})}
                    required
                  />
                </div>

                {/* Investment Terms */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Investment Terms</h3>
                  <Input
                    type="number"
                    placeholder="Your Investment Amount (€) *"
                    value={formData.investmentAmount}
                    onChange={(e) => setFormData({...formData, investmentAmount: e.target.value})}
                    required
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Select 
                      value={formData.investmentType} 
                      onValueChange={(value: 'equity' | 'debt' | 'hybrid') => setFormData({...formData, investmentType: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Investment Type *" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equity">Equity Investment</SelectItem>
                        <SelectItem value="debt">Debt Financing</SelectItem>
                        <SelectItem value="hybrid">Hybrid (Equity + Debt)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Timeline (e.g., 6-12 months) *"
                      value={formData.timeline}
                      onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Additional Options */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Additional Options</h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="bess"
                      checked={formData.bessIncluded}
                      onChange={(e) => setFormData({...formData, bessIncluded: e.target.checked})}
                      className="w-4 h-4"
                    />
                    <label htmlFor="bess" className="text-sm font-medium">
                      Include Battery Storage (BESS) in project scope
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="financing"
                      checked={formData.financingRequired}
                      onChange={(e) => setFormData({...formData, financingRequired: e.target.checked})}
                      className="w-4 h-4"
                    />
                    <label htmlFor="financing" className="text-sm font-medium">
                      Financing assistance required
                    </label>
                  </div>
                  <Textarea
                    placeholder="Special Conditions (one per line, optional)"
                    value={formData.conditions}
                    onChange={(e) => setFormData({...formData, conditions: e.target.value})}
                    rows={4}
                  />
                </div>

                {/* Generate Button */}
                <div className="pt-6 border-t">
                  <Button 
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    onClick={handleGenerate}
                    disabled={isGenerating || !formData.investorName || !formData.investorEmail || !formData.projectName}
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    {isGenerating ? 'Generating LOI...' : 'Generate Letter of Intent'}
                  </Button>
                  <p className="text-sm text-gray-500 text-center mt-2">
                    The LOI will be downloaded as an HTML file. You can print or convert to PDF.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Next Steps After Generating LOI</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-gray-700">
                  <li>
                    <strong>1. Review the Document:</strong> Carefully review all information for accuracy
                  </li>
                  <li>
                    <strong>2. Legal Counsel:</strong> Have your lawyer review before signing
                  </li>
                  <li>
                    <strong>3. Sign & Return:</strong> Sign and email to office@lighthief.com
                  </li>
                  <li>
                    <strong>4. Await Response:</strong> We'll countersign and begin due diligence process
                  </li>
                  <li>
                    <strong>5. Due Diligence:</strong> Receive comprehensive project documentation package
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

