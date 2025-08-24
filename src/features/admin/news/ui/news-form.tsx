'use client'

import { useNewsForm } from '@/src/features/admin/news/hooks/news-form.hook'
import { News } from '@/src/generated/prisma'
import uploadService from '@/src/shared/api/services/upload.service'
import { DatePicker, Form, FormItem, Input } from '@/src/shared/ui'
import { HtmlEditor } from '@/src/shared/ui/admin/html-editor'
import { InputFile } from '@/src/shared/ui/input-file'
import { ToggleGroup, ToggleGroupItem } from '@/src/shared/ui/toggle-group'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

interface NewsFormProps {
  formId: string
  record?: News | null
  onLoading: (loading: boolean) => void
  onFinish: (id: number) => void
}

function NewsForm(props: NewsFormProps) {
  const { formId, record, onLoading, onFinish } = props

  const { form, handleSubmit } = useNewsForm({
    record,
    onLoading,
    onFinish,
  })

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
      <FormItem name="title" label="제목" className="w-full">
        <Input placeholder="제목을 입력해주세요." />
      </FormItem>

      <div className="flex items-start justify-between gap-4">
        <FormItem name="thumbnail" label="썸네일" className="w-full" required>
          <InputFile
            value={form.watch('thumbnail') || ''}
            onChange={(url) => form.setValue('thumbnail', url)}
            onFileChange={handleUpload}
            accept="image/*"
            compact
            placeholder="썸네일 이미지를 선택하세요"
          />
        </FormItem>

        <FormItem name="date" label="날짜" className="w-full" required>
          <DatePicker />
        </FormItem>
      </div>

      <div className="flex items-start justify-between gap-4">
        <FormItem
          name="published"
          label="공개 여부"
          className="w-full"
          required
        >
          <ToggleGroup
            type="single"
            value={form.watch('published') ? 'published' : 'unpublished'}
            onValueChange={(value) => {
              if (value) {
                form.setValue('published', value === 'published')
              }
            }}
            className="w-full max-w-[240px]"
            variant="outline"
          >
            <ToggleGroupItem
              value="published"
              className="flex-1 border-gray-200"
              color="default"
              aria-label="공개"
            >
              <EyeIcon className="mr-1 h-4 w-4" />
              공개
            </ToggleGroupItem>
            <ToggleGroupItem
              value="unpublished"
              className="flex-1 border-gray-200"
              color="default"
              aria-label="비공개"
            >
              <EyeOffIcon className="mr-1 h-4 w-4" />
              비공개
            </ToggleGroupItem>
          </ToggleGroup>
        </FormItem>

        <FormItem name="link" label="링크" className="w-full">
          <Input placeholder="원본 뉴스 링크를 입력해주세요." />
        </FormItem>
      </div>

      <FormItem name="contents" label="내용" required>
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
