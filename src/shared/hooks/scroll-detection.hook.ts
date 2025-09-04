'use client'

import { useCallback, useRef, useState } from 'react'

interface UseScrollDetectionOptions {
  threshold?: number
  delay?: number
  resetThreshold?: number
}

export function useScrollDetection(options: UseScrollDetectionOptions = {}) {
  const { threshold = 20, resetThreshold = 10 } = options
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const onScrollHandler = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const scrollTop = e.currentTarget.scrollTop

      if (!isScrolled && scrollTop > threshold) {
        setIsScrolled(true)
      } else if (isScrolled && scrollTop <= resetThreshold) {
        setIsScrolled(false)
      }
    },
    [threshold, resetThreshold, isScrolled]
  )

  const resetScroll = useCallback(() => {
    setIsScrolled(false)
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [])

  return {
    scrollRef,
    isScrolled,
    onScrollHandler,
    resetScroll,
  }
}
