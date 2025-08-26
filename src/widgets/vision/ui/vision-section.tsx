'use client'

import { AnimatedShinyText, BlurFade } from '@/src/shared/ui'
import { Card, Carousel } from '@/src/shared/ui/card-carousel'
import { Cover } from '@/src/shared/ui/cover'
import { useTranslations } from 'next-intl'

export function AppleCardsCarouselDemo() {
  const t = useTranslations('timeline')

  const data = [
    {
      title: t('data.problem.title'),
      src: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVudGFsJTIwcHJvYmxlbXxlbnwwfHwwfHx8MA%3D%3D',
      description: t('data.problem.content'),
    },
    {
      title: t('data.technology.title'),
      src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWklMjB0ZWNobm9sb2d5fGVufDB8fDB8fHww',
      description: t('data.technology.content'),
    },
    {
      title: t('data.workflow.title'),
      src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRpZ2l0YWwlMjB3b3JrZmxvd3xlbnwwfHwwfHx8MA%3D%3D',
      description: t('data.workflow.content'),
    },
    {
      title: t('data.impact.title'),
      src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGFwcHklMjBwYXRpZW50fGVufDB8fDB8fHww',
      description: t('data.impact.content'),
    },
    {
      title: t('data.vision.title'),
      src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2xvYmFsJTIwdmlzaW9ufGVufDB8fDB8fHww',
      description: t('data.vision.content'),
    },
    {
      title: t('data.beyondDentistry.title'),
      src: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGlubm92YXRpb24lMjBmdXR1cmV8ZW58MHx8MHx8fDA%3D',
      description: t('data.beyondDentistry.content'),
    },
  ]

  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ))

  return (
    <div className="h-full w-full py-20">
      <div className="flex flex-col items-center justify-center px-32 text-left">
        <BlurFade delay={0.2} inView>
          <AnimatedShinyText>Journey</AnimatedShinyText>
        </BlurFade>
        <BlurFade delay={0.4} inView>
          <h2 className="pointer-events-none mt-3 text-center text-3xl leading-tight font-bold tracking-tighter whitespace-pre-wrap text-gray-900 sm:mt-4 sm:text-4xl md:text-5xl dark:text-gray-100">
            {t('title')} <Cover>{t('warp')}</Cover>
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
