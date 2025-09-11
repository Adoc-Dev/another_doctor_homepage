'use client'

import { useSafari } from '@/src/shared/hooks/safari.hook'
import { useScrollTo } from '@/src/shared/hooks/scroll.hook'
import {
  AuroraText,
  BlurFade,
  FlipWords,
  InteractiveHoverButton,
} from '@/src/shared/ui'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'

const SparklesCore = dynamic(
  () => import('@/src/shared/ui/sparkles').then((mod) => mod.SparklesCore),
  {
    ssr: false,
  }
)

function HeroSection() {
  const t = useTranslations('hero')
  const words = t.raw('words') as string[]

  const isSafari = useSafari()
  const { scrollToSection } = useScrollTo()

  const handleClick = () => {
    scrollToSection('feature-section')
  }

  return (
    <section
      id="hero-section"
      className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center justify-center">
        <BlurFade delay={0.1} inView>
          <h1 className="text-foreground relative z-30 text-center text-4xl font-bold tracking-tighter whitespace-pre-wrap drop-shadow-xl sm:text-6xl md:text-7xl lg:text-8xl">
            <AuroraText>{t('title')}</AuroraText>
          </h1>
        </BlurFade>

        <div className="relative mt-4">
          <BlurFade duration={0.2} inView>
            <div className="relative z-10 h-40 w-[25rem] md:w-[40rem] lg:w-[60rem]">
              <div className="absolute inset-x-20 top-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm sm:inset-x-30 sm:w-1/2 md:w-3/4" />
              <div className="absolute inset-x-20 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent sm:inset-x-30 sm:w-1/2 md:w-3/4" />
              <div className="absolute inset-x-40 top-0 h-[5px] bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm sm:inset-x-60 sm:w-1/2 md:w-1/4" />
              <div className="absolute inset-x-40 top-0 h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent sm:inset-x-60 sm:w-1/2 md:w-1/4" />

              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="h-full"
                particleColor="#1199A9"
              />

              <div className="bg-background absolute inset-0 h-full w-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <div
              className="text-header-01 sm:text-title-01 md:text-display-02 lg:text-display-01 relative z-20 w-full text-center font-bold tracking-tighter drop-shadow-xl"
              style={{
                marginTop: isSafari ? '-128px' : '-134px',
              }}
            >
              <FlipWords words={words} />
            </div>
          </BlurFade>
        </div>

        <BlurFade delay={0.4} inView>
          <InteractiveHoverButton
            className="border-primary-500 text-primary-500 mt-12 border"
            onClick={handleClick}
          >
            <span>{t('button')}</span>
          </InteractiveHoverButton>
        </BlurFade>
      </div>
    </section>
  )
}

export { HeroSection }
