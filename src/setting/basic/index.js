/*
 * @Author: czy0729
 * @Date: 2019-07-03 16:36:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-03 17:56:46
 */
import React from 'react'
import { observer, inject } from 'mobx-react'
import Clipboard from 'clipboard'
import { Divider, message } from 'antd'
import { Form } from '@/components'

export default
@inject('globalStore', 'uiStore')
@Form.create
@observer
class Basic extends React.Component {
  clipboard

  componentDidMount() {
    this.clipboard = new Clipboard('#copy')

    this.clipboard.on('success', e => {
      e.clearSelection()
      message.success('已复制')
    })
  }

  componentWillUnmount() {
    this.clipboard.destroy()
  }

  showUpdateWebsite = value => {
    const { uiStore } = this.props
    uiStore.showFormModal({
      title: '个性化域名',
      children: (
        <Form>
          <Form.Input
            label='自定义'
            name='website'
            initialValue={value}
            rules={Form.rules.required}
          />
        </Form>
      )
    })
  }

  render() {
    const { form } = this.props
    return (
      <Form form={form}>
        <Form.Text label='用户名' text='eLicht' />
        <Form.Text label='应用有效期' text='2020年10月31日' />
        <Form.Input
          label='公司名称'
          name='company'
          rules={Form.rules.required}
          placeholder='最多20个字'
          extra='显示在导航栏，建议填写公司简称，6个字以内'
        />
        <Form.Upload label='LOGO' name='logo' />
        <Form.Text
          label='应用有效期'
          text='2020年10月31日'
          extra='个性域名最多可修改5次，您还可以修改5次'
        />
        <Form.Text
          label='域名'
          text={<span id='website'>http://ies.litku.com/s10001/</span>}
          right={
            <div>
              <a
                onClick={() =>
                  this.showUpdateWebsite('http://ies.litku.com/s10001/')
                }
              >
                设置
              </a>
              <Divider type='vertical' />
              <a id='copy' data-clipboard-target='#website'>
                复制
              </a>
            </div>
          }
          extra='个性域名最多可修改5次，您还可以修改5次'
        />
        <Form.Switch
          label='访问控制'
          name='visible'
          initialValue
          checkedChildren='开放访问'
          unCheckedChildren='私有访问'
          extra={
            <>
              <p style={{ marginBottom: 0 }}>
                开放：访问者可通过网址进行浏览访问
              </p>
              <p style={{ marginTop: '0.4em', marginBottom: 0 }}>
                私有：登陆您的账号后才能访问在线试灯应用
              </p>
            </>
          }
        />
        <Form.Input
          label='官网链接'
          name='website'
          rules={Form.rules.gen('url', false)}
          placeholder='https://'
        />
        <Form.Input
          label='官网产品链接'
          name='goodsUrl'
          rules={Form.rules.gen('url', false)}
          placeholder='https://'
        />
        <Form.Button onSubmit={this.onSubmit}>保存</Form.Button>
      </Form>
    )
  }
}
