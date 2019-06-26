/*
 * @Author: czy0729
 * @Date: 2019-06-21 10:12:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-26 18:42:44
 */
import React from 'react'
import { Badge, Divider, Popconfirm, Button, Modal, message } from 'antd'
import deepmerge from 'deepmerge'
import Table from '@/components/Table'
import * as Utils from '@/utils'
import { recommendDS, dataSource } from './ds'

const { Column } = Table

export default class Render extends React.Component {
  // SSR
  // static async getInitialProps({ Component, ctx }) {
  //   let pageProps = {};
  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx);
  //   }
  //   return { pageProps };
  // }

  state = {
    dataSource,
    selectedRowKeys: [],
    selectedRowIds: []
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

  comfirmBatchDelete = () => {
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
        <Button type='primary'>添加产品</Button>
        <Button
          className='ml-sm'
          type='danger'
          disabled={!selectedRowIds.length}
          onClick={this.comfirmBatchDelete}
        >
          批量删除
        </Button>
      </>
    )
  }

  renderControl(value) {
    return (
      <div>
        <a>浏览</a>
        <Divider type='vertical' />
        <a>编辑</a>
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
    const { dataSource, selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }

    return (
      <Table
        dataSource={dataSource}
        scroll={{ x: 1280 }}
        rowSelection={rowSelection}
        renderTop={this.renderTop()}
        onChange={this.onChange}
      >
        <Column
          title='Id'
          dataIndex='id'
          sorter
          search
          fixed='left'
          width={80}
        />
        <Column title='名称' dataIndex='name' sorter search />
        <Column title='IES' dataIndex='iesCount' sorter search />
        <Column title='PV' dataIndex='pv' sorter search />
        <Column title='UV' dataIndex='uv' sorter search />
        <Column title='排序' dataIndex='sort' sorter search />
        <Column
          title='推荐'
          dataIndex='recommend'
          sorter
          filters={recommendDS}
          render={value => (
            <span>
              <Badge status={Utils.getStatus(recommendDS, value)} />
              {Utils.getText(recommendDS, value)}
            </span>
          )}
        />
        <Column
          title='修改时间'
          dataIndex='lastDate'
          sorter
          filters='date'
          render={value => Utils.date('y-m-d H:i:s', value)}
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
