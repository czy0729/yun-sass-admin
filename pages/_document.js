/*
 * @Author: czy0729
 * @Date: 2019-06-21 10:27:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-25 18:11:27
 */
import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html lang='zh-CN'>
        <link rel='stylesheet' href='/static/css/antd.min.css' />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
