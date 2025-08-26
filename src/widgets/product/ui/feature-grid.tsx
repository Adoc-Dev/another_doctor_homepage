'use client'

import { cn } from '@/src/shared/lib/utils'
import { BentoGrid, BentoGridItem } from '@/src/shared/ui/bento-grid'
import { EvervaultCard } from '@/src/widgets/product/ui/evervalut-card'
import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

export function FeatureGrid() {
  const t = useTranslations('technologyImpact')

  const items = [
    {
      title: t('grid.item1.title'),
      description: (
        <span className="text-sm">{t('grid.item1.description')}</span>
      ),
      header: <SkeletonOne />,
      className: 'md:col-span-1',
    },
    {
      title: t('grid.item2.title'),
      description: (
        <span className="text-sm">{t('grid.item2.description')}</span>
      ),
      header: <SkeletonFive />,
      className: 'md:col-span-2',
    },
    {
      title: t('grid.item3.title'),
      description: (
        <span className="text-sm">{t('grid.item3.description')}</span>
      ),
      header: <SkeletonFour />,
      className: 'md:col-span-2',
    },

    {
      title: t('grid.item4.title'),
      description: (
        <span className="text-sm">{t('grid.item4.description')}</span>
      ),
      header: <SkeletonThree />,
      className: 'md:col-span-1',
    },
  ]

  return (
    <BentoGrid className="mx-auto mt-16 max-w-4xl md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn('[&>p:text-lg]', item.className)}
        />
      ))}
    </BentoGrid>
  )
}

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  }
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="bg-background flex h-full min-h-[6rem] w-full flex-1 flex-col items-center justify-center space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex max-w-[200px] flex-row items-center space-x-1 rounded-lg border border-neutral-100 bg-white p-1 shadow-sm dark:border-white/[0.2] dark:bg-black"
      >
        <div className="size-6.5 shrink-0 rounded-md bg-[#CFAB8D] shadow-sm" />
        <div className="size-6.5 shrink-0 rounded-md bg-[#FFFADC] shadow-sm" />
        <div className="size-6.5 shrink-0 rounded-md bg-[#DCD0A8] shadow-sm" />
        <div className="size-6.5 shrink-0 rounded-md bg-[#D9C4B0] shadow-sm" />
        <div className="size-6.5 shrink-0 rounded-md bg-[#F3E9DC] shadow-sm" />
        <div className="size-6.5 shrink-0 rounded-md bg-[#F0E4D3] shadow-sm" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex max-w-[200px] flex-row items-center space-x-1 rounded-lg border border-neutral-100 bg-white p-1 shadow-sm dark:border-white/[0.2] dark:bg-black"
      >
        <div className="size-6.5 shrink-0 rounded-md bg-[#CFAB8D] shadow-sm" />
        <div className="size-6.5 shrink-0 rounded-md bg-[#FFFADC] shadow-sm" />
        <div className="size-6.5 shrink-0 rounded-md bg-[#DCD0A8] shadow-sm" />
        <div className="size-6.5 shrink-0 rounded-md bg-[#D9C4B0] shadow-sm" />
        <div className="size-6.5 shrink-0 rounded-md bg-[#F3E9DC] shadow-sm" />
        <div className="size-6.5 shrink-0 rounded-md bg-[#F0E4D3] shadow-sm" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex max-w-[200px] flex-row items-center space-x-1 rounded-lg border border-neutral-100 bg-white p-1 shadow-sm dark:border-white/[0.2] dark:bg-black"
      >
        <div className="size-6.5 shrink-0 rounded-md bg-[#CFAB8D] shadow-sm" />
        <div className="size-6.5 shrink-0 rounded-md bg-[#FFFADC] shadow-sm" />
        <div className="size-6.5 shrink-0 rounded-md bg-[#DCD0A8] shadow-sm" />
        <div className="size-6.5 shrink-0 rounded-md bg-[#D9C4B0] shadow-sm" />
        <div className="size-6.5 shrink-0 rounded-md bg-[#F3E9DC] shadow-sm" />
        <div className="size-6.5 shrink-0 rounded-md bg-[#F0E4D3] shadow-sm" />
      </motion.div>
    </motion.div>
  )
}

