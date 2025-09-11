import { prefetchPublicNewsList } from '@/src/shared/api/queries/public-news.query'
import { getQueryClient } from '@/src/shared/util/get-query-client'
import { FeatureSection } from '@/src/widgets/feature/ui'
import { Footer } from '@/src/widgets/footer/ui'
import { HeroSection } from '@/src/widgets/hero/ui'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

const NewsSection = dynamic(
  () => import('@/src/widgets/news/ui').then((mod) => mod.NewsSection),
  {
    loading: () => (
      <div className="min-h-[50vh] animate-pulse bg-gray-100 dark:bg-gray-800" />
    ),
  }
)

const Cooperation = dynamic(
  () => import('@/src/widgets/cooperation/ui').then((mod) => mod.Cooperation),
  {
    loading: () => (
      <div className="min-h-[50vh] animate-pulse bg-gray-100 dark:bg-gray-800" />
    ),
  }
)

const ContactSection = dynamic(
  () => import('@/src/widgets/contact/ui').then((mod) => mod.ContactSection),
  {
    loading: () => (
      <div className="min-h-[50vh] animate-pulse bg-gray-100 dark:bg-gray-800" />
    ),
  }
)

async function HomePage() {
  const queryClient = getQueryClient()
  await prefetchPublicNewsList(queryClient, { limit: 10 })

  return (
    <main className="bg-background mb-20 flex flex-col items-center justify-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalOrganization',
            name: 'AnotherDoctor',
            description: 'AI 기반 치아 색상 측정 솔루션 제공업체',
            url: 'https://www.anotherdoctor.org',
            logo: 'https://www.anotherdoctor.org/icons/logo.svg',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'KR',
            },
          }),
        }}
      />
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
