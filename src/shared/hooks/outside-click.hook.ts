import React, { useEffect, useRef } from 'react'

/**
 * 외부 클릭 훅
 * @param ref 참조 객체
 * @param callback 콜백 함수
 * @returns 외부 클릭 훅
 */
export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  callback: Function
) => {
  const callbackRef = useRef<Function>(callback)
  callbackRef.current = callback

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }

      // 중복 실행 방지를 위한 디바운스
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        callbackRef.current?.(event)
      }, 10)
    }

    // 모든 이벤트 타입에 대해 리스너 등록
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    document.addEventListener('touchend', listener)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
      document.removeEventListener('touchend', listener)
    }
  }, [ref])
}
