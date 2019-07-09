/*
 * @Author: czy0729
 * @Date: 2019-06-21 10:12:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-08 12:02:15
 */
import React from 'react'
import { observer, inject } from 'mobx-react'
import deepmerge from 'deepmerge'
import { message } from 'antd'
import Form from '@/components/Form'
import { getValue, getQuery, routerBack } from '@/utils'
import fetch from '@/utils/fetch'
import { API_PRODUCT_ITEM } from '@/constants/api'
import IESTable from './IESTable'
import IESForm from './IESForm'
import Category from './Category'
import { sceneDS } from './ds'

export default
@inject('globalStore', 'uiStore')
@Form.create
@observer
class Goods extends React.Component {
  state = {
    id: '',
    product: {},
    models: [
      // {
      //   ies: 'https://litku.oss-cn-beijing.aliyuncs.com/ies/ieses/24D_3.dat',
      //   beam_angle: 'ies_24D',
      //   power: 5,
      //   flux: 1000,
      //   cct: 3000
      // }
    ]
  }

  async componentDidMount() {
    const { globalStore } = this.props
    globalStore.fetchCategories()

    const id = getQuery('id')
    if (id) {
      this.setState({
        id
      })

      const data = await fetch(API_PRODUCT_ITEM, {
        id
      })
      if (data.state === 1) {
        this.setState({
          product: data.content,
          models: data.content.models || []
        })
      }
    }
  }

  showIESForm = (item = {}, index) => {
    const { uiStore } = this.props
    const isUpdate = index !== undefined
    uiStore.showFormModal({
      title: `${isUpdate ? '编辑' : '新增'}产品IES`,
      children: <IESForm {...item} />,
      onOk: async values => {
        uiStore.loadingFormModal()
        await this.onEditIES(
          {
            ...item,
            ...values
          },
          index
        )
        uiStore.closeFormModal()
      }
    })
  }

  onEditIES = async (values, index) => {
    const isUpdate = index !== undefined
    let models
    if (isUpdate) {
      models = deepmerge([], this.state.models).map((item, idx) => {
        if (index === idx) {
          return {
            ...values,
            ies: values.ies[0]
          }
        }
        return item
      })
    } else {
      models = deepmerge([], this.state.models)
      models.push({
        ...values,
        ies: values.ies[0]
      })
    }
    this.setState({
      models
    })
  }

  onDeleteIES = async index => {
    const { models } = this.state
    this.setState({
      models: deepmerge([], models).filter((item, idx) => index !== idx)
    })
  }

  onSubmit = async values => {
    const { globalStore } = this.props
    const { id, models } = this.state
    await globalStore.doProductCommit({
      ...values,
      id,
      models: JSON.stringify(models),
      state: 1,
      active: 1,
      ies_status: 1,
      recommend: values.recommend ? 1 : 0
    })

    message.success('操作成功')
    if (!id) {
      routerBack()
    }
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
    const { form, globalStore } = this.props
    const { categories } = globalStore.state
    const { id, product, models } = this.state
    return (
      <Form form={form}>
        <Form.Input
          label='产品名称'
          name='name'
          initialValue={product.name}
          rules={Form.rules.required}
          placeholder='最多60个字'
          autoFocus
        />
        <Form.Select
          label='产品分类'
          name='category_ids'
          data={categories}
          initialValue={product.category_ids || []}
          rules={Form.rules.required}
          mode='multiple'
          right={<Category />}
        />
        <Form.Upload
          label='产品图片'
          name='covers'
          initialValue={product.covers || []}
          rules={Form.rules.required}
          maxLength={9}
        />
        <Form.Input
          label='产品链接'
          name='url'
          initialValue={product.url}
          rules={Form.rules.gen('url', false)}
          placeholder='https://'
          right={this.renderLink()}
        />
        <Form.Item label='产品IES' required>
          <IESTable
            dataSource={models.slice()}
            onShowIESForm={this.showIESForm}
            onDeleteIES={this.onDeleteIES}
          />
        </Form.Item>
        <Form.Radio
          label='场景'
          name='scene'
          data={sceneDS}
          initialValue={getValue(sceneDS, '普通场景')}
        />
        <Form.InputNumber
          label='环境照度'
          name='ambient_light'
          initialValue={product.ambient_light}
          max={100}
          placeholder='0-100'
          right='lx'
        />
        <Form.Switch
          label='首页推荐'
          name='recommend'
          initialValue={product.recommend === 1}
        />
        <Form.InputNumber
          label='序号'
          name='sort'
          initialValue={product.sort}
        />
        <Form.Button onSubmit={this.onSubmit}>
          {id ? '保存' : '新增'}
        </Form.Button>
      </Form>
    )
  }
}
