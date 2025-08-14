'use client'

import { cn } from '@/src/shared/lib/utils'
import { memo, useEffect, useMemo, useRef, useState } from 'react'

const HeroRing = ({
  spinning,
  loaded,
}: {
  spinning: boolean
  loaded: boolean
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const ringRef = useRef<SVGSVGElement>(null)

  const { opacities, rotations } = useMemo(
    () => ({
      opacities: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.06, 0.03],
      rotations: [165, 150, 135, 120, 105, 90, 75, 60, 45, 30, 15, 0],
    }),
    []
  )

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
      width="720"
      height="720"
      viewBox="0 0 720 720"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'mx-auto block transform-gpu will-change-transform',
        shouldAnimate && 'animate-[spin_150s_linear_infinite]'
      )}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse
          key={i}
          cx="360"
          cy="360"
          rx="292"
          ry="214"
          style={{
            opacity: loaded && isVisible ? opacities[i] : 0,
            transform:
              loaded && isVisible ? `rotate(${rotations[i]}deg)` : 'rotate(0)',
            transformOrigin: 'center',
            transition:
              'opacity 6s cubic-bezier(0.5,0.01,0.14,0.99), transform 6s cubic-bezier(0.5,0.01,0.14,0.99)',
            stroke: 'var(--red-stroke-color, #FDA4AF)',
            strokeWidth: 1,
          }}
        />
      ))}
    </svg>
  )
}

const MemoizedHeroRing = memo(HeroRing)

export { MemoizedHeroRing }
