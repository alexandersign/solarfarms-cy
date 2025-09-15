import { Metadata } from 'next'
import { COMPANY_DATA } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Terms of Service | SolarFarms.cy | Lighthief Cyprus',
  description: 'Terms of service for SolarFarms.cy and Lighthief Cyprus Ltd. Legal terms and conditions for using our website and services.',
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-4xl font-heading font-bold gradient-text mb-8">
            Terms of Service
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> September 11, 2025
            </p>
            
            <p className="mb-6">
              These Terms of Service ("Terms") govern your use of the SolarFarms.cy website 
              and services provided by {COMPANY_DATA.legalName} ("Company," "we," "our," or "us").
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-6">
              By accessing or using our website and services, you agree to be bound by these Terms. 
              If you do not agree to these Terms, please do not use our services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Services Description</h2>
            <p className="mb-4">Lighthief Cyprus provides:</p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Solar farm investment opportunities and consultation services</li>
              <li>EPC (Engineering, Procurement, Construction) services</li>
              <li>O&M (Operations & Maintenance) services</li>
              <li>Project development and licensing services</li>
              <li>Investment analysis tools and educational resources</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Investment Disclaimer</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <p className="text-yellow-800">
                <strong>Important:</strong> All investment projections, ROI calculations, and financial 
                estimates are based on current market conditions and historical data. Actual returns 
                may vary based on weather conditions, electricity rates, equipment performance, and 
                market factors. All investments carry risk, and past performance does not guarantee 
                future results.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Use of Website</h2>
            <p className="mb-4">You agree to use our website and services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 mb-6">
              <li>Use the website for any unlawful or prohibited purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of the website</li>
              <li>Transmit any harmful or malicious code</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Intellectual Property</h2>
            <p className="mb-6">
              All content on this website, including text, graphics, logos, images, and software, 
              is the property of {COMPANY_DATA.legalName} and is protected by copyright and other 
              intellectual property laws.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Limitation of Liability</h2>
            <p className="mb-6">
              To the maximum extent permitted by law, {COMPANY_DATA.legalName} shall not be liable 
              for any indirect, incidental, special, consequential, or punitive damages arising from 
              your use of our website or services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Governing Law</h2>
            <p className="mb-6">
              These Terms are governed by the laws of the Republic of Cyprus. Any disputes arising 
              from these Terms shall be subject to the exclusive jurisdiction of the Cyprus courts.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Changes to Terms</h2>
            <p className="mb-6">
              We reserve the right to modify these Terms at any time. Changes will be effective 
              immediately upon posting on this website. Your continued use of our services 
              constitutes acceptance of the modified Terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Contact Information</h2>
            <p className="mb-4">For questions about these Terms, please contact us:</p>
            <div className="bg-gray-50 rounded-lg p-6">
              <p><strong>{COMPANY_DATA.legalName}</strong></p>
              <p>{COMPANY_DATA.address.registered.full}</p>
              <p>Email: {COMPANY_DATA.email}</p>
              <p>Phone: {COMPANY_DATA.phone}</p>
              <p>Company Registration: {COMPANY_DATA.registration.companyNumber}</p>
              <p>TIN: {COMPANY_DATA.registration.tin}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
