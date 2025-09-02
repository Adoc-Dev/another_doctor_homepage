import LogoHorizontalIcon from '@/public/icons/signature_horizon.svg'
import Link from 'next/link'

function Footer() {
  return (
    <footer
      id="footer-section"
      className="relative mt-20 flex w-full max-w-sm flex-col items-center justify-center gap-y-4 sm:max-w-5xl"
    >
      <Link href="/" className="relative z-20">
        <LogoHorizontalIcon className="h-4 sm:h-6" />
      </Link>
      <p className="text-sm text-neutral-500">
        © copyright Another Doctor 2025. All rights reserved.
      </p>
    </footer>
  )
}

export { Footer }
