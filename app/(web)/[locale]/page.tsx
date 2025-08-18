import { redirect } from '@/src/i18n/navigation'

function HomePage() {
  return redirect({ href: '/company/about', locale: 'ko' })
}

export default HomePage
