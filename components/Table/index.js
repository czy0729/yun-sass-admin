/*
 * 简单封装Table
 * 暂为本地数据操作
 * 1. 简易排序
 * 2. 枚举筛选
 * 3. 多重搜索
 * 4. 日期范围搜索
 * @Doc: https://ant.design/components/table-cn/
 * @Author: czy0729
 * @Date: 2019-06-26 09:42:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-05 14:40:39
 */
import React from 'react'
import { Table as AntTable, Icon, Button, Input, DatePicker } from 'antd'
import Highlighter from 'react-highlight-words'
import styles from './index.less'

const { Column } = AntTable
const { RangePicker } = DatePicker
const momentsToTimestamps = moments =>
  moments.map(item => Math.floor(item.valueOf() / 1000))

export default class Table extends React.Component {
  static Column = React.Component

  state = {
    searchText: '',
    searchCurrentDataIndex: ''
  }

  // 生成排序参数
  getSorterProps = ({ sorter, dataIndex }) => {
    if (typeof sorter !== 'boolean') {
      return {
        sorter
      }
    }

    return {
      sorter: (a, b) => {
        if (typeof a[dataIndex] === 'number') {
          return a[dataIndex] - b[dataIndex]
        }
        return a[dataIndex].localeCompare(b[dataIndex])
      }
    }
  }

  // 生成筛选参数
  getFiltersProps = ({ filters, dataIndex }) => {
    // 日期
    if (filters === 'date') {
      return {
        filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format='YYYY-MM-DD HH:mm'
              onChange={value => {
                // 点击了清空
                if (!value.length) {
                  clearFilters()
                  return
                }
                setSelectedKeys([momentsToTimestamps(value).join()])
              }}
              onOk={() => this.handleDateSearch(confirm, dataIndex)}
            />
          </div>
        ),
        filterIcon: filtered => (
          <Icon
            type='calendar'
            style={{ color: filtered ? '#1890ff' : undefined }}
          />
        ),
        onFilter: (value, record) => {
          if (value.length) {
            const [startTime, endTime] = value
              .split(',')
              .map(item => parseInt(item))
            return (
              record[dataIndex] >= startTime && record[dataIndex] <= endTime
            )
          }
          return true
        }
      }
    }

    if (!Array.isArray(filters)) {
      return {
        filters
      }
    }

    // 枚举
    return {
      filters,
      onFilter: (value, record) => record[dataIndex] == value
    }
  }

  // 生成查询参数
  getSearchProps = ({ search, title, dataIndex }) => {
    if (!search) {
      return null
    }

    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node
            }}
            placeholder={`查询${title}`}
            value={selectedKeys[0]}
            onChange={e =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() =>
              this.handleSearch(selectedKeys, confirm, dataIndex)
            }
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type='primary'
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon='search'
            size='small'
            style={{ width: 90, marginRight: 8 }}
          >
            查询
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            重置
          </Button>
        </div>
      ),
      filterIcon: filtered => (
        <Icon
          type='search'
          style={{ color: filtered ? '#1890ff' : undefined }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select())
        }
      },
      render: text => {
        const { searchCurrentDataIndex } = this.state
        if (dataIndex !== searchCurrentDataIndex) {
          return text
        }
        return (
          <Highlighter
            highlightStyle={{
              padding: 0,
              color: '#24292e',
              fontWeight: 'bold',
              backgroundColor: '#fff5b1'
            }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        )
      }
    }
  }

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    this.setState({
      searchText: selectedKeys[0],
      searchCurrentDataIndex: dataIndex
    })
  }

  handleDateSearch = (confirm, dataIndex) => {
    confirm()
    this.setState({
      searchCurrentDataIndex: dataIndex
    })
  }

  handleReset = clearFilters => {
    clearFilters()
    this.setState({
      searchText: '',
      searchCurrentDataIndex: ''
    })
  }

  render() {
    const {
      dataSource,
      children,
      renderTop,
      renderBottom,
      ...otherTableProps
    } = this.props
    const columns = React.Children.map(children, ({ props }) => {
      const { sorter, filters, search, ...otherColumnProps } = props
      return (
        <Column
          key={props.dataIndex}
          {...this.getSorterProps(props)}
          {...this.getFiltersProps(props)}
          {...this.getSearchProps(props)}
          {...otherColumnProps}
        />
      )
    })

    return (
      <div className={styles.table}>
        {renderTop && <div className={styles.top}>{renderTop}</div>}
        <AntTable
          dataSource={dataSource}
          rowKey={(record, index) => index}
          {...otherTableProps}
        >
          {columns}
        </AntTable>
        {renderBottom && <div className={styles.bottom}>{renderBottom}</div>}
      </div>
    )
  }
}
