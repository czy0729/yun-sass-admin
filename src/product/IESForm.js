/*
 * @Author: czy0729
 * @Date: 2019-06-28 16:07:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-08 11:51:15
 */
import React from 'react'
import Form from '@/components/Form'

function IESForm({ form, ies, beam_angle: beamAngle, flux, cct, power }) {
  return (
    <Form form={form}>
      <Form.UploadFile
        label='IES'
        name='ies'
        rules={Form.rules.required}
        initialValue={typeof ies === 'string' ? [ies] : ies}
      />
      <Form.Input
        label='光束角'
        name='beam_angle'
        rules={Form.rules.required}
        initialValue={beamAngle}
      />
      <Form.InputNumber
        label='功率'
        name='power'
        rules={Form.rules.required}
        initialValue={power}
        max={10000}
        placeholder='0-10000'
        right='W'
      />
      <Form.InputNumber
        label='光通量'
        name='flux'
        rules={Form.rules.required}
        initialValue={flux}
        max={50000}
        placeholder='0-50000'
        right='lm'
      />
      <Form.InputNumber
        label='色温'
        name='cct'
        rules={Form.rules.required}
        initialValue={cct}
        min={2700}
        max={10000}
        step={100}
        placeholder='2700-10000'
        right='K'
      />
    </Form>
  )
}

export default IESForm
