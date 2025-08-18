'use client'

import { cn } from '@/src/shared/lib/utils'
import { memo, useEffect, useMemo, useRef, useState } from 'react'

const BLUE_COLORS = [
  '#1679AB',
  '#4FACDA',
  '#83CAEC',
  '#125E85',
  '#5D9FCF',
  '#0E4460',
  '#B3DFFF',
  '#3674B5',
]

const HeroRing = ({
  spinning,
  loaded,
}: {
  spinning: boolean
  loaded: boolean
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const ringRef = useRef<SVGSVGElement>(null)

  const { opacities, rotations, colors } = useMemo(() => {
    const opacities = [
      1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.06, 0.03,
    ]
    const rotations = [165, 150, 135, 120, 105, 90, 75, 60, 45, 30, 15, 0]

    const colors = Array.from(
      { length: 8 },
      () => BLUE_COLORS[Math.floor(Math.random() * BLUE_COLORS.length)]
    )

    return { opacities, rotations, colors }
  }, [])

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

    if (ringRef.current) {
      observer.observe(ringRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const shouldAnimate = isVisible && spinning

  return (
    <svg
      ref={ringRef}
      width="900"
      height="900"
      viewBox="0 0 900 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu will-change-transform',
        shouldAnimate && 'animate-[spin_150s_linear_infinite]'
      )}
    >
      {Array.from({ length: 16 }).map((_, i) => (
        <ellipse
          key={i}
          cx="450"
          cy="450"
          rx="370"
          ry="280"
          style={{
            opacity: loaded && isVisible ? opacities[i] : 0,
            transform:
              loaded && isVisible ? `rotate(${rotations[i]}deg)` : 'rotate(0)',
            transformOrigin: 'center',
            transition:
              'opacity 6s cubic-bezier(0.5,0.01,0.14,0.99), transform 6s cubic-bezier(0.5,0.01,0.14,0.99)',
            stroke: colors[i],
            strokeWidth: 1.2,
          }}
        />
      ))}
    </svg>
  )
}

const MemoizedHeroRing = memo(HeroRing)

export { MemoizedHeroRing }
