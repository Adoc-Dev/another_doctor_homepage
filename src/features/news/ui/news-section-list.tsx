'use client'

import { NewsDialog } from '@/src/entities/news/ui'
import { usePublicNewsListQuery } from '@/src/shared/api/queries/public-news.query'
import { BlurFade } from '@/src/shared/ui'
import dayjs from 'dayjs'

const BLUR_FADE_DELAY = 0.04

function NewsSectionList() {
  const { data, isLoading, error } = usePublicNewsListQuery({
    limit: 10,
  })

  return (
    <BlurFade delay={BLUR_FADE_DELAY * 14} inView>
      <ul className="border-foreground/10 divide-foreground/10 mb-4 ml-4 w-full divide-y divide-dashed border-l">
        {data?.data.map((news, id) => (
          <BlurFade key={news.id} delay={BLUR_FADE_DELAY * 15 + id * 0.05}>
            <NewsDialog
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

export { NewsSectionList }
