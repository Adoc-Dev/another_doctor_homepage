import { BlurFade, Globe, Highlighter } from '@/src/shared/ui'
import { VISION_TEXT } from '@/src/widgets/vision/model/constants'

function VisionSection() {
  return (
    <div className="relative flex min-h-[80vh] w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <BlurFade delay={0.2} inView>
          <p className="text-body-01 font-semibold text-red-500">OUR VISION</p>
        </BlurFade>
        <BlurFade delay={0.4} inView>
          <h2 className="text-display-00 text-center font-black tracking-tighter text-balance">
            {VISION_TEXT.title[0]}
            <br />
            <Highlighter action="underline" color="#FF9800">
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
          <Globe className="top-28 w-full max-w-[600px]" />
          <div className="from-background via-background/50 absolute inset-x-0 bottom-0 h-[70px] bg-gradient-to-t to-transparent" />
        </BlurFade>
      </div>
    </div>
  )
}

export { VisionSection }
