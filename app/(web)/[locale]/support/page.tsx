import { StructuredData } from '@/src/shared/ui/structured-data'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '고객 지원',
  description:
    'Another Doctor 제품에 대한 기술 지원, 사용법 안내, 문의사항 해결을 위한 고객 지원 서비스를 제공합니다. 전문 지원팀이 도움을 드립니다.',
  keywords: [
    '고객 지원',
    '기술 지원',
    '문의',
    'Another Doctor',
    '사용법',
    'FAQ',
    '고객 서비스',
  ],
  openGraph: {
    title: '고객 지원 | Another Doctor',
    description:
      'Another Doctor 제품에 대한 전문적인 기술 지원과 고객 서비스를 제공합니다.',
    url: '/support',
    images: [
      {
        url: '/og-support.png',
        width: 1200,
        height: 630,
        alt: 'Another Doctor 고객 지원',
      },
    ],
  },
  twitter: {
    title: '고객 지원 | Another Doctor',
    description:
      'Another Doctor 제품에 대한 전문적인 기술 지원과 고객 서비스를 제공합니다.',
  },
  alternates: {
    canonical: '/support',
  },
}

// 고객 지원 페이지용 구조화된 데이터
const supportPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Another Doctor 고객 지원',
  description: 'AI 치아 색상 측정 시스템 관련 기술 지원 및 고객 서비스',
  url: 'https://anotherdoctor.co.kr/support',
  mainEntity: {
    '@type': 'Organization',
    name: 'Another Doctor 고객 지원팀',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: '기술 지원',
      availableLanguage: ['Korean', 'English'],
    },
  },
}

function SupportPage() {
  return (
    <div className="bg-background min-h-screen py-16">
      <StructuredData data={supportPageSchema} />
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
            고객 지원
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Another Doctor 제품에 대한 기술 지원과 문의사항 해결을 위해 도움을
            드립니다.
          </p>
        </div>

        {/* 추후 고객 지원 컨텐츠 추가 예정 */}
        <div className="text-center text-gray-500 dark:text-gray-400">
          고객 지원 페이지 준비 중입니다.
        </div>
      </div>
    </div>
  )
}

export default SupportPage
