import { prefetchNewsList } from '@/src/shared/api/queries/news.query'
import { StructuredData } from '@/src/shared/ui/structured-data'
import { getQueryClient } from '@/src/shared/util/get-query-client'
import { NewsSection } from '@/src/widgets/news/ui'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '뉴스룸',
  description:
    'Another Doctor의 최신 소식과 AI 치아 색상 측정 기술 관련 뉴스를 확인하세요. 의료 기술 혁신과 회사 소식을 한눈에 보실 수 있습니다.',
  keywords: [
    '뉴스룸',
    '소식',
    'Another Doctor',
    'AI 치과 뉴스',
    '의료기술 소식',
    '치과 기술 동향',
    '회사 소식',
  ],
  openGraph: {
    title: '뉴스룸 | Another Doctor',
    description:
      'Another Doctor의 최신 소식과 AI 치아 색상 측정 기술 관련 뉴스를 확인하세요.',
    url: '/newsroom',
    images: [
      {
        url: '/og-newsroom.png',
        width: 1200,
        height: 630,
        alt: 'Another Doctor 뉴스룸',
      },
    ],
  },
  twitter: {
    title: '뉴스룸 | Another Doctor',
    description:
      'Another Doctor의 최신 소식과 AI 치아 색상 측정 기술 관련 뉴스를 확인하세요.',
  },
  alternates: {
    canonical: '/newsroom',
  },
}

// 뉴스 페이지용 구조화된 데이터
const newsPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Another Doctor 뉴스룸',
  description: 'AI 치아 색상 측정 기술 관련 최신 뉴스와 회사 소식',
  url: 'https://anotherdoctor.co.kr/newsroom',
  mainEntity: {
    '@type': 'ItemList',
    name: '뉴스 목록',
    description: 'Another Doctor 관련 뉴스 및 소식 목록',
  },
}

async function NewsroomPage() {
  const queryClient = getQueryClient()
  await prefetchNewsList(queryClient)

  return (
    <main className="bg-background mt-16 flex flex-col items-center justify-center">
      <StructuredData data={newsPageSchema} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NewsSection />
      </HydrationBoundary>
    </main>
  )
}

export default NewsroomPage
