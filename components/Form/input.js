/*
 * @Doc: https://ant.design/components/input-cn/
 * @Author: czy0729
 * @Date: 2019-06-27 11:22:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-29 14:30:25
 */
import React from 'react'
import { Input as AntInput } from 'antd'
import Item from './Item'

const Input = ({
  className,
  children,
  form,
  label,
  name,
  initialValue,
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
    hasFeedback
  >
    <AntInput {...other} />
  </Item>
)

export default Input
