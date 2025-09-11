'use client'
import { Compare } from '@/src/shared/ui/compare'

function ColorMap() {
  return (
    <div className="relative inset-0 bg-white p-4 px-4">
      <Compare
        firstImage="/images/teeth/before.png"
        secondImage="/images/teeth/after.png"
        firstImageClassName="object-cover "
        secondImageClassname="object-cover "
        className="h-[250px] w-full transition-all duration-300 ease-out group-hover:scale-105"
        slideMode="hover"
        autoplay
      />
    </div>
  )
}

export { ColorMap }
