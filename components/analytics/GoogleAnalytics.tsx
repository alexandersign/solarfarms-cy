'use client'

import Script from 'next/script'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

// Hard-coded GA ID for SolarFarms.cy
const GA_ID = 'G-2XED6Q5QT9'

interface GoogleAnalyticsProps {
  gaId?: string
}

export function GoogleAnalytics({ gaId = GA_ID }: GoogleAnalyticsProps) {
  return (
    <>
      {/* Google Consent Mode - Load early */}
      <Script
        id="google-consent-mode"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Set default consent state (denied until user consents)
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'functionality_storage': 'granted',
              'security_storage': 'granted'
            });
            
            // Check if consent was previously given
            const consentGiven = localStorage.getItem('solarfarms-consent');
            if (consentGiven === 'granted') {
              gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
              });
            }
          `,
        }}
      />
      
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  )
}

// Helper function to track events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Consent management functions
export const updateConsent = (granted: boolean) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const consentValue = granted ? 'granted' : 'denied'
    
    // Use any type to bypass TypeScript consent API limitations
    ;(window.gtag as any)('consent', 'update', {
      'analytics_storage': consentValue,
      'ad_storage': consentValue,
      'ad_user_data': consentValue,
      'ad_personalization': consentValue
    })
    
    // Save consent preference
    localStorage.setItem('solarfarms-consent', granted ? 'granted' : 'denied')
    localStorage.setItem('solarfarms-consent-date', new Date().toISOString())
  }
}

export const hasConsent = (): boolean => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('solarfarms-consent') === 'granted'
}

// Simple consent banner component
export function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if consent has been given before
    const consentGiven = localStorage.getItem('solarfarms-consent')
    const consentDate = localStorage.getItem('solarfarms-consent-date')
    
    // Show banner if no consent given or consent is older than 1 year
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
    
    const shouldShowBanner = !consentGiven || 
      (consentDate && new Date(consentDate) < oneYearAgo)
    
    setShowBanner(Boolean(shouldShowBanner))
    setLoading(false)
  }, [])

  const handleAccept = () => {
    updateConsent(true)
    setShowBanner(false)
  }

  const handleDecline = () => {
    updateConsent(false)
    setShowBanner(false)
  }

  if (loading || !showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">Cookie Preferences</h3>
            <p className="text-sm text-gray-600">
              We use cookies to enhance your experience, analyze site traffic, and provide personalized investment recommendations. 
              <a href="/privacy" className="text-cyprus-600 hover:underline ml-1">
                Learn more about our privacy policy
              </a>
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button variant="outline" onClick={handleDecline} size="sm">
              Necessary Only
            </Button>
            <Button onClick={handleAccept} className="bg-cyprus-600 hover:bg-cyprus-700" size="sm">
              Accept All Cookies
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
