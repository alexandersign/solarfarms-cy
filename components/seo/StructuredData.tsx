interface StructuredDataProps {
  data: Record<string, unknown>
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}

const APPROVED_DESCRIPTION =
  "Cyprus solar farm and BESS investment services with 8–12% equity IRR. " +
  "Turnkey EPC, O&M, and bankable energy storage by Lighthief Cyprus Ltd (HE 477423)."

// Canonical LinkedIn URL — must match footer
const LINKEDIN_URL = "https://www.linkedin.com/company/lighthiefcyprus/"

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Lighthief Cyprus Ltd",
  "alternateName": "SolarFarms.cy",
  "url": "https://solarfarms.cy",
  "logo": {
    "@type": "ImageObject",
    "url": "https://solarfarms.cy/images/logo/lighthief-logo.png",
    "width": 200,
    "height": 50
  },
  "description": APPROVED_DESCRIPTION,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "15 Agaritsis, Nektaria Court, Office 201",
    "addressLocality": "Limassol",
    "postalCode": "3045",
    "addressCountry": "CY"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+357-77-77-00-50",
      "contactType": "customer service",
      "email": "office@lighthief.com",
      "availableLanguage": ["English", "Greek"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+357-99-164-158",
      "contactType": "sales",
      "email": "office@lighthief.com",
      "contactOption": "TollFree",
      "availableLanguage": ["English", "Greek"]
    }
  ],
  "identifier": {
    "@type": "PropertyValue",
    "propertyID": "Cyprus Company Registration",
    "value": "HE 477423"
  },
  "taxID": "60187188Q",
  "sameAs": [LINKEDIN_URL],
  "foundingDate": "2020",
  "industry": "Renewable Energy",
  "areaServed": {
    "@type": "Country",
    "name": "Cyprus"
  }
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Lighthief Cyprus Ltd",
  "alternateName": "SolarFarms.cy",
  "url": "https://solarfarms.cy",
  "telephone": "+357-77-77-00-50",
  "email": "office@lighthief.com",
  "description": APPROVED_DESCRIPTION,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "15 Agaritsis, Nektaria Court, Office 201",
    "addressLocality": "Limassol",
    "postalCode": "3045",
    "addressCountry": "CY"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "currenciesAccepted": "EUR",
  "priceRange": "€€€",
  "sameAs": [LINKEDIN_URL]
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SolarFarms.cy",
  "url": "https://solarfarms.cy",
  "description": APPROVED_DESCRIPTION,
  "publisher": {
    "@type": "Organization",
    "name": "Lighthief Cyprus Ltd"
  }
}

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Solar Farm Investment Services",
  "provider": {
    "@type": "Organization",
    "name": "Lighthief Cyprus Ltd"
  },
  "description": "Complete solar farm investment services including EPC, O&M, and BESS asset management in Cyprus",
  "areaServed": {
    "@type": "Country",
    "name": "Cyprus"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Solar Investment Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "1MW Solar Farm Investment",
          "description": "Complete 1MW solar farm with BESS development and management"
        },
        "price": "1750000-1850000",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "5MW Solar Farm Investment",
          "description": "Complete 5MW solar farm with BESS development and management"
        },
        "price": "7200000-7500000",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "10MW Solar Farm Investment",
          "description": "Complete 10MW solar farm with BESS development and management"
        },
        "price": "13900000-14500000",
        "priceCurrency": "EUR"
      }
    ]
  }
}

export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})

export const faqSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
})
