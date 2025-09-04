'use client'

import { NewsCard } from '@/src/entities/news/ui'
import { useScrollDetection } from '@/src/shared/hooks/scroll-detection.hook'
import { cn } from '@/src/shared/lib/utils'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/src/shared/ui'
import DomPurify from 'isomorphic-dompurify'
import { Calendar, XIcon } from 'lucide-react'

interface Props {
  title: string
  description: string
  dates: string
  image?: string
  link?: string
}

function NewsDialog(props: Props) {
  const { title, description, dates, image, link } = props
  const { scrollRef, isScrolled, onScrollHandler, resetScroll } =
    useScrollDetection({
      threshold: 400,
      resetThreshold: 1,
    })

  const handleDialogOpenChange = (open: boolean) => {
    if (open) {
      resetScroll()
    }
  }

  return (
    <li>
      <Dialog onOpenChange={handleDialogOpenChange}>
        <DialogTrigger className="cursor-pointer text-left">
          <NewsCard
            title={title}
            description={description}
            dates={dates}
            image={image}
            link={link}
          />
        </DialogTrigger>
        <DialogContent
          className="flex h-dvh w-full flex-col gap-0 overflow-hidden rounded-none border-none bg-gray-200/50 p-0 shadow-xl backdrop-blur-sm sm:h-auto sm:max-h-[80vh] sm:max-w-[90vw] sm:rounded-3xl sm:p-4 md:max-w-[800px] dark:bg-neutral-900"
          showCloseButton={false}
        >
          <DialogClose asChild>
            <Button className="absolute top-4 right-4 z-50 size-8 min-h-0 rounded-full bg-white p-2 shadow-lg hover:bg-gray-100">
              <XIcon className="size-5 text-black" />
            </Button>
          </DialogClose>

          {image && (
            <div
              className={cn(
                'w-full shrink-0 overflow-hidden transition-all duration-500 ease-out sm:rounded-t-2xl',
                isScrolled
                  ? 'h-0 opacity-0'
                  : 'h-[30vh] max-h-[400px] min-h-[200px] opacity-100 sm:h-[35vh] sm:max-h-[450px] sm:min-h-[250px]'
              )}
            >
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div
            className={cn(
              'z-[101] flex flex-1 flex-col overflow-hidden bg-white transition-all duration-500 ease-out',
              isScrolled ? 'rounded-t-2xl' : 'rounded-b-2xl'
            )}
          >
            <div className="shrink-0 border-b border-gray-100 bg-white/80 p-6 backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-900/80">
              <div className="flex w-full items-start justify-between gap-6">
                <div className="flex w-full flex-1 flex-col gap-3">
                  <DialogTitle className="w-full text-lg leading-tight font-bold text-neutral-800 sm:pr-12 sm:text-xl md:text-2xl dark:text-neutral-100">
                    {title}
                  </DialogTitle>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                      <time className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                        {dates}
                      </time>
                    </div>
                    {link && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:from-blue-600 hover:to-blue-700 hover:shadow-md active:scale-95"
                      >
                        <span>원문 보기</span>
                        <svg
                          className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-scroll p-4"
              onScroll={onScrollHandler}
            >
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                <div
                  className="news-content"
                  dangerouslySetInnerHTML={{
                    __html: DomPurify.sanitize(description),
                  }}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </li>
  )
}

export { NewsDialog }
