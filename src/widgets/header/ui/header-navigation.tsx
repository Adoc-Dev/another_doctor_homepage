'use client'

import { NavItem } from '@/src/entities/header/ui'
import { Link } from '@/src/i18n/navigation'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/src/shared/ui'
import { GlobalButton } from '@/src/widgets/feature/global/ui'
import { Logo } from '@/src/widgets/header/ui/header-logo'
import { useTranslations } from 'next-intl'

function HeaderNavigation() {
  const t = useTranslations('header.navigation')
  const aboutT = useTranslations('header.about')
  const productT = useTranslations('header.product')

  return (
    <nav className="border-foreground/10 bg-background/80 fixed top-0 z-50 flex w-full items-center justify-center border-b px-4 py-3 backdrop-blur-sm">
      <div className="flex w-full max-w-xl items-center justify-between">
        <Logo />

        <div className="flex items-center space-x-2">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-body-01 bg-transparent font-semibold hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 data-[state=open]:bg-gray-50 data-[state=open]:text-gray-800 data-[state=open]:hover:bg-gray-100 data-[state=open]:hover:text-gray-800 data-[state=open]:focus:bg-gray-100 data-[state=open]:focus:text-gray-800">
                  {t('companyInfo')}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="group-data-[viewport=false]/navigation-menu:bg-background/80 w-full min-w-[350px] border-none p-0">
                  <ul className="bg-background/80 flex flex-col gap-2 rounded-lg p-2 backdrop-blur-xl">
                    <NavItem
                      href="/company/about"
                      title={aboutT('introduction.title')}
                      description={aboutT('introduction.description')}
                    />
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-body-01 bg-transparent font-semibold hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 data-[state=open]:bg-gray-50 data-[state=open]:text-gray-800 data-[state=open]:hover:bg-gray-100 data-[state=open]:hover:text-gray-800 data-[state=open]:focus:bg-gray-100 data-[state=open]:focus:text-gray-800">
                  {t('productInfo')}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="group-data-[viewport=false]/navigation-menu:bg-background/80 w-full min-w-[300px] border-none p-0">
                  <ul className="bg-background/80 flex flex-col gap-2 rounded-lg p-2 backdrop-blur-xl">
                    <NavItem
                      href="/product/t-grid"
                      title={productT('introduction.title')}
                      description={productT('introduction.description')}
                    />
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="text-body-01 bg-transparent px-4 font-semibold hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 data-[state=open]:bg-gray-50 data-[state=open]:text-gray-800 data-[state=open]:hover:bg-gray-100 data-[state=open]:hover:text-gray-800 data-[state=open]:focus:bg-gray-100 data-[state=open]:focus:text-gray-800"
                >
                  <Link href="/newsroom">{t('newsroom')}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className="text-body-01 bg-transparent px-4 font-semibold hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 data-[state=open]:bg-gray-50 data-[state=open]:text-gray-800 data-[state=open]:hover:bg-gray-100 data-[state=open]:hover:text-gray-800 data-[state=open]:focus:bg-gray-100 data-[state=open]:focus:text-gray-800"
                >
                  <Link href="/support">{t('support')}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <GlobalButton />
        </div>
      </div>
    </nav>
  )
}

export { HeaderNavigation }
