'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { isInternalToolPath } from '@/components/analytics/GoogleAnalytics'

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '1339065790896028'

export function MetaPixel() {
  const pathname = usePathname()
  if (isInternalToolPath(pathname)) return null

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}

// Helper function to get Meta cookies for deduplication
export function getMetaCookies(): { fbp: string | null; fbc: string | null } {
  if (typeof window === 'undefined') {
    return { fbp: null, fbc: null }
  }
  
  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift()
      return cookieValue || null
    }
    return null
  }
  
  return {
    fbp: getCookie('_fbp'),
    fbc: getCookie('_fbc'),
  }
}

// Helper to generate unique event ID for deduplication
export function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Track Lead event with browser pixel
export function trackLeadPixel(value: number = 250, currency: string = 'EUR', eventId?: string): string {
  const id = eventId || generateEventId()
  
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', {
      value: value,
      currency: currency,
    }, { eventID: id })
  }
  
  return id
}

// Track ViewContent event
export function trackViewContent(contentName: string, contentCategory: string, value?: number): string {
  const eventId = generateEventId()
  
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'ViewContent', {
      content_name: contentName,
      content_category: contentCategory,
      value: value,
      currency: 'EUR',
    }, { eventID: eventId })
  }
  
  return eventId
}

// Track InitiateCheckout event (for project interest)
export function trackInitiateCheckout(value: number, currency: string = 'EUR'): string {
  const eventId = generateEventId()
  
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', {
      value: value,
      currency: currency,
    }, { eventID: eventId })
  }
  
  return eventId
}

// Track CompleteRegistration event (for newsletter)
export function trackCompleteRegistration(value: number = 50): string {
  const eventId = generateEventId()
  
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'CompleteRegistration', {
      value: value,
      currency: 'EUR',
    }, { eventID: eventId })
  }
  
  return eventId
}

// Declare fbq on window
declare global {
  interface Window {
    fbq: (
      action: string,
      event: string,
      params?: Record<string, unknown>,
      options?: { eventID: string }
    ) => void
  }
}

