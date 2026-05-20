'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { CheckCircle, Battery, Loader2 } from 'lucide-react'

const parkSizes = [
  'Under 1 MW',
  '1-2 MW',
  '2-5 MW',
  '5-10 MW',
  '10-25 MW',
  'Over 25 MW',
]

const curtailmentRanges = [
  'Under 10%',
  '10-20%',
  '20-30%',
  '30-40%',
  '40-50%',
  'Over 50%',
  'Not sure / Need assessment',
]

const parkStatuses = [
  'Operational - generating revenue',
  'Under construction',
  'Ready to build (RTB)',
  'In development / permitting',
  'Planning new project',
]

const timelines = [
  'Immediately',
  'Within 3 months',
  '3-6 months',
  '6-12 months',
  'Just exploring options',
]

export function BessInquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      parkSize: formData.get('parkSize') as string,
      curtailmentRate: formData.get('curtailmentRate') as string,
      parkStatus: formData.get('parkStatus') as string,
      location: formData.get('location') as string,
      timeline: formData.get('timeline') as string,
      message: formData.get('message') as string,
      source: 'bess-inquiry-form',
    }

    try {
      const response = await fetch('/api/bess-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setIsSuccess(true)
    } catch {
      setError('Failed to submit your inquiry. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-green-600">
          BESS Inquiry Received!
        </h3>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          Thank you for your interest in battery storage solutions. Our team will analyze 
          your requirements and send you a preliminary BESS sizing proposal within 48 hours.
        </p>
        <div className="bg-blue-50 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-sm text-blue-800">
            <strong>Next steps:</strong> We&apos;ll review your park details and prepare a customized 
            BESS sizing and revenue analysis with ROI projections.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Contact Information */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input 
            id="name" 
            name="name" 
            placeholder="Your name" 
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input 
            id="company" 
            name="company" 
            placeholder="Company or project name" 
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="your@email.com" 
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input 
            id="phone" 
            name="phone" 
            type="tel" 
            placeholder="+357..." 
          />
        </div>
      </div>

      {/* Park Details */}
      <div className="border-t pt-6">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Battery className="w-5 h-5 text-blue-600" />
          Solar Park Details
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="parkSize">Park Capacity *</Label>
            <Select name="parkSize" required>
              <SelectTrigger>
                <SelectValue placeholder="Select park size" />
              </SelectTrigger>
              <SelectContent>
                {parkSizes.map((size) => (
                  <SelectItem key={size} value={size}>{size}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="curtailmentRate">Grid / export constraints (optional)</Label>
            <Select name="curtailmentRate">
              <SelectTrigger id="curtailmentRate">
                <SelectValue placeholder="Estimated unsold production, if known" />
              </SelectTrigger>
              <SelectContent>
                {curtailmentRanges.map((range) => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="parkStatus">Park Status *</Label>
            <Select name="parkStatus" required>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {parkStatuses.map((status) => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location (District)</Label>
            <Input 
              id="location" 
              name="location" 
              placeholder="e.g., Paphos, Larnaca" 
            />
          </div>
        </div>
      </div>

      {/* Timeline & Message */}
      <div className="border-t pt-6">
        <div className="space-y-2 mb-4">
          <Label htmlFor="timeline">Decision Timeline</Label>
          <Select name="timeline">
            <SelectTrigger>
              <SelectValue placeholder="When are you looking to add BESS?" />
            </SelectTrigger>
            <SelectContent>
              {timelines.map((timeline) => (
                <SelectItem key={timeline} value={timeline}>{timeline}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Additional Information</Label>
          <Textarea 
            id="message" 
            name="message" 
            placeholder="Tell us more about your project, specific requirements, or questions about BESS integration..."
            rows={4}
          />
        </div>
      </div>

      <Button 
        type="submit" 
        variant="gradient" 
        size="lg" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Battery className="w-4 h-4 mr-2" />
            Request BESS Proposal
          </>
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to receive communications from Lighthief Cyprus Ltd 
        regarding your BESS inquiry. We respect your privacy.
      </p>
    </form>
  )
}
