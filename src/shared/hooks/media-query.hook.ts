'use client'

import { useEffect, useState } from 'react'

/**
 * 미디어 쿼리 훅
 * @param query 미디어 쿼리
 * @returns 미디어 쿼리 훅
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query)

      setMatches(media.matches)

      const listener = (event: MediaQueryListEvent) => {
        setMatches(event.matches)
      }

      media.addEventListener('change', listener)

      return () => {
        media.removeEventListener('change', listener)
      }
    }

    return undefined
  }, [query])

  return matches
}

export { useMediaQuery }
