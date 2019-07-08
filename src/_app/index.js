/* eslint-disable no-confusing-arrow */
/*
 * @Author: czy0729
 * @Date: 2019-06-25 15:44:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-06 09:48:30
 */
import React from 'react'
import NextApp, { Container } from 'next/app'
import { Provider, observer } from 'mobx-react'
import { LocaleProvider, Layout, Menu, Icon, Breadcrumb } from 'antd'
import Stores, { globalStore, uiStore, userStore } from '@/stores'
import { getQuery, routerPush } from '@/utils'
import { URL_LOGIN, server, linkPrefix } from '@/constants'
import locale from '@/constants/locale'
import '@/styles/reset.less'
import '@/styles/global.less'
import FormModal from './FormModal'
import styles from './index.less'

const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

const config = [
  {
    icon: 'bulb',
    text: '试灯',
    key: '/'
    // sub: [
    //   {
    //     text: '产品',
    //     key: '/product',
    //     hide: true
    //   }
    // ]
  },
  {
    icon: 'setting',
    text: '设置',
    key: '/setting',
    sub: [
      {
        text: '基本信息',
        key: '/setting/basic'
      },
      {
        text: '修改密码',
        key: '/setting/account/password'
      }
    ]
  }
]
const siderWidth = 112
const store = {
  globalStore,
  uiStore,
  userStore
}

export default
@observer
class App extends NextApp {
  state = {
    init: false
  }

  async componentDidMount() {
    await Stores.init()
    const token = getQuery('token')
    if (!token && !userStore.isLogin && !getQuery('f')) {
      window.location = URL_LOGIN
      return
    }

    if (token) {
      userStore.updateToken(token)
    }

    this.setState({
      init: true
    })
  }

  componentDidCatch() {}

  renderMenuItem(item) {
    const sub = (item.sub || []).filter(item => !item.hide)

    if (sub.length) {
      return (
        <SubMenu
          key={item.key}
          title={
            <span>
              {item.icon && <Icon type={item.icon} />}
              <span>{item.text}</span>
            </span>
          }
        >
          {sub.map(item => this.renderMenuItem(item))}
        </SubMenu>
      )
    }

    return (
      <Menu.Item key={item.key} onClick={() => routerPush(item.key)}>
        {item.icon && <Icon type={item.icon} />}
        <span>{item.text}</span>
      </Menu.Item>
    )
  }

  renderMenu() {
    const { router } = this.props
    return (
      <Sider className={styles.sider} width={siderWidth}>
        <div className={styles.logo}>
          <img
            className={styles.logoImg}
            src={`${linkPrefix}/static/images/logo.png`}
            alt=''
            onClick={() => routerPush('/')}
          />
        </div>
        {!server && (
          <Menu
            theme='dark'
            mode='vertical'
            defaultSelectedKeys={[router.asPath]}
          >
            {config.map(item => this.renderMenuItem(item))}
          </Menu>
        )}
      </Sider>
    )
  }

  renderBreadcrumb() {
    const { router } = this.props
    const data = []
    let current = ''
    let sub
    if (router.asPath === '/') {
      data.push(config[0])
    } else {
      router.asPath
        .replace(linkPrefix, '')
        .split('/')
        .filter(item => !!item)
        .forEach(item => {
          current += `/${item}`
          const find = (sub || config).find(item => item.key === current)
          if (find) {
            data.push(find)
            if (find.sub) {
              // eslint-disable-next-line prefer-destructuring
              sub = find.sub
            }
          }
        })
    }

    if (!data.length) {
      return null
    }

    return (
      <Breadcrumb className={styles.breadcrumb}>
        {data.map(item => (
          <Breadcrumb.Item key={item.key}>{item.text}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    )
  }

  render() {
    if (!userStore.isLogin) {
      return null
    }

    const { Component, pageProps } = this.props
    const { init } = this.state
    return (
      <Provider {...store}>
        <Layout>
          {this.renderMenu()}
          <Layout
            style={{
              marginLeft: siderWidth
            }}
          >
            <Header className={styles.hd}>{this.renderBreadcrumb()}</Header>
            <Content className={styles.content}>
              <Container>
                <LocaleProvider locale={locale}>
                  <div>
                    {/* 实际页面 */}
                    {init && <Component {...pageProps} />}
                    <FormModal />
                  </div>
                </LocaleProvider>
              </Container>
            </Content>
            <Footer className={styles.ft}>©2019 Created by</Footer>
          </Layout>
        </Layout>
      </Provider>
    )
  }
}
