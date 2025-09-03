'use client'

import { NewsShow } from '@/src/features/admin/news/ui/news-show'
import { News } from '@/src/generated/prisma'
import { useDeleteAdminNewsMutation } from '@/src/shared/api/queries/admin-news.query'
import { useAlertDialog } from '@/src/shared/hooks/alert-dialog.hook'
import { Button, DataModal, DataModalShow } from '@/src/shared/ui'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type ModalType = 'create' | 'update' | 'show'

interface NewsModalProps {
  type: ModalType
  open: boolean
  id?: number
  record?: News
  onFinish?: (id: number) => void
  onChangeType?: (type: ModalType) => void
  onClose: () => void
}

function NewsModal(props: NewsModalProps) {
  const { type, open, id, record, onClose } = props

  const router = useRouter()
  const alertDialog = useAlertDialog()
  const [modalType, setModalType] = useState(type)

  useEffect(() => {
    if (type) setModalType(type)
  }, [type])

  const title = useMemo(() => {
    const str = '뉴스'
    if (modalType === 'create') return `${str} 추가`
    if (modalType === 'update') return `${str} 수정`
    return `${str} 정보`
  }, [modalType])

  const deleteNews = useDeleteAdminNewsMutation({
    onSuccess: onClose,
  })

  const handleDelete = async () => {
    alertDialog.open({
      title: '삭제',
      description: '삭제하시겠습니까?',
      cancelText: '취소',
      confirmText: '삭제',
      destructive: true,
      onConfirm: () => {
        if (id) {
          deleteNews.mutate(id.toString())
        }
      },
    })
  }

  return (
    <DataModal
      type={modalType}
      title={title}
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
      footer={
        <DataModalShow>
          <Button
            type="submit"
            variant="outline"
            onClick={() => router.push(`/admin/contents/news/create?id=${id}`)}
          >
            수정
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            loading={deleteNews.isPending}
          >
            삭제
          </Button>
        </DataModalShow>
      }
    >
      <DataModalShow>
        <NewsShow record={record} />
      </DataModalShow>
    </DataModal>
  )
}

export { NewsModal }
