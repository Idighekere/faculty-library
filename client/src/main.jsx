import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ENVIRONMENT } from '@/config'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


import App from './App.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      cacheTime: 1000 * 60 * 30, // Cache data for 30 minutes
      retry: 1
    }
  }
})
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {ENVIRONMENT.APP.ENV === 'development' && <ReactQueryDevtools />}
    <App />
    </QueryClientProvider>
  </StrictMode>,
)
