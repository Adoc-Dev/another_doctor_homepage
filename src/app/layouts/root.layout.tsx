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
  preload: true,
})

const novaSquare = Nova_Square({
  variable: '--font-nova-square',
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

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
