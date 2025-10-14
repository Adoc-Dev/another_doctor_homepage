import { cn } from '@/src/shared/lib/utils'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { PropsWithChildren } from 'react'

// 에디터를 동적으로 import하여 초기 번들 크기 감소
const Editor = dynamic(
  () => import('@tinymce/tinymce-react').then((mod) => mod.Editor),
  {
    loading: () => (
      <div className="flex h-full items-center justify-center rounded-md border p-4">
        에디터 로딩 중...
      </div>
    ),
    ssr: false, // 클라이언트 사이드에서만 로드
  }
)

type ProgressFn = (percent: number) => void

interface HtmlEditorProps {
  className?: string
  height: number
  disabled?: boolean
  onChange?: (value: string) => void | Promise<void>
  uploadFile: (file: File, progress?: ProgressFn) => string | Promise<string>
  menubar?: boolean
  toolbar?: boolean
  value?: string
}

interface BlobInfo {
  id: () => string
  name: () => string
  filename: () => string
  blob: () => Blob
  base64: () => string
  blobUri: () => string
  uri: () => string | undefined
}

export function HtmlEditor(props: PropsWithChildren<HtmlEditorProps>) {
  const {
    className,
    disabled,
    height,
    menubar = true,
    toolbar = true,
    onChange,
    value,
    uploadFile,
  } = props

  const { theme } = useTheme()

  return (
    <Editor
      onEditorChange={(value) => {
        if (onChange) onChange(value)
      }}
      value={value}
      disabled={disabled}
      tinymceScriptSrc={'/js/tinymce/tinymce.min.js'}
      licenseKey="gpl"
      init={{
        width: '100%',
        height,
        menubar,
        promotion: false,
        automatic_uploads: true,
        highlight_on_focus: false,
        file_picker_types: 'image file media',
        images_upload_handler: (blobInfo: BlobInfo, progress: ProgressFn) => {
          const file = new File([blobInfo.blob()], 'image-editor', {
            type: blobInfo.blob().type,
          })
          return uploadFile(file, progress)
        },
        file_picker_callback: (callback: any, _: any, meta: any) => {
          if (meta.filetype === 'image') {
            const input = document.createElement('input')
            input.setAttribute('type', 'file')
            input.setAttribute('accept', 'image/*')
            input.onchange = async function () {
              const file = input.files?.[0]
              if (file) {
                const blobInfo = {
                  id: () => '',
                  name: () => file.name,
                  filename: () => file.name,
                  blob: () => file,
                  base64: () => '',
                  blobUri: () => '',
                  uri: () => '',
                  type: () => file.type,
                }
                const blobFile = new File([blobInfo.blob()], file.name, {
                  type: blobInfo.blob().type,
                })
                const url = await uploadFile(blobFile)
                callback(url, { alt: file.name })
              }
            }
            input.click()
          }

          if (meta.filetype === 'file' || meta.filetype === 'media') {
            const input = document.createElement('input')
            input.setAttribute('type', 'file')
            input.onchange = async function () {
              const file = input.files?.[0]
              if (file) {
                try {
                  const url = await uploadFile(file)
                  callback(url, { text: file.name, title: file.name })
                } catch (e) {
                  throw e
                }
              }
            }
            input.click()
          }
        },
        plugins: [
          'preview',
          'importcss',
          'searchreplace',
          'autolink',
          'directionality',
          'code',
          'visualblocks',
          'visualchars',
          'fullscreen',
          'image',
          'link',
          'table',
          'charmap',
          'pagebreak',
          'nonbreaking',
          'insertdatetime',
          'advlist',
          'lists',
          'wordcount',
          'help',
          'charmap',
          'emoticons',
        ],
        skin: 'oxide',
        content_css: 'default',
        toolbar: toolbar
          ? 'undo redo | bold italic underline strikethrough | fontsize blocks | ' +
            'alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | ' +
            'forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview print | ' +
            'template link image | ltr rt'
          : false,
        content_style: 'body { font-family:SUIT Variable; font-size:14px }',
        body_class: cn('w-full text-md', className),
      }}
    />
  )
}
