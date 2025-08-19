import { BlurFade } from '@/src/shared/ui'
import { MetricsSection } from '@/src/widgets/product/ui/metrics-section'
import { useTranslations } from 'next-intl'

function TechnologyImpactSection() {
  const t = useTranslations('technologyImpact')

  return (
    <section
      id="product-section"
      className="flex w-full flex-col items-center justify-center bg-gray-50 py-16 sm:py-20 md:py-24 lg:py-32"
    >
      <div className="container flex max-w-6xl flex-col items-center justify-center px-4 md:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <BlurFade delay={0.2} inView>
            <p className="text-primary-500 text-base font-bold sm:text-lg md:text-xl">
              Technology & Impact
            </p>
          </BlurFade>
          <BlurFade delay={0.4} inView>
            <h2 className="pointer-events-none mt-3 text-center text-3xl font-black whitespace-pre-wrap sm:mt-4 sm:text-4xl md:text-5xl">
              {t('title')}
            </h2>
          </BlurFade>
          <BlurFade delay={0.6} inView>
            <p className="text-foreground mt-4 max-w-3xl text-sm font-semibold text-balance whitespace-pre-wrap sm:mt-5 sm:text-base md:mt-6 md:text-lg lg:text-xl">
              {t('description')}
            </p>
          </BlurFade>
        </div>

        <MetricsSection />
      </div>
    </section>
  )
}

export { TechnologyImpactSection }
