import { Button, Ripple } from '@/src/shared/ui'
import { useTranslations } from 'next-intl'

function ContactSection() {
  const t = useTranslations('contact')

  return (
    <section
      id="contact-section"
      className="border-foreground/10 relative flex h-[300px] w-full max-w-sm items-center justify-center overflow-hidden border sm:h-[500px] sm:max-w-lg sm:rounded"
    >
      <Ripple mainCircleSize={400} />
      <div className="flex flex-col items-center justify-center gap-y-4">
        <h2 className="text-display-01 text-center font-black tracking-tighter text-balance">
          {t('title')}
        </h2>
        <p className="text-foreground text-header-02 max-w-3xl font-semibold whitespace-pre-wrap">
          {t('description')}
        </p>

        <Button
          className="mt-4 bg-gray-500/50 font-semibold backdrop-blur-sm hover:bg-gray-500/70"
          color="primary"
          size="lg"
        >
          {t('button')}
        </Button>
      </div>
    </section>
  )
}

export { ContactSection }
