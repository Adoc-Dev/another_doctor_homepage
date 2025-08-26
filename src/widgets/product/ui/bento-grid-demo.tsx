import { BentoGrid, BentoGridItem } from '@/src/shared/ui/bento-grid'

export function BentoGridDemo() {
  return (
    <BentoGrid className="mx-auto max-w-4xl">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          // icon={item.icon}
          className={i === 1 || i === 2 ? 'md:col-span-2' : ''}
        />
      ))}
    </BentoGrid>
  )
}
const Skeleton = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800"></div>
)
const items = [
  {
    title: 'Calibration, 진짜 색의 기준',
    description:
      'TGRID는 Ground Truth 기반 보정으로, 색차를 최소화하여 최적의 색상을 제공합니다.  ',
    header: <Skeleton />,
    // icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: '알고리즘으로 완성한 정밀도',
    description:
      'OpenCV와 딥러닝 라이브러리로 학습된 티그리드 알고리즘은 감각이 아닌 수치로 색을 정의합니다.',
    header: <Skeleton />,
    // icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: '특허로 증명된 티그리드',
    description:
      '국내외 특허와 논문으로 검증된 기술. 티그리드는 메디컬 컬러 표준을 위한 최적의 솔루션입니다.',
    header: <Skeleton />,
    // icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: '컬러를 플로팅하다',
    description:
      '새로운 Inventory 체계를 제시하고, 컬러맵(Plotting)으로 색을 시각화합니다.',
    header: <Skeleton />,
    // icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
]
