import { BlurFade } from '@/src/shared/ui'
import { HackathonCard } from '@/src/widgets/news/ui/hackathon-card'
import { NEWS_DATA } from '@/src/widgets/news/ui/news-data'

const BLUR_FADE_DELAY = 0.04

function NewsSection() {
  return (
    <section className="min-h-[50vh]">
      <div className="w-full max-w-4xl space-y-12 px-4 py-12">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <p className="text-body-01 font-semibold text-red-500">News</p>
              <h2 className="text-display-00 text-center font-black tracking-tighter text-balance">
                뉴스룸
              </h2>
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <ul className="border-foreground/10 divide-foreground/10 mb-4 ml-4 divide-y divide-dashed border-l">
            {NEWS_DATA.map((news, id) => (
              <BlurFade
                key={news.title + news.dates}
                delay={BLUR_FADE_DELAY * 15 + id * 0.05}
              >
                <HackathonCard
                  title={news.title}
                  description={news.description}
                  location={news.location}
                  dates={news.dates}
                  image={news.image}
                  links={news.links}
                />
              </BlurFade>
            ))}
          </ul>
        </BlurFade>
      </div>
    </section>
  )
}

export { NewsSection }
