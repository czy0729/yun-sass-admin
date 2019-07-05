/*
 * @Author: czy0729
 * @Date: 2019-07-02 16:12:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-03 15:53:19
 */
import React from 'react'
import { observer, inject } from 'mobx-react'
import { Modal } from 'antd'
import Form from '@/components/Form'
import styles from './index.less'

const FormModal = ({ form, uiStore }) => {
  const {
    key,
    visible,
    title,
    width,
    confirmLoading,
    children,
    onOk,
    onCancel
  } = uiStore.state.formModal
  return (
    <Modal
      key={key}
      wrapClassName={styles.formModal}
      visible={visible}
      title={title}
      width={width}
      confirmLoading={confirmLoading}
      closable={false}
      maskClosable={false}
      onOk={e => form.onSubmit(onOk, e)}
      onCancel={() => {
        onCancel()
        uiStore.closeFormModal()
      }}
    >
      {React.Children.map(children, (item, index) => {
        // 不是React.Element直接返回
        if (!React.isValidElement(item)) {
          return item
        }

        return React.cloneElement(item, {
          // eslint-disable-next-line react/no-array-index-key
          key: index,
          form
        })
      })}
    </Modal>
  )
}

export default inject('uiStore')(Form.create(observer(FormModal)))
