import { BackgroundRippleEffect } from '@/src/shared/ui'
import { MeetTeam } from '@/src/widgets/team/ui'
import type { Metadata } from 'next'

interface TeamPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: TeamPageProps): Promise<Metadata> {
  const { locale } = await params
  const isKorean = locale === 'ko'

  return {
    title: isKorean ? '팀 소개' : 'Our Team',
    description: isKorean
      ? 'Another Doctor의 전문가 팀을 만나보세요. AI 기반 치아 색상 측정 기술을 개발하는 혁신적인 팀입니다.'
      : 'Meet the expert team at Another Doctor. An innovative team developing AI-based dental color measurement technology.',
    keywords: isKorean
      ? ['Another Doctor 팀', '치과 AI 전문가', '의료 기술팀', 'T-GRID 개발진']
      : [
          'Another Doctor team',
          'dental AI experts',
          'medical tech team',
          'T-GRID developers',
        ],
    openGraph: {
      title: isKorean ? 'Another Doctor 팀 소개' : 'Another Doctor Team',
      description: isKorean
        ? 'AI 기반 치아 색상 측정 기술을 개발하는 전문가 팀'
        : 'Expert team developing AI-based dental color measurement technology',
      url: locale === 'ko' ? '/team' : '/en/team',
    },
  }
}

function TeamPage() {
  return (
    <div className="relative mb-32 flex min-h-screen w-full flex-col items-start justify-start overflow-hidden">
      <BackgroundRippleEffect />
      <MeetTeam />
    </div>
  )
}

export default TeamPage
