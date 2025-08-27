'use client'

import { useNewsListQuery } from '@/src/shared/api/queries/news.query'
import { useOutsideClick } from '@/src/shared/hooks/outside-click.hook'
import { truncateHtmlContent } from '@/src/shared/util/html'
import dayjs from 'dayjs'
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

function ExpandableNews() {
  const { data } = useNewsListQuery({
    published: true,
  })

  const [active, setActive] = useState<NewsItem | boolean | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(false)
      }
    }

    if (active && typeof active === 'object') {
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
        {active && typeof active === 'object' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 h-full w-full bg-black/40"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === 'object' ? (
          <div className="fixed inset-0 z-[100] grid place-items-center md:p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="flex h-svh w-full flex-col overflow-hidden bg-white shadow-xl md:max-h-[70vh] md:max-w-3xl md:rounded-3xl dark:bg-neutral-900"
            >
              {/* 썸네일 */}
              {active.thumbnail && (
                <motion.div layoutId={`image-${active.title}-${id}`}>
                  <img
                    width={200}
                    height={200}
                    src={active.thumbnail}
                    alt={active.title}
                    className="h-48 w-full object-cover md:rounded-t-3xl lg:h-64"
                  />
                </motion.div>
              )}

              {/* 헤더 섹션 (고정) */}
              <div className="flex-shrink-0 border-b border-gray-200 dark:border-neutral-700">
                <div className="p-4 md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="text-md font-semibold text-neutral-700 sm:pr-10 sm:text-lg md:text-xl dark:text-neutral-200"
                      >
                        {active.title}
                      </motion.h3>
                      <div className="flex items-center justify-between gap-2">
                        <motion.div
                          layoutId={`date-${active.id}-${id}`}
                          className="mt-2 flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                        >
                          {dayjs(active.date).format('YYYY년 MM월 DD일')}
                        </motion.div>
                        {active.link && (
                          <motion.a
                            layoutId={`button-${active.title}-${id}`}
                            href={active.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-blue-500 px-2 py-1 text-xs font-bold text-white transition-colors hover:bg-blue-600 md:px-6 md:py-3"
                          >
                            원문 보기
                          </motion.a>
                        )}
                      </div>
                    </div>

                    {active.link && (
                      <motion.a
                        layoutId={`button-${active.title}-${id}`}
                        href={active.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden rounded-full bg-blue-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-600 sm:block md:px-6 md:py-3"
                      >
                        원문 보기
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>

              {/* 스크롤 가능한 본문 */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 md:p-6">
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    <div
                      className="prose prose-sm dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: active.contents }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* 리스트 형태 - 모바일 최적화 */}
      <ul className="mx-auto w-full max-w-2xl space-y-3">
        {data.data.map((news, index) => (
          <motion.li
            layoutId={`card-${news.title}-${id}`}
            key={`card-${news.title}-${id}`}
            onClick={() => setActive(news)}
            className="flex cursor-pointer items-start gap-3 rounded-xl p-3 transition-colors hover:bg-neutral-50 md:gap-4 md:p-4 dark:hover:bg-neutral-800"
          >
            {/* 썸네일 - 모바일에서 더 작게 */}
            <motion.div
              layoutId={`image-${news.title}-${id}`}
              className="flex shrink-0 items-center justify-center"
            >
              {news.thumbnail ? (
                <img
                  width={60}
                  height={60}
                  src={news.thumbnail}
                  alt={news.title}
                  className="h-12 w-12 rounded-lg object-cover md:h-16 md:w-16"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 md:h-16 md:w-16 dark:bg-neutral-700">
                  <span className="text-xs text-gray-500">No</span>
                </div>
              )}
            </motion.div>

            {/* 컨텐츠 */}
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex items-start justify-between gap-2">
                <motion.h3
                  layoutId={`title-${news.title}-${id}`}
                  className="line-clamp-1 text-sm leading-tight font-semibold text-neutral-800 sm:line-clamp-2 sm:text-sm md:text-base dark:text-neutral-200"
                >
                  {news.title}
                </motion.h3>

                <motion.div
                  layoutId={`date-${news.id}-${id}`}
                  className="hidden shrink-0 items-center text-xs text-neutral-500 sm:flex dark:text-neutral-500"
                >
                  {dayjs(news.date).format('YYYY.MM.DD')}
                </motion.div>
              </div>
              <motion.div
                layoutId={`date-${news.id}-${id}`}
                className="flex shrink-0 items-center text-xs text-neutral-500 dark:text-neutral-500"
              >
                {dayjs(news.date).format('YYYY.MM.DD')}
              </motion.div>
              {/* 모바일에서는 설명 숨김, 데스크톱에서만 표시 */}
              <p className="line-clamp-1 hidden text-sm text-neutral-600 md:block dark:text-neutral-400">
                {truncateHtmlContent(news.contents, 100)}
              </p>
            </div>

            {/* 버튼 - 모바일에서 더 작게 */}
            <motion.button
              layoutId={`button-${news.title}-${id}`}
              className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-black transition-colors hover:bg-blue-500 hover:text-white md:px-4 md:py-2 md:text-sm dark:bg-neutral-700 dark:text-neutral-200"
            >
              <span className="md:hidden">보기</span>
              <span className="hidden md:inline">자세히</span>
            </motion.button>
          </motion.li>
        ))}
      </ul>
    </>
  )
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  )
}

export { ExpandableNews }
