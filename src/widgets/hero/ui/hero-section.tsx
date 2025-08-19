'use client'

import { cn } from '@/src/shared/lib/utils'
import { AuroraText, BlurFade } from '@/src/shared/ui'
import { HERO_TEXT } from '@/src/widgets/hero/model/constants'
import { MemoizedHeroRing } from '@/src/widgets/hero/ui/hero-ring'
import { ChevronsDownIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { memo, useEffect, useState } from 'react'

function HeroSection() {
  const t = useTranslations('hero')

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
      <div className="xs:h-[400px] xs:w-[400px] relative mx-auto h-[350px] w-[350px] sm:h-[500px] sm:w-[500px] md:h-[600px] md:w-[600px] lg:h-[720px] lg:w-[720px]">
        <div
          className={cn(
            'bg-primary-300 dark:bg-primary-700 xs:blur-[400px] xs:h-[250px] xs:w-[250px] absolute top-1/2 left-1/2 z-0 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[300px] transition-all duration-600 ease-[cubic-bezier(0.5,0.01,0.14,0.99)] sm:h-[350px] sm:w-[350px] sm:blur-[500px] md:h-[450px] md:w-[450px] md:blur-[600px] lg:h-[600px] lg:w-[600px] lg:blur-[700px]',
            loaded && 'opacity-100'
          )}
        />
        <MemoizedHeroRing spinning={spinning} loaded={loaded} />

        <div className="xs:max-w-[300px] absolute top-1/2 left-1/2 z-10 w-full max-w-full -translate-x-1/2 -translate-y-1/2 px-4 sm:max-w-[400px] sm:px-5 md:max-w-[500px] lg:max-w-[600px]">
          <BlurFade delay={0.2} duration={1.5} className="text-center">
            <h1 className="xs:text-3xl text-center text-2xl font-black tracking-tighter text-balance drop-shadow-xl sm:text-4xl lg:text-5xl xl:text-7xl">
              <AuroraText colors={HERO_TEXT.auroraColors}>
                {t('title')}
              </AuroraText>
            </h1>
          </BlurFade>
          <BlurFade delay={0.6} duration={1.5} className="text-center">
            <p className="text-foreground/80 xs:text-sm xs:mt-4 md:text-header-02 lg:text-header-01 xl:text-title-01 mt-3 text-center text-xs font-semibold tracking-tight text-balance drop-shadow-md sm:mt-5 sm:text-base">
              {t('description')}
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
    className="xs:bottom-8 absolute bottom-6 flex w-full flex-col items-center justify-center gap-2 sm:bottom-12 md:bottom-16 lg:bottom-20"
  >
    <ChevronsDownIcon className="text-foreground/50 xs:size-5 size-4 sm:size-6" />
  </motion.div>
))
