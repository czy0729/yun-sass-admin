/*
 * @Author: czy0729
 * @Date: 2019-07-04 15:34:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-05 17:46:21
 */
import { URL_API_HOST } from './index'

/**
 * 1.1 增加、编辑商品
 * @param {*} id 序号
 */
export const API_PRODUCT_COMMIT = `${URL_API_HOST}/product/commit`

/**
 * 1.2 获取商品详情
 * id, token
 */
export const API_PRODUCT_ITEM = `${URL_API_HOST}/product/item`

/**
 * 1.3 获取商品列表信息
 * page, sort, token
 */
export const API_PRODUCT_LIST = `${URL_API_HOST}/product/store`

/**
 * 2.1 增加、编辑商品分类
 * id, name, state, active, sort, token
 */
export const API_CATEGORY_COMMIT = `${URL_API_HOST}/productcategory/commit`

/**
 * 2.2 获取分类详情
 * id, token
 */
export const API_CATEGORY_ITEM = `${URL_API_HOST}/productcategory/item`

/**
 * 2.3 分类列表
 * page, sort, token
 */
export const API_CATEGORY_LIST = `${URL_API_HOST}/productcategory/store`

/**
 * 2.4 编辑商品分类信息
 * list, token
 */
export const API_CATEGORY_EDIT = `${URL_API_HOST}/productcategory/edit
`
