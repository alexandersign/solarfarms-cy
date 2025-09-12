interface StructuredDataProps {
  data: Record<string, any>
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

// Predefined structured data generators
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Lighthief Cyprus Ltd",
  "alternateName": "SolarFarms.cy",
  "url": "https://solarfarms.cy",
  "logo": "https://solarfarms.cy/images/logo.png",
  "description": "Premium Cyprus solar farm investments with guaranteed 15-20% ROI. Full lifecycle support from development to recycling.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CY",
    "addressLocality": "Nicosia",
    "addressRegion": "Nicosia District"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+357-[Cyprus-Office]",
    "contactType": "customer service",
    "email": "info@solarfarms.cy",
    "availableLanguage": ["English", "Greek"]
  },
  "sameAs": [
    "https://linkedin.com/company/lighthief-cyprus",
    "https://twitter.com/solarfarmscyprus"
  ],
  "foundingDate": "2020",
  "numberOfEmployees": "150+",
  "industry": "Renewable Energy",
  "areaServed": {
    "@type": "Country",
    "name": "Cyprus"
  }
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SolarFarms.cy",
  "url": "https://solarfarms.cy",
  "description": "Premium Cyprus solar farm investments with guaranteed 15-20% ROI",
  "publisher": {
    "@type": "Organization",
    "name": "Lighthief Cyprus Ltd"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://solarfarms.cy/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
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
  "description": "Complete solar farm investment services including EPC, O&M, and asset management",
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
          "description": "Complete 1MW solar farm development and management"
        },
        "price": "900000-1200000",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "5MW Solar Farm Investment",
          "description": "Complete 5MW solar farm development and management"
        },
        "price": "4500000-6000000",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "10MW Solar Farm Investment",
          "description": "Complete 10MW solar farm development and management"
        },
        "price": "9000000-12000000",
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
