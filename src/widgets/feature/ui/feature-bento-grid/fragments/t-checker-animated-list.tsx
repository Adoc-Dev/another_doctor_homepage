'use client'

import { cn } from '@/src/shared/lib/utils'
import { AnimatedList } from '@/src/shared/ui/animated-list'
import { TCheckerItem } from '@/src/widgets/feature/ui/feature-bento-grid/fragments/t-checker-item'

function TCheckerAnimatedList({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative flex h-[500px] w-full flex-col overflow-hidden p-2',
        className
      )}
    >
      <AnimatedList>
        {Array.from({ length: 6 }).map((_, idx) => (
          <TCheckerItem key={idx} />
        ))}
      </AnimatedList>

      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
    </div>
  )
}

export { TCheckerAnimatedList }
