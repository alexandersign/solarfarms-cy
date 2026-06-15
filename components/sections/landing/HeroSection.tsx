import { HeroBackgroundImage, HeroForegroundImage } from './HeroImages'
import { HeroSectionContent } from './HeroSectionContent'
import { HeroFloatingCards } from './HeroFloatingCards'

export function HeroSection() {
  return (
    <section className="relative section-padding bg-gradient-to-br from-cyprus-50 via-white to-solar-50 overflow-hidden">
      <HeroBackgroundImage />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <HeroSectionContent />

          <div className="relative">
            <HeroForegroundImage />
            <HeroFloatingCards />
          </div>
        </div>
      </div>
    </section>
  )
}
