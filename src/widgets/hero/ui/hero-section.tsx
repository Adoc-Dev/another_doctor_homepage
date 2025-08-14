'use client'

import { cn } from '@/src/shared/lib/utils'
import { AuroraText, BlurFade } from '@/src/shared/ui'
import { HERO_TEXT } from '@/src/widgets/hero/model/constants'
import { ChevronsDownIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { memo, useEffect, useMemo, useState } from 'react'

function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const [spinning, setSpinning] = useState(false)

  useEffect(() => {
    // requestAnimationFrame을 setTimeout 내부로 이동하여 렌더링 동기화
    const loadTimeout = setTimeout(() => {
      requestAnimationFrame(() => setLoaded(true))
    }, 10)

    const spinTimeout = setTimeout(() => setSpinning(true), 5500)

    return () => {
      clearTimeout(loadTimeout)
      clearTimeout(spinTimeout)
    }
  }, [])

  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <div className="relative mx-auto h-[720px] w-[720px]">
        <div
          className={cn(
            'absolute top-1/2 left-1/2 z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-200 opacity-0 blur-[600px] transition-all duration-600 ease-[cubic-bezier(0.5,0.01,0.14,0.99)] dark:bg-red-500',
            loaded && 'opacity-100'
          )}
        />
        <MemoizedHeroRing spinning={spinning} loaded={loaded} />

        <div className="absolute top-1/2 left-1/2 z-10 w-full max-w-[600px] -translate-x-1/2 -translate-y-1/2 px-5">
          <BlurFade duration={1.5} className="text-center">
            <h1 className="text-foreground text-display-00 text-center font-black tracking-tighter text-balance">
              <span className="text-5xl">
                <AuroraText colors={HERO_TEXT.auroraColors}>
                  {HERO_TEXT.title}
                </AuroraText>
              </span>
            </h1>
            <p className="text-foreground text-header-01 mt-3 text-center font-semibold tracking-tight text-balance">
              {HERO_TEXT.description}
            </p>
          </BlurFade>
        </div>
      </div>

      <MemoizedChevronAnimation />
    </div>
  )
}

export { HeroSection }

// 메모이제이션을 통한 불필요한 렌더링 방지
const MemoizedChevronAnimation = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
    }}
    className="absolute bottom-20 flex w-full flex-col items-center justify-center gap-2"
  >
    <ChevronsDownIcon className="text-foreground/50 size-6" />
  </motion.div>
))

const HeroRing = ({
  spinning,
  loaded,
}: {
  spinning: boolean
  loaded: boolean
}) => {
  // 회전 및 투명도 값을 useMemo로 캐싱
  const { opacities, rotations } = useMemo(
    () => ({
      opacities: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.06, 0.03],
      rotations: [165, 150, 135, 120, 105, 90, 75, 60, 45, 30, 15, 0],
    }),
    []
  )

  return (
    <svg
      width="720"
      height="720"
      viewBox="0 0 720 720"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'mx-auto block transform-gpu will-change-transform',
        spinning && 'animate-[spin_150s_linear_infinite]'
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
            opacity: loaded ? opacities[i] : 0,
            transform: loaded ? `rotate(${rotations[i]}deg)` : 'rotate(0)',
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

// 히어로 링 메모이제이션
const MemoizedHeroRing = memo(HeroRing)
