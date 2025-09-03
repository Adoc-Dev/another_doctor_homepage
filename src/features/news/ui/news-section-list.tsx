'use client'

import { NewsDialog } from '@/src/entities/news/ui'
import { usePublicNewsListQuery } from '@/src/shared/api/queries/public-news.query'
import { BlurFade, InteractiveHoverButton } from '@/src/shared/ui'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

const BLUR_FADE_DELAY = 0.04

function NewsSectionList() {
  const { data, isLoading, error } = usePublicNewsListQuery({
    limit: 10, // 더 많이 가져와서 5개 이상인지 확인
  })
  const router = useRouter()
  const t = useTranslations('news')

  const handleMoreClick = () => {
    router.push('/newsroom')
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="border-primary-500 h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
      </div>
    )
  }

  if (error || !data) {
    return null
  }

  const newsData = data.data
  const hasMoreThan5 = newsData.length > 5
  const displayNews = hasMoreThan5 ? newsData.slice(0, 5) : newsData

  return (
    <BlurFade delay={BLUR_FADE_DELAY * 14} inView>
      <div className="relative">
        {/* 뉴스 리스트 */}
        <ul className="border-foreground/10 divide-foreground/10 mb-4 ml-4 w-full divide-y divide-dashed border-l">
          {displayNews.map((news, id) => (
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

        {/* 5개 이상일 때 블러 효과와 더보기 버튼 */}
        {hasMoreThan5 && (
          <div className="relative">
            {/* 그라데이션 블러 오버레이 */}
            <div className="pointer-events-none absolute -top-16 right-0 left-0 h-16 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-gray-950 dark:via-gray-950/90" />

            {/* 더보기 버튼 */}
            <BlurFade delay={BLUR_FADE_DELAY * 20} inView>
              <div className="flex justify-center pt-6">
                <InteractiveHoverButton
                  onClick={handleMoreClick}
                  className="border-primary-200 rounded-full border bg-black px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-lg"
                  iconDirection="right"
                >
                  {t('viewMore')}
                </InteractiveHoverButton>
              </div>
            </BlurFade>
          </div>
        )}
      </div>
    </BlurFade>
  )
}

export { NewsSectionList }
