'use client'

import { BlurFade } from '@/src/shared/ui'
import { MetricCard } from '@/src/widgets/feature/ui/metrics-list/fragments/metric-card'
import { useTranslations } from 'next-intl'

export function MetricsList() {
  const t = useTranslations('technologyImpact')

  return (
    <div className="my-16 w-full sm:my-16 md:my-20 lg:my-24">
      <div className="grid w-full grid-cols-1 items-center gap-8 gap-x-10 sm:grid-cols-2 md:grid-cols-3 md:gap-x-12 lg:gap-x-16">
        <BlurFade inView delay={0.8}>
          <MetricCard
            startValue={100}
            value={38}
            suffix="%"
            description={t('matrix.card1.description')}
            delay={0.2}
            direction="down"
          />
        </BlurFade>

        <BlurFade inView delay={1.2}>
          <MetricCard
            startValue={100}
            value={7}
            suffix="%"
            description={t('matrix.card2.description')}
            delay={0.5}
            direction="down"
          />
        </BlurFade>
        <BlurFade inView delay={1.6}>
          <MetricCard
            value={45}
            suffix="%"
            description={t('matrix.card3.description')}
            delay={0.8}
            direction="up"
          />
        </BlurFade>
      </div>
    </div>
  )
}
