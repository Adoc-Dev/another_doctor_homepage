'use client'

import { useQuery } from '@tanstack/react-query'
import * as React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { useIsMobile } from '@/src/shared/hooks/mobile.hook'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  ToggleGroup,
  ToggleGroupItem,
} from '@/src/shared/ui'

interface AnalyticsDataPoint {
  date: string
  desktop: number
  mobile: number
}

interface AnalyticsResponse {
  data: AnalyticsDataPoint[]
  metadata: {
    range: string
    days: number
    source: string
    generated: string
  }
}

interface AnalyticsError {
  error: string
  details: string
  setup_guide?: string
  troubleshoot?: string[]
}

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  desktop: {
    label: 'Desktop',
    color: 'var(--primary)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--primary)',
  },
} satisfies ChartConfig

// Analytics 데이터를 가져오는 hook
function useAnalyticsData(timeRange: string) {
  return useQuery({
    queryKey: ['analytics', timeRange],
    queryFn: async (): Promise<AnalyticsResponse> => {
      const response = await fetch(`/admin/api/analytics?range=${timeRange}`)

      if (!response.ok) {
        const errorData: AnalyticsError = await response.json()
        throw new Error(JSON.stringify(errorData))
      }

      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5분간 캐시
    retry: 1, // 1번만 재시도
  })
}

export default function AdminDashboardPage() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState('90d')

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange('7d')
    }
  }, [isMobile])

  // 실제 Analytics 데이터 가져오기
  const {
    data: analyticsResult,
    isLoading,
    error,
  } = useAnalyticsData(timeRange)

  // 로딩 상태
  if (isLoading) {
    return (
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>방문자 통계</CardTitle>
          <CardDescription>
            Google Analytics 데이터를 불러오는 중...
          </CardDescription>
        </CardHeader>
        <CardContent className="flex h-[300px] items-center justify-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2" />
        </CardContent>
      </Card>
    )
  }

  // 에러 상태
  if (error) {
    let errorData: AnalyticsError
    try {
      errorData = JSON.parse(error.message)
    } catch {
      errorData = {
        error: '알 수 없는 오류',
        details: error.message,
      }
    }

    return (
      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="text-destructive">
            방문자 통계 - 오류 발생
          </CardTitle>
          <CardDescription>
            Analytics 데이터를 가져올 수 없습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-destructive/20 bg-destructive/5 rounded-lg border p-4">
            <h4 className="text-destructive mb-2 font-semibold">
              {errorData.error}
            </h4>
            <p className="text-muted-foreground mb-3 text-sm">
              {errorData.details}
            </p>

            {errorData.setup_guide && (
              <div className="mb-3">
                <p className="mb-1 text-sm font-medium">설정 가이드:</p>
                <p className="text-muted-foreground text-sm">
                  {errorData.setup_guide}
                </p>
              </div>
            )}

            {errorData.troubleshoot && (
              <div>
                <p className="mb-2 text-sm font-medium">문제 해결 방법:</p>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  {errorData.troubleshoot.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="text-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2"
            >
              다시 시도
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // 성공 상태
  const analyticsData = analyticsResult?.data
  const dataSource = analyticsResult?.metadata?.source || 'Unknown'

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>
          방문자 통계
          <span className="text-muted-foreground ml-2 text-sm font-normal">
            ({dataSource === 'Google Analytics 4' ? '실시간 GA4' : '데이터'})
          </span>
        </CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            {timeRange === '90d'
              ? '지난 3개월'
              : timeRange === '30d'
                ? '지난 30일'
                : '지난 7일'}
            간 실제 방문자 수
          </span>
          <span className="@[540px]/card:hidden">
            {timeRange === '90d'
              ? '3개월'
              : timeRange === '30d'
                ? '30일'
                : '7일'}{' '}
            (실시간)
          </span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={analyticsData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('ko-KR', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('ko-KR', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
