import { News } from '@/src/generated/prisma'
import { DataDescriptions, DataModalDescriptions } from '@/src/shared/ui'
import { formatDateTime } from '@/src/shared/util/string'

interface NewsShowProps {
  record?: News
}

function NewsShow(props: NewsShowProps) {
  const { record } = props

  if (!record) return null

  const descriptions: DataModalDescriptions<News>[] = [
    {
      bordered: true,
      items: [
        {
          accessorKey: 'id',
          header: 'ID',
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

export { NewsShow }
