'use client'
import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const CodingCard = () => {
  const [randomString, setRandomString] = useState('')

  useEffect(() => {
    let str = generateRealisticCode()
    setRandomString(str)

    const interval = setInterval(() => {
      const newStr = generateRealisticCode()
      setRandomString(newStr)
    }, 8000) // 조금 더 긴 간격

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative flex aspect-square h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-black">
      <div className="relative flex h-full w-full items-center justify-center">
        <CodingPattern randomString={randomString} />
      </div>
    </div>
  )
}

export { CodingCard }

function CodingPattern({ randomString }: { randomString: string }) {
  const [displayText, setDisplayText] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lines = randomString.split('\n')
    let allText = ''
    let currentIndex = 0

    // 모든 줄을 하나의 텍스트로 합치되, 줄바꿈 유지
    const fullText = lines.join('\n')

    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        const char = fullText[currentIndex]

        // 줄바꿈 전에 잠깐 멈춤 (더 자연스러운 효과)
        if (char === '\n') {
          setTimeout(
            () => {
              setDisplayText((prev) => prev + char)
            },
            Math.random() * 200 + 100
          ) // 100-300ms 랜덤 딜레이
        } else {
          setDisplayText((prev) => prev + char)
        }

        currentIndex++
      } else {
        // 모든 텍스트 완료 후 잠시 대기하고 리셋
        setTimeout(() => {
          setDisplayText('')
          currentIndex = 0
        }, 2000)
      }
    }, getTypingSpeed())

    return () => clearInterval(interval)
  }, [randomString])

  // 타이핑 속도를 다양하게 (실제 사람처럼)
  function getTypingSpeed() {
    return Math.random() * 80 + 20 // 20-100ms 랜덤
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [displayText])

  return (
    <div className="relative h-full w-full">
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden p-4 font-mono text-xs leading-5 text-green-300/80"
      >
        <motion.pre
          className="pb-20 whitespace-pre-wrap"
          animate={{ y: [0, -1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {displayText}
          <motion.span
            className="ml-1 inline-block h-4 w-2 bg-green-400"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        </motion.pre>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      <div className="pointer-events-none absolute top-0 right-0 left-0 h-10 bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-10 bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}

// 더 자연스러운 코드 스니펫 (치아 관련 AI 코드)
const codeSnippets = [
  '# T-GRID 색상 분석 시스템',
  'import cv2',
  'import numpy as np',
  'import torch',
  'import torch.nn as nn',
  'from sklearn.cluster import KMeans',
  '',
  'class ToothColorAnalyzer:',
  '    def __init__(self):',
  '        self.model = self.load_pretrained_model()',
  '        self.color_standards = self.load_vita_standards()',
  '    ',
  '    def calibrate_image(self, image_path):',
  '        """이미지 보정 및 전처리"""',
  '        img = cv2.imread(image_path)',
  '        img = cv2.cvtColor(img, cv2.COLOR_BGR_LAB)',
  '        ',
  '        # 조명 보정',
  '        l_channel = img[:,:,0]',
  '        l_channel = cv2.equalizeHist(l_channel)',
  '        img[:,:,0] = l_channel',
  '        ',
  '        return cv2.cvtColor(img, cv2.COLOR_LAB2RGB)',
  '',
  '    def extract_tooth_region(self, image):',
  '        """치아 영역 추출"""',
  '        mask = self.create_tooth_mask(image)',
  '        tooth_pixels = image[mask > 0]',
  '        return tooth_pixels',
  '    ',
  '    def analyze_color(self, tooth_pixels):',
  '        """색상 분석 및 VITA 매칭"""',
  '        kmeans = KMeans(n_clusters=3, random_state=42)',
  '        clusters = kmeans.fit_predict(tooth_pixels)',
  '        ',
  '        dominant_color = kmeans.cluster_centers_[0]',
  '        vita_match = self.match_to_vita(dominant_color)',
  '        ',
  '        return {',
  '            "dominant_color": dominant_color,',
  '            "vita_shade": vita_match,',
  '            "confidence": self.calculate_confidence()',
  '        }',
  '',
  'def process_dental_image(image_path):',
  '    analyzer = ToothColorAnalyzer()',
  '    ',
  '    # 1. 이미지 로드 및 보정',
  '    calibrated_img = analyzer.calibrate_image(image_path)',
  '    ',
  '    # 2. 치아 영역 추출',
  '    tooth_pixels = analyzer.extract_tooth_region(calibrated_img)',
  '    ',
  '    # 3. 색상 분석',
  '    result = analyzer.analyze_color(tooth_pixels)',
  '    ',
  '    print(f"분석 결과: {result["vita_shade"]}")',
  '    print(f"신뢰도: {result["confidence"]:.2f}")',
  '    ',
  '    return result',
]

const generateRealisticCode = () => {
  const shuffled = [...codeSnippets].sort(() => Math.random() - 0.5)
  const lineCount = Math.floor(Math.random() * 20) + 25

  let result = ''
  for (let i = 0; i < Math.min(lineCount, shuffled.length); i++) {
    result += shuffled[i] + '\n'
  }

  return result
}
