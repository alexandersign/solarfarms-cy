import Link from 'next/link'
import { Sun, Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react'
import { NAVIGATION, COMPANY_DATA, SEO_CONFIG } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-solar-500 to-cyprus-600">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div className="font-heading font-bold text-xl">
                <span className="gradient-text">SolarFarms</span>
                <span className="text-gray-300">.cy</span>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Premium solar farm investments in Cyprus with guaranteed 15-20% ROI. 
              Full lifecycle support from development to recycling.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com/company/lighthief-cyprus" className="text-gray-300 hover:text-solar-400 transition-colors" aria-label="Follow us on LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/solarfarmscyprus" className="text-gray-300 hover:text-solar-400 transition-colors" aria-label="Follow us on Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Navigation</h3>
            <nav className="flex flex-col space-y-2">
              {NAVIGATION.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-solar-400 transition-colors text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Services</h3>
            <nav className="flex flex-col space-y-2">
              {NAVIGATION.services.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-solar-400 transition-colors text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-solar-400" />
                <span className="text-gray-300 text-sm">{COMPANY_DATA.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-solar-400" />
                <span className="text-gray-300 text-sm">{COMPANY_DATA.phone}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-solar-400 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  {COMPANY_DATA.address.office.full}
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Company Registration: {COMPANY_DATA.registration.companyNumber} | TIN: {COMPANY_DATA.registration.tin}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 {COMPANY_DATA.name}. All rights reserved.
            </div>
            <div className="flex space-x-6">
              {NAVIGATION.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-solar-400 transition-colors text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
