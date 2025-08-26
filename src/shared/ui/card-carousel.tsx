'use client'
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import { cn } from '@/src/shared/lib/utils'
import { Pause, Play } from 'lucide-react'
import { motion } from 'motion/react'
import { ImageProps } from 'next/image'

interface CarouselProps {
  items: React.ReactElement[]
  initialScroll?: number
}

type Card = {
  src: string
  title: string
  description: string
  category?: string
  content?: React.ReactNode
}

export const CarouselContext = createContext<{
  currentIndex: number
}>({
  currentIndex: 0,
})

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const AUTOPLAY_DELAY = 4000 // 4초
  const PROGRESS_INTERVAL = 50 // 50ms마다 업데이트

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll
    }
  }, [initialScroll])

  const goToSlide = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile()
        ? index === currentIndex
          ? 288
          : 224
        : index === currentIndex
          ? 448
          : 384
      const gap = isMobile() ? 16 : 16
      let scrollPosition = 0

      // Calculate scroll position considering variable widths
      for (let i = 0; i < index; i++) {
        const width = isMobile()
          ? i === currentIndex
            ? 288
            : 224
          : i === currentIndex
            ? 448
            : 384
        scrollPosition += width + gap
      }

      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      })
      setCurrentIndex(index)
      setProgress(0)
    }
  }

  const updateCurrentIndexFromScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft
      const cardWidth = isMobile() ? 256 : 400 // Average card width
      const gap = 16
      const approximateIndex = Math.round(scrollLeft / (cardWidth + gap))
      const clampedIndex = Math.max(
        0,
        Math.min(approximateIndex, items.length - 1)
      )

      if (clampedIndex !== currentIndex) {
        setCurrentIndex(clampedIndex)
        setProgress(0)
      }
    }
  }

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % items.length
    goToSlide(nextIndex)
  }

  const prevSlide = () => {
    const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1
    goToSlide(prevIndex)
  }

  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)

    intervalRef.current = setInterval(nextSlide, AUTOPLAY_DELAY)

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + (PROGRESS_INTERVAL / AUTOPLAY_DELAY) * 100
      })
    }, PROGRESS_INTERVAL)
  }

  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
  }

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    if (isPlaying) {
      startAutoplay()
    } else {
      stopAutoplay()
    }

    return () => {
      stopAutoplay()
    }
  }, [isPlaying, currentIndex])

  const isMobile = () => {
    return window && window.innerWidth < 768
  }

  return (
    <CarouselContext.Provider value={{ currentIndex }}>
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
          ref={carouselRef}
          onScroll={updateCurrentIndexFromScroll}
        >
          <div
            className={cn(
              'flex flex-row justify-start gap-4 pl-4',
              'mx-auto max-w-7xl'
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: 'easeOut',
                  },
                }}
                key={'card' + index}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4">
          {/* Progress Indicators */}
          <div className="flex items-center gap-3">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'relative overflow-hidden transition-all duration-300 hover:opacity-80',
                  index === currentIndex
                    ? 'h-2 w-8 rounded-full bg-gray-300'
                    : 'h-2 w-2 rounded-full bg-gray-400'
                )}
              >
                {index === currentIndex && (
                  <div
                    className="bg-primary h-full transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Play/Pause Button */}
          <button
            className="relative z-40 ml-6 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
            onClick={toggleAutoplay}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 text-gray-600" />
            ) : (
              <Play className="h-4 w-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  )
}

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card
  index: number
  layout?: boolean
}) => {
  const { currentIndex } = useContext(CarouselContext)
  const isActive = currentIndex === index

  return (
    <motion.div
      layoutId={layout ? `card-${card.title}` : undefined}
      className={cn(
        'relative z-10 flex h-96 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 shadow-lg transition-all duration-500 dark:bg-neutral-900',
        isActive
          ? 'w-72 md:h-[28rem] md:w-[28rem]'
          : 'w-56 md:h-[28rem] md:w-96'
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-full bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <div className="relative z-40 flex h-full flex-col p-6 md:p-8">
        <motion.p
          layoutId={layout ? `title-${card.title}` : undefined}
          className="text-left font-sans text-2xl font-semibold [text-wrap:balance] text-white md:text-3xl"
        >
          {card.title}
        </motion.p>
        <motion.p
          layoutId={layout ? `description-${card.title}` : undefined}
          className="mt-auto line-clamp-5 max-w-xs text-left font-sans text-base font-medium [text-wrap:balance] whitespace-pre-wrap text-white/90 md:text-lg"
        >
          {card.description}
        </motion.p>
      </div>
      <BlurImage
        src={card.src}
        alt={card.title}
        fill
        className="absolute inset-0 z-10 object-cover"
      />
    </motion.div>
  )
}

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true)
  return (
    <img
      className={cn(
        'h-full w-full transition duration-300',
        isLoading ? 'blur-sm' : 'blur-0',
        className
      )}
      onLoad={() => setLoading(false)}
      src={src as string}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === 'string' ? src : undefined}
      alt={alt ? alt : 'Background of a beautiful view'}
      {...rest}
    />
  )
}
