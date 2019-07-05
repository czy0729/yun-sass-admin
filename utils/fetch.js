/*
 * @Author: czy0729
 * @Date: 2019-07-04 16:21:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-05 15:45:27
 */
import isoFetch from 'isomorphic-unfetch'
import { Modal } from 'antd'
import { URL_LOGIN } from '@/constants'
import { urlStringify } from './index'

function fetch(url, data) {
  const { token } = require('@/stores/user').default.state
  return isoFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: urlStringify({
      token: token.value,
      ...data
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.state === -3 || data.state === -5) {
        Modal.confirm({
          title: '温馨提示',
          content: data.message,
          onOk: () => {
            window.location = URL_LOGIN
          }
        })
      }
      return data
    })
    .catch(() => Promise.reject('网络错误，请联系管理员'))
}

export default fetch
