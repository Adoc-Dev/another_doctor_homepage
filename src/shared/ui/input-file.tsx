// src/shared/ui/input-file.tsx
'use client'

import { cn } from '@/src/shared/lib/utils'
import { XIcon } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Button } from './button'

interface InputFileProps {
  className?: string
  value?: string
  onChange?: (value: string) => void
  onFileChange?: (file: File) => Promise<string>
  accept?: string
  placeholder?: string
  preview?: boolean
}

export function InputFile({
  className,
  value,
  onChange,
  onFileChange,
  accept = 'image/*',
  placeholder = '이미지를 선택하세요',
  preview = true,
}: InputFileProps) {
  const [loading, setLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(value)

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file || !onFileChange) return

      try {
        setLoading(true)
        const url = await onFileChange(file)
        onChange?.(url)
        setPreviewUrl(url)
      } catch (error) {
        console.error('File upload error:', error)
      } finally {
        setLoading(false)
        // 파일 선택 초기화 (같은 파일 다시 선택 가능하게)
        e.target.value = ''
      }
    },
    [onChange, onFileChange]
  )

  const handleRemove = useCallback(() => {
    onChange?.('')
    setPreviewUrl(undefined)
  }, [onChange])

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex gap-2">
        <input
          type="file"
          id="file-input"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex-1 overflow-hidden rounded border border-gray-200 bg-white px-3 py-2 text-sm text-ellipsis whitespace-nowrap">
          {value || previewUrl || placeholder}
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('file-input')?.click()}
          disabled={loading}
        >
          {loading ? '업로드 중...' : '파일 선택'}
        </Button>
        {(value || previewUrl) && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            className="shrink-0"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        )}
      </div>

      {preview && previewUrl && (
        <div className="mt-2 overflow-hidden rounded border border-gray-200">
          <img
            src={previewUrl}
            alt="Preview"
            className="h-40 w-full object-contain"
          />
        </div>
      )}
    </div>
  )
}
