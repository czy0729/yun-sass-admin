/*
 * @Author: czy0729
 * @Date: 2019-07-02 15:26:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-03 15:55:27
 */
import { observable } from 'mobx'
import { getTimestamp } from '@/utils'
import store from '@/utils/store'

const initFormModal = {
  key: 0,
  visible: false,
  title: '',
  width: 480,
  confirmLoading: false,
  onOk: Function.prototype,
  onCancel: Function.prototype,
  children: null
}

class UIStore extends store {
  @observable state = {
    formModal: initFormModal
  }

  showFormModal = arg => {
    this.setState({
      formModal: {
        key: getTimestamp(),
        visible: true,
        ...arg
      }
    })
  }

  closeFormModal = () => {
    this.setState({
      formModal: {
        visible: false
      }
    })

    setTimeout(() => {
      this.setState({
        formModal: initFormModal
      })
    }, 400)
  }

  loadingFormModal = () => {
    this.setState({
      formModal: {
        confirmLoading: true
      }
    })
  }
}

const Store = new UIStore()

export default Store
