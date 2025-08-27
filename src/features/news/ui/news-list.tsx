'use client'

import { NewsCard } from '@/src/entities/news/ui/news-card'
import { useNewsListQuery } from '@/src/shared/api/queries/news.query'
import { BlurFade } from '@/src/shared/ui'
import dayjs from 'dayjs'

const BLUR_FADE_DELAY = 0.04

function NewsList() {
  const { data } = useNewsListQuery({
    published: true,
  })

  return (
    <BlurFade delay={BLUR_FADE_DELAY * 14} inView>
      <ul className="border-foreground/10 divide-foreground/10 mb-4 ml-4 divide-y divide-dashed border-l">
        {data?.data.map((news, id) => (
          <BlurFade key={news.id} delay={BLUR_FADE_DELAY * 15 + id * 0.05}>
            <NewsCard
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
  )
}

export { NewsList }
