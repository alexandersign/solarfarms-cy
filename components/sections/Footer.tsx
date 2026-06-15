import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, BarChart3 } from 'lucide-react'
import { BrandMark } from '@/components/ui/BrandMark'
import { NAVIGATION, COMPANY_DATA } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="space-y-4">
            <BrandMark variant="footer" />
            <p className="text-white/70 text-sm leading-relaxed">
              Premium solar farm investments in Cyprus with 8-13% IRR.
              Full lifecycle support from development to recycling.
            </p>
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-white/50">
                Powered by <strong className="text-brand-gold">Lighthief</strong>
              </p>
              <p className="text-xs text-white/40">100s MW managed across 11 countries</p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/lighthiefcyprus/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-brand-gold transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-brand-gold">Navigation</h3>
            <nav className="flex flex-col space-y-2">
              {NAVIGATION.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/70 hover:text-brand-gold transition-colors text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-brand-gold">Crypto Investments</h3>
            <nav className="flex flex-col space-y-2">
              {NAVIGATION.crypto.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/70 hover:text-brand-gold transition-colors text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-brand-gold">Services</h3>
            <nav className="flex flex-col space-y-2">
              {NAVIGATION.services.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/70 hover:text-brand-gold transition-colors text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="pt-3 mt-3 border-t border-white/10">
              <Link
                href="/market"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-brand-gold transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                Cyprus Market Pricing
              </Link>
              <p className="text-xs text-white/40 mt-1">Live DAM price data &amp; BESS analysis</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-brand-gold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="text-white/70 text-sm">{COMPANY_DATA.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="text-white/70 text-sm">{COMPANY_DATA.phone}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
                <span className="text-white/70 text-sm">
                  {COMPANY_DATA.address.office.full}
                </span>
              </div>
              <div className="text-xs text-white/40 mt-2">
                Company Registration: {COMPANY_DATA.registration.companyNumber} | TIN: {COMPANY_DATA.registration.tin}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/50 text-sm">
              © {new Date().getFullYear()} {COMPANY_DATA.name}. All rights reserved.
            </div>
            <div className="flex space-x-6">
              {NAVIGATION.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/50 hover:text-brand-gold transition-colors text-sm"
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
