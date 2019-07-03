/*
 * @Author: czy0729
 * @Date: 2019-07-03 16:58:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-03 16:59:15
 */
import React from 'react'
import classNames from 'classnames'
import './index.less'

const prefixCls = 'c-flex'

const Flex = props => {
  const {
    direction,
    wrap,
    justify,
    align = 'center',
    alignContent,
    className,
    children,
    style,
    ...restProps
  } = props

  const wrapCls = classNames(prefixCls, className, {
    [`${prefixCls}-dir-row`]: direction === 'row',
    [`${prefixCls}-dir-row-reverse`]: direction === 'row-reverse',
    [`${prefixCls}-dir-column`]: direction === 'column',
    [`${prefixCls}-dir-column-reverse`]: direction === 'column-reverse',

    [`${prefixCls}-nowrap`]: wrap === 'nowrap',
    [`${prefixCls}-wrap`]: wrap === 'wrap',
    [`${prefixCls}-wrap-reverse`]: wrap === 'wrap-reverse',

    [`${prefixCls}-justify-start`]: justify === 'start',
    [`${prefixCls}-justify-end`]: justify === 'end',
    [`${prefixCls}-justify-center`]: justify === 'center',
    [`${prefixCls}-justify-between`]: justify === 'between',
    [`${prefixCls}-justify-around`]: justify === 'around',

    [`${prefixCls}-align-start`]: align === 'start',
    [`${prefixCls}-align-center`]: align === 'center',
    [`${prefixCls}-align-end`]: align === 'end',
    [`${prefixCls}-align-baseline`]: align === 'baseline',
    [`${prefixCls}-align-stretch`]: align === 'stretch',

    [`${prefixCls}-align-content-start`]: alignContent === 'start',
    [`${prefixCls}-align-content-end`]: alignContent === 'end',
    [`${prefixCls}-align-content-center`]: alignContent === 'center',
    [`${prefixCls}-align-content-between`]: alignContent === 'between',
    [`${prefixCls}-align-content-around`]: alignContent === 'around',
    [`${prefixCls}-align-content-stretch`]: alignContent === 'stretch'
  })

  return (
    <div className={wrapCls} style={style} {...restProps}>
      {children}
    </div>
  )
}

Flex.Item = ({ children, className, style, ...restProps }) => {
  const wrapCls = classNames(`${prefixCls}-item`, className)

  return (
    <div className={wrapCls} style={style} {...restProps}>
      {children}
    </div>
  )
}

export default Flex
