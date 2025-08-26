'use client'

import { cn } from '@/src/shared/lib/utils'
import { AnimatedList } from '@/src/shared/ui/animated-list'

interface Item {
  name: string
  description: string
  icon: string
  color: string
  time: string
}

const colors = [
  '#ECEEDF',
  '#D9C4B0',
  '#F6EFD2',
  '#D6A99D',
  '#BCA88D',
  '#DDDAD0',
]

const TCheckerItem = ({ name, description, icon, color, time }: Item) => {
  // 각 TCheckerItem마다 colors 배열을 랜덤하게 섞기
  const shuffledColors = [...colors].sort(() => Math.random() - 0.5)

  return (
    <figure
      className={cn(
        'relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4',
        // animation styles
        'transition-all duration-200 ease-in-out hover:scale-[103%]',
        // light styles
        'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
        // dark styles
        'transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]'
      )}
    >
      <div className="flex flex-row items-center gap-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="flex size-10 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: shuffledColors[idx],
            }}
          ></div>
        ))}
      </div>
    </figure>
  )
}

export function AnimatedListDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative flex h-[500px] w-full flex-col overflow-hidden p-2',
        className
      )}
    >
      <AnimatedList>
        {Array.from({ length: 6 }).map((_, idx) => (
          <TCheckerItem
            key={idx}
            color="" // color prop은 더 이상 사용하지 않음
          />
        ))}
      </AnimatedList>

      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
    </div>
  )
}
