'use client'

import { Button } from '@/src/shared/ui'
import { ColorMapVertical } from '@/src/widgets/contact/ui/color-map-vertical'
import { useTranslations } from 'next-intl'

const EMAIL = 'contact@anotherdoctor.com'

function ContactSection() {
  const t = useTranslations('contact')

  return (
    <section
      id="contact-section"
      className="relative mx-4 my-40 flex h-[300px] w-[calc(100%-2rem)] items-center justify-center overflow-hidden rounded-4xl border-none shadow-sm sm:mx-auto sm:h-[400px] sm:max-w-lg"
    >
      <div className="flex size-full flex-col items-center justify-center gap-y-4">
        <ColorMapVertical />
        <div className="z-10 mx-auto size-24 rounded-[2rem] border border-gray-500/10 bg-white/10 p-3 shadow-2xl backdrop-blur-md lg:size-32 dark:bg-black/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-heart-handshake mx-auto size-16 text-black lg:size-24 dark:text-white"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
            <path d="m18 15-2-2" />
            <path d="m15 18-2-2" />
          </svg>
        </div>

        <div className="relative z-20 flex flex-col space-y-4">
          <div className="z-10 mt-4 flex flex-col items-center text-center text-black dark:text-white">
            <h1 className="text-3xl font-bold lg:text-4xl">{t('title')}</h1>
            <p className="mt-2">{t('description')}</p>
            <Button
              className="mt-4 rounded-full"
              color="primary"
              size="lg"
              variant="outline"
              onClick={() => (window.location.href = `mailto:${EMAIL}`)}
            >
              {t('button')}
            </Button>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-white to-90% dark:to-black"></div>
      </div>
    </section>
  )
}

export { ContactSection }
