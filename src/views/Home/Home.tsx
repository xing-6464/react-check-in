import React from 'react'
import { Outlet } from 'react-router-dom'

import styles from './Home.module.scss'


export default function Home() {
  return (
    <>
      <div>Home</div>
      <Outlet />
    </>
  )
}
