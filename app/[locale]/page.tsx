import { prefetchNewsList } from '@/src/shared/api/queries/news.query'
import { getQueryClient } from '@/src/shared/util/get-query-client'
import { ContactSection } from '@/src/widgets/contact/ui'
import { Cooperation } from '@/src/widgets/cooperation/ui'
import { FeatureSection } from '@/src/widgets/feature/ui'
import { HeroSection } from '@/src/widgets/hero/ui'
import { NewsSection } from '@/src/widgets/news/ui'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { Footer } from 'react-day-picker'

async function HomePage() {
  const queryClient = getQueryClient()
  await prefetchNewsList(queryClient)

  return (
    <main className="bg-background mb-20 flex flex-col items-center justify-center">
      <HeroSection />
      <FeatureSection />
      <Cooperation />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NewsSection />
      </HydrationBoundary>
      <ContactSection />
      <Footer />
    </main>
  )
}

export default HomePage
