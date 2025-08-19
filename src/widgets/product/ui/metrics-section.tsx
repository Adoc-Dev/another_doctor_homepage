'use client'

import { BlurFade } from '@/src/shared/ui'
import { NumberTicker } from '@/src/shared/ui/number-ticker'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface MetricCardProps {
  value: number
  suffix: string
  description: string
  delay?: number
  decimalPlaces?: number
  startValue?: number
  direction?: 'up' | 'down'
}

export function MetricsSection() {
  const t = useTranslations('technologyImpact')

  return (
    <div className="my-16 w-full sm:my-20 md:my-24 lg:my-32">
      <div className="grid w-full grid-cols-1 items-center gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:gap-8">
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

function MetricCard({
  value,
  suffix,
  description,
  delay = 0,
  decimalPlaces = 0,
  startValue = 0,
  direction = 'up',
}: MetricCardProps) {
  return (
    <div className="flex flex-col items-center py-4 text-center transition-colors duration-300 sm:py-6">
      <div className="flex items-center justify-center">
        <div className="font-bold">
          <NumberTicker
            value={value}
            startValue={startValue}
            delay={delay}
            decimalPlaces={decimalPlaces}
            className="text-foreground text-4xl font-black tracking-tight transition-colors duration-300 sm:text-5xl md:text-4xl lg:text-5xl"
          />
        </div>
        <div className="text-4xl font-extrabold sm:text-5xl md:text-4xl lg:text-5xl">
          {suffix}
        </div>
        {direction === 'down' ? (
          <ArrowDown className="ml-1 size-5 sm:size-6 md:size-5 lg:size-6" />
        ) : (
          <ArrowUp className="ml-1 size-5 sm:size-6 md:size-5 lg:size-6" />
        )}
      </div>
      <p className="text-foreground/90 mt-3 max-w-[280px] text-sm font-bold text-balance sm:mt-4 sm:text-base md:mt-3 md:text-sm lg:mt-4 lg:max-w-xs lg:text-base">
        {description}
      </p>
    </div>
  )
}

export { MetricCard }
