import { cn } from '@/src/shared/lib/utils'
import { AnimatedShinyText, BlurFade } from '@/src/shared/ui'
import { useTranslations } from 'next-intl'

function Cooperation() {
  const t = useTranslations('cooperation')

  const logos = [
    {
      src: '/cooperation/gangwon_technopark_logo.jpg',
      alt: 'Gangwon Technopark',
      height: 32,
    },
    {
      src: '/cooperation/google_startup_logo.jpg',
      alt: 'Google Startup',
      height: 28,
    },
    {
      src: '/cooperation/js_dental_lab_logo.png',
      alt: 'JS Dental Lab',
      height: 38,
    },
    {
      src: '/cooperation/jungso_logo.png',
      alt: 'Jungso',
      height: 42,
    },
    {
      src: '/cooperation/kdoc_logo.png',
      alt: 'KDOC',
      height: 30,
      invert: true,
    },
    {
      src: '/cooperation/seoul_samsung_logo.png',
      alt: 'Seoul Samsung',
      height: 36,
    },
    {
      src: '/cooperation/snudh_logo.png',
      alt: 'SNUDH',
      height: 38,
    },
    {
      src: '/cooperation/sopoong_logo.png',
      alt: 'Sopoong',
      height: 30,
    },
    {
      src: '/cooperation/stup_logo.png',
      alt: 'STUP',
      height: 80,
    },
    {
      src: '/cooperation/ye_logo.png',
      alt: 'Ye',
      height: 36,
    },
  ]

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
          <h2 className="pointer-events-none mt-3 text-center text-3xl leading-tight font-bold tracking-tighter whitespace-pre-wrap text-gray-900 sm:mt-4 sm:text-4xl md:text-5xl dark:text-gray-100">
            {t('title')}
          </h2>
        </BlurFade>
      </div>

      <BlurFade delay={0.6} inView>
        <div className="relative mt-6">
          <div className="group flex max-w-full flex-row [gap:var(--gap)] overflow-hidden p-2 [--duration:40s] [--gap:1.5rem]">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="animate-marquee flex shrink-0 flex-row items-center justify-around [gap:var(--gap)]"
                >
                  {logos.map((logo, index) => (
                    <img
                      key={`${logo.alt}-${index}-${i}`}
                      alt={logo.alt}
                      loading="lazy"
                      decoding="async"
                      data-nimg="1"
                      className={cn(
                        'opacity-70 dark:brightness-0 dark:invert',
                        logo.invert && 'invert'
                      )}
                      style={{ color: 'transparent', height: logo.height }}
                      src={logo.src}
                    />
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
