/*
 * @Author: czy0729
 * @Date: 2019-06-27 17:36:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-04 09:41:02
 */
import React from 'react'
import classNames from 'classnames'
import CUpload from '../Upload'
import Item from './Item'
import styles from './index.less'

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
    className={classNames(styles.upload, className)}
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
