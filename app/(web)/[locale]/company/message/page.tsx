import { BlurFade } from '@/src/shared/ui'
import {
  AnimatedTestimonialsDemo,
  CEOQuote,
} from '@/src/widgets/testimonials/ui'

function MessagePage() {
  return (
    <section
      id="news-section"
      className="bg-background flex flex-col items-center justify-center py-12 sm:py-16"
    >
      <div className="w-full max-w-sm space-y-12 px-8 py-12 sm:max-w-lg">
        <div className="flex flex-col items-center justify-center text-center">
          <BlurFade delay={0.4} inView>
            <h2 className="pointer-events-none mt-3 text-center text-3xl leading-tight font-bold tracking-tighter whitespace-pre-wrap text-gray-900 sm:mt-4 sm:text-4xl md:text-5xl dark:text-gray-100">
              Message
            </h2>
          </BlurFade>
          <BlurFade delay={0.6} inView>
            <p className="mt-4 max-w-3xl text-sm font-medium text-balance whitespace-pre-wrap text-gray-900 sm:mt-5 sm:text-base md:mt-6 md:text-lg lg:text-xl dark:text-gray-100">
              Message
            </p>
          </BlurFade>
        </div>
        <BlurFade delay={0.4} inView>
          <CEOQuote />
          <AnimatedTestimonialsDemo />
        </BlurFade>
      </div>
    </section>
  )
}

export default MessagePage
