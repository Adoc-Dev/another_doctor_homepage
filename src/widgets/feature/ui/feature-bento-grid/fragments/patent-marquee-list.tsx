import LogoIcon from '@/public/icons/logo.svg'
import { cn } from '@/src/shared/lib/utils'
import { Marquee } from '@/src/shared/ui'
import { useTranslations } from 'next-intl'

function PatentMarqueeList() {
  const t = useTranslations('technologyImpact.grid.item3')
  const files = [
    {
      id: 1,
      component: <VenturePatentItem />,
    },
    {
      id: 2,
      component: <GangwonPatentItem />,
    },
    {
      id: 3,
      component: <PatentItem1 />,
    },
    {
      id: 4,
      component: <PatentItem2 />,
    },
  ]

  return (
    <Marquee
      pauseOnHover
      className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] [--duration:20s]"
    >
      {files.map((f, idx) => (
        <figure
          key={idx}
          className={cn(
            'relative h-[250px] w-50 cursor-pointer overflow-hidden rounded-xl border p-4',
            'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
            'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
            'transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none'
          )}
        >
          {f.component}
        </figure>
      ))}
    </Marquee>
  )
}

export { PatentMarqueeList }

function VenturePatentItem() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-2.5">
      <div className="flex w-full items-center justify-between">
        <LogoIcon className="h-3" />
        <img src="/images/patent/venture_head_logo.png" className="h-3" />
      </div>
      <div className="mt-1 size-12 overflow-hidden rounded-lg">
        <img
          src="/images/patent/venture_enterprise.jpg"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-y-2">
        <p className="text-body-03 font-medium tracking-[-0.05rem] dark:text-white">
          벤처확인번호 : 2025072010028
        </p>
        <figcaption className="text-body-01 border-y border-amber-200 py-1.5 text-center font-medium dark:text-white">
          주식회사 어나더닥터
        </figcaption>
      </div>
    </div>
  )
}

function GangwonPatentItem() {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col items-center justify-center gap-y-2">
        <p className="text-body-03 text-primary-400 font-semibold">2025년</p>
        <p className="text-body-02 font-medium tracking-[-0.05rem] dark:text-white">
          강원창조경제혁신센터 투자기업
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-2">
        <div className="flex items-center justify-center gap-x-1 border-b border-amber-200 pb-2">
          <LogoIcon className="h-3" />
          <p className="text-body-02 font-medium tracking-[-0.1rem] dark:text-white">
            (주) 어나더닥터
          </p>
        </div>
        <div className="flex items-center justify-center gap-x-1">
          <img src="/images/patent/gangwon_bridge.png" className="h-3" />
          <p className="text-body-02 font-medium tracking-[-0.05rem] dark:text-white">
            강원창조경제혁신센터
          </p>
        </div>
      </div>
    </div>
  )
}

function PatentItem1() {
  return (
    <div className="flex flex-col">
      <PatentMedal className="absolute top-2 right-2" size={60} />

      <div className="flex flex-col items-start justify-center">
        <p className="text-header-02 font-medium tracking-[-0.1rem] dark:text-white">
          특허증
        </p>
      </div>
      <div className="mt-8 flex items-center gap-x-1">
        <p className="text-body-02 shrink-0 font-semibold">특허</p>
        <p className="text-body-03">10-2025-0051077</p>
      </div>
      <div className="mt-2 flex flex-col items-start gap-y-1">
        <p className="text-body-02 font-semibold">발명의명칭</p>
        <p className="text-body-03 font-medium">객체 색상 측정 방법 및 장치</p>
      </div>
    </div>
  )
}

function PatentItem2() {
  return (
    <div className="flex flex-col">
      <PatentMedal className="absolute top-2 right-2" size={60} />

      <div className="flex flex-col items-start justify-center">
        <p className="text-header-02 font-medium tracking-[-0.1rem] dark:text-white">
          특허증
        </p>
      </div>
      <div className="mt-8 flex items-center gap-x-1">
        <p className="text-body-02 shrink-0 font-semibold">특허</p>
        <p className="text-body-03">PCT/KR2025/012734</p>
      </div>
      <div className="mt-2 flex flex-col items-start gap-y-1">
        <p className="text-body-02 font-semibold">발명의명칭</p>
        <p className="text-body-03 font-medium">
          물리 매체를 이용한 색상 측정 방법, 장치, 시스템 및 그 물리 매체
        </p>
      </div>
    </div>
  )
}

interface PatentMedalProps {
  className?: string
  size?: number
}

export function PatentMedal({ className = '', size = 24 }: PatentMedalProps) {
  // 미리 계산된 고정 좌표값 사용 (hydration mismatch 방지)
  const toothPositions = [
    { x: 9, y: 0, rotation: 0 },
    { x: 7.794, y: 4.5, rotation: 30 },
    { x: 4.5, y: 7.794, rotation: 60 },
    { x: 0, y: 9, rotation: 90 },
    { x: -4.5, y: 7.794, rotation: 120 },
    { x: -7.794, y: 4.5, rotation: 150 },
    { x: -9, y: 0, rotation: 180 },
    { x: -7.794, y: -4.5, rotation: 210 },
    { x: -4.5, y: -7.794, rotation: 240 },
    { x: 0, y: -9, rotation: 270 },
    { x: 4.5, y: -7.794, rotation: 300 },
    { x: 7.794, y: -4.5, rotation: 330 },
  ]

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 파란색 리본 */}
      <path
        d="M13 2 L13 10 L15 8.5 L16 10 L17 8.5 L19 10 L19 2 Z"
        fill="#1E40AF"
        stroke="#1E3A8A"
        strokeWidth="0.5"
      />

      {/* 리본 위 하얀 줄 두 개 */}
      <line
        x1="13.5"
        y1="4"
        x2="18.5"
        y2="4"
        stroke="white"
        strokeWidth="0.5"
      />
      <line
        x1="13.5"
        y1="6"
        x2="18.5"
        y2="6"
        stroke="white"
        strokeWidth="0.5"
      />

      {/* 원형 톱니바퀴 메달 */}
      <g transform="translate(16, 20)">
        {/* 톱니바퀴 톱니들 (고정 좌표 사용) */}
        {toothPositions.map((pos, i) => (
          <rect
            key={i}
            x={pos.x - 0.8}
            y={pos.y - 1.5}
            width="1.6"
            height="3"
            fill="#FFD700"
            transform={`rotate(${pos.rotation} ${pos.x} ${pos.y})`}
          />
        ))}

        {/* 메달 본체 (원형) */}
        <circle
          cx="0"
          cy="0"
          r="8"
          fill="#FFD700"
          stroke="#B8860B"
          strokeWidth="0.8"
        />

        {/* 내부 원 */}
        <circle
          cx="0"
          cy="0"
          r="6"
          fill="#F5DEB3"
          stroke="#B8860B"
          strokeWidth="0.5"
        />
      </g>

      {/* 대한민국 텍스트 (금색) */}
      <text
        x="16"
        y="20.5"
        fontSize="2.5"
        fontWeight="bold"
        fill="#B8860B"
        textAnchor="middle"
        fontFamily="system-ui"
      >
        대한민국
      </text>

      {/* 간단한 반짝임 */}
      <circle cx="12" cy="16" r="0.8" fill="white" opacity="0.6" />
    </svg>
  )
}
