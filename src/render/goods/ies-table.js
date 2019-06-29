/*
 * @Author: czy0729
 * @Date: 2019-06-29 11:07:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-29 14:59:59
 */
import React from 'react'
import { Table, Divider, Popconfirm, Icon } from 'antd'
import styles from './index.less'

function IESTable({ dataSource, onShowIESForm, onDeleteIES }) {
  return (
    <Table
      className={styles.table}
      size='small'
      rowKey={record => record.id}
      columns={[
        {
          title: 'IES',
          dataIndex: 'ies',
          render: value => (
            <span>
              <Icon type='paper-clip' />
              <a
                href={value.url}
                target='_blank'
                rel='noopener noreferrer'
                style={{ marginLeft: 4 }}
              >
                {value.name}
              </a>
            </span>
          )
        },
        {
          title: '光束角',
          dataIndex: 'angle'
        },
        {
          title: '光通量',
          dataIndex: 'lm',
          render: value => `${value} lm`
        },
        {
          title: '色温',
          dataIndex: 'cct',
          render: value => `${value} K`
        },
        {
          title: '操作',
          dataIndex: 'id',
          render: (value, item) => (
            <div>
              <a onClick={() => onShowIESForm(item)}>编辑</a>
              <Divider type='vertical' />
              <Popconfirm
                title='确定删除?'
                onConfirm={() => onDeleteIES(value)}
              >
                <a>删除</a>
              </Popconfirm>
            </div>
          )
        }
      ]}
      dataSource={dataSource}
      pagination={false}
      footer={() => <a onClick={() => onShowIESForm()}>新增</a>}
    />
  )
}

export default IESTable
