import { NavigationMenuLink } from '@/src/shared/ui'

interface NavItemProps {
  href: string
  title: string
  description: string
}

function NavItem(props: NavItemProps) {
  const { href, title, description } = props

  return (
    <NavigationMenuLink
      href={href}
      title={title}
      className="flex w-[200px] flex-col gap-1 rounded-md px-2 py-1 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 data-[active=true]:text-gray-800 data-[active=true]:focus:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:focus:bg-gray-800 dark:data-[active=true]:focus:bg-gray-800"
    >
      <p className="text-body-01 font-semibold">{title}</p>
      <p className="text-body-02 text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </NavigationMenuLink>
  )
}

export { NavItem }
