'use client'

import KoreaFlag from '@/public/icons/korea-flag.svg'
import USAFlag from '@/public/icons/united-states-flag.svg'
import { usePathname, useRouter } from '@/src/i18n/navigation'
import { Button } from '@/src/shared/ui'
import { useLocale } from 'next-intl'

function GlobalButton() {
  const locale = useLocale() as 'ko' | 'en'

  const router = useRouter()
  const pathname = usePathname()

  const flags = {
    ko: <KoreaFlag className="size-5" />,
    en: <USAFlag className="size-5" />,
  }

  const handleLanguageChange = (newLocale: 'ko' | 'en') => {
    if (newLocale !== locale) {
      console.log(`Changing locale from ${locale} to ${newLocale}`)

      // Next.js 라우터 대신 window.location 사용하여 하드 리프레시 유도
      const newPath = `/${newLocale}${pathname}`
      window.location.href = newPath

      localStorage.setItem('preferred-locale', newLocale)
    }
  }

  return (
    <Button
      className="min-h-0 cursor-pointer rounded-full border-gray-200 p-0 hover:bg-transparent hover:text-gray-800 focus:ring-0 focus-visible:ring-gray-300 focus-visible:ring-offset-0 dark:border-gray-800"
      variant="outline"
      size="icon"
      onClick={() => handleLanguageChange(locale === 'ko' ? 'en' : 'ko')}
    >
      {flags[locale]}
    </Button>
  )
}

export { GlobalButton }
