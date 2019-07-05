/*
 * @Author: czy0729
 * @Date: 2019-06-29 11:07:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-05 23:28:45
 */
import React from 'react'
import { Table, Divider, Popconfirm, Icon } from 'antd'
import styles from './index.less'

function IESTable({ dataSource, onShowIESForm, onDeleteIES }) {
  return (
    <Table
      className={styles.table}
      size='small'
      rowKey={record => record.beam_angle}
      scroll={{ x: 640 }}
      columns={[
        {
          title: 'IES',
          dataIndex: 'ies',
          render: value => (
            <span>
              <Icon type='paper-clip' />
              <a
                href={value}
                target='_blank'
                rel='noopener noreferrer'
                style={{ marginLeft: 4 }}
              >
                {value}
              </a>
            </span>
          )
        },
        {
          title: '光束角',
          dataIndex: 'beam_angle'
        },
        {
          title: '功率(W)',
          dataIndex: 'power'
        },
        {
          title: '光通量(lux)',
          dataIndex: 'flux'
        },
        {
          title: '色温(K)',
          dataIndex: 'cct'
        },
        {
          title: '操作',
          dataIndex: 'id',
          fixed: 'right',
          width: 120,
          render: (value, item, index) => (
            <div>
              <a onClick={() => onShowIESForm(item, index)}>编辑</a>
              <Divider type='vertical' />
              <Popconfirm
                title='确定删除?'
                onConfirm={() => onDeleteIES(index)}
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
