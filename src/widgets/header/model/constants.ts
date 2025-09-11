import { NavItemType } from '@/src/widgets/header/model/types'

const navItems: NavItemType[] = [
  {
    type: 'link',
    key: 'introduction',
    translationKey: 'about.introduction.title',
    href: '/',
  },
  {
    type: 'link',
    key: 'ceoMessage',
    translationKey: 'about.ceoMessage.title',
    href: '/team',
  },
  {
    type: 'link',
    key: 'news',
    translationKey: 'navigation.newsroom',
    href: '/newsroom',
  },
]

export { navItems }
