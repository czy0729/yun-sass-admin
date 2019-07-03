/*
 * @Author: czy0729
 * @Date: 2019-07-02 15:11:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-03 15:54:46
 */
import React from 'react'
import { observer, inject } from 'mobx-react'
import { Divider, message } from 'antd'
import Form from '@/components/Form'
import CategoryDndTable from './CategoryDndTable'

export default
@inject('GlobalStore', 'UIStore')
@observer
class Category extends React.Component {
  showAddCategoryModal = () => {
    const { UIStore } = this.props
    UIStore.showFormModal({
      title: '添加分类',
      children: (
        <Form>
          <Form.Input
            label='分类名称'
            name='category'
            rules={Form.rules.required}
          />
        </Form>
      ),
      onOk: ({ category }) => {
        const { GlobalStore } = this.props
        const success = GlobalStore.addCategory(category)
        if (success) {
          message.success('添加分类成功')
          UIStore.closeFormModal()
        } else {
          message.error('分类已存在')
        }
      }
    })
  }

  showManageCategoriesModal = () => {
    const { GlobalStore, UIStore } = this.props
    const { categories } = GlobalStore.state
    UIStore.showFormModal({
      title: '分类管理',
      children: (
        <Form layout={false}>
          <Form.Item name='categories' initialValue={categories}>
            <CategoryDndTable />
          </Form.Item>
        </Form>
      ),
      onOk: ({ categories }) => {
        const { GlobalStore } = this.props
        GlobalStore.updateCategories(categories)
        UIStore.closeFormModal()
      }
    })
  }

  render() {
    return (
      <div>
        <a onClick={this.showAddCategoryModal}>添加分类</a>
        <Divider type='vertical' />
        <a onClick={this.showManageCategoriesModal}>分类管理</a>
      </div>
    )
  }
}
