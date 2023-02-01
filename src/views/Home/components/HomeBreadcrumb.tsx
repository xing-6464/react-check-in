import React from 'react'
import { Breadcrumb } from 'antd'

import styles from '../Home.module.scss'


function HomeBreadcrumb() {
  return (
    <Breadcrumb className={styles['home-breadcrumb']}>
      <Breadcrumb.Item>
        Home
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        Application Center
      </Breadcrumb.Item>
  </Breadcrumb>
  )
}

export default HomeBreadcrumb