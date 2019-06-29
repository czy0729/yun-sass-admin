/*
 * @Author: czy0729
 * @Date: 2019-06-29 14:09:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-29 14:54:17
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
  extra,

  // InputNumber
  min = 0,

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
    extra={extra}
    hasFeedback
  >
    <AntInputNumber min={min} style={{ width: 128 }} {...other} />
  </Item>
)

export default InputNumber
