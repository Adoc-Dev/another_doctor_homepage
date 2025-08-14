import { BlurFade, FlickeringGrid, OrbitingCircles } from '@/src/shared/ui'
import { MISSION_TEXT } from '@/src/widgets/mission/model/constants'
import { MissionBeanGroup } from '@/src/widgets/mission/ui/mission-bean-group'
import { File, Flag, Globe, Map, Orbit, Plane, Search } from 'lucide-react'

function MissionSection() {
  return (
    <div className="justify-centers flex h-full min-h-[50] w-full flex-col items-center pb-32">
      <div className="mt-32 flex w-full flex-col items-center justify-center gap-8"></div>
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <BlurFade delay={0.2} inView>
          <p className="text-body-01 font-semibold text-red-500">
            {MISSION_TEXT.subTitle}
          </p>
        </BlurFade>
        <BlurFade delay={0.4} inView>
          <h2 className="text-display-00 text-center font-black tracking-tighter text-balance">
            {MISSION_TEXT.title}
          </h2>
        </BlurFade>
        <BlurFade delay={0.6} inView>
          <p className="text-body-01 text-foreground/70 text-center font-medium">
            {MISSION_TEXT.description.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </BlurFade>
      </div>

      <BlurFade delay={1.4} inView>
        <div className="flex w-full max-w-5xl flex-row gap-4">
          <div className="relative flex w-1/3 flex-col justify-center p-8">
            <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden">
              <OrbitingCircles radius={100}>
                <Globe />
                <Flag />
                <Map />
              </OrbitingCircles>

              <OrbitingCircles radius={60} reverse>
                <Orbit />
                <Plane />
                <File />
                <Search />
              </OrbitingCircles>
              <div className="from-background via-background/50 absolute inset-x-0 bottom-0 h-[70px] bg-gradient-to-t to-transparent" />
            </div>
            <div className="mt-12 flex flex-col items-start justify-center gap-2">
              <p className="text-title-01 font-bold">
                {MISSION_TEXT.global.title}
              </p>
              <p className="text-body-01 text-foreground/70 font-medium">
                {MISSION_TEXT.global.description}
              </p>
            </div>
          </div>

          <div className="relative flex w-1/3 flex-col justify-center p-8">
            <MissionBeanGroup />
            <div className="mt-12 flex flex-col items-start justify-center gap-2">
              <p className="text-title-01 font-bold">
                {MISSION_TEXT.expansion.title}
              </p>
              <p className="text-body-01 text-foreground/70 font-medium">
                {MISSION_TEXT.expansion.description}
              </p>
            </div>
          </div>

          <div className="relative flex w-1/3 flex-col justify-center p-8">
            <div className="bg-background relative flex h-[300px] items-center justify-center overflow-hidden rounded-lg">
              <FlickeringGrid
                className="relative inset-0 z-0 h-[200px] [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
                squareSize={13}
                gridGap={6}
                color="#932F67"
                maxOpacity={1}
                flickerChance={0.1}
                height={800}
                width={800}
              />
            </div>
            <div className="mt-12 flex flex-col items-start justify-center gap-2">
              <p className="text-title-01 font-bold">
                {MISSION_TEXT.precision.title}
              </p>
              <p className="text-body-01 text-foreground/70 font-medium">
                {MISSION_TEXT.precision.description}
              </p>
            </div>
          </div>
        </div>
      </BlurFade>
    </div>
  )
}

export { MissionSection }
