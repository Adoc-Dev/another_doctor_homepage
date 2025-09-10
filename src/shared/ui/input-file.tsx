'use client'

import { cn } from '@/src/shared/lib/utils'
import { ImageIcon, UploadIcon, XIcon } from 'lucide-react'
import { forwardRef, useCallback, useState } from 'react'
import { Button } from './button'

interface InputFileProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  className?: string
  value?: string
  onChange?: (value: string) => void
  onFileChange?: (file: File) => Promise<string>
  accept?: string
  placeholder?: string
  preview?: boolean
  compact?: boolean
}

export const InputFile = forwardRef<HTMLDivElement, InputFileProps>(
  (
    {
      className,
      value,
      onChange,
      onFileChange,
      accept = 'image/*',
      placeholder = '이미지 선택',
      preview = true,
      compact = false,
      ...props
    },
    ref
  ) => {
    const [loading, setLoading] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | undefined>(value)
    const [dragActive, setDragActive] = useState(false)

    const handleFileChange = useCallback(
      async (file: File) => {
        if (!file || !onFileChange) return

        try {
          setLoading(true)
          const url = await onFileChange(file)
          onChange?.(url)
          setPreviewUrl(url)
          return url
        } catch (error) {
          console.error('파일 업로드 오류:', error)
          return ''
        } finally {
          setLoading(false)
        }
      },
      [onChange, onFileChange]
    )

    const handleInputChange = useCallback(
      async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
          await handleFileChange(file)
        }
        // 파일 선택 초기화
        e.target.value = ''
      },
      [handleFileChange]
    )

    const handleDrag = useCallback((e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (e.type === 'dragenter' || e.type === 'dragover') {
        setDragActive(true)
      } else if (e.type === 'dragleave') {
        setDragActive(false)
      }
    }, [])

    const handleDrop = useCallback(
      async (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        const file = e.dataTransfer.files?.[0]
        if (file) {
          await handleFileChange(file)
        }
      },
      [handleFileChange]
    )

    const handleRemove = useCallback(() => {
      onChange?.('')
      setPreviewUrl(undefined)
    }, [onChange])

    if (compact) {
      return (
        <div
          ref={ref}
          className={cn('flex w-full items-center gap-2', className)}
        >
          {/* 컴팩트 모드 */}
          <div className="flex h-9 flex-1 items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1 text-base shadow-xs md:text-sm">
            {preview && previewUrl ? (
              <div className="flex flex-1 items-center gap-2 overflow-hidden">
                <img
                  src={previewUrl}
                  alt="업로드 이미지"
                  className="h-6 w-6 rounded-sm object-cover"
                />
                <span className="flex-1 truncate text-sm text-gray-600">
                  {value?.split('/').pop() ||
                    previewUrl?.split('/').pop() ||
                    '업로드된 파일'}
                </span>
              </div>
            ) : (
              <span
                className="flex flex-1 cursor-pointer items-center gap-2 text-sm text-gray-500"
                onClick={() =>
                  !loading && document.getElementById('file-upload')?.click()
                }
              >
                <ImageIcon
                  className={cn('h-4 w-4', loading && 'animate-pulse')}
                />
                {loading ? '업로드 중...' : placeholder}
              </span>
            )}

            <div className="flex items-center">
              {value || previewUrl ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  className="h-6 w-6 p-0 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  <XIcon className="h-3.5 w-3.5" />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    !loading && document.getElementById('file-upload')?.click()
                  }
                  className="h-6 w-6 p-0 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  disabled={loading}
                >
                  <UploadIcon className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>

          <input
            id="file-upload"
            type="file"
            accept={accept}
            onChange={handleInputChange}
            disabled={loading}
            className="hidden"
            {...props}
          />
        </div>
      )
    }

    return (
      <div ref={ref} className={cn('flex flex-col space-y-2', className)}>
        <div
          className={cn(
            'group hover:border-primary relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-gray-300 p-4 transition-all',
            dragActive ? 'border-primary bg-primary/5' : '',
            (value || previewUrl) && preview ? 'h-48' : 'h-24',
            loading ? 'opacity-70' : ''
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() =>
            !loading && document.getElementById('file-upload')?.click()
          }
        >
          {/* 이미지 미리보기 */}
          {preview && previewUrl ? (
            <>
              <img
                src={previewUrl}
                alt="업로드 이미지"
                className="absolute inset-0 h-full w-full rounded-md object-contain p-1"
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <UploadIcon className="h-6 w-6 text-white" />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemove()
                }}
                className="absolute top-1 right-1 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <XIcon className="h-3 w-3" />
              </Button>
            </>
          ) : (
            <>
              <ImageIcon
                className={cn(
                  'h-8 w-8 text-gray-400',
                  loading && 'animate-pulse'
                )}
              />
              <p className="text-center text-sm text-gray-500">
                {loading ? '업로드 중...' : `${placeholder} (클릭 또는 드래그)`}
              </p>
            </>
          )}
          <input
            id="file-upload"
            type="file"
            accept={accept}
            onChange={handleInputChange}
            disabled={loading}
            className="hidden"
            {...props}
          />
        </div>

        {/* 파일명 표시 영역 (선택적) */}
        {(value || previewUrl) && (
          <div className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 text-xs text-gray-700">
            <span className="max-w-[85%] truncate">
              {value?.split('/').pop() ||
                previewUrl?.split('/').pop() ||
                '업로드된 파일'}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="h-6 px-2 py-1 text-xs"
            >
              삭제
            </Button>
          </div>
        )}
      </div>
    )
  }
)

InputFile.displayName = 'InputFile'
