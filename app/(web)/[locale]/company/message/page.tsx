import { BlurFade } from '@/src/shared/ui'
import { StructuredData } from '@/src/shared/ui/structured-data'
import {
  AnimatedTestimonialsDemo,
  CEOQuote,
} from '@/src/widgets/testimonials/ui'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CEO 메시지',
  description:
    'Another Doctor CEO의 비전과 메시지를 확인하세요. AI 기반 치아 색상 측정 기술을 통해 더 나은 의료 서비스를 제공하고자 하는 우리의 목표를 소개합니다.',
  keywords: [
    'CEO 메시지',
    '비전',
    'Another Doctor',
    'CEO',
    '경영진 메시지',
    '회사 비전',
    '의료 혁신',
  ],
  openGraph: {
    title: 'CEO 메시지 | Another Doctor',
    description:
      'Another Doctor CEO의 비전과 메시지를 확인하세요. AI 기반 치아 색상 측정 기술을 통한 의료 혁신의 꿈을 소개합니다.',
    url: '/company/message',
    images: [
      {
        url: '/og-message.png',
        width: 1200,
        height: 630,
        alt: 'Another Doctor CEO 메시지',
      },
    ],
  },
  twitter: {
    title: 'CEO 메시지 | Another Doctor',
    description: 'Another Doctor CEO의 비전과 메시지를 확인하세요.',
  },
  alternates: {
    canonical: '/company/message',
  },
}

// CEO 메시지 페이지용 구조화된 데이터
const messagePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Another Doctor CEO',
  jobTitle: 'Chief Executive Officer',
  worksFor: {
    '@type': 'Organization',
    name: 'Another Doctor',
  },
  description: 'AI 기반 치아 색상 측정 기술 혁신을 이끄는 CEO',
}

function MessagePage() {
  return (
    <section
      id="news-section"
      className="bg-background flex flex-col items-center justify-center py-12 sm:py-16"
    >
      <StructuredData data={messagePageSchema} />
      <div className="w-full max-w-sm space-y-12 px-8 py-12 sm:max-w-lg">
        <div className="flex flex-col items-center justify-center text-center">
          <BlurFade delay={0.4} inView>
            <h2 className="pointer-events-none mt-3 text-center text-3xl leading-tight font-bold tracking-tighter whitespace-pre-wrap text-gray-900 sm:mt-4 sm:text-4xl md:text-5xl dark:text-gray-100">
              Message
            </h2>
          </BlurFade>
          <BlurFade delay={0.6} inView>
            <p className="mt-4 max-w-3xl text-sm font-medium text-balance whitespace-pre-wrap text-gray-900 sm:mt-5 sm:text-base md:mt-6 md:text-lg lg:text-xl dark:text-gray-100">
              Message
            </p>
          </BlurFade>
        </div>
        <BlurFade delay={0.4} inView>
          <CEOQuote />
          <AnimatedTestimonialsDemo />
        </BlurFade>
      </div>
    </section>
  )
}

export default MessagePage