const SkeletonThree = () => {
  const variants = {
    initial: {
      x: 0,
      rotate: 0,
    },
    hover: {
      rotate: 5,
    },
  }
  const variantsSecond = {
    initial: {
      x: 0,
      rotate: 0,
    },
    hover: {
      rotate: -5,
    },
  }

  // 기존 치아 색상 팔레트 사용
  const toothColorPalette = [
    ['#CFAB8D', '#FFFADC', '#DCD0A8', '#D9C4B0', '#F3E9DC', '#F0E4D3'],
    ['#E6D3A3', '#F5F5DC', '#D2B48C', '#DEB887', '#EAE4D5', '#FCF8DD'],
    ['#F5DEB3', '#F0E4D3', '#CFAB8D', '#D9C4B0', '#F0E4D3', '#F6F1E9'],
    ['#F5F5DC', '#FAEBD7', '#FFEFD5', '#FFE4B5', '#FFDAB9', '#FFE4C4'],
  ]

  // 마름모 형태로 배치할 색상 배열 생성
  const createDiamondPattern = () => {
    const allColors = toothColorPalette.flat()
    const maxCols = 5
    const rows = 5 // 마름모 높이

    const pattern = []
    for (let row = 0; row < rows; row++) {
      const colsInRow =
        row < Math.floor(rows / 2)
          ? row + 3 + Math.floor(rows / 2) // 위쪽: 증가
          : rows - row + Math.floor(rows / 2) + 2 // 아래쪽: 감소

      const rowColors = []
      for (let col = 0; col < colsInRow; col++) {
        const colorIndex = (row * maxCols + col) % allColors.length
        rowColors.push(allColors[colorIndex])
      }
      pattern.push(rowColors)
    }
    return pattern
  }

  const diamondPattern = createDiamondPattern()

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2 rounded-lg"
    >
      <div className="relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-1 p-8">
            {diamondPattern.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-1">
                {row.map((color, colIndex) => (
                  <motion.div
                    key={`${rowIndex}-${colIndex}`}
                    variants={colIndex % 2 === 0 ? variants : variantsSecond}
                    className="size-7 rounded-md shadow-sm transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  }
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  }
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black"
      >
        <p className="text-center text-xs font-semibold text-neutral-500 sm:text-sm">
          치아색 보정 및 판정
        </p>
        <p className="mt-4 text-center text-[10px] text-neutral-500 sm:text-xs">
          임상 사진 내 표본 치아를 활용한 치아색 보정과 판정 방법
        </p>
        <p className="mt-4 rounded-full border border-red-500 bg-red-100 px-2 py-0.5 text-xs text-red-600 dark:bg-red-900/20">
          특허1
        </p>
      </motion.div>
      <motion.div className="relative z-20 flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black">
        <p className="text-center text-xs font-semibold text-neutral-500 sm:text-sm">
          객체 색상 측정
        </p>
        <p className="mt-4 text-center text-[10px] text-neutral-500 sm:text-xs">
          객체의 색상을 측정하는 방법 및 장치
        </p>
        <p className="mt-4 rounded-full border border-green-500 bg-green-100 px-2 py-0.5 text-xs text-green-600 dark:bg-green-900/20">
          특허2
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black"
      >
        <p className="text-center text-xs font-semibold text-neutral-500 sm:text-sm">
          치아 색상 보정 장치
        </p>
        <p className="mt-4 text-center text-[10px] text-neutral-500 sm:text-xs">
          치아 색상 보정 서비스 제공 방법 및 이를 위한 장치
        </p>
        <p className="mt-4 rounded-full border border-orange-500 bg-orange-100 px-2 py-0.5 text-xs text-orange-600 dark:bg-orange-900/20">
          특허3
        </p>
      </motion.div>
    </motion.div>
  )
}
const SkeletonFive = () => {
  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2"
    >
      <EvervaultCard text="hover" />
    </motion.div>
  )
}
