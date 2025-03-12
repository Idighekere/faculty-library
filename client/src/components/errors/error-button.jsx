import { useState } from 'react'
import { Button } from '../ui'

/**
 * Test component that throws an error when clicked
 * Useful for testing error boundaries
 */

const ErrorButton = ({message='Test error',...props}) => {
const [shouldThrow, setShouldThrow] = useState(false)
 if (shouldThrow) {
    throw new Error(message)
  }


    return (
<Button variant='destructive' onClick={() => setShouldThrow(true)} {...props}>
  Trigger Error
</Button>

  )
}

export default ErrorButton
