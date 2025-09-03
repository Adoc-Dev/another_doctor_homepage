'use client'

import { useCallback } from 'react'

export function useScrollTo() {
  const scrollToSection = useCallback((sectionId: string) => {
    if (typeof window === 'undefined') return
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const scrollByAmount = useCallback((amount: number) => {
    window.scrollTo({
      top: window.scrollY + amount,
      behavior: 'smooth',
    })
  }, [])

  return {
    scrollToSection,
    scrollToTop,
    scrollByAmount,
  }
}
