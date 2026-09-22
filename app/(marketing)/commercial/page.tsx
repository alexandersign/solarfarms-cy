import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StructuredData, faqSchema, breadcrumbSchema } from '@/components/seo/StructuredData'
import { CiInquiryForm } from '@/components/forms/CiInquiryForm'
import { COMPANY_DATA } from '@/lib/constants'
import {
  Battery,
  CheckCircle,
  Factory,
  Sun,
  Zap,
} from 'lucide-react'

const CI_FAQS = [
  {
    question: 'How can a Cyprus C&I solar system pay back in under two years?',
    answer:
      'Sites with high daytime load displace expensive grid electricity rather than selling wholesale power. On industrial and hospitality roofs, self-consumption can cut the bill enough to recover capex in under two years. Greenland Family Park outside Limassol measured €2,500 per month saved on a 60 kWp system and a 1.9-year payback.',
  },
  {
    question: 'What is net billing with ESS in Cyprus?',
    answer:
      'Net billing credits surplus solar exported to the grid at the published rate, while you consume on-site first. Adding ESS stores midday surplus for evening or peak-tariff hours so less energy is exported at a low credit and more displaces retail kWh.',
  },
  {
    question: 'When is off-grid C&I solar the right choice?',
    answer:
      'Off-grid or weak-grid sites — farms, quarries, remote warehouses, events venues — avoid diesel genset fuel and connection delays. PV plus LFP storage and a hybrid inverter can run daytime process loads and overnight essential circuits.',
  },
  {
    question: 'Who installs commercial rooftop solar in Cyprus?',
    answer:
      'Lighthief Cyprus Ltd (HE 477423) delivers C&I EPC from survey to commissioning, with O&M from our Cyprus team. Contact Alexander Papacosta on +357 99 164 158 or office@lighthief.com.',
  },
]

export const metadata: Metadata = {
  title: 'C&I Solar Cyprus | Industrial Self-Consumption, Off-Grid & Net Billing',
  description:
    'Commercial and industrial solar in Cyprus: daytime self-consumption with sub-2-year payback, off-grid PV+ESS, and net billing with storage. Greenland Family Park: 60 kWp, €2,500/month saved, 1.9-year measured payback.',
  keywords: [
    'C&I solar Cyprus',
    'commercial rooftop solar Cyprus',
    'industrial self consumption solar',
    'net billing Cyprus ESS',
    'off grid solar Cyprus commercial',
    'Greenland Family Park solar',
  ],
  alternates: {
    canonical: 'https://solarfarms.cy/commercial',
  },
  openGraph: {
    title: 'C&I Solar Cyprus | Sub-2-Year Daytime Payback',
    description:
      'Industrial daytime self-consumption, off-grid, and net billing with ESS. Measured case: Greenland Family Park, 60 kWp, €2,500/month, 1.9 years.',
    type: 'website',
    images: [{ url: '/images/ci/industrial-rooftop.jpg', width: 1200, height: 675 }],
  },
}

const solutions = [
  {
    id: 'daytime',
    icon: Factory,
    title: 'Industrial daytime consumption',
    image: '/images/ci/industrial-rooftop.jpg',
    alt: 'Warehouse rooftop solar array in coastal Cyprus at midday',
    payback: 'Typically under 2 years',
    summary:
      'Factories, cold stores, and warehouses that run in daylight displace retail EAC kWh hour-for-hour. No wholesale price risk — the return is the bill you stop paying.',
    points: [
      'Highest IRR when the load curve matches the solar curve',
      'Metal roofs and carports, 50 kWp to multi-MW',
      'In-house EPC, grid application, and O&M',
    ],
  },
  {
    id: 'off-grid',
    icon: Battery,
    title: 'Off-grid and weak-grid sites',
    image: '/images/ci/off-grid-ess.jpg',
    alt: 'Off-grid solar workshop with LFP battery cabinets in Cyprus',
    payback: 'Diesel displacement from month one',
    summary:
      'Remote industrial sites, agricultural processing, and venues without a firm grid connection. PV + LFP storage replaces generator runtime during solar hours and covers essential overnight load.',
    points: [
      'Hybrid inverters with generator integration',
      'LFP ESS sized to critical circuits, not the whole site',
      'No TSOC queue for behind-the-meter islands',
    ],
  },
  {
    id: 'net-billing',
    icon: Zap,
    title: 'Net billing with ESS',
    image: '/images/ci/net-billing-ess.jpg',
    alt: 'Commercial building with rooftop solar and outdoor battery enclosure',
    payback: 'Faster than export-only net billing',
    summary:
      'Export credits under Cyprus net billing are lower than the retail tariff. Storage keeps surplus on site for evenings and peaks so more kWh offset the full bill instead of a credit rate.',
    points: [
      'Self-consume first, export only residual surplus',
      'Peak-tariff shaving with LFP ESS',
      'Fits offices, retail, and mixed-use sites with evening load',
    ],
  },
]

