import { ContactSection } from '@/src/widgets/contact/ui'
import { Cooperation } from '@/src/widgets/cooperation/ui'
import { HeaderNavigation } from '@/src/widgets/header/ui'
import { HeroSection } from '@/src/widgets/hero/ui'
import { MissionSection } from '@/src/widgets/mission/ui'
import { NewsSection } from '@/src/widgets/news/ui'
import { ProductSection } from '@/src/widgets/product/ui'
import { VisionSection } from '@/src/widgets/vision/ui'

function Home() {
  return (
    <div className="bg-background relative mx-auto">
      <HeaderNavigation />
      <div className="bg-background flex min-h-screen w-full flex-col items-center justify-center">
        <HeroSection />
        <VisionSection />
        <Cooperation />
        <MissionSection />
        <ProductSection />
        <NewsSection />
        <ContactSection />
      </div>
    </div>
  )
}

export default Home
