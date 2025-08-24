import { News } from '@/src/generated/prisma'
import {
  useCreateNewsMutation,
  useUpdateNewsMutation,
} from '@/src/shared/api/queries/news.query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { NewsSchema, newsSchema } from '../model/news-form.schema'

interface UseNewsFormProps {
  record?: News | null
  onLoading: (loading: boolean) => void
  onFinish: (id: number) => void
}

function useNewsForm(props: UseNewsFormProps) {
  const { record, onLoading, onFinish } = props
  const updateNews = useUpdateNewsMutation({
    onSuccess: (id) => onFinish(Number(id)),
  })
  const createNews = useCreateNewsMutation({
    onSuccess: (data) => onFinish(data.id),
  })

  const form = useForm<NewsSchema>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: '',
      contents: '',
      thumbnail: '',
      link: undefined,
      date: new Date(),
      published: true,
    },
  })

  useEffect(() => {
    if (record) {
      form.reset({
        title: record.title,
        contents: record.contents,
        thumbnail: record.thumbnail ?? '',
        link: record.link ?? '',
        date: record.date ? new Date(record.date) : new Date(),
        published: record.published,
      })
    }
  }, [record, form])

  const handleSubmit = async (data: NewsSchema) => {
    onLoading(true)
    try {
      const type = record?.id ? 'update' : 'create'
      if (type === 'update') {
        if (!record?.id) return

        updateNews.mutate({
          id: record.id.toString(),
          news: {
            title: data.title,
            contents: data.contents,
            thumbnail: data.thumbnail,
            link: data.link,
            date: data.date,
            published: data.published,
          },
        })
      } else {
        createNews.mutate({
          title: data.title,
          contents: data.contents,
          thumbnail: data.thumbnail,
          link: data.link ?? null,
          date: data.date,
          published: data.published,
        })
      }
    } catch (error) {
      console.error('저장 중 오류 발생:', error)
    } finally {
      onLoading(false)
    }
  }

  return { form, handleSubmit }
}

export { useNewsForm }
