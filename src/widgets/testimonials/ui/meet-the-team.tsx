'use client'

import { AnimatedTestimonials } from '@/src/shared/ui/animated-testimonials'
import { useTranslations } from 'next-intl'

function MeetTheTeam() {
  const t = useTranslations('team')

  const testimonials = [
    {
      quote: t('testimonials.Joseph.description'),
      name: t('testimonials.Joseph.name'),
      role: 'CEO',
      career: t.raw('testimonials.Joseph.career') as string[],
      designation: 'CEO at Another Doctor',
      src: '/profile/joseph.png',
    },
    {
      quote: t('testimonials.Logan.description'),
      name: t('testimonials.Logan.name'),
      role: 'CTO',
      designation: 'CTO at Another Doctor',
      src: '/profile/logan.jpeg',
    },
    {
      quote: t('testimonials.Sey.description'),
      name: t('testimonials.Sey.name'),
      role: 'COO',
      designation: 'COO at Another Doctor',
      src: '/profile/sey.png',
    },
    {
      quote: t('testimonials.Lye.description'),
      name: t('testimonials.Lye.name'),
      role: 'Color Engineer',
      designation: 'Color Engineer at Another Doctor',
      src: '/profile/lyne.jpeg',
    },
    {
      quote: t('testimonials.Kenny.description'),
      name: t('testimonials.Kenny.name'),
      role: 'Software Engineer',
      designation: 'Software Engineer at Another Doctor',
      src: '/profile/kenny.jpeg',
    },
    {
      quote: t('testimonials.Chul.description'),
      name: t('testimonials.Chul.name'),
      role: 'Software Engineer',
      designation: 'Software Engineer at Another Doctor',
      src: '/profile/chul.png',
    },
  ]

  return <AnimatedTestimonials testimonials={testimonials} />
}

export { MeetTheTeam }
