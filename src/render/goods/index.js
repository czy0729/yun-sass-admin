/*
 * @Author: czy0729
 * @Date: 2019-06-21 10:12:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-27 18:37:49
 */
import React from 'react'
import { message } from 'antd'
import Form from '@/components/Form'
import { sleep, getValue } from '@/utils'
import { screenDS } from './ds'

export default
@Form.create
class Goods extends React.Component {
  doAdd = async values => {
    console.log(values)
    const hide = message.loading('Action in progress..', 0)

    await sleep(3000)

    hide()
    setTimeout(() => {
      message.success('操作成功')
    }, 400)
  }

  render() {
    const { form } = this.props
    return (
      <Form form={form}>
        <Form.Input label='产品名称' name='name' rules={Form.rules.required} />
        <Form.Input label='产品链接' name='url' placeholder='https://' />
        <Form.Upload
          label='产品图片'
          name='thumbs'
          rules={Form.rules.required}
          initialValue={[
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          ]}
        />
        <Form.Radio
          label='场景'
          name='screen'
          data={screenDS}
          initialValue={getValue(screenDS, '室外场景')}
        />
        <Form.Button onSubmit={this.doAdd}>保存</Form.Button>
      </Form>
    )
  }
}
