import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './routers/router.jsx'
import { RouterProvider } from 'react-router-dom'
import ContextProvider from './Provider/ContextProvider.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ContextProvider>
  </React.StrictMode>,
)
