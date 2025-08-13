import { defaultLogos } from '@/src/widgets/cooperation/model/constants'
import { Logo } from '@/src/widgets/cooperation/ui/types'

interface CooperationProps {
  title?: string
  logos?: Logo[]
}

function Cooperation(props: CooperationProps) {
  const { title = 'TRUSTED BY LEADING TEAMS', logos = defaultLogos } = props

  return (
    <div className="container mx-auto min-h-[50vh] px-4 py-32 md:px-8">
      <h3 className="text-center text-sm font-semibold text-gray-500">
        {title}
      </h3>
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
                    className="w-28 opacity-30 grayscale dark:brightness-0 dark:invert"
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
    </div>
  )
}

export { Cooperation, type CooperationProps, type Logo }
