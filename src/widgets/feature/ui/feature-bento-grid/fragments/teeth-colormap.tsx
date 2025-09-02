'use client'
import { Compare } from '@/src/shared/ui/compare'

function ColorMap() {
  return (
    <div className="absolute inset-0 rounded-2xl border border-white bg-white p-4 px-4 dark:border-neutral-800 dark:bg-neutral-900">
      <Compare
        firstImage="/teeth2.png"
        secondImage="/teeth4_color.png"
        firstImageClassName="object-cover "
        secondImageClassname="object-cover "
        className="h-[200px] w-full"
        slideMode="hover"
      />
    </div>
  )
}

export { ColorMap }
