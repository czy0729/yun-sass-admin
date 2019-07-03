/*
 * @Author: czy0729
 * @Date: 2019-06-27 17:43:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-03 16:54:31
 */
import React from 'react'
import { Upload as AntUpload, Icon, Modal } from 'antd'
import './index.less'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
function getFileList(value = []) {
  return value
    .filter(item => !!item)
    .map((item, index) => ({
      uid: `${item}|${index}`,
      name: item,
      status: 'done',
      url: item
    }))
}
function getReturnValue(fileList) {
  return fileList.map(item => item.url || item.response.url)
}

const cls = 'c-upload'

export default class Upload extends React.Component {
  static defaultProps = {
    maxLength: 1,
    onChange: Function.prototype
  }

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: getFileList(this.props.value)
  }

  handleCancel = () =>
    this.setState({
      previewVisible: false
    })

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    })
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
    const { maxLength } = this.props
    const { previewVisible, previewImage, fileList } = this.state
    return (
      <>
        <AntUpload
          className={cls}
          action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          listType='picture-card'
          fileList={fileList}
          supportServerRender
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= maxLength ? null : (
            <>
              <Icon type='plus' />
              <div>上传</div>
            </>
          )}
        </AntUpload>
        <Modal
          visible={previewVisible}
          width={640}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    )
  }
}
