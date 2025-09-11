'use client'

import { cn } from '@/src/shared/lib/utils'
import { BlurFade } from '@/src/shared/ui'
import { BentoCard, BentoGrid } from '@/src/shared/ui/bento-grid'
import {
  CodingCard,
  ColorMap,
  PatentMarqueeList,
  TCheckerAnimatedList,
} from '@/src/widgets/feature/ui/feature-bento-grid/fragments'
import { useTranslations } from 'next-intl'

function FeatureBentoGrid() {
  const t = useTranslations('technologyImpact.grid')

  const features = [
    {
      name: t('item1.title'),
      description: t('item1.description'),
      className: 'col-span-5 lg:col-span-2',
      background: (
        <div className="absolute top-0 right-2 h-[350px] w-full scale-80 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-85">
          <TCheckerAnimatedList />
        </div>
      ),
    },
    {
      name: t('item2.title'),
      description: t('item2.description'),
      className: 'col-span-5 lg:col-span-3',
      background: (
        <div className="absolute top-0 right-2 h-[350px] w-full scale-80 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-85">
          <CodingCard />
        </div>
      ),
    },
    {
      name: t('item3.title'),
      description: t('item3.description'),
      className: 'col-span-5 lg:col-span-3',
      background: <PatentMarqueeList />,
    },
    {
      name: t('item4.title'),
      description: t('item4.description'),
      className: 'col-span-5 lg:col-span-2',
      background: <ColorMap />,
    },
  ]

  return (
    <BentoGrid className="mt-16">
      {features.map((feature, idx) => (
        <BlurFade
          key={idx}
          delay={0.5 + idx * 0.2}
          className={cn('size-full', feature.className)}
          inView
        >
          <BentoCard {...feature} className="size-full" />
        </BlurFade>
      ))}
    </BentoGrid>
  )
}

export { FeatureBentoGrid }
