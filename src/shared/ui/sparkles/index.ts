'use client'

import dynamic from 'next/dynamic'

export const SparklesCore = dynamic(
  () => import('./sparkles-core').then((mod) => mod.SparklesCore),
  {
    loading: () => null,
    ssr: false,
  }
)
