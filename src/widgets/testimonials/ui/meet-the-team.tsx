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
      src: '/ceo-profile.png',
    },
    {
      quote: t('testimonials.Logan.description'),
      name: t('testimonials.Logan.name'),
      role: 'CTO',
      designation: 'CTO at Another Doctor',
      src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      quote: t('testimonials.Sey.description'),
      name: t('testimonials.Sey.name'),
      role: 'COO',
      designation: 'COO at Another Doctor',
      src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      quote: t('testimonials.Lye.description'),
      name: t('testimonials.Lye.name'),
      role: 'Color Engineer',
      designation: 'Color Engineer at Another Doctor',
      src: 'https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      quote: t('testimonials.Kenny.description'),
      name: t('testimonials.Kenny.name'),
      role: 'Software Engineer',
      designation: 'Software Engineer at Another Doctor',
      src: 'https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      quote: t('testimonials.Chul.description'),
      name: t('testimonials.Chul.name'),
      role: 'Software Engineer',
      designation: 'Software Engineer at Another Doctor',
      src: 'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ]

  return <AnimatedTestimonials testimonials={testimonials} />
}

export { MeetTheTeam }
