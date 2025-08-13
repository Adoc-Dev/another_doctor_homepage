import { FileText, Globe } from 'lucide-react'

export interface NewsItem {
  title: string
  description: string
  dates: string
  location: string
  image?: string
  links?: readonly {
    icon: React.ReactNode
    title: string
    href: string
  }[]
}

export const NEWS_DATA: NewsItem[] = [
  {
    title:
      '[속깊은 人터뷰] 어나더닥터 "AI로 치아색 판별..인공치아 재제작률 90% 줄인다"',
    description:
      '정창희 대표는 "T-GRID가 상용화되면 국내뿐 아니라 전 세계 인종 별로 다양한 데이터를 축적할 수 있을 것"이라며 "우리가 개발한 플랫폼이 글로벌 헬스케어 플랫폼으로 성장해 K-메디의 저력을 전 세계에 알릴 수 있는 날까지 최선을 다할 생각"이라고 밝혔다.',
    dates: '2025-06-17',
    location: '메트로신문',
    image: '/images/news/metro.png',
    links: [
      {
        title: '기사 보기',
        icon: <Globe className="h-4 w-4" />,
        href: 'https://www.metroseoul.co.kr/article/20250617500181',
      },
    ],
  },
  {
    title: '어나더닥터, T-GRID 통해 디지털 덴티스트리 시장 개척',
    description:
      '어나더닥터는 국내 의료 솔루션 기업인 KDC(K-DOC)와 협력해 인도네시아의 발리 국제병원(Bali International Hospital)과 독점 계약을 맺었다. 디지털 덴티스트리 솔루션을 현지 병원과 치과 네트워크에 적용하고, 향후 동남아 시장과 중동 지역으로 확장할 계획이다.',
    dates: '2025-06-17',
    location: '강원일보',
    image: '/images/news/kwnews.png',
    links: [
      {
        title: '기사 보기',
        icon: <Globe className="h-4 w-4" />,
        href: 'https://kwnews.co.kr/page/view/2025061716451411706',
      },
    ],
  },
  {
    title: "치아 색상 측정 기술로 세계 시장 노크하는 '어나더닥터'",
    description:
      'T-GRID가 가진 정밀 컬러 측정 기술은 치과뿐 아니라 자동차, 인테리어, 미술, 뷰티 등 색이 쓰이는 모든 분야에 적용 가능하다. 빛이 바랜 자동차, 빈티지 가구 등의 색을 정밀하게 측정하거나 피부색을 정확히 판별해 개인 맞춤형 화장품을 제작하는 등 다양한 솔루션으로 확장할 수 있다.',
    dates: '2025-04-29',
    location: '아시아경제',
    image: '/images/news/asiae.png',
    links: [
      {
        title: '기사 보기',
        icon: <Globe className="h-4 w-4" />,
        href: 'https://cm.asiae.co.kr/article/2025042911111511603',
      },
      {
        title: '보도자료',
        icon: <FileText className="h-4 w-4" />,
        href: '/press/2025-04-29.pdf',
      },
    ],
  },
]
