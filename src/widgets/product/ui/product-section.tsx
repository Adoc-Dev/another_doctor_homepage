import { AuroraText, BlurFade, Highlighter } from '@/src/shared/ui'
import { CustomerMessageSection } from '@/src/widgets/product/ui/customer-message-section'
import { MetricsSection } from '@/src/widgets/product/ui/metrics-section'

function ProductSection() {
  return (
    <section className="w-full py-24 md:py-32">
      <div className="container max-w-6xl px-4 md:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <BlurFade delay={0.2} inView>
            <p className="text-body-01 font-semibold text-red-500">
              OUR PRODUCT
            </p>
          </BlurFade>
          <BlurFade delay={0.4} inView>
            <h2 className="text-display-00 mt-2 mb-6 font-black tracking-tighter">
              <AuroraText>T-GRID</AuroraText>
            </h2>
          </BlurFade>
          <BlurFade delay={0.6} inView>
            <p className="text-foreground text-title-01 max-w-3xl font-semibold">
              치아 색상{' '}
              <Highlighter action="underline" color="#FFD65A">
                정밀 인식 & 분석 측정
              </Highlighter>
              &nbsp;&nbsp;&nbsp;
              <Highlighter action="circle" color="#FFD65A" padding={10}>
                알고리즘
              </Highlighter>
            </p>
          </BlurFade>
        </div>

        <MetricsSection />

        <CustomerMessageSection />
      </div>
    </section>
  )
}

export { ProductSection }
