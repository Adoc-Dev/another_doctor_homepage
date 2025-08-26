'use client'

import { cn } from '@/src/shared/lib/utils'
import { Marquee } from '@/src/shared/ui'
import { AnimatedBeamMultipleOutputDemo } from '@/src/shared/ui/animated-beam-multiple-outpts'
import { BentoCard, BentoGrid } from '@/src/shared/ui/bento-grid'
import { Marquee3D } from '@/src/shared/ui/marquee-3d'
import { AnimatedListDemo } from '@/src/widgets/product/ui/animated-list-demo'
import { useTranslations } from 'next-intl'

const files = [
  {
    name: '특허1',
    body: '임상 사진 내 표본 치아를 활용한 치아색 보정과 판정 방법',
  },
  {
    name: '특허2',
    body: '치아 색상 보정 서비스 제공 방법 및 이를 위한 장치',
  },
  {
    name: '특허3',
    body: '객체의 색상을 측정하는 방법 및 장치',
  },
]

export function BentoDemo() {
  const t = useTranslations('technologyImpact.grid')

  const features = [
    {
      name: t('item1.title'),
      description: t('item1.description'),

      className: 'col-span-3 lg:col-span-1',
      background: (
        <AnimatedListDemo className="absolute top-4 right-2 h-[300px] w-full scale-75 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90" />
      ),
    },
    {
      name: t('item2.title'),
      description: t('item2.description'),

      className: 'col-span-3 lg:col-span-2',
      background: (
        <AnimatedBeamMultipleOutputDemo className="absolute top-4 right-2 h-[300px] border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-105" />
      ),
    },
    {
      name: t('item3.title'),
      description: t('item3.description'),
      className: 'col-span-3 lg:col-span-2',
      background: (
        <Marquee
          pauseOnHover
          className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]"
        >
          {files.map((f, idx) => (
            <figure
              key={idx}
              className={cn(
                'relative h-[300px] w-40 cursor-pointer overflow-hidden rounded-xl border p-4',
                'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
                'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
                'transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none'
              )}
            >
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col">
                  <figcaption className="text-sm font-medium dark:text-white">
                    {f.name}
                  </figcaption>
                </div>
              </div>
              <blockquote className="mt-2 text-xs">{f.body}</blockquote>
            </figure>
          ))}
        </Marquee>
      ),
    },
    {
      name: t('item4.title'),
      description: t('item4.description'),
      className: 'col-span-3 lg:col-span-1',
      background: <Marquee3D />,
    },
  ]

  return (
    <BentoGrid className="mt-16">
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  )
}

function ColorMap() {
  return <div></div>
}
