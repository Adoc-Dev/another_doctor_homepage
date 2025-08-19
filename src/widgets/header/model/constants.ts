import { NavItemType } from '@/src/widgets/header/model/types'

const navItems: NavItemType[] = [
  {
    type: 'dropdown',
    key: 'company',
    translationKey: 'navigation.companyInfo',
    content: {
      href: '/company/about',
      titleKey: 'about.introduction.title',
      descriptionKey: 'about.introduction.description',
      minWidth: '350px',
    },
  },
  {
    type: 'dropdown',
    key: 'product',
    translationKey: 'navigation.productInfo',
    content: {
      href: '/product/t-grid',
      titleKey: 'product.introduction.title',
      descriptionKey: 'product.introduction.description',
      minWidth: '300px',
    },
  },
  {
    type: 'link',
    key: 'newsroom',
    translationKey: 'navigation.newsroom',
    href: '/newsroom',
  },
  {
    type: 'link',
    key: 'support',
    translationKey: 'navigation.support',
    href: '/support',
  },
]

export { navItems }
