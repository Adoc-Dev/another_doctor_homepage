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
import { XIcon } from 'lucide-react'

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
      resetThreshold: 20,
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
          className="flex h-dvh w-full flex-col gap-0 overflow-hidden rounded-none border-none bg-gray-200 p-0 shadow-xl sm:h-auto sm:max-h-[80vh] sm:max-w-[90vw] sm:rounded-3xl sm:p-4 md:max-w-[800px] dark:bg-neutral-900"
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
                isScrolled ? 'h-0 opacity-0' : 'h-90 opacity-100'
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
            <div className="shrink-0 border-b border-gray-200 p-4 dark:border-neutral-700">
              <div className="flex w-full items-start justify-between gap-4">
                <div className="flex w-full flex-1 flex-col gap-2">
                  <DialogTitle className="text-md w-full font-semibold text-neutral-700 sm:pr-10 sm:text-lg md:text-xl dark:text-neutral-200">
                    {title}
                  </DialogTitle>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      {dates}
                    </div>
                    {link && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-blue-500 px-2 py-1 text-xs font-bold text-white transition-colors hover:bg-blue-600"
                      >
                        원문 보기
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
                  className="prose prose-sm dark:prose-invert max-w-none"
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
