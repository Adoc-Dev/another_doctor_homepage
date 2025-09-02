'use client'

import KoreaFlag from '@/public/icons/korea-flag.svg'
import USAFlag from '@/public/icons/united-states-flag.svg'
import { usePathname, useRouter } from '@/src/i18n/navigation'
import { NavbarButton } from '@/src/shared/ui/resizable-navbar'
import { useLocale } from 'next-intl'

function GlobalButton() {
  const locale = useLocale() as 'ko' | 'en'
  const router = useRouter()
  const pathname = usePathname()

  const flags = {
    ko: <KoreaFlag className="size-6 lg:size-7" />,
    en: <USAFlag className="size-6 lg:size-7" />,
  }

  const handleLanguageChange = (newLocale: 'ko' | 'en') => {
    if (newLocale !== locale) {
      router.push(pathname, { locale: newLocale })
      router.refresh()
    }
  }

  return (
    <NavbarButton
      variant="primary"
      onClick={() => handleLanguageChange(locale === 'ko' ? 'en' : 'ko')}
      className="p-0 shadow-none lg:p-1 lg:px-2 lg:shadow-sm"
    >
      {flags[locale]}
    </NavbarButton>
  )
}

export { GlobalButton }
