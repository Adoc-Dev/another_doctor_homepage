import { AvatarCircles } from '@/src/shared/ui'
import { ContactSection } from '@/src/widgets/contact/ui'
import { Cooperation } from '@/src/widgets/cooperation/ui'
import { HeroSection } from '@/src/widgets/hero/ui'
import { NewsSection } from '@/src/widgets/news/ui'
import { TechnologyImpactSection } from '@/src/widgets/product/ui'
import { CEOQuote } from '@/src/widgets/testimonials/ui/ceo-quote'

function AboutPage() {
  return (
    <div className="bg-background flex flex-col items-center justify-center">
      <HeroSection />
      <TechnologyImpactSection />
      {/* <VisionSection /> */}
      <Cooperation />
      <NewsSection />
      <CEOQuote />
      <AvatarCircles />
      <ContactSection />
    </div>
  )
}

export default AboutPage
