import { Metadata } from 'next'
import { COMPANY_DATA } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy | SolarFarms.cy | Lighthief Cyprus',
  description: 'Privacy policy for SolarFarms.cy and Lighthief Cyprus Ltd. How we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-heading font-bold gradient-text mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> September 11, 2025
            </p>
            
            <p className="mb-6">
              This Privacy Policy describes how {COMPANY_DATA.legalName} ("we," "our," or "us") 
              collects, uses, and protects your personal information when you visit our website 
              SolarFarms.cy or use our services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Personal Information</h3>
            <p className="mb-4">We may collect the following personal information:</p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Name and contact information (email, phone, address)</li>
              <li>Company information and investment preferences</li>
              <li>Financial information related to investment capacity</li>
              <li>Communication preferences and interaction history</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Technical Information</h3>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>IP address and browser information</li>
              <li>Website usage data and analytics</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Device information and preferences</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Provide and improve our solar investment services</li>
              <li>Respond to inquiries and provide customer support</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Analyze website usage and improve user experience</li>
              <li>Comply with legal obligations and regulatory requirements</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Information Sharing</h2>
            <p className="mb-4">We do not sell or rent your personal information. We may share information with:</p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners for joint investment opportunities (with your consent)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Data Security</h2>
            <p className="mb-6">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Your Rights (GDPR)</h2>
            <p className="mb-4">Under GDPR, you have the right to:</p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Access your personal data</li>
              <li>Rectify inaccurate information</li>
              <li>Erase your personal data</li>
              <li>Restrict processing of your data</li>
              <li>Data portability</li>
              <li>Object to processing</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Cookies</h2>
            <p className="mb-6">
              We use cookies to enhance your browsing experience, analyze website traffic, 
              and provide personalized content. You can control cookie preferences through 
              your browser settings.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Contact Information</h2>
            <p className="mb-4">For privacy-related questions or to exercise your rights, contact us:</p>
            <div className="bg-gray-50 rounded-lg p-6">
              <p><strong>{COMPANY_DATA.legalName}</strong></p>
              <p>{COMPANY_DATA.address.office.full}</p>
              <p>Email: {COMPANY_DATA.email}</p>
              <p>Phone: {COMPANY_DATA.phone}</p>
              <p>Company Registration: {COMPANY_DATA.registration.companyNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
