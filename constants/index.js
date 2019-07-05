/*
 * @Author: czy0729
 * @Date: 2019-06-27 10:35:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-05 22:03:11
 */
import getConfig from 'next-server/config'

export const server = typeof window === 'undefined'

const { publicRuntimeConfig } = getConfig()
export const { linkPrefix } = publicRuntimeConfig

export const URL_LOGIN =
  'http://ms.litku.yzess.cn/login?forward=http://localhost:3000'
export const URL_API_HOST = 'http://api.sdb.yzess.cn'
export const URL_UPLOAD_SIGN = 'http://api.sdb.yzess.cn/upload/sign'
export const URL_UPLOAD_VERIFY = 'http://api.sdb.yzess.cn/upload/verify'

// 全局统一列表数据结构
export const LIST_EMPTY = {
  list: [],
  pagination: {
    page: 0,
    pageTotal: 0
  },
  _loaded: false
}
