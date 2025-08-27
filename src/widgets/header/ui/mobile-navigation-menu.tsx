import LogoIcon from '@/public/logo.svg'
import { usePathname } from '@/src/i18n/navigation'
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/src/shared/ui'
import { MenuIcon, XIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

function MobileNavigationMenu() {
  const t = useTranslations('header')
  const pathname = usePathname()

  const isActive = (href: string) => {
    // 정확한 경로 일치
    if (pathname === href) return true

    // 서브 경로 일치 (예: /company/about이 /company로 시작하는지)
    if (href !== '/' && pathname.startsWith(href)) return true

    return false
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="flex min-h-0 rounded-full border-gray-200 p-0 hover:bg-transparent hover:text-gray-800 focus:ring-0 focus-visible:ring-gray-300 focus-visible:ring-offset-0 sm:hidden dark:border-gray-800"
        >
          <MenuIcon className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        showHandle={false}
        className="mx-3 mb-3 rounded-2xl after:hidden"
      >
        <DrawerHeader className="flex flex-row items-center justify-between">
          <DrawerTitle className="sr-only">Navigation</DrawerTitle>
          <LogoIcon className="h-5" />

          <DrawerClose asChild>
            <Button
              variant="outline"
              size="icon"
              className="flex min-h-0 rounded-full border-gray-200 p-0 hover:bg-transparent hover:text-gray-800 focus:ring-0 focus-visible:ring-gray-300 focus-visible:ring-offset-0 sm:hidden dark:border-gray-800"
            >
              <XIcon className="size-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        {/* <DrawerFooter className="m-4 flex flex-col gap-0 rounded-xl border border-gray-200 p-0 dark:border-gray-800">
          {navItems.map((item) => {
            // 각 항목의 href 결정
            const itemHref =
              item.type === 'dropdown' ? item.contents?.href : item.href

            // href가 현재 경로와 일치하는지 확인
            const isActiveRoute = itemHref ? isActive(itemHref) : false

            return (
              <li
                key={item.key}
                className={cn(
                  'list-none border-b border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 last:border-b-0 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-800',
                  isActiveRoute &&
                    'text-foreground font-semibold dark:bg-gray-900'
                )}
              >
                {item.type === 'dropdown' ? (
                  <Link href={item.contents?.href ?? ''}>
                    {t(item.translationKey)}
                  </Link>
                ) : (
                  <Link href={item.href ?? ''}>{t(item.translationKey)}</Link>
                )}
              </li>
            )
          })}
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  )
}

export { MobileNavigationMenu }
