interface StructuredDataProps {
  data: object
}

function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}

// 조직 정보 구조화된 데이터
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Another Doctor',
  description: 'AI 기반 치아 색상 측정 솔루션 제공업체',
  url: 'https://anotherdoctor.co.kr',
  logo: 'https://anotherdoctor.co.kr/logo.svg',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+82-2-1234-5678',
    contactType: '고객 서비스',
    availableLanguage: ['Korean', 'English'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '서울시 강남구',
    addressLocality: '서울',
    addressCountry: 'KR',
  },
  sameAs: [
    'https://www.linkedin.com/company/anotherdoctor',
    'https://twitter.com/anotherdoctor',
  ],
}

// 웹사이트 정보 구조화된 데이터
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Another Doctor',
  url: 'https://anotherdoctor.co.kr',
  description: 'AI 기반 치아 색상 측정 솔루션',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://anotherdoctor.co.kr/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

// 제품 정보 구조화된 데이터
export const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Another Doctor AI 색상 측정 시스템',
  description: 'AI 기반 치아 색상 측정 의료기기',
  brand: {
    '@type': 'Brand',
    name: 'Another Doctor',
  },
  category: '의료기기',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'KRW',
  },
}

export { StructuredData }
