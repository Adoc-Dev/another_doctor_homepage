'use client'

import { News } from '@/src/generated/prisma'
import newsService from '@/src/shared/api/services/news.service'
import uploadService from '@/src/shared/api/services/upload.service'
import { DatePicker, Form, FormItem, Input, Switch } from '@/src/shared/ui'
import { HtmlEditor } from '@/src/shared/ui/admin/html-editor'
import { InputFile } from '@/src/shared/ui/input-file'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const newsSchema = z.object({
  title: z.string().min(1),
  contents: z.string().min(1),
  thumbnail: z.string().nullable(),
  link: z.string().nullable(),
  date: z.date().nullable(),
  published: z.boolean(),
})

type NewsSchema = z.infer<typeof newsSchema>

interface NewsFormProps {
  formId: string
  record?: News | null
  onLoading: (loading: boolean) => void
  onFinish: (id: number) => void
}

function NewsForm(props: NewsFormProps) {
  const { formId, record, onLoading, onFinish } = props

  const form = useForm<NewsSchema>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: '',
      contents: '',
      thumbnail: '',
      link: '',
      date: undefined,
      published: false,
    },
  })

  useEffect(() => {
    if (record) {
      form.reset({
        title: record.title,
        contents: record.contents,
        thumbnail: record.thumbnail,
        link: record.link,
        date: record.date ? new Date(record.date) : undefined,
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

        await newsService.updateNews(record.id.toString(), {
          title: data.title,
          contents: data.contents,
          thumbnail: data.thumbnail,
          link: data.link,
          date: data.date,
          published: data.published,
        })
        onFinish(record.id)
      } else {
        const response = await newsService.createNews({
          title: data.title,
          contents: data.contents,
          thumbnail: data.thumbnail,
          link: data.link,
          date: data.date,
          published: data.published,
        })
        onFinish(response.id)
      }
    } catch (error) {
      console.error('저장 중 오류 발생:', error)
    } finally {
      onLoading(false)
    }
  }

  const handleUpload = async (file: File) => {
    try {
      return await uploadService.uploadImage(file, 'images')
    } catch (error) {
      console.error('썸네일 업로드 오류:', error)
      throw error
    }
  }

  return (
    <Form
      id={formId}
      form={form}
      onSubmit={handleSubmit}
      className="space-y-4 px-4"
    >
      <FormItem name="title" label="제목">
        <Input placeholder="제목을 입력해주세요." />
      </FormItem>

      <FormItem name="published" label="공개 여부">
        <Switch
          checked={form.watch('published')}
          onCheckedChange={(checked) => form.setValue('published', checked)}
        />
      </FormItem>

      <FormItem name="thumbnail" label="썸네일">
        <InputFile
          value={form.watch('thumbnail') || ''}
          onChange={(url) => form.setValue('thumbnail', url)}
          onFileChange={handleUpload}
          accept="image/*"
          placeholder="썸네일 이미지를 선택하세요"
        />
      </FormItem>

      <FormItem name="link" label="링크">
        <Input placeholder="원본 뉴스 링크를 입력해주세요." />
      </FormItem>

      <FormItem name="date" label="날짜">
        <DatePicker />
      </FormItem>

      <FormItem name="contents" label="내용">
        <HtmlEditor
          height={500}
          uploadFile={handleUpload}
          value={form.watch('contents')}
          onChange={(value) => form.setValue('contents', value)}
        />
      </FormItem>
    </Form>
  )
}

export { NewsForm }
