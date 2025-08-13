'use client'

import React, { forwardRef, useRef } from 'react'

import LogoIcon from '@/public/logo.svg'
import { cn } from '@/src/shared/lib/utils'
import { AnimatedBeam } from '@/src/shared/ui'
import { Brain, CameraIcon, Car, Home, ScanFaceIcon, Vegan } from 'lucide-react'

function MissionBeanGroup() {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const div5Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative flex h-[300px] w-full items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[200px] max-w-lg flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
            <CameraIcon />
          </Circle>
          <Circle ref={div5Ref}>
            <ScanFaceIcon />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
            <Car />
          </Circle>
          <Circle ref={div4Ref} className="size-12">
            <LogoIcon />
          </Circle>
          <Circle ref={div6Ref}>
            <Brain />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
            <Home />
          </Circle>
          <Circle ref={div7Ref}>
            <Vegan />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-55}
        endYOffset={-5}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
        endYOffset={-2}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={55}
        endYOffset={5}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-55}
        endYOffset={-5}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        endYOffset={-2}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={55}
        endYOffset={5}
        reverse
      />
    </div>
  )
}

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'border-foreground/10 z-10 flex size-12 items-center justify-center rounded-full border bg-white p-3',
        className
      )}
    >
      {children}
    </div>
  )
})

Circle.displayName = 'Circle'

export { MissionBeanGroup }
