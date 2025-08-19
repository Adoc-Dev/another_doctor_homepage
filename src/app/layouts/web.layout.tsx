import { routing } from '@/src/i18n/routing'
import { HeaderNavigation } from '@/src/widgets/header/ui'
import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'

interface WebLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

function WebLayout({ children, params }: WebLayoutProps) {
  const { locale } = params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  return (
    <div>
      <HeaderNavigation />
      {children}
    </div>
  )
}

export { WebLayout }
