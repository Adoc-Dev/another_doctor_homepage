'use client'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

const CodingCard = () => {
  const [currentCode, setCurrentCode] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const startCoding = () => {
      setIsTyping(true)
      setCurrentCode('')

      const codeToType = getRandomCodeSnippet()
      let index = 0

      const typeInterval = setInterval(() => {
        if (index < codeToType.length) {
          setCurrentCode(codeToType.slice(0, index + 1))
          index++
        } else {
          clearInterval(typeInterval)
          setIsTyping(false)

          // 3초 후 새로운 코드 시작
          setTimeout(() => {
            startCoding()
          }, 2000)
        }
      }, getTypingSpeed())
    }

    startCoding()
  }, [])

  return (
    <div className="relative flex aspect-square h-full w-full items-center justify-center overflow-hidden rounded-xl bg-gray-900">
      <div className="relative flex h-full w-full items-center justify-start">
        <CodeEditor code={currentCode} isTyping={isTyping} />
      </div>
    </div>
  )
}

export { CodingCard }

function CodeEditor({ code, isTyping }: { code: string; isTyping: boolean }) {
  return (
    <div className="relative h-full w-full">
      {/* VS Code 스타일 헤더 */}
      <div className="flex h-8 items-center gap-2 border-b border-gray-700 bg-gray-800 px-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <span className="ml-2 text-xs text-gray-400">t_grid_analyzer.py</span>
      </div>

      {/* 코드 영역 */}
      <div className="relative h-full overflow-hidden bg-gray-900 p-3 font-mono text-sm">
        <pre className="text-green-300">
          {code}
          {isTyping && (
            <motion.span
              className="inline-block h-4 w-1 bg-blue-400"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </pre>
      </div>
    </div>
  )
}

// OpenCV 기반 파이썬 코드 스니펫들
const codeSnippets = [
  `import cv2
import numpy as np
from sklearn.cluster import KMeans

img = cv2.imread('tooth.jpg')
lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
result = analyze_shade(lab)`,

  `# 치아 영역 추출
def extract_tooth_region(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    mask = cv2.threshold(gray, 0, 255, 
                        cv2.THRESH_BINARY)[1]
    return cv2.bitwise_and(image, image, mask=mask)`,

  `# 색상 보정 알고리즘
def calibrate_color(image):
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    
    # CLAHE 적용
    clahe = cv2.createCLAHE(clipLimit=2.0)
    l = clahe.apply(l)
    
    return cv2.merge([l, a, b])`,

  `# VITA 색상 매칭
VITA_STANDARDS = {
    'A1': [240, 239, 230],
    'A2': [245, 240, 220], 
    'B1': [236, 235, 225],
    'C1': [239, 235, 222]
}

def match_vita_shade(color_rgb):
    min_distance = float('inf')
    best_match = 'A1'
    
    for shade, rgb in VITA_STANDARDS.items():
        distance = np.linalg.norm(
            np.array(color_rgb) - np.array(rgb)
        )
        if distance < min_distance:
            min_distance = distance
            best_match = shade
    
    return best_match, min_distance`,

  `# 딥러닝 모델 예측
import tensorflow as tf

model = tf.keras.models.load_model('tgrid_model.h5')

def predict_shade(image_array):
    processed = preprocess_image(image_array)
    prediction = model.predict(processed)
    confidence = np.max(prediction)
    
    return {
        'shade': decode_prediction(prediction),
        'confidence': float(confidence)
    }`,

  `# K-means 클러스터링으로 주요 색상 추출
def get_dominant_colors(image, k=3):
    pixels = image.reshape(-1, 3)
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(pixels)
    
    colors = kmeans.cluster_centers_
    labels = kmeans.labels_
    
    # 가장 많이 나타나는 색상 찾기
    unique, counts = np.unique(labels, return_counts=True)
    dominant_idx = unique[np.argmax(counts)]
    
    return colors[dominant_idx].astype(int)`,
]

function getRandomCodeSnippet() {
  return codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
}

function getTypingSpeed() {
  return Math.random() * 40 + 50 // 50-90ms 랜덤 (파이썬 코드는 조금 더 천천히)
}
