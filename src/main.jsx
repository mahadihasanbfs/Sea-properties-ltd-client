import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './routers/router.jsx'
import { RouterProvider } from 'react-router-dom'
import ContextProvider from './Provider/ContextProvider.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
