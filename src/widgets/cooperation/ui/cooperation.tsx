import { BlurFade } from '@/src/shared/ui'
import {
  COOPERATION_TEXT,
  defaultLogos,
} from '@/src/widgets/cooperation/model/constants'
import { Logo } from '@/src/widgets/cooperation/ui/types'

interface CooperationProps {
  logos?: Logo[]
}

function Cooperation(props: CooperationProps) {
  const { logos = defaultLogos } = props

  return (
    <section
      id="cooperation-section"
      className="container mx-auto px-4 py-32 md:px-8"
    >
      <BlurFade delay={0.2} inView>
        <p className="text-header-02 text-primary-500 text-center font-bold">
          {COOPERATION_TEXT.title}
        </p>
      </BlurFade>

      <BlurFade delay={0.4} inView>
        <p className="text-display-00 mt-4 text-center leading-16 font-black tracking-tighter">
          {COOPERATION_TEXT.description}
        </p>
      </BlurFade>

      <BlurFade delay={0.6} inView>
        <div className="relative mt-6">
          <div className="group flex max-w-full flex-row [gap:var(--gap)] overflow-hidden p-2 [--duration:40s] [--gap:1rem]">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="animate-marquee flex shrink-0 flex-row justify-around [gap:var(--gap)]"
                >
                  {logos.map((logo, index) => (
                    <img
                      key={`${logo.name}-${index}-${i}`}
                      alt={logo.alt || logo.name}
                      loading="lazy"
                      decoding="async"
                      data-nimg="1"
                      className="w-28 opacity-70 dark:brightness-0 dark:invert"
                      style={{ color: 'transparent' }}
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

export { Cooperation, type CooperationProps, type Logo }
