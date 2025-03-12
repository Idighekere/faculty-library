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


//   const { isLoading, isFetching,data:userData } = useQuery({
//   ...getCurrentUserQueryOptions(),
//       // select: (data) => data.data,
//   onSuccess: data => {
//     // setUser(data?.data.user)
//     stateContext.dispatch({type:'SET_USER',payload:userData?.data})
//     console.log(data)
//   }
// })

// const {
//     isLoading,
//     isFetching,
//     data: userData,
//   } = useQuery({queryKey:['authUser'],queryFn: authApi.getCurrentUser,
//     retry: 1,
//     select: (data) => data.data,
//     onSuccess: (data) => {
//       console.log(data)
//       stateContext.dispatch({ type: 'SET_USER', payload: data });
//     },
//   });

  // useEffect(() => {
  //   if (userData) {
  //     console.log('User loaded successfully');
  //     console.log(userData)
  //   } else {
  //     console.log('User not loaded');
  //   }
  // }, [userData]);

// const user=userData
// console.log(userData)

  // Show loading state while checking authentication
  if (loading) {
    return <Preloader fullScreen message='Loading...' />
  }

  // If not authenticated, redirect to login

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
