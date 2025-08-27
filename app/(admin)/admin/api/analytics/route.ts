import { NextRequest, NextResponse } from 'next/server'

interface AnalyticsDataPoint {
  date: string
  desktop: number
  mobile: number
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '7d'
    const rangeDays = range === '7d' ? 7 : range === '30d' ? 30 : 90

    console.log(`Analytics 데이터 요청: ${rangeDays}일 범위`)

    // Google Analytics 4 API 환경 변수 확인
    if (
      !process.env.GOOGLE_ANALYTICS_PROPERTY_ID ||
      !process.env.GOOGLE_ANALYTICS_PRIVATE_KEY ||
      !process.env.GOOGLE_ANALYTICS_CLIENT_EMAIL ||
      !process.env.GOOGLE_ANALYTICS_PROJECT_ID
    ) {
      return NextResponse.json(
        {
          error: 'Google Analytics API 설정이 필요합니다',
          details:
            '환경 변수 GOOGLE_ANALYTICS_PROPERTY_ID, GOOGLE_ANALYTICS_PRIVATE_KEY, GOOGLE_ANALYTICS_CLIENT_EMAIL, GOOGLE_ANALYTICS_PROJECT_ID가 설정되지 않았습니다.',
          setup_guide:
            'Google Cloud Console에서 서비스 계정을 생성하고 Analytics Data API를 활성화하세요.',
        },
        { status: 400 }
      )
    }

    // Google Analytics 4 API 호출
    try {
      const analyticsData = await getGoogleAnalyticsData(rangeDays)
      return NextResponse.json({
        data: analyticsData,
        metadata: {
          range,
          days: rangeDays,
          source: 'Google Analytics 4',
          generated: new Date().toISOString(),
        },
      })
    } catch (error) {
      console.error('Google Analytics API 오류:', error)
      return NextResponse.json(
        {
          error: 'Google Analytics API 호출 실패',
          details: error instanceof Error ? error.message : '알 수 없는 오류',
          troubleshoot: [
            'Google Analytics Data API가 활성화되어 있는지 확인하세요',
            '서비스 계정이 Analytics 속성에 대한 권한을 가지고 있는지 확인하세요',
            'Property ID가 올바른지 확인하세요',
            '서비스 계정 키의 형식이 올바른지 확인하세요',
          ],
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Analytics API 전체 오류:', error)
    return NextResponse.json(
      {
        error: '서버 오류',
        details: error instanceof Error ? error.message : '알 수 없는 오류',
      },
      { status: 500 }
    )
  }
}

// Google Analytics 4 API 함수
async function getGoogleAnalyticsData(
  days: number
): Promise<AnalyticsDataPoint[]> {
  const { BetaAnalyticsDataClient } = await import('@google-analytics/data')

  const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
      type: 'service_account',
      private_key: process.env.GOOGLE_ANALYTICS_PRIVATE_KEY?.replace(
        /\\n/g,
        '\n'
      ),
      client_email: process.env.GOOGLE_ANALYTICS_CLIENT_EMAIL,
      project_id: process.env.GOOGLE_ANALYTICS_PROJECT_ID,
    },
  })

  const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID

  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: `${days}daysAgo`,
        endDate: 'today',
      },
    ],
    dimensions: [{ name: 'date' }, { name: 'deviceCategory' }],
    metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }],
  })

  // 데이터 변환
  const dataMap = new Map<string, { desktop: number; mobile: number }>()

  response.rows?.forEach((row) => {
    const date = row.dimensionValues?.[0]?.value || ''
    const deviceCategory = row.dimensionValues?.[1]?.value || 'desktop'
    const users = parseInt(row.metricValues?.[0]?.value || '0')

    if (!dataMap.has(date)) {
      dataMap.set(date, { desktop: 0, mobile: 0 })
    }

    const entry = dataMap.get(date)!
    if (deviceCategory === 'mobile') {
      entry.mobile += users
    } else {
      entry.desktop += users
    }
  })

  // 날짜별로 정렬된 배열로 변환
  const result: AnalyticsDataPoint[] = []
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]

    const data = dataMap.get(dateStr.replace(/-/g, '')) || {
      desktop: 0,
      mobile: 0,
    }
    result.push({
      date: dateStr,
      desktop: data.desktop,
      mobile: data.mobile,
    })
  }

  return result
}
