'use client'

import { useNewsListQuery } from '@/src/shared/api/queries/news.query'
import { BlurFade } from '@/src/shared/ui'
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
        <BlurFade delay={BLUR_FADE_DELAY * 13} inView>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <p className="text-header-01 text-primary-500 font-bold">News</p>
              <h2 className="text-display-00 text-center font-black tracking-tighter text-balance">
                {t('title')}
              </h2>
              <p className="text-foreground text-header-02 mt-6 max-w-3xl font-semibold whitespace-pre-wrap">
                {t('description')}
              </p>
            </div>
          </div>
        </BlurFade>
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
