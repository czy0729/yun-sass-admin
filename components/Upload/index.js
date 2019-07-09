/*
 * @Author: czy0729
 * @Date: 2019-06-27 17:43:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-08 11:51:40
 */
import React from 'react'
import deepmeger from 'deepmerge'
import { Upload as AntUpload, Icon, Modal } from 'antd'
import { getTimestamp, getBase64 } from '@/utils'
import fetch from '@/utils/fetch'
import sha1 from '@/utils/sha1'
import { URL_UPLOAD_SIGN, URL_UPLOAD_VERIFY } from '@/constants'
import './index.less'

const cls = 'c-upload'
export const initData = {
  name: '',
  key: '',
  policy: '',
  OSSAccessKeyId: '',
  success_action_status: '',
  callback: '',
  signature: '',
  'Content-Disposition': ''
}

export default class Upload extends React.Component {
  static defaultProps = {
    maxLength: 1,
    onChange: Function.prototype
  }

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: getFileList(this.props.value),
    action: 'http://litku.oss-cn-beijing.aliyuncs.com',
    data: initData
  }

  hasUploaded = false // 上传过就不接受componentWillReceiveProps更新
  fileInfo = {} // getSign获取的上传OSS参数

  componentWillReceiveProps(nextProps) {
    if (!this.hasUploaded) {
      this.setState({
        fileList: getFileList(nextProps.value)
      })
    }
  }

  handleCancel = () => {
    this.setState({
      previewVisible: false
    })
  }

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

  handleBeforeUpload = async file => {
    this.hasUploaded = true

    const base64 = await getBase64(file)
    const temp = file.name.split('.')

    // 获取上传OSS参数
    const data = await fetch(URL_UPLOAD_SIGN, {
      'files[0][id]': getTimestamp(),
      'files[0][filename]': sha1(base64),
      'files[0][name]': file.name,
      'files[0][size]': file.size,
      'files[0][extension]': temp[temp.length - 1],
      'files[0][type]': file.type,
      'files[0][dir]': 0
    })

    // 假如有signature可以认定OSS没图片
    if (data.content.signature) {
      // eslint-disable-next-line prefer-destructuring
      this.fileInfo = data.content.files[0]
      this.setState({
        action: data.content.host,
        data: {
          name: this.fileInfo.name,
          key: `${this.fileInfo.dir}${this.fileInfo.fileId}.${
            this.fileInfo.extension
          }`,
          policy: data.content.policy,
          OSSAccessKeyId: data.content.accessid,
          success_action_status: 200,
          callback: this.fileInfo.callback,
          signature: data.content.signature,
          'Content-Disposition': `attachment;filename=${this.fileInfo.name}`
        }
      })
      return Promise.resolve()
    }

    // OSS已有图片
    const { dataSource } = this.state
    const newDataSource = deepmeger([], dataSource)
    newDataSource.push({
      uid: getTimestamp(),
      status: 'done',
      name: data.content.files[0].name,
      url: data.content.files[0].source.cover
    })
    this.setState({ dataSource: newDataSource }, () => {
      this.onUploadOk()
    })
    return Promise.reject()
  }

  handleChange = async info => {
    const { file, fileList } = info
    this.setState({ fileList }, () => {
      const { status, response } = file
      if (status === 'done') {
        if (response.Status === 'Ok') {
          this.verify()
        } else {
          this.onUploadError(response)
        }
      } else if (status === 'removed') {
        this.onRemoved()
      }
    })
  }

  // 成功上传发送认证请求
  verify = async () => {
    const data = await fetch(URL_UPLOAD_VERIFY, {
      filename: this.fileInfo.filename,
      path: this.fileInfo.path,
      extension: this.fileInfo.extension,
      name: this.fileInfo.name,
      dir: 0,
      size: this.fileInfo.size,
      type: this.fileInfo.type,
      fileId: this.fileInfo.fileId,
      date: this.fileInfo.date,
      verify: this.fileInfo.verify
    })
    this.onUploadOk(data.content.cover)
  }

  onRemoved = () => {
    const { onChange } = this.props
    const { fileList } = this.state
    onChange(getReturnValue(fileList))
    this.reset()
  }

  onUploadError = response => {
    this.reset()
    console.log('onUploadError', response)
  }

  onUploadOk = newFile => {
    const { onChange } = this.props
    const { fileList, data } = this.state
    if (data.key) {
      const value = newFile
        ? getReturnValue([
            ...fileList,
            {
              url: newFile
            }
          ])
        : getReturnValue(fileList)
      onChange(value)
    }
    this.reset()
  }

  // 清空上次上传的参数
  reset() {
    this.fileInfo = {}
    this.setState({
      data: initData
    })
  }

  render() {
    const { maxLength } = this.props
    const { previewVisible, previewImage, fileList, action, data } = this.state
    return (
      <>
        <AntUpload
          className={cls}
          action={action}
          data={data}
          listType='picture-card'
          fileList={fileList}
          supportServerRender
          beforeUpload={this.handleBeforeUpload}
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

export function getFileList(value = []) {
  return value
    .filter(item => !!item)
    .map((item, index) => ({
      uid: `${item}|${index}`,
      name: item,
      status: 'done',
      url: item
    }))
}
export function getReturnValue(fileList) {
  return fileList
    .filter(item => !!(item.url || item.response.url))
    .map(item => item.url || item.response.url)
}
