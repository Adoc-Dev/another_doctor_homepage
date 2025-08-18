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
            'bg-primary-300 dark:bg-primary-700 absolute top-1/2 left-1/2 z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[700px] transition-all duration-600 ease-[cubic-bezier(0.5,0.01,0.14,0.99)]',
            loaded && 'opacity-100'
          )}
        />
        <MemoizedHeroRing spinning={spinning} loaded={loaded} />

        <div className="absolute top-1/2 left-1/2 z-10 w-full max-w-[600px] -translate-x-1/2 -translate-y-1/2 px-5">
          <BlurFade delay={0.2} duration={1.5} className="text-center">
            <h1 className="text-center text-6xl font-black tracking-tighter text-balance">
              <AuroraText colors={HERO_TEXT.auroraColors}>
                {HERO_TEXT.title}
              </AuroraText>
            </h1>
          </BlurFade>
          <BlurFade delay={0.6} duration={1.5} className="text-center">
            <p className="text-foreground/80 text-title-01 mt-6 text-center font-semibold tracking-tight text-balance">
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
