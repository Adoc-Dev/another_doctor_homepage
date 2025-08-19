'use client'

import { useMediaQuery } from '@/src/shared/hooks'
import { cn } from '@/src/shared/lib/utils'
import { AnimatedGridPattern, BlurFade, Globe } from '@/src/shared/ui'
import { useTranslations } from 'next-intl'

function VisionSection() {
  const t = useTranslations('vision')
  const isMobile = useMediaQuery('(max-width: 640px)')
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1023px)')

  return (
    <section
      id="vision-section"
      className="relative my-10 flex min-h-[40vh] w-full max-w-[1200px] flex-col items-center justify-center px-4 sm:my-16 sm:min-h-[50vh] sm:px-6 md:my-20 md:min-h-[60vh]"
    >
      <div className="flex w-full flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4">
        <BlurFade delay={0.2} inView>
          <p className="xs:text-header-01 text-body-01 text-primary-500 font-semibold">
            OUR VISION
          </p>
        </BlurFade>
        <BlurFade delay={0.4} inView>
          <h2 className="pointer-events-none text-center text-4xl font-black whitespace-pre-wrap sm:text-4xl md:text-6xl">
            {t('title')}
          </h2>
        </BlurFade>
      </div>

      <div className="mt-8 flex w-full flex-col items-center justify-center gap-8 p-2 sm:mt-10 sm:p-4 md:mt-12 md:flex-row md:gap-2 md:p-6">
        <div className="flex w-[90%] flex-1 flex-col items-center justify-center sm:w-full">
          <div className="bg-background relative flex h-[250px] w-full flex-col items-center justify-center overflow-hidden rounded-lg sm:h-[320px] md:h-[400px]">
            <div className="from-background via-background/90 absolute inset-x-0 top-0 z-10 h-[60px] bg-gradient-to-b to-transparent sm:h-[80px] md:h-[100px]" />
            <AnimatedGridPattern
              width={20}
              height={20}
              className={cn(
                'text-primary-500 mx-auto my-auto [mask-image:radial-gradient(250px_sm:350px_md:400px_circle_at_center,white,transparent)]',
                'inset-x-0 inset-y-[-50%] h-[100%] w-[60%] skew-y-12 sm:h-[200%] sm:w-[80%]'
              )}
            />
            <div className="from-background via-background/90 absolute inset-x-0 bottom-0 z-10 h-[60px] bg-gradient-to-t to-transparent sm:h-[80px] md:h-[100px]" />
          </div>
          <div className="mt-4 flex w-full flex-col items-start justify-center gap-2 sm:items-center">
            <p className="sm:text-header-01 text-body-01 text-foreground/80 font-bold tracking-tight">
              {t('description1.title')}
            </p>
            <p className="sm:text-header-02 text-body-02 text-foreground/80 font-semibold whitespace-pre-wrap sm:text-center">
              {t('description1.description')}
            </p>
          </div>
        </div>

        <div className="bg-foreground/10 mx-8 hidden h-full w-px md:block lg:mx-12" />

        <div className="relative flex w-[90%] flex-1 flex-col items-center justify-center sm:w-full">
          <div className="relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden rounded-lg sm:h-[320px] md:h-[400px]">
            <Globe className="absolute top-0" />
            <div className="from-background via-background/90 absolute inset-x-0 bottom-0 z-10 h-[100px] bg-gradient-to-t to-transparent sm:h-[220px] md:h-[300px]" />
          </div>
          <div className="mt-4 flex w-full flex-col items-start justify-center gap-2 sm:items-center">
            <p className="sm:text-header-01 text-body-01 text-foreground/80 font-bold tracking-tight">
              {t('description2.title')}
            </p>
            <p className="sm:text-header-02 text-body-02 text-foreground/80 font-semibold whitespace-pre-wrap sm:text-center">
              {t('description2.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export { VisionSection }
