import {
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/src/shared/ui'
import { AnimatedThemeToggler } from '@/src/widgets/header/ui/animated-theme-toggler'
import { AppSidebar } from '@/src/widgets/nav/ui'
import { AppBreadcrumb } from '@/src/widgets/nav/ui/app-breadcrumb'

function AdminAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar className="border-r-gray-200" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <AppBreadcrumb />
          </div>
          <AnimatedThemeToggler className="mr-4 ml-auto cursor-pointer" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminAppLayout
