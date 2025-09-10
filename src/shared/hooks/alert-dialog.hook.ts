import { use } from 'react'
import { AlertDialogContext } from '../ui/global-alert-dialog'

/**
 * 알림 다이얼로그 훅
 * @returns 알림 다이얼로그 훅
 */
export const useAlertDialog = () => {
  const context = use(AlertDialogContext)
  if (!context)
    throw new Error('useAlertDialog must be used within an AlertDialogProvider')
  return context
}
