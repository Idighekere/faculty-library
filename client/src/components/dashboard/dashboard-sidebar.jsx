import { NavLink } from 'react-router-dom'
import { Book, BookOpen, X, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent } from '@/components/ui/sheet'

function DashboardSidebar ({ user, open, onClose }) {
  const isAdmin = user.role === 'admin'

  const navItems = [
    {
      title: 'Home',
      href: '/dashboard',
      icon: Home
    },
    {
      title: 'Books',
      href: '/dashboard/books',
      icon: Book
      // Books are available to both admin and uploader
    },
    {
      title: 'Courses',
      href: '/dashboard/courses',
      icon: BookOpen,
      // Courses are only available to admin
      adminOnly: true
    }
  ]

  const pathname = location.pathname

  // Filter items based on user role
  const filteredNavItems = navItems.filter(
    item => !item.adminOnly || (item.adminOnly && isAdmin)
  )

  const SidebarContent = () => (
    <>
      <div className='flex h-20 items-center border-b px-4 '>
        <div className='flex items-center gap-2 font-semibold'>
          <BookOpen className='h-6 w-6' />
          <span>NUESA Library Dasboard</span>
        </div>
        <Button
          variant='ghost'
          size='icon'
          className='ml-auto md:hidden'
          onClick={onClose}
        >
          {/* <X className='h-5 w-5' /> */}
          <span className='sr-only'>Close</span>
        </Button>
      </div>
      <ScrollArea className='flex-1 px-2'>
        <nav className='grid gap-1 py-2'>
          {filteredNavItems.map(item => (
            <NavLink
              key={item.title}
              to={item.href}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                pathname == item.href
                  ? 'bg-accent text-accent-foreground'
                  : 'transparent'
              }`}
              onClick={() => onClose()}
            >
              <item.icon className='h-4 w-4' />
              {item.title}
            </NavLink>
          ))}
        </nav>
      </ScrollArea>
    </>
  )

  return (
    <>
      {/* Mobile sidebar (Sheet) */}
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side='left' className='p-0 w-6/7'>
          <div className='flex h-full flex-col'>
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className='hidden md:flex h-full w-[240px] flex-col border-r bg-background'>
        <SidebarContent />
      </div>
    </>
  )
}

export default DashboardSidebar
