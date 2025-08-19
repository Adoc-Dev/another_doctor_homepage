import { NavigationMenuLink } from '@/src/shared/ui'

interface NavItemProps {
  href: string
  title: string
  description: string
}

function NavItem(props: NavItemProps) {
  const { href, title, description } = props

  return (
    <li className="flex cursor-pointer flex-col gap-1 rounded px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800">
      <NavigationMenuLink
        href={href}
        title={title}
        className="text-body-01 data-[state=open]:text-foreground data-[state=open]:hover:text-foreground data-[state=open]:focus:text-foreground p-0 font-medium hover:bg-transparent hover:text-gray-800 focus:bg-transparent focus:text-gray-800 data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent dark:hover:text-gray-200 dark:focus:text-gray-200"
      >
        {title}
      </NavigationMenuLink>
      <p className="text-body-03 text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </li>
  )
}

export { NavItem }
