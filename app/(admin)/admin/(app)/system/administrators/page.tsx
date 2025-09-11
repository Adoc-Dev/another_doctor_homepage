'use client'

import AdministratorModal from '@/src/features/admin/administrators/ui/administrator-modal'
import { Administrator } from '@/src/generated/prisma'
import administratorsService, {
  ADMINISTRATORS_QUERY_KEYS,
} from '@/src/shared/api/services/admin-administrators.service'
import { usePageFilters } from '@/src/shared/hooks/page.hook'
import { Button } from '@/src/shared/ui'
import { DataTable } from '@/src/shared/ui/admin/data-table'
import { formatDateTime } from '@/src/shared/util/string'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { PlusCircle } from 'lucide-react'

function AdministratorsPage() {
  const pageFilters = usePageFilters()

  const { data, isLoading } = useQuery({
    queryKey: [ADMINISTRATORS_QUERY_KEYS],
    queryFn: () => administratorsService.getAdministrators(),
  })

  const columns: ColumnDef<Administrator>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: '이름',
      enableSorting: true,
    },
    {
      accessorKey: 'email',
      header: '이메일',
    },
    {
      accessorKey: 'active',
      header: '활성화',
    },
    {
      accessorKey: 'createdAt',
      header: '생성일',
      cell: ({ row }) => formatDateTime(row.original.createdAt),
    },
    {
      accessorKey: 'updatedAt',
      header: '수정일',
      cell: ({ row }) => formatDateTime(row.original.updatedAt),
    },
  ]

  const handleRowClick = (record: Administrator) => {
    pageFilters.navigate({ modalAction: 'show', id: record.id })
  }

  const handleCreate = () => {
    pageFilters.navigate({ modalAction: 'create' })
  }

  return (
    <>
      <div className="p-4">
        <DataTable
          data={data?.data ?? []}
          onRow={handleRowClick}
          columns={columns}
          loading={isLoading}
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
        <AdministratorModal
          open={!!pageFilters.filters.modalAction}
          id={pageFilters.filters.id}
          type={pageFilters.filters.modalAction}
          record={data?.data?.find(
            (user) => user.id === pageFilters.filters.id?.toString()
          )}
          onChangeType={(type) => pageFilters.navigate({ modalAction: type })}
          onClose={() =>
            pageFilters.navigate({
              id: undefined,
              modalAction: undefined,
            })
          }
        />
      </div>
    </>
  )
}

export default AdministratorsPage
