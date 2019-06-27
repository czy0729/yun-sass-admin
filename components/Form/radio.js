/*
 * @Doc: https://ant.design/components/radio-cn/
 * @Author: czy0729
 * @Date: 2019-06-27 17:18:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-27 17:27:17
 */
import React from 'react'
import { Radio as AntRadio } from 'antd'
import Item from './item'

const Radio = ({
  className,
  children,
  form,
  label,
  name,
  initialValue,
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
  >
    <AntRadio.Group {...other}>
      {data.map(item => (
        <AntRadio.Button key={item.text} value={item.value}>
          {item.text}
        </AntRadio.Button>
      ))}
    </AntRadio.Group>
  </Item>
)

Radio.defaultProps = {
  data: []
}

export default Radio
