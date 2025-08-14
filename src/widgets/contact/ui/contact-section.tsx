import { AvatarCircles, Button, Ripple } from '@/src/shared/ui'

function ContactSection() {
  const avatars = [
    {
      imageUrl: 'https://avatars.githubusercontent.com/u/16860528',
      profileUrl: 'https://github.com/dillionverma',
    },
    {
      imageUrl: 'https://avatars.githubusercontent.com/u/20110627',
      profileUrl: 'https://github.com/tomonarifeehan',
    },
    {
      imageUrl: 'https://avatars.githubusercontent.com/u/106103625',
      profileUrl: 'https://github.com/BankkRoll',
    },
    {
      imageUrl: 'https://avatars.githubusercontent.com/u/59228569',
      profileUrl: 'https://github.com/safethecode',
    },
    {
      imageUrl: 'https://avatars.githubusercontent.com/u/59442788',
      profileUrl: 'https://github.com/sanjay-mali',
    },
    {
      imageUrl: 'https://avatars.githubusercontent.com/u/89768406',
      profileUrl: 'https://github.com/itsarghyadas',
    },
  ]

  return (
    <section
      id="contact-section"
      className="border-foreground/10 relative flex h-[500px] w-full max-w-4xl items-center justify-center rounded border"
    >
      <Ripple mainCircleSize={400} />
      <div className="flex flex-col items-center justify-center gap-y-4">
        <h2 className="text-display-01 text-center font-black tracking-tighter text-balance">
          함께해요
        </h2>
        <AvatarCircles numPeople={99} avatarUrls={avatars} />
        <Button
          className="mt-4 bg-gray-500/50 font-semibold backdrop-blur-sm hover:bg-gray-500/70"
          color="primary"
          size="lg"
        >
          Contact Us
        </Button>
      </div>
    </section>
  )
}

export { ContactSection }
