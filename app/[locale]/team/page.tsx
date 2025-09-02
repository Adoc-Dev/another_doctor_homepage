import { BackgroundRippleEffect } from '@/src/shared/ui'
import { MeetTeam } from '@/src/widgets/team/ui'

function MessagePage() {
  return (
    <div className="reltive mb-32 flex min-h-screen w-full flex-col items-start justify-start overflow-hidden">
      <BackgroundRippleEffect />
      <MeetTeam />
    </div>
  )
}

export default MessagePage
