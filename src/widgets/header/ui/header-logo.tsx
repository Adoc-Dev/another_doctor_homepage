import LogoIcon from '@/public/logo.svg'
import Link from 'next/link'

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <LogoIcon className="xs:h-6 h-5" />
    </Link>
  )
}

export { Logo }
