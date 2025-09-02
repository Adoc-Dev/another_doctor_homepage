'use client'

import { AnimatedTooltip } from '@/src/shared/ui'
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { useEffect, useState } from 'react'

type Testimonial = {
  quote: string
  name: string
  designation: string
  role: string
  career?: string[]
  src: string
}

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[]
  autoplay?: boolean
}) => {
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [rotationValues, setRotationValues] = useState<number[]>([])

  useEffect(() => {
    setMounted(true)
    // 클라이언트에서만 랜덤 값 생성
    setRotationValues(
      testimonials.map(() => Math.floor(Math.random() * 21) - 10)
    )
  }, [testimonials.length])

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleClick = (index: number) => {
    setActive(index)
  }

  const isActive = (index: number) => {
    return index === active
  }

  useEffect(() => {
    if (autoplay && mounted) {
      const interval = setInterval(handleNext, 5000)
      return () => clearInterval(interval)
    }
  }, [autoplay, mounted])

  // 마운트되기 전까지는 기본 상태로 렌더링
  if (!mounted) {
    return (
      <div className="mx-auto max-w-sm px-4 pt-6 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
        <div className="mb-16 flex justify-center">
          <AnimatedTooltip
            items={testimonials.map((testimonial, index) => ({
              id: index,
              name: testimonial.name,
              designation: testimonial.designation,
              image: testimonial.src,
            }))}
            onClick={handleClick}
          />
        </div>
        <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
          <div className="flex flex-col items-center">
            <div className="relative h-80 w-full bg-gray-100">
              <img
                src={testimonials[0].src}
                alt={testimonials[0].name}
                width={500}
                height={500}
                draggable={false}
                className="h-full w-full rounded-3xl object-cover object-center"
              />
            </div>
            <div className="mt-16 flex gap-4">
              <button className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800">
                <ArrowLeftIcon className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
              </button>
              <button className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800">
                <ArrowRightIcon className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-between py-4">
            <div>
              <h3 className="text-2xl font-bold text-black dark:text-white">
                {testimonials[0].name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                {testimonials[0].designation}
              </p>
              <div className="mt-8 text-lg whitespace-pre-line text-gray-500 dark:text-neutral-300">
                {testimonials[0].quote}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-sm px-4 pt-6 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="mb-16 flex justify-center">
        <AnimatedTooltip
          items={testimonials.map((testimonial, index) => ({
            id: index,
            name: testimonial.name,
            designation: testimonial.designation,
            image: testimonial.src,
          }))}
          onClick={handleClick}
        />
      </div>
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div className="hidden flex-col items-center sm:flex">
          <div className="relative h-60 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: rotationValues[index] || 0,
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : rotationValues[index] || 0,
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: rotationValues[index] || 0,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 origin-bottom rounded-3xl bg-gray-200"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="mt-16 flex gap-4">
            <button
              onClick={handlePrev}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <ArrowLeftIcon className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <ArrowRightIcon className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between px-4 pb-2 sm:px-0 sm:py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: 'easeInOut',
            }}
          >
            <h3 className="text-2xl font-bold text-black dark:text-white">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              {testimonials[active].designation}
            </p>

            {testimonials[active].career && (
              <motion.div
                key={`career-${active}`}
                className="mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                  delay: 0.1,
                }}
              >
                <ul className="space-y-1.5">
                  {testimonials[active].career!.map((item, index) => (
                    <motion.li
                      key={`${active}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: 'easeOut',
                        delay: 0.15 + 0.05 * index,
                      }}
                      className="flex items-start gap-2 text-xs text-gray-600 sm:text-sm dark:text-neutral-400"
                    >
                      <CheckIcon className="text-primary-500 size-3 shrink-0 sm:size-4" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            <motion.div className="mt-8 text-lg whitespace-pre-line text-gray-500 dark:text-neutral-300">
              {testimonials[active].quote.split('\n').map((line, lineIndex) => (
                <motion.p
                  key={lineIndex}
                  className="mb-4 last:mb-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: lineIndex * 0.1,
                  }}
                >
                  {line.split(' ').map((word, wordIndex) => (
                    <motion.span
                      key={`${lineIndex}-${wordIndex}`}
                      initial={{
                        filter: 'blur(10px)',
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        filter: 'blur(0px)',
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: 'easeInOut',
                        delay:
                          (lineIndex * line.split(' ').length + wordIndex) *
                          0.02,
                      }}
                      className="text-body-01 sm:text-header-02 md:text-header-01 lg:text-title-01 inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
