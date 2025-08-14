'use client'

import { cn } from '@/src/shared/lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/src/shared/ui'
import { Quote } from 'lucide-react'
import { useEffect, useState } from 'react'

const testimonials = [
  {
    message:
      'T-GRID는 우리 치과의 색상 측정 방식을 완전히 바꾸어 놓았습니다. 이전에는 색상 불일치로 인한 재제작이 큰 문제였지만, 이제는 거의 발생하지 않습니다. 환자들도 결과에 매우 만족하고 있습니다.',
    name: '김지호 원장',
    title: '서울 미소치과 대표',
  },
  {
    message:
      '복잡한 색상 측정 과정이 T-GRID로 간소화되어 환자의 대기 시간이 크게 줄었습니다. 특히 자연스러운 색상 매칭 능력은 타 제품과 비교할 수 없을 정도로 우수합니다.',
    name: '박서연 원장',
    title: '부산 스마일치과 대표',
  },
  {
    message:
      '기공소와의 커뮤니케이션 오류가 T-GRID 도입 후 90% 감소했습니다. 이제는 첫 번째 시도에서 완벽한 색상 매칭이 가능해져 환자 만족도가 크게 향상되었습니다.',
    name: '정민우 원장',
    title: '대구 미래치과 대표',
  },
]

function CustomerMessageSection() {
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)

  // API가 설정되면 자동 재생과 현재 슬라이드 추적 시작
  useEffect(() => {
    if (!api) return

    // 슬라이드 변경 시 현재 인덱스 업데이트
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on('select', onSelect)
    onSelect() // 초기 상태 설정

    // 자동 재생 설정 (5초마다)
    const autoplayInterval = setInterval(() => {
      api.scrollNext()
    }, 5000)

    // 클린업
    return () => {
      clearInterval(autoplayInterval)
      api.off('select', onSelect)
    }
  }, [api])

  return (
    <div className="my-32 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl">
        <Carousel
          opts={{
            align: 'center',
            loop: true,
          }}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="flex flex-col items-center justify-center gap-y-6 px-4"
              >
                <Quote className="h-8 w-8 text-red-500 opacity-50" />
                <p className="text-header-02 text-center font-bold text-balance">
                  "{testimonial.message}"
                </p>
                <div className="flex flex-col items-center">
                  <p className="text-header-02 font-bold">{testimonial.name}</p>
                  <p className="text-body-01 text-foreground/70 font-semibold">
                    {testimonial.title}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hover:bg-foreground/10 -left-12" />
          <CarouselNext className="hover:bg-foreground/10 -right-12" />
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r" />
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 bg-gradient-to-l" />
        </Carousel>

        {/* 세련된 인디케이터 */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                'size-2 rounded-full transition-all duration-300',
                current === i
                  ? 'bg-foreground/80 w-6' // 활성화된 인디케이터
                  : 'bg-foreground/20 hover:bg-foreground/40' // 비활성화된 인디케이터
              )}
              aria-label={`슬라이드 ${i + 1}로 이동`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export { CustomerMessageSection }
