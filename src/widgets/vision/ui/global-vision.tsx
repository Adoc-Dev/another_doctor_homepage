'use client'
import { AnimatedShinyText, BlurFade, WorldMap } from '@/src/shared/ui'
import { motion } from 'motion/react'

function GlobalVision() {
  return (
    <div className="w-full py-40">
      <div className="mx-auto max-w-7xl text-center">
        <BlurFade delay={0.2} inView>
          <AnimatedShinyText>OUR VISION</AnimatedShinyText>
        </BlurFade>
        <BlurFade delay={0.4} inView>
          <p className="mt-4 text-xl font-bold text-black md:text-4xl dark:text-white">
            글로벌 컬러 스탠다드{' '}
            <span className="text-neutral-400">
              {'TGRID'.split('').map((word, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.04 }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </p>
        </BlurFade>
        <BlurFade delay={0.6} inView>
          <p className="mx-auto max-w-2xl py-4 text-sm font-semibold text-neutral-500 md:text-lg">
            정확한 색은 국경을 넘어 통용되는 새로운 언어입니다. ANOTHER DOCTOR는
            세계 산업이 공유할 수 있는 표준을 만듭니다.
          </p>
        </BlurFade>
      </div>
      <WorldMap
        dots={[
          {
            start: {
              lat: 64.2008,
              lng: -149.4937,
            }, // Alaska (Fairbanks)
            end: {
              lat: 34.0522,
              lng: -118.2437,
            }, // Los Angeles
          },
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
            end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
          },
          {
            start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
          },
        ]}
      />
    </div>
  )
}

export { GlobalVision }
