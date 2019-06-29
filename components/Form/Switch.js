/*
 * @Doc: https://ant.design/components/switch-cn/
 * @Author: czy0729
 * @Date: 2019-06-29 14:03:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-29 14:06:31
 */
import React from 'react'
import { Switch as AntSwitch } from 'antd'
import Item from './Item'

const Switch = ({
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
    <AntSwitch {...other} />
  </Item>
)

export default Switch
