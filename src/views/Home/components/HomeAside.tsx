import React from 'react'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'

import styles from '../Home.module.scss'


const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Navigation One',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: '2',
        label: '111',
        icon: <MailOutlined />
      },
      {
        key: '3',
        label: '2222',
        icon: <SettingOutlined />
      }
    ]
  }
]

function HomeAside() {
  return (
    <Menu
      defaultSelectedKeys={['2']}
      defaultOpenKeys={['1']}
      mode="inline"
      items={items}
      className={styles['home-aside']}
    />
  )
}

export default HomeAside