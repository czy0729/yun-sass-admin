/*
 * @Author: czy0729
 * @Date: 2019-07-03 17:33:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-04 09:35:25
 */
import React from 'react'
import Item from './Item'
import styles from './index.less'

const Text = ({
  className,
  children,
  form,
  label,
  name,
  initialValue,
  options,
  rules,
  right,
  extra,
  text,
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
  >
    <span className={styles.text} {...other}>
      {text}
    </span>
  </Item>
)

export default Text
