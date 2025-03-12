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

export default function NavBar ({
  siteTitle = 'Faculty Library',
  logo = <Book className='h-6 w-6' />,
  navItems = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' },
    {
      title: 'Departments',
      href: '/departments',
      children: [
        {
          title: 'Computer Engineering',
          href: '/departments/computer-science',
          description: 'Software engineering, AI, and data science programs'
        },
        {
          title: 'Electrical Engineering',
          href: '/departments/electrical',
          description: 'Power systems, electronics, and telecommunications'
        },
        {
          title: 'Mechanical Engineering',
          href: '/departments/mechanical',
          description: 'Thermodynamics, mechanics, and manufacturing'
        }
        //complete the array
      ]
    },
    { title: 'Courses', href: '/courses' }
  ],
  ctaText = 'Login',
  ctaHref = '/auth/login'
}) {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-16 py-2 px-5'>
      <div className='/container flex h-16 items-center justify-between'>
        {/* Logo and site title */}
        <a href='/' className='flex items-center gap-2 mr-6'>
          {logo}
          <span className='/hidden font-bold sm:inline-block'>{siteTitle}</span>
        </a>

        {/* SECTION - Desktop navigation */}
        <div className='hidden flex-1 justify-center md:flex'>
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
        {/* SECTION -Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant='outline'
              className=' md:hidden border-0 p-0 shadow-none'
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
                className='flex items-center gap-2 text-lg font-semibold'
              >
                {logo}
                {siteTitle}
              </Link>
              <nav className='flex flex-col gap-3'>
                {navItems.map(item => (
                  <div key={item.title} className='space-y-3'>
                    <Link
                      href={item.href}
                      className='text-base font-medium transition-colors hover:text-primary'
                    >
                      {item.title}
                    </Link>
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
