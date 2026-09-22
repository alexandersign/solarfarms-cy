'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { INVESTMENT_OPTIONS, TIMELINE_OPTIONS } from '@/lib/constants'
import { Mail, Phone, MapPin } from 'lucide-react'
import { getMetaCookies, generateEventId } from '@/components/analytics/MetaPixel'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  investmentSize: string
  timeline: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name || data.name.trim().length < 2) errors.name = 'Please enter your full name (at least 2 characters).'
  if (!data.email || !EMAIL_RE.test(data.email)) errors.email = 'Please enter a valid email address.'
  if (!data.investmentSize) errors.investmentSize = 'Please select an investment size.'
  if (!data.timeline) errors.timeline = 'Please select a timeline.'
  return errors
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    investmentSize: '',
    timeline: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const handleSelectChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
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
        body: JSON.stringify({ ...formData, fbp, fbc, eventId }),
      })

      const result = await response.json()

      if (result.success) {
        // Fire pixel only after confirmed API success
        const { trackLeadPixel } = await import('@/components/analytics/MetaPixel')
        trackLeadPixel(150, 'EUR', eventId)
        const { trackLeadCapture } = await import('@/components/analytics/GoogleAnalytics')
        trackLeadCapture('contact_form', 150)
        setIsSubmitted(true)
      } else {
        throw new Error(result.message || 'Submission failed')
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Submission failed. Please try again or contact us directly at office@lighthief.com.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-8 h-8 text-brand-navy" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">Thank You!</h3>
            <p className="text-gray-600">
              We've received your inquiry and will get back to you within 24 hours.
              Our team will prepare a customised investment proposal based on your requirements.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({ name: '', email: '', phone: '', company: '', investmentSize: '', timeline: '', message: '' })
                setErrors({})
              }}
              variant="outline"
            >
              Submit Another Inquiry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
      {/* Contact Information */}
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-heading font-bold mb-4">
            Ready to Invest in Cyprus Solar?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Schedule a free consultation to discuss your solar farm investment goals.
            Our experts will prepare a customised proposal within 24 hours.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-10 h-10 bg-brand-navy/10 rounded-lg">
              <Mail className="w-5 h-5 text-brand-navy" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Email</h3>
              <p className="text-gray-600">office@lighthief.com</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-10 h-10 bg-brand-navy/10 rounded-lg">
              <Phone className="w-5 h-5 text-brand-navy" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Phone</h3>
              <p className="text-gray-600">+357 77 77 00 50</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-10 h-10 bg-brand-navy/10 rounded-lg">
              <MapPin className="w-5 h-5 text-brand-navy" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Location</h3>
              <p className="text-gray-600">
                15 Agaritsis, Nektaria Court, Office 201<br />
                3045 Zakaki, Limassol, Cyprus
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Schedule Your Consultation</CardTitle>
          <CardDescription>
            Fill out the form below and we'll prepare a customised investment proposal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>

            {/* Global submit error */}
            {submitError && (
              <div role="alert" aria-live="assertive" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
                {submitError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  placeholder="John Smith"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" role="alert" className="mt-1 text-xs text-red-600">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  placeholder="john@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  placeholder="+357 12 345 678"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <Input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange('company')}
                  placeholder="Your Company"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="investmentSize" className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Size *
                </label>
                <Select
                  value={formData.investmentSize}
                  onValueChange={handleSelectChange('investmentSize')}
                >
                  <SelectTrigger
                    id="investmentSize"
                    aria-label="Select investment range"
                    aria-invalid={!!errors.investmentSize}
                    aria-describedby={errors.investmentSize ? 'investmentSize-error' : undefined}
                  >
                    <SelectValue placeholder="Select investment range" />
                  </SelectTrigger>
                  <SelectContent>
                    {INVESTMENT_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.investmentSize && (
                  <p id="investmentSize-error" role="alert" className="mt-1 text-xs text-red-600">{errors.investmentSize}</p>
                )}
              </div>
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                  Timeline *
                </label>
                <Select
                  value={formData.timeline}
                  onValueChange={handleSelectChange('timeline')}
                >
                  <SelectTrigger
                    id="timeline"
                    aria-label="Select timeline"
                    aria-invalid={!!errors.timeline}
                    aria-describedby={errors.timeline ? 'timeline-error' : undefined}
                  >
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMELINE_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.timeline && (
                  <p id="timeline-error" role="alert" className="mt-1 text-xs text-red-600">{errors.timeline}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={handleInputChange('message')}
                placeholder="Tell us about your investment goals and any specific requirements..."
                rows={4}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Schedule Free Consultation'}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              By submitting this form, you agree to our Privacy Policy.
              We'll never share your information with third parties.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
