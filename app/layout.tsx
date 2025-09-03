export const metadata = {
  title: {
    template: '%s | Another Doctor',
    default: 'Another Doctor',
  },
  description:
    '특허받은 알고리즘을 기반으로 완성된 AI 기반 치아 색상 측정 솔루션 T-GRID로 정밀한 색상 진단을 제공합니다.',
  keywords: [
    'AI 치아 색상 측정',
    'T-GRID',
    '치과 AI 솔루션',
    '색상 측정 기술',
    '치과 진단',
    '의료기기',
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
    { name: 'Another Doctor Team', url: 'https://www.anotherdoctor.org' },
  ],
  creator: 'Another Doctor',
  publisher: 'Another Doctor',
  applicationName: 'Another Doctor',
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
    url: 'https://www.anotherdoctor.org',
    title: 'Another Doctor - AI 기반 치아 색상 측정 솔루션 T-GRID',
    description:
      '특허받은 알고리즘을 기반으로 완성된 AI 기반 치아 색상 측정 솔루션 T-GRID로 정밀한 색상 진단을 제공합니다.',
    siteName: 'Another Doctor',
    images: [
      {
        url: 'https://www.anotherdoctor.org/images/og-image.png', // 절대 URL 사용
        width: 1200,
        height: 630,
        alt: 'Another Doctor - AI 기반 치아 색상 측정 솔루션',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Another Doctor - AI 기반 치아 색상 측정 솔루션 T-GRID',
    description:
      '특허받은 알고리즘을 기반으로 완성된 AI 기반 치아 색상 측정 솔루션 T-GRID로 정밀한 색상 진단을 제공합니다.',
    images: ['https://www.anotherdoctor.org/images/og-image.png'], // 절대 URL 사용
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
    google: 'google-site-verification-placeholder',
    other: {
      'naver-site-verification': '25cf6aed2db309419f19d22981685ac531838404',
    },
  },
  viewport:
    'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
}

export { RootLayout as default } from '@/src/app/layouts/root.layout'
