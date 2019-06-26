/*
 * @Author: czy0729
 * @Date: 2019-06-21 10:27:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-26 19:47:49
 */
import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import getConfig from 'next-server/config'

const { publicRuntimeConfig } = getConfig()
const { linkPrefix } = publicRuntimeConfig

export default class MyDocument extends Document {
  render() {
    return (
      <html lang='zh-CN'>
        <link rel='icon' type='image/x-icon' href={`${linkPrefix}/static/favicon.ico`} />
        <link rel='stylesheet' href={`${linkPrefix}/static/css/antd.min.css`} />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
