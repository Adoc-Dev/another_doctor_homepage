// 더 드라마틱한 효과를 원한다면
'use client'
import { Compare } from '@/src/shared/ui/compare'

function ColorMap() {
  return (
    <div className="absolute inset-0 rounded-2xl border border-white bg-white p-4 px-4 dark:border-neutral-800 dark:bg-neutral-900">
      <Compare
        firstImage="/teeth.png"
        secondImage="/teeth_color.png"
        firstImageClassName="object-cover "
        secondImageClassname="object-cover "
        className="h-[200px] w-full"
        slideMode="hover"
      />
    </div>
  )
}

export { ColorMap }
