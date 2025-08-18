import { ThemeProvider } from '@/src/app/providers/theme-provider'
import '@/src/app/styles/globals.css'
import { routing } from '@/src/i18n/routing'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { Noto_Sans_KR, Nova_Square } from 'next/font/google'
import { notFound } from 'next/navigation'

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

interface WebLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

async function WebLayout(props: WebLayoutProps) {
  const { children, params } = props
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${notoSansKR.variable} ${novaSquare.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export { WebLayout }
