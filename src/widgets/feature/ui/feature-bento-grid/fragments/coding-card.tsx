'use client'
import { useEffect, useState } from 'react'

const CodingCard = () => {
  const [currentCode, setCurrentCode] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const startCoding = () => {
      setIsTyping(true)
      setCurrentCode('')

      const codeToType = codeSnippets[0]
      let index = 0

      const typeInterval = setInterval(() => {
        if (index < codeToType.length) {
          setCurrentCode(codeToType.slice(0, index + 1))
          index++
        } else {
          clearInterval(typeInterval)
          setIsTyping(false)

          setTimeout(() => {
            startCoding()
          }, 2000)
        }
      }, getTypingSpeed())
    }

    startCoding()
  }, [])

  return (
    <div className="relative flex aspect-square h-full w-full items-center justify-center overflow-hidden rounded-xl">
      {/* 배경 */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-600 via-gray-600/20 to-gray-600" />

      <div className="relative z-10 flex h-full w-full">
        <CodeEditor code={currentCode} isTyping={isTyping} />
      </div>

      {/* 간단한 장식 */}
      <div className="absolute top-2 right-2 h-2 w-2 animate-pulse rounded-full bg-green-400/60" />
    </div>
  )
}

function CodeEditor({ code, isTyping }: { code: string; isTyping: boolean }) {
  const lines = code.split('\n')

  return (
    <div className="relative h-full w-full">
      <div className="flex h-8 items-center gap-2 border-b border-gray-700/50 bg-gray-800/80 px-3">
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <div className="h-2 w-2 rounded-full bg-yellow-500" />
          <div className="h-2 w-2 rounded-full bg-green-500" />
        </div>
        <span className="ml-2 text-xs text-gray-400">t_grid_analyzer.py</span>

        <div className="ml-auto flex items-center gap-1">
          <div
            className={`h-1.5 w-1.5 rounded-full ${isTyping ? 'bg-green-400' : 'bg-gray-500'}`}
          />
          <span className="text-xs text-gray-500">{lines.length} lines</span>
        </div>
      </div>

      <div className="h-full overflow-hidden bg-gray-800/90 p-3 font-mono text-sm leading-6">
        <div className="break-words whitespace-pre-wrap">
          <SyntaxHighlighter code={code} />
          {isTyping && (
            <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-blue-400" />
          )}
        </div>
      </div>
    </div>
  )
}

function SyntaxHighlighter({ code }: { code: string }) {
  const tokens = tokenizeCode(code)

  return (
    <>
      {tokens.map((token, index) => {
        const { type, value } = token
        return (
          <span key={index} className={getTokenStyle(type)}>
            {value}
          </span>
        )
      })}
    </>
  )
}

type TokenType =
  | 'keyword'
  | 'library'
  | 'comment'
  | 'string'
  | 'number'
  | 'default'

interface Token {
  type: TokenType
  value: string
}

function tokenizeCode(code: string): Token[] {
  const tokens: Token[] = []
  let currentIndex = 0

  while (currentIndex < code.length) {
    let matched = false

    if (code[currentIndex] === '#') {
      const lineEnd = code.indexOf('\n', currentIndex)
      const commentEnd = lineEnd === -1 ? code.length : lineEnd
      tokens.push({
        type: 'comment',
        value: code.slice(currentIndex, commentEnd),
      })
      currentIndex = commentEnd
      matched = true
    } else if (['"', "'", '`'].includes(code[currentIndex])) {
      const quote = code[currentIndex]
      let stringEnd = currentIndex + 1
      while (stringEnd < code.length && code[stringEnd] !== quote) {
        if (code[stringEnd] === '\\') stringEnd++
        stringEnd++
      }
      stringEnd++
      tokens.push({
        type: 'string',
        value: code.slice(currentIndex, stringEnd),
      })
      currentIndex = stringEnd
      matched = true
    } else if (/[a-zA-Z_]/.test(code[currentIndex])) {
      let wordEnd = currentIndex
      while (wordEnd < code.length && /[a-zA-Z0-9_]/.test(code[wordEnd])) {
        wordEnd++
      }
      const word = code.slice(currentIndex, wordEnd)

      let type: TokenType = 'default'
      if (
        [
          'import',
          'from',
          'def',
          'class',
          'if',
          'else',
          'for',
          'while',
          'return',
          'yield',
        ].includes(word)
      ) {
        type = 'keyword'
      } else if (['cv2', 'np', 'numpy', 'tf', 'tensorflow'].includes(word)) {
        type = 'library'
      }

      tokens.push({ type, value: word })
      currentIndex = wordEnd
      matched = true
    } else if (/\d/.test(code[currentIndex])) {
      let numberEnd = currentIndex
      while (numberEnd < code.length && /[\d.]/.test(code[numberEnd])) {
        numberEnd++
      }
      tokens.push({
        type: 'number',
        value: code.slice(currentIndex, numberEnd),
      })
      currentIndex = numberEnd
      matched = true
    }

    if (!matched) {
      tokens.push({
        type: 'default',
        value: code[currentIndex],
      })
      currentIndex++
    }
  }

  return tokens
}

function getTokenStyle(type: TokenType): string {
  switch (type) {
    case 'keyword':
      return 'text-red-400'
    case 'library':
      return 'text-blue-400'
    case 'comment':
      return 'text-gray-500'
    case 'string':
      return 'text-green-400'
    case 'number':
      return 'text-purple-400'
    default:
      return 'text-slate-300'
  }
}

const codeSnippets = [
  `import cv2
import numpy as np

# 치아 영역 검출
def detect_tooth(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    contours = cv2.findContours(gray, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    return max(contours, key=cv2.contourArea)`,
]

function getTypingSpeed() {
  return Math.random() * 30 + 40
}

export { CodingCard }
