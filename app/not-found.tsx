import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyprus-50 via-white to-solar-50">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            The solar investment opportunity you're looking for doesn't exist. 
            Let's get you back on track to premium returns.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="gradient" size="lg">
            <Link href="/">
              Back to Home
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link href="/calculator">
              ROI Calculator
            </Link>
          </Button>
        </div>
        
        <div className="mt-12 text-sm text-gray-500">
          <p>Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Link href="/about" className="hover:text-solar-600 transition-colors">
              About Us
            </Link>
            <Link href="/services" className="hover:text-solar-600 transition-colors">
              Services
            </Link>
            <Link href="/projects" className="hover:text-solar-600 transition-colors">
              Projects
            </Link>
            <Link href="/contact" className="hover:text-solar-600 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
