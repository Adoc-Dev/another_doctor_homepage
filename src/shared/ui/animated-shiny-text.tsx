import { ComponentPropsWithoutRef, CSSProperties, FC } from 'react'

import { cn } from '@/src/shared/lib/utils'

export interface AnimatedShinyTextProps
  extends ComponentPropsWithoutRef<'span'> {
  shimmerWidth?: number
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  return (
    <span
      style={
        {
          '--shiny-width': `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        'text-primary-500/70 dark:text-primary-400/70 mx-auto max-w-md text-[1.25rem] font-medium',
        'animate-shiny-text [background-size:var(--shiny-width)_100%] bg-clip-text [background-position:0_0] bg-no-repeat [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]',
        'bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80',

        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
