/*
 * @Author: czy0729
 * @Date: 2019-07-02 15:11:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-05 21:58:42
 */
import React from 'react'
import { observer, inject } from 'mobx-react'
import { Divider, message } from 'antd'
import Form from '@/components/Form'
import CategoryDndTable from './CategoryDndTable'

export default
@inject('globalStore', 'uiStore')
@observer
class Category extends React.Component {
  showAddCategoryModal = () => {
    const { uiStore } = this.props
    uiStore.showFormModal({
      title: '添加分类',
      children: (
        <Form>
          <Form.Input
            label='分类名称'
            name='name'
            rules={Form.rules.required}
          />
        </Form>
      ),
      onOk: async ({ name }) => {
        const { globalStore } = this.props
        const data = await globalStore.doCategoryCommit({
          name,
          state: 1,
          active: 1,
          sort: 0
        })

        if (data.state === 1) {
          message.success('添加分类成功')
          uiStore.closeFormModal()
          globalStore.fetchCategories()
        } else {
          message.error(data.message)
        }
      }
    })
  }

  showManageCategoriesModal = () => {
    const { globalStore, uiStore } = this.props
    const { categories } = globalStore.state
    uiStore.showFormModal({
      title: '分类管理',
      children: (
        <Form layout={false}>
          <Form.Item
            name='categories'
            initialValue={categories.map(item => ({
              text: item.name,
              value: item.name,
              ...item
            }))}
          >
            <CategoryDndTable />
          </Form.Item>
        </Form>
      ),
      onOk: async ({ categories }) => {
        const { globalStore } = this.props
        const data = await globalStore.doCategoriesEdit({
          list: JSON.stringify(
            categories.map((item, index) => ({
              id: item.id,
              name: item.text,
              state: item.state,
              active: item.active,
              sort: index
            }))
          )
        })

        if (data.state === 1) {
          message.success('保存分类成功')
          uiStore.closeFormModal()
          globalStore.fetchCategories()
        } else {
          message.error(data.message)
        }
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
