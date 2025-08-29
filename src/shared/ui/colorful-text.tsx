'use client'
import { motion } from 'motion/react'
import React from 'react'

export function ColourfulText({ text }: { text: string }) {
  const colors = [
    '#B87C4C',
    '#D9C4B0',
    '#EBD9D1',
    '#D6A99D',
    '#BCA88D',
    '#DDDAD0',
  ]

  const [currentColors, setCurrentColors] = React.useState(colors)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5)
      setCurrentColors(shuffled)
      setCount((prev) => prev + 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return text.split('').map((char, index) => (
    <motion.span
      key={`${char}-${count}-${index}`}
      initial={{
        y: 0,
      }}
      animate={{
        color: currentColors[index % currentColors.length],
        y: [0, -3, 0],
        scale: [1, 1.01, 1],
        filter: ['blur(0px)', `blur(5px)`, 'blur(0px)'],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      className="inline-block font-sans text-2xl font-bold tracking-tight whitespace-pre md:text-3xl lg:text-4xl"
    >
      {char}
    </motion.span>
  ))
}
