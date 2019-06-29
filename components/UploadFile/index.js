/*
 * @Author: czy0729
 * @Date: 2019-06-28 16:35:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-29 16:49:17
 */
import React from 'react'
import { Upload, Button, Icon } from 'antd'
import './index.less'

function getFileList(value = []) {
  return value
    .filter(item => !!item)
    .map((item, index) => ({
      uid: `${item.name}|${index}`,
      name: item.name,
      status: 'done',
      url: item.url
    }))
}
function getReturnValue(fileList) {
  return fileList.map(item => ({
    name: item.name,
    url: item.url || item.response.url
  }))
}

const cls = 'c-upload-file'

export default class UploadFile extends React.Component {
  static defaultProps = {
    onChange: Function.prototype
  }

  state = {
    fileList: getFileList(this.props.value)
  }

  handleChange = info => {
    const { file, fileList } = info
    this.setState(
      {
        fileList
      },
      () => {
        const { status, response } = file

        if (status === 'done') {
          // @todo 需要根据实际接口返回结果结构调整代码
          if (response.status === 'done') {
            this.onUploadOk(response)
          } else {
            this.onUploadError(response)
          }
        } else if (status === 'removed') {
          this.onRemoved(response)
        }
      }
    )
  }

  onUploadError = response => {
    console.log('onUploadError', response)
  }

  onUploadOk = response => {
    const { onChange } = this.props
    const { fileList } = this.state
    onChange(getReturnValue(fileList))

    console.log('onUploadOk', response)
  }

  onRemoved = () => {
    const { onChange } = this.props
    const { fileList } = this.state
    onChange(getReturnValue(fileList))

    console.log('onRemoved')
  }

  render() {
    const { fileList } = this.state
    const disabled = !!fileList.length
    return (
      <Upload
        className={cls}
        fileList={fileList}
        name='file'
        action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
        headers={{
          authorization: 'authorization-text'
        }}
        onChange={this.handleChange}
      >
        <Button disabled={disabled}>
          <Icon type='upload' /> 上传
        </Button>
      </Upload>
    )
  }
}
