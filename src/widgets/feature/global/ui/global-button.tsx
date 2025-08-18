'use client'

import KoreaFlag from '@/public/icons/korea-flag.svg'
import USAFlag from '@/public/icons/united-states-flag.svg'
import { usePathname, useRouter } from '@/src/i18n/navigation'
import { cn } from '@/src/shared/lib/utils'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/shared/ui'
import { ChevronDownIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

function GlobalButton() {
  const locale = useLocale() as 'ko' | 'en'
  const t = useTranslations('header.language')
  const router = useRouter()
  const pathname = usePathname()

  const flags = {
    ko: <KoreaFlag className="size-6" />,
    en: <USAFlag className="size-6" />,
  }

  const handleLanguageChange = (newLocale: 'ko' | 'en') => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="border-gray-200 hover:bg-transparent hover:text-gray-800 focus:ring-0 focus-visible:ring-gray-300 focus-visible:ring-offset-0"
          variant="outline"
        >
          {flags[locale]}
          <p>{t(locale)}</p>
          <ChevronDownIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-gray-200">
        <DropdownMenuItem
          onClick={() => handleLanguageChange('ko')}
          className={cn(
            'hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800',
            locale === 'ko' && 'bg-gray-50'
          )}
        >
          {flags.ko}
          <p className="ml-2">{t('ko')}</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange('en')}
          className={cn(
            'hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800',
            locale === 'en' && 'bg-gray-50'
          )}
        >
          {flags.en}
          <p className="ml-2">{t('en')}</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { GlobalButton }
