import React from 'react'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import _ from 'lodash'
import { useLocation, matchRoutes, Link } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import { routes } from '../../../router'
import styles from '../Home.module.scss'


function HomeAside() {
  const permission = useAppSelector((s) => s.users.infos.permission) as unknown[]
  const location = useLocation()
  const matchs = matchRoutes(routes, location)
  const subPatch = matchs![0].pathnameBase || ''
  const patch = matchs![1].pathnameBase || ''

  const menus = _.cloneDeep(routes).filter((v)=> {
    v.children = v.children?.filter((v)=> v.meta?.menu && permission?.includes(v.name))
    return v.meta?.menu && permission?.includes(v.name)
  })

  const items: MenuProps['items'] = menus.map((v1)=>{
    const children = v1.children?.map((v2)=>{
      return {
        key: v1.path! + v2.path!,
        label: <Link to={v1.path! + v2.path!}>{v2.meta?.title}</Link>,
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
      selectedKeys={[patch]}
      openKeys={[subPatch]}
      mode="inline"
      items={items}
      className={styles['home-aside']}
    />
  )
}

export default HomeAside