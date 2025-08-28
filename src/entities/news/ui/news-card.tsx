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

function NewsCard(props: Props) {
  const { title, description, dates, image, link } = props

  const plainDescription = truncateHtmlContent(description, 200)

  return (
    <div className="group relative ml-10 cursor-pointer rounded-lg px-2 py-4 transition-all duration-200 hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
      <div className="absolute top-2 -left-16 flex items-center justify-center rounded-full bg-white">
        <Avatar className="border-foreground/10 group-hover:border-primary-500/30 m-auto size-12 border transition-colors">
          <AvatarImage src={image} alt={title} className="object-contain" />
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-1">
        {dates && (
          <time className="text-muted-foreground text-xs">{dates}</time>
        )}
        <h2 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 leading-relaxed font-semibold transition-colors duration-200">
          {title}
        </h2>
        {plainDescription && (
          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
            {plainDescription}
          </p>
        )}
      </div>

      <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
        <Link href={link ?? ''} key={link} onClick={(e) => e.stopPropagation()}>
          <Badge
            title="기사 보기"
            className="bg-foreground flex gap-2 text-white dark:bg-gray-900"
          >
            <Globe className="h-4 w-4 text-white" />
            <p>기사 보기</p>
          </Badge>
        </Link>
      </div>
    </div>
  )
}

export { NewsCard }
