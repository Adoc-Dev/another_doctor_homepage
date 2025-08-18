import { BlurFade } from '@/src/shared/ui'
import { MetricsSection } from '@/src/widgets/product/ui/metrics-section'
import { useTranslations } from 'next-intl'

function TechnologyImpactSection() {
  const t = useTranslations('technologyImpact')

  return (
    <section id="product-section" className="w-full bg-gray-50 py-24 md:py-32">
      <div className="container max-w-6xl px-4 md:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <BlurFade delay={0.2} inView>
            <p className="text-header-01 text-primary-500 font-bold">
              Technology & Impact
            </p>
          </BlurFade>
          <BlurFade delay={0.4} inView>
            <h2 className="pointer-events-none mt-4 text-center text-5xl font-black whitespace-pre-wrap">
              {t('title')}
            </h2>
          </BlurFade>
          <BlurFade delay={0.6} inView>
            <p className="text-foreground text-header-02 mt-6 max-w-3xl font-semibold whitespace-pre-wrap">
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
