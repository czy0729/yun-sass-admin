/*
 * @Author: czy0729
 * @Date: 2019-06-28 16:35:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-05 22:25:49
 */
import React from 'react'
import deepmeger from 'deepmerge'
import { Upload, Button, Icon } from 'antd'
import { getTimestamp, getBase64 } from '@/utils'
import fetch from '@/utils/fetch'
import sha1 from '@/utils/sha1'
import { URL_UPLOAD_SIGN, URL_UPLOAD_VERIFY } from '@/constants'
import { initData, getFileList, getReturnValue } from '../Upload'
import './index.less'

const cls = 'c-upload-file'

export default class UploadFile extends React.Component {
  static defaultProps = {
    onChange: Function.prototype
  }

  state = {
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
    this.onUploadOk(data.content.url)
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
    const { fileList, action, data } = this.state
    const disabled = !!fileList.length
    return (
      <Upload
        className={cls}
        action={action}
        data={data}
        name='file'
        fileList={fileList}
        supportServerRender
        beforeUpload={this.handleBeforeUpload}
        onChange={this.handleChange}
      >
        <Button disabled={disabled}>
          <Icon type='upload' /> 上传
        </Button>
      </Upload>
    )
  }
}
