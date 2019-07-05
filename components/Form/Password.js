/*
 * @Author: czy0729
 * @Date: 2019-07-05 14:50:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-05 14:50:38
 */
import React from 'react'
import { Input as AntInput } from 'antd'
import Item from './Item'
import styles from './index.less'

const Password = ({
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
  hasFeedback,
  placeholder,
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
    hasFeedback={hasFeedback}
  >
    <AntInput.Password
      className={styles.input}
      placeholder={placeholder}
      {...other}
    />
  </Item>
)

Password.defaultProps = {
  hasFeedback: true,
  placeholder: '请输入'
}

export default Password
