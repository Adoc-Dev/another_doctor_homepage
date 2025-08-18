import { cn } from '@/src/shared/lib/utils'
import { AnimatedGridPattern, BlurFade, Globe } from '@/src/shared/ui'
import { useTranslations } from 'next-intl'

function VisionSection() {
  const t = useTranslations('vision')

  return (
    <section
      id="vision-section"
      className="relative flex min-h-[60vh] w-full max-w-[1200px] flex-col items-center justify-center"
    >
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <BlurFade delay={0.2} inView>
          <p className="text-header-01 text-primary-500 font-semibold">
            OUR VISION
          </p>
        </BlurFade>
        <BlurFade delay={0.4} inView>
          <h2 className="pointer-events-none text-center text-6xl font-black whitespace-pre-wrap">
            {t('title')}
          </h2>
        </BlurFade>
      </div>

      <div className="mt-12 flex h-[500px] w-full flex-row items-center justify-center gap-2 p-6">
        <div className="flex w-full flex-1 flex-col items-center justify-center">
          <div className="bg-background relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
            <div className="from-background via-background/90 absolute inset-x-0 top-0 z-10 h-[100px] bg-gradient-to-b to-transparent" />
            <AnimatedGridPattern
              className={cn(
                'text-primary-500 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)]',
                'inset-x-0 inset-y-[-50%] h-[200%] skew-y-12'
              )}
            />
            <div className="from-background via-background/90 absolute inset-x-0 bottom-0 z-10 h-[100px] bg-gradient-to-t to-transparent" />
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <p className="text-header-01 text-foreground/80 text-center font-bold tracking-tight">
              {t('description1.title')}
            </p>
            <p className="text-header-02 text-foreground/80 font-semibold whitespace-pre-wrap">
              {t('description1.description')}
            </p>
          </div>
        </div>
        <div className="bg-foreground/10 mx-12 h-full w-px" />
        <div className="relative flex w-full flex-1 flex-col items-center justify-center">
          <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
            <Globe className="absolute top-0" />
            <div className="from-background via-background/90 absolute inset-x-0 bottom-0 z-10 h-[300px] bg-gradient-to-t to-transparent" />
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <p className="text-header-01 text-foreground/80 text-center font-bold tracking-tight">
              {t('description2.title')}
            </p>
            <p className="text-header-02 text-foreground/80 font-semibold whitespace-pre-wrap">
              {t('description2.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export { VisionSection }
