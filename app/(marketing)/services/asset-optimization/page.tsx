import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingUp, CheckCircle, Zap, Camera, BarChart3, Settings, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solar Asset Optimization Services | Performance Enhancement | Lighthief Cyprus',
  description: 'Maximize your solar farm performance with Lighthief Cyprus asset optimization. Advanced diagnostics, cleaning, and performance enhancement services.',
  keywords: [
    'solar asset optimization',
    'solar farm performance',
    'solar cleaning services',
    'thermal diagnostics',
    'drone inspections Cyprus',
  ],
}

export default function AssetOptimizationPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Asset Optimization
              <span className="block gradient-text">
                Performance Enhancement Services
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 text-balance">
              Maximize your solar farm performance with advanced optimization services. 
              Protect and enhance your 8-12% IRR through professional asset management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="lg" asChild>
                <Link href="/contact">Request Optimization Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Optimization Services */}
      <section className="section-padding">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-solar-500 mb-2" />
                <CardTitle>Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Advanced analytics to identify and resolve performance issues.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Camera className="w-8 h-8 text-cyprus-500 mb-2" />
                <CardTitle>Thermal Diagnostics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Drone-based thermal imaging to detect equipment issues early.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Settings className="w-8 h-8 text-green-500 mb-2" />
                <CardTitle>System Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Continuous optimization of system parameters for maximum yield.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-solar-500 to-cyprus-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Optimize Your Solar Asset Performance</h2>
          <Button variant="secondary" size="lg" className="bg-white text-solar-600 hover:bg-gray-100" asChild>
            <Link href="/contact">Get Optimization Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
