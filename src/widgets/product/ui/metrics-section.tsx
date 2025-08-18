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
    <div className="my-32">
      <BlurFade
        delay={0.8}
        inView
        className="flex flex-col items-center justify-center"
      >
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          <MetricCard
            startValue={100}
            value={38}
            suffix="%"
            description={t('matrix.card1.description')}
            delay={0.2}
            direction="down"
          />
          <MetricCard
            startValue={100}
            value={7}
            suffix="%"
            description={t('matrix.card2.description')}
            delay={0.5}
            direction="down"
          />
          <MetricCard
            value={45}
            suffix="%"
            description={t('matrix.card3.description')}
            delay={0.8}
            direction="up"
          />
        </div>
      </BlurFade>
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
    <div className="flex flex-col items-center text-center transition-colors duration-300">
      <div className="flex items-center justify-center">
        <div className="text-display-01 font-bold">
          <NumberTicker
            value={value}
            startValue={startValue}
            delay={delay}
            decimalPlaces={decimalPlaces}
            className="text-foreground text-5xl font-black tracking-tight transition-colors duration-300"
          />
        </div>
        <div className="text-display-01 font-extrabold">{suffix}</div>
        {direction === 'down' ? <ArrowDown /> : <ArrowUp />}
      </div>
      <p className="text-foreground/90 text-title-01 mt-4 max-w-xs font-bold text-balance">
        {description}
      </p>
    </div>
  )
}

export { MetricCard }
