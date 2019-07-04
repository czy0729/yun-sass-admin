/*
 * @Author: czy0729
 * @Date: 2019-07-02 14:43:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-03 18:06:00
 */
import React from 'react'
import { Select as AntSelect } from 'antd'
import Item from './Item'
import styles from './index.less'

const { Option } = AntSelect

const Select = ({
  className,
  children,
  form,
  label,
  name,
  initialValue,
  right,
  extra,
  options,
  rules,
  data,
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
    hasFeedback
  >
    <AntSelect className={styles.select} placeholder={placeholder} {...other}>
      {data.map(item => (
        <Option key={item.value}>{item.text}</Option>
      ))}
    </AntSelect>
  </Item>
)

Select.defaultProps = {
  data: [],
  placeholder: '请选择'
}

export default Select
