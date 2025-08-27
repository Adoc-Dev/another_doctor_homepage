import { prefetchNewsList } from '@/src/shared/api/queries/news.query'
import {
  StructuredData,
  organizationSchema,
  productSchema,
} from '@/src/shared/ui/structured-data'
import { getQueryClient } from '@/src/shared/util/get-query-client'
import { ContactSection } from '@/src/widgets/contact/ui'
import { Cooperation } from '@/src/widgets/cooperation/ui'
import { FeatureSection } from '@/src/widgets/feature/ui'
import { Footer } from '@/src/widgets/footer/ui/footer'
import { HeroSection } from '@/src/widgets/hero/ui'
import { NewsSection } from '@/src/widgets/news/ui'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '회사소개',
  description:
    'Another Doctor는 AI 기반 치아 색상 측정 기술로 정확한 진단과 완벽한 미소를 제공합니다. 혁신적인 의료 기술로 더 나은 치과 진료를 경험하세요.',
  keywords: [
    '회사소개',
    'Another Doctor',
    'AI 치과',
    '색상 측정',
    '의료기술',
    '치아 진단',
    '치과용 AI',
    '덴탈 테크',
  ],
  openGraph: {
    title: '회사소개 | Another Doctor',
    description:
      'AI 기반 치아 색상 측정 기술의 선두주자, Another Doctor를 소개합니다.',
    url: '/company/about',
    images: [
      {
        url: '/og-about.png',
        width: 1200,
        height: 630,
        alt: 'Another Doctor 회사소개',
      },
    ],
  },
  twitter: {
    title: '회사소개 | Another Doctor',
    description:
      'AI 기반 치아 색상 측정 기술의 선두주자, Another Doctor를 소개합니다.',
  },
  alternates: {
    canonical: '/company/about',
  },
}

async function AboutPage() {
  const queryClient = getQueryClient()
  await prefetchNewsList(queryClient)

  return (
    <div className="bg-background mb-20 flex flex-col items-center justify-center">
      <StructuredData data={organizationSchema} />
      <StructuredData data={productSchema} />
      <HeroSection />
      <FeatureSection />
      <Cooperation />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NewsSection />
      </HydrationBoundary>
      <ContactSection />
      <Footer />
    </div>
  )
}

export default AboutPage
