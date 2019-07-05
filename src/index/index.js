/*
 * @Author: czy0729
 * @Date: 2019-06-21 10:12:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-05 17:26:55
 */
import React from 'react'
import { observer, inject } from 'mobx-react'
import deepmerge from 'deepmerge'
import { Badge, Divider, Popconfirm, Button, Modal, message } from 'antd'
import Table from '@/components/Table'
import { routerPush, getText, getStatus } from '@/utils'
import { dataSource } from '@/mock'
import { activeDS, recommendDS } from './ds'

const { Column } = Table

export default
@inject('globalStore')
@observer
class Render extends React.Component {
  state = {
    dataSource,
    selectedRowKeys: [],
    selectedRowIds: []
  }

  componentDidMount() {
    const { globalStore } = this.props
    globalStore.fetchProductList()
  }

  onSelectChange = (selectedRowKeys, record) => {
    this.setState({
      selectedRowKeys,
      selectedRowIds: record.map(item => item.id)
    })
  }

  onChange = () => {
    this.setState({
      selectedRowKeys: [],
      selectedRowIds: []
    })
  }

  confirmBatchDelete = () => {
    const { selectedRowIds } = this.state
    Modal.confirm({
      title: 'Do you Want to delete these items?',
      content: `ids: ${selectedRowIds.join()}`,
      onOk: () => this.doDelete(selectedRowIds),
      onCancel: () => {}
    })
  }

  doDelete = ids => {
    const { dataSource } = this.state
    this.setState({
      dataSource: deepmerge([], dataSource).filter(
        item => !ids.includes(item.id)
      ),
      selectedRowKeys: [],
      selectedRowIds: []
    })
    message.success(`已删除 ${ids.length} 项数据`)
  }

  renderTop() {
    const { selectedRowIds } = this.state
    return (
      <>
        <Button type='primary' onClick={() => routerPush('/product')}>
          添加产品
        </Button>
        <Button
          className='ml-sm'
          type='danger'
          disabled={!selectedRowIds.length}
          onClick={this.confirmBatchDelete}
        >
          下线
        </Button>
        <Button
          className='ml-sm'
          type='danger'
          disabled={!selectedRowIds.length}
          onClick={this.confirmBatchDelete}
        >
          删除
        </Button>
      </>
    )
  }

  renderControl(value) {
    return (
      <div>
        <a>浏览</a>
        <Divider type='vertical' />
        <a onClick={() => routerPush(`/product?id=${value}`)}>编辑</a>
        <Divider type='vertical' />
        <Popconfirm title='确定删除?' onConfirm={() => this.doDelete([value])}>
          <a>删除</a>
        </Popconfirm>
        <Divider type='vertical' />
        <a>分享</a>
      </div>
    )
  }

  render() {
    const { globalStore } = this.props
    const { productList } = globalStore.state
    const { selectedRowIds, selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }

    return (
      <Table
        dataSource={productList.list.slice()}
        loading={!productList._loaded}
        scroll={{ x: 1440 }}
        rowSelection={rowSelection}
        renderTop={
          <Button type='primary' onClick={() => routerPush('/product')}>
            添加产品
          </Button>
        }
        renderBottom={
          <div>
            <Button
              type='danger'
              disabled={!selectedRowIds.length}
              onClick={this.confirmBatchDelete}
            >
              下线
            </Button>
            <Button
              className='ml-sm'
              type='danger'
              disabled={!selectedRowIds.length}
              onClick={this.confirmBatchDelete}
            >
              删除
            </Button>
          </div>
        }
        onChange={this.onChange}
      >
        <Column title='名称' dataIndex='name' sorter search />
        <Column
          title='IES'
          dataIndex='models'
          sorter
          search
          render={value => value.length}
        />
        <Column title='PV' dataIndex='pv' sorter search />
        <Column title='UV' dataIndex='uv' sorter search />
        <Column title='排序' dataIndex='sort' sorter search />
        <Column
          title='状态'
          dataIndex='active'
          sorter
          filters={activeDS}
          render={value => (
            <>
              <Badge status={getStatus(activeDS, value)} />
              {getText(activeDS, value)}
            </>
          )}
        />
        <Column
          title='推荐'
          dataIndex='recommend'
          sorter
          filters={recommendDS}
          render={value => (
            <>
              <Badge status={getStatus(recommendDS, value)} />
              {getText(recommendDS, value)}
            </>
          )}
        />
        <Column
          title='修改时间'
          dataIndex='update_time'
          sorter
          filters='date'
        />
        <Column
          title='操作'
          dataIndex='id'
          fixed='right'
          width={208}
          render={value => this.renderControl(value)}
        />
      </Table>
    )
  }
}
