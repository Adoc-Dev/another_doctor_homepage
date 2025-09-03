'use client'

import { NewsList } from '@/src/features/news/ui'
import { AnimatedShinyText, BlurFade } from '@/src/shared/ui'
import { useTranslations } from 'next-intl'

function NewsPage() {
  const t = useTranslations('news')

  return (
    <section id="news-section" className="min-h-[50vh]">
      <div className="w-full max-w-sm space-y-12 px-8 py-12 sm:max-w-lg">
        <div className="flex flex-col items-center justify-center text-center">
          <BlurFade delay={0.2} inView>
            <AnimatedShinyText>News</AnimatedShinyText>
          </BlurFade>
          <BlurFade delay={0.4} inView>
            <h2 className="pointer-events-none mt-3 text-center text-4xl leading-tight font-bold tracking-tighter whitespace-pre-wrap text-gray-900 sm:mt-4 sm:text-5xl md:text-6xl dark:text-gray-100">
              {t('title')}
            </h2>
          </BlurFade>
          <BlurFade delay={0.6} inView>
            <p className="text-body-01 sm:text-header-02 md:text-header-01 lg:text-title-01 mt-4 max-w-3xl font-medium text-balance whitespace-pre-wrap text-gray-900 sm:mt-5 md:mt-6 dark:text-gray-100">
              {t('description')}
            </p>
          </BlurFade>
        </div>

        <NewsList />
      </div>
    </section>
  )
}

export { NewsPage }
