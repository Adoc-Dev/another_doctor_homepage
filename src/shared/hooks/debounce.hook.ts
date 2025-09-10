'use client'

import { useCallback, useRef } from 'react'

/**
 * 디바운스 훅
 * @param callback 콜백 함수
 * @param delay 디바운스 지연 시간
 * @returns 디바운스 훅
 */
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  return useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => callback(...args), delay)
    },
    [callback, delay]
  )
}
