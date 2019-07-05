/*
 * @Author: czy0729
 * @Date: 2019-07-02 23:00:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-05 21:56:08
 */
import React from 'react'
import classNames from 'classnames'
import { toJS } from 'mobx'
import immutabilityHelper from 'immutability-helper'
import { DndProvider } from 'react-dnd-cjs'
import HTML5Backend from 'react-dnd-html5-backend-cjs'
import { Form, Divider, Table, Popconfirm, Input } from 'antd'
import DragableBodyRow from './DragableBodyRow'
import styles from './index.less'

const initEditingFormItemProps = {
  hasFeedback: false,
  validateStatus: undefined,
  help: undefined
}

export default class CategoryDndTable extends React.Component {
  state = {
    dataSource: toJS(this.props.value),
    editingCategory: '',
    editingInputValue: '',
    editingFormItemProps: initEditingFormItemProps
  }

  components = {
    body: {
      row: DragableBodyRow
    }
  }

  moveRow = (dragIndex, hoverIndex) => {
    const { dataSource } = this.state
    const dragRow = dataSource[dragIndex]
    const newDataSource = immutabilityHelper(dataSource, {
      $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
    })
    this.setState({
      dataSource: newDataSource
    })
    this.forwardChange(newDataSource)
  }

  toggleEdit = (editingCategory = '', editingInputValue = '') => {
    this.setState({
      editingCategory,
      editingInputValue
    })
  }

  onInputChange = e => {
    this.setState({
      editingInputValue: e.target.value,
      editingFormItemProps: initEditingFormItemProps
    })
  }

  save = () => {
    const { dataSource, editingCategory, editingInputValue } = this.state
    if (editingCategory === editingInputValue) {
      return
    }

    if (editingInputValue === '') {
      this.saveError('分类不能为空')
      return
    }

    if (dataSource.findIndex(item => item.text === editingInputValue) !== -1) {
      this.saveError('分类已存在')
      return
    }

    const newDataSource = dataSource.map(item => {
      if (item.text !== editingCategory) {
        return item
      }

      return {
        ...item,
        text: editingInputValue,
        value: editingInputValue
      }
    })

    this.setState({
      dataSource: newDataSource,
      editingCategory: '',
      editingInputValue: '',
      editingFormItemProps: initEditingFormItemProps
    })
    this.forwardChange(newDataSource)
  }

  saveError = help => {
    this.setState({
      editingFormItemProps: {
        hasFeedback: true,
        validateStatus: 'error',
        help
      }
    })
  }

  delete = category => {
    const { dataSource } = this.state
    const newDataSource = dataSource.filter(item => item.text !== category)
    this.setState({
      dataSource: newDataSource
    })
    this.forwardChange(newDataSource)
  }

  forwardChange = value => {
    const { onChange } = this.props
    onChange(value)
  }

  render() {
    const {
      dataSource,
      editingCategory,
      editingInputValue,
      editingFormItemProps
    } = this.state
    return (
      <DndProvider backend={HTML5Backend}>
        <Table
          className={classNames(styles.table, styles.tableCategory)}
          size='small'
          rowKey={record => record.value}
          showHeader={false}
          columns={[
            {
              title: '分类',
              dataIndex: 'text',
              render: value => {
                if (editingCategory !== value) {
                  return value
                }

                return (
                  <Form.Item {...editingFormItemProps}>
                    <Input
                      value={editingInputValue}
                      onChange={this.onInputChange}
                    />
                  </Form.Item>
                )
              }
            },
            {
              title: '操作',
              dataIndex: 'value',
              render: (value, item) => {
                if (editingCategory !== item.text) {
                  return (
                    <div
                      style={{
                        textAlign: 'right'
                      }}
                    >
                      <a onClick={() => this.toggleEdit(item.text, item.text)}>
                        编辑
                      </a>
                      <Divider type='vertical' />
                      <Popconfirm
                        title='确定删除?'
                        onConfirm={() => this.delete(item.text)}
                      >
                        <a>删除</a>
                      </Popconfirm>
                    </div>
                  )
                }

                return (
                  <div
                    style={{
                      textAlign: 'right'
                    }}
                  >
                    <a onClick={this.save}>保存</a>
                    <Divider type='vertical' />
                    <a onClick={() => this.toggleEdit('', '')}>取消</a>
                  </div>
                )
              }
            }
          ]}
          dataSource={dataSource}
          pagination={false}
          components={this.components}
          onRow={(record, index) => ({
            index,
            moveRow: this.moveRow
          })}
        />
      </DndProvider>
    )
  }
}
