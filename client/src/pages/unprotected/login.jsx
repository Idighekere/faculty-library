import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Book, AlertCircle } from 'lucide-react'
import { useAuth } from '@/contexts'
import { useMutation, useQuery } from '@tanstack/react-query'
import { authApi, getCurrentUserQueryOptions } from '@/services'
import toast from 'react-hot-toast'

function LoginPage () {
  const navigate = useNavigate()
  //  const {  setUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  // const {
  //   refetch:fetchUser,
  //   data:userData
  // } = useQuery({...getCurrentUserQueryOptions(),enabled:false})

  const {
    mutateAsync: loginMutation,
    error,
    isPending
  } = useMutation({
    mutationFn: async data => await authApi.login(data),
    onSuccess: data => {
      // fetchUser()
      //console.log(data)
      // setUser(data?.data?.user)

      toast.success('Login successful. ')
      window.location.href = '/dashboard'
    },
    onError: err => {
      // toast.error(err.response.data.message)
      console.error(err)
    }
  })

  const onSubmit = async data => {
    await loginMutation(data)
  }

  // if(error){
  //   console.log(error)
  //   return<div>Error</div>
  // }

  return (
    <div className='/container flex items-center justify-center /min-h-screen py-12 px-5 md:px-12 lg:px-16'>
      <Card className='w-full max-w-md border-0 shadow-none'>
        <CardHeader className='space-y-1'>
          <div className='flex items-center justify-center mb-6'>
            <Book className='h-12 w-12 text-primary' />
          </div>
          <CardTitle className='text-2xl font-bold text-center'>
            Login to your account
          </CardTitle>
          <CardDescription className='text-center px-0'>
            Enter your email and password to add books
          </CardDescription>
        </CardHeader>
        <CardContent className='px-0'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            {error?.response?.data?.message && (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertDescription>
                  {error?.response?.data?.message}
                </AlertDescription>
              </Alert>
            )}

            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='your.email@example.com'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className={`${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <p className='text-sm text-red-500'>{errors.email.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='password'>Password</Label>
                <Link
                  to='/forgot-password'
                  className='text-sm text-primary hover:underline'
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id='password'
                type='password'
                placeholder='Enter password'
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                className={`${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && (
                <p className='text-sm text-red-500'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type='submit'
              className='w-full'
              disabled={isPending || !Object.keys(errors).length == 0}
            >
              {isPending ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className='flex flex-col'>
          <div className='text-center text-sm text-muted-foreground'>
            Don't have an account?{' '}
            <Link to='/auth/register' className='text-primary hover:underline'>
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginPage
