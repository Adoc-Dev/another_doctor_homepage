'use client'

import { AdministratorForm } from '@/src/features/admin/administrators/ui/administrator-form'
import { AdministratorShow } from '@/src/features/admin/administrators/ui/administrator-show'
import { Administrator } from '@/src/generated/prisma'
import administratorsService from '@/src/shared/api/services/administrators.service'
import { useAlertDialog } from '@/src/shared/hooks/alert-dialog.hook'
import {
  Button,
  DataModal,
  DataModalCreateOrUpdate,
  DataModalShow,
} from '@/src/shared/ui'
import { useEffect, useId, useMemo, useState } from 'react'

type ModalType = 'create' | 'update' | 'show'

interface AdministratorModalProps {
  type: ModalType
  open: boolean
  id?: number
  record?: Administrator
  onFinish?: (id: number) => void
  onChangeType?: (type: ModalType) => void
  onClose: () => void
}

function AdministratorModal(props: AdministratorModalProps) {
  const { type, open, id, record, onFinish, onChangeType, onClose } = props

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
    if (!id) return

    const result = await administratorsService.deactivateAdministrator(
      id?.toString() ?? ''
    )
    console.log('🚀 ~ handleDelete ~ result:', result)
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
              onClick={() => handleChangeType('update')}
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
        <AdministratorShow record={record} />
      </DataModalShow>
      <DataModalCreateOrUpdate>
        <AdministratorForm
          formId={formId}
          record={record}
          onLoading={handleLoading}
          onFinish={handleFinish}
        />
      </DataModalCreateOrUpdate>
    </DataModal>
  )
}

export default AdministratorModal
