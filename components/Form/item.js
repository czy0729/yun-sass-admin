/*
 * 简单封装表单项控件
 * @Doc: https://ant.design/components/form-cn/#Form.Item
 * @Author: czy0729
 * @Date: 2019-06-27 11:24:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-03 16:48:01
 */
import React from 'react'
import { Form } from 'antd'
import styles from './index.less'

const Item = ({
  form,
  name,
  initialValue,
  options,
  rules,
  right,
  children,
  ...other
}) => (
  <Form.Item {...other}>
    {name === undefined
      ? children
      : // https://ant.design/components/form-cn/#this.props.form.getFieldDecorator(id,-options)
        form.getFieldDecorator(name, {
          initialValue,
          ...options,
          rules: rules.slice()
        })(children)}
    {right && <div className={styles.right}>{right}</div>}
  </Form.Item>
)

// 常用属性
Item.defaultProps = {
  form: undefined, // 必传, 表单托管对象, 可以通过包裹Form自动传递
  label: '', // label 标签的文本
  name: undefined, // 必填输入控件唯一标志
  initialValue: undefined, // 常用规则, options.initialValue
  options: {}, // 其他表单规则
  rules: [], // 表单验证规则
  right: undefined, // 末尾追加文字
  children: undefined // 表单项控件包裹内容
}

export default Item
