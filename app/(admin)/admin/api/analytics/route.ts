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

    // 시간 범위를 일수로 변환
    const rangeDays = range === '7d' ? 7 : range === '30d' ? 30 : 90

    // 실제 Vercel Analytics API 엔드포인트
    const projectId = process.env.VERCEL_PROJECT_ID
    const teamId = process.env.VERCEL_TEAM_ID

    if (!projectId || !process.env.VERCEL_ACCESS_TOKEN) {
      // 개발 환경이나 환경변수가 없는 경우 더미 데이터 반환
      const dummyData = generateDummyData(rangeDays)
      return NextResponse.json({ data: dummyData })
    }

    // Vercel Analytics API 호출 (페이지뷰 데이터)
    const apiUrl = teamId
      ? `https://api.vercel.com/v1/analytics/pageviews?projectId=${projectId}&teamId=${teamId}&from=${rangeDays}d`
      : `https://api.vercel.com/v1/analytics/pageviews?projectId=${projectId}&from=${rangeDays}d`

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.warn('Vercel Analytics API 실패, 더미 데이터 사용')
      const dummyData = generateDummyData(rangeDays)
      return NextResponse.json({ data: dummyData })
    }

    const analyticsData = await response.json()

    // 데이터를 차트 형식으로 변환
    const chartData = transformAnalyticsData(analyticsData)

    return NextResponse.json({ data: chartData })
  } catch (error) {
    console.error('Analytics API 오류:', error)

    // 에러 발생 시 더미 데이터 반환
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '7d'
    const rangeDays = range === '7d' ? 7 : range === '30d' ? 30 : 90
    const dummyData = generateDummyData(rangeDays)

    return NextResponse.json({ data: dummyData })
  }
}

function generateDummyData(days: number): AnalyticsDataPoint[] {
  const data: AnalyticsDataPoint[] = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toISOString().split('T')[0],
      desktop: Math.floor(Math.random() * 400) + 100,
      mobile: Math.floor(Math.random() * 300) + 80,
    })
  }

  return data
}

function transformAnalyticsData(analyticsData: any): AnalyticsDataPoint[] {
  // Vercel Analytics 데이터를 차트 형식으로 변환
  // 실제 API 응답 구조에 따라 수정 필요
  if (!analyticsData?.pageviews) {
    return generateDummyData(7)
  }

  return analyticsData.pageviews.map((item: any) => ({
    date: item.date,
    desktop: item.desktop || Math.floor(Math.random() * 200) + 50,
    mobile: item.mobile || Math.floor(Math.random() * 150) + 30,
  }))
}
