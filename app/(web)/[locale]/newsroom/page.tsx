import { NewsList } from '@/src/features/news/ui/news-list'
import { prefetchNewsList } from '@/src/shared/api/queries/news.query'
import { getQueryClient } from '@/src/shared/util/get-query-client'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

async function NewsroomPage() {
  const queryClient = getQueryClient()

  await prefetchNewsList(queryClient)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewsList />
    </HydrationBoundary>
  )
}

export default NewsroomPage
