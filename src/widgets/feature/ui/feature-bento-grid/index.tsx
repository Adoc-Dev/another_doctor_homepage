'use client'

import { BentoCard, BentoGrid } from '@/src/shared/ui/bento-grid'
import { CodingCard } from '@/src/widgets/feature/ui/feature-bento-grid/fragments/coding-card'
import { PatentMarqueeList } from '@/src/widgets/feature/ui/feature-bento-grid/fragments/patent-marquee-list'
import { TCheckerAnimatedList } from '@/src/widgets/feature/ui/feature-bento-grid/fragments/t-checker-animated-list'
import { ColorMap } from '@/src/widgets/feature/ui/feature-bento-grid/fragments/teeth-colormap'
import { useTranslations } from 'next-intl'

function FeatureBentoGrid() {
  const t = useTranslations('technologyImpact.grid')

  const features = [
    {
      name: t('item1.title'),
      description: t('item1.description'),
      className: 'col-span-3 lg:col-span-1',
      background: (
        <TCheckerAnimatedList className="absolute top-4 right-2 h-[300px] w-full scale-75 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90" />
      ),
    },
    {
      name: t('item2.title'),
      description: t('item2.description'),
      className: 'col-span-3 lg:col-span-2',
      background: (
        <div className="absolute top-0 right-2 h-[300px] w-full scale-80 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-85">
          <CodingCard />
        </div>
      ),
    },
    {
      name: t('item3.title'),
      description: t('item3.description'),
      className: 'col-span-3 lg:col-span-2',
      background: <PatentMarqueeList />,
    },
    {
      name: t('item4.title'),
      description: t('item4.description'),
      className: 'col-span-3 lg:col-span-1',
      background: <ColorMap />,
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

export { FeatureBentoGrid }
