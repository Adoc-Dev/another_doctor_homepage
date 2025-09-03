import { QueryProvider, ThemeProvider } from '@/src/app/providers'
import '@/src/app/styles/globals.css'
import { AlertDialogProvider } from '@/src/shared/ui'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Noto_Sans_KR, Nova_Square } from 'next/font/google'

const notoSansKR = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  subsets: ['latin'],
  display: 'swap',
})

const novaSquare = Nova_Square({
  variable: '--font-nova-square',
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

export const metadata = {
  title: {
    template: '%s | AnotherDoctor',
    default: 'AnotherDoctor',
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
    'AnotherDoctor',
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
  creator: 'AnotherDoctor',
  publisher: 'AnotherDoctor',
  applicationName: 'AnotherDoctor',
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
    title: 'AnotherDoctor - AI 기반 치아 색상 측정 솔루션 T-GRID',
    description:
      '특허받은 알고리즘을 기반으로 완성된 AI 기반 치아 색상 측정 솔루션 T-GRID로 정밀한 색상 진단을 제공합니다.',
    siteName: 'AnotherDoctor',
    images: [
      {
        url: 'https://www.anotherdoctor.org/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AnotherDoctor - AI 기반 치아 색상 측정 솔루션',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AnotherDoctor - AI 기반 치아 색상 측정 솔루션 T-GRID',
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
    google: 'google-site-verification-placeholder',
    other: {
      'naver-site-verification': '25cf6aed2db309419f19d22981685ac531838404',
    },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

async function RootLayout(props: RootLayoutProps) {
  const { children, params } = props
  const { locale } = params

  const messages = await getMessages({ locale })

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${notoSansKR.variable} ${novaSquare.variable}`}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
          forcedTheme="light"
          disableTransitionOnChange
        >
          <QueryProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <AlertDialogProvider>{children}</AlertDialogProvider>
            </NextIntlClientProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryProvider>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}

export { RootLayout }
