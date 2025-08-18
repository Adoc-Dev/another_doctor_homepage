'use client'

import LogoIcon from '@/public/logo.svg'
import { cn } from '@/src/shared/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/src/shared/ui'
import { GlobalButton } from '@/src/widgets/feature/global/ui'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

function HeaderNavigation() {
  // 네비게이션과 관련된 번역 가져오기
  const t = useTranslations('navigation')
  // 기업 소개 관련 번역
  const aboutT = useTranslations('about')
  // 제품 관련 번역
  const productT = useTranslations('product')

  return (
    <nav className="max-w-container-lg bg-background/80 border-foreground/10 fixed top-0 z-50 flex w-full items-center justify-between border-b px-4 py-3 backdrop-blur-sm">
      <Link href="/" className="flex items-center gap-2">
        <LogoIcon className="text-primary-700 dark:text-primary-500 size-6" />
        <div
          className={cn(
            'text-body-01 font-nova-square flex flex-col font-bold tracking-tighter transition-all duration-300'
          )}
        >
          <p className="text-primary-700 dark:text-primary-500 leading-none">
            ANOTHER
            <br />
            DOCTOR
          </p>
        </div>
      </Link>

      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-body-01 bg-transparent font-semibold hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 data-[state=open]:bg-gray-50 data-[state=open]:text-gray-800 data-[state=open]:hover:bg-gray-100 data-[state=open]:hover:text-gray-800 data-[state=open]:focus:bg-gray-100 data-[state=open]:focus:text-gray-800">
              {t('companyInfo')}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="group-data-[viewport=false]/navigation-menu:bg-background/80 w-full min-w-[350px] border-none p-0">
              <ul className="bg-background/80 flex flex-col gap-2 rounded-lg p-2 backdrop-blur-xl">
                <li className="flex cursor-pointer flex-col gap-1 rounded px-2 py-1 hover:bg-gray-100">
                  <NavigationMenuLink
                    href="/docs"
                    title="T-GRID"
                    className="text-body-01 p-0 font-medium hover:bg-transparent hover:text-gray-800 focus:bg-transparent focus:text-gray-800 data-[state=open]:bg-transparent data-[state=open]:text-gray-800 data-[state=open]:hover:bg-transparent data-[state=open]:hover:text-gray-800 data-[state=open]:focus:bg-transparent data-[state=open]:focus:text-gray-800"
                  >
                    {aboutT('introduction')}
                  </NavigationMenuLink>
                  <p className="text-body-03 text-gray-500">
                    {aboutT('introductionDesc')}
                  </p>
                </li>
                <li className="flex cursor-pointer flex-col gap-1 rounded px-2 py-1 hover:bg-gray-100">
                  <NavigationMenuLink
                    href="/docs"
                    title="T-GRID"
                    className="text-body-01 p-0 font-medium hover:bg-transparent hover:text-gray-800 focus:bg-transparent focus:text-gray-800 data-[state=open]:bg-transparent data-[state=open]:text-gray-800 data-[state=open]:hover:bg-transparent data-[state=open]:hover:text-gray-800 data-[state=open]:focus:bg-transparent data-[state=open]:focus:text-gray-800"
                  >
                    {aboutT('ceoMessage')}
                  </NavigationMenuLink>
                  <p className="text-body-03 text-gray-500">
                    {aboutT('ceoMessageDesc')}
                  </p>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-body-01 bg-transparent font-semibold hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 data-[state=open]:bg-gray-50 data-[state=open]:text-gray-800 data-[state=open]:hover:bg-gray-100 data-[state=open]:hover:text-gray-800 data-[state=open]:focus:bg-gray-100 data-[state=open]:focus:text-gray-800">
              {t('productInfo')}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="group-data-[viewport=false]/navigation-menu:bg-background/80 w-full min-w-[300px] border-none p-0">
              <ul className="bg-background/80 flex flex-col gap-2 rounded-lg p-2 backdrop-blur-xl">
                <li className="flex cursor-pointer flex-col gap-1 rounded px-2 py-1 hover:bg-gray-100">
                  <NavigationMenuLink
                    href="/docs"
                    title="T-GRID"
                    className="text-body-01 p-0 font-medium hover:bg-transparent hover:text-gray-800 focus:bg-transparent focus:text-gray-800 data-[state=open]:bg-transparent data-[state=open]:text-gray-800 data-[state=open]:hover:bg-transparent data-[state=open]:hover:text-gray-800 data-[state=open]:focus:bg-transparent data-[state=open]:focus:text-gray-800"
                  >
                    {productT('tgrid')}
                  </NavigationMenuLink>
                  <p className="text-body-03 text-gray-500">
                    {productT('tgridDesc')}
                  </p>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className="text-body-01 bg-transparent px-4 font-semibold hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 data-[state=open]:bg-gray-50 data-[state=open]:text-gray-800 data-[state=open]:hover:bg-gray-100 data-[state=open]:hover:text-gray-800 data-[state=open]:focus:bg-gray-100 data-[state=open]:focus:text-gray-800"
            >
              <Link href="/docs">{t('newsroom')}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className="text-body-01 bg-transparent px-4 font-semibold hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 data-[state=open]:bg-gray-50 data-[state=open]:text-gray-800 data-[state=open]:hover:bg-gray-100 data-[state=open]:hover:text-gray-800 data-[state=open]:focus:bg-gray-100 data-[state=open]:focus:text-gray-800"
            >
              <Link href="/docs">{t('support')}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <GlobalButton />
    </nav>
  )
}

export { HeaderNavigation }
