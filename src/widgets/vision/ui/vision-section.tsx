import { BlurFade, Globe, Highlighter } from '@/src/shared/ui'
import { VISION_TEXT } from '@/src/widgets/vision/model/constants'

function VisionSection() {
  return (
    <section
      id="vision-section"
      className="relative flex min-h-[80vh] w-full flex-col items-center justify-center"
    >
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <BlurFade delay={0.2} inView>
          <p className="text-header-01 text-primary-500 font-semibold">
            OUR VISION
          </p>
        </BlurFade>
        <BlurFade delay={0.4} inView>
          <h2 className="text-center text-5xl leading-16 font-black tracking-tighter">
            {VISION_TEXT.title[0]}
            <br />
            <Highlighter action="underline" color="#1679AB" strokeWidth={1}>
              {VISION_TEXT.highlight}
            </Highlighter>
            {VISION_TEXT.title[1]}
          </h2>
        </BlurFade>
      </div>

      <div className="flex h-[500px] w-full flex-col items-center justify-center gap-2 p-6">
        <BlurFade
          delay={0.8}
          inView
          className="relative flex size-full -translate-y-20 items-center justify-center overflow-hidden"
        >
          <Globe className="top-28" />
          <div className="from-background via-background/50 absolute inset-x-0 bottom-0 h-[70px] bg-gradient-to-t to-transparent" />
        </BlurFade>
      </div>
    </section>
  )
}

export { VisionSection }
