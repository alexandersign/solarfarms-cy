import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CiShowcase() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src="/images/ci/industrial-rooftop.jpg"
              alt="Industrial rooftop solar array on a Cyprus warehouse complex"
              width={1200}
              height={675}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-gold">
              Commercial &amp; Industrial
            </p>
            <h2 className="mb-4 font-heading text-3xl font-bold text-brand-navy md:text-4xl">
              Daytime industrial power with a sub-2-year payback
            </h2>
            <p className="mb-6 text-lg text-gray-600">
              Factories, warehouses, hotels, and parks that consume electricity in daylight
              cut EAC bills directly. Three delivery models: self-consumption, off-grid, and
              net billing with ESS. Greenland Family Park outside Limassol: 60 kWp, €2,500
              saved per month, 1.9-year measured payback.
            </p>
            <Button asChild>
              <Link href="/commercial">
                C&amp;I solutions
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
