import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import styles from '../Home.module.scss'


function HomeMain() {
  return (
    <div>
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default HomeMain