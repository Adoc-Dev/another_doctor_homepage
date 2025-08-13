import { Globe, Highlighter } from '@/src/shared/ui'
import { VISION_TEXT } from '@/src/widgets/vision/model/constants'

function VisionSection() {
  return (
    <div className="relative min-h-screen w-full">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <p className="text-body-01 font-semibold text-red-500">OUR VISION</p>
        <h2 className="text-display-00 text-center font-black tracking-tighter text-balance">
          {VISION_TEXT.title[0]}
          <br />
          <Highlighter action="underline" color="#FF9800">
            {VISION_TEXT.highlight}
          </Highlighter>
          {VISION_TEXT.title[1]}
        </h2>
      </div>

      <div className="flex h-[500px] w-full flex-col items-center justify-center gap-2 p-6">
        <div className="relative flex size-full -translate-y-20 items-center justify-center overflow-hidden">
          <Globe className="top-28 w-full max-w-[600px]" />
          <div className="from-background via-background/50 absolute inset-x-0 bottom-0 h-[70px] bg-gradient-to-t to-transparent" />
        </div>
      </div>
    </div>
  )
}

export { VisionSection }
