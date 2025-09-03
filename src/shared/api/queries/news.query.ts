import { News } from '@/src/generated/prisma'
import adminNewsService, {
  NEWS_QUERY_KEYS,
} from '@/src/shared/api/services/admin-news.service'
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

// 뉴스 목록 프리패치
export function prefetchAdminNewsList(queryClient: QueryClient) {
  return queryClient.prefetchQuery({
    queryKey: [NEWS_QUERY_KEYS, 'list'],
    queryFn: () => adminNewsService.getNews(),
  })
}

// 뉴스 목록 쿼리
export function useAdminNewsListQuery(filters?: { published?: boolean }) {
  return useQuery({
    queryKey: [NEWS_QUERY_KEYS, 'list', filters],
    queryFn: () => adminNewsService.getNews(filters),
  })
}

// 단일 뉴스 쿼리
export function useAdminNewsDetailQuery(id?: string | number) {
  return useQuery({
    queryKey: [NEWS_QUERY_KEYS, 'detail', id],
    queryFn: () => (id ? adminNewsService.getNewsById(String(id)) : null),
    enabled: !!id,
  })
}

// 뉴스 생성 뮤테이션
export function useCreateAdminNewsMutation(options?: {
  onSuccess?: (data: { id: number }) => void
}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (news: Omit<News, 'id' | 'createdAt' | 'updatedAt'>) =>
      adminNewsService.createNews(news),
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
export function useUpdateAdminNewsMutation(options?: {
  onSuccess?: (id: string) => void
}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, news }: { id: string; news: Partial<News> }) =>
      adminNewsService.updateNews(id, news),
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
export function useDeleteAdminNewsMutation(options?: {
  onSuccess?: () => void
}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => adminNewsService.deleteNews(id),
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

// 발행 상태 토글 뮤테이션
export function useToggleNewsPublishMutation(options?: {
  onSuccess?: () => void
}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, currentState }: { id: string; currentState: boolean }) =>
      adminNewsService.toggleNewsPublishState(id, currentState),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NEWS_QUERY_KEYS] })
      if (options?.onSuccess) {
        options.onSuccess()
      }
    },
  })
}
