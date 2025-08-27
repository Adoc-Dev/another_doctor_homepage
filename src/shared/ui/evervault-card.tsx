'use client'
import { cn } from '@/src/shared/lib/utils'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import { useEffect, useState } from 'react'

export const EvervaultCard = ({
  text,
  className,
}: {
  text?: string
  className?: string
}) => {
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  const [randomString, setRandomString] = useState('')
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    let str = generateRandomString(1500)
    setRandomString(str)
  }, [])

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)

    if (isHovered) {
      const str = generateRandomString(1500)
      setRandomString(str)
    }
  }

  return (
    <div
      className={cn(
        'relative flex aspect-square h-full w-full items-center justify-center bg-transparent p-0.5',
        className
      )}
    >
      <div
        onMouseMove={onMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group/card relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-transparent"
      >
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
          isHovered={isHovered}
        />
      </div>
    </div>
  )
}

export function CardPattern({ mouseX, mouseY, randomString, isHovered }: any) {
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl">
        <p className="absolute inset-x-0 h-full font-mono text-xs font-bold break-words whitespace-pre-wrap text-gray-800/30 transition duration-500 dark:text-gray-600/50">
          {randomString}
        </p>
      </div>

      <div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-300 to-amber-500 opacity-0 backdrop-blur-xl transition duration-500 group-hover/card:opacity-100"
        style={style}
      />

      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay group-hover/card:opacity-100"
        style={style}
      >
        <motion.p
          className="absolute inset-x-0 h-full font-mono text-xs font-bold break-words whitespace-pre-wrap text-black transition duration-500"
          animate={isHovered ? { opacity: [0.5, 1, 0.5] } : { opacity: 0 }}
          transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
        >
          {randomString}
        </motion.p>
      </motion.div>
    </div>
  )
}

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
export const generateRandomString = (length: number) => {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  )
}
