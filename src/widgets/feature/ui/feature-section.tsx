import { AnimatedShinyText, BlurFade, ColourfulText } from '@/src/shared/ui'
import { FeatureBentoGrid } from '@/src/widgets/feature/ui/feature-bento-grid'
import { MetricsList } from '@/src/widgets/feature/ui/metrics-list'
import { useTranslations } from 'next-intl'

function FeatureSection() {
  const t = useTranslations('technologyImpact')

  return (
    <section
      id="product-section"
      className="relative flex w-full flex-col items-center justify-center py-16 sm:py-20 md:py-24 lg:py-32"
    >
      <div className="container flex max-w-6xl flex-col items-center justify-center px-4 md:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <BlurFade delay={0.2} inView>
            <ColourfulText text="T-GRID" />{' '}
            <AnimatedShinyText>Technology</AnimatedShinyText>
          </BlurFade>
          <BlurFade delay={0.4} inView>
            <h2 className="pointer-events-none mt-3 text-center text-4xl leading-tight font-bold tracking-tighter whitespace-pre-wrap text-gray-900 sm:mt-4 sm:text-5xl md:text-6xl dark:text-gray-100">
              {t('title')}
            </h2>
          </BlurFade>
          <BlurFade delay={0.6} inView>
            <p className="text-body-01 sm:text-header-02 md:text-header-01 lg:text-title-01 mt-4 max-w-3xl font-medium text-balance whitespace-pre-wrap text-gray-900 sm:mt-5 md:mt-6 dark:text-gray-100">
              {t('description')}
            </p>
          </BlurFade>
        </div>
        <MetricsList />
        <FeatureBentoGrid />
      </div>
    </section>
  )
}

export { FeatureSection }
