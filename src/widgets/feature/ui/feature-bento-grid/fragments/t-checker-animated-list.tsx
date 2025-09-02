import { TCheckerItem } from '@/src/entities/feature/ui'
import { Marquee } from '@/src/shared/ui'

function TCheckerAnimatedList() {
  return (
    <div className="relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            'translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)',
        }}
      >
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {Array.from({ length: 10 }).map((_, index) => (
            <TCheckerItem key={index} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {Array.from({ length: 10 }).map((_, index) => (
            <TCheckerItem key={index} />
          ))}
        </Marquee>
      </div>

      <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b" />
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t" />
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r" />
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l" />
    </div>
  )
}

export { TCheckerAnimatedList }
