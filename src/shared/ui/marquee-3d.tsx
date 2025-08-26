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
      className="flex h-16 w-16 rounded-lg shadow-sm"
      style={{ backgroundColor: color }}
    />
  )
}

export function Marquee3D() {
  return (
    <div className="relative flex h-56 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            'translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)',
        }}
      >
        <Marquee pauseOnHover vertical className="[--duration:15s]">
          {colors.map((color, idx) => (
            <Rectangle key={`col1-${idx}`} color={color} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:18s]" vertical>
          {colors.map((color, idx) => (
            <Rectangle key={`col2-${idx}`} color={color} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:22s]" vertical>
          {colors.map((color, idx) => (
            <Rectangle key={`col3-${idx}`} color={color} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {colors.map((color, idx) => (
            <Rectangle key={`col4-${idx}`} color={color} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {colors.map((color, idx) => (
            <Rectangle key={`col5-${idx}`} color={color} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:20s]" vertical>
          {colors.map((color, idx) => (
            <Rectangle key={`col6-${idx}`} color={color} />
          ))}
        </Marquee>
      </div>

      <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b"></div>
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  )
}
