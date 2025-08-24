import { News } from '@/src/generated/prisma'
import newsService, {
  NEWS_QUERY_KEYS,
} from '@/src/shared/api/services/news.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// 뉴스 목록 쿼리
export function useNewsListQuery(filters?: { published?: boolean }) {
  return useQuery({
    queryKey: [NEWS_QUERY_KEYS, 'list', filters],
    queryFn: () => newsService.getNews(filters),
  })
}

// 단일 뉴스 쿼리
export function useNewsDetailQuery(id?: string | number) {
  return useQuery({
    queryKey: [NEWS_QUERY_KEYS, 'detail', id],
    queryFn: () => (id ? newsService.getNewsById(String(id)) : null),
    enabled: !!id,
  })
}

// 뉴스 생성 뮤테이션
export function useCreateNewsMutation(options?: {
  onSuccess?: (data: { id: number }) => void
}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (news: Omit<News, 'id' | 'createdAt' | 'updatedAt'>) =>
      newsService.createNews(news),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [NEWS_QUERY_KEYS, 'list'] })
      queryClient.invalidateQueries({ queryKey: [NEWS_QUERY_KEYS] })

      if (options?.onSuccess) {
        options.onSuccess(data)
      }
    },
  })
}

// 뉴스 업데이트 뮤테이션
export function useUpdateNewsMutation(options?: {
  onSuccess?: (id: string) => void
}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, news }: { id: string; news: Partial<News> }) =>
      newsService.updateNews(id, news),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [NEWS_QUERY_KEYS, 'list'] })
      queryClient.invalidateQueries({ queryKey: [NEWS_QUERY_KEYS] })
      queryClient.invalidateQueries({
        queryKey: [NEWS_QUERY_KEYS, 'detail', id],
      })

      if (options?.onSuccess) {
        options.onSuccess(id)
      }
    },
  })
}

// 뉴스 삭제 뮤테이션
export function useDeleteNewsMutation(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => newsService.deleteNews(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [NEWS_QUERY_KEYS] })
      queryClient.invalidateQueries({ queryKey: [NEWS_QUERY_KEYS, 'list'] })
      queryClient.invalidateQueries({
        queryKey: [NEWS_QUERY_KEYS, 'detail', id],
      })

      if (options?.onSuccess) {
        options.onSuccess()
      }
    },
  })
}
