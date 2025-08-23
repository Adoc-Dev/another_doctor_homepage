import { News } from '@/src/generated/prisma'
import { DataDescriptions, DataModalDescriptions } from '@/src/shared/ui'
import { formatDateTime } from '@/src/shared/util/string'
import DOMPurify from 'isomorphic-dompurify'

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
          accessorKey: 'title',
          header: '제목',
          span: 2,
        },
        {
          accessorKey: 'thumbnail',
          header: '썸네일',
          render: (value: string) => (
            <img src={value} alt="thumbnail" width={100} height={100} />
          ),
          span: 2,
        },
        {
          accessorKey: 'published',
          header: '공개 여부',
          render: (value: boolean) => (value ? '공개' : '비공개'),
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
        {
          accessorKey: 'link',
          header: '링크',
          render: (value: string) => (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              {value}
            </a>
          ),
          span: 2,
        },
        {
          accessorKey: 'date',
          header: '게시 날짜',
          render: (value: string) => formatDateTime(value || ''),
          span: 2,
        },
        {
          accessorKey: 'contents',
          header: '내용',
          render: (value: string) => (
            <div
              className="prose prose-sm w-full max-w-full overflow-x-auto break-words whitespace-pre-wrap [&_*]:max-w-full [&_*]:break-words [&_img]:max-w-full [&_table]:w-full"
              style={{ minWidth: 0 }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }}
            />
          ),
          span: 'filled',
        },
      ],
    },
  ]

  return <DataDescriptions descriptions={descriptions} record={record} />
}

export { NewsShow }
