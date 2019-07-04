/*
 * @Author: czy0729
 * @Date: 2019-06-21 10:27:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-04 09:56:17
 */
import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { linkPrefix } from '@/constants'

export default class MyDocument extends Document {
  render() {
    return (
      <html lang='zh-CN'>
        <link
          rel='icon'
          type='image/x-icon'
          href={`${linkPrefix}/static/favicon.ico`}
        />
        <link
          rel='stylesheet'
          href='https://cdn.bootcss.com/antd/3.19.0/antd.min.css'
        />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
