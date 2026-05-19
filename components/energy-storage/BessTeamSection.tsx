import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Mail, Phone, Factory, MapPin, CheckCircle, ArrowRight } from 'lucide-react'
import { BESS_CYPRUS_TEAM, BESS_POLAND_BACKING } from '@/lib/marketing/bess-page'

export function BessTeamSection() {
  const poland = BESS_POLAND_BACKING

  return (
    <section id="bess-team" className="section-padding scroll-mt-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-[#C9A432]">
            Your BESS Project Team
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            In-house Cyprus engineering and commercial leadership, backed by Lighthief&apos;s European EPC and O&M group
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {BESS_CYPRUS_TEAM.map((member) => (
            <Card key={member.name} className="overflow-hidden border-2 border-cyprus-100">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-36 h-48 sm:h-auto flex-shrink-0 bg-gray-100">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, 144px"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <Badge className="mb-2 bg-[#1A365D] text-white hover:bg-[#1A365D]">
                      Cyprus delivery
                    </Badge>
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-sm font-medium text-cyprus-600 mb-1">{member.position}</p>
                    <p className="text-xs text-gray-500 mb-3">{member.role}</p>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-4">{member.bio}</p>
                    <ul className="space-y-1 mb-4">
                      {member.credentials.map((c) => (
                        <li key={c} className="flex items-start gap-2 text-xs text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                          {c}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center gap-1 text-[#1A365D] hover:underline"
                      >
                        <Mail className="w-4 h-4" />
                        {member.email}
                      </a>
                      {member.phone && (
                        <a
                          href={`tel:${member.phone.replace(/\s/g, '')}`}
                          className="inline-flex items-center gap-1 text-[#1A365D] hover:underline"
                        >
                          <Phone className="w-4 h-4" />
                          {member.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-5xl mx-auto border-2 border-[#1A365D]/20 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-5 gap-0">
              <div
                className="lg:col-span-2 p-8 text-white flex flex-col justify-center"
                style={{ background: 'linear-gradient(135deg, #1A365D 0%, #2B5FA0 100%)' }}
              >
                <Badge className="w-fit mb-4 bg-white/20 text-white border-0">Group backing</Badge>
                <h3 className="text-2xl font-bold mb-2">{poland.name}</h3>
                <p className="text-blue-200 mb-4">{poland.position}</p>
                <p className="text-sm text-white/90 mb-6">{poland.headline}</p>
                <a
                  href={`mailto:${poland.email}`}
                  className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white"
                >
                  <Mail className="w-4 h-4" />
                  {poland.email}
                </a>
              </div>

              <div className="lg:col-span-3 p-8">
                <div className="flex gap-6 mb-6">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 hidden sm:block">
                    <Image
                      src={poland.image}
                      alt={poland.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div>
                    <p className="text-gray-600 mb-4">{poland.description}</p>
                    <ul className="space-y-2">
                      {poland.credentials.map((c) => (
                        <li key={c} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  className="rounded-xl p-5 border"
                  style={{ backgroundColor: '#F0F4F8', borderColor: '#1A365D22' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Factory className="w-5 h-5 text-[#1A365D]" />
                    <h4 className="font-semibold text-[#1A365D]">
                      {poland.rdCenter.location} R&D Centre
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{poland.rdCenter.size} — live test site</span>
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {poland.rdCenter.facilities.map((f) => (
                      <li key={f} className="text-xs text-gray-600 flex items-start gap-2">
                        <span className="text-[#C9A432]">•</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link href="/about#team">
              Meet the full Lighthief team
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
