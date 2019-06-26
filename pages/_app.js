/* eslint-disable no-confusing-arrow */
/*
 * @Author: czy0729
 * @Date: 2019-06-25 15:44:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-26 20:02:45
 */
import React from 'react'
import NextApp, { Container } from 'next/app'
import Router from 'next/router'
import getConfig from 'next-server/config'
import { Layout, Menu, Icon, Breadcrumb } from 'antd'
import '@/styles/reset.less'
import '@/styles/global.less'
import styles from './_app.less'

const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

const { publicRuntimeConfig } = getConfig()
const { linkPrefix } = publicRuntimeConfig
const config = [
  {
    icon: 'bulb',
    text: '试灯',
    key: '/render'
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
        text: '账号设置',
        key: '/setting/account',
        sub: [
          {
            text: '账号信息',
            key: '/setting/account/info'
          },
          {
            text: '修改密码',
            key: '/setting/account/password'
          },
          {
            text: '登陆日志',
            key: '/setting/account/logs'
          }
        ]
      }
    ]
  }
]
const siderWidth = 112
const dev = process.env.NODE_ENV === 'production'

export default class App extends NextApp {
  componentDidCatch() {}

  push = path => {
    Router.push(path, `${linkPrefix}${path}`)
  }

  renderMenuItem(item) {
    if (item.sub) {
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
          {item.sub.map(item => this.renderMenuItem(item))}
        </SubMenu>
      )
    }

    return (
      <Menu.Item key={item.key} onClick={() => this.push(item.key)}>
        {item.icon && <Icon type={item.icon} />}
        <span>{item.text}</span>
      </Menu.Item>
    )
  }

  renderMenu() {
    // @todo
    if (dev) {
      return null
    }

    const { router } = this.props
    return (
      <Sider className={styles.sider} width={siderWidth}>
        <div className={styles.logo}>
          <img
            className={styles.logoImg}
            src='/static/images/logo.png'
            alt=''
            onClick={() => this.push('/')}
          />
        </div>
        <Menu
          theme='dark'
          mode='vertical'
          defaultSelectedKeys={[router.asPath]}
        >
          {config.map(item => this.renderMenuItem(item))}
        </Menu>
      </Sider>
    )
  }

  renderBreadcrumb() {
    const { router } = this.props
    const data = []
    let current = ''
    let sub
    router.asPath
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

  renderMain() {
    const { Component, pageProps } = this.props
    return (
      <Layout
        style={{
          marginLeft: siderWidth
        }}
      >
        <Header className={styles.hd}>{this.renderBreadcrumb()}</Header>
        <Content className={styles.content}>
          {/* 实际页面 */}
          <Container>
            <Component {...pageProps} />
          </Container>
        </Content>
        <Footer className={styles.ft}>
          Ant Design ©2019 Created by Ant UED
        </Footer>
      </Layout>
    )
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Layout>
        {this.renderMenu()}
        <Layout
          style={{
            marginLeft: siderWidth
          }}
        >
          <Header className={styles.hd}>{this.renderBreadcrumb()}</Header>
          <Content className={styles.content}>
            {/* 实际页面 */}
            <Container>
              <Component {...pageProps} />
            </Container>
          </Content>
          <Footer className={styles.ft}>©2019 Created by</Footer>
        </Layout>
      </Layout>
    )
  }
}
