import { AvatarCircles } from '@/src/shared/ui'
import { CEOQuote } from '@/src/widgets/testimonials/ui'

function MessagePage() {
  return (
    <div className="bg-background flex flex-col items-center justify-center">
      <CEOQuote />
      <AvatarCircles />
    </div>
  )
}

export default MessagePage
