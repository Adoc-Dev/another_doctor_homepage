import { Avatar, AvatarFallback, AvatarImage } from '@/src/shared/ui/avatar'
import { Badge } from '@/src/shared/ui/badge'
import { truncateHtmlContent } from '@/src/shared/util/html'
import { Globe } from 'lucide-react'
import Link from 'next/link'

interface Props {
  title: string
  description: string
  dates: string
  image?: string
  link?: string
}

export function HackathonCard({
  title,
  description,
  dates,
  image,
  link,
}: Props) {
  // HTML 내용을 텍스트로 변환하고 길이 제한 (약 2줄 정도 표시)
  const plainDescription = truncateHtmlContent(description, 120)

  return (
    <li className="relative ml-10 py-4">
      <div className="absolute top-2 -left-16 flex items-center justify-center rounded-full bg-white">
        <Avatar className="border-foreground/10 m-auto size-12 border">
          <AvatarImage src={image} alt={title} className="object-contain" />
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-1">
        {dates && (
          <time className="text-muted-foreground text-xs">{dates}</time>
        )}
        <h2 className="leading-none font-semibold">{title}</h2>
        {plainDescription && (
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {plainDescription}
          </p>
        )}
      </div>

      <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
        <Link href={link ?? ''} key={link}>
          <Badge
            title="기사 보기"
            className="bg-foreground flex gap-2 text-white"
          >
            <Globe className="h-4 w-4 text-white" />
            <p>기사 보기</p>
          </Badge>
        </Link>
      </div>
    </li>
  )
}
