import { Administrator } from '@/src/generated/prisma'
import { DataDescriptions, DataModalDescriptions } from '@/src/shared/ui'
import { formatDateTime } from '@/src/shared/util/string'

interface AdministratorShowProps {
  record?: Administrator
}

function AdministratorShow(props: AdministratorShowProps) {
  const { record } = props

  if (!record) return null

  const descriptions: DataModalDescriptions<Administrator>[] = [
    {
      bordered: true,
      items: [
        {
          accessorKey: 'id',
          header: 'ID',
          span: 2,
        },
        {
          accessorKey: 'name',
          header: '이름',
          span: 2,
        },
        {
          accessorKey: 'email',
          header: '이메일',
          span: 2,
        },
        {
          accessorKey: 'createdAt',
          header: '생성일',
          render: (value: string) => formatDateTime(value),
          span: 2,
        },
        {
          accessorKey: 'updatedAt',
          header: '수정일',
          render: (value: string) => formatDateTime(value),
          span: 2,
        },
      ],
    },
  ]

  return <DataDescriptions descriptions={descriptions} record={record} />
}

export { AdministratorShow }
