import { ContactSection } from '@/src/widgets/contact/ui'
import { Cooperation } from '@/src/widgets/cooperation/ui'
import { HeroSection } from '@/src/widgets/hero/ui'
import { NewsSection } from '@/src/widgets/news/ui'
import { TechnologyImpactSection } from '@/src/widgets/product/ui'
import { TimelineDemo } from '@/src/widgets/timeline/ui/timeline'

function AboutPage() {
  return (
    <div className="bg-background flex flex-col items-center justify-center">
      <HeroSection />
      <TechnologyImpactSection />
      {/* <AppleCardsCarouselDemo /> */}
      <TimelineDemo />
      <Cooperation />
      <NewsSection />
      <ContactSection />
    </div>
  )
}

export default AboutPage
