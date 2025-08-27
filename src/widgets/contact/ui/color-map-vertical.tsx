import { Marquee } from '@/src/shared/ui'

const colors = [
  '#ECEEDF',
  '#D9C4B0',
  '#F6EFD2',
  '#D6A99D',
  '#BCA88D',
  '#DDDAD0',
]

const Rectangle = ({ color }: { color: string }) => {
  return (
    <div
      className="flex size-18 rounded-lg shadow-sm"
      style={{ backgroundColor: color }}
    />
  )
}

export function ColorMapVertical() {
  return (
    <div className="absolute right-4 left-4 flex h-[500px] rotate-45 flex-row items-center justify-center overflow-hidden sm:right-8 sm:left-8">
      <Marquee pauseOnHover vertical className="[--duration:20s]">
        {Array.from({ length: 10 }).map((_, index) => (
          <Rectangle key={index} color={colors[index % colors.length]} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
        {Array.from({ length: 10 }).map((_, index) => (
          <Rectangle key={index} color={colors[index % colors.length]} />
        ))}
      </Marquee>
      <Marquee pauseOnHover vertical className="[--duration:20s]">
        {Array.from({ length: 10 }).map((_, index) => (
          <Rectangle key={index} color={colors[index % colors.length]} />
        ))}
      </Marquee>
      <Marquee
        reverse
        pauseOnHover
        vertical
        className="hidden [--duration:20s] sm:block"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <Rectangle key={index} color={colors[index % colors.length]} />
        ))}
      </Marquee>
      <Marquee
        pauseOnHover
        vertical
        className="hidden [--duration:20s] sm:block"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <Rectangle key={index} color={colors[index % colors.length]} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
        {Array.from({ length: 10 }).map((_, index) => (
          <Rectangle key={index} color={colors[index % colors.length]} />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b"></div>
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
    </div>
  )
}
