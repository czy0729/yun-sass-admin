/*
 * @Author: czy0729
 * @Date: 2019-06-27 14:45:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-29 11:42:12
 */
import React, { useState } from 'react'
import { Button as AntButton } from 'antd'
import Item from './Item'

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
        onClick={async e => {
          setLoading(true)
          try {
            await form.onSubmit(onSubmit, e)
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
