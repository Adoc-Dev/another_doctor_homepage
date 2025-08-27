import { prefetchNewsList } from '@/src/shared/api/queries/news.query'
import { getQueryClient } from '@/src/shared/util/get-query-client'
import { NewsSection } from '@/src/widgets/news/ui'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

async function NewsroomPage() {
  const queryClient = getQueryClient()
  await prefetchNewsList(queryClient)

  return (
    <main className="bg-background mt-16 flex flex-col items-center justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NewsSection />
      </HydrationBoundary>
    </main>
  )
}

export default NewsroomPage
