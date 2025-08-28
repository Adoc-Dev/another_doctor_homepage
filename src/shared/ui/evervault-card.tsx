'use client'
import { cn } from '@/src/shared/lib/utils'
import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

export const EvervaultCard = ({
  text,
  className,
}: {
  text?: string
  className?: string
}) => {
  const [randomString, setRandomString] = useState('')

  useEffect(() => {
    let str = generateRealisticCode()
    setRandomString(str)

    // 6초마다 새로운 코드 생성
    const interval = setInterval(() => {
      const newStr = generateRealisticCode()
      setRandomString(newStr)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={cn(
        'relative flex aspect-square h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-black',
        className
      )}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <CardPattern randomString={randomString} />
      </div>
    </div>
  )
}

export function CardPattern({ randomString }: { randomString: string }) {
  const [typedLines, setTypedLines] = useState<string[]>([''])
  const [currentLine, setCurrentLine] = useState('')
  const [charIndex, setCharIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lines = randomString.split('\n')
    let lineIdx = 0
    let charIdx = 0

    const interval = setInterval(() => {
      if (lineIdx < lines.length) {
        const current = lines[lineIdx]

        if (charIdx < current.length) {
          setCurrentLine((prev) => prev + current[charIdx])
          charIdx++
        } else {
          // 줄 바꿈
          setTypedLines((prev) => [...prev, current])
          setCurrentLine('')
          charIdx = 0
          lineIdx++
        }
      } else {
        // 다 치면 다시 리셋
        setTypedLines([''])
        setCurrentLine('')
        lineIdx = 0
        charIdx = 0
      }
    }, 30)

    return () => clearInterval(interval)
  }, [randomString])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [typedLines, currentLine])

  return (
    <div className="relative h-full w-full">
      {/* 타이핑되는 코드 */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden p-4 font-mono text-xs leading-4 text-green-300/80"
      >
        <motion.pre
          className="pb-20 whitespace-pre-wrap"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          {typedLines.join('\n')}
          {currentLine}
          <motion.span
            className="ml-1 inline-block h-4 w-2 bg-green-400"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </motion.pre>
      </div>

      {/* 오버레이 효과 */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      <div className="pointer-events-none absolute top-0 right-0 left-0 h-10 bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-10 bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}

// 코드 스니펫 모음 (OpenCV + 딥러닝 느낌)
const codeSnippets = [
  'import cv2',
  'import numpy as np',
  'import torch',
  'import torch.nn as nn',
  'import torch.optim as optim',
  'from torchvision import transforms',
  '',
  'class ConvNet(nn.Module):',
  '    def __init__(self):',
  '        super(ConvNet, self).__init__()',
  '        self.conv1 = nn.Conv2d(1, 32, 3, 1)',
  '        self.conv2 = nn.Conv2d(32, 64, 3, 1)',
  '        self.fc1 = nn.Linear(9216, 128)',
  '        self.fc2 = nn.Linear(128, 10)',
  '',
  '    def forward(self, x):',
  '        x = torch.relu(self.conv1(x))',
  '        x = torch.relu(self.conv2(x))',
  '        x = torch.flatten(x, 1)',
  '        x = torch.relu(self.fc1(x))',
  '        return self.fc2(x)',
  '',
  'def preprocess_image(path):',
  '    img = cv2.imread(path, cv2.IMREAD_GRAYSCALE)',
  '    img = cv2.resize(img, (28, 28))',
  '    tensor = torch.tensor(img / 255.0).float().unsqueeze(0).unsqueeze(0)',
  '    return tensor',
  '',
  'model = ConvNet()',
  'optimizer = optim.Adam(model.parameters(), lr=0.001)',
  '',
  'def predict(path):',
  '    input_tensor = preprocess_image(path)',
  '    with torch.no_grad():',
  '        output = model(input_tensor)',
  '        pred = output.argmax(dim=1).item()',
  '    return pred',
]

export const generateRealisticCode = () => {
  let result = ''
  const lineCount = Math.floor(Math.random() * 25) + 15 // 15-40 lines
  for (let i = 0; i < lineCount; i++) {
    const snippet =
      codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
    result += snippet + '\n'
  }
  return result
}
