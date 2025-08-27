'use client'

import { cn } from '@/src/shared/lib/utils'
import { Button } from '@/src/shared/ui'
import { Moon, SunDim } from 'lucide-react'
import { useTheme } from 'next-themes'
import { memo, useCallback } from 'react'

type ThemeTogglerProps = {
  className?: string
}

const ThemeToggler = memo(({ className }: ThemeTogglerProps) => {
  const { theme, setTheme } = useTheme()
  const isDarkTheme = theme === 'dark'

  const changeTheme = useCallback(() => {
    setTheme(isDarkTheme ? 'light' : 'dark')
  }, [isDarkTheme, setTheme])

  return (
    <Button
      onClick={changeTheme}
      className={cn(
        'min-h-0 cursor-pointer rounded-full border-gray-200 p-0 hover:bg-transparent hover:text-gray-800 focus:ring-0 focus-visible:ring-gray-300 focus-visible:ring-offset-0 dark:border-gray-800 dark:hover:text-gray-100',
        className
      )}
      variant="outline"
      size="icon"
      aria-label={isDarkTheme ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      {isDarkTheme ? (
        <SunDim className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </Button>
  )
})

ThemeToggler.displayName = 'ThemeToggler'

export { ThemeToggler }
