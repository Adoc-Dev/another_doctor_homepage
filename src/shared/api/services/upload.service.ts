class UploadService {
  async uploadImage(
    file: File,
    folder: string = 'news',
    progress?: (progress: number) => void
  ): Promise<string> {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      // 직접 Supabase API 호출 대신 서버 API 사용
      const response = await fetch('/admin/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()

      // 완료 시 진행률 100%
      if (progress) progress(100)

      return data.url
    } catch (error) {
      console.error('이미지 업로드 처리 중 오류:', error)
      throw new Error('이미지 업로드에 실패했습니다')
    }
  }
}

const uploadService = new UploadService()
export default uploadService
