'use client'

import { cn } from '@/src/shared/lib/utils'
import { AuroraText, BlurFade } from '@/src/shared/ui'
import { HERO_TEXT } from '@/src/widgets/hero/model/constants'
import { MemoizedHeroRing } from '@/src/widgets/hero/ui/hero-ring'
import { ChevronsDownIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { memo, useEffect, useState } from 'react'

function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const [spinning, setSpinning] = useState(false)

  useEffect(() => {
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
    <section
      id="hero-section"
      className="relative flex h-screen w-full items-center justify-center"
    >
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
    </section>
  )
}

export { HeroSection }

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
