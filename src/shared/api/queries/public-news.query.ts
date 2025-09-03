import { publicNewsService } from '@/src/shared/api/services/public-news.service'
import { QueryClient, useQuery } from '@tanstack/react-query'

export const PUBLIC_NEWS_QUERY_KEYS = {
  all: ['public-news'] as const,
  lists: () => [...PUBLIC_NEWS_QUERY_KEYS.all, 'list'] as const,
  list: (filters?: { limit?: number; offset?: number }) =>
    [...PUBLIC_NEWS_QUERY_KEYS.lists(), filters] as const,
  details: () => [...PUBLIC_NEWS_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string | number) =>
    [...PUBLIC_NEWS_QUERY_KEYS.details(), id] as const,
}

export function usePublicNewsListQuery(params?: {
  limit?: number
  offset?: number
}) {
  return useQuery({
    queryKey: PUBLIC_NEWS_QUERY_KEYS.list(params),
    queryFn: () => publicNewsService.getPublishedNews(params),
    staleTime: 5 * 60 * 1000, // 5분
  })
}

export function usePublicNewsDetailQuery(id?: string | number) {
  return useQuery({
    queryKey: PUBLIC_NEWS_QUERY_KEYS.detail(id!),
    queryFn: () => publicNewsService.getPublishedNewsById(id!),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10분
  })
}

export function prefetchPublicNewsList(
  queryClient: QueryClient,
  params?: { limit?: number }
) {
  return queryClient.prefetchQuery({
    queryKey: PUBLIC_NEWS_QUERY_KEYS.list(params),
    queryFn: () => publicNewsService.getPublishedNews(params),
  })
}
