'use client'

import { cn } from '@/src/shared/lib/utils'
import { Moon, SunDim } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useRef } from 'react'
import { flushSync } from 'react-dom'

type props = {
  className?: string
}

const AnimatedThemeToggler = ({ className }: props) => {
  const { theme, setTheme } = useTheme()

  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const changeTheme = async () => {
    if (!buttonRef.current) return

    const startVT = document.startViewTransition?.bind(document)
    await (startVT
      ? startVT(() => {
          flushSync(() => {
            setTheme(theme === 'dark' ? 'light' : 'dark')
          })
        }).ready
      : Promise.resolve(() => {
          setTheme(theme === 'dark' ? 'light' : 'dark')
        }))

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()
    const y = top + height / 2
    const x = left + width / 2

    const right = window.innerWidth - left
    const bottom = window.innerHeight - top
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom))

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  }
  return (
    <button ref={buttonRef} onClick={changeTheme} className={cn(className)}>
      {theme === 'dark' ? (
        <SunDim className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  )
}

export { AnimatedThemeToggler }
