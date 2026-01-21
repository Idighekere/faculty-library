import { ENVIRONMENT } from '@/config'
import React,{useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import { AlertTriangle, Home, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Error page component that displays when an error occurs
 *
 * @param {Object} props - Component props
 * @param {Error} props.error - The error that occurred
 * @param {Object} props.errorInfo - Additional error information
 * @param {Function} props.resetError - Function to reset the error state
 */

const ErrorPage = ({error,errorInfo,resetError}) => {

    //   const navigate = useNavigate()
    useEffect(() => {
    if (ENVIRONMENT.APP.ENV !== "production") {
      console.group("Error Details")
      console.error("Error:", error)
      console.error("Error Info:", errorInfo)
      console.groupEnd()
    }
  }, [error, errorInfo])

  const handleRetry=()=>{
    if(resetError){
        resetError()
    } else {
        window.location.reload()
    }
  }

  const handleGoHome = () => {
//   navigate('/')
window.location.href='/'
  if (resetError) resetError()
}

  return (
   <div className='min-h-screen flex items-center justify-center p-4 bg-muted/30'>
  <Card className='w-full max-w-md shadow-lg'>
    <CardHeader className='text-center pb-2'>
      <div className='flex justify-center mb-4'>
        <div className='bg-red-100 p-3 rounded-full'>
          <AlertTriangle className='h-10 w-10 text-red-600' />
        </div>
      </div>
      <CardTitle className='text-2xl font-bold'>Something went wrong</CardTitle>
      <CardDescription>
        We're sorry, but an error occurred while processing your request.
      </CardDescription>
    </CardHeader>

    <CardContent className='pb-2'>
      {/* Error message */}
      <div className='bg-muted p-3 rounded-md mb-4'>
        <p className='text-sm font-mono break-words'>
          {error?.message || 'An unexpected error occurred'}
        </p>
      </div>

      {/* Error tips */}
      <div className='space-y-2 text-sm text-muted-foreground'>
        <p>You can try:</p>
        <ul className='list-disc pl-5 space-y-1'>
          <li>Refreshing the page</li>
          <li>Checking your internet connection</li>
          <li>Going back to the home page</li>
          <li>Trying again later</li>
        </ul>
      </div>
    </CardContent>

    <CardFooter className='flex gap-2 pt-2'>
      <Button variant='outline' className='flex-1' onClick={handleRetry}>
        <RotateCcw className='mr-2 h-4 w-4' />
        Try Again
      </Button>
      <Button className='flex-1' onClick={handleGoHome}>
        <Home className='mr-2 h-4 w-4' />
        Go Home
      </Button>
    </CardFooter>
  </Card>
</div>

  )
}

export default ErrorPage
