/*
 * @Author: czy0729
 * @Date: 2019-06-27 17:36:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-28 16:39:09
 */
import React from 'react'
import CUpload from '../Upload'
import Item from './Item'

const Upload = ({
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
    <CUpload {...other} />
  </Item>
)

export default Upload
