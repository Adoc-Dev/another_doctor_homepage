'use client'

import { NewsShow } from '@/src/features/admin/news/ui/news-show'
import { News } from '@/src/generated/prisma'
import newsService from '@/src/shared/api/services/news.service'
import { useAlertDialog } from '@/src/shared/hooks/alert-dialog.hook'
import {
  Button,
  DataModal,
  DataModalCreateOrUpdate,
  DataModalShow,
} from '@/src/shared/ui'
import { useRouter } from 'next/navigation'
import { useEffect, useId, useMemo, useState } from 'react'

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
  const { type, open, id, record, onFinish, onChangeType, onClose } = props

  const router = useRouter()
  const formId = useId()
  const alertDialog = useAlertDialog()
  const [modalType, setModalType] = useState(type)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (type) setModalType(type)
  }, [type])

  const title = useMemo(() => {
    const str = '관리자'
    if (modalType === 'create') return `${str} 추가`
    if (modalType === 'update') return `${str} 수정`
    return `${str} 정보`
  }, [modalType])

  function handleLoading(loading: boolean) {
    setLoading(loading)
  }

  function handleChangeType(type: ModalType) {
    setModalType(type)
    props.onChangeType?.(type)
  }

  function handleCancel() {
    if (modalType === 'create') return onClose()
    handleChangeType('show')
  }

  function handleFinish(id: number) {
    alertDialog.open({
      title: '알림',
      description: '저장되었습니다.',
      onConfirm: onClose,
    })
  }

  const handleDelete = async () => {
    alertDialog.open({
      title: '삭제',
      description: '삭제하시겠습니끼?',
      cancelText: '취소',
      confirmText: '삭제',
      destructive: true,
      onConfirm: async () => {
        await newsService.deleteNews(id!.toString())
        await handleCancel()
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
        <>
          <DataModalShow>
            <Button
              type="submit"
              variant="outline"
              loading={loading}
              onClick={() =>
                router.push(`/admin/contents/news/create?id=${id}`)
              }
            >
              수정
            </Button>
            <Button
              variant="destructive"
              loading={loading}
              onClick={handleDelete}
            >
              삭제
            </Button>
          </DataModalShow>
          <DataModalCreateOrUpdate>
            <Button variant="outline" onClick={handleCancel}>
              취소
            </Button>
            <Button type="submit" form={formId} loading={loading}>
              확인
            </Button>
          </DataModalCreateOrUpdate>
        </>
      }
    >
      <DataModalShow>
        <NewsShow record={record} />
      </DataModalShow>
    </DataModal>
  )
}

export default NewsModal
