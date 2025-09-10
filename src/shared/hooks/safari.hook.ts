'use client'

import { useEffect, useState } from 'react'

/**
 * 현재 브라우저가 Safari인지 확인하는 훅
 * @returns
 */
function useSafari() {
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    const isSafariDetected = /^((?!chrome|android).)*safari/i.test(
      navigator.userAgent
    )
    setIsSafari(isSafariDetected)
  }, [])

  return isSafari
}

export { useSafari }
