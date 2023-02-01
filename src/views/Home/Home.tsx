import React from 'react'
import { Outlet } from 'react-router-dom'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
const { Header, Content, Sider } = Layout

import styles from './Home.module.scss'
import HomeAside from './components/HomeAside'
import HomeBreadcrumb from './components/HomeBreadcrumb'
import HomeHeader from './components/HomeHeader'
import HomeMain from './components/HomeMain'


export default function Home() {
  return (
    <>
      <Layout>
        <Header>
          <HomeHeader />
        </Header>
        <Layout>
          <Sider width={300} theme="light">
            <HomeAside />
          </Sider>
          <Layout style={{ padding: '20px' }}>
            <HomeBreadcrumb />
            <Content className={styles['home-main']}>
              <HomeMain />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  )
}
