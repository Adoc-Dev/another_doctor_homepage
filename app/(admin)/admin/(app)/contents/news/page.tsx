'use client'

import { DataTable } from '@/src/features/news/ui/data-table'
import newsService from '@/src/shared/api/services/news.service'
import { useQuery } from '@tanstack/react-query'

function NewsPage() {
  const { data } = useQuery({
    queryKey: ['news'],
    queryFn: () => newsService.getNews(),
  })
  console.log('🚀 ~ NewsPage ~ data:', data)

  return <DataTable data={data ?? []} />
}

export default NewsPage
