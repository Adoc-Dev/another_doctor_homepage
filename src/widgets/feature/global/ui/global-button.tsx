'use client'

import KoreaFlag from '@/public/icons/korea-flag.svg'
import USAFlag from '@/public/icons/united-states-flag.svg'
import { usePathname, useRouter } from '@/src/i18n/navigation'
import { Button } from '@/src/shared/ui'
import { useLocale, useTranslations } from 'next-intl'

function GlobalButton() {
  const locale = useLocale() as 'ko' | 'en'
  const t = useTranslations('header.language')
  const router = useRouter()
  const pathname = usePathname()

  const flags = {
    ko: <KoreaFlag className="size-5" />,
    en: <USAFlag className="size-5" />,
  }

  const handleLanguageChange = (newLocale: 'ko' | 'en') => {
    router.replace(pathname, { locale: newLocale })
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
