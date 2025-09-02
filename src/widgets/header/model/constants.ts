import { NavItemType } from '@/src/widgets/header/model/types'

const navItems: NavItemType[] = [
  {
    type: 'link',
    key: 'about',
    translationKey: 'about.introduction.title',
    href: '/',
  },
  {
    type: 'link',
    key: 'message',
    translationKey: 'about.ceoMessage.title',
    href: '/team',
  },
  {
    type: 'link',
    key: 'newsroom',
    translationKey: 'navigation.newsroom',
    href: '/newsroom',
  },
]

export { navItems }