export default function CommercialPage() {
  return (
    <div className="min-h-screen">
      <StructuredData data={faqSchema(CI_FAQS)} />
      <StructuredData
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://solarfarms.cy' },
          { name: 'C&I Solar', url: 'https://solarfarms.cy/commercial' },
        ])}
      />

      <section className="relative overflow-hidden bg-brand-navy text-white">
        <Image
          src="/images/ci/industrial-rooftop.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-25"
        />
        <div className="container relative z-10 py-20 md:py-28">
          <Badge className="mb-5 border-white/20 bg-white/10 text-white">
            Commercial &amp; Industrial
          </Badge>
          <h1 className="mb-6 max-w-3xl font-heading text-4xl font-bold md:text-5xl">
            C&amp;I solar in Cyprus: daytime load, off-grid, and net billing with ESS
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-white/80">
            If your site consumes power while the sun is up, rooftop PV cuts the EAC bill
            directly. Industrial self-consumption is designed for payback under two years.
            Off-grid and net-billing-plus-storage cover the sites that do not match a pure
            daytime factory curve.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="bg-white text-brand-navy hover:bg-gray-100" asChild>
              <Link href="#survey">Request a site survey</Link>
            </Button>
            <Button size="lg" variant="outline-on-dark" asChild>
              <Link href="#greenland">Greenland Family Park case</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold text-brand-navy">Three C&amp;I delivery models</h2>
            <p className="text-gray-600">
              Farm-scale merchant parks target 8–12% equity IRR. Behind-the-meter C&amp;I is a
              different product: it offsets the retail tariff you already pay.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {solutions.map((item) => (
              <Card key={item.id} id={item.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image src={item.image} alt={item.alt} fill className="object-cover" />
                </div>
                <CardHeader>
                  <item.icon className="mb-2 h-6 w-6 text-brand-gold" />
                  <CardTitle className="text-xl text-brand-navy">{item.title}</CardTitle>
                  <p className="text-sm font-medium text-brand-gold">{item.payback}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{item.summary}</p>
                  <ul className="space-y-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm text-gray-700">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-navy" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="greenland" className="section-padding bg-gray-50">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative min-h-[280px] overflow-hidden rounded-2xl">
              <Image
                src="/images/ci/greenland-family-park.jpg"
                alt="Greenland Family Park outside Limassol with rooftop solar on visitor buildings"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-gold">
                Measured client result
              </p>
              <h2 className="mb-4 font-heading text-3xl font-bold text-brand-navy">
                Greenland Family Park, outside Limassol
              </h2>
              <p className="mb-8 text-gray-600">
                Hospitality and leisure load peaks in daylight — rides, kitchens, HVAC, and
                irrigation. A 60 kWp rooftop system was installed for self-consumption. Savings
                below are measured on the electricity bill, not a modelled IRR.
              </p>
              <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg border border-brand-navy/10 bg-white p-4">
                  <div className="text-2xl font-bold text-brand-navy">60 kWp</div>
                  <div className="text-xs text-gray-500">System size</div>
                </div>
                <div className="rounded-lg border border-brand-navy/10 bg-white p-4">
                  <div className="text-2xl font-bold text-brand-navy">€2,500</div>
                  <div className="text-xs text-gray-500">Saved / month</div>
                </div>
                <div className="rounded-lg border border-brand-navy/10 bg-white p-4">
                  <div className="text-2xl font-bold text-brand-navy">1.9 yr</div>
                  <div className="text-xs text-gray-500">Measured payback</div>
                </div>
                <div className="rounded-lg border border-brand-navy/10 bg-white p-4">
                  <div className="text-2xl font-bold text-brand-navy">€30k</div>
                  <div className="text-xs text-gray-500">Saved / year</div>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Figures are the client’s measured bill reduction on this 60 kWp array. Other
                sites vary with tariff, load shape, and roof yield. Not a guaranteed return.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container max-w-3xl">
          <h2 className="mb-8 text-center font-heading text-3xl font-bold text-brand-navy">C&amp;I questions</h2>
          <dl className="space-y-6">
            {CI_FAQS.map((faq) => (
              <div key={faq.question}>
                <dt className="font-semibold text-brand-navy">{faq.question}</dt>
                <dd className="mt-2 text-gray-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="survey" className="section-padding bg-gray-50">
        <div className="container max-w-3xl">
          <div className="mb-8 text-center">
            <Sun className="mx-auto mb-3 h-8 w-8 text-brand-gold" />
            <h2 className="mb-3 font-heading text-3xl font-bold text-brand-navy">Request a C&amp;I site survey</h2>
            <p className="text-gray-600">
              Send a load profile or a daytime operating window. {COMPANY_DATA.name} will size
              PV and, if needed, ESS. Direct: {COMPANY_DATA.contacts.cyprusDirector.name},{' '}
              {COMPANY_DATA.contacts.cyprusDirector.phone}.
            </p>
          </div>
          <div className="rounded-2xl border border-brand-navy/10 bg-white p-6 md:p-8">
            <CiInquiryForm />
          </div>
          <p className="mt-6 text-center text-sm text-gray-500">
            Or email{' '}
            <a className="text-brand-navy underline" href={`mailto:${COMPANY_DATA.email}`}>
              {COMPANY_DATA.email}
            </a>
            {' '}· {COMPANY_DATA.phone}
          </p>
        </div>
      </section>
    </div>
  )
}
