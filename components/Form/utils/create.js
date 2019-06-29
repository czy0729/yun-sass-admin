/*
 * 自动生成表单托管对象
 * @Author: czy0729
 * @Date: 2019-06-27 11:51:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-29 12:20:44
 */
import React from 'react'
import { Form } from 'antd'

/**
 * 表单验证，验证后执行next
 * @version 190627 1.0
 * @return {Promise}
 */
const onValidate = (form, next = Function.prototype, e) => {
  if (e) {
    e.preventDefault()
  }

  return new Promise((resolve, reject) =>
    form.validateFieldsAndScroll(async (err, values) => {
      if (err) {
        onErr(err)
        return reject()
      }

      const data = await onOk(values, next)
      return resolve(data)
    })
  )
}

/**
 * @todo 表单验证错误后滚动到首个错误表单项的位置
 * @version 190627 1.0
 */
const onErr = err => {
  console.log(JSON.stringify(err))
  return false
}

/**
 * 验证返回的err是false时，执行next
 * @version 190627 1.0
 * @param {Object} values rc-form传过来的值
 * @param {Func}   next   下一步的函数
 */
const onOk = (values, next = Function.prototype) => next(values)

/**
 * onValidate & onOk 快捷方法
 * @version 190627 1.0
 * @return {Promise}
 */
const onSubmit = (form, next = Function.prototype, e) =>
  onValidate(form, values => onOk(values, next), e)

/**
 * 表单HOC
 * @version 190627 1.0
 * @param {*} ComposedComponent
 */
const formDecorator = ComposedComponent =>
  Form.create()(({ form, ...otherProps }) => {
    const _onSubmit = (...arg) => onSubmit(form, ...arg)

    // eslint-disable-next-line no-param-reassign
    form.onSubmit = _onSubmit
    return (
      <ComposedComponent
        form={form}
        onValidate={onValidate}
        onErr={onErr}
        onOk={onOk}
        onSubmit={_onSubmit}
        {...otherProps}
      />
    )
  })

export default formDecorator
