'use client'

import { NextIntlClientProvider } from 'next-intl'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

// 언어 컨텍스트를 생성하여 전역에서 접근 가능하게 함
type LocaleContextType = {
  locale: string
  changeLocale: (newLocale: string) => void
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error('useLocale must be used within a I18nProvider')
  }
  return context
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState(null)
  const [locale, setLocale] = useState('ko')
  const [isLoading, setIsLoading] = useState(true)

  // 로컬 스토리지에서 언어 설정 가져오기
  useEffect(() => {
    const savedLocale = localStorage?.getItem('locale') || 'ko'
    setLocale(savedLocale)

    // 언어 파일 동적 로드
    fetch(`/locales/${savedLocale}/common.json`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load language file:', err)
        // 기본 언어로 폴백
        if (savedLocale !== 'ko') {
          setLocale('ko')
          fetch('/locales/ko/common.json')
            .then((res) => res.json())
            .then((data) => {
              setMessages(data)
              setIsLoading(false)
            })
        } else {
          setIsLoading(false)
        }
      })
  }, [])

  // 언어 변경 함수
  const changeLocale = (newLocale: string) => {
    localStorage.setItem('locale', newLocale)
    setLocale(newLocale)

    fetch(`/locales/${newLocale}/common.json`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .then(() => {
        window.location.reload()
      })
  }

  if (isLoading || !messages) return <div>Loading...</div> // 로딩 상태 표시

  return (
    <LocaleContext.Provider value={{ locale, changeLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  )
}
