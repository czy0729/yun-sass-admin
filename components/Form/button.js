/*
 * @Author: czy0729
 * @Date: 2019-06-27 14:45:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-27 16:53:26
 */
import React, { useState } from 'react'
import { Button as AntButton } from 'antd'
import Item from './item'

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 18,
      offset: 6
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
        onClick={async () => {
          setLoading(true)
          try {
            await form.onSubmit(form, onSubmit)
          } catch (e) {
            // do nothing
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
