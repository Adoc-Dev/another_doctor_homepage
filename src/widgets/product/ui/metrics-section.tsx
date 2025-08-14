'use client'

import { BlurFade } from '@/src/shared/ui'
import { NumberTicker } from '@/src/shared/ui/number-ticker'
import { ArrowDown, ArrowUp } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: number
  suffix: string
  description: string
  delay?: number
  decimalPlaces?: number
  startValue?: number
  direction?: 'up' | 'down'
}

export function MetricsSection() {
  return (
    <div className="my-32">
      <BlurFade
        delay={0.8}
        inView
        className="flex flex-col items-center justify-center"
      >
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          <MetricCard
            title="색상 오차 감소"
            startValue={100}
            value={38}
            suffix="%"
            description="색상 오차 감소"
            delay={0.2}
            direction="down"
          />
          <MetricCard
            title="재제작률"
            startValue={100}
            value={7}
            suffix="%"
            description="재작업 비율 감소"
            delay={0.5}
            direction="down"
          />
          <MetricCard
            title="작업 시간 단축"
            value={45}
            suffix="%"
            description="업무 프로세스 효율 향상"
            delay={0.8}
            direction="up"
          />
        </div>
      </BlurFade>
    </div>
  )
}

function MetricCard({
  title,
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
