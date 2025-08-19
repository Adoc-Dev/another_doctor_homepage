export interface News {
  id: number
  title: string
  contents: string
  createdAt: string
  updatedAt: string
  published: boolean
  thumbnail?: string | null
  link?: string | null
  date?: string | null
  authorId?: string | null
}
