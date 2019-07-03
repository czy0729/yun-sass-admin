/*
 * @Doc: https://ant.design/components/input-cn/
 * @Author: czy0729
 * @Date: 2019-06-27 11:22:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-03 16:04:53
 */
import React from 'react'
import { Input as AntInput } from 'antd'
import Item from './Item'
import styles from './index.less'

const Input = ({
  className,
  children,
  form,
  label,
  name,
  initialValue,
  options,
  rules,
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
    extra={extra}
    hasFeedback={hasFeedback}
  >
    <AntInput className={styles.input} placeholder={placeholder} {...other} />
  </Item>
)

Input.defaultProps = {
  hasFeedback: true,
  placeholder: '请输入'
}

export default Input
