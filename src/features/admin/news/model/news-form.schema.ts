import { urlRegex } from '@/src/shared/util/regex'
import { z } from 'zod'

const newsSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  contents: z.string().min(1, '내용을 입력해주세요.'),
  thumbnail: z.string().min(1, '썸네일을 입력해주세요.'),
  link: z
    .string()
    .regex(urlRegex, '올바른 URL 형식이 아닙니다.')
    .transform((url) => {
      if (url && !url.startsWith('http')) {
        return `https://${url}`
      }
      return url
    })
    .optional()
    .or(z.literal('')),
  date: z.date().min(1, '날짜를 입력해주세요.'),
  published: z.boolean(),
})

type NewsSchema = z.infer<typeof newsSchema>

export { newsSchema, type NewsSchema }
