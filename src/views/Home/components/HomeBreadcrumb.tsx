import React from 'react'
import { Breadcrumb } from 'antd'
import { useLocation, matchRoutes } from 'react-router-dom'

import styles from '../Home.module.scss'
import { routes } from '../../../router'


function HomeBreadcrumb() {
  const location = useLocation()
  const matchs = matchRoutes(routes, location)

  return (
    <Breadcrumb className={styles['home-breadcrumb']}>
      { matchs?.map(v => <Breadcrumb.Item key={v.pathnameBase}>{v.route.meta?.title}</Breadcrumb.Item>) }
  </Breadcrumb>
  )
}

export default HomeBreadcrumb