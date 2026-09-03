'use client'

import Script from 'next/script'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

const GA_ID = 'G-2XED6Q5QT9'

export function isInternalToolPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false
  return pathname === '/crm' || pathname.startsWith('/crm/')
}

interface GoogleAnalyticsProps {
  gaId?: string
}

export function GoogleAnalytics({ gaId = GA_ID }: GoogleAnalyticsProps) {
  const pathname = usePathname()
  const internal = isInternalToolPath(pathname)
  const [gaReady, setGaReady] = useState(false)

  useEffect(() => {
    if (internal || !gaReady || typeof window === 'undefined' || !window.gtag) return
    window.gtag('event', 'page_view', {
      page_path: pathname || '/',
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname, internal, gaReady, gaId])

  if (internal) return null

  return (
    <>
      <Script
        id="google-consent-mode"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'functionality_storage': 'granted',
              'security_storage': 'granted'
            });
            
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

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        onLoad={() => setGaReady(true)}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              send_page_view: false,
              page_title: document.title,
              page_location: window.location.href,
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

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

/** Fire when a real contact is captured (form, report unlock). */
export function trackLeadCapture(label: string, value = 150) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', 'form_submit', {
    event_category: 'engagement',
    event_label: label,
    value,
  })
  window.gtag('event', 'generate_lead', {
    event_category: 'lead',
    event_label: label,
    value,
    currency: 'EUR',
  })
}

export const updateConsent = (granted: boolean) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const consentValue = granted ? 'granted' : 'denied'

    ;(window.gtag as any)('consent', 'update', {
      analytics_storage: consentValue,
      ad_storage: consentValue,
      ad_user_data: consentValue,
      ad_personalization: consentValue,
    })

    localStorage.setItem('solarfarms-consent', granted ? 'granted' : 'denied')
    localStorage.setItem('solarfarms-consent-date', new Date().toISOString())
  }
}

export const hasConsent = (): boolean => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('solarfarms-consent') === 'granted'
}

export function ConsentBanner() {
  const pathname = usePathname()
  const [showBanner, setShowBanner] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isInternalToolPath(pathname)) {
      setShowBanner(false)
      setLoading(false)
      return
    }

    const consentGiven = localStorage.getItem('solarfarms-consent')
    const consentDate = localStorage.getItem('solarfarms-consent-date')

    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

    const shouldShowBanner =
      !consentGiven || (consentDate && new Date(consentDate) < oneYearAgo)

    setShowBanner(Boolean(shouldShowBanner))
    setLoading(false)
  }, [pathname])

  const handleAccept = () => {
    updateConsent(true)
    setShowBanner(false)
  }

  const handleDecline = () => {
    updateConsent(false)
    setShowBanner(false)
  }

  if (isInternalToolPath(pathname) || loading || !showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">Cookie Preferences</h3>
            <p className="text-sm text-gray-600">
              We use cookies to enhance your experience, analyze site traffic, and provide personalized investment recommendations.
              <a href="/privacy" className="text-cyprus-700 hover:underline ml-1 font-medium">
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
