/*
 * @Author: czy0729
 * @Date: 2019-06-21 10:22:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-24 11:17:13
 */
const withLess = require('@zeit/next-less')

const isProduction = process.env.NODE_ENV === 'production'
const prefix = '/yun-sass-admin/out'
// const prefix = ''
const config = {
  assetPrefix: isProduction ? prefix : '',
  publicRuntimeConfig: {
    linkPrefix: isProduction ? prefix : ''
  },

  exportPathMap(defaultPathMap) {
    return defaultPathMap
  },

  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]__[hash:base64:4]'
  }
}

const isProd = process.env.NODE_ENV === 'production'
if (isProd) {
  config.distDir = 'build'
}

module.exports = withLess(config)
