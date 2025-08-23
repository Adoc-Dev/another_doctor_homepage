'use client'

import NewsModal from '@/src/features/admin/news/ui/news-modal'
import { News } from '@/src/generated/prisma'
import newsService, {
  NEWS_QUERY_KEYS,
} from '@/src/shared/api/services/news.service'
import { usePageFilters } from '@/src/shared/hooks/page.hook'
import { cn } from '@/src/shared/lib/utils'
import { Button, DataTable } from '@/src/shared/ui'
import { formatDateTime } from '@/src/shared/util/string'
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
      accessorKey: 'thumbnail',
      header: '썸네일',
      cell: ({ row }) => {
        const value = row.original.thumbnail
        return (
          <img
            src={value ?? ''}
            alt="thumbnail"
            width={100}
            height={100}
            className="rounded-md"
          />
        )
      },
    },
    {
      accessorKey: 'title',
      header: '제목',
    },
    {
      accessorKey: 'link',
      header: '링크',
      cell: ({ row }) => {
        const value = row.original.link
        return (
          <a
            href={value ?? ''}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            원본 뉴스 링크
          </a>
        )
      },
    },
    {
      accessorKey: 'date',
      header: '게시 날짜',
      cell: ({ row }) => {
        const value = row.original.date
        return (
          <div className="text-gray-500">{formatDateTime(value ?? '')}</div>
        )
      },
    },
    {
      accessorKey: 'published',
      header: '공개 여부',

      cell: ({ row }) => {
        const value = row.original.published
        return (
          <div className={cn(value ? 'text-green-500' : 'text-red-500')}>
            {value ? '공개' : '비공개'}
          </div>
        )
      },
    },
    {
      accessorKey: 'createdAt',
      header: '생성일',
      cell: ({ row }) => {
        const value = row.original.createdAt
        return <div className="text-gray-500">{formatDateTime(value)}</div>
      },
    },
    {
      accessorKey: 'updatedAt',
      header: '수정일',
      cell: ({ row }) => {
        const value = row.original.updatedAt
        return <div className="text-gray-500">{formatDateTime(value)}</div>
      },
    },
  ]

  const handleRowClick = (record: News) => {
    pageFilters.navigate({ modalAction: 'show', id: record.id })
  }

  const handleCreate = () => {
    pageFilters.navigate({ to: '/admin/contents/news/create' })
  }

  return (
    <>
      <div className="p-4">
        <DataTable
          data={data?.data ?? []}
          onRow={handleRowClick}
          loading={isLoading}
          columns={columns}
          total={data?.total ?? 0}
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
        <NewsModal
          open={!!pageFilters.filters.modalAction}
          id={pageFilters.filters.id}
          type={pageFilters.filters.modalAction}
          record={data?.data?.find(
            (news) => news.id === Number(pageFilters.filters.id)
          )}
          onChangeType={(type) => pageFilters.navigate({ modalAction: type })}
          onClose={() => pageFilters.navigate({ modalAction: undefined })}
        />
      </div>
    </>
  )
}

export default NewsPage
