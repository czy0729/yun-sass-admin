/*
 * @Author: czy0729
 * @Date: 2019-07-04 16:21:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-08 12:25:34
 */
import isoFetch from 'isomorphic-unfetch'
import { Modal } from 'antd'
import { URL_LOGIN } from '@/constants'
import { urlStringify } from './index'

function fetch(url, query) {
  const { token } = require('@/stores/user').default.state

  return new Promise(async (resolve, reject) => {
    const data = await isoFetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: urlStringify({
        token: token.value,
        ...query
      })
    })
      .then(response => response.json())
      .catch(() => reject('网络错误，请联系管理员'))

    if (data.state === 1) {
      return resolve(data)
    }

    const content = data.message || data.content
    if (data.state === -3 || data.state === -5) {
      Modal.confirm({
        title: '温馨提示',
        content,
        onOk: () => {
          window.location = URL_LOGIN
        }
      })
      return reject(data.message || data.content)
    }

    if (data.state === 0) {
      Modal.error({
        title: '操作失败',
        content
      })
      return reject(data.message || data.content)
    }

    return reject(content)
  })
}

export default fetch
