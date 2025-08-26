'use client'

import { AuroraText, BlurFade, FlipWords, SparklesCore } from '@/src/shared/ui'
import { useLocale, useTranslations } from 'next-intl'

function HeroSection() {
  const locale = useLocale() as 'ko' | 'en'
  const t = useTranslations('hero')

  const words =
    locale === 'ko'
      ? ['티그리드하다', '정확한 색을 찾다']
      : ['T-GRID', 'Find the exact color']

  return (
    <section
      id="hero-section"
      className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative">
        <BlurFade delay={0.2} inView>
          <h1 className="text-foreground relative z-20 text-center text-3xl font-bold tracking-tighter drop-shadow-xl md:text-7xl lg:text-8xl">
            <AuroraText>{t('title')}</AuroraText>
          </h1>
        </BlurFade>
        <BlurFade delay={0.4} inView>
          <p className="absolute top-10 right-1/2 translate-x-1/2 text-center text-3xl font-bold tracking-tighter drop-shadow-xl md:text-7xl lg:text-3xl">
            <FlipWords words={words} />
          </p>
        </BlurFade>
      </div>
      <BlurFade duration={0.8} delay={0.8} inView>
        <div className="relative mt-4 h-40 w-[60rem]">
          <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
          <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          <div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
          <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="h-full w-full"
            particleColor="#1199A9"
          />

          <div className="bg-background absolute inset-0 h-full w-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </BlurFade>
    </section>
  )
}

export { HeroSection }
