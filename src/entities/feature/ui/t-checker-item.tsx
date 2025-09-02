'use client'

import { useEffect, useState } from 'react'

const colors = [
  '#ECEEDF',
  '#D9C4B0',
  '#F6EFD2',
  '#D6A99D',
  '#BCA88D',
  '#DDDAD0',
]

function TCheckerItem() {
  const [shuffledColors, setShuffledColors] = useState(colors)

  useEffect(() => {
    setShuffledColors([...colors].sort(() => Math.random() - 0.5))
  }, [])

  return (
    <div className="flex flex-row items-center justify-center gap-3 rounded-xl p-4 shadow-lg">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="flex size-10 items-center justify-center rounded-lg"
          style={{
            backgroundColor: shuffledColors[idx],
          }}
        />
      ))}
      <div className="flex size-10 items-center justify-center rounded-lg bg-white" />
    </div>
  )
}

export { TCheckerItem }
