'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle, Mail } from 'lucide-react'
import Link from 'next/link'

function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [isUnsubscribed, setIsUnsubscribed] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUnsubscribe = async () => {
    if (!email) {
      alert('Email address is required')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, feedback })
      })

      if (response.ok) {
        setIsUnsubscribed(true)
      } else {
        alert('Failed to unsubscribe. Please contact us directly.')
      }
    } catch (error) {
      alert('An error occurred. Please contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isUnsubscribed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="container">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="pt-12 pb-12">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
              <h1 className="text-3xl font-heading font-bold mb-4">
                You've Been Unsubscribed
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Your email address has been removed from our mailing list. 
                You will no longer receive newsletters from SolarFarms.cy.
              </p>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Changed your mind? You can resubscribe anytime from our homepage.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button variant="gradient" asChild>
                    <Link href="/">
                      Return to Homepage
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/blog">
                      Browse Articles
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <Mail className="w-12 h-12 text-cyprus-600" />
            </div>
            <CardTitle className="text-center text-3xl">Unsubscribe from Newsletter</CardTitle>
            <CardDescription className="text-center text-lg">
              We're sorry to see you go. You can unsubscribe from our newsletter below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {email ? (
              <>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Unsubscribing email:</p>
                  <p className="font-semibold text-lg">{email}</p>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Help us improve (optional)
                  </label>
                  <Textarea
                    placeholder="Why are you unsubscribing? Your feedback helps us improve..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex gap-4">
                  <Button 
                    variant="destructive"
                    className="flex-1"
                    onClick={handleUnsubscribe}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Unsubscribing...' : 'Confirm Unsubscribe'}
                  </Button>
                  <Button 
                    variant="outline"
                    asChild
                  >
                    <Link href="/">
                      Cancel
                    </Link>
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  You can resubscribe anytime from our homepage newsletter form
                </p>
              </>
            ) : (
              <div className="text-center space-y-6 py-8">
                <p className="text-gray-600">
                  No email address provided. Please use the unsubscribe link from your newsletter email.
                </p>
                <Button variant="gradient" asChild>
                  <Link href="/">
                    Return to Homepage
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    }>
      <UnsubscribeContent />
    </Suspense>
  )
}

