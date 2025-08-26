'use client'

import { AnimatedShinyText, BlurFade } from '@/src/shared/ui'
import { Card, Carousel } from '@/src/shared/ui/card-carousel'
import { useTranslations } from 'next-intl'

export function AppleCardsCarouselDemo() {
  const t = useTranslations('vision')

  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ))

  return (
    <div className="h-full w-full py-20">
      <div className="flex flex-col items-start justify-center px-32 text-left">
        <BlurFade delay={0.2} inView>
          <AnimatedShinyText>Journey</AnimatedShinyText>
        </BlurFade>
        <BlurFade delay={0.4} inView>
          <h2 className="pointer-events-none mt-3 text-center text-3xl leading-tight font-bold tracking-tighter whitespace-pre-wrap text-gray-900 sm:mt-4 sm:text-4xl md:text-5xl dark:text-gray-100">
            {t('title')}
          </h2>
        </BlurFade>
        <BlurFade delay={0.6} inView>
          <p className="text-sm font-medium text-balance whitespace-pre-wrap text-gray-900 sm:text-base md:text-lg lg:text-xl dark:text-gray-100">
            {t('subTitle')}
          </p>
        </BlurFade>
      </div>
      <Carousel items={cards} />
    </div>
  )
}

const data = [
  {
    category: 'Problem',
    title: '치과와 기공소의 오래된 고민',
    src: 'https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRlbnRhbCUyMGNhbWVyYXxlbnwwfHwwfHx8MA%3D%3D',
    description:
      '환자의 치아 색을 맞추는 일은 늘 어려웠습니다.\n고가 장비와 복잡한 촬영 과정을 거쳐도 만족스럽지 못했고, 재제작률은 높았습니다. 기공소는 여전히 주관적 판단에 의존해야 했습니다.',
  },
  {
    category: 'Technology',
    title: 'AI 기반 초정밀 색 측정',
    src: 'https://images.unsplash.com/photo-1621974182258-ce59c657267d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fGNvbG9yJTIwcGFsZXR0ZXxlbnwwfHwwfHx8MA%3D%3D',
    description:
      '우리는 감각이 아닌 수치로 색을 정의했습니다. Calibration과 Ground Truth 기반 보정, OpenCV와 딥러닝을 통해 누구나 같은 조건에서 동일한 색을 재현할 수 있습니다. 국내외 특허로 그 신뢰성을 입증했습니다.',
  },
  {
    category: 'Workflow',
    title: '디지털 치과 프로세스에 최적화',
    src: 'https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRpZ2l0YWwlMjBkZW50YWx8ZW58MHx8MHx8fDA%3D',
    description:
      '구강 스캐닝 → CAD 설계 → 제작 → 착색 및 쉐이드 조정 → 최종 시적. T-GRID는 착색 단계에서 정확한 색 분석을 제공해 환자 만족도와 제작 효율을 동시에 높입니다.',
  },
  {
    category: 'Impact',
    title: '환자 만족도와 제작 효율 향상',
    src: 'https://images.unsplash.com/photo-1489278353717-f64c6ee8a4d2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRlZXRofGVufDB8fDB8fHww',
    description:
      '정량화된 색 데이터는 재제작률을 줄이고, 불필요한 컴플레인을 감소시킵니다. 치과와 기공소 간 커뮤니케이션이 개선되며, 환자는 더 나은 경험을 누릴 수 있습니다.',
  },
  {
    category: 'Vision',
    title: '정확한 색, 글로벌 표준',
    src: 'https://images.unsplash.com/photo-1608556984704-fa578c96e6eb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvbG9yJTIwcGFsZXR0ZXxlbnwwfHwwfHx8MA%3D%3D',
    description:
      '우리는 해외 병원과 협력하며 글로벌 시장으로 확장하고 있습니다. 정확한 색은 국경을 넘어 통용되는 새로운 언어가 되고, 전 세계가 공유할 수 있는 기준이 되어가고 있습니다.',
  },
  {
    category: 'Beyond Dentistry',
    title: '치과를 넘어, 새로운 가능성으로',
    src: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGZ1dHVyZXxlbnwwfHwwfHx8MA%3D%3D',
    description:
      '멜론의 숙성도를 색으로 감지하는 농업, 교육 플랫폼에서의 실습 피드백, XR 기반 실시간 색상 인식까지. 우리의 기술은 치과를 넘어 다양한 산업으로 확장되고 있습니다.',
  },
]
