'use client'

import { cn } from '@/src/shared/lib/utils'
import { Moon, SunDim } from 'lucide-react'
import { useTheme } from 'next-themes'
import { memo, useCallback, useRef } from 'react'

type ThemeTogglerProps = {
  className?: string
}

const AnimatedThemeToggler = memo(({ className }: ThemeTogglerProps) => {
  const { theme, setTheme } = useTheme()
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const isDarkTheme = theme === 'dark'
  const animationRunningRef = useRef(false)

  const changeTheme = useCallback(async () => {
    if (!buttonRef.current || animationRunningRef.current) return
    animationRunningRef.current = true

    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    const maxRad = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    if (document.startViewTransition) {
      try {
        const transition = document.startViewTransition(() => {
          setTheme(isDarkTheme ? 'light' : 'dark')
        })

        await transition.ready

        requestAnimationFrame(() => {
          const animation = document.documentElement.animate(
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
              fill: 'forwards',
            }
          )

          animation.onfinish = () => {
            animationRunningRef.current = false
          }

          animation.oncancel = () => {
            animationRunningRef.current = false
          }
        })
      } catch (e) {
        setTheme(isDarkTheme ? 'light' : 'dark')
        animationRunningRef.current = false
      }
    } else {
      setTheme(isDarkTheme ? 'light' : 'dark')
      animationRunningRef.current = false
    }
  }, [isDarkTheme, setTheme])

  return (
    <button
      ref={buttonRef}
      onClick={changeTheme}
      className={cn(
        'transform-gpu transition-colors', // GPU 가속 및 색상 전환 부드럽게
        className
      )}
      aria-label={isDarkTheme ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      {isDarkTheme ? (
        <SunDim className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  )
})

AnimatedThemeToggler.displayName = 'AnimatedThemeToggler'

export { AnimatedThemeToggler }
