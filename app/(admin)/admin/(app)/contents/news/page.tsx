'use client'

import { News } from '@/src/generated/prisma'
import newsService, {
  NEWS_QUERY_KEYS,
} from '@/src/shared/api/services/news.service'
import { usePageFilters } from '@/src/shared/hooks/page.hook'
import { Button, DataTable } from '@/src/shared/ui'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { PlusCircle } from 'lucide-react'

function NewsPage() {
  const pageFilters = usePageFilters()

  const { data, isLoading } = useQuery({
    queryKey: [NEWS_QUERY_KEYS],
    queryFn: () => newsService.getNews(),
  })

  const columns: ColumnDef<News>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'title',
      header: '제목',
    },
  ]

  const handleRowClick = (record: News) => {
    pageFilters.navigate({ to: `/admin/contents/news/create?id=${record.id}` })
  }

  const handleCreate = () => {
    pageFilters.navigate({ to: '/admin/contents/news/create' })
  }

  return (
    <>
      <div className="p-4">
        <DataTable
          data={data ?? []}
          onRow={handleRowClick}
          columns={columns}
          total={data?.news?.length}
          toolbar={{
            topRightItems: [
              <Button
                key="add"
                size="sm"
                onClick={handleCreate}
                variant="outline"
                className="border-gray-200 hover:bg-gray-100 hover:text-gray-900"
              >
                <PlusCircle />
                <span className="hidden sm:inline">추가</span>
              </Button>,
            ],
            filter: {
              query: {
                search: '',
              },
              searchKey: 'search',
              items: [],
            },
          }}
        />
      </div>
    </>
  )
}

export default NewsPage
