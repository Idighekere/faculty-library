import { Menu, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/services'
import toast from 'react-hot-toast'

function DashboardHeader ({ user, onMenuClick }) {
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutateAsync: logoutMutation } = useMutation({
    mutationFn: async () => await authApi.logout(),
    onSuccess: () => {
      // setUser(null)
      queryClient.setQueryData(['currentUser'], null)
      toast.success('Logging out successful. ')

      navigate('/auth/login')
    },
    onError: err => {
      toast.error(err.response.data.message)
      console.error(err)
    }
  })

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname
    if (path.includes('/dashboard/books')) return 'Books Management'
    if (path.includes('/dashboard/courses')) return 'Courses Management'
    return 'Dashboard'
  }

  const handleLogout = async () => {
    await logoutMutation()
    console.log('Logging out...')
    // navigate("/login")
  }

  return (
    <header className='sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
      <Button
        variant='outline'
        size='icon'
        className='md:hidden'
        onClick={onMenuClick}
      >
        <Menu className='h-7 w-7' />
        <span className='sr-only'>Toggle menu</span>
      </Button>

      <h1 className='text-xl font-semibold'>{getPageTitle()}</h1>

      <div className='ml-auto flex items-center gap-2'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* <Button variant='ghost' className='relative h-9 w-9 rounded-full hover:bg-transparent'> */}
              <Avatar className='h-9 w-9 border-2 font-bold'>
                {/* <AvatarImage src={user.avatarUrl} alt={user.name} /> */}
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
            {/* </Button> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex items-center'>
              <div>
                <p>{user?.name}</p>
                <p className='text-xs text-muted-foreground'>{user?.email}</p>
                <p className='text-xs text-muted-foreground capitalize'>
                  Role: {user.role}
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className='text-red-500 cursor-pointer'
            >
              <LogOut className='mr-2 h-4 w-4' />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default DashboardHeader
