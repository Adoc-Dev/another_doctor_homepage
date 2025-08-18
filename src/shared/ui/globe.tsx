'use client'

import createGlobe, { COBEOptions } from 'cobe'
import { useMotionValue, useSpring } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { cn } from '@/src/shared/lib/utils'

export function Globe({
  className,
  config,
}: {
  className?: string
  config?: COBEOptions
}) {
  let phi = 0
  let width = 0
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  // 설정 메모이제이션 - 재렌더링 방지
  const globeConfig = useMemo(() => {
    return {
      width: 800,
      height: 800,
      onRender: () => {},
      devicePixelRatio: window.devicePixelRatio || 2,
      phi: 0,
      theta: 0.2,
      dark: 0.05,
      diffuse: 0.3,
      mapSamples: window.innerWidth < 640 ? 5000 : 10000, // 모바일 기기에서 샘플 수 줄임
      mapBrightness: 0.7,
      baseColor: [1, 1, 1] as [number, number, number],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor: [1, 1, 1],
      markers: [
        {
          location: [14.5995, 120.9842],
          size: 0.03,
          color: [0.07, 0.47, 0.67],
        },
        { location: [19.076, 72.8777], size: 0.1, color: [0.31, 0.67, 0.85] },
        { location: [23.8103, 90.4125], size: 0.05, color: [0.51, 0.79, 0.93] },
        { location: [30.0444, 31.2357], size: 0.07, color: [0.93, 0.2, 0.23] },
        {
          location: [39.9042, 116.4074],
          size: 0.08,
          color: [0.85, 0.36, 0.36],
        },
        { location: [-23.5505, -46.6333], size: 0.1, color: [0.7, 0.15, 0.2] },
        { location: [19.4326, -99.1332], size: 0.1, color: [0.13, 0.55, 0.13] },
        { location: [40.7128, -74.006], size: 0.1, color: [0.56, 0.74, 0.56] },
        { location: [34.6937, 135.5022], size: 0.05, color: [0.0, 0.5, 0.0] },
        { location: [41.0082, 28.9784], size: 0.06, color: [0.58, 0.44, 0.86] },
        { location: [37.5665, 126.978], size: 0.05, color: [0.4, 0.2, 0.6] },
        { location: [35.6762, 139.6503], size: 0.08, color: [0.75, 0.24, 1.0] },
        { location: [51.5074, -0.1278], size: 0.07, color: [1.0, 0.84, 0.0] },
        { location: [48.8566, 2.3522], size: 0.06, color: [0.96, 0.71, 0.22] },
        { location: [55.7558, 37.6173], size: 0.07, color: [0.9, 0.6, 0.0] },
        { location: [-33.8688, 151.2093], size: 0.09, color: [0.0, 0.8, 0.8] },
        { location: [-34.6037, -58.3816], size: 0.08, color: [0.4, 0.8, 0.67] },
        { location: [1.3521, 103.8198], size: 0.06, color: [0.18, 0.55, 0.34] },
        {
          location: [25.276987, 55.296249],
          size: 0.08,
          color: [1.0, 0.41, 0.71],
        },
        {
          location: [43.6532, -79.3832],
          size: 0.07,
          color: [0.86, 0.44, 0.58],
        },
        {
          location: [-22.9068, -43.1729],
          size: 0.09,
          color: [0.98, 0.5, 0.45],
        },
        { location: [52.52, 13.405], size: 0.06, color: [0.5, 0.0, 0.0] },
        { location: [59.3293, 18.0686], size: 0.05, color: [0.66, 0.66, 0.66] },
        {
          location: [45.4215, -75.6972],
          size: 0.06,
          color: [0.54, 0.17, 0.89],
        },
        { location: [64.1466, -21.9426], size: 0.04, color: [0.0, 0.0, 0.5] },
        {
          location: [13.7563, 100.5018],
          size: 0.07,
          color: [0.27, 0.51, 0.71],
        },
        { location: [-6.2088, 106.8456], size: 0.07, color: [0.6, 0.34, 0.04] },
        { location: [38.7223, -9.1393], size: 0.05, color: [0.42, 0.26, 0.15] },
        { location: [33.8869, 151.2078], size: 0.05, color: [0.0, 0.39, 0.0] },
      ].map((marker) => ({
        ...marker,
        location: marker.location as [number, number],
        color: marker.color as [number, number, number],
      })),
      ...(config || {}),
    } as COBEOptions
  }, [config])

  // IntersectionObserver로 뷰포트에 있을 때만 애니메이션 실행
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    )

    if (canvasRef.current) {
      observer.observe(canvasRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // 리사이즈 이벤트 핸들러 최적화
  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }

    // 리사이즈 이벤트 쓰로틀링
    let resizeTimer: NodeJS.Timeout
    const throttledResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(onResize, 100)
    }

    window.addEventListener('resize', throttledResize)
    onResize()

    // 글로브 생성 및 관리
    let globeInstance: ReturnType<typeof createGlobe> | null = null
    let animationFrame: number | null = null

    if (canvasRef.current) {
      globeInstance = createGlobe(canvasRef.current, {
        ...globeConfig,
        width: width * 2,
        height: width * 2,
        onRender: (state) => {
          // 화면에 보일 때만 애니메이션
          if (isVisible) {
            if (!pointerInteracting.current) phi += 0.003 // 회전 속도 감소
          }
          state.phi = phi + rs.get()
          state.width = width * 2
          state.height = width * 2
        },
      })

      setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.style.opacity = '1'
        }
      }, 0)
    }

    return () => {
      if (globeInstance) {
        globeInstance.destroy()
      }
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      window.removeEventListener('resize', throttledResize)
      clearTimeout(resizeTimer)
    }
  }, [rs, globeConfig, isVisible])

  return (
    <div
      className={cn(
        'inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]',
        className
      )}
    >
      <canvas
        className={cn(
          'size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]'
        )}
        ref={canvasRef}
      />
    </div>
  )
}
