'use client'

import { AuroraText, BlurFade, FlipWords, SparklesCore } from '@/src/shared/ui'
import { useTranslations } from 'next-intl'

function HeroSection() {
  const t = useTranslations('hero')
  const words = t.raw('words') as string[]

  return (
    <section
      id="hero-section"
      className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative">
        <BlurFade delay={0.2} inView>
          <h1 className="text-foreground relative z-20 text-center text-5xl font-bold tracking-tighter whitespace-pre-wrap drop-shadow-xl sm:text-6xl md:text-7xl lg:text-9xl">
            <AuroraText>{t('title')}</AuroraText>
          </h1>
        </BlurFade>
        <BlurFade delay={0.6} inView>
          <div className="text-header-01 sm:text-title-01 md:text-display-02 lg:text-display-01 absolute top-10 right-1/2 w-full translate-x-1/2 text-center font-bold tracking-tighter drop-shadow-xl">
            <FlipWords words={words} />
          </div>
        </BlurFade>
      </div>
      <BlurFade duration={0.4} inView>
        <div className="relative mt-4 h-40 w-[25rem] md:w-[40rem] lg:w-[60rem]">
          <div className="absolute inset-x-20 top-0 h-[2px] w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm sm:inset-x-30 md:w-3/4" />
          <div className="absolute inset-x-20 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent sm:inset-x-30 md:w-3/4" />
          <div className="absolute inset-x-40 top-0 h-[5px] w-1/2 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm sm:inset-x-60 md:w-1/4" />
          <div className="absolute inset-x-40 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-sky-500 to-transparent sm:inset-x-60 md:w-1/4" />

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
    </section>
  )
}

export { HeroSection }
