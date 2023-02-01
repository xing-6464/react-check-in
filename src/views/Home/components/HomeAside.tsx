import React from 'react'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import _ from 'lodash'
import { useAppSelector } from '../../../store'

import { routes } from '../../../router'
import styles from '../Home.module.scss'


function HomeAside() {
  const permission = useAppSelector((s) => s.users.infos.permission) as unknown[]
  console.log(permission)

  const menus = _.cloneDeep(routes).filter((v)=> {
    v.children = v.children?.filter((v)=> v.meta?.menu && permission.includes(v.name))
    return v.meta?.menu && permission.includes(v.name)
  })
  

  const items: MenuProps['items'] = menus.map((v1)=>{
    const children = v1.children?.map((v2)=>{
      return {
        key: v1.path! + v2.path!,
        label: v2.meta?.title,
        icon: v2.meta?.icon
      }
    })
    return {
      key: v1.path!,
      label: v1.meta?.title,
      icon: v1.meta?.icon,
      children
    }
  })

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