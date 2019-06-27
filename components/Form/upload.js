/*
 * @Author: czy0729
 * @Date: 2019-06-27 17:36:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-27 18:37:49
 */
import React from 'react'
import Upload from '../Upload'
import Item from './item'

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
  >
    <Upload {...other} />
  </Item>
)

export default Input
