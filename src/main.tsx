import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import App from './App'
import './assets/styles/reset.scss'
import './assets/styles/iconfont.scss'
import './assets/styles/common.scss'
import router from './router'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
