import LogoHorizontalIcon from '@/public/icons/logo-horizontal.svg'
import LogoIcon from '@/public/icons/logo.svg'

function Footer() {
  return (
    <footer
      id="footer-section"
      className="relative mt-20 flex w-full max-w-sm flex-col items-center justify-center gap-y-4 sm:max-w-5xl sm:items-start"
    >
      <a href="#" className="relative z-20">
        <LogoIcon className="hidden h-6 sm:block" />
        <LogoHorizontalIcon className="h-4 text-black sm:hidden sm:h-6" />
      </a>
      <p className="text-sm text-neutral-500">
        © copyright Another Doctor 2025. All rights reserved.
      </p>
    </footer>
  )
}

export { Footer }
