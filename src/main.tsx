import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import './assets/styles/reset.scss'
import './assets/styles/iconfont.scss'
import './assets/styles/common.scss'
import router from './router'
import store from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </Suspense>
  </React.StrictMode>
)
