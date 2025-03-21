import { Link } from 'react-router-dom'
import { Book, Menu } from 'lucide-react'

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
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

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
  { title: 'Courses', href: '/courses' }
]

export default function NavBar ({
  siteTitle = 'NUESA UNIUYO Library',
  // logo = <Book className='h-6 w-6' />,
  logo=<img src="/nuesa-logo.png" alt="NUESA UNIUYO Logo" className="w-10 h-10" />,

  ctaText = 'Login',
  ctaHref = '/auth/login'
}) {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-16 py-2 px-5'>
      <div className='/container flex h-16 items-center justify-center'>
        {/* Logo and site title */}
        <a href='/' className='flex items-center gap-2 mr-6'>
          {logo}
          <span className='/hidden font-bold sm:inline-block'>{siteTitle}</span>
        </a>

{/* I have hidden the desktop ad mobile navigation menu */}

        {/* SECTION - Desktop navigation */}
        <div className='hidden flex-1 justify-end /md:flex relative'>
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
                        <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] h-full right-0 /absolute'>
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
        {/* SECTION -Mobile menu */}
        <Sheet >
          <SheetTrigger asChild >
            <Button
              variant='outline'
              className=' hidden border-0 p-0 shadow-none bg-transparent'
            >
              {/* <Menu className='h-40 w-40' /> */}
              <img src='/menu.svg' alt='Hamburger menu' className='h-9 w-9' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='right'>
            <div className='flex flex-col gap-4 p-10 /py-15 px-6'>
              <Link
                href='/'
                className='flex items-center gap-2 text-lg font-semibold justfy-center w-full self-center'
              >
                {logo}
                {/* {siteTitle} */}
              </Link>
              <nav className='flex flex-col gap-3'>
                {navItems.map(item => (
                  <div key={item.title} className='space-y-3'>
                    <a
                      href={item.href}
                      className='text-base font-medium transition-colors hover:text-primary'
                    >
                      {item.title}
                    </a>
                    {item.children && (
                      <div className='ml-4 flex flex-col gap-2 pl-2 border-l'>
                        {item.children.map(child => (
                          <Link
                            key={child.title}
                            href={child.href}
                            className='text-sm text-muted-foreground transition-colors hover:text-primary'
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* Call to action */}
        {/* <div className="/ml-auto">
          <Button >
            <a href={ctaHref}>{ctaText}</a>
          </Button>
        </div> */}
      </div>
    </header>
  )
}
