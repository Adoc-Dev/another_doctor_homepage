import { HeroSection } from '@/src/widgets/hero/ui'
import { VisionSection } from '@/src/widgets/vision/ui'

function AboutPage() {
  return (
    <div className="bg-background flex min-h-screen w-full flex-col items-center justify-center">
      <HeroSection />
      <VisionSection />
      {/* <TechnologyImpactSection />
      <Cooperation />
      <NewsSection />
      <ContactSection /> */}
    </div>
  )
}

export default AboutPage
