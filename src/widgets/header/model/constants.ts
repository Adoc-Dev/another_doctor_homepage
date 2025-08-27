import { NavItemType } from '@/src/widgets/header/model/types'

const navItems: NavItemType[] = [
  {
    type: 'dropdown',
    key: 'company',
    translationKey: 'navigation.companyInfo',
    contents: [
      {
        href: '/company/about',
        titleKey: 'about.introduction.title',
        descriptionKey: 'about.introduction.description',
      },
      {
        href: '/company/message',
        titleKey: 'about.ceoMessage.title',
        descriptionKey: 'about.ceoMessage.description',
      },
    ],
  },
  {
    type: 'link',
    key: 'newsroom',
    translationKey: 'navigation.newsroom',
    href: '/newsroom',
  },
]

export { navItems }
