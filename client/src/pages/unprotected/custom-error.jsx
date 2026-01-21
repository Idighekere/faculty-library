import { Button } from '@/components/ui/button'
import { FileQuestion, Home } from 'lucide-react'

export default function CustomErrorPage ({
  statusCode = 404,
  title = 'Page Not Found',
  message = " We couldn't find the page you're looking for. It might have been removed, renamed, or didn't exist in the first place."
}) {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4 bg-muted/30'>
      <div className='text-center max-w-md'>
        <div className='flex justify-center mb-6'>
          <div className='bg-primary/10 p-6 rounded-full'>
            <FileQuestion className='h-16 w-16 text-primary' />
          </div>
        </div>

        <h1 className='text-4xl font-bold mb-2'>{statusCode}</h1>
        <h2 className='text-2xl font-semibold mb-4'>{title}</h2>

        <p className='text-muted-foreground mb-8'>{message}</p>

        <Button asChild size='lg'>
          <a href='/'>
            <Home className='mr-2 h-4 w-4' />
            Back to Home
          </a>
        </Button>
      </div>

      {/* Decorative elements */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute left-0 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl'></div>
        <div className='absolute right-0 bottom-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl'></div>
      </div>
    </div>
  )
}
