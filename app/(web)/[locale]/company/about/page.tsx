import { prefetchNewsList } from '@/src/shared/api/queries/news.query'
import { getQueryClient } from '@/src/shared/util/get-query-client'
import { ContactSection } from '@/src/widgets/contact/ui'
import { Cooperation } from '@/src/widgets/cooperation/ui'
import { FeatureSection } from '@/src/widgets/feature/ui'
import { HeroSection } from '@/src/widgets/hero/ui'
import { NewsSection } from '@/src/widgets/news/ui'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

async function AboutPage() {
  const queryClient = getQueryClient()
  await prefetchNewsList(queryClient)

  return (
    <div className="bg-background flex flex-col items-center justify-center">
      <HeroSection />
      <FeatureSection />
      <Cooperation />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NewsSection />
      </HydrationBoundary>
      <ContactSection />
    </div>
  )
}

export default AboutPage
