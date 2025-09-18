import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Recycle, CheckCircle, Shield, Globe, Award, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solar Lifecycle Support | End-to-End Asset Management | Lighthief Cyprus',
  description: 'Complete solar asset lifecycle support from Lighthief Cyprus. From installation to recycling with our founding expertise in sustainable solar solutions.',
  keywords: [
    'solar lifecycle support',
    'solar panel recycling',
    'end of life solar',
    'sustainable solar solutions',
    'Lighthief recycling',
  ],
}

export default function LifecycleSupportPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Lifecycle Support
              <span className="block gradient-text">
                Sustainable Solar Solutions
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 text-balance">
              Complete asset lifecycle management from our recycling heritage. 
              Sustainable solutions from installation through end-of-life recycling.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="lg" asChild>
                <Link href="/contact">Learn About Lifecycle Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lifecycle Services */}
      <section className="section-padding">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Recycle className="w-8 h-8 text-green-500 mb-2" />
                <CardTitle>Panel Recycling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Expert recycling services based on our founding expertise since 2017.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-8 h-8 text-cyprus-500 mb-2" />
                <CardTitle>Asset Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Comprehensive protection strategies for long-term asset value.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="w-8 h-8 text-solar-500 mb-2" />
                <CardTitle>Sustainable Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Environmentally responsible practices throughout the asset lifecycle.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-solar-500 to-cyprus-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Complete Lifecycle Management</h2>
          <Button variant="secondary" size="lg" className="bg-white text-solar-600 hover:bg-gray-100" asChild>
            <Link href="/contact">Discuss Lifecycle Services</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
