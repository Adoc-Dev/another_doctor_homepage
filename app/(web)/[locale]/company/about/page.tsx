import { ContactSection } from '@/src/widgets/contact/ui'
import { Cooperation } from '@/src/widgets/cooperation/ui'
import { HeroSection } from '@/src/widgets/hero/ui'
import { NewsSection } from '@/src/widgets/news/ui'
import { TechnologyImpactSection } from '@/src/widgets/product/ui'
import { VisionSection } from '@/src/widgets/vision/ui'

function AboutPage() {
  return (
    <div className="bg-background flex flex-col items-center justify-center">
      <HeroSection />
      <VisionSection />
      <TechnologyImpactSection />
      <Cooperation />
      <NewsSection />
      <ContactSection />
    </div>
  )
}

export default AboutPage
