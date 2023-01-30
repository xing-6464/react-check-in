import React from 'react'
import classNames from 'classnames'
import { Dropdown, Badge, Space, Avatar } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

import styles from '../Home.module.scss'

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <div>暂无消息</div>
    )
  }
]

const items2: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <div>个人中心</div>
    )
  },
  {
    key: '2',
    label: (
      <div>退出</div>
    )
  }
]


function HomeHeader() {
  return (
    <div className={styles['home-header']}>
      <span className={styles['home-header-logo']}>
        <i className={classNames('iconfont icon-react', styles['icon-react'])}></i>
        <i className={classNames('iconfont icon-icon-test', styles['icon-icon-test'])}></i>
        <i className={classNames('iconfont icon-typescript', styles['icon-typescript'])}></i>
      </span>
      <span className={styles['home-header-title']}>在线考勤系统</span>
      <Dropdown menu={{ items: items }} arrow placement='bottom'>
        <Badge dot>
          <BellOutlined style={{ fontSize: 20 }}/>
        </Badge>
      </Dropdown>
      <Dropdown menu={{ items: items2 }} arrow placement='bottom'>
        <Space className={styles['home-header-space']}>
          <Avatar src="http://api.h5ke.top/uploads/62632f3f674b1e20c841aae2.png" />
        </Space>
      </Dropdown>
    </div>
  )
}

export default HomeHeader