'use client'

import { NewsForm } from '@/src/features/admin/news/ui'
import {
  useDeleteNewsMutation,
  useNewsDetailQuery,
} from '@/src/shared/api/queries/news.query'
import { useAlertDialog } from '@/src/shared/hooks/alert-dialog.hook'
import { Button } from '@/src/shared/ui'
import { Save, Trash2, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useId, useState } from 'react'

function NewsPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const { data } = useNewsDetailQuery(id ?? '')
  const deleteNews = useDeleteNewsMutation({
    onSuccess: handleCancel,
  })

  const formId = useId()
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const alertDialog = useAlertDialog()

  function handleLoading(loading: boolean) {
    setLoading(loading)
  }

  async function handleDelete() {
    alertDialog.open({
      title: '삭제',
      description: '삭제하시겠습니끼?',
      cancelText: '취소',
      confirmText: '삭제',
      destructive: true,
      onConfirm: async () => {
        if (data?.id) {
          deleteNews.mutate(data.id.toString())
        }
      },
    })
  }

  async function handleCancel() {
    router.push('/admin/contents/news')
  }

  async function handleFinish() {
    alertDialog.open({
      title: '알림',
      description: '저장되었습니다.',
      onConfirm: handleCancel,
    })
  }

  return (
    <div className="p-2">
      <div className="mb-6 flex justify-between">
        <div>
          {data && (
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
              삭제
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4" />
            취소
          </Button>
          <Button type="submit" form={formId} loading={loading}>
            <Save className="h-4 w-4" />
            저장
          </Button>
        </div>
      </div>
      <NewsForm
        formId={formId}
        record={data}
        onFinish={handleFinish}
        onLoading={handleLoading}
      />
    </div>
  )
}

export { NewsPage }
