import { MeetTheTeam } from '@/src/widgets/testimonials/ui'
import { useTranslations } from 'next-intl'

function MeetTeam() {
  const t = useTranslations('team')

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="mt-60 mb-14 flex w-full flex-col items-center justify-center">
        <h2 className="relative z-10 mx-auto max-w-4xl text-center text-5xl font-bold whitespace-pre-line text-neutral-800 md:text-6xl lg:text-7xl dark:text-neutral-100">
          {t('title')}
        </h2>
        <p className="text-header-01 relative z-10 mx-auto mt-4 max-w-xl text-center whitespace-pre-line text-neutral-800 dark:text-neutral-500">
          {t('description')}
        </p>
      </div>
      <MeetTheTeam />
    </div>
  )
}

export { MeetTeam }
