import { cn } from '@/src/shared/lib/utils'
import { AnimatedShinyText, BlurFade } from '@/src/shared/ui'
import { logos } from '@/src/widgets/cooperation/model/constants'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

function Cooperation() {
  const t = useTranslations('cooperation')

  return (
    <section
      id="cooperation-section"
      className="container mx-auto px-4 py-32 md:px-8"
    >
      <div className="flex flex-col items-center justify-center text-center">
        <BlurFade delay={0.2} inView>
          <AnimatedShinyText>Cooperation</AnimatedShinyText>
        </BlurFade>
        <BlurFade delay={0.4} inView>
          <h2 className="pointer-events-none mt-3 text-center text-4xl leading-tight font-bold tracking-tighter whitespace-pre-wrap text-gray-900 sm:mt-4 sm:text-5xl md:text-6xl dark:text-gray-100">
            {t('title')}
          </h2>
        </BlurFade>
      </div>

      <BlurFade delay={0.6} inView>
        <div className="relative mt-6">
          <div className="group flex h-36 max-w-full flex-row [gap:var(--gap)] overflow-hidden p-2 [--duration:40s] [--gap:1.5rem]">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="animate-marquee flex shrink-0 flex-row items-center justify-around [gap:var(--gap)]"
                >
                  {logos.map((logo, index) => (
                    <div
                      key={`${logo.alt}-${index}-${i}`}
                      className="relative mx-4 w-[120px]"
                      style={{
                        height: `${logo.height}px`,
                      }}
                    >
                      <Image
                        alt={logo.alt}
                        loading="lazy"
                        fill
                        sizes="120px"
                        className={cn(
                          'object-contain opacity-70 transition-opacity duration-300 hover:opacity-100',
                          logo.invert && 'invert'
                        )}
                        src={logo.src}
                      />
                    </div>
                  ))}
                </div>
              ))}
          </div>
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r" />
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 bg-gradient-to-l" />
        </div>
      </BlurFade>
    </section>
  )
}

export { Cooperation }
