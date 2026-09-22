'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BrandMark } from '@/components/ui/BrandMark'
import { NAVIGATION } from '@/lib/constants'
import { Menu, X, Calculator, BarChart3 } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuId = 'mobile-nav'
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  const openMenu = useCallback(() => {
    setIsMenuOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
    document.body.style.overflow = ''
  }, [])

  const toggleMenu = () => (isMenuOpen ? closeMenu() : openMenu())

  // Focus first menu link when menu opens
  useEffect(() => {
    if (isMenuOpen) {
      firstLinkRef.current?.focus()
    }
  }, [isMenuOpen])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) closeMenu()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isMenuOpen, closeMenu])

  // Cleanup scroll lock on unmount
  useEffect(() => () => { document.body.style.overflow = '' }, [])

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-brand-navy/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <BrandMark />

          <nav className="hidden md:flex items-center space-x-8">
            {NAVIGATION.main.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-brand-navy/80 hover:text-brand-gold font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/market">
                <BarChart3 className="w-4 h-4 mr-1.5" />
                Market
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/calculator">
                <Calculator className="w-4 h-4 mr-1.5" />
                Calculator
              </Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link href="/contact">
                Get Started
              </Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-brand-navy"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div
            id={menuId}
            role="navigation"
            aria-label="Mobile navigation"
            className="md:hidden py-4 border-t border-brand-navy/10"
          >
            <nav className="flex flex-col space-y-4">
              {NAVIGATION.main.map((item, idx) => (
                <Link
                  key={item.name}
                  href={item.href}
                  ref={idx === 0 ? firstLinkRef : undefined}
                  className="text-brand-navy/80 hover:text-brand-gold font-medium transition-colors duration-200 px-2 py-1"
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-brand-navy/10">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/market" onClick={closeMenu}>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Market Pricing
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/calculator" onClick={closeMenu}>
                    <Calculator className="w-4 h-4 mr-2" />
                    ROI Calculator
                  </Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link href="/contact" onClick={closeMenu}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
