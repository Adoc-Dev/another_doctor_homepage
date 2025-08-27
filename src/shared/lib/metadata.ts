import { Metadata } from 'next'

interface MetadataConfig {
  title: {
    ko: string
    en: string
  }
  description: {
    ko: string
    en: string
  }
  keywords: {
    ko: string[]
    en: string[]
  }
  url: string
}

export function generateLocalizedMetadata(
  config: MetadataConfig,
  locale: string = 'ko'
): Metadata {
  const isKorean = locale === 'ko'

  return {
    title: isKorean ? config.title.ko : config.title.en,
    description: isKorean ? config.description.ko : config.description.en,
    keywords: isKorean ? config.keywords.ko : config.keywords.en,
    openGraph: {
      title: `${isKorean ? config.title.ko : config.title.en} | Another Doctor`,
      description: isKorean ? config.description.ko : config.description.en,
      url: config.url,
      locale: isKorean ? 'ko_KR' : 'en_US',
      images: [
        {
          url: `/og-${config.url.split('/').pop()}.png`,
          width: 1200,
          height: 630,
          alt: `Another Doctor ${isKorean ? config.title.ko : config.title.en}`,
        },
      ],
    },
    twitter: {
      title: `${isKorean ? config.title.ko : config.title.en} | Another Doctor`,
      description: isKorean ? config.description.ko : config.description.en,
    },
    alternates: {
      canonical: config.url,
      languages: {
        ko: `/ko${config.url}`,
        en: `/en${config.url}`,
      },
    },
  }
}

// 페이지별 메타데이터 설정
export const metadataConfigs = {
  about: {
    title: {
      ko: '회사소개',
      en: 'About Us',
    },
    description: {
      ko: 'Another Doctor는 AI 기반 치아 색상 측정 기술로 정확한 진단과 완벽한 미소를 제공합니다.',
      en: 'Another Doctor provides accurate diagnosis and perfect smiles with AI-based dental color measurement technology.',
    },
    keywords: {
      ko: ['회사소개', 'Another Doctor', 'AI 치과', '색상 측정', '의료기술'],
      en: [
        'About Us',
        'Another Doctor',
        'AI Dental',
        'Color Measurement',
        'Medical Technology',
      ],
    },
    url: '/company/about',
  },
  newsroom: {
    title: {
      ko: '뉴스룸',
      en: 'Newsroom',
    },
    description: {
      ko: 'Another Doctor의 최신 소식과 AI 치아 색상 측정 기술 관련 뉴스를 확인하세요.',
      en: 'Check out the latest news from Another Doctor and AI dental color measurement technology.',
    },
    keywords: {
      ko: ['뉴스룸', '소식', 'Another Doctor', 'AI 치과 뉴스'],
      en: ['Newsroom', 'News', 'Another Doctor', 'AI Dental News'],
    },
    url: '/newsroom',
  },
  message: {
    title: {
      ko: 'CEO 메시지',
      en: 'CEO Message',
    },
    description: {
      ko: 'Another Doctor CEO의 비전과 메시지를 확인하세요.',
      en: 'Check out the vision and message from Another Doctor CEO.',
    },
    keywords: {
      ko: ['CEO 메시지', '비전', 'Another Doctor', 'CEO'],
      en: ['CEO Message', 'Vision', 'Another Doctor', 'CEO'],
    },
    url: '/company/message',
  },
  support: {
    title: {
      ko: '고객 지원',
      en: 'Customer Support',
    },
    description: {
      ko: 'Another Doctor 제품에 대한 기술 지원과 고객 서비스를 제공합니다.',
      en: 'We provide technical support and customer service for Another Doctor products.',
    },
    keywords: {
      ko: ['고객 지원', '기술 지원', 'Another Doctor'],
      en: ['Customer Support', 'Technical Support', 'Another Doctor'],
    },
    url: '/support',
  },
}
