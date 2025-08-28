'use client'

import { NewsCard } from '@/src/entities/news/ui'
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

  return (
    <li>
      <Dialog>
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
          className="flex h-svh w-full flex-col overflow-hidden rounded-none border-none bg-white p-0 shadow-xl sm:h-auto sm:max-h-[70vh] sm:max-w-[500px] sm:rounded-3xl md:max-w-[600px] dark:bg-neutral-900"
          showCloseButton={false}
        >
          <DialogClose asChild>
            <Button className="absolute top-4 right-4 z-50 size-8 min-h-0 rounded-full bg-white p-2 shadow-lg hover:bg-gray-100">
              <XIcon className="size-5 text-black" />
            </Button>
          </DialogClose>
          {/* 썸네일 */}
          {image && (
            <div className="h-52 w-full shrink-0 overflow-hidden">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* 헤더 섹션 (고정) */}
          <div className="flex-shrink-0 border-b border-gray-200 dark:border-neutral-700">
            <div className="px-4 pb-4 md:px-6 md:pb-6">
              <div className="flex w-full items-start justify-between gap-4">
                <div className="flex w-full flex-1 flex-col gap-2 truncate">
                  <DialogTitle className="text-md w-full truncate font-semibold text-neutral-700 sm:pr-10 sm:text-lg md:text-xl dark:text-neutral-200">
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
          </div>

          {/* 스크롤 가능한 본문 */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 md:p-6">
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
