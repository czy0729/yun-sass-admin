/*
 * @Author: czy0729
 * @Date: 2019-06-29 14:09:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-03 18:05:34
 */
import React from 'react'
import { InputNumber as AntInputNumber } from 'antd'
import Item from './Item'

const InputNumber = ({
  // Form.Item
  className,
  children,
  form,
  label,
  name,
  initialValue,
  right,
  extra,

  // InputNumber
  min = 0,
  placeholder,

  // form
  options,
  rules,
  ...other
}) => (
  <Item
    className={className}
    form={form}
    label={label}
    name={name}
    initialValue={initialValue}
    options={options}
    rules={rules}
    right={right}
    extra={extra}
    hasFeedback
  >
    <AntInputNumber
      min={min}
      style={{ width: 128 }}
      placeholder={placeholder}
      {...other}
    />
  </Item>
)

InputNumber.defaultProps = {
  placeholder: '请输入'
}

export default InputNumber
