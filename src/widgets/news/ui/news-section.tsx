'use client'

import { useNewsListQuery } from '@/src/shared/api/queries/news.query'
import { AnimatedShinyText, BlurFade } from '@/src/shared/ui'
import { HackathonCard } from '@/src/widgets/news/ui/hackathon-card'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'

const BLUR_FADE_DELAY = 0.04

function NewsSection() {
  const t = useTranslations('news')

  const { data, isLoading } = useNewsListQuery({
    published: true,
  })

  return (
    <section id="news-section" className="min-h-[50vh]">
      <div className="w-full max-w-sm space-y-12 px-8 py-12 sm:max-w-lg">
        <div className="flex flex-col items-center justify-center text-center">
          <BlurFade delay={0.2} inView>
            <AnimatedShinyText>News</AnimatedShinyText>
          </BlurFade>
          <BlurFade delay={0.4} inView>
            <h2 className="pointer-events-none mt-3 text-center text-3xl leading-tight font-bold tracking-tighter whitespace-pre-wrap text-gray-900 sm:mt-4 sm:text-4xl md:text-5xl dark:text-gray-100">
              {t('title')}
            </h2>
          </BlurFade>
          <BlurFade delay={0.6} inView>
            <p className="mt-4 max-w-3xl text-sm font-medium text-balance whitespace-pre-wrap text-gray-900 sm:mt-5 sm:text-base md:mt-6 md:text-lg lg:text-xl dark:text-gray-100">
              {t('description')}
            </p>
          </BlurFade>
        </div>
        <BlurFade delay={BLUR_FADE_DELAY * 14} inView>
          <ul className="border-foreground/10 divide-foreground/10 mb-4 ml-4 divide-y divide-dashed border-l">
            {data?.data.map((news, id) => (
              <BlurFade key={news.id} delay={BLUR_FADE_DELAY * 15 + id * 0.05}>
                <HackathonCard
                  title={news.title}
                  description={news.contents}
                  dates={dayjs(news.date).format('YYYY-MM-DD')}
                  image={news.thumbnail ?? ''}
                  link={news.link ?? ''}
                />
              </BlurFade>
            ))}
          </ul>
        </BlurFade>
      </div>
    </section>
  )
}

export { NewsSection }
