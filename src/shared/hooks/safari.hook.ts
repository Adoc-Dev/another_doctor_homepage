'use client'

import { useEffect, useState } from 'react'

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
