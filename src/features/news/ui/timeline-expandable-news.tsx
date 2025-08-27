'use client'

import { useNewsListQuery } from '@/src/shared/api/queries/news.query'
import { useOutsideClick } from '@/src/shared/hooks/outside-click.hook'
import { BlurFade } from '@/src/shared/ui'
import { Badge } from '@/src/shared/ui/badge'
import { truncateHtmlContent } from '@/src/shared/util/html'
import dayjs from 'dayjs'
import { Calendar, Globe, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'

interface NewsItem {
  id: number
  title: string
  contents: string
  date: Date
  thumbnail?: string | null
  link?: string | null
}

const BLUR_FADE_DELAY = 0.04

export function TimelineExpandableNews() {
  const { data } = useNewsListQuery({
    published: true,
  })

  const [active, setActive] = useState<NewsItem | null>(null)
  const ref = useRef<HTMLDivElement | null>(null)
  const id = useId()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(null)
      }
    }

    if (active) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active])

  useOutsideClick(ref, () => setActive(null))

  if (!data?.data) return null

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/40"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-[101] grid place-items-center p-4">
            <motion.div
              layoutId={`news-card-${active.id}-${id}`}
              ref={ref}
              className="relative flex max-h-[70vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-xl dark:bg-neutral-900"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700"
              >
                <X className="h-4 w-4" />
              </button>

              {active.thumbnail && (
                <div className="h-68 w-full flex-shrink-0 overflow-hidden">
                  <img
                    src={active.thumbnail}
                    alt={active.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="flex-shrink-0 border-b border-gray-200 dark:border-neutral-700">
                <div className="p-6 lg:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <motion.h3
                        layoutId={`title-${active.id}-${id}`}
                        className="text-xl font-bold text-neutral-800 lg:text-2xl dark:text-neutral-200"
                      >
                        {active.title}
                      </motion.h3>

                      <motion.div
                        layoutId={`date-${active.id}-${id}`}
                        className="mt-2 flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                      >
                        <Calendar className="h-4 w-4" />
                        {dayjs(active.date).format('YYYY년 MM월 DD일')}
                      </motion.div>
                    </div>

                    {active.link && (
                      <motion.a
                        layoutId={`badge-${active.id}-${id}`}
                        href={active.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-blue-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-600"
                      >
                        원문 보기
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="p-6 lg:p-8">
                  <div className="text-sm text-neutral-700 lg:text-base dark:text-neutral-300">
                    <div
                      className="prose prose-sm dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: active.contents }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 카드 그리드 레이아웃 */}
      <BlurFade delay={BLUR_FADE_DELAY * 14} inView>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.data.map((news, index) => (
            <BlurFade key={news.id} delay={BLUR_FADE_DELAY * 15 + index * 0.05}>
              <motion.div
                layoutId={`news-card-${news.id}-${id}`}
                className="group cursor-pointer overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
                onClick={() => setActive(news)}
              >
                {/* 썸네일 이미지 */}
                {news.thumbnail && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={news.thumbnail}
                      alt={news.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="p-4">
                  {/* 날짜 */}
                  <motion.time
                    layoutId={`date-${news.id}-${id}`}
                    className="text-muted-foreground text-xs"
                  >
                    {dayjs(news.date).format('YYYY-MM-DD')}
                  </motion.time>

                  {/* 제목 */}
                  <motion.h3
                    layoutId={`title-${news.id}-${id}`}
                    className="mt-2 leading-tight font-semibold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400"
                  >
                    {news.title}
                  </motion.h3>

                  {/* 설명 */}
                  <p className="text-muted-foreground mt-2 line-clamp-3 text-sm leading-relaxed">
                    {truncateHtmlContent(news.contents, 150)}
                  </p>

                  {/* 배지 */}
                  {news.link && (
                    <div className="mt-4">
                      <motion.div layoutId={`badge-${news.id}-${id}`}>
                        <Badge className="text-foreground border-foreground/10 rounded-full border bg-white px-3 py-1 text-xs transition-colors group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-neutral-700 dark:group-hover:bg-blue-900/20">
                          <Globe className="mr-1 h-3 w-3" />
                          원문 보기
                        </Badge>
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            </BlurFade>
          ))}
        </div>
      </BlurFade>
    </>
  )
}
