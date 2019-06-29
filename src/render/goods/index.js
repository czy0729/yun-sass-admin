/*
 * @Author: czy0729
 * @Date: 2019-06-21 10:12:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-29 15:32:01
 */
import React from 'react'
import deepmerge from 'deepmerge'
import { Modal, message } from 'antd'
import Form from '@/components/Form'
import * as utils from '@/utils'
import IESTable from './ies-table'
import IESForm from './ies-form'
import { screenDS } from './ds'

export default
@Form.create
class Goods extends React.Component {
  state = {
    dataSource: [
      {
        id: 1,
        ies: {
          name: 'test_longggggggggggggggggggggggggg_24D_3.dat',
          url: 'https://litku.oss-cn-beijing.aliyuncs.com/ies/ieses/24D_3.dat'
        },
        angle: 'ies_24D',
        lm: 1000,
        cct: 3000
      }
    ]
  }

  IESForm

  onShowIESForm = (item = {}) => {
    Modal.confirm({
      icon: null,
      title: `${item.id ? '编辑' : '新增'}产品IES`,
      width: 560,
      content: (
        <IESForm forwardForm={form => (this.IESForm = form)} {...item} />
      ),
      onOk: async () => {
        if (!this.IESForm) {
          return Promise.reject()
        }

        return this.IESForm.onSubmit(values =>
          this.onEditIES({
            ...item,
            ...values
          })
        )
      },
      onCancel: () => (this.IESForm = null)
    })
  }

  onSubmit = async values => {
    const { dataSource } = this.state
    const hide = message.loading('Action in progress..', 0)

    await utils.sleep(1600)

    hide()
    setTimeout(() => {
      message.success('操作成功')
      Modal.info({
        icon: null,
        content: (
          <p>
            {JSON.stringify({
              ...values,
              ies: dataSource
            })}
          </p>
        )
      })
    }, 400)
  }

  onEditIES = async values => {
    const isUpdate = !!values.id
    console.log(isUpdate ? '编辑' : '新增', values)

    await utils.sleep(1600)

    // 模拟更新或新增假数据
    let dataSource
    if (isUpdate) {
      dataSource = deepmerge([], this.state.dataSource).map(item => {
        if (item.id === values.id) {
          return {
            ...values,
            ies: values.ies[0]
          }
        }
        return item
      })
    } else {
      dataSource = deepmerge([], this.state.dataSource)
      dataSource.push({
        ...values,
        id: utils.random(0, 100),
        ies: values.ies[0]
      })
    }
    this.setState({
      dataSource
    })
    console.log(dataSource)

    message.success('操作成功')
  }

  onDeleteIES = async id => {
    console.log('删除', id)
    const hide = message.loading('Action in progress..', 0)

    await utils.sleep(1600)

    // 模拟删除数据
    const { dataSource } = this.state
    this.setState({
      dataSource: deepmerge([], dataSource).filter(item => item.id !== id)
    })

    hide()
    setTimeout(() => {
      message.success('操作成功')
    }, 400)
  }

  render() {
    const { form } = this.props
    const { dataSource } = this.state
    return (
      <Form form={form}>
        <Form.Input
          label='产品名称'
          name='name'
          rules={Form.rules.required}
          placeholder='最多60个字'
        />
        <Form.Input
          label='产品链接'
          name='url'
          rules={Form.rules.gen('url', false)}
          placeholder='https://'
        />
        <Form.Upload
          label='产品图片'
          name='thumbs'
          rules={Form.rules.required}
          initialValue={[
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          ]}
        />
        <Form.Item label='产品IES'>
          <IESTable
            dataSource={dataSource}
            onShowIESForm={this.onShowIESForm}
            onDeleteIES={this.onDeleteIES}
          />
        </Form.Item>
        <Form.Radio
          label='场景'
          name='screen'
          data={screenDS}
          initialValue={utils.getValue(screenDS, '普通场景')}
        />
        <Form.InputNumber
          label='空间照度'
          name='lx'
          max={100}
          placeholder='0-100'
          extra='lx'
        />
        <Form.Button onSubmit={this.onSubmit}>保存</Form.Button>
      </Form>
    )
  }
}
