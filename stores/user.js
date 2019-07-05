/*
 * @Author: czy0729
 * @Date: 2019-07-04 14:21:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-04 15:28:19
 */
import { observable } from 'mobx'
import { getTimestamp } from '@/utils'
import store from '@/utils/store'

const namespace = 'UserStore'

class UserStore extends store {
  @observable state = {
    token: {
      value: ''
    }
  }

  init = async () => {
    const res = Promise.all([this.getStorage('token', namespace)])
    const state = await res
    this.setState({
      token: state[0] || {}
    })
    return res
  }

  get isLogin() {
    return !!this.state.token.value
  }

  updateToken = token => {
    const key = 'token'
    this.setState({
      [key]: {
        value: token,
        _loaded: getTimestamp()
      }
    })
    this.setStorage(key, undefined, namespace)
  }
}

export default new UserStore()
