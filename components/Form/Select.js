/*
 * @Author: czy0729
 * @Date: 2019-07-02 14:43:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-03 15:41:16
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
  extra,
  options,
  rules,
  data,
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
    hasFeedback
  >
    <AntSelect className={styles.select} {...other}>
      {data.map(item => (
        <Option key={item.value}>{item.text}</Option>
      ))}
    </AntSelect>
  </Item>
)

Select.defaultProps = {
  data: []
}

export default Select
