import LogoIcon from '@/public/logo.svg'
import Link from 'next/link'

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <LogoIcon className="text-primary-700 dark:text-primary-500 size-6" />
      <div className="font-nova-square text-body-01 flex flex-col font-bold tracking-tighter transition-all duration-300">
        <p className="text-primary-700 dark:text-primary-500 leading-none">
          ANOTHER
          <br />
          DOCTOR
        </p>
      </div>
    </Link>
  )
}

export { Logo }
