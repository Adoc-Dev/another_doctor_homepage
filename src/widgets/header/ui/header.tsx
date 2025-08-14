'use client'

import LogoIcon from '@/public/logo.svg'
import { cn } from '@/src/shared/lib/utils'
import { AnimatedThemeToggler } from '@/src/shared/ui'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="fixed top-4 z-50 flex w-full justify-center transition-all duration-300">
      <div
        className={cn(
          'flex items-center justify-between rounded-4xl px-4 py-2 transition-all duration-300',
          scrolled
            ? 'bg-background/10 border-foreground/10 w-[40%] border backdrop-blur-sm'
            : 'border-foreground/10 w-[80%] bg-transparent backdrop-blur-sm'
        )}
      >
        <Link href="/" className="flex items-center gap-2">
          <LogoIcon className="size-6" />
          <div
            className={cn(
              'text-body-01 flex flex-col font-bold tracking-tighter transition-all duration-300',
              scrolled ? 'text-sm' : 'text-base'
            )}
          >
            <p className="leading-none">ANOTHER</p>
            <p className="leading-none">DOCTOR</p>
          </div>
        </Link>

        <div className="flex items-center gap-3 md:gap-5">
          <div
            className={cn(
              'flex items-center gap-2 transition-all duration-300 md:gap-4',
              scrolled ? 'text-sm' : 'text-base'
            )}
          >
            <div className="text-body-02 z-10 flex h-full cursor-pointer items-center justify-center px-4 py-2 font-medium tracking-tight text-gray-500 transition-colors duration-200 hover:text-gray-700">
              홈
            </div>
            <div className="text-body-02 z-10 flex h-full cursor-pointer items-center justify-center px-4 py-2 font-medium tracking-tight text-gray-500 transition-colors duration-200 hover:text-gray-700">
              소개
            </div>
            <div className="text-body-02 z-10 flex h-full cursor-pointer items-center justify-center px-4 py-2 font-medium tracking-tight text-gray-500 transition-colors duration-200 hover:text-gray-700">
              문의
            </div>
          </div>
        </div>
        <div className="flex w-20 items-center justify-end">
          <AnimatedThemeToggler className="flex size-8 items-center justify-center rounded-full border border-gray-200 p-1.5 shadow-sm" />
        </div>
      </div>
    </div>
  )
}

export { Header }
