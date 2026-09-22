'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BrandMark } from '@/components/ui/BrandMark'
import { NAVIGATION } from '@/lib/constants'
import { Menu, X, Calculator, BarChart3, ChevronDown } from 'lucide-react'

const linkClass =
  'whitespace-nowrap text-sm font-medium text-brand-navy/80 hover:text-brand-gold transition-colors duration-200'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const menuId = 'mobile-nav'
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)

  const openMenu = useCallback(() => {
    setIsMenuOpen(true)
    setIsServicesOpen(false)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
    document.body.style.overflow = ''
  }, [])

  const closeServices = useCallback(() => setIsServicesOpen(false), [])

  const toggleMenu = () => (isMenuOpen ? closeMenu() : openMenu())

  useEffect(() => {
    if (isMenuOpen) firstLinkRef.current?.focus()
  }, [isMenuOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (isServicesOpen) setIsServicesOpen(false)
      else if (isMenuOpen) closeMenu()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isMenuOpen, isServicesOpen, closeMenu])

  useEffect(() => {
    if (!isServicesOpen) return
    const handler = (e: MouseEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) closeServices()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isServicesOpen, closeServices])

  useEffect(() => () => { document.body.style.overflow = '' }, [])

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-brand-navy/10">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-3 px-3 sm:px-4 lg:px-5">
        <BrandMark className="shrink-0" />

        <nav className="hidden min-w-0 items-center gap-3 lg:flex xl:gap-4">
          <Link href="/about" className={linkClass}>
            About
          </Link>

          <div ref={servicesRef} className="relative">
            <button
              type="button"
              className={`${linkClass} inline-flex items-center gap-0.5`}
              aria-expanded={isServicesOpen}
              aria-haspopup="true"
              onClick={() => setIsServicesOpen((open) => !open)}
            >
              Services
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {isServicesOpen && (
              <div
                role="menu"
                className="absolute left-0 top-full z-50 mt-2 w-52 rounded-lg border border-brand-navy/10 bg-white py-1.5"
              >
                <Link
                  href="/services"
                  role="menuitem"
                  className="block px-3 py-1.5 text-sm font-medium text-brand-navy hover:bg-brand-navy/5 hover:text-brand-gold"
                  onClick={closeServices}
                >
                  All Services
                </Link>
                {NAVIGATION.services.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    role="menuitem"
                    className="block px-3 py-1.5 text-sm text-brand-navy/80 hover:bg-brand-navy/5 hover:text-brand-gold"
                    onClick={closeServices}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="my-1 border-t border-brand-navy/10" />
                <Link
                  href="/market"
                  role="menuitem"
                  className="block px-3 py-1.5 text-sm text-brand-navy/80 hover:bg-brand-navy/5 hover:text-brand-gold"
                  onClick={closeServices}
                >
                  Market Data
                </Link>
                <Link
                  href="/calculator"
                  role="menuitem"
                  className="block px-3 py-1.5 text-sm text-brand-navy/80 hover:bg-brand-navy/5 hover:text-brand-gold"
                  onClick={closeServices}
                >
                  ROI Calculator
                </Link>
              </div>
            )}
          </div>

          {NAVIGATION.desktop.map((item) => (
            <Link key={item.name} href={item.href} className={linkClass}>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <Button size="sm" className="h-8 px-3 text-sm" asChild>
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>

        <button
          className="p-2 text-brand-navy lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div
          id={menuId}
          role="navigation"
          aria-label="Mobile navigation"
          className="border-t border-brand-navy/10 px-4 py-4 lg:hidden"
        >
          <nav className="flex flex-col gap-1">
            {NAVIGATION.main.map((item, idx) => (
              <Link
                key={item.name}
                href={item.href}
                ref={idx === 0 ? firstLinkRef : undefined}
                className="rounded-md px-2 py-2 text-sm font-medium text-brand-navy/80 hover:bg-brand-navy/5 hover:text-brand-gold"
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-brand-navy/10 pt-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/market" onClick={closeMenu}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Market Pricing
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/calculator" onClick={closeMenu}>
                  <Calculator className="mr-2 h-4 w-4" />
                  ROI Calculator
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/contact" onClick={closeMenu}>
                  Get Started
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
