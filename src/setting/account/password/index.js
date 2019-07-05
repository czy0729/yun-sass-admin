/*
 * @Author: czy0729
 * @Date: 2019-06-25 18:08:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-05 14:52:09
 */
import React from 'react'
import { observer, inject } from 'mobx-react'
import { Form } from '@/components'

export default
@inject('globalStore', 'uiStore')
@Form.create
@observer
class Basic extends React.Component {
  onSubmit = values => {
    console.log(values)
  }

  render() {
    const { form } = this.props
    return (
      <Form form={form}>
        <Form.Password
          label='原始密码'
          name='pwd1'
          rules={Form.rules.required}
        />
        <Form.Password label='新密码' name='pwd2' rules={Form.rules.required} />
        <Form.Password
          label='确认密码'
          name='pwd3'
          rules={Form.rules.required}
        />
        <Form.Button onSubmit={this.onSubmit}>保存</Form.Button>
      </Form>
    )
  }
}
