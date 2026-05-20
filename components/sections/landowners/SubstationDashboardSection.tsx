'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Zap, ExternalLink, Info } from 'lucide-react'
import { CYPRUS_SUBSTATION_DASHBOARD } from '@/lib/grid-substation'

export function SubstationDashboardSection({ compact = false }: { compact?: boolean }) {
  const [embedFailed, setEmbedFailed] = useState(false)
  const cfg = CYPRUS_SUBSTATION_DASHBOARD

  if (compact) {
    return (
      <Card className="border-cyprus-200 bg-cyprus-50/50">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3">
              <Zap className="w-6 h-6 text-cyprus-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900">{cfg.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{cfg.description}</p>
              </div>
            </div>
            <Button variant="outline" asChild className="flex-shrink-0">
              <Link href={cfg.dashboardUrl} target="_blank" rel="noopener noreferrer">
                Open map
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <section id="substation-grid" className="section-padding bg-gradient-to-br from-cyprus-50 to-white scroll-mt-20">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-3 bg-cyprus-100 text-cyprus-800">Grid connection</Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 text-[#C9A432]">
              {cfg.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{cfg.description}</p>
          </div>

          <Card className="overflow-hidden border-2 border-cyprus-100 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyprus-600" />
                Live dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {!embedFailed ? (
                <iframe
                  title={cfg.title}
                  src={cfg.embedUrl}
                  className="w-full border-0"
                  style={{ minHeight: '520px' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onError={() => setEmbedFailed(true)}
                />
              ) : (
                <div className="p-10 text-center bg-gray-50">
                  <p className="text-gray-600 mb-4">
                    The map cannot be embedded here. Open it in a new tab for the full interactive view.
                  </p>
                  <Button asChild>
                    <Link href={cfg.dashboardUrl} target="_blank" rel="noopener noreferrer">
                      Open substation dashboard
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              )}
              <div className="px-4 py-3 bg-gray-50 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
                <span className="text-gray-500 flex items-start gap-2">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {cfg.attribution}
                </span>
                <Link
                  href={cfg.dashboardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyprus-600 font-medium hover:underline inline-flex items-center"
                >
                  Full screen
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
