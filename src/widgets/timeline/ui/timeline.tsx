import { AnimatedShinyText, BlurFade } from '@/src/shared/ui'
import { Timeline } from '@/src/shared/ui/timeline'
import {
  AlertTriangle,
  Brain,
  Sparkles,
  Target,
  TrendingUp,
  Workflow,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

export function TimelineDemo() {
  const t = useTranslations('timeline')

  const data = [
    {
      title: t('data.problem.title'),
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 dark:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
              <AlertTriangle className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 md:text-xl dark:text-neutral-100">
              치과와 기공소의 오래된 고민
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full" />
              <p className="text-sm text-neutral-700 md:text-base dark:text-neutral-300">
                환자의 치아 색을 정확히 맞추는 것은 오랜 숙제였습니다
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full" />
              <p className="text-sm text-neutral-700 md:text-base dark:text-neutral-300">
                고가 장비를 사용해도 높은 재제작률과 비효율성 문제가
                지속되었습니다
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full" />
              <p className="text-sm text-neutral-700 md:text-base dark:text-neutral-300">
                기공소는 주관적 판단에 의존할 수밖에 없는 한계가 있었습니다
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: t('data.technology.title'),
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 dark:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
              <Brain className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 md:text-xl dark:text-neutral-100">
              AI 기반 초정밀 색 측정
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full" />
              <p className="text-sm text-neutral-700 md:text-base dark:text-neutral-300">
                <strong className="text-primary">감각이 아닌 수치로</strong>{' '}
                색을 정의하는 혁신적 접근
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full" />
              <p className="text-sm text-neutral-700 md:text-base dark:text-neutral-300">
                <strong className="text-primary">
                  Calibration과 Ground Truth
                </strong>{' '}
                기반 정밀 보정 시스템
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full" />
              <p className="text-sm text-neutral-700 md:text-base dark:text-neutral-300">
                <strong className="text-primary">OpenCV와 딥러닝</strong>으로
                누구나 동일한 색상 재현 가능
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full" />
              <p className="text-sm text-neutral-700 md:text-base dark:text-neutral-300">
                <strong className="text-primary">국내외 특허</strong>로 검증된
                기술적 신뢰성
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: t('data.workflow.title'),
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 dark:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
              <Workflow className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 md:text-xl dark:text-neutral-100">
              디지털 치과 프로세스에 최적화
            </h3>
          </div>
          <div className="space-y-2">
            {[
              '구강 스캐닝',
              'CAD 설계',
              '제작',
              '착색 및 쉐이드 조정 (T-GRID 적용)',
              '최종 시적',
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="bg-primary flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white">
                  {index + 1}
                </div>
                <p
                  className={`text-sm md:text-base ${index === 3 ? 'text-primary font-semibold' : 'text-neutral-700 dark:text-neutral-300'}`}
                >
                  {step}
                </p>
              </div>
            ))}
          </div>
          <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-3">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              T-GRID는 착색 단계에서 정확한 색 분석을 제공해 환자 만족도와 제작
              효율을 동시에 향상시킵니다.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: t('data.impact.title'),
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 dark:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
              <TrendingUp className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 md:text-xl dark:text-neutral-100">
              환자 만족도와 제작 효율 향상
            </h3>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="border-primary/20 bg-primary/5 dark:border-primary/30 dark:bg-primary/10 rounded-lg border p-4">
              <h4 className="text-primary mb-2 font-semibold">재제작률 감소</h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                정량화된 색 데이터로 정확도 대폭 향상
              </p>
            </div>
            <div className="border-primary/20 bg-primary/5 dark:border-primary/30 dark:bg-primary/10 rounded-lg border p-4">
              <h4 className="text-primary mb-2 font-semibold">
                고객 만족도 증대
              </h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                정확한 색상 매칭으로 컴플레인 최소화
              </p>
            </div>
            <div className="border-primary/20 bg-primary/5 dark:border-primary/30 dark:bg-primary/10 rounded-lg border p-4">
              <h4 className="text-primary mb-2 font-semibold">
                워크플로우 최적화
              </h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                치과와 기공소 간 효율적 커뮤니케이션
              </p>
            </div>
            <div className="border-primary/20 bg-primary/5 dark:border-primary/30 dark:bg-primary/10 rounded-lg border p-4">
              <h4 className="text-primary mb-2 font-semibold">비용 절감</h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                재작업 감소로 시간과 비용 효율성 확보
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: t('data.vision.title'),
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 dark:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
              <Target className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 md:text-xl dark:text-neutral-100">
              정확한 색, 글로벌 표준
            </h3>
          </div>
          <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-primary mt-1 h-3 w-3 flex-shrink-0 rounded-full" />
                <p className="text-sm text-neutral-700 md:text-base dark:text-neutral-300">
                  해외 병원과의 협력을 통한{' '}
                  <strong className="text-primary">글로벌 시장 확장</strong>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary mt-1 h-3 w-3 flex-shrink-0 rounded-full" />
                <p className="text-sm text-neutral-700 md:text-base dark:text-neutral-300">
                  정확한 색상은{' '}
                  <strong className="text-primary">
                    국경을 넘나드는 새로운 언어
                  </strong>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary mt-1 h-3 w-3 flex-shrink-0 rounded-full" />
                <p className="text-sm text-neutral-700 md:text-base dark:text-neutral-300">
                  전 세계가 공유하는{' '}
                  <strong className="text-primary">메디컬 컬러 표준</strong>{' '}
                  구축
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: t('data.beyondDentistry.title'),
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 dark:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full">
              <Sparkles className="text-primary h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 md:text-xl dark:text-neutral-100">
              치과를 넘어선 무한한 가능성
            </h3>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="border-primary/20 bg-primary/5 dark:border-primary/30 dark:bg-primary/10 rounded-lg border p-4">
              <div className="mb-3 text-2xl">🍈</div>
              <h4 className="text-primary mb-2 font-semibold">스마트 농업</h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                과일 숙성도를 정밀하게 측정하여 최적의 수확시기 결정
              </p>
            </div>
            <div className="border-primary/20 bg-primary/5 dark:border-primary/30 dark:bg-primary/10 rounded-lg border p-4">
              <div className="mb-3 text-2xl">📚</div>
              <h4 className="text-primary mb-2 font-semibold">교육 플랫폼</h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                실습 과정에서 실시간 색상 분석 피드백 제공
              </p>
            </div>
            <div className="border-primary/20 bg-primary/5 dark:border-primary/30 dark:bg-primary/10 rounded-lg border p-4">
              <div className="mb-3 text-2xl">🥽</div>
              <h4 className="text-primary mb-2 font-semibold">XR 기술</h4>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                가상현실에서 실시간 색상 인식 및 분석 구현
              </p>
            </div>
          </div>
          <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4">
            <p className="text-center text-sm font-medium text-neutral-600 dark:text-neutral-400">
              정밀한 색상 기술로 다양한 산업의 혁신을 이끌어갑니다
            </p>
          </div>
        </div>
      ),
    },
  ]

  return (
    <section
      id="product-section"
      className="relative flex w-full flex-col items-center justify-center py-16 sm:py-20 md:py-24 lg:py-32"
    >
      <div className="container flex max-w-5xl flex-col items-center justify-center px-4 md:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <BlurFade delay={0.2} inView>
            <AnimatedShinyText>Innovation Story</AnimatedShinyText>
          </BlurFade>
          <BlurFade delay={0.4} inView>
            <h2 className="pointer-events-none mt-3 text-center text-3xl leading-tight font-bold tracking-tighter whitespace-pre-wrap text-gray-900 sm:mt-4 sm:text-4xl md:text-5xl dark:text-gray-100">
              {t('title')}
            </h2>
          </BlurFade>
          <BlurFade delay={0.6} inView>
            <p className="mt-4 max-w-3xl text-sm font-medium text-balance whitespace-pre-wrap text-gray-900 sm:mt-5 sm:text-base md:mt-6 md:text-lg lg:text-xl dark:text-gray-100">
              {t('subTitle')}
            </p>
          </BlurFade>
        </div>
        <Timeline data={data} />
      </div>
    </section>
  )
}
