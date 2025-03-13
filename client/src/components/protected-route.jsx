import { useAuth } from '@/contexts'
import { Navigate, useLocation,Outlet
 } from 'react-router-dom'
import Preloader from './ui/preloader'
import { authApi, getCurrentUserQueryOptions } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

const ProtectedRoute = ({
  redirectPath = '/auth/login',
  children,
  allowedRoles = []
}) => {
  // const { setUser, isAuthenticated, user } = useAuth()
  const {loading,user} = useAuth()

  const location = useLocation()

  // Show loading state while checking authentication
  if (loading) {
    return <Preloader fullScreen message='Loading...' />
  }

  // If not authenticated, redirect to login

  if(user && window.location.pathname=="/auth/login"){
    return <Navigate to='/dashboard
    ' replace />
  }
  if(user && (allowedRoles && allowedRoles.includes(user?.role))) {
    // return <Outlet/>
    return children
  } else if (user == null || (allowedRoles && !allowedRoles.includes(user.role))) {
    return <Navigate to='/unauthorized' replace />
    // return <div>Unauthorized</div>
  }
  else{
    return <Navigate to={redirectPath} state={{ from: location }} replace />
  }

  // return children
}

export default ProtectedRoute
