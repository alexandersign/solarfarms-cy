'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mail } from 'lucide-react'
import { getMetaCookies, generateEventId } from '@/components/analytics/MetaPixel'

const USE_CASES = [
  'Industrial daytime self-consumption',
  'Off-grid / weak-grid site',
  'Net billing with ESS',
  'Not sure — need a site survey',
]

const SYSTEM_SIZES = [
  'Under 50 kWp',
  '50–100 kWp',
  '100–250 kWp',
  '250 kWp – 1 MWp',
  'Over 1 MWp',
]

const TIMELINES = [
  'Immediately',
  'Within 3 months',
  '3-6 months',
  '6-12 months',
  'Just exploring options',
]

type FormState = {
  name: string
  email: string
  phone: string
  company: string
  useCase: string
  systemSize: string
  timeline: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(data: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!data.name || data.name.trim().length < 2) errors.name = 'Please enter your full name.'
  if (!data.email || !EMAIL_RE.test(data.email)) errors.email = 'Please enter a valid email address.'
  if (!data.useCase) errors.useCase = 'Please select a use case.'
  if (!data.timeline) errors.timeline = 'Please select a timeline.'
  return errors
}

export function CiInquiryForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    useCase: '',
    systemSize: '',
    timeline: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const setField = (field: keyof FormState) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    const validationErrors = validate(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    try {
      const eventId = generateEventId()
      const { fbp, fbc } = getMetaCookies()
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          investmentSize: formData.systemSize || 'C&I commercial rooftop',
          timeline: formData.timeline,
          message: [
            'C&I SOLAR INQUIRY',
            `Use case: ${formData.useCase}`,
            `System size: ${formData.systemSize || 'Not specified'}`,
            '',
            formData.message || 'No additional message',
          ].join('\n'),
          fbp,
          fbc,
          eventId,
        }),
      })
      const result = await response.json()
      if (!result.success) throw new Error(result.message || 'Submission failed')

      const { trackLeadPixel } = await import('@/components/analytics/MetaPixel')
      trackLeadPixel(150, 'EUR', eventId)
      const { trackLeadCapture } = await import('@/components/analytics/GoogleAnalytics')
      trackLeadCapture('ci_inquiry_form', 150)
      setIsSubmitted(true)
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Submission failed. Email office@lighthief.com or call +357 77 77 00 50.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="rounded-xl border border-brand-navy/10 bg-white p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-navy/10">
          <Mail className="h-7 w-7 text-brand-navy" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">Site survey request received</h3>
        <p className="text-gray-600">
          We will review your load profile and come back within 24 hours with a C&amp;I sizing outline.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {submitError && (
        <div role="alert" className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ci-name" className="mb-2 block text-sm font-medium text-gray-700">Full name *</label>
          <Input id="ci-name" value={formData.name} onChange={(e) => setField('name')(e.target.value)} aria-invalid={!!errors.name} />
          {errors.name && <p role="alert" className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="ci-email" className="mb-2 block text-sm font-medium text-gray-700">Email *</label>
          <Input id="ci-email" type="email" value={formData.email} onChange={(e) => setField('email')(e.target.value)} aria-invalid={!!errors.email} />
          {errors.email && <p role="alert" className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="ci-phone" className="mb-2 block text-sm font-medium text-gray-700">Phone</label>
          <Input id="ci-phone" type="tel" value={formData.phone} onChange={(e) => setField('phone')(e.target.value)} placeholder="+357" />
        </div>
        <div>
          <label htmlFor="ci-company" className="mb-2 block text-sm font-medium text-gray-700">Company / site</label>
          <Input id="ci-company" value={formData.company} onChange={(e) => setField('company')(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="ci-usecase" className="mb-2 block text-sm font-medium text-gray-700">Use case *</label>
          <Select value={formData.useCase} onValueChange={setField('useCase')}>
            <SelectTrigger id="ci-usecase" aria-invalid={!!errors.useCase}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {USE_CASES.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.useCase && <p role="alert" className="mt-1 text-xs text-red-600">{errors.useCase}</p>}
        </div>
        <div>
          <label htmlFor="ci-size" className="mb-2 block text-sm font-medium text-gray-700">System size</label>
          <Select value={formData.systemSize} onValueChange={setField('systemSize')}>
            <SelectTrigger id="ci-size">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {SYSTEM_SIZES.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="ci-timeline" className="mb-2 block text-sm font-medium text-gray-700">Timeline *</label>
          <Select value={formData.timeline} onValueChange={setField('timeline')}>
            <SelectTrigger id="ci-timeline" aria-invalid={!!errors.timeline}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {TIMELINES.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.timeline && <p role="alert" className="mt-1 text-xs text-red-600">{errors.timeline}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="ci-message" className="mb-2 block text-sm font-medium text-gray-700">
          Daytime load, roof area, or grid connection notes
        </label>
        <Textarea
          id="ci-message"
          rows={4}
          value={formData.message}
          onChange={(e) => setField('message')(e.target.value)}
          placeholder="e.g. factory runs 07:00–17:00, ~180,000 kWh/year, metal roof 1,200 m²"
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? 'Sending…' : 'Request a C&I site survey'}
      </Button>
    </form>
  )
}
