import { routing } from '@/src/i18n/routing'
import { HeaderNavigation } from '@/src/widgets/header/ui'
import { Analytics } from '@vercel/analytics/react'
import { notFound } from 'next/navigation'

interface WebLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

async function WebLayout({ children, params }: WebLayoutProps) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  return (
    <>
      <HeaderNavigation />
      {children}
      <Analytics />
    </>
  )
}

export { WebLayout }
