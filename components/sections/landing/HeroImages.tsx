import Image from 'next/image'

export function HeroBackgroundImage() {
  return (
    <div className="absolute inset-0 z-0">
      <Image
        src="/images/solar-park-field-unsplash.jpg"
        alt=""
        fill
        className="object-cover opacity-10"
        quality={60}
        sizes="100vw"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/80" />
    </div>
  )
}

export function HeroForegroundImage() {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
      <Image
        src="/images/renewable-energy-project-featuring-solar-panels-in-2025-05-05-17-12-38-utc.jpg"
        alt="Modern solar farm installation in Cyprus with blue sky and mountains"
        width={600}
        height={400}
        className="w-full h-auto"
        priority
        quality={75}
        sizes="(max-width: 1024px) 100vw, 600px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-600 uppercase tracking-wider">Turnkey EPC + O&amp;M</div>
            <div className="text-sm font-semibold text-gray-900">Solar &amp; BESS — Single Partner</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-solar-500 to-cyprus-600 flex items-center justify-center" aria-hidden="true">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
