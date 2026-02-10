import Link from 'next/link'
import { Sun, Mail, Phone, MapPin, Linkedin, Twitter, BarChart3 } from 'lucide-react'
import { NAVIGATION, COMPANY_DATA, SEO_CONFIG } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
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
              Premium solar farm investments in Cyprus with 8-13% IRR. 
              Full lifecycle support from development to recycling.
            </p>
            <div className="mt-3 pt-3 border-t border-gray-700">
              <p className="text-xs text-gray-400">Powered by <strong className="text-solar-400">Lighthief</strong></p>
              <p className="text-xs text-gray-500">100s MW managed across 11 countries</p>
            </div>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/lighthiefcyprus/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-solar-400 transition-colors" aria-label="Follow us on LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/solarfarmscyprus" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-solar-400 transition-colors" aria-label="Follow us on Twitter">
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

          {/* Crypto */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Crypto Investments</h3>
            <nav className="flex flex-col space-y-2">
              {NAVIGATION.crypto.map((item) => (
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
            
            {/* Market Data highlight */}
            <div className="pt-3 mt-3 border-t border-gray-700">
              <Link
                href="/market"
                className="inline-flex items-center gap-2 text-sm font-medium text-cyprus-300 hover:text-solar-400 transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                Cyprus Market Pricing
              </Link>
              <p className="text-xs text-gray-500 mt-1">Live DAM price data &amp; BESS analysis</p>
            </div>
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
