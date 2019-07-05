/*
 * @Author: czy0729
 * @Date: 2019-06-27 14:45:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-05 10:51:49
 */
import React, { useState } from 'react'
import { Button as AntButton, Modal } from 'antd'
import Item from './Item'

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 19,
      offset: 5
    }
  }
}

const Button = ({ className, children, form, onSubmit, ...other }) => {
  const [loading, setLoading] = useState(false)
  return (
    <Item {...tailFormItemLayout}>
      <AntButton
        type='primary'
        loading={loading}
        onClick={async e => {
          setLoading(true)
          try {
            await form.onSubmit(onSubmit, e)
          } catch (ex) {
            Modal.error({
              title: '操作失败',
              content: ex
            })
          } finally {
            setLoading(false)
          }
        }}
        {...other}
      >
        {children || '提交'}
      </AntButton>
    </Item>
  )
}

Button.defaultProps = {
  onSubmit: Function.prototype
}

export default Button
