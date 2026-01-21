import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Book, Menu, X, ChevronDown, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

const navItems = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
  {
    title: 'Departments',
    href: '/departments',
    children: [
      {
        title: 'Agricultural Engineering',
        href: '/departments/agricultural-engineering',
        description: 'Applies engineering principles to agricultural production, processing, and sustainability challenges.'
      },
      {
        title: 'Chemical Engineering',
        href: '/departments/chemical-engineering',
        description: 'Focuses on designing and developing chemical processes and equipment to transform raw materials into valuable products.'
      },
      {
        title: 'Civil Engineering',
        href: '/departments/civil-engineering',
        description: 'Deals with the design, construction, and maintenance of the physical and naturally built environment.'
      },
      {
        title: 'Computer Engineering',
        href: '/departments/computer-engineering',
        description: 'Combines electrical engineering and computer science to develop computer hardware and software systems.'
      },
      {
        title: 'Electrical/Electronic Engineering',
        href: '/departments/electrical-electronic-engineering',
        description: 'Focuses on electrical systems, electronic devices, and electromagnetic applications for power generation and transmission.'
      },
      {
        title: 'Food Engineering',
        href: '/departments/food-engineering',
        description: 'Applies engineering principles to food production, processing, preservation, and packaging systems.'
      },
      {
        title: 'Mechanical Engineering',
        href: '/departments/mechanical-engineering',
        description: 'Involves designing, analyzing, and manufacturing mechanical systems and thermal devices.'
      },
      {
        title: 'Petroleum Engineering',
        href: '/departments/petroleum-engineering',
        description: 'Specializes in the exploration, extraction, and production of oil, gas, and other resources from the earth.'
      }
    ]
  },
  { title: 'Materials Archive', href: '/materials' }
]

export default function NavBar ({
  siteTitle = 'UNIUYO Engineering Library',
  logo=<img src="/nuesa-logo.png" alt="NUESA UNIUYO Logo" className="w-10 h-10" />,
  ctaText = 'Login',
  ctaHref = '/auth/login'
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [openCollapsible, setOpenCollapsible] = useState('')

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-16 py-2 px-5'>
      <div className='flex h-16 items-center justify-between'>
        {/* Logo and site title */}
        <a href='/' className='flex items-center gap-2'>
          <span className='font-bold text-sm sm:text-base truncate max-w-[200px] sm:max-w-none'>{siteTitle}</span>
        </a>

        {/* Desktop navigation */}
        <div className='hidden md:flex flex-1 justify-end'>
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map(item => {
                // If the item has children, render a dropdown
                if (item.children) {
                  return (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuTrigger>
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                          {item.children.map(child => (
                            <li key={child.title}>
                              <NavigationMenuLink asChild>
                                <a
                                  href={child.href}
                                  className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                                >
                                  <div className='text-sm font-medium leading-none'>
                                    {child.title}
                                  </div>
                                  {child.description && (
                                    <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                                      {child.description}
                                    </p>
                                  )}
                                </a>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )
                }

                // Otherwise render a simple link
                return (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      asChild
                    >
                      <a href={item.href}>{item.title}</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden'
            >
              <Menu className='h-6 w-6' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='right' className='w-[300px] sm:w-[350px]'>
            <div className='flex flex-col gap-6 pt-6'>
              <a
                href='/'
                className='flex items-center gap-2 text-lg font-semibold'
                onClick={() => setIsOpen(false)}
              >
                {logo}
                <span className='text-sm'>NUESA Library</span>
              </a>
              
              <nav className='flex flex-col gap-2'>
                {navItems.map(item => (
                  <div key={item.title}>
                    {item.children ? (
                      <Collapsible
                        open={openCollapsible === item.title}
                        onOpenChange={(open) => setOpenCollapsible(open ? item.title : '')}
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant='ghost'
                            className='w-full justify-between font-medium'
                          >
                            {item.title}
                            <ChevronDown 
                              className={`h-4 w-4 transition-transform ${
                                openCollapsible === item.title ? 'rotate-180' : ''
                              }`} 
                            />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className='pl-4 pt-2 pb-2'>
                          <div className='flex flex-col gap-1 border-l pl-4'>
                            <a
                              href={item.href}
                              className='py-2 text-sm font-medium text-primary hover:underline'
                              onClick={() => setIsOpen(false)}
                            >
                              View All Departments
                            </a>
                            {item.children.map(child => (
                              <a
                                key={child.title}
                                href={child.href}
                                className='py-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
                                onClick={() => setIsOpen(false)}
                              >
                                {child.title}
                              </a>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <a
                        href={item.href}
                        className='flex items-center py-2 px-4 text-base font-medium hover:bg-accent rounded-md transition-colors'
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </a>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
