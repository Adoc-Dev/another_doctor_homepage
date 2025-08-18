import { NavigationMenuLink } from '@/src/shared/ui'

interface NavItemProps {
  href: string
  title: string
  description: string
}

function NavItem(props: NavItemProps) {
  const { href, title, description } = props

  return (
    <li className="flex cursor-pointer flex-col gap-1 rounded px-2 py-1 hover:bg-gray-100">
      <NavigationMenuLink
        href={href}
        title={title}
        className="text-body-01 p-0 font-medium hover:bg-transparent hover:text-gray-800 focus:bg-transparent focus:text-gray-800 data-[state=open]:bg-transparent data-[state=open]:text-gray-800 data-[state=open]:hover:bg-transparent data-[state=open]:hover:text-gray-800 data-[state=open]:focus:bg-transparent data-[state=open]:focus:text-gray-800"
      >
        {title}
      </NavigationMenuLink>
      <p className="text-body-03 text-gray-500">{description}</p>
    </li>
  )
}

export { NavItem }
