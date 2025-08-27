import { QueryProvider, ThemeProvider } from '@/src/app/providers'
import GoogleAnalytics from '@/src/app/providers/google-analytics'
import '@/src/app/styles/globals.css'
import { AlertDialogProvider } from '@/src/shared/ui'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { NextIntlClientProvider } from 'next-intl'
import { Noto_Sans_KR, Nova_Square } from 'next/font/google'
import Head from 'next/head'

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
    template: '%s | Another Doctor',
    default: 'Another Doctor | AI 색상 측정',
  },
  description:
    '정확한 색, 완벽한 미소. AI 기반 치아 색상 측정 솔루션으로 정밀한 진단을 제공합니다.',
  keywords: [
    'AI',
    '치아',
    '색상 측정',
    '치과',
    '진단',
    '의료기기',
    'Another Doctor',
    '치과용 AI',
    '덴탈 테크',
  ],
  authors: [{ name: 'Another Doctor' }],
  creator: 'Another Doctor',
  publisher: 'Another Doctor',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://anotherdoctor.co.kr'),
  alternates: {
    canonical: '/',
    languages: {
      'ko-KR': '/ko',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://anotherdoctor.co.kr',
    title: 'Another Doctor | AI 색상 측정',
    description:
      '정확한 색, 완벽한 미소. AI 기반 치아 색상 측정 솔루션으로 정밀한 진단을 제공합니다.',
    siteName: 'Another Doctor',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Another Doctor - AI 색상 측정 솔루션',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Another Doctor | AI 색상 측정',
    description: '정확한 색, 완벽한 미소. AI 기반 치아 색상 측정 솔루션',
    images: ['/twitter-image.png'],
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
      'naver-site-verification': 'naver-verification-placeholder',
    },
  },
}

interface RootLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

async function RootLayout(props: RootLayoutProps) {
  const { children, params } = props
  const { locale } = await params

  return (
    <html lang={locale} suppressHydrationWarning>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <body className={`${notoSansKR.variable} ${novaSquare.variable}`}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
          forcedTheme="light"
          disableTransitionOnChange
        >
          <QueryProvider>
            <NextIntlClientProvider>
              <AlertDialogProvider>{children}</AlertDialogProvider>
            </NextIntlClientProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryProvider>
          <GoogleAnalytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

export { RootLayout }
