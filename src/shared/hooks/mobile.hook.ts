'use client'

import { useEffect, useState } from 'react'

/**
 * 현재 화면이 모바일 크기인지 감지하는 훅
 * @param breakpoint 모바일 기준 너비 (기본값: 768px)
 * @returns 모바일 화면 여부 (true: 모바일, false: 데스크톱)
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    // 초기 설정 및 window 객체 확인 (SSR 호환)
    if (typeof window === 'undefined') return

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // 초기 상태 설정
    checkIsMobile()

    // 리사이즈 이벤트에 따른 상태 업데이트
    window.addEventListener('resize', checkIsMobile)

    // 클린업
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [breakpoint])

  return isMobile
}
