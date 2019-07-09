/*
 * @Doc: https://ant.design/components/input-cn/
 * @Author: czy0729
 * @Date: 2019-06-27 11:22:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-08 11:28:58
 */
import React from 'react'
import { Input as AntInput } from 'antd'
import Item from './Item'
import styles from './index.less'

export default class Input extends React.Component {
  static defaultProps = {
    hasFeedback: true,
    placeholder: '请输入'
  }

  Input

  componentDidMount() {
    const { autoFocus } = this.props
    if (autoFocus) {
      this.Input.focus()
    }
  }

  render() {
    const {
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
      autoFocus,
      ...other
    } = this.props
    return (
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
        <AntInput
          ref={node => (this.Input = node)}
          className={styles.input}
          placeholder={placeholder}
          {...other}
        />
      </Item>
    )
  }
}
