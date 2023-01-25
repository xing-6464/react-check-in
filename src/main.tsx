import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import App from './App'
import './assets/styles/reset.scss'
import './assets/styles/iconfont.scss'
import './assets/styles/common.scss'
import router from './router'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  </React.StrictMode>,
)
