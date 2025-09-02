'use client'

import { MetricCard } from '@/src/entities/feature/ui'
import { BlurFade } from '@/src/shared/ui'
import { useTranslations } from 'next-intl'

function MetricsList() {
  const t = useTranslations('technologyImpact')

  const METRIC_CARD_DATA = [
    {
      startValue: 100,
      value: 38,
      suffix: '%',
      description: t('matrix.card1.description'),
    },
    {
      startValue: 100,
      value: 7,
      suffix: '%',
      description: t('matrix.card2.description'),
    },
    {
      startValue: 100,
      value: 45,
      suffix: '%',
      description: t('matrix.card3.description'),
    },
  ]

  return (
    <div className="my-16 w-full sm:my-16 md:my-20 lg:my-24">
      <div className="grid w-full grid-cols-1 items-center gap-8 gap-x-10 sm:grid-cols-2 md:grid-cols-3 md:gap-x-12 lg:gap-x-16">
        {METRIC_CARD_DATA.map((data, index) => (
          <BlurFade inView delay={0.8 + index * 0.2} key={index}>
            <MetricCard
              startValue={data.startValue}
              value={data.value}
              suffix={data.suffix}
              description={data.description}
              delay={0.2 + index * 0.2}
              direction="down"
            />
          </BlurFade>
        ))}
      </div>
    </div>
  )
}

export { MetricsList }
