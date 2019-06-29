/*
 * @Author: czy0729
 * @Date: 2019-06-28 16:07:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-29 14:51:28
 */
import React from 'react'
import Form from '@/components/Form'

export default
@Form.create
class IESForm extends React.Component {
  componentDidMount() {
    const { forwardForm, form } = this.props
    forwardForm(form)
  }

  render() {
    const { form, ies, angle, lm, cct } = this.props
    return (
      <Form form={form} style={{ marginTop: 24 }}>
        <Form.UploadFile
          label='IES'
          name='ies'
          rules={Form.rules.required}
          initialValue={ies ? [ies] : undefined}
        />
        <Form.Input
          label='光束角'
          name='angle'
          rules={Form.rules.required}
          initialValue={angle}
        />
        <Form.InputNumber
          label='光通量'
          name='lm'
          initialValue={lm}
          max={50000}
          placeholder='0-50000'
          extra='lm'
        />
        <Form.InputNumber
          label='色温'
          name='cct'
          initialValue={cct}
          min={2700}
          max={10000}
          step={100}
          placeholder='2700-10000'
          extra='K'
        />
      </Form>
    )
  }
}
