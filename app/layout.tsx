import { RootLayout } from '@/src/app/layouts/root.layout'

export const metadata = {
  title: {
    template: '%s | AnotherDoctor',
    default: 'AnotherDoctor',
    ko: '어나더닥터',
    en: 'AnotherDoctor',
  },
  description:
    '어나더닥터(AnotherDoctor)는 특허받은 알고리즘을 기반으로 완성된 AI 기반 치아 색상 측정 솔루션 T-GRID로 정밀한 색상 진단을 제공합니다.',
  keywords: [
    '어나더닥터',
    '어 나 더 닥터',
    'AI 치아 색상 측정',
    'T-GRID',
    '치과 AI 솔루션',
    '색상 측정 기술',
    '치과 진단',
    '의료기기',
    'AnotherDoctor',
    'Another Doctor',
    '치과용 인공지능',
    '덴탈 테크놀로지',
    '치아 색상 분석',
    '딥러닝 의료',
    '정밀 진단',
    '색상 보정 기술',
    '치과 혁신',
  ],
  authors: [
    { name: 'AnotherDoctor Team', url: 'https://www.anotherdoctor.org' },
  ],
  creator: '어나더닥터(AnotherDoctor)',
  publisher: '어나더닥터(AnotherDoctor)',
  applicationName: '어나더닥터(AnotherDoctor)',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.anotherdoctor.org'),
  alternates: {
    canonical: '/',
    languages: {
      ko: '/',
      en: '/en',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: ['en_US'],
    url: 'https://www.anotherdoctor.org',
    title: '어나더닥터(AnotherDoctor) - AI 기반 치아 색상 측정 솔루션 T-GRID',
    description:
      '특허받은 알고리즘을 기반으로 완성된 AI 기반 치아 색상 측정 솔루션 T-GRID로 정밀한 색상 진단을 제공합니다.',
    siteName: '어나더닥터(AnotherDoctor)',
    images: [
      {
        url: 'https://www.anotherdoctor.org/images/og-image.png',
        width: 1200,
        height: 630,
        alt: '어나더닥터(AnotherDoctor) - AI 기반 치아 색상 측정 솔루션',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '어나더닥터(AnotherDoctor) - AI 기반 치아 색상 측정 솔루션 T-GRID',
    description:
      '특허받은 알고리즘을 기반으로 완성된 AI 기반 치아 색상 측정 솔루션 T-GRID로 정밀한 색상 진단을 제공합니다.',
    images: ['https://www.anotherdoctor.org/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    other: {
      'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_SITE || '',
    },
    'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_SITE || '',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default RootLayout
