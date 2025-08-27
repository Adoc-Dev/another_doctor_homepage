'use client'

import KoreaFlag from '@/public/icons/korea-flag.svg'
import USAFlag from '@/public/icons/united-states-flag.svg'
import { usePathname } from '@/src/i18n/navigation'
import { NavbarButton } from '@/src/shared/ui/resizable-navbar'
import { useLocale } from 'next-intl'

function GlobalButton() {
  const locale = useLocale() as 'ko' | 'en'

  const pathname = usePathname()

  const flags = {
    ko: <KoreaFlag className="size-7" />,
    en: <USAFlag className="size-7" />,
  }

  const handleLanguageChange = (newLocale: 'ko' | 'en') => {
    if (newLocale !== locale) {
      console.log(`Changing locale from ${locale} to ${newLocale}`)

      const newPath = `/${newLocale}${pathname}`
      window.location.href = newPath

      localStorage.setItem('preferred-locale', newLocale)
    }
  }

  return (
    <NavbarButton
      variant="primary"
      onClick={() => handleLanguageChange(locale === 'ko' ? 'en' : 'ko')}
      className="p-1 px-2"
    >
      {flags[locale]}
    </NavbarButton>
  )
}

export { GlobalButton }
