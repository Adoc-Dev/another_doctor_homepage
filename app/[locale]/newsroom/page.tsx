import { prefetchPublicNewsList } from '@/src/shared/api/queries/public-news.query'
import { getQueryClient } from '@/src/shared/util/get-query-client'
import { NewsSection } from '@/src/widgets/news/ui'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import type { Metadata } from 'next'

interface NewsroomPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: NewsroomPageProps): Promise<Metadata> {
  const { locale } = await params
  const isKorean = locale === 'ko'

  return {
    title: isKorean ? '뉴스룸' : 'Newsroom',
    description: isKorean
      ? 'AnotherDoctor의 최신 소식, 기술 업데이트, 치과 AI 혁신 뉴스를 확인하세요.'
      : 'Stay updated with the latest news, tech updates, and dental AI innovation from AnotherDoctor.',
    keywords: isKorean
      ? [
          'AnotherDoctor 뉴스',
          '치과 AI 뉴스',
          'T-GRID 업데이트',
          '의료 기술 소식',
        ]
      : [
          'AnotherDoctor news',
          'dental AI news',
          'T-GRID updates',
          'medical tech news',
        ],
    openGraph: {
      title: isKorean ? 'AnotherDoctor 뉴스룸' : 'AnotherDoctor Newsroom',
      description: isKorean
        ? '치과 AI 기술의 최신 소식과 혁신을 전해드립니다'
        : 'Latest updates and innovations in dental AI technology',
      url: locale === 'ko' ? '/newsroom' : '/en/newsroom',
    },
  }
}

async function NewsroomPage() {
  const queryClient = getQueryClient()
  await prefetchPublicNewsList(queryClient, { limit: 10 })

  return (
    <main className="bg-background mt-16 flex flex-col items-center justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NewsSection />
      </HydrationBoundary>
    </main>
  )
}

export default NewsroomPage
