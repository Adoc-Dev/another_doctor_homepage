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
      designation: 'CEO',
      src: '/profile/joseph.png',
    },
    {
      quote: t('testimonials.Sey.description'),
      name: t('testimonials.Sey.name'),
      role: 'COO',
      career: t.raw('testimonials.Sey.career') as string[],
      designation: 'COO',
      src: '/profile/sey.png',
    },
    {
      quote: t('testimonials.Logan.description'),
      name: t('testimonials.Logan.name'),
      role: 'CSO',
      career: t.raw('testimonials.Logan.career') as string[],
      designation: 'CSO',
      src: '/profile/logan.png',
    },
    {
      quote: t('testimonials.Lye.description'),
      name: t('testimonials.Lye.name'),
      role: 'Head of Research Institute',
      career: t.raw('testimonials.Lye.career') as string[],
      designation: 'Head of Research Institute',
      src: '/profile/lyne.png',
    },
    {
      quote: t('testimonials.Kenny.description'),
      name: t('testimonials.Kenny.name'),
      role: 'Software Engineer',
      career: t.raw('testimonials.Kenny.career') as string[],
      designation: 'Software Engineer',
      src: '/profile/kenny.png',
    },
    {
      quote: t('testimonials.Chul.description'),
      name: t('testimonials.Chul.name'),
      role: 'Software Engineer',
      career: t.raw('testimonials.Chul.career') as string[],
      designation: 'Software Engineer',
      src: '/profile/chul.png',
    },
  ]

  return <AnimatedTestimonials testimonials={testimonials} />
}

export { MeetTheTeam }
