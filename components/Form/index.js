/*
 * 简易封装表单
 * @Doc: https://ant.design/components/form-cn/#Form
 * @Author: czy0729
 * @Date: 2019-06-27 10:53:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-03 13:58:22
 */
import React from 'react'
import classNames from 'classnames'
import { Form as AntForm } from 'antd'
import Button from './Button'
import Input from './Input'
import InputNumber from './InputNumber'
import Item from './Item'
import Radio from './Radio'
import Select from './Select'
import Switch from './Switch'
import Upload from './Upload'
import UploadFile from './UploadFile'
import create from './utils/create'
import rules from './utils/rules'
import styles from './index.less'

const Form = ({ className, form, layout, children, ...other }) => {
  const formItemLayout = layout
    ? {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 }
        }
      }
    : {}
  return (
    <div className={classNames(styles.form, className)}>
      <AntForm {...formItemLayout} {...other}>
        {React.Children.map(children, (item, index) => {
          // 不是React.Element直接返回
          if (!React.isValidElement(item)) {
            return item
          }

          return React.cloneElement(item, {
            form,
            // eslint-disable-next-line react/no-array-index-key
            key: index
          })
        })}
      </AntForm>
    </div>
  )
}

Form.defaultProps = {
  form: null,
  layout: true
}

Form.Button = Button
Form.Input = Input
Form.InputNumber = InputNumber
Form.Item = Item
Form.Radio = Radio
Form.Select = Select
Form.Switch = Switch
Form.Upload = Upload
Form.UploadFile = UploadFile

Form.create = create
Form.rules = rules

export default Form
