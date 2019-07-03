/*
 * @Author: czy0729
 * @Date: 2019-06-27 10:35:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-02 11:13:48
 */
import getConfig from 'next-server/config'

export const server = typeof window === 'undefined'

const { publicRuntimeConfig } = getConfig()
export const { linkPrefix } = publicRuntimeConfig

// 全局统一列表数据结构
export const LIST_EMPTY = {
  list: [],
  pagination: {
    page: 0,
    pageTotal: 0
  },
  _loaded: false
}
