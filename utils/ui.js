/*
 * @Author: czy0729
 * @Date: 2019-07-02 17:01:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-03 15:52:24
 */
import { Modal } from 'antd'
import UIStore from '@/stores/ui'

/**
 * https://ant.design/components/modal-cn/#components-modal-demo-confirm
 * @param {*} arg
 * @return {function}
 */
export function showModal(arg) {
  return Modal.confirm({
    icon: null,
    width: 480,
    ...arg
  })
}

/**
 * 显示全局表单Modal
 * @param {*} arg
 */
export function showFormModal(arg) {
  UIStore.showFormModal(arg)
}

/**
 * 隐藏全局表单Modal
 * @param {*} arg
 */
export function closeFormModal() {
  UIStore.closeFormModal()
}

/**
 * 设置全局表单Modal confirmLoading
 */
export function setFormModalLoading() {
  UIStore.setFormModalLoading()
}
