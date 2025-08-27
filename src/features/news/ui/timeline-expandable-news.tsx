'use client'

import { useNewsListQuery } from '@/src/shared/api/queries/news.query'
import { useOutsideClick } from '@/src/shared/hooks/outside-click.hook'
import { BlurFade } from '@/src/shared/ui'
import { Avatar, AvatarFallback, AvatarImage } from '@/src/shared/ui/avatar'
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
      {/* 백드롭 */}
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

      {/* 확장된 모달 */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-[101] grid place-items-center p-4">
            <motion.div
              layoutId={`news-card-${active.id}-${id}`}
              ref={ref}
              className="relative flex max-h-[70vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-xl dark:bg-neutral-900"
            >
              {/* 닫기 버튼 */}
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700"
              >
                <X className="h-4 w-4" />
              </button>

              {/* 썸네일 이미지 */}
              {active.thumbnail && (
                <div className="h-68 w-full flex-shrink-0 overflow-hidden">
                  <img
                    src={active.thumbnail}
                    alt={active.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {/* 헤더 섹션 (고정) */}
              <div className="flex-shrink-0 border-b border-gray-200 dark:border-neutral-700">
                <div className="p-6 lg:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* 제목 */}
                      <motion.h3
                        layoutId={`title-${active.id}-${id}`}
                        className="text-xl font-bold text-neutral-800 lg:text-2xl dark:text-neutral-200"
                      >
                        {active.title}
                      </motion.h3>

                      {/* 날짜 */}
                      <motion.div
                        layoutId={`date-${active.id}-${id}`}
                        className="mt-2 flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                      >
                        <Calendar className="h-4 w-4" />
                        {dayjs(active.date).format('YYYY년 MM월 DD일')}
                      </motion.div>
                    </div>

                    {/* 링크 버튼 */}
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

              {/* 스크롤 가능한 본문 */}
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

      {/* 타임라인 리스트 */}
      <BlurFade delay={BLUR_FADE_DELAY * 14} inView>
        <ul className="border-foreground/10 divide-foreground/10 mb-4 ml-4 w-full divide-y divide-dashed border-l">
          {data.data.map((news, index) => (
            <BlurFade key={news.id} delay={BLUR_FADE_DELAY * 15 + index * 0.05}>
              <motion.li
                layoutId={`news-card-${news.id}-${id}`}
                className="group relative ml-10 cursor-pointer py-4 transition-colors hover:bg-gray-50/50 dark:hover:bg-neutral-800/50"
                onClick={() => setActive(news)}
              >
                {/* 아바타 */}
                <div className="absolute top-2 -left-16 flex items-center justify-center rounded-full bg-white">
                  <Avatar className="border-foreground/10 m-auto size-12 border">
                    <AvatarImage
                      src={news.thumbnail ?? ''}
                      alt={news.title}
                      className="object-contain"
                    />
                    <AvatarFallback>{news.title[0]}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex flex-1 flex-col justify-start gap-1 pr-4">
                  {/* 날짜 */}
                  <motion.time
                    layoutId={`date-${news.id}-${id}`}
                    className="text-muted-foreground text-xs"
                  >
                    {dayjs(news.date).format('YYYY-MM-DD')}
                  </motion.time>

                  {/* 제목 */}
                  <motion.h2
                    layoutId={`title-${news.id}-${id}`}
                    className="leading-relaxed font-semibold transition-colors group-hover:text-gray-400 dark:group-hover:text-gray-400"
                  >
                    {news.title}
                  </motion.h2>

                  {/* 설명 */}
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                    {truncateHtmlContent(news.contents, 200)}
                  </p>
                </div>

                {/* 배지 */}
                <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
                  {news.link && (
                    <motion.div layoutId={`badge-${news.id}-${id}`}>
                      <Badge className="border-foreground/10 text-foreground rounded-full border bg-white px-3 py-2 transition-colors group-hover:bg-gray-100 dark:bg-gray-900">
                        <Globe className="mr-2 h-4 w-4" />
                        원문 보기
                      </Badge>
                    </motion.div>
                  )}
                </div>
              </motion.li>
            </BlurFade>
          ))}
        </ul>
      </BlurFade>
    </>
  )
}
