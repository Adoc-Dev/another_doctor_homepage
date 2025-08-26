import { AnimatedShinyText, BlurFade } from '@/src/shared/ui'
import { BentoDemo } from '@/src/widgets/product/ui/feature-grid'
import { useTranslations } from 'next-intl'

function TechnologyImpactSection() {
  const t = useTranslations('technologyImpact')

  return (
    <section
      id="product-section"
      className="relative flex w-full flex-col items-center justify-center py-16 sm:py-20 md:py-24 lg:py-32"
    >
      <div className="container flex max-w-6xl flex-col items-center justify-center px-4 md:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <BlurFade delay={0.2} inView>
            <AnimatedShinyText>Technology & Impact</AnimatedShinyText>
          </BlurFade>
          <BlurFade delay={0.4} inView>
            <h2 className="pointer-events-none mt-3 text-center text-3xl leading-tight font-bold tracking-tighter whitespace-pre-wrap text-gray-900 sm:mt-4 sm:text-4xl md:text-5xl dark:text-gray-100">
              {t('title')}
            </h2>
          </BlurFade>
          <BlurFade delay={0.6} inView>
            <p className="mt-4 max-w-3xl text-sm font-medium text-balance whitespace-pre-wrap text-gray-900 sm:mt-5 sm:text-base md:mt-6 md:text-lg lg:text-xl dark:text-gray-100">
              {t('description')}
            </p>
          </BlurFade>
        </div>
        {/* <MetricsSection /> */}
        <BentoDemo />
      </div>
    </section>
  )
}

export { TechnologyImpactSection }
