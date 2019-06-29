/*
 * @Author: czy0729
 * @Date: 2019-06-28 16:29:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-28 16:39:24
 */
import React from 'react'
import CUploadFile from '../UploadFile'
import Item from './Item'

const UploadFile = ({
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
    <CUploadFile {...other} />
  </Item>
)

export default UploadFile
