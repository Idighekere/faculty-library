import { AuthLayout, ErrorBoundary, HomeSharedLayout, ProtectedRoute } from './components'
import {
  Home,
  CoursesPage,
  BooksPage,
  RegisterPage,
  LoginPage,
  CustomErrorPage,
  ErrorPage,
  DepartmentsPage,
  DepartmentDetailPage,
  ContactPage,
  AboutPage,
  MaterialsArchivePage
} from './pages/unprotected'
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

export const createAppRoutes = () => [
  {
    path: '/',
    element: <HomeSharedLayout />,
    children: [
      { path: '/', element: <Home />, errorElement: <ErrorPage /> },
      {
        path: '/courses',
        element: (
          <CourseSearchParamsProvider>
            <CoursesPage />
          </CourseSearchParamsProvider>
        ),
        errorElement: <ErrorPage />
      },

      {
        path: '/books',
        element: (
          <BookSearchProvider>
            <BooksPage />
          </BookSearchProvider>
        ),
        errorElement: <ErrorPage />
      },
      {
        path: '/departments',
        element: <DepartmentsPage />,
        errorElement: <ErrorPage />
      },
      {
        path: '/departments/:slug',
        element: <DepartmentDetailPage />,
        errorElement: <ErrorPage />
      },
      {
        path: '/contact',
        element: <ContactPage />,
        errorElement: <ErrorPage />
      },
      {
        path: '/about',
        element: <AboutPage />,
        errorElement: <ErrorPage />
      },
      {
        path: '/materials',
        element: <MaterialsArchivePage />,
        errorElement: <ErrorPage />
      },
      {
        path: '/unauthorized',
        element: (
          <CustomErrorPage
            statusCode={401}
            title={'Unauthorized'}
            message={
              "You don't have enough permissions to access this resources"
            }
          />
        )
      },

    ]
  },
  {
        path:"/auth/",
        element:<AuthLayout/>,
        children:[

      {
        path: '/auth/login',
        element: <LoginPage />

      },
      {
        path: '/auth/register',
        element: <RegisterPage />
      }
        ]
      },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['admin', 'uploader']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,

    children: [
      {
        path: '/dashboard/',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'uploader']}>
            <DashboardHome />
          </ProtectedRoute>
        )
      },
      {
        path: 'books',
        element: (
          <ProtectedRoute allowedRoles={['admin', 'uploader']}>
            <DashboardBooksPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'courses',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardCoursesPage />{' '}
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '*',
    element: (
      <HomeSharedLayout>
        <CustomErrorPage />
      </HomeSharedLayout>
    ),
    errorElement: <ErrorPage />
  }
]
