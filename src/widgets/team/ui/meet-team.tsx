import { MeetTheTeam } from '@/src/widgets/testimonials/ui'
import { useTranslations } from 'next-intl'

function MeetTeam() {
  const t = useTranslations('team')

  return (
    <div className="flex w-full flex-col items-center justify-center py-32 sm:py-32 md:py-42 lg:py-60">
      <div className="mb-4 flex w-full flex-col items-center justify-center">
        <h2 className="relative z-10 mx-auto max-w-4xl text-center text-4xl font-bold whitespace-pre-line text-neutral-800 sm:text-5xl md:text-6xl lg:text-7xl dark:text-neutral-100">
          {t('title')}
        </h2>
        <p className="text-body-01 sm:text-header-02 md:text-header-01 lg:text-title-01 relative z-10 mx-auto mt-4 max-w-xl text-center whitespace-pre-line text-neutral-800 dark:text-neutral-500">
          {t('description')}
        </p>
      </div>
      <MeetTheTeam />
    </div>
  )
}

export { MeetTeam }
