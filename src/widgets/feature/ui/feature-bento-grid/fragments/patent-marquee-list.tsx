import LogoIcon from '@/public/icons/logo.svg'
import { cn } from '@/src/shared/lib/utils'
import { Marquee } from '@/src/shared/ui'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

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
        <Image
          src="/images/patent/venture_head_logo.png"
          alt="venture_head_logo"
          className="h-3 w-auto"
          height={24}
          width={120}
        />
      </div>
      <div className="mt-1 size-12 overflow-hidden rounded-lg">
        <Image
          src="/images/patent/venture_enterprise.jpg"
          alt="벤처기업 인증서"
          className="h-full w-full object-cover"
          width={100}
          height={100}
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
          <Image
            src="/images/patent/gangwon_bridge.png"
            alt="강원창조경제혁신센터 로고"
            className="h-3 w-auto"
            width={80}
            height={24}
          />
          <p className="text-body-02 font-medium tracking-[-0.05rem] dark:text-white">
            강원창조경제혁신센터
          </p>
        </div>
      </div>
    </div>
  )
}
