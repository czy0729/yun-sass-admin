/*
 * @Author: czy0729
 * @Date: 2019-06-21 10:12:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-03 16:09:40
 */
import React from 'react'
import { observer, inject } from 'mobx-react'
import deepmerge from 'deepmerge'
import { Modal, message } from 'antd'
import Form from '@/components/Form'
import * as utils from '@/utils'
import IESTable from './IESTable'
import IESForm from './IESForm'
import Category from './Category'
import { screenDS } from './ds'

export default
@inject('GlobalStore', 'UIStore')
@Form.create
@observer
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

  showIESForm = (item = {}) => {
    const { UIStore } = this.props
    UIStore.showFormModal({
      title: `${item.id ? '编辑' : '新增'}产品IES`,
      children: <IESForm {...item} />,
      onOk: async values => {
        UIStore.loadingFormModal()
        await this.onEditIES({
          ...item,
          ...values
        })
        UIStore.closeFormModal()
      }
    })
  }

  onSubmit = async values => {
    const { dataSource } = this.state
    await utils.sleep(1600)

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

  renderLink() {
    const { form } = this.props
    const error = form.getFieldError('url')
    const value = form.getFieldValue('url')
    if (error || !value) {
      return <a disabled>浏览</a>
    }

    return (
      <a href={value} target='_blank' rel='noopener noreferrer'>
        浏览
      </a>
    )
  }

  render() {
    const { form, GlobalStore } = this.props
    const { categories } = GlobalStore.state
    const { dataSource } = this.state
    return (
      <Form form={form}>
        <Form.Input
          label='产品名称'
          name='name'
          rules={Form.rules.required}
          placeholder='最多60个字'
        />
        <Form.Select
          label='产品分类'
          name='category'
          data={categories}
          rules={Form.rules.required}
          mode='multiple'
          extra={<Category />}
        />
        <Form.Upload
          label='产品图片'
          name='thumbs'
          rules={Form.rules.required}
          initialValue={[
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          ]}
        />
        <Form.Input
          label='产品链接'
          name='url'
          rules={Form.rules.gen('url', false)}
          placeholder='https://'
          extra={this.renderLink()}
        />
        <Form.Item label='产品IES'>
          <IESTable
            dataSource={dataSource}
            onShowIESForm={this.showIESForm}
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
          label='环境照度'
          name='lx'
          max={100}
          placeholder='0-100'
          extra='lx'
        />
        <Form.Switch label='首页推荐' name='recommend' />
        <Form.InputNumber label='序号' name='sort' />
        <Form.Button onSubmit={this.onSubmit}>保存</Form.Button>
      </Form>
    )
  }
}
