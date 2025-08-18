'use client'

import KoreaFlag from '@/public/icons/korea-flag.svg'
import USAFlag from '@/public/icons/united-states-flag.svg'
import { cn } from '@/src/shared/lib/utils'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/shared/ui'
import { ChevronDownIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

function GlobalButton() {
  // 초기 언어 상태를 localStorage에서 가져옴
  const [language, setLanguage] = useState<'ko' | 'en'>(() => {
    // 클라이언트 사이드에서만 localStorage 접근
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('locale') as 'ko' | 'en') || 'ko'
    }
    return 'ko'
  })

  const t = useTranslations('language')

  const flags = {
    ko: <KoreaFlag className="size-6" />,
    en: <USAFlag className="size-6" />,
  }

  const labels = {
    ko: 'KO',
    en: 'EN',
  }

  // 언어 변경 시 localStorage 업데이트 및 페이지 리로드
  const handleLanguageChange = (newLanguage: 'ko' | 'en') => {
    setLanguage(newLanguage)
    localStorage.setItem('locale', newLanguage)
    window.location.reload() // I18nProvider가 새 언어 파일을 로드하도록 리로드
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="border-gray-200 hover:bg-transparent hover:text-gray-800 focus:ring-0 focus-visible:ring-gray-300 focus-visible:ring-offset-0"
          variant="outline"
        >
          {flags[language]}
          <p className="ml-2">{labels[language]}</p>
          <ChevronDownIcon className="ml-2 size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-gray-200">
        <DropdownMenuItem
          onClick={() => handleLanguageChange('ko')}
          className={cn(
            'hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800',
            language === 'ko' && 'bg-gray-50'
          )}
        >
          {flags.ko}
          <p className="ml-2">{t('ko')}</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange('en')}
          className={cn(
            'hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800',
            language === 'en' && 'bg-gray-50'
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
