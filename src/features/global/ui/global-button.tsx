'use client'

import KoreaFlag from '@/public/icons/korea-flag.svg'
import USAFlag from '@/public/icons/united-states-flag.svg'
import { usePathname } from '@/src/i18n/navigation'
import { Button } from '@/src/shared/ui'
import { useLocale } from 'next-intl'

function GlobalButton() {
  const locale = useLocale() as 'ko' | 'en'

  const pathname = usePathname()

  const flags = {
    ko: <KoreaFlag className="size-6" />,
    en: <USAFlag className="size-6" />,
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
    <Button
      className="min-h-0 cursor-pointer rounded-xl border-gray-200 px-2 py-1 hover:bg-transparent hover:text-gray-800 focus:ring-0 focus-visible:ring-gray-300 focus-visible:ring-offset-0 dark:border-gray-800"
      variant="outline"
      onClick={() => handleLanguageChange(locale === 'ko' ? 'en' : 'ko')}
    >
      {flags[locale]}
    </Button>
  )
}

export { GlobalButton }
