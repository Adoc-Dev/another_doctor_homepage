import { QueryProvider, ThemeProvider } from '@/src/app/providers'
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
  title: 'Another Doctor | AI 색상 측정',
  description: '정확한 색, 완벽한 미소.',
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
          enableSystem
          defaultTheme="system"
          disableTransitionOnChange
        >
          <QueryProvider>
            <NextIntlClientProvider>
              <AlertDialogProvider>{children}</AlertDialogProvider>
            </NextIntlClientProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export { RootLayout }
