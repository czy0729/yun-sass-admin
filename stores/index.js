/*
 * @Author: czy0729
 * @Date: 2019-07-02 10:29:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-04 15:20:41
 */
import { server } from '@/constants'
import globalStore from './global'
import uiStore from './ui'
import userStore from './user'

class Stores {
  /**
   * 保证所有子Store初始化和加载缓存
   */
  init = async () => Promise.all([userStore.init()])

  // -------------------- page --------------------
  /**
   * 添加页面Store
   * @param {*} key
   * @param {*} store
   */
  add(key, store) {
    if (!this[key]) {
      this[key] = store
    }
  }

  /**
   * 获取页面Store
   * @param {*} key
   */
  get(key) {
    return this[key]
  }
}

export { globalStore, uiStore, userStore }
export default new Stores()

if (!server) {
  setTimeout(() => {
    window.Stores = { globalStore, uiStore, userStore }
  }, 1000)
}
