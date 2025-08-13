import { ThemeProvider } from '@/src/app/providers/theme-provider'
import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import '../styles/globals.css'

const notoSansKR = Noto_Sans_KR({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Another Doctor | AI 색상 측정',
  description: '정확한 색, 완벽한 미소.',
}

function WebLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${notoSansKR.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export { WebLayout }
