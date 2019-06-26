/*
 * @Author: czy0729
 * @Date: 2019-06-21 10:22:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-26 18:43:09
 */
const withLess = require('@zeit/next-less')

const config = {
  assetPrefix:
    process.env.NODE_ENV === 'production' ? '/yun-sass-admin/out' : '',
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
