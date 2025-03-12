import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { ErrorBoundary, HomeSharedLayout, ProtectedRoute } from './components'
import {
  Home,
  CoursesPage,
  BooksPage,
  RegisterPage,
  LoginPage,
  CustomErrorPage
} from './pages/unprotected'
import { ENVIRONMENT } from './config'
import {
  AuthProvider,
  BookSearchProvider,
  CourseSearchParamsProvider
} from './contexts'
import {
  DashboardBooksPage,
  DashboardCoursesPage,
  DashboardLayout,
  DashboardHome
} from '@/pages/protected'
import { Toaster } from 'react-hot-toast'
import { createAppRoutes } from './route'
import { AuthMiddleware } from './middlewares'



function RouterConfiguration () {
  const router = createBrowserRouter(createAppRoutes())
  return <RouterProvider router={router} />
}

function App () {
  return (
    <>
      <ErrorBoundary>
          <AuthProvider>
            {/* <AuthMiddleware> */}

           <RouterConfiguration />
            {/* </AuthMiddleware> */}
          </AuthProvider>
            <Toaster />
      </ErrorBoundary>
    </>
  )
}

export default App
