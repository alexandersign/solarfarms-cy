'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { FileText, Download, Info, Send, FileCheck, PenTool } from 'lucide-react'
import { getListingBySlug } from '@/lib/investment-listings'

const defaultForm = {
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
  conditions: '',
}

export function LoiForm() {
  const searchParams = useSearchParams()
  const listingSlug = searchParams.get('listing')

  const [formData, setFormData] = useState(defaultForm)

  useEffect(() => {
    if (!listingSlug) return
    const listing = getListingBySlug(listingSlug)
    if (!listing) return
    const p = listing.loiPreset
    setFormData((prev) => ({
      ...prev,
      projectName: p.projectName,
      projectReference: p.projectReference,
      projectCapacityMW:
        p.projectCapacityMW > 0 ? String(p.projectCapacityMW) : prev.projectCapacityMW,
      estimatedInvestment:
        p.estimatedInvestment != null ? String(p.estimatedInvestment) : prev.estimatedInvestment,
      bessIncluded: p.bessIncluded ?? false,
      timeline: p.timeline ?? prev.timeline,
    }))
  }, [listingSlug])

  const [isGenerating, setIsGenerating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loiGenerated, setLoiGenerated] = useState(false)

  const buildLoiData = () => ({
    ...formData,
    projectCapacityMW: parseFloat(formData.projectCapacityMW) || 0,
    estimatedInvestment: parseFloat(formData.estimatedInvestment) || 0,
    investmentAmount: parseFloat(formData.investmentAmount) || 0,
    conditions: formData.conditions ? formData.conditions.split('\n').filter((c) => c.trim()) : [],
  })

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-loi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildLoiData()),
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
        alert(error.message || 'Failed to generate LOI. Please check all required fields.')
      }
    } catch {
      alert('An error occurred. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDigitalSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/submit-loi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildLoiData()),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setIsSubmitted(true)
        if (result.html) {
          const loiWindow = window.open('', '_blank')
          if (loiWindow) {
            loiWindow.document.write(result.html)
            loiWindow.document.close()
          }
        }
      } else {
        alert(result.message || 'Please check all required fields.')
      }
    } catch {
      alert('An error occurred. Please try again or contact office@lighthief.com directly.')
    } finally {
      setIsSubmitting(false)
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
              {listingSlug && getListingBySlug(listingSlug) && (
                <p className="text-sm text-slate-600 mt-3">
                  Project fields prefilled from listing{' '}
                  <span className="font-mono">{listingSlug}</span> — you can edit before generating.
                </p>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">About Letters of Intent</h3>
                  <p className="text-blue-800 text-sm mb-2">
                    A Letter of Intent (LOI) is a non-binding document expressing your preliminary
                    interest in a solar investment project. It helps facilitate discussions and due
                    diligence while protecting both parties.
                  </p>
                  <p className="text-blue-800 text-sm">
                    <strong>Note:</strong> This LOI is non-binding and does not create legal
                    obligations. Review with your legal counsel before signing.
                  </p>
                </div>
              </div>
            </div>

            {isSubmitted ? (
              <Card className="border-green-300 bg-green-50">
                <CardContent className="pt-8 pb-8 text-center">
                  <FileCheck className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-800 mb-2">LOI Successfully Submitted</h3>
                  <p className="text-green-700 mb-4">
                    Your Letter of Intent has been submitted to Lighthief Cyprus. We will review and
                    contact you within 2 business days.
                  </p>
                  <p className="text-sm text-green-600 mb-6">
                    A copy has been opened in a new window for your records. You can print it for
                    physical signing.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSubmitted(false)
                      setLoiGenerated(false)
                    }}
                  >
                    Generate Another LOI
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>LOI Information Form</CardTitle>
                  <CardDescription>
                    Complete all required fields to generate your Letter of Intent
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Investor Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Full Name *"
                        value={formData.investorName}
                        onChange={(e) => setFormData({ ...formData, investorName: e.target.value })}
                        required
                      />
                      <Input
                        placeholder="Company Name (Optional)"
                        value={formData.investorCompany}
                        onChange={(e) =>
                          setFormData({ ...formData, investorCompany: e.target.value })
                        }
                      />
                    </div>
                    <Input
                      placeholder="Full Address *"
                      value={formData.investorAddress}
                      onChange={(e) => setFormData({ ...formData, investorAddress: e.target.value })}
                      required
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        type="email"
                        placeholder="Email Address *"
                        value={formData.investorEmail}
                        onChange={(e) => setFormData({ ...formData, investorEmail: e.target.value })}
                        required
                      />
                      <Input
                        type="tel"
                        placeholder="Phone Number *"
                        value={formData.investorPhone}
                        onChange={(e) => setFormData({ ...formData, investorPhone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Project Information</h3>
                    <Input
                      placeholder="Project Name *"
                      value={formData.projectName}
                      onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                      required
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Project Reference (e.g., PARK-RTB-2026)"
                        value={formData.projectReference}
                        onChange={(e) =>
                          setFormData({ ...formData, projectReference: e.target.value })
                        }
                      />
                      <Input
                        type="number"
                        placeholder="Capacity (MW) *"
                        value={formData.projectCapacityMW}
                        onChange={(e) =>
                          setFormData({ ...formData, projectCapacityMW: e.target.value })
                        }
                        required
                      />
                    </div>
                    <Input
                      type="number"
                      placeholder="Estimated Total Investment (€) *"
                      value={formData.estimatedInvestment}
                      onChange={(e) =>
                        setFormData({ ...formData, estimatedInvestment: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Investment Terms</h3>
                    <Input
                      type="number"
                      placeholder="Your Investment Amount (€) *"
                      value={formData.investmentAmount}
                      onChange={(e) =>
                        setFormData({ ...formData, investmentAmount: e.target.value })
                      }
                      required
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <Select
                        value={formData.investmentType}
                        onValueChange={(value: 'equity' | 'debt' | 'hybrid') =>
                          setFormData({ ...formData, investmentType: value })
                        }
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
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Additional Options</h3>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="bess"
                        checked={formData.bessIncluded}
                        onChange={(e) =>
                          setFormData({ ...formData, bessIncluded: e.target.checked })
                        }
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
                        onChange={(e) =>
                          setFormData({ ...formData, financingRequired: e.target.checked })
                        }
                        className="w-4 h-4"
                      />
                      <label htmlFor="financing" className="text-sm font-medium">
                        Financing assistance required
                      </label>
                    </div>
                    <Textarea
                      placeholder="Special Conditions (one per line, optional)"
                      value={formData.conditions}
                      onChange={(e) => setFormData({ ...formData, conditions: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div className="pt-6 border-t space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                      <Button
                        size="lg"
                        className="w-full"
                        variant="gradient"
                        onClick={handleGenerate}
                        disabled={
                          isGenerating ||
                          !formData.investorName ||
                          !formData.investorEmail ||
                          !formData.projectName
                        }
                      >
                        <PenTool className="w-4 h-4 mr-2" />
                        {isGenerating ? 'Generating...' : 'Generate LOI (Print & Sign)'}
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full border-green-500 text-green-700 hover:bg-green-50"
                        onClick={handleDigitalSubmit}
                        disabled={
                          isSubmitting ||
                          !formData.investorName ||
                          !formData.investorEmail ||
                          !formData.projectName
                        }
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {isSubmitting ? 'Submitting...' : 'Submit LOI Digitally'}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                      <strong>Print &amp; Sign:</strong> Opens LOI in new window for printing,
                      signing, and returning to office@lighthief.com
                      <br />
                      <strong>Submit Digitally:</strong> Sends your LOI directly to Lighthief Cyprus
                      and opens a copy for your records
                    </p>
                    {loiGenerated && !isSubmitted && (
                      <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3 text-center text-sm text-cyan-800">
                        <FileCheck className="w-4 h-4 inline mr-1" />
                        LOI generated and opened in new window. Print, sign, and email to{' '}
                        <strong>office@lighthief.com</strong>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Next Steps After Generating LOI</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-gray-700">
                  <li>
                    <strong>1. Review the Document:</strong> Carefully review all information for
                    accuracy
                  </li>
                  <li>
                    <strong>2. Legal Counsel:</strong> Have your lawyer review before signing
                  </li>
                  <li>
                    <strong>3. Sign & Return:</strong> Sign and email to office@lighthief.com
                  </li>
                  <li>
                    <strong>4. Await Response:</strong> We&apos;ll countersign and begin due
                    diligence process
                  </li>
                  <li>
                    <strong>5. Due Diligence:</strong> Receive comprehensive project documentation
                    package
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
